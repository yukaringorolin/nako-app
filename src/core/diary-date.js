(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoDiaryDate = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function diaryDay(routineTracking, entries = {}, now = new Date()) {
    const dateKey = routineTracking?.singaporeDateKey?.(now) || "";
    return { dateKey, entry: entries?.[dateKey] || null };
  }

  return { diaryDay };
});
