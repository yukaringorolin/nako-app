// Global Translation Reconciliation Check Function
function checkTranslations() {
  const missing = [];
  const ui = window.nakoData.ui;
  const allowSameAsEnglish = new Set([
    "Nako Home Care"
  ]);
  const shouldCheck = (value) => value && !allowSameAsEnglish.has(value);
  const addIssue = (type, key, english, flags) => {
    missing.push({ type, key, english, ...flags });
  };
  const placeholders = (value) => [...new Set(String(value || "").match(/\{[^{}]+\}/g) || [])];
  const checkPlaceholderParity = (english, translated, language, path) => {
    const missingPlaceholders = placeholders(english).filter((token) => !placeholders(translated).includes(token));
    if (missingPlaceholders.length) {
      addIssue(`Placeholder (${language.toUpperCase()})`, path, english, {
        reason: `Missing ${missingPlaceholders.join(", ")}`
      });
    }
  };
  const checkBurmeseQuality = (value, path, english) => {
    const problems = [];
    if (/[\u0E00-\u0E7F]/u.test(value)) problems.push("Thai characters");
    if (/[\u3040-\u30FF\u3400-\u9FFF]/u.test(value)) problems.push("Japanese characters");
    if (/[\u3000-\u303F]/u.test(value)) problems.push("Japanese punctuation");
    if (problems.length) {
      addIssue("Content quality (MM)", path, english, {
        invalidMmScript: true,
        reason: problems.join(", ")
      });
    }
  };
  
  // 1. Check UI Keys
  for (const key in ui.en) {
    const val = ui.en[key];
    if (!shouldCheck(val)) continue;

    if (!ui.jp[key] || ui.jp[key] === val) {
      addIssue("UI Key (JP)", `ui.jp.${key}`, val, { missingJp: !ui.jp[key], sameAsEnglishJp: ui.jp[key] === val });
    }
    if (!ui.mm[key] || ui.mm[key] === val) {
      addIssue("UI Key (MM)", `ui.mm.${key}`, val, { missingMm: !ui.mm[key], sameAsEnglishMm: ui.mm[key] === val });
    }
    checkPlaceholderParity(val, ui.jp[key], "jp", `ui.jp.${key}`);
    checkPlaceholderParity(val, ui.mm[key], "mm", `ui.mm.${key}`);
    checkBurmeseQuality(ui.mm[key] || "", `ui.mm.${key}`, val);
  }

  // 2. Check Database Objects
  const checkObj = (obj, path) => {
    if (!obj || typeof obj !== "object") return;
    // Official video titles and channel names are source metadata, so retain the
    // verified YouTube spelling rather than translating or flagging those names.
    if (path?.startsWith("trainingData.videos") && (path.endsWith(".title") || path.endsWith(".channel"))) return;
    if (obj.en !== undefined) {
      if (shouldCheck(obj.en)) {
        if (obj._missingJp || !obj.jp || obj.jp === obj.en) {
          addIssue("Content (JP)", path, obj.en, { missingJp: obj._missingJp || !obj.jp, sameAsEnglishJp: obj.jp === obj.en });
        }
        if (obj._missingMm || !obj.mm || obj.mm === obj.en) {
          addIssue("Content (MM)", path, obj.en, { missingMm: obj._missingMm || !obj.mm, sameAsEnglishMm: obj.mm === obj.en });
        }
        checkPlaceholderParity(obj.en, obj.jp, "jp", `${path}.jp`);
        checkPlaceholderParity(obj.en, obj.mm, "mm", `${path}.mm`);
        checkBurmeseQuality(obj.mm || "", `${path}.mm`, obj.en);
      }
      return;
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        checkObj(obj[key], path ? `${path}.${key}` : key);
      }
    }
  };

  checkObj(window.nakoData.homeSections, "homeSections");
  checkObj(window.nakoData.cookingRules, "cookingRules");
  checkObj(window.nakoData.householdCookingRulesItem, "householdCookingRulesItem");
  checkObj(window.nakoData.foodItems, "foodItems");
  checkObj(window.nakoData.foodSafetyItems, "foodSafetyItems");
  checkObj(window.nakoData.officialReferences, "officialReferences");
  checkObj(window.nakoData.routineTasks, "routineTasks");
  checkObj(window.nakoData.recipes, "recipes");
  checkObj(window.nakoData.additionalResources, "additionalResources");
  checkObj(window.nakoData.trainingData, "trainingData");

  // Quantities such as "100g" are language-neutral. Any amount containing
  // user-facing words must use t(en, jp, mm) so the renderer can localize it.
  const languageNeutralAmount = /^(?:—|\d+(?:\.\d+)?\s*(?:g|kg|ml|l))$/i;
  window.nakoData.recipes.forEach((recipe, recipeIndex) => {
    recipe.ingredients.forEach((item, ingredientIndex) => {
      if (typeof item.amount === "string" && !languageNeutralAmount.test(item.amount.trim())) {
        addIssue(
          "Plain user-facing string",
          `recipes.${recipeIndex}.ingredients.${ingredientIndex}.amount`,
          item.amount,
          { plainString: true, reason: "Textual recipe amounts must use t(en, jp, mm)" }
        );
      }
    });
  });

  return missing;
}
