(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoRoutineTaskSelection = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function isTracked(task) {
    return Boolean(task?.trackingMode && task.trackingMode !== "none");
  }

  function activeTrackedRoutineTasks(tasks = []) {
    return tasks.filter((task) => task.active !== false && isTracked(task));
  }

  function historicalTrackedRoutineTasks(tasks = []) {
    return tasks.filter(isTracked);
  }

  function historyFilterTasks(tasks = [], records = []) {
    const savedTaskIds = new Set(records.filter((record) => record && !record.deleted).map((record) => record.taskId));
    return historicalTrackedRoutineTasks(tasks).filter((task) => task.active !== false || savedTaskIds.has(task.id));
  }

  function shouldGenerateMissed(task) {
    return task?.active !== false && isTracked(task) && task.trackingCadence !== "one-off";
  }

  return {
    activeTrackedRoutineTasks,
    historicalTrackedRoutineTasks,
    historyFilterTasks,
    isTracked,
    shouldGenerateMissed
  };
});
