const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  mergeStates,
  needsSharedStateCleanup,
  projectSharedState
} = require("../src/core/firebase-state.js");
const {
  createFirebaseWriteQueue,
  queueMergedStateIfChanged,
  stableStateSignature
} = require("../src/core/firebase-write-queue.js");

const legacyState = {
  routineCompletions: { local_only: { id: "local_only" } },
  routineTrackingMigration: { done: true },
  training: {
    emergencyCue: "Emergency",
    liftCue: "Bao Bao",
    contentMigrations: { local: true },
    commands: {},
    commandLogs: [],
    playLogs: []
  }
};

assert.equal(needsSharedStateCleanup(legacyState), true, "Legacy shared state should request one canonical cleanup write");
const projected = projectSharedState(legacyState);
assert.equal(projected.routineCompletions, undefined, "Routine completions must never enter the main state document");
assert.equal(projected.routineTrackingMigration, undefined, "Routine migration metadata must stay device-local");
assert.equal(projected.training.contentMigrations, undefined, "Training content migrations must stay device-local");
assert.deepEqual(projected.training.settings.emergencyCue, { value: "Emergency", updatedAt: "" });
assert.deepEqual(projected.training.settings.liftCue, { value: "Bao Bao", updatedAt: "" });
assert.equal(needsSharedStateCleanup(projected), false, "Canonical state should not trigger repeated cleanup writes");

const deviceA = {
  routineCompletions: { a: { updatedAt: "2026-07-12T08:00:00.000Z" } },
  food: { memo: { memo: "A", updatedAt: "2026-07-12T08:00:00.000Z" } },
  appetiteTracking: {
    "2026-07-11": { percentage: 75, note: "A-only day", updatedAt: "2026-07-11T08:00:00.000Z" },
    "2026-07-12": { percentage: 25, note: "A", updatedAt: "2026-07-12T08:00:00.000Z" }
  },
  training: {
    emergencyCue: "A cue",
    settings: { emergencyCue: { value: "A cue", updatedAt: "2026-07-12T08:00:00.000Z" } },
    commands: {}, commandLogs: [], playLogs: []
  }
};
const deviceB = {
  routineCompletions: { b: { updatedAt: "2026-07-12T09:00:00.000Z" } },
  food: { memo: { memo: "B", updatedAt: "2026-07-12T09:00:00.000Z" } },
  appetiteTracking: {
    "2026-07-10": { percentage: 50, note: "B-only day", updatedAt: "2026-07-10T09:00:00.000Z" },
    "2026-07-12": { percentage: 100, note: "B", updatedAt: "2026-07-12T09:00:00.000Z" }
  },
  training: {
    emergencyCue: "B cue",
    settings: { emergencyCue: { value: "B cue", updatedAt: "2026-07-12T09:00:00.000Z" } },
    commands: {}, commandLogs: [], playLogs: []
  }
};

let server = mergeStates({}, deviceA);
server = mergeStates(server, deviceB);
const convergedA = mergeStates(server, deviceA);
const convergedB = mergeStates(server, deviceB);
assert.equal(stableStateSignature(convergedA), stableStateSignature(convergedB), "Two devices must converge on one canonical state");
assert.equal(convergedA.food.memo.memo, "B", "The newest dated record should win");
assert.equal(convergedA.appetiteTracking["2026-07-12"].percentage, 100, "The newest appetite update for a date should win");
assert.equal(convergedA.appetiteTracking["2026-07-11"].percentage, 75, "Appetite dates recorded only on device A should survive merging");
assert.equal(convergedA.appetiteTracking["2026-07-10"].percentage, 50, "Appetite dates recorded only on device B should survive merging");
assert.equal(convergedA.training.emergencyCue, "B cue", "The newest training setting should win");
assert.equal(convergedA.routineCompletions, undefined, "Different local completion maps must not affect convergence");

const remoteFirst = mergeStates(
  { training: { emergencyCue: "Remote legacy", commands: {}, commandLogs: [], playLogs: [] } },
  { training: { emergencyCue: "Local legacy", commands: {}, commandLogs: [], playLogs: [] } }
);
assert.equal(remoteFirst.training.emergencyCue, "Remote legacy", "Remote must win ties between untimestamped legacy settings");

const editedLog = mergeStates(
  { training: { commands: {}, commandLogs: [{ id: "sit-1", comment: "old", createdAt: "2026-07-12T08:00:00.000Z", updatedAt: "2026-07-12T08:00:00.000Z" }], playLogs: [] } },
  { training: { commands: {}, commandLogs: [{ id: "sit-1", comment: "new", createdAt: "2026-07-12T08:00:00.000Z", updatedAt: "2026-07-12T09:00:00.000Z" }], playLogs: [] } }
);
assert.equal(editedLog.training.commandLogs[0].comment, "new", "An edited training log must win by updatedAt");

const firebaseSource = fs.readFileSync(path.join(__dirname, "../src/firebase.js"), "utf8");
const appSource = fs.readFileSync(path.join(__dirname, "../src/app.js"), "utf8");
const actionsSource = fs.readFileSync(path.join(__dirname, "../src/features/actions.js"), "utf8");
assert.ok(firebaseSource.includes("db.runTransaction(async (transaction)"), "Main state writes must reread Firestore inside a transaction");
assert.ok(firebaseSource.includes('{ mergeFields: ["state", "clientUpdatedAt", "updatedAt"] }'), "The canonical state map must replace the legacy parent field");
assert.ok(firebaseSource.includes("transaction.update(stateDoc, payload)"), "Existing documents must replace the parent state field instead of recursively merging legacy metadata");
assert.ok(firebaseSource.includes("if (signature(remoteState) === signature(mergedState)) return;"), "Stale transaction retries and cleanup-only passes must not rewrite matching canonical state");
assert.ok(firebaseSource.includes("sharedStateCleanupAttempted = true"), "A cleanup attempt must prevent stale local cache data from rearming cleanup during the same session");
assert.ok(firebaseSource.includes("const cleanupRequired = !sharedStateCleanupAttempted;"), "Each fresh sync session must run one idempotent cleanup attempt even when the local Firestore cache omits legacy fields");
assert.ok(firebaseSource.includes("deleteLegacySharedStateFields().catch") && firebaseSource.includes('"state.routineCompletions"') && firebaseSource.includes('"state.training.contentMigrations"'), "Legacy embedded routine and migration data must be cleaned without controlling the normal queue result");
assert.ok(firebaseSource.includes("cleanupCommitted = true;"), "Every committed main-state write must be followed by legacy field cleanup");
assert.ok(firebaseSource.includes("Legacy shared-state cleanup deferred"), "Cleanup failure must be isolated from normal state synchronization");
assert.ok(firebaseSource.includes("Legacy shared-state cleanup verification failed"), "Cleanup must verify excluded fields are absent before reporting success");
assert.ok(firebaseSource.includes("documents:commit") && firebaseSource.includes("updateMask: { fieldPaths }"), "Cleanup must use an explicit Firestore commit update mask");
assert.ok(firebaseSource.includes("stateMode: stateSyncStatus") && firebaseSource.includes("routineMode: routineSyncStatus"), "Public sync status must expose both channels");
assert.ok(appSource.includes("getLocalState: () => sharedRemoteState()"), "Automatic snapshot merging must use the canonical shared-state projection");
assert.ok((actionsSource.match(/updatedAt: nowIso\(\)/g) || []).length >= 2, "Saved and edited training logs must advance updatedAt");

(async () => {
  let transactionalServer = {};
  const queueFor = () => createFirebaseWriteQueue({
    write: async (candidate) => { transactionalServer = mergeStates(transactionalServer, candidate); },
    setTimeout: () => 1,
    clearTimeout: () => {},
    debounceMs: 0
  });
  const queueA = queueFor();
  const queueB = queueFor();
  queueA.enqueue(projectSharedState(deviceA));
  queueB.enqueue(projectSharedState(deviceB));
  await queueA.flush();
  await queueB.flush();

  const nextA = mergeStates(transactionalServer, deviceA);
  const nextB = mergeStates(transactionalServer, deviceB);
  assert.equal(queueMergedStateIfChanged(queueA, transactionalServer, nextA), false);
  assert.equal(queueMergedStateIfChanged(queueB, transactionalServer, nextB), false);
  assert.equal(queueA.inspect().isIdle, true);
  assert.equal(queueB.inspect().isIdle, true);
  console.log("Firebase canonical state and two-device convergence checks passed successfully.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
