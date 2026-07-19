function renderDiaryFeedback(item) {
  const section = item.frequencyBucket ? homeSections.find((entry) => entry.id === item.frequencyBucket) : null;
  const diary = getDiaryState();
  const { dateKey: todayKey, entry } = window.nakoDiaryDate.diaryDay(routineTracking, diary.entries);
  const status = diarySaveInProgress ? "pending" : entry?.submittedAt ? "saved" : "idle";
  const statusText = diarySaveInProgress ? label("diarySaving") : entry?.submittedAt ? diaryEntryStatusLabel(status) : "";
  const statusBadge = statusText ? `<span class="diary-status ${esc(status)}">${esc(statusText)}</span>` : "";
  const message = diaryStatusMessage ? `<p class="diary-message">${esc(diaryStatusMessage)}</p>` : "";
  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), section?.iconBg || "#fff1f2", tr(section?.title || item.frequencyText), primaryPhoto(item.photos))}
    ${entry ? "" : `<section class="panel diary-entry-panel">
      <div class="diary-date-row">
        <span>${esc(label("diaryDate"))}</span>
        <strong>${esc(formatDiaryDate(todayKey))}</strong>
      </div>
      <p class="diary-prompt">${esc(label("diaryPrompt"))}</p>
      ${renderExplicitTextEntry({ kind: "diary", id: todayKey, surface: `diary-${todayKey}`, text: "", addLabelKey: "diaryEntryText", placeholderKey: "diaryPlaceholder", createSaveLabelKey: "diarySubmit", editLabelKey: "editDiary", deleteLabelKey: "deleteDiaryEntry" })}
      ${message}
    </section>`}
    ${entry ? `${statusBadge}${message}` : ""}
    ${renderDiarySavedEntry(entry)}
    <section class="panel">
      <h2>${esc(label("diaryRecent"))}</h2>
      ${renderDiaryHistory()}
    </section>`;
  renderShell(tr(item.title), content, true);
}
function getDiaryDisplayText(entry) {
  if (!entry || entry.deleted) return "";
  if (currentLang === "jp" && entry.translations?.jp) {
    return entry.translations.jp;
  }
  if (currentLang === "mm" && entry.translations?.mm) {
    return entry.translations.mm;
  }
  return entry.originalText || "";
}

function renderDiarySavedEntry(entry) {
  if (!entry || entry.deleted) return "";
  const original = entry.originalText || "";
  const updated = entry.updatedAt ? `<span>${esc(label("diaryLastUpdated"))}: <strong>${esc(formatDiaryTimestamp(entry.updatedAt))}</strong></span>` : "";
  const jpTrans = entry.translations?.jp || "";
  const mmTrans = entry.translations?.mm || "";
  const currentPreview = getDiaryDisplayText(entry);

  const warningHtml = entry.translationReviewRequired
    ? `<div class="translation-warning">
        <span>⚠️</span>
        <span>${esc(label("diaryTranslationWarning"))}</span>
      </div>`
    : "";

  return `<section class="panel diary-saved-panel">
    <div class="diary-panel-head">
      <h2>${esc(label("diarySavedEntry"))}</h2>
      <span class="diary-status saved">${esc(label("diarySavedStatus"))}</span>
    </div>
    <div class="diary-meta-line">${updated}</div>
    
    ${renderExplicitTextEntry({ kind: "diary", id: entry.dateKey, surface: `diary-${entry.dateKey}`, text: original, titleKey: "diaryOriginal", placeholderKey: "diaryPlaceholder", editLabelKey: "editDiary", deleteLabelKey: "deleteDiaryEntry" })}

    <article class="diary-text-card">
      <h3>${esc(label("diaryCurrentLanguagePreview"))} (${currentLang.toUpperCase()})</h3>
      <p>${esc(currentPreview)}</p>
    </article>

    <div class="diary-translations-section">
      <h3>${esc(label("diaryManualTranslations"))}</h3>
      ${warningHtml}
      <div>
        <label class="translation-label">${esc(label("diaryJapaneseTranslation"))}</label>
        <textarea class="diary-field diary-translation-field" data-diary-translation-date="${esc(entry.dateKey)}" data-diary-translation-lang="jp" placeholder="${esc(label("diaryTranslationPlaceholder"))}">${esc(jpTrans)}</textarea>
      </div>
      <div>
        <label class="translation-label">${esc(label("diaryMyanmarTranslation"))}</label>
        <textarea class="diary-field diary-translation-field" data-diary-translation-date="${esc(entry.dateKey)}" data-diary-translation-lang="mm" placeholder="${esc(label("diaryTranslationPlaceholder"))}">${esc(mmTrans)}</textarea>
      </div>
    </div>

    <button class="action-button secondary" data-diary-whatsapp>${esc(label("diaryWhatsApp"))}</button>
  </section>`;
}

function renderDiaryHistory() {
  const entries = Object.values(getDiaryState().entries || {})
    .filter((entry) => entry?.dateKey && entry?.originalText && !entry.deleted)
    .sort((a, b) => String(b.dateKey).localeCompare(String(a.dateKey)))
    .slice(0, 7);

  if (!entries.length) return `<div class="empty-state">${esc(label("diaryNoEntries"))}</div>`;

  return `<div class="diary-history-list">${entries.map((entry) => {
    return `<article class="diary-history-card diary-history-entry">
      <h3>${esc(formatDiaryDate(entry.dateKey))}</h3>
      ${renderExplicitTextEntry({ kind: "diary", id: entry.dateKey, surface: `diary-history-${entry.dateKey}`, text: entry.originalText, displayText: getDiaryDisplayText(entry), titleKey: "diaryEntryText", placeholderKey: "diaryPlaceholder", editLabelKey: "editDiary", deleteLabelKey: "deleteDiaryEntry" })}
    </article>`;
  }).join("")}</div>`;
}
