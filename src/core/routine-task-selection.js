(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoRoutineTaskSelection = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const ROUTINE_CADENCE_ORDER = Object.freeze(["daily", "weekly", "fortnightly", "monthly", "quarterly", "one-off"]);
  const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

  function isTracked(task) {
    return Boolean(task?.trackingMode && task.trackingMode !== "none");
  }

  function activeTrackedRoutineTasks(tasks = []) {
    return tasks.filter((task) => task.active !== false && isTracked(task));
  }

  function historicalTrackedRoutineTasks(tasks = []) {
    return tasks.filter((task) => isTracked(task) && task.trackingMode !== "input");
  }

  function historyFilterTasks(tasks = [], records = []) {
    const savedTaskIds = new Set(records.filter((record) => record && !record.deleted).map((record) => record.taskId));
    return historicalTrackedRoutineTasks(tasks).filter((task) => task.active !== false || savedTaskIds.has(task.id));
  }

  function shouldGenerateMissed(task) {
    return task?.active !== false && isTracked(task) && task.trackingMode !== "input" && task.trackingCadence !== "one-off";
  }

  function effectiveTrackingStart(task, householdStart, today) {
    const starts = [householdStart, task?.trackingStartDate].filter((value) => DATE_KEY_PATTERN.test(String(value || "")));
    return starts.length ? starts.sort()[starts.length - 1] : today;
  }

  function emptyCadenceGroups() {
    return Object.fromEntries(ROUTINE_CADENCE_ORDER.map((cadence) => [cadence, []]));
  }

  function summarizeChecklist(checklist = []) {
    const dueByCadence = emptyCadenceGroups();
    const completedByCadence = emptyCadenceGroups();

    checklist.forEach((item) => {
      const cadence = item?.task?.trackingCadence;
      if (!Object.prototype.hasOwnProperty.call(dueByCadence, cadence)) return;
      const target = item.record ? completedByCadence : dueByCadence;
      target[cadence].push(item);
    });

    const remainingByCadence = Object.fromEntries(
      ROUTINE_CADENCE_ORDER.map((cadence) => [cadence, dueByCadence[cadence].length])
    );

    return {
      dueByCadence,
      completedByCadence,
      remainingByCadence,
      dueTotal: Object.values(dueByCadence).reduce((total, items) => total + items.length, 0),
      completedTotal: Object.values(completedByCadence).reduce((total, items) => total + items.length, 0)
    };
  }

  function summarizeUpcomingDue(checklist = [], options = {}) {
    const today = String(options.today || "");
    const daysBetween = options.daysBetween;
    const horizonDays = Number.isFinite(Number(options.horizonDays))
      ? Math.max(0, Number(options.horizonDays))
      : 3;
    if (!DATE_KEY_PATTERN.test(today) || typeof daysBetween !== "function") {
      return { items: [], total: 0, nearestDeadline: "", nearestDaysUntilDue: null };
    }

    const items = checklist
      .filter((item) => item && !item.record && DATE_KEY_PATTERN.test(String(item.cycle?.end || "")))
      .map((item, originalIndex) => ({
        ...item,
        deadline: item.cycle.end,
        daysUntilDue: daysBetween(today, item.cycle.end),
        originalIndex
      }))
      .filter((item) => Number.isFinite(item.daysUntilDue) && item.daysUntilDue >= 0 && item.daysUntilDue <= horizonDays)
      .sort((a, b) => a.daysUntilDue - b.daysUntilDue || a.originalIndex - b.originalIndex)
      .map(({ originalIndex, ...item }) => item);

    return {
      items,
      total: items.length,
      nearestDeadline: items[0]?.deadline || "",
      nearestDaysUntilDue: items.length ? items[0].daysUntilDue : null
    };
  }

  function reminderTaskTitle(task) {
    return task?.checkInTitle || task?.title || "";
  }

  function reminderPreview(items = [], limit = 3) {
    const safeLimit = Math.max(0, Math.floor(Number(limit) || 0));
    const visible = items.slice(0, safeLimit);
    return {
      visible,
      moreCount: Math.max(0, items.length - visible.length)
    };
  }

  return {
    ROUTINE_CADENCE_ORDER,
    activeTrackedRoutineTasks,
    effectiveTrackingStart,
    historicalTrackedRoutineTasks,
    historyFilterTasks,
    isTracked,
    reminderPreview,
    reminderTaskTitle,
    shouldGenerateMissed,
    summarizeChecklist,
    summarizeUpcomingDue
  };
});
