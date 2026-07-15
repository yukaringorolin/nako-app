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
      .filter((item) => !item.deleted && item.commandId === commandId)
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
    const result = tombstoneLog(training?.commandLogs, logId, options?.nowIso);
    if (!result.deleted) return result;

    refreshCommandFromLogs({ ...options, commandId: result.log.commandId });
    return { ...result, commandId: result.log.commandId };
  }

  function deletePlayLog(options) {
    const { training, logId, nowIso } = options || {};
    return tombstoneLog(training?.playLogs, logId, nowIso);
  }

  function tombstoneLog(logs, logId, nowIso) {
    if (!Array.isArray(logs)) return { deleted: false };
    const index = logs.findIndex((item) => item.id === logId);
    if (index < 0) return { deleted: false };

    const deletedAt = typeof nowIso === "function" ? nowIso() : new Date().toISOString();
    const deletedLog = { ...logs[index], deleted: true, deletedAt, updatedAt: deletedAt };
    logs[index] = deletedLog;
    return { deleted: true, log: deletedLog };
  }

  return { deleteCommandLog, deletePlayLog, refreshCommandFromLogs };
});
