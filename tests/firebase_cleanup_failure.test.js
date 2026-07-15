const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const firebaseState = require("../src/core/firebase-state.js");
const firebaseWriteQueue = require("../src/core/firebase-write-queue.js");

const events = {};
const timers = new Map();
let nextTimer = 1;
let stateSnapshot;
let transactionRuns = 0;
let transactionWrites = 0;
let cleanupCalls = 0;
let latestStatus;

const canonicalState = {
  food: {},
  weightTracking: {},
  routineTrackingStartedDate: "",
  diary: { entries: {}, drafts: {} },
  training: { commands: {}, commandLogs: [], playLogs: [] }
};

const auth = {
  currentUser: { uid: "fresh-device", getIdToken: async () => "token" },
  onAuthStateChanged(callback) { callback(this.currentUser); },
  signInAnonymously: async () => ({ user: auth.currentUser })
};
const stateDoc = {
  collection: () => ({ onSnapshot: () => () => {} }),
  onSnapshot(onNext) {
    stateSnapshot = onNext;
    return () => {};
  }
};
const firestore = {
  collection: () => ({ doc: () => stateDoc }),
  async runTransaction(callback) {
    transactionRuns += 1;
    return callback({
      get: async () => ({ exists: true, data: () => ({ state: canonicalState }) }),
      update: () => { transactionWrites += 1; },
      set: () => { transactionWrites += 1; }
    });
  }
};
const firestoreFactory = () => firestore;
firestoreFactory.FieldValue = { serverTimestamp: () => "server-time" };

const browserWindow = {
  nakoFirebaseState: firebaseState,
  nakoFirebaseWriteQueue: firebaseWriteQueue,
  addEventListener(name, callback) { events[name] = callback; },
  setTimeout(callback) {
    const id = nextTimer++;
    timers.set(id, callback);
    return id;
  },
  clearTimeout(id) { timers.delete(id); },
  fetch: async () => {
    cleanupCalls += 1;
    return { ok: false, status: 503 };
  },
  firebase: {
    apps: [{}],
    auth: () => auth,
    firestore: firestoreFactory,
    storage: () => ({})
  }
};
const context = {
  window: browserWindow,
  firebase: browserWindow.firebase,
  console: { ...console, warn: () => {} },
  Date,
  JSON,
  Set,
  Object,
  String,
  Boolean,
  Error
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../src/firebase.js"), "utf8"), context);

(async () => {
  browserWindow.nakoFirebase.onStatus((status) => { latestStatus = status; });
  browserWindow.nakoFirebase.startStateSync({
    getLocalState: () => canonicalState,
    applyRemoteState: () => {}
  });
  assert.equal(typeof stateSnapshot, "function");
  stateSnapshot({ exists: true, data: () => ({ state: canonicalState }) });

  const firstFlush = await events.pagehide();
  assert.equal(firstFlush, true, "Cleanup failure must not fail the normal sync queue");
  assert.equal(transactionRuns, 1);
  assert.equal(transactionWrites, 0, "No normal state write should be needed for matching state");
  assert.equal(cleanupCalls, 1);
  assert.equal(latestStatus.stateMode, "synced");
  assert.equal(latestStatus.stateCleanupPending, false);
  assert.equal(latestStatus.stateError, "");
  assert.equal(timers.size, 0, "Cleanup failure must not schedule a normal state retry");

  const onlineRetry = await events.online();
  assert.equal(onlineRetry, false);
  assert.equal(transactionRuns, 1);
  assert.equal(cleanupCalls, 1);
  console.log("Firebase cleanup failure isolation checks passed successfully.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
