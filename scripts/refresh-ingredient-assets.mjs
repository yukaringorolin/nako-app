import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(rootDir, "src", "ingredient_catalog.js");
const targetDir = path.join(rootDir, "assets", "ingredients");
const manifestPath = path.join(targetDir, "ATTRIBUTIONS.md");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(catalogPath, "utf8"), context, { filename: catalogPath });
const catalog = context.window.nakoIngredientCatalog;

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  "Accept-Language": "en-SG,en;q=0.9"
};

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("\\u0026", "&");
}

function imageUrlFromHtml(html, source) {
  const patterns = [
    /<meta[^>]+property="og:image"[^>]+content="([^"]+)"[^>]*>/i,
    /<meta[^>]+content="([^"]+)"[^>]+property="og:image"[^>]*>/i,
    /<link[^>]+rel="preload"[^>]+as="image"[^>]+href="([^"]+)"[^>]*>/i,
    /<link[^>]+as="image"[^>]+href="([^"]+)"[^>]+rel="preload"[^>]*>/i,
    /(https:\/\/media\.nedigital\.sg\/fairprice\/[^")\\\s]+\.(?:jpg|jpeg|png|webp)[^")\\\s]*)/i
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1]);
  }
  throw new Error(`No product image found on ${source}`);
}

async function downloadAsset(entry) {
  const pageResponse = await fetch(entry.source, { headers });
  if (!pageResponse.ok) throw new Error(`${pageResponse.status} while loading ${entry.source}`);
  const imageUrl = imageUrlFromHtml(await pageResponse.text(), entry.source);
  const imageResponse = await fetch(imageUrl, { headers });
  if (!imageResponse.ok) throw new Error(`${imageResponse.status} while downloading ${imageUrl}`);
  const bytes = Buffer.from(await imageResponse.arrayBuffer());
  fs.writeFileSync(path.join(targetDir, entry.file), bytes);
  return { ...entry, imageUrl, bytes: bytes.length };
}

function writeManifest(downloaded) {
  const lines = [
    "# Ingredient Image Sources",
    "",
    "Curated online reference images for this private household app. Every file is a reviewed Singapore-grocery-style representation; this is a source record, not an open-license attribution ledger.",
    ""
  ];
  for (const [key, entry] of Object.entries(catalog)) {
    lines.push(`## ${key}`);
    lines.push("");
    lines.push(`- **File**: ${entry.file ? `\`${entry.file}\`` : "No image (intentional)"}`);
    lines.push(`- **Shopping target**: ${entry.target}`);
    if (entry.source) lines.push(`- **Source page**: ${entry.source}`);
    const result = downloaded.get(key);
    if (result) lines.push(`- **Downloaded image**: ${result.imageUrl}`);
    lines.push("");
  }
  fs.writeFileSync(manifestPath, `${lines.join("\n").trim()}\n`, "utf8");
}

fs.mkdirSync(targetDir, { recursive: true });
const downloaded = new Map();
for (const [key, entry] of Object.entries(catalog)) {
  if (!entry.file) continue;
  console.log(`Curating ${key}...`);
  downloaded.set(key, await downloadAsset(entry));
}
writeManifest(downloaded);
console.log(`Refreshed ${downloaded.size} ingredient images and source manifest.`);
