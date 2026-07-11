const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const window = {};
eval(fs.readFileSync(path.join(__dirname, "../src/data.js"), "utf8"));

const tracked = window.nakoData.routineTasks.filter((task) => task.trackingMode !== "none");
const ids = new Set(tracked.map((task) => task.id));

assert.equal(tracked.length, 22, "the curated checklist should contain exactly 22 stable tasks");
assert.equal(ids.size, tracked.length, "tracked task IDs must be unique");
assert.equal(tracked.filter((task) => task.trackingCadence === "weekly").length, 12);
assert.equal(tracked.filter((task) => task.trackingCadence === "fortnightly").length, 3);
assert.equal(tracked.filter((task) => task.trackingCadence === "monthly").length, 3);
assert.equal(tracked.filter((task) => task.trackingCadence === "quarterly").length, 3);
assert.equal(tracked.filter((task) => task.trackingCadence === "one-off").length, 1);
assert.equal(tracked.find((task) => task.id === "nako-weight-tracking").trackingMode, "metric");
assert.equal(tracked.find((task) => task.id === "fire-extinguisher-training").trackingMode, "one-off");

for (const task of tracked.filter((task) => task.trackingCadence === "fortnightly")) {
  assert.equal(task.trackingAnchor, "2026-07-06");
}

for (const excludedId of [
  "daily-cooking",
  "laundry",
  "nako-feeding-water",
  "toilet-cleaning",
  "microwave-interior",
  "grocery-shopping",
  "outside-shoe-rack"
]) {
  const task = window.nakoData.routineTasks.find((item) => item.id === excludedId);
  if (task) assert.equal(task.trackingMode, "none", `${excludedId} must remain reference-only`);
}

console.log("Routine tracking data contract passed.");
