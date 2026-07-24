/* ==========================================================================
   SECTION 5: INTERACTIVE EVENT LISTENERS & CONTROLLERS
   ========================================================================== */
function handleClick(event) {
  if (event.target.closest("[data-gamification-dismiss]")) {
    dismissGamificationNotice();
    return;
  }
  const textEdit = event.target.closest("[data-text-edit-kind]");
  if (textEdit) return beginExplicitTextEdit(textEdit.dataset.textEditKind, textEdit.dataset.textEditId, textEdit.dataset.textEditSurface);
  const textSave = event.target.closest("[data-text-save-kind]");
  if (textSave) return saveExplicitTextDraft(textSave.dataset.textSaveKind, textSave.dataset.textSaveId, textSave.dataset.textSaveSurface);
  const textCancel = event.target.closest("[data-text-cancel-kind]");
  if (textCancel) return cancelExplicitTextEdit(textCancel.dataset.textCancelKind, textCancel.dataset.textCancelId);
  const textDelete = event.target.closest("[data-text-delete-kind]");
  if (textDelete) return deleteExplicitText(textDelete.dataset.textDeleteKind, textDelete.dataset.textDeleteId);
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
  if (event.target.closest("[data-meal-logs-refresh]")) return refreshMealLogs();
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
  const diaryWhatsApp = event.target.closest("[data-diary-whatsapp]");
  if (diaryWhatsApp) { openWhatsAppNotice(); return; }
  const humanMenuToggle = event.target.closest("[data-human-menu-toggle]");
  if (humanMenuToggle) {
    const recipeId = humanMenuToggle.dataset.humanMenuToggle;
    if (!recipes.some((recipe) => recipe.id === recipeId && recipe.type === "human")) return;
    humanMenuShareStatus = "";
    selectedHumanRecipeIds = window.nakoMenuShare.toggleSelection(
      selectedHumanRecipeIds,
      recipeId,
      window.nakoMenuShare.DEFAULT_MAX_SELECTIONS
    );
    return render();
  }
  if (event.target.closest("[data-human-menu-share]")) return shareHumanMenu();
  const appetiteSave = event.target.closest("[data-appetite-save]");
  if (appetiteSave) {
    const appetiteSlider = appetiteSave.closest(".appetite-slider-card")?.querySelector("[data-appetite-percentage]");
    if (appetiteSlider) return saveAppetitePercentage(appetiteSlider.dataset.appetiteDate, appetiteSlider.value);
    return;
  }
  const appetiteEdit = event.target.closest("[data-appetite-edit]");
  if (appetiteEdit) return editAppetiteDate(appetiteEdit.dataset.appetiteEdit);
  if (event.target.closest("[data-appetite-today]")) return editAppetiteDate(routineTracking.singaporeDateKey());
  const ingredientChoice = event.target.closest("[data-ingredient-choice]");
  if (ingredientChoice) {
    selectedIngredientChoices[ingredientChoice.dataset.ingredientChoiceId] = ingredientChoice.dataset.ingredientKey;
    return render();
  }
  const groceryItemSummary = event.target.closest(".grocery-item-summary");
  if (groceryItemSummary) {
    const selectedItem = groceryItemSummary.closest("[data-grocery-item]");
    document.querySelectorAll("[data-grocery-item][open]").forEach((item) => {
      if (item !== selectedItem) item.open = false;
    });
    return;
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
  if (editCommand) { const log = getTrainingState().commandLogs.find((item) => !item.deleted && item.id === editCommand.dataset.trainingEditCommand); if (log) { newCommandDraft(log.commandId, log); trainingHistoryCommandId = log.commandId; return render(); } }
  const deleteCommand = event.target.closest("[data-training-delete-command]");
  if (deleteCommand && confirm(tl("confirmDeleteTraining"))) {
    if (deleteCommandLog(deleteCommand.dataset.trainingDeleteCommand)) return render();
    return;
  }
  const editPlay = event.target.closest("[data-training-edit-play]");
  if (editPlay) { const log = getTrainingState().playLogs.find((item) => !item.deleted && item.id === editPlay.dataset.trainingEditPlay); if (log) { newPlayDraft(log.activityId, log); trainingTab = "play"; return render(); } }
  const deletePlay = event.target.closest("[data-training-delete-play]");
  if (deletePlay && confirm(tl("confirmDeletePlay"))) {
    const result = window.nakoTrainingLogState.deletePlayLog({
      training: getTrainingState(),
      logId: deletePlay.dataset.trainingDeletePlay,
      nowIso
    });
    if (result.deleted) { saveState(); return render(); }
    return;
  }
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
  return window.nakoNavigation.backOrFallback(window.history, () => go(""));
}

function savedExplicitText(kind, id) {
  if (kind === "routine") return String(routineRecords()[id]?.note || "");
  if (kind === "appetite") return String(window.nakoAppetiteTracking.normalizeEntry(getAppetiteEntries()[id], id)?.note || "");
  if (kind === "diary") {
    const entry = getDiaryState().entries[id];
    return entry && !entry.deleted ? String(entry.originalText || "") : "";
  }
  return "";
}

function beginExplicitTextEdit(kind, id, surface) {
  const text = savedExplicitText(kind, id);
  if (!text) return;
  if (kind === "appetite") selectedAppetiteDate = id;
  updateTextDraft(kind, id, text, "edit", surface);
  render();
  if (kind === "appetite") document.querySelector("[data-appetite-panel]")?.scrollIntoView({ block: "start" });
}

function cancelExplicitTextEdit(kind, id) {
  clearTextDraft(kind, id);
  render();
}

function saveExplicitTextDraft(kind, id, surface) {
  const draft = textDraft(kind, id);
  if (!draft || draft.surface !== surface) return;
  const text = String(draft.text || "").trim();
  if (!text) {
    alert(label("textEmptyError"));
    return;
  }
  const saved = kind === "routine"
    ? saveRoutineCompletionNote(id, text)
    : kind === "appetite"
      ? saveAppetiteNote(id, text)
      : kind === "diary"
        ? saveDiaryText(id, text)
        : false;
  if (!saved) return;
  clearTextDraft(kind, id);
  render();
  if (kind === "diary") openWhatsAppNotice();
}

function deleteExplicitText(kind, id) {
  const confirmationKey = kind === "diary" ? "confirmDeleteDiaryEntry" : "confirmDeleteNote";
  if (!confirm(label(confirmationKey))) return;
  const deleted = kind === "routine"
    ? deleteRoutineCompletionNote(id)
    : kind === "appetite"
      ? deleteAppetiteNote(id)
      : kind === "diary"
        ? deleteDiaryEntry(id)
        : false;
  if (!deleted) return;
  clearTextDraft(kind, id);
  render();
}


function saveDiaryText(dateKey, text) {
  diarySaveInProgress = true;
  diaryStatusMessage = label("diarySaving");

  const now = nowIso();
  const diary = getDiaryState();
  const existingEntry = diary.entries[dateKey];
  const previousEntry = existingEntry && !existingEntry.deleted ? existingEntry : {};
  const isNewEntry = !previousEntry.submittedAt;
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
    updatedAt: now,
    deleted: false,
    deletedAt: ""
  };
  if (isNewEntry) celebrateCareSave("diary", { taskTitle: gamificationText("taskDiary") });
  saveState();
  diarySaveInProgress = false;
  diaryStatusMessage = label("diarySaved");
  return true;
}

function deleteDiaryEntry(dateKey) {
  const diary = getDiaryState();
  const entry = diary.entries[dateKey];
  if (!entry || entry.deleted) return false;
  const now = nowIso();
  diary.entries[dateKey] = {
    ...entry,
    originalText: "",
    translations: {},
    translationReviewRequired: false,
    status: "deleted",
    deleted: true,
    deletedAt: now,
    updatedAt: now
  };
  diaryStatusMessage = label("diaryDeleted");
  saveState();
  return true;
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
  const log = { id: draft.id || uniqueId(), commandId: draft.commandId, score, rewardReliance: Number(draft.rewardReliance), environment: Number(draft.environment), successes, attempts, durationMinutes: draft.durationMinutes === "" ? null : Math.max(0, Number(draft.durationMinutes) || 0), comment: String(draft.comment || ""), createdAt: timestamp, updatedAt: nowIso() };
  const existingIndex = training.commandLogs.findIndex((item) => item.id === log.id);
  const isNewLog = existingIndex < 0;
  const previousBest = window.nakoGamification.previousBestScore(training.commandLogs, log.commandId, log.id);
  const personalBest = isNewLog && previousBest !== null && log.score > previousBest;
  const commandTitle = tr(trainingData.commands.find((item) => item.id === log.commandId)?.title);
  if (existingIndex >= 0) training.commandLogs[existingIndex] = log;
  else training.commandLogs.push(log);
  refreshCommandFromLogs(log.commandId);
  if (isNewLog) celebrateCareSave("training", { personalBest, commandTitle, taskTitle: commandTitle });
  saveState();
  trainingDraft = null;
  trainingHistoryCommandId = log.commandId;
  trainingSuccessMessage = isNewLog
    ? noticeMessage("training", { personalBest, commandTitle })
    : tl("saved");
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
  const log = { id: draft.id || uniqueId(), activityId: draft.activityId, durationMinutes: draft.durationMinutes === "" ? null : Math.max(0, Number(draft.durationMinutes) || 0), engagement, energyBefore, energyAfter, dropResponse: String(draft.dropResponse || ""), allDoneResponse: String(draft.allDoneResponse || ""), favouriteToy: String(draft.favouriteToy || ""), comment: String(draft.comment || ""), unusual: String(draft.unusual || ""), createdAt: draft.date || nowIso(), updatedAt: nowIso() };
  const index = training.playLogs.findIndex((item) => item.id === log.id);
  const isNewLog = index < 0;
  if (index >= 0) training.playLogs[index] = log;
  else training.playLogs.push(log);
  const activityTitle = tr(trainingData.activities.find((item) => item.id === log.activityId)?.title);
  if (isNewLog) celebrateCareSave("play", { taskTitle: activityTitle });
  saveState();
  trainingDraft = null;
  trainingSuccessMessage = isNewLog ? noticeMessage("play", {}, gamificationToastFamily("purple-play")) : tl("saved");
  render();
}

function openWhatsAppNotice() {
  window.open(buildWhatsAppNoticeUrl(), "_blank", "noopener,noreferrer");
}

function buildWhatsAppNoticeUrl() {
  return `https://wa.me/?text=${encodeURIComponent(label("diaryWhatsAppMessage"))}`;
}

async function shareHumanMenu() {
  const message = window.nakoMenuShare.buildMenuMessage({
    selectedIds: selectedHumanRecipeIds,
    recipes,
    language: window.nakoMenuShare.DEFAULT_LANGUAGE,
    intro: ui.mm.menuShareIntro,
    ingredientsHeading: ui.mm.menuShareIngredients
  });
  if (!message) return;
  const result = await window.nakoMenuShare.forwardMenuText(message, {
    share: typeof navigator.share === "function" ? (payload) => navigator.share(payload) : null,
    copy: (text) => copyHumanMenuText(text)
  });
  if (result === "shared" || result === "copied") selectedHumanRecipeIds = [];
  humanMenuShareStatus = result === "shared"
    ? label("menuShared")
    : result === "copied"
      ? label("menuCopied")
      : result === "failed"
        ? label("menuShareFailed")
        : "";
  render();
}

async function copyHumanMenuText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {}
  }
  const source = document.createElement("textarea");
  source.className = "clipboard-copy-source";
  source.value = text;
  source.readOnly = true;
  source.setAttribute("aria-hidden", "true");
  document.body.append(source);
  try {
    source.select();
    source.setSelectionRange(0, source.value.length);
    if (!document.execCommand?.("copy")) throw new Error("Clipboard copy failed");
  } finally {
    source.remove();
  }
}

function handleInput(event) {
  const appetitePercentage = event.target.closest("[data-appetite-percentage]");
  if (appetitePercentage) return updateAppetitePercentagePreview(appetitePercentage);
  const explicitText = event.target.closest("[data-text-draft-kind]");
  if (explicitText) {
    updateTextDraft(
      explicitText.dataset.textDraftKind,
      explicitText.dataset.textDraftId,
      explicitText.value,
      explicitText.dataset.textDraftMode,
      explicitText.dataset.textDraftSurface
    );
    const saveButton = explicitText.closest(".explicit-text-editor")?.querySelector("[data-text-save-kind]");
    if (saveButton) saveButton.disabled = !explicitText.value.trim();
    const recovered = explicitText.closest(".explicit-text-editor")?.querySelector(".draft-recovered");
    if (recovered) recovered.remove();
    return;
  }
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
      return updateTrainingSetting(trainingField.dataset.trainingSetting, trainingField.value);
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
  const appetiteMeasurement = event.target.closest("[data-appetite-measurement]");
  if (appetiteMeasurement) return updateAppetiteMeasurement(
    appetiteMeasurement.dataset.appetiteDate,
    appetiteMeasurement.dataset.appetiteMeasurement,
    appetiteMeasurement.value
  );
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
  if (event.target.closest?.("[data-appetite-measurement]")) saveState();
  const diaryTrans = event.target.closest?.("[data-diary-translation-date]");
  if (diaryTrans) saveState();
  flushPendingRenderAfterEdit();
}
