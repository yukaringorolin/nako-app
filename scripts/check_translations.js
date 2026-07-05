const fs = require('fs');
const path = require('path');

// Read the database content
const dataPath = path.join(__dirname, '../src/data.js');
if (!fs.existsSync(dataPath)) {
  console.error(`Error: Could not find data.js at ${dataPath}`);
  process.exit(1);
}

const content = fs.readFileSync(dataPath, 'utf8');

// Mock window object
const window = {};

// Evaluate the database code
try {
  eval(content);
} catch (err) {
  console.error("Error evaluating src/data.js:", err);
  process.exit(1);
}

const nakoData = window.nakoData;
if (!nakoData || typeof nakoData.checkTranslations !== 'function') {
  console.error("Error: window.nakoData or checkTranslations is not defined after evaluation!");
  process.exit(1);
}

// Execute check
const missing = nakoData.checkTranslations();

if (missing.length > 0) {
  console.error("\x1b[31m[Translation Reconciliation Check FAILED]\x1b[0m");
  console.error(`Found ${missing.length} missing or untranslated keys:`);
  console.log("");
  console.table(missing);
  process.exit(1);
} else {
  console.log("\x1b[32m[Translation Reconciliation Check PASSED]\x1b[0m All translations are complete and verified!");
  process.exit(0);
}
