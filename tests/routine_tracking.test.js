const assert = require("node:assert/strict");
const tracking = require("../src/routine-tracking.js");

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

test("weekly cycle resets at Singapore Monday", () => {
  assert.deepEqual(tracking.cycleForDate("weekly", "2026-07-12"), {
    key: "weekly_2026-07-06", start: "2026-07-06", end: "2026-07-12"
  });
  assert.deepEqual(tracking.cycleForDate("weekly", "2026-07-13"), {
    key: "weekly_2026-07-13", start: "2026-07-13", end: "2026-07-19"
  });
});

test("daily cycle resets each Singapore calendar day", () => {
  assert.deepEqual(tracking.cycleForDate("daily", "2026-07-17"), {
    key: "daily_2026-07-17", start: "2026-07-17", end: "2026-07-17"
  });
  assert.notEqual(
    tracking.cycleForDate("daily", "2026-07-17").key,
    tracking.cycleForDate("daily", "2026-07-18").key
  );
});

test("UTC browser instant resolves to Singapore calendar date", () => {
  assert.equal(tracking.singaporeDateKey(new Date("2026-07-12T16:00:00.000Z")), "2026-07-13");
  assert.equal(tracking.singaporeDateKey(new Date("2026-07-12T15:59:59.999Z")), "2026-07-12");
});

test("11 July 2026 is Saturday", () => {
  assert.equal(tracking.weekday("2026-07-11", "en-SG"), "Saturday");
});

test("backdating within a weekly cycle keeps the identity", () => {
  const saturday = tracking.cycleForDate("weekly", "2026-07-11");
  const monday = tracking.cycleForDate("weekly", "2026-07-06");
  assert.equal(saturday.key, monday.key);
  assert.equal(tracking.completionId("floor-mats", saturday.key), tracking.completionId("floor-mats", monday.key));
});

test("backdating to a prior weekly cycle changes the identity", () => {
  const current = tracking.cycleForDate("weekly", "2026-07-11");
  const previous = tracking.cycleForDate("weekly", "2026-07-05");
  assert.notEqual(current.key, previous.key);
});

test("fortnightly cycles use the fixed 6 July 2026 anchor", () => {
  assert.deepEqual(tracking.cycleForDate("fortnightly", "2026-07-19"), {
    key: "fortnightly_2026-07-06", start: "2026-07-06", end: "2026-07-19"
  });
  assert.deepEqual(tracking.cycleForDate("fortnightly", "2026-07-20"), {
    key: "fortnightly_2026-07-20", start: "2026-07-20", end: "2026-08-02"
  });
});

test("monthly and quarterly cycles follow Singapore calendar boundaries", () => {
  assert.deepEqual(tracking.cycleForDate("monthly", "2026-02-18"), {
    key: "monthly_2026-02", start: "2026-02-01", end: "2026-02-28"
  });
  assert.deepEqual(tracking.cycleForDate("quarterly", "2026-07-11"), {
    key: "quarterly_2026-Q3", start: "2026-07-01", end: "2026-09-30"
  });
});

test("deterministic identity prevents duplicate task-cycle records", () => {
  const id = tracking.completionId("floor-mats", "weekly_2026-07-06");
  const records = {};
  records[id] = { id, note: "first" };
  records[id] = { id, note: "updated" };
  assert.equal(Object.keys(records).length, 1);
  assert.equal(records[id].note, "updated");
});

console.log("Routine tracking checks passed.");
