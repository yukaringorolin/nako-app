const LANG_KEY = "nako-care-language";
const STATE_KEY = "nako-care-state-v2";
const NAKO_LOGO_SRC = "assets/nako-logo.png";
const { langs, ui, homeSections, foodItems, routineTasks, recipes, cookingRules, additionalResources, trainingData } = window.nakoData;
const ingredientCatalog = window.nakoIngredientCatalog || {};

// safeStorage wraps localStorage to handle blocked access/SecurityErrors
const safeStorage = {
  getItem(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  setItem(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }
};

let currentLang = langs.includes(safeStorage.getItem(LANG_KEY)) ? safeStorage.getItem(LANG_KEY) : "en";
let appState = loadState();
migrateTrainingState();
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
const scrollPositions = {};
let activeRouteKey = null;
const app = document.querySelector("#app");

window.addEventListener("hashchange", render);
document.addEventListener("click", handleClick);
document.addEventListener("input", handleInput);
document.addEventListener("change", handleChange);
document.addEventListener("blur", handleBlur, true);
document.addEventListener("submit", handleSubmit);
initFirebaseSync();
render();

/* ==========================================================================
   SECTION 1: STATE MANAGEMENT & ROUTING HELPERS
   ========================================================================== */
function loadState() {
  try { return JSON.parse(safeStorage.getItem(STATE_KEY)) || {}; } catch { return {}; }
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
  if (options.remote !== false) window.nakoFirebase?.saveRemoteState?.(appState);
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

function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "section" && parts[1]) return { view: "section", sectionId: parts[1] };
  if (parts[0] === "routine" && parts[1]) return { view: "routine", routineId: parts[1] };
  if (parts[0] === "food" && parts[1]) return { view: "food", foodId: parts[1] };
  if (parts[0] === "recipe" && parts[1]) return { view: "recipe", recipeId: parts[1] };
  return { view: "home" };
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

/* ==========================================================================
   SECTION 2: RENDERERS - MAIN LAYOUT & SHELL
   ========================================================================== */
function render() {
  const currentScroll = window.scrollY;
  const oldRouteKey = activeRouteKey;

  document.documentElement.lang = currentLang === "jp" ? "ja" : currentLang === "mm" ? "my" : "en";
  const route = parseRoute();
  
  const newRouteKey = location.hash || "#home";
  activeRouteKey = newRouteKey;

  if (oldRouteKey) {
    scrollPositions[oldRouteKey] = currentScroll;
  }

  if (route.view === "section") {
    renderSection(route.sectionId);
  } else if (route.view === "routine") {
    renderRoutine(route.routineId);
  } else if (route.view === "food") {
    renderFood(route.foodId);
  } else if (route.view === "recipe") {
    renderRecipe(route.recipeId);
  } else {
    renderHome();
  }

  const targetScroll = oldRouteKey === newRouteKey ? currentScroll : (scrollPositions[newRouteKey] || 0);
  window.scrollTo(0, targetScroll);
  setTimeout(() => {
    window.scrollTo(0, targetScroll);
  }, 0);
}

function renderShell(title, content, showBack = false) {
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <button class="icon-button ${showBack ? "" : "is-hidden"}" data-back aria-label="${esc(label("back"))}">‹</button>
        <div class="brand-mini">
          <img src="${NAKO_LOGO_SRC}" alt="Nako" />
          <span class="screen-title">${esc(title)}</span>
        </div>
        <div class="topbar-actions">
          ${renderSyncIndicator()}
          <div class="language-toggle" aria-label="Language">
            ${langs.map((language) => `<button data-lang="${language}" aria-pressed="${language === currentLang}">${language.toUpperCase()}</button>`).join("")}
          </div>
        </div>
      </header>
      <div class="content">${content}</div>
    </div>`;
}

function renderSyncIndicator() {
  const modes = ["local", "connecting", "synced", "error"];
  const mode = modes.includes(firebaseStatus?.mode) ? firebaseStatus.mode : "local";
  const key = mode === "synced" ? "syncCloud" : mode === "connecting" ? "syncConnecting" : mode === "error" ? "syncOff" : "syncLocal";
  let code = "";
  try {
    code = localStorage.getItem("nako-household-code") || "";
  } catch {}
  const displayLabel = code ? `${label(key)} (${code})` : label(key);
  return `<button class="sync-indicator-btn" data-sync-settings aria-label="${esc(displayLabel)}" title="${esc(displayLabel)}"><span class="sync-status sync-${mode}"></span></button>`;
}

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
          accent = sec.accent;
          iconBg = sec.iconBg;
          photo = primaryPhoto(task.photos) || sectionPhoto(sec);
        }
      }
    }

    const dataAttr = shortcut.type === "food" ? `data-food="${esc(shortcut.id)}"` : `data-routine="${esc(shortcut.id)}"`;

    return `<button class="shortcut-btn" ${dataAttr} style="--accent:${accent};--icon-bg:${iconBg}">
      ${renderShortcutIcon(icon, photo)}
      <span class="shortcut-title">${esc(titleText)}</span>
    </button>`;
  }).join("");
}

function renderSection(sectionId) {
  const section = homeSections.find((entry) => entry.id === sectionId);
  if (!section) return renderHome();
  const isFood = sectionId === "food";
  const items = isFood ? [...foodItems].sort(bySort) : routineTasks.filter((task) => task.frequencyBucket === sectionId).sort(bySort);
  const pinned = !isFood && sectionId === "daily" ? renderPinnedSafety() : "";
  const rules = isFood ? renderRulesPanel() : "";
  const content = `
    ${renderHead(section.icon, tr(section.title), tr(section.description), section.iconBg, isFood ? label("foodItems") : label("routineItems"))}
    ${rules}
    ${pinned}
    <section class="card-list">${items.map((item) => isFood ? renderFoodCard(item, section) : renderRoutineCard(item, section)).join("") || emptyState()}</section>`;
  renderShell(tr(section.title), content, true);
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
  const content = `
    ${renderHead(task.icon, tr(task.title), tr(task.summary), section?.iconBg || "#fff1f2", tr(section?.title || task.frequencyText), primaryPhoto(task.photos))}
    <section class="panel"><h2>${esc(label("frequency"))}</h2><span class="frequency-pill">${esc(tr(task.frequencyText))}</span></section>
    ${instructionsPanel}
    ${renderPhotos(task.photos)}
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2>${noteList(task.mustRemember)}</section>
    ${renderVideo(task.videoUrl)}`;
  renderShell(tr(task.title), content, true);
}

function renderFood(foodId) {
  if (foodId === "nako-weight") return go("#routine/nako-weight-tracking");
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
    ${renderVideo(item.videoUrl)}
    <section class="panel"><h2>${esc(label("memo"))}</h2><textarea class="memo-field" data-food-memo="${esc(item.id)}" placeholder="${esc(label("memoPlaceholder"))}">${esc(state.memo || "")}</textarea></section>`;
  renderShell(tr(item.title), content, true);
}

function renderRecipeIndex(item) {
  const isHuman = item.id === "human-food";
  const filteredRecipes = recipes.filter((r) => isHuman ? r.type === "human" : (!r.type || r.type === "dog"));
  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), "#fff0eb", isHuman ? label("humanRecipes") : label("recipes"))}
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
  
  const badgesHtml = isHuman ? `<div class="recipe-badges" style="margin: -8px 16px 16px 16px;">${renderRecipeBadges(recipe)}</div>` : "";
  
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

/* ==========================================================================
   SECTION 4: RENDERERS - COMPONENT VIEWS & CARD BUILDERS
   ========================================================================== */
function renderHead(icon, title, description, iconBg, eyebrow, photo = null) {
  return `<section class="detail-head" style="--icon-bg:${iconBg}">${renderLargeIcon(icon, photo)}<div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p class="lead">${esc(description)}</p></div></section>`;
}

function renderSectionCard(section) {
  const count = section.id === "food" ? foodItems.length : routineTasks.filter((task) => task.frequencyBucket === section.id).length;
  return `<button class="category-card" data-section="${esc(section.id)}" style="--accent:${section.accent};--icon-bg:${section.iconBg}">${renderCardIcon(section.icon, sectionPhoto(section))}<span class="card-copy"><span class="card-title">${esc(tr(section.title))}</span><span class="card-description">${esc(tr(section.description))}</span><span class="card-meta"><span class="badge">${count} ${esc(section.id === "food" ? label("foodItems") : label("routineItems"))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderAdditionalResources() {
  if (!additionalResources?.items?.length) return "";
  return `<section class="additional-resources" aria-labelledby="additional-resources-title">
    <div class="resource-section-head">
      <p id="additional-resources-title" class="section-label">${esc(tr(additionalResources.title))}</p>
      <p>${esc(tr(additionalResources.subtitle))}</p>
    </div>
    <div class="resource-list">${additionalResources.items.map(renderResourceCard).join("")}</div>
  </section>`;
}

function renderResourceCard(resource) {
  const embed = resource.embedUrl ? `<div class="resource-video"><iframe src="${esc(resource.embedUrl)}" title="${esc(tr(resource.videoTitle))}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` : "";
  const takeaways = Array.isArray(resource.takeaways) ? resource.takeaways : [];
  return `<article class="resource-card">
    <div class="resource-card-head">
      <span class="resource-icon" aria-hidden="true">${esc(resource.icon || "R")}</span>
      <div>
        <h2>${esc(tr(resource.title))}</h2>
        <p class="resource-meta">${esc(tr(resource.source))}</p>
      </div>
    </div>
    <p class="resource-video-title">${esc(tr(resource.videoTitle))}</p>
    ${embed}
    <a class="resource-link" href="${esc(resource.youtubeUrl)}" target="_blank" rel="noopener noreferrer">${esc(tr(resource.watchLabel))}</a>
    <p class="resource-description">${esc(tr(resource.description))}</p>
    <p class="resource-note">${esc(tr(resource.note))}</p>
    ${takeaways.length ? `<div class="resource-takeaways"><h3>${esc(tr(resource.takeawaysTitle))}</h3><ul>${takeaways.map((item) => `<li>${esc(tr(item))}</li>`).join("")}</ul></div>` : ""}
  </article>`;
}

function renderFoodCard(item) {
  return `<button class="item-card" data-food="${esc(item.id)}" style="--accent:#f19a82;--icon-bg:#fff0eb">${renderCardIcon(item.icon, primaryPhoto(item.photos))}<span class="card-copy"><span class="card-title">${esc(tr(item.title))}</span><span class="card-description">${esc(tr(item.summary))}</span><span class="card-meta"><span class="badge">${esc(item.trackingMode === "future" ? label("futureTracking") : label("foodItems"))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderRoutineCard(task, section) {
  return `<button class="item-card routine-card" data-routine="${esc(task.id)}" style="--accent:${section.accent};--icon-bg:${section.iconBg}">${renderCardIcon(task.icon, primaryPhoto(task.photos))}<span class="card-copy"><span class="card-title">${esc(tr(task.title))}</span><span class="card-description">${esc(tr(task.summary))}</span><span class="card-meta"><span class="badge">${esc(tr(task.frequencyText))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderRecipeCard(recipe) {
  const isHuman = recipe.type === "human";
  const mainPhoto = primaryPhoto(recipe.photos);
  
  if (isHuman && mainPhoto) {
    const badgesHtml = renderRecipeBadges(recipe);
    return `<button class="recipe-card has-large-image" data-recipe="${esc(recipe.id)}"><div class="recipe-card-banner"><img src="${esc(mainPhoto.src)}" alt="${esc(tr(mainPhoto.alt || mainPhoto.caption))}" loading="lazy" /></div><div class="recipe-card-content"><span class="card-title">${esc(tr(recipe.title))}</span><span class="card-description">${esc(tr(recipe.description))}</span><div class="recipe-badges">${badgesHtml}</div></div></button>`;
  }
  
  return `<button class="recipe-card" data-recipe="${esc(recipe.id)}">${renderCardIcon(recipe.icon, mainPhoto)}<span class="card-copy"><span class="card-title">${esc(tr(recipe.title))}</span><span class="card-description">${esc(tr(recipe.description))}</span></span><span class="chevron">›</span></button>`;
}

function renderRecipeBadges(recipe) {
  let html = "";
  if (recipe.mealType) {
    html += `<span class="badge meal-type">${esc(tr(recipe.mealType))}</span>`;
  }
  if (recipe.style) {
    html += `<span class="badge style">${esc(tr(recipe.style))}</span>`;
  }
  if (recipe.timeEstimate) {
    html += `<span class="badge time">${esc(tr(recipe.timeEstimate))}</span>`;
  }
  if (recipe.highProtein) {
    html += `<span class="badge protein">${esc(label("highProtein"))}</span>`;
  }
  return html;
}

function renderCardIcon(icon, photo = null) {
  if (photo?.src) return `<span class="card-icon image-icon"><img src="${esc(photo.src)}" alt="${esc(tr(photo.alt || photo.caption))}" loading="lazy" /></span>`;
  return `<span class="card-icon">${esc(icon)}</span>`;
}

function renderShortcutIcon(icon, photo = null) {
  if (photo?.src) return `<span class="shortcut-icon image-icon"><img src="${esc(photo.src)}" alt="${esc(tr(photo.alt || photo.caption))}" loading="lazy" /></span>`;
  return `<span class="shortcut-icon" style="background:var(--icon-bg);color:var(--accent);">${esc(icon)}</span>`;
}

function renderLargeIcon(icon, photo = null) {
  if (photo?.src) return `<div class="large-icon image-icon"><img src="${esc(photo.src)}" alt="${esc(tr(photo.alt || photo.caption))}" loading="lazy" /></div>`;
  return "";
}

function primaryPhoto(photos = []) {
  if (!Array.isArray(photos) || !photos.length) return null;
  // Return the first image that is not a video
  return photos.find(p => {
    const src = p.src.toLowerCase();
    return !src.endsWith('.mov') && !src.endsWith('.mp4') && !src.endsWith('.webm');
  }) || null;
}

function sectionPhoto(section) {
  return section.image ? { src: section.image, alt: section.title } : null;
}

function renderPinnedSafety() {
  const pinned = routineTasks.filter((task) => ["nako-emergency", "nako-kind-handling", "nako-supervision"].includes(task.id));
  return `<section class="rule-strip"><h2>${esc(label("pinnedSafety"))}</h2><div class="mini-list">${pinned.map((task) => `<button class="mini-link" data-routine="${esc(task.id)}">${esc(tr(task.title))}</button>`).join("")}</div></section>`;
}

function renderRulesPanel() {
  return `<section class="rule-strip"><h2>${esc(label("cookingRules"))}</h2><ul>${cookingRules.map((rule) => `<li>${esc(tr(rule))}</li>`).join("")}</ul></section>`;
}

function renderPhotos(photos = []) {
  if (!photos.length) return "";
  return `<section class="panel photo-panel"><h2>${esc(label("photos"))}</h2><div class="photo-guide">${photos.map(renderPhoto).join("")}</div></section>`;
}

function renderPhoto(photo) {
  const isVideo = photo.src.toLowerCase().endsWith('.mov') || photo.src.toLowerCase().endsWith('.mp4') || photo.src.toLowerCase().endsWith('.webm');
  if (isVideo) {
    return `<figure class="task-photo"><video src="${esc(photo.src)}" controls playsinline preload="metadata"></video><figcaption>${esc(tr(photo.caption))}</figcaption></figure>`;
  }
  return `<figure class="task-photo"><img src="${esc(photo.src)}" alt="${esc(tr(photo.alt || photo.caption))}" loading="lazy" /><figcaption>${esc(tr(photo.caption))}</figcaption></figure>`;
}

function renderIngredient(item, recipeId, ingredientIndex) {
  const choiceId = `${recipeId}:${ingredientIndex}`;
  const selectedKey = selectedIngredientChoices[choiceId] || item.key;
  const selectedOption = item.alternatives?.find((option) => option.key === selectedKey);
  const name = selectedOption?.name || item.name;
  const image = ingredientImage(selectedKey);
  const choices = item.alternatives?.length
    ? `<div class="ingredient-choice-group" role="group" aria-label="${esc(tr(item.name))}">${item.alternatives.map((option) => `<button class="ingredient-choice ${option.key === selectedKey ? "is-selected" : ""}" data-ingredient-choice data-ingredient-choice-id="${esc(choiceId)}" data-ingredient-key="${esc(option.key)}" aria-pressed="${option.key === selectedKey}">${esc(tr(option.name))}</button>`).join("")}</div>`
    : "";
  const imageHtml = image ? `<img src="${esc(image)}" alt="${esc(tr(name))}" loading="lazy" />` : "";

  if (item.macros) {
    const macrosText = `${item.macros.calories} kcal · P ${item.macros.protein}g · C ${item.macros.carbs}g · F ${item.macros.fat}g`;
    return `<li class="ingredient-row ${image ? "" : "without-image"}">${imageHtml}<div class="ingredient-copy"><div class="ingredient-details"><span class="ingredient-name">${esc(tr(name))}</span>${choices}</div><span class="ingredient-macros">${esc(macrosText)}</span></div><span class="amount">${esc(item.amount)}</span></li>`;
  }

  return `<li class="ingredient-row ${image ? "" : "without-image"}">${imageHtml}<div class="ingredient-details"><span class="ingredient-name">${esc(tr(name))}</span>${choices}</div><span class="amount">${esc(item.amount)}</span></li>`;
}

function orderedList(items) {
  return `<ol class="method-list">${items.map((item, index) => `<li><span>${index + 1}.</span><span>${richText(tr(item))}</span></li>`).join("")}</ol>`;
}

function noteList(items) {
  return `<ul class="note-list">${items.map((item) => `<li><span>•</span><span>${richText(tr(item))}</span></li>`).join("")}</ul>`;
}

function renderVideo(videoUrl) {
  if (!videoUrl) return "";
  return `<section class="panel"><h2>${esc(label("video"))}</h2><div class="video-shell"><iframe src="${esc(videoUrl)}" title="${esc(label("video"))}" allowfullscreen></iframe></div></section>`;
}

/* Nako's command, play and progress dashboard. */
function tl(key) { return tr(trainingData.labels[key]); }
function uniqueId() { return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `training-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function optionText(options, value) { return tr(options[Number(value)] || options[options.length - 1]); }

function getTrainingState() {
  if (appState.training && typeof appState.training === "object") {
    appState.training.commands ||= {};
    appState.training.commandLogs ||= [];
    appState.training.playLogs ||= [];
    return appState.training;
  }
  const now = nowIso();
  appState.training = {
    commands: Object.fromEntries(trainingData.commands.map((command) => [command.id, baselineCommandState(command, now)])),
    commandLogs: [], playLogs: [],
    ...Object.fromEntries(trainingData.commands.filter((command) => command.setting && command.defaultCue).map((command) => [command.setting, command.defaultCue]))
  };
  saveState({ remote: false });
  return appState.training;
}

function getCommandState(commandId) {
  const training = getTrainingState();
  const command = trainingData.commands.find((item) => item.id === commandId);
  training.commands[commandId] ||= baselineCommandState(command);
  return training.commands[commandId];
}

function renderTrainingDashboard(task) {
  const section = homeSections.find((entry) => entry.id === task.frequencyBucket);
  const body = trainingTab === "commands" ? renderTrainingCommands() : trainingTab === "play" ? renderTrainingPlay() : renderTrainingLog();
  renderShell(tr(task.title), `${renderHead(task.icon, tr(task.title), tr(task.summary), section?.iconBg || "#fff1f2", tr(section?.title || task.frequencyText), primaryPhoto(task.photos))}<div class="training-tabs" role="tablist" aria-label="${esc(tr(task.title))}">${[["commands", trainingData.labels.tabs.commands], ["play", trainingData.labels.tabs.play], ["log", trainingData.labels.tabs.log]].map(([id, title]) => `<button role="tab" data-training-tab="${id}" aria-selected="${trainingTab === id}">${esc(tr(title))}</button>`).join("")}</div><div class="training-dashboard">${body}</div>`, true);
}

function renderTrainingCommands() {
  const training = getTrainingState();
  const commands = filteredTrainingCommands();
  const needs = trainingData.commands.filter((command) => needsPractice(command, getCommandState(command.id))).sort((a, b) => practiceRank(a) - practiceRank(b)).slice(0, 5);
  return `${renderTrainingFilters()}<section class="training-summary panel soft"><h2>${esc(tl("needsPractice"))}</h2><div class="needs-practice-list">${needs.map((command) => `<button data-training-focus="${esc(command.id)}"><strong>${esc(tr(command.title))}</strong><span>${esc(`${getCommandState(command.id).score ?? 0}/10`)}</span></button>`).join("")}</div></section>${renderTrainingReferencePanels()}<section class="training-command-list">${commands.map(renderTrainingCommandCard).join("")}</section>${renderTrainingRules()}`;
}

function filteredTrainingCommands() {
  return [...trainingData.commands].sort((a, b) => a.order - b.order).filter((command) => {
    const state = getCommandState(command.id);
    if (trainingFilters.category !== "all" && command.category !== trainingFilters.category) return false;
    if (trainingFilters.priority !== "all" && tr(command.priority) !== trainingFilters.priority) return false;
    if (trainingFilters.score === "low" && (state.score ?? 0) > 4) return false;
    if (trainingFilters.score === "reliable" && (state.score ?? 0) < 8) return false;
    if (trainingFilters.recent === "recent" && !wasPractisedWithin(state.lastPracticedAt, 14)) return false;
    if (trainingFilters.recent === "needs" && !needsPractice(command, state)) return false;
    return true;
  });
}

function renderTrainingFilters() {
  const categories = Object.entries(trainingData.categories).map(([id, value]) => `<option value="${id}" ${trainingFilters.category === id ? "selected" : ""}>${esc(tr(value))}</option>`).join("");
  const priorities = [...new Set(trainingData.commands.map((command) => tr(command.priority)))].map((value) => `<option value="${esc(value)}" ${trainingFilters.priority === value ? "selected" : ""}>${esc(value)}</option>`).join("");
  return `<section class="training-filters panel"><h2>${esc(tl("filters"))}</h2><div class="training-filter-grid"><label>${esc(tl("category"))}<select data-training-filter="category"><option value="all">${esc(tl("all"))}</option>${categories}</select></label><label>${esc(tl("priority"))}<select data-training-filter="priority"><option value="all">${esc(tl("all"))}</option>${priorities}</select></label><label>${esc(tl("score"))}<select data-training-filter="score"><option value="all">${esc(tl("all"))}</option><option value="low">0–4</option><option value="reliable">8–10</option></select></label><label>${esc(tl("lastPractised"))}<select data-training-filter="recent"><option value="all">${esc(tl("all"))}</option><option value="recent">${esc(tl("recent"))}</option><option value="needs">${esc(tl("needsPractice"))}</option></select></label></div></section>`;
}

function renderTrainingReferencePanels() {
  const scoreRows = [["0", "Not introduced."], ["1–2", "Follows only a physical lure or visible food lure."], ["3–4", "Beginning to understand but normally needs visible food."], ["5–6", "Usually responds at home while food is hidden."], ["7–8", "Responds to the first cue in familiar environments with intermittent rewards."], ["9", "Responds reliably in multiple environments with moderate distractions."], ["10", "Emergency-level reliability: about 9 successful first-cue responses out of 10."]];
  const meanings = [["Sit", "Bottom down, front body upright."], ["Lie Down", "Body fully lying on the floor."], ["Up", "Climb onto a surface."], ["Step Down / Off", "Descend from a surface."], ["Wait", "Pause temporarily."], ["Stay", "Remain until formally released."], ["Break", "Formal release from Stay or Place."], ["Gaman → OK", "Wait and tolerate; OK permits taking food."], ["Leave It", "Do not take or approach."], ["Drop / Give", "Release something already in the mouth."], ["Place", "Go independently to a defined mat or bed."], ["Settle", "Relax calmly rather than wait tensely."], ["All Done", "The session has ended."]];
  return `<details class="training-details"><summary>${esc(tl("scoring"))}</summary><div class="score-guide">${scoreRows.map(([score, text]) => `<div><strong>${score}</strong><span>${esc(text)}</span></div>`).join("")}</div><p>${esc("A high score means food need not be visible before Nako responds. Rewards may still follow success.")}</p></details><details class="training-details"><summary>${esc(tl("meanings"))}</summary><dl class="meaning-list">${meanings.map(([name, text]) => `<div><dt>${esc(name)}</dt><dd>${esc(text)}</dd></div>`).join("")}</dl></details>`;
}

function renderTrainingCommandCard(command) {
  const state = getCommandState(command.id);
  const expanded = trainingExpandedCommandId === command.id;
  const lastResult = state.attempts === null || state.attempts === undefined ? "—" : `${state.successes || 0}/${state.attempts}`;
  return `<article class="training-command-card" id="training-${esc(command.id)}"><div class="training-command-head"><div><p>${esc(tr(trainingData.categories[command.category]))}</p><h2>${esc(tr(command.title))}</h2></div><span class="priority-badge">${esc(tr(command.priority))}</span></div><div class="command-score"><span>${esc(tl("score"))}</span><strong>${esc(`${state.score ?? 0}/10`)}</strong></div><dl class="command-metrics"><div><dt>${esc(tl("reward"))}</dt><dd>${esc(optionText(trainingData.rewardOptions, state.rewardReliance))}</dd></div><div><dt>${esc(tl("environment"))}</dt><dd>${esc(optionText(trainingData.environmentOptions, state.bestEnvironment))}</dd></div><div><dt>${esc(tl("trialResult"))}</dt><dd>${esc(lastResult)}</dd></div><div><dt>${esc(tl("lastPractised"))}</dt><dd>${esc(formatTrainingDate(state.lastPracticedAt))}</dd></div></dl>${state.latestComment ? `<p class="training-comment">${esc(state.latestComment)}</p>` : ""}<p class="training-milestone"><strong>${esc(tl("milestone"))}:</strong> ${esc(tr(command.milestone))}</p><div class="training-card-actions"><button class="action-button primary" data-training-add-command="${esc(command.id)}">${esc(tl("addLog"))}</button><button class="action-button secondary" data-training-history="${esc(command.id)}">${esc(tl("history"))}</button><button class="text-button" data-training-expand="${esc(command.id)}" aria-expanded="${expanded}">${esc(tl(expanded ? "hideDetails" : "details"))}</button></div>${expanded ? renderCommandDetails(command) : ""}${trainingHistoryCommandId === command.id ? renderCommandHistory(command.id) : ""}${trainingDraft?.kind === "command" && trainingDraft.commandId === command.id ? renderCommandForm() : ""}</article>`;
}

function renderCommandDetails(command) {
  const videos = trainingData.videos.filter((video) => video.commandIds.includes(command.id));
  const setting = command.setting ? `<label class="training-cue-setting">${esc(tl("cueLabel"))}<input value="${esc(getTrainingState()[command.setting] || "")}" placeholder="${esc(tl("cueNotSelected"))}" data-training-setting="${esc(command.setting)}" data-training-input /></label>` : "";
  return `<div class="training-command-details"><p>${esc(tr(command.purpose))}</p>${command.instructions?.length ? orderedList(command.instructions) : ""}${command.safety?.length ? `<div class="training-safety">${noteList(command.safety)}</div>` : ""}${setting}${renderTrainingVideos(videos)}</div>`;
}

function renderTrainingVideos(videos) {
  if (!videos.length) return "";
  return `<div class="training-videos">${videos.map((video) => video.needsReview ? `<div class="video-reference review"><strong>${esc(tl("review"))}</strong><p>${esc(tr(video.title))} · ${esc(tr(video.channel))}</p><p>${esc(tr(video.safety))}</p><a href="${esc(video.url)}" target="_blank" rel="noopener noreferrer">${esc(tl("openYouTube"))}</a></div>` : `<div class="video-reference"><iframe src="${esc(video.url.replace("watch?v=", "embed/"))}" title="${esc(tr(video.title))}" loading="lazy" allowfullscreen></iframe><p><strong>${esc(tr(video.title))}</strong><br>${esc(tr(video.channel))} · ${esc(video.duration)}</p><p>${esc(tr(video.summary))}</p><p><strong>${esc(tl("videoSafety"))}:</strong> ${esc(tr(video.safety))}</p><a href="${esc(video.url)}" target="_blank" rel="noopener noreferrer">${esc(tl("openYouTube"))}</a></div>`).join("")}</div>`;
}

function newCommandDraft(commandId, log = null) {
  const state = getCommandState(commandId);
  trainingDraft = { kind: "command", id: log?.id || "", commandId, date: log?.createdAt || nowIso(), score: log?.score ?? state.score ?? 0, successes: log?.successes ?? state.successes ?? "", attempts: log?.attempts ?? state.attempts ?? 5, rewardReliance: log?.rewardReliance ?? state.rewardReliance ?? 6, environment: log?.environment ?? state.bestEnvironment ?? 6, durationMinutes: log?.durationMinutes ?? "", comment: log?.comment ?? "", saving: false };
}
function renderSelect(options, value, field) { return `<select data-training-input data-training-field="${field}">${options.map((option, index) => `<option value="${index}" ${Number(value) === index ? "selected" : ""}>${esc(tr(option))}</option>`).join("")}</select>`; }
function renderCommandForm() { const d = trainingDraft; return `<form class="training-form" data-training-form="command"><h3>${esc(tl("commandLog"))}</h3><label>${esc(tl("score"))}<input type="number" min="0" max="10" value="${esc(d.score)}" data-training-input data-training-field="score" required /></label><div class="training-form-grid"><label>${esc(tl("successes"))}<input type="number" min="0" value="${esc(d.successes)}" data-training-input data-training-field="successes" /></label><label>${esc(tl("attempts"))}<input type="number" min="0" value="${esc(d.attempts)}" data-training-input data-training-field="attempts" /></label></div><label>${esc(tl("reward"))}${renderSelect(trainingData.rewardOptions, d.rewardReliance, "rewardReliance")}</label><label>${esc(tl("environment"))}${renderSelect(trainingData.environmentOptions, d.environment, "environment")}</label><label>${esc(tl("duration"))}<input type="number" min="0" value="${esc(d.durationMinutes)}" data-training-input data-training-field="durationMinutes" /></label><label>${esc(tl("comment"))}<textarea data-training-input data-training-field="comment">${esc(d.comment)}</textarea></label><div class="training-form-actions"><button class="action-button primary" type="submit" ${d.saving ? "disabled" : ""}>${esc(tl("save"))}</button><button class="action-button secondary" type="button" data-training-cancel>${esc(tl("cancel"))}</button></div></form>`; }
function renderCommandHistory(commandId) { const logs = getTrainingState().commandLogs.filter((log) => log.commandId === commandId).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))); return `<div class="training-history">${logs.length ? `<p class="training-trend">${esc(logs.slice(0, 6).reverse().map((log) => log.score).join(" → "))}</p>${logs.map((log) => `<article><strong>${esc(`${log.score}/10 · ${log.successes}/${log.attempts}`)}</strong><span>${esc(formatTrainingDate(log.createdAt))} · ${esc(optionText(trainingData.rewardOptions, log.rewardReliance))}</span>${log.comment ? `<p>${esc(log.comment)}</p>` : ""}<div><button data-training-edit-command="${esc(log.id)}">${esc(tl("edit"))}</button><button data-training-delete-command="${esc(log.id)}" aria-label="${esc(tl("delete"))}">${esc(tl("delete"))}</button></div></article>`).join("")}` : "<p>No saved training logs yet.</p>"}</div>`; }
function wasPractisedWithin(date, days) { return date && Date.now() - Date.parse(date) < days * 86400000; }
function needsPractice(command, state) { return (tr(command.priority) === "Critical" && (state.score ?? 0) < 5) || !wasPractisedWithin(state.lastPracticedAt, 14) || Number(state.rewardReliance) <= 1; }
function practiceRank(command) { const state = getCommandState(command.id); return (tr(command.priority) === "Critical" && (state.score ?? 0) < 5 ? 0 : 2) + (!wasPractisedWithin(state.lastPracticedAt, 14) ? 1 : 0) + (Number(state.rewardReliance) <= 1 ? 1 : 0); }
function formatTrainingDate(value) { if (!value) return "—"; const date = new Date(value); return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(currentLang === "jp" ? "ja-JP" : currentLang === "mm" ? "my-MM" : "en-SG", { day: "numeric", month: "short", year: "numeric" }); }

function renderTrainingRules() { const rules = ["Reward desired behaviour with food, toys, play, praise, access, or affection.", "Keep sessions short and make the exercise easier after repeated failure.", "Never frighten, intimidate, hit, pin, alpha-roll, shout at, or physically force Nako.", "Never use shock, prong, choke, or punishment tools.", "Never punish recall or forcibly release an object from her mouth.", "Stop physical training for soreness, fear, tiredness, reluctance, or instability; contact Edwin for pain, limping, coughing, injury, unusual fear, aggression, or abnormal behaviour."]; return `<details class="training-details"><summary>${esc(tl("rules"))}</summary>${noteList(rules.map((text) => ({ en: text, jp: text, mm: text })))}</details>`; }

function renderTrainingPlay() { return `<section class="training-play-list">${trainingData.activities.map((activity) => `<article class="play-card"><div><h2>${esc(tr(activity.title))}</h2><p>${esc(tr(activity.purpose))}</p></div><span>${esc(`${activity.duration} min · ${tr(activity.intensity)}`)}</span>${orderedList(activity.steps)}<div class="training-safety">${noteList(activity.safety)}</div><button class="action-button primary" data-training-add-play="${esc(activity.id)}">${esc(tl("addLog"))}</button>${trainingDraft?.kind === "play" && trainingDraft.activityId === activity.id ? renderPlayForm() : ""}</article>`).join("")}${renderTrainingVideos(trainingData.videos.filter((video) => video.activityIds.length))}</section>`; }
function newPlayDraft(activityId, log = null) { trainingDraft = { kind: "play", id: log?.id || "", activityId, date: log?.createdAt || nowIso(), durationMinutes: log?.durationMinutes ?? "", engagement: log?.engagement ?? 3, energyBefore: log?.energyBefore ?? 3, energyAfter: log?.energyAfter ?? 3, dropResponse: log?.dropResponse || "", allDoneResponse: log?.allDoneResponse || "", favouriteToy: log?.favouriteToy || "", comment: log?.comment || "", unusual: log?.unusual || "", saving: false }; }
function renderPlayForm() { const d = trainingDraft; return `<form class="training-form" data-training-form="play"><h3>${esc(tl("playLog"))}</h3><label>${esc(tl("duration"))}<input type="number" min="0" value="${esc(d.durationMinutes)}" data-training-input data-training-field="durationMinutes" /></label><div class="training-form-grid"><label>${esc(tl("engagement"))}<input type="number" min="1" max="5" value="${esc(d.engagement)}" data-training-input data-training-field="engagement" /></label><label>${esc(tl("energyBefore"))}<input type="number" min="1" max="5" value="${esc(d.energyBefore)}" data-training-input data-training-field="energyBefore" /></label><label>${esc(tl("energyAfter"))}<input type="number" min="1" max="5" value="${esc(d.energyAfter)}" data-training-input data-training-field="energyAfter" /></label></div><label>${esc(tl("dropResponse"))}<input value="${esc(d.dropResponse)}" data-training-input data-training-field="dropResponse" /></label><label>${esc(tl("allDoneResponse"))}<input value="${esc(d.allDoneResponse)}" data-training-input data-training-field="allDoneResponse" /></label><label>${esc(tl("favouriteToy"))}<input value="${esc(d.favouriteToy)}" data-training-input data-training-field="favouriteToy" /></label><label>${esc(tl("comment"))}<textarea data-training-input data-training-field="comment">${esc(d.comment)}</textarea></label><label>${esc(tl("unusual"))}<textarea data-training-input data-training-field="unusual">${esc(d.unusual)}</textarea></label><div class="training-form-actions"><button class="action-button primary" type="submit" ${d.saving ? "disabled" : ""}>${esc(tl("save"))}</button><button class="action-button secondary" type="button" data-training-cancel>${esc(tl("cancel"))}</button></div></form>`; }
function renderTrainingLog() { const training = getTrainingState(); const commandLogs = [...training.commandLogs].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))); const playLogs = [...training.playLogs].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))); const list = (logs, title, finder, edit, del) => `<section class="panel"><h2>${esc(title)}</h2>${logs.length ? `<div class="log-list">${logs.map((log) => { const item = finder(log); return `<article><strong>${esc(tr(item?.title || { en: log.commandId || log.activityId }))}</strong><span>${esc(formatTrainingDate(log.createdAt))}</span>${log.comment ? `<p>${esc(log.comment)}</p>` : ""}<div><button ${edit}="${esc(log.id)}">${esc(tl("edit"))}</button><button ${del}="${esc(log.id)}">${esc(tl("delete"))}</button></div></article>`; }).join("")}</div>` : "<p>—</p>"}</section>`; return `${list(commandLogs, tl("commandLog"), (log) => trainingData.commands.find((item) => item.id === log.commandId), "data-training-edit-command", "data-training-delete-command")}${list(playLogs, tl("playLog"), (log) => trainingData.activities.find((item) => item.id === log.activityId), "data-training-edit-play", "data-training-delete-play")}${trainingSuccessMessage ? `<p class="training-success" role="status">${esc(trainingSuccessMessage)}</p>` : ""}`; }

function emptyState() { return `<div class="empty-state">${esc(label("noItems"))}</div>`; }
function bySort(a, b) { return a.sortOrder - b.sortOrder; }

function renderDiaryFeedback(item) {
  const section = item.frequencyBucket ? homeSections.find((entry) => entry.id === item.frequencyBucket) : null;
  const todayKey = dateToKey(new Date());
  const diary = getDiaryState();
  const entry = diary.entries[todayKey] || null;
  const draft = getDiaryDraft(todayKey);
  const textValue = draft.text ?? entry?.originalText ?? "";
  const status = diarySaveInProgress ? "pending" : entry?.submittedAt ? "saved" : "idle";
  const statusText = diarySaveInProgress ? label("diarySaving") : entry?.submittedAt ? diaryEntryStatusLabel(status) : "";
  const statusBadge = statusText ? `<span class="diary-status ${esc(status)}">${esc(statusText)}</span>` : "";
  const actionLabel = entry?.submittedAt ? label("diaryUpdate") : label("diarySubmit");
  const message = diaryStatusMessage ? `<p class="diary-message">${esc(diaryStatusMessage)}</p>` : "";
  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), section?.iconBg || "#fff1f2", tr(section?.title || item.frequencyText), primaryPhoto(item.photos))}
    <section class="panel diary-entry-panel">
      <div class="diary-date-row">
        <span>${esc(label("diaryDate"))}</span>
        <strong>${esc(formatDiaryDate(todayKey))}</strong>
      </div>
      <p class="diary-prompt">${esc(label("diaryPrompt"))}</p>
      <textarea class="diary-field" data-diary-text="${esc(todayKey)}" placeholder="${esc(label("diaryPlaceholder"))}" ${diarySaveInProgress ? "disabled" : ""}>${esc(textValue)}</textarea>
      <div class="diary-actions">
        <button class="action-button primary" data-diary-submit="${esc(todayKey)}" ${diarySaveInProgress ? "disabled" : ""}>${esc(actionLabel)}</button>
        ${statusBadge}
      </div>
      ${message}
    </section>
    ${renderDiarySavedEntry(entry)}
    <section class="panel">
      <h2>${esc(label("diaryRecent"))}</h2>
      ${renderDiaryHistory()}
    </section>`;
  renderShell(tr(item.title), content, true);
}
function getDiaryDisplayText(entry) {
  if (!entry) return "";
  if (currentLang === "jp" && entry.translations?.jp) {
    return entry.translations.jp;
  }
  if (currentLang === "mm" && entry.translations?.mm) {
    return entry.translations.mm;
  }
  return entry.originalText || "";
}

function renderDiarySavedEntry(entry) {
  if (!entry) return "";
  const original = entry.originalText || "";
  const updated = entry.updatedAt ? `<span>${esc(label("diaryLastUpdated"))}: <strong>${esc(formatDiaryTimestamp(entry.updatedAt))}</strong></span>` : "";
  const jpTrans = entry.translations?.jp || "";
  const mmTrans = entry.translations?.mm || "";
  const currentPreview = getDiaryDisplayText(entry);

  const warningHtml = entry.translationReviewRequired
    ? `<div class="translation-warning" style="padding: 10px 12px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; color: #be123c; font-size: 13px; font-weight: 800; line-height: 1.4; display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
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
    
    <article class="diary-text-card">
      <h3>${esc(label("diaryOriginal"))}</h3>
      <p>${esc(original)}</p>
    </article>

    <article class="diary-text-card">
      <h3>${esc(label("diaryCurrentLanguagePreview"))} (${currentLang.toUpperCase()})</h3>
      <p>${esc(currentPreview)}</p>
    </article>

    <div class="diary-translations-section" style="display: grid; gap: 8px;">
      <h3 style="margin: 0; font-size: 14px; font-weight: 800; color: var(--ink);">${esc(label("diaryManualTranslations"))}</h3>
      ${warningHtml}
      <div>
        <label style="display: block; font-size: 12px; font-weight: 800; color: var(--muted); margin-bottom: 4px;">${esc(label("diaryJapaneseTranslation"))}</label>
        <textarea class="diary-field" data-diary-translation-date="${esc(entry.dateKey)}" data-diary-translation-lang="jp" placeholder="${esc(label("diaryTranslationPlaceholder"))}" style="min-height: 80px;">${esc(jpTrans)}</textarea>
      </div>
      <div>
        <label style="display: block; font-size: 12px; font-weight: 800; color: var(--muted); margin-bottom: 4px;">${esc(label("diaryMyanmarTranslation"))}</label>
        <textarea class="diary-field" data-diary-translation-date="${esc(entry.dateKey)}" data-diary-translation-lang="mm" placeholder="${esc(label("diaryTranslationPlaceholder"))}" style="min-height: 80px;">${esc(mmTrans)}</textarea>
      </div>
    </div>

    <button class="action-button secondary" data-diary-whatsapp>${esc(label("diaryWhatsApp"))}</button>
  </section>`;
}

function renderDiaryHistory() {
  const entries = Object.values(getDiaryState().entries || {})
    .filter((entry) => entry?.dateKey && entry?.originalText)
    .sort((a, b) => String(b.dateKey).localeCompare(String(a.dateKey)))
    .slice(0, 7);

  if (!entries.length) return `<div class="empty-state">${esc(label("diaryNoEntries"))}</div>`;

  return `<div class="diary-history-list">${entries.map((entry) => {
    return `<article class="diary-history-card">
      <div>
        <h3>${esc(formatDiaryDate(entry.dateKey))}</h3>
        <p>${esc(getDiaryDisplayText(entry))}</p>
      </div>
      <span class="diary-status saved">${esc(label("diarySavedStatus"))}</span>
    </article>`;
  }).join("")}</div>`;
}

/* ==========================================================================
   SECTION 5: INTERACTIVE EVENT LISTENERS & CONTROLLERS
   ========================================================================== */
function handleClick(event) {
  const back = event.target.closest("[data-back]");
  if (back) return handleBack();
  const langButton = event.target.closest("[data-lang]");
  if (langButton) { currentLang = langButton.dataset.lang; safeStorage.setItem(LANG_KEY, currentLang); return render(); }
  const syncBtn = event.target.closest("[data-sync-settings]");
  if (syncBtn) { handleSyncSettings(); return; }
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
  if (deleteCommand && confirm("Delete this training log?")) { const training = getTrainingState(); training.commandLogs = training.commandLogs.filter((item) => item.id !== deleteCommand.dataset.trainingDeleteCommand); refreshCommandFromLogs(); saveState(); return render(); }
  const editPlay = event.target.closest("[data-training-edit-play]");
  if (editPlay) { const log = getTrainingState().playLogs.find((item) => item.id === editPlay.dataset.trainingEditPlay); if (log) { newPlayDraft(log.activityId, log); trainingTab = "play"; return render(); } }
  const deletePlay = event.target.closest("[data-training-delete-play]");
  if (deletePlay && confirm("Delete this play log?")) { const training = getTrainingState(); training.playLogs = training.playLogs.filter((item) => item.id !== deletePlay.dataset.trainingDeletePlay); saveState(); return render(); }
  const section = event.target.closest("[data-section]");
  if (section) return go(`#section/${section.dataset.section}`);
  const routine = event.target.closest("[data-routine]");
  if (routine) return go(`#routine/${routine.dataset.routine}`);
  const food = event.target.closest("[data-food]");
  if (food) return go(`#food/${food.dataset.food}`);
  const recipe = event.target.closest("[data-recipe]");
  if (recipe) return go(`#recipe/${recipe.dataset.recipe}`);
}

function handleBack() {
  const route = parseRoute();
  if (route.view === "section") {
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

function handleSyncSettings() {
  let currentCode = "";
  try {
    currentCode = localStorage.getItem("nako-household-code") || "our-dog-nako";
  } catch {}

  const code = prompt(
    "Enter a Shared Household Sync Code to link your devices (e.g. 'our-dog-nako'):\n\nLeave blank to use default ('our-dog-nako').",
    currentCode
  );
  if (code === null) return; // Cancelled by user

  const trimmed = code.trim() || "our-dog-nako";
  if (trimmed === currentCode) return;

  if (trimmed.length < 3) {
    alert("Household code must be at least 3 characters.");
    return;
  }

  if (window.nakoFirebase?.updateHouseholdCode) {
    window.nakoFirebase.updateHouseholdCode(trimmed);
  } else {
    try {
      localStorage.setItem("nako-household-code", trimmed);
    } catch {}
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
    alert("Use a score from 0 to 10, non-negative attempts, and successes no greater than attempts.");
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
  const training = getTrainingState();
  const command = trainingData.commands.find((item) => item.id === commandId);
  const logs = training.commandLogs.filter((item) => item.commandId === commandId).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const latest = logs[0];
  const state = getCommandState(commandId);
  if (!latest) {
    Object.assign(state, baselineCommandState(command));
    return;
  }
  Object.assign(state, { score: latest.score, rewardReliance: latest.rewardReliance, bestEnvironment: latest.environment, successes: latest.successes, attempts: latest.attempts, latestComment: latest.comment, lastPracticedAt: latest.createdAt, updatedAt: nowIso() });
}

function savePlayLog() {
  const draft = trainingDraft;
  const engagement = validInteger(draft.engagement, 1, 5);
  const energyBefore = validInteger(draft.energyBefore, 1, 5);
  const energyAfter = validInteger(draft.energyAfter, 1, 5);
  if (engagement === null || energyBefore === null || energyAfter === null) {
    trainingDraft.saving = false;
    alert("Engagement and energy scores must be from 1 to 5.");
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
  if (event.target.closest?.("[data-training-input]")) return saveState();
  const diaryText = event.target.closest?.("[data-diary-text]");
  if (diaryText) saveState();
  const diaryTrans = event.target.closest?.("[data-diary-translation-date]");
  if (diaryTrans) saveState();
}

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
    renderUnlessDiaryTyping();
  });

  firebaseSync.startStateSync({
    getLocalState: () => appState,
    applyRemoteState: (nextState) => {
      appState = nextState && typeof nextState === "object" ? nextState : {};
      saveState({ remote: false });
      renderUnlessDiaryTyping();
    }
  });
}

function ingredientImage(key) {
  const filename = ingredientCatalog[key]?.file;
  return filename ? `assets/ingredients/${filename}` : null;
}

function esc(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function richText(value) {
  return esc(value).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function handleChange(event) {
  const trainingFilter = event.target.closest("[data-training-filter]");
  if (trainingFilter) { trainingFilters[trainingFilter.dataset.trainingFilter] = trainingFilter.value; return render(); }
  const trainingField = event.target.closest("[data-training-input]");
  if (trainingField && trainingDraft && trainingField.dataset.trainingField) {
    trainingDraft[trainingField.dataset.trainingField] = trainingField.value;
    return saveStateDebounced();
  }
  const weightInput = event.target.closest("[data-weight-date]");
  if (weightInput) {
    appState.weightTracking ||= {};
    const val = weightInput.value.trim();
    appState.weightTracking[weightInput.dataset.weightDate] = {
      value: val !== "" ? parseFloat(val) : "",
      updatedAt: nowIso()
    };
    saveState();
    render();
    return;
  }
  const yearSelect = event.target.closest("[data-archive-year-select]");
  if (yearSelect) {
    selectedArchiveYear = parseInt(yearSelect.value);
    render();
  }
}

/* ==========================================================================
   SECTION 7: WEIGHT LOGGING MODULE & TREND GRAPH
   ========================================================================== */
function dateToKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function nowIso() {
  return new Date().toISOString();
}

function formatDiaryDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return date.toLocaleDateString(currentLang === "jp" ? "ja-JP" : currentLang === "mm" ? "my-MM" : "en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short"
  });
}

function formatDiaryTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(currentLang === "jp" ? "ja-JP" : currentLang === "mm" ? "my-MM" : "en-SG", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function diaryEntryStatusLabel(status) {
  if (status === "pending") return label("diarySaving");
  return label("diarySavedStatus");
}

function formatWeightDate(date, lang) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formatted = date.toLocaleDateString(lang === 'jp' ? 'ja-JP' : lang === 'mm' ? 'my-MM' : 'en-US', options);
  
  const dayNames = {
    en: "Sunday",
    jp: "日曜日",
    mm: "တနင်္ဂနွေ"
  };
  return `${formatted} (${dayNames[lang] || dayNames.en})`;
}

function getLatestDueSunday() {
  const start = new Date(2026, 6, 12); // July 12, 2026
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (now < start) return start;

  const latest = new Date(now);
  latest.setDate(now.getDate() - now.getDay());
  latest.setHours(0, 0, 0, 0);

  return latest < start ? start : latest;
}

function getPreviousWeight(targetDateStr) {
  const tracking = appState.weightTracking || {};
  const dates = Object.keys(tracking)
    .filter(d => {
      const val = getWeightValue(tracking[d]);
      return d < targetDateStr && val !== "" && !isNaN(parseFloat(val));
    })
    .sort();
  if (dates.length > 0) {
    const prevDate = dates[dates.length - 1];
    return parseFloat(getWeightValue(tracking[prevDate]));
  }
  return null;
}

function getArchiveYears() {
  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  const years = new Set();
  
  for (let y = startYear; y <= currentYear; y++) {
    years.add(y);
  }
  
  const tracking = appState.weightTracking || {};
  Object.keys(tracking).forEach(dateStr => {
    const match = dateStr.match(/^(\d{4})/);
    if (match) {
      years.add(parseInt(match[1]));
    }
  });
  
  return Array.from(years).sort((a, b) => b - a);
}

function getSundaysForYear(year) {
  const startOfTracking = new Date(2026, 6, 12); // July 12, 2026
  const sundays = [];
  let current = new Date(year, 0, 1);
  
  while (current.getDay() !== 0) {
    current.setDate(current.getDate() + 1);
  }
  
  while (current.getFullYear() === year) {
    if (current >= startOfTracking) {
      sundays.push(new Date(current));
    }
    current.setDate(current.getDate() + 7);
  }
  return sundays;
}

function renderWeightTracking(item) {
  const hasInstructions = item.instructions.length > 1 || (item.instructions.length === 1 && tr(item.instructions[0]) !== tr(item.summary));
  const instructionsPanel = hasInstructions ? `<section class="panel"><h2>${esc(label("instructions"))}</h2>${orderedList(item.instructions)}</section>` : "";
  const section = item.frequencyBucket ? homeSections.find((entry) => entry.id === item.frequencyBucket) : null;
  const headerLabel = section ? tr(section.title) : label("foodItems");
  const headerIconBg = section?.iconBg || "#fff0eb";
  
  if (!selectedArchiveYear) {
    const years = getArchiveYears();
    selectedArchiveYear = years[0] || new Date().getFullYear();
  }

  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), headerIconBg, headerLabel, primaryPhoto(item.photos))}
    ${instructionsPanel}
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2>${noteList(item.mustRemember)}</section>
    
    <section class="panel">
      <h2>${esc(label("quickEntry"))}</h2>
      ${renderQuickEntryPanel()}
    </section>

    <section class="panel">
      <h2>${esc(label("weightTrend"))}</h2>
      ${renderWeightGraph()}
    </section>
    
    <section class="panel">
      <h2>${esc(label("recentEntries"))}</h2>
      ${renderRecentEntriesPanel()}
    </section>

    <section class="panel">
      <h2>${esc(label("archive"))}</h2>
      ${renderArchivePanel()}
    </section>
  `;
  renderShell(tr(item.title), content, true);
}

function renderQuickEntryPanel() {
  const latestSunday = getLatestDueSunday();
  const key = dateToKey(latestSunday);
  const tracking = appState.weightTracking || {};
  const val = getWeightValue(tracking[key]) !== undefined ? getWeightValue(tracking[key]) : "";
  
  const prevWeight = getPreviousWeight(key);
  let prevHtml = "";
  let diffHtml = "";

  if (prevWeight !== null) {
    prevHtml = `<span class="prev-weight">${esc(label("previous"))}: <strong>${prevWeight.toFixed(2)} kg</strong></span>`;
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      const diff = numVal - prevWeight;
      if (diff > 0) {
        diffHtml = `<span class="diff plus">+${diff.toFixed(2)} kg</span>`;
      } else if (diff < 0) {
        diffHtml = `<span class="diff minus">${diff.toFixed(2)} kg</span>`;
      } else {
        diffHtml = `<span class="diff neutral">0.00 kg</span>`;
      }
    }
  } else {
    prevHtml = `<span class="prev-weight">${esc(label("previous"))}: <strong>—</strong></span>`;
  }

  const displayDate = formatWeightDate(latestSunday, currentLang);
  return `
    <div class="quick-entry-card">
      <div class="quick-entry-header">
        <span class="label-due">${esc(label("latestDueSunday"))}</span>
        <span class="date">${esc(displayDate)}</span>
      </div>
      <div class="quick-entry-body">
        <div class="input-wrapper">
          <input type="number" step="0.01" min="0" placeholder="--" value="${esc(val)}" data-weight-date="${esc(key)}" aria-label="${esc(displayDate)}" />
          <span class="unit">kg</span>
        </div>
        <div class="quick-entry-meta">
          ${prevHtml}
          ${diffHtml}
        </div>
      </div>
    </div>
  `;
}

function renderRecentEntriesPanel() {
  const tracking = appState.weightTracking || {};
  const loggedKeys = Object.keys(tracking)
    .filter(d => getWeightValue(tracking[d]) !== "" && !isNaN(parseFloat(getWeightValue(tracking[d]))))
    .sort(); // ascending chronological

  if (loggedKeys.length === 0) {
    return `<div class="empty-state">${esc(label("noWeightYet"))}</div>`;
  }

  const diffs = {};
  for (let i = 0; i < loggedKeys.length; i++) {
    const key = loggedKeys[i];
    const val = parseFloat(getWeightValue(tracking[key]));
    if (i > 0) {
      const prevKey = loggedKeys[i - 1];
      const prevVal = parseFloat(getWeightValue(tracking[prevKey]));
      diffs[key] = val - prevVal;
    }
  }

  const recentKeys = [...loggedKeys].reverse().slice(0, 8);

  const rows = recentKeys.map(key => {
    const val = parseFloat(getWeightValue(tracking[key]));
    const diff = diffs[key];
    let diffHtml = '<span class="diff neutral">—</span>';
    if (diff !== undefined) {
      if (diff > 0) {
        diffHtml = `<span class="diff plus">+${diff.toFixed(2)} kg</span>`;
      } else if (diff < 0) {
        diffHtml = `<span class="diff minus">${diff.toFixed(2)} kg</span>`;
      } else {
        diffHtml = `<span class="diff neutral">0.00 kg</span>`;
      }
    }

    const dateObj = new Date(key);
    const displayDate = formatWeightDate(dateObj, currentLang);

    return `
      <div class="recent-weight-row">
        <span class="date">${esc(displayDate)}</span>
        <span class="weight-value">${val.toFixed(2)} <span class="unit">kg</span></span>
        ${diffHtml}
      </div>
    `;
  }).join("");

  return `<div class="recent-entries-list">${rows}</div>`;
}

function renderArchivePanel() {
  const years = getArchiveYears();
  const selectedYear = selectedArchiveYear || years[0] || new Date().getFullYear();
  
  const dropdownOptions = years.map(y => `
    <option value="${y}" ${y === selectedYear ? "selected" : ""}>${y}</option>
  `).join("");

  const sundays = getSundaysForYear(selectedYear);
  const tracking = appState.weightTracking || {};

  const rows = [...sundays].reverse().map(date => {
    const key = dateToKey(date);
    const val = getWeightValue(tracking[key]) !== undefined ? getWeightValue(tracking[key]) : "";
    
    let diffHtml = '<span class="diff neutral">—</span>';
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      const prevWeight = getPreviousWeight(key);
      if (prevWeight !== null) {
        const diff = numVal - prevWeight;
        if (diff > 0) {
          diffHtml = `<span class="diff plus">+${diff.toFixed(2)} kg</span>`;
        } else if (diff < 0) {
          diffHtml = `<span class="diff minus">${diff.toFixed(2)} kg</span>`;
        } else {
          diffHtml = `<span class="diff neutral">0.00 kg</span>`;
        }
      }
    }

    const displayDate = formatWeightDate(date, currentLang);
    return `
      <div class="weight-row">
        <span class="date">${esc(displayDate)}</span>
        <div class="input-wrapper">
          <input type="number" step="0.01" min="0" placeholder="--" value="${esc(val)}" data-weight-date="${esc(key)}" aria-label="${esc(displayDate)}" />
          <span class="unit">kg</span>
        </div>
        ${diffHtml}
      </div>
    `;
  }).join("");

  return `
    <div class="archive-controls">
      <label for="archive-year-select">${esc(label("selectYear"))}:</label>
      <select id="archive-year-select" data-archive-year-select>
        ${dropdownOptions}
      </select>
    </div>
    <div class="weight-log-table">
      ${rows}
    </div>
  `;
}

function renderWeightGraph() {
  const tracking = appState.weightTracking || {};
  const entries = Object.keys(tracking)
    .filter(d => getWeightValue(tracking[d]) !== "" && !isNaN(parseFloat(getWeightValue(tracking[d]))))
    .sort()
    .map(d => ({ dateStr: d, weight: parseFloat(getWeightValue(tracking[d])) }));

  if (entries.length < 2) {
    return `
      <div class="graph-placeholder">
        <svg viewBox="0 0 100 100" width="60" height="60" fill="none" stroke="#f7b7be" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10,90 L90,90 M10,90 L10,10 M10,90 L30,70 L50,80 L70,40 L90,20" />
          <circle cx="90" cy="20" r="5" fill="#e86f88" />
        </svg>
        <p style="margin: 8px 0 0; font-size: 13px;">${esc(label("weightGraphPlaceholder"))}</p>
      </div>
    `;
  }

  const width = 600;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 25;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const weights = entries.map(e => e.weight);
  const minW = Math.min(...weights) - 0.2;
  const maxW = Math.max(...weights) + 0.2;
  const rangeW = maxW - minW || 1;

  const getX = (index) => paddingLeft + (index / (entries.length - 1)) * chartWidth;
  const getY = (w) => paddingTop + chartHeight - ((w - minW) / rangeW) * chartHeight;

  const pathD = entries.map((e, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(e.weight)}`).join(" ");
  const areaD = `${pathD} L ${getX(entries.length - 1)} ${paddingTop + chartHeight} L ${getX(0)} ${paddingTop + chartHeight} Z`;

  const gridLines = [];
  const gridCount = 3;
  for (let i = 0; i < gridCount; i++) {
    const wVal = minW + (i / (gridCount - 1)) * rangeW;
    const yVal = getY(wVal);
    gridLines.push(`
      <line x1="${paddingLeft}" y1="${yVal}" x2="${width - paddingRight}" y2="${yVal}" stroke="#f1f3f2" stroke-width="1" stroke-dasharray="4,4" />
      <text x="${paddingLeft - 8}" y="${yVal + 4}" text-anchor="end" font-family="system-ui" font-size="10" fill="#718076">${wVal.toFixed(1)}</text>
    `);
  }

  const xLabels = [];
  const labelIndices = [0, Math.floor((entries.length - 1) / 2), entries.length - 1];
  const uniqueIndices = [...new Set(labelIndices.filter(idx => idx >= 0 && idx < entries.length))];
  
  uniqueIndices.forEach(idx => {
    const entry = entries[idx];
    const xVal = getX(idx);
    const dateObj = new Date(entry.dateStr);
    const dateText = dateObj.toLocaleDateString(currentLang === 'jp' ? 'ja-JP' : currentLang === 'mm' ? 'my-MM' : 'en-US', { day: 'numeric', month: 'short' });
    xLabels.push(`
      <text x="${xVal}" y="${height - 10}" text-anchor="middle" font-family="system-ui" font-size="10" fill="#718076">${dateText}</text>
    `);
  });

  const dots = entries.map((e, i) => `
    <g class="graph-point">
      <circle cx="${getX(i)}" cy="${getY(e.weight)}" r="6" fill="#e86f88" stroke="#ffffff" stroke-width="2" />
      <text x="${getX(i)}" y="${getY(e.weight) - 10}" text-anchor="middle" font-family="system-ui" font-size="10" font-weight="700" fill="#25302c" class="point-label">${e.weight}</text>
    </g>
  `).join("");

  return `
    <div class="weight-graph-wrapper">
      <svg viewBox="0 0 ${width} ${height}" class="weight-chart">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f7b7be" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#f7b7be" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        ${gridLines.join("")}
        <path d="${areaD}" fill="url(#chartGrad)" />
        <path d="${pathD}" fill="none" stroke="#e86f88" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        ${xLabels.join("")}
        ${dots}
      </svg>
    </div>
  `;
}


