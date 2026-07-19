const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const navigation = require("../src/core/navigation.js");

let backCalls = 0;
let fallbackCalls = 0;
const usedHistory = navigation.backOrFallback(
  { length: 3, back: () => { backCalls += 1; } },
  () => { fallbackCalls += 1; }
);
assert.equal(usedHistory, true);
assert.equal(backCalls, 1);
assert.equal(fallbackCalls, 0);

const usedFallback = navigation.backOrFallback(
  { length: 1, back: () => { backCalls += 1; } },
  () => { fallbackCalls += 1; }
);
assert.equal(usedFallback, false);
assert.equal(backCalls, 1);
assert.equal(fallbackCalls, 1);

navigation.backOrFallback(null, () => { fallbackCalls += 1; });
assert.equal(fallbackCalls, 2);

const root = path.join(__dirname, "..");
const actionsSource = fs.readFileSync(path.join(root, "src", "features", "actions.js"), "utf8");
const appCoreSource = fs.readFileSync(path.join(root, "src", "core", "app-core.js"), "utf8");
const pagesSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
const indexSource = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.match(actionsSource, /window\.nakoNavigation\.backOrFallback\(window\.history, \(\) => go\(""\)\)/);
assert.doesNotMatch(actionsSource, /route\.view === "routine"/);
assert.match(appCoreSource, /function replaceRoute\(hash\)[\s\S]*location\.replace\(hash\)/);
assert.match(pagesSource, /replaceRoute\("#routine\/nako-weight-tracking"\)/);
assert.match(pagesSource, /replaceRoute\("#food-safety\/household-cooking-rules"\)/);
assert.match(pagesSource, /replaceRoute\(item\.canonicalRoute\)/);
assert.ok(indexSource.indexOf("src/core/navigation.js") < indexSource.indexOf("src/core/app-core.js"));
assert.ok(indexSource.indexOf("src/core/navigation.js") < indexSource.indexOf("src/features/actions.js"));

console.log("Browser-history back navigation checks passed.");
