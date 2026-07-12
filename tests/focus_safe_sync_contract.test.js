const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
const appCore = fs.readFileSync(path.join(root, "src", "core", "app-core.js"), "utf8");
const actions = fs.readFileSync(path.join(root, "src", "features", "actions.js"), "utf8");
const shell = fs.readFileSync(path.join(root, "src", "ui", "shell.js"), "utf8");

assert.match(
  app,
  /firebaseSync\.onStatus\(\(status\) => \{\s+firebaseStatus = status;\s+refreshSyncIndicator\(\);\s+\}\);/,
  "Sync status changes must update only the indicator instead of rebuilding the app"
);
assert.ok(
  app.includes("appStateSignature(appState)") && app.includes("renderUnlessEditing();"),
  "Remote state should render only when its normalized content changed"
);
assert.ok(
  shell.includes('document.querySelector(".sync-indicator")') && shell.includes("dot.className = `sync-status sync-${mode}`"),
  "The sync indicator needs an in-place update path"
);
assert.ok(
  actions.includes("flushPendingRenderAfterEdit();"),
  "A deferred remote render should be reconsidered after editing finishes"
);

let activeKind = "input";
let renderCount = 0;
const context = {
  document: {
    activeElement: {
      matches: (selector) => selector.includes(activeKind)
    }
  },
  window: {
    addEventListener: () => {},
    nakoFirebaseWriteQueue: {
      stableStateSignature: (value) => JSON.stringify(value)
    }
  },
  setTimeout: (callback) => callback(),
  clearTimeout: () => {},
  render: () => { renderCount += 1; }
};
vm.runInNewContext(appCore, context);

assert.equal(context.renderUnlessEditing(), false, "A focused search/input field must block a remote full render");
assert.equal(renderCount, 0, "Blocking a remote render must preserve focus and the mobile keyboard");

activeKind = "button";
context.flushPendingRenderAfterEdit();
assert.equal(renderCount, 1, "The deferred render should run after focus leaves editable controls");

console.log("Focus-safe Firebase rendering checks passed successfully.");
