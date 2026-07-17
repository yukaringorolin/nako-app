import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(rootDir, "src", "ingredient_catalog.js");
const dataPath = path.join(rootDir, "src", "data.js");
const targetDir = path.join(rootDir, "assets", "ingredients");
const manifestPath = path.join(targetDir, "ATTRIBUTIONS.md");
const sourceRecordsPath = path.join(targetDir, "sources.json");
const fairPrice = "https://www.fairprice.com.sg";
const refreshAll = process.argv.includes("--all");
const dryRun = process.argv.includes("--dry-run");
const context = { window: {} };

vm.runInNewContext(fs.readFileSync(catalogPath, "utf8"), context, { filename: catalogPath });
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), context, { filename: dataPath });

const catalog = context.window.nakoIngredientCatalog || {};
const recipes = context.window.nakoData?.recipes || [];
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  "Accept-Language": "en-SG,en;q=0.9"
};
const searchStopWords = new Set([
  "a", "an", "and", "appropriate", "assorted", "bottle", "chilled", "cooked", "fresh", "frozen",
  "in", "labelled", "of", "or", "other", "pack", "packet", "pieces", "plain", "raw", "ready", "retail",
  "suitable", "the", "to", "whole", "with"
]);

function englishText(value) {
  if (!value || typeof value !== "object") return String(value || "");
  return String(value.en || value.jp || value.mm || "");
}

function defaultFile(key, entry) {
  if (entry?.file === false) return null;
  return entry?.file || `${key}.jpg`;
}

function addIngredient(target, key, name) {
  if (!key || target.has(key)) return;
  const entry = catalog[key] || {};
  target.set(key, {
    key,
    entry,
    file: defaultFile(key, entry),
    target: entry.target || englishText(name) || key.replaceAll("-", " ")
  });
}

function recipeIngredients() {
  const ingredients = new Map();
  for (const recipe of recipes) {
    for (const item of recipe.ingredients || []) {
      addIngredient(ingredients, item.key, item.name);
      for (const option of item.alternatives || []) addIngredient(ingredients, option.key, option.name);
    }
  }
  if (refreshAll) {
    for (const [key, entry] of Object.entries(catalog)) addIngredient(ingredients, key, entry.target);
  }
  return [...ingredients.values()].filter((item) => item.file);
}

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("\\u0026", "&");
}

function imageUrlFromHtml(html, source) {
  const patterns = [
    /<meta[^>]+property="og:image"[^>]+content="([^"]+)"[^>]*>/i,
    /<meta[^>]+content="([^"]+)"[^>]+property="og:image"[^>]*>/i,
    /<link[^>]+rel="preload"[^>]+as="image"[^>]+href="([^"]+)"[^>]*>/i,
    /<link[^>]+as="image"[^>]+href="([^"]+)"[^>]+rel="preload"[^>]*>/i,
    /(https:\/\/media\.nedigital\.sg\/fairprice\/[^\")\\\s]+\.(?:jpg|jpeg|png|webp)[^\")\\\s]*)/i
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1]);
  }
  throw new Error(`No product image found on ${source}`);
}

async function fetchText(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status} while loading ${url}`);
  return response.text();
}

function searchQuery(item) {
  if (item.entry.query) return item.entry.query;
  if (item.entry.source?.includes("/search?")) {
    return new URL(item.entry.source).searchParams.get("query") || item.target;
  }
  return item.target;
}

function normalizedTokens(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/)
    .filter((token) => token.length > 1 && !searchStopWords.has(token));
}

function chooseProductLink(links, query) {
  const queryTokens = normalizedTokens(query);
  return links.map((link, index) => {
    const slugTokens = new Set(normalizedTokens(link));
    const matches = queryTokens.reduce((score, token) => score + (slugTokens.has(token) ? 1 : 0), 0);
    return { link, score: matches * 100 - index };
  }).sort((a, b) => b.score - a.score)[0]?.link || "";
}

function productLinksFromHtml(html) {
  return [...new Set(
    [...html.matchAll(/href="(\/product\/[^"?#]+)"/gi)].map((match) => decodeHtml(match[1]))
  )];
}

async function resolveProductSource(item) {
  const explicitSource = item.entry.source || "";
  if (explicitSource && !explicitSource.includes("/search?")) return explicitSource;

  const query = searchQuery(item);
  const searchUrl = `${fairPrice}/search?query=${encodeURIComponent(query)}`;
  const links = productLinksFromHtml(await fetchText(searchUrl));
  const selected = chooseProductLink(links, query);
  if (!selected) throw new Error(`No FairPrice product result found for "${query}" (${item.key})`);
  return new URL(selected, fairPrice).href;
}

async function downloadAsset(item) {
  const sourcePage = await resolveProductSource(item);
  if (dryRun) return { ...item, sourcePage, imageUrl: "", bytes: 0 };

  const imageUrl = imageUrlFromHtml(await fetchText(sourcePage), sourcePage);
  const imageResponse = await fetch(imageUrl, { headers });
  if (!imageResponse.ok) throw new Error(`${imageResponse.status} while downloading ${imageUrl}`);
  const contentType = imageResponse.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) throw new Error(`Expected an image from ${imageUrl}, received ${contentType || "unknown content"}`);
  const bytes = Buffer.from(await imageResponse.arrayBuffer());
  if (bytes.length < 1000) throw new Error(`Downloaded image for ${item.key} is unexpectedly small (${bytes.length} bytes)`);
  fs.writeFileSync(path.join(targetDir, item.file), bytes);
  return { ...item, sourcePage, imageUrl, bytes: bytes.length };
}

function loadSourceRecords() {
  if (!fs.existsSync(sourceRecordsPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(sourceRecordsPath, "utf8"));
  } catch {
    return {};
  }
}

function writeSourceRecords(records) {
  const ordered = Object.fromEntries(Object.entries(records).sort(([first], [second]) => first.localeCompare(second)));
  fs.writeFileSync(sourceRecordsPath, `${JSON.stringify(ordered, null, 2)}\n`, "utf8");
}

function writeManifest(records, ingredients) {
  const lines = [
    "# Ingredient Image Sources",
    "",
    "Curated online reference images for this private household app. Every file is a reviewed Singapore-grocery-style representation; this is a source record, not an open-license attribution ledger.",
    ""
  ];
  for (const item of [...ingredients].sort((a, b) => a.key.localeCompare(b.key))) {
    const record = records[item.key] || {};
    lines.push(`## ${item.key}`);
    lines.push("");
    lines.push(`- **File**: \`${item.file}\``);
    lines.push(`- **Shopping target**: ${item.target}`);
    if (record.sourcePage || item.entry.source) lines.push(`- **Source page**: ${record.sourcePage || item.entry.source}`);
    if (record.imageUrl) lines.push(`- **Downloaded image**: ${record.imageUrl}`);
    lines.push("");
  }
  fs.writeFileSync(manifestPath, `${lines.join("\n").trim()}\n`, "utf8");
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

fs.mkdirSync(targetDir, { recursive: true });
const ingredients = recipeIngredients();
const pending = ingredients.filter((item) => refreshAll || !fs.existsSync(path.join(targetDir, item.file)));
if (!pending.length) {
  console.log(`Ingredient image sync is complete for ${ingredients.length} recipe ingredient keys.`);
  process.exit(0);
}

console.log(`${dryRun ? "Resolving" : "Downloading"} ${pending.length} ingredient images from FairPrice...`);
const sourceRecords = loadSourceRecords();
const failures = [];
const downloaded = await mapLimit(pending, 4, async (item) => {
  try {
    const result = await downloadAsset(item);
    console.log(`${dryRun ? "Resolved" : "Added"} ${item.key}: ${result.sourcePage}`);
    sourceRecords[item.key] = {
      file: item.file,
      target: item.target,
      sourcePage: result.sourcePage,
      imageUrl: result.imageUrl,
      bytes: result.bytes
    };
    return result;
  } catch (error) {
    failures.push(`${item.key}: ${error.message}`);
    console.error(`Failed ${item.key}: ${error.message}`);
    return null;
  }
});

if (!dryRun) {
  writeSourceRecords(sourceRecords);
  writeManifest(sourceRecords, ingredients);
}
if (failures.length) {
  console.error(`Ingredient image sync failed for ${failures.length} keys.`);
  process.exit(1);
}
console.log(`${dryRun ? "Resolved" : "Refreshed"} ${downloaded.filter(Boolean).length} ingredient images.`);
