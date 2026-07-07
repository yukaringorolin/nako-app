const LANG_KEY = "nako-care-language";
const STATE_KEY = "nako-care-state-v2";
const NAKO_LOGO_SRC = "assets/nako-logo.png";
const { langs, ui, homeSections, foodItems, routineTasks, recipes, cookingRules } = window.nakoData;

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
let selectedArchiveYear = null;
let firebaseStatus = window.nakoFirebase?.status?.() || { mode: "local" };
const app = document.querySelector("#app");

window.addEventListener("hashchange", render);
document.addEventListener("click", handleClick);
document.addEventListener("input", handleInput);
document.addEventListener("change", handleChange);
initFirebaseSync();
render();

function loadState() {
  try { return JSON.parse(safeStorage.getItem(STATE_KEY)) || {}; } catch { return {}; }
}

function saveState(options = {}) {
  safeStorage.setItem(STATE_KEY, JSON.stringify(appState));
  if (options.remote !== false) window.nakoFirebase?.saveRemoteState?.(appState);
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

function render() {
  document.documentElement.lang = currentLang === "jp" ? "ja" : currentLang === "mm" ? "my" : "en";
  const route = parseRoute();
  if (route.view === "section") return renderSection(route.sectionId);
  if (route.view === "routine") return renderRoutine(route.routineId);
  if (route.view === "food") return renderFood(route.foodId);
  if (route.view === "recipe") return renderRecipe(route.recipeId);
  renderHome();
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
    <section class="card-list">${homeSections.map(renderSectionCard).join("")}</section>`;
  renderShell(label("appTitle"), content, false);
}

function renderShortcuts() {
  const shortcutList = [
    { id: "nako-weight-tracking", type: "routine", labelKey: "shortcutNakoWeight" },
    { id: "meal-logs", type: "food", labelKey: "shortcutMealLogs" },
    { id: "recipes", type: "food", labelKey: "shortcutNakoToppings" },
    { id: "human-food", type: "food", labelKey: "shortcutHumanFood" },
    { id: "cooking-rules", type: "food", labelKey: "shortcutCookingRules" },
    { id: "nako-training-fun", type: "routine", labelKey: "shortcutDogTraining" }
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
  if (task.id === "nako-weight-tracking") return renderWeightTracking(task);
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
  const content = `
    ${renderHead(recipe.icon, tr(recipe.title), tr(recipe.description), "#fff0eb", label("recipes"), primaryPhoto(recipe.photos))}
    ${renderPhotos(recipe.photos)}
    <section class="panel"><h2>${esc(label("recipeName"))}</h2><p>${esc(tr(recipe.title))}</p></section>
    <section class="panel"><h2>${esc(label("ingredients"))}</h2><ul class="ingredient-list">${recipe.ingredients.map(renderIngredient).join("")}</ul></section>
    <section class="panel"><h2>${esc(label("method"))}</h2>${orderedList(recipe.method)}</section>
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2><p>${esc(tr(recipe.note))}</p></section>`;
  renderShell(tr(recipe.title), content, true);
}

function renderHead(icon, title, description, iconBg, eyebrow, photo = null) {
  return `<section class="detail-head" style="--icon-bg:${iconBg}">${renderLargeIcon(icon, photo)}<div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p class="lead">${esc(description)}</p></div></section>`;
}

function renderSectionCard(section) {
  const count = section.id === "food" ? foodItems.length : routineTasks.filter((task) => task.frequencyBucket === section.id).length;
  return `<button class="category-card" data-section="${esc(section.id)}" style="--accent:${section.accent};--icon-bg:${section.iconBg}">${renderCardIcon(section.icon, sectionPhoto(section))}<span class="card-copy"><span class="card-title">${esc(tr(section.title))}</span><span class="card-description">${esc(tr(section.description))}</span><span class="card-meta"><span class="badge">${count} ${esc(section.id === "food" ? label("foodItems") : label("routineItems"))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderFoodCard(item) {
  return `<button class="item-card" data-food="${esc(item.id)}" style="--accent:#f19a82;--icon-bg:#fff0eb">${renderCardIcon(item.icon, primaryPhoto(item.photos))}<span class="card-copy"><span class="card-title">${esc(tr(item.title))}</span><span class="card-description">${esc(tr(item.summary))}</span><span class="card-meta"><span class="badge">${esc(item.trackingMode === "future" ? label("futureTracking") : label("foodItems"))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderRoutineCard(task, section) {
  return `<button class="item-card routine-card" data-routine="${esc(task.id)}" style="--accent:${section.accent};--icon-bg:${section.iconBg}">${renderCardIcon(task.icon, primaryPhoto(task.photos))}<span class="card-copy"><span class="card-title">${esc(tr(task.title))}</span><span class="card-description">${esc(tr(task.summary))}</span><span class="card-meta"><span class="badge">${esc(tr(task.frequencyText))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderRecipeCard(recipe) {
  return `<button class="recipe-card" data-recipe="${esc(recipe.id)}">${renderCardIcon(recipe.icon, primaryPhoto(recipe.photos))}<span class="card-copy"><span class="card-title">${esc(tr(recipe.title))}</span><span class="card-description">${esc(tr(recipe.description))}</span></span><span class="chevron">›</span></button>`;
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

function renderIngredient(item) {
  return `<li class="ingredient-row"><img src="${ingredientImage(item.key)}" alt="${esc(tr(item.name))}" /><span class="ingredient-name">${esc(tr(item.name))}</span><span class="amount">${esc(item.amount)}</span></li>`;
}

function orderedList(items) {
  return `<ol class="method-list">${items.map((item, index) => `<li><span>${index + 1}.</span><span>${esc(tr(item))}</span></li>`).join("")}</ol>`;
}

function noteList(items) {
  return `<ul class="note-list">${items.map((item) => `<li><span>•</span><span>${esc(tr(item))}</span></li>`).join("")}</ul>`;
}

function renderVideo(videoUrl) {
  if (!videoUrl) return "";
  return `<section class="panel"><h2>${esc(label("video"))}</h2><div class="video-shell"><iframe src="${esc(videoUrl)}" title="${esc(label("video"))}" allowfullscreen></iframe></div></section>`;
}

function emptyState() { return `<div class="empty-state">${esc(label("noItems"))}</div>`; }
function bySort(a, b) { return a.sortOrder - b.sortOrder; }

function handleClick(event) {
  const back = event.target.closest("[data-back]");
  if (back) return handleBack();
  const langButton = event.target.closest("[data-lang]");
  if (langButton) { currentLang = langButton.dataset.lang; safeStorage.setItem(LANG_KEY, currentLang); return render(); }
  const syncBtn = event.target.closest("[data-sync-settings]");
  if (syncBtn) { handleSyncSettings(); return; }
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

function handleInput(event) {
  const foodMemo = event.target.closest("[data-food-memo]");
  if (foodMemo) { getFoodState(foodMemo.dataset.foodMemo).memo = foodMemo.value; return saveState(); }
}

function getFoodState(id) {
  appState.food ||= {};
  appState.food[id] ||= { memo: "" };
  return appState.food[id];
}

function initFirebaseSync() {
  const firebaseSync = window.nakoFirebase;
  if (!firebaseSync) return;

  firebaseSync.onStatus((status) => {
    firebaseStatus = status;
    render();
  });

  firebaseSync.startStateSync({
    getLocalState: () => appState,
    applyRemoteState: (nextState) => {
      appState = nextState && typeof nextState === "object" ? nextState : {};
      saveState({ remote: false });
      render();
    }
  });
}

function ingredientImage(key) {
  const visuals = {
    "chicken-tender": ["CT", "#f7d9c4"], pumpkin: ["P", "#ffd998"], carrot: ["C", "#ffd1a8"], whitefish: ["F", "#d8edf7"], "sweet-potato": ["SP", "#f1d0e4"], zucchini: ["Z", "#d7edce"], "chicken-breast": ["CB", "#f4d9d2"], "napa-cabbage": ["NC", "#dff2cf"], broccoli: ["B", "#d7efd9"],
  };
  const [text, color] = visuals[key] || ["?", "#edf1ee"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="16" fill="${color}"/><circle cx="70" cy="22" r="20" fill="#fff" opacity=".38"/><text x="48" y="57" text-anchor="middle" font-family="Arial" font-size="26" font-weight="700" fill="#25302c">${text}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function esc(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function handleChange(event) {
  const weightInput = event.target.closest("[data-weight-date]");
  if (weightInput) {
    appState.weightTracking ||= {};
    const val = weightInput.value.trim();
    appState.weightTracking[weightInput.dataset.weightDate] = val !== "" ? parseFloat(val) : "";
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

function dateToKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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
    .filter(d => d < targetDateStr && tracking[d] !== "" && !isNaN(parseFloat(tracking[d])))
    .sort();
  if (dates.length > 0) {
    const prevDate = dates[dates.length - 1];
    return parseFloat(tracking[prevDate]);
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
  const val = tracking[key] !== undefined ? tracking[key] : "";
  
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
    .filter(d => tracking[d] !== "" && !isNaN(parseFloat(tracking[d])))
    .sort(); // ascending chronological

  if (loggedKeys.length === 0) {
    return `<div class="empty-state">${esc(label("noWeightYet"))}</div>`;
  }

  const diffs = {};
  for (let i = 0; i < loggedKeys.length; i++) {
    const key = loggedKeys[i];
    const val = parseFloat(tracking[key]);
    if (i > 0) {
      const prevKey = loggedKeys[i - 1];
      const prevVal = parseFloat(tracking[prevKey]);
      diffs[key] = val - prevVal;
    }
  }

  const recentKeys = [...loggedKeys].reverse().slice(0, 8);

  const rows = recentKeys.map(key => {
    const val = parseFloat(tracking[key]);
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
    const val = tracking[key] !== undefined ? tracking[key] : "";
    
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
    .filter(d => tracking[d] !== "" && !isNaN(parseFloat(tracking[d])))
    .sort()
    .map(d => ({ dateStr: d, weight: parseFloat(tracking[d]) }));

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


