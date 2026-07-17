function gamificationText(key, values = {}) {
  const source = tr(gamificationData.labels[key]);
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), source);
}

function gamificationPostcard(id) {
  return gamificationData.postcards.find((card) => card.id === id) || null;
}

function syncGamificationUnlocks() {
  const result = window.nakoGamification.syncUnlocks(appState, new Date());
  if (result.changed) safeStorage.setItem(STATE_KEY, JSON.stringify(appState));
  return result;
}

function initializeGamificationState() {
  const previousVersion = Number(appState.gamification?.version) || 0;
  const result = syncGamificationUnlocks();
  return {
    ...result,
    showAlbumReady: previousVersion < window.nakoGamification.VERSION
      && result.newlyUnlocked.some((id) => id !== "nako-hello")
  };
}

function noticeMessage(kind, options = {}) {
  if (kind === "training" && options.personalBest && options.commandTitle) {
    return gamificationText("praiseTrainingBest", { command: options.commandTitle });
  }
  const keys = {
    routine: "praiseRoutine",
    training: "praiseTraining",
    play: "praisePlay",
    health: "praiseHealth",
    diary: "praiseDiary",
    albumReady: "albumReady"
  };
  return gamificationText(keys[kind] || "praiseRoutine");
}

function showGamificationNotice(kind, options = {}) {
  const card = options.cardId ? gamificationPostcard(options.cardId) : null;
  gamificationNotice = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    kind,
    message: noticeMessage(kind, options),
    cardId: card?.id || "",
    cardTitle: card ? tr(card.title) : "",
    cardImage: card?.image || NAKO_LOGO_SRC,
    cardAlt: card ? tr(card.alt) : "Nako"
  };
  clearTimeout(gamificationNoticeTimer);
  gamificationNoticeTimer = setTimeout(() => dismissGamificationNotice(), 6500);
}

function dismissGamificationNotice() {
  clearTimeout(gamificationNoticeTimer);
  gamificationNoticeTimer = null;
  gamificationNotice = null;
  document.querySelector("[data-gamification-toast]")?.remove();
}

function celebrateCareSave(kind, options = {}) {
  const result = syncGamificationUnlocks();
  const cardId = result.newlyUnlocked.find((id) => id !== "nako-hello") || "";
  showGamificationNotice(kind, { ...options, cardId });
  return result;
}

function renderGamificationNotice() {
  if (!gamificationNotice) return "";
  const postcardLine = gamificationNotice.cardId
    ? `<span class="gamification-toast-unlock">${esc(gamificationText("newPostcard", { title: gamificationNotice.cardTitle }))}</span>`
    : "";
  return `<aside class="gamification-toast" data-gamification-toast role="status" aria-live="polite">
    <span class="gamification-toast-paws" aria-hidden="true"><i>🐾</i><i>🐾</i><i>🐾</i></span>
    <img src="${esc(gamificationNotice.cardImage)}" alt="${esc(gamificationNotice.cardAlt)}" width="72" height="72" data-gamification-image>
    <span class="gamification-toast-copy"><strong>${esc(gamificationNotice.message)}</strong>${postcardLine}</span>
    <button type="button" data-gamification-dismiss aria-label="${esc(gamificationText("close"))}">×</button>
  </aside>`;
}

function renderCarePaw(category, count) {
  if (!count) return "";
  return `<span class="care-paw care-paw-${esc(category)}"><span aria-hidden="true">🐾</span>${esc(gamificationText(category))}</span>`;
}

function renderWeeklyCareSummary(summary) {
  if (!summary.total) return "";
  const countRows = window.nakoGamification.CATEGORY_ORDER
    .filter((category) => summary.counts[category] > 0)
    .map((category) => `<li><span>${esc(gamificationText(category))}</span><strong>${summary.counts[category]}</strong></li>`)
    .join("");
  const paws = window.nakoGamification.CATEGORY_ORDER.map((category) => renderCarePaw(category, summary.counts[category])).join("");
  const allFour = summary.activeCategories.length === window.nakoGamification.CATEGORY_ORDER.length
    ? `<p class="four-paw-message">${esc(gamificationText("fourPaws"))}</p>`
    : "";
  return `<div class="weekly-care-summary">
    <div class="gamification-section-head">
      <div><p class="eyebrow">${esc(gamificationText("title"))}</p><h2>${esc(gamificationText("thisWeek"))}</h2></div>
      <span>${esc(formatRoutineDate(summary.start))} – ${esc(formatRoutineDate(summary.end))}</span>
    </div>
    <p>${esc(gamificationText("weekIntro"))}</p>
    <div class="care-paw-list">${paws}</div>
    <ul class="weekly-care-counts">${countRows}</ul>
    ${allFour}
  </div>`;
}

function renderPostcard(card, unlocked) {
  if (!unlocked) {
    return `<article class="postcard-card is-locked" aria-label="${esc(gamificationText("futureMemory"))}">
      <div class="postcard-locked-mark" aria-hidden="true">🐾</div>
      <p>${esc(gamificationText("futureMemory"))}</p>
    </article>`;
  }
  return `<article class="postcard-card is-unlocked">
    <img src="${esc(card.image)}" alt="${esc(tr(card.alt))}" width="768" height="768" loading="lazy" decoding="async" data-gamification-image>
    <div><h3>${esc(tr(card.title))}</h3><p>${esc(tr(card.description))}</p></div>
  </article>`;
}

function renderPostcardAlbum() {
  const unlocked = appState.gamification?.unlockedPostcards || {};
  const unlockedCount = gamificationData.postcards.filter((card) => unlocked[card.id]).length;
  return `<details class="postcard-album">
    <summary>
      <span><strong>${esc(gamificationText("postcards"))}</strong><small>${esc(gamificationText("albumIntro"))}</small></span>
      <b>${esc(gamificationText("postcardCount", { count: unlockedCount }))}</b>
    </summary>
    <div class="postcard-grid">${gamificationData.postcards.map((card) => renderPostcard(card, unlocked[card.id])).join("")}</div>
  </details>`;
}

function renderGamificationHome() {
  const summary = window.nakoGamification.deriveWeeklySummary(appState, new Date());
  return `<section class="gamification-home" aria-labelledby="gamification-home-title">
    <h2 id="gamification-home-title" class="visually-hidden">${esc(gamificationText("title"))}</h2>
    ${renderWeeklyCareSummary(summary)}
    ${renderPostcardAlbum()}
  </section>`;
}

function handleGamificationImageError(event) {
  const image = event.target?.closest?.("img[data-gamification-image]");
  if (!image || image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = NAKO_LOGO_SRC;
  image.alt = gamificationText("imageFallback");
  image.classList.add("is-image-fallback");
}
