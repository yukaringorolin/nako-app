(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoNavigation = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function backOrFallback(historyApi, fallback) {
    if (Number(historyApi?.length) > 1 && typeof historyApi?.back === "function") {
      historyApi.back();
      return true;
    }
    fallback?.();
    return false;
  }

  return { backOrFallback };
});
