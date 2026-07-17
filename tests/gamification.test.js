const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const gamification = require("../src/core/gamification.js");
const { mergeStates } = require("../src/core/firebase-state.js");

const state = {
  routineCompletions: {
    good: { id: "good", taskId: "weekly-clean", completedDate: "2026-07-13", completedAt: "2026-07-13T09:00:00+08:00" },
    metric: { id: "metric", taskId: "nako-weight-tracking", source: "metric", completedDate: "2026-07-13" },
    missed: { id: "missed", taskId: "weekly-missed", completedDate: "2026-07-13", missed: true },
    deleted: { id: "deleted", taskId: "weekly-old", completedDate: "2026-07-13", deleted: true }
  },
  training: {
    commandLogs: [
      { id: "train-1", commandId: "sit", score: 4, createdAt: "2026-07-14T10:00:00+08:00" },
      { id: "train-deleted", commandId: "sit", score: 9, createdAt: "2026-07-14T11:00:00+08:00", deleted: true }
    ],
    playLogs: [{ id: "play-1", activityId: "toy", createdAt: "2026-07-15T10:00:00+08:00" }]
  },
  appetiteTracking: {
    "2026-07-16": { percentage: 0, note: "Outcome must not affect recognition", updatedAt: "2026-07-16T09:00:00+08:00" }
  },
  weightTracking: {
    "2026-07-16": { value: 2.4, updatedAt: "2026-07-16T10:00:00+08:00" },
    "2026-07-18": { value: "", updatedAt: "2026-07-18T10:00:00+08:00" }
  },
  diary: {
    entries: {
      "2026-07-17": { dateKey: "2026-07-17", submittedAt: "2026-07-17T20:00:00+08:00", originalText: "" }
    }
  }
};

const activities = gamification.collectActivities(state);
assert.equal(activities.length, 6);
assert.deepEqual(activities.map((item) => item.subtype), ["routine", "training", "play", "appetite", "weight", "diary"]);
assert.equal(activities.some((item) => item.id === "metric"), false, "Metric routine completion must not double-count weight");

const summary = gamification.deriveWeeklySummary(state, new Date("2026-07-19T22:00:00+08:00"));
assert.equal(summary.start, "2026-07-13");
assert.equal(summary.end, "2026-07-19");
assert.deepEqual(summary.counts, { routines: 1, trainingPlay: 2, health: 2, diary: 1 });
assert.deepEqual(summary.activeCategories, gamification.CATEGORY_ORDER);

const nextWeek = gamification.deriveWeeklySummary(state, new Date("2026-07-20T00:00:00+08:00"));
assert.equal(nextWeek.start, "2026-07-20", "Singapore midnight Monday must start a new week");
assert.equal(nextWeek.total, 0);

const eligible = gamification.deriveEligiblePostcards(state, new Date("2026-07-19T22:00:00+08:00")).map((item) => item.id);
assert.deepEqual(eligible, [
  "nako-hello",
  "routine-sparkle",
  "training-paw",
  "purple-playtime",
  "health-heart",
  "diary-flower",
  "four-care-paws",
  "cozy-three"
]);

const synced = JSON.parse(JSON.stringify(state));
const firstSync = gamification.syncUnlocks(synced, new Date("2026-07-19T22:00:00+08:00"));
assert.equal(firstSync.newlyUnlocked.length, eligible.length);
const routineUnlockedAt = synced.gamification.unlockedPostcards["routine-sparkle"].unlockedAt;
synced.routineCompletions = {};
synced.training.commandLogs = [];
synced.training.playLogs = [];
synced.appetiteTracking = {};
synced.weightTracking = {};
synced.diary.entries = {};
gamification.syncUnlocks(synced, new Date("2026-07-25T12:00:00+08:00"));
assert.equal(synced.gamification.unlockedPostcards["routine-sparkle"].unlockedAt, routineUnlockedAt, "Unlocked cards must never relock");

const merged = mergeStates(
  { gamification: { version: 1, unlockedPostcards: {
    "routine-sparkle": { unlockedAt: "2026-07-15T00:00:00.000Z" },
    "training-paw": { unlockedAt: "2026-07-16T00:00:00.000Z" }
  } } },
  { gamification: { version: 1, unlockedPostcards: {
    "routine-sparkle": { unlockedAt: "2026-07-13T00:00:00.000Z" },
    "health-heart": { unlockedAt: "2026-07-17T00:00:00.000Z" }
  } } }
);
assert.deepEqual(Object.keys(merged.gamification.unlockedPostcards).sort(), ["health-heart", "routine-sparkle", "training-paw"]);
assert.equal(merged.gamification.unlockedPostcards["routine-sparkle"].unlockedAt, "2026-07-13T00:00:00.000Z");

assert.equal(gamification.previousBestScore(state.training.commandLogs, "sit"), 4);
assert.equal(gamification.previousBestScore(state.training.commandLogs, "sit", "train-1"), null);

const root = path.join(__dirname, "..");
const actions = fs.readFileSync(path.join(root, "src/features/actions.js"), "utf8");
const appetite = fs.readFileSync(path.join(root, "src/features/appetite.js"), "utf8");
const routineState = fs.readFileSync(path.join(root, "src/features/routine-state.js"), "utf8");
const pages = fs.readFileSync(path.join(root, "src/features/pages.js"), "utf8");
const gamificationFeature = fs.readFileSync(path.join(root, "src/features/gamification.js"), "utf8");
const components = fs.readFileSync(path.join(root, "src/styles/components.css"), "utf8");
assert.match(actions, /celebrateCareSave\("diary", \{ taskTitle: gamificationText\("taskDiary"\) \}\)/);
assert.match(actions, /celebrateCareSave\("training", \{ personalBest, commandTitle, taskTitle: commandTitle \}\)/);
assert.match(actions, /celebrateCareSave\("play", \{ taskTitle: activityTitle \}\)/);
assert.match(appetite, /celebrateCareSave\("health", \{ source: "appetite", taskTitle: gamificationText\("taskAppetite"\) \}\)/);
assert.match(routineState, /dataset\.gamificationNewEntry === "true"/);
assert.match(routineState, /celebrateCareSave\("health", \{ source: "weight", taskTitle: gamificationText\("taskWeight"\) \}\)/);
assert.match(routineState, /celebrateCareSave\("routine", \{ taskId: task\.id, taskTitle: tr\(task\.title\) \}\)/);
assert.match(gamificationFeature, /iconImage: family\?\.image \|\| NAKO_LOGO_SRC/);
assert.match(gamificationFeature, /data-gamification-toast-image/);
assert.doesNotMatch(gamificationFeature, /cardImage:/, "A postcard unlock must not replace the task-family sticker");
assert.match(gamificationFeature, /gamification-toast-task/);
[
  "sparkle", "bubbles", "cozy", "bounce", "heartbeat", "sway",
  "shine", "breathe", "pop", "tilt", "hop", "page"
].forEach((motion) => assert.match(components, new RegExp(`motion-${motion}`), `${motion} toast motion must be styled`));
assert.match(components, /prefers-reduced-motion: reduce/);
assert.match(components, /\.gamification-toast-art::after/);
assert.ok(
  pages.indexOf("renderGamificationHome()") > pages.indexOf("renderAdditionalResources()"),
  "The weekly care recap should stay below task-focused home content"
);
assert.ok(
  pages.indexOf("renderGamificationAlbumHome()") > pages.indexOf("renderAdditionalResources()"),
  "The postcard album should stay below task-focused home content"
);

console.log("Gamification derivation, unlock persistence, and save-trigger contracts passed.");
