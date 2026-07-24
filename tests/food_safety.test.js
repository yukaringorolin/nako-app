const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const dataContent = fs.readFileSync(path.join(__dirname, "../src/data.js"), "utf8");
const router = require("../src/core/router.js");
const pageContent = fs.readFileSync(path.join(__dirname, "../src/features/pages.js"), "utf8");
const componentContent = fs.readFileSync(path.join(__dirname, "../src/ui/components.js"), "utf8");

// Mock environment for evaluating data.js
const globalMock = {
  window: {},
};
globalMock.window.nakoData = {};

// Evaluate data.js
(function() {
  const window = globalMock.window;
  eval(dataContent);
})();

const nakoData = globalMock.window.nakoData;

// 1. Verify top-level sections order
const homeSections = nakoData.homeSections;
assert.ok(homeSections, "homeSections must exist");
const foodIndex = homeSections.findIndex((s) => s.id === "food");
const safetyIndex = homeSections.findIndex((s) => s.id === "food-safety");
const dailyIndex = homeSections.findIndex((s) => s.id === "daily");

assert.ok(foodIndex !== -1, "Food section must exist");
assert.ok(safetyIndex !== -1, "Kitchen Rules & Food Safety section must exist");
assert.ok(dailyIndex !== -1, "Daily section must exist");
assert.equal(safetyIndex, foodIndex + 1, "Food Safety must appear immediately after Food");
assert.equal(dailyIndex, safetyIndex + 1, "Daily must appear immediately after Food Safety");

// 2. Verify food safety items
const foodSafetyItems = nakoData.foodSafetyItems;
assert.ok(foodSafetyItems, "foodSafetyItems must exist");
assert.equal(foodSafetyItems.length, 12, "There must be exactly 12 food safety items");
assert.equal(homeSections[safetyIndex].title.en, "Kitchen Rules & Food Safety");

const householdCookingRulesItem = nakoData.householdCookingRulesItem;
assert.ok(householdCookingRulesItem, "Household cooking rules item must exist");
assert.equal(householdCookingRulesItem.id, "household-cooking-rules");
assert.equal(householdCookingRulesItem.instructions, nakoData.cookingRules, "Household card must reuse the cookingRules array");
assert.equal(householdCookingRulesItem.instructions.length, 6, "Household card must show all six cooking rules");
assert.match(householdCookingRulesItem.instructions[2].en, /approved human recipe lists it.*never feed any onion dish to Nako/);
assert.ok(!nakoData.foodItems.some((item) => item.id === "cooking-rules"), "Cooking rules must no longer appear in the Food section");

const expectedIds = [
  "refrigerate-after-buying",
  "do-not-overcrowd-fridge",
  "refrigerator-storage-limits",
  "do-not-wash-raw-meat",
  "separate-raw-and-cooked-food",
  "safe-thawing",
  "cook-meat-completely",
  "rice-and-noodle-safety",
  "leftover-safety",
  "clean-serving-utensils",
  "egg-safety",
  "when-uncertain-discard"
];

expectedIds.forEach((id) => {
  const item = foodSafetyItems.find((x) => x.id === id);
  assert.ok(item, `Item with id ${id} must exist`);
  assert.ok(item.icon, `Item ${id} must have an icon`);
  assert.ok(item.title, `Item ${id} must have a title`);
  assert.ok(item.summary, `Item ${id} must have a summary`);
  assert.ok(Array.isArray(item.instructions), `Item ${id} instructions must be an array`);
  assert.ok(Array.isArray(item.mustRemember), `Item ${id} mustRemember must be an array`);
  assert.ok(Array.isArray(item.photos), `Item ${id} photos must be an array`);
  assert.equal(item.photos.length, 1, `Item ${id} must have exactly 1 photo`);
});

const safeThawing = foodSafetyItems.find((item) => item.id === "safe-thawing");
const safeThawingSteps = safeThawing.instructions.map((item) => item.en).join("\n");
const safeThawingWarnings = safeThawing.mustRemember.map((item) => item.en).join("\n");
assert.match(safeThawingSteps, /Change the water every 30 min/);
assert.match(safeThawingSteps, /Cook immediately after thawing/);
assert.match(safeThawingWarnings, /warm or hot water/);
assert.match(safeThawingWarnings, /wash your hands, the pot or sink, and nearby surfaces/);

const storageLimits = foodSafetyItems.find((item) => item.id === "refrigerator-storage-limits");
assert.match(storageLimits.mustRemember.map((item) => item.en).join("\n"), /Smell is not a safety test/);

// 3. Verify the public route contract and focused feature renderers
assert.deepEqual(router.parseRouteHash("#food-safety/safe-thawing"), { view: "food-safety-item", itemId: "safe-thawing" });
assert.deepEqual(router.parseRouteHash("#food-safety/household-cooking-rules"), { view: "food-safety-item", itemId: "household-cooking-rules" });
assert.ok(pageContent.includes("function renderFoodSafetyItem"), "pages module must render a food-safety detail");
assert.ok(pageContent.includes('if (foodId === "cooking-rules") return replaceRoute("#food-safety/household-cooking-rules")'), "Legacy cooking-rules route must replace history with the combined section");
assert.ok(pageContent.includes("function renderOfficialReferencesPanel"), "pages module must render official references");
assert.ok(componentContent.includes("function renderFoodSafetyCard"), "components module must render food-safety cards");

// 4. Verify no safety items are routine tracking tasks
const routineTasks = nakoData.routineTasks;
expectedIds.forEach((id) => {
  const isRoutine = routineTasks.some((x) => x.id === id);
  assert.ok(!isRoutine, `Food safety item ${id} must not be present in routine tasks`);
});

console.log("Food safety contract checks passed successfully.");
