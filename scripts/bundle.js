const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src/data');
const INGREDIENT_CATALOG_FILE = path.join(ROOT_DIR, 'src/ingredient_catalog.js');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src/data.js');

const filesToBundle = [
  'helpers.js',
  'ui.js',
  'sections.js',
  'cooking_rules.js',
  'additional_resources.js',
  'food_items.js',
  'routine_tasks.js',
  'training.js',
  'recipes.js',
  'check_translations.js'
];

try {
  console.log('Starting data.js bundle...');
  let combinedContent = '(function () {\n';

  for (const filename of filesToBundle) {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Required file not found: ${filePath}`);
    }
    console.log(`Bundling ${filename}...`);
    const content = fs.readFileSync(filePath, 'utf8');
    combinedContent += content + '\n\n';
  }

  if (!fs.existsSync(INGREDIENT_CATALOG_FILE)) {
    throw new Error(`Required ingredient catalog not found: ${INGREDIENT_CATALOG_FILE}`);
  }
  console.log('Bundling ingredient_catalog.js...');
  combinedContent += fs.readFileSync(INGREDIENT_CATALOG_FILE, 'utf8') + '\n\n';

  // Append export registration and check logic
  combinedContent += `window.nakoData = { 
  langs: ["en", "jp", "mm"], 
  ui, 
  homeSections, 
  foodItems, 
  routineTasks, 
  recipes, 
  cookingRules,
  additionalResources,
  trainingData,
  checkTranslations
};

// Automatic validation in local testing
if (typeof window !== "undefined") {
  const missing = checkTranslations();
  if (missing.length > 0) {
    console.warn(\`[Translation Warning] Found \${missing.length} missing/untranslated strings. Run window.nakoData.checkTranslations() in console for details.\`);
  }
}

})();
`;

  fs.writeFileSync(OUTPUT_FILE, combinedContent, 'utf8');
  console.log(`Successfully bundled data.js (Size: ${fs.statSync(OUTPUT_FILE).size} bytes)`);
} catch (error) {
  console.error('Error during data.js bundle:', error);
  process.exit(1);
}
