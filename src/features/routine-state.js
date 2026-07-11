function migrateRoutineTrackingState() {
  appState.routineCompletions ||= {};
  appState.routineTrackingStartedDate ||= routineTracking.singaporeDateKey();
  const weightTask = routineTasks.find((task) => task.id === "nako-weight-tracking");
  if (!weightTask) return;
  const byCycle = new Map();
  Object.entries(appState.weightTracking || {}).forEach(([dateKey, value]) => {
    const weight = parseFloat(getWeightValue(value));
    const cycle = routineCycle(weightTask, dateKey);
    if (!cycle || !Number.isFinite(weight) || weight <= 0) return;
    const current = byCycle.get(cycle.key);
    if (!current || dateKey > current.dateKey) byCycle.set(cycle.key, { dateKey, weight, updatedAt: value?.updatedAt || "" });
  });
  byCycle.forEach((entry, cycleKey) => {
    const id = routineTracking.completionId(weightTask.id, cycleKey);
    const existing = appState.routineCompletions[id];
    if (existing && !existing.deleted) return;
    const timestamp = entry.updatedAt || `${entry.dateKey}T00:00:00.000+08:00`;
    appState.routineCompletions[id] = {
      id,
      taskId: weightTask.id,
      cycleKey,
      completedDate: entry.dateKey,
      completedAt: timestamp,
      note: `Weight: ${entry.weight} kg`,
      updatedAt: timestamp,
      source: "metric",
      weightKg: entry.weight
    };
  });
  safeStorage.setItem(STATE_KEY, JSON.stringify(appState));
}

function updateWeightInput(weightInput) {
  appState.weightTracking ||= {};
  const val = weightInput.value.trim();
  appState.weightTracking[weightInput.dataset.weightDate] = {
    value: val !== "" ? parseFloat(val) : "",
    updatedAt: nowIso()
  };
  reconcileWeightCompletion(weightInput.dataset.weightDate);
  saveStateDebounced();
}

function completionRecordFor(task, dateKey, attrs = {}) {
  const cycle = routineCycle(task, dateKey);
  if (!cycle) return null;
  const id = routineTracking.completionId(task.id, cycle.key);
  const now = nowIso();
  return {
    id,
    taskId: task.id,
    cycleKey: cycle.key,
    completedDate: dateKey,
    completedAt: attrs.completedAt || now,
    note: attrs.note || "",
    updatedAt: now,
    ...attrs,
    deleted: false,
    deletedAt: ""
  };
}

function storeRoutineRecord(record, options = {}) {
  if (!record?.id) return;
  routineRecords()[record.id] = record;
  saveState({ remote: options.remoteLegacy !== false });
  if (options.remoteCompletion !== false) window.nakoFirebase?.saveRoutineCompletion?.(record);
}

function saveRoutineCompletion(task, values = {}) {
  const record = completionRecordFor(task, values.completedDate || routineTracking.singaporeDateKey(), values);
  if (!record) return null;
  storeRoutineRecord(record);
  return record;
}

function updateRoutineCompletion(record, values = {}) {
  if (!record) return;
  const updated = { ...record, ...values, updatedAt: nowIso() };
  storeRoutineRecord(updated);
  routineStatusMessage = label("completionSaved");
}

function completeRoutine(taskId) {
  const task = trackedRoutineTasks().find((item) => item.id === taskId);
  if (!task || task.trackingMode === "metric") return;
  const record = saveRoutineCompletion(task);
  if (!record) return;
  routineUndoRecord = { ...record };
  routineStatusMessage = label("completionSaved");
  clearTimeout(routineUndoTimer);
  routineUndoTimer = setTimeout(() => {
    routineUndoRecord = null;
    const view = parseRoute().view;
    if (view === "routine-checkin" || view === "routine") render();
  }, 8000);
  render();
}

function tombstoneRoutineRecord(record) {
  const now = nowIso();
  return { ...record, deleted: true, deletedAt: now, updatedAt: now };
}

function undoRoutineCompletion() {
  if (!routineUndoRecord) return;
  storeRoutineRecord(tombstoneRoutineRecord(routineUndoRecord));
  routineUndoRecord = null;
  clearTimeout(routineUndoTimer);
  routineStatusMessage = label("completionRemoved");
  render();
}

function removeRoutineCompletion(recordId) {
  const record = routineRecords()[recordId];
  if (!record) return;
  storeRoutineRecord(tombstoneRoutineRecord(record));
  routineStatusMessage = label("completionRemoved");
  routineUndoRecord = null;
  render();
}

function moveRoutineCompletion(recordId, nextDate) {
  const oldRecord = routineRecords()[recordId];
  const task = trackedRoutineTasks().find((item) => item.id === oldRecord?.taskId);
  if (!oldRecord || !task || !routineTracking.parseDateKey(nextDate)) {
    routineStatusMessage = label("routineDateInvalid");
    return render();
  }
  const nextCycle = routineCycle(task, nextDate);
  const nextId = routineTracking.completionId(task.id, nextCycle.key);
  let recordToMove = oldRecord;
  if (oldRecord.source === "metric" && oldRecord.completedDate !== nextDate) {
    const oldWeight = appState.weightTracking?.[oldRecord.completedDate];
    const oldValue = parseFloat(getWeightValue(oldWeight));
    if (Number.isFinite(oldValue) && oldValue > 0) {
      const targetWeight = appState.weightTracking?.[nextDate];
      const targetValue = parseFloat(getWeightValue(targetWeight));
      delete appState.weightTracking[oldRecord.completedDate];
      if (!Number.isFinite(targetValue) || targetValue <= 0) {
        appState.weightTracking[nextDate] = { value: oldValue, updatedAt: nowIso() };
      }
      const movedValue = Number.isFinite(targetValue) && targetValue > 0 ? targetValue : oldValue;
      recordToMove = {
        ...oldRecord,
        weightKg: movedValue,
        note: /^Weight: [\d.]+ kg$/.test(oldRecord.note || "") ? `Weight: ${movedValue} kg` : oldRecord.note
      };
    }
  }
  if (nextId === recordId) {
    storeRoutineRecord({ ...recordToMove, completedDate: nextDate, updatedAt: nowIso() });
  } else {
    storeRoutineRecord(tombstoneRoutineRecord(oldRecord));
    storeRoutineRecord({
      ...recordToMove,
      id: nextId,
      cycleKey: nextCycle.key,
      completedDate: nextDate,
      updatedAt: nowIso(),
      deleted: false,
      deletedAt: ""
    });
    if (oldRecord.source === "metric") reconcileWeightCompletion(oldRecord.completedDate);
  }
  const currentCycle = routineCycle(task, routineTracking.singaporeDateKey());
  routineStatusMessage = nextCycle.key === currentCycle.key ? label("completionSaved") : label("backdatePreviousCycle");
  routineUndoRecord = null;
  render();
}

function updateRoutineCompletionNote(recordId, note) {
  const record = routineRecords()[recordId];
  if (!record) return;
  updateRoutineCompletion(record, { note: String(note || "").slice(0, 2000) });
  render();
}

function reconcileWeightCompletion(dateKey) {
  const task = trackedRoutineTasks().find((item) => item.id === "nako-weight-tracking");
  const targetCycle = task && routineCycle(task, dateKey);
  if (!task || !targetCycle) return;
  const candidates = Object.entries(appState.weightTracking || {}).map(([key, value]) => ({ key, value: parseFloat(getWeightValue(value)), updatedAt: value?.updatedAt || "" }))
    .filter((entry) => Number.isFinite(entry.value) && entry.value > 0 && routineCycle(task, entry.key)?.key === targetCycle.key)
    .sort((a, b) => b.key.localeCompare(a.key));
  const id = routineTracking.completionId(task.id, targetCycle.key);
  const existing = routineRecords()[id];
  if (!candidates.length) {
    if (existing && !existing.deleted && existing.source === "metric") storeRoutineRecord(tombstoneRoutineRecord(existing));
    return;
  }
  const latest = candidates[0];
  const automaticNote = `Weight: ${latest.value} kg`;
  const note = existing?.note && !/^Weight: [\d.]+ kg$/.test(existing.note) ? existing.note : automaticNote;
  storeRoutineRecord(completionRecordFor(task, latest.key, {
    completedAt: existing?.completedAt || latest.updatedAt || nowIso(),
    note,
    source: "metric",
    weightKg: latest.value
  }));
}
