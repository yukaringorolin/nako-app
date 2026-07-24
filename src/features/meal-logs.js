const MEAL_LOGS_RECENT_LIMIT = 14;

function isMealLogsRoute(route = parseRoute()) {
  return route.view === "food" && route.foodId === "meal-logs";
}

async function refreshMealLogs(options = {}) {
  if (mealLogsState.status === "loading") return;
  mealLogsState.status = "loading";
  mealLogsState.error = "";
  if (options.renderLoading !== false) renderMealLogsIfActive();

  try {
    const response = await fetch(window.nakoMealLogs.EDWIN_MEAL_LOGS_CSV_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Meal log refresh failed.");
    const entries = window.nakoMealLogs.parseMealLogsCsv(await response.text());
    const refreshedAt = new Date().toISOString();
    mealLogsState = { entries, refreshedAt, status: "success", error: "" };
    window.nakoMealLogs.saveCache(safeStorage, entries, refreshedAt);
  } catch {
    mealLogsState.status = "error";
    mealLogsState.error = "refresh";
  }

  renderMealLogsIfActive();
}

function renderMealLogsIfActive() {
  if (isMealLogsRoute()) render();
}

function handleMealLogsVisibilityChange() {
  if (document.visibilityState === "visible" && isMealLogsRoute()) return refreshMealLogs();
}

function formatMealLogNumber(value) {
  return new Intl.NumberFormat(localeForCurrentLanguage(), { maximumFractionDigits: 1 }).format(value);
}

function renderMealLogMetric(labelKey, value, unit) {
  return `<div class="meal-log-metric">
    <dt>${esc(label(labelKey))}</dt>
    <dd>${esc(formatMealLogNumber(value))} <span>${esc(unit)}</span></dd>
  </div>`;
}

function renderMealLogEntry(entry, isLatest = false) {
  const dateStyle = isLatest ? "long" : "medium";
  return `<article class="${isLatest ? "meal-log-latest-card" : "meal-log-row"}">
    <time datetime="${esc(entry.dateKey)}">${esc(window.nakoMealLogs.formatDateKey(entry.dateKey, localeForCurrentLanguage(), dateStyle))}</time>
    <dl class="meal-log-metrics">
      ${renderMealLogMetric("calories", entry.calories, "kcal")}
      ${renderMealLogMetric("protein", entry.protein, "g")}
      ${renderMealLogMetric("carbohydrates", entry.carbs, "g")}
      ${renderMealLogMetric("fat", entry.fat, "g")}
    </dl>
  </article>`;
}

function renderMealLogsDashboard(item) {
  const latest = mealLogsState.entries[0];
  const lastRefresh = mealLogsState.refreshedAt
    ? `${label("mealLogsLastRefresh")}: ${window.nakoMealLogs.formatSingaporeDateTime(mealLogsState.refreshedAt, localeForCurrentLanguage())}`
    : label("mealLogsNotRefreshed");
  const errorMessage = mealLogsState.status === "error"
    ? `<p class="meal-logs-error" role="alert">${esc(label(mealLogsState.entries.length ? "mealLogsRefreshErrorCached" : "mealLogsRefreshError"))}</p>`
    : "";
  const loadingMessage = mealLogsState.status === "loading"
    ? `<p class="meal-logs-loading" role="status">${esc(label("mealLogsRefreshing"))}</p>`
    : "";
  const latestPanel = latest
    ? `<section class="meal-logs-section" aria-labelledby="meal-logs-latest-heading">
        <h2 id="meal-logs-latest-heading">${esc(label("mealLogsLatest"))}</h2>
        ${renderMealLogEntry(latest, true)}
      </section>`
    : `<section class="panel meal-logs-empty" aria-labelledby="meal-logs-latest-heading">
        <h2 id="meal-logs-latest-heading">${esc(label("mealLogsLatest"))}</h2>
        <p>${esc(label("mealLogsNoData"))}</p>
      </section>`;
  const recentPanel = mealLogsState.entries.length
    ? `<section class="meal-logs-section" aria-labelledby="meal-logs-recent-heading">
        <h2 id="meal-logs-recent-heading">${esc(label("mealLogsRecent"))}</h2>
        <div class="meal-log-list">${mealLogsState.entries.slice(0, MEAL_LOGS_RECENT_LIMIT).map((entry) => renderMealLogEntry(entry)).join("")}</div>
      </section>`
    : "";

  const content = `
    ${renderHead(item.icon, tr(item.title), tr(item.summary), "#fff0eb", label("foodItems"), primaryPhoto(item.photos))}
    <div class="meal-logs-dashboard">
      <div class="meal-logs-toolbar">
        <p>${esc(lastRefresh)}</p>
        <button class="action-button primary" type="button" data-meal-logs-refresh ${mealLogsState.status === "loading" ? "disabled" : ""}>${esc(label(mealLogsState.status === "loading" ? "mealLogsRefreshing" : "mealLogsRefresh"))}</button>
      </div>
      ${errorMessage}
      ${loadingMessage}
      ${latestPanel}
      ${recentPanel}
    </div>`;
  renderShell(tr(item.title), content, true);
}
