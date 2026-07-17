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

const humanFood = data.foodItems.find((item) => item.id === "human-food");
assert.equal(humanFood.id, "human-food");
assert.equal(humanFood.photos[0].src, "assets/sections/human-food-memories-2024.jpg");
assert.match(humanFood.photos[0].alt.en, /Yukari.*meals.*2024/);
assert.ok(humanFood.photos[0].alt.jp && humanFood.photos[0].alt.mm);
assert.ok(humanFood.photos[0].caption.en && humanFood.photos[0].caption.jp && humanFood.photos[0].caption.mm);
assert.equal(data.ui.en.foodMemoryTitle, "Food Memories 2024");
assert.ok(data.ui.jp.foodMemoryTitle && data.ui.mm.foodMemoryTitle);
assert.ok(data.ui.en.foodMemoryDescription && data.ui.jp.foodMemoryDescription && data.ui.mm.foodMemoryDescription);

const googleCalendarCheck = routineById("google-calendar-check");
assert.equal(googleCalendarCheck.icon, "CAL");
assert.equal(googleCalendarCheck.photos[0].src, "assets/routines/google-calendar-check.png");
assert.ok(googleCalendarCheck.photos[0].alt.en && googleCalendarCheck.photos[0].alt.jp && googleCalendarCheck.photos[0].alt.mm);

const householdNakoSupplies = routineById("household-supplies-online");
assert.equal(householdNakoSupplies.title.en, "Household/Nako Supplies & Online Orders");
assert.match(householdNakoSupplies.summary.en, /Check household and Nako supplies weekly/);
assert.match(englishText(householdNakoSupplies.mustRemember), /Nako's food, pee pads, wipes, and poop bags every week/);
assert.match(englishText(householdNakoSupplies.mustRemember), /Tell Edwin early before any household or Nako supplies fully run out/);
assert.ok(householdNakoSupplies.photos.some((item) => item.src === "assets/sections/nako-inventory.png"));
const legacyNakoInventory = data.foodItems.find((item) => item.id === "nako-inventory");
assert.equal(legacyNakoInventory.active, false);
assert.equal(legacyNakoInventory.canonicalRoute, "#routine/household-supplies-online");
const legacyNakoEmergency = data.foodItems.find((item) => item.id === "nako-emergency");
assert.equal(legacyNakoEmergency.active, false);
assert.equal(legacyNakoEmergency.canonicalRoute, "#routine/nako-emergency");
const nakoEmergency = routineById("nako-emergency");
assert.equal(nakoEmergency.frequencyBucket, "daily");
assert.equal(nakoEmergency.photos[0].src, "assets/sections/nako-emergency.png");
const pageSource = fs.readFileSync(path.join(root, "src", "features", "pages.js"), "utf8");
assert.match(pageSource, /if \(item\.canonicalRoute\) return go\(item\.canonicalRoute\)/);
assert.match(pageSource, /\$\{cards\}\s+\$\{dailySafety\}/);
const componentSource = fs.readFileSync(path.join(root, "src", "ui", "components.js"), "utf8");
assert.match(componentSource, /const safetyIds = \["nako-supervision", "nako-kind-handling", "nako-emergency"\]/);
const stylesSource = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");
assert.match(stylesSource, /\.daily-safety-section\s*\{/);

const drinkingWaterPrep = routineById("drinking-water-prep");
assert.match(drinkingWaterPrep.summary.en, /Tiger MAA-A302.*fresh boiling water/);
assert.match(englishText(drinkingWaterPrep.mustRemember), /74°C or above after 10 hours.*59°C or above after 24 hours/);
assert.match(englishText(drinkingWaterPrep.mustRemember), /after 2 days, pour it away/);
assert.deepEqual(Array.from(drinkingWaterPrep.photos, (item) => item.src), [
  "assets/routines/drinking-water-prep-tiger-maa-a302.jpg",
  "assets/routines/drinking-water-prep-tiger-refill.jpg",
  "assets/routines/drinking-water-prep-kettle.jpg",
  "assets/routines/drinking-water-prep-fridge-bottles.jpg"
]);

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
const rubbish = routineById("rubbish");
assert.match(englishText(rubbish.mustRemember), /normal bagged household rubbish down the rubbish chute/);
assert.match(englishText(rubbish.mustRemember), /Do not force large or bulky rubbish.*delivery packaging.*into the chute/);
assert.deepEqual(Array.from(rubbish.photos, (item) => item.src), [
  "assets/routines/nako-rubbish-bin-daily.jpg",
  "assets/routines/nako-rubbish-downstairs-large-items.jpg"
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
assert.equal(bedroomsLinens.photos.length, 8);
assert.ok(bedroomsLinens.photos.some((item) => item.src === "assets/routines/nako-bedsheets-changing-bolster-cover.jpg"));
const weeklyLinenWashPhoto = bedroomsLinens.photos.find((item) => item.src === "assets/routines/nako-bedsheets-weekly-wash.jpg");
assert.ok(weeklyLinenWashPhoto);
assert.match(weeklyLinenWashPhoto.caption.en, /bedsheet, blankets, pillowcases, and bolster covers/);
assert.ok(weeklyLinenWashPhoto.caption.jp && weeklyLinenWashPhoto.caption.mm);
assert.equal(routineById("pillow-mattress-vacuuming").active, false);
assert.equal(routineById("essential-food-stock").active, false);

const vimleSofaBed = routineById("vimle-sofa-bed");
assert.equal(vimleSofaBed.frequencyBucket, "as-needed");
assert.equal(vimleSofaBed.trackingMode, "none");
assert.match(vimleSofaBed.summary.en, /Gunnared beige IKEA VIMLE 2-seat/);
assert.equal(vimleSofaBed.instructions.length, 16);
assert.match(englishText(vimleSofaBed.instructions), /241 cm from the back of the sofa/);
assert.match(englishText(vimleSofaBed.instructions), /Pull the orange loop straight UP first/);
assert.match(englishText(vimleSofaBed.instructions), /bottom leg rests steadily on the floor/);
assert.match(englishText(vimleSofaBed.instructions), /dedicated mattress vacuum cleaner/);
assert.match(englishText(vimleSofaBed.instructions), /Put on the bedsheet/);
assert.match(englishText(vimleSofaBed.instructions), /Leave the orange loop visible on top/);
assert.match(englishText(vimleSofaBed.mustRemember), /side hinges and folding joints/);
assert.deepEqual(Array.from(vimleSofaBed.photos, (item) => item.src), [
  "assets/routines/vimle-sofa-bed-closed.jpg",
  "assets/routines/vimle-sofa-bed-orange-loop.jpg",
  "assets/routines/vimle-sofa-bed-open.jpg"
]);

const groceryShopping = routineById("grocery-shopping");
assert.doesNotMatch(englishText(groceryShopping.mustRemember), /NTUC|QR code/i);
assert.ok(!groceryShopping.photos.some((item) => /ntuc|qr/i.test(item.src)));
assert.ok(groceryShopping.photos.some((item) => item.src === "assets/routines/grocery-shopping-wet-market-prawns.jpg"));

const laundromat = routineById("laundromat-heavy-items");
assert.equal(laundromat.frequencyBucket, "as-needed");
assert.equal(laundromat.trackingMode, "none");
assert.match(laundromat.summary.en, /bulky.*curtains/i);
assert.match(englishText(laundromat.mustRemember), /Edwin.*exact washer setting|exact washer setting.*Edwin/i);
assert.match(englishText(laundromat.mustRemember), /\$2.*\$5.*\$10.*\$1 coins/);
assert.deepEqual(Array.from(laundromat.photos, (item) => item.src), [
  "assets/routines/laundromat-washer-price-list.jpg",
  "assets/routines/laundromat-coin-change-machine.jpg"
]);

const uploadSharedAlbum = routineById("upload-shared-album");
const asNeededTasks = data.routineTasks
  .filter((task) => task.frequencyBucket === "as-needed")
  .sort((a, b) => a.sortOrder - b.sortOrder);
assert.equal(asNeededTasks[0].id, uploadSharedAlbum.id, "Shared-album uploads must stay first on the As Needed page");

const essentialFoodStock = routineById("essential-food-stock");
assert.ok(essentialFoodStock.photos.some((item) => item.src === "assets/routines/essential-food-stock-bananas.jpg"));

const bakKutTeh = recipeById("bak-kut-teh");
assert.ok(bakKutTeh.photos.some((item) => item.src === "assets/recipes/human-food/bak-kut-teh-wet-market-cuts.jpg"));
assert.ok(bakKutTeh.photos.some((item) => item.src === "assets/recipes/human-food/bak-kut-teh-market-stall-landmark.jpg"));
assert.ok(bakKutTeh.photos.some((item) => item.src === "assets/recipes/human-food/bak-kut-teh-spice-sachet-vendor.jpg"));

const oyakodon = recipeById("chicken-oyakodon-no-onion");
assert.equal(oyakodon.title.en, "Oyakodon (Chicken & Egg Rice Bowl)");
assert.ok(oyakodon.ingredients.some((item) => item.key === "honey"));
assert.match(englishText(oyakodon.method), /hot water/);
assert.equal(oyakodon.demoStatus.en, "Pending demo");

const chickenWings = recipeById("air-fryer-chicken-wings");
assert.equal(chickenWings.title.en, "Air-Fryer Chicken Wings");
assert.ok(chickenWings.ingredients.some((item) => item.key === "chicken-wings"));
assert.match(englishText(chickenWings.method), /200.*20 minutes/);
assert.deepEqual(Array.from(chickenWings.photos, (item) => item.src), [
  "assets/recipes/human-food/air-fryer-chicken-wings-served.jpg",
  "assets/recipes/human-food/air-fryer-chicken-wings-wet-market-stall.jpg",
  "assets/recipes/human-food/air-fryer-chicken-wings-marinating-pot.jpg"
]);

const pendingDemoRecipeIds = [
  "pork-shogayaki-no-onion",
  "chicken-oyakodon-no-onion",
  "chicken-miso-nabe",
  "soy-marinated-eggs-chilli",
  "knorr-chicken-quick-serve-macaroni",
  "sushiroll",
  "simple-wagyu-steak",
  "japanese-curry-rice",
  "beef-mushroom-egg-bowl",
  "soy-braised-beef-egg",
  "onigiri-rice-balls",
  "clean-yukari-style-salad",
  "love-bentos-by-yukari",
  "shogatsu-osechi"
];
const humanRecipes = data.recipes.filter((recipe) => recipe.type === "human");
assert.equal(humanRecipes.filter((recipe) => Boolean(recipe.demoStatus)).length, pendingDemoRecipeIds.length);
assert.deepEqual(Array.from(humanRecipes.slice(-pendingDemoRecipeIds.length), (recipe) => recipe.id), pendingDemoRecipeIds);
for (const id of pendingDemoRecipeIds) {
  const demoStatus = recipeById(id).demoStatus;
  assert.equal(demoStatus.en, "Pending demo");
  assert.ok(demoStatus.jp && demoStatus.mm);
}
assert.equal(recipeById("egg-toast").demoStatus, undefined);
assert.equal(recipeById("air-fryer-chicken-wings").demoStatus, undefined);

const soyMarinatedEggs = recipeById("soy-marinated-eggs-chilli");
assert.equal(soyMarinatedEggs.title.en, "Soy-Marinated Eggs with Chilli (10 Eggs)");
assert.equal(soyMarinatedEggs.demoStatus.en, "Pending demo");
assert.ok(soyMarinatedEggs.ingredients.some((item) => item.key === "eggs" && item.amount.en === "10"));
assert.deepEqual(Array.from(soyMarinatedEggs.ingredients, (item) => item.key), [
  "eggs", "soy-sauce", "water", "mirin", "honey", "sesame-oil", "fresh-chilli", "spring-onion"
]);
assert.ok(!soyMarinatedEggs.ingredients.some((item) => item.key === "garlic" || item.key === "sesame"));
assert.match(soyMarinatedEggs.note.en, /finish within 3 days/);
assert.match(soyMarinatedEggs.note.en, /Do not add garlic or sesame seeds/);
assert.deepEqual(Array.from(soyMarinatedEggs.photos, (item) => item.src), [
  "assets/recipes/human-food/soy-marinated-eggs-chilli.png"
]);

const knorrMacaroni = recipeById("knorr-chicken-quick-serve-macaroni");
assert.equal(knorrMacaroni.title.en, "Knorr Chicken Quick Serve Macaroni Breakfast");
assert.equal(knorrMacaroni.demoStatus.en, "Pending demo");
assert.deepEqual(Array.from(knorrMacaroni.ingredients, (item) => item.key), [
  "knorr-quick-serve-macaroni", "ham", "water"
]);
assert.ok(knorrMacaroni.ingredients.some((item) => item.key === "knorr-quick-serve-macaroni" && item.amount.en === "2 packets"));
assert.ok(knorrMacaroni.ingredients.some((item) => item.key === "water" && item.amount.en === "1 litre"));
assert.match(englishText(knorrMacaroni.method), /about 3 minutes/);
assert.match(englishText(knorrMacaroni.method), /last 30 seconds/);
assert.match(englishText(knorrMacaroni.method), /both seasoning packets/);
assert.match(knorrMacaroni.note.en, /FairPrice link is for the Japanese Pork Bone variant/);
assert.deepEqual(Array.from(knorrMacaroni.photos, (item) => item.src), [
  "assets/recipes/human-food/knorr-chicken-quick-serve-macaroni-served.png",
  "assets/recipes/human-food/knorr-quick-serve-macaroni-packets.png"
]);

const porkShoulder = recipeById("salt-garlic-pepper-pork-shoulder");
assert.equal(porkShoulder.title.en, "Salt and Garlic Pepper Pork Shoulders");
assert.equal(porkShoulder.demoStatus, undefined);
assert.ok(porkShoulder.ingredients.some((item) => item.key === "pork-shoulder" && item.amount.en === "2 slices"));
assert.ok(porkShoulder.ingredients.some((item) => item.key === "garlic-pepper"));
assert.match(englishText(porkShoulder.method), /Cut Butchery.*Bukit Timah Plaza/);
assert.equal(englishText(porkShoulder.method).match(/200°C for (?:another )?6 min/g)?.length, 2);
assert.match(englishText(porkShoulder.method), /at least 71°C/);
assert.match(englishText(porkShoulder.method), /Rest for 5 min/);
assert.equal(porkShoulder.photos.length, 6);

const matchaMilk = recipeById("matcha-milk-manuka-honey");
assert.equal(matchaMilk.title.en, "Matcha Milk with Manuka Honey");
assert.equal(matchaMilk.demoStatus, undefined);
assert.deepEqual(Array.from(matchaMilk.ingredients, (item) => item.key), ["matcha", "milk", "honey"]);
assert.equal(matchaMilk.ingredients[0].amount.en, "2 g");
assert.equal(matchaMilk.ingredients[1].amount.en, "200 ml");
assert.match(englishText(matchaMilk.method), /Manuka honey to taste/);
assert.deepEqual(Array.from(matchaMilk.photos, (item) => item.src), [
  "assets/recipes/human-food/matcha-milk-manuka-honey.jpg"
]);

const appleGingerPork = recipeById("apple-ginger-pork-loin-enoki");
assert.equal(appleGingerPork.title.en, "Apple-Ginger Pork Loin with Enoki");
assert.equal(appleGingerPork.demoStatus, undefined);
assert.deepEqual(Array.from(appleGingerPork.ingredients, (item) => item.key), [
  "pork-loin", "apple", "enoki-mushroom", "ginger", "garlic", "potato-starch",
  "dashi-soy-sauce", "cooking-sake", "honey", "sesame-oil", "water", "oil"
]);
assert.match(englishText(appleGingerPork.method), /Grate 1\/4 apple/);
assert.match(englishText(appleGingerPork.method), /sauce, apple wedges, and enoki/);
assert.match(englishText(appleGingerPork.method), /at least 71°C/);
assert.match(appleGingerPork.note.en, /Do not add onion/);
assert.equal(appleGingerPork.photos.length, 6);

console.log("Copy source and compatibility checks passed.");
