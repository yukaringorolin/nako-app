const assert = require("node:assert/strict");
const tracking = require("../src/routine-tracking.js");
const { diaryDay } = require("../src/core/diary-date.js");
const {
  activeTrackedRoutineTasks,
  historicalTrackedRoutineTasks,
  historyFilterTasks,
  shouldGenerateMissed
} = require("../src/core/routine-task-selection.js");
const {
  navigateToDestination,
  takePendingDestination
} = require("../src/core/search-navigation.js");

{
  const destinations = [
    { route: "#routine/nako-training-fun", destination: { type: "training-command", id: "sit" } },
    { route: "#routine/nako-training-fun", destination: { type: "training-activity", id: "find-it-game" } },
    { route: "#food-safety/household-cooking-rules", destination: { type: "cooking-rule", index: "2" } },
    { route: "", destination: { type: "resource", id: "1" } }
  ];

  for (const expected of destinations) {
    let pending = null;
    let observedDuringNavigation = null;
    navigateToDestination(expected.route, expected.destination, {
      setPendingDestination(value) { pending = value; },
      navigate(route) { observedDuringNavigation = { route, pending }; }
    });
    assert.deepEqual(observedDuringNavigation, { route: expected.route, pending: expected.destination });
    const handled = takePendingDestination(pending, () => { pending = null; });
    assert.deepEqual(handled, expected.destination);
    assert.equal(pending, null, "handled destinations must not remain stale");
    assert.equal(takePendingDestination(pending, () => {}), null);
  }
}

{
  const active = { id: "active", active: true, trackingMode: "check", trackingCadence: "weekly" };
  const inactive = { id: "inactive", active: false, trackingMode: "check", trackingCadence: "weekly" };
  const reference = { id: "reference", active: true, trackingMode: "none", trackingCadence: null };
  const input = { id: "input", active: true, trackingMode: "input", trackingCadence: "daily" };
  const tasks = [active, inactive, reference, input];
  const savedInactiveRecord = { id: "inactive_week", taskId: "inactive", completedDate: "2026-07-01", deleted: false };

  assert.deepEqual(activeTrackedRoutineTasks(tasks).map((task) => task.id), ["active", "input"]);
  assert.deepEqual(historicalTrackedRoutineTasks(tasks).map((task) => task.id), ["active", "inactive"]);
  assert.deepEqual(historyFilterTasks(tasks, [savedInactiveRecord]).map((task) => task.id), ["active", "inactive"]);
  assert.deepEqual(historyFilterTasks(tasks, []).map((task) => task.id), ["active"]);
  assert.equal(shouldGenerateMissed(inactive), false);
  assert.equal(shouldGenerateMissed(active), true);
  assert.equal(shouldGenerateMissed({ ...active, trackingCadence: "one-off" }), false);
  assert.equal(shouldGenerateMissed(input), false);
  assert.equal(historicalTrackedRoutineTasks(tasks).find((task) => task.id === "input"), undefined);
  assert.equal(historicalTrackedRoutineTasks(tasks).find((task) => task.id === "removed"), undefined);
}

{
  const singaporeNextDay = new Date("2026-07-12T16:30:00.000Z");
  const otherZoneNextDayButSingaporePrevious = new Date("2026-07-12T15:30:00.000Z");
  const entries = {
    "2026-07-13": { dateKey: "2026-07-13", originalText: "Singapore Monday" },
    "2026-07-12": { dateKey: "2026-07-12", originalText: "Singapore Sunday" }
  };

  const monday = diaryDay(tracking, entries, singaporeNextDay);
  assert.equal(monday.dateKey, "2026-07-13");
  assert.strictEqual(monday.entry, entries["2026-07-13"]);
  assert.equal(tracking.formatDate(monday.dateKey, "en-SG"), "13 Jul 2026");

  const sunday = diaryDay(tracking, entries, otherZoneNextDayButSingaporePrevious);
  assert.equal(sunday.dateKey, "2026-07-12");
  assert.strictEqual(sunday.entry, entries["2026-07-12"]);
  assert.equal(tracking.singaporeDateKey(otherZoneNextDayButSingaporePrevious), sunday.dateKey);
}

console.log("Search destination, routine retirement, and diary date checks passed.");
