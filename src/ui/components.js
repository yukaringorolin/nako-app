/* ==========================================================================
   SECTION 4: RENDERERS - COMPONENT VIEWS & CARD BUILDERS
   ========================================================================== */
function renderHead(icon, title, description, iconBg, eyebrow, photo = null) {
  return `<section class="detail-head ${themeClass(iconBg)}">${renderLargeIcon(icon, photo)}<div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p class="lead">${esc(description)}</p></div></section>`;
}

function themeClass(value) {
  const themes = { "#fff0eb": "food", "#fef0ec": "food-safety", "#fff1f2": "daily", "#e7f6ee": "weekly", "#fff6df": "fortnightly", "#f2eefb": "monthly", "#e7f4f0": "quarterly" };
  return `theme-${themes[value] || value || "food"}`;
}

function renderSectionCard(section) {
  let count;
  let labelText;
  if (section.id === "food") {
    count = foodItems.length;
    labelText = label("foodItems");
  } else if (section.id === "food-safety") {
    count = foodSafetyItems.length + 1;
    labelText = label("safetyReferences");
  } else {
    count = routineTasks.filter((task) => task.frequencyBucket === section.id).length;
    labelText = label("routineItems");
  }
  return `<button class="category-card theme-${esc(section.id)}" data-section="${esc(section.id)}">${renderCardIcon(section.icon, sectionPhoto(section))}<span class="card-copy"><span class="card-title">${esc(tr(section.title))}</span><span class="card-description">${esc(tr(section.description))}</span><span class="card-meta"><span class="badge">${count} ${esc(labelText)}</span></span></span><span class="chevron">›</span></button>`;
}

function renderAdditionalResources() {
  if (!additionalResources?.items?.length) return "";
  return `<section class="additional-resources" aria-labelledby="additional-resources-title">
    <details class="resource-collection">
      <summary class="resource-section-head">
        <span class="resource-section-copy">
          <span id="additional-resources-title" class="section-label">${esc(tr(additionalResources.title))}</span>
          <span>${esc(tr(additionalResources.subtitle))}</span>
        </span>
        <span class="resource-count">${additionalResources.items.length}</span>
        <span class="resource-chevron" aria-hidden="true">›</span>
      </summary>
      <div class="resource-list">${additionalResources.items.map(renderResourceCard).join("")}</div>
    </details>
  </section>`;
}

function renderResourceCard(resource) {
  const embed = resource.embedUrl ? `<button class="resource-video resource-video-trigger" type="button" data-resource-video data-embed-url="${esc(resource.embedUrl)}" data-video-title="${esc(tr(resource.videoTitle))}" aria-label="${esc(tr(resource.watchLabel))}"><span aria-hidden="true">▶</span><span>${esc(tr(resource.watchLabel))}</span></button>` : "";
  const takeaways = Array.isArray(resource.takeaways) ? resource.takeaways : [];
  const slug = resource.title.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `<details class="resource-card" id="resource-${slug}">
    <summary class="resource-card-head">
      <span class="resource-icon" aria-hidden="true">${esc(resource.icon || "R")}</span>
      <span class="resource-card-copy">
        <h2>${esc(tr(resource.title))}</h2>
        <p class="resource-meta">${esc(tr(resource.source))}</p>
      </span>
      <span class="resource-chevron" aria-hidden="true">›</span>
    </summary>
    <div class="resource-card-body">
      <p class="resource-video-title">${esc(tr(resource.videoTitle))}</p>
      ${embed}
      <a class="resource-link" href="${esc(resource.youtubeUrl)}" target="_blank" rel="noopener noreferrer">${esc(tr(resource.watchLabel))} ↗</a>
      <p class="resource-description">${esc(tr(resource.description))}</p>
      <p class="resource-note">${esc(tr(resource.note))}</p>
      ${takeaways.length ? `<div class="resource-takeaways"><h3>${esc(tr(resource.takeawaysTitle))}</h3><ul>${takeaways.map((item) => `<li>${esc(tr(item))}</li>`).join("")}</ul></div>` : ""}
    </div>
  </details>`;
}

function renderFoodCard(item) {
  return `<button class="item-card theme-food" data-food="${esc(item.id)}">${renderCardIcon(item.icon, primaryPhoto(item.photos))}<span class="card-copy"><span class="card-title">${esc(tr(item.title))}</span><span class="card-description">${esc(tr(item.summary))}</span><span class="card-meta"><span class="badge">${esc(item.trackingMode === "future" ? label("futureTracking") : label("foodItems"))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderFoodSafetyCard(item, section) {
  return `<button class="item-card theme-${esc(section.id)}" data-food-safety="${esc(item.id)}">${renderCardIcon(item.icon, primaryPhoto(item.photos))}<span class="card-copy"><span class="card-title">${esc(tr(item.title))}</span><span class="card-description">${esc(tr(item.summary))}</span><span class="card-meta"><span class="badge">${esc(label("safetyReferences"))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderRoutineCard(task, section) {
  return `<button class="item-card routine-card theme-${esc(section.id)}" data-routine="${esc(task.id)}">${renderCardIcon(task.icon, primaryPhoto(task.photos))}<span class="card-copy"><span class="card-title">${esc(tr(task.title))}</span><span class="card-description">${esc(tr(task.summary))}</span><span class="card-meta"><span class="badge">${esc(tr(task.frequencyText))}</span></span></span><span class="chevron">›</span></button>`;
}

function renderRecipeCard(recipe) {
  const isHuman = recipe.type === "human";
  const mainPhoto = primaryPhoto(recipe.photos);

  if (isHuman) return renderHumanRecipeCard(recipe, mainPhoto);
  
  return `<button class="recipe-card" data-recipe="${esc(recipe.id)}">${renderCardIcon(recipe.icon, mainPhoto)}<span class="card-copy"><span class="card-title">${esc(tr(recipe.title))}</span><span class="card-description">${esc(tr(recipe.description))}</span></span><span class="chevron">›</span></button>`;
}

function renderHumanRecipeCard(recipe, mainPhoto) {
  const thumbnail = mainPhoto
    ? `<div class="recipe-card-banner"><img src="${esc(mainPhoto.src)}" alt="${esc(tr(mainPhoto.alt || mainPhoto.caption))}" loading="lazy" /></div>`
    : `<div class="recipe-card-banner recipe-card-placeholder" aria-hidden="true"><span>${esc(recipe.icon || "R")}</span></div>`;

  return `<button class="recipe-card human-recipe-card" data-recipe="${esc(recipe.id)}">${thumbnail}<div class="recipe-card-content"><span class="card-title">${esc(tr(recipe.title))}</span><div class="recipe-badges recipe-index-badges">${renderRecipeIndexBadges(recipe)}</div></div></button>`;
}

function renderRecipeIndexBadges(recipe) {
  let html = "";
  if (recipe.timeEstimate) {
    html += `<span class="badge time">${esc(tr(recipe.timeEstimate))}</span>`;
  }
  const secondaryBadge = recipe.demoStatus || recipe.mealType;
  if (secondaryBadge) {
    const secondaryClass = recipe.demoStatus ? "demo-status" : "meal-type";
    html += `<span class="badge ${secondaryClass}">${esc(tr(secondaryBadge))}</span>`;
  }
  return html;
}

function renderFoodMemory(item) {
  const memoryPhoto = primaryPhoto(item.photos);
  if (!memoryPhoto?.src) return "";
  const imageAlt = tr(memoryPhoto.alt || memoryPhoto.caption);
  return `<details class="food-memory">
    <summary class="food-memory-summary">
      <span class="food-memory-thumbnail"><img src="${esc(memoryPhoto.src)}" alt="" loading="lazy" /></span>
      <span class="food-memory-copy">
        <span class="food-memory-title">${esc(label("foodMemoryTitle"))}</span>
        <span class="food-memory-description">${esc(label("foodMemoryDescription"))}</span>
      </span>
      <span class="food-memory-chevron" aria-hidden="true">›</span>
    </summary>
    <figure class="food-memory-figure">
      <img src="${esc(memoryPhoto.src)}" alt="${esc(imageAlt)}" loading="lazy" />
      <figcaption>${esc(tr(memoryPhoto.caption))}</figcaption>
    </figure>
  </details>`;
}

function renderRecipeBadges(recipe) {
  let html = "";
  if (recipe.demoStatus) {
    html += `<span class="badge demo-status">${esc(tr(recipe.demoStatus))}</span>`;
  }
  if (recipe.mealType) {
    html += `<span class="badge meal-type">${esc(tr(recipe.mealType))}</span>`;
  }
  if (recipe.style) {
    html += `<span class="badge style">${esc(tr(recipe.style))}</span>`;
  }
  if (recipe.timeEstimate) {
    html += `<span class="badge time">${esc(tr(recipe.timeEstimate))}</span>`;
  }
  if (recipe.highProtein) {
    html += `<span class="badge protein">${esc(label("highProtein"))}</span>`;
  }
  return html;
}

function renderCardIcon(icon, photo = null) {
  if (photo?.src) return `<span class="card-icon image-icon"><img src="${esc(photo.src)}" alt="${esc(tr(photo.alt || photo.caption))}" loading="lazy" /></span>`;
  return `<span class="card-icon">${esc(icon)}</span>`;
}

function renderShortcutIcon(icon, photo = null) {
  if (photo?.src) return `<span class="shortcut-icon image-icon"><img src="${esc(photo.src)}" alt="${esc(tr(photo.alt || photo.caption))}" loading="lazy" /></span>`;
  return `<span class="shortcut-icon">${esc(icon)}</span>`;
}

function renderLargeIcon(icon, photo = null) {
  if (photo?.src) return `<div class="large-icon image-icon"><img src="${esc(photo.src)}" alt="${esc(tr(photo.alt || photo.caption))}" loading="lazy" /></div>`;
  return "";
}

function primaryPhoto(photos = []) {
  if (!Array.isArray(photos) || !photos.length) return null;
  // Return the first image that is not a video
  return photos.find(p => {
    const src = p.src.toLowerCase();
    return !src.endsWith('.mov') && !src.endsWith('.mp4') && !src.endsWith('.webm');
  }) || null;
}

function sectionPhoto(section) {
  return section.image ? { src: section.image, alt: section.title } : null;
}

function renderPinnedSafety() {
  const pinned = routineTasks.filter((task) => ["nako-emergency", "nako-kind-handling", "nako-supervision"].includes(task.id));
  return `<section class="rule-strip"><h2>${esc(label("pinnedSafety"))}</h2><div class="mini-list">${pinned.map((task) => `<button class="mini-link" data-routine="${esc(task.id)}">${esc(tr(task.title))}</button>`).join("")}</div></section>`;
}

function renderRulesPanel() {
  return `<section class="rule-strip"><h2>${esc(label("cookingRules"))}</h2><ul>${cookingRules.map((rule) => `<li>${esc(tr(rule))}</li>`).join("")}</ul></section>`;
}

function renderPhotos(photos = []) {
  if (!photos.length) return "";
  return `<section class="panel photo-panel"><h2>${esc(label("photos"))}</h2><div class="photo-guide">${photos.map(renderPhoto).join("")}</div></section>`;
}

function renderPhoto(photo) {
  const isVideo = photo.src.toLowerCase().endsWith('.mov') || photo.src.toLowerCase().endsWith('.mp4') || photo.src.toLowerCase().endsWith('.webm');
  if (isVideo) {
    return `<figure class="task-photo"><video src="${esc(photo.src)}" controls playsinline preload="metadata"></video><figcaption>${esc(tr(photo.caption))}</figcaption></figure>`;
  }
  return `<figure class="task-photo"><img src="${esc(photo.src)}" alt="${esc(tr(photo.alt || photo.caption))}" loading="lazy" /><figcaption>${esc(tr(photo.caption))}</figcaption></figure>`;
}

function renderIngredient(item, recipeId, ingredientIndex) {
  const choiceId = `${recipeId}:${ingredientIndex}`;
  const selectedKey = selectedIngredientChoices[choiceId] || item.key;
  const selectedOption = item.alternatives?.find((option) => option.key === selectedKey);
  const name = selectedOption?.name || item.name;
  const image = ingredientImage(selectedKey);
  const choices = item.alternatives?.length
    ? `<div class="ingredient-choice-group" role="group" aria-label="${esc(tr(item.name))}">${item.alternatives.map((option) => `<button class="ingredient-choice ${option.key === selectedKey ? "is-selected" : ""}" data-ingredient-choice data-ingredient-choice-id="${esc(choiceId)}" data-ingredient-key="${esc(option.key)}" aria-pressed="${option.key === selectedKey}">${esc(tr(option.name))}</button>`).join("")}</div>`
    : "";
  const imageHtml = image ? `<img src="${esc(image)}" alt="${esc(tr(name))}" loading="lazy" />` : "";

  if (item.macros) {
    const macrosText = `${item.macros.calories} kcal · P ${item.macros.protein}g · C ${item.macros.carbs}g · F ${item.macros.fat}g`;
    return `<li class="ingredient-row ${image ? "" : "without-image"}">${imageHtml}<div class="ingredient-copy"><div class="ingredient-details"><span class="ingredient-name">${esc(tr(name))}</span>${choices}</div><span class="ingredient-macros">${esc(macrosText)}</span></div><span class="amount">${esc(tr(item.amount))}</span></li>`;
  }

  return `<li class="ingredient-row ${image ? "" : "without-image"}">${imageHtml}<div class="ingredient-details"><span class="ingredient-name">${esc(tr(name))}</span>${choices}</div><span class="amount">${esc(tr(item.amount))}</span></li>`;
}

function orderedList(items) {
  const burmeseDigits = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
  return `<ol class="method-list">${items.map((item, index) => {
    let text = tr(item);
    const stepNum = index + 1;
    const stepNumBurmese = String(stepNum).split("").map(d => burmeseDigits[Number(d)] || d).join("");
    
    const enPrefix1 = stepNum + ". ";
    const enPrefix2 = stepNum + ".";
    const mmPrefix1 = stepNumBurmese + "။ ";
    const mmPrefix2 = stepNumBurmese + "။";
    
    if (text.startsWith(enPrefix1)) {
      text = text.substring(enPrefix1.length);
    } else if (text.startsWith(enPrefix2)) {
      text = text.substring(enPrefix2.length);
    } else if (text.startsWith(mmPrefix1)) {
      text = text.substring(mmPrefix1.length);
    } else if (text.startsWith(mmPrefix2)) {
      text = text.substring(mmPrefix2.length);
    }
    
    return `<li><span>${stepNum}.</span><span>${richText(text)}</span></li>`;
  }).join("")}</ol>`;
}

function noteList(items) {
  return `<ul class="note-list">${items.map((item) => `<li><span>•</span><span>${richText(tr(item))}</span></li>`).join("")}</ul>`;
}

function renderVideo(videoUrl, videoLabel) {
  if (!videoUrl) return "";
  if (videoUrl.includes("youtube.com/") || videoUrl.includes("youtube-nocookie.com/") || videoUrl.includes("/embed/")) {
    return `<section class="panel"><h2>${esc(label("video"))}</h2><div class="video-shell"><iframe src="${esc(videoUrl)}" title="${esc(label("video"))}" allowfullscreen></iframe></div></section>`;
  }
  const displayLabel = videoLabel ? tr(videoLabel) : label("video");
  return `<section class="panel"><h2>${esc(label("video"))}</h2><div class="video-link-row"><a class="resource-link" href="${esc(videoUrl)}" target="_blank" rel="noopener noreferrer">${esc(displayLabel)} ↗</a></div></section>`;
}

/* Nako's command, play and progress dashboard. */
