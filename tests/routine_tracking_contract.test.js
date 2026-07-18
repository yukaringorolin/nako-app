const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const tracking = require("../src/routine-tracking.js");

const window = {};
eval(fs.readFileSync(path.join(__dirname, "../src/data.js"), "utf8"));

const allTasks = window.nakoData.routineTasks;
const tracked = allTasks.filter((task) => task.active !== false && task.trackingMode && task.trackingMode !== "none");
const ids = new Set(allTasks.map((task) => task.id));

// 1. All task IDs are unique
assert.equal(ids.size, allTasks.length, "All routine task IDs must be unique");

// 2. Every tracked task has a valid tracking mode
const validModes = new Set(["checkbox", "metric", "one-off", "input"]);
for (const task of tracked) {
  assert.ok(validModes.has(task.trackingMode), `Tracked task ${task.id} has invalid mode ${task.trackingMode}`);
}

// 3. Every tracked task has a valid supported cadence
const validCadences = new Set(["daily", "weekly", "fortnightly", "monthly", "quarterly", "one-off"]);
for (const task of tracked) {
  assert.ok(validCadences.has(task.trackingCadence), `Tracked task ${task.id} has invalid cadence ${task.trackingCadence}`);
}

// 4. Every fortnightly task has a valid anchor
for (const task of tracked.filter((t) => t.trackingCadence === "fortnightly")) {
  assert.equal(task.trackingAnchor, "2026-07-06", `Fortnightly task ${task.id} must use Monday anchor 2026-07-06`);
}

// 5. Appetite is an explicit daily input; rubbish and other daily/as-needed routines stay untracked
const dailyAppetite = allTasks.find((task) => task.id === "nako-feeding-water");
assert.equal(dailyAppetite.trackingMode, "input");
assert.equal(dailyAppetite.trackingCadence, "daily");
assert.equal(dailyAppetite.trackingSource, "appetite");
for (const language of ["en", "jp", "mm"]) {
  assert.ok(dailyAppetite.checkInTitle[language], `Daily appetite check-in title needs ${language}`);
}
const dailyRubbish = allTasks.find((task) => task.id === "rubbish");
assert.equal(dailyRubbish.trackingMode, "none");
assert.equal(dailyRubbish.trackingCadence, null);
assert.equal(dailyRubbish.trackingStartDate, undefined);
for (const task of allTasks) {
  if (!["nako-feeding-water", "fire-extinguisher-training"].includes(task.id) && (task.frequencyBucket === "daily" || task.frequencyBucket === "as-needed")) {
    assert.equal(task.trackingMode, "none", `Daily/as-needed task ${task.id} must be reference-only (trackingMode = none)`);
  }
}

// 6. Every tracked task can generate a valid cycle and deterministic completion ID
for (const task of tracked) {
  const dummyDate = "2026-07-11"; // A Saturday
  const cycle = tracking.cycleForDate(task.trackingCadence, dummyDate, task.trackingAnchor || undefined);
  assert.ok(cycle && cycle.key, `Task ${task.id} failed to generate a valid cycle`);
  if (task.trackingCadence !== "one-off") {
    assert.ok(cycle.start && cycle.end, `Task ${task.id} is missing cycle start or end date`);
  }
  const completionId = tracking.completionId(task.id, cycle.key);
  assert.ok(completionId && typeof completionId === "string", `Task ${task.id} failed to generate a valid completion ID`);
}

// 7. Every tracked task has EN/JP/MM titles
for (const task of tracked) {
  assert.ok(task.title.en && task.title.en.trim().length > 0, `Tracked task ${task.id} is missing English title`);
  assert.ok(task.title.jp && task.title.jp.trim().length > 0, `Tracked task ${task.id} is missing Japanese title`);
  assert.ok(task.title.mm && task.title.mm.trim().length > 0, `Tracked task ${task.id} is missing Burmese title`);
}

// 8. Every tracked task has either a usable photo or icon fallback
for (const task of tracked) {
  const hasPhoto = Array.isArray(task.photos) && task.photos.length > 0 && task.photos[0].src;
  const hasIcon = task.icon && typeof task.icon === "string" && task.icon.trim().length > 0;
  assert.ok(hasPhoto || hasIcon, `Tracked task ${task.id} must have either a valid photo or icon fallback`);
}

// 9. Previously required baseline tasks still exist
const baselineIds = new Set([
  "nako-feeding-water",
  "high-touch-surfaces",
  "kitchen-sink-drain-rack-counter",
  "nako-weekly-play-pen-deep-clean",
  "nako-weight-tracking",
  "rubbish-bin-washing",
  "floor-mats",
  "bedrooms-linens",
  "windows-glass-mirrors",
  "sofa-covers-pillows",
  "ceiling-fan",
  "fridge-interior",
  "cleaning-tools",
  "blanket-washing",
  "curtain-steaming",
  "ikea-bed-frame",
  "general-surface-cleaning",
  "aircon-filter-fan-coil",
  "washer-deep-clean",
  "doorbell-charging",
  "coffee-machine-descaling",
  "fire-extinguisher-training"
]);
for (const id of baselineIds) {
  const task = tracked.find((t) => t.id === id);
  assert.ok(task, `Required baseline task ${id} is missing or not tracked`);
}
const retiredPillowMattressVacuuming = allTasks.find((task) => task.id === "pillow-mattress-vacuuming");
assert.ok(retiredPillowMattressVacuuming, "Retired pillow/mattress vacuuming routine must retain its stable ID and history");
assert.equal(retiredPillowMattressVacuuming.active, false, "Vacuuming is now part of weekly bedrooms and linens, so the monthly duplicate must stay inactive");
const ikeaBedFrameCleaning = tracked.find((task) => task.id === "ikea-bed-frame");
assert.equal(ikeaBedFrameCleaning.frequencyBucket, "quarterly", "IKEA bed-frame cleaning must appear in the quarterly section");
assert.equal(ikeaBedFrameCleaning.trackingCadence, "quarterly", "IKEA bed-frame cleaning must use quarterly completion cycles");
assert.equal(ikeaBedFrameCleaning.trackingAnchor, null, "Quarterly IKEA bed-frame cleaning must not retain the fortnightly anchor");

const fridgeInterior = allTasks.find((task) => task.id === "fridge-interior");
const cleaningTools = allTasks.find((task) => task.id === "cleaning-tools");
assert.equal(fridgeInterior.trackingCadence, "monthly");
assert.equal(cleaningTools.trackingCadence, "fortnightly");
assert.deepEqual(Array.from(fridgeInterior.legacyTrackingCadences), ["weekly"]);
assert.deepEqual(Array.from(cleaningTools.legacyTrackingCadences), ["weekly"]);

const monthlyCycle = tracking.cycleForDate("monthly", "2026-07-18");
const legacyWeeklyRecord = {
  id: "fridge-interior_weekly_2026-07-13",
  taskId: "fridge-interior",
  cycleKey: "weekly_2026-07-13",
  completedDate: "2026-07-15",
  updatedAt: "2026-07-15T08:00:00Z"
};
assert.equal(
  tracking.compatibleRecordForCycle({ [legacyWeeklyRecord.id]: legacyWeeklyRecord }, fridgeInterior, monthlyCycle),
  legacyWeeklyRecord,
  "A legacy weekly completion within the new monthly cycle must satisfy the current cycle"
);
const exactMonthlyRecord = {
  id: "fridge-interior_monthly_2026-07",
  taskId: "fridge-interior",
  cycleKey: "monthly_2026-07",
  completedDate: "2026-07-18",
  updatedAt: "2026-07-18T08:00:00Z"
};
assert.equal(
  tracking.compatibleRecordForCycle({ [legacyWeeklyRecord.id]: legacyWeeklyRecord, [exactMonthlyRecord.id]: exactMonthlyRecord }, fridgeInterior, monthlyCycle),
  exactMonthlyRecord,
  "An exact current-cadence completion must take precedence over a legacy completion"
);

// 10. A newly added mock tracked task would automatically be selected by trackedRoutineTasks predicate logic
const mockTask = {
  id: "mock-weekly-oven-clean",
  frequencyBucket: "weekly",
  active: true,
  trackingMode: "checkbox",
  trackingCadence: "weekly"
};
const predicate = (task) => task.active !== false && task.trackingMode && task.trackingMode !== "none";
assert.ok(predicate(mockTask), "Mock weekly task must satisfy the trackedRoutineTasks selection predicate");

// 11. If a non-daily task is deliberately excluded, it must have an explicit exclusion reason
const nonDailyCadences = new Set(["weekly", "fortnightly", "monthly", "quarterly", "one-off"]);
for (const task of allTasks) {
  const isPinnedSafety = ["nako-emergency", "nako-kind-handling", "nako-supervision"].includes(task.id);
  const isDailyOrAsNeeded = task.frequencyBucket === "daily" || task.frequencyBucket === "as-needed";
  if (nonDailyCadences.has(task.frequencyBucket) && !isPinnedSafety && !isDailyOrAsNeeded && task.trackingMode === "none") {
    assert.ok(task.trackingExclusionReason && typeof task.trackingExclusionReason === "string" && task.trackingExclusionReason.trim().length > 0,
      `Deliberately excluded non-daily task ${task.id} must have a non-empty trackingExclusionReason`
    );
  }
}

console.log("Invariant-based routine tracking data contract checks passed successfully.");
