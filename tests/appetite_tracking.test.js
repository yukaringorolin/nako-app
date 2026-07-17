const assert = require("node:assert/strict");
const appetite = require("../src/core/appetite-tracking.js");

assert.deepEqual(appetite.PERCENTAGES, [0, 25, 50, 75, 100]);
assert.equal(appetite.validPercentage(0), 0, "Zero percent must remain a valid refused-food entry");
assert.equal(appetite.validPercentage("75"), 75);
assert.equal(appetite.validPercentage(80), null);
assert.equal(appetite.validPercentage(""), null, "Blank values must not create accidental zero-percent entries");

const entries = {};
assert.equal(appetite.upsertEntry(entries, "invalid", { percentage: 50 }, "now"), null);
assert.deepEqual(
  appetite.upsertEntry(entries, "2026-07-17", { percentage: 0 }, "2026-07-17T08:00:00.000Z"),
  { dateKey: "2026-07-17", percentage: 0, note: "", updatedAt: "2026-07-17T08:00:00.000Z" }
);
appetite.upsertEntry(entries, "2026-07-17", { note: "Refused breakfast" }, "2026-07-17T09:00:00.000Z");
assert.equal(entries["2026-07-17"].percentage, 0, "Editing a note must preserve the selected percentage");
assert.equal(entries["2026-07-17"].note, "Refused breakfast");

entries["2026-06-17"] = { percentage: 100, note: "Too old", updatedAt: "old" };
entries["2026-06-18"] = { percentage: 25, note: "First included day", updatedAt: "included" };
entries["2026-07-01"] = { percentage: 50, note: "Middle", updatedAt: "middle" };
entries["2026-07-18"] = { percentage: 75, note: "Future", updatedAt: "future" };
entries["2026-07-16"] = { percentage: 80, note: "Invalid percentage", updatedAt: "invalid" };

const recent = appetite.recentEntries(entries, "2026-07-17", 30);
assert.deepEqual(recent.map((entry) => entry.dateKey), ["2026-07-17", "2026-07-01", "2026-06-18"]);
assert.ok(recent.every((entry) => appetite.PERCENTAGES.includes(entry.percentage)));

console.log("Daily appetite tracking checks passed.");
