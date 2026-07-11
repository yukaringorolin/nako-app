/* ==========================================================================
   SECTION 7: GLOBAL SEARCH CONTROLLERS & RENDERING
   ========================================================================== */
function renderSearchComponent() {
  let dropdownHtml = "";
  if (searchFocused) {
    dropdownHtml = getSearchDropdownHtml();
  }
  return `
    <div class="search-container">
      <div class="search-bar" role="combobox" aria-expanded="${searchFocused ? 'true' : 'false'}" aria-controls="search-results-panel" aria-haspopup="listbox">
        <span class="search-icon-wrapper" aria-hidden="true">🔍</span>
        <input type="search" class="search-input" id="global-search-input" placeholder="${esc(label("searchPlaceholder"))}" value="${esc(searchQuery)}" aria-label="${esc(label("searchLabel"))}" autocomplete="off" aria-autocomplete="list" />
        ${searchQuery ? `<button type="button" class="search-clear-btn" aria-label="${esc(label("clearSearch"))}">×</button>` : ""}
      </div>
      <div id="search-results-container">${dropdownHtml}</div>
    </div>
  `;
}

function getSearchDropdownHtml() {
  if (!searchQuery) {
    return `
      <div id="search-results-panel" class="search-results-panel" role="listbox" aria-label="${esc(label("quickFind"))}">
        <div class="search-quickfind-title">${esc(label("quickFind"))}</div>
        <div class="search-result-list">
          ${renderQuickFindItem("nako-emergency", "🚨", "nakoEmergency", "#routine/nako-emergency", 0)}
          ${renderQuickFindItem("nako-weight", "⚖️", "shortcutNakoWeight", "#routine/nako-weight-tracking", 1)}
          ${renderQuickFindItem("routine-checkin", "✓", "routineCheckIn", "#routine-checkin", 2)}
          ${renderQuickFindItem("dog-training", "T", "shortcutDogTraining", "#routine/nako-training-fun", 3)}
          ${renderQuickFindItem("food-safety", "🛡️", "safetyReferences", "#section/food-safety", 4)}
          ${renderQuickFindItem("nako-toppings", "R", "shortcutNakoToppings", "#food/recipes", 5)}
        </div>
      </div>
    `;
  }

  const results = window.nakoSearch.searchIndex(searchIndex, searchQuery);
  searchResults = results;
  if (results.length > 0) {
    return `
      <div class="search-status-bar" role="status" aria-live="polite">
        ${results.length === 1 ? esc(label("resultCountOne")) : esc(labelWith("resultCount", { count: results.length }))}
      </div>
      <div id="search-results-panel" class="search-results-panel" role="listbox" aria-label="${esc(label("searchResults"))}">
        <div class="search-result-list">
          ${results.map((res, index) => renderSearchResultItem(res, index)).join("")}
        </div>
      </div>
    `;
  } else {
    return `
      <div id="search-results-panel" class="search-results-panel">
        <div class="search-empty-state" role="status" aria-live="polite">
          <span class="search-empty-icon" aria-hidden="true">🔍</span>
          <div class="search-empty-title">${esc(label("noResults"))}</div>
          <div class="search-empty-subtitle">${esc(label("tryAnotherKeyword"))}</div>
        </div>
      </div>
    `;
  }
}

function renderQuickFindItem(id, icon, labelKey, route, index) {
  const isSelected = selectedResultIndex === index;
  const labelText = label(labelKey);
  return `
    <button class="search-result-item ${isSelected ? "is-selected" : ""}" 
      type="button" 
      data-search-quick="${esc(id)}" 
      data-search-route="${esc(route)}"
      role="option" 
      id="search-option-${index}"
      aria-selected="${isSelected ? "true" : "false"}">
      <span class="search-item-icon" aria-hidden="true">${esc(icon)}</span>
      <span class="search-item-content">
        <span class="search-item-title">${esc(labelText)}</span>
      </span>
    </button>
  `;
}

function renderSearchResultItem(result, index) {
  const displayTitle = tr(result.title);
  const displaySnippet = tr(result.summary);
  const badgeText = label(result.badge);
  const isSelected = selectedResultIndex === index;

  const photoHtml = result.photo && result.photo.src
    ? `<img class="search-item-photo" src="${esc(result.photo.src)}" alt="${esc(tr(result.photo.alt || result.photo.caption))}" />`
    : `<span class="search-item-icon" aria-hidden="true">${esc(result.icon || "•")}</span>`;

  return `
    <button class="search-result-item ${isSelected ? "is-selected" : ""}" 
      type="button" 
      data-search-result-id="${esc(result.id)}" 
      role="option" 
      id="search-option-${index}"
      aria-selected="${isSelected ? "true" : "false"}">
      ${photoHtml}
      <span class="search-item-content">
        <span class="search-item-header">
          <span class="search-item-title">${highlightText(displayTitle, searchQuery)}</span>
          <span class="search-item-badge">${esc(badgeText)}</span>
        </span>
        <span class="search-item-snippet">${highlightText(displaySnippet, searchQuery)}</span>
      </span>
    </button>
  `;
}

function highlightText(text, query) {
  return window.nakoSearchHighlight.highlightText(text, query, window.nakoSearch.normalizeSearchText);
}

function navigateToDestination(route, destination) {
  window.nakoSearchNavigation.navigateToDestination(route, destination, {
    setPendingDestination: (value) => { pendingDestination = value; },
    navigate: go
  });
}

function updateSearchResultsDropdown() {
  const container = document.getElementById("search-results-container");
  if (!container) return;
  
  const searchBar = document.querySelector(".search-bar");
  if (searchBar) {
    searchBar.setAttribute("aria-expanded", searchFocused ? "true" : "false");
    
    let clearBtn = searchBar.querySelector(".search-clear-btn");
    if (searchQuery) {
      if (!clearBtn) {
        const btnHtml = `<button type="button" class="search-clear-btn" aria-label="${esc(label("clearSearch"))}">×</button>`;
        searchBar.insertAdjacentHTML("beforeend", btnHtml);
      }
    } else {
      if (clearBtn) {
        clearBtn.remove();
      }
    }
  }

  if (searchFocused) {
    container.innerHTML = getSearchDropdownHtml();
  } else {
    container.innerHTML = "";
  }
}

function handleKeydown(event) {
  const activeInput = document.activeElement;
  if (!activeInput || activeInput.id !== "global-search-input") return;

  const resultsPanel = document.getElementById("search-results-panel");
  if (!resultsPanel) return;

  const items = resultsPanel.querySelectorAll(".search-result-item");
  if (!items.length) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectedResultIndex = (selectedResultIndex + 1) % items.length;
    highlightKeyboardSelection(items);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    selectedResultIndex = (selectedResultIndex - 1 + items.length) % items.length;
    highlightKeyboardSelection(items);
  } else if (event.key === "Enter") {
    event.preventDefault();
    const activeIndex = selectedResultIndex >= 0 ? selectedResultIndex : 0;
    const targetItem = items[activeIndex];
    if (targetItem) {
      targetItem.click();
    }
  } else if (event.key === "Escape") {
    event.preventDefault();
    searchFocused = false;
    activeInput.blur();
    updateSearchResultsDropdown();
  }
}

function highlightKeyboardSelection(items) {
  items.forEach((item, index) => {
    if (index === selectedResultIndex) {
      item.classList.add("is-selected");
      item.setAttribute("aria-selected", "true");
      item.scrollIntoView({ block: "nearest" });
      
      const input = document.getElementById("global-search-input");
      if (input) {
        input.setAttribute("aria-activedescendant", `search-option-${index}`);
      }
    } else {
      item.classList.remove("is-selected");
      item.setAttribute("aria-selected", "false");
    }
  });
}

function handleFocusIn(event) {
  if (event.target.id === "global-search-input") {
    searchFocused = true;
    selectedResultIndex = -1;
    updateSearchResultsDropdown();
  }
}

function navigateToSearchResult(result) {
  searchQuery = "";
  searchFocused = false;
  selectedResultIndex = -1;
  searchResults = [];

  if (result.type === "section") {
    go(`#section/${result.originalItem.id}`);
  } else if (result.type === "routine") {
    go(`#routine/${result.originalItem.id}`);
  } else if (result.type === "food") {
    go(`#food/${result.originalItem.id}`);
  } else if (result.type === "food-safety") {
    go(`#food-safety/${result.originalItem.id}`);
  } else if (result.type === "recipe") {
    go(`#recipe/${result.originalItem.id}`);
  } else if (result.type === "cooking-rule") {
    navigateToDestination(`#food-safety/household-cooking-rules`, { type: "cooking-rule", index: result.id.replace("cooking-rule-", "") });
  } else if (result.type === "official-reference") {
    window.open(result.route, "_blank", "noopener,noreferrer");
  } else if (result.type === "resource") {
    navigateToDestination("", { type: "resource", id: result.id.replace("resource-", "") });
  } else if (result.type === "training-command") {
    trainingTab = "commands";
    trainingExpandedCommandId = result.originalItem.id;
    navigateToDestination(`#routine/nako-training-fun`, { type: "training-command", id: result.originalItem.id });
  } else if (result.type === "training-activity") {
    trainingTab = "play";
    navigateToDestination(`#routine/nako-training-fun`, { type: "training-activity", id: result.originalItem.id });
  } else if (result.type === "training-video") {
    if (result.originalItem.commandIds && result.originalItem.commandIds.length) {
      const commandId = result.originalItem.commandIds[0];
      trainingTab = "commands";
      trainingExpandedCommandId = commandId;
      navigateToDestination(`#routine/nako-training-fun`, { type: "training-command", id: commandId });
    } else if (result.originalItem.activityIds && result.originalItem.activityIds.length) {
      const activityId = result.originalItem.activityIds[0];
      trainingTab = "play";
      navigateToDestination(`#routine/nako-training-fun`, { type: "training-activity", id: activityId });
    } else {
      trainingTab = "commands";
      go(`#routine/nako-training-fun`);
    }
  } else if (result.type === "routine-checkin") {
    go("#routine-checkin");
  }
}
