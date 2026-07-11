const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const priorityLogic = require("../src/core/training-priority.js");

const root = path.join(__dirname, "..");
const context = { window: {}, console };
vm.runInNewContext(fs.readFileSync(path.join(root, "src/data.js"), "utf8"), context);
const training = context.window.nakoData.trainingData;
const languages = ["en", "jp", "mm"];

for (const command of training.commands) {
  assert.ok(["critical", "high", "useful"].includes(command.priorityId), `${command.id} needs a stable priorityId`);
  for (const language of languages) assert.ok(command.priority[language]);
}

const criticalIds = priorityLogic.filterByPriority(training.commands, "critical").map((command) => command.id).sort();
assert.ok(criticalIds.length > 0);
for (const language of languages) {
  const visibleIds = training.commands.filter((command) => command.priorityId === "critical" && command.priority[language]).map((command) => command.id).sort();
  assert.deepEqual(visibleIds, criticalIds, `critical filter changed in ${language}`);
}

let selectedPriority = "critical";
for (const language of languages) {
  assert.equal(selectedPriority, "critical", `language ${language} must not change filter state`);
  assert.deepEqual(priorityLogic.filterByPriority(training.commands, selectedPriority).map((command) => command.id).sort(), criticalIds);
}

const critical = training.commands.find((command) => command.priorityId === "critical");
const state = { score: 3, rewardReliance: 6, lastPracticedAt: "2026-07-11T00:00:00.000Z" };
const now = Date.parse("2026-07-12T00:00:00.000Z");
const needsResults = languages.map(() => priorityLogic.needsPractice(critical, state, now));
const rankResults = languages.map(() => priorityLogic.practiceRank(critical, state, now));
assert.deepEqual(needsResults, [true, true, true]);
assert.equal(new Set(rankResults).size, 1);
assert.notEqual(critical.priority.en, critical.priority.jp);
assert.notEqual(critical.priority.en, critical.priority.mm);

assert.ok(training.scoringGuide.length >= 7);
assert.ok(training.commandMeanings.length >= 10);
for (const row of training.scoringGuide) {
  for (const language of languages) assert.ok(row.description[language]);
  assert.notEqual(row.description.en, row.description.jp);
  assert.notEqual(row.description.en, row.description.mm);
}
for (const item of training.commandMeanings) {
  for (const language of languages) {
    assert.ok(item.name[language]);
    assert.ok(item.description[language]);
  }
  assert.notEqual(item.description.en, item.description.jp);
  assert.notEqual(item.description.en, item.description.mm);
}
for (const language of languages) assert.ok(training.scoringExplanation[language]);
assert.notEqual(training.scoringExplanation.en, training.scoringExplanation.jp);
assert.notEqual(training.scoringExplanation.en, training.scoringExplanation.mm);

const trainingFeature = fs.readFileSync(path.join(root, "src/features/training.js"), "utf8");
assert.doesNotMatch(trainingFeature, /tr\(command\.priority\)\s*===\s*["']Critical["']/);
assert.doesNotMatch(trainingFeature, /Not introduced\.|Bottom down, front body upright\.|A high score means food need not be visible/);

console.log("Stable training priorities and translated reference checks passed.");
