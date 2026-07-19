const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const pages = read("src/features/pages.js");
const diary = read("src/features/diary.js");
const appetite = read("src/features/appetite.js");
const actions = read("src/features/actions.js");
const routineState = read("src/features/routine-state.js");
const app = read("src/app.js");
const firebase = read("src/firebase.js");

assert.match(pages, /renderExplicitTextEntry\(\{ kind: "routine"/);
assert.doesNotMatch(pages, /data-completion-note/);
assert.match(appetite, /renderExplicitTextEntry\(\{/);
assert.match(appetite, /data-text-edit-kind="appetite"/);
assert.match(appetite, /data-text-delete-kind="appetite"/);
assert.doesNotMatch(appetite, /data-appetite-note/);
assert.match(diary, /renderExplicitTextEntry\(\{ kind: "diary"/);
assert.match(diary, /!entry\.deleted/);
assert.doesNotMatch(diary, /data-diary-text|data-diary-submit/);
assert.match(actions, /saveExplicitTextDraft/);
assert.match(actions, /deleteExplicitText/);
assert.match(actions, /updateTextDraft/);
assert.match(routineState, /deleteRoutineCompletionNote/);
assert.match(routineState, /updateRoutineCompletion\(record, \{ note: "" \}\)/, "Deleting a routine note must retain its completion record");
assert.match(app, /const localTextDrafts =/);
assert.match(app, /appState\.textDrafts = localTextDrafts/);
assert.match(firebase, /"state\.textDrafts"/);
assert.match(firebase, /"state\.diary\.drafts"/);

console.log("Explicit-save text history UI contracts passed.");
