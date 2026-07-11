(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoTrainingLogState = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function refreshCommandFromLogs({
    training,
    commandId,
    commands,
    baselineCommandState,
    nowIso
  }) {
    if (!training || !commandId || typeof baselineCommandState !== "function") return false;
    const command = (commands || []).find((item) => item.id === commandId);
    if (!command) return false;

    training.commands ||= {};
    training.commandLogs ||= [];
    const latest = training.commandLogs
      .filter((item) => item.commandId === commandId)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))[0];

    const state = training.commands[commandId] ||= baselineCommandState(command);
    if (!latest) {
      Object.assign(state, baselineCommandState(command));
      return true;
    }

    Object.assign(state, {
      score: latest.score,
      rewardReliance: latest.rewardReliance,
      bestEnvironment: latest.environment,
      successes: latest.successes,
      attempts: latest.attempts,
      latestComment: latest.comment,
      lastPracticedAt: latest.createdAt,
      updatedAt: typeof nowIso === "function" ? nowIso() : new Date().toISOString()
    });
    return true;
  }

  function deleteCommandLog(options) {
    const { training, logId } = options || {};
    if (!training || !Array.isArray(training.commandLogs)) return { deleted: false };

    const index = training.commandLogs.findIndex((item) => item.id === logId);
    if (index < 0) return { deleted: false };

    const [deletedLog] = training.commandLogs.splice(index, 1);
    refreshCommandFromLogs({ ...options, commandId: deletedLog.commandId });
    return { deleted: true, commandId: deletedLog.commandId, log: deletedLog };
  }

  return { deleteCommandLog, refreshCommandFromLogs };
});
