const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { POSTCARD_ORDER } = require("../src/core/gamification.js");

const root = path.join(__dirname, "..");
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, "src/data/helpers.js"), "utf8"), context);
vm.runInContext(`${fs.readFileSync(path.join(root, "src/data/gamification.js"), "utf8")};this.result=gamificationData;`, context);
const data = context.result;

assert.deepEqual(Array.from(data.postcards, (card) => card.id), POSTCARD_ORDER);
assert.equal(data.postcards.length, 12);

function webpDimensions(buffer) {
  assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
  assert.equal(buffer.toString("ascii", 8, 12), "WEBP");
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    assert.deepEqual([...buffer.subarray(23, 26)], [0x9d, 0x01, 0x2a]);
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
      alpha: false
    };
  }
  if (chunk === "VP8L") {
    const b1 = buffer[21];
    const b2 = buffer[22];
    const b3 = buffer[23];
    const b4 = buffer[24];
    return {
      width: 1 + (((b2 & 0x3f) << 8) | b1),
      height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6)),
      alpha: true
    };
  }
  if (chunk === "VP8X") {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
      alpha: Boolean(buffer[20] & 0x10)
    };
  }
  throw new Error(`Unsupported WebP chunk: ${chunk}`);
}

data.postcards.forEach((card) => {
  ["title", "description", "alt"].forEach((field) => {
    assert.ok(card[field].en && card[field].jp && card[field].mm, `${card.id}.${field} must be translated`);
  });
  const file = path.join(root, card.image);
  assert.equal(fs.existsSync(file), true, `${card.id} asset must exist`);
  const stats = fs.statSync(file);
  assert.ok(stats.size > 10 * 1024, `${card.id} asset should contain real artwork`);
  assert.ok(stats.size <= 200 * 1024, `${card.id} asset must be at most 200 KB`);
  const dimensions = webpDimensions(fs.readFileSync(file));
  assert.deepEqual({ width: dimensions.width, height: dimensions.height }, { width: 768, height: 768 });
  assert.equal(dimensions.alpha, false, `${card.id} should use a complete illustrated background, not transparency`);
});

const manifest = fs.readFileSync(path.join(root, "assets/gamification/ART_DIRECTION.md"), "utf8");
POSTCARD_ORDER.forEach((id) => assert.ok(manifest.includes("`" + id + "`"), `${id} must be documented`));
assert.match(manifest, /primary Nako identity and face reference/);
assert.match(manifest, /less than 200 KB/);

console.log("All 12 gamification postcards have valid metadata and optimized 768px WebP assets.");
