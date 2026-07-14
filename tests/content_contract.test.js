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

const routineById = (id) => data.routineTasks.find((task) => task.id === id);
const recipeById = (id) => data.recipes.find((recipe) => recipe.id === id);
const englishText = (items) => items.map((item) => item.en).join("\n");

assert.equal(routineById("essential-food-stock").title.en, "Essential Food Stock");
assert.equal(routineById("sofa-hair-room-corner-cleaning").title.en, "Sofa Hair & Room-Corner Spot Cleaning");
assert.match(routineById("nako-feeding-water").summary.en, /60 g Royal Canin/);
assert.match(routineById("nako-feeding-water").summary.en, /1 chicken-and-vegetable topping cube per meal/);
assert.doesNotMatch(routineById("nako-feeding-water").summary.en, /K9 Natural/);
assert.match(englishText(routineById("general-window-safety").mustRemember), /grilles do not make the area completely safe/);
assert.match(routineById("windows-glass-mirrors").summary.en, /interior side/);
assert.match(englishText(routineById("floor-mats").mustRemember), /downstairs neighbour's clothes/);
const mailDeliveries = routineById("mail-deliveries");
assert.equal(mailDeliveries.instructions.length, 4);
assert.match(englishText(mailDeliveries.instructions), /Do not leave them outside where they could be stolen/);
assert.match(englishText(mailDeliveries.instructions), /When instructed to remove packaging/);
assert.match(englishText(mailDeliveries.instructions), /If unsure whether to keep the packaging, keep it/);
assert.doesNotMatch(englishText(mailDeliveries.mustRemember), /Unpack everything outside/);
assert.match(englishText(mailDeliveries.mustRemember), /Discard the first water, drink, or food output/);
assert.deepEqual(Array.from(mailDeliveries.photos, (item) => item.src), [
  "assets/routines/nako-delivery-unpack-when-instructed.jpg",
  "assets/routines/nako-delivery-wipe-item.jpg"
]);
assert.match(englishText(routineById("nako-training-fun").mustRemember), /exchange it for a treat/);
assert.match(englishText(routineById("outside-shoe-rack").mustRemember), /dry fully/);
assert.match(englishText(routineById("daily-cooking").mustRemember), /main power switch/);

const weightTracking = routineById("nako-weight-tracking");
assert.match(weightTracking.summary.en, /Only weigh her when awake/);
assert.match(englishText(weightTracking.mustRemember), /Do not wake Nako/);
assert.equal(weightTracking.instructions.length, 4);
assert.match(englishText(weightTracking.instructions), /Subtract your weight from the total/);
assert.deepEqual(Array.from(weightTracking.photos, (item) => item.src), [
  "assets/routines/nako-weight-person-only.jpg",
  "assets/routines/nako-weight-carrying-nako.jpg"
]);

const bedroomsLinens = routineById("bedrooms-linens");
assert.equal(bedroomsLinens.instructions.length, 7);
assert.match(englishText(bedroomsLinens.instructions), /chair—not on the floor/);
assert.match(englishText(bedroomsLinens.instructions), /dedicated bedding vacuum only/);
assert.match(englishText(bedroomsLinens.instructions), /The Knight Super King mattress \(183 × 198 cm\)/);
assert.match(englishText(bedroomsLinens.mustRemember), /must not remain on the white bed-frame handlebar/);
assert.equal(bedroomsLinens.photos.length, 6);
assert.equal(routineById("pillow-mattress-vacuuming").active, false);

const oyakodon = recipeById("chicken-oyakodon-no-onion");
assert.equal(oyakodon.title.en, "Oyakodon (Chicken & Egg Rice Bowl)");
assert.ok(oyakodon.ingredients.some((item) => item.key === "honey"));
assert.match(englishText(oyakodon.method), /hot water/);

const chickenWings = recipeById("air-fryer-chicken-wings");
assert.equal(chickenWings.title.en, "Air-Fryer Chicken Wings");
assert.ok(chickenWings.ingredients.some((item) => item.key === "chicken-wings"));
assert.match(englishText(chickenWings.method), /200.*20 minutes/);

const pendingDemoRecipeIds = [
  "chicken-teriyaki-rice",
  "salmon-shioyaki-set",
  "pork-shogayaki-no-onion",
  "tuna-tofu-egg-rice",
  "chicken-soboro-don",
  "chicken-miso-nabe"
];
const humanRecipes = data.recipes.filter((recipe) => recipe.type === "human");
assert.deepEqual(Array.from(humanRecipes.slice(-pendingDemoRecipeIds.length), (recipe) => recipe.id), pendingDemoRecipeIds);
for (const id of pendingDemoRecipeIds) {
  const demoStatus = recipeById(id).demoStatus;
  assert.equal(demoStatus.en, "Pending demo");
  assert.ok(demoStatus.jp && demoStatus.mm);
}
assert.equal(recipeById("egg-toast").demoStatus, undefined);
assert.equal(recipeById("air-fryer-chicken-wings").demoStatus, undefined);

console.log("Copy source and compatibility checks passed.");
