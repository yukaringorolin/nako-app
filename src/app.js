try {
  localStorage.removeItem("nako-household-code");
} catch {}

const LANG_KEY = "nako-care-language";
const STATE_KEY = "nako-care-state-v2";
const NAKO_LOGO_SRC = "assets/nako-logo.png";
const { langs, ui, homeSections, foodItems, foodSafetyItems, householdCookingRulesItem, officialReferences, routineTasks, recipes, cookingRules, additionalResources, trainingData, gamificationData } = window.nakoData;
const ingredientCatalog = window.nakoIngredientCatalog || {};
const routineTracking = window.nakoRoutineTracking;

const safeStorage = window.nakoStorage.createSafeStorage(localStorage);

const savedLang = safeStorage.getItem(LANG_KEY);
let currentLang = langs.includes(savedLang) ? savedLang : "mm";
let appState = loadState();
migrateTextDraftState();
let activeTextDraftKeys = new Set();
migrateTrainingState();
migrateRoutineTrackingState();
let selectedArchiveYear = null;
let firebaseStatus = window.nakoFirebase?.status?.() || { mode: "local" };
let diarySaveInProgress = false;
let diaryStatusMessage = "";
let selectedAppetiteDate = "";
let appetiteStatusMessage = "";
let selectedIngredientChoices = {};
let selectedHumanRecipeIds = [];
let humanMenuShareStatus = "";
let trainingTab = "commands";
let trainingFilters = { category: "all", priority: "all", score: "all", recent: "all" };
let trainingHistoryCommandId = "";
let trainingExpandedCommandId = "";
let trainingDraft = null;
let trainingSuccessMessage = "";
let routineStatusMessage = "";
let routineUndoRecord = null;
let routineUndoTimer = null;
let gamificationNotice = null;
let gamificationNoticeTimer = null;
const routineTodayAtLoad = routineTracking.singaporeDateKey();
let routineHistoryFilters = {
  task: "all",
  cadence: "all",
  from: routineTracking.addDays(routineTodayAtLoad, -55),
  to: routineTodayAtLoad
};
const scrollPositions = {};
let activeRouteKey = null;
const app = document.querySelector("#app");

// Global search state variables
let searchQuery = "";
let searchResults = [];
let searchFocused = false;
let selectedResultIndex = -1;
let pendingDestination = null;
const searchIndex = window.nakoSearch.buildSearchIndex(window.nakoData);

window.addEventListener("hashchange", render);
document.addEventListener("click", handleClick);
document.addEventListener("input", handleInput);
document.addEventListener("change", handleChange);
document.addEventListener("blur", handleBlur, true);
document.addEventListener("submit", handleSubmit);
document.addEventListener("keydown", handleKeydown);
document.addEventListener("focusin", handleFocusIn);
document.addEventListener("error", handleGamificationImageError, true);
const gamificationMigration = initializeGamificationState();
if (gamificationMigration.showAlbumReady) showGamificationNotice("albumReady");
initFirebaseSync();
render();

/* ==========================================================================
   SECTION 6: FIREBASE DATABASE SYNC INTEGRATION
   ========================================================================== */
function getFoodState(id) {
  appState.food ||= {};
  appState.food[id] ||= { memo: "", updatedAt: "" };
  return appState.food[id];
}

function getDiaryState() {
  appState.diary ||= {};
  appState.diary.entries ||= {};
  return appState.diary;
}

function migrateTextDraftState() {
  const changed = window.nakoTextDrafts?.migrateLegacyDiaryDrafts?.(appState, nowIso());
  appState.textDrafts ||= {};
  if (changed) safeStorage.setItem(STATE_KEY, JSON.stringify(appState));
}

function textDraft(kind, id) {
  const key = window.nakoTextDrafts?.key?.(kind, id);
  return key ? window.nakoTextDrafts.normalize(appState.textDrafts?.[key]) : null;
}

function updateTextDraft(kind, id, text, mode, surface) {
  const key = window.nakoTextDrafts?.key?.(kind, id);
  if (!key) return null;
  appState.textDrafts ||= {};
  appState.textDrafts[key] = {
    text: String(text || ""),
    mode: mode === "edit" ? "edit" : "create",
    surface: String(surface || ""),
    updatedAt: nowIso()
  };
  activeTextDraftKeys.add(key);
  saveState({ remote: false });
  return appState.textDrafts[key];
}

function clearTextDraft(kind, id) {
  const key = window.nakoTextDrafts?.key?.(kind, id);
  if (!key || !appState.textDrafts?.[key]) return;
  delete appState.textDrafts[key];
  activeTextDraftKeys.delete(key);
  saveState({ remote: false });
}

function textDraftWasRecovered(kind, id, surface) {
  const key = window.nakoTextDrafts?.key?.(kind, id);
  const draft = textDraft(kind, id);
  return Boolean(key && draft?.text && draft.surface === surface && !activeTextDraftKeys.has(key));
}

function initFirebaseSync() {
  const firebaseSync = window.nakoFirebase;
  if (!firebaseSync) return;

  firebaseSync.onStatus((status) => {
    firebaseStatus = status;
    refreshSyncIndicator();
  });

  firebaseSync.startStateSync({
    getLocalState: () => sharedRemoteState(),
    applyRemoteState: (nextState) => {
      const previousSignature = appStateSignature(appState);
      const localRoutineCompletions = routineRecords();
      const localTextDrafts = { ...(appState.textDrafts || {}) };
      const localTrainingMigrations = appState.training?.contentMigrations
        ? { ...appState.training.contentMigrations }
        : null;
      const remoteState = nextState && typeof nextState === "object" ? nextState : {};
      appState = window.nakoWeightHistory?.applyToState?.(remoteState) || remoteState;
      appState.routineCompletions = localRoutineCompletions;
      appState.textDrafts = localTextDrafts;
      if (localTrainingMigrations) {
        appState.training ||= {};
        appState.training.contentMigrations = localTrainingMigrations;
      }
      migrateTrainingState();
      migrateRoutineTrackingState();
      window.nakoGamification?.syncUnlocks?.(appState, new Date());
      saveState({ remote: false });
      if (appStateSignature(appState) !== previousSignature) renderUnlessEditing();
    }
  });

  firebaseSync.startRoutineCompletionSync?.({
    getLocalRecords: () => routineRecords(),
    applyRemoteRecords: (records) => {
      const previousSignature = appStateSignature(routineRecords());
      const normalizedRecords = routineTracking.normalizeRecords(records);
      appState.routineCompletions = normalizedRecords;
      window.nakoGamification?.syncUnlocks?.(appState, new Date());
      saveState({ remote: false });
      if (appStateSignature(normalizedRecords) !== previousSignature) renderUnlessEditing();
    }
  });
}

function ingredientImage(key) {
  if (!key || ingredientCatalog[key]?.file === false) return null;
  const filename = ingredientCatalog[key]?.file || `${key}.jpg`;
  return `assets/ingredients/${filename}`;
}

function esc(value) {
  return window.nakoHtml.escapeHtml(value);
}

function richText(value) {
  return window.nakoHtml.simpleRichText(value);
}

function handleChange(event) {
  const appetitePercentage = event.target.closest("[data-appetite-percentage]");
  if (appetitePercentage) return saveAppetitePercentage(appetitePercentage.dataset.appetiteDate, appetitePercentage.value);
  const routineFilter = event.target.closest("[data-routine-filter]");
  if (routineFilter) {
    routineHistoryFilters[routineFilter.dataset.routineFilter] = routineFilter.value;
    return render();
  }
  const completionDate = event.target.closest("[data-completion-date]");
  if (completionDate) return moveRoutineCompletion(completionDate.dataset.completionDate, completionDate.value);
  const trainingFilter = event.target.closest("[data-training-filter]");
  if (trainingFilter) { trainingFilters[trainingFilter.dataset.trainingFilter] = trainingFilter.value; return render(); }
  const trainingField = event.target.closest("[data-training-input]");
  if (trainingField && trainingDraft && trainingField.dataset.trainingField) {
    trainingDraft[trainingField.dataset.trainingField] = trainingField.value;
    return saveStateDebounced();
  }
  const weightInput = event.target.closest("[data-weight-date]");
  if (weightInput) {
    updateWeightInput(weightInput, { commit: true });
    refreshWeightTrackingReadouts();
    return;
  }
  const yearSelect = event.target.closest("[data-archive-year-select]");
  if (yearSelect) {
    selectedArchiveYear = parseInt(yearSelect.value);
    render();
  }
}
