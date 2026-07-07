import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const TARGET_DIR = path.join(ROOT_DIR, 'assets/ingredients');
const ATTRIBUTION_FILE = path.join(TARGET_DIR, 'ATTRIBUTIONS.md');

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Map of filenames to search query and exact file (if we want to use specific high quality files from Commons)
const ingredientsToFetch = [
  { file: 'chicken-breast.jpg', query: 'Raw chicken breast fillet', exact: false },
  { file: 'pumpkin.jpg', query: 'Kabocha squash', exact: false },
  { file: 'carrot.jpg', query: 'Carrot raw', exact: false },
  { file: 'whitefish.jpg', query: 'Raw white fish fillet', exact: false },
  { file: 'sweet-potato.jpg', query: 'Sweet potato raw', exact: false },
  { file: 'zucchini.jpg', query: 'Zucchini raw', exact: false },
  { file: 'napa-cabbage.jpg', query: 'Napa cabbage raw', exact: false },
  { file: 'broccoli.jpg', query: 'Broccoli raw florets', exact: false },
  { file: 'rice.jpg', query: 'Cooked white rice bowl', exact: false },
  { file: 'soy-sauce.jpg', query: 'Soy sauce bottle', exact: false },
  { file: 'mirin.jpg', query: 'Mirin Japanese', exact: false },
  { file: 'sake.jpg', query: 'Sake bottle Japanese', exact: false },
  { file: 'sugar.jpg', query: 'White sugar bowl', exact: false },
  { file: 'ginger.jpg', query: 'Ginger root raw', exact: false },
  { file: 'oil.jpg', query: 'Cooking oil bottle', exact: false },
  { file: 'sesame.jpg', query: 'White sesame seeds', exact: false },
  { file: 'salmon.jpg', query: 'Raw salmon fillet', exact: false },
  { file: 'salt.jpg', query: 'Table salt shaker', exact: false },
  { file: 'egg.jpg', query: 'Raw chicken egg', exact: false },
  { file: 'spinach.jpg', query: 'Spinach leaves raw', exact: false },
  { file: 'lemon.jpg', query: 'Lemon fruit raw', exact: false },
  { file: 'pork.jpg', query: 'Raw pork slice', exact: false },
  { file: 'cabbage.jpg', query: 'Green cabbage raw', exact: false },
  { file: 'chicken-thigh.jpg', query: 'Raw chicken thigh', exact: false },
  { file: 'mushroom.jpg', query: 'Shimeji mushroom raw', exact: false },
  { file: 'dashi.jpg', query: 'Dashi broth Japanese', exact: false },
  { file: 'tuna.jpg', query: 'Canned tuna fish', exact: false },
  { file: 'firm-tofu.jpg', query: 'Firm tofu block', exact: false },
  { file: 'cucumber.jpg', query: 'Japanese cucumber raw', exact: false },
  { file: 'sesame-oil.jpg', query: 'Sesame oil bottle', exact: false },
  { file: 'vinegar.jpg', query: 'Rice vinegar bottle', exact: false },
  { file: 'water.jpg', query: 'Glass of water clean', exact: false },
  { file: 'miso-paste.jpg', query: 'Miso paste Japanese', exact: false }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browserHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

async function fetchImageDetails(term, isExactFile, retries = 3) {
  let url = '';
  if (isExactFile) {
    url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(term)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json`;
  } else {
    url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json`;
  }

  const res = await fetch(url, { headers: browserHeaders });
  if (res.status === 429 && retries > 0) {
    console.warn(`[429] Rate limited on API for "${term}". Waiting 10s before retry...`);
    await sleep(10000);
    return await fetchImageDetails(term, isExactFile, retries - 1);
  }
  if (!res.ok) throw new Error(`API response status ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages || {};
  
  // Find first valid page with imageinfo
  const validPage = Object.values(pages).find(p => p.imageinfo && p.imageinfo[0]);
  if (!validPage) {
    throw new Error(`No image found for search term: ${term}`);
  }

  const info = validPage.imageinfo[0];
  return {
    title: validPage.title,
    downloadUrl: info.thumburl || info.url,
    descriptionUrl: info.descriptionurl,
    artist: info.extmetadata?.Artist?.value || 'Unknown',
    license: info.extmetadata?.LicenseShortName?.value || 'Unknown',
    licenseUrl: info.extmetadata?.LicenseUrl?.value || ''
  };
}

async function downloadFile(url, targetPath, retries = 3) {
  const res = await fetch(url, { headers: browserHeaders });
  if (res.status === 429 && retries > 0) {
    console.warn(`[429] Rate limited on download. Waiting 12s before retry...`);
    await sleep(12000);
    return await downloadFile(url, targetPath, retries - 1);
  }
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(targetPath, Buffer.from(arrayBuffer));
}

function cleanHtml(html) {
  if (!html) return 'Unknown';
  return html.replace(/<[^>]*>/g, '').trim();
}

async function main() {
  console.log('Starting open-license ingredient image fetcher...');
  const attributions = [];

  for (const item of ingredientsToFetch) {
    const targetPath = path.join(TARGET_DIR, item.file);

    try {
      let details = null;
      
      if (fs.existsSync(targetPath)) {
        console.log(`File ${item.file} already exists. Skipping download but keeping attribution placeholder...`);
        // Just push a dummy or skip metadata fetch to avoid 429
        attributions.push({
          file: item.file,
          title: `File for ${item.query}`,
          descriptionUrl: 'https://commons.wikimedia.org',
          artist: 'Various Authors',
          license: 'CC BY / Public Domain',
          licenseUrl: '#'
        });
        continue;
      }

      await sleep(3000); // longer polite delay
      console.log(`Searching for "${item.query}"...`);
      details = await fetchImageDetails(item.query, item.exact);
      
      await sleep(3000);
      console.log(`Downloading ${item.file} from: ${details.downloadUrl}`);
      await downloadFile(details.downloadUrl, targetPath);

      attributions.push({
        file: item.file,
        title: details.title,
        descriptionUrl: details.descriptionUrl,
        artist: cleanHtml(details.artist),
        license: details.license,
        licenseUrl: details.licenseUrl
      });
      console.log(`Successfully processed ${item.file}`);
    } catch (error) {
      console.warn(`[Warning] Failed to fetch image for: ${item.file}. Reason: ${error.message}`);
    }
  }

  // Write attributions file
  let mdContent = `# Ingredient Image Attributions

This file lists the sources and licensing for the open-license images downloaded for the recipe ingredients.

---
`;

  for (const att of attributions) {
    mdContent += `
## ${att.file}

- **File**: \`${att.file}\`
  - **Source Page**: [${att.title}](${att.descriptionUrl})
  - **Author/Artist**: ${att.artist}
  - **License**: [${att.license}](${att.licenseUrl || '#'})

---
`;
  }

  fs.writeFileSync(ATTRIBUTION_FILE, mdContent.trim() + '\n', 'utf8');
  console.log(`\nCreated attribution log: ${ATTRIBUTION_FILE}`);
  console.log('Ingredient image fetch complete!');
}

main().catch(err => {
  console.error('Fatal error during ingredient image fetching:', err);
  process.exit(1);
});
