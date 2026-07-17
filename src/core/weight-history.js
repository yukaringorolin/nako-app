(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoWeightHistory = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const PERMANENT_ENTRY_UPDATED_AT = "2026-07-17T00:00:00.000+08:00";
  const PERMANENT_ENTRIES = Object.freeze([
    Object.freeze({ dateKey: "2026-04-02", weightKg: 1.47 }),
    Object.freeze({ dateKey: "2026-04-20", weightKg: 1.70 }),
    Object.freeze({ dateKey: "2026-04-25", weightKg: 1.90 }),
    Object.freeze({ dateKey: "2026-05-21", weightKg: 2.30 }),
    Object.freeze({ dateKey: "2026-05-24", weightKg: 2.40 }),
    Object.freeze({ dateKey: "2026-06-01", weightKg: 2.50 })
  ]);
  const permanentDates = new Set(PERMANENT_ENTRIES.map((entry) => entry.dateKey));

  function isPermanentDate(dateKey) {
    return permanentDates.has(String(dateKey || ""));
  }

  function applyToState(value = {}) {
    const state = value && typeof value === "object" ? value : {};
    const tracking = state.weightTracking && typeof state.weightTracking === "object"
      ? state.weightTracking
      : {};
    state.weightTracking = tracking;

    PERMANENT_ENTRIES.forEach((entry) => {
      tracking[entry.dateKey] = {
        value: entry.weightKg,
        updatedAt: PERMANENT_ENTRY_UPDATED_AT,
        permanent: true
      };
    });

    return state;
  }

  return {
    PERMANENT_ENTRIES,
    PERMANENT_ENTRY_UPDATED_AT,
    applyToState,
    isPermanentDate
  };
});
