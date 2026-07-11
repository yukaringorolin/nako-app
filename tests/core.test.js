const assert = require("node:assert/strict");
const router = require("../src/core/router.js");
const html = require("../src/core/html.js");
const storage = require("../src/core/storage.js");
const dates = require("../src/core/dates.js");

assert.deepEqual(router.parseRouteHash("#section/weekly"), { view: "section", sectionId: "weekly" });
assert.deepEqual(router.parseRouteHash("#/routine/nako-weight-tracking"), { view: "routine", routineId: "nako-weight-tracking" });
assert.deepEqual(router.parseRouteHash("#routine-checkin"), { view: "routine-checkin" });
assert.deepEqual(router.parseRouteHash("#unknown/path"), { view: "home" });
const registry = router.createRouteRegistry({ home: () => "home" });
assert.equal(registry.home(), "home");
assert.ok(Object.isFrozen(registry));

assert.equal(html.escapeHtml('<script>"x"</script>'), "&lt;script&gt;&quot;x&quot;&lt;/script&gt;");
assert.equal(html.simpleRichText("Use **care** <now>"), "Use <strong>care</strong> &lt;now&gt;");

const memory = new Map([["nako-care-state-v2", JSON.stringify({ diary: { entries: { old: true } } })]]);
const safe = storage.createSafeStorage({ getItem: (key) => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value), removeItem: (key) => memory.delete(key) });
assert.deepEqual(storage.loadJson(safe, "nako-care-state-v2"), { diary: { entries: { old: true } } });
assert.equal(safe.setItem("language", "mm"), true);
assert.equal(safe.getItem("language"), "mm");

assert.equal(dates.WEIGHT_TRACKING_START, "2026-07-12");
assert.equal(dates.dateToKey(new Date(2026, 6, 12)), "2026-07-12");
assert.equal(dates.sundaysForYear(2026)[0].getTime(), new Date(2026, 6, 12).getTime());
assert.equal(dates.sundaysForYear(2025).length, 0);

console.log("Core routing, storage, HTML, and date checks passed.");
