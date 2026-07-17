const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const weightHistory = require("../src/core/weight-history.js");
const { mergeStates } = require("../src/core/firebase-state.js");

const expected = {
  "2026-04-02": 1.47,
  "2026-04-20": 1.70,
  "2026-04-25": 1.90,
  "2026-05-21": 2.30,
  "2026-05-24": 2.40,
  "2026-06-01": 2.50
};

assert.deepEqual(
  Object.fromEntries(weightHistory.PERMANENT_ENTRIES.map((entry) => [entry.dateKey, entry.weightKg])),
  expected,
  "The permanent Nako weight history must keep every supplied date and value"
);

const state = {
  weightTracking: {
    "2026-04-02": { value: "", updatedAt: "2027-01-01T00:00:00.000Z" },
    "2026-07-12": { value: 2.8, updatedAt: "2026-07-12T08:00:00.000Z" }
  }
};
assert.equal(weightHistory.applyToState(state), state, "Applying permanent history should preserve the state object");
assert.equal(state.weightTracking["2026-04-02"].value, 1.47, "A tombstone must not remove permanent history");
assert.equal(state.weightTracking["2026-04-02"].permanent, true);
assert.equal(state.weightTracking["2026-07-12"].value, 2.8, "Normal later weight entries must be preserved");

const merged = mergeStates(
  { weightTracking: { "2026-05-24": { value: "", updatedAt: "2027-01-01T00:00:00.000Z" } } },
  { weightTracking: {} }
);
assert.equal(merged.weightTracking["2026-05-24"].value, 2.40, "Cloud merges must restore permanent history");
assert.equal(merged.weightTracking["2026-05-24"].permanent, true);

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const appCore = fs.readFileSync(path.join(root, "src", "core", "app-core.js"), "utf8");
const routineState = fs.readFileSync(path.join(root, "src", "features", "routine-state.js"), "utf8");
assert.ok(
  index.indexOf("src/core/weight-history.js") < index.indexOf("src/core/firebase-state.js"),
  "Permanent weight history must load before shared-state merging"
);
assert.ok(
  routineState.includes("window.nakoWeightHistory?.isPermanentDate?.(dateKey)"),
  "Permanent weight dates must not be editable through the normal weight input path"
);
assert.ok(
  appCore.includes("window.nakoWeightHistory?.applyToState?.(appState)"),
  "Every state save must restore the permanent weight baseline"
);
assert.ok(
  /Object\.entries\(appState\.weightTracking \|\| \{\}\)\.forEach\(\(\[dateKey, value\]\) => \{\s+if \(window\.nakoWeightHistory\?\.isPermanentDate\?\.\(dateKey\)\) return;/.test(routineState),
  "Pre-tracking permanent history must not create editable routine completion records"
);

console.log("Permanent Nako weight history checks passed successfully.");
