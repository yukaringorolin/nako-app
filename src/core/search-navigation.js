(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoSearchNavigation = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function navigateToDestination(route, destination, dependencies = {}) {
    dependencies.setPendingDestination?.(destination);
    dependencies.navigate?.(route);
  }

  function takePendingDestination(destination, clearPendingDestination) {
    if (!destination) return null;
    clearPendingDestination?.();
    return destination;
  }

  return { navigateToDestination, takePendingDestination };
});
