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
const activeWeeklyTasks = data.routineTasks.filter((task) => task.active !== false && task.frequencyBucket === "weekly");

const expectedGroups = {
  "nako-care": [
    "nako-weekly-play-pen-deep-clean",
    "nako-weight-tracking",
    "nako-inventory-check"
  ],
  "kitchen-health": [
    "kitchen-sink-drain-rack-counter",
    "microwave-interior",
    "ninja-af141-air-fryer-interior-deep-clean",
    "supplement-pill-boxes"
  ],
  "whole-home-cleaning": [
    "high-touch-surfaces",
    "toilet-cleaning",
    "rubbish-bin-washing",
    "floor-mats",
    "windows-glass-mirrors",
    "ceiling-fan"
  ],
  "living-maintenance": [
    "bedrooms-linens",
    "sofa-covers-pillows",
    "pest-check"
  ]
};
const groupOrder = Object.keys(expectedGroups);

assert.equal(activeWeeklyTasks.length, 16, "The Weekly Care Guide must contain all 16 active weekly routines");
assert.equal(new Set(activeWeeklyTasks.map((task) => task.id)).size, activeWeeklyTasks.length, "Weekly task IDs must be unique");

for (const task of activeWeeklyTasks) {
  assert.ok(groupOrder.includes(task.weeklyGuideGroup), `${task.id} must have a valid weeklyGuideGroup`);
  assert.ok(Number.isInteger(task.weeklyGuideOrder) && task.weeklyGuideOrder > 0, `${task.id} must have a positive weeklyGuideOrder`);
}

for (const [groupId, expectedIds] of Object.entries(expectedGroups)) {
  const actualIds = activeWeeklyTasks
    .filter((task) => task.weeklyGuideGroup === groupId)
    .sort((a, b) => a.weeklyGuideOrder - b.weeklyGuideOrder)
    .map((task) => task.id);
  assert.deepEqual(Array.from(actualIds), expectedIds, `${groupId} must keep its intended task order`);
}

const expectedTrackingModes = {
  "nako-weight-tracking": "metric",
  "nako-inventory-check": "none",
  "pest-check": "none"
};
for (const task of activeWeeklyTasks) {
  assert.equal(task.trackingMode, expectedTrackingModes[task.id] || "checkbox", `${task.id} must preserve its tracking mode`);
}

const deepToiletCleaning = activeWeeklyTasks.find((task) => task.id === "toilet-cleaning");
assert.equal(deepToiletCleaning.title.en, "Deep Toilet Cleaning");
assert.equal(deepToiletCleaning.trackingMode, "checkbox");
assert.equal(deepToiletCleaning.trackingCadence, "weekly");

const supplementPillBoxes = activeWeeklyTasks.find((task) => task.id === "supplement-pill-boxes");
assert.equal(supplementPillBoxes.trackingMode, "checkbox");
assert.equal(supplementPillBoxes.trackingCadence, "weekly");

for (const lang of ["en", "jp", "mm"]) {
  for (const key of [
    "weeklyGuideGroupNakoTitle", "weeklyGuideGroupNakoDescription",
    "weeklyGuideGroupKitchenTitle", "weeklyGuideGroupKitchenDescription",
    "weeklyGuideGroupHomeTitle", "weeklyGuideGroupHomeDescription",
    "weeklyGuideGroupLivingTitle", "weeklyGuideGroupLivingDescription"
  ]) assert.ok(data.ui[lang][key], `${key} must be translated in ${lang}`);
}

assert.match(pageSource, /const WEEKLY_GUIDE_GROUPS = Object\.freeze\(\[[\s\S]*?id: "nako-care"[\s\S]*?id: "kitchen-health"[\s\S]*?id: "whole-home-cleaning"[\s\S]*?id: "living-maintenance"/, "Weekly groups must render with Nako first");
assert.match(pageSource, /isWeeklyGuide\s*\?\s*renderWeeklyGuideGroups\(items, section\)/, "Weekly sections must use the grouped renderer");
assert.match(componentSource, /function renderWeeklyGuideGroup\(group, tasks, section\)/);
assert.match(styleSource, /\.weekly-guide-task-list \.card-description[\s\S]*?-webkit-line-clamp:\s*2/);
assert.match(styleSource, /\.weekly-guide-task-list\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/s, "Weekly tasks must remain a single full-width column");
assert.doesNotMatch(styleSource, /\.weekly-guide-task-list\s*\{[^}]*grid-template-columns:\s*repeat\(2/s, "Weekly tasks must never use squeezed two-column cards");
assert.match(styleSource, /@media \(min-width: 720px\)[\s\S]*?\.weekly-guide-task-list \.item-card[\s\S]*?grid-template-columns:\s*64px minmax\(0, 1fr\) 24px/, "Wider screens must use spacious horizontal weekly rows");

console.log("Weekly Care Guide grouping contracts passed.");
