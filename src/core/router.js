(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoRouter = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const ROUTES = Object.freeze({
    section: { view: "section", param: "sectionId" },
    routine: { view: "routine", param: "routineId" },
    food: { view: "food", param: "foodId" },
    "food-safety": { view: "food-safety-item", param: "itemId" },
    recipe: { view: "recipe", param: "recipeId" },
    "routine-checkin": { view: "routine-checkin" },
    "routine-history": { view: "routine-history" }
  });

  function parseRouteHash(hash = "") {
    const parts = String(hash).replace(/^#\/?/, "").split("/").filter(Boolean);
    const definition = ROUTES[parts[0]];
    if (!definition || (definition.param && !parts[1])) return { view: "home" };
    return definition.param
      ? { view: definition.view, [definition.param]: decodeURIComponent(parts[1]) }
      : { view: definition.view };
  }

  function createRouteRegistry(handlers) {
    return Object.freeze({ ...handlers });
  }

  return { ROUTES, parseRouteHash, createRouteRegistry };
});
