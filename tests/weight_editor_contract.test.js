const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
const appCore = fs.readFileSync(path.join(root, "src", "core", "app-core.js"), "utf8");
const actions = fs.readFileSync(path.join(root, "src", "features", "actions.js"), "utf8");
const routineState = fs.readFileSync(path.join(root, "src", "features", "routine-state.js"), "utf8");
const weight = fs.readFileSync(path.join(root, "src", "features", "weight.js"), "utf8");

assert.ok(
  appCore.includes("input, textarea, select, [contenteditable]"),
  "Firebase snapshots must not rebuild the page while any editable control is focused"
);
assert.ok(
  actions.includes('updateWeightInput(weightInput, { remoteCompletion: false })'),
  "Typing a weight must not send routine-completion writes for every digit"
);
assert.match(
  app,
  /updateWeightInput\(weightInput, \{ commit: true \}\);\s+refreshWeightTrackingReadouts\(\);/,
  "A committed weight change should refresh only the live weight readouts"
);
assert.ok(
  !/const weightInput = event\.target\.closest\("\[data-weight-date\]"\);\s+if \(weightInput\) \{\s+updateWeightInput\(weightInput[^}]*\);\s+render\(\);/s.test(app),
  "A weight change must not trigger a full-page render"
);
assert.ok(
  routineState.includes("remoteLegacy: false, remoteCompletion: false"),
  "Draft weight edits should keep routine reconciliation local until commit"
);
assert.ok(
  weight.includes('data-weight-readout="trend"') && weight.includes('data-weight-readout="recent"'),
  "Weight trend and recent entries need stable partial-refresh targets"
);

const appState = { weightTracking: {}, routineCompletions: {} };
const saveCalls = [];
let debouncedSaves = 0;
const context = {
  appState,
  activeTrackedRoutineTasks: () => [{ id: "nako-weight-tracking" }],
  routineCycle: () => ({ key: "weekly:2026-07-06" }),
  routineRecords: () => appState.routineCompletions,
  routineTracking: { completionId: (taskId, cycleKey) => `${taskId}__${cycleKey}` },
  getWeightValue: (value) => value && typeof value === "object" ? value.value : value,
  nowIso: () => "2026-07-12T08:00:00.000Z",
  saveState: (options = {}) => { saveCalls.push(options); },
  saveStateDebounced: () => { debouncedSaves += 1; },
  window: { nakoFirebase: { saveRoutineCompletion: () => true } },
  label: (key) => key,
  render: () => {}
};
vm.runInNewContext(routineState, context);

const input = { value: "8.35", dataset: { weightDate: "2026-07-12" } };
context.updateWeightInput(input, { remoteCompletion: false });
assert.equal(appState.weightTracking["2026-07-12"].value, 8.35, "Weight typing should update local state");
assert.equal(debouncedSaves, 1, "Weight typing should use the debounced state save");
assert.ok(saveCalls.every((options) => options.remote === false), "Weight typing should not immediately write to Firebase");

input.value = "";
context.updateWeightInput(input, { commit: true });
const completion = appState.routineCompletions["nako-weight-tracking__weekly:2026-07-06"];
assert.equal(appState.weightTracking["2026-07-12"].value, "", "Clearing the field should persist an empty weight tombstone");
assert.equal(completion.deleted, true, "Clearing the final weight in a cycle should tombstone its routine completion");
assert.ok(saveCalls.some((options) => options.remote !== false), "Finishing a weight edit should commit immediately");

console.log("Weight editor interaction checks passed successfully.");
