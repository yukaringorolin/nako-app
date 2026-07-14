/* ==========================================================================
   SECTION 3: RENDERERS - PAGES & VIEWS
   ========================================================================== */
function renderHome() {
  const content = `
    <section class="home-hero">
      <img src="${NAKO_LOGO_SRC}" alt="Nako" />
      <div>
        <p class="eyebrow">${esc(label("homeEyebrow"))}</p>
        <h1>${esc(label("appTitle"))}</h1>
        <p class="lead">${esc(label("appSubtitle"))}</p>
      </div>
    </section>
    ${renderSearchComponent()}
    ${renderRoutineHomeShortcut()}
    <p class="section-label">${esc(label("quickShortcuts"))}</p>
    <section class="shortcut-grid">
      ${renderShortcuts()}
    </section>
    <section class="rule-strip compact"><h2>${esc(label("foodItems"))}</h2><p>${esc(label("foodFirst"))}</p></section>
    <p class="section-label">${esc(label("sections"))}</p>
    <section class="card-list">${homeSections.map(renderSectionCard).join("")}</section>
    ${renderAdditionalResources()}`;
  renderShell(label("appTitle"), content, false);
}

function activeTrackedRoutineTasks() {
  return window.nakoRoutineTaskSelection.activeTrackedRoutineTasks(routineTasks);
}

function historicalTrackedRoutineTasks() {
  return window.nakoRoutineTaskSelection.historicalTrackedRoutineTasks(routineTasks);
}

function routineRecords() {
  appState.routineCompletions ||= {};
  return appState.routineCompletions;
}

function routineCycle(task, dateKey = routineTracking.singaporeDateKey()) {
  return routineTracking.cycleForDate(task.trackingCadence, dateKey, task.trackingAnchor || undefined);
}

function activeRoutineRecord(task, dateKey = routineTracking.singaporeDateKey()) {
  const cycle = routineCycle(task, dateKey);
  if (!cycle) return null;
  const record = routineRecords()[routineTracking.completionId(task.id, cycle.key)];
  return record && !record.deleted ? record : null;
}

function currentChecklist() {
  const today = routineTracking.singaporeDateKey();
  return activeTrackedRoutineTasks().map((task) => ({ task, cycle: routineCycle(task, today), record: activeRoutineRecord(task, today) }))
    .filter((item) => !(item.task.trackingMode === "one-off" && item.record));
}

function localeForCurrentLanguage() {
  return currentLang === "jp" ? "ja-JP" : currentLang === "mm" ? "my-MM" : "en-SG";
}

function formatRoutineDate(dateKey, withWeekday = false) {
  return routineTracking.formatDate(dateKey, localeForCurrentLanguage(), withWeekday ? { weekday: "short" } : {});
}

function cadenceLabel(cadence) {
  const keys = { weekly: "cadenceWeekly", fortnightly: "cadenceFortnightly", monthly: "cadenceMonthly", quarterly: "cadenceQuarterly", "one-off": "cadenceOneOff" };
  return label(keys[cadence] || "dueThisPeriod");
}

function cycleRangeLabel(cycle) {
  if (!cycle?.start || !cycle?.end) return label("oneOffLifetime");
  return labelWith("routinePeriodRange", { start: formatRoutineDate(cycle.start), end: formatRoutineDate(cycle.end) });
}

function renderRoutineHomeShortcut() {
  const checklist = currentChecklist();
  const remaining = checklist.filter((item) => !item.record).length;
  const status = remaining ? labelWith("routineHomeRemaining", { count: remaining }) : label("routineHomeComplete");
  return `<button class="routine-home-shortcut" data-routine-checkin>
    <span class="routine-home-icon" aria-hidden="true">✓</span>
    <span><strong>${esc(label("routineCheckIn"))}</strong><small>${esc(status)}</small></span>
    <span class="routine-home-arrow" aria-hidden="true">›</span>
  </button>`;
}

function renderRoutineCheckIn() {
  const today = routineTracking.singaporeDateKey();
  const checklist = currentChecklist();
  const dueItems = checklist.filter((item) => !item.record);
  const completedItems = checklist.filter((item) => item.record);
  const periodItems = [...new Map(checklist.map((item) => [item.task.trackingCadence, item])).values()];
  const content = `
    <section class="routine-checkin-hero">
      <div>
        <p class="eyebrow">${esc(label("currentSingaporeDate"))} · ${esc(routineTracking.TIME_ZONE)}</p>
        <h1>${esc(label("routineCheckIn"))}</h1>
        <p>${esc(label("routineCheckInSubtitle"))}</p>
      </div>
      <strong class="routine-progress">${esc(labelWith("progressSummary", { done: completedItems.length, total: checklist.length }))}</strong>
    </section>
    <section class="routine-periods" aria-label="${esc(label("currentPeriods"))}">
      ${periodItems.map((item) => `<span><strong>${esc(cadenceLabel(item.task.trackingCadence))}</strong>${esc(cycleRangeLabel(item.cycle))}</span>`).join("")}
    </section>
    <button class="history-link-button" data-routine-history>${esc(label("routineHistory"))}<span aria-hidden="true">›</span></button>
    ${renderRoutineStatus()}
    <section class="routine-list-section">
      <h2>${esc(label("due"))} <span>${dueItems.length}</span></h2>
      <div class="routine-check-list">${dueItems.map((item) => renderRoutineCheckRow(item, false)).join("") || `<div class="empty-state">${esc(label("routineHomeComplete"))}</div>`}</div>
    </section>
    <section class="routine-list-section completed-section">
      <h2>${esc(label("completed"))} <span>${completedItems.length}</span></h2>
      <div class="routine-check-list">${completedItems.map((item) => renderRoutineCheckRow(item, true)).join("") || `<div class="empty-state">${esc(label("noRoutineHistory"))}</div>`}</div>
    </section>`;
  renderShell(label("routineCheckIn"), content, true);
}

function renderRoutineStatus() {
  if (!routineStatusMessage && !routineUndoRecord) return "";
  return `<div class="routine-status" role="status"><span>${esc(routineStatusMessage || label("completionSaved"))}</span>${routineUndoRecord ? `<button type="button" data-routine-undo>${esc(label("undo"))}</button>` : ""}</div>`;
}

function renderRoutineTaskVisual(task, cycle) {
  return `
    ${renderCardIcon(task.icon, primaryPhoto(task.photos))}
    <span class="card-copy">
      <span class="card-title">${esc(tr(task.title))}</span>
      <span class="card-description">${esc(cadenceLabel(task.trackingCadence))} · ${esc(cycleRangeLabel(cycle))}</span>
    </span>
  `;
}

function renderRoutineCheckRow(item, completed) {
  const { task, cycle, record } = item;
  const control = task.trackingMode === "metric" && !completed
    ? `<a class="routine-check-control metric-control" href="#routine/${esc(task.id)}" aria-label="${esc(label("metricOpenWeight"))}">⚖️</a>`
    : completed
      ? `<span class="routine-check-control is-complete" aria-hidden="true">✓</span>`
      : `<button class="routine-check-control" type="button" data-routine-complete="${esc(task.id)}" aria-label="${esc(`${label("markComplete")}: ${tr(task.title)}`)}"><span aria-hidden="true"></span></button>`;
  return `<article class="routine-check-row ${completed ? "is-complete" : ""}">
    <div class="routine-row-main">
      ${control}
      <a class="routine-row-content" href="#routine/${esc(task.id)}">
        ${renderRoutineTaskVisual(task, cycle)}
        <span class="chevron" aria-hidden="true">›</span>
      </a>
    </div>
    ${completed ? `<p class="metric-complete-note">${task.trackingMode === "metric" ? esc(label("metricCompleted")) : ""}</p>${renderCompletionEditor(record)}` : ""}
  </article>`;
}

function renderCompletionEditor(record, showRemove = false) {
  if (!record) return "";
  return `<details class="completion-editor">
    <summary>${esc(label("completionDate"))}: ${esc(formatRoutineDate(record.completedDate, true))} · ${esc(label("addNote"))}</summary>
    <div class="completion-editor-fields">
      <label>${esc(label("completionDate"))}<input type="date" value="${esc(record.completedDate)}" data-completion-date="${esc(record.id)}"></label>
      <label>${esc(label("addNote"))}<textarea data-completion-note="${esc(record.id)}" placeholder="${esc(label("notePlaceholder"))}">${esc(record.note || "")}</textarea></label>
      ${showRemove ? `<button class="danger-text-button" type="button" data-completion-remove="${esc(record.id)}">${esc(label("removeCompletion"))}</button>` : ""}
    </div>
  </details>`;
}

function renderRoutineHistoryRow(record, task, showTaskName = true) {
  const titleHtml = showTaskName ? `<h2>${esc(tr(task.title))}</h2>` : "";
  return `<article class="routine-history-row ${record.missed ? "is-missed" : ""}">
    <div>
      ${titleHtml}
      <p>${esc(cadenceLabel(task.trackingCadence))} · ${record.missed ? esc(cycleRangeLabel(record.cycle)) : esc(formatRoutineDate(record.completedDate, true))}</p>
      ${record.missed ? `<p class="routine-missed-label">${esc(label("notCompleted"))}</p>` : displayRoutineNote(record) ? `<p class="routine-history-note">${esc(displayRoutineNote(record))}</p>` : ""}
    </div>
    ${record.missed ? "" : renderCompletionEditor(record, true)}
  </article>`;
}

function renderRoutineHistoryRecords(records, options = {}) {
  const showTaskName = options.showTaskName !== false;
  return records.map((record) => {
    const task = routineTasks.find((item) => item.id === record.taskId);
    if (!task) return "";
    return renderRoutineHistoryRow(record, task, showTaskName);
  }).join("") || `<div class="empty-state">${esc(label("noRoutineHistory"))}</div>`;
}

function renderRoutineHistory() {
  const savedRecords = Object.values(routineRecords()).filter((record) => record && !record.deleted);
  const tasks = window.nakoRoutineTaskSelection.historyFilterTasks(routineTasks, savedRecords);
  const records = [...savedRecords, ...missedRoutineHistoryRecords(activeTrackedRoutineTasks())].filter((record) => {
    if (routineHistoryFilters.task !== "all" && record.taskId !== routineHistoryFilters.task) return false;
    const task = tasks.find((item) => item.id === record.taskId);
    if (!task) return false;
    if (routineHistoryFilters.cadence !== "all" && task.trackingCadence !== routineHistoryFilters.cadence) return false;
    if (routineHistoryFilters.from && record.completedDate < routineHistoryFilters.from) return false;
    if (routineHistoryFilters.to && record.completedDate > routineHistoryFilters.to) return false;
    return true;
  }).sort((a, b) => b.completedDate.localeCompare(a.completedDate) || String(b.updatedAt).localeCompare(String(a.updatedAt)));

  const content = `
    <section class="routine-history-head"><h1>${esc(label("routineHistory"))}</h1><p>${esc(label("historyIntro"))}</p></section>
    <section class="routine-history-filters">
      <label>${esc(label("filterTask"))}<select data-routine-filter="task"><option value="all">${esc(label("allTasks"))}</option>${tasks.map((task) => `<option value="${esc(task.id)}" ${routineHistoryFilters.task === task.id ? "selected" : ""}>${esc(tr(task.title))}</option>`).join("")}</select></label>
      <label>${esc(label("filterCadence"))}<select data-routine-filter="cadence"><option value="all">${esc(label("allCadences"))}</option>${["weekly", "fortnightly", "monthly", "quarterly", "one-off"].map((cadence) => `<option value="${cadence}" ${routineHistoryFilters.cadence === cadence ? "selected" : ""}>${esc(cadenceLabel(cadence))}</option>`).join("")}</select></label>
      <label>${esc(label("filterFrom"))}<input type="date" value="${esc(routineHistoryFilters.from)}" data-routine-filter="from"></label>
      <label>${esc(label("filterTo"))}<input type="date" value="${esc(routineHistoryFilters.to)}" data-routine-filter="to"></label>
    </section>
    ${renderRoutineStatus()}
    <section class="routine-history-list">${renderRoutineHistoryRecords(records, { showTaskName: true })}</section>`;
  renderShell(label("routineHistory"), content, true);
}

function missedRoutineHistoryRecords(tasks) {
  const today = routineTracking.singaporeDateKey();
  const trackingStart = appState.routineTrackingStartedDate || today;
  const rangeStart = routineHistoryFilters.from && routineHistoryFilters.from > trackingStart ? routineHistoryFilters.from : trackingStart;
  const missed = [];
  tasks.filter(window.nakoRoutineTaskSelection.shouldGenerateMissed).forEach((task) => {
    let cycle = routineCycle(task, rangeStart);
    let guard = 0;
    while (cycle?.end && cycle.end < today && guard < 600) {
      const id = routineTracking.completionId(task.id, cycle.key);
      const record = routineRecords()[id];
      if (!record || record.deleted) missed.push({ id: `missed_${id}`, taskId: task.id, cycleKey: cycle.key, completedDate: cycle.end, note: "", missed: true, cycle });
      cycle = routineCycle(task, routineTracking.addDays(cycle.end, 1));
      guard += 1;
    }
  });
  return missed;
}

function getTaskSpecificHistory(task, limit = 8) {
  const today = routineTracking.singaporeDateKey();
  const trackingStart = appState.routineTrackingStartedDate || today;
  const completed = Object.values(routineRecords()).filter(
    (record) => record && !record.deleted && record.taskId === task.id
  );
  const missed = [];
  if (window.nakoRoutineTaskSelection.shouldGenerateMissed(task)) {
    let cycle = routineCycle(task, trackingStart);
    let guard = 0;
    while (cycle?.end && cycle.end < today && guard < 600) {
      const id = routineTracking.completionId(task.id, cycle.key);
      const record = routineRecords()[id];
      if (!record || record.deleted) {
        missed.push({ id: `missed_${id}`, taskId: task.id, cycleKey: cycle.key, completedDate: cycle.end, note: "", missed: true, cycle });
      }
      cycle = routineCycle(task, routineTracking.addDays(cycle.end, 1));
      guard += 1;
    }
  }
  const combined = [...completed, ...missed];
  combined.sort((a, b) => b.completedDate.localeCompare(a.completedDate) || String(b.updatedAt).localeCompare(String(a.updatedAt)));
  return combined.slice(0, limit);
}

function renderTaskRoutineHistory(taskId) {
  const task = routineTasks.find(t => t.id === taskId);
  if (!task || task.trackingMode === "none" || !task.trackingMode) return "";
  const records = getTaskSpecificHistory(task, 8);
  const recordsHtml = records.map(record => renderRoutineHistoryRow(record, task, false)).join("");
  return `
    <section class="panel routine-task-history">
      <h2>${esc(label("routineHistory"))}</h2>
      <div class="routine-history-list">
        ${recordsHtml || `<div class="empty-state">${esc(label("noRoutineHistory"))}</div>`}
      </div>
      ${records.length > 0 ? `<button type="button" class="history-link-button" data-view-full-history="${esc(task.id)}">${esc(label("routineHistory"))} ›</button>` : ""}
    </section>
  `;
}

function renderRoutineCompletionPanel(task) {
  if (!task || task.trackingMode === "none" || !task.trackingMode) return "";
  const today = routineTracking.singaporeDateKey();
  const cycle = routineCycle(task, today);
  const record = activeRoutineRecord(task, today);
  const completed = !!record;

  const statusLabel = completed ? label("completed") : label("due");
  const statusClass = completed ? "status-completed" : "status-due";
  
  let controlHtml = "";
  if (task.trackingMode === "metric") {
    controlHtml = completed
      ? `<span class="routine-check-control is-complete">✓</span>`
      : `<a class="routine-check-control metric-control" href="#routine/nako-weight-tracking">⚖️</a>`;
  } else {
    controlHtml = completed
      ? `<button class="routine-check-control is-complete" type="button" data-completion-remove="${esc(record.id)}" aria-label="${esc(label("removeCompletion"))}">✓</button>`
      : `<button class="routine-check-control" type="button" data-routine-complete="${esc(task.id)}" aria-label="${esc(label("markComplete"))}"><span aria-hidden="true"></span></button>`;
  }

  let editorHtml = "";
  if (completed && task.trackingMode !== "metric") {
    editorHtml = `
      <div class="completion-panel-editor">
        <label>
          <span>${esc(label("completionDate"))}</span>
          <input type="date" value="${esc(record.completedDate)}" data-completion-date="${esc(record.id)}">
        </label>
        <label>
          <span>${esc(label("addNote"))}</span>
          <textarea data-completion-note="${esc(record.id)}" placeholder="${esc(label("notePlaceholder"))}">${esc(record.note || "")}</textarea>
        </label>
        <button class="danger-text-button" type="button" data-completion-remove="${esc(record.id)}">${esc(label("removeCompletion"))}</button>
      </div>
    `;
  } else if (completed && task.trackingMode === "metric") {
    editorHtml = `<p class="metric-complete-note">${esc(displayRoutineNote(record))}</p>`;
  }

  return `
    <section class="panel routine-completion-panel">
      <h2>${esc(label("routineCheckIn"))}</h2>
      <div class="completion-panel-body">
        <div class="completion-panel-status-row">
          ${controlHtml}
          <div class="completion-panel-info">
            <span class="status-badge ${statusClass}">${esc(statusLabel)}</span>
            <span class="cadence-info">${esc(cadenceLabel(task.trackingCadence))} · ${esc(cycleRangeLabel(cycle))}</span>
          </div>
        </div>
        ${editorHtml}
      </div>
    </section>
  `;
}

function renderShortcuts() {
  const shortcutList = [
    { id: "nako-weight-tracking", type: "routine", labelKey: "shortcutNakoWeight" },
    { id: "meal-logs", type: "food", labelKey: "shortcutMealLogs" },
    { id: "recipes", type: "food", labelKey: "shortcutNakoToppings" },
    { id: "human-food", type: "food", labelKey: "shortcutHumanFood" },
    { id: "nako-training-fun", type: "routine", labelKey: "shortcutDogTraining" },
    { id: "helper-diary-feedback", type: "routine", labelKey: "shortcutDiary" }
  ];

  return shortcutList.map(shortcut => {
    let titleText = "";
    let icon = "";
    let photo = null;
    let accent = "#f19a82";
    let iconBg = "#fff0eb";
    let theme = "food";

    if (shortcut.type === "food") {
      const item = foodItems.find(entry => entry.id === shortcut.id);
      if (item) {
        titleText = shortcut.labelKey ? label(shortcut.labelKey) : tr(item.title);
        icon = item.icon;
        photo = primaryPhoto(item.photos) || sectionPhoto(homeSections.find(s => s.id === "food"));
      }
    } else if (shortcut.type === "routine") {
      const task = routineTasks.find(entry => entry.id === shortcut.id);
      if (task) {
        titleText = shortcut.labelKey ? label(shortcut.labelKey) : tr(task.title);
        icon = task.icon;
        const sec = homeSections.find(s => s.id === task.frequencyBucket);
        if (sec) {
          theme = sec.id;
          accent = sec.accent;
          iconBg = sec.iconBg;
          photo = primaryPhoto(task.photos) || sectionPhoto(sec);
        }
      }
    }

    const dataAttr = shortcut.type === "food" ? `data-food="${esc(shortcut.id)}"` : `data-routine="${esc(shortcut.id)}"`;

    return `<button class="shortcut-btn theme-${esc(theme)}" ${dataAttr}>
      ${renderShortcutIcon(icon, photo)}
      <span class="shortcut-title">${esc(titleText)}</span>
    </button>`;
  }).join("");
}

function renderSection(sectionId) {
  const section = homeSections.find((entry) => entry.id === sectionId);
  if (!section) return renderHome();
  const isFood = sectionId === "food";
  const isFoodSafety = sectionId === "food-safety";
  
  let items;
  if (isFood) {
    items = [...foodItems].sort(bySort);
  } else if (isFoodSafety) {
    items = [...foodSafetyItems];
  } else {
    items = routineTasks.filter((task) => task.frequencyBucket === sectionId).sort(bySort);
  }

  const pinned = !isFood && !isFoodSafety && sectionId === "daily" ? renderPinnedSafety() : "";
  const officialRefs = isFoodSafety ? renderOfficialReferencesPanel() : "";
  
  let eyebrowText;
  if (isFood) {
    eyebrowText = label("foodItems");
  } else if (isFoodSafety) {
    eyebrowText = label("safetyReferences");
  } else {
    eyebrowText = label("routineItems");
  }

  const cards = isFoodSafety
    ? renderFoodSafetyGroups(section)
    : `<section class="card-list">${items.map((item) => {
        if (isFood) return renderFoodCard(item, section);
        return renderRoutineCard(item, section);
      }).join("") || emptyState()}</section>`;

  const content = `
    ${renderHead(section.icon, tr(section.title), tr(section.description), section.iconBg, eyebrowText)}
    ${pinned}
    ${cards}
    ${officialRefs}`;
  renderShell(tr(section.title), content, true);
}

function renderFoodSafetyGroups(section) {
  const groups = [
    { label: "householdCookingRules", items: [householdCookingRulesItem] },
    { label: "foodStorage", ids: ["refrigerate-after-buying", "do-not-overcrowd-fridge", "refrigerator-storage-limits"] },
    { label: "foodPreparation", ids: ["do-not-wash-raw-meat", "safe-thawing", "egg-safety"] },
    { label: "cookingTemperatures", ids: ["cook-meat-completely", "rice-and-noodle-safety"] },
    { label: "leftoversRefrigeration", ids: ["leftover-safety", "when-uncertain-discard"] },
    { label: "cleaningCrossContamination", ids: ["separate-raw-and-cooked-food", "clean-serving-utensils"] }
  ];

  return groups.map((group) => {
    const groupItems = group.items || group.ids.map((id) => foodSafetyItems.find((item) => item.id === id)).filter(Boolean);
    return `<section class="safety-group" aria-labelledby="safety-group-${esc(group.label)}">
      <h2 id="safety-group-${esc(group.label)}">${esc(label(group.label))}</h2>
      <div class="card-list">${groupItems.map((item) => renderFoodSafetyCard(item, section)).join("")}</div>
    </section>`;
  }).join("");
}

function renderRoutine(routineId) {
  const task = routineTasks.find((entry) => entry.id === routineId);
  if (!task) return renderHome();
  const section = homeSections.find((entry) => entry.id === task.frequencyBucket);
  if (task.id === "helper-diary-feedback") return renderDiaryFeedback(task);
  if (task.id === "nako-weight-tracking") return renderWeightTracking(task);
  if (task.id === "nako-training-fun") return renderTrainingDashboard(task);
  const hasInstructions = task.instructions.length > 1 || (task.instructions.length === 1 && tr(task.instructions[0]) !== tr(task.summary));
  const instructionsPanel = hasInstructions ? `<section class="panel"><h2>${esc(label("instructions"))}</h2>${orderedList(task.instructions)}</section>` : "";

  const isTracked = task.trackingMode && task.trackingMode !== "none";
  const backLinkHtml = isTracked
    ? `<a href="#routine-checkin" class="back-checkin-link">← ${esc(label("backToRoutineCheckIn"))}</a>`
    : "";
  const completionPanelHtml = isTracked && task.active !== false ? renderRoutineCompletionPanel(task) : "";
  const historyPanelHtml = isTracked ? renderTaskRoutineHistory(task.id) : "";

  const content = `
    ${renderHead(task.icon, tr(task.title), tr(task.summary), section?.iconBg || "#fff1f2", tr(section?.title || task.frequencyText), primaryPhoto(task.photos))}
    ${backLinkHtml}
    <section class="panel"><h2>${esc(label("frequency"))}</h2><span class="frequency-pill">${esc(tr(task.frequencyText))}</span></section>
    ${completionPanelHtml}
    ${instructionsPanel}
    ${renderPhotos(task.photos)}
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2>${noteList(task.mustRemember)}</section>
    ${historyPanelHtml}
    ${renderVideo(task.videoUrl, task.videoUrlLabel)}`;
  renderShell(tr(task.title), content, true);
}

function renderFood(foodId) {
  if (foodId === "nako-weight") return go("#routine/nako-weight-tracking");
  if (foodId === "cooking-rules") return go("#food-safety/household-cooking-rules");
  const item = foodItems.find((entry) => entry.id === foodId);
  if (!item) return renderHome();
  if (item.type === "recipeIndex") return renderRecipeIndex(item);
  const state = getFoodState(item.id);
  const hasInstructions = item.instructions.length > 1 || (item.instructions.length === 1 && tr(item.instructions[0]) !== tr(item.summary));
  const instructionsPanel = hasInstructions ? `<section class="panel"><h2>${esc(label("instructions"))}</h2>${orderedList(item.instructions)}</section>` : "";
  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), "#fff0eb", label(item.trackingMode === "future" ? "futureTracking" : "foodItems"))}
    ${item.type === "rules" ? renderRulesPanel() : ""}
    ${instructionsPanel}
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2>${noteList(item.mustRemember)}</section>
    ${renderVideo(item.videoUrl, item.videoUrlLabel)}
    <section class="panel"><h2>${esc(label("memo"))}</h2><textarea class="memo-field" data-food-memo="${esc(item.id)}" placeholder="${esc(label("memoPlaceholder"))}">${esc(state.memo || "")}</textarea></section>`;
  renderShell(tr(item.title), content, true);
}

function renderFoodSafetyItem(itemId) {
  const item = itemId === householdCookingRulesItem.id
    ? householdCookingRulesItem
    : foodSafetyItems.find((entry) => entry.id === itemId);
  if (!item) return renderHome();
  const hasInstructions = item.instructions && item.instructions.length > 0;
  const householdRulesAttr = item.id === householdCookingRulesItem.id ? " data-household-cooking-rules" : "";
  const instructionsPanel = hasInstructions ? `<section class="panel"${householdRulesAttr}><h2>${esc(label("instructions"))}</h2>${orderedList(item.instructions)}</section>` : "";
  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), "#fdf1ee", label("safetyReferences"), primaryPhoto(item.photos))}
    ${instructionsPanel}
    ${renderPhotos(item.photos)}
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2>${noteList(item.mustRemember)}</section>`;
  renderShell(tr(item.title), content, true);
}

function renderOfficialReferencesPanel() {
  if (!officialReferences || !officialReferences.items) return "";
  return `
    <section class="panel official-references">
      <h2>${esc(tr(officialReferences.title))}</h2>
      <ul class="note-list">
        ${officialReferences.items.map((link) => `
          <li>
            <span>•</span>
            <span><a href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(tr(link.title))}</a></span>
          </li>
        `).join("")}
      </ul>
    </section>`;
}

function renderRecipeIndex(item) {
  const isHuman = item.id === "human-food";
  const filteredRecipes = recipes.filter((r) => isHuman ? r.type === "human" : (!r.type || r.type === "dog"));
  if (isHuman) {
    const promotedRecipes = ["banana-toast", "bak-kut-teh"];
    filteredRecipes.sort((a, b) => {
      const aIndex = promotedRecipes.indexOf(a.id);
      const bIndex = promotedRecipes.indexOf(b.id);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  } else {
    const toppingOrder = ["sasami", "nako-chicken-apple-vegetable-meal-prep", "whitefish", "chickenbreast"];
    filteredRecipes.sort((a, b) => toppingOrder.indexOf(a.id) - toppingOrder.indexOf(b.id));
  }
  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), "#fff0eb", isHuman ? label("humanRecipes") : label("recipes"))}
    ${isHuman ? renderFoodMemory(item) : ""}
    <section class="card-list">${filteredRecipes.map(renderRecipeCard).join("") || emptyState()}</section>`;
  renderShell(tr(item.title), content, true);
}

function renderRecipe(recipeId) {
  const recipe = recipes.find((entry) => entry.id === recipeId);
  if (!recipe) return renderHome();
  
  const isHuman = recipe.type === "human";
  const mainPhoto = primaryPhoto(recipe.photos);
  const supportingPhotos = isHuman && mainPhoto ? recipe.photos.slice(1) : recipe.photos;
  
  let heroHtml = "";
  let headPhoto = mainPhoto;
  
  if (isHuman && mainPhoto) {
    heroHtml = `<div class="recipe-hero-image"><img src="${esc(mainPhoto.src)}" alt="${esc(tr(mainPhoto.alt || mainPhoto.caption))}" /></div>`;
    headPhoto = null;
  }
  
  const badgesHtml = isHuman ? `<div class="recipe-badges detail-badges">${renderRecipeBadges(recipe)}</div>` : "";
  
  const content = `
    ${heroHtml}
    ${isHuman ? renderNutritionSummary(recipe) : ""}
    ${renderHead(recipe.icon, tr(recipe.title), tr(recipe.description), "#fff0eb", label("recipes"), headPhoto)}
    ${badgesHtml}
    ${renderPhotos(supportingPhotos)}
    <section class="panel"><h2>${esc(label("recipeName"))}</h2><p>${esc(tr(recipe.title))}</p></section>
    <section class="panel"><h2>${esc(label("ingredients"))}</h2><ul class="ingredient-list">${recipe.ingredients.map((item, index) => renderIngredient(item, recipe.id, index)).join("")}</ul></section>
    <section class="panel"><h2>${esc(label("method"))}</h2>${orderedList(recipe.method)}</section>
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2><p>${esc(tr(recipe.note))}</p></section>`;
  renderShell(tr(recipe.title), content, true);
}

function renderNutritionSummary(recipe) {
  if (!recipe.nutrition) return "";

  return `
    <section class="nutrition-summary">
      <div class="nutrition-summary-header">
        <span class="nutrition-summary-title">${esc(label("nutritionEstimate"))}</span>
        <span class="nutrition-whole-label">${esc(label("nutritionWholeRecipe"))}</span>
      </div>
      <div class="nutrition-grid">
        <div class="nutrition-stat">
          <span class="nutrition-value">${recipe.nutrition.calories} <span class="nutrition-unit">kcal</span></span>
          <span class="nutrition-label">${esc(label("calories"))}</span>
        </div>
        <div class="nutrition-stat">
          <span class="nutrition-value">${recipe.nutrition.protein} <span class="nutrition-unit">g</span></span>
          <span class="nutrition-label">${esc(label("protein"))}</span>
        </div>
        <div class="nutrition-stat">
          <span class="nutrition-value">${recipe.nutrition.carbs} <span class="nutrition-unit">g</span></span>
          <span class="nutrition-label">${esc(label("carbohydrates"))}</span>
        </div>
        <div class="nutrition-stat">
          <span class="nutrition-value">${recipe.nutrition.fat} <span class="nutrition-unit">g</span></span>
          <span class="nutrition-label">${esc(label("fat"))}</span>
        </div>
      </div>
      <div class="nutrition-basis">
        <strong>${esc(label("nutritionBasis"))}:</strong> ${esc(tr(recipe.nutrition.basis))}
      </div>
      <div class="nutrition-disclaimer">
        ${esc(label("nutritionDisclaimer"))}
      </div>
    </section>
  `;
}
