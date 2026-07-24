const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const selection = require("../src/core/routine-task-selection.js");
const tracking = require("../src/routine-tracking.js");

function checklistItem(id, deadline, options = {}) {
  return {
    task: {
      id,
      trackingCadence: options.cadence || "weekly",
      title: options.title || { en: id, jp: `${id}-jp`, mm: `${id}-mm` },
      ...(options.checkInTitle ? { checkInTitle: options.checkInTitle } : {})
    },
    cycle: deadline ? { key: `${id}-cycle`, start: "2026-07-01", end: deadline } : { key: `${id}-cycle`, start: "", end: "" },
    record: options.record || null
  };
}

const today = "2026-07-24";
const checklist = [
  checklistItem("past", "2026-07-23"),
  checklistItem("today", "2026-07-24"),
  checklistItem("tomorrow", "2026-07-25"),
  checklistItem("two-days", "2026-07-26"),
  checklistItem("three-days", "2026-07-27"),
  checklistItem("four-days", "2026-07-28"),
  checklistItem("completed-tomorrow", "2026-07-25", { record: { id: "completed" } }),
  checklistItem("one-off-no-deadline", "", { cadence: "one-off" })
];

const summary = selection.summarizeUpcomingDue(checklist, {
  today,
  daysBetween: tracking.daysBetween,
  horizonDays: 3
});

assert.deepEqual(
  summary.items.map((item) => item.task.id),
  ["today", "tomorrow", "two-days", "three-days"],
  "Reminder must include only incomplete items due from today through the next 3 days"
);
assert.deepEqual(summary.items.map((item) => item.daysUntilDue), [0, 1, 2, 3]);
assert.equal(summary.total, 4);
assert.equal(summary.nearestDeadline, "2026-07-24");
assert.equal(summary.nearestDaysUntilDue, 0);
assert.ok(!summary.items.some((item) => item.task.id === "completed-tomorrow"), "Completed items must be excluded");
assert.ok(!summary.items.some((item) => item.task.id === "one-off-no-deadline"), "One-off items without deadlines must be excluded");

const newlyCompleted = checklistItem("complete-now", "2026-07-24");
assert.equal(selection.summarizeUpcomingDue([newlyCompleted], {
  today,
  daysBetween: tracking.daysBetween
}).total, 1);
newlyCompleted.record = { id: "complete-now-record" };
assert.equal(selection.summarizeUpcomingDue([newlyCompleted], {
  today,
  daysBetween: tracking.daysBetween
}).total, 0, "A newly completed task must disappear on the next render");

const multipleDeadlines = selection.summarizeUpcomingDue([
  checklistItem("later", "2026-07-27"),
  checklistItem("nearest-first", "2026-07-25"),
  checklistItem("nearest-second", "2026-07-25"),
  checklistItem("middle", "2026-07-26")
], {
  today,
  daysBetween: tracking.daysBetween
});
assert.deepEqual(
  multipleDeadlines.items.map((item) => item.task.id),
  ["nearest-first", "nearest-second", "middle", "later"],
  "Multiple deadlines must sort nearest first while preserving task order for ties"
);
assert.equal(multipleDeadlines.nearestDeadline, "2026-07-25");
assert.equal(multipleDeadlines.nearestDaysUntilDue, 1);

const conciseTitle = { en: "Short check-in", jp: "短い確認名", mm: "အတိုကောက် အလုပ်အမည်" };
const longTitle = { en: "Long task title", jp: "長いタスク名", mm: "အလုပ်အမည်အရှည်" };
assert.equal(
  selection.reminderTaskTitle({ title: longTitle, checkInTitle: conciseTitle }),
  conciseTitle,
  "Reminder must prefer the existing concise check-in title"
);
assert.equal(
  selection.reminderTaskTitle({ title: longTitle }),
  longTitle,
  "Reminder must fall back to the normal task title"
);

const preview = selection.reminderPreview(summary.items, 3);
assert.equal(preview.visible.length, 3, "Home reminder must show at most 3 task names");
assert.equal(preview.moreCount, 1);

const beforeSingaporeMidnight = new Date("2026-07-12T15:59:59.999Z");
const atSingaporeMidnight = new Date("2026-07-12T16:00:00.000Z");
const beforeDate = tracking.singaporeDateKey(beforeSingaporeMidnight);
const afterDate = tracking.singaporeDateKey(atSingaporeMidnight);
const beforeWeekly = checklistItem("weekly-boundary", tracking.cycleForDate("weekly", beforeDate).end);
const afterWeekly = checklistItem("weekly-boundary", tracking.cycleForDate("weekly", afterDate).end);
assert.equal(
  selection.summarizeUpcomingDue([beforeWeekly], { today: beforeDate, daysBetween: tracking.daysBetween }).nearestDaysUntilDue,
  0,
  "The reminder must use the Singapore date before midnight"
);
assert.equal(
  selection.summarizeUpcomingDue([afterWeekly], { today: afterDate, daysBetween: tracking.daysBetween }).total,
  0,
  "The new Singapore week must not inherit the prior cycle deadline"
);

const root = path.join(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "src", "data.js"), "utf8"), context);
const ui = context.window.nakoData.ui;
const reminderKeys = [
  "routineReminderTitle",
  "routineReminderDueToday",
  "routineReminderDueTomorrow",
  "routineReminderDueInDays",
  "routineReminderMore"
];
for (const language of ["en", "jp", "mm"]) {
  for (const key of reminderKeys) assert.ok(ui[language][key], `${language}.${key} is required`);
}
for (const key of reminderKeys) {
  assert.notEqual(ui.en[key], ui.jp[key], `${key} needs a Japanese translation`);
  assert.notEqual(ui.en[key], ui.mm[key], `${key} needs a Burmese translation`);
}
assert.equal(ui.en.routineReminderDueToday, "Due today");
assert.equal(ui.en.routineReminderDueTomorrow, "Due tomorrow");
assert.equal(ui.en.routineReminderDueInDays.replace("{count}", "2"), "Due in 2 days");
assert.equal(ui.en.routineReminderMore.replace("{count}", String(preview.moreCount)), "+1 more");

const pagesSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
assert.match(pagesSource, /renderRoutineDeadlineReminder\(checklist, \{ home: true \}\)/, "Home page needs the reminder");
assert.match(pagesSource, /renderRoutineDeadlineReminder\(checklist, \{ today \}\)/, "Routine Check-in needs the reminder");
assert.match(pagesSource, /href="#routine-checkin"/, "Reminder must link to Routine Check-in");

console.log("Routine deadline reminder checks passed successfully.");
