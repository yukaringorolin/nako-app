(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoTrainingPriority = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function filterByPriority(commands = [], priorityId = "all") {
    if (priorityId === "all") return [...commands];
    return commands.filter((command) => command.priorityId === priorityId);
  }

  function wasPractisedWithin(date, days, now = Date.now()) {
    return Boolean(date) && now - Date.parse(date) < days * 86400000;
  }

  function needsPractice(command, state, now = Date.now()) {
    return (command?.priorityId === "critical" && (state?.score ?? 0) < 5)
      || !wasPractisedWithin(state?.lastPracticedAt, 14, now)
      || Number(state?.rewardReliance) <= 1;
  }

  function practiceRank(command, state, now = Date.now()) {
    return (command?.priorityId === "critical" && (state?.score ?? 0) < 5 ? 0 : 2)
      + (!wasPractisedWithin(state?.lastPracticedAt, 14, now) ? 1 : 0)
      + (Number(state?.rewardReliance) <= 1 ? 1 : 0);
  }

  return { filterByPriority, needsPractice, practiceRank, wasPractisedWithin };
});
