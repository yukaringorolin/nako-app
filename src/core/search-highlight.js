(function (root, factory) {
  const api = factory(
    typeof module === "object" && module.exports ? require("./html.js") : root.nakoHtml
  );
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoSearchHighlight = api;
})(typeof window !== "undefined" ? window : globalThis, function (html) {
  "use strict";

  function highlightText(text, query, normalize = (value) => String(value || "").toLowerCase().trim()) {
    const escaped = html.escapeHtml(text || "");
    const tokens = normalize(query).split(" ").filter(Boolean);
    if (!escaped || !tokens.length) return escaped;
    const lower = escaped.toLowerCase();
    const matches = [];
    for (const token of tokens) {
      let position = 0;
      while ((position = lower.indexOf(token, position)) >= 0) {
        matches.push({ start: position, end: position + token.length });
        position += token.length;
      }
    }
    if (!matches.length) return escaped;
    matches.sort((a, b) => a.start - b.start);
    const merged = [];
    for (const match of matches) {
      const previous = merged[merged.length - 1];
      if (previous && match.start <= previous.end) previous.end = Math.max(previous.end, match.end);
      else merged.push({ ...match });
    }
    let output = "";
    let cursor = 0;
    for (const match of merged) {
      output += escaped.slice(cursor, match.start);
      output += `<mark class="search-highlight">${escaped.slice(match.start, match.end)}</mark>`;
      cursor = match.end;
    }
    return output + escaped.slice(cursor);
  }

  return { highlightText };
});
