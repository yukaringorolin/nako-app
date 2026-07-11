/* ==========================================================================
   SECTION 1: STATE MANAGEMENT & ROUTING HELPERS
   ========================================================================== */
function loadState() {
  return window.nakoStorage.loadJson(safeStorage, STATE_KEY, {});
}

function baselineCommandState(command, updatedAt = nowIso()) {
  return {
    score: command?.initialScore ?? 0,
    rewardReliance: command?.initialRewardReliance ?? 6,
    bestEnvironment: command?.initialEnvironment ?? 6,
    successes: command?.initialSuccesses ?? null,
    attempts: command?.initialAttempts ?? null,
    latestComment: tr(command?.baselineComment),
    lastPracticedAt: command?.initialLastPractisedAt ?? null,
    updatedAt
  };
}

function migrateTrainingState() {
  const training = appState.training;
  if (!training || typeof training !== "object") return;
  training.contentMigrations ||= {};
  const migrationId = "lift-carry-bao-bao-2026-07-11";
  if (training.contentMigrations[migrationId]) return;
  const command = trainingData.commands.find((item) => item.id === "lift-carry");
  const state = training.commands?.[command?.id];
  const hasLogs = training.commandLogs?.some((log) => log.commandId === command?.id);
  const isUntouchedBaseline = state && !hasLogs && Number(state.score) === 0 && !state.lastPracticedAt;
  if (isUntouchedBaseline) Object.assign(state, baselineCommandState(command));
  if (!training.liftCue) training.liftCue = command?.defaultCue || "Bao Bao";
  training.contentMigrations[migrationId] = true;
  safeStorage.setItem(STATE_KEY, JSON.stringify(appState));
}

let translationDebounceTimer = null;
function saveStateDebounced() {
  // Save locally immediately
  saveState({ remote: false });
  // Debounce remote save
  if (translationDebounceTimer) clearTimeout(translationDebounceTimer);
  translationDebounceTimer = setTimeout(() => {
    saveState();
    translationDebounceTimer = null;
  }, 1000);
}

function saveState(options = {}) {
  safeStorage.setItem(STATE_KEY, JSON.stringify(appState));
  if (options.remote !== false) window.nakoFirebase?.saveRemoteState?.(legacyRemoteState());
}

function legacyRemoteState() {
  const state = JSON.parse(JSON.stringify(appState || {}));
  delete state.routineCompletions;
  delete state.routineTrackingMigration;
  return state;
}

window.addEventListener("pagehide", () => {
  if (translationDebounceTimer) {
    clearTimeout(translationDebounceTimer);
    saveState();
    translationDebounceTimer = null;
  }
});

function getWeightValue(val) {
  if (val && typeof val === "object") return val.value;
  return val;
}

function renderUnlessDiaryTyping() {
  if (!isDiaryTextInputActive()) render();
}

function isDiaryTextInputActive() {
  return Boolean(document.activeElement?.matches?.("[data-diary-text], [data-diary-translation-date], [data-training-input]"));
}

function tr(value) {
  if (!value || typeof value !== "object") return value || "";
  return value[currentLang] || value.en || "";
}

function label(key) {
  return ui[currentLang]?.[key] || ui.en[key] || key;
}

function labelWith(key, values = {}) {
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), label(key));
}

function displayRoutineNote(record) {
  if (record?.source === "metric" && Number.isFinite(Number(record.weightKg))) {
    return labelWith("weightNote", { weight: Number(record.weightKg) });
  }
  return record?.note || "";
}

function parseRoute() {
  return window.nakoRouter.parseRouteHash(location.hash);
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}
