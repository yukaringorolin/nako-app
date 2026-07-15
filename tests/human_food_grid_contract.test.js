const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const componentSource = fs.readFileSync(path.join(root, "src", "ui", "components.js"), "utf8");
const pageSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
const styleSource = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");

const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "src", "data.js"), "utf8"), dataContext);
const recipes = dataContext.window.nakoData.recipes;

const componentContext = {
  esc: (value) => String(value ?? ""),
  tr: (value) => typeof value === "string" ? value : (value?.en || ""),
};
vm.runInNewContext(componentSource, componentContext);

const recipeById = (id) => recipes.find((recipe) => recipe.id === id);
const bananaHtml = componentContext.renderRecipeCard(recipeById("banana-toast"));
const pendingHtml = componentContext.renderRecipeCard(recipeById("pork-shogayaki-no-onion"));
const fallbackHtml = componentContext.renderRecipeCard(recipeById("air-fryer-broccoli"));
const dogHtml = componentContext.renderRecipeCard(recipeById("sasami"));

assert.match(pageSource, /<section class="card-list\$\{isHuman \? " human-recipe-grid" : ""\}">/);

assert.match(bananaHtml, /class="recipe-card human-recipe-card"/);
assert.match(bananaHtml, /class="recipe-card-banner"><img[^>]*loading="lazy"/);
assert.match(bananaHtml, />4 mins</);
assert.match(bananaHtml, />Breakfast\/Snack</);
assert.equal((bananaHtml.match(/class="badge /g) || []).length, 2);
assert.doesNotMatch(bananaHtml, /card-description|>Quick<|High Protein/);

assert.match(pendingHtml, />15 mins</);
assert.match(pendingHtml, />Pending demo</);
assert.doesNotMatch(pendingHtml, />Lunch\/Dinner<|>Japanese<|High Protein/);

assert.match(fallbackHtml, /recipe-card-banner recipe-card-placeholder/);
assert.match(fallbackHtml, /aria-hidden="true"><span>R<\/span>/);
assert.doesNotMatch(fallbackHtml, /<img/);

assert.doesNotMatch(dogHtml, /human-recipe-card/);
assert.match(dogHtml, /card-description/);
assert.match(dogHtml, /data-recipe="sasami"/);

assert.match(styleSource, /\.human-recipe-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/s);
assert.match(styleSource, /\.recipe-card-banner\s*\{[^}]*aspect-ratio:\s*4 \/ 3/s);
assert.match(styleSource, /\.recipe-card-placeholder\s*\{[^}]*display:\s*grid/s);
assert.match(styleSource, /@media \(max-width: 360px\)[\s\S]*?\.human-recipe-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
assert.match(styleSource, /@media \(max-width: 360px\)[\s\S]*?\.recipe-card\.human-recipe-card\s*\{[^}]*grid-template-columns:\s*112px minmax\(0, 1fr\)/s);

console.log("Human Food compact grid contracts passed.");
