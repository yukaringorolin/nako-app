const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const browserWindow = {
  addEventListener: () => {},
  nakoStorage: { loadJson: () => ({}) },
  nakoFirebaseState: { projectSharedState: (value) => value },
  nakoFirebaseWriteQueue: { stableStateSignature: (value) => JSON.stringify(value) }
};
const context = {
  window: browserWindow,
  document: { activeElement: null },
  console,
  JSON,
  Object,
  String,
  Number,
  Date,
  setTimeout: (callback) => callback(),
  clearTimeout: () => {},
  render: () => {},
  currentLang: "en",
  STATE_KEY: "nako-care-state-v2",
  safeStorage: { setItem: () => {} },
  appState: {},
  trainingData: {
    commands: [{
      id: "lift-carry",
      setting: "liftCue",
      defaultCue: "Bao Bao",
      initialScore: 7,
      initialRewardReliance: 2,
      initialEnvironment: 3,
      initialSuccesses: 4,
      initialAttempts: 5,
      initialLastPractisedAt: "2026-07-11T00:00:00.000Z",
      baselineComment: { en: "migrated baseline" }
    }]
  },
  nowIso: () => "2026-07-16T00:00:00.000Z",
  migrateRoutineTrackingState: () => {},
  saveState: () => {},
  appStateSignature: (value) => JSON.stringify(value || {})
};
context.routineRecords = () => context.appState.routineCompletions || {};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../src/features/training.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../src/core/app-core.js"), "utf8"), context);

context.migrateTrainingState();
assert.equal(context.appState.training, undefined, "Fresh startup has no local training state to migrate");

const appSource = fs.readFileSync(path.join(__dirname, "../src/app.js"), "utf8").replace(/\r\n/g, "\n");
const marker = "applyRemoteState: (nextState) => {";
const start = appSource.indexOf(marker) + marker.length;
const end = appSource.indexOf("\n    }\n  });", start);
assert.ok(start >= marker.length && end > start, "Current remote callback must be extractable");
const callbackBody = appSource.slice(start, end);
vm.runInContext(`remoteApply = (nextState) => {${callbackBody}\n}`, context);

context.remoteApply({
  training: {
    commands: { "lift-carry": { score: 0, lastPracticedAt: null, updatedAt: "" } },
    commandLogs: [],
    playLogs: []
  }
});
assert.equal(context.appState.training.contentMigrations["lift-carry-bao-bao-2026-07-11"], true);
assert.equal(context.appState.training.commands["lift-carry"].score, 7);
assert.equal(context.appState.training.liftCue, "Bao Bao");
console.log("Fresh-device remote training migration checks passed successfully.");
