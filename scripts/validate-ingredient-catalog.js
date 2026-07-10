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

for (const [key, entry] of Object.entries(catalog)) {
  if (key === "water") {
    if (entry.file !== null) failures.push("Water must intentionally have no image file.");
    continue;
  }
  if (!entry.file || !entry.source || !entry.target) failures.push(`${key} is missing file, source, or shopping target metadata.`);
  if (entry.file && !fs.existsSync(path.join(assetDir, entry.file))) failures.push(`${key} references missing asset ${entry.file}.`);
}

for (const recipe of recipes) {
  for (const item of recipe.ingredients) {
    const keys = [item.key, ...(item.alternatives || []).map((option) => option.key)];
    for (const key of keys) if (!catalog[key]) failures.push(`${recipe.id} references unknown ingredient key ${key}.`);
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

console.log(`Ingredient catalog validation passed for ${Object.keys(catalog).length} keys and ${recipes.length} recipes.`);
