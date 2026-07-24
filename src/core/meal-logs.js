(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoMealLogs = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const EDWIN_MEAL_LOGS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSnvmzdu7XnBPyAwe0q4T5F-r0hQ-AI6GP5xn4PJTSj6DRsiCaoe145pmbpnY6RE__K7WWJYRJVUaLD/pub?gid=1607242026&single=true&output=csv";
  const EDWIN_MEAL_LOGS_CACHE_KEY = "nako-edwin-meal-logs-cache-v1";
  const EXPECTED_COLUMNS = Object.freeze(["Date", "Calories", "Protein", "Carbs", "Fat"]);

  function parseCsvRows(csvText) {
    const text = String(csvText || "").replace(/^\uFEFF/, "");
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];
      if (quoted) {
        if (character === '"' && text[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else if (character === '"') {
          quoted = false;
        } else {
          cell += character;
        }
      } else if (character === '"') {
        quoted = true;
      } else if (character === ",") {
        row.push(cell);
        cell = "";
      } else if (character === "\r" || character === "\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
        if (character === "\r" && text[index + 1] === "\n") index += 1;
      } else {
        cell += character;
      }
    }

    if (cell || row.length) {
      row.push(cell);
      rows.push(row);
    }
    return rows;
  }

  function validDateKey(year, month, day) {
    const date = new Date(Date.UTC(year, month - 1, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) return "";
    return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function normalizeDate(value, ambiguousOrder = "day-first") {
    const text = String(value || "").trim();
    const isoMatch = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s].*)?$/);
    if (isoMatch) return validDateKey(Number(isoMatch[1]), Number(isoMatch[2]), Number(isoMatch[3]));

    const numericMatch = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (numericMatch) {
      const first = Number(numericMatch[1]);
      const second = Number(numericMatch[2]);
      const year = Number(numericMatch[3]);
      let month;
      let day;
      if (first > 12) {
        day = first;
        month = second;
      } else if (second > 12) {
        month = first;
        day = second;
      } else if (ambiguousOrder === "month-first") {
        month = first;
        day = second;
      } else {
        day = first;
        month = second;
      }
      return validDateKey(year, month, day);
    }

    const parsed = new Date(text);
    if (Number.isNaN(parsed.getTime())) return "";
    return validDateKey(parsed.getUTCFullYear(), parsed.getUTCMonth() + 1, parsed.getUTCDate());
  }

  function normalizeNumber(value) {
    const text = String(value ?? "").trim().replaceAll(",", "");
    if (!text) return NaN;
    const number = Number(text);
    return Number.isFinite(number) ? number : NaN;
  }

  function parseMealLogsCsv(csvText) {
    const rows = parseCsvRows(csvText);
    if (!rows.length) throw new Error("Meal log CSV is empty.");

    const headers = rows[0].map((header) => String(header || "").trim().toLowerCase());
    const columns = Object.fromEntries(EXPECTED_COLUMNS.map((column) => [
      column,
      headers.indexOf(column.toLowerCase())
    ]));
    if (EXPECTED_COLUMNS.some((column) => columns[column] < 0)) {
      throw new Error("Meal log CSV columns do not match.");
    }

    const numericDateSignals = rows.slice(1).reduce((signals, row) => {
      const match = String(row[columns.Date] || "").trim().match(/^(\d{1,2})[/-](\d{1,2})[/-]\d{4}$/);
      if (!match) return signals;
      if (Number(match[1]) > 12) signals.add("day-first");
      if (Number(match[2]) > 12) signals.add("month-first");
      return signals;
    }, new Set());
    const ambiguousDateOrder = numericDateSignals.has("month-first") && !numericDateSignals.has("day-first")
      ? "month-first"
      : "day-first";

    const entriesByDate = new Map();
    let populatedRows = 0;
    rows.slice(1).forEach((row) => {
      if (!row.some((value) => String(value || "").trim())) return;
      populatedRows += 1;
      const entry = {
        dateKey: normalizeDate(row[columns.Date], ambiguousDateOrder),
        calories: normalizeNumber(row[columns.Calories]),
        protein: normalizeNumber(row[columns.Protein]),
        carbs: normalizeNumber(row[columns.Carbs]),
        fat: normalizeNumber(row[columns.Fat])
      };
      if (!entry.dateKey || ["calories", "protein", "carbs", "fat"].some((key) => !Number.isFinite(entry[key]))) return;
      entriesByDate.set(entry.dateKey, entry);
    });

    if (populatedRows && !entriesByDate.size) throw new Error("Meal log CSV has no valid daily totals.");
    return [...entriesByDate.values()].sort((first, second) => second.dateKey.localeCompare(first.dateKey));
  }

  function normalizeCachedEntries(entries) {
    if (!Array.isArray(entries)) return [];
    return entries.filter((entry) => (
      entry &&
      /^\d{4}-\d{2}-\d{2}$/.test(entry.dateKey) &&
      ["calories", "protein", "carbs", "fat"].every((key) => Number.isFinite(entry[key]))
    )).sort((first, second) => second.dateKey.localeCompare(first.dateKey));
  }

  function loadCache(storage) {
    try {
      const cached = JSON.parse(storage?.getItem(EDWIN_MEAL_LOGS_CACHE_KEY) || "null");
      if (!cached || cached.version !== 1) return { entries: [], refreshedAt: "" };
      return {
        entries: normalizeCachedEntries(cached.entries),
        refreshedAt: Number.isNaN(Date.parse(cached.refreshedAt)) ? "" : cached.refreshedAt
      };
    } catch {
      return { entries: [], refreshedAt: "" };
    }
  }

  function saveCache(storage, entries, refreshedAt) {
    if (!storage?.setItem) return false;
    try {
      const result = storage.setItem(EDWIN_MEAL_LOGS_CACHE_KEY, JSON.stringify({
        version: 1,
        entries: normalizeCachedEntries(entries),
        refreshedAt
      }));
      return result !== false;
    } catch {
      return false;
    }
  }

  function formatDateKey(dateKey, locale, dateStyle = "long") {
    const match = String(dateKey || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return dateKey || "";
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12));
    return new Intl.DateTimeFormat(locale || "en-SG", {
      dateStyle,
      timeZone: "Asia/Singapore"
    }).format(date);
  }

  function formatSingaporeDateTime(value, locale) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(locale || "en-SG", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Singapore"
    }).format(date);
  }

  return {
    EDWIN_MEAL_LOGS_CSV_URL,
    EDWIN_MEAL_LOGS_CACHE_KEY,
    EXPECTED_COLUMNS,
    parseCsvRows,
    parseMealLogsCsv,
    loadCache,
    saveCache,
    formatDateKey,
    formatSingaporeDateTime
  };
});
