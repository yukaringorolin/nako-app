const LANG_KEY = "nako-care-language";
const STATE_KEY = "nako-care-state-v2";
const { langs, ui, homeSections, foodItems, routineTasks, recipes, cookingRules } = window.nakoData;
const text = (en) => ({ en, jp: en, mm: en });

let currentLang = langs.includes(localStorage.getItem(LANG_KEY)) ? localStorage.getItem(LANG_KEY) : "en";
let appState = loadState();
const app = document.querySelector("#app");

window.addEventListener("hashchange", render);
document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("input", handleInput);
render();

function loadState() {
  try { return JSON.parse(localStorage.getItem(STATE_KEY)) || {}; } catch { return {}; }
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(appState));
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
          <img src="assets/nako-logo.png" alt="Nako" />
          <span class="screen-title">${esc(title)}</span>
        </div>
        <div class="language-toggle" aria-label="Language">
          ${langs.map((language) => `<button data-lang="${language}" aria-pressed="${language === currentLang}">${language.toUpperCase()}</button>`).join("")}
        </div>
      </header>
      <div class="content">${content}</div>
    </div>`;
}

function renderHome() {
  const content = `
    <section class="home-hero">
      <img src="assets/nako-logo.png" alt="Nako" />
      <div>
        <p class="eyebrow">${esc(label("homeEyebrow"))}</p>
        <h1>${esc(label("appTitle"))}</h1>
        <p class="lead">${esc(label("appSubtitle"))}</p>
      </div>
    </section>
    <section class="rule-strip compact"><h2>${esc(label("foodItems"))}</h2><p>${esc(label("foodFirst"))}</p></section>
    <p class="section-label">${esc(label("sections"))}</p>
    <section class="card-list">${homeSections.map(renderSectionCard).join("")}</section>`;
  renderShell(label("appTitle"), content, false);
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
  const state = getRoutineState(task.id);
  const doneToday = state.lastCompleted === todayString();
  const content = `
    ${renderHead(task.icon, tr(task.title), tr(task.summary), section?.iconBg || "#fff1f2", tr(section?.title || task.frequencyText))}
    <section class="panel"><h2>${esc(label("frequency"))}</h2><span class="frequency-pill">${esc(tr(task.frequencyText))}</span></section>
    <section class="panel"><h2>${esc(label("description"))}</h2><p>${esc(tr(task.summary))}</p></section>
    <section class="panel"><h2>${esc(label("instructions"))}</h2>${orderedList(task.instructions)}</section>
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2>${noteList(task.mustRemember)}</section>
    ${renderVideo(task.videoUrl)}
    <section class="panel"><h2>${esc(label("checklist"))}</h2>${renderChecklist("routine", task.id, defaultChecklist(), state)}</section>
    <section class="panel"><div class="routine-actions">
      <button class="done-button" data-routine-done="${esc(task.id)}" aria-pressed="${doneToday}">${esc(doneToday ? label("completedToday") : label("markDoneToday"))}</button>
      <button class="help-button" data-routine-help="${esc(task.id)}" aria-pressed="${!!state.needHelp}">${esc(state.needHelp ? label("helpRequested") : label("needHelp"))}</button>
    </div></section>
    <section class="panel"><div class="last-date"><span>${esc(label("lastCompleted"))}</span><strong>${esc(state.lastCompleted || label("never"))}</strong></div></section>`;
  renderShell(tr(task.title), content, true);
}

function renderFood(foodId) {
  const item = foodItems.find((entry) => entry.id === foodId);
  if (!item) return renderHome();
  if (item.type === "recipeIndex") return renderRecipeIndex(item);
  const state = getFoodState(item.id);
  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), "#fff0eb", label(item.trackingMode === "future" ? "futureTracking" : "foodItems"))}
    ${item.type === "rules" ? renderRulesPanel() : ""}
    <section class="panel"><h2>${esc(label("description"))}</h2><p>${esc(tr(item.summary))}</p></section>
    <section class="panel"><h2>${esc(label("instructions"))}</h2>${orderedList(item.instructions)}</section>
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2>${noteList(item.mustRemember)}</section>
    ${renderVideo(item.videoUrl)}
    <section class="panel"><h2>${esc(label("memo"))}</h2><textarea class="memo-field" data-food-memo="${esc(item.id)}" placeholder="${esc(label("memoPlaceholder"))}">${esc(state.memo || "")}</textarea></section>`;
  renderShell(tr(item.title), content, true);
}

function renderRecipeIndex(item) {
  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), "#fff0eb", label("recipes"))}
    <section class="card-list">${recipes.map(renderRecipeCard).join("")}</section>`;
  renderShell(tr(item.title), content, true);
}

function renderRecipe(recipeId) {
  const recipe = recipes.find((entry) => entry.id === recipeId);
  if (!recipe) return renderHome();
  const state = getRecipeState(recipe.id);
  const content = `
    ${renderHead(recipe.icon, tr(recipe.title), tr(recipe.description), "#fff0eb", label("recipes"))}
    <section class="panel"><h2>${esc(label("recipeName"))}</h2><p>${esc(tr(recipe.title))}</p></section>
    <section class="panel"><h2>${esc(label("ingredients"))}</h2><ul class="ingredient-list">${recipe.ingredients.map(renderIngredient).join("")}</ul></section>
    <section class="panel"><h2>${esc(label("method"))}</h2>${orderedList(recipe.method)}</section>
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2><p>${esc(tr(recipe.note))}</p></section>
    <section class="panel"><h2>${esc(label("memo"))}</h2><textarea class="memo-field" data-recipe-memo="${esc(recipe.id)}" placeholder="${esc(label("memoPlaceholder"))}">${esc(state.memo || "")}</textarea></section>`;
  renderShell(tr(recipe.title), content, true);
}

function renderHead(icon, title, description, iconBg, eyebrow) {
  return `<section class="detail-head" style="--icon-bg:${iconBg}"><div class="large-icon">${esc(icon)}</div><div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p class="lead">${esc(description)}</p></div></section>`;
}

function renderSectionCard(section) {
  const count = section.id === "food" ? foodItems.length : routineTasks.filter((task) => task.frequencyBucket === section.id).length;
  return `<button class="category-card" data-section="${esc(section.id)}" style="--accent:${section.accent};--icon-bg:${section.iconBg}"><span class="card-icon">${esc(section.icon)}</span><span class="card-copy"><span class="card-title">${esc(tr(section.title))}</span><span class="card-description">${esc(tr(section.description))}</span><span class="card-meta"><span class="badge">${count} ${esc(section.id === "food" ? label("foodItems") : label("routineItems"))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderFoodCard(item) {
  return `<button class="item-card" data-food="${esc(item.id)}" style="--accent:#f19a82;--icon-bg:#fff0eb"><span class="card-icon">${esc(item.icon)}</span><span class="card-copy"><span class="card-title">${esc(tr(item.title))}</span><span class="card-description">${esc(tr(item.summary))}</span><span class="card-meta"><span class="badge">${esc(item.trackingMode === "future" ? label("futureTracking") : label("foodItems"))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderRoutineCard(task, section) {
  const state = getRoutineState(task.id);
  const badgeClass = state.lastCompleted === todayString() ? "complete" : state.needHelp ? "need_help" : "";
  const badgeText = state.needHelp ? label("helpRequested") : state.lastCompleted === todayString() ? label("completedToday") : tr(task.frequencyText);
  return `<button class="item-card routine-card" data-routine="${esc(task.id)}" style="--accent:${section.accent};--icon-bg:${section.iconBg}"><span class="card-icon">${esc(task.icon)}</span><span class="card-copy"><span class="card-title">${esc(tr(task.title))}</span><span class="card-description">${esc(tr(task.summary))}</span><span class="card-meta"><span class="badge ${badgeClass}">${esc(badgeText)}</span></span></span><span class="chevron">›</span></button>`;
}

function renderRecipeCard(recipe) {
  return `<button class="recipe-card" data-recipe="${esc(recipe.id)}"><span class="card-icon">${esc(recipe.icon)}</span><span class="card-copy"><span class="card-title">${esc(tr(recipe.title))}</span><span class="card-description">${esc(tr(recipe.description))}</span></span><span class="chevron">›</span></button>`;
}

function renderPinnedSafety() {
  const pinned = routineTasks.filter((task) => ["nako-emergency", "nako-kind-handling", "nako-supervision"].includes(task.id));
  return `<section class="rule-strip"><h2>${esc(label("pinnedSafety"))}</h2><div class="mini-list">${pinned.map((task) => `<button class="mini-link" data-routine="${esc(task.id)}">${esc(tr(task.title))}</button>`).join("")}</div></section>`;
}

function renderRulesPanel() {
  return `<section class="rule-strip"><h2>${esc(label("cookingRules"))}</h2><ul>${cookingRules.map((rule) => `<li>${esc(tr(rule))}</li>`).join("")}</ul></section>`;
}

function renderIngredient(item) {
  return `<li class="ingredient-row"><img src="${ingredientImage(item.key)}" alt="${esc(tr(item.name))}" /><span class="ingredient-name">${esc(tr(item.name))}</span><span class="amount">${esc(item.amount)}</span></li>`;
}

function renderChecklist(kind, id, entries, state) {
  return `<div class="checklist">${entries.map((entry, index) => `<label class="check-row"><input type="checkbox" data-check-kind="${kind}" data-check-id="${esc(id)}" data-check-index="${index}" ${state.checklist?.[index] ? "checked" : ""}/><span>${esc(tr(entry))}</span></label>`).join("")}</div>`;
}

function defaultChecklist() {
  return [text("Read the instructions"), text("Complete the task"), text("Reset the area and report anything unusual")];
}

function orderedList(items) {
  return `<ol class="method-list">${items.map((item, index) => `<li><span>${index + 1}.</span><span>${esc(tr(item))}</span></li>`).join("")}</ol>`;
}

function noteList(items) {
  return `<ul class="note-list">${items.map((item) => `<li><span>•</span><span>${esc(tr(item))}</span></li>`).join("")}</ul>`;
}

function renderVideo(videoUrl) {
  if (!videoUrl) return `<section class="panel muted-panel"><h2>${esc(label("video"))}</h2><p>${esc(label("videoComingSoon"))}</p></section>`;
  return `<section class="panel"><h2>${esc(label("video"))}</h2><div class="video-shell"><iframe src="${esc(videoUrl)}" title="${esc(label("video"))}" allowfullscreen></iframe></div></section>`;
}

function emptyState() { return `<div class="empty-state">${esc(label("noItems"))}</div>`; }
function bySort(a, b) { return a.sortOrder - b.sortOrder; }

function handleClick(event) {
  const back = event.target.closest("[data-back]");
  if (back) return history.length > 1 ? history.back() : go("");
  const langButton = event.target.closest("[data-lang]");
  if (langButton) { currentLang = langButton.dataset.lang; localStorage.setItem(LANG_KEY, currentLang); return render(); }
  const section = event.target.closest("[data-section]");
  if (section) return go(`#section/${section.dataset.section}`);
  const routine = event.target.closest("[data-routine]");
  if (routine) return go(`#routine/${routine.dataset.routine}`);
  const food = event.target.closest("[data-food]");
  if (food) return go(`#food/${food.dataset.food}`);
  const recipe = event.target.closest("[data-recipe]");
  if (recipe) return go(`#recipe/${recipe.dataset.recipe}`);
  const done = event.target.closest("[data-routine-done]");
  if (done) { const state = getRoutineState(done.dataset.routineDone); state.lastCompleted = todayString(); state.needHelp = false; defaultChecklist().forEach((_, index) => state.checklist[index] = true); saveState(); return render(); }
  const help = event.target.closest("[data-routine-help]");
  if (help) { const state = getRoutineState(help.dataset.routineHelp); state.needHelp = !state.needHelp; saveState(); return render(); }
}

function handleChange(event) {
  const check = event.target.closest("[data-check-kind]");
  if (!check) return;
  const state = check.dataset.checkKind === "routine" ? getRoutineState(check.dataset.checkId) : getFoodState(check.dataset.checkId);
  state.checklist ||= {};
  state.checklist[check.dataset.checkIndex] = check.checked;
  saveState();
}

function handleInput(event) {
  const foodMemo = event.target.closest("[data-food-memo]");
  if (foodMemo) { getFoodState(foodMemo.dataset.foodMemo).memo = foodMemo.value; return saveState(); }
  const recipeMemo = event.target.closest("[data-recipe-memo]");
  if (recipeMemo) { getRecipeState(recipeMemo.dataset.recipeMemo).memo = recipeMemo.value; saveState(); }
}

function getRoutineState(id) {
  appState.routines ||= {};
  appState.routines[id] ||= { checklist: {}, lastCompleted: "", needHelp: false };
  appState.routines[id].checklist ||= {};
  return appState.routines[id];
}

function getFoodState(id) {
  appState.food ||= {};
  appState.food[id] ||= { checklist: {}, memo: "" };
  return appState.food[id];
}

function getRecipeState(id) {
  appState.recipes ||= {};
  appState.recipes[id] ||= { memo: "" };
  return appState.recipes[id];
}

function todayString() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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


