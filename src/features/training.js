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
function renderCommandHistory(commandId) { const logs = getTrainingState().commandLogs.filter((log) => log.commandId === commandId).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))); return `<div class="training-history">${logs.length ? `<p class="training-trend">${esc(logs.slice(0, 6).reverse().map((log) => log.score).join(" → "))}</p>${logs.map((log) => `<article><strong>${esc(`${log.score}/10 · ${log.successes}/${log.attempts}`)}</strong><span>${esc(formatTrainingDate(log.createdAt))} · ${esc(optionText(trainingData.rewardOptions, log.rewardReliance))}</span>${log.comment ? `<p>${esc(log.comment)}</p>` : ""}<div><button data-training-edit-command="${esc(log.id)}">${esc(tl("edit"))}</button><button data-training-delete-command="${esc(log.id)}" aria-label="${esc(tl("delete"))}">${esc(tl("delete"))}</button></div></article>`).join("")}` : `<p>${esc(tl("noLogs"))}</p>`}</div>`; }
function wasPractisedWithin(date, days) { return date && Date.now() - Date.parse(date) < days * 86400000; }
function needsPractice(command, state) { return (tr(command.priority) === "Critical" && (state.score ?? 0) < 5) || !wasPractisedWithin(state.lastPracticedAt, 14) || Number(state.rewardReliance) <= 1; }
function practiceRank(command) { const state = getCommandState(command.id); return (tr(command.priority) === "Critical" && (state.score ?? 0) < 5 ? 0 : 2) + (!wasPractisedWithin(state.lastPracticedAt, 14) ? 1 : 0) + (Number(state.rewardReliance) <= 1 ? 1 : 0); }
function formatTrainingDate(value) { if (!value) return "—"; const date = new Date(value); return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(currentLang === "jp" ? "ja-JP" : currentLang === "mm" ? "my-MM" : "en-SG", { day: "numeric", month: "short", year: "numeric" }); }

function renderTrainingRules() { return `<details class="training-details"><summary>${esc(tl("rules"))}</summary>${noteList(trainingData.rules)}</details>`; }

function renderTrainingPlay() { return `<section class="training-play-list">${trainingData.activities.map((activity) => `<article class="play-card" id="training-activity-${esc(activity.id)}"><div><h2>${esc(tr(activity.title))}</h2><p>${esc(tr(activity.purpose))}</p></div><span>${esc(`${activity.duration} min · ${tr(activity.intensity)}`)}</span>${orderedList(activity.steps)}<div class="training-safety">${noteList(activity.safety)}</div><button class="action-button primary" data-training-add-play="${esc(activity.id)}">${esc(tl("addLog"))}</button>${trainingDraft?.kind === "play" && trainingDraft.activityId === activity.id ? renderPlayForm() : ""}</article>`).join("")}${renderTrainingVideos(trainingData.videos.filter((video) => video.activityIds.length))}</section>`; }
function newPlayDraft(activityId, log = null) { trainingDraft = { kind: "play", id: log?.id || "", activityId, date: log?.createdAt || nowIso(), durationMinutes: log?.durationMinutes ?? "", engagement: log?.engagement ?? 3, energyBefore: log?.energyBefore ?? 3, energyAfter: log?.energyAfter ?? 3, dropResponse: log?.dropResponse || "", allDoneResponse: log?.allDoneResponse || "", favouriteToy: log?.favouriteToy || "", comment: log?.comment || "", unusual: log?.unusual || "", saving: false }; }
function renderPlayForm() { const d = trainingDraft; return `<form class="training-form" data-training-form="play"><h3>${esc(tl("playLog"))}</h3><label>${esc(tl("duration"))}<input type="number" min="0" value="${esc(d.durationMinutes)}" data-training-input data-training-field="durationMinutes" /></label><div class="training-form-grid"><label>${esc(tl("engagement"))}<input type="number" min="1" max="5" value="${esc(d.engagement)}" data-training-input data-training-field="engagement" /></label><label>${esc(tl("energyBefore"))}<input type="number" min="1" max="5" value="${esc(d.energyBefore)}" data-training-input data-training-field="energyBefore" /></label><label>${esc(tl("energyAfter"))}<input type="number" min="1" max="5" value="${esc(d.energyAfter)}" data-training-input data-training-field="energyAfter" /></label></div><label>${esc(tl("dropResponse"))}<input value="${esc(d.dropResponse)}" data-training-input data-training-field="dropResponse" /></label><label>${esc(tl("allDoneResponse"))}<input value="${esc(d.allDoneResponse)}" data-training-input data-training-field="allDoneResponse" /></label><label>${esc(tl("favouriteToy"))}<input value="${esc(d.favouriteToy)}" data-training-input data-training-field="favouriteToy" /></label><label>${esc(tl("comment"))}<textarea data-training-input data-training-field="comment">${esc(d.comment)}</textarea></label><label>${esc(tl("unusual"))}<textarea data-training-input data-training-field="unusual">${esc(d.unusual)}</textarea></label><div class="training-form-actions"><button class="action-button primary" type="submit" ${d.saving ? "disabled" : ""}>${esc(tl("save"))}</button><button class="action-button secondary" type="button" data-training-cancel>${esc(tl("cancel"))}</button></div></form>`; }
function renderTrainingLog() { const training = getTrainingState(); const commandLogs = [...training.commandLogs].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))); const playLogs = [...training.playLogs].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))); const list = (logs, title, finder, edit, del) => `<section class="panel"><h2>${esc(title)}</h2>${logs.length ? `<div class="log-list">${logs.map((log) => { const item = finder(log); return `<article><strong>${esc(tr(item?.title || { en: log.commandId || log.activityId }))}</strong><span>${esc(formatTrainingDate(log.createdAt))}</span>${log.comment ? `<p>${esc(log.comment)}</p>` : ""}<div><button ${edit}="${esc(log.id)}">${esc(tl("edit"))}</button><button ${del}="${esc(log.id)}">${esc(tl("delete"))}</button></div></article>`; }).join("")}</div>` : "<p>—</p>"}</section>`; return `${list(commandLogs, tl("commandLog"), (log) => trainingData.commands.find((item) => item.id === log.commandId), "data-training-edit-command", "data-training-delete-command")}${list(playLogs, tl("playLog"), (log) => trainingData.activities.find((item) => item.id === log.activityId), "data-training-edit-play", "data-training-delete-play")}${trainingSuccessMessage ? `<p class="training-success" role="status">${esc(trainingSuccessMessage)}</p>` : ""}`; }

function emptyState() { return `<div class="empty-state">${esc(label("noItems"))}</div>`; }
function bySort(a, b) { return a.sortOrder - b.sortOrder; }
