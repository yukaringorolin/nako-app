(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoTextDrafts = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const VALID_KINDS = new Set(["routine", "diary", "appetite"]);

  function key(kind, id) {
    const normalizedKind = String(kind || "");
    const normalizedId = String(id || "");
    if (!VALID_KINDS.has(normalizedKind) || !normalizedId) return "";
    return `${normalizedKind}:${normalizedId}`;
  }

  function normalize(value) {
    if (!value || typeof value !== "object") return null;
    return {
      text: String(value.text || ""),
      mode: value.mode === "edit" ? "edit" : "create",
      surface: String(value.surface || ""),
      updatedAt: String(value.updatedAt || "")
    };
  }

  function migrateLegacyDiaryDrafts(state, now = "") {
    if (!state || typeof state !== "object") return false;
    const diary = state.diary;
    const legacyDrafts = diary?.drafts;
    if (!legacyDrafts || typeof legacyDrafts !== "object") return false;
    state.textDrafts ||= {};
    Object.entries(legacyDrafts).forEach(([dateKey, value]) => {
      const legacy = normalize(value);
      const text = legacy?.text || "";
      const entry = diary.entries?.[dateKey];
      const liveEntry = entry && !entry.deleted ? entry : null;
      const draftKey = key("diary", dateKey);
      if (!draftKey || !text.trim() || text === String(liveEntry?.originalText || "") || state.textDrafts[draftKey]) return;
      state.textDrafts[draftKey] = {
        text,
        mode: liveEntry ? "edit" : "create",
        surface: `diary-${dateKey}`,
        updatedAt: legacy.updatedAt || String(now || "")
      };
    });
    delete diary.drafts;
    return true;
  }

  return { key, migrateLegacyDiaryDrafts, normalize };
});
