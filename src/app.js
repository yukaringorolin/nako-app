try {
  localStorage.removeItem("nako-household-code");
} catch {}

const LANG_KEY = "nako-care-language";
const STATE_KEY = "nako-care-state-v2";
const NAKO_LOGO_SRC = "assets/nako-logo.png";
const { langs, ui, homeSections, foodItems, foodSafetyItems, householdCookingRulesItem, officialReferences, routineTasks, recipes, cookingRules, additionalResources, trainingData } = window.nakoData;
const ingredientCatalog = window.nakoIngredientCatalog || {};
const routineTracking = window.nakoRoutineTracking;

const safeStorage = window.nakoStorage.createSafeStorage(localStorage);

const savedLang = safeStorage.getItem(LANG_KEY);
let currentLang = langs.includes(savedLang) ? savedLang : "mm";
let appState = loadState();
migrateTrainingState();
migrateRoutineTrackingState();
let selectedArchiveYear = null;
let firebaseStatus = window.nakoFirebase?.status?.() || { mode: "local" };
let diarySaveInProgress = false;
let diaryStatusMessage = "";
let selectedIngredientChoices = {};
let trainingTab = "commands";
let trainingFilters = { category: "all", priority: "all", score: "all", recent: "all" };
let trainingHistoryCommandId = "";
let trainingExpandedCommandId = "";
let trainingDraft = null;
let trainingSuccessMessage = "";
let routineStatusMessage = "";
let routineUndoRecord = null;
let routineUndoTimer = null;
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
  appState.diary.drafts ||= {};
  return appState.diary;
}

function getDiaryDraft(dateKey) {
  const diary = getDiaryState();
  const entry = diary.entries[dateKey];
  const draft = diary.drafts[dateKey];

  if (!draft || typeof draft !== "object") {
    diary.drafts[dateKey] = {
      text: entry?.originalText || "",
      updatedAt: entry?.updatedAt || ""
    };
  }

  return diary.drafts[dateKey];
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
      const localTrainingMigrations = appState.training?.contentMigrations
        ? { ...appState.training.contentMigrations }
        : null;
      appState = nextState && typeof nextState === "object" ? nextState : {};
      appState.routineCompletions = localRoutineCompletions;
      if (localTrainingMigrations) {
        appState.training ||= {};
        appState.training.contentMigrations = localTrainingMigrations;
      }
      migrateRoutineTrackingState();
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
      saveState({ remote: false });
      if (appStateSignature(normalizedRecords) !== previousSignature) renderUnlessEditing();
    }
  });
}

function ingredientImage(key) {
  const filename = ingredientCatalog[key]?.file;
  return filename ? `assets/ingredients/${filename}` : null;
}

function esc(value) {
  return window.nakoHtml.escapeHtml(value);
}

function richText(value) {
  return window.nakoHtml.simpleRichText(value);
}

function handleChange(event) {
  const routineFilter = event.target.closest("[data-routine-filter]");
  if (routineFilter) {
    routineHistoryFilters[routineFilter.dataset.routineFilter] = routineFilter.value;
    return render();
  }
  const completionDate = event.target.closest("[data-completion-date]");
  if (completionDate) return moveRoutineCompletion(completionDate.dataset.completionDate, completionDate.value);
  const completionNote = event.target.closest("[data-completion-note]");
  if (completionNote) return updateRoutineCompletionNote(completionNote.dataset.completionNote, completionNote.value);
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
