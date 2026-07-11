const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const firebaseContent = fs.readFileSync(path.join(__dirname, "../src/firebase.js"), "utf8");
const appContent = fs.readFileSync(path.join(__dirname, "../src/app.js"), "utf8");
const rulesContent = fs.readFileSync(path.join(__dirname, "../firestore.rules"), "utf8");
const workflowContent = fs.readFileSync(path.join(__dirname, "../.github/workflows/firebase-hosting-merge.yml"), "utf8");
const firebaseWriteQueue = require("../src/core/firebase-write-queue.js");

// 1. HOUSEHOLD_ID is fixed as "our-dog-nako"
assert.ok(firebaseContent.includes('const HOUSEHOLD_ID = "our-dog-nako";'), "HOUSEHOLD_ID must be defined as 'our-dog-nako'");

// 2. src/firebase.js no longer reads/references "nako-household-code"
assert.ok(!firebaseContent.includes("nako-household-code"), "src/firebase.js should not contain 'nako-household-code'");

// 3. updateHouseholdCode no longer exists
assert.ok(!firebaseContent.includes("updateHouseholdCode"), "updateHouseholdCode should be removed from src/firebase.js");
assert.ok(!appContent.includes("updateHouseholdCode"), "updateHouseholdCode should be removed from src/app.js");

// 4. src/app.js no longer contains handleSyncSettings
assert.ok(!appContent.includes("handleSyncSettings"), "src/app.js should not contain handleSyncSettings");

// 5. No element uses data-sync-settings
assert.ok(!appContent.includes("data-sync-settings"), "src/app.js should not use data-sync-settings");

// 6. Clicking the sync indicator cannot open a prompt
assert.ok(!appContent.includes("prompt("), "src/app.js should not use prompt() for sync settings");

// 7. A previously stored nako-household-code value is cleared on startup
assert.ok(appContent.includes('localStorage.removeItem("nako-household-code")'), "src/app.js should clear nako-household-code on startup");

// 8. The production workflow deploys Firestore rules
assert.ok(workflowContent.includes("npx firebase-tools deploy --only firestore:rules --project nako-home-care"), "Workflow must deploy firestore:rules");

// 9. The fixed household path is allowed and custom paths are rejected in firestore.rules
assert.ok(rulesContent.includes('householdId == "our-dog-nako"'), "firestore.rules must restrict householdId to our-dog-nako");
assert.ok(!rulesContent.includes("householdId.size() >= 3"), "firestore.rules must not use size checks for householdId");

// 10. Test status combining logic and routine listener error overwrite behavior
const window = {
  nakoFirebaseWriteQueue: firebaseWriteQueue,
  addEventListener: () => {},
  clearTimeout: () => {},
  setTimeout: (cb) => cb()
};

let statusListenerCallback = null;
let stateSnapshotCallback = null;
let stateErrorCallback = null;
let routineSnapshotCallback = null;
let routineErrorCallback = null;

// Mock Firebase SDK
const authMock = {
  currentUser: { uid: "mock-uid" },
  onAuthStateChanged: (cb) => {
    cb({ uid: "mock-uid" });
  },
  signInAnonymously: () => Promise.resolve({ user: { uid: "mock-uid" } })
};

window.firebase = {
  apps: [{}], // Pre-initialized by Hosting
  auth: () => authMock,
  storage: () => ({}),
  firestore: () => ({
    collection: (colName) => {
      assert.equal(colName, "households");
      return {
        doc: (docId) => {
          assert.equal(docId, "our-dog-nako");
          return {
            collection: (subColName) => {
              assert.equal(subColName, "routineCompletions");
              return {
                onSnapshot: (onNext, onError) => {
                  routineSnapshotCallback = onNext;
                  routineErrorCallback = onError;
                  return () => {};
                }
              };
            },
            onSnapshot: (onNext, onError) => {
              stateSnapshotCallback = onNext;
              stateErrorCallback = onError;
              return () => {};
            }
          };
        }
      };
    }
  })
};

global.firebase = window.firebase;

// Evaluate firebase.js
eval(firebaseContent);

// Set up hooks
assert.ok(window.nakoFirebase, "window.nakoFirebase must be populated");

window.nakoFirebase.onStatus((status) => {
  statusListenerCallback?.(status);
});

// Test status flow
window.nakoFirebase.startStateSync({});
window.nakoFirebase.startRoutineCompletionSync({});

assert.ok(stateSnapshotCallback, "stateSync listener must be registered");
assert.ok(routineSnapshotCallback, "routineSync listener must be registered");

let currentStatus = null;
statusListenerCallback = (s) => {
  currentStatus = s;
};

const canonicalEmptyState = {
  food: {},
  weightTracking: {},
  routineTrackingStartedDate: "",
  diary: { entries: {}, drafts: {} },
  training: { commands: {}, commandLogs: [], playLogs: [] }
};

// Trigger state listener success
stateSnapshotCallback({ exists: true, data: () => ({ state: canonicalEmptyState }) });
// Trigger routine listener error
routineErrorCallback(new Error("Permission denied"));

assert.equal(currentStatus.mode, "error", "Indicator must show error if routine completions sync fails");
assert.equal(currentStatus.error, "Routine sync unavailable", "Useful error message must be set");

// Trigger state listener success again (main-state snapshot)
stateSnapshotCallback({ exists: true, data: () => ({ state: canonicalEmptyState }) });
assert.equal(currentStatus.mode, "error", "Routine listener error must not be overwritten by a successful main-state snapshot");
assert.equal(currentStatus.error, "Routine sync unavailable");

// Trigger routine listener success
routineSnapshotCallback({ forEach: () => {} });
assert.equal(currentStatus.mode, "synced", "Indicator must show green (synced) when both listeners are healthy");
assert.equal(currentStatus.error, "");

console.log("Household sync contract checks passed successfully.");
