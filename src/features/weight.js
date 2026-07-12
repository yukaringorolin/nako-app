/* ==========================================================================
   SECTION 7: WEIGHT LOGGING MODULE & TREND GRAPH
   ========================================================================== */
function dateToKey(date) {
  return window.nakoDates.dateToKey(date);
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
  const key = typeof date === "string" ? date : dateToKey(date);
  const locale = lang === "jp" ? "ja-JP" : lang === "mm" ? "my-MM" : "en-SG";
  return routineTracking.formatDate(key, locale, { weekday: "long" });
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
  return window.nakoDates.sundaysForYear(year);
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
    <a href="#routine-checkin" class="back-checkin-link">← ${esc(label("backToRoutineCheckIn"))}</a>
    ${instructionsPanel}
    <section class="panel soft"><h2>${esc(label("mustRemember"))}</h2>${noteList(item.mustRemember)}</section>
    
    <section class="panel">
      <h2>${esc(label("quickEntry"))}</h2>
      ${renderQuickEntryPanel()}
    </section>

    <section class="panel">
      <h2>${esc(label("weightTrend"))}</h2>
      <div data-weight-readout="trend">${renderWeightGraph()}</div>
    </section>
    
    <section class="panel">
      <h2>${esc(label("recentEntries"))}</h2>
      <div data-weight-readout="recent">${renderRecentEntriesPanel()}</div>
    </section>

    <section class="panel">
      <h2>${esc(label("archive"))}</h2>
      ${renderArchivePanel()}
    </section>
  `;
  renderShell(tr(item.title), content, true);
}

function refreshWeightTrackingReadouts() {
  const trend = document.querySelector('[data-weight-readout="trend"]');
  const recent = document.querySelector('[data-weight-readout="recent"]');
  if (trend) trend.innerHTML = renderWeightGraph();
  if (recent) recent.innerHTML = renderRecentEntriesPanel();
}

function renderQuickEntryPanel() {
  const key = routineTracking.singaporeDateKey();
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

  const displayDate = formatWeightDate(key, currentLang);
  return `
    <div class="quick-entry-card">
      <div class="quick-entry-header">
        <span class="label-due">${esc(label("currentWeightDate"))}</span>
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
        <p class="graph-help">${esc(label("weightGraphPlaceholder"))}</p>
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
