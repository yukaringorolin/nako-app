const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const mealLogs = require("../src/core/meal-logs.js");

const publishedCsvUrl = new URL(mealLogs.EDWIN_MEAL_LOGS_CSV_URL);
assert.equal(publishedCsvUrl.origin, "https://docs.google.com");
assert.match(publishedCsvUrl.pathname, /^\/spreadsheets\/d\/e\/[^/]+\/pub$/);
assert.equal(publishedCsvUrl.searchParams.get("gid"), "1607242026");
assert.equal(publishedCsvUrl.searchParams.get("single"), "true");
assert.equal(publishedCsvUrl.searchParams.get("output"), "csv");
assert.deepEqual(mealLogs.EXPECTED_COLUMNS, ["Date", "Calories", "Protein", "Carbs", "Fat"]);

assert.deepEqual(mealLogs.parseMealLogsCsv("Date,Calories,Protein,Carbs,Fat"), []);

const entries = mealLogs.parseMealLogsCsv([
  "Date,Calories,Protein,Carbs,Fat",
  '24/07/2026,"2,100",180,220,60',
  "7/23/2026,2050,175.5,210,58",
  "07/08/2026,1980,170,200,55",
  "not-a-date,100,10,10,10"
].join("\r\n"));
assert.deepEqual(entries, [
  { dateKey: "2026-08-07", calories: 1980, protein: 170, carbs: 200, fat: 55 },
  { dateKey: "2026-07-24", calories: 2100, protein: 180, carbs: 220, fat: 60 },
  { dateKey: "2026-07-23", calories: 2050, protein: 175.5, carbs: 210, fat: 58 }
]);

const duplicateDate = mealLogs.parseMealLogsCsv([
  "Date,Calories,Protein,Carbs,Fat",
  "2026-07-24,2000,170,210,55",
  "2026-07-24,2100,180,220,60"
].join("\n"));
assert.deepEqual(duplicateDate, [
  { dateKey: "2026-07-24", calories: 2100, protein: 180, carbs: 220, fat: 60 }
]);

const monthFirstDates = mealLogs.parseMealLogsCsv([
  "Date,Calories,Protein,Carbs,Fat",
  "7/23/2026,2000,170,210,55",
  "7/8/2026,1900,160,200,50"
].join("\n"));
assert.deepEqual(monthFirstDates.map((entry) => entry.dateKey), ["2026-07-23", "2026-07-08"]);

assert.throws(
  () => mealLogs.parseMealLogsCsv("Date,Calories,Protein,Fat\n2026-07-24,2000,170,55"),
  /columns/
);
assert.throws(
  () => mealLogs.parseMealLogsCsv("Date,Calories,Protein,Carbs,Fat\ninvalid,one,two,three,four"),
  /valid daily totals/
);

const memory = new Map();
const storage = {
  getItem: (key) => memory.get(key) ?? null,
  setItem: (key, value) => {
    memory.set(key, value);
    return true;
  }
};
const refreshedAt = "2026-07-24T16:30:00.000Z";
assert.equal(mealLogs.saveCache(storage, entries, refreshedAt), true);
assert.deepEqual(mealLogs.loadCache(storage), { entries, refreshedAt });
assert.match(mealLogs.formatSingaporeDateTime(refreshedAt, "en-SG"), /25 Jul 2026/);
assert.match(mealLogs.formatSingaporeDateTime(refreshedAt, "en-SG"), /12:30/);
assert.match(mealLogs.formatDateKey("2026-07-24", "en-SG"), /24 July 2026/);

const root = path.join(__dirname, "..");
const coreSource = fs.readFileSync(path.join(root, "src", "core", "meal-logs.js"), "utf8");
const featureSource = fs.readFileSync(path.join(root, "src", "features", "meal-logs.js"), "utf8");
const pagesSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
const appSource = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
const indexSource = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.equal((coreSource.match(/https:\/\/docs\.google\.com\/spreadsheets/g) || []).length, 1);
assert.doesNotMatch(coreSource, /spreadsheets\/d\/(?!e\/)/);
assert.match(featureSource, /fetch\(window\.nakoMealLogs\.EDWIN_MEAL_LOGS_CSV_URL/);
assert.match(featureSource, /saveCache\(safeStorage/);
assert.match(featureSource, /document\.visibilityState === "visible"/);
assert.match(appSource, /addEventListener\("visibilitychange", handleMealLogsVisibilityChange\)/);
assert.match(pagesSource, /\{ id: "meal-logs", type: "food", labelKey: "shortcutMealLogs" \}/);
assert.doesNotMatch(pagesSource, /id: "meal-logs"[\s\S]{0,100}statusKey/);
assert.ok(indexSource.indexOf("src/core/meal-logs.js") < indexSource.indexOf("src/features/meal-logs.js"));
assert.ok(indexSource.indexOf("src/features/meal-logs.js") < indexSource.indexOf("src/app.js"));

console.log("Edwin meal log CSV, cache, refresh, and integration checks passed.");
