(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoSearch = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const SYNONYMS = {
    "weight": ["scale", "weigh", "kg", "grams", "重"],
    "dog": ["nako", "puppy", "pet", "犬"],
    "emergency": ["danger", "accident", "sick", "vomit", "diarrhea", "injury", "poison", "緊急"],
    "clean": ["wash", "sweep", "mop", "dust", "vacuum", "tidy", "wipe", "掃除"],
    "food": ["diet", "meal", "feed", "eat", "topping", "kibble", "ご飯", "エサ"]
  };

  // Helper to extract clean array of strings from translation object/array
  function extractStrings(value) {
    if (!value) return [];
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) {
      return value.flatMap(extractStrings);
    }
    if (typeof value === "object") {
      const parts = [];
      if (value.en) parts.push(value.en);
      if (value.jp) parts.push(value.jp);
      if (value.mm) parts.push(value.mm);
      return parts;
    }
    return [];
  }

  function slugify(text) {
    if (!text) return "";
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function normalizeSearchText(value) {
    if (typeof value !== "string") return "";
    // 1. Unicode NFKC normalization
    let normalized = value.normalize("NFKC");
    // 2. Lowercase
    normalized = normalized.toLowerCase();
    // 3. Punctuation normalization / replacement with space
    normalized = normalized.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, " ");
    // 4. Collapse whitespace
    normalized = normalized.replace(/\s+/g, " ").trim();
    // 5. Diacritic-insensitive matching for Latin characters
    normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalized;
  }

  function flattenTranslatedText(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      const parts = [];
      if (value.en) parts.push(value.en);
      if (value.jp) parts.push(value.jp);
      if (value.mm) parts.push(value.mm);
      return parts.join(" ");
    }
    return "";
  }

  function buildSearchFields(titleObj, summaryObj, bodyArray, extraArray) {
    const langs = ["en", "jp", "mm"];
    const searchable = {};
    for (const lang of langs) {
      const title = titleObj ? (titleObj[lang] || titleObj.en || "") : "";
      const summary = summaryObj ? (summaryObj[lang] || summaryObj.en || "") : "";
      
      const bodyParts = [];
      if (bodyArray) {
        for (const item of bodyArray) {
          if (!item) continue;
          if (typeof item === "string") bodyParts.push(item);
          else if (typeof item === "object") bodyParts.push(item[lang] || item.en || "");
        }
      }

      const extraParts = [];
      if (extraArray) {
        for (const item of extraArray) {
          if (!item) continue;
          if (typeof item === "string") extraParts.push(item);
          else if (typeof item === "object") extraParts.push(item[lang] || item.en || "");
        }
      }

      searchable[lang] = {
        title: normalizeSearchText(title),
        summary: normalizeSearchText(summary),
        body: normalizeSearchText(bodyParts.join(" ")),
        extras: extraParts.map(normalizeSearchText).filter(Boolean)
      };
    }
    return searchable;
  }

  function primaryPhoto(photos = []) {
    if (!Array.isArray(photos) || !photos.length) return null;
    return photos.find(p => {
      const src = p.src.toLowerCase();
      return !src.endsWith('.mov') && !src.endsWith('.mp4') && !src.endsWith('.webm');
    }) || null;
  }

  function buildSearchIndex(data) {
    const index = [];

    // 1. homeSections
    if (data.homeSections) {
      for (const item of data.homeSections) {
        index.push({
          id: `section-${item.id}`,
          type: "section",
          badge: "badgeSection",
          title: item.title,
          summary: item.description,
          icon: item.icon,
          photo: item.image ? { src: item.image, alt: flattenTranslatedText(item.title) } : null,
          route: `#section/${item.id}`,
          active: true,
          originalItem: item,
          searchable: buildSearchFields(item.title, item.description, null, null)
        });
      }
    }

    // 2. routineTasks
    if (data.routineTasks) {
      for (const item of data.routineTasks) {
        index.push({
          id: `routine-${item.id}`,
          type: "routine",
          badge: "badgeRoutine",
          title: item.title,
          summary: item.summary,
          icon: item.icon,
          photo: primaryPhoto(item.photos),
          route: `#routine/${item.id}`,
          active: item.active !== false,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            item.summary,
            [item.instructions, item.mustRemember].flat(),
            [item.tags, item.frequencyText].flat()
          )
        });
      }
    }

    // 3. foodItems
    if (data.foodItems) {
      for (const item of data.foodItems) {
        if (item.active === false) continue;
        index.push({
          id: `food-${item.id}`,
          type: "food",
          badge: "badgeFood",
          title: item.title,
          summary: item.summary,
          icon: item.icon,
          photo: primaryPhoto(item.photos),
          route: `#food/${item.id}`,
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            item.summary,
            [item.instructions, item.mustRemember].flat(),
            null
          )
        });
      }
    }

    // 4. foodSafetyItems
    if (data.foodSafetyItems) {
      const safetyItems = data.householdCookingRulesItem
        ? [data.householdCookingRulesItem, ...data.foodSafetyItems]
        : data.foodSafetyItems;
      for (const item of safetyItems) {
        index.push({
          id: `food-safety-${item.id}`,
          type: "food-safety",
          badge: "badgeFoodSafety",
          title: item.title,
          summary: item.summary,
          icon: item.icon,
          photo: primaryPhoto(item.photos),
          route: `#food-safety/${item.id}`,
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            item.summary,
            [item.instructions, item.mustRemember].flat(),
            null
          )
        });
      }
    }

    // 5. officialReferences
    if (data.officialReferences && data.officialReferences.items) {
      data.officialReferences.items.forEach((item, idx) => {
        index.push({
          id: `official-reference-${idx}`,
          type: "official-reference",
          badge: "badgeReference",
          title: item.title,
          summary: { en: item.url, jp: item.url, mm: item.url },
          icon: "🔗",
          photo: null,
          route: item.url,
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            null,
            [item.url],
            null
          )
        });
      });
    }

    // 6. recipes
    if (data.recipes) {
      for (const item of data.recipes) {
        const ingredientNames = item.ingredients.map(ing => ing.name);
        const ingredientAlts = item.ingredients.flatMap(ing => (ing.alternatives || []).map(alt => alt.name));
        index.push({
          id: `recipe-${item.id}`,
          type: "recipe",
          badge: "badgeRecipe",
          title: item.title,
          summary: item.description,
          icon: item.icon,
          photo: primaryPhoto(item.photos),
          route: `#recipe/${item.id}`,
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            item.description,
            [item.method, item.note].flat(),
            [ingredientNames, ingredientAlts].flat()
          )
        });
      }
    }

    // 7. cookingRules
    if (data.cookingRules) {
      data.cookingRules.forEach((item, idx) => {
        index.push({
          id: `cooking-rule-${idx}`,
          type: "cooking-rule",
          badge: "badgeFoodSafety",
          title: item,
          summary: { en: "Cooking Rule", jp: "料理のルール", mm: "ချက်ပြုတ်ခြင်းဆိုင်ရာ စည်းကမ်း" },
          icon: "!",
          photo: null,
          route: "#food-safety/household-cooking-rules",
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item,
            null,
            null,
            null
          )
        });
      });
    }

    // 8. additionalResources
    if (data.additionalResources && data.additionalResources.items) {
      for (const item of data.additionalResources.items) {
        const slug = slugify(flattenTranslatedText(item.title));
        index.push({
          id: `resource-${slug}`,
          type: "resource",
          badge: "badgeReference",
          title: item.title,
          summary: item.description,
          icon: item.icon,
          photo: null,
          route: "#home",
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            item.description,
            [item.source, item.videoTitle, item.note, item.takeawaysTitle, item.takeaways].flat(),
            null
          )
        });
      }
    }

    // 9. trainingData.commands
    if (data.trainingData && data.trainingData.commands) {
      for (const item of data.trainingData.commands) {
        index.push({
          id: `training-command-${item.id}`,
          type: "training-command",
          badge: "badgeTraining",
          title: item.title,
          summary: item.purpose,
          icon: "T",
          photo: null,
          route: `#routine/nako-training-fun`,
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            item.purpose,
            [item.priority, item.milestone, item.baselineComment, item.instructions, item.safety].flat(),
            [item.defaultCue, item.displayCue].flat()
          )
        });
      }
    }

    // 10. trainingData.activities
    if (data.trainingData && data.trainingData.activities) {
      for (const item of data.trainingData.activities) {
        index.push({
          id: `training-activity-${item.id}`,
          type: "training-activity",
          badge: "badgeTraining",
          title: item.title,
          summary: item.purpose,
          icon: "P",
          photo: null,
          route: `#routine/nako-training-fun`,
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            item.purpose,
            [item.intensity, item.steps, item.safety].flat(),
            null
          )
        });
      }
    }

    // 11. trainingData.videos
    if (data.trainingData && data.trainingData.videos) {
      for (const item of data.trainingData.videos) {
        index.push({
          id: `training-video-${item.id}`,
          type: "training-video",
          badge: "badgeTraining",
          title: item.title,
          summary: item.summary,
          icon: "▶",
          photo: null,
          route: `#routine/nako-training-fun`,
          active: true,
          originalItem: item,
          searchable: buildSearchFields(
            item.title,
            item.summary,
            [item.channel, item.duration, item.safety].flat(),
            null
          )
        });
      }
    }

    return index;
  }

  function editDistance(a, b) {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        dp[i][j] = Math.min(
          dp[i-1][j] + 1,
          dp[i][j-1] + 1,
          dp[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)
        );
      }
    }
    return dp[a.length][b.length];
  }

  function getSynonyms(token) {
    const synonyms = [token];
    for (const [key, values] of Object.entries(SYNONYMS)) {
      if (token === key || values.includes(token)) {
        if (!synonyms.includes(key)) synonyms.push(key);
        for (const val of values) {
          if (!synonyms.includes(val)) synonyms.push(val);
        }
      }
    }
    return synonyms;
  }

  function scoreSearchResult(item, queryTokens, queryNormalized) {
    if (!queryTokens.length) return 0;
    const langs = ["en", "jp", "mm"];
    let maxItemScore = 0;

    // We evaluate the score for each language and take the maximum
    for (const lang of langs) {
      const fieldData = item.searchable[lang];
      if (!fieldData) continue;

      let matchedTokens = 0;
      let hasExactOrPrefix = false;
      let baseScore = 0;

      // 1. Full string match on title (exact, prefix, contains)
      if (fieldData.title === queryNormalized) {
        baseScore = Math.max(baseScore, 100000);
        hasExactOrPrefix = true;
      } else if (fieldData.title.startsWith(queryNormalized)) {
        baseScore = Math.max(baseScore, 50000);
        hasExactOrPrefix = true;
      } else if (fieldData.title.includes(queryNormalized)) {
        baseScore = Math.max(baseScore, 25000);
        hasExactOrPrefix = true;
      }

      // 2. Full string match on summary / description
      if (fieldData.summary && fieldData.summary.includes(queryNormalized)) {
        baseScore = Math.max(baseScore, 4000);
        hasExactOrPrefix = true;
      }

      // 3. Full string match on body / instructions
      if (fieldData.body && fieldData.body.includes(queryNormalized)) {
        baseScore = Math.max(baseScore, 1000);
        hasExactOrPrefix = true;
      }

      // Check token by token matches (including synonyms and typo tolerance)
      for (const qToken of queryTokens) {
        const synonyms = getSynonyms(qToken);
        let tokenMatched = false;
        let tokenExactOrPrefix = false;
        let tokenWeight = 0;

        // Check if any synonym matches exactly, as prefix, or substring in fields
        for (const syn of synonyms) {
          // Check title
          if (fieldData.title === syn) {
            tokenMatched = true;
            tokenExactOrPrefix = true;
            tokenWeight = Math.max(tokenWeight, 1.0);
            baseScore = Math.max(baseScore, 25000);
          } else if (fieldData.title.startsWith(syn)) {
            tokenMatched = true;
            tokenExactOrPrefix = true;
            tokenWeight = Math.max(tokenWeight, 0.8);
            baseScore = Math.max(baseScore, 15000);
          } else if (fieldData.title.includes(syn)) {
            tokenMatched = true;
            tokenExactOrPrefix = true;
            tokenWeight = Math.max(tokenWeight, 0.6);
            baseScore = Math.max(baseScore, 10000);
          }

          // Check extras (aliases, tags, cues, ingredients)
          for (const ext of fieldData.extras) {
            if (ext === syn) {
              tokenMatched = true;
              tokenExactOrPrefix = true;
              tokenWeight = Math.max(tokenWeight, 0.5);
              baseScore = Math.max(baseScore, 12000);
            } else if (ext.startsWith(syn)) {
              tokenMatched = true;
              tokenExactOrPrefix = true;
              tokenWeight = Math.max(tokenWeight, 0.4);
              baseScore = Math.max(baseScore, 10000);
            } else if (ext.includes(syn)) {
              tokenMatched = true;
              tokenExactOrPrefix = true;
              tokenWeight = Math.max(tokenWeight, 0.35);
              baseScore = Math.max(baseScore, 8000);
            }
          }

          // Check summary
          if (fieldData.summary && fieldData.summary.includes(syn)) {
            tokenMatched = true;
            tokenExactOrPrefix = true;
            tokenWeight = Math.max(tokenWeight, 0.3);
            baseScore = Math.max(baseScore, 3000);
          }

          // Check body
          if (fieldData.body && fieldData.body.includes(syn)) {
            tokenMatched = true;
            tokenExactOrPrefix = true;
            tokenWeight = Math.max(tokenWeight, 0.1);
            baseScore = Math.max(baseScore, 500);
          }
        }

        // 4. Typo tolerance check if no exact/prefix match was found for this token
        // Only for Latin-script tokens of length >= 5
        if (!tokenMatched && /^[a-z]+$/.test(qToken) && qToken.length >= 5) {
          // Tokenize item fields to find close matches
          const allItemTokens = [
            fieldData.title.split(" "),
            fieldData.summary.split(" "),
            fieldData.body.split(" "),
            fieldData.extras.flatMap(e => e.split(" "))
          ].flat().filter(Boolean);

          const maxDist = qToken.length >= 8 ? 2 : 1;
          for (const iToken of allItemTokens) {
            if (/^[a-z]+$/.test(iToken)) {
              const dist = editDistance(qToken, iToken);
              if (dist <= maxDist) {
                tokenMatched = true;
                tokenWeight = Math.max(tokenWeight, 0.01);
                baseScore = Math.max(baseScore, 10);
                break;
              }
            }
          }
        }

        if (tokenMatched) {
          matchedTokens++;
          if (tokenExactOrPrefix) {
            tokenExactOrPrefix = true;
            hasExactOrPrefix = true;
          }
        }
      }

      if (matchedTokens > 0) {
        let finalScore = baseScore;

        // Apply full token match bonus
        if (matchedTokens === queryTokens.length) {
          finalScore += 1000000;
        }

        // Apply penalty if match is fuzzy-only
        if (!hasExactOrPrefix) {
          finalScore *= 0.0001;
        }

        // Apply penalty for inactive routine definitions
        if (item.type === "routine" && !item.active) {
          finalScore *= 0.00001;
        }

        if (finalScore > maxItemScore) {
          maxItemScore = finalScore;
        }
      }
    }

    return maxItemScore;
  }

  function searchIndex(index, query) {
    const queryNormalized = normalizeSearchText(query);
    if (!queryNormalized) return [];

    const queryTokens = queryNormalized.split(" ").filter(Boolean);
    if (!queryTokens.length) return [];

    const scored = [];
    for (const item of index) {
      const score = scoreSearchResult(item, queryTokens, queryNormalized);
      if (score > 0) {
        scored.push({ item, score });
      }
    }

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Limit to 10 high-quality results
    const results = [];
    const seenRoutes = new Set();
    for (const entry of scored) {
      // Avoid duplicate results for the same destination
      const routeKey = `${entry.item.type}:${entry.item.route}:${entry.item.id}`;
      if (!seenRoutes.has(routeKey)) {
        seenRoutes.add(routeKey);
        results.push(entry.item);
      }
      if (results.length >= 10) break;
    }

    return results;
  }

  return {
    normalizeSearchText,
    flattenTranslatedText,
    buildSearchIndex,
    scoreSearchResult,
    searchIndex
  };
});
