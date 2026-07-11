(function () {
  const STATE_DOC_ID = "nako-care-state-v2";
  const HOUSEHOLD_ID = "our-dog-nako";
  const listeners = new Set();
  const status = {
    mode: "local",
    uid: "",
    cloudEnabled: false,
    storageEnabled: false,
    error: ""
  };

  let auth = null;
  let db = null;
  let storage = null;
  let stateDoc = null;
  let routineCompletionCollection = null;
  let unsubscribeState = null;
  let unsubscribeRoutineCompletions = null;
  let syncCallbacks = null;
  let routineSyncCallbacks = null;
  let stateWriteQueue = null;

  let stateSyncStatus = "local";
  let routineSyncStatus = "local";
  let stateSyncError = "";
  let routineSyncError = "";
  let globalError = "";

  const service = {
    status: () => ({ ...status }),
    onStatus(listener) {
      if (typeof listener !== "function") return () => {};
      listeners.add(listener);
      listener({ ...status });
      return () => listeners.delete(listener);
    },
    // startStateSync: Registers listener callbacks and starts Firestore doc tracking
    startStateSync(callbacks) {
      syncCallbacks = callbacks || {};
      if (stateDoc) {
        stateSyncStatus = "connecting";
        stateSyncError = "";
        updateCombinedStatus();
        attachStateListener();
      }
      return Boolean(stateDoc);
    },
    startRoutineCompletionSync(callbacks) {
      routineSyncCallbacks = callbacks || {};
      if (routineCompletionCollection) {
        routineSyncStatus = "connecting";
        routineSyncError = "";
        updateCombinedStatus();
        attachRoutineCompletionListener();
      }
      return Boolean(routineCompletionCollection);
    },
    saveRoutineCompletion(record) {
      if (!routineCompletionCollection || !record?.id) return false;
      saveRoutineCompletionRecord(record);
      return true;
    },
    // saveRemoteState: Debounces state updates to avoid exceeding Firestore write rate limits
    saveRemoteState(nextState) {
      if (!stateDoc || !stateWriteQueue) return false;
      stateWriteQueue.enqueue(nextState);
      return true;
    },
    async getStorageDownloadURL(path) {
      if (!storage || !path) return "";
      try {
        return await storage.ref(path).getDownloadURL();
      } catch (error) {
        globalError = readableError(error);
        updateCombinedStatus();
        return "";
      }
    }
  };

  window.nakoFirebase = service;

  if (window.nakoFirebaseWriteQueue?.createFirebaseWriteQueue) {
    stateWriteQueue = window.nakoFirebaseWriteQueue.createFirebaseWriteQueue({
      write: writeStateDocument,
      setTimeout: window.setTimeout.bind(window),
      clearTimeout: window.clearTimeout.bind(window),
      clone: cloneState,
      onStatus(mode, error) {
        stateSyncStatus = mode;
        stateSyncError = mode === "error" ? readableError(error) : "";
        updateCombinedStatus();
      }
    });
  }

  if (!window.firebase) {
    setStatus({ mode: "local", error: "Firebase SDK unavailable" });
    return;
  }

  try {
    if (!firebase.apps.length && window.nakoFirebaseConfig) {
      firebase.initializeApp(window.nakoFirebaseConfig);
    }

    if (!firebase.apps.length) {
      throw new Error("Firebase app is not initialized");
    }

    auth = firebase.auth ? firebase.auth() : null;
    db = firebase.firestore ? firebase.firestore() : null;
    storage = firebase.storage ? firebase.storage() : null;

    if (!auth || !db) {
      throw new Error("Firebase Auth and Firestore SDKs are required");
    }

    stateSyncStatus = "connecting";
    routineSyncStatus = "connecting";
    globalError = "";
    updateCombinedStatus({
      cloudEnabled: true,
      storageEnabled: Boolean(storage)
    });

    auth.onAuthStateChanged(handleAuthState, (error) => {
      globalError = readableError(error);
      updateCombinedStatus();
    });

    auth.signInAnonymously().catch((error) => {
      globalError = readableError(error);
      updateCombinedStatus();
    });
  } catch (error) {
    globalError = readableError(error);
    updateCombinedStatus({ cloudEnabled: false });
  }

  window.addEventListener("pagehide", flushPendingState);
  window.addEventListener("online", () => stateWriteQueue?.retryNow());

  // handleAuthState: Triggers when the Firebase Auth user changes
  function handleAuthState(user) {
    globalError = "";
    updateStateDoc();
  }

  // updateStateDoc: Connects database reference path based on the fixed household ID
  function updateStateDoc() {
    detachStateListener();
    detachRoutineCompletionListener();

    if (!auth || !auth.currentUser) {
      stateWriteQueue?.dispose();
      stateDoc = null;
      routineCompletionCollection = null;
      stateSyncStatus = "local";
      routineSyncStatus = "local";
      stateSyncError = "";
      routineSyncError = "";
      updateCombinedStatus({ uid: "" });
      return;
    }

    stateDoc = db.collection("households").doc(HOUSEHOLD_ID);
    routineCompletionCollection = stateDoc.collection("routineCompletions");

    stateSyncStatus = syncCallbacks ? "connecting" : "local";
    routineSyncStatus = routineSyncCallbacks ? "connecting" : "local";
    stateSyncError = "";
    routineSyncError = "";
    updateCombinedStatus({ uid: auth.currentUser.uid });
    if (syncCallbacks) attachStateListener();
    if (routineSyncCallbacks) attachRoutineCompletionListener();
  }

  // attachStateListener: Sets up the live doc snapshot listener to merge remote and local state
  function attachStateListener() {
    if (!stateDoc || !syncCallbacks) return;
    detachStateListener();

    let firstSnapshot = true;
    unsubscribeState = stateDoc.onSnapshot(
      (snapshot) => {
        const remoteState = snapshot.exists ? cloneState(snapshot.data()?.state || {}) : {};

        if (firstSnapshot) {
          firstSnapshot = false;
          const localState = cloneState(syncCallbacks.getLocalState?.() || {});
          const mergedState = mergeStates(remoteState, localState);
          syncCallbacks.applyRemoteState?.(mergedState);
          queueMergedState(remoteState, mergedState);
          return;
        }

        const localState = cloneState(syncCallbacks.getLocalState?.() || {});
        const mergedState = mergeStates(remoteState, localState);
        syncCallbacks.applyRemoteState?.(mergedState);
        queueMergedState(remoteState, mergedState);
      },
      (error) => {
        stateSyncStatus = "error";
        stateSyncError = readableError(error);
        updateCombinedStatus();
      }
    );
  }

  function detachStateListener() {
    if (unsubscribeState) unsubscribeState();
    unsubscribeState = null;
  }

  function attachRoutineCompletionListener() {
    if (!routineCompletionCollection || !routineSyncCallbacks) return;
    detachRoutineCompletionListener();
    unsubscribeRoutineCompletions = routineCompletionCollection.onSnapshot(
      (snapshot) => {
        const remoteRecords = {};
        snapshot.forEach((doc) => { remoteRecords[doc.id] = { ...doc.data(), id: doc.id }; });
        const localRecords = cloneState(routineSyncCallbacks.getLocalRecords?.() || {});
        const merged = mergeCompletionRecords(remoteRecords, localRecords);
        routineSyncCallbacks.applyRemoteRecords?.(merged);

        Object.entries(localRecords).forEach(([id, localRecord]) => {
          const remoteRecord = remoteRecords[id];
          if (!remoteRecord || recordTime(localRecord) > recordTime(remoteRecord)) {
            saveRoutineCompletionRecord({ ...localRecord, id });
          }
        });
        routineSyncStatus = "synced";
        routineSyncError = "";
        updateCombinedStatus();
      },
      (error) => {
        routineSyncStatus = "error";
        routineSyncError = "Routine sync unavailable";
        updateCombinedStatus();
      }
    );
  }

  function detachRoutineCompletionListener() {
    if (unsubscribeRoutineCompletions) unsubscribeRoutineCompletions();
    unsubscribeRoutineCompletions = null;
  }

  async function saveRoutineCompletionRecord(record) {
    if (!routineCompletionCollection || !record?.id) return false;
    const cleanRecord = cloneState(record);
    delete cleanRecord.id;
    const document = routineCompletionCollection.doc(record.id);
    try {
      await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(document);
        const existing = snapshot.exists ? snapshot.data() : null;
        if (existing && recordTime(existing) > recordTime(cleanRecord)) return;
        transaction.set(document, cleanRecord, { merge: true });
      });
      routineSyncStatus = "synced";
      routineSyncError = "";
      updateCombinedStatus();
      return true;
    } catch (error) {
      routineSyncStatus = "error";
      routineSyncError = "Routine sync unavailable";
      updateCombinedStatus();
      return false;
    }
  }

  function mergeCompletionRecords(remoteRecords = {}, localRecords = {}) {
    const merged = { ...(remoteRecords || {}) };
    Object.entries(localRecords || {}).forEach(([id, localRecord]) => {
      const remoteRecord = merged[id];
      if (!remoteRecord || recordTime(localRecord) >= recordTime(remoteRecord)) merged[id] = { ...localRecord, id };
    });
    return merged;
  }

  function recordTime(record) {
    return Date.parse(record?.updatedAt || record?.completedAt || record?.deletedAt || "") || 0;
  }

  // flushPendingState: Flushes debounced updates by saving changes using set() with { merge: true }
  function flushPendingState() {
    return stateWriteQueue?.flush() || false;
  }

  function writeStateDocument(stateToSave) {
    if (!stateDoc) return Promise.reject(new Error("Firebase state document unavailable"));
    return stateDoc.set(
      {
        state: stateToSave,
        clientUpdatedAt: new Date().toISOString(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  }

  function queueMergedState(remoteState, mergedState) {
    const queued = window.nakoFirebaseWriteQueue?.queueMergedStateIfChanged(
      stateWriteQueue,
      remoteState,
      mergedState
    );
    if (queued || !stateWriteQueue?.inspect().isIdle) return;
    stateSyncStatus = "synced";
    stateSyncError = "";
    updateCombinedStatus();
  }

  // mergeStates: Integrates remote and local database schemas
  function mergeStates(remoteState, localState) {
    return {
      ...remoteState,
      ...localState,
      food: mergeDatedRecords(remoteState.food, localState.food),
      weightTracking: mergeDatedRecords(remoteState.weightTracking, localState.weightTracking),
      routineTrackingStartedDate: earliestDate(remoteState.routineTrackingStartedDate, localState.routineTrackingStartedDate),
      diary: mergeDiaryState(remoteState.diary, localState.diary),
      training: mergeTrainingState(remoteState.training, localState.training)
    };
  }

  function earliestDate(first, second) {
    if (!first) return second || "";
    if (!second) return first;
    return first <= second ? first : second;
  }

  function mergeTrainingState(remoteTraining = {}, localTraining = {}) {
    const remote = remoteTraining || {};
    const local = localTraining || {};
    return {
      ...remote,
      ...local,
      commands: mergeDatedRecords(remote.commands, local.commands),
      commandLogs: mergeLogsById(remote.commandLogs, local.commandLogs),
      playLogs: mergeLogsById(remote.playLogs, local.playLogs)
    };
  }

  function mergeLogsById(remoteLogs = [], localLogs = []) {
    const merged = new Map();
    [...(remoteLogs || []), ...(localLogs || [])].forEach((log) => {
      if (!log || !log.id) return;
      const current = merged.get(log.id);
      if (!current || (Date.parse(log.updatedAt || log.createdAt || "") || 0) >= (Date.parse(current.updatedAt || current.createdAt || "") || 0)) merged.set(log.id, log);
    });
    return [...merged.values()];
  }

  function mergeDiaryState(remoteDiary = {}, localDiary = {}) {
    return {
      ...remoteDiary,
      ...localDiary,
      entries: mergeDatedRecords(remoteDiary.entries, localDiary.entries),
      drafts: mergeDatedRecords(remoteDiary.drafts, localDiary.drafts)
    };
  }

  function mergeDatedRecords(remoteRecords = {}, localRecords = {}) {
    const merged = { ...(remoteRecords || {}) };
    Object.entries(localRecords || {}).forEach(([dateKey, localValue]) => {
      const remoteValue = merged[dateKey];
      merged[dateKey] = pickLatestRecord(remoteValue, localValue);
    });
    return merged;
  }

  function pickLatestRecord(remoteValue, localValue) {
    if (!remoteValue) return localValue;
    if (!localValue) return remoteValue;
    const remoteTime = Date.parse(remoteValue.updatedAt || remoteValue.submittedAt || "") || 0;
    const localTime = Date.parse(localValue.updatedAt || localValue.submittedAt || "") || 0;
    return localTime >= remoteTime ? localValue : remoteValue;
  }

  function cloneState(value) {
    try {
      return JSON.parse(JSON.stringify(value || {}));
    } catch {
      return {};
    }
  }

  function setStatus(patch) {
    Object.assign(status, patch);
    const nextStatus = { ...status };
    listeners.forEach((listener) => {
      try {
        listener(nextStatus);
      } catch {
        listeners.delete(listener);
      }
    });
  }

  function updateCombinedStatus(patch = {}) {
    let combinedMode = "local";
    let combinedError = globalError || "";

    if (globalError) {
      combinedMode = "error";
    } else if (stateSyncStatus === "error" || routineSyncStatus === "error") {
      combinedMode = "error";
      combinedError = routineSyncError || stateSyncError;
    } else if (stateSyncStatus === "connecting" || routineSyncStatus === "connecting") {
      combinedMode = "connecting";
    } else if (stateSyncStatus === "synced" && routineSyncStatus === "synced") {
      combinedMode = "synced";
    }

    setStatus({
      mode: combinedMode,
      error: combinedError,
      ...patch
    });
  }

  function readableError(error) {
    return error?.message || String(error || "Firebase unavailable");
  }
})();
