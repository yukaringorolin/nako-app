(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoDates = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const WEIGHT_TRACKING_START = "2026-07-12";

  function dateToKey(date) {
    const value = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(value.getTime())) return "";
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function weightTrackingStartDate() {
    const [year, month, day] = WEIGHT_TRACKING_START.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function sundaysForYear(year) {
    const start = weightTrackingStartDate();
    const dates = [];
    const current = new Date(Number(year), 0, 1);
    while (current.getDay() !== 0) current.setDate(current.getDate() + 1);
    while (current.getFullYear() === Number(year)) {
      if (current >= start) dates.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }
    return dates;
  }

  return { WEIGHT_TRACKING_START, dateToKey, weightTrackingStartDate, sundaysForYear };
});
