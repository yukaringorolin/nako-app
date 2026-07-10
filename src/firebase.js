(function () {
  const STATE_DOC_ID = "nako-care-state-v2";
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
  let unsubscribeState = null;
  let syncCallbacks = null;
  let pendingState = null;
  let pendingTimer = null;

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
      if (stateDoc) attachStateListener();
      return Boolean(stateDoc);
    },
    // saveRemoteState: Debounces state updates to avoid exceeding Firestore write rate limits
    saveRemoteState(nextState) {
      if (!stateDoc) return false;
      pendingState = cloneState(nextState);
      window.clearTimeout(pendingTimer);
      pendingTimer = window.setTimeout(flushPendingState, 450);
      return true;
    },
    async getStorageDownloadURL(path) {
      if (!storage || !path) return "";
      try {
        return await storage.ref(path).getDownloadURL();
      } catch (error) {
        setStatus({ mode: "error", error: readableError(error) });
        return "";
      }
    },
    updateHouseholdCode(code) {
      if (code && code.trim() !== "") {
        try { localStorage.setItem("nako-household-code", code.trim()); } catch {}
      } else {
        try { localStorage.removeItem("nako-household-code"); } catch {}
      }
      updateStateDoc();
    }
  };

  window.nakoFirebase = service;

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

    setStatus({
      mode: "connecting",
      cloudEnabled: true,
      storageEnabled: Boolean(storage),
      error: ""
    });

    auth.onAuthStateChanged(handleAuthState, (error) => {
      setStatus({ mode: "error", error: readableError(error) });
    });

    auth.signInAnonymously().catch((error) => {
      setStatus({ mode: "error", error: readableError(error) });
    });
  } catch (error) {
    setStatus({ mode: "local", cloudEnabled: false, error: readableError(error) });
  }

  window.addEventListener("pagehide", flushPendingState);

  // handleAuthState: Triggers when the Firebase Auth user changes
  function handleAuthState(user) {
    updateStateDoc();
  }

  // updateStateDoc: Connects database reference path based on current local household code
  function updateStateDoc() {
    detachStateListener();

    if (!auth || !auth.currentUser) {
      stateDoc = null;
      setStatus({ mode: "local", uid: "", error: "" });
      return;
    }

    let code = "our-dog-nako";
    try {
      code = localStorage.getItem("nako-household-code") || "our-dog-nako";
    } catch {}

    stateDoc = db.collection("households").doc(code.trim());

    setStatus({ mode: "connecting", uid: auth.currentUser.uid, error: "" });
    if (syncCallbacks) attachStateListener();
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
          service.saveRemoteState(mergedState);
          setStatus({ mode: "synced", error: "" });
          return;
        }

        const localState = cloneState(syncCallbacks.getLocalState?.() || {});
        const mergedState = mergeStates(remoteState, localState);
        syncCallbacks.applyRemoteState?.(mergedState);
        if (hasDiaryMergeChanges(remoteState.diary, mergedState.diary)) {
          service.saveRemoteState(mergedState);
        }
        setStatus({ mode: "synced", error: "" });
      },
      (error) => {
        setStatus({ mode: "error", error: readableError(error) });
      }
    );
  }

  function detachStateListener() {
    if (unsubscribeState) unsubscribeState();
    unsubscribeState = null;
  }

  // flushPendingState: Flushes debounced updates by saving changes using set() with { merge: true }
  async function flushPendingState() {
    if (!stateDoc || !pendingState) return false;

    const stateToSave = pendingState;
    pendingState = null;
    window.clearTimeout(pendingTimer);
    pendingTimer = null;

    try {
      await stateDoc.set(
        {
          state: stateToSave,
          clientUpdatedAt: new Date().toISOString(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
      setStatus({ mode: "synced", error: "" });
      return true;
    } catch (error) {
      pendingState = stateToSave;
      setStatus({ mode: "error", error: readableError(error) });
      return false;
    }
  }

  // mergeStates: Integrates remote and local database schemas
  function mergeStates(remoteState, localState) {
    return {
      ...remoteState,
      ...localState,
      food: mergeDatedRecords(remoteState.food, localState.food),
      weightTracking: mergeDatedRecords(remoteState.weightTracking, localState.weightTracking),
      diary: mergeDiaryState(remoteState.diary, localState.diary)
    };
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

  function hasDiaryMergeChanges(remoteDiary = {}, mergedDiary = {}) {
    return diaryRecordSignature(remoteDiary.entries) !== diaryRecordSignature(mergedDiary.entries)
      || diaryRecordSignature(remoteDiary.drafts) !== diaryRecordSignature(mergedDiary.drafts);
  }

  function diaryRecordSignature(records = {}) {
    return JSON.stringify(Object.keys(records || {}).sort().map((dateKey) => {
      const record = records[dateKey] || {};
      return [
        dateKey,
        record.updatedAt || "",
        record.submittedAt || "",
        record.status || "",
        record.text || "",
        record.originalText || ""
      ];
    }));
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

  function readableError(error) {
    return error?.message || String(error || "Firebase unavailable");
  }
})();
