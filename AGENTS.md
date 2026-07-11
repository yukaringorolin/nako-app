# Adding or Changing a Household Routine

When adding a new routine or editing an existing one in this repository, you must follow these rules to ensure data stability and correct UI presentation:

## 1. Single Source of Truth
- **Never maintain separate task lists manually.**
- All routine items must be created or updated *only* in the canonical routine data in [routine_tasks.js](file:///g:/My%20Drive/Dropbox/Downloads/Academics/Python/Nako%20app/src/data/routine_tasks.js).
- Routine Check-in, frequency views, detail pages, and task-specific history are all automatically derived from that single task definition and its stable ID.

## 2. Invariant Rules for Task Definitions
1. **Preserve Stable Unique IDs**: Never change an existing task ID merely to rename the task. Changing the ID will orphan existing Firestore/local history records.
2. **Never Delete definitions with history**: If a previously tracked task is retired, do not delete its code definition. Instead, set `active: false` to hide it from current checklists while keeping historical completions readable.
3. **Multi-Language Support**: Always provide natural English (EN), Japanese (JP), and Burmese (MM) translations for the title, summary, and instructions using the `t(en, jp, mm)` helper.
4. **Photos and Icons**: Provide a primary photo (`photo("assets/routines/...")`) or an icon fallback for every routine card.
5. **Cadence Classification**:
   - Daily and as-needed entries are reference-only.
   - Weekly, fortnightly, monthly, quarterly, and one-off entries are tracked actionable tasks by default.
   - If you need to deliberately exclude a non-daily actionable task from tracking, you must explicitly declare it in `routineTrackingExclusions` with a detailed reason.
6. **Programmatic Metadata**: Do not write manual config lists in multiple places. Any new task satisfying the non-daily cadence rule will automatically:
   - Appear in the Routine Check-in checklist when due.
   - Receive the shared Task Completion panel and task-specific history on its detail page.
7. **Fortnightly Anchors**: Fortnightly tasks automatically default to using the stable Monday anchor `2026-07-06`.

## 3. Validation
After modifying the routine tasks data:
1. Compile the bundle:
   ```bash
   node scripts/bundle.js
   ```
2. Verify all checks and unit/contract tests pass:
   ```bash
   node tests/routine_tracking.test.js
   node tests/routine_tracking_contract.test.js
   node scripts/check_translations.js
   ```
