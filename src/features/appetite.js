function getAppetiteEntries() {
  appState.appetiteTracking ||= {};
  return appState.appetiteTracking;
}

function currentAppetiteDate() {
  const today = routineTracking.singaporeDateKey();
  const firstDate = routineTracking.addDays(today, -29);
  if (!selectedAppetiteDate || selectedAppetiteDate < firstDate || selectedAppetiteDate > today) selectedAppetiteDate = today;
  return selectedAppetiteDate;
}

function appetiteAmountValue(value) {
  return value === null || value === undefined ? "" : String(value);
}

function renderAppetiteHistoryDetails(entry) {
  const details = [];
  if (entry.kibbleGrams !== null) details.push(`${esc(label("appetiteKibbleGrams"))}: ${entry.kibbleGrams} g`);
  if (entry.frozenFoodCubes !== null) details.push(`${esc(label("appetiteFrozenFoodCubes"))}: ${entry.frozenFoodCubes}`);
  return details.length ? `<span class="appetite-history-details">${details.join(" · ")}</span>` : "";
}

function renderNakoAppetiteTracker() {
  const today = routineTracking.singaporeDateKey();
  const dateKey = currentAppetiteDate();
  const entries = getAppetiteEntries();
  const entry = window.nakoAppetiteTracking.normalizeEntry(entries[dateKey], dateKey);
  const history = window.nakoAppetiteTracking.recentEntries(entries, today, 30, routineTracking.addDays);
  const isToday = dateKey === today;
  const percentageButtons = window.nakoAppetiteTracking.PERCENTAGES.map((percentage) => {
    const selected = entry?.percentage === percentage;
    return `<button class="appetite-percentage-button ${selected ? "is-selected" : ""} percentage-${percentage}" type="button" data-appetite-percentage="${percentage}" data-appetite-date="${esc(dateKey)}" aria-pressed="${selected}">${percentage}%</button>`;
  }).join("");
  const noteDisabled = entry ? "" : "disabled";
  const status = appetiteStatusMessage ? `<span class="appetite-save-status" data-appetite-status role="status">${esc(appetiteStatusMessage)}</span>` : `<span class="appetite-save-status" data-appetite-status role="status"></span>`;

  const historyHtml = history.length
    ? `<div class="appetite-history-list">${history.map((item) => `<article class="appetite-history-row ${item.dateKey === dateKey ? "is-editing" : ""}">
        <div class="appetite-history-copy">
          <strong>${esc(formatRoutineDate(item.dateKey, true))}</strong>
          ${renderAppetiteHistoryDetails(item)}
          ${item.note ? `<span>${esc(item.note)}</span>` : ""}
        </div>
        <div class="appetite-history-result">
          <span class="appetite-history-track" aria-hidden="true"><span class="appetite-history-fill percentage-${item.percentage}"></span></span>
          <strong>${item.percentage}%</strong>
          <button class="text-button" type="button" data-appetite-edit="${esc(item.dateKey)}">${esc(label("appetiteEdit"))}</button>
        </div>
      </article>`).join("")}</div>`
    : `<p class="appetite-empty">${esc(label("appetiteNoHistory"))}</p>`;

  return `<section class="panel appetite-panel" data-appetite-panel>
    <div class="appetite-panel-head">
      <div>
        <h2>${esc(label("appetiteTracker"))}</h2>
        <p><span>${esc(label("appetiteDate"))}:</span> <strong>${esc(formatRoutineDate(dateKey, true))}</strong></p>
      </div>
      ${isToday ? status : `<button class="text-button" type="button" data-appetite-today>${esc(label("appetiteBackToday"))}</button>`}
    </div>
    <fieldset class="appetite-percentage-fieldset">
      <legend>${esc(label("appetitePercentage"))}</legend>
      <div class="appetite-percentage-options">${percentageButtons}</div>
    </fieldset>
    <div class="appetite-amount-fields">
      <label class="appetite-amount-label">
        <span>${esc(label("appetiteKibbleGrams"))}</span>
        <span class="appetite-number-control">
          <input class="appetite-number-field" type="number" min="0" step="1" inputmode="decimal" data-appetite-measurement="kibbleGrams" data-appetite-date="${esc(dateKey)}" value="${esc(appetiteAmountValue(entry?.kibbleGrams))}" placeholder="0" ${noteDisabled}>
          <span aria-hidden="true">g</span>
        </span>
      </label>
      <label class="appetite-amount-label">
        <span>${esc(label("appetiteFrozenFoodCubes"))}</span>
        <input class="appetite-number-field" type="number" min="0" step="1" inputmode="decimal" data-appetite-measurement="frozenFoodCubes" data-appetite-date="${esc(dateKey)}" value="${esc(appetiteAmountValue(entry?.frozenFoodCubes))}" placeholder="0" ${noteDisabled}>
      </label>
    </div>
    <label class="appetite-note-label">
      <span>${esc(label("appetiteNote"))}</span>
      <textarea class="memo-field appetite-note-field" data-appetite-note="${esc(dateKey)}" placeholder="${esc(label("appetiteNotePlaceholder"))}" ${noteDisabled}>${esc(entry?.note || "")}</textarea>
    </label>
    ${entry ? (isToday ? "" : status) : `<p class="appetite-helper">${esc(label("appetiteSelectFirst"))}</p>`}
    <p class="appetite-safety">${esc(label("appetiteNotify"))}</p>
    <div class="appetite-history-head"><h3>${esc(label("appetiteHistory"))}</h3></div>
    ${historyHtml}
  </section>`;
}

function saveAppetitePercentage(dateKey, value) {
  const percentage = window.nakoAppetiteTracking.validPercentage(value);
  if (percentage === null) return;
  const existingEntry = window.nakoAppetiteTracking.normalizeEntry(getAppetiteEntries()[dateKey], dateKey);
  const entry = window.nakoAppetiteTracking.upsertEntry(getAppetiteEntries(), dateKey, { percentage }, nowIso());
  if (!entry) return;
  selectedAppetiteDate = dateKey;
  appetiteStatusMessage = label("appetiteSaved");
  if (!existingEntry) celebrateCareSave("health");
  saveState();
  render();
}

function updateAppetiteNote(dateKey, note) {
  const entry = window.nakoAppetiteTracking.upsertEntry(getAppetiteEntries(), dateKey, { note }, nowIso());
  if (!entry) return;
  appetiteStatusMessage = label("appetiteSaved");
  const status = document.querySelector("[data-appetite-status]");
  if (status) status.textContent = appetiteStatusMessage;
  saveStateDebounced();
}

function updateAppetiteMeasurement(dateKey, field, value) {
  if (!["kibbleGrams", "frozenFoodCubes"].includes(field)) return;
  const amount = window.nakoAppetiteTracking.validAmount(value);
  if (value !== "" && amount === null) return;
  const entry = window.nakoAppetiteTracking.upsertEntry(getAppetiteEntries(), dateKey, { [field]: amount }, nowIso());
  if (!entry) return;
  appetiteStatusMessage = label("appetiteSaved");
  const status = document.querySelector("[data-appetite-status]");
  if (status) status.textContent = appetiteStatusMessage;
  saveStateDebounced();
}

function editAppetiteDate(dateKey) {
  const entries = getAppetiteEntries();
  const today = routineTracking.singaporeDateKey();
  const firstDate = routineTracking.addDays(today, -29);
  if (dateKey !== today && (!entries[dateKey] || dateKey < firstDate || dateKey > today)) return;
  selectedAppetiteDate = dateKey;
  appetiteStatusMessage = "";
  render();
  document.querySelector("[data-appetite-panel]")?.scrollIntoView({ block: "start" });
}
