const assert = require("node:assert/strict");
const { key, migrateLegacyDiaryDrafts, normalize } = require("../src/core/text-drafts.js");
const { mergeStates, needsSharedStateCleanup, projectSharedState } = require("../src/core/firebase-state.js");

assert.equal(key("routine", "task_weekly_2026-07-13"), "routine:task_weekly_2026-07-13");
assert.equal(key("unknown", "record"), "");
assert.deepEqual(normalize({ text: "draft", mode: "edit", surface: "history", updatedAt: "now" }), {
  text: "draft",
  mode: "edit",
  surface: "history",
  updatedAt: "now"
});

const legacyState = {
  diary: {
    entries: {
      "2026-07-18": { dateKey: "2026-07-18", originalText: "Already saved", updatedAt: "2026-07-18T08:00:00.000Z" },
      "2026-07-19": { dateKey: "2026-07-19", originalText: "Saved version", updatedAt: "2026-07-19T08:00:00.000Z" }
    },
    drafts: {
      "2026-07-18": { text: "Already saved", updatedAt: "2026-07-18T08:00:00.000Z" },
      "2026-07-19": { text: "Unsaved revision", updatedAt: "2026-07-19T09:00:00.000Z" },
      "2026-07-20": { text: "Unsaved new diary", updatedAt: "2026-07-20T09:00:00.000Z" }
    }
  }
};
assert.equal(migrateLegacyDiaryDrafts(legacyState), true);
assert.equal(legacyState.diary.drafts, undefined);
assert.equal(legacyState.textDrafts["diary:2026-07-18"], undefined, "A draft identical to saved text is not an unsaved draft");
assert.equal(legacyState.textDrafts["diary:2026-07-19"].mode, "edit");
assert.equal(legacyState.textDrafts["diary:2026-07-20"].mode, "create");

assert.equal(needsSharedStateCleanup({ textDrafts: { "diary:2026-07-20": {} } }), true);
assert.equal(needsSharedStateCleanup({ diary: { drafts: { "2026-07-20": {} } } }), true);
const projected = projectSharedState(legacyState);
assert.equal(projected.textDrafts, undefined, "Local text drafts must never be shared");
assert.equal(projected.diary.drafts, undefined, "Legacy diary drafts must never be shared");

const liveDiary = {
  diary: { entries: { "2026-07-19": { dateKey: "2026-07-19", originalText: "Old diary", submittedAt: "2026-07-19T08:00:00.000Z", updatedAt: "2026-07-19T08:00:00.000Z" } } }
};
const deletedDiary = {
  diary: { entries: { "2026-07-19": { dateKey: "2026-07-19", originalText: "", deleted: true, deletedAt: "2026-07-19T09:00:00.000Z", updatedAt: "2026-07-19T09:00:00.000Z" } } }
};
assert.equal(mergeStates(liveDiary, deletedDiary).diary.entries["2026-07-19"].deleted, true, "A newer diary tombstone must beat a stale live entry");

console.log("Local text draft and diary tombstone checks passed.");
