(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.nakoFirebaseWriteQueue = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const DEFAULT_RETRY_DELAYS = Object.freeze([1000, 2000, 4000, 8000, 16000, 30000]);

  function stableStateSignature(value) {
    return JSON.stringify(normalize(value));
  }

  function normalize(value) {
    if (Array.isArray(value)) return value.map(normalize);
    if (!value || typeof value !== "object") return value;
    return Object.keys(value).sort().reduce((result, key) => {
      result[key] = normalize(value[key]);
      return result;
    }, {});
  }

  function queueMergedStateIfChanged(queue, remoteState, mergedState) {
    if (!queue || stableStateSignature(remoteState) === stableStateSignature(mergedState)) return false;
    queue.enqueue(mergedState);
    return true;
  }

  function createFirebaseWriteQueue(options = {}) {
    const write = options.write;
    const setTimer = options.setTimeout || setTimeout;
    const clearTimer = options.clearTimeout || clearTimeout;
    const onStatus = options.onStatus || (() => {});
    const clone = options.clone || ((value) => JSON.parse(JSON.stringify(value)));
    const retryDelays = options.retryDelays || DEFAULT_RETRY_DELAYS;
    const debounceMs = options.debounceMs ?? 450;

    if (typeof write !== "function") throw new TypeError("A state write function is required");

    let pendingState = null;
    let inFlight = false;
    let retryAttempt = 0;
    let debounceTimer = null;
    let retryTimer = null;

    function emit(mode, error = "") {
      onStatus(mode, error);
    }

    function clearDebounce() {
      if (debounceTimer !== null) clearTimer(debounceTimer);
      debounceTimer = null;
    }

    function clearRetry() {
      if (retryTimer !== null) clearTimer(retryTimer);
      retryTimer = null;
    }

    function scheduleDebounce() {
      clearDebounce();
      debounceTimer = setTimer(() => {
        debounceTimer = null;
        return flush();
      }, debounceMs);
    }

    function scheduleRetry() {
      if (!pendingState || retryTimer !== null || inFlight) return;
      const delay = retryDelays[Math.min(Math.max(retryAttempt - 1, 0), retryDelays.length - 1)];
      retryTimer = setTimer(() => {
        retryTimer = null;
        return flush();
      }, delay);
    }

    function enqueue(state) {
      pendingState = clone(state);
      emit("connecting");
      clearRetry();
      if (inFlight) clearDebounce();
      else scheduleDebounce();
      return true;
    }

    async function flush() {
      clearDebounce();
      clearRetry();
      if (inFlight || !pendingState) return false;

      const stateToWrite = pendingState;
      pendingState = null;
      inFlight = true;
      emit("connecting");

      try {
        await write(stateToWrite);
        inFlight = false;
        retryAttempt = 0;

        if (pendingState) {
          emit("connecting");
          return flush();
        }

        emit("synced");
        return true;
      } catch (error) {
        inFlight = false;
        if (!pendingState) pendingState = stateToWrite;
        retryAttempt += 1;
        emit("error", error);
        scheduleRetry();
        return false;
      }
    }

    function retryNow() {
      if (!pendingState || inFlight) return false;
      clearDebounce();
      clearRetry();
      return flush();
    }

    function dispose() {
      clearDebounce();
      clearRetry();
    }

    function inspect() {
      return {
        hasPending: Boolean(pendingState),
        inFlight,
        isIdle: !pendingState && !inFlight,
        retryAttempt,
        retryScheduled: retryTimer !== null,
        pendingState: pendingState ? clone(pendingState) : null
      };
    }

    return { dispose, enqueue, flush, inspect, retryNow };
  }

  return {
    DEFAULT_RETRY_DELAYS,
    createFirebaseWriteQueue,
    queueMergedStateIfChanged,
    stableStateSignature
  };
});
