const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "src", "data.js"), "utf8"), context);
const data = context.window.nakoData;
const failures = [];
const warnings = [];
const languages = ["en", "jp", "mm"];

const uiKeys = Object.keys(data.ui.en).sort();
for (const language of languages.slice(1)) {
  const keys = Object.keys(data.ui[language]).sort();
  if (JSON.stringify(keys) !== JSON.stringify(uiKeys)) failures.push(`UI key mismatch for ${language}.`);
}

function inspectTranslation(value, location, kind = "text") {
  if (!value || typeof value !== "object" || !("en" in value)) return;
  for (const language of languages) if (!String(value[language] || "").trim()) failures.push(`${location} is missing ${language}.`);
  const words = String(value.en || "").trim().split(/\s+/).filter(Boolean).length;
  const limit = kind === "title" ? 8 : kind === "summary" ? 24 : 45;
  if (words > limit) warnings.push(`${location} has ${words} English words (target ${limit} or fewer).`);
}

function inspectCollection(items, name) {
  for (const item of items || []) {
    const id = item.id || "unknown";
    inspectTranslation(item.title, `${name}.${id}.title`, "title");
    inspectTranslation(item.summary || item.description || item.purpose, `${name}.${id}.summary`, "summary");
    for (const [index, value] of (item.instructions || item.method || item.steps || []).entries()) inspectTranslation(value, `${name}.${id}.step.${index}`);
    for (const [index, value] of (item.mustRemember || item.note || item.safety || []).entries?.() || []) inspectTranslation(value, `${name}.${id}.remember.${index}`);
    if (item.summary && (item.instructions || []).some((value) => languages.every((language) => value?.[language] === item.summary?.[language]))) {
      failures.push(`${name}.${id} repeats its summary as a step.`);
    }
  }
}

inspectCollection(data.homeSections, "sections");
inspectCollection(data.foodItems, "food");
inspectCollection(data.foodSafetyItems, "foodSafety");
inspectCollection(data.routineTasks, "routines");
inspectCollection(data.recipes, "recipes");
inspectCollection(data.trainingData.commands, "training.commands");
inspectCollection(data.trainingData.activities, "training.activities");

for (const [index, rule] of (data.trainingData.rules || []).entries()) inspectTranslation(rule, `training.rules.${index}`);
if (!data.trainingData.rules?.length) failures.push("Training rules must be stored in translation data.");

const featureFiles = fs.readdirSync(path.join(root, "src", "features")).filter((file) => file.endsWith(".js"));
for (const file of featureFiles) {
  const content = fs.readFileSync(path.join(root, "src", "features", file), "utf8");
  if (/\b(?:alert|confirm)\(\s*["'`][A-Za-z]/.test(content)) failures.push(`${file} contains a hardcoded English alert or confirmation.`);
  if (/No saved training logs yet\.|aria-label="Language"/.test(content)) failures.push(`${file} contains known untranslated UI copy.`);
}

if (warnings.length) {
  console.warn(`Content review warnings (${warnings.length}):`);
  warnings.slice(0, 30).forEach((warning) => console.warn(`- ${warning}`));
  if (warnings.length > 30) console.warn(`- ...and ${warnings.length - 30} more. See CONTENT_STYLE.md for manual review guidance.`);
}
if (failures.length) {
  console.error("Content validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Content structure and translation parity checks passed.");
