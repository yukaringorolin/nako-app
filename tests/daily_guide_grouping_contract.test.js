const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const context = { window: {}, console };
vm.runInNewContext(fs.readFileSync(path.join(root, "src", "data.js"), "utf8"), context);

const data = context.window.nakoData;
const pageSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
const componentSource = fs.readFileSync(path.join(root, "src", "ui", "components.js"), "utf8");
const styleSource = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");
const activeDailyTasks = data.routineTasks.filter((task) => task.active !== false && task.frequencyBucket === "daily");

const expectedGroups = {
  start: ["google-calendar-check", "upload-shared-album"],
  "food-kitchen": [
    "drinking-water-prep", "grocery-shopping", "daily-cooking", "clean-up-cooking-appliances",
    "coffee-machine-upkeep", "protein-shake-creatine-prep"
  ],
  "nako-care": [
    "nako-feeding-water", "nako-potty-pen", "nako-exercise-grooming", "nako-walk-car-bags",
    "nako-teeth-ears-nails", "nako-training-fun"
  ],
  "home-care": [
    "laundry", "toilet-drain-hair-trap", "sofa-hair-room-corner-cleaning", "floor-cleaning", "rubbish",
    "general-tidiness"
  ],
  "admin-supplies": ["mail-deliveries", "household-supplies-online", "helper-diary-feedback"],
  safety: ["nako-supervision", "nako-kind-handling", "nako-emergency"]
};
const groupOrder = Object.keys(expectedGroups);

assert.equal(activeDailyTasks.length, 26, "The Daily Care Guide must contain all 26 active daily references");
assert.equal(new Set(activeDailyTasks.map((task) => task.id)).size, activeDailyTasks.length, "Daily task IDs must be unique");

for (const task of activeDailyTasks) {
  assert.ok(groupOrder.includes(task.dailyGuideGroup), `${task.id} must have a valid dailyGuideGroup`);
  assert.ok(Number.isInteger(task.dailyGuideOrder) && task.dailyGuideOrder > 0, `${task.id} must have a positive dailyGuideOrder`);
}

for (const [groupId, expectedIds] of Object.entries(expectedGroups)) {
  const actualIds = activeDailyTasks
    .filter((task) => task.dailyGuideGroup === groupId)
    .sort((a, b) => a.dailyGuideOrder - b.dailyGuideOrder)
    .map((task) => task.id);
  assert.deepEqual(Array.from(actualIds), expectedIds, `${groupId} must keep its intended task order`);
}

for (const lang of ["en", "jp", "mm"]) {
  for (const key of [
    "dailyGuideGroupStartTitle", "dailyGuideGroupStartDescription",
    "dailyGuideGroupFoodTitle", "dailyGuideGroupFoodDescription",
    "dailyGuideGroupNakoTitle", "dailyGuideGroupNakoDescription",
    "dailyGuideGroupHomeTitle", "dailyGuideGroupHomeDescription",
    "dailyGuideGroupAdminTitle", "dailyGuideGroupAdminDescription",
    "dailyGuideGroupSafetyTitle", "dailyGuideGroupSafetyDescription"
  ]) assert.ok(data.ui[lang][key], `${key} must be translated in ${lang}`);
}

assert.match(pageSource, /const DAILY_GUIDE_GROUPS = Object\.freeze\(\[[\s\S]*?id: "start"[\s\S]*?id: "food-kitchen"[\s\S]*?id: "nako-care"[\s\S]*?id: "home-care"[\s\S]*?id: "admin-supplies"[\s\S]*?id: "safety"/, "Daily groups must render in the agreed order with Safety First last");
assert.match(componentSource, /function renderDailyGuideGroup\(group, tasks, section\)/);
assert.doesNotMatch(componentSource, /renderDailySafetySection/, "The old hard-coded safety list must not remain");
assert.match(styleSource, /\.daily-guide-task-list \.card-description[\s\S]*?-webkit-line-clamp:\s*2/);
assert.match(styleSource, /\.daily-guide-task-list\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/s, "Daily tasks must remain a single full-width column");
assert.doesNotMatch(styleSource, /\.daily-guide-task-list\s*\{[^}]*grid-template-columns:\s*repeat\(2/s, "Daily tasks must never return to squeezed two-column cards");
assert.match(styleSource, /@media \(min-width: 720px\)[\s\S]*?\.daily-guide-task-list \.item-card[\s\S]*?grid-template-columns:\s*64px minmax\(0, 1fr\) 24px/, "Wider screens must use spacious horizontal task rows");

console.log("Daily Care Guide grouping contracts passed.");
