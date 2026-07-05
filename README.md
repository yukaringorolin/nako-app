# Nako Home Care

A lightweight, mobile-first, multi-language interactive training guide and routine tracker designed for household management and dog care. It serves as an onboarding dashboard for home management helper routines, cooking rules, dog-care instructions, and approved recipes.

## 🌟 Features

- **Frequency-Based Routines**: Interactive checklists categorized by frequency (Daily, Every 2-3 Days, Weekly, Fortnightly, Monthly, Quarterly, and As Needed) to organize and track home management.
- **Dog Care & Tracking (Nako)**: Specific protocols for Nako (the resident dog) including walks, feeding, grooming, weight checks, supply inventory, and emergency quick references.
- **Recipes & Cooking Guidelines**: Clear instructions for preparing approved dog-food toppings (e.g., Chicken Tender, Whitefish, and Chicken Breast) with precise ingredient proportions and general cooking restrictions (no onion, garlic, seasoning, etc.).
- **Interactive Checklists & Logging**: Ability to check off sub-tasks, record completion dates, flag tasks requiring help, and write custom memos or questions.
- **State Persistence**: Uses browser `localStorage` to save completion states, checklist progress, help flags, and text memos so progress is not lost on reload.
- **Multi-Language Support**: Instantly toggles UI text and data descriptions between English (**EN**), Japanese (**JP**), and Burmese (**MM**).

## 🛠️ Technology Stack

- **HTML5 & Semantic Elements**: Simple and clean page structure.
- **CSS3 (Vanilla CSS)**: Responsive, modern cards, color tokens, and smooth interactions optimized for mobile and desktop screens.
- **Vanilla JavaScript (ES6+)**: Light virtual-routing, state management, event delegation, dynamic SVG generator, and rendering logic.
- **No Dependencies**: 100% serverless and lightweight—runs instantly in any browser.

## 📂 Project Structure

```text
├── index.html       # The main entrypoint HTML structure
├── assets/          # Project assets
│   └── nako-logo.png
└── src/
    ├── app.js       # App logic: routing, shell generation, state and event handlers
    ├── data.js      # Central database: translations, tasks, recipes, and rules
    └── styles.css   # Main stylesheet with layout and design tokens
```

## 🚀 How to Run

1. Clone this repository or download the source folder.
2. Open `index.html` in any modern web browser.
3. No build steps, packages, or HTTP servers are required!
