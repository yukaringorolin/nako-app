const assert = require("node:assert/strict");
const selection = require("../src/core/routine-task-selection.js");

assert.deepEqual(selection.ROUTINE_CADENCE_ORDER, ["weekly", "fortnightly", "monthly", "quarterly", "one-off"]);
assert.equal(Object.isFrozen(selection.ROUTINE_CADENCE_ORDER), true);

const weeklyDue = { task: { id: "weekly-due", trackingCadence: "weekly" }, record: null };
const monthlyComplete = { task: { id: "monthly-complete", trackingCadence: "monthly" }, record: { id: "done-monthly" } };
const oneOffDue = { task: { id: "one-off-due", trackingCadence: "one-off" }, record: null };
const weeklyComplete = { task: { id: "weekly-complete", trackingCadence: "weekly" }, record: { id: "done-weekly" } };
const fortnightlyDue = { task: { id: "fortnightly-due", trackingCadence: "fortnightly" }, record: null };
const ignored = { task: { id: "daily-reference", trackingCadence: "daily" }, record: null };

const summary = selection.summarizeChecklist([
  weeklyDue,
  monthlyComplete,
  oneOffDue,
  weeklyComplete,
  fortnightlyDue,
  ignored
]);

assert.deepEqual(Object.keys(summary.dueByCadence), selection.ROUTINE_CADENCE_ORDER);
assert.deepEqual(Object.keys(summary.completedByCadence), selection.ROUTINE_CADENCE_ORDER);
assert.deepEqual(summary.dueByCadence.weekly, [weeklyDue]);
assert.deepEqual(summary.dueByCadence.fortnightly, [fortnightlyDue]);
assert.deepEqual(summary.dueByCadence.monthly, []);
assert.deepEqual(summary.dueByCadence.quarterly, []);
assert.deepEqual(summary.dueByCadence["one-off"], [oneOffDue]);
assert.deepEqual(summary.completedByCadence.weekly, [weeklyComplete]);
assert.deepEqual(summary.completedByCadence.monthly, [monthlyComplete]);
assert.deepEqual(summary.remainingByCadence, {
  weekly: 1,
  fortnightly: 1,
  monthly: 0,
  quarterly: 0,
  "one-off": 1
});
assert.equal(summary.dueTotal, 3);
assert.equal(summary.completedTotal, 2);

const empty = selection.summarizeChecklist();
assert.deepEqual(empty.remainingByCadence, {
  weekly: 0,
  fortnightly: 0,
  monthly: 0,
  quarterly: 0,
  "one-off": 0
});
assert.equal(empty.dueTotal, 0);
assert.equal(empty.completedTotal, 0);

console.log("Routine task checklist grouping checks passed successfully.");
