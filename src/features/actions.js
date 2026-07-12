/* ==========================================================================
   SECTION 5: INTERACTIVE EVENT LISTENERS & CONTROLLERS
   ========================================================================== */
function handleClick(event) {
  // Close search dropdown on click outside
  if (!event.target.closest(".search-container")) {
    if (searchFocused) {
      searchFocused = false;
      selectedResultIndex = -1;
      updateSearchResultsDropdown();
    }
  }

  const clearBtn = event.target.closest(".search-clear-btn");
  if (clearBtn) {
    searchQuery = "";
    selectedResultIndex = -1;
    searchResults = [];
    const input = document.getElementById("global-search-input");
    if (input) {
      input.value = "";
      input.focus();
    }
    updateSearchResultsDropdown();
    return;
  }

  const quickItem = event.target.closest("[data-search-quick]");
  if (quickItem) {
    const id = quickItem.dataset.searchQuick;
    const route = quickItem.dataset.searchRoute;
    let type = "section";
    if (id === "nako-emergency") type = "routine";
    else if (id === "nako-weight") type = "routine";
    else if (id === "routine-checkin") type = "routine-checkin";
    else if (id === "dog-training") type = "training-command";
    else if (id === "food-safety") type = "section";
    else if (id === "nako-toppings") type = "food";

    let originalItem = { id };
    if (id === "nako-emergency") originalItem = { id: "nako-emergency" };
    else if (id === "nako-weight") originalItem = { id: "nako-weight-tracking" };
    else if (id === "dog-training") originalItem = { id: "nako-training-fun" };
    else if (id === "food-safety") originalItem = { id: "food-safety" };
    else if (id === "nako-toppings") originalItem = { id: "recipes" };

    navigateToSearchResult({ type, originalItem, route });
    return;
  }

  const resultItem = event.target.closest("[data-search-result-id]");
  if (resultItem) {
    const resultId = resultItem.dataset.searchResultId;
    const result = searchIndex.find(r => r.id === resultId);
    if (result) {
      navigateToSearchResult(result);
    }
    return;
  }

  const routineCheckIn = event.target.closest("[data-routine-checkin]");
  if (routineCheckIn) return go("#routine-checkin");
  const routineHistoryButton = event.target.closest("[data-routine-history]");
  if (routineHistoryButton) return go("#routine-history");
  const routineComplete = event.target.closest("[data-routine-complete]");
  if (routineComplete) return completeRoutine(routineComplete.dataset.routineComplete);
  if (event.target.closest("[data-routine-undo]")) return undoRoutineCompletion();
  const completionRemove = event.target.closest("[data-completion-remove]");
  if (completionRemove && confirm(label("confirmRemoveCompletion"))) return removeRoutineCompletion(completionRemove.dataset.completionRemove);
  const viewFullHistory = event.target.closest("[data-view-full-history]");
  if (viewFullHistory) {
    routineHistoryFilters.task = viewFullHistory.dataset.viewFullHistory;
    routineHistoryFilters.cadence = "all";
    return go("#routine-history");
  }
  const resourceVideo = event.target.closest("[data-resource-video]");
  if (resourceVideo) {
    const embedUrl = resourceVideo.dataset.embedUrl;
    const videoTitle = resourceVideo.dataset.videoTitle;
    resourceVideo.outerHTML = `<div class="resource-video"><iframe src="${esc(embedUrl)}" title="${esc(videoTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    return;
  }
  const back = event.target.closest("[data-back]");
  if (back) return handleBack();
  const langButton = event.target.closest("[data-lang]");
  if (langButton) { currentLang = langButton.dataset.lang; safeStorage.setItem(LANG_KEY, currentLang); return render(); }
  const diarySubmit = event.target.closest("[data-diary-submit]");
  if (diarySubmit) { handleDiarySubmit(diarySubmit.dataset.diarySubmit); return; }
  const diaryWhatsApp = event.target.closest("[data-diary-whatsapp]");
  if (diaryWhatsApp) { openWhatsAppNotice(); return; }
  const ingredientChoice = event.target.closest("[data-ingredient-choice]");
  if (ingredientChoice) {
    selectedIngredientChoices[ingredientChoice.dataset.ingredientChoiceId] = ingredientChoice.dataset.ingredientKey;
    return render();
  }
  const trainingTabButton = event.target.closest("[data-training-tab]");
  if (trainingTabButton) { trainingTab = trainingTabButton.dataset.trainingTab; trainingDraft = null; trainingSuccessMessage = ""; return render(); }
  const trainingFocus = event.target.closest("[data-training-focus]");
  if (trainingFocus) { document.querySelector(`#training-${CSS.escape(trainingFocus.dataset.trainingFocus)}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  const addCommand = event.target.closest("[data-training-add-command]");
  if (addCommand) { newCommandDraft(addCommand.dataset.trainingAddCommand); trainingHistoryCommandId = ""; return render(); }
  const addPlay = event.target.closest("[data-training-add-play]");
  if (addPlay) { newPlayDraft(addPlay.dataset.trainingAddPlay); return render(); }
  const trainingHistory = event.target.closest("[data-training-history]");
  if (trainingHistory) { trainingHistoryCommandId = trainingHistoryCommandId === trainingHistory.dataset.trainingHistory ? "" : trainingHistory.dataset.trainingHistory; return render(); }
  const trainingExpand = event.target.closest("[data-training-expand]");
  if (trainingExpand) { trainingExpandedCommandId = trainingExpandedCommandId === trainingExpand.dataset.trainingExpand ? "" : trainingExpand.dataset.trainingExpand; return render(); }
  if (event.target.closest("[data-training-cancel]")) { trainingDraft = null; return render(); }
  const editCommand = event.target.closest("[data-training-edit-command]");
  if (editCommand) { const log = getTrainingState().commandLogs.find((item) => item.id === editCommand.dataset.trainingEditCommand); if (log) { newCommandDraft(log.commandId, log); trainingHistoryCommandId = log.commandId; return render(); } }
  const deleteCommand = event.target.closest("[data-training-delete-command]");
  if (deleteCommand && confirm(tl("confirmDeleteTraining"))) {
    if (deleteCommandLog(deleteCommand.dataset.trainingDeleteCommand)) return render();
    return;
  }
  const editPlay = event.target.closest("[data-training-edit-play]");
  if (editPlay) { const log = getTrainingState().playLogs.find((item) => item.id === editPlay.dataset.trainingEditPlay); if (log) { newPlayDraft(log.activityId, log); trainingTab = "play"; return render(); } }
  const deletePlay = event.target.closest("[data-training-delete-play]");
  if (deletePlay && confirm(tl("confirmDeletePlay"))) { const training = getTrainingState(); training.playLogs = training.playLogs.filter((item) => item.id !== deletePlay.dataset.trainingDeletePlay); saveState(); return render(); }
  const section = event.target.closest("[data-section]");
  if (section) return go(`#section/${section.dataset.section}`);
  const routine = event.target.closest("[data-routine]");
  if (routine) return go(`#routine/${routine.dataset.routine}`);
  const food = event.target.closest("[data-food]");
  if (food) return go(`#food/${food.dataset.food}`);
  const foodSafety = event.target.closest("[data-food-safety]");
  if (foodSafety) return go(`#food-safety/${foodSafety.dataset.foodSafety}`);
  const recipe = event.target.closest("[data-recipe]");
  if (recipe) return go(`#recipe/${recipe.dataset.recipe}`);
}

function handleBack() {
  const route = parseRoute();
  if (route.view === "routine-checkin") {
    go("");
  } else if (route.view === "routine-history") {
    go("#routine-checkin");
  } else if (route.view === "section") {
    go("");
  } else if (route.view === "routine") {
    const task = routineTasks.find((entry) => entry.id === route.routineId);
    if (task && task.frequencyBucket) {
      go(`#section/${task.frequencyBucket}`);
    } else {
      go("");
    }
  } else if (route.view === "food") {
    go("#section/food");
  } else if (route.view === "food-safety-item") {
    go("#section/food-safety");
  } else if (route.view === "recipe") {
    const r = recipes.find((entry) => entry.id === route.recipeId);
    if (r && r.type === "human") {
      go("#food/human-food");
    } else {
      go("#food/recipes");
    }
  } else {
    go("");
  }
}


function handleDiarySubmit(dateKey) {
  const draft = getDiaryDraft(dateKey);
  const text = String(draft.text || "").trim();

  if (!text) {
    diaryStatusMessage = label("diaryEmptyError");
    alert(label("diaryEmptyError"));
    render();
    return;
  }

  diarySaveInProgress = true;
  diaryStatusMessage = label("diarySaving");

  const now = nowIso();
  const diary = getDiaryState();
  const previousEntry = diary.entries[dateKey] || {};
  const translations = previousEntry.translations || {};

  const hasTranslations = translations.jp || translations.mm;
  const textChanged = previousEntry.originalText && previousEntry.originalText !== text;
  const translationReviewRequired = hasTranslations && textChanged ? true : (previousEntry.translationReviewRequired || false);

  diary.entries[dateKey] = {
    dateKey,
    originalText: text,
    translations,
    translationReviewRequired,
    status: "saved",
    submittedAt: previousEntry.submittedAt || now,
    updatedAt: now
  };
  diary.drafts[dateKey] = { text, updatedAt: now };
  saveState();
  diarySaveInProgress = false;
  diaryStatusMessage = label("diarySaved");
  render();
  openWhatsAppNotice();
}

function handleSubmit(event) {
  const form = event.target.closest("[data-training-form]");
  if (!form || !trainingDraft || trainingDraft.saving) return;
  event.preventDefault();
  trainingDraft.saving = true;
  if (trainingDraft.kind === "command") return saveCommandLog();
  savePlayLog();
}

function validInteger(value, min, max = Infinity) {
  const number = Number(value);
  return Number.isInteger(number) && number >= min && number <= max ? number : null;
}

function saveCommandLog() {
  const draft = trainingDraft;
  const score = validInteger(draft.score, 0, 10);
  const successes = validInteger(draft.successes, 0);
  const attempts = validInteger(draft.attempts, 0);
  if (score === null || successes === null || attempts === null || successes > attempts) {
    trainingDraft.saving = false;
    alert(tl("invalidCommandLog"));
    return;
  }
  const training = getTrainingState();
  const timestamp = draft.date || nowIso();
  const log = { id: draft.id || uniqueId(), commandId: draft.commandId, score, rewardReliance: Number(draft.rewardReliance), environment: Number(draft.environment), successes, attempts, durationMinutes: draft.durationMinutes === "" ? null : Math.max(0, Number(draft.durationMinutes) || 0), comment: String(draft.comment || ""), createdAt: timestamp };
  const existingIndex = training.commandLogs.findIndex((item) => item.id === log.id);
  if (existingIndex >= 0) training.commandLogs[existingIndex] = log;
  else training.commandLogs.push(log);
  refreshCommandFromLogs(log.commandId);
  saveState();
  trainingDraft = null;
  trainingHistoryCommandId = log.commandId;
  trainingSuccessMessage = tl("saved");
  render();
}

function refreshCommandFromLogs(commandId) {
  return window.nakoTrainingLogState.refreshCommandFromLogs({
    training: getTrainingState(),
    commandId,
    commands: trainingData.commands,
    baselineCommandState,
    nowIso
  });
}

function deleteCommandLog(logId) {
  const result = window.nakoTrainingLogState.deleteCommandLog({
    training: getTrainingState(),
    logId,
    commands: trainingData.commands,
    baselineCommandState,
    nowIso
  });
  if (!result.deleted) return false;
  saveState();
  return true;
}

function savePlayLog() {
  const draft = trainingDraft;
  const engagement = validInteger(draft.engagement, 1, 5);
  const energyBefore = validInteger(draft.energyBefore, 1, 5);
  const energyAfter = validInteger(draft.energyAfter, 1, 5);
  if (engagement === null || energyBefore === null || energyAfter === null) {
    trainingDraft.saving = false;
    alert(tl("invalidPlayLog"));
    return;
  }
  const training = getTrainingState();
  const log = { id: draft.id || uniqueId(), activityId: draft.activityId, durationMinutes: draft.durationMinutes === "" ? null : Math.max(0, Number(draft.durationMinutes) || 0), engagement, energyBefore, energyAfter, dropResponse: String(draft.dropResponse || ""), allDoneResponse: String(draft.allDoneResponse || ""), favouriteToy: String(draft.favouriteToy || ""), comment: String(draft.comment || ""), unusual: String(draft.unusual || ""), createdAt: draft.date || nowIso() };
  const index = training.playLogs.findIndex((item) => item.id === log.id);
  if (index >= 0) training.playLogs[index] = log;
  else training.playLogs.push(log);
  saveState();
  trainingDraft = null;
  trainingSuccessMessage = tl("saved");
  render();
}

function openWhatsAppNotice() {
  window.open(buildWhatsAppNoticeUrl(), "_blank", "noopener,noreferrer");
}

function buildWhatsAppNoticeUrl() {
  return `https://wa.me/?text=${encodeURIComponent(label("diaryWhatsAppMessage"))}`;
}

function handleInput(event) {
  const searchInput = event.target.closest("#global-search-input");
  if (searchInput) {
    searchQuery = searchInput.value;
    selectedResultIndex = -1;
    updateSearchResultsDropdown();
    return;
  }
  const weightInput = event.target.closest("[data-weight-date]");
  if (weightInput) return updateWeightInput(weightInput, { remoteCompletion: false });
  const trainingField = event.target.closest("[data-training-input]");
  if (trainingField) {
    if (trainingField.dataset.trainingSetting) {
      getTrainingState()[trainingField.dataset.trainingSetting] = trainingField.value;
      return saveStateDebounced();
    }
    if (trainingDraft && trainingField.dataset.trainingField) {
      trainingDraft[trainingField.dataset.trainingField] = trainingField.value;
      return saveStateDebounced();
    }
  }
  const foodMemo = event.target.closest("[data-food-memo]");
  if (foodMemo) {
    const foodState = getFoodState(foodMemo.dataset.foodMemo);
    foodState.memo = foodMemo.value;
    foodState.updatedAt = nowIso();
    return saveState();
  }
  const diaryText = event.target.closest("[data-diary-text]");
  if (diaryText) {
    const draft = getDiaryDraft(diaryText.dataset.diaryText);
    draft.text = diaryText.value;
    draft.updatedAt = nowIso();
    diaryStatusMessage = "";
    return saveState({ remote: false });
  }
  const diaryTrans = event.target.closest("[data-diary-translation-date]");
  if (diaryTrans) {
    const dateKey = diaryTrans.dataset.diaryTranslationDate;
    const lang = diaryTrans.dataset.diaryTranslationLang;
    const diary = getDiaryState();
    const entry = diary.entries[dateKey];
    if (entry) {
      entry.translations ||= {};
      entry.translations[lang] = diaryTrans.value;
      entry.translationReviewRequired = false;
      entry.updatedAt = nowIso();
    }
    saveStateDebounced();
    return;
  }
}

function handleBlur(event) {
  if (event.target.closest?.("[data-training-input]")) saveState();
  const diaryText = event.target.closest?.("[data-diary-text]");
  if (diaryText) saveState();
  const diaryTrans = event.target.closest?.("[data-diary-translation-date]");
  if (diaryTrans) saveState();
  flushPendingRenderAfterEdit();
}
