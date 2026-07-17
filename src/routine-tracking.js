(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoRoutineTracking = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const TIME_ZONE = "Asia/Singapore";
  const FORTNIGHT_ANCHOR = "2026-07-06";
  const DAY_MS = 86400000;

  function dateKeyFromParts(year, month, day) {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function parseDateKey(dateKey) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateKey || ""));
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
    return { year, month, day, date };
  }

  function singaporeDateKey(value = new Date()) {
    if (typeof value === "string" && parseDateKey(value)) return value;
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return dateKeyFromParts(values.year, values.month, values.day);
  }

  function addDays(dateKey, days) {
    const parsed = parseDateKey(dateKey);
    if (!parsed) return "";
    const date = new Date(parsed.date.getTime() + Number(days) * DAY_MS);
    return dateKeyFromParts(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
  }

  function daysBetween(fromKey, toKey) {
    const from = parseDateKey(fromKey);
    const to = parseDateKey(toKey);
    if (!from || !to) return NaN;
    return Math.floor((to.date.getTime() - from.date.getTime()) / DAY_MS);
  }

  function mondayFor(dateKey) {
    const parsed = parseDateKey(dateKey);
    if (!parsed) return "";
    const weekday = parsed.date.getUTCDay();
    return addDays(dateKey, -(weekday === 0 ? 6 : weekday - 1));
  }

  function cycleForDate(cadence, dateKey, anchor = FORTNIGHT_ANCHOR) {
    const parsed = parseDateKey(dateKey);
    if (!parsed) return null;
    if (cadence === "daily") {
      return { key: `daily_${dateKey}`, start: dateKey, end: dateKey };
    }
    if (cadence === "weekly") {
      const start = mondayFor(dateKey);
      return { key: `weekly_${start}`, start, end: addDays(start, 6) };
    }
    if (cadence === "fortnightly") {
      const offset = daysBetween(anchor, dateKey);
      const period = Math.floor(offset / 14);
      const start = addDays(anchor, period * 14);
      return { key: `fortnightly_${start}`, start, end: addDays(start, 13) };
    }
    if (cadence === "monthly") {
      const start = dateKeyFromParts(parsed.year, parsed.month, 1);
      const endDate = new Date(Date.UTC(parsed.year, parsed.month, 0));
      const end = dateKeyFromParts(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, endDate.getUTCDate());
      return { key: `monthly_${String(parsed.year).padStart(4, "0")}-${String(parsed.month).padStart(2, "0")}`, start, end };
    }
    if (cadence === "quarterly") {
      const quarter = Math.floor((parsed.month - 1) / 3) + 1;
      const startMonth = (quarter - 1) * 3 + 1;
      const endDate = new Date(Date.UTC(parsed.year, startMonth + 2, 0));
      return {
        key: `quarterly_${parsed.year}-Q${quarter}`,
        start: dateKeyFromParts(parsed.year, startMonth, 1),
        end: dateKeyFromParts(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, endDate.getUTCDate())
      };
    }
    if (cadence === "one-off") return { key: "one-off_lifetime", start: "", end: "" };
    return null;
  }

  function completionId(taskId, cycleKey) {
    return `${taskId}_${cycleKey}`;
  }

  function weekday(dateKey, locale = "en-SG", width = "long") {
    const parsed = parseDateKey(dateKey);
    if (!parsed) return "";
    return new Intl.DateTimeFormat(locale, { weekday: width, timeZone: "UTC" }).format(parsed.date);
  }

  function formatDate(dateKey, locale = "en-SG", options = {}) {
    const parsed = parseDateKey(dateKey);
    if (!parsed) return "";
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
      ...options
    }).format(parsed.date);
  }

  function normalizeRecords(records) {
    return Object.fromEntries(Object.entries(records || {}).filter(([id, record]) => id && record && typeof record === "object"));
  }

  return {
    TIME_ZONE,
    FORTNIGHT_ANCHOR,
    addDays,
    completionId,
    cycleForDate,
    daysBetween,
    formatDate,
    mondayFor,
    normalizeRecords,
    parseDateKey,
    singaporeDateKey,
    weekday
  };
});
