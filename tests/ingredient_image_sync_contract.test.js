const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const appSource = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
const syncSource = fs.readFileSync(path.join(root, "scripts", "refresh-ingredient-assets.mjs"), "utf8");
const context = { window: {} };

assert.match(packageJson.scripts["build:data"], /refresh-ingredient-assets\.mjs/);
assert.match(packageJson.scripts["sync:ingredients"], /refresh-ingredient-assets\.mjs/);
assert.match(appSource, /ingredientCatalog\[key\]\?\.file \|\| `\$\{key\}\.jpg`/);
assert.match(syncSource, /item\.alternatives/);
assert.match(syncSource, /sources\.json/);

vm.runInNewContext(fs.readFileSync(path.join(root, "src", "ingredient_catalog.js"), "utf8"), context);
vm.runInNewContext(fs.readFileSync(path.join(root, "src", "data.js"), "utf8"), context);

const catalog = context.window.nakoIngredientCatalog;
const recipes = context.window.nakoData.recipes;
const ingredientKeys = new Set();

for (const recipe of recipes) {
  for (const item of recipe.ingredients) {
    ingredientKeys.add(item.key);
    for (const alternative of item.alternatives || []) ingredientKeys.add(alternative.key);
  }
}

for (const key of ingredientKeys) {
  const entry = catalog[key];
  assert.notEqual(entry?.file, false, `${key} cannot disable its image while a recipe uses it`);
  const filename = entry?.file || `${key}.jpg`;
  assert.ok(
    fs.existsSync(path.join(root, "assets", "ingredients", filename)),
    `${key} is missing assets/ingredients/${filename}`
  );
}

console.log(`Ingredient image sync contract passed for ${ingredientKeys.size} recipe ingredient keys.`);
