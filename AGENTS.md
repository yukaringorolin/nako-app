# Nako Home Care contributor rules

## Protect saved data

- Keep every existing routine, recipe, food, training, and activity ID stable.
- Keep `STATE_KEY = "nako-care-state-v2"` and the Firebase household ID `our-dog-nako` unchanged.
- Do not delete a routine that may have history. Set `active: false` instead.
- Keep Singapore timezone behavior and the fortnightly anchor `2026-07-06`.
- Keep Firestore paths and routine completion IDs compatible.

## Edit the source files

- Edit translated content in [`src/data/`](src/data/).
- Edit routines only in [`src/data/routine_tasks.js`](src/data/routine_tasks.js).
- Treat [`src/data.js`](src/data.js) as generated output. Never edit it directly.
- Run `npm run build:data` after changing content.
- Keep English, Japanese, and natural Burmese text for every helper-facing string.
- Follow [`CONTENT_STYLE.md`](CONTENT_STYLE.md).

## Routine rules

- Preserve stable IDs when renaming a task.
- Give each routine a primary photo or useful icon fallback.
- Daily and as-needed routines are reference-only, except the existing one-off fire-extinguisher training contract.
- Weekly, fortnightly, monthly, quarterly, and one-off routines are tracked unless `routineTrackingExclusions` gives a clear reason.
- Do not maintain a second tracking list. Tracking metadata is derived from the canonical routine definition.

## Architecture

- Keep classic browser scripts and the existing global-module pattern.
- Do not add a frontend framework or runtime bundler requirement.
- Put reusable browser/Node helpers in `src/core/` using the compatible wrapper pattern.
- Put shared rendering in `src/ui/` and page behavior in `src/features/`.
- Keep user-facing text in translation data, not render functions.
- Use CSS classes instead of inline style strings.

## Required checks

Run:

```bash
npm run check
```

This rebuilds data, verifies generated output, checks syntax and translations, validates content and ingredients, and runs every test.
