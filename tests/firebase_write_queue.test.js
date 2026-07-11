const assert = require("node:assert/strict");
const {
  createFirebaseWriteQueue,
  queueMergedStateIfChanged
} = require("../src/core/firebase-write-queue.js");

function fakeTimers() {
  let nextId = 1;
  const tasks = new Map();
  const delays = [];
  return {
    delays,
    setTimeout(callback, delay) {
      const id = nextId++;
      tasks.set(id, { callback, delay });
      delays.push(delay);
      return id;
    },
    clearTimeout(id) {
      tasks.delete(id);
    },
    pendingCount() {
      return tasks.size;
    },
    async runNext() {
      const entry = tasks.entries().next().value;
      if (!entry) return false;
      const [id, task] = entry;
      tasks.delete(id);
      await task.callback();
      return task.delay;
    }
  };
}

function queueWith({ write, timers = fakeTimers(), statuses = [] } = {}) {
  const queue = createFirebaseWriteQueue({
    write,
    setTimeout: timers.setTimeout,
    clearTimeout: timers.clearTimeout,
    onStatus: (mode, error) => statuses.push({ mode, error }),
    clone: (value) => JSON.parse(JSON.stringify(value)),
    debounceMs: 450
  });
  return { queue, timers, statuses };
}

(async () => {
  {
    const timers = fakeTimers();
    let attempts = 0;
    const { queue, statuses } = queueWith({
      timers,
      write: async () => {
        attempts += 1;
        if (attempts <= 7) throw new Error(`failure-${attempts}`);
      }
    });
    queue.enqueue({ version: 1 });
    await queue.flush();
    assert.equal(timers.pendingCount(), 1, "a failed write must schedule one retry");
    assert.equal(statuses.at(-1).mode, "error");

    const observedDelays = [];
    for (let index = 0; index < 6; index += 1) observedDelays.push(await timers.runNext());
    assert.deepEqual(observedDelays, [1000, 2000, 4000, 8000, 16000, 30000]);
    assert.equal(queue.inspect().retryAttempt, 7);
    assert.equal(timers.pendingCount(), 1);
    assert.equal(timers.delays.at(-1), 30000, "retry delay must remain capped at 30 seconds");
  }

  {
    const timers = fakeTimers();
    let attempts = 0;
    const { queue, statuses } = queueWith({
      timers,
      write: async () => {
        attempts += 1;
        if (attempts === 1) throw new Error("temporary");
      }
    });
    queue.enqueue({ version: 1 });
    await queue.flush();
    await timers.runNext();
    assert.equal(queue.inspect().retryAttempt, 0, "success must reset retry state");
    assert.equal(queue.inspect().isIdle, true);
    assert.equal(statuses.at(-1).mode, "synced");
  }

  {
    const writes = [];
    const resolvers = [];
    let activeWrites = 0;
    let maxActiveWrites = 0;
    const { queue, statuses } = queueWith({
      write: (state) => {
        writes.push(state);
        activeWrites += 1;
        maxActiveWrites = Math.max(maxActiveWrites, activeWrites);
        return new Promise((resolve) => resolvers.push(() => {
          activeWrites -= 1;
          resolve();
        }));
      }
    });

    queue.enqueue({ version: "A" });
    const firstFlush = queue.flush();
    queue.enqueue({ version: "B" });
    assert.equal(await queue.flush(), false, "a second write must not overlap the first");
    assert.equal(writes.length, 1);
    resolvers[0]();
    await Promise.resolve();
    await Promise.resolve();
    assert.deepEqual(writes, [{ version: "A" }, { version: "B" }]);
    assert.equal(maxActiveWrites, 1);
    assert.notEqual(statuses.at(-1).mode, "synced", "newer pending state must prevent a synced status");
    resolvers[1]();
    await firstFlush;
    assert.equal(statuses.at(-1).mode, "synced");
  }

  {
    const timers = fakeTimers();
    const writes = [];
    let rejectFirst;
    const { queue } = queueWith({
      timers,
      write: (state) => {
        writes.push(state);
        if (writes.length === 1) return new Promise((resolve, reject) => { rejectFirst = reject; });
        return Promise.resolve();
      }
    });
    queue.enqueue({ version: "old" });
    const failedFlush = queue.flush();
    queue.enqueue({ version: "new" });
    rejectFirst(new Error("offline"));
    await failedFlush;
    assert.deepEqual(queue.inspect().pendingState, { version: "new" });
    assert.equal(timers.pendingCount(), 1);
    await timers.runNext();
    assert.deepEqual(writes, [{ version: "old" }, { version: "new" }]);
  }

  {
    const timers = fakeTimers();
    const writes = [];
    let fail = true;
    const { queue } = queueWith({
      timers,
      write: async (state) => {
        writes.push(state);
        if (fail) throw new Error("offline");
      }
    });
    assert.equal(queue.retryNow(), false, "online trigger must do nothing without pending state");
    queue.enqueue({ version: 1 });
    await queue.flush();
    assert.equal(timers.pendingCount(), 1);
    fail = false;
    await queue.retryNow();
    assert.equal(timers.pendingCount(), 0, "online trigger must cancel the delayed retry");
    assert.equal(queue.inspect().isIdle, true);
    assert.equal(writes.length, 2);
  }

  for (const field of ["food", "weightTracking", "training"]) {
    const writes = [];
    const { queue } = queueWith({ write: async (state) => writes.push(state) });
    const remote = { [field]: {} };
    const merged = { [field]: { local: { updatedAt: "2026-07-12T00:00:00+08:00" } } };
    assert.equal(queueMergedStateIfChanged(queue, remote, merged), true, `${field} changes must queue a write`);
    await queue.flush();
    assert.deepEqual(writes, [merged]);
  }

  {
    const writes = [];
    const { queue } = queueWith({ write: async (state) => writes.push(state) });
    const remote = { training: { commands: { sit: { score: 4 } } }, food: {} };
    const sameWithDifferentKeyOrder = { food: {}, training: { commands: { sit: { score: 4 } } } };
    assert.equal(queueMergedStateIfChanged(queue, remote, sameWithDifferentKeyOrder), false);
    assert.equal(await queue.flush(), false);
    assert.deepEqual(writes, []);
  }

  console.log("Firebase latest-state write-queue checks passed.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
