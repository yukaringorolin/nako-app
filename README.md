# Nako Home Care

A mobile-first household helper guide for food, home routines, Nako care, training, diary notes, and tracking. The app supports English, Japanese, and Burmese, with Burmese as the first-visit default.

## Run locally

Open `index.html` directly for local-only mode, or serve the repository with any static server. Firebase Hosting supplies its reserved SDK and configuration URLs when deployed.

No frontend framework or runtime build step is required.

## Project structure

```text
index.html                    Browser entry point and classic-script order
src/app.js                    Small bootstrap and Firebase coordination
src/core/                     Storage, routing, dates, HTML, and shared state helpers
src/ui/                       Shared shell and display components
src/features/                 Page, routine, diary, training, weight, and search features
src/styles.css                Base layout and feature styles
src/styles/                   Shared component and search styles loaded with CSS imports
src/data/                     Editable translated content sources
src/data.js                   Generated content bundle; do not edit directly
src/firebase.js               Local-first Firebase bridge
src/routine-tracking.js       Singapore-time routine cycle contracts
src/search.js                 Multilingual search engine
scripts/                      Build and validation commands
tests/                        Unit and compatibility contracts
```

## Development commands

```bash
npm run build:data
npm run check:translations
npm test
npm run check
npm run preview
```

`npm run check` rebuilds `src/data.js`, confirms it is fresh, checks every JavaScript file, validates translations and content structure, validates ingredient assets, and runs every test.

`npm run preview` serves the repository at `http://127.0.0.1:8765` for browser review.

## Content editing

- Edit translated content only in `src/data/`.
- Run `npm run build:data` afterward.
- Keep all content IDs stable.
- Follow [CONTENT_STYLE.md](CONTENT_STYLE.md) for short, direct helper-facing language.
- Follow [AGENTS.md](AGENTS.md) for routine and compatibility rules.

## Compatibility contracts

- Browser state remains under `nako-care-state-v2`.
- The shared Firebase record remains `households/our-dog-nako`.
- Routine completion documents remain under `households/our-dog-nako/routineCompletions`.
- Routine completion IDs, Singapore timezone behavior, and the `2026-07-06` fortnightly anchor must remain stable.
- Local data is used first and merged with Firebase data when anonymous Firebase access is available.

## Firebase security limitation

> [!WARNING]
> The public site uses anonymous authentication and one fixed shared household record. Anyone who can open the app may technically access that household data. This refactor documents but does not redesign that security model. A later security project should add real household-member authentication and authorization.

Do not put production secrets in the repository. GitHub Actions reads the existing Firebase service-account secret only during deployment.
