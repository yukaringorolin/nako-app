function gamificationText(key, values = {}) {
  const source = tr(gamificationData.labels[key]);
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), source);
}

function gamificationPostcard(id) {
  return gamificationData.postcards.find((card) => card.id === id) || null;
}

function gamificationToastFamily(id) {
  return gamificationData.toastFamilies.find((family) => family.id === id) || null;
}

function gamificationToastFamilyId(kind, options = {}) {
  if (kind === "routine") {
    return gamificationData.routineToastFamilyByTaskId[options.taskId] || "sparkling-surfaces";
  }
  return {
    training: "gentle-training",
    play: "purple-play",
    health: "health-heart",
    diary: "diary-flower",
    albumReady: "sparkling-surfaces"
  }[kind] || "sparkling-surfaces";
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

function noticeMessage(kind, options = {}, family = null) {
  if (kind === "training" && options.personalBest && options.commandTitle) {
    return gamificationText("praiseTrainingBest", { command: options.commandTitle });
  }
  if (family?.praise) return tr(family.praise);
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
  const familyId = gamificationToastFamilyId(kind, options);
  const family = gamificationToastFamily(familyId);
  gamificationNotice = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    kind,
    familyId,
    motion: family?.motion || "sparkle",
    taskTitle: String(options.taskTitle || ""),
    message: noticeMessage(kind, options, family),
    iconImage: family?.image || NAKO_LOGO_SRC,
    cardId: card?.id || "",
    cardTitle: card ? tr(card.title) : "",
    personalBest: Boolean(options.personalBest)
  };
  clearTimeout(gamificationNoticeTimer);
  gamificationNoticeTimer = setTimeout(() => dismissGamificationNotice(), 6500);
  mountGamificationNotice();
}

function mountGamificationNotice() {
  const root = document.querySelector("#app");
  if (!root?.firstElementChild) return;
  root.querySelector("[data-gamification-toast]")?.remove();
  root.insertAdjacentHTML("beforeend", renderGamificationNotice());
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
  const taskLine = gamificationNotice.taskTitle
    ? `<span class="gamification-toast-task" title="${esc(gamificationNotice.taskTitle)}">${esc(gamificationNotice.taskTitle)}</span>`
    : "";
  const postcardLine = gamificationNotice.cardId
    ? `<span class="gamification-toast-unlock">${esc(gamificationText("newPostcard", { title: gamificationNotice.cardTitle }))}</span>`
    : "";
  const bestClass = gamificationNotice.personalBest ? " is-personal-best" : "";
  return `<aside class="gamification-toast family-${esc(gamificationNotice.familyId)} motion-${esc(gamificationNotice.motion)}${bestClass}" data-gamification-toast role="status" aria-live="polite">
    <span class="gamification-toast-art" aria-hidden="true">
      <img src="${esc(gamificationNotice.iconImage)}" alt="" width="72" height="72" data-gamification-image data-gamification-toast-image>
      <span class="gamification-toast-effect"><i></i><i></i><i></i></span>
    </span>
    <span class="gamification-toast-copy">${taskLine}<strong>${esc(gamificationNotice.message)}</strong>${postcardLine}</span>
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
  </section>`;
}

function renderGamificationAlbumHome() {
  return `<section class="gamification-home gamification-album-home" aria-labelledby="gamification-album-title">
    <h2 id="gamification-album-title" class="visually-hidden">${esc(gamificationText("postcards"))}</h2>
    ${renderPostcardAlbum()}
  </section>`;
}

function handleGamificationImageError(event) {
  const image = event.target?.closest?.("img[data-gamification-image]");
  if (!image || image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = NAKO_LOGO_SRC;
  image.alt = image.hasAttribute("data-gamification-toast-image") ? "" : gamificationText("imageFallback");
  image.classList.add("is-image-fallback");
}
