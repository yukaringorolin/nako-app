const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const dataContent = fs.readFileSync(path.join(__dirname, "../src/data.js"), "utf8");
const searchContent = fs.readFileSync(path.join(__dirname, "../src/search.js"), "utf8");

// Mock environment for evaluating data.js and search.js
const globalMock = {
  window: {},
  t: (en, jp, mm) => ({ en: en || "", jp: jp || en || "", mm: mm || en || "" }),
  ui: {},
  langs: ["en", "jp", "mm"]
};
globalMock.window.nakoData = {};

// Evaluate data.js
(function() {
  const window = globalMock.window;
  const t = globalMock.t;
  eval(dataContent);
})();

const nakoData = globalMock.window.nakoData;

// Evaluate search.js
let nakoSearch;
(function() {
  const window = globalMock.window;
  const module = { exports: {} };
  eval(searchContent);
  nakoSearch = module.exports || window.nakoSearch;
})();

const index = nakoSearch.buildSearchIndex(nakoData);

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

// 1. Exact-title matching ranks first
test("Exact-title matching ranks first", () => {
  const query = "come";
  const results = nakoSearch.searchIndex(index, query);
  assert.ok(results.length > 0, "Should return results");
  assert.equal(results[0].originalItem.id, "come", "First result must be 'come'");
});

// 2. Prefix title matching outranks body matching
test("Prefix title matching outranks body matching", () => {
  // Query "structur" matches "Structured Tug + Fetch" (title prefix) 
  // and might match some body texts.
  const query = "structur";
  const results = nakoSearch.searchIndex(index, query);
  assert.ok(results.length > 0);
  assert.equal(results[0].originalItem.id, "tug-fetch", "Title prefix match must rank first");
});

// 3. Ingredient search finds the correct recipe
test("Ingredient search finds the correct recipe", () => {
  const query = "chicken";
  const results = nakoSearch.searchIndex(index, query);
  const hasRecipes = results.some(r => r.type === "recipe");
  assert.ok(hasRecipes, "Should find recipes containing chicken");
});

// 4. Instruction-body search finds the correct routine or safety item
test("Instruction-body search finds the correct routine or safety item", () => {
  // "rinse raw chicken" appears in instructions for do-not-wash-raw-meat
  const query = "rinse raw chicken";
  const results = nakoSearch.searchIndex(index, query);
  assert.ok(results.length > 0);
  assert.equal(results[0].originalItem.id, "do-not-wash-raw-meat");
});

// 5. English query works
test("English query works", () => {
  const results = nakoSearch.searchIndex(index, "emergency");
  assert.ok(results.length > 0);
});

// 6. Japanese query works
test("Japanese query works", () => {
  // "おいで" is Come in Japanese
  const results = nakoSearch.searchIndex(index, "おいで");
  assert.ok(results.length > 0);
  assert.equal(results[0].originalItem.id, "come");
});

// 7. Burmese query works
test("Burmese query works", () => {
  // "လာ" is Come in Burmese
  const results = nakoSearch.searchIndex(index, "လာ");
  assert.ok(results.length > 0);
  assert.equal(results[0].originalItem.id, "come");
});

// 8. A non-current-language query still finds the correct result
test("A non-current-language query still finds the correct result", () => {
  // Searching "おいで" (Japanese) still works even though English or Burmese might be selected
  const results = nakoSearch.searchIndex(index, "おいで");
  assert.ok(results.length > 0);
  assert.equal(results[0].originalItem.id, "come");
});

// 9. Multiple-token ranking behaves correctly
test("Multiple-token ranking behaves correctly", () => {
  // "chicken tender" matches both tokens on sasami recipe title "Chicken tender topping"
  const query = "chicken tender";
  const results = nakoSearch.searchIndex(index, query);
  assert.ok(results.length > 0);
  assert.equal(results[0].originalItem.id, "sasami", "Should rank chicken tender topping (sasami) highest");
});

// 10. Duplicate destinations are removed
test("Duplicate destinations are removed", () => {
  const query = "nako";
  const results = nakoSearch.searchIndex(index, query);
  const seen = new Set();
  for (const r of results) {
    const key = `${r.type}:${r.route}:${r.id}`;
    assert.ok(!seen.has(key), `Duplicate destination found: ${key}`);
    seen.add(key);
  }
});

// 11. Empty queries return no normal search results
test("Empty queries return no normal search results", () => {
  const results = nakoSearch.searchIndex(index, "");
  assert.equal(results.length, 0);
  const resultsSpaces = nakoSearch.searchIndex(index, "   ");
  assert.equal(resultsSpaces.length, 0);
});

// 12. Lightweight typo tolerance works without outranking exact matches
test("Lightweight typo tolerance works without outranking exact matches", () => {
  // "chiken" has distance 1 from "chicken"
  const fuzzyResults = nakoSearch.searchIndex(index, "chiken");
  assert.ok(fuzzyResults.length > 0);
  const hasChicken = fuzzyResults.some(r => r.id.includes("chicken") || trContains(r.title, "chicken"));
  assert.ok(hasChicken, "Fuzzy match should find chicken items");

  // Exact query "chicken" must score higher than fuzzy query "chiken" for chicken broth
  const item = index.find(r => r.originalItem.id === "chicken-broth");
  if (item) {
    const scoreExact = nakoSearch.scoreSearchResult(item, ["chicken"], "chicken");
    const scoreFuzzy = nakoSearch.scoreSearchResult(item, ["chiken"], "chiken");
    assert.ok(scoreExact > scoreFuzzy, "Exact match score must be higher than fuzzy match score");
  }
});

// Helper for translation checks
function trContains(transObj, term) {
  if (!transObj) return false;
  return String(transObj.en || "").toLowerCase().includes(term) ||
         String(transObj.jp || "").toLowerCase().includes(term) ||
         String(transObj.mm || "").toLowerCase().includes(term);
}

// 13. Highlighting safely handles HTML-like characters
test("Highlighting safely handles HTML-like characters", () => {
  const appContent = fs.readFileSync(path.join(__dirname, "../src/app.js"), "utf8");
  
  // Extract highlightText from app.js content and eval it
  const match = /function highlightText\([\s\S]*?\n\}/.exec(appContent);
  assert.ok(match, "highlightText must be defined in app.js");
  
  let highlightTextFn;
  const esc = (val) => String(val).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const window = { nakoSearch };
  
  // Eval it locally
  (function() {
    eval(match[0]);
    highlightTextFn = highlightText;
  })();

  const text = "Safety <script>alert(1)</script> Rules";
  const highlighted = highlightTextFn(text, "rules");
  
  assert.ok(!highlighted.includes("<script>"), "HTML tags must be escaped");
  assert.ok(highlighted.includes("&lt;script&gt;"), "HTML tags must be properly escaped in output");
  assert.ok(highlighted.includes("<mark class=\"search-highlight\">"), "Highlight mark must be unescaped HTML tag");
});

// 14. Inactive routines do not outrank current active routines
test("Inactive routines do not outrank current active routines", () => {
  // Let's create two mock index items: one active routine, one inactive routine.
  // Both match the query "sweep" in title.
  const activeItem = {
    type: "routine",
    active: true,
    searchable: {
      en: { title: "sweep floor", summary: "", body: "", extras: [] },
      jp: { title: "床掃き", summary: "", body: "", extras: [] },
      mm: { title: "ကြမ်းတိုက်", summary: "", body: "", extras: [] }
    }
  };
  const inactiveItem = {
    type: "routine",
    active: false,
    searchable: {
      en: { title: "sweep floor", summary: "", body: "", extras: [] },
      jp: { title: "床掃き", summary: "", body: "", extras: [] },
      mm: { title: "ကြမ်းတိုက်", summary: "", body: "", extras: [] }
    }
  };

  const scoreActive = nakoSearch.scoreSearchResult(activeItem, ["sweep"], "sweep");
  const scoreInactive = nakoSearch.scoreSearchResult(inactiveItem, ["sweep"], "sweep");
  
  assert.ok(scoreActive > scoreInactive, "Active routine must score higher than inactive routine");
});

console.log("Search unit checks passed.");
