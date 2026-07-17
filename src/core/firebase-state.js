(function (root, factory) {
  const weightHistory = typeof module === "object" && module.exports
    ? require("./weight-history.js")
    : root?.nakoWeightHistory;
  const gamification = typeof module === "object" && module.exports
    ? require("./gamification.js")
    : root?.nakoGamification;
  const api = factory(weightHistory, gamification);
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoFirebaseState = api;
})(typeof window !== "undefined" ? window : globalThis, function (weightHistory, gamification) {
  "use strict";

  const TRAINING_SETTING_KEYS = Object.freeze(["emergencyCue", "liftCue"]);

  function cloneState(value) {
    try {
      return JSON.parse(JSON.stringify(value || {}));
    } catch {
      return {};
    }
  }

  function projectSharedState(value) {
    const state = cloneState(value);
    delete state.routineCompletions;
    delete state.routineTrackingMigration;
    if (state.training && typeof state.training === "object") {
      state.training = normalizeTrainingState(state.training);
    }
    return state;
  }

  function needsSharedStateCleanup(value) {
    const state = value && typeof value === "object" ? value : {};
    if (Object.prototype.hasOwnProperty.call(state, "routineCompletions")) return true;
    if (Object.prototype.hasOwnProperty.call(state, "routineTrackingMigration")) return true;
    const training = state.training;
    if (!training || typeof training !== "object") return false;
    if (Object.prototype.hasOwnProperty.call(training, "contentMigrations")) return true;
    return TRAINING_SETTING_KEYS.some((key) => typeof training[key] === "string" && !training.settings?.[key]);
  }

  function normalizeTrainingState(value) {
    const training = cloneState(value);
    delete training.contentMigrations;
    const keys = new Set(Object.keys(training.settings || {}));
    TRAINING_SETTING_KEYS.forEach((key) => {
      if (typeof training[key] === "string") keys.add(key);
    });
    const settings = {};
    keys.forEach((key) => {
      const record = normalizeSettingRecord(training.settings?.[key], training[key]);
      if (!record) return;
      settings[key] = record;
      training[key] = record.value;
    });
    if (Object.keys(settings).length) training.settings = settings;
    else delete training.settings;
    return training;
  }

  function normalizeSettingRecord(record, legacyValue) {
    if (record && typeof record === "object" && Object.prototype.hasOwnProperty.call(record, "value")) {
      return { value: String(record.value ?? ""), updatedAt: String(record.updatedAt || "") };
    }
    if (typeof legacyValue === "string") return { value: legacyValue, updatedAt: "" };
    return null;
  }

  function mergeStates(remoteState = {}, localState = {}) {
    const remote = projectSharedState(remoteState);
    const local = projectSharedState(localState);
    const merged = projectSharedState({
      ...remote,
      ...local,
      food: mergeDatedRecords(remote.food, local.food),
      appetiteTracking: mergeDatedRecords(remote.appetiteTracking, local.appetiteTracking),
      weightTracking: mergeDatedRecords(remote.weightTracking, local.weightTracking),
      routineTrackingStartedDate: earliestDate(remote.routineTrackingStartedDate, local.routineTrackingStartedDate),
      diary: mergeDiaryState(remote.diary, local.diary),
      training: mergeTrainingState(remote.training, local.training),
      gamification: gamification?.mergeGamificationState?.(remote.gamification, local.gamification)
        || mergeGamificationState(remote.gamification, local.gamification)
    });
    return weightHistory?.applyToState?.(merged) || merged;
  }

  function earliestDate(first, second) {
    if (!first) return second || "";
    if (!second) return first;
    return first <= second ? first : second;
  }

  function mergeTrainingState(remoteTraining = {}, localTraining = {}) {
    const remote = normalizeTrainingState(remoteTraining || {});
    const local = normalizeTrainingState(localTraining || {});
    const settings = mergeTrainingSettings(remote, local);
    const merged = {
      ...remote,
      ...local,
      commands: mergeDatedRecords(remote.commands, local.commands),
      commandLogs: mergeLogsById(remote.commandLogs, local.commandLogs),
      playLogs: mergeLogsById(remote.playLogs, local.playLogs)
    };
    if (Object.keys(settings).length) {
      merged.settings = settings;
      Object.entries(settings).forEach(([key, record]) => { merged[key] = record.value; });
    } else {
      delete merged.settings;
    }
    delete merged.contentMigrations;
    return merged;
  }

  function mergeTrainingSettings(remoteTraining, localTraining) {
    const keys = new Set([
      ...Object.keys(remoteTraining.settings || {}),
      ...Object.keys(localTraining.settings || {})
    ]);
    TRAINING_SETTING_KEYS.forEach((key) => {
      if (typeof remoteTraining[key] === "string" || typeof localTraining[key] === "string") keys.add(key);
    });
    const settings = {};
    keys.forEach((key) => {
      const remote = normalizeSettingRecord(remoteTraining.settings?.[key], remoteTraining[key]);
      const local = normalizeSettingRecord(localTraining.settings?.[key], localTraining[key]);
      const selected = pickLatestRecord(remote, local, true);
      if (selected) settings[key] = selected;
    });
    return settings;
  }

  function mergeLogsById(remoteLogs = [], localLogs = []) {
    const merged = new Map();
    [...(remoteLogs || []), ...(localLogs || [])].forEach((log) => {
      if (!log || !log.id) return;
      const current = merged.get(log.id);
      if (!current || recordTime(log) > recordTime(current)) merged.set(log.id, log);
    });
    return [...merged.values()];
  }

  function mergeDiaryState(remoteDiary = {}, localDiary = {}) {
    const remote = remoteDiary || {};
    const local = localDiary || {};
    return {
      ...remote,
      ...local,
      entries: mergeDatedRecords(remote.entries, local.entries),
      drafts: mergeDatedRecords(remote.drafts, local.drafts)
    };
  }

  function mergeGamificationState(remoteGamification = {}, localGamification = {}) {
    const remote = remoteGamification || {};
    const local = localGamification || {};
    const unlockedPostcards = {};
    const ids = new Set([
      ...Object.keys(remote.unlockedPostcards || {}),
      ...Object.keys(local.unlockedPostcards || {})
    ]);
    ids.forEach((id) => {
      const remoteRecord = remote.unlockedPostcards?.[id] || {};
      const localRecord = local.unlockedPostcards?.[id] || {};
      unlockedPostcards[id] = {
        ...remoteRecord,
        ...localRecord,
        unlockedAt: earliestDate(remoteRecord.unlockedAt, localRecord.unlockedAt)
      };
    });
    return {
      ...remote,
      ...local,
      version: Math.max(Number(remote.version) || 0, Number(local.version) || 0),
      unlockedPostcards
    };
  }

  function mergeDatedRecords(remoteRecords = {}, localRecords = {}) {
    const merged = { ...(remoteRecords || {}) };
    Object.entries(localRecords || {}).forEach(([key, localValue]) => {
      merged[key] = pickLatestRecord(merged[key], localValue, false);
    });
    return merged;
  }

  function pickLatestRecord(remoteValue, localValue, remoteWinsTie) {
    if (!remoteValue) return localValue || null;
    if (!localValue) return remoteValue;
    const remoteTime = recordTime(remoteValue);
    const localTime = recordTime(localValue);
    if (localTime > remoteTime) return localValue;
    if (localTime < remoteTime) return remoteValue;
    return remoteWinsTie ? remoteValue : localValue;
  }

  function recordTime(record) {
    return Date.parse(record?.updatedAt || record?.submittedAt || record?.createdAt || "") || 0;
  }

  return {
    TRAINING_SETTING_KEYS,
    cloneState,
    mergeDatedRecords,
    mergeStates,
    mergeTrainingState,
    needsSharedStateCleanup,
    projectSharedState
  };
});
