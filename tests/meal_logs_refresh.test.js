const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const featureSource = fs.readFileSync(path.join(__dirname, "..", "src", "features", "meal-logs.js"), "utf8");
const sampleEntries = [
  { dateKey: "2026-07-24", calories: 2100, protein: 180, carbs: 220, fat: 60 }
];

async function run() {
  let savedCache = null;
  let renderCount = 0;
  let fetchedUrl = "";
  let fetchedOptions = null;
  const context = {
    window: {
      nakoMealLogs: {
        EDWIN_MEAL_LOGS_CSV_URL: "published-csv-url",
        parseMealLogsCsv: (csv) => {
          assert.equal(csv, "csv-body");
          return sampleEntries;
        },
        saveCache: (storage, entries, refreshedAt) => {
          savedCache = { storage, entries, refreshedAt };
          return true;
        }
      }
    },
    mealLogsState: {
      entries: [],
      refreshedAt: "",
      status: "idle",
      error: ""
    },
    safeStorage: { name: "safe-storage" },
    fetch: async (url, options) => {
      fetchedUrl = url;
      fetchedOptions = options;
      return { ok: true, text: async () => "csv-body" };
    },
    parseRoute: () => ({ view: "food", foodId: "meal-logs" }),
    render: () => { renderCount += 1; },
    document: { visibilityState: "visible" },
    Intl,
    Date,
    console
  };
  vm.createContext(context);
  vm.runInContext(featureSource, context);

  await context.refreshMealLogs({ renderLoading: false });
  assert.equal(fetchedUrl, "published-csv-url");
  assert.equal(fetchedOptions.cache, "no-store");
  assert.deepEqual(Object.keys(fetchedOptions), ["cache"]);
  assert.deepEqual(context.mealLogsState.entries, sampleEntries);
  assert.equal(context.mealLogsState.status, "success");
  assert.equal(renderCount, 1);
  assert.equal(savedCache.storage, context.safeStorage);
  assert.deepEqual(savedCache.entries, sampleEntries);
  assert.ok(!Number.isNaN(Date.parse(savedCache.refreshedAt)));

  const lastSuccessfulRefresh = context.mealLogsState.refreshedAt;
  context.fetch = async () => { throw new Error("temporary failure"); };
  await context.refreshMealLogs({ renderLoading: false });
  assert.equal(context.mealLogsState.status, "error");
  assert.deepEqual(context.mealLogsState.entries, sampleEntries);
  assert.equal(context.mealLogsState.refreshedAt, lastSuccessfulRefresh);
  assert.equal(renderCount, 2);

  context.mealLogsState.status = "idle";
  await context.handleMealLogsVisibilityChange();
  assert.equal(context.mealLogsState.status, "error");
  assert.equal(renderCount, 4);

  console.log("Edwin meal log refresh and cached-fallback behavior checks passed.");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
