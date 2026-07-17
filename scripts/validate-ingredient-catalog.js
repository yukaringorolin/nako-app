const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.join(__dirname, "..");
const catalogPath = path.join(rootDir, "src", "ingredient_catalog.js");
const dataPath = path.join(rootDir, "src", "data.js");
const assetDir = path.join(rootDir, "assets", "ingredients");
const context = { window: {} };

vm.runInNewContext(fs.readFileSync(catalogPath, "utf8"), context, { filename: catalogPath });
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), context, { filename: dataPath });

const catalog = context.window.nakoIngredientCatalog;
const recipes = context.window.nakoData?.recipes || [];
const failures = [];

function imageFile(key, entry) {
  if (entry?.file === false) return null;
  return entry?.file || `${key}.jpg`;
}

for (const [key, entry] of Object.entries(catalog)) {
  if (!entry.target) failures.push(`${key} is missing shopping target metadata.`);
  if (entry.file && !fs.existsSync(path.join(assetDir, entry.file))) failures.push(`${key} references missing asset ${entry.file}.`);
}

for (const recipe of recipes) {
  for (const item of recipe.ingredients) {
    const keys = [item.key, ...(item.alternatives || []).map((option) => option.key)];
    for (const key of keys) {
      const file = imageFile(key, catalog[key]);
      if (!file || !fs.existsSync(path.join(assetDir, file))) {
        failures.push(`${recipe.id} ingredient ${key} is missing ${file || "an image"}. Run npm run sync:ingredients.`);
      }
    }
  }
}

for (const key of ["chicken-tender", "chicken-minced", "chicken-thigh"]) {
  if (catalog[key]?.file === catalog["chicken-breast"]?.file) failures.push(`${key} must not share chicken-breast.jpg.`);
}

for (const key of ["shimeji-mushroom", "button-mushroom", "cooking-sake", "rice-vinegar"]) {
  if (!catalog[key]?.file) failures.push(`${key} must have a dedicated image file.`);
}

if (failures.length) {
  console.error("Ingredient catalog validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Ingredient catalog validation passed for ${Object.keys(catalog).length} catalog keys and ${recipes.length} recipes.`);
