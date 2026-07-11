const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const dataPath = path.join(root, "src", "data.js");
const before = fs.readFileSync(dataPath, "utf8");
const result = spawnSync(process.execPath, [path.join(__dirname, "bundle.js")], { encoding: "utf8" });
if (result.status !== 0) {
  process.stdout.write(result.stdout || "");
  process.stderr.write(result.stderr || "");
  process.exit(result.status || 1);
}
const after = fs.readFileSync(dataPath, "utf8");
if (before !== after) {
  console.error("src/data.js was stale. Run npm run build:data and commit the result.");
  process.exit(1);
}
console.log("Generated src/data.js is fresh.");
