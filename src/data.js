(function () {
function t(en, jp, mm) { return { en, jp: jp || en, mm: mm || en }; }

const ui = {
  en: {
    appTitle: "Nako Home Care",
    appSubtitle: "Food, Nako tracking, and a frequency-based household guide.",
    homeEyebrow: "Maid onboarding guide",
    sections: "Sections",
    foodFirst: "Food and tracking stay at the top because they change often.",
    frequency: "Frequency",
    description: "Description",
    instructions: "Instructions",
    mustRemember: "Must remember",
    checklist: "Checklist",
    video: "Training video",
    videoComingSoon: "Video can be added later.",
    lastCompleted: "Last completed",
    never: "Not completed yet",
    markDoneToday: "Done today",
    completedToday: "Completed today",
    needHelp: "Need help",
    helpRequested: "Help requested",
    memo: "Memo",
    memoPlaceholder: "Add notes, questions, or anything to confirm.",
    cookingRules: "Cooking rules",
    futureTracking: "Tracking placeholder",
    recipes: "Topping recipes",
    recipeName: "Recipe name",
    ingredients: "Ingredients",
    amount: "Amount",
    method: "How to make",
    routineItems: "Routine items",
    foodItems: "Food and tracking items",
    pinnedSafety: "Pinned safety",
    noItems: "No items yet.",
    back: "Back",
  },
  jp: {},
  mm: {},
};
ui.jp = { ...ui.en, appTitle: "Nako Home Care", appSubtitle: "Food, recipes, tracking, and household guide.", homeEyebrow: "Maid guide" };
ui.mm = { ...ui.en, appTitle: "Nako Home Care", appSubtitle: "Food, recipes, tracking, and household guide.", homeEyebrow: "Maid guide" };

const homeSections = [
  sec("food", "F", "#f19a82", "#fff0eb", "Food, Recipes & Nako Tracking", "Recipes, cooking rules, and future daily tracking placeholders."),
  sec("daily", "D", "#f7b7be", "#fff1f2", "Daily / Active", "Tasks that happen every day, after use, or whenever Nako is active."),
  sec("every-2-3-days", "2", "#9bc4db", "#eaf6fb", "Every 2-3 Days", "Fast-build-up areas that are easy to miss."),
  sec("weekly", "W", "#92c9ad", "#e7f6ee", "Weekly", "The main weekly reset list for the home, Nako, and supplies."),
  sec("fortnightly", "14", "#f2c36f", "#fff6df", "Fortnightly", "Bigger refresh tasks that do not need to happen weekly."),
  sec("monthly", "M", "#b7a4d8", "#f2eefb", "Monthly", "Monthly maintenance and deeper cleaning references."),
  sec("quarterly", "Q", "#7db6a5", "#e7f4f0", "Quarterly / Long Interval", "Rare maintenance tasks kept near the bottom."),
  sec("as-needed", "?", "#f19a82", "#fff0eb", "As Needed / Event-Based", "Tasks triggered by shopping, travel, or unusual household needs."),
];

function sec(id, icon, accent, iconBg, title, description) {
  return { id, icon, accent, iconBg, title: t(title), description: t(description) };
}

const cookingRules = [
  t("Cook up to 3 meals a day when needed."),
  t("Focus on high protein and low fat."),
  t("Do not use onion, coriander, parsley, or bean sprouts."),
  t("Ask before using unfamiliar ingredients."),
  t("Ask before changing the menu."),
  t("Clean the kitchen after cooking."),
];

const foodItems = [
  food("recipes", "recipeIndex", "R", "Topping Recipes", "Approved Nako topping recipes with ingredients and amounts.", "Open a recipe before preparing any topping.", "No seasoning, oil, onion, or garlic unless approved.", 1),
  food("cooking-rules", "rules", "!", "Cooking Rules", "Rules to check before cooking or changing any menu.", "Read all rules before cooking.", "Menu changes and unfamiliar ingredients must be confirmed first.", 2),
  food("meal-logs", "placeholder", "L", "Meal Logs", "Future Streamlit tracking for meals, protein target, and notes.", "Placeholder only for now. Detailed meal tracking will be handled later.", "Keep cooking rules visible until tracking is built.", 3),
  food("nako-feeding", "placeholder", "N", "Nako Feeding", "Future tracking for Nako meals, appetite, water, and notes.", "Feed Nako consistently and record appetite later when tracking is added.", "Ask before changing portions or food method.", 4),
  food("nako-weight", "placeholder", "KG", "Nako Weight Tracking", "Future weekly weight log for Nako.", "Weigh Nako Sunday morning before breakfast using the same scale when possible.", "Consistency matters more than exact timing perfection.", 5),
  food("nako-inventory", "placeholder", "I", "Nako Inventory", "Future stock tracking for Nako food, pee pads, wipes, and bags.", "Check Nako supplies weekly and add low-stock items to shopping.", "Tell Edwin early before items fully run out.", 6),
  food("nako-emergency", "placeholder", "!", "Nako Emergency Quick Guide", "Pinned emergency reminder for vomiting, diarrhoea, refusing food, or unsafe behavior.", "Safely isolate Nako, take a photo if useful, and notify Edwin immediately before doing anything else.", "Notify Edwin before doing anything else.", 7),
];

function food(id, type, icon, title, summary, instructions, note, sortOrder) {
  return { id, type, icon, title: t(title), summary: t(summary), instructions: [t(instructions)], mustRemember: [t(note)], videoUrl: "", trackingMode: type === "placeholder" ? "future" : "reference", sortOrder };
}

function routine(id, bucket, sortOrder, icon, title, summary, frequencyText, note) {
  return { id, section: "routine", frequencyBucket: bucket, frequencyText: t(frequencyText), icon, title: t(title), summary: t(summary), instructions: [t(summary)], mustRemember: [t(note)], videoUrl: "", trackingMode: "light", tags: [], sortOrder };
}

const routineTasks = [
  routine("drinking-water-prep", "daily", 10, "W", "Drinking Water Prep", "Boil water, cool it, and store it in the fridge so there is always enough drinking water at home.", "Daily", "This helps reduce the need to keep buying bottled water."),
  routine("clean-up-cooking-appliances", "daily", 20, "K", "Clean Up & Cooking Appliances", "Wash cookware and plates. Wipe kitchen down after every meal. Clean cooking appliances used, including Ninja air fryer, hob, Fujioh hood area, and removable parts if oily or dirty.", "After every meal + as needed", "Do not leave oily cookware, food waste, or greasy appliance parts overnight."),
  routine("coffee-machine-upkeep", "daily", 30, "C", "Coffee Machine Upkeep", "Empty coffee grounds, rinse the drip tray, refill the water tank, and wipe around the De'Longhi coffee machine.", "Daily / after use", "Do not let used coffee grounds or drip tray water sit too long."),
  routine("nako-potty-pen", "daily", 40, "N", "Nako - Potty & Pen", "Pick up poop immediately, change soaked pee pads, clean the tray daily, and wash towels or wipe toys regularly.", "Throughout day", "Clean accidents quickly and keep the pen hygienic."),
  routine("nako-exercise-grooming", "daily", 50, "N", "Nako - Exercise & Grooming", "Do 2 walks daily, wipe paws after returning, brush coat, wipe eyes, and wipe Nako down every night before sleep.", "Daily", "Do not leave her damp after wiping; blow dry gently if needed."),
  routine("nako-training-fun", "daily", 60, "N", "Nako - Dog Training & Fun", "Refresh Nako's commands and do short positive training sessions with treats. Let her out under supervision if she needs to drain energy.", "Daily + as needed", "When out of the pen, use house leash / house line and 100% active supervision."),
  routine("nako-supervision", "daily", 70, "!", "Nako - Supervision", "Whenever Nako is out of the pen, she must wear her collar and house leash / house line and be monitored actively.", "Whenever out of pen / roaming", "Do not leave her roaming unsupervised."),
  routine("nako-kind-handling", "daily", 80, "!", "Nako - Kind Handling Reminder", "Always treat Nako gently, kindly, and humanely. Use calm handling only.", "Always", "Tell Edwin immediately if there is any issue."),
  routine("nako-emergency", "daily", 90, "!", "Nako Emergency", "If she vomits, has diarrhoea, refuses food, or seems unsafe, isolate her safely, take a photo if useful, and notify Edwin immediately.", "Immediately", "Notify Edwin before doing anything else."),
  routine("mail-deliveries", "daily", 100, "P", "Mail & Deliveries", "Check the mailbox daily, bring in packages, answer the door for deliveries, unpack outside, discard packaging, and wipe items before bringing them in.", "Daily", "Do not bring dirty packaging directly into the house."),
  routine("general-tidiness", "daily", 110, "T", "General Tidiness", "Wipe down items left outside and keep them properly back in place so things are not left lying around.", "Daily + as needed", "Do not leave items lying around."),
  routine("floor-cleaning", "daily", 120, "F", "Floor Cleaning", "Sweep and mop daily. Include normal reachable areas under the sofa and cabinets.", "Daily", "Use only stone-safe, pH-neutral cleaners to protect the onyx green marble."),
  routine("rubbish", "daily", 130, "R", "Rubbish", "Take out general trash and dog waste bins daily.", "Daily", "Dog waste bin should not be left to smell."),
  routine("laundry", "daily", 140, "L", "Laundry", "Wash, dry, fold, and iron clothes as needed.", "Daily", "Do not let damp clothes sit too long. Iron work clothes neatly when required."),
  routine("toilet-drain-hair-trap", "daily", 150, "D", "Toilet Drain & Hair Trap Cleaning", "Check bathroom/toilet drain holes and hair traps. Remove hair or stuck debris. Use the drain pump only after being taught.", "Daily check + as needed", "Tell Edwin if water remains stuck or smells bad."),
  routine("high-touch-surfaces", "every-2-3-days", 10, "H", "High-Touch Surface Cleaning", "Clean door knobs, handles, switches, appliance handles, dish area, frequently used surfaces, and Edwin's workspace including keyboard, mouse, and work table.", "Every 2-3 days", "Be gentle around electronics and avoid excess liquid near keyboard or mouse."),
  routine("household-supplies-online", "weekly", 10, "S", "Household Supplies & Online Orders", "Learn to use online platforms such as Shopee to add or order household supplies when running low.", "Weekly check + as needed", "Ask before placing orders until the process is clear."),
  routine("kitchen-sink-drain-rack-counter", "weekly", 20, "K", "Kitchen Sink, Drain, Dish Rack & Countertop", "Deep clean the kitchen sink, drain area, dish rack, and kitchen cabinet countertop. Remove slime, food residue, water stains, and oil marks.", "Weekly", "This is separate from normal after-meal cleanup because these areas build up grime quickly."),
  routine("nako-teeth-ears-nails", "weekly", 30, "N", "Nako - Teeth / Ears / Nails Check", "Brush Nako's teeth if trained for it. Check ears for smell or redness, and check nails or paws for anything unusual.", "Weekly / when taught", "Do not force teeth brushing or nail handling if she resists."),
  routine("nako-weight-tracking", "weekly", 40, "KG", "Nako - Weight Tracking", "Weigh Nako first thing Sunday morning before breakfast and record the date and weight clearly.", "Every Sunday morning before breakfast", "Use the same scale each time where possible."),
  routine("nako-inventory-check", "weekly", 50, "I", "Nako - Inventory Check", "Check Nako's food, treats, pee pads, wipes, poop bags, cleaning spray, and other dog supplies.", "Weekly", "Tell Edwin early before items fully run out."),
  routine("supplement-pill-boxes", "weekly", 60, "P", "Supplement Pill Boxes", "Check and top up daily supplement / pill boxes for Edwin and Yukari when empty or running low.", "Weekly check + when empty", "Keep Edwin's and Yukari's boxes separate. Do not change supplements unless instructed."),
  routine("toilet-cleaning", "weekly", 70, "T", "Toilet Cleaning", "Scrub and wash toilets regularly.", "Weekly", "Keep toilet areas dry and hygienic."),
  routine("rubbish-bin-washing", "weekly", 80, "B", "Rubbish Bin Washing", "Wash rubbish bins, including the dog waste bin if needed. Dry before putting liners back.", "Weekly", "Prevents smell, stains, and pests."),
  routine("pest-check", "weekly", 90, "!", "Pest / Ant / Cockroach Check", "Check kitchen, bins, drains, Nako food area, and under-sink areas for ants, cockroaches, or other pests.", "Weekly", "Tell Edwin immediately if pests are seen."),
  routine("floor-mats", "weekly", 100, "M", "Floor Mats", "Wash the 4 floor mats outside the rooms and toilet.", "Weekly", "Dry completely before placing back to prevent smell, mould, or dampness."),
  routine("bedrooms-linens", "weekly", 110, "B", "Bedrooms & Linens", "Tidy bedrooms and change bedsheets regularly.", "Weekly", "Keep bedsheets and linens fresh."),
  routine("windows-glass-mirrors", "weekly", 120, "G", "Windows, Glass Panels & Mirrors", "Clean all windows, glass panels, mirrors, window sills, frames, and tracks.", "Weekly", "Wipe streak-free where possible. Be careful around window tracks and edges."),
  routine("sofa-covers-pillows", "weekly", 130, "S", "Sofa Covers & Pillows", "Wash the 2 sofa covers and the 2 small square sofa pillows.", "Weekly", "Dry fully before putting back to prevent damp smell."),
  routine("ceiling-fan", "weekly", 140, "F", "Ceiling Fan Cleaning", "Clean and wipe ceiling fan blades and accessible fan surfaces.", "Weekly", "Turn off the fan first. Be careful when using a ladder or stool."),
  routine("fridge-interior", "weekly", 150, "F", "Fridge Interior Cleaning", "Remove items from the fridge, wipe inside surfaces and shelves, then put everything back neatly.", "Weekly", "Check for expired, leaking, or spoiled items."),
  routine("cleaning-tools", "weekly", 160, "C", "Cleaning Tools Maintenance", "Wash mop heads, rinse buckets, clean vacuum filters or parts as needed, replace dirty sponges, and dry cloths properly.", "Weekly + as needed", "Dirty cleaning tools spread smell and dirt instead of cleaning properly."),
  routine("blanket-washing", "fortnightly", 10, "B", "Blanket Washing", "Wash thicker blankets one at a time so one blanket is always available for use.", "Fortnightly", "Do not wash both blankets on the same day."),
  routine("outside-shoe-rack", "fortnightly", 20, "S", "Outside Shoe Rack & Shoes", "Clean the outside shoe rack and surrounding area. Wipe down the shoes.", "Fortnightly", "Keep the area neat and avoid blocking the corridor."),
  routine("curtain-steaming", "fortnightly", 30, "C", "Curtain Steaming", "Use the standing garment steamer / steam iron to steam-clean and freshen the curtains.", "Fortnightly", "Move slowly so the steam heats the fabric properly. Be careful with hot steam."),
  routine("ikea-bed-frame", "fortnightly", 40, "B", "IKEA Bed Frame Under-Compartment Cleaning", "Lift/open the IKEA king-size bed frame storage area and clean dust and hair collected underneath.", "Fortnightly", "Be careful when lifting or opening the bed frame."),
  routine("microwave-interior", "monthly", 10, "M", "Microwave Interior Wipe", "Wipe down the microwave interior, especially after food splatters. Do a complete wipe-down monthly even if it looks clean.", "After use if dirty + monthly", "Clean spills early so stains and smells do not set."),
  routine("general-surface-cleaning", "monthly", 20, "S", "General Surface Cleaning", "Wipe general surfaces including cabinets, cupboards, TV area, router, shelves, vases, handles, and decorative items. Organise if messy.", "Monthly", "Do ad hoc cleaning sooner if dusty, sticky, oily, or after spills."),
  routine("pillow-mattress-vacuuming", "monthly", 30, "P", "Pillow & Mattress Vacuuming", "Vacuum pillows and accessible mattress surfaces using a small mattress/pillow vacuum cleaner after one is bought.", "Monthly", "Mattress is heavy, so no full mattress airing for now."),
  routine("aircon-filter-fan-coil", "monthly", 40, "A", "Aircon Filter & Fan Coil Wipe", "Clean aircon filters and lightly wipe accessible fan coil surfaces after being taught.", "Monthly", "Only do safe, accessible parts. Do not dismantle deeper parts."),
  routine("washer-deep-clean", "quarterly", 10, "W", "Washer Deep Clean", "Empty drum deep clean: rinse detergent drawer, clean pump filter, treat rubber-seal mould, wipe exterior and vents, and optionally run a 90C empty wash with descaler or citric acid.", "Quarterly", "For pump filter: open bottom flap, place tray, drain water, unscrew cap, remove debris, and refit securely."),
  routine("doorbell-charging", "quarterly", 20, "D", "Doorbell Charging", "Charge the Dling doorbell regularly so it does not run out of battery.", "Quarterly / every 3 months", "Check battery level if the app shows low battery earlier."),
  routine("coffee-machine-descaling", "quarterly", 30, "C", "Coffee Machine Descaling", "Descale the coffee machine when it blinks/shows the descaling indicator, or every 4-6 months depending on usage.", "Ad hoc / every 4-6 months", "Follow the machine indicator and use the correct descaling process."),
  routine("grocery-shopping", "as-needed", 10, "G", "Grocery Shopping", "Restock pantry and fridge. Check what food is running low before buying.", "As needed", "Coordinate before buying larger or unusual items."),
  routine("yukari-flight-packing", "as-needed", 20, "Y", "Yukari - Flight Work Packing", "Help pack and unpack Yukari's work items and luggage when she needs to fly.", "When Yukari has flights", "Check uniform/work items, toiletries, chargers, and anything needed for flight duty."),
  routine("general-household-duties", "as-needed", 30, "H", "General Household Duties", "Catch-all for reasonable household duties not specifically listed above. This list may be adjusted as required.", "Ad hoc / as needed", "Use common sense. Ask if unsure, especially if outside normal household duties."),
];

const recipes = [
  recipe("sasami", "Chicken tender topping", [["Chicken tender", "100g", "chicken-tender"], ["Pumpkin", "40g", "pumpkin"], ["Carrot", "40g", "carrot"]], ["Boil or steam the chicken tender until fully cooked.", "Steam pumpkin and carrot until soft.", "Cool, cut small, and mix only the approved amount with food."], "No seasoning, oil, onion, or garlic."),
  recipe("whitefish", "White fish topping", [["White fish", "100g", "whitefish"], ["Sweet potato", "40g", "sweet-potato"], ["Zucchini", "40g", "zucchini"]], ["Steam or boil the white fish and remove all bones carefully.", "Steam sweet potato and zucchini until soft.", "Cool everything and break into small pieces before serving."], "Check carefully for fish bones before serving."),
  recipe("chickenbreast", "Chicken breast topping", [["Chicken breast", "100g", "chicken-breast"], ["Napa cabbage", "40g", "napa-cabbage"], ["Broccoli", "30g", "broccoli"]], ["Boil chicken breast until fully cooked and shred finely.", "Steam napa cabbage and broccoli until soft.", "Cool, chop small, and mix gently with the regular meal."], "Use plain cooked ingredients only."),
];

function recipe(id, title, ingredients, method, note) {
  return { id, icon: "R", title: t(title), description: t("Approved topping recipe for Nako."), ingredients: ingredients.map(([name, amount, key]) => ({ key, name: t(name), amount })), method: method.map((step) => t(step)), note: t(note) };
}

window.nakoData = { langs: ["en", "jp", "mm"], ui, homeSections, foodItems, routineTasks, recipes, cookingRules };

})();
