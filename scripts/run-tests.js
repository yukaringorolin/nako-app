const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const testDir = path.join(__dirname, "..", "tests");
const tests = fs.readdirSync(testDir).filter((file) => file.endsWith(".test.js")).sort();
let failed = false;

for (const test of tests) {
  console.log(`\nRUN ${test}`);
  const result = spawnSync(process.execPath, [path.join(testDir, test)], { stdio: "inherit" });
  if (result.status !== 0) failed = true;
}

if (failed) process.exit(1);
console.log(`\nAll ${tests.length} test files passed.`);
