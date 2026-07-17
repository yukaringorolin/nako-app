(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoAppetiteTracking = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const PERCENTAGES = Object.freeze([0, 25, 50, 75, 100]);

  function validPercentage(value) {
    if (value === "" || value === null || value === undefined || typeof value === "boolean") return null;
    const percentage = Number(value);
    return PERCENTAGES.includes(percentage) ? percentage : null;
  }

  function normalizeEntry(value, dateKey = "") {
    if (!value || typeof value !== "object") return null;
    const percentage = validPercentage(value.percentage);
    if (percentage === null) return null;
    return {
      dateKey: String(value.dateKey || dateKey),
      percentage,
      note: String(value.note || ""),
      updatedAt: String(value.updatedAt || "")
    };
  }

  function upsertEntry(entries, dateKey, values = {}, updatedAt = "") {
    if (!entries || typeof entries !== "object" || !/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey))) return null;
    const current = normalizeEntry(entries[dateKey], dateKey);
    const percentage = Object.prototype.hasOwnProperty.call(values, "percentage")
      ? validPercentage(values.percentage)
      : current?.percentage ?? null;
    if (percentage === null) return null;
    const entry = {
      dateKey,
      percentage,
      note: Object.prototype.hasOwnProperty.call(values, "note") ? String(values.note || "") : String(current?.note || ""),
      updatedAt: String(updatedAt || values.updatedAt || current?.updatedAt || "")
    };
    entries[dateKey] = entry;
    return entry;
  }

  function addDays(dateKey, amount) {
    const date = new Date(`${dateKey}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return "";
    date.setUTCDate(date.getUTCDate() + Number(amount || 0));
    return date.toISOString().slice(0, 10);
  }

  function recentEntries(entries, todayKey, days = 30, shiftDate = addDays) {
    const windowDays = Math.max(1, Math.floor(Number(days) || 30));
    const startKey = shiftDate(todayKey, -(windowDays - 1));
    return Object.entries(entries || {})
      .map(([dateKey, value]) => normalizeEntry(value, dateKey))
      .filter((entry) => entry && entry.dateKey >= startKey && entry.dateKey <= todayKey)
      .sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  }

  return { PERCENTAGES, normalizeEntry, recentEntries, upsertEntry, validPercentage };
});
