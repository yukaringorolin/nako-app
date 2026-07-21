const assert = require("node:assert/strict");
const menuShare = require("../src/core/menu-share.js");

function tx(en, mm = `MM ${en}`) {
  return { en, jp: `JP ${en}`, mm };
}

const recipes = [
  {
    id: "banana-toast",
    type: "human",
    title: tx("Banana Toast", "ငှက်ပျောသီးပေါင်မုန့်"),
    ingredients: [
      { key: "bread", name: tx("Bread", "ပေါင်မုန့်"), amount: tx("1 slice", "၁ ချပ်") },
      { key: "banana", name: tx("Banana", "ငှက်ပျောသီး"), amount: tx("1/2 banana", "ငှက်ပျောသီး ၁/၂ လုံး") }
    ]
  },
  {
    id: "egg-toast",
    shareSlug: "egg-toast-clean",
    type: "human",
    title: tx("Egg Toast", "ကြက်ဥပေါင်မုန့်"),
    ingredients: [
      { key: "bread", name: tx("bread", "ပေါင်မုန့်"), amount: tx("1 slice", "၁ ချပ်") },
      { key: "eggs", name: tx("Egg", "ကြက်ဥ"), amount: tx("1 egg", "ကြက်ဥ ၁ လုံး") },
      { key: "soy-sauce", name: tx("Soy sauce", "ပဲငံပြာရည်"), amount: tx("") }
    ]
  },
  { id: "dog-food", type: "dog", title: tx("Dog Food"), ingredients: [] }
];

assert.deepEqual(menuShare.normalizeSelection(["a", "a", "b", "c"], 2), ["a", "b"]);
assert.deepEqual(menuShare.normalizeSelection(["a"], 0), []);
assert.deepEqual(menuShare.toggleSelection([], "banana-toast", 2), ["banana-toast"]);
assert.deepEqual(menuShare.toggleSelection(["banana-toast"], "egg-toast", 2), ["banana-toast", "egg-toast"]);
assert.deepEqual(menuShare.toggleSelection(["banana-toast", "egg-toast"], "third", 2), ["banana-toast", "egg-toast"]);
assert.deepEqual(menuShare.toggleSelection(["banana-toast", "egg-toast"], "banana-toast", 2), ["egg-toast"]);

assert.deepEqual(
  menuShare.selectedRecipes(recipes, ["egg-toast", "missing", "dog-food", "banana-toast"]).map((recipe) => recipe.id),
  ["egg-toast", "banana-toast"]
);

const groups = menuShare.groupIngredients([recipes[0], recipes[1]], { language: "en", excludedIngredientKeys: [] });
assert.equal(groups.length, 4);
assert.equal(groups[0].name, "Egg");
const breadGroup = groups.find((group) => group.name === "Bread");
const soySauceGroup = groups.find((group) => group.name === "Soy sauce");
assert.deepEqual(breadGroup, {
  name: "Bread",
  uses: [
    { amount: "1 slice", recipeTitle: "Banana Toast" },
    { amount: "1 slice", recipeTitle: "Egg Toast" }
  ]
});
assert.equal(menuShare.formatIngredientLine(breadGroup), "- Bread");
assert.equal(menuShare.formatIngredientLine(soySauceGroup), "- Soy sauce");
assert.equal(menuShare.formatIngredientLine({
  name: "Soy sauce",
  uses: [
    { amount: "1 spoonful", recipeTitle: "Oyakodon" },
    { amount: "", recipeTitle: "Miso Nabe" }
  ]
}), "- Soy sauce");

const message = menuShare.buildMenuMessage({
  selectedIds: ["banana-toast", "egg-toast"],
  recipes,
  baseUrl: "https://nako-home-care.web.app/?preview=1#ignored",
  intro: "စားချင်တာ…",
  ingredientsHeading: "လိုအပ်သော ပါဝင်ပစ္စည်းများ:"
});

assert.equal(message, [
  "စားချင်တာ…",
  "- ငှက်ပျောသီးပေါင်မုန့် — https://nako-home-care.web.app/#recipe/banana-toast",
  "- ကြက်ဥပေါင်မုန့် — https://nako-home-care.web.app/#recipe/egg-toast-clean",
  "",
  "လိုအပ်သော ပါဝင်ပစ္စည်းများ:",
  "- ကြက်ဥ",
  "- ပေါင်မုန့်",
  "- ငှက်ပျောသီး"
].join("\n"));

const pantryIngredients = menuShare.groupIngredients([{
  title: tx("Pantry Test"),
  ingredients: [
    ...menuShare.DEFAULT_PANTRY_STAPLE_KEYS.map((key) => ({ key, name: tx(key), amount: tx("as needed") })),
    { key: "mirin", name: tx("Mirin"), amount: tx("1 tbsp") }
  ]
}], { language: "en" });
assert.deepEqual(pantryIngredients.map((group) => group.name), ["Mirin"]);

const orderedIngredients = menuShare.groupIngredients([
  {
    title: tx("First Recipe"),
    ingredients: [
      { key: "rice", name: tx("Rice"), amount: tx("1 bowl") },
      { key: "chicken-wings", name: tx("Chicken wings"), amount: tx("4") },
      { key: "tofu", name: tx("Firm tofu"), amount: tx("1 block") },
      { key: "cabbage", name: tx("Cabbage"), amount: tx("1/2 head") },
      { key: "pork", name: tx("Pork"), amount: tx("200 g") },
      { key: "eggs", name: tx("Eggs"), amount: tx("2") },
      { key: "tau-pok", name: tx("Tau Pok"), amount: tx("4") },
      { key: "beef", name: tx("Beef"), amount: tx("200 g") },
      { key: "squid", name: tx("Squid"), amount: tx("1") },
      { key: "salt", name: tx("Salt"), amount: tx("a little") },
      { key: "mirin", name: tx("Mirin"), amount: tx("1 tbsp") }
    ]
  },
  {
    title: tx("Second Recipe"),
    ingredients: [
      { key: "bread", name: tx("Bread"), amount: tx("2 slices") },
      { key: "chicken-wings", name: tx("Chicken wings"), amount: tx("6") }
    ]
  }
], { language: "en" });
assert.deepEqual(orderedIngredients.map((group) => group.name), [
  "Chicken wings",
  "Firm tofu",
  "Pork",
  "Eggs",
  "Tau Pok",
  "Beef",
  "Squid",
  "Rice",
  "Cabbage",
  "Mirin",
  "Bread"
]);
assert.equal(orderedIngredients[0].uses.length, 2);
assert.deepEqual(
  menuShare.groupIngredients([recipes[0]], { language: "en" }).map((group) => group.name),
  ["Bread", "Banana"]
);

assert.equal(menuShare.PROTEIN_INGREDIENT_KEYS instanceof Set, true);
assert.equal(Object.isFrozen(menuShare.PROTEIN_INGREDIENT_KEYS), true);
assert.equal(menuShare.PROTEIN_INGREDIENT_KEYS.has("chicken-wings"), true);
assert.equal(menuShare.PROTEIN_INGREDIENT_KEYS.has("eggs"), true);
assert.equal(menuShare.PROTEIN_INGREDIENT_KEYS.has("tofu"), true);
assert.throws(() => menuShare.PROTEIN_INGREDIENT_KEYS.add("milk"), /immutable/);

assert.equal(menuShare.DEFAULT_LANGUAGE, "mm");
assert.equal(menuShare.translatedText(tx("Egg", "ကြက်ဥ")), "ကြက်ဥ");
assert.equal(menuShare.buildMenuMessage({ selectedIds: [], recipes }), "");
assert.equal(menuShare.productionRecipeUrl("egg toast"), "https://nako-home-care.web.app/#recipe/egg%20toast");

async function testForwarding() {
  let sharedPayload = null;
  let copiedText = "";
  assert.equal(await menuShare.forwardMenuText("menu text", {
    share: async (payload) => { sharedPayload = payload; },
    copy: async (text) => { copiedText = text; }
  }), "shared");
  assert.deepEqual(sharedPayload, { text: "menu text" });
  assert.equal(copiedText, "");

  let copiedAfterCancel = false;
  const abortError = new Error("cancelled");
  abortError.name = "AbortError";
  assert.equal(await menuShare.forwardMenuText("menu text", {
    share: async () => { throw abortError; },
    copy: async () => { copiedAfterCancel = true; }
  }), "cancelled");
  assert.equal(copiedAfterCancel, false);

  assert.equal(await menuShare.forwardMenuText("menu text", {
    share: async () => { throw new Error("share failed"); },
    copy: async (text) => { copiedText = text; }
  }), "copied");
  assert.equal(copiedText, "menu text");

  assert.equal(await menuShare.forwardMenuText("menu text", {
    copy: async () => {}
  }), "copied");
  assert.equal(await menuShare.forwardMenuText("menu text", {
    share: async () => { throw new Error("share failed"); },
    copy: async () => { throw new Error("copy failed"); }
  }), "failed");
  assert.equal(await menuShare.forwardMenuText("", {}), "failed");
}

testForwarding()
  .then(() => console.log("Human Food menu sharing checks passed."))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
