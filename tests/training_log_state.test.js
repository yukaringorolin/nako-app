const assert = require("node:assert/strict");
const { deleteCommandLog } = require("../src/core/training-log-state.js");

const commands = [
  { id: "sit", initialScore: 2 },
  { id: "stay", initialScore: 4 }
];

function baseline(command) {
  return {
    score: command.initialScore,
    rewardReliance: 6,
    bestEnvironment: 6,
    successes: null,
    attempts: null,
    latestComment: "baseline",
    lastPracticedAt: null,
    updatedAt: "baseline-time"
  };
}

function log(id, commandId, score, createdAt) {
  return {
    id,
    commandId,
    score,
    rewardReliance: score,
    environment: score + 1,
    successes: score,
    attempts: 5,
    comment: `${id}-comment`,
    createdAt
  };
}

function options(training, logId) {
  return {
    training,
    logId,
    commands,
    baselineCommandState: baseline,
    nowIso: () => "refresh-time"
  };
}

{
  const older = log("sit-old", "sit", 5, "2026-07-10T10:00:00+08:00");
  const latest = log("sit-new", "sit", 9, "2026-07-11T10:00:00+08:00");
  const stay = log("stay-log", "stay", 8, "2026-07-11T11:00:00+08:00");
  const stayState = { score: 8, latestComment: "unchanged" };
  const training = {
    commands: { sit: { score: 9 }, stay: stayState },
    commandLogs: [older, latest, stay]
  };

  const result = deleteCommandLog(options(training, "sit-new"));
  assert.equal(result.deleted, true);
  assert.equal(result.commandId, "sit");
  assert.deepEqual(training.commandLogs, [older, stay]);
  assert.deepEqual(training.commands.sit, {
    score: 5,
    rewardReliance: 5,
    bestEnvironment: 6,
    successes: 5,
    attempts: 5,
    latestComment: "sit-old-comment",
    lastPracticedAt: older.createdAt,
    updatedAt: "refresh-time"
  });
  assert.strictEqual(training.commands.stay, stayState);
  assert.deepEqual(training.commands.stay, { score: 8, latestComment: "unchanged" });
}

{
  const only = log("only", "sit", 10, "2026-07-11T10:00:00+08:00");
  const training = { commands: { sit: { score: 10 } }, commandLogs: [only] };
  assert.equal(deleteCommandLog(options(training, "only")).deleted, true);
  assert.deepEqual(training.commands.sit, baseline(commands[0]));
  assert.equal(Object.hasOwn(training.commands, "undefined"), false);
}

{
  const existing = log("existing", "stay", 7, "2026-07-11T10:00:00+08:00");
  const training = { commands: { stay: { score: 7 } }, commandLogs: [existing] };
  const before = JSON.stringify(training);
  assert.doesNotThrow(() => deleteCommandLog(options(training, "missing")));
  assert.equal(deleteCommandLog(options(training, "missing")).deleted, false);
  assert.equal(JSON.stringify(training), before);
  assert.equal(Object.hasOwn(training.commands, "undefined"), false);
}

console.log("Training command-log deletion checks passed.");
