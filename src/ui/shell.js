/* ==========================================================================
   SECTION 2: RENDERERS - MAIN LAYOUT & SHELL
   ========================================================================== */
const routeRegistry = window.nakoRouter.createRouteRegistry({
  home: () => renderHome(),
  section: (route) => renderSection(route.sectionId),
  routine: (route) => renderRoutine(route.routineId),
  food: (route) => renderFood(route.foodId),
  "food-safety-item": (route) => renderFoodSafetyItem(route.itemId),
  recipe: (route) => renderRecipe(route.recipeId),
  "routine-checkin": () => renderRoutineCheckIn(),
  "routine-history": () => renderRoutineHistory()
});

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

  (routeRegistry[route.view] || routeRegistry.home)(route);

  const targetScroll = oldRouteKey === newRouteKey ? currentScroll : (scrollPositions[newRouteKey] || 0);
  window.scrollTo(0, targetScroll);
  setTimeout(() => {
    window.scrollTo(0, targetScroll);
  }, 0);

  if (oldRouteKey !== newRouteKey) {
    searchFocused = false;
    selectedResultIndex = -1;
  }

  const destination = window.nakoSearchNavigation.takePendingDestination(
    pendingDestination,
    () => { pendingDestination = null; }
  );
  if (destination) {
    const dest = destination;
    setTimeout(() => {
      if (dest.type === "cooking-rule") {
        const rulesList = document.querySelectorAll("[data-household-cooking-rules] li");
        const idx = Number(dest.index);
        if (rulesList[idx]) {
          rulesList[idx].scrollIntoView({ behavior: "smooth", block: "center" });
          rulesList[idx].classList.add("search-target-highlight");
          setTimeout(() => { rulesList[idx].classList.remove("search-target-highlight"); }, 2000);
        }
      } else if (dest.type === "resource") {
        const coll = document.querySelector(".resource-collection");
        if (coll) {
          coll.open = true;
          const resCard = document.getElementById(`resource-${dest.id}`);
          if (resCard) {
            resCard.open = true;
            resCard.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      } else if (dest.type === "training-command") {
        const card = document.getElementById(`training-${dest.id}`);
        if (card) {
          if (trainingExpandedCommandId !== dest.id) {
            trainingExpandedCommandId = dest.id;
            render();
          }
          setTimeout(() => {
            const el = document.getElementById(`training-${dest.id}`);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      } else if (dest.type === "training-activity") {
        const card = document.getElementById(`training-activity-${dest.id}`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 150);
  }
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
          <div class="language-toggle" aria-label="${esc(label("language"))}">
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
  const displayLabel = label(key);
  return `<span class="sync-indicator" aria-label="${esc(displayLabel)}" title="${esc(displayLabel)}"><span class="sync-status sync-${mode}"></span></span>`;
}
