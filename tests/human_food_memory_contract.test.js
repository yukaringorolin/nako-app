const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const componentSource = fs.readFileSync(path.join(root, "src", "ui", "components.js"), "utf8");
const pageSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
const styleSource = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");

assert.match(componentSource, /function renderFoodMemory\(item\)/);
assert.match(componentSource, /<details class="food-memory">/);
assert.doesNotMatch(componentSource, /<details class="food-memory"[^>]*\sopen(?:\s|>)/);
assert.match(componentSource, /food-memory-thumbnail.*loading="lazy"/s);
assert.match(componentSource, /food-memory-figure.*loading="lazy"/s);

assert.match(
  pageSource,
  /renderHead\(item\.icon[\s\S]*?\$\{isHuman \? renderFoodMemory\(item\) : ""\}[\s\S]*?<section class="card-list\$\{isHuman \? " human-recipe-grid" : ""\}">/,
  "The memory card must sit between the Human Food header and recipe list"
);
assert.equal((pageSource.match(/renderFoodMemory\(item\)/g) || []).length, 1);

assert.match(styleSource, /\.food-memory-summary:focus-visible/);
assert.match(styleSource, /\.food-memory-figure img[\s\S]*?height:\s*auto/);
assert.match(styleSource, /\.food-memory\[open\]/);

console.log("Human Food memory card contracts passed.");
