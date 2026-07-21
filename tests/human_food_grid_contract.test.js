const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const componentSource = fs.readFileSync(path.join(root, "src", "ui", "components.js"), "utf8");
const pageSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
const actionSource = fs.readFileSync(path.join(root, "src", "features", "actions.js"), "utf8");
const styleSource = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");
const indexSource = fs.readFileSync(path.join(root, "index.html"), "utf8");

const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "src", "data.js"), "utf8"), dataContext);
const recipes = dataContext.window.nakoData.recipes;

const componentContext = {
  esc: (value) => String(value ?? ""),
  tr: (value) => typeof value === "string" ? value : (value?.en || ""),
  label: (key) => ({
    humanRecipes: "Human recipes",
    menuAdd: "Add to menu",
    menuRemove: "Remove from menu",
    menuSelected: "selected",
    menuSelectionLimit: "You can select up to 5 foods.",
    menuShare: "Share menu"
  }[key] || key)
};
vm.runInNewContext(componentSource, componentContext);

const recipeById = (id) => recipes.find((recipe) => recipe.id === id);
const bananaHtml = componentContext.renderRecipeCard(recipeById("banana-toast"));
const selectedBananaHtml = componentContext.renderRecipeCard(recipeById("banana-toast"), { selected: true });
const disabledBananaHtml = componentContext.renderRecipeCard(recipeById("banana-toast"), { selectionDisabled: true });
const pendingHtml = componentContext.renderRecipeCard(recipeById("pork-shogayaki-no-onion"));
const fallbackHtml = componentContext.renderRecipeCard(recipeById("air-fryer-broccoli"));
const dogHtml = componentContext.renderRecipeCard(recipeById("sasami"));
const emptyMenuBar = componentContext.renderHumanMenuBar(0, 5);
const fullMenuBar = componentContext.renderHumanMenuBar(5, 5);
const copiedMenuBar = componentContext.renderHumanMenuBar(0, 5, "Menu copied. Paste it into your chat.");

assert.match(pageSource, /class="human-food-index"/);
assert.match(pageSource, /renderHumanMenuBar\(selectedCount, maxSelections, humanMenuShareStatus\)/);
assert.match(pageSource, /selectionDisabled: selectedCount >= maxSelections/);

assert.match(bananaHtml, /class="recipe-card human-recipe-card"/);
assert.match(bananaHtml, /^<article[^>]*><button[^>]*class="human-recipe-open"[^>]*data-recipe="banana-toast"/);
assert.match(bananaHtml, /<\/button><button[^>]*data-human-menu-toggle="banana-toast"/);
assert.match(bananaHtml, /aria-label="Add to menu: Banana Toast"/);
assert.match(bananaHtml, /aria-pressed="false"/);
assert.match(bananaHtml, /class="recipe-card-banner"><img[^>]*loading="lazy"/);
assert.match(bananaHtml, />4 mins</);
assert.match(bananaHtml, />Breakfast\/Snack</);
assert.equal((bananaHtml.match(/class="badge /g) || []).length, 2);
assert.doesNotMatch(bananaHtml, /card-description|>Quick<|High Protein/);

assert.match(selectedBananaHtml, /human-recipe-card is-selected/);
assert.match(selectedBananaHtml, /aria-label="Remove from menu: Banana Toast"/);
assert.match(selectedBananaHtml, /aria-pressed="true"/);
assert.match(selectedBananaHtml, /<span aria-hidden="true">✓<\/span>/);
assert.doesNotMatch(selectedBananaHtml, /data-human-menu-toggle="banana-toast"[^>]*disabled/);
assert.match(disabledBananaHtml, /data-human-menu-toggle="banana-toast"[^>]*disabled/);

assert.match(pendingHtml, />15 mins</);
assert.match(pendingHtml, />Pending demo</);
assert.doesNotMatch(pendingHtml, />Lunch\/Dinner<|>Japanese<|High Protein/);

assert.match(fallbackHtml, /recipe-card-banner recipe-card-placeholder/);
assert.match(fallbackHtml, /aria-hidden="true"><span>R<\/span>/);
assert.doesNotMatch(fallbackHtml, /<img/);

assert.doesNotMatch(dogHtml, /human-recipe-card/);
assert.match(dogHtml, /card-description/);
assert.match(dogHtml, /data-recipe="sasami"/);

assert.match(emptyMenuBar, /<strong>0\/5<\/strong> selected/);
assert.match(emptyMenuBar, /data-human-menu-share disabled/);
assert.match(emptyMenuBar, />Share menu<\/button>/);
assert.match(fullMenuBar, /<strong>5\/5<\/strong> selected/);
assert.match(fullMenuBar, /You can select up to 5 foods\./);
assert.doesNotMatch(fullMenuBar, /data-human-menu-share disabled/);
assert.match(copiedMenuBar, /Menu copied\. Paste it into your chat\./);

assert.match(styleSource, /\.human-recipe-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/s);
assert.match(styleSource, /\.recipe-card-banner\s*\{[^}]*aspect-ratio:\s*4 \/ 3/s);
assert.match(styleSource, /\.recipe-card-placeholder\s*\{[^}]*display:\s*grid/s);
assert.match(styleSource, /\.human-menu-bar\s*\{[^}]*position:\s*fixed;[^}]*bottom:/s);
assert.match(styleSource, /\.clipboard-copy-source\s*\{[^}]*left:\s*-9999px/s);
assert.match(styleSource, /@media \(max-width: 360px\)[\s\S]*?\.human-recipe-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
assert.match(styleSource, /@media \(max-width: 360px\)[\s\S]*?\.human-recipe-open\s*\{[^}]*grid-template-columns:\s*112px minmax\(0, 1fr\)/s);

assert.ok(indexSource.indexOf("src/core/menu-share.js") < indexSource.indexOf("src/features/pages.js"));
assert.match(actionSource, /data-human-menu-toggle/);
assert.match(actionSource, /data-human-menu-share/);
assert.doesNotMatch(actionSource, /data-human-menu-whatsapp|buildWhatsAppUrl/);
assert.match(actionSource, /navigator\.share/);
assert.match(actionSource, /forwardMenuText/);
assert.match(actionSource, /function copyHumanMenuText\(text\)/);
assert.match(actionSource, /ui\.mm\.menuShareIntro/);
assert.match(actionSource, /selectedHumanRecipeIds = \[\];/);
assert.match(actionSource, /function buildWhatsAppNoticeUrl\(\)/);

console.log("Human Food compact grid contracts passed.");
