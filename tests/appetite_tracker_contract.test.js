const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "src", "data.js"), "utf8"), context);

const data = context.window.nakoData;
const legacyFood = data.foodItems.find((item) => item.id === "nako-feeding");
const feedingRoutine = data.routineTasks.find((item) => item.id === "nako-feeding-water");

assert.ok(legacyFood, "The stable nako-feeding food ID must remain in canonical data");
assert.equal(legacyFood.active, false);
assert.equal(legacyFood.canonicalRoute, "#routine/nako-feeding-water");
assert.match(feedingRoutine.mustRemember.map((item) => item.en).join("\n"), /appetite percentage/);

const search = require("../src/search.js");
const searchIndex = search.buildSearchIndex(data);
assert.equal(searchIndex.some((item) => item.id === "food-nako-feeding"), false, "The retired Food result must not remain searchable");
assert.ok(search.searchIndex(searchIndex, "appetite").some((item) => item.id === "routine-nako-feeding-water"));

const componentSource = fs.readFileSync(path.join(root, "src", "ui", "components.js"), "utf8");
const pageSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
const appetiteSource = fs.readFileSync(path.join(root, "src", "features", "appetite.js"), "utf8");
assert.match(componentSource, /foodItems\.filter\(\(item\) => item\.active !== false\)\.length/);
assert.match(pageSource, /if \(item\.canonicalRoute\) return go\(item\.canonicalRoute\)/);
assert.match(pageSource, /frequency[\s\S]*appetitePanelHtml[\s\S]*renderPhotos\(task\.photos\)/, "The tracker must render after When and before Photos");
assert.match(pageSource, /id: "nako-feeding-water", type: "routine", labelKey: "shortcutAppetiteTracker"/, "The home page must link directly to the appetite tracker routine");
assert.equal(data.ui.en.shortcutAppetiteTracker, "Nako Appetite Tracker");
assert.ok(data.ui.jp.shortcutAppetiteTracker);
assert.ok(data.ui.mm.shortcutAppetiteTracker);
assert.match(appetiteSource, /PERCENTAGES\.map/);
assert.match(appetiteSource, /recentEntries\(entries, today, 30/);
assert.match(appetiteSource, /data-appetite-edit/);
assert.doesNotMatch(appetiteSource, /data-appetite-delete/);

console.log("Appetite tracker route and UI contracts passed.");
