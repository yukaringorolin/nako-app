import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const TARGET_DIR = path.join(ROOT_DIR, 'assets/recipes/human-food');
const ATTRIBUTION_FILE = path.join(TARGET_DIR, 'ATTRIBUTIONS.md');

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const recipesToFetch = [
  {
    id: 'chicken-teriyaki-rice-bowl',
    queries: [
      { key: 'main', term: 'Bowl of Teriyaki chicken and beef YakinikuCNE.jpg', exactFile: true }
    ]
  },
  {
    id: 'salmon-shioyaki-protein-set',
    queries: [
      { key: 'main', term: 'Grilled Salmon (16802375986).jpg', exactFile: true }
    ]
  },
  {
    id: 'pork-shogayaki-no-onion',
    queries: [
      { key: 'main', term: 'Shogayaki 002.jpg', exactFile: true }
    ]
  },
  {
    id: 'chicken-oyakodon-no-onion',
    queries: [
      { key: 'main', term: 'Oyakodon 005.jpg', exactFile: true }
    ]
  },
  {
    id: 'tuna-tofu-egg-rice-bowl',
    queries: [
      { key: 'main', term: 'Spicy tuna rice bowl (35032450572).jpg', exactFile: true }
    ]
  },
  {
    id: 'chicken-soboro-don',
    queries: [
      { key: 'main', term: 'Tori-soboro-don,seasoned-chicken-powder,japan.JPG', exactFile: true }
    ]
  },
  {
    id: 'chicken-miso-nabe',
    queries: [
      { key: 'main', term: 'Chankonabe.jpg', exactFile: true }
    ]
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browserHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

async function fetchImageDetails(term, isExactFile) {
  let url = '';
  if (isExactFile) {
    url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(term)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json`;
  } else {
    url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json`;
  }

  const res = await fetch(url, { headers: browserHeaders });
  const data = await res.json();
  const pages = data?.query?.pages || {};
  const pageId = Object.keys(pages)[0];

  if (!pageId || pageId === '-1') {
    throw new Error(`No image found for search term: ${term}`);
  }

  const page = pages[pageId];
  const info = page.imageinfo[0];
  return {
    title: page.title,
    downloadUrl: info.thumburl || info.url,
    descriptionUrl: info.descriptionurl,
    artist: info.extmetadata?.Artist?.value || 'Unknown',
    license: info.extmetadata?.LicenseShortName?.value || 'Unknown',
    licenseUrl: info.extmetadata?.LicenseUrl?.value || ''
  };
}

async function downloadFile(url, targetPath) {
  const res = await fetch(url, { headers: browserHeaders });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(targetPath, Buffer.from(arrayBuffer));
}

function cleanHtml(html) {
  if (!html) return 'Unknown';
  return html.replace(/<[^>]*>/g, '').trim();
}

async function main() {
  console.log('Starting open-license food image fetcher (resuming downloads)...');
  const attributions = [];

  for (const recipe of recipesToFetch) {
    console.log(`\nProcessing recipe: ${recipe.id}`);
    for (const query of recipe.queries) {
      const filename = `${recipe.id}-${query.key}.jpg`;
      const targetPath = path.join(TARGET_DIR, filename);

      try {
        let details = null;
        
        // If image exists already, fetch details but skip download to prevent rate limit (429)
        if (fs.existsSync(targetPath)) {
          console.log(`File ${filename} already exists. Fetching metadata for attribution...`);
          await sleep(1500);
          details = await fetchImageDetails(query.term, query.exactFile);
        } else {
          await sleep(3000); // 3s delay for downloading to prevent 429
          console.log(`Searching for "${query.term}"...`);
          details = await fetchImageDetails(query.term, query.exactFile);
          
          await sleep(3000);
          console.log(`Downloading ${filename} from: ${details.downloadUrl}`);
          await downloadFile(details.downloadUrl, targetPath);
        }

        attributions.push({
          recipeId: recipe.id,
          filename,
          title: details.title,
          descriptionUrl: details.descriptionUrl,
          artist: cleanHtml(details.artist),
          license: details.license,
          licenseUrl: details.licenseUrl
        });
        console.log(`Successfully processed ${filename}`);
      } catch (error) {
        console.warn(`[Warning] Failed to fetch image for recipe: ${recipe.id} (${query.key}). Reason: ${error.message}`);
      }
    }
  }

  // Write attributions file
  let mdContent = `# Image Attributions

This file lists the sources and licensing for the open-license images downloaded for the Human Food section.

---
`;

  for (const recipe of recipesToFetch) {
    const recipeAtts = attributions.filter(a => a.recipeId === recipe.id);
    if (recipeAtts.length === 0) continue;

    mdContent += `\n## ${recipe.id}\n\n`;
    for (const att of recipeAtts) {
      mdContent += `- **File**: \`${att.filename}\`
  - **Source Page**: [${att.title}](${att.descriptionUrl})
  - **Author/Artist**: ${att.artist}
  - **License**: [${att.license}](${att.licenseUrl || '#'})

---
`;
    }
  }

  fs.writeFileSync(ATTRIBUTION_FILE, mdContent.trim() + '\n', 'utf8');
  console.log(`\nCreated attribution log: ${ATTRIBUTION_FILE}`);
  console.log('Image fetch complete!');
}

main().catch(err => {
  console.error('Fatal error during image fetching:', err);
  process.exit(1);
});
