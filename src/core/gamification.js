(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoGamification = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const VERSION = 1;
  const CATEGORY_ORDER = Object.freeze(["routines", "trainingPlay", "health", "diary"]);
  const POSTCARD_ORDER = Object.freeze([
    "nako-hello",
    "routine-sparkle",
    "training-paw",
    "purple-playtime",
    "health-heart",
    "diary-flower",
    "four-care-paws",
    "cozy-three",
    "sunny-seven",
    "rain-or-shine",
    "thank-you-stars",
    "happy-home"
  ]);
  const DAY_MS = 86400000;

  function validDateKey(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
    if (!match) return "";
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
    return date.getUTCFullYear() === Number(match[1])
      && date.getUTCMonth() === Number(match[2]) - 1
      && date.getUTCDate() === Number(match[3])
      ? String(value)
      : "";
  }

  function dateKeyFromDate(value = new Date()) {
    if (validDateKey(value)) return String(value);
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
  }

  function addDays(dateKey, days) {
    const valid = validDateKey(dateKey);
    if (!valid) return "";
    const date = new Date(`${valid}T00:00:00.000Z`);
    const next = new Date(date.getTime() + Number(days) * DAY_MS);
    return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-${String(next.getUTCDate()).padStart(2, "0")}`;
  }

  function mondayFor(dateKey) {
    const valid = validDateKey(dateKey);
    if (!valid) return "";
    const weekday = new Date(`${valid}T00:00:00.000Z`).getUTCDay();
    return addDays(valid, -(weekday === 0 ? 6 : weekday - 1));
  }

  function timestampFor(value, dateKey) {
    const timestamp = Date.parse(value || "");
    if (Number.isFinite(timestamp)) return new Date(timestamp).toISOString();
    const fallback = Date.parse(`${dateKey}T00:00:00+08:00`);
    return Number.isFinite(fallback) ? new Date(fallback).toISOString() : new Date(0).toISOString();
  }

  function event(category, subtype, id, dateKey, timestamp) {
    const valid = validDateKey(dateKey);
    if (!valid) return null;
    return { category, subtype, id: String(id || `${subtype}-${valid}`), dateKey: valid, timestamp: timestampFor(timestamp, valid) };
  }

  function collectActivities(state = {}) {
    const activities = [];
    Object.values(state.routineCompletions || {}).forEach((record) => {
      if (!record || record.deleted || record.missed || record.source === "metric" || record.taskId === "nako-weight-tracking") return;
      const item = event("routines", "routine", record.id, record.completedDate, record.completedAt || record.updatedAt);
      if (item) activities.push(item);
    });

    const training = state.training || {};
    (training.commandLogs || []).forEach((record) => {
      if (!record || record.deleted) return;
      const item = event("trainingPlay", "training", record.id, dateKeyFromDate(record.createdAt), record.createdAt);
      if (item) activities.push(item);
    });
    (training.playLogs || []).forEach((record) => {
      if (!record || record.deleted) return;
      const item = event("trainingPlay", "play", record.id, dateKeyFromDate(record.createdAt), record.createdAt);
      if (item) activities.push(item);
    });

    Object.entries(state.appetiteTracking || {}).forEach(([dateKey, record]) => {
      const raw = record && typeof record === "object" ? record.percentage : record;
      if (raw === "" || raw === null || raw === undefined || !Number.isFinite(Number(raw))) return;
      const item = event("health", "appetite", `appetite-${dateKey}`, dateKey, record?.updatedAt);
      if (item) activities.push(item);
    });

    Object.entries(state.weightTracking || {}).forEach(([dateKey, record]) => {
      const raw = record && typeof record === "object" ? record.value : record;
      if (raw === "" || !Number.isFinite(Number(raw)) || Number(raw) <= 0) return;
      const item = event("health", "weight", `weight-${dateKey}`, dateKey, record?.updatedAt);
      if (item) activities.push(item);
    });

    Object.entries(state.diary?.entries || {}).forEach(([dateKey, record]) => {
      if (!record || record.deleted || !record.submittedAt) return;
      const item = event("diary", "diary", `diary-${dateKey}`, record.dateKey || dateKey, record.submittedAt);
      if (item) activities.push(item);
    });

    return activities.sort((first, second) => first.dateKey.localeCompare(second.dateKey)
      || first.timestamp.localeCompare(second.timestamp)
      || first.id.localeCompare(second.id));
  }

  function firstOfSubtype(activities, subtype) {
    return activities.find((item) => item.subtype === subtype) || null;
  }

  function thresholdEligibility(distinctDates, count) {
    const dateKey = distinctDates[count - 1];
    return dateKey ? timestampFor("", dateKey) : "";
  }

  function fourCategoryEligibility(activities) {
    const weeks = new Map();
    activities.forEach((item) => {
      const week = mondayFor(item.dateKey);
      const group = weeks.get(week) || { categories: new Set(), timestamps: [] };
      group.categories.add(item.category);
      group.timestamps.push(item.timestamp);
      weeks.set(week, group);
    });
    for (const week of [...weeks.keys()].sort()) {
      const group = weeks.get(week);
      if (CATEGORY_ORDER.every((category) => group.categories.has(category))) {
        return [...group.timestamps].sort().at(-1) || timestampFor("", week);
      }
    }
    return "";
  }

  function deriveEligiblePostcards(state = {}, now = new Date()) {
    const activities = collectActivities(state);
    const distinctDates = [...new Set(activities.map((item) => item.dateKey))].sort();
    const firstRoutine = firstOfSubtype(activities, "routine");
    const firstTraining = firstOfSubtype(activities, "training");
    const firstPlay = firstOfSubtype(activities, "play");
    const firstHealth = activities.find((item) => item.category === "health") || null;
    const firstDiary = firstOfSubtype(activities, "diary");
    const eligibleAt = {
      "nako-hello": timestampFor(now, dateKeyFromDate(now)),
      "routine-sparkle": firstRoutine?.timestamp || "",
      "training-paw": firstTraining?.timestamp || "",
      "purple-playtime": firstPlay?.timestamp || "",
      "health-heart": firstHealth?.timestamp || "",
      "diary-flower": firstDiary?.timestamp || "",
      "four-care-paws": fourCategoryEligibility(activities),
      "cozy-three": thresholdEligibility(distinctDates, 3),
      "sunny-seven": thresholdEligibility(distinctDates, 7),
      "rain-or-shine": thresholdEligibility(distinctDates, 14),
      "thank-you-stars": thresholdEligibility(distinctDates, 30),
      "happy-home": thresholdEligibility(distinctDates, 60)
    };
    return POSTCARD_ORDER.filter((id) => eligibleAt[id]).map((id) => ({ id, eligibleAt: eligibleAt[id] }));
  }

  function deriveWeeklySummary(state = {}, now = new Date()) {
    const today = dateKeyFromDate(now);
    const start = mondayFor(today);
    const end = addDays(start, 6);
    const activities = collectActivities(state).filter((item) => item.dateKey >= start && item.dateKey <= end);
    const counts = Object.fromEntries(CATEGORY_ORDER.map((category) => [category, 0]));
    activities.forEach((item) => { counts[item.category] += 1; });
    const activeCategories = CATEGORY_ORDER.filter((category) => counts[category] > 0);
    return { start, end, counts, activeCategories, total: activities.length, activities };
  }

  function syncUnlocks(state = {}, now = new Date()) {
    const gamification = state.gamification && typeof state.gamification === "object" ? state.gamification : {};
    const unlockedPostcards = gamification.unlockedPostcards && typeof gamification.unlockedPostcards === "object"
      ? gamification.unlockedPostcards
      : {};
    let changed = state.gamification !== gamification || gamification.version !== VERSION || gamification.unlockedPostcards !== unlockedPostcards;
    const newlyUnlocked = [];
    deriveEligiblePostcards(state, now).forEach(({ id, eligibleAt }) => {
      const current = unlockedPostcards[id];
      if (!current) {
        unlockedPostcards[id] = { unlockedAt: eligibleAt };
        newlyUnlocked.push(id);
        changed = true;
        return;
      }
      if (!current.unlockedAt || eligibleAt < current.unlockedAt) {
        unlockedPostcards[id] = { ...current, unlockedAt: eligibleAt };
        changed = true;
      }
    });
    state.gamification = { ...gamification, version: VERSION, unlockedPostcards };
    return { changed, newlyUnlocked, unlockedPostcards };
  }

  function earliestTimestamp(first, second) {
    if (!first) return second || "";
    if (!second) return first;
    return first <= second ? first : second;
  }

  function mergeGamificationState(remoteState = {}, localState = {}) {
    const remote = remoteState && typeof remoteState === "object" ? remoteState : {};
    const local = localState && typeof localState === "object" ? localState : {};
    const unlockedPostcards = {};
    const ids = new Set([
      ...Object.keys(remote.unlockedPostcards || {}),
      ...Object.keys(local.unlockedPostcards || {})
    ]);
    ids.forEach((id) => {
      const remoteRecord = remote.unlockedPostcards?.[id];
      const localRecord = local.unlockedPostcards?.[id];
      const unlockedAt = earliestTimestamp(remoteRecord?.unlockedAt, localRecord?.unlockedAt);
      unlockedPostcards[id] = { ...(remoteRecord || {}), ...(localRecord || {}), unlockedAt };
    });
    return {
      ...remote,
      ...local,
      version: Math.max(Number(remote.version) || 0, Number(local.version) || 0, VERSION),
      unlockedPostcards
    };
  }

  function previousBestScore(logs = [], commandId, excludedId = "") {
    const scores = logs
      .filter((item) => item && !item.deleted && item.commandId === commandId && item.id !== excludedId)
      .map((item) => Number(item.score))
      .filter(Number.isFinite);
    return scores.length ? Math.max(...scores) : null;
  }

  return {
    CATEGORY_ORDER,
    POSTCARD_ORDER,
    VERSION,
    collectActivities,
    dateKeyFromDate,
    deriveEligiblePostcards,
    deriveWeeklySummary,
    mergeGamificationState,
    mondayFor,
    previousBestScore,
    syncUnlocks
  };
});
