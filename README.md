# Nako Home Care

A lightweight, mobile-first, multi-language onboarding guide designed for household management and dog care. It serves as a reference dashboard for home management helper routines, cooking rules, dog-care instructions, and approved recipes.

## 🌟 Features

- **Frequency-Based Routines**: Onboarding references categorized by frequency (Daily, Weekly, Fortnightly, Monthly, Quarterly, and As Needed) to organize home management guidance.
- **Dog Care & Tracking (Nako)**: Specific protocols for Nako (the resident dog) including walks, feeding, grooming, weight checks, supply inventory, and emergency quick references.
- **Recipes & Cooking Guidelines**: Clear instructions for preparing approved dog-food toppings (e.g., Chicken Tender, Whitefish, and Chicken Breast) with precise ingredient proportions and general cooking restrictions (no onion, garlic, seasoning, etc.).
- **Reference Notes**: Food and reference pages can keep text memos for questions or future tracking notes.
- **Memo Persistence**: Uses browser `localStorage` first, then syncs notes to Firestore when Firebase Auth and Firestore are available.
- **Routine Check-in**: Tracks only curated recurring maintenance tasks with Singapore-time cycle keys, optional notes/date edits, history, and automatic Nako-weight completion.
- **Food Safety Reference**: A standalone top-level reference section detailing safe storage, preparation, cooking, and leftover handling rules in three languages.
- **Multi-Language Support**: Instantly toggles UI text and data descriptions between English (**EN**), Japanese (**JP**), and Burmese (**MM**).

## 🛠️ Technology Stack

- **HTML5 & Semantic Elements**: Simple and clean page structure.
- **CSS3 (Vanilla CSS)**: Responsive, modern cards, color tokens, and smooth interactions optimized for mobile and desktop screens.
- **Vanilla JavaScript (ES6+)**: Light virtual-routing, state management, event delegation, dynamic SVG generator, and rendering logic.
- **Firebase Hosting + Firebase SDK v8 reserved URLs**: Optional anonymous Auth, Firestore memo sync, and Storage helpers/rules when deployed on Firebase Hosting.
- **No Build Step**: The app stays serverless and lightweight.

## 📂 Project Structure

```text
├── index.html              # The main entrypoint HTML structure
├── firebase.json           # Firebase Hosting, Firestore, and Storage config
├── firestore.rules         # Per-user Firestore state access
├── storage.rules           # Per-user Storage uploads and public read-only assets
├── assets/                 # Project assets
│   └── nako-logo.png
└── src/
    ├── firebase.js         # Optional Firebase Auth/Firestore/Storage bridge
    ├── app.js              # App logic: routing, shell generation, memo state, and event handlers
    ├── data.js             # Central database: translations, tasks, recipes, and rules
    └── styles.css          # Main stylesheet with layout and design tokens
```

## 🚀 How to Run

1. Clone this repository or download the source folder.
2. Open `index.html` in any modern web browser for local-only mode.
3. For Firebase mode, run `firebase emulators:start --only hosting,auth,firestore,storage` or deploy with `firebase deploy`.

## 🔥 Firebase Setup

The Firebase project alias is `nako-home-care` in `.firebaserc`.

Before cloud sync will work, enable these Firebase products in the Firebase console:

- **Authentication**: enable Anonymous sign-in.
- **Cloud Firestore**: create the database, then deploy `firestore.rules`.
- **Cloud Storage**: create the bucket, then deploy `storage.rules`.

The deployed app uses Firebase Hosting reserved URLs from `index.html`, so the Firebase web config is supplied automatically by Hosting. If the SDK/init URLs are unavailable, the app stays functional in local-only mode and keeps data in `localStorage`.

### Shared Household Architecture

The app is configured to use one fixed shared household record: `our-dog-nako`.
* **Single Shared Record**: All devices automatically connect and sync to `households/our-dog-nako` (and `households/our-dog-nako/routineCompletions`).
* **No Configurable Sync Code**: There is no user-configurable household code UI, prompts, or options.
* **Storage Independence**: Clearing browser storage does not reset or create a different household, as all devices default to the same fixed shared household record.
* **Anonymous Authentication**: The site still uses anonymous authentication to establish a secure session with Firebase, allowing direct synchronization of diary entries, food logs, training progress, weight tracking, and routine check-ins.

### Household access security

> [!WARNING]
> Because the app is publicly accessible and uses anonymous authentication, anyone who can open the app may technically access the same shared household data. Proper private access would require household-member authentication in a future update.

## 🏡 Adding or Changing a Household Routine

To maintain the single source of truth for the Routine Check-in and frequency pages, please refer to the detailed guidelines in [AGENTS.md](file:///g:/My%20Drive/Dropbox/Downloads/Academics/Python/Nako%20app/AGENTS.md).

Briefly, when adding or changing a routine item:
1. Define the task *only* in `src/data/routine_tasks.js`.
2. Do not maintain separate tracking arrays; non-daily cadences are automatically tracked unless explicitly excluded in the exclusions map.
3. Keep stable IDs and supply translations for English, Japanese, and Burmese.

Useful commands:

```powershell
node scripts/check_translations.js
firebase emulators:start --only hosting,auth,firestore,storage
firebase deploy --only hosting,firestore:rules,storage
```
