(function () {
  const STATE_DOC_ID = "nako-care-state-v2";
  const HOUSEHOLD_ID = "our-dog-nako";
  const PROJECT_ID = "nako-home-care";
  const listeners = new Set();
  const status = {
    mode: "local",
    stateMode: "local",
    routineMode: "local",
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
  let stateDiffKeys = "";
  let stateCleanupPending = false;
  let sharedStateCleanupAttempted = false;

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
      stateWriteQueue.enqueue(sharedState(nextState));
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

    unsubscribeState = stateDoc.onSnapshot(
      (snapshot) => {
        const rawRemoteState = snapshot.exists ? cloneState(snapshot.data()?.state || {}) : {};
        const remoteState = sharedState(rawRemoteState);
        const localState = sharedState(syncCallbacks.getLocalState?.() || {});
        const mergedState = window.nakoFirebaseState.mergeStates(remoteState, localState);
        syncCallbacks.applyRemoteState?.(mergedState);
        const cleanupRequired = !sharedStateCleanupAttempted;
        queueMergedState(remoteState, mergedState, cleanupRequired);
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

  async function writeStateDocument(stateToSave) {
    if (!stateDoc || !db) return Promise.reject(new Error("Firebase state document unavailable"));
    const candidateState = sharedState(stateToSave);
    let cleanupCommitted = false;
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(stateDoc);
      const rawRemoteState = snapshot.exists ? snapshot.data()?.state || {} : {};
      const remoteState = sharedState(rawRemoteState);
      const mergedState = window.nakoFirebaseState.mergeStates(remoteState, candidateState);
      const signature = window.nakoFirebaseWriteQueue?.stableStateSignature || JSON.stringify;
      const cleanupRequired = !sharedStateCleanupAttempted;
      cleanupCommitted ||= cleanupRequired;
      if (signature(remoteState) === signature(mergedState)) return;
      cleanupCommitted = true;
      const payload = {
        state: mergedState,
        clientUpdatedAt: new Date().toISOString(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      if (snapshot.exists) {
        // Updating the parent field replaces the full state map while preserving
        // document siblings and the routineCompletions subcollection.
        transaction.update(stateDoc, payload);
      } else {
        transaction.set(stateDoc, payload, { mergeFields: ["state", "clientUpdatedAt", "updatedAt"] });
      }
    });
    if (cleanupCommitted) {
      sharedStateCleanupAttempted = true;
      deleteLegacySharedStateFields().catch((error) => {
        console.warn("Legacy shared-state cleanup deferred", error);
      });
    }
    stateCleanupPending = false;
  }

  async function deleteLegacySharedStateFields() {
    const token = await auth?.currentUser?.getIdToken?.();
    if (!token) throw new Error("Firebase authentication unavailable for state cleanup");
    const fieldPaths = [
      "state.routineCompletions",
      "state.routineTrackingMigration",
      "state.training.contentMigrations",
      "state.textDrafts",
      "state.diary.drafts"
    ];
    const documentName = `projects/${PROJECT_ID}/databases/(default)/documents/households/${HOUSEHOLD_ID}`;
    const response = await window.fetch(`https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:commit`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        writes: [{ update: { name: documentName, fields: {} }, updateMask: { fieldPaths } }]
      })
    });
    if (!response.ok) throw new Error(`Legacy shared-state cleanup failed (${response.status})`);
    const verifyResponse = await window.fetch(`https://firestore.googleapis.com/v1/${documentName}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!verifyResponse.ok) throw new Error(`Legacy shared-state verification failed (${verifyResponse.status})`);
    const cleanedDocument = await verifyResponse.json();
    const cleanedState = cleanedDocument?.fields?.state?.mapValue?.fields || {};
    const cleanedTraining = cleanedState.training?.mapValue?.fields || {};
    const cleanedDiary = cleanedState.diary?.mapValue?.fields || {};
    if (cleanedState.routineCompletions || cleanedState.routineTrackingMigration || cleanedState.textDrafts || cleanedTraining.contentMigrations || cleanedDiary.drafts) {
      throw new Error("Legacy shared-state cleanup verification failed");
    }
  }

  function queueMergedState(remoteState, mergedState, forceCleanup = false) {
    const remoteShared = sharedState(remoteState);
    const mergedShared = sharedState(mergedState);
    stateDiffKeys = topLevelDiffKeys(remoteShared, mergedShared);
    stateCleanupPending = Boolean(forceCleanup);
    const queued = forceCleanup
      ? Boolean(stateWriteQueue?.enqueue(mergedShared))
      : window.nakoFirebaseWriteQueue?.queueMergedStateIfChanged(
          stateWriteQueue,
          remoteShared,
          mergedShared
        );
    if (queued || !stateWriteQueue?.inspect().isIdle) return;
    stateSyncStatus = "synced";
    stateSyncError = "";
    updateCombinedStatus();
  }

  function topLevelDiffKeys(first, second) {
    const signature = window.nakoFirebaseWriteQueue?.stableStateSignature || JSON.stringify;
    return [...new Set([...Object.keys(first || {}), ...Object.keys(second || {})])]
      .filter((key) => signature(first?.[key]) !== signature(second?.[key]))
      .sort()
      .join(",");
  }

  function sharedState(value) {
    return window.nakoFirebaseState?.projectSharedState?.(value) || cloneState(value);
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
      stateMode: stateSyncStatus,
      routineMode: routineSyncStatus,
      stateDiffKeys,
      stateCleanupPending,
      stateError: stateSyncError,
      routineError: routineSyncError,
      error: combinedError,
      ...patch
    });
  }

  function readableError(error) {
    return error?.message || String(error || "Firebase unavailable");
  }
})();
