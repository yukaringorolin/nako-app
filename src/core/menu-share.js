(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoMenuShare = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const DEFAULT_MAX_SELECTIONS = 5;
  const DEFAULT_LANGUAGE = "mm";
  const PRODUCTION_BASE_URL = "https://nako-home-care.web.app/";
  const DEFAULT_PANTRY_STAPLE_KEYS = Object.freeze([
    "water",
    "soy-sauce",
    "dark-soy-sauce",
    "salt",
    "sesame-oil",
    "oil",
    "sugar",
    "black-pepper",
    "garlic-pepper",
    "steak-pepper"
  ]);
  const PROTEIN_INGREDIENT_KEYS = immutableKeySet([
    "chicken-tender",
    "chicken-minced",
    "chicken-breast",
    "chicken-thigh",
    "chicken-wings",
    "pork",
    "pork-shoulder",
    "pork-loin",
    "pork-ribs",
    "pork-belly",
    "beef",
    "wagyu-steak",
    "ham",
    "salmon-or-meat",
    "whitefish",
    "salmon-fillet",
    "tuna",
    "crab-stick",
    "squid",
    "prawns",
    "fish-cake",
    "eggs",
    "tofu",
    "tau-pok",
    "cooked-protein"
  ]);

  function immutableKeySet(values) {
    const keys = new Set(values);
    const rejectMutation = () => { throw new TypeError("This key set is immutable"); };
    Object.defineProperties(keys, {
      add: { value: rejectMutation },
      delete: { value: rejectMutation },
      clear: { value: rejectMutation }
    });
    return Object.freeze(keys);
  }

  function translatedText(value, language = DEFAULT_LANGUAGE) {
    return String(typeof value === "string" ? value : (value?.[language] || value?.en || "")).trim();
  }

  function normalizeSelection(selectedIds, maxSelections = DEFAULT_MAX_SELECTIONS) {
    const limit = Math.max(0, Number(maxSelections) || 0);
    if (!limit) return [];
    const normalized = [];
    for (const value of Array.isArray(selectedIds) ? selectedIds : []) {
      const id = String(value || "").trim();
      if (!id || normalized.includes(id)) continue;
      normalized.push(id);
      if (normalized.length >= limit) break;
    }
    return normalized;
  }

  function toggleSelection(selectedIds, recipeId, maxSelections = DEFAULT_MAX_SELECTIONS) {
    const current = normalizeSelection(selectedIds, maxSelections);
    const id = String(recipeId || "").trim();
    if (!id) return current;
    if (current.includes(id)) return current.filter((item) => item !== id);
    if (current.length >= Math.max(0, Number(maxSelections) || 0)) return current;
    return [...current, id];
  }

  function selectedRecipes(recipes, selectedIds) {
    const byId = new Map((Array.isArray(recipes) ? recipes : []).map((recipe) => [recipe.id, recipe]));
    return normalizeSelection(selectedIds, Number.MAX_SAFE_INTEGER)
      .map((id) => byId.get(id))
      .filter((recipe) => recipe?.type === "human");
  }

  function groupIngredients(recipes, options = {}) {
    const language = options.language || DEFAULT_LANGUAGE;
    const locale = language === "jp" ? "ja-JP" : language === "mm" ? "my" : "en-US";
    const excludedKeys = new Set(
      (options.excludedIngredientKeys ?? DEFAULT_PANTRY_STAPLE_KEYS)
        .map((key) => String(key || "").trim().toLocaleLowerCase("en-US"))
        .filter(Boolean)
    );
    const groups = [];
    const byName = new Map();
    const proteinGroups = new Set();

    for (const recipe of Array.isArray(recipes) ? recipes : []) {
      const recipeTitle = translatedText(recipe?.title, language);
      for (const ingredient of Array.isArray(recipe?.ingredients) ? recipe.ingredients : []) {
        const ingredientKey = String(ingredient?.key || "").trim().toLocaleLowerCase("en-US");
        if (ingredientKey && excludedKeys.has(ingredientKey)) continue;
        const name = translatedText(ingredient?.name, language);
        if (!name) continue;
        const nameKey = name.toLocaleLowerCase(locale);
        let group = byName.get(nameKey);
        if (!group) {
          group = { name, uses: [] };
          byName.set(nameKey, group);
          groups.push(group);
        }
        if (PROTEIN_INGREDIENT_KEYS.has(ingredientKey)) proteinGroups.add(group);
        group.uses.push({ amount: translatedText(ingredient?.amount, language), recipeTitle });
      }
    }

    return [
      ...groups.filter((group) => proteinGroups.has(group)),
      ...groups.filter((group) => !proteinGroups.has(group))
    ];
  }

  function productionRecipeUrl(recipeId, baseUrl = PRODUCTION_BASE_URL) {
    const rootUrl = String(baseUrl || PRODUCTION_BASE_URL)
      .replace(/[?#].*$/, "")
      .replace(/\/?$/, "/");
    return `${rootUrl}#recipe/${encodeURIComponent(String(recipeId || ""))}`;
  }

  function formatIngredientLine(group) {
    return `- ${group.name}`;
  }

  function buildMenuMessage(options = {}) {
    const recipes = selectedRecipes(options.recipes, options.selectedIds);
    if (!recipes.length) return "";
    const language = options.language || DEFAULT_LANGUAGE;
    const intro = String(options.intro || "").trim();
    const ingredientsHeading = String(options.ingredientsHeading || "").trim();
    const foodLines = recipes.map((recipe) => `- ${translatedText(recipe.title, language)} — ${productionRecipeUrl(recipe.shareSlug || recipe.id, options.baseUrl)}`);
    const ingredientLines = groupIngredients(recipes, {
      language,
      excludedIngredientKeys: options.excludedIngredientKeys
    }).map(formatIngredientLine);
    return [intro, ...foodLines, "", ingredientsHeading, ...ingredientLines].join("\n");
  }

  async function forwardMenuText(message, dependencies = {}) {
    const text = String(message || "").trim();
    if (!text) return "failed";

    if (typeof dependencies.share === "function") {
      try {
        await dependencies.share({ text });
        return "shared";
      } catch (error) {
        if (error?.name === "AbortError") return "cancelled";
      }
    }

    if (typeof dependencies.copy === "function") {
      try {
        await dependencies.copy(text);
        return "copied";
      } catch {}
    }

    return "failed";
  }

  return {
    DEFAULT_MAX_SELECTIONS,
    DEFAULT_LANGUAGE,
    PRODUCTION_BASE_URL,
    DEFAULT_PANTRY_STAPLE_KEYS,
    PROTEIN_INGREDIENT_KEYS,
    translatedText,
    normalizeSelection,
    toggleSelection,
    selectedRecipes,
    groupIngredients,
    productionRecipeUrl,
    formatIngredientLine,
    buildMenuMessage,
    forwardMenuText
  };
});
