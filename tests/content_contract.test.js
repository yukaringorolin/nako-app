const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "src", "data.js"), "utf8"), context);
const data = context.window.nakoData;

assert.deepEqual(Object.keys(data.ui.jp).sort(), Object.keys(data.ui.en).sort());
assert.deepEqual(Object.keys(data.ui.mm).sort(), Object.keys(data.ui.en).sort());
assert.equal(data.ui.en.homeEyebrow, "Helper guide");
assert.ok(data.trainingData.rules.length >= 6);
for (const rule of data.trainingData.rules) {
  assert.ok(rule.en && rule.jp && rule.mm);
  assert.notEqual(rule.en, rule.jp);
  assert.notEqual(rule.en, rule.mm);
}
for (const task of data.routineTasks) {
  assert.ok(!task.instructions.some((step) => step.en === task.summary.en && step.jp === task.summary.jp && step.mm === task.summary.mm), `${task.id} repeats its summary`);
}
const appSource = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
assert.match(appSource, /const STATE_KEY = "nako-care-state-v2"/);
const firebaseSource = fs.readFileSync(path.join(root, "src", "firebase.js"), "utf8");
assert.match(firebaseSource, /const HOUSEHOLD_ID = "our-dog-nako"/);

console.log("Copy source and compatibility checks passed.");
