const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const firebaseContent = fs.readFileSync(path.join(__dirname, "../src/firebase.js"), "utf8");
const appContent = fs.readFileSync(path.join(__dirname, "../src/app.js"), "utf8");

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

console.log("Household sync contract checks passed successfully.");
