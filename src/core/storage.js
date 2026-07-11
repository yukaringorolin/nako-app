(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoStorage = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function createSafeStorage(storage) {
    return {
      getItem(key) {
        try { return storage?.getItem(key) ?? null; } catch { return null; }
      },
      setItem(key, value) {
        try { storage?.setItem(key, value); return true; } catch { return false; }
      },
      removeItem(key) {
        try { storage?.removeItem(key); return true; } catch { return false; }
      }
    };
  }

  function loadJson(storage, key, fallback = {}) {
    try { return JSON.parse(storage.getItem(key)) || fallback; } catch { return fallback; }
  }

  return { createSafeStorage, loadJson };
});
