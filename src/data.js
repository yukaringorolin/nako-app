(function () {
function t(en, jp, mm) {
  // If jp or mm are omitted, fallback to english and flag as missing
  return {
    en: en || "",
    jp: jp || en || "",
    mm: mm || en || "",
    _missingJp: !jp,
    _missingMm: !mm
  };
}

function sec(id, icon, accent, iconBg, title, description, image = "") {
  return { id, icon, accent, iconBg, title, description, image };
}

function sameTranslation(first, second) {
  return ["en", "jp", "mm"].every((lang) => String(first?.[lang] || "").trim() === String(second?.[lang] || "").trim());
}

function instructionList(summary, instructions) {
  const list = Array.isArray(instructions) ? instructions : [instructions];
  return list.filter(Boolean).filter((item) => !sameTranslation(summary, item));
}


function food(id, type, icon, title, summary, instructions, note, sortOrder, photos = [], attrs = {}) {
  return { id, type, icon, title, summary, instructions: instructionList(summary, instructions), mustRemember: Array.isArray(note) ? note : [note], photos, videoUrl: "", trackingMode: type === "placeholder" ? "future" : "reference", sortOrder, ...attrs };
}

function photo(src, alt, caption) {
  return { src, alt, caption };
}

function ingredient(name, amount, key, alternatives = [], macros = null) {
  return { name, amount, key, alternatives, macros };
}

function ingredientOption(key, name) {
  return { key, name };
}

function routine(id, bucket, sortOrder, icon, title, summary, frequencyText, note, photos = [], attrs = {}) {
  return { id, section: "routine", frequencyBucket: bucket, frequencyText, icon, title, summary, instructions: [], mustRemember: Array.isArray(note) ? note : [note], photos, videoUrl: "", trackingMode: "none", trackingCadence: null, trackingAnchor: null, active: true, tags: [], sortOrder, itemKind: "reference", trackingExclusionReason: null, ...attrs };
}


function recipe(id, title, ingredients, method, note, photos = [], type = "dog", attrs = {}) {
  const isHuman = type === "human";
  return { 
    id, 
    icon: "R", 
    title, 
    description: isHuman 
      ? t("Japanese home-cooked recipe idea.", "日本の家庭料理レシピのアイデア。", "ဂျပန်အိမ်ချက် ဟင်းချက်နည်းအိုင်ဒီယာ။")
      : t("Approved topping recipe for Nako.", "ナコ用の承認されたトッピングレシピ。", "Nako အတွက် ခွင့်ပြုထားသော အပေါ်မှတင်ရန် ဟင်းချက်နည်း။"),
    ingredients: ingredients.map((entry) => {
      if (Array.isArray(entry)) {
        const [name, amount, key, macros] = entry;
        return {
          key,
          name,
          amount,
          macros: macros || null,
          alternatives: []
        };
      }

      return {
        ...entry,
        macros: entry.macros || null,
        alternatives: entry.alternatives || []
      };
    }),
    method, 
    note: isHuman ? note : (photos.length > 0 ? note : recipeNote(note)),
    photos,
    type,
    ...attrs
  };
}

function recipeNote(note) {
  return {
    en: `TBC - this recipe has not been tried yet and no photos have been added. ${note.en}`,
    jp: `TBC - このレシピはまだ試しておらず、写真もまだ追加されていません。${note.jp}`,
    mm: `TBC - ဤဟင်းချက်နည်းကို မစမ်းရသေးပြီး ဓာတ်ပုံများလည်း မထည့်ရသေးပါ။ ${note.mm}`,
    _missingJp: note._missingJp,
    _missingMm: note._missingMm
  };
}

function safetyItem(id, icon, title, summary, instructions, mustRemember, photos = []) {
  return { id, icon, title, summary, instructions, mustRemember: Array.isArray(mustRemember) ? mustRemember : [mustRemember], photos };
}



const ui = {
  en: {
    appTitle: "Nako Home Care",
    appSubtitle: "Food, Nako care, and home tasks.",
    homeEyebrow: "Helper guide",
    language: "Language",
    sections: "Sections",
    today: "Today",
    dailyGuideEyebrow: "Review every day",
    dailyGuideReference: "Reference guide: no check-off",
    dailyReferenceItems: "reference items",
    openDailyGuide: "Open guide",
    foodFirst: "Food and logs are first.",
    frequency: "When",
    groceryKeepStock: "Always keep in stock",
    groceryByShop: "Shop by store",
    groceryBuyingInstructions: "How to buy",
    relatedPage: "Related page",
    relatedHumanFoodDescription: "Recipes and meal ideas for Edwin.",
    relatedDailyCooking: "Daily Cooking",
    relatedDailyCookingDescription: "Daily cooking guide and kitchen reminders.",
    relatedGroceryShopping: "Grocery Shopping",
    relatedGroceryShoppingDescription: "Shop-by-shop grocery list and reminders.",
    relatedKitchenSafety: "Kitchen Rules & Food Safety",
    relatedKitchenSafetyDescription: "Kitchen rules and food safety guidance.",
    description: "Description",
    instructions: "Steps",
    photos: "Photos",
    appetiteTracker: "Appetite Tracker",
    appetiteDate: "Date",
    appetitePercentage: "How much did Nako eat?",
    appetiteKibbleGrams: "Kibble eaten",
    appetiteFrozenFoodCubes: "Frozen food cubes eaten",
    appetiteNote: "Feeding changes (optional)",
    appetiteNotePlaceholder: "Note any deviation from the usual amount, such as extra kibble or frozen food given.",
    appetiteHistory: "Last 30 days",
    appetiteNoHistory: "No appetite entries yet.",
    appetiteSaved: "Saved",
    appetiteEdit: "Edit",
    appetiteBackToday: "Back to today",
    appetiteNotify: "If Nako refuses food or her appetite is unusual, tell Edwin.",
    appetiteSelectFirst: "Choose a percentage before adding food amounts or a note.",
    mustRemember: "Remember",
    video: "Training video",
    memo: "Memo",
    memoPlaceholder: "Add notes, questions, or anything to confirm.",
    cookingRules: "Cooking rules",
    householdCookingRules: "Household Cooking Rules",
    foodStorage: "Food Storage",
    foodPreparation: "Food Preparation",
    cookingTemperatures: "Cooking Temperatures",
    leftoversRefrigeration: "Leftovers and Refrigeration",
    cleaningCrossContamination: "Cleaning and Cross-Contamination",
    futureTracking: "Coming later",
    recipes: "Nako Topping Recipes",
    recipeName: "Recipe name",
    ingredients: "Ingredients",
    amount: "Amount",
    method: "How to make",
    routineItems: "Tasks",
    foodItems: "Food and logs",
    pinnedSafety: "Safety first",
    dailyGuideGroupStartTitle: "Start Here",
    dailyGuideGroupStartDescription: "Check today's plans and keep the shared album updated.",
    dailyGuideGroupFoodTitle: "Food & Kitchen",
    dailyGuideGroupFoodDescription: "Prepare meals, drinks, groceries, and clean-up.",
    dailyGuideGroupNakoTitle: "Nako Daily Care",
    dailyGuideGroupNakoDescription: "Meals, hygiene, exercise, training, and outings.",
    dailyGuideGroupHomeTitle: "Home Care",
    dailyGuideGroupHomeDescription: "Keep shared spaces clean, tidy, and ready to use.",
    dailyGuideGroupAdminTitle: "Admin & Supplies",
    dailyGuideGroupAdminDescription: "Handle deliveries, notes, and household stock.",
    dailyGuideGroupSafetyTitle: "Safety First",
    dailyGuideGroupSafetyDescription: "Essential supervision, kind handling, and emergency guidance.",
    weeklyGuideGroupNakoTitle: "Nako Weekly Care",
    weeklyGuideGroupNakoDescription: "Deep-clean her space, check supplies, and record her weight.",
    weeklyGuideGroupKitchenTitle: "Kitchen & Health",
    weeklyGuideGroupKitchenDescription: "Deep-clean kitchen areas and keep food and supplements in order.",
    weeklyGuideGroupHomeTitle: "Whole-Home Cleaning",
    weeklyGuideGroupHomeDescription: "Clean the fixtures, floors, bins, glass, and fans around the home.",
    weeklyGuideGroupLivingTitle: "Living Spaces & Maintenance",
    weeklyGuideGroupLivingDescription: "Refresh linens and upholstery, then maintain tools and watch for pests.",
    safetyReferences: "Safety",
    noItems: "No items yet.",
    back: "Back",
    humanRecipes: "Human recipes",
    menuAdd: "Add to menu",
    menuRemove: "Remove from menu",
    menuSelected: "selected",
    menuSelectionLimit: "You can select up to 5 foods.",
    menuShare: "Share menu",
    menuShareIntro: "Want to eat…",
    menuShareIngredients: "You will need:",
    menuShared: "Menu shared.",
    menuCopied: "Menu copied. Paste it into your chat.",
    menuShareFailed: "Could not share or copy the menu.",
    foodMemoryTitle: "Food Memories 2024",
    foodMemoryDescription: "Meals Yukari cooked for Edwin during their first 3–4 months together.",
    weightTrend: "Weight Trend",
    weightLog: "Weekly Log",
    weightGraphPlaceholder: "Enter at least 2 weight logs to show the trend graph.",
    quickEntry: "Quick Entry",
    recentEntries: "Recent Entries",
    archive: "Archive",
    selectYear: "Select Year",
    noWeightYet: "No weight yet",
    previous: "Previous",
    latestDueSunday: "Latest due Sunday",
    syncCloud: "Cloud sync on",
    syncLocal: "Local only",
    syncConnecting: "Connecting sync",
    syncOff: "Cloud sync off",
    quickShortcuts: "Quick links",
    shortcutNakoWeight: "Nako Weight Tracking",
    shortcutAppetiteTracker: "Nako Appetite Tracker",
    shortcutMealLogs: "Edwin Meal Logs",
    shortcutNakoToppings: "Nako Topping Recipes",
    shortcutHumanFood: "Human Food Ideas",
    shortcutCookingRules: "Cooking Rules For Humans",
    shortcutDogTraining: "Nako Dog Training",
    shortcutDiary: "Diary & Feedback",
    highProtein: "High Protein",
    diaryToday: "Today's Diary",
    diaryDate: "Date",
    diaryPrompt: "This is your diary. Write anything on your mind: how the day felt, questions, feedback, worries, missing family, or anything you want to remember.",
    diaryPlaceholder: "Write freely here. It is okay to use Japanese, Burmese, or English.",
    diarySubmit: "Submit diary",
    diaryUpdate: "Update diary",
    diarySaving: "Saving...",
    diarySavedStatus: "Saved",
    diarySavedEntry: "Saved diary",
    diaryEntryText: "Diary entry",
    diaryRecent: "Recent diary entries",
    diaryNoEntries: "No diary entries yet.",
    diaryEmptyError: "Please write something before submitting.",
    diarySaved: "Diary saved.",
    diaryWhatsApp: "Open WhatsApp notice",
    diaryWhatsAppMessage: "I logged today's diary in the Nako Home Care app.",
    diaryLastUpdated: "Last updated",
    diaryOriginal: "Original diary",
    diaryManualTranslations: "Manual translations",
    diaryJapaneseTranslation: "Japanese translation",
    diaryMyanmarTranslation: "Myanmar translation",
    diaryTranslationPlaceholder: "Add manual translation here.",
    diaryCurrentLanguagePreview: "Current language preview",
    diaryTranslationWarning: "Original text changed - please review translations",
    nutritionEstimate: "Estimated macros",
    nutritionWholeRecipe: "Whole recipe total",
    calories: "Calories",
    protein: "Protein",
    carbohydrates: "Carbs",
    fat: "Fat",
    nutritionBasis: "Calculation basis",
    nutritionDisclaimer: "Estimated from the listed ingredient weights. Actual values may vary by brand, preparation, cooking and food left in the pan.",
    routineCheckIn: "Routine Check-in",
    routineCheckInSubtitle: "Track selected daily inputs plus weekly, fortnightly, monthly, quarterly, and one-off tasks here. Other daily and as-needed references are not shown.",
    routineHistory: "Routine History",
    routineHomeRemaining: "{count} tasks remaining",
    routineTasksRemaining: "Tasks remaining",
    routineCadenceRemaining: "{cadence}: {count} remaining",
    backToRoutineCheckIn: "Back to Routine Check-in",
    routineHomeComplete: "All current tasks completed",
    currentSingaporeDate: "Singapore date",
    currentPeriods: "Current periods",
    due: "Due",
    completed: "Completed",
    progressSummary: "{done} of {total} completed",
    cadenceDaily: "Daily",
    cadenceWeekly: "Weekly",
    cadenceFortnightly: "Fortnightly",
    cadenceMonthly: "Monthly",
    cadenceQuarterly: "Quarterly",
    cadenceOneOff: "One-off",
    dueThisPeriod: "Due this period",
    openInstructions: "Instructions",
    markComplete: "Mark complete",
    editCompletion: "Edit completion",
    completionDate: "Date",
    addNote: "Add note",
    notePlaceholder: "Optional note",
    savedNote: "Saved note",
    savedTextStatus: "Saved",
    saveNote: "Save note",
    saveChanges: "Save changes",
    editNote: "Edit note",
    deleteNote: "Delete note",
    cancel: "Cancel",
    draftRecovered: "Unsaved draft recovered on this device.",
    textEmptyError: "Please write something before saving.",
    confirmDeleteNote: "Delete this saved note? The completion or daily record will remain.",
    noteSaved: "Note saved.",
    noteDeleted: "Note deleted.",
    editDiary: "Edit diary",
    deleteDiaryEntry: "Delete diary",
    confirmDeleteDiaryEntry: "Delete this saved diary entry?",
    diaryDeleted: "Diary entry deleted.",
    metricOpenWeight: "Add weight",
    metricCompleted: "Weight saved",
    inputOpenTracker: "Open appetite tracker",
    appetiteCompletion: "Appetite saved: {percentage}%",
    weightNote: "Weight: {weight} kg",
    undo: "Undo",
    completionSaved: "Completion saved.",
    completionRemoved: "Completion removed.",
    backdatePreviousCycle: "Saved to the earlier cycle. The current cycle remains incomplete.",
    historyIntro: "Newest records first.",
    filterTask: "Task",
    filterCadence: "Schedule",
    filterFrom: "From",
    filterTo: "To",
    allTasks: "All tasks",
    allCadences: "All schedules",
    noRoutineHistory: "No matching completion history.",
    notCompleted: "Not completed",
    removeCompletion: "Remove completion",
    confirmRemoveCompletion: "Remove this completion?",
    oneOffLifetime: "Lifetime",
    currentWeightDate: "This week's weight date",
    routineDateInvalid: "Choose a valid date.",
    routinePeriodRange: "{start} – {end}",
    searchPlaceholder: "Search Nako care, food, or tasks",
    searchLabel: "Search",
    clearSearch: "Clear search",
    quickFind: "Quick find",
    noResults: "No results found",
    tryAnotherKeyword: "Try another keyword",
    resultCount: "{count} results",
    resultCountOne: "1 result",
    searchResults: "Search results",
    badgeRoutine: "Routine",
    badgeFood: "Food",
    badgeFoodSafety: "Food Safety",
    badgeRecipe: "Recipe",
    badgeTraining: "Training",
    badgeReference: "Reference",
    badgeSection: "Section",
  },
  jp: {
    appTitle: "Nako Home Care",
    appSubtitle: "食事、Nakoのお世話、家事。",
    homeEyebrow: "ヘルパーガイド",
    language: "言語",
    sections: "セクション",
    today: "今日",
    dailyGuideEyebrow: "毎日確認",
    dailyGuideReference: "参考ガイド：チェック不要",
    dailyReferenceItems: "参考項目",
    openDailyGuide: "ガイドを開く",
    foodFirst: "食事と記録を先に表示します。",
    frequency: "いつ",
    groceryKeepStock: "常に在庫しておくもの",
    groceryByShop: "店ごとに買う",
    groceryBuyingInstructions: "買い方",
    relatedPage: "関連ページ",
    relatedHumanFoodDescription: "エドウィンのためのレシピと食事アイデアです。",
    relatedDailyCooking: "毎日の料理",
    relatedDailyCookingDescription: "毎日の料理ガイドとキッチンの注意事項です。",
    relatedGroceryShopping: "食料品の買い物",
    relatedGroceryShoppingDescription: "店ごとの買い物リストと注意事項です。",
    relatedKitchenSafety: "キッチンルール・食品安全",
    relatedKitchenSafetyDescription: "キッチンルールと食品安全のガイドです。",
    description: "説明",
    instructions: "手順",
    photos: "写真",
    appetiteTracker: "食欲トラッカー",
    appetiteDate: "日付",
    appetitePercentage: "ナコはどのくらい食べましたか？",
    appetiteKibbleGrams: "食べたドライフード",
    appetiteFrozenFoodCubes: "食べた冷凍フードキューブ数",
    appetiteNote: "給餌量の変更（任意）",
    appetiteNotePlaceholder: "いつもの量と違う場合は、ドライフードや冷凍フードを多く与えたなど、変更内容を記録してください。",
    appetiteHistory: "過去30日",
    appetiteNoHistory: "食欲の記録はまだありません。",
    appetiteSaved: "保存済み",
    appetiteEdit: "編集",
    appetiteBackToday: "今日に戻る",
    appetiteNotify: "ナコが食べない、または食欲がいつもと違う場合は、Edwinに伝えてください。",
    appetiteSelectFirst: "割合を選んでから、フードの量やメモを追加してください。",
    mustRemember: "注意",
    video: "トレーニング動画",
    memo: "メモ",
    memoPlaceholder: "メモ、質問、または確認したいことを追加してください。",
    cookingRules: "料理ルール",
    householdCookingRules: "家庭の料理ルール",
    foodStorage: "食品の保存",
    foodPreparation: "食品の下ごしらえ",
    cookingTemperatures: "調理温度",
    leftoversRefrigeration: "残り物と冷蔵保存",
    cleaningCrossContamination: "清掃と交差汚染防止",
    futureTracking: "後で追加",
    recipes: "ナコのトッピングレシピ",
    recipeName: "レシピ名",
    ingredients: "材料",
    amount: "分量",
    method: "作り方",
    routineItems: "タスク",
    foodItems: "食事と記録",
    pinnedSafety: "安全第一",
    dailyGuideGroupStartTitle: "最初に確認",
    dailyGuideGroupStartDescription: "今日の予定を確認し、共有アルバムを更新します。",
    dailyGuideGroupFoodTitle: "食事・キッチン",
    dailyGuideGroupFoodDescription: "食事、飲み物、買い物、後片付けを行います。",
    dailyGuideGroupNakoTitle: "ナコの日常ケア",
    dailyGuideGroupNakoDescription: "食事、衛生、運動、トレーニング、外出のケアです。",
    dailyGuideGroupHomeTitle: "家のケア",
    dailyGuideGroupHomeDescription: "共有スペースを清潔に整え、すぐ使える状態に保ちます。",
    dailyGuideGroupAdminTitle: "連絡・備品",
    dailyGuideGroupAdminDescription: "配達物、記録、家庭用品の在庫を管理します。",
    dailyGuideGroupSafetyTitle: "安全第一",
    dailyGuideGroupSafetyDescription: "見守り、やさしい扱い、緊急時の大切な案内です。",
    weeklyGuideGroupNakoTitle: "ナコの週次ケア",
    weeklyGuideGroupNakoDescription: "ナコのスペースを徹底掃除し、用品を確認し、体重を記録します。",
    weeklyGuideGroupKitchenTitle: "キッチン・健康管理",
    weeklyGuideGroupKitchenDescription: "キッチンを徹底掃除し、食品とサプリメントを整えます。",
    weeklyGuideGroupHomeTitle: "家全体の掃除",
    weeklyGuideGroupHomeDescription: "家中のよく触る場所、トイレ、床、ゴミ箱、ガラス、扇風機を掃除します。",
    weeklyGuideGroupLivingTitle: "居住空間・メンテナンス",
    weeklyGuideGroupLivingDescription: "寝具とソファを整え、掃除道具を手入れし、害虫を確認します。",
    safetyReferences: "安全",
    noItems: "項目はありません。",
    back: "戻る",
    humanRecipes: "人間のレシピ",
    menuAdd: "メニューに追加",
    menuRemove: "メニューから外す",
    menuSelected: "件選択中",
    menuSelectionLimit: "料理は5品まで選べます。",
    menuShare: "メニューを共有",
    menuShareIntro: "食べたいもの…",
    menuShareIngredients: "必要な材料:",
    menuShared: "メニューを共有しました。",
    menuCopied: "メニューをコピーしました。チャットに貼り付けてください。",
    menuShareFailed: "メニューを共有またはコピーできませんでした。",
    foodMemoryTitle: "2024年の食の思い出",
    foodMemoryDescription: "付き合い始めて最初の3〜4か月に、ゆかりがエドウィンのために作った料理。",
    weightTrend: "体重推移",
    weightLog: "週次ログ",
    weightGraphPlaceholder: "推移グラフを表示するには、体重を2件以上入力してください。",
    quickEntry: "クイック入力",
    recentEntries: "最近の記録",
    archive: "アーカイブ",
    selectYear: "年を選択",
    noWeightYet: "体重の記録がまだありません",
    previous: "前回",
    latestDueSunday: "直近の日曜日",
    syncCloud: "クラウド同期オン",
    syncLocal: "ローカルのみ",
    syncConnecting: "同期接続中",
    syncOff: "クラウド同期オフ",
    quickShortcuts: "よく使う項目",
    shortcutNakoWeight: "ナコの体重測定",
    shortcutAppetiteTracker: "ナコの食欲トラッカー",
    shortcutMealLogs: "エドウィンの食事記録",
    shortcutNakoToppings: "ナコのトッピングレシピ",
    shortcutHumanFood: "人間の食事アイデア",
    shortcutCookingRules: "人間用の料理ルール",
    shortcutDogTraining: "ナコのドッグトレーニング",
    shortcutDiary: "日記・フィードバック",
    highProtein: "高タンパク",
    diaryToday: "今日の日記",
    diaryDate: "日付",
    diaryPrompt: "これはあなたの日記です。今日の気持ち、質問、フィードバック、心配なこと、家族が恋しい気持ち、覚えておきたいことなど、心にあることを自由に書いてください。",
    diaryPlaceholder: "ここに自由に書いてください。日本語、ミャンマー語、英語のどれでも大丈夫です。",
    diarySubmit: "日記を送信",
    diaryUpdate: "日記を更新",
    diarySaving: "保存中...",
    diarySavedStatus: "保存済み",
    diarySavedEntry: "保存した日記",
    diaryEntryText: "日記の内容",
    diaryRecent: "最近の日記",
    diaryNoEntries: "日記はまだありません。",
    diaryEmptyError: "送信する前に内容を書いてください。",
    diarySaved: "日記を保存しました。",
    diaryWhatsApp: "WhatsApp通知を開く",
    diaryWhatsAppMessage: "Nako Home Careアプリに今日の日記を記録しました。",
    diaryLastUpdated: "最終更新",
    diaryOriginal: "元のテキスト",
    diaryManualTranslations: "手動翻訳",
    diaryJapaneseTranslation: "日本語翻訳",
    diaryMyanmarTranslation: "ミャンマー語翻訳",
    diaryTranslationPlaceholder: "ここに手動翻訳を追加してください。",
    diaryCurrentLanguagePreview: "現在の言語プレビュー",
    diaryTranslationWarning: "元のテキストが変更されました。翻訳を確認してください。",
    nutritionEstimate: "推定マクロ",
    nutritionWholeRecipe: "レシピ全量",
    calories: "カロリー",
    protein: "たんぱく質",
    carbohydrates: "炭水化物",
    fat: "脂質",
    nutritionBasis: "計算条件",
    nutritionDisclaimer: "記載された材料重量に基づく推定値です。ブランド、下処理、調理方法、鍋に残る量によって実際の値は変わる場合があります。",
    routineCheckIn: "ルーティンチェックイン",
    routineCheckInSubtitle: "選択された毎日の入力項目と、週次、隔週、月次、四半期、単発のタスクをここで記録します。その他の毎日・随時の参考項目は表示されません。",
    routineHistory: "ルーティン履歴",
    routineHomeRemaining: "タスクがあと{count}件",
    routineTasksRemaining: "残りのタスク",
    routineCadenceRemaining: "{cadence}：残り{count}件",
    backToRoutineCheckIn: "ルーティンチェックインに戻る",
    routineHomeComplete: "現在のタスクはすべて完了しました",
    currentSingaporeDate: "シンガポールの日付",
    currentPeriods: "現在の期間",
    due: "未完了",
    completed: "完了",
    progressSummary: "{total}件中{done}件完了",
    cadenceDaily: "毎日",
    cadenceWeekly: "毎週",
    cadenceFortnightly: "2週間ごと",
    cadenceMonthly: "毎月",
    cadenceQuarterly: "3か月ごと",
    cadenceOneOff: "1回限り",
    dueThisPeriod: "この期間に実施",
    openInstructions: "手順を見る",
    markComplete: "完了にする",
    editCompletion: "完了内容を編集",
    completionDate: "日付",
    addNote: "メモを追加",
    notePlaceholder: "任意のメモ",
    savedNote: "保存したメモ",
    savedTextStatus: "保存済み",
    saveNote: "メモを保存",
    saveChanges: "変更を保存",
    editNote: "メモを編集",
    deleteNote: "メモを削除",
    cancel: "キャンセル",
    draftRecovered: "この端末に残っていた未保存の下書きを復元しました。",
    textEmptyError: "保存する前に内容を入力してください。",
    confirmDeleteNote: "この保存済みメモを削除しますか？完了記録や日ごとの記録は残ります。",
    noteSaved: "メモを保存しました。",
    noteDeleted: "メモを削除しました。",
    editDiary: "日記を編集",
    deleteDiaryEntry: "日記を削除",
    confirmDeleteDiaryEntry: "この保存済みの日記を削除しますか？",
    diaryDeleted: "日記を削除しました。",
    metricOpenWeight: "体重のクイック入力を開く",
    metricCompleted: "体重入力により完了",
    inputOpenTracker: "食欲トラッカーを開く",
    appetiteCompletion: "食欲を保存済み：{percentage}%",
    weightNote: "体重：{weight} kg",
    undo: "元に戻す",
    completionSaved: "完了を保存しました。",
    completionRemoved: "完了を削除しました。",
    backdatePreviousCycle: "前の期間に保存しました。現在の期間は未完了のままです。",
    historyIntro: "新しい順です。初期表示は直近8週間です。",
    filterTask: "タスク",
    filterCadence: "頻度",
    filterFrom: "開始日",
    filterTo: "終了日",
    allTasks: "すべてのタスク",
    allCadences: "すべての頻度",
    noRoutineHistory: "該当する完了履歴はありません。",
    notCompleted: "未完了",
    removeCompletion: "完了を削除",
    confirmRemoveCompletion: "この完了記録を削除しますか？",
    oneOffLifetime: "全期間",
    currentWeightDate: "今週の体重測定日",
    routineDateInvalid: "正しい日付を選んでください。",
    routinePeriodRange: "{start}～{end}",
    searchPlaceholder: "食事、レシピ、お世話、ルーティンの検索...",
    searchLabel: "全体検索",
    clearSearch: "検索をクリア",
    quickFind: "クイック検索",
    noResults: "検索結果が見つかりませんでした",
    tryAnotherKeyword: "別のキーワードを試してください",
    resultCount: "{count} 件の結果",
    resultCountOne: "1 件の結果",
    searchResults: "検索結果",
    badgeRoutine: "ルーティン",
    badgeFood: "食材",
    badgeFoodSafety: "食品安全",
    badgeRecipe: "レシピ",
    badgeTraining: "トレーニング",
    badgeReference: "参考情報",
    badgeSection: "セクション",
  },
  mm: {
    appTitle: "Nako Home Care",
    appSubtitle: "အစားအသောက်၊ Nako စောင့်ရှောက်မှုနဲ့ အိမ်အလုပ်များ။",
    homeEyebrow: "အိမ်ကူလမ်းညွှန်",
    language: "ဘာသာစကား",
    sections: "ကဏ္ဍများ",
    today: "ယနေ့",
    dailyGuideEyebrow: "နေ့တိုင်း ကြည့်ပါ",
    dailyGuideReference: "ရည်ညွှန်းရန်သာ: အမှန်ခြစ်ရန် မလိုပါ",
    dailyReferenceItems: "ရည်ညွှန်းအချက်များ",
    openDailyGuide: "လမ်းညွှန်ဖွင့်ရန်",
    foodFirst: "အစားအသောက်နဲ့ မှတ်တမ်းကို အရင်ပြထားသည်။",
    frequency: "ဘယ်အချိန်",
    groceryKeepStock: "အမြဲထားရမည့် ပစ္စည်းများ",
    groceryByShop: "ဆိုင်အလိုက် ဝယ်ရန်",
    groceryBuyingInstructions: "ဝယ်နည်း",
    relatedPage: "ဆက်စပ်စာမျက်နှာ",
    relatedHumanFoodDescription: "Edwin အတွက် ချက်နည်းများနှင့် အစားအစာ အိုင်ဒီယာများ။",
    relatedDailyCooking: "နေ့စဉ်ချက်ပြုတ်ခြင်း",
    relatedDailyCookingDescription: "နေ့စဉ်ချက်ပြုတ် လမ်းညွှန်နှင့် မီးဖိုချောင် သတိပြုရန်များ။",
    relatedGroceryShopping: "ကုန်စုံဆိုင် စျေးဝယ်ခြင်း",
    relatedGroceryShoppingDescription: "ဆိုင်အလိုက် ကုန်စုံစာရင်းနှင့် စျေးဝယ် သတိပြုရန်များ။",
    relatedKitchenSafety: "မီးဖိုချောင်စည်းကမ်းနှင့် အစားအသောက်ဘေးကင်းရေး",
    relatedKitchenSafetyDescription: "မီးဖိုချောင်စည်းကမ်းနှင့် အစားအသောက်ဘေးကင်းရေး လမ်းညွှန်။",
    description: "ဖော်ပြချက်",
    instructions: "လုပ်နည်း",
    photos: "ဓာတ်ပုံများ",
    appetiteTracker: "အစာစားချင်စိတ် မှတ်တမ်း",
    appetiteDate: "ရက်စွဲ",
    appetitePercentage: "Nako ဘယ်လောက်စားခဲ့သလဲ?",
    appetiteKibbleGrams: "စားခဲ့သည့် အစာခြောက်",
    appetiteFrozenFoodCubes: "စားခဲ့သည့် အေးခဲအစာတုံး အရေအတွက်",
    appetiteNote: "အစာပမာဏ ပြောင်းလဲမှု (မဖြစ်မနေမဟုတ်)",
    appetiteNotePlaceholder: "ပုံမှန်ပမာဏနှင့် မတူပါက kibble သို့မဟုတ် အေးခဲအစာ ပိုပေးထားခြင်းကဲ့သို့ ပြောင်းလဲမှုကို ရေးမှတ်ပါ။",
    appetiteHistory: "လွန်ခဲ့သော ၃၀ ရက်",
    appetiteNoHistory: "အစာစားချင်စိတ် မှတ်တမ်း မရှိသေးပါ။",
    appetiteSaved: "သိမ်းပြီး",
    appetiteEdit: "ပြင်ရန်",
    appetiteBackToday: "ယနေ့သို့ ပြန်သွားရန်",
    appetiteNotify: "Nako အစာမစားပါက သို့မဟုတ် အစာစားချင်စိတ် ပုံမှန်မဟုတ်ပါက Edwin ကို ပြောပါ။",
    appetiteSelectFirst: "အစာစားသည့် ရာခိုင်နှုန်းကို အရင်ရွေးပြီးမှ အစာပမာဏ သို့မဟုတ် မှတ်စုကို ထည့်ပါ။",
    mustRemember: "သတိထားရန်",
    video: "လေ့ကျင့်ရေးဗီဒီယို",
    memo: "မှတ်စု",
    memoPlaceholder: "မှတ်စု၊ မေးခွန်း သို့မဟုတ် အတည်ပြုရန်အရာများ ထည့်ပါ။",
    cookingRules: "ချက်ပြုတ်စည်းကမ်း",
    householdCookingRules: "အိမ်သုံး ချက်ပြုတ်စည်းကမ်းများ",
    foodStorage: "အစားအစာ သိုလှောင်ခြင်း",
    foodPreparation: "အစားအစာ ပြင်ဆင်ခြင်း",
    cookingTemperatures: "ချက်ပြုတ်အပူချိန်များ",
    leftoversRefrigeration: "ကျန်အစားအစာနှင့် ရေခဲသေတ္တာသိုလှောင်ခြင်း",
    cleaningCrossContamination: "သန့်ရှင်းရေးနှင့် ရောဂါပိုးကူးစက်မှုကာကွယ်ခြင်း",
    futureTracking: "နောက်မှထည့်မည်",
    recipes: "Nako အတွက် အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ",
    recipeName: "ဟင်းချက်နည်းအမည်",
    ingredients: "ပါဝင်ပစ္စည်းများ",
    amount: "ပမာဏ",
    method: "ပြုလုပ်နည်း",
    routineItems: "အလုပ်များ",
    foodItems: "အစားအသောက်နဲ့ မှတ်တမ်း",
    pinnedSafety: "ဘေးကင်းရေး အရင်",
    dailyGuideGroupStartTitle: "အရင်စစ်ရန်",
    dailyGuideGroupStartDescription: "ယနေ့အစီအစဉ်ကို စစ်ပြီး shared album ကို update လုပ်ပါ။",
    dailyGuideGroupFoodTitle: "အစားအသောက်နှင့် မီးဖိုချောင်",
    dailyGuideGroupFoodDescription: "အစားအစာ၊ သောက်ရေ၊ စျေးဝယ်ခြင်းနှင့် သန့်ရှင်းရေးကို စီစဉ်ပါ။",
    dailyGuideGroupNakoTitle: "Nako နေ့စဉ်စောင့်ရှောက်မှု",
    dailyGuideGroupNakoDescription: "အစားအစာ၊ သန့်ရှင်းရေး၊ လေ့ကျင့်ခန်း၊ training နှင့် အပြင်ထွက်ခြင်း။",
    dailyGuideGroupHomeTitle: "အိမ်စောင့်ရှောက်မှု",
    dailyGuideGroupHomeDescription: "အများသုံးနေရာများကို သန့်ရှင်းသပ်ရပ်ပြီး အသင့်ဖြစ်အောင်ထားပါ။",
    dailyGuideGroupAdminTitle: "စီမံရေးနှင့် ပစ္စည်းများ",
    dailyGuideGroupAdminDescription: "delivery များ၊ မှတ်တမ်းများနှင့် အိမ်သုံးပစ္စည်း stock ကို စီမံပါ။",
    dailyGuideGroupSafetyTitle: "ဘေးကင်းရေး အရင်",
    dailyGuideGroupSafetyDescription: "Nako ကိုစောင့်ကြည့်ခြင်း၊ နူးညံ့စွာကိုင်တွယ်ခြင်းနှင့် အရေးပေါ်လမ်းညွှန်။",
    weeklyGuideGroupNakoTitle: "Nako အပတ်စဉ်စောင့်ရှောက်မှု",
    weeklyGuideGroupNakoDescription: "နေရာကို deep clean လုပ်ပြီး ပစ္စည်းတွေစစ်ကာ ကိုယ်အလေးချိန်မှတ်တမ်းတင်ပါ။",
    weeklyGuideGroupKitchenTitle: "မီးဖိုချောင်နှင့် ကျန်းမာရေး",
    weeklyGuideGroupKitchenDescription: "မီးဖိုချောင်ကို deep clean လုပ်ပြီး အစားအစာနဲ့ supplement တွေကို စနစ်တကျထားပါ။",
    weeklyGuideGroupHomeTitle: "အိမ်တစ်လုံးလုံး သန့်ရှင်းရေး",
    weeklyGuideGroupHomeDescription: "အိမ်တစ်လုံးလုံးရှိ မကြာခဏကိုင်တွယ်ရာနေရာများ၊ toilet၊ ကြမ်းပြင်၊ အမှိုက်ပုံး၊ မှန်နဲ့ ပန်ကာကို သန့်ရှင်းပါ။",
    weeklyGuideGroupLivingTitle: "နေထိုင်ရာနေရာနှင့် ထိန်းသိမ်းမှု",
    weeklyGuideGroupLivingDescription: "အိပ်ရာခင်းနဲ့ ဆိုဖာကို စီစဉ်ပြီး သန့်ရှင်းရေးပစ္စည်းတွေကို ထိန်းသိမ်းကာ ပိုးမွှားရှိမရှိစစ်ပါ။",
    safetyReferences: "ဘေးကင်းရေး",
    noItems: "ဘာမှမရှိသေးပါ။",
    back: "နောက်သို့",
    humanRecipes: "လူသားများအတွက် ဟင်းချက်နည်းများ",
    menuAdd: "မီနူးထဲ ထည့်ရန်",
    menuRemove: "မီနူးထဲမှ ဖယ်ရန်",
    menuSelected: "ခု ရွေးထားသည်",
    menuSelectionLimit: "အစားအစာ ၅ ခုအထိ ရွေးနိုင်သည်။",
    menuShare: "မီနူး မျှဝေရန်",
    menuShareIntro: "စားချင်တာ…",
    menuShareIngredients: "လိုအပ်သော ပါဝင်ပစ္စည်းများ:",
    menuShared: "မီနူး မျှဝေပြီးပါပြီ။",
    menuCopied: "မီနူးကို ကူးယူပြီးပါပြီ။ စကားပြောခန်းထဲတွင် ကူးထည့်ပါ။",
    menuShareFailed: "မီနူးကို မျှဝေခြင်း သို့မဟုတ် ကူးယူခြင်း မလုပ်နိုင်ပါ။",
    foodMemoryTitle: "၂၀၂၄ ခုနှစ် အစားအသောက်အမှတ်တရများ",
    foodMemoryDescription: "အတူရှိခဲ့တဲ့ ပထမ ၃–၄ လအတွင်း Yukari က Edwin အတွက် ချက်ပေးခဲ့တဲ့ အစားအစာများ။",
    weightTrend: "ကိုယ်အလေးချိန်ပြောင်းလဲမှု ဇယား",
    weightLog: "အပတ်စဉ် ကိုယ်အလေးချိန်မှတ်တမ်း",
    weightGraphPlaceholder: "ကိုယ်အလေးချိန်ပြောင်းလဲမှု ဇယားကြည့်ရန် အနည်းဆုံး ၂ ကြိမ် ကိုယ်အလေးချိန်ထည့်သွင်းပေးပါ။",
    quickEntry: "အမြန်ထည့်သွင်းရန်",
    recentEntries: "လတ်တလော မှတ်တမ်းများ",
    archive: "မော်ကွန်း",
    selectYear: "ခုနှစ်ရွေးချယ်ပါ",
    noWeightYet: "ကိုယ်အလေးချိန်မှတ်တမ်းမရှိသေးပါ။",
    previous: "ယခင်",
    latestDueSunday: "နောက်ဆုံးသတ်မှတ်ထားသော တနင်္ဂနွေ",
    syncCloud: "ကလောင်ဒ်စင့်ခ် ဖွင့်ထားသည်",
    syncLocal: "စက်တွင်းသာ",
    syncConnecting: "စင့်ခ်ချိတ်ဆက်နေသည်",
    syncOff: "ကလောင်ဒ်စင့်ခ် ပိတ်ထားသည်",
    quickShortcuts: "အမြန်ဖွင့်ရန်",
    shortcutNakoWeight: "Nako ကိုယ်အလေးချိန်",
    shortcutAppetiteTracker: "Nako အစာစားချင်စိတ် မှတ်တမ်း",
    shortcutMealLogs: "Edwin အစားမှတ်တမ်း",
    shortcutNakoToppings: "Nako topping ချက်နည်း",
    shortcutHumanFood: "လူ့အစားအစာ အိုင်ဒီယာ",
    shortcutCookingRules: "လူ့ချက်ပြုတ် စည်းကမ်း",
    shortcutDogTraining: "Nako လေ့ကျင့်ရေး",
    shortcutDiary: "နေ့စဉ်မှတ်တမ်းနှင့် အကြံပြုချက်",
    highProtein: "ပရိုတင်းဓာတ်မြင့်မားသည်",
    diaryToday: "ဒီနေ့မှတ်တမ်း",
    diaryDate: "ရက်စွဲ",
    diaryPrompt: "ဒါက သင့်ရဲ့နေ့စဉ်မှတ်တမ်းပါ။ ဒီနေ့ခံစားချက်၊ မေးခွန်းများ၊ အကြံပြုချက်များ၊ စိုးရိမ်စရာများ၊ မိသားစုကိုလွမ်းနေခြင်း သို့မဟုတ် မှတ်ထားချင်သည့်အရာများကို လွတ်လပ်စွာရေးပါ။",
    diaryPlaceholder: "ဒီနေရာမှာ လွတ်လပ်စွာရေးပါ။ ဂျပန်၊ မြန်မာ သို့မဟုတ် အင်္ဂလိပ်ဘာသာဖြင့် ရေးနိုင်ပါသည်။",
    diarySubmit: "မှတ်တမ်းပို့ရန်",
    diaryUpdate: "မှတ်တမ်းပြင်ဆင်ရန်",
    diarySaving: "သိမ်းဆည်းနေသည်...",
    diarySavedStatus: "သိမ်းပြီးပါပြီ",
    diarySavedEntry: "သိမ်းထားသောမှတ်တမ်း",
    diaryEntryText: "မှတ်တမ်းအကြောင်းအရာ",
    diaryRecent: "မကြာသေးမီက မှတ်တမ်းများ",
    diaryNoEntries: "မှတ်တမ်းမရှိသေးပါ။",
    diaryEmptyError: "ပို့ရန်မတိုင်မီ တစ်ခုခုရေးပါ။",
    diarySaved: "မှတ်တမ်း သိမ်းပြီးပါပြီ။",
    diaryWhatsApp: "WhatsApp အသိပေးချက်ဖွင့်ရန်",
    diaryWhatsAppMessage: "Nako Home Care app ထဲတွင် ဒီနေ့မှတ်တမ်းကို ရေးပြီးပါပြီ။",
    diaryLastUpdated: "နောက်ဆုံးပြင်ဆင်ချိန်",
    diaryOriginal: "မူရင်းဒိုင်ယာရီ",
    diaryManualTranslations: "ကိုယ်တိုင် ဘာသာပြန်ခြင်း",
    diaryJapaneseTranslation: "ဂျပန်ဘာသာပြန်",
    diaryMyanmarTranslation: "မြန်မာဘာသာပြန်",
    diaryTranslationPlaceholder: "ဤနေရာတွင် ကိုယ်တိုင်ဘာသာပြန်ချက် ထည့်ပါ။",
    diaryCurrentLanguagePreview: "လက်ရှိဘာသာစကားဖြင့် အစမ်းကြည့်ရှုခြင်း",
    diaryTranslationWarning: "မူရင်းစာသား ပြောင်းလဲသွားသဖြင့် ဘာသာပြန်ချက်များကို ပြန်လည်စစ်ဆေးပေးပါ။",
    nutritionEstimate: "ခန့်မှန်း macros",
    nutritionWholeRecipe: "ဟင်းချက်နည်းတစ်ခုလုံး",
    calories: "ကယ်လိုရီ",
    protein: "ပရိုတင်း",
    carbohydrates: "ကာဗိုဟိုက်ဒရိတ်",
    fat: "အဆီ",
    nutritionBasis: "တွက်ချက်မှုအခြေခံ",
    nutritionDisclaimer: "ဖော်ပြထားသော ပါဝင်ပစ္စည်းအလေးချိန်များအပေါ် အခြေခံ၍ ခန့်မှန်းထားခြင်းဖြစ်သည်။ အမှတ်တံဆိပ်၊ ပြင်ဆင်ပုံ၊ ချက်ပြုတ်ပုံနှင့် ဒယ်အိုးထဲကျန်သည့်ပမာဏအလိုက် တကယ့်တန်ဖိုး ကွာနိုင်သည်။",
    routineCheckIn: "ပုံမှန်အလုပ် Check-in",
    routineCheckInSubtitle: "ရွေးချယ်ထားသော နေ့စဉ်ဖြည့်သွင်းရမည့်အလုပ်များနှင့် အပတ်စဉ်၊ နှစ်ပတ်တစ်ကြိမ်၊ လစဉ်၊ သုံးလတစ်ကြိမ်၊ တစ်ကြိမ်တည်းအလုပ်များကို ဤနေရာတွင် မှတ်တမ်းတင်ပါ။ အခြားနေ့စဉ်နှင့် လိုအပ်သလို ကိုးကားအလုပ်များကို မပြပါ။",
    routineHistory: "ပုံမှန်အလုပ် မှတ်တမ်း",
    routineHomeRemaining: "အလုပ် {count} ခု ကျန်သေးသည်",
    routineTasksRemaining: "ကျန်သေးသော အလုပ်များ",
    routineCadenceRemaining: "{cadence}: {count} ခု ကျန်သေးသည်",
    backToRoutineCheckIn: "ပုံမှန်အလုပ် Check-in သို့ ပြန်သွားရန်",
    routineHomeComplete: "လက်ရှိအလုပ်အားလုံး ပြီးပါပြီ",
    currentSingaporeDate: "စင်ကာပူရက်စွဲ",
    currentPeriods: "လက်ရှိကာလများ",
    due: "လုပ်ရန်",
    completed: "ပြီးပါပြီ",
    progressSummary: "{total} ခုအနက် {done} ခု ပြီးပါပြီ",
    cadenceDaily: "နေ့စဉ်",
    cadenceWeekly: "အပတ်စဉ်",
    cadenceFortnightly: "နှစ်ပတ်တစ်ကြိမ်",
    cadenceMonthly: "လစဉ်",
    cadenceQuarterly: "သုံးလတစ်ကြိမ်",
    cadenceOneOff: "တစ်ကြိမ်တည်း",
    dueThisPeriod: "ဤကာလအတွင်း လုပ်ရန်",
    openInstructions: "ညွှန်ကြားချက်",
    markComplete: "ပြီးကြောင်းမှတ်ပါ",
    editCompletion: "ပြီးစီးမှုကို ပြင်ရန်",
    completionDate: "ရက်စွဲ",
    addNote: "မှတ်စုထည့်ရန်",
    notePlaceholder: "ရွေးချယ်နိုင်သော မှတ်စု",
    savedNote: "သိမ်းထားသော မှတ်စု",
    savedTextStatus: "သိမ်းပြီး",
    saveNote: "မှတ်စု သိမ်းရန်",
    saveChanges: "ပြင်ဆင်ချက်များ သိမ်းရန်",
    editNote: "မှတ်စု ပြင်ရန်",
    deleteNote: "မှတ်စု ဖျက်ရန်",
    cancel: "မလုပ်တော့ပါ",
    draftRecovered: "ဤစက်တွင် မသိမ်းရသေးသော မူကြမ်းကို ပြန်လည်ရယူထားသည်။",
    textEmptyError: "မသိမ်းမီ တစ်ခုခုရေးပါ။",
    confirmDeleteNote: "သိမ်းထားသော ဤမှတ်စုကို ဖျက်မလား။ ပြီးစီးမှု သို့မဟုတ် နေ့စဉ်မှတ်တမ်းကို ဆက်ထားမည်။",
    noteSaved: "မှတ်စု သိမ်းပြီးပါပြီ။",
    noteDeleted: "မှတ်စု ဖျက်ပြီးပါပြီ။",
    editDiary: "နေ့စဉ်မှတ်တမ်း ပြင်ရန်",
    deleteDiaryEntry: "နေ့စဉ်မှတ်တမ်း ဖျက်ရန်",
    confirmDeleteDiaryEntry: "သိမ်းထားသော ဤနေ့စဉ်မှတ်တမ်းကို ဖျက်မလား။",
    diaryDeleted: "နေ့စဉ်မှတ်တမ်း ဖျက်ပြီးပါပြီ။",
    metricOpenWeight: "ကိုယ်အလေးချိန် အမြန်ထည့်သွင်းမှု ဖွင့်ရန်",
    metricCompleted: "ကိုယ်အလေးချိန်ထည့်ပြီး ပြီးစီးသည်",
    inputOpenTracker: "အစာစားချင်စိတ် မှတ်တမ်းကို ဖွင့်ရန်",
    appetiteCompletion: "အစာစားချင်စိတ် သိမ်းပြီး: {percentage}%",
    weightNote: "ကိုယ်အလေးချိန်: {weight} kg",
    undo: "ပြန်ဖျက်ရန်",
    completionSaved: "ပြီးစီးမှုကို သိမ်းပြီးပါပြီ။",
    completionRemoved: "ပြီးစီးမှုကို ဖယ်ရှားပြီးပါပြီ။",
    backdatePreviousCycle: "ယခင်ကာလသို့ သိမ်းထားသည်။ လက်ရှိကာလမှာ မပြီးသေးပါ။",
    historyIntro: "အသစ်ဆုံးကို အရင်ပြထားသည်။ ပုံမှန်အားဖြင့် နောက်ဆုံးရှစ်ပတ်ကို ပြထားသည်။",
    filterTask: "အလုပ်",
    filterCadence: "အကြိမ်ရေ",
    filterFrom: "စတင်ရက်",
    filterTo: "ပြီးဆုံးရက်",
    allTasks: "အလုပ်အားလုံး",
    allCadences: "အကြိမ်ရေအားလုံး",
    noRoutineHistory: "ကိုက်ညီသော ပြီးစီးမှုမှတ်တမ်း မရှိပါ။",
    notCompleted: "မပြီးစီးခဲ့ပါ",
    removeCompletion: "ပြီးစီးမှုကို ဖယ်ရှားရန်",
    confirmRemoveCompletion: "ဤပြီးစီးမှုကို ဖယ်ရှားမလား။",
    oneOffLifetime: "အမြဲတမ်း",
    currentWeightDate: "ယခုအပတ် ကိုယ်အလေးချိန်ရက်",
    routineDateInvalid: "မှန်ကန်သောရက်စွဲကို ရွေးပါ။",
    routinePeriodRange: "{start} မှ {end}",
    searchPlaceholder: "Nako စောင့်ရှောက်မှု၊ လုပ်ရိုးလုပ်စဉ်၊ အစားအသောက်၊ ဟင်းချက်နည်းများ ရှာဖွေရန်...",
    searchLabel: "အထွေထွေရှာဖွေခြင်း",
    clearSearch: "ရှာဖွေမှု ဖျက်ရန်",
    quickFind: "အမြန်ရှာဖွေရန်",
    noResults: "ရှာဖွေမှုရလဒ် မတွေ့ပါ",
    tryAnotherKeyword: "အခြားသော သော့ချက်စကားလုံးဖြင့် ထပ်မံကြိုးစားပါ",
    resultCount: "ရလဒ် {count} ခု",
    resultCountOne: "ရလဒ် 1 ခု",
    searchResults: "ရှာဖွေမှုရလဒ်များ",
    badgeRoutine: "လုပ်ရိုးလုပ်စဉ်",
    badgeFood: "အစားအစာ",
    badgeFoodSafety: "အစားအသောက် ဘေးကင်းရေး",
    badgeRecipe: "ဟင်းချက်နည်း",
    badgeTraining: "လေ့ကျင့်ရေး",
    badgeReference: "ကိုးကားချက်",
    badgeSection: "ကဏ္ဍ",
  },
};


const gamificationData = (() => {
  const tx = (en, jp, mm) => t(en, jp, mm);
  const labels = {
    title: tx("Nako Says Thank You", "ナコからありがとう", "Nako က ကျေးဇူးတင်ပါတယ်"),
    thisWeek: tx("This Week with Nako", "ナコと今週", "Nako နဲ့ ဒီအပတ်"),
    weekIntro: tx("Little moments of care recorded this week.", "今週記録された、小さなお世話の時間です。", "ဒီအပတ်မှာ မှတ်တမ်းတင်ထားတဲ့ ဂရုစိုက်မှုလေးတွေပါ။"),
    postcards: tx("Nako Postcards", "ナコのポストカード", "Nako ပို့စကတ်များ"),
    postcardCount: tx("{count} postcards", "ポストカード {count}枚", "ပို့စကတ် {count} ခု"),
    albumIntro: tx("Every postcard is a permanent thank-you from Nako.", "どのカードも、ナコからのずっと残る「ありがとう」です。", "ပို့စကတ်တိုင်းက Nako ဆီက အမြဲသိမ်းထားနိုင်တဲ့ ကျေးဇူးတင်စကားပါ။"),
    futureMemory: tx("A new Nako memory will appear here.", "ここに新しいナコの思い出が増えていきます。", "ဒီနေရာမှာ Nako ရဲ့ အမှတ်တရအသစ်တစ်ခု ပေါ်လာပါမယ်။"),
    routines: tx("Routines", "ルーティン", "ပုံမှန်အလုပ်များ"),
    trainingPlay: tx("Training & play", "トレーニング・遊び", "လေ့ကျင့်ရေးနှင့် ကစားချိန်"),
    health: tx("Nako health", "ナコの健康", "Nako ကျန်းမာရေး"),
    diary: tx("Diary", "日記", "နေ့စဉ်မှတ်တမ်း"),
    fourPaws: tx("Four kinds of care shared this week. Thank you.", "今週は4つの形でお世話を記録できました。ありがとう。", "ဒီအပတ်မှာ ဂရုစိုက်မှု လေးမျိုးလုံးကို မှတ်တမ်းတင်ထားပါတယ်။ ကျေးဇူးတင်ပါတယ်။"),
    close: tx("Close", "閉じる", "ပိတ်ရန်"),
    imageFallback: tx("Nako illustration", "ナコのイラスト", "Nako ပုံလေး"),
    albumReady: tx("Your Nako postcard album is ready.", "ナコのポストカードアルバムができました。", "Nako ပို့စကတ်အယ်လ်ဘမ် အဆင်သင့်ဖြစ်ပါပြီ။"),
    newPostcard: tx("New Nako postcard: {title}", "新しいナコのポストカード：{title}", "Nako ပို့စကတ်အသစ် ရပါပြီ: {title}"),
    praiseRoutine: tx("Nako says thank you for caring for our home.", "おうちを大切にしてくれて、ナコからありがとう。", "အိမ်ကို ဂရုစိုက်ပေးလို့ Nako က ကျေးဇူးတင်ပါတယ်။"),
    praiseTraining: tx("Lovely practice with Nako today!", "今日もナコとやさしく練習できました！", "ဒီနေ့ Nako နဲ့ နူးနူးညံ့ညံ့ လေ့ကျင့်ပေးတာ ကောင်းပါတယ်။"),
    praiseTrainingBest: tx("A new personal best for {command}. Wonderful practice!", "{command}の自己ベスト更新。すてきな練習でした！", "{command} အတွက် အကောင်းဆုံးရလဒ်အသစ် ရပါပြီ။ လေ့ကျင့်ပေးတာ အရမ်းကောင်းပါတယ်။"),
    praisePlay: tx("Nako loved that playtime. Thank you!", "ナコとの楽しい遊び時間、ありがとう！", "Nako နဲ့ ပျော်ပျော်ရွှင်ရွှင် ကစားပေးလို့ ကျေးဇူးတင်ပါတယ်။"),
    praiseHealth: tx("Thank you for checking in on Nako.", "ナコの様子を記録してくれて、ありがとう。", "Nako ရဲ့ အခြေအနေကို မှတ်တမ်းတင်ပေးလို့ ကျေးဇူးတင်ပါတယ်။"),
    praiseDiary: tx("Thank you for sharing today's diary.", "今日の日記を書いてくれて、ありがとう。", "ဒီနေ့မှတ်တမ်းကို ရေးပေးလို့ ကျေးဇူးတင်ပါတယ်။")
  };

  Object.assign(labels, {
    taskAppetite: tx("Appetite check-in", "食欲のチェック", "အစာစားချင်စိတ် စစ်ဆေးမှု"),
    taskWeight: tx("Weight check-in", "体重のチェック", "ကိုယ်အလေးချိန် စစ်ဆေးမှု"),
    taskDiary: tx("Diary & Feedback", "日記・フィードバック", "နေ့စဉ်မှတ်တမ်းနှင့် အကြံပြုချက်")
  });

  const toastFamilies = [
    {
      id: "sparkling-surfaces",
      image: "assets/gamification/toast-icons/sparkling-surfaces.webp",
      motion: "sparkle",
      praise: tx("Everything feels brighter. Nako says thank you!", "すっきり明るくなりました。ナコからありがとう！", "အားလုံး ပိုတောက်ပသွားပြီ။ Nako က ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "bubbly-washing",
      image: "assets/gamification/toast-icons/bubbly-washing.webp",
      motion: "bubbles",
      praise: tx("Fresh and clean. Nako noticed your lovely care!", "さっぱりきれいになりました。やさしいお手入れを、ナコからありがとう！", "သန့်ရှင်းလတ်ဆတ်သွားပြီ။ ဂရုစိုက်ပေးတာကို Nako သတိထားမိပါတယ်။")
    },
    {
      id: "cozy-laundry",
      image: "assets/gamification/toast-icons/cozy-laundry.webp",
      motion: "cozy",
      praise: tx("Soft, fresh, and cozy. Thank you from Nako!", "ふんわり清潔で、もっと心地よくなりました。ナコからありがとう！", "နူးညံ့၊ သန့်ရှင်းပြီး နွေးထွေးနေပြီ။ Nako က ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "nako-nook",
      image: "assets/gamification/toast-icons/nako-nook.webp",
      motion: "bounce",
      praise: tx("Nako's little space feels fresh and comfy. Thank you!", "ナコの小さな場所が、きれいで心地よくなりました。ありがとう！", "Nako ရဲ့ နေရာလေး သန့်ရှင်းပြီး သက်သောင့်သက်သာ ဖြစ်သွားပြီ။ ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "health-heart",
      image: "assets/gamification/toast-icons/health-heart.webp",
      motion: "heartbeat",
      praise: labels.praiseHealth
    },
    {
      id: "fresh-air",
      image: "assets/gamification/toast-icons/fresh-air.webp",
      motion: "sway",
      praise: tx("The home feels fresh and comfortable. Nako says thank you!", "おうちがさわやかで心地よくなりました。ナコからありがとう！", "အိမ်က လတ်ဆတ်ပြီး သက်သောင့်သက်သာ ဖြစ်နေပြီ။ Nako က ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "kitchen-sparkle",
      image: "assets/gamification/toast-icons/kitchen-sparkle.webp",
      motion: "shine",
      praise: tx("Clean and ready for the next little moment. Thank you!", "きれいになって、次のひとときの準備もできました。ありがとう！", "သန့်ရှင်းပြီး နောက်တစ်ကြိမ်အသုံးပြုဖို့ အဆင်သင့်ဖြစ်နေပြီ။ ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "cozy-bedroom",
      image: "assets/gamification/toast-icons/cozy-bedroom.webp",
      motion: "breathe",
      praise: tx("A cozy resting place is a lovely gift. Nako says thank you!", "心地よく休める場所は、すてきな贈りものです。ナコからありがとう！", "နားနေရာလေးကို သက်သောင့်သက်သာ ဖြစ်အောင်လုပ်ပေးတာ ချစ်စရာလက်ဆောင်ပါ။ Nako က ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "safe-home",
      image: "assets/gamification/toast-icons/safe-home.webp",
      motion: "pop",
      praise: tx("Thank you for helping keep our home safe.", "おうちの安全を守ってくれて、ありがとう。", "အိမ်ကို လုံခြုံအောင် ကူညီပေးလို့ ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "gentle-training",
      image: "assets/gamification/toast-icons/gentle-training.webp",
      motion: "tilt",
      praise: labels.praiseTraining
    },
    {
      id: "purple-play",
      image: "assets/gamification/toast-icons/purple-play.webp",
      motion: "hop",
      praise: labels.praisePlay
    },
    {
      id: "diary-flower",
      image: "assets/gamification/toast-icons/diary-flower.webp",
      motion: "page",
      praise: labels.praiseDiary
    }
  ];

  const routineToastFamilyByTaskId = {
    "high-touch-surfaces": "sparkling-surfaces",
    "general-surface-cleaning": "sparkling-surfaces",
    "windows-glass-mirrors": "sparkling-surfaces",
    "outside-shoe-rack": "sparkling-surfaces",
    "kitchen-sink-drain-rack-counter": "bubbly-washing",
    "toilet-cleaning": "bubbly-washing",
    "rubbish-bin-washing": "bubbly-washing",
    "floor-mats": "cozy-laundry",
    "bedrooms-linens": "cozy-laundry",
    "sofa-covers-pillows": "cozy-laundry",
    "blanket-washing": "cozy-laundry",
    "curtain-steaming": "cozy-laundry",
    "washer-deep-clean": "cozy-laundry",
    "nako-weekly-play-pen-deep-clean": "nako-nook",
    "nako-weight-tracking": "health-heart",
    "supplement-pill-boxes": "health-heart",
    "ceiling-fan": "fresh-air",
    "aircon-filter-fan-coil": "fresh-air",
    "fridge-interior": "kitchen-sparkle",
    "microwave-interior": "kitchen-sparkle",
    "ninja-af141-air-fryer-interior-deep-clean": "kitchen-sparkle",
    "fujioh-hood-deep-clean": "kitchen-sparkle",
    "ikea-bed-frame": "cozy-bedroom",
    "pillow-mattress-vacuuming": "cozy-bedroom",
    "doorbell-charging": "safe-home",
    "fire-extinguisher-training": "safe-home"
  };

  const postcards = [
    {
      id: "nako-hello",
      image: "assets/gamification/postcards/nako-hello.webp",
      title: tx("Hello from Nako", "ナコからこんにちは", "Nako ဆီက မင်္ဂလာပါ"),
      description: tx("A little hello and a heart just for you.", "小さなあいさつとハートをあなたへ。", "သင့်အတွက် နှုတ်ဆက်စကားလေးနဲ့ နှလုံးသားလေးပါ။"),
      alt: tx("Watercolor Nako waving beside a heart envelope", "ハートの封筒のそばで手を振るナコの水彩画", "နှလုံးပုံစာအိတ်ဘေးမှာ လက်လှမ်းနှုတ်ဆက်နေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "routine-sparkle",
      image: "assets/gamification/postcards/routine-sparkle.webp",
      title: tx("A Caring Home", "大切にされるおうち", "ဂရုစိုက်ထားတဲ့ အိမ်"),
      description: tx("Small routines help Nako feel safe and cozy.", "小さなルーティンが、ナコの安心につながります。", "ပုံမှန်အလုပ်လေးတွေက Nako ကို လုံခြုံပြီး သက်သောင့်သက်သာ ရှိစေပါတယ်။"),
      alt: tx("Watercolor Nako beside a tidy pink care basket", "整ったピンクのお世話バスケットの横にいるナコの水彩画", "သပ်သပ်ရပ်ရပ် ပန်းရောင်ဂရုစိုက်ရေးခြင်းဘေးမှာ ရှိနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "training-paw",
      image: "assets/gamification/postcards/training-paw.webp",
      title: tx("Gentle Practice", "やさしい練習", "နူးညံ့တဲ့ လေ့ကျင့်ချိန်"),
      description: tx("Kind practice builds trust one paw at a time.", "やさしい練習が、少しずつ信頼を育てます。", "နူးညံ့စွာ လေ့ကျင့်ပေးခြင်းက ယုံကြည်မှုကို တဖြည်းဖြည်း တိုးစေပါတယ်။"),
      alt: tx("Watercolor Nako happily offering one paw", "うれしそうに前足を差し出すナコの水彩画", "ရှေ့ခြေတစ်ဖက်ကို ပျော်ပျော်ရွှင်ရွှင် ပေးနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "purple-playtime",
      image: "assets/gamification/postcards/purple-playtime.webp",
      title: tx("Purple Playtime", "むらさきのお遊びタイム", "ခရမ်းရောင် ကစားချိန်"),
      description: tx("A playful moment makes Nako's day brighter.", "楽しいひとときで、ナコの一日がもっと明るくなります。", "ပျော်စရာကစားချိန်လေးက Nako ရဲ့နေ့ကို ပိုရွှင်လန်းစေပါတယ်။"),
      alt: tx("Watercolor Nako playing with a small purple toy", "小さなむらさきのおもちゃで遊ぶナコの水彩画", "ခရမ်းရောင်အရုပ်လေးနဲ့ ကစားနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "health-heart",
      image: "assets/gamification/postcards/health-heart.webp",
      title: tx("A Thoughtful Check-in", "やさしい健康チェック", "ဂရုတစိုက် စစ်ဆေးမှု"),
      description: tx("Noticing and recording is a loving kind of care.", "気づいて記録することも、大切なお世話です。", "သတိထားပြီး မှတ်တမ်းတင်ပေးတာကလည်း ချစ်ခင်စွာ ဂရုစိုက်ခြင်းပါ။"),
      alt: tx("Watercolor Nako beside a notebook marked with a heart", "ハートのついたノートの横にいるナコの水彩画", "နှလုံးပုံပါတဲ့ မှတ်စုစာအုပ်ဘေးမှာ ရှိနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "diary-flower",
      image: "assets/gamification/postcards/diary-flower.webp",
      title: tx("Today's Little Memory", "今日の小さな思い出", "ဒီနေ့ရဲ့ အမှတ်တရလေး"),
      description: tx("Every shared thought becomes part of Nako's home story.", "書いてくれた言葉も、ナコのおうちの物語になります。", "မျှဝေပေးတဲ့ အတွေးတိုင်းက Nako အိမ်ရဲ့ ဇာတ်လမ်းတစ်ပိုင်း ဖြစ်လာပါတယ်။"),
      alt: tx("Watercolor Nako beside an open diary and a small flower", "開いた日記と小さな花の横にいるナコの水彩画", "ဖွင့်ထားတဲ့နေ့စဉ်မှတ်တမ်းနဲ့ ပန်းလေးဘေးမှာ ရှိနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "four-care-paws",
      image: "assets/gamification/postcards/four-care-paws.webp",
      title: tx("Four Caring Paws", "4つのお世話の足あと", "ဂရုစိုက်မှု ခြေရာလေးခု"),
      description: tx("Many different moments came together for Nako.", "いろいろなお世話の時間が、ナコのためにつながりました。", "ဂရုစိုက်မှုအမျိုးမျိုးက Nako အတွက် အတူတကွ ပြည့်စုံလာပါတယ်။"),
      alt: tx("Watercolor Nako surrounded by four colorful pawprints", "4色の足あとに囲まれたナコの水彩画", "အရောင်စုံခြေရာလေးခု ဝန်းရံထားတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "cozy-three",
      image: "assets/gamification/postcards/cozy-three.webp",
      title: tx("Cozy Nako", "ぬくぬくナコ", "နွေးနွေးထွေးထွေး Nako"),
      description: tx("A few caring days make home feel extra cozy.", "お世話の日々が、おうちをもっと心地よくします。", "ဂရုစိုက်ပေးတဲ့ နေ့လေးတွေက အိမ်ကို ပိုနွေးထွေးစေပါတယ်။"),
      alt: tx("Watercolor Nako sleeping under a soft pink blanket", "やわらかなピンクの毛布で眠るナコの水彩画", "ပန်းရောင်စောင်နုနုအောက်မှာ အိပ်နေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "sunny-seven",
      image: "assets/gamification/postcards/sunny-seven.webp",
      title: tx("Sunny Nako Days", "ナコの晴れやかな日々", "Nako ရဲ့ နေသာတဲ့နေ့များ"),
      description: tx("Care grows quietly, like plants in the sunshine.", "お世話は、日なたの植物のように静かに育ちます。", "ဂရုစိုက်မှုက နေရောင်အောက်က အပင်လေးတွေလို တိတ်တိတ်လေး ကြီးထွားလာပါတယ်။"),
      alt: tx("Watercolor Nako among sunny tropical balcony plants", "明るいベランダの南国植物に囲まれたナコの水彩画", "နေရောင်လင်းတဲ့ လသာဆောင်အပင်တွေကြားက Nako ရေဆေးပန်းချီ")
    },
    {
      id: "rain-or-shine",
      image: "assets/gamification/postcards/rain-or-shine.webp",
      title: tx("Rain or Shine", "雨の日も晴れの日も", "မိုးရွာရွာ နေပူပူ"),
      description: tx("Kind care matters on every kind of day.", "どんな日にも、やさしいお世話は大切です。", "ဘယ်လိုနေ့မျိုးမှာမဆို နူးညံ့စွာ ဂရုစိုက်ပေးတာ အရေးကြီးပါတယ်။"),
      alt: tx("Watercolor Nako by a rainy window with a small umbrella", "小さな傘と雨の窓辺にいるナコの水彩画", "ထီးလေးနဲ့ မိုးရွာနေတဲ့ပြတင်းပေါက်ဘေးက Nako ရေဆေးပန်းချီ")
    },
    {
      id: "thank-you-stars",
      image: "assets/gamification/postcards/thank-you-stars.webp",
      title: tx("Thank-You Stars", "ありがとうの星", "ကျေးဇူးတင်ကြယ်လေးများ"),
      description: tx("So many caring days deserve a sky full of thanks.", "たくさんのお世話の日々に、星いっぱいのありがとう。", "ဂရုစိုက်ပေးတဲ့ နေ့များစွာအတွက် ကြယ်ပြည့်ကောင်းကင်လို ကျေးဇူးတင်ပါတယ်။"),
      alt: tx("Watercolor Nako sitting beneath a gentle star garland", "やさしい星のガーランドの下に座るナコの水彩画", "ကြယ်ပန်းကုံးနုနုအောက်မှာ ထိုင်နေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "happy-home",
      image: "assets/gamification/postcards/happy-home.webp",
      title: tx("Nako's Happy Home", "ナコのしあわせなおうち", "Nako ရဲ့ ပျော်ရွှင်တဲ့အိမ်"),
      description: tx("A home filled with steady care is worth celebrating.", "いつものお世話に包まれたおうちは、お祝いしたくなる場所です。", "အမြဲဂရုစိုက်ပေးမှုနဲ့ ပြည့်နေတဲ့အိမ်က ပျော်ပွဲရွှင်ပွဲလုပ်ထိုက်တဲ့ နေရာပါ။"),
      alt: tx("Watercolor Nako celebrating in a cozy home with soft confetti", "やわらかな紙吹雪と居心地のよい部屋でお祝いするナコの水彩画", "နူးညံ့တဲ့ စက္ကူပန်းလေးတွေနဲ့ နွေးထွေးတဲ့အိမ်မှာ ပျော်နေတဲ့ Nako ရေဆေးပန်းချီ")
    }
  ];

  return { labels, postcards, routineToastFamilyByTaskId, toastFamilies };
})();


const homeSections = [
  sec("food", "F", "#f19a82", "#fff0eb", 
    t("Food, Recipes", "食事、レシピ", "အစားအသောက်၊ ဟင်းချက်နည်းများ"),
    t("Recipes and food logs.", "レシピと食事記録。", "ဟင်းချက်နည်းများနှင့် အစားမှတ်တမ်းများ။"),
    "assets/sections/food.png"),
  sec("food-safety", "🛡️", "#d97d65", "#fef0ec", 
    t("Kitchen Rules & Food Safety", "キッチンルール・食品安全", "မီးဖိုချောင်စည်းကမ်းနှင့် အစားအသောက်ဘေးကင်းရေး"), 
    t("Household cooking rules, safe storage, preparation, cooking, leftovers, and cleaning.", "家庭の料理ルール、安全な保存、下ごしらえ、調理、残り物、清掃。", "အိမ်သုံးချက်ပြုတ်စည်းကမ်း၊ ဘေးကင်းသောသိုလှောင်မှု၊ ပြင်ဆင်မှု၊ ချက်ပြုတ်မှု၊ ကျန်အစားအစာနှင့် သန့်ရှင်းရေး။"),
    "assets/sections/food-safety.png"),
  sec("daily", "D", "#f7b7be", "#fff1f2", 
    t("Daily Care Guide", "毎日のケアガイド", "နေ့စဉ်စောင့်ရှောက်မှု လမ်းညွှန်"),
    t("Use this guide every day and after use.", "毎日または使用後に、このガイドを確認してください。", "ဤလမ်းညွှန်ကို နေ့တိုင်းနှင့် သုံးပြီးတိုင်း ကြည့်ပါ။"),
    "assets/sections/daily-active.jpg"),
  sec("weekly", "W", "#92c9ad", "#e7f6ee", 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Do these once a week.", "週に1回行います。", "တစ်ပတ် ၁ ကြိမ် လုပ်ပါ။"),
    "assets/sections/weekly-reset.jpg"),
  sec("fortnightly", "14", "#f2c36f", "#fff6df", 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"), 
    t("Do these every 2 weeks.", "2週間に1回行います。", "၂ ပတ် ၁ ကြိမ် လုပ်ပါ။"),
    "assets/sections/fortnightly-refresh.jpg"),
  sec("monthly", "M", "#b7a4d8", "#f2eefb", 
    t("Monthly", "毎月", "လစဉ်"), 
    t("Do these once a month.", "月に1回行います。", "တစ်လ ၁ ကြိမ် လုပ်ပါ။"),
    "assets/sections/monthly-maintenance.jpg"),
  sec("quarterly", "Q", "#7db6a5", "#e7f4f0", 
    t("Quarterly / Long Interval", "3ヶ月おき / 長期の間隔", "၃ လတစ်ကြိမ် / ကာလရှည်လုပ်ဆောင်ချက်များ"), 
    t("Do these every 3 months or later.", "3か月ごと、または必要な時期に行います。", "၃ လ ၁ ကြိမ် သို့မဟုတ် သတ်မှတ်ချိန်မှာ လုပ်ပါ။"),
    "assets/sections/quarterly-maintenance.png"),
  sec("as-needed", "?", "#f19a82", "#fff0eb", 
    t("As Needed / Event-Based", "必要に応じて / イベントベース", "လိုအပ်သလို / အခြေအနေအလိုက်"), 
    t("Do these only when needed.", "必要なときだけ行います。", "လိုအပ်တဲ့အချိန်မှာပဲ လုပ်ပါ။"),
    "assets/sections/as-needed.png"),
];


const cookingRules = [
  t("Cook up to 3 meals a day when needed.", "必要に応じて1日最大3食調理します。", "လိုအပ်ပါက တစ်နေ့လျှင် ၃ နပ်အထိ ချက်ပြုတ်ပါ။"),
  t("Focus on high protein and low fat.", "高タンパク質かつ低脂質を意識してください。", "ပရိုတင်းဓာတ်မြင့်မားပြီး အဆီဓာတ်နည်းပါးခြင်းကို အဓိကထားပါ။"),
  t("Do not use onion, coriander, parsley, or bean sprouts. The only onion exception is the human-only Braised Pork, Tau Pok & Eggs recipe; never give that dish to Nako.", "玉ねぎ、パクチー、パセリ、もやしは使用しないでください。玉ねぎの唯一の例外は、人用の「豚肉・厚揚げ・卵の醤油煮込み」です。その料理は絶対にナコへ与えないでください。", "ကြက်သွန်နီ၊ နံနံပင်၊ parsley သို့မဟုတ် ပဲပင်ပေါက်ကို မသုံးပါနှင့်။ ကြက်သွန်နီအတွက် တစ်ခုတည်းသော ခြွင်းချက်သည် လူစားရန်သာဖြစ်သော ဝက်သား၊ Tau Pok နှင့် ကြက်ဥ ပဲငံပြာရည်နှပ်ဟင်းဖြစ်သည်။ ထိုဟင်းကို Nako ကို လုံးဝမကျွေးပါနှင့်။"),
  t("Ask before using unfamiliar ingredients.", "見慣れない食材を使用する前には確認してください。", "မရင်းနှီးသော ပါဝင်ပစ္စည်းများကို အသုံးမပြုမီ အရင်မေးပါ။"),
  t("Ask before changing the menu.", "メニューを変更する前には確認してください。", "မီနူးကို မပြောင်းလဲမီ အရင်မေးပါ။"),
  t("Clean the kitchen after cooking.", "調理後にキッチンを掃除してください。", "ချက်ပြုတ်ပြီးနောက် မီးဖိုချောင်ကို သန့်ရှင်းရေးလုပ်ပါ။"),
];

const householdCookingRulesItem = safetyItem("household-cooking-rules", "!",
  t("Household Cooking Rules", "家庭の料理ルール", "အိမ်သုံး ချက်ပြုတ်စည်းကမ်းများ"),
  t("Household preferences and rules to check before cooking or changing a menu.", "調理やメニュー変更の前に確認する家庭の希望とルール。", "ချက်ပြုတ်ခြင်း သို့မဟုတ် မီနူးပြောင်းလဲခြင်းမပြုမီ စစ်ဆေးရန် အိမ်သုံးလိုလားချက်နှင့် စည်းကမ်းများ။"),
  cookingRules,
  t("Read all six rules before cooking. Ask before changing the menu or using unfamiliar ingredients.", "調理前に6つのルールをすべて読み、メニュー変更や見慣れない食材の使用前に確認してください。", "မချက်ပြုတ်မီ စည်းကမ်း ၆ ချက်လုံးကို ဖတ်ပြီး မီနူးပြောင်းလဲခြင်း သို့မဟုတ် မရင်းနှီးသော ပါဝင်ပစ္စည်းအသုံးပြုခြင်းမပြုမီ မေးပါ။"),
  [
    photo("assets/sections/cooking-rules.png",
      t("Chef hat with warning and forbidden ingredients", "警告と禁止食材が描かれたシェフの帽子", "သတိပေးချက်နှင့် တားမြစ်ထားသော ဟင်းချက်ပါဝင်ပစ္စည်းများပါရှိသည့် စားဖိုမှူးဦးထုပ်"),
      t("Household Cooking Rules", "家庭の料理ルール", "အိမ်သုံး ချက်ပြုတ်စည်းကမ်းများ"))
  ]);


const additionalResources = {
  title: t("Additional Resources", "追加リソース", "နောက်ထပ် အသုံးဝင်သော အချက်အလက်များ"),
  subtitle: t("Helpful videos and references for Nako care, dog behaviour, training, and household routines.", "Nakoのお世話、犬の行動、トレーニング、家庭内ルーティンに役立つ動画や参考情報です。", "Nako ကိုစောင့်ရှောက်ခြင်း၊ ခွေးအပြုအမူ၊ လေ့ကျင့်ရေးနှင့် အိမ်တွင်းလုပ်ရိုးလုပ်စဉ်များအတွက် အသုံးဝင်သော ဗီဒီယိုများနှင့် ကိုးကားချက်များ။"),
  items: [
    {
      icon: "▶",
      title: t("Dog Behaviour & Calm Energy", "犬の行動と落ち着いた接し方", "ခွေးအပြုအမူနှင့် တည်ငြိမ်သော စွမ်းအင်"),
      source: t("Huberman Lab with Cesar Millan", "Huberman Lab（Cesar Millan出演）", "Huberman Lab - Cesar Millan ပါဝင်သည်"),
      videoTitle: t("Raising a Dog & Mastering Calm Assertive Energy", "犬の育て方と落ち着いた自信のある接し方", "ခွေးမွေးမြူခြင်းနှင့် တည်ငြိမ်ပြီး ယုံကြည်မှုရှိသော စွမ်းအင်ကို လေ့လာခြင်း"),
      youtubeUrl: "https://www.youtube.com/watch?v=n_qKxNcMvtM",
      embedUrl: "https://www.youtube.com/embed/n_qKxNcMvtM",
      watchLabel: t("Watch video", "動画を見る", "ဗီဒီယိုကြည့်ရန်"),
      description: t("A useful video on staying calm around dogs, creating structure, and using consistent routines to help Nako feel secure.", "犬のそばで落ち着いて接すること、ルールを作ること、一貫したルーティンでNakoが安心できるようにすることを学ぶための参考動画です。", "ခွေးများနှင့်အနီးတွင် တည်ငြိမ်စွာနေခြင်း၊ စည်းကမ်းနှင့်ဖွဲ့စည်းပုံထားခြင်း၊ တူညီသောလုပ်ရိုးလုပ်စဉ်များဖြင့် Nako ကို လုံခြုံစိတ်ချစေရန် အသုံးဝင်သော ဗီဒီယိုဖြစ်သည်။"),
      note: t("General learning resource only; not veterinary advice.", "一般的な学習用リソースです。獣医療の助言ではありません。", "အထွေထွေ လေ့လာရန်အတွက်သာဖြစ်ပြီး တိရစ္ဆာန်ဆရာဝန် အကြံပြုချက် မဟုတ်ပါ။"),
      takeawaysTitle: t("Key Takeaways", "重要ポイント", "အရေးကြီးသော မှတ်ချက်များ"),
      takeaways: [
        t("Nako responds to human tone, body language, and energy - not just words.", "Nakoは言葉だけでなく、人の声のトーン、体の動き、雰囲気にも反応します。", "Nako သည် စကားလုံးများသာမက လူ၏အသံနေအသံထား၊ ကိုယ်ဟန်အမူအရာနှင့် စွမ်းအင်ကိုပါ တုံ့ပြန်သည်။"),
        t("Stay calm before handling her, especially when she is excited, barking, anxious, or pulling.", "Nakoが興奮している、吠えている、不安そう、または引っ張っているときほど、触る前にまず落ち着いてください。", "Nako စိတ်လှုပ်ရှားနေခြင်း၊ ဟောင်နေခြင်း၊ စိုးရိမ်နေခြင်း သို့မဟုတ် ဆွဲနေခြင်းရှိပါက ကိုင်တွယ်မီ ကိုယ်တိုင်အရင် တည်ငြိမ်ပါ။"),
        t("When coming home, avoid over-exciting her immediately. Wait for her to settle, then give attention.", "帰宅した直後にNakoを過度に興奮させないでください。落ち着くのを待ってから相手をしてください。", "အိမ်ပြန်ရောက်ချိန်တွင် Nako ကို ချက်ချင်း အလွန်စိတ်လှုပ်ရှားစေခြင်း မလုပ်ပါနှင့်။ သူမအေးဆေးသွားမှ ဂရုစိုက်ပေးပါ။"),
        t("Keep walks structured and calm, not rushed or chaotic.", "散歩は急いだり慌ただしくしたりせず、落ち着いた流れで行ってください。", "လမ်းလျှောက်ရာတွင် အလျင်အမြန် သို့မဟုတ် ရှုပ်ထွေးစွာ မလုပ်ဘဲ စနစ်တကျနှင့် တည်ငြိမ်စွာလုပ်ပါ။"),
        t("Use a simple order: exercise first, rules and boundaries second, affection after she is calm.", "順番はシンプルにします。まず運動、次にルールと境界線、Nakoが落ち着いてから愛情を示します。", "ရိုးရှင်းသောအစဉ်လိုက်ကို သုံးပါ။ ပထမ လှုပ်ရှားမှု၊ ဒုတိယ စည်းကမ်းနှင့်ကန့်သတ်ချက်များ၊ သူမအေးဆေးပြီးမှ ချစ်ခင်မှုပေးပါ။"),
        t("Consistent routines help Nako understand what is expected.", "一貫したルーティンは、Nakoが何を求められているか理解する助けになります。", "တူညီသောလုပ်ရိုးလုပ်စဉ်များက Nako အနေဖြင့် မည်သို့ပြုမူရမည်ကို နားလည်စေသည်။"),
        t("Do not try new behaviour techniques if unsure. Ask Edwin first.", "自信がない場合は、新しいしつけ方法を試さないでください。まずEdwinに確認してください。", "မသေချာပါက အပြုအမူနည်းလမ်းအသစ်များကို မစမ်းပါနှင့်။ Edwin ကို အရင်မေးပါ။"),
        t("If Nako is vomiting, refusing food, injured, aggressive, or behaving unusually, ask Edwin immediately.", "Nakoが吐く、食べない、けがをしている、攻撃的、または普段と違う様子の場合は、すぐEdwinに確認してください。", "Nako အန်နေခြင်း၊ အစာမစားခြင်း၊ ဒဏ်ရာရခြင်း၊ ရန်လိုခြင်း သို့မဟုတ် ပုံမှန်မဟုတ်သော အပြုအမူရှိပါက Edwin ကို ချက်ချင်းမေးပါ။")
      ]
    },
    {
      icon: "▶",
      title: t("The Story of Dogs & Humans", "犬と人間の物語", "ခွေးများနှင့် လူသားများ၏ ဇာတ်လမ်း"),
      source: t("MAN’S FIRST FRIEND - NATURE DOCUMENTARY", "人類最初の友 - ネイチャー・ドキュメンタリー", "လူသား၏ ပထမဆုံးမိတ်ဆွေ - သဘာဝ မှတ်တမ်းရုပ်ရှင်"),
      videoTitle: t("Understanding Dog History & The Human-Dog Bond", "犬の歴史と人間と犬の絆を理解する", "ခွေးသမိုင်းနှင့် လူသား-ခွေး သံယောဇဉ်ကို နားလည်ခြင်း"),
      youtubeUrl: "https://youtu.be/qdy4oyEbw4I?si=Y0W8LZAHTwAyDm1S",
      embedUrl: "https://www.youtube.com/embed/qdy4oyEbw4I",
      watchLabel: t("Watch video", "動画を見る", "ဗီဒီယိုကြည့်ရန်"),
      description: t("Understanding Dog History & The Human-Dog Bond", "犬の歴史と人間と犬の絆を理解する", "ခွေးသမိုင်းနှင့် လူသား-ခွေး သံယောဇဉ်ကို နားလည်ခြင်း"),
      note: t("General learning resource only; not veterinary advice.", "一般的な学習用リソースです。獣医療の助言ではありません。", "အထွေထွေ လေ့လာရန်အတွက်သာဖြစ်ပြီး တိရစ္ဆာန်ဆရာဝန် အကြံပြုချက် မဟုတ်ပါ။"),
      takeawaysTitle: t("Key Takeaways", "重要ポイント", "အဓိက မှတ်သားစရာများ"),
      takeaways: [
        t("The Ancient Steps (30,000 Years Ago): Humans and wolves lived as rival apex predators, hunting the same prey on the Eurasian steps.", "古代の草原（3万年前）：人間とオオカミはユーラシアの草原で、同じ獲物を狩る競合する頂点捕食者として暮らしていました。", "ရှေးခေတ် မြက်ခင်းပြင်များ (လွန်ခဲ့သော နှစ် ၃၀,၀၀၀) - လူသားများနှင့် ဝံပုလွေများသည် ယူရေးရှားမြက်ခင်းပြင်များတွင် တူညီသော သားကောင်ကို လိုက်လံဖမ်းဆီးသည့် ပြိုင်ဘက် ထိပ်တန်းသားရဲများအဖြစ် နေထိုင်ခဲ့ကြသည်။"),
        t("A Self-Domestication Choice: The partnership began not by humans capturing wolves, but by wolves choosing to approach human camps for survival. Over generations, the tamest offspring evolved into a new, friendly species.", "自己家畜化という選択：協力関係は、人間がオオカミを捕らえたことではなく、オオカミが生き残るために人間の野営地へ近づくことを選んだことから始まりました。世代を重ねるうちに、最もおとなしい子孫が新しい友好的な種へと進化しました。", "မိမိဘာသာ အိမ်မွေးတိရစ္ဆာန်ဖြစ်လာရန် ရွေးချယ်မှု - ပူးပေါင်းမှုသည် လူသားများက ဝံပုလွေများကို ဖမ်းဆီးခြင်းမှ မစတင်ဘဲ အသက်ရှင်ရန်အတွက် ဝံပုလွေများက လူသားစခန်းများအနီးသို့ ချဉ်းကပ်ရန် ရွေးချယ်ခြင်းမှ စတင်ခဲ့သည်။ မျိုးဆက်များစွာကြာလာသည့်အခါ အယဉ်ဆုံးသားမြေးများသည် ဖော်ရွေသော မျိုးစိတ်အသစ်တစ်ခုအဖြစ် ဆင့်ကဲပြောင်းလဲလာခဲ့သည်။"),
        t("Global Expansion (10,000 Years Ago): As dogs accompanied humans across the planet, their physical appearance naturally adapted to new environments, developing shorter fur in hot climates and changing tail and ear shapes.", "世界への拡大（1万年前）：犬が人間とともに世界中へ広がるにつれ、その外見は新しい環境に自然に適応しました。暑い地域では毛が短くなり、尾や耳の形も変化しました。", "ကမ္ဘာတစ်ဝန်း ပျံ့နှံ့ခြင်း (လွန်ခဲ့သော နှစ် ၁၀,၀၀၀) - ခွေးများသည် လူသားများနှင့်အတူ ကမ္ဘာတစ်ဝန်း သွားလာလာသည့်အခါ ၎င်းတို့၏ ရုပ်သွင်သည် ပတ်ဝန်းကျင်အသစ်များနှင့် သဘာဝအလျောက် လိုက်လျောညီထွေ ဖြစ်လာခဲ့သည်။ ပူပြင်းသော ရာသီဥတုတွင် အမွေးတိုလာပြီး အမြီးနှင့် နားပုံသဏ္ဌာန်များလည်း ပြောင်းလဲလာခဲ့သည်။"),
        t("Birth of Civilizations (12,000 Years Ago): When humans settled in Mesopotamia to grow the first crops, heavy Mastiff-like dogs protected the harvest from wild animals. This crucial defense allowed humans to build food reserves and transition from nomads to farmers.", "文明の誕生（1万2000年前）：人間がメソポタミアに定住して最初の作物を育て始めたとき、大型のマスティフ系の犬が収穫物を野生動物から守りました。この重要な防衛によって食料を蓄えられるようになり、人間は遊牧生活から農耕生活へ移行できました。", "ယဉ်ကျေးမှုများ ပေါ်ပေါက်ခြင်း (လွန်ခဲ့သော နှစ် ၁၂,၀၀၀) - လူသားများသည် ပထမဆုံးသီးနှံများ စိုက်ပျိုးရန် မက်ဆိုပိုတေးမီးယားတွင် အခြေချသည့်အခါ ကိုယ်ထည်ကြီးသော Mastiff ကဲ့သို့ ခွေးများက သီးနှံရိတ်သိမ်းမှုကို တောရိုင်းတိရစ္ဆာန်များမှ ကာကွယ်ပေးခဲ့သည်။ ဤအရေးကြီးသော ကာကွယ်မှုကြောင့် လူသားများသည် အစားအစာ သိုလှောင်နိုင်ပြီး လှည့်လည်နေထိုင်သူများမှ လယ်သမားများအဖြစ် ပြောင်းလဲနိုင်ခဲ့သည်။"),
        t("Evolution of the Shepherd: As humans became herdsmen, dogs adapted their predatory instincts into a protective role. By raised alongside livestock from birth, they accepted other species as family.", "牧羊犬の進化：人間が牧畜を始めると、犬は捕食本能を守る役割へと適応させました。生まれたときから家畜と一緒に育てられることで、ほかの種を家族として受け入れました。", "သိုးထိန်းခွေး၏ ဆင့်ကဲပြောင်းလဲမှု - လူသားများ မွေးမြူရေးသမားများ ဖြစ်လာသည့်အခါ ခွေးများသည် ၎င်းတို့၏ အမဲလိုက်ဗီဇကို ကာကွယ်စောင့်ရှောက်သည့် အခန်းကဏ္ဍအဖြစ် ပြောင်းလဲအသုံးချလာခဲ့သည်။ မွေးကတည်းက မွေးမြူရေးတိရစ္ဆာန်များနှင့်အတူ ကြီးပြင်းလာခြင်းကြောင့် အခြားမျိုးစိတ်များကို မိသားစုအဖြစ် လက်ခံလာခဲ့သည်။"),
        t("Masters of Human Psychology: Over millennia, dogs developed a brilliant capability to decode human facial expressions, moods, and emotions to survive alongside us.", "人間心理の達人：数千年にわたり、犬は人間とともに生きるために、表情、気分、感情を読み取る優れた能力を発達させました。", "လူသားစိတ်ပညာကို ကျွမ်းကျင်သူများ - နှစ်ထောင်ပေါင်းများစွာအတွင်း ခွေးများသည် ကျွန်ုပ်တို့နှင့်အတူ အသက်ရှင်နိုင်ရန် လူသားတို့၏ မျက်နှာအမူအရာ၊ စိတ်နေစိတ်ထားနှင့် ခံစားချက်များကို ဖတ်ရှုနိုင်သည့် ထူးချွန်သော စွမ်းရည်ကို ဖွံ့ဖြိုးစေခဲ့သည်။"),
        t("The Chemistry of the Bond: Interacting with a dog triggers a mutual release of oxytocin in both human and animal, creating a virtuous circle that lowers heart rates and eases anxiety.", "絆を生む化学：犬と触れ合うと、人間と犬の双方でオキシトシンが放出されます。心拍数を下げ、不安を和らげる好循環が生まれます。", "သံယောဇဉ်၏ ဓာတုဖြစ်စဉ် - ခွေးနှင့် ထိတွေ့ဆက်ဆံခြင်းသည် လူနှင့်တိရစ္ဆာန် နှစ်ဖက်စလုံးတွင် oxytocin ထွက်ရှိစေပြီး နှလုံးခုန်နှုန်းကို လျော့ကျစေကာ စိုးရိမ်ပူပန်မှုကို သက်သာစေသည့် ကောင်းမွန်သော စက်ဝန်းတစ်ခု ဖန်တီးပေးသည်။"),
        t("The Emotional Foundation: A dog's loyalty is driven by reciprocity. Keeping them focused and fulfilled requires active bonding: sharing affection, playing, and simply resting by each other's side.", "感情的な基盤：犬の忠誠心は相互の関係によって育まれます。犬の集中力と充足感を保つには、愛情を分かち合う、一緒に遊ぶ、そばで静かに休むといった積極的な絆づくりが必要です。", "စိတ်ခံစားမှုဆိုင်ရာ အခြေခံ - ခွေး၏ သစ္စာရှိမှုသည် အပြန်အလှန် တုံ့ပြန်မှုအပေါ် အခြေခံသည်။ ၎င်းတို့ကို အာရုံစိုက်ပြီး စိတ်ကျေနပ်မှုရှိစေရန် ချစ်ခင်မှု မျှဝေခြင်း၊ အတူကစားခြင်းနှင့် တစ်ဦးဘေးတစ်ဦး ရိုးရိုးအနားယူခြင်းတို့ဖြင့် တက်ကြွစွာ သံယောဇဉ်တည်ဆောက်ရန် လိုအပ်သည်။")
      ]
    }
  ]
};


const foodItems = [
  food("recipes", "recipeIndex", "R", 
    t("Nako Topping Recipes", "ナコのトッピングレシピ", "Nako အတွက် အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ"), 
    t("Approved Nako topping recipes with ingredients and amounts.", "材料と分量が記載された、承認済みのナコ用トッピングレシピ。", "ပါဝင်ပစ္စည်းများနှင့် ပမာဏများပါဝင်သော Nako အတွက် ခွင့်ပြုထားသော အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ။"), 
    t("Open a recipe before preparing any topping.", "トッピングを準備する前にレシピを開いてください。", "မည်သည့်အပေါ်မှတင်စရာမဆို မပြင်ဆင်မီ ဟင်းချက်နည်းကို အရင်ဖွင့်ပါ။"), 
    t("No seasoning, oil, onion, or garlic unless approved.", "承認されない限り、調味料、油、玉ねぎ、にんにくは使用しないでください。", "ခွင့်ပြုချက်မရှိဘဲ ဟင်းခတ်မှုန့်၊ ဆီ၊ ကြက်သွန်နီ သို့မဟုတ် ကြက်သွန်ဖြူ မသုံးပါနှင့်။"), 1,
    [
      photo("assets/sections/topping-recipes.png", 
        t("Healthy dog food bowl with chicken, broccoli, and carrots", "鶏肉、ブロッコリー、にんじんが入った健康的なドッグフードボウル", "ကြက်သား၊ ပန်းဂေါ်ဖီစိမ်းနှင့် မုန်လာဥနီတို့ပါဝင်သော ကျန်းမာရေးနှင့်ညီညွတ်သည့် ခွေးစာခွက်"),
        t("Nako Topping Recipes", "ナコのトッピングレシピ", "Nako အတွက် အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ"))
    ]),
  food("meal-logs", "placeholder", "L", 
    t("Edwin Meal Logs", "エドウィンの食事記録", "Edwin ၏ အစားအသောက်မှတ်တမ်းများ"), 
    t("Future Streamlit tracking for meals, protein target, and notes.", "食事、タンパク質目標、およびメモのための将来的なStreamlit追跡機能。", "အစားအစာ၊ ပရိုတင်းရည်မှန်းချက်နှင့် မှတ်စုများအတွက် နောင်တွင်သုံးမည့် Streamlit ခြေရာခံခြင်း။"), 
    t("Placeholder only for now. Detailed meal tracking will be handled later.", "現在はプレースホルダーのみです。詳細な食事追跡は後で対応します。", "လောလောဆယ် နေရာလွတ်ပြထားခြင်းသာဖြစ်သည်။ အသေးစိတ်အစားအစာခြေရာခံခြင်းကို နောက်မှဆောင်ရွက်မည်။"), 
    t("Keep cooking rules visible until tracking is built.", "追跡機能が構築されるまで、料理ルールを表示したままにしてください。", "ခြေရာခံစနစ် မဆောက်ရသေးမီ ချက်ပြုတ်ခြင်းစည်းကမ်းများကို မြင်သာအောင်ထားပါ။"), 3,
    [
      photo("assets/sections/meal-logs.png", 
        t("Meal tray with rice, miso soup, salmon, and log notebook", "ご飯、味噌汁、鮭、ログノートが入った食事トレイ", "ထမင်း၊ မစ်ဆိုဆွပ်၊ ဆယ်လ်မွန်ငါးနှင့် မှတ်တမ်းစာအုပ်ပါဝင်သော အစားအစာလင်ပန်း"),
        t("Edwin Meal Logs", "エドウィンの食事記録", "Edwin ၏ အစားအသောက်မှတ်တမ်းများ")),
      photo("assets/recipes/edwin-food-tracking-meal.jpg",
        t("Edwin's high-protein meal bowl", "エドウィンの高タンパク質食事ボウル", "Edwin ၏ protein မြင့်မားသော အစားအစာခွက်"),
        t("An example of Edwin's high-protein meal containing scrambled eggs, squid, octopus, wood ear mushrooms, pork, and shrimp.", "スクランブルエッグ、イカ、タコ、きくらげ、豚肉、エビが入ったエドウィンの高タンパク質な食事例。", "ကြက်ဥမွှေ၊ ပြည်ကြီးငါး၊ ရေဘဝဲ၊ wood ear မှို၊ ဝက်သားနှင့် ပုစွန်တို့ ပါဝင်သော Edwin ၏ protein မြင့်မားသော အစားအစာ နမူနာ။"))
    ]),

  food("nako-feeding", "placeholder", "N", 
    t("Nako Feeding", "ナコの給餌", "Nako ကိုအစာကျွေးခြင်း"), 
    t("Future tracking for Nako meals, appetite, water, and notes.", "ナコの食事、食欲、水、およびメモのための将来的な追跡機能。", "Nako ၏အစားအစာ၊ အစာစားချင်စိတ်၊ ရေနှင့် မှတ်စုများအတွက် နောင်တွင်သုံးမည့် ခြေရာခံခြင်း။"), 
    t("Feed Nako consistently and record appetite later when tracking is added.", "ナコに規則正しく餌を与え、後で追跡機能が追加されたら食欲を記録します。", "Nako ကို အချိန်မှန်အစာကျွေးပါ၊ ခြေရာခံစနစ်ထည့်သွင်းပြီးနောက် အစာစားချင်စိတ်ကို မှတ်တမ်းတင်ပါ။"), 
    t("Ask before changing portions or food method.", "分量や給餌方法を変更する前に確認してください。", "ပမာဏ သို့မဟုတ် အစာကျွေးနည်း မပြောင်းလဲမီ အရင်မေးပါ။"), 4,
    [
      photo("assets/sections/nako-feeding.png", 
        t("Nako's pink food bowl with kibble and white water bowl", "ナコのピンク色のフードボウルと白い水ボウル", "Nako ၏ ပန်းရောင်ခွေးစာခွက်နှင့် အဖြူရောင်ရေခွက်"),
        t("Nako Feeding", "ナコの給餌", "Nako ကိုအစာကျွေးခြင်း"))
    ],
    { active: false, canonicalRoute: "#routine/nako-feeding-water" }),
  food("nako-inventory", "placeholder", "I", 
    t("Nako Inventory", "ナコの在庫状況", "Nako ၏ပစ္စည်းစာရင်း"), 
    t("Future stock tracking for Nako food, pee pads, wipes, and bags.", "ナコのフード、おしっこシート、ウェットティッシュ、袋の将来的な在庫管理機能。", "Nako ၏အစာ၊ ဆီးခံပြား၊ စိုစွတ်သောတစ်ရှူးနှင့် အိတ်များအတွက် နောင်တွင်သုံးမည့် ပစ္စည်းခြေရာခံခြင်း။"), 
    t("Check Nako supplies weekly and add low-stock items to shopping.", "毎週ナコの用品をチェックし、残り少なくなった品物を買い物リストに追加します。", "Nako သုံးပစ္စည်းများကို အပတ်စဉ်စစ်ဆေးပြီး ကုန်ခါနီးပစ္စည်းများကို ဝယ်ယူရန်စာရင်းထဲ ထည့်ပါ။"), 
    t("Tell Edwin early before items fully run out.", "品物が完全に切れる前に、早めにエドウィンに報告してください。", "ပစ္စည်းများ လုံးဝမကုန်မီ Edwin ထံ စောစောအကြောင်းကြားပါ။"), 6,
    [
      photo("assets/sections/nako-inventory.png", 
        t("Storage basket with Nako's food bag, pee pads, wipes, and waste bags", "ナコのフードバッグ、おしっこシート、ウェットティッシュ、袋が入った収納バスケット", "Nako ၏ အစာအိတ်၊ ဆီးခံပြား၊ စိုစွတ်သောတစ်ရှူးနှင့် အိတ်များပါဝင်သော ပလတ်စတစ်ခြင်းတောင်း"),
        t("Nako Inventory", "ナコの在庫状況", "Nako ၏ပစ္စည်းစာရင်း"))
    ],
    { active: false, canonicalRoute: "#routine/household-supplies-online" }),
  food("nako-emergency", "placeholder", "!", 
    t("Nako Emergency Quick Guide", "ナコ緊急事態クイックガイド", "Nako အရေးပေါ် အမြန်လမ်းညွှန်"), 
    t("Pinned emergency reminder for vomiting, diarrhoea, refusing food, or unsafe behavior.", "嘔吐、下痢、食欲不振、または安全でない行動に対する、ピン留めされた緊急リマインダー。", "အော့အန်ခြင်း၊ ဝမ်းလျှောခြင်း၊ အစာမစားခြင်း သို့မဟုတ် မလုံခြုံသောအပြုအမူများအတွက် ချိတ်ဆွဲထားသော အရေးပေါ်သတိပေးချက်။"),
    t("Safely isolate Nako, take a photo if useful, and notify Edwin immediately before doing anything else.", "ナコを安全に隔離し、必要に応じて写真を撮り、他のことをする前にすぐにエドウィンに通知してください。", "Nako ကို ဘေးကင်းစွာသီးခြားထားပါ၊ လိုအပ်လျှင် ဓာတ်ပုံရိုက်ပြီး အခြားအရာများမလုပ်မီ Edwin ထံ ချက်ချင်းအကြောင်းကြားပါ။"),
    t("Notify Edwin before doing anything else.", "他のことをする前にエドウィンに連絡してください。", "အခြားအရာများ မလုပ်ဆောင်မီ Edwin ထံ အရင်အကြောင်းကြားပါ။"), 7,
    [
      photo("assets/sections/nako-emergency.png", 
        t("First aid kit with dog paw print, heart, and warning bell", "犬の肉球プリント、ハート、警告ベルが付いた救急箱", "ခွေးခြေရာ၊ အသည်းပုံနှင့် သတိပေးခေါင်းလောင်းပါဝင်သော ရှေးဦးသူနာပြုသေတ္တာ"),
        t("Nako Emergency Quick Guide", "ナコ緊急事態クイックガイド", "Nako အရေးပေါ် အမြန်လမ်းညွှန်"))
    ],
    { active: false, canonicalRoute: "#routine/nako-emergency" }),
  food("human-food", "recipeIndex", "H", 
    t("Human Food", "人間の食事", "လူသားများအတွက် အစားအစာ"), 
    t("Ideas and recipes for human meals.", "人間用の食事のアイデアとレシピ。", "လူသားများအတွက် စားစရာအိုင်ဒီယာများနှင့် ဟင်းချက်နည်းများ။"), 
    t("Select a recipe to view details.", "詳細を表示するレシピを選択してください。", "အသေးစိတ်ကြည့်ရန် ဟင်းချက်နည်းတစ်ခုကို ရွေးချယ်ပါ။"), 
    t("Double-check ingredients at home before starting to cook.", "料理を始める前に、家にある食材を再確認してください。", "ဟင်းမချက်မီ အိမ်ရှိပါဝင်ပစ္စည်းများကို ထပ်မံစစ်ဆေးပါ။"), 0, [
      photo("assets/sections/human-food-memories-2024.jpg",
        t("Yukari surrounded by a collage of meals she cooked for Edwin in 2024", "ゆかりと、2024年にエドウィンのために作った料理のコラージュ", "Yukari နဲ့ ၂၀၂၄ ခုနှစ်မှာ Edwin အတွက် သူချက်ပေးခဲ့တဲ့ အစားအစာများကို စုစည်းထားတဲ့ပုံ"),
        t("Food Memories 2024: meals Yukari cooked for Edwin during their first 3–4 months together.", "2024年の食の思い出：付き合い始めて最初の3〜4か月に、ゆかりがエドウィンのために作った料理。", "၂၀၂၄ ခုနှစ် အစားအသောက်အမှတ်တရများ: အတူရှိခဲ့တဲ့ ပထမ ၃–၄ လအတွင်း Yukari က Edwin အတွက် ချက်ပေးခဲ့တဲ့ အစားအစာများ။"))
    ]),
];


const foodSafetyItems = [
  safetyItem("refrigerate-after-buying", "❄️",
    t("Refrigerate food after buying", "購入後は食材を冷蔵する", "ဝယ်ယူပြီးနောက် အစားအစာများကို ရေခဲသေတ္တာထဲထည့်ပါ"),
    t("Perishable foods must be put away immediately after returning home.", "生鮮食品は帰宅後すぐにしまわなければなりません。", "ပျက်စီးလွယ်သော အစားအစာများကို အိမ်ပြန်ရောက်သည်နှင့် ချက်ချင်းသိမ်းဆည်းရမည်။"),
    [
      t("Bring raw meat, poultry, fish, seafood, milk and frozen food home directly.", "生肉、鶏肉、魚、シーフード、牛乳、冷凍食品は直接家に持ち帰ってください。", "အသားစိမ်း၊ ကြက်/ငှက်အသား၊ ငါး၊ ပင်လယ်စာ၊ နို့နှင့် အေးခဲထားသော အစားအစာများကို အိမ်သို့ တိုက်ရိုက်ယူလာပါ။"),
      t("Put refrigerated or frozen food away as soon as possible.", "冷蔵または冷凍が必要な食品は、できるだけ早くしまってください。", "ရေခဲသေတ္တာထဲထည့်ရမည့် သို့မဟုတ် အေးခဲထားရမည့် အစားအစာများကို အမြန်ဆုံး သိမ်းဆည်းပါ။"),
      t("Do not leave perishable food outside while doing other errands.", "他の用事をしている間、傷みやすい食品を外に放置しないでください。", "အခြားကိစ္စများ ဆောင်ရွက်နေစဉ် ပုပ်သိုးလွယ်သော အစားအစာများကို အပြင်တွင် ပစ်မထားပါနှင့်။")
    ],
    t("Cold food should be put away immediately after returning home.", "冷たい食品は帰宅後すぐにしまわなければなりません。", "အေးမြသောအစားအစာများကို အိမ်ပြန်ရောက်သည်နှင့် ချက်ချင်းသိမ်းဆည်းရမည်။"),
    [
      photo("assets/food-safety/refrigerate-after-buying.png",
        t("Grocery bag beside an open refrigerator", "開いた冷蔵庫の横にある食料品袋", "ဖွင့်ထားသောရေခဲသေတ္တာဘေးရှိ ကုန်စုံအိတ်"),
        t("Cold food should be put away immediately.", "冷たい食品はすぐにしまってください。", "အေးသောအစားအစာများကို ချက်ချင်းသိမ်းဆည်းပါ။"))
    ]
  ),

  safetyItem("do-not-overcrowd-fridge", "📦",
    t("Do not overcrowd the refrigerator", "冷蔵庫に詰め込みすぎない", "ရေခဲသေတ္တာထဲတွင် အစားအစာများ အလွန်အကျွံ မသိမ်းဆည်းပါနှင့်"),
    t("Keep space inside the fridge to let cold air circulate around the food.", "冷気が食品の周囲を循環できるように、冷蔵庫内には隙間を空けておきます。", "အေးသောလေ လှည့်ပတ်နိုင်ရန် ရေခဲသေတ္တာထဲတွင် နေရာအနည်းငယ် ချန်ထားပါ။"),
    [
      t("Leave some space between food and containers.", "食品や容器の間に少し隙間を空けてください。", "အစားအစာများနှင့် ဘူးများကြားတွင် နေရာအနည်းငယ် ချန်ထားပါ။"),
      t("Do not pack the refrigerator too tightly.", "冷蔵庫にあまりきつく詰め込みすぎないでください。", "ရေခဲသေတ္တာထဲတွင် အလွန်ကျပ်ညပ်အောင် မထည့်ပါနှင့်။"),
      t("Cold air must be able to circulate around the food.", "冷気が食品の周りを自由に循環できるようにする必要があります。", "အေးသောလေသည် အစားအစာများ၏ပတ်ပတ်လည်တွင် လှည့်ပတ်နိုင်ရမည်။")
    ],
    t("An overcrowded refrigerator may not cool food evenly.", "詰め込みすぎた冷蔵庫では、食品が均一に冷えない場合があります。", "ပစ္စည်းများအလွန်ကျပ်နေပါက အစားအစာများအားလုံး ညီတူညီမျှ အေးမည်မဟုတ်ပါ။"),
    [
      photo("assets/food-safety/do-not-overcrowd-fridge.png",
        t("Organised refrigerator with visible gaps between items", "隙間があいて整理整頓された冷蔵庫内", "ပစ္စည်းများကြား နေရာလွတ်များဖြင့် သပ်ရပ်သော ရေခဲသေတ္တာ"),
        t("Ensure gaps are left between items for air flow.", "空気を通すために、食品同士の間に隙間を空けてください。", "လေဝင်လေထွက်ကောင်းရန် ပစ္စည်းများကြား နေရာချန်ထားပါ။"))
    ]
  ),

  safetyItem("refrigerator-storage-limits", "📅",
    t("Refrigerator storage limits", "冷蔵庫での保存期限", "ရေခဲသေတ္တာထဲတွင် သိမ်းဆည်းနိုင်သည့် ကန့်သတ်ရက်များ"),
    t("Consume or freeze raw meat and poultry within safe storage periods.", "生肉や鶏肉は安全な保存期間内に消費するか冷凍してください。", "အသားစိမ်းများနှင့် ကြက်/ငှက်အသားများကို ဘေးကင်းသော ကာလအတွင်း ချက်ပြုတ်ပါ သို့မဟုတ် အေးခဲပါ။"),
    [
      t("Raw chicken, duck, turkey and other poultry: **1–2 days**", "生の鶏肉、鴨肉、七面鳥、その他の鳥肉：**1〜2日**", "ကြက်၊ ဘဲ၊ ဆင်ခြေဖုန်း နှင့် အခြားကြက်/ငှက်အသားစိမ်း- **၁ ရက်မှ ၂ ရက်**"),
      t("Raw minced meat and raw sausages: **1–2 days**", "生の挽き肉、生のソーセージ：**1〜2日**", "အသားနုတ်နုတ်စင်းနှင့် ဝက်အူချောင်းအစိမ်း- **၁ ရက်မှ ၂ ရက်**"),
      t("Fresh fish: **1–2 days as the household's conservative rule**", "新鮮な魚：**家庭の安全ルールとして1〜2日**", "ငါးအစိမ်း- **အိမ်၏ ဘေးကင်းရေးစည်းကမ်းအရ ၁ ရက်မှ ၂ ရက်**"),
      t("Whole pieces of beef, pork or lamb: **3–5 days**", "牛肉、豚肉、羊肉のかたまり肉：**3〜5日**", "အမဲသား၊ ဝက်သား သို့မဟုတ် ဆိတ်သားတစ်တုံးလုံး- **၃ ရက်မှ ၅ ရက်**"),
      t("Cooked leftovers: **3–4 days**", "調理済みの残り物：**3〜4日**", "ချက်ပြုတ်ပြီးသား စားကြွင်းစားကျန်များ- **၃ ရက်မှ ၄ ရက်**"),
      t("If the food will not be used within the safe period, freeze it.", "安全期間内に使用しない場合は、冷凍庫に入れてください。", "ဘေးကင်းသော ကာလအတွင်း အသုံးမပြုပါက အေးခဲထားပါ။"),
      t("A sealed Ziplock bag does not extend the safe storage period.", "密閉されたジップロックバッグに入れても、安全な保存期間は延びません。", "ဇစ်ပိတ်အိတ်ထဲ ထည့်ထားခြင်းသည် ဘေးကင်းသော သိုလှောင်ရက်ကို ပိုမိုမဆွဲဆန့်နိုင်ပါ။"),
      t("Soy sauce, seasoning or ordinary marinade does not extend the safe storage period.", "醤油、調味料、または通常のタレ漬け（マリネ）は、安全な保存期間を延ばしません。", "ပဲငံပြာရည်၊ ဟင်းခတ်မှုန့် သို့မဟုတ် သာမန်နှပ်ထားခြင်းသည် သိုလှောင်နိုင်သည့်ကာလကို ပိုမဆွဲဆန့်နိုင်ပါ။"),
      t("When possible, label the bag or container with the purchase or cooking date.", "可能な場合は、袋や容器に購入日または調理日を記入してください。", "ဖြစ်နိုင်လျှင် အိတ် သို့မဟုတ် ဘူးပေါ်တွင် ဝယ်သည့်ရက်စွဲ သို့မဟုတ် ချက်သည့်ရက်စွဲကို ရေးမှတ်ထားပါ။")
    ],
    [
      t("Raw poultry: cook or freeze within 2 days. After 2 days, throw it away.", "生の鳥肉：2日以内に調理するか冷凍してください。2日を過ぎたら廃棄してください。", "ကြက်/ငှက်အသားစိမ်းကို ၂ ရက်အတွင်း ချက်ပါ သို့မဟုတ် အေးခဲပါ။ ၂ ရက်ကျော်ပါက လွှင့်ပစ်ပါ။"),
      t("Smell is not a safety test. Follow the storage limit even when poultry smells normal. Throw it away sooner if it smells sour or unusual, or feels sticky or slimy.", "臭いだけでは安全か判断できません。鳥肉の臭いが普通でも保存期限を守ってください。酸っぱい臭いや異臭、べたつき、ぬめりがある場合は、期限前でも廃棄してください。", "အနံ့ပုံမှန်ဖြစ်တာနဲ့ ဘေးကင်းတယ်လို့ မယူဆပါနဲ့။ ကြက်/ငှက်အသားရဲ့ သိုလှောင်ရက်ကို အမြဲလိုက်နာပါ။ ချဉ်တဲ့အနံ့၊ မူမမှန်တဲ့အနံ့၊ စေးကပ်တာ သို့မဟုတ် ချွဲကျိတာရှိရင် ရက်မပြည့်ခင်ပဲ လွှင့်ပစ်ပါ။")
    ],
    [
      photo("assets/food-safety/refrigerator-storage-limits.png",
        t("Calendar beside chicken, fish and meat icons", "鶏、魚、肉のアイコンの横にあるカレンダー", "ကြက်၊ ငါးနှင့် အသားပုံများ ဘေးရှိ ပြက္ခဒိန်"),
        t("Always check storage limits and dates.", "常に保存期限と日付を確認してください。", "သိုလှောင်မှု ကန့်သတ်ချက်များနှင့် ရက်စွဲများကို အမြဲစစ်ဆေးပါ။"))
    ]
  ),

  safetyItem("do-not-wash-raw-meat", "🚫",
    t("Do not wash raw chicken or raw meat", "生の鶏肉や生肉を洗わない", "ကြက်သားစိမ်းနှင့် အသားစိမ်းများကို မဆေးပါနှင့်"),
    t("Washing raw meat spreads bacteria to sinks, taps, and countertops.", "生肉を洗うと、シンク、蛇口、カウンターに細菌が飛び散ります。", "အသားစိမ်းဆေးခြင်းကြောင့် စင်္ကြာ၊ ဘုံဘိုင်ခေါင်းနှင့် ခုံများပေါ်သို့ ဘက်တီးရီးယားများ ပျံ့နှံ့စေသည်။"),
    [
      t("Do not rinse raw chicken or raw meat under the tap.", "生の鶏肉や生肉を水道水で洗い流さないでください。", "ကြက်သားစိမ်း သို့မဟုတ် အသားစိမ်းများကို ဘုံဘိုင်ရေအောက်တွင် မဆေးပါနှင့်။"),
      t("Water can splash bacteria onto the sink, tap, countertop, utensils and nearby food.", "水しぶきによって、シンク、蛇口、調理台、器具、近くの食品に細菌が飛び散る可能性があります。", "ရေစင်ခြင်းကြောင့် ဘက်တီးရီးယားများသည် စင်္ကြာ၊ ဘုံဘိုင်ခေါင်း၊ ခုံ၊ အသုံးအဆောင်များနှင့် အနီးနားရှိ အစားအစာများပေါ်သို့ ပျံ့နှံ့သွားနိုင်သည်။"),
      t("Remove the meat from its packaging and cook it directly.", "肉をパッケージから取り出し、そのまま直接調理してください。", "အသားကို ထုပ်ပိုးမှုထဲမှ ထုတ်ပြီး တိုက်ရိုက်ချက်ပြုတ်ပါ။"),
      t("Wash hands with soap after touching raw meat.", "生肉に触れた後は、石鹸で手を洗ってください。", "အသားစိမ်းကို ကိုင်တွယ်ပြီးနောက် လက်ကို ဆပ်ပြာဖြင့် ဆေးပါ။"),
      t("Clean every knife, chopping board, plate and surface that touched it.", "肉に触れたすべてのナイフ、まな板、皿、表面を洗浄してください。", "၎င်းနှင့်ထိတွေ့ခဲ့သော ဓား၊ စဉ့်တီတုံး၊ ပန်းကန်နှင့် မျက်နှာပြင်အားလုံးကို သန့်ရှင်းရေးလုပ်ပါ။")
    ],
    t("Washing raw meat does not make it safer. Proper cooking kills the bacteria.", "生肉を洗っても安全性は高まりません。適切な加熱調理が細菌を死滅させます。", "အသားစိမ်းဆေးခြင်းသည် ပို၍ဘေးကင်းစေသည်မဟုတ်ပါ။ ကောင်းစွာချက်ပြုတ်ခြင်းကသာ ဘက်တီးရီးယားများကို သေစေသည်။"),
    [
      photo("assets/food-safety/do-not-wash-raw-meat.png",
        t("Raw chicken under a tap with a clear red prohibition mark", "赤い禁止マークがついた、水道水の下にある生の鶏肉", "ဘုံဘိုင်ရေအောက်မှ ကြက်သားစိမ်းနှင့် အနီရောင်တားမြစ်ချက် သင်္ကေတ"),
        t("Washing spreads bacteria. Cook directly to kill germs.", "洗うと細菌が広がります。直接加熱調理して殺菌してください。", "ဆေးခြင်းက ဘက်တီးရီးယားပျံ့စေသည်။ ပိုးသေရန် တိုက်ရိုက်ချက်ပြုတ်ပါ။"))
    ]
  ),

  safetyItem("separate-raw-and-cooked-food", "↔️",
    t("Separate raw and cooked food", "生ものと調理済みの食品を分ける", "အစိမ်းနှင့် အကျက်ကို သီးခြားစီထားပါ"),
    t("Keep raw meats away from cooked food to prevent cross-contamination.", "交差汚染を防ぐため、生肉は調理済みの食品から離して保管してください。", "ရောဂါပိုးမကူးစက်စေရန် အသားစိမ်းများကို ချက်ပြုတ်ပြီးသားအစားအစာများနှင့် သီးခြားထားပါ။"),
    [
      t("Keep raw meat, poultry, seafood and raw eggs away from cooked or ready-to-eat food.", "生肉、鳥肉、シーフード、生卵は、調理済み食品やそのまま食べる食品から離してください。", "အသားစိမ်း၊ ကြက်/ငှက်အသား၊ ပင်လယ်စာနှင့် ဥအစိမ်းများကို ချက်ပြုတ်ပြီးသား သို့မဟုတ် အသင့်စားအစားအစာများနှင့် ဝေးဝေးထားပါ။"),
      t("Put raw meat inside a sealed bag or covered container.", "生肉は密閉袋または蓋付きの容器に入れてください。", "အသားစိမ်းကို ဇစ်ပိတ်အိတ် သို့မဟုတ် အဖုံးပါသောဘူးထဲ ထည့်ထားပါ။"),
      t("Store raw meat on the lowest refrigerator shelf.", "生肉は冷蔵庫の最下段の棚に保管してください。", "အသားစိမ်းကို ရေခဲသေတ္တာ၏ အောက်ဆုံးအထပ်တွင် သိမ်းဆည်းပါ။"),
      t("The purpose is to stop raw juices from leaking or dripping onto other food.", "これは、生の肉汁が漏れたり、他の食品に垂れたりするのを防ぐためです。", "ရည်ရွယ်ချက်မှာ အသားစိမ်းမှထွက်သော အရည်များ အခြားအစားအစာများပေါ်သို့ မယိုဖိတ်စေရန် ဖြစ်သည်။"),
      t("Do not put cooked food back onto a plate that previously held raw meat.", "生肉が載っていた皿に、調理済みの食品を戻さないでください。", "အသားစိမ်းထည့်ခဲ့ဖူးသော ပန်းကန်ပြားပေါ်သို့ ချက်ပြုတ်ပြီးသား အစားအစာများကို ပြန်မတင်ပါနှင့်။"),
      t("Wash knives and chopping boards before using them for cooked food.", "調理済みの食品に使用する前に、ナイフやまな板を洗ってください。", "ချက်ပြုတ်ပြီးသား အစားအစာများအတွက် အသုံးမပြုမီ ဓားနှင့် စဉ့်တီတုံးများကို ဆေးကြောပါ။")
    ],
    t("Raw meat and its juices must never touch cooked food.", "生肉とその肉汁は、調理済みの食品に絶対に触れてはなりません。", "အသားစိမ်းနှင့် ၎င်း၏အရည်များသည် ချက်ပြုတ်ပြီးသား အစားအစာများနှင့် လုံးဝမထိတွေ့စေရပါ။"),
    [
      photo("assets/food-safety/separate-raw-and-cooked-food.png",
        t("Refrigerator diagram with sealed raw meat on the bottom shelf", "生の肉が最下段に密閉されて入っている冷蔵庫の図", "အသားစိမ်းကို အောက်ဆုံးထပ်တွင် သိမ်းထားသော ရေခဲသေတ္တာပုံ"),
        t("Store raw food below cooked food.", "生の食材は調理済みの食品の下に保管してください。", "အစိမ်းများကို အကျက်များ၏အောက်တွင် သိမ်းပါ။"))
    ]
  ),

  safetyItem("safe-thawing", "💧",
    t("Thaw frozen food safely", "冷凍食品を安全に解凍する", "အေးခဲထားသော အစားအစာများကို ဘေးကင်းစွာ ရေခဲဖျော်ပါ"),
    t("Thaw frozen meat and seafood in the fridge, cold water, or microwave, not on the counter.", "冷凍の肉や魚介類は、室温ではなく、冷蔵庫、冷水、または電子レンジで解凍します。", "အေးခဲထားသော အသားနှင့် ပင်လယ်စာကို အပြင်မှာမထားဘဲ fridge၊ ရေအေး သို့မဟုတ် microwave ဖြင့် အရည်ဖျော်ပါ။"),
    [
      t("Preferred: put frozen meat, poultry, shrimp, squid, or seafood in a tray in the fridge. Move large portions the night before.", "基本は、冷凍の肉、鳥肉、エビ、イカ、魚介類を受け皿に入れて冷蔵庫で解凍します。大きい物は前夜に移してください。", "အကောင်းဆုံးနည်းက အေးခဲထားသော အသား၊ ကြက်သား၊ ပုစွန်၊ ပြည်ကြီးငါး သို့မဟုတ် ပင်လယ်စာကို tray ထဲထည့်ပြီး fridge ထဲမှာ အရည်ဖျော်တာပါ။ အတုံးကြီးရင် မနေ့ညကတည်းက ရွှေ့ထားပါ။"),
      t("For a quick thaw, keep food in a sealed, leak-proof bag and submerge it in cold water. Change the water every 30 min. Cook immediately after thawing.", "急ぐ場合は、食品を漏れない密閉袋に入れたまま冷水に沈めます。水は30分ごとに替え、解凍後はすぐに調理してください。", "အမြန်လိုရင် အစားအစာကို ရေမယိုတဲ့ sealed bag ထဲမှာထားပြီး ရေအေးထဲစိမ်ပါ။ ရေကို မိနစ် ၃၀ တိုင်းလဲပါ။ အရည်ပျော်တာနဲ့ ချက်ချင်းချက်ပါ။"),
      t("Use the microwave only as a last resort, then cook the food immediately.", "電子レンジは最終手段として使い、解凍後はすぐに調理してください。", "microwave ကို နောက်ဆုံးနည်းအဖြစ်သာ သုံးပြီး အရည်ပျော်တာနဲ့ ချက်ချင်းချက်ပါ။")
    ],
    [
      t("Never thaw food on the counter or in warm or hot water. Never put raw food directly in the water.", "室温に置いたまま、またはぬるま湯・お湯では解凍しないでください。生の食品を水へ直接入れないでください。", "အစားအစာကို အပြင်မှာထားပြီး သို့မဟုတ် ရေနွေးနွေး/ရေပူနဲ့ အရည်မဖျော်ပါနဲ့။ အသားစိမ်းကို ရေထဲတိုက်ရိုက်မထည့်ပါနဲ့။"),
      t("Prevent drips. After handling raw food, wash your hands, the pot or sink, and nearby surfaces.", "汁漏れを防ぎ、生ものを扱った後は手、鍋またはシンク、周辺の表面を洗ってください。", "အရည်မယိုအောင် ကာကွယ်ပါ။ အသားစိမ်းကို ကိုင်ပြီးရင် လက်၊ အိုး သို့မဟုတ် sink နဲ့ အနီးကမျက်နှာပြင်တွေကို ဆေးပါ။")
    ],
    [
      photo("assets/food-safety/safe-thawing.png",
        t("Refrigerator, microwave-defrost and sealed cold-water methods", "冷蔵庫解凍、電子レンジ解凍、冷水解凍の方法", "ရေခဲသေတ္တာ၊ မိုက်ခရိုဝေ့ဖ်နှင့် ရေအေးဖြင့် ရေခဲဖျော်နည်းများ"),
        t("Always use safe thawing methods.", "常に安全な方法で解凍してください。", "ဘေးကင်းသော ရေခဲဖျော်နည်းများကို အမြဲသုံးပါ။"))
    ]
  ),

  safetyItem("cook-meat-completely", "🔥",
    t("Cook meat completely", "肉を完全に加熱調理する", "အသားကို ကျက်အောင် ချက်ပါ"),
    t("Ensure the centre of meat is fully cooked and opaque before serving.", "提供する前に、肉の中心部が完全に加熱され、不透明になっていることを確認してください。", "အသားကို မစားမီ အတွင်းပိုင်းအထိ သေချာကျက်ပြီး ဖြူသွားသည်အထိ ချက်ပါ။"),
    [
      t("Cook meat and poultry completely before serving.", "提供する前に、肉や鳥肉を完全に加熱調理してください。", "မစားမီ အသားနှင့် ကြက်/ငှက်အသားများကို သေချာကျက်အောင် ချက်ပါ။"),
      t("Check the thickest part, not only the outside.", "外側だけでなく、一番厚みのある部分を確認してください。", "အပြင်ပန်းတင်မကဘဲ အထူဆုံးနေရာကို ဖြတ်ကြည့်ပါ။"),
      t("Chicken must not have a raw, shiny, translucent or jelly-like centre.", "鶏肉の中心部が、生で光沢があり、半透明またはゼリー状のままになっていてはいけません。", "ကြက်သား၏ အတွင်းပိုင်းသည် အစိမ်းလိုက်၊ ပြောင်လက်နေခြင်း၊ တစ်ဝက်တစ်ပျက်ကျက်ခြင်း သို့မဟုတ် ဂျယ်လီကဲ့သို့ မဖြစ်ရပါ။"),
      t("The inside should be fully cooked and opaque.", "内部は完全に加熱され、不透明（白っぽく）になっている必要があります。", "အတွင်းပိုင်းသည် လုံးဝကျက်ပြီး တင်းသွားရမည်။"),
      t("Juices should not appear bloody.", "肉汁に血が混じっていないことを確認してください。", "ထွက်လာသော အရည်များသည် သွေးရောင်မသန်းရပါ။"),
      t("Minced meat, patties, sausages and thick pieces require extra care.", "挽き肉、パテ、ソーセージ、厚みのある肉は、特に注意が必要です。", "အသားနုတ်နုတ်စင်း၊ အသားပြား၊ ဝက်အူချောင်းနှင့် အသားတုံးကြီးများကို အထူးသတိထားပါ။"),
      t("Do not partially cook meat and leave it to finish later.", "肉を途中で加熱するのをやめ、後で仕上げるような半調理は避けてください。", "အသားကို တစ်ဝက်တစ်ပျက်ချက်ပြီး နောက်မှ ဆက်ချက်ရန် ပစ်မထားပါနှင့်။"),
      t("When uncertain, cook it longer or ask Edwin or Yukari.", "確信が持てない場合は、長めに加熱するか、エドウィンまたはゆかりに確認してください。", "သေချာမသိပါက ပိုကြာကြာချက်ပါ သို့မဟုတ် Edwin သို့မဟုတ် Yukari ကို မေးမြန်းပါ။")
    ],
    t("The outside can look cooked while the centre is still raw.", "外側が焼けているように見えても、中心部がまだ生であることがあります。", "အပြင်ပန်း ကျက်နေပုံရသော်လည်း အတွင်းပိုင်းမှာ စိမ်းနေနိုင်ပါသည်။"),
    [
      photo("assets/food-safety/cook-meat-completely.png",
        t("Thick chicken piece cut open to show a fully cooked centre", "完全に加熱された中心部を示すためにカットされた分厚い鶏肉", "အတွင်းပိုင်းကျက်ကြောင်း ပြသရန် ဖြတ်ထားသော ကြက်သားတုံး"),
        t("Ensure meat is cooked all the way to the centre.", "肉の中心部まで完全に火が通っていることを確認してください。", "အသား၏ အလယ်ဗဟိုအထိ ကျက်အောင်ချက်ပါ။"))
    ]
  ),

  safetyItem("rice-and-noodle-safety", "🍚",
    t("Cooked rice and noodles", "調理済みの米と麺", "ထမင်းနှင့် ခေါက်ဆွဲ"),
    t("Do not leave cooked rice or noodles outside. Reheating may not destroy all toxins.", "調理済みの米や麺を放置しないでください。再加熱してもすべての毒素が消えるわけではありません。", "ချက်ပြီးသား ထမင်း သို့မဟုတ် ခေါက်ဆွဲကို အပြင်တွင် ပစ်မထားပါနှင့်။ ပြန်နွှေးခြင်းက အဆိပ်အတောက်အားလုံးကို မဖျက်ဆီးနိုင်ပါ။"),
    [
      t("Do not leave cooked rice or noodles outside for a long time.", "調理済みの米や麺を長時間外に放置しないでください。", "ချက်ပြီးသား ထမင်း သို့မဟုတ် ခေါက်ဆွဲကို အပြင်တွင် အချိန်အကြာကြီး ပစ်မထားပါနှင့်။"),
      t("Eat them soon or refrigerate them promptly.", "すぐに食べるか、速やかに冷蔵庫に保存してください。", "ချက်ချင်းစားပါ သို့မဟုတ် ရေခဲသေတ္တာထဲသို့ ချက်ချင်းထည့်ပါ။"),
      t("Use smaller, shallow containers when cooling a large quantity.", "大量のものを冷ますときは、小さく浅い容器に小分けにしてください。", "ပမာဏများပြားပါက အအေးခံရန် အောက်တိမ်သော ဘူးအသေးများကို သုံးပါ။"),
      t("Never leave cooked rice or noodles outside overnight.", "調理済みの米や麺を絶対に一晩中外に放置しないでください。", "ချက်ပြီးသား ထမင်း သို့မဟုတ် ခေါက်ဆွဲကို အပြင်တွင် တစ်ညလုံး လုံးဝမသိမ်းပါနှင့်။"),
      t("Reheating rice may not destroy every toxin already produced by bacteria.", "米を再加熱しても、細菌によってすでに生成されたすべての毒素が破壊されるわけではありません。", "ထမင်းကို ပြန်နွှေးသော်လည်း ဘက်တီးရီးယားကြောင့် ထွက်လာပြီးသား အဆိပ်အတောက်များကို မဖျက်ဆီးနိုင်ပါ။")
    ],
    t("Old rice can remain unsafe even after reheating.", "古い米は、再加熱しても安全ではない状態が続くことがあります。", "ထမင်းဟောင်းသည် ပြန်နွှေးသော်လည်း ဘေးမကင်းနိုင်ပါ။"),
    [
      photo("assets/food-safety/rice-and-noodle-safety.png",
        t("Cooked rice being transferred into a shallow container and refrigerated", "浅い容器に移されて冷蔵庫に保存される調理済みの米", "ထမင်းကို အောက်တိမ်သောဘူးထဲပြောင်းထည့်၍ ရေခဲသေတ္တာထဲထည့်ပုံ"),
        t("Refrigerate rice promptly. Do not leave it out overnight.", "ご飯はすぐに冷蔵保存してください。一晩中放置しないでください。", "ထမင်းကို ချက်ချင်းရေခဲသေတ္တာထဲထည့်ပါ။ တစ်ညလုံး အပြင်မှာ မထားပါနှင့်။"))
    ]
  ),

  safetyItem("leftover-safety", "🍱",
    t("Cooked food and leftovers", "調理済みの食品と残り物", "ချက်ပြုတ်ပြီးသား အစားအစာနှင့် စားကြွင်းစားကျန်များ"),
    t("Refrigerate cooked food within 2 hours. Only reheat leftovers once.", "調理済みの食品は2時間以内に冷蔵してください。残り物の再加熱は1回のみです。", "ချက်ပြုတ်ပြီးသား အစားအစာများကို ၂ နာရီအတွင်း ရေခဲသေတ္တာထဲထည့်ပါ။ တစ်ကြိမ်သာ ပြန်နွှေးပါ။"),
    [
      t("Refrigerate cooked food within 2 hours.", "調理済みの食品は2時間以内に冷蔵庫に入れてください。", "ချက်ပြုတ်ပြီးသား အစားအစာများကို ၂ နာရီအတွင်း ရေခဲသေတ္တာထဲထည့်ပါ။"),
      t("Do not leave curry, meat, seafood, rice, noodles, milk dishes or coconut-milk dishes outside for the whole day.", "カレー、肉、シーフード、米、麺、牛乳を使った料理、ココナッツミルクを使った料理を一日中外に放置しないでください。", "ဟင်း၊ အသား၊ ပင်လယ်စာ၊ ထမင်း၊ ခေါက်ဆွဲ၊ နို့ သို့မဟုတ် အုန်းနို့ပါသော အစားအစာများကို အပြင်တွင် တစ်နေ့လုံး မထားပါနှင့်။"),
      t("Reheat only the amount that will be eaten.", "食べる分量だけを再加熱してください。", "စားမည့်ပမာဏကိုသာ ပြန်နွှေးပါ။"),
      t("Reheat the food until it is steaming hot throughout.", "食品の全体から湯気が出るくらい、十分に熱くなるまで再加熱してください。", "အစားအစာတစ်ခုလုံး အငွေ့ပျံပြီး ပူလာသည်အထိ နွှေးပါ။"),
      t("Reheat stored food only once.", "保存された食品の再加熱は1回だけにしてください。", "သိမ်းထားသော အစားအစာကို တစ်ကြိမ်သာ ပြန်နွှေးပါ။"),
      t("Do not repeatedly cool and reheat the same food.", "同じ食品の冷却と再加熱を何度も繰り返さないでください。", "တူညီသော အစားအစာကို အအေးခံလိုက် ပြန်နွှေးလိုက် ထပ်ခါထပ်ခါ မလုပ်ပါနှင့်။")
    ],
    t("Cooked food left outside for more than 2 hours should be thrown away.", "外に2時間以上放置された調理済み食品は廃棄する必要があります。", "အပြင်တွင် ၂ နာရီထက်ပိုပြီး ထားခဲ့သော ချက်ပြုတ်ပြီးသား အစားအစာများကို လွှင့်ပစ်ရမည်။"),
    [
      photo("assets/food-safety/leftovers.png",
        t("Covered leftover container, refrigerator and steaming reheat symbol", "蓋付きの残り物容器、冷蔵庫、湯気のある再加熱のシンボル", "အဖုံးအုပ်ထားသော စားကြွင်းစားကျန်ဘူး၊ ရေခဲသေတ္တာနှင့် ပြန်နွှေးသည့်သင်္ကေတ"),
        t("Reheat leftovers only once and make sure they are steaming hot.", "残り物の再加熱は1回のみとし、十分に熱くなっていることを確認してください。", "စားကြွင်းစားကျန်များကို တစ်ကြိမ်သာ ပြန်နွှေးပြီး သေချာပူပါစေ။"))
    ]
  ),

  safetyItem("clean-serving-utensils", "🥄",
    t("Use clean utensils", "清潔な器具を使用する", "သန့်ရှင်းသော ဇွန်း/အသုံးအဆောင်များကို သုံးပါ"),
    t("Use clean spoons to portion stored food. Never eat directly from containers.", "保存容器から取り分ける際は清潔なスプーンを使用し、直接食べないでください。", "သိမ်းထားသော အစားအစာကို ထုတ်ယူရန် သန့်ရှင်းသော ဇွန်းကို သုံးပါ။ ဘူးထဲမှ တိုက်ရိုက်မစားပါနှင့်။"),
    [
      t("Do not eat directly from the main storage container.", "保存容器から直接食べないでください。", "သိမ်းဆည်းထားသော အဓိကဘူးထဲမှ တိုက်ရိုက်မစားပါနှင့်။"),
      t("Do not return a used spoon to stored food.", "使用済みのスプーンを保存された食品に戻さないでください。", "သုံးပြီးသားဇွန်းကို သိမ်းထားသော အစားအစာထဲသို့ ပြန်မထည့်ပါနှင့်။"),
      t("Use a clean spoon to take out the required portion.", "必要な分量を取り出すときは、清潔なスプーンを使用してください。", "လိုအပ်သော ပမာဏကို ထုတ်ယူရန် သန့်ရှင်းသော ဇွန်းအသစ်ကို သုံးပါ။"),
      t("Keep the remaining food covered and refrigerated.", "残った食品は蓋をして冷蔵保存してください。", "ကျန်ရှိသော အစားအစာများကို အဖုံးပိတ်ပြီး ရေခဲသေတ္တာထဲတွင် ထည့်သိမ်းပါ။"),
      t("Wash kitchen tools after handling raw food and before handling cooked food.", "生のものを取り扱った後、調理済みのものを扱う前に、調理器具を洗ってください。", "အသားစိမ်းကိုင်တွယ်ပြီးနောက် ချက်ပြုတ်ပြီးသား အစားအစာများကို မကိုင်တွယ်မီ မီးဖိုချောင်သုံးပစ္စည်းများကို ဆေးကြောပါ။")
    ],
    t("A used spoon can contaminate all the food remaining in the container.", "使用済みのスプーンは、容器に残っているすべての食品を汚染する可能性があります。", "သုံးပြီးသားဇွန်းသည် ဘူးထဲတွင် ကျန်ရှိသော အစားအစာအားလုံးကို ညစ်ပတ်သွားစေနိုင်သည်။"),
    [
      photo("assets/food-safety/clean-serving-utensils.png",
        t("Clean serving spoon and separate raw/cooked chopping boards", "清潔な取り分け用スプーンと、生用・調理済み用の分かれたまな板", "သန့်ရှင်းသော ဇွန်းနှင့် သီးခြားစီခွဲထားသော စဉ့်တီတုံးများ"),
        t("Always use clean utensils to portion food.", "食品を取り分けるときは、常に清潔な器具を使用してください。", "အစားအစာများကို ထုတ်ယူရန် သန့်ရှင်းသောဇွန်းကို အမြဲသုံးပါ။"))
    ]
  ),

  safetyItem("egg-safety", "🥚",
    t("Eggs and eggshells", "卵と卵の殻", "ကြက်ဥနှင့် ဥခွံများ"),
    t("Wash hands after handling eggs. Avoid raw eggs for vulnerable individuals.", "卵を扱った後は手を洗ってください。免疫力の低い人への生卵は避けてください。", "ဥများကို ကိုင်တွယ်ပြီးနောက် လက်ဆေးပါ။ မကျန်းမာသူများအတွက် ဥအစိမ်းများကို ရှောင်ပါ။"),
    [
      t("Wash hands after touching raw eggs or eggshells.", "生卵や卵の殻に触れた後は、手を洗ってください。", "ဥအစိမ်း သို့မဟုတ် ဥခွံများကို ကိုင်တွယ်ပြီးနောက် လက်ဆေးပါ။"),
      t("Do not let raw egg or eggshells touch cooked food.", "生卵や卵の殻が調理済みの食品に触れないようにしてください。", "ဥအစိမ်း သို့မဟုတ် ဥခွံများကို ချက်ပြုတ်ပြီးသား အစားအစာများနှင့် မထိပါစေနှင့်။"),
      t("Do not use cracked eggs.", "ひびの入った卵は使用しないでください。", "အက်ကွဲနေသော ဥများကို မသုံးပါနှင့်။"),
      t("Cook eggs properly when preparing food for children, older adults, pregnant people or anyone who is unwell.", "子供、高齢者、妊婦、または体調の悪い人のために調理する場合は、卵を十分に加熱してください。", "ကလေးများ၊ သက်ကြီးရွယ်အိုများ၊ ကိုယ်ဝန်ဆောင်များနှင့် မကျန်းမာသူများအတွက် ပြင်ဆင်လျှင် ဥများကို ကျက်အောင် ချက်ပါ။")
    ],
    t("Eggshells and raw egg can spread bacteria to cooked food.", "卵の殻や生卵は、調理済みの食品に細菌を広げる可能性があります。", "ဥခွံများနှင့် ဥအစိမ်းများသည် ချက်ပြုတ်ပြီးသား အစားအစာများသို့ ဘက်တီးရီးယားများ ပျံ့နှံ့စေနိုင်သည်။"),
    [
      photo("assets/food-safety/egg-safety.png",
        t("Intact eggs separated from cooked food", "調理済みの食品から分けられた、ひびのない卵", "ချက်ပြုတ်ပြီးသား အစားအစာများနှင့် သီးခြားထားသော ကြက်ဥများ"),
        t("Eggs must be handled and cooked carefully.", "卵は慎重に取り扱い、十分に加熱調理してください。", "ဥများကို ကိုင်တွယ်ချက်ပြုတ်ရာတွင် အထူးသတိထားပါ။"))
    ]
  ),

  safetyItem("when-uncertain-discard", "🗑️",
    t("When uncertain, throw it away", "迷ったら廃棄する", "သေချာမသိလျှင် လွှင့်ပစ်ပါ"),
    t("Discard questionable, old, moldy, or unusual smelling food immediately.", "疑わしい食品、古い食品、カビの生えた食品、または異臭のする食品は、すぐに廃棄してください。", "မသေချာသော၊ သက်တမ်းလွန်နေသော၊ မှိုတက်နေသော သို့မဟုတ် အနံ့ဆိုးထွက်နေသော အစားအစာများကို ချက်ချင်းလွှင့်ပစ်ပါ။"),
    [
      t("Throw food away when it is beyond its safe storage period.", "安全な保存期間を過ぎた食品は廃棄してください。", "ဘေးကင်းသော သိုလှောင်ကာလ ကျော်လွန်သွားသော အစားအစာများကို လွှင့်ပစ်ပါ။"),
      t("Throw food away when it was left outside for too long.", "長時間外に放置されていた食品は廃棄してください。", "အပြင်တွင် အချိန်အကြာကြီး ထားခဲ့သော အစားအစာများကို လွှင့်ပစ်ပါ။"),
      t("Throw food away when it smells sour or unusual.", "酸っぱいにおいや異臭がする食品は廃棄してください。", "ချဉ်သောအနံ့ သို့မဟုတ် ထူးခြားသောအနံ့ထွက်လျှင် လွှင့်ပစ်ပါ။"),
      t("Throw food away when it feels unusually sticky or slimy.", "異常にベタベタしていたり、ぬめりがあったりする食品は廃棄してください。", "ပုံမှန်မဟုတ်ဘဲ စေးကပ်ကပ် သို့မဟုတ် ချွဲကျိကျိဖြစ်နေလျှင် လွှင့်ပစ်ပါ။"),
      t("Throw food away when it has mould or an unusual colour.", "カビが生えていたり、異常な色をしていたりする食品は廃棄してください。", "မှိုတက်နေလျှင် သို့မဟုတ် ပုံမှန်မဟုတ်သောအရောင်ဖြစ်နေလျှင် လွှင့်ပစ်ပါ။"),
      t("Throw food away when nobody knows when it was bought, cooked or refrigerated.", "いつ購入、調理、または冷蔵されたのか誰もわからない食品は廃棄してください。", "မည်သူမျှ ဝယ်သည့်ရက်၊ ချက်သည့်ရက် သို့မဟုတ် ရေခဲသေတ္တာထဲထည့်သည့်ရက်ကို မသိသော အစားအစာများကို လွှင့်ပစ်ပါ။"),
      t("Do not taste questionable food to test whether it is safe.", "安全かどうかを確かめるために、疑わしい食品を味見しないでください。", "ဘေးကင်းမကင်းသိရန် မသေချာသော အစားအစာကို မြည်းမကြည့်ပါနှင့်။")
    ],
    t("When unsure, do not take the risk. Food is cheaper than medical treatment.", "不確実な場合は、リスクを冒さないでください。食品代は医療費よりも安いです。", "မသေချာလျှင် စွန့်စားမလုပ်ပါနှင့်။ အစားအစာဖိုးသည် ဆေးကုသစရိတ်ထက် ပိုသက်သာပါသည်။"),
    [
      photo("assets/food-safety/when-uncertain-discard.png",
        t("Suspicious food going into a rubbish bin", "ゴミ箱に捨てられる疑わしい食品", "သံသယဖြစ်ဖွယ် အစားအစာကို အမှိုက်ပုံးထဲသို့ ထည့်နေပုံ"),
        t("Discard any doubtful food. Safety first.", "疑わしい食品はすべて廃棄してください。安全第一です。", "သံသယရှိသော အစားအစာများကို စွန့်ပစ်ပါ။ ဘေးကင်းရေးသည် ပထမ။"))
    ]
  )
];

const officialReferences = {
  title: t("Official references", "公式リファレンス", "တရားဝင် ကိုးကားချက်များ"),
  items: [
    { title: t("Singapore Food Agency - Food Safety Tips", "シンガポール食品庁 - 食品安全のコツ", "စင်ကာပူစားသောက်ကုန်အေဂျင်စီ - အစားအသောက်ဘေးကင်းရေး လမ်းညွှန်ချက်များ"), url: "https://www.sfa.gov.sg/food-safety/food-safety-tips" },
    { title: t("Singapore Food Agency - Fried Rice Syndrome", "シンガポール食品庁 - セレウス菌食中毒について", "စင်ကာပူစားသောက်ကုန်အေဂျင်စီ - ထမင်းကြော်ကြောင့်ဖြစ်သော အစာဆိပ်သင့်မှုအကြောင်း"), url: "https://www.sfa.gov.sg/food-information/risk-at-a-glance/fried-rice-syndrome" },
    { title: t("FoodSafety.gov - Cold Food Storage Chart", "FoodSafety.gov - 冷蔵保存チャート", "FoodSafety.gov - အအေးခန်းသိုလှောင်မှု ဇယား"), url: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts" },
    { title: t("FoodSafety.gov - Safe Minimum Internal Temperatures", "FoodSafety.gov - 安全最低中心温度", "FoodSafety.gov - ဘေးကင်းဆုံး အနိမ့်ဆုံးအတွင်းပိုင်းအပူချိန်"), url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" }
  ]
};



const routineTasks = [
  routine("google-calendar-check", "daily", 5, "CAL",
    t("Google Calendar Check", "Googleカレンダー確認", "Google Calendar စစ်ဆေးခြင်း"),
    t("Check the shared Google Calendar every morning and again during the day for today's and upcoming events.", "毎朝と日中に共有Googleカレンダーを確認し、今日と今後の予定を見ます。", "မနက်တိုင်းနှင့် နေ့အတွင်း shared Google Calendar ကို စစ်ပြီး ယနေ့နှင့် လာမည့် event များကို ကြည့်ပါ။"),
    t("Daily - morning + regularly", "毎日 - 朝＋定期的", "နေ့စဉ် - မနက် + ပုံမှန်"),
    [
      t("Check each event's time and location and prepare as needed. Tell Edwin or Yukari if an event affects the household schedule or anything is unclear. Do not change or delete events unless instructed.", "各予定の時間と場所を確認し、必要な準備をします。家の予定に影響する場合や不明点がある場合は、エドウィンまたはゆかりに伝えます。指示なしに予定を変更・削除しないでください。", "event တစ်ခုစီ၏ အချိန်နှင့် နေရာကို စစ်ပြီး လိုအပ်သလို ပြင်ဆင်ပါ။ အိမ်၏ schedule ကို သက်ရောက်ပါက သို့မဟုတ် မရှင်းလင်းပါက Edwin သို့မဟုတ် Yukari ကို ပြောပါ။ ညွှန်ကြားချက်မရှိဘဲ event ကို မပြောင်း၊ မဖျက်ပါနှင့်။"),
      t("Chocho's salary is paid on the 1st of every month.", "Chochoの給料日は毎月1日です。", "Chocho ၏ လစာကို လတိုင်း ၁ ရက်နေ့တွင် ပေးပါသည်။"),
      t("Chocho's mandatory rest day is the first Sunday of every month.", "Chochoの必須の休日は毎月第1日曜日です。", "Chocho ၏ မဖြစ်မနေ နားရက်သည် လတိုင်း၏ ပထမဆုံး တနင်္ဂနွေနေ့ဖြစ်သည်။"),
      t("Use the Calendar entries for the exact schedule.", "正確な予定はカレンダーの登録内容で確認してください。", "အတိအကျ အချိန်ဇယားကို Calendar entry များတွင် စစ်ပါ။")
    ],
    [
      photo("assets/routines/google-calendar-check.png",
        t("Google Calendar app icon", "Googleカレンダーのアプリアイコン", "Google Calendar app အိုင်ကွန်"),
        t("Use this icon to open the shared Google Calendar.", "このアイコンから共有Googleカレンダーを開きます。", "မျှဝေထားသော Google Calendar ကို ဖွင့်ရန် ဤအိုင်ကွန်ကို သုံးပါ။"))
    ],
    {
      legendTitle: t("Calendar icon legend", "カレンダーのアイコン凡例", "Calendar အိုင်ကွန် အဓိပ္ပာယ်"),
      legendItems: [
        { icon: "🐱", label: t("Me (Edwin)", "私（Edwin）", "Edwin (ကျွန်တော်)") },
        { icon: "🍎", label: t("Yukari", "ゆかり", "ယူကာရီ") },
        { icon: "🦋", label: t("Chocho", "チョウチョ", "ချိုချို") },
        { icon: "🌰", label: t("Auntie (Edwin's mother)", "Auntie（Edwinのお母さん）", "Auntie (Edwin ၏ မိခင်)") }
      ],
      legendNote: t("When 🍎 and ✈️ appear together, it means Yukari's flight schedule.", "🍎と✈️が一緒に表示されている予定は、ゆかりのフライト予定です。", "🍎 နဲ့ ✈️ ကို အတူတူတွေ့ရရင် Yukari ရဲ့ လေယာဉ်ခရီးစဉ် အချိန်ဇယားကို ဆိုလိုပါတယ်။")
    }),
  routine("helper-diary-feedback", "daily", 200, "D",
    t("Diary & Feedback", "日記・フィードバック", "နေ့စဉ်မှတ်တမ်းနှင့် အကြံပြုချက်"),
    t("Write your thoughts, feelings, questions, or worries. The app saves them and opens a WhatsApp notice.", "考え、気持ち、質問、心配なことを書きます。アプリが保存し、WhatsApp通知を開きます。", "အတွေး၊ ခံစားချက်၊ မေးခွန်း သို့မဟုတ် စိုးရိမ်တာကို ရေးပါ။ App က သိမ်းပြီး WhatsApp အသိပေးချက်ဖွင့်ပေးမည်။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    t("Use this as a personal diary space when speaking is difficult or unclear. Write freely first, then submit to save the entry.", "話すことが難しい、または伝わりにくいときの、個人の日記スペースとして使ってください。まず自由に書き、送信すると記録が保存されます。", "စကားပြောရန်ခက်ခဲသည့်အခါ သို့မဟုတ် မရှင်းလင်းသည့်အခါ ကိုယ်ပိုင်နေ့စဉ်မှတ်တမ်းနေရာအဖြစ် အသုံးပြုပါ။ အရင်ဆုံးလွတ်လပ်စွာရေးပြီး ပို့ပါ၊ ထို့နောက် မှတ်တမ်းကို သိမ်းထားပါမည်။"),
    [
      photo("assets/routines/nako-diary-feedback.png",
        t("Coral diary with a pencil and message bubble", "鉛筆とメッセージ吹き出しが添えられたコーラル色の日記帳", "ခဲတံနှင့် စာတိုပူဖောင်းပါသော လိမ္မော်ဖျော့ရောင် နေ့စဉ်မှတ်တမ်းစာအုပ်"),
        t("Write and save your diary, then open the WhatsApp notice.", "日記を書いて保存し、その後WhatsApp通知を開きます。", "နေ့စဉ်မှတ်တမ်းရေးပြီး သိမ်းပါ။ ပြီးလျှင် WhatsApp အသိပေးချက်ကို ဖွင့်ပါ။"))
    ]),
  routine("drinking-water-prep", "daily", 10, "W", 
    t("Drinking Water Prep", "飲料水の準備", "သောက်ရေပြင်ဆင်ခြင်း"), 
    t("Keep the Tiger MAA-A302 topped up with fresh boiling water. Also boil, cool, and refrigerate drinking water so enough is always ready.", "Tiger MAA-A302に新しく沸かしたお湯を補充します。また、飲料水を沸かして冷まし、冷蔵庫に保管して、いつでも十分な水を用意します。", "Tiger MAA-A302 ကို လတ်လတ်ဆတ်ဆတ် ဆူထားသောရေနွေးဖြင့် ပြန်ဖြည့်ထားပါ။ သောက်ရေကိုလည်း ကျို၊ အအေးခံပြီး ရေခဲသေတ္တာထဲသိမ်းကာ အမြဲလုံလောက်အောင် ပြင်ထားပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"), 
    [
      t("Under Tiger's test conditions, the MAA-A302 keeps water at 74°C or above after 10 hours and 59°C or above after 24 hours.", "Tigerの試験条件では、MAA-A302のお湯は10時間後に74℃以上、24時間後に59℃以上です。", "Tiger ၏ စမ်းသပ်အခြေအနေအရ MAA-A302 ထဲရှိရေသည် ၁၀ နာရီအကြာတွင် အနည်းဆုံး 74°C နှင့် ၂၄ နာရီအကြာတွင် အနည်းဆုံး 59°C ရှိသည်။"),
      t("Fill the Tiger pot with fresh boiling water.", "Tigerポットに新しく沸かしたお湯を入れます。", "Tiger ရေနွေးဘူးကို လတ်လတ်ဆတ်ဆတ် ဆူထားသောရေနွေးဖြင့် ဖြည့်ပါ။"),
      t("Use the water normally.", "お湯は通常どおり使います。", "ရေကို ပုံမှန်အတိုင်း သုံးပါ။"),
      t("If water is still inside after 2 days, pour it away.", "2日後もお湯が残っていたら、捨てます。", "၂ ရက်အကြာတွင် ရေကျန်နေသေးပါက သွန်ပစ်ပါ။"),
      t("Rinse the pot with clean water.", "ポットをきれいな水ですすぎます。", "ရေနွေးဘူးကို ရေသန့်ဖြင့် ဆေးပါ။"),
      t("Fill it again with fresh boiling water.", "新しく沸かしたお湯をもう一度入れます。", "လတ်လတ်ဆတ်ဆတ် ဆူထားသောရေနွေးဖြင့် ပြန်ဖြည့်ပါ။"),
      t("This helps reduce the need to keep buying bottled water.", "これによりボトル入りの水を購入し続ける必要が減ります。", "၎င်းသည် ရေသန့်ဗူးများ အမြဲဝယ်ယူရန် လိုအပ်မှုကို လျှော့ချပေးသည်။")
    ],
    [
      photo("assets/routines/drinking-water-prep-tiger-maa-a302.jpg",
        t("Tiger MAA-A302 3-litre air-pump pot", "Tiger MAA-A302 3リットル エアーポット", "Tiger MAA-A302 ၃ လီတာ လေဖိအားသုံး ရေနွေးဘူး"),
        t("Keep this Tiger pot topped up with fresh boiling water for normal use.", "このTigerポットに新しく沸かしたお湯を補充し、通常どおり使います。", "ဤ Tiger ရေနွေးဘူးကို လတ်လတ်ဆတ်ဆတ် ဆူထားသောရေနွေးဖြင့် ဖြည့်ပြီး ပုံမှန်အတိုင်း သုံးပါ။")),
      photo("assets/routines/drinking-water-prep-tiger-refill.jpg",
        t("Pouring out and refilling the Tiger pot", "Tigerポットのお湯を捨てて入れ替えているところ", "Tiger ရေနွေးဘူးမှ ရေသွန်ပြီး ပြန်ဖြည့်နေခြင်း"),
        t("After 2 days, discard any remaining water, rinse the pot, and refill it with fresh boiling water.", "2日後に残ったお湯は捨て、ポットをすすぎ、新しく沸かしたお湯を入れます。", "၂ ရက်အကြာတွင် ကျန်ရေကို သွန်ပစ်၊ ရေနွေးဘူးကို ဆေးပြီး လတ်လတ်ဆတ်ဆတ် ဆူထားသောရေနွေးဖြင့် ပြန်ဖြည့်ပါ။")),
      photo("assets/routines/drinking-water-prep-kettle.jpg",
        t("Kettle for boiling drinking water", "飲料水を沸かすやかん", "သောက်ရေကျိုရန် ရေနွေးအိုး"),
        t("Use this kettle to boil the drinking water.", "このやかんで飲料水を沸かします。", "သောက်ရေကို ဤရေနွေးအိုးဖြင့် ကျိုပါ။")),
      photo("assets/routines/drinking-water-prep-fridge-bottles.jpg",
        t("Upright reused glass bottles in the fridge", "冷蔵庫内で立てて保管する再利用ガラス瓶", "ရေခဲသေတ္တာထဲတွင် မတ်မတ်ထားသော ပြန်သုံးဖန်ပုလင်းများ"),
        t("After the boiled water cools, store it upright in the reused glass bottles in the fridge.", "沸かした水が冷めたら、再利用しているガラス瓶に入れて、冷蔵庫で立てて保管します。", "ကျိုထားသောရေ အေးသွားပြီးနောက် ပြန်သုံးသော ဖန်ပုလင်းများထဲထည့်ပြီး ရေခဲသေတ္တာတွင် မတ်မတ်ထား၍ သိမ်းပါ။")),
    ]),
  routine("essential-food-stock", "daily", 12, "F",
    t("Essential Food Stock", "常に家に置く食品", "အိမ်တွင် အမြဲထားရမည့် အစားအစာ"),
    t("Keep milk, eggs, bread, Japanese rice, enoki and brown shimeji mushrooms, tofu, frozen sliced pork, tomatoes, bananas, and broccoli in stock.", "牛乳、卵、パン、日本米、えのき、茶色のしめじ、豆腐、冷凍豚肉スライス、トマト、バナナ、ブロッコリーを常備します。", "နွားနို့၊ ကြက်ဥ၊ ပေါင်မုန့်၊ ဂျပန်ဆန်၊ enoki နှင့် အညိုရောင် shimeji မှို၊ tofu၊ အေးခဲဝက်သားပါးပါး၊ ခရမ်းချဉ်သီး၊ ငှက်ပျောသီးနှင့် ဘရိုကိုလီကို အမြဲထားပါ။"),
    t("Daily check / restock as needed", "毎日確認／必要に応じて補充", "နေ့စဉ်စစ်ဆေး / လိုအပ်သလို ပြန်ဖြည့်"),
    [
      t("Add items to the shopping list before they run out.", "なくなる前に買い物リストへ追加してください。", "ပစ္စည်းမကုန်မီ shopping list ထဲထည့်ပါ။"),
      t("Check expiry dates. Keep frozen sliced pork in the freezer and broccoli in the refrigerator. Broccoli is nutritious and Edwin likes it, so restock it before it runs out.", "賞味期限を確認し、冷凍豚肉スライスは冷凍庫、ブロッコリーは冷蔵庫で保管してください。ブロッコリーは栄養があり、エドウィンも好きなので、なくなる前に補充します。", "သက်တမ်းကုန်ရက်ကို စစ်ပါ။ အေးခဲဝက်သားပါးပါးကို freezer ထဲတွင်ထားပြီး ဘရိုကိုလီကို refrigerator ထဲတွင်ထားပါ။ ဘရိုကိုလီသည် အာဟာရရှိပြီး Edwin လည်းကြိုက်သောကြောင့် မကုန်မီ ပြန်ဖြည့်ပါ။")
    ],
    [
      photo("assets/routines/essential-food-stock-bananas.jpg",
        t("Banana bunches at the wet-market fruit stall", "市場の果物店に吊られたバナナ", "စျေးသစ်သီးဆိုင်တွင် ချိတ်ထားသော ငှက်ပျောသီးခိုင်များ"),
        t("Use the marked banana bunches as the buying reference when home stock is running low.", "家の在庫が少なくなった時は、印を付けたバナナの房を購入の目安にします。", "အိမ်တွင် ငှက်ပျောသီးနည်းလာပါက အမှတ်အသားပြထားသော ငှက်ပျောသီးခိုင်များကို ဝယ်ယူရန် ကိုးကားပါ။"))
    ]),
  routine("daily-cooking", "daily", 15, "C",
    t("Daily Cooking", "毎日の料理", "နေ့စဉ်ချက်ပြုတ်ခြင်း"),
    t("Cook 3 meals a day, focusing on high-protein, lower-fat dishes to hit the 180g daily target, plus ad hoc snacks.", "高タンパク・低脂質を意識して、1日3食と必要に応じた軽食を作る。", "တစ်နေ့ ၃ နပ် ချက်ပါ။ နေ့စဉ် protein 180g ရောက်ရန် protein များပြီး အဆီနည်းသော ဟင်းများကို အဓိကထားပါ။ လိုအပ်လျှင် snack များလည်းပြင်ပါ။"),
    t("3 meals/day + snacks", "1日3食＋軽食", "တစ်နေ့ ၃ နပ် + snack"),
    t("Do not use onion, coriander, parsley, or bean sprouts, except in the human-only Braised Pork, Tau Pok & Eggs recipe. Never give it to Nako. Keep food and snacks out of bedrooms; use only the kitchen, dining, or living areas.", "玉ねぎ、パクチー、パセリ、もやしは使わないでください。ただし、人用の「豚肉・厚揚げ・卵の醤油煮込み」だけは例外です。絶対にナコへ与えないでください。寝室に食べ物やお菓子を持ち込まず、キッチン、ダイニング、リビングだけで扱ってください。", "ကြက်သွန်နီ၊ နံနံပင်၊ parsley နှင့် ပဲပင်ပေါက်ကို မသုံးပါနှင့်။ လူစားရန်သာဖြစ်သော ဝက်သား၊ Tau Pok နှင့် ကြက်ဥ ပဲငံပြာရည်နှပ်ဟင်းတစ်ခုတည်းသာ ခြွင်းချက်ဖြစ်သည်။ Nako ကို လုံးဝမကျွေးပါနှင့်။ အိပ်ခန်းများတွင် အစားအစာနှင့်မုန့်များ မထားဘဲ မီးဖိုချောင်၊ dining သို့မဟုတ် living area တွင်သာ ထားပါ။"),
    [
      photo("assets/routines/daily-cooking-induction.jpg",
        t("Pots on the induction hob for daily cooking", "日々の料理で使用するIHコンロ上の鍋", "နေ့စဉ်ချက်ပြုတ်ခြင်းအတွက် hob ပေါ်ရှိ အိုးများ"),
        t("Cook meals using the induction hob and stainless steel pots.", "IHコンロとステンレス鍋を使用して料理を作ります。", "Hob နှင့် အိုးများကို အသုံးပြု၍ နေ့စဉ်ဟင်းလျာများ ချက်ပြုတ်ပါ။"))
    ]),
  routine("protein-shake-creatine-prep", "daily", 18, "P",
    t("Protein Shake & Creatine Prep", "プロテインシェイクとクレアチン準備", "protein shake နှင့် creatine ပြင်ဆင်ခြင်း"),
    t("Make Edwin's shake with 1 scoop Optimum Nutrition protein and 1 scoop creatine. Protein powder gives about 24 g protein.", "Edwin用にOptimum Nutritionプロテイン1杯とクレアチン1杯で作ります。プロテインは約24 gです。", "Edwin အတွက် Optimum Nutrition protein ၁ scoop နဲ့ creatine ၁ scoop ထည့်ပါ။ Protein က ၂၄ g ခန့်ရသည်။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    t("Use the correct scoop for protein and creatine. Keep the portions consistent unless Edwin gives different instructions.", "プロテインとクレアチンはそれぞれ正しいスプーンを使う。エドウィンから別の指示がない限り、量は一定にする。", "protein နှင့် creatine အတွက် မှန်ကန်သော scoop ကို အသုံးပြုပါ။ Edwin က မတူညီသော ညွှန်ကြားချက် မပေးလျှင် ပမာဏကို တည်ငြိမ်စွာ ထားပါ။"),
    [
      photo("assets/routines/protein-shake-creatine-prep-supplies.jpg",
        t("Protein powder and creatine stored in the kitchen cabinet", "キッチン戸棚に保管しているプロテインパウダーとクレアチン", "မီးဖိုချောင်ဗီရိုထဲတွင် သိမ်းထားသော protein powder နှင့် creatine"),
        t("Use the Optimum Nutrition protein powder and creatine stored together in this cabinet.", "この戸棚に一緒に保管しているOptimum Nutritionのプロテインパウダーとクレアチンを使います。", "ဤဗီရိုထဲတွင် အတူတကွ သိမ်းထားသော Optimum Nutrition protein powder နှင့် creatine ကို အသုံးပြုပါ။")),
    ]),
  routine("clean-up-cooking-appliances", "daily", 16, "K", 
    t("Clean Up & Cooking Appliances", "片付けと調理器具の清掃", "သန့်ရှင်းရေးနှင့် ချက်ပြုတ်သည့်ပစ္စည်းများ"), 
    t("Wash cookware and plates. Wipe the kitchen. Clean each appliance used, including oily removable parts.", "調理器具と皿を洗います。キッチンを拭きます。使用した家電と油のついた部品を掃除します。", "အိုးခွက်ပန်းကန်ဆေးပါ။ မီးဖိုချောင်သုတ်ပါ။ သုံးထားတဲ့စက်နဲ့ ဆီပေတဲ့အပိုင်းတွေကို သန့်ရှင်းပါ။"),
    t("After every meal + as needed", "毎食後＋必要に応じて", "စားပြီးတိုင်း + လိုအပ်သလို"), 
    t("Do not leave oily cookware, food waste, or greasy appliance parts overnight.", "油のついた調理器具、生ゴミ、または脂っこい器具の部品を翌日まで放置しないでください。", "ဆီပေနေသော အိုးခွက်များ၊ စွန့်ပစ်အစားအစာများနှင့် အဆီများသော စက်ပစ္စည်းအစိတ်အပိုင်းများကို တစ်ညတာ မထားခဲ့ပါနှင့်။"),
    [
      photo("assets/routines/clean-up-cooking-appliances-kitchen-overview.jpg",
        t("Kitchen counter and cooking appliances to clean", "掃除するキッチンカウンターと調理家電", "သန့်ရှင်းရေးလုပ်ရမည့် မီးဖိုချောင်ကောင်တာနှင့် ချက်ပြုတ်စက်ပစ္စည်းများ"),
        t("Use this photo as the kitchen cleanup reference. Wash cookware and plates, wipe the hob, countertop, and sink area, and clean appliances such as the Ninja air fryer, blender, and Fujioh hood area when oily or dirty.", "この写真をキッチン清掃の目安にします。調理器具と皿を洗い、コンロ、天板、シンク周りを拭き、Ninjaノンフライヤー、ブレンダー、Fujiohレンジフード周りなど、油汚れや汚れがある調理家電を掃除します。", "ဤဓာတ်ပုံကို မီးဖိုချောင်သန့်ရှင်းရေးအတွက် မှတ်သားပါ။ အိုးခွက်ပန်းကန်များကို ဆေးပါ၊ မီးဖို၊ ကောင်တာနှင့် စင်ပတ်လည်ကို သုတ်ပါ၊ ဆီပေခြင်း သို့မဟုတ် ညစ်ပတ်ခြင်းရှိပါက Ninja air fryer၊ blender နှင့် Fujioh hood ပတ်လည်ကို သန့်ရှင်းရေးလုပ်ပါ။")),
    ]),
  routine("coffee-machine-upkeep", "daily", 30, "C", 
    t("Coffee Machine Upkeep", "コーヒーマシンの手入れ", "ကော်ဖီစက် ထိန်းသိမ်းခြင်း"), 
    t("Empty coffee grounds, rinse the drip tray, refill the water tank, and wipe around the De'Longhi coffee machine.", "コーヒーかすを捨て、ドリップトレイをすすぎ、水タンクに水を補充し、De'Longhiコーヒーマシンの周囲を拭きます。", "ကော်ဖီအနှစ်များကို သွန်ပါ၊ ရေခံပြားကို ဆေးကြောပါ၊ ရေကန်ကို ရေဖြည့်ပြီး De'Longhi ကော်ဖီစက်ပတ်ပတ်လည်ကို သုတ်ပါ။"),
    t("Daily / after use", "毎日 / 使用後", "နေ့စဉ် / အသုံးပြုပြီးနောက်"), 
    t("Do not let used coffee grounds or drip tray water sit too long.", "使用済みのコーヒーかすやドリップトレイの水を長時間放置しないでください。", "ကော်ဖီအနှစ်ဟောင်းများနှင့် ရေခံပြားမှ ရေများကို အကြာကြီး ပစ်မထားပါနှင့်။"),
    [
      photo("assets/routines/coffee-machine-upkeep-parts.jpg",
        t("De'Longhi coffee machine with removable parts opened for cleaning", "取り外し部品を開けて掃除するDe'Longhiコーヒーマシン", "သန့်ရှင်းရေးလုပ်ရန် ဖြုတ်နိုင်သော အစိတ်အပိုင်းများ ဖွင့်ထားသော De'Longhi ကော်ဖီစက်"),
        t("After use, empty the coffee grounds, rinse the drip tray and removable parts, refill the water tank, and wipe around the De'Longhi coffee machine.", "使用後はコーヒーかすを捨て、ドリップトレイと取り外し可能な部品をすすぎ、水タンクを補充し、De'Longhiコーヒーマシンの周囲を拭きます。", "အသုံးပြုပြီးနောက် ကော်ဖီအနှစ်များကို သွန်ပါ၊ ရေခံပြားနှင့် ဖြုတ်နိုင်သော အစိတ်အပိုင်းများကို ဆေးပါ၊ ရေကန်ကို ရေဖြည့်ပြီး De'Longhi ကော်ဖီစက်ပတ်လည်ကို သုတ်ပါ။")),
    ]),
  routine("nako-feeding-water", "daily", 35, "N",
    t("Nako - Feeding & Water", "ナコ - エサと水", "နာကို - အစာနှင့်ရေ"),
    t("Feed Nako 3 measured meals daily: 60 g Royal Canin kibble total, plus 1 chicken-and-vegetable topping cube per meal.", "ナコに1日3食与えます。Royal Caninは1日合計60 gで、毎食チキンと野菜のトッピングキューブを1個加えます。", "Nako ကို တစ်နေ့ ၃ နပ်ကျွေးပါ။ Royal Canin တစ်နေ့စုစုပေါင်း ၆၀ g နှင့် တစ်နပ်လျှင် ကြက်သားနှင့် ဟင်းသီးဟင်းရွက် topping cube ၁ တုံးထည့်ပါ။"),
    t("3 meals daily: Breakfast 7:30-8:00 / Lunch 13:00-13:30 / Dinner 19:00-19:30", "1日3食：朝食7:30〜8:00／昼食13:00〜13:30／夕食19:00〜19:30", "တစ်နေ့ ၃ နပ်: မနက်စာ 7:30-8:00 / နေ့လယ်စာ 13:00-13:30 / ညစာ 19:00-19:30"),
    [
      t("Record Nako's appetite percentage, kibble grams, and frozen food cubes once each day in the tracker below.", "下のトラッカーに、ナコが食べた割合、ドライフードのグラム数、冷凍フードキューブ数を1日1回記録してください。", "အောက်ရှိ မှတ်တမ်းတွင် Nako စားခဲ့သည့် ရာခိုင်နှုန်း၊ အစာခြောက် ဂရမ်နှင့် အေးခဲအစာတုံး အရေအတွက်ကို တစ်နေ့တစ်ကြိမ် မှတ်တမ်းတင်ပါ။"),
      t("Each morning, weigh 60 g of Royal Canin kibble for the full day.", "毎朝、1日分のRoyal Canin 60 gを量ってください。", "မနက်တိုင်း တစ်နေ့စာ Royal Canin ၆၀ g ကို ချိန်ပါ။"),
      t("Divide the kibble into 3 portions of about 20 g each.", "キブルを約20 gずつ3回分に分けてください。", "kibble ကို ၂၀ g ခန့်စီ ၃ ပုံခွဲပါ။"),
      t("Add exactly 1 chicken-and-vegetable topping cube to every meal.", "毎食、チキンと野菜のトッピングキューブを必ず1個加えてください。", "တစ်နပ်တိုင်း ကြက်သားနှင့် ဟင်းသီးဟင်းရွက် topping cube ၁ တုံးတိတိ ထည့်ပါ။"),
      t("After each meal, give water from the bottle and wipe Nako's wet mouth. Wash and refill the bottle daily.", "毎食後、ボトルから水を飲ませ、濡れた口元を拭いてください。ボトルは毎日洗って補充します。", "စားပြီးတိုင်း ရေဘူးမှ ရေတိုက်ပြီး Nako ၏ စိုနေသော ပါးစပ်ကို သုတ်ပါ။ ရေဘူးကို နေ့စဉ်ဆေးပြီး ရေပြန်ဖြည့်ပါ။"),
      t("The kibble amount may change as Nako grows. Follow the latest instruction and do not change it yourself.", "成長によりキブル量が変わる場合があります。最新の指示に従い、自分で量を変えないでください。", "Nako ကြီးလာသည့်အခါ kibble ပမာဏ ပြောင်းနိုင်သည်။ နောက်ဆုံးညွှန်ကြားချက်ကို လိုက်နာပြီး ကိုယ်တိုင် မပြောင်းပါနှင့်။"),
      t("Watch Nako while she eats. Remove the bowl when she finishes. She may flip it or put her paws inside.", "Nakoが食べている間は見守ります。食べ終わったらボウルを片付けます。ひっくり返したり、足を入れたりすることがあります。", "Nako စားနေချိန် စောင့်ကြည့်ပါ။ စားပြီးရင် ခွက်ကိုယူပါ။ ခွက်မှောက်တာ သို့မဟုတ် ခြေထောက်ထည့်တာ လုပ်နိုင်သည်။"),
      t("Give water often from the manual bottle. The pen nozzle is too slow. Do not leave a water bowl in the pen.", "手動ボトルでこまめに水を与えます。サークルの給水器は遅すぎます。サークル内に水皿を置きません。", "လက်ဆွဲရေဘူးနဲ့ မကြာခဏ ရေတိုက်ပါ။ ခြံကရေပိုက်ခေါင်း နှေးလွန်းသည်။ ခြံထဲ ရေခွက်မထားပါနဲ့။")
    ],
    [
      photo("assets/routines/nako-meal-prep-bowl.jpg",
        t("Nako's meal bowl with kibble and chicken mixture", "キブルとチキンが混ざったナコのエサ皿", "kibbles နှင့် ကြက်သားရောထားသော နာကို၏ အစာခွက်"),
        t("Use 1 measured Royal Canin portion and exactly 1 chicken-and-vegetable topping cube for each meal.", "毎食、量ったRoyal Canin 1回分とチキンと野菜のトッピングキューブ1個を使います。", "တစ်နပ်စီအတွက် ချိန်ထားသော Royal Canin ၁ ပုံနှင့် ကြက်သားနှင့် ဟင်းသီးဟင်းရွက် topping cube ၁ တုံးတိတိ သုံးပါ။")),
      photo("assets/routines/nako-feeding-spillage.jpg",
        t("Nako standing in her cage next to spilt food on the floor", "床にこぼれたエサの横のケージに立つナコ", "ကြမ်းပြင်ပေါ်တွင် ဖိတ်ကျနေသော အစားအစာဘေးရှိ ခြံထဲတွင်ရပ်နေသော နာကို"),
        t("Only leave food out for a short while and watch when Nako eats. When she gets full or is done eating, she will start playing with the bowl and try to flip it, which will cause spillage and dirty the cage. She will also try to stick her paw into the bowl and end up dirtying the cage.", "エサは短い時間だけ出し、ナコが食べている間は様子を見てください。お腹がいっぱいになるか食べ終わると、ボウルで遊び始めてひっくり返そうとし、エサがこぼれてケージが汚れてしまいます。また、ボウルに足を突っ込んでケージを汚してしまうこともあります。", "ခွေးစာကို အချိန်အနည်းငယ်သာ ချထားပေးပြီး နာကို စားနေချိန်တွင် စောင့်ကြည့်ပါ။ သူမ ဗိုက်ပြည့်သွားလျှင် သို့မဟုတ် စားပြီးသွားလျှင် ခွက်ကို ကစားပြီး မှောက်ရန် ကြိုးစားလိမ့်မည်၊ ၎င်းသည် ဖိတ်စင်ပြီး ခြံကို ညစ်ပတ်စေလိမ့်မည်။ သူမသည် ခွက်ထဲသို့ ခြေထောက်ထည့်ရန် ကြိုးစားပြီး ခြံကို ညစ်ပတ်စေလိမ့်မည်။")),
      photo("assets/routines/nako-manual-water-bottle.jpg",
        t("Offering water from the manual travel bottle held horizontally", "手動の携帯用給水ボトルを横向きにして水を飲ませる様子", "လက်ကိုင်ရေဘူးကို အလျားလိုက်ကိုင်ပြီး ရေတိုက်ပေးနေခြင်း"))
    ],
    {
      trackingMode: "input",
      trackingCadence: "daily",
      trackingSource: "appetite",
      checkInTitle: t(
        "Nako Daily Appetite Tracker",
        "ナコの毎日の食欲トラッカー",
        "Nako နေ့စဉ် အစာစားချင်စိတ် မှတ်တမ်း"
      )
    }),
  

  routine("nako-potty-pen", "daily", 40, "N", 
    t("Nako - Potty & Pen", "ナコ - トイレとケージ", "Nako - အပေါ့အလေးသွားရာနေရာနှင့် ခြံ"), 
    t("Pick up poop immediately, change soaked pee pads, clean the tray daily, and wash towels or wipe toys regularly.", "ウンチはすぐに拾い、濡れたおしっこシートを交換し、トレイを毎日掃除し、タオルを洗うか、おもちゃを定期的に拭きます。", "ချေးများကို ချက်ချင်းကောက်ပါ၊ စိုစွတ်သော ဆီးခံပြားများကို လဲလှယ်ပါ၊ လင်ပန်းကို နေ့စဉ်ဆေးကြောပါ၊ တဘက်များကို လျှော်ပါ သို့မဟုတ် ကစားစရာများကို ပုံမှန်သုတ်ပါ။"),
    t("Throughout day", "一日中随時", "တစ်နေ့တာလုံး"), 
    t("Only the pee tray may smell of pee or poop. Clean anything outside it immediately, including Nako's fur and legs when needed.", "おしっこ・うんちの臭いがあってよい場所はトレーだけです。必要に応じてナコの毛や足も含め、トレーの外はすぐに掃除してください。", "ဆီး သို့မဟုတ် ချေးအနံ့ရှိနိုင်သောနေရာသည် pee tray တစ်ခုတည်းသာဖြစ်ရမည်။ လိုအပ်ပါက Nako ၏အမွေးနှင့်ခြေထောက်များအပါအဝင် tray အပြင်ဘက်ကို ချက်ချင်းသန့်ရှင်းပါ။"),
    [
      photo("assets/routines/nako-potty-pen-tray.jpg",
        t("Nako potty tray with pee pad and poop to clear", "片付けるウンチとおしっこシートがあるナコのトイレトレイ", "ရှင်းလင်းရန် ချေးနှင့် ဆီးခံပြားရှိသော Nako အပေါ့အလေးသွားရာလင်ပန်း"),
        t("Pick up poop immediately, replace soaked pee pads, and clean the tray so Nako's pen stays hygienic.", "ウンチはすぐに拾い、濡れたおしっこシートを交換し、ナコのケージ内を衛生的に保つためトレイを掃除します。", "ချေးများကို ချက်ချင်းကောက်ပါ၊ စိုစွတ်သော ဆီးခံပြားများကို လဲပါ၊ Nako ၏ ခြံကို သန့်ရှင်းစေရန် လင်ပန်းကို ဆေးကြောပါ။")),
    ]),
  routine("nako-exercise-grooming", "daily", 50, "N", 
    t("Nako - Clean, Dry & Groomed", "ナコ - 清潔・乾燥・グルーミング", "နာကို - သန့်ရှင်း၊ ခြောက်သွေ့၊ grooming"), 
    t("After outings, wipe and fully dry Nako. Brush her coat and clean her eyes before she rests on furniture.", "外出後はNakoを拭いて完全に乾かします。家具で休む前に毛をとかし、目元を拭きます。", "အပြင်ကပြန်ရင် Nako ကို သုတ်ပြီး ခြောက်အောင်လုပ်ပါ။ အမွေးဖြီးပါ။ ပရိဘောဂပေါ်မနားခင် မျက်လုံးသုတ်ပါ။"),
    t("Daily + after outings / beach", "毎日＋外出・ビーチの後", "နေ့စဉ် + အပြင်ထွက်ပြီးနောက် / ကမ်းခြေပြီးနောက်"), 
    [
      t("Do not leave her damp after wiping; blow dry gently if needed.", "体を拭いた後、湿ったまま放置しないでください。必要に応じてドライヤーで優しく乾かします。", "သုတ်ပြီးနောက် စိုစွတ်မထားပါနှင့်၊ လိုအပ်ပါက လေမှုတ်စက်ဖြင့် ညင်သာစွာ ခြောက်သွေ့အောင် မှုတ်ပေးပါ။"),
      t("After walks, make sure to wipe her down thoroughly with pet wet wipes. Brush her coat, and optionally reward her with a nice treat for being overall obedient.", "散歩の後は、ペット用ウェットティッシュで体を丁寧に拭いてあげてください。毛並みをブラッシングし、全体的にお利口にしていたらご褒美としておやつをあげてもよいでしょう。", "လမ်းလျှောက်ပြီးနောက် သူမကို pet wet wipes (ခွေးသုံးစိုစွတ်သောတစ်ရှူး) ဖြင့် သေချာသုတ်ပေးပါ။ အမွေးများကို ဖြီးပေးပါ၊ သူမ လိမ္မာစွာနေထိုင်မှုအတွက် ဆုအဖြစ် မုန့်ကောင်းကောင်းတစ်ခု ပေးနိုင်ပါသည်။"),
      t("Before every walk, turn off the fan in Nako's area. After she is cleaned and has had water, turn the fan back on so she can cool down.", "散歩に出る前に、ナコの場所の扇風機を消してください。帰宅後、体を拭いて水を飲ませたら、涼めるように扇風機を再びつけてください。", "လမ်းလျှောက်မထွက်မီ Nako နေရာရှိ fan ကို ပိတ်ပါ။ ပြန်လာပြီး သန့်ရှင်းပေးကာ ရေသောက်ပြီးနောက် အေးစေရန် fan ကို ပြန်ဖွင့်ပါ။")
    ],
    [
      photo("assets/routines/nako-wet-wipes.jpg",
        t("Pet wet wipes for post-walk cleaning", "散歩後の体拭き用ペットウェットティッシュ", "လမ်းလျှောက်ပြီးနောက် သန့်ရှင်းရန် ခွေးသုံးစိုစွတ်သောတစ်ရှူး"),
        t("Wipe Nako thoroughly with these pet wet wipes after walks.", "散歩後、このペット用ウェットティッシュでナコの体を丁寧に拭いてください。", "လမ်းလျှောက်ပြီးနောက် ဤစိုစွတ်သောတစ်ရှူးများဖြင့် နာကိုကို သေချာစွာ သုတ်ပေးပါ။")),
      photo("assets/routines/nako-grooming-brush.jpg",
        t("Slicker brush for Nako's coat", "ナコのブラッシング用スリッカーブラシ", "နာကို၏အမွေးများအတွက် သုံးသော ဘရပ်ရှ်"),
        t("Brush her coat gently using this slicker brush.", "このスリッカーブラシを使用して、優しく毛をブラッシングします。", "ဤဘရပ်ရှ်ကို အသုံးပြု၍ သူမ၏အမွေးများကို ညင်သာစွာ ဖြီးပေးပါ။")),
      photo("assets/routines/nako-indoor-walk.jpg",
        t("Walking Nako indoors", "室内でナコを散歩させる様子", "မိုးလုံလေလုံနေရာတွင် နာကိုကို လမ်းလျှောက်ခေါ်ခြင်း"),
        t("Keep walks regular. Reward Nako with a treat after walks for being overall obedient.", "定期的にお散歩をさせてください。お散歩の後は、お利口にしていたご褒美としておやつをあげます。", "ပုံမှန်လမ်းလျှောက်ပေးပါ။ လမ်းလျှောက်ပြီးနောက် သူမ၏ လိမ္မာမှုအတွက် မုန့်ကျွေး၍ ဆုချပါ။"))
    ]),

  routine("nako-training-fun", "daily", 60, "N", 
    t("Nako - Dog Training & Fun", "ナコ - ドッグトレーニングと遊び", "Nako - လေ့ကျင့်ပေးခြင်းနှင့် ကစားခြင်း"), 
    t("Refresh Nako's commands and do short positive training sessions with treats. Let her out under supervision if she needs to drain energy.", "ナコのコマンドを復習し、おやつを使って短いポジティブなトレーニングを行います。体力を発散させる必要がある場合は、目の届く範囲でケージの外に出します。", "Nako ၏ အမိန့်များကို ပြန်လည်လေ့ကျင့်ပေးပြီး မုန့်များဖြင့် တိုတောင်းသော အပြုသဘောဆောင်သည့် လေ့ကျင့်ခန်းများ ပြုလုပ်ပါ။ အားအင်ကုန်ခမ်းရန် လိုအပ်ပါက စောင့်ကြည့်မှုအောက်တွင် အပြင်သို့ လွှတ်ပေးပါ။"), 
    t("Daily + as needed", "毎日＋必要に応じて", "နေ့စဉ် + လိုအပ်သလို"), 
    [
      t("When out of the pen, use house leash / house line and 100% active supervision.", "ケージの外に出すときは、ハウスリードを使用し、100%注意を怠らないでください。", "ခြံပြင်ပသို့ ရောက်ရှိနေစဉ်၊ အိမ်သုံးကြိုးကို အသုံးပြုပြီး ၁၀၀% အပြည့်အဝ စောင့်ကြည့်ပါ။"),
      t("When Nako starts jumping in her cage or raising her toys, try to play with her a bit because it is fun for her.", "ナコがケージの中で飛び跳ねたり、おもちゃを持ち上げたりし始めたら、本人は楽しんでいるので少し遊んであげてください。", "နာကိုသည် ခြံထဲတွင် ခုန်ပေါက်နေစဉ် သို့မဟုတ် ကစားစရာများကို မြှောက်ပြစဉ် သူမနှင့် အနည်းငယ် ကစားပေးပါ (၎င်းသည် သူမအတွက် ပျော်စရာဖြစ်သောကြောင့်ဖြစ်သည်)။"),
      t("Use treats for training and positive reinforcement. Keep training sessions short and fun.", "トレーニングやポジティブな行動の強化には、おやつを使用してください。トレーニング時間は短く、楽しいものに保ちます。", "လေ့ကျင့်ပေးရန်နှင့် အပြုသဘောဆောင်သောအပြုအမူများအတွက် မုန့်များကို အသုံးပြုပါ။ လေ့ကျင့်ချိန်ကို တိုတောင်းပြီး ပျော်စရာကောင်းအောင် ထားပါ။"),
      t("If Nako bites something and will not drop it, calmly exchange it for a treat, then guide her away.", "ナコが物をくわえて離さない場合は、落ち着いておやつと交換し、その場所から離れるよう誘導してください。", "Nako က ပစ္စည်းတစ်ခုကို ကိုက်ထားပြီး မလွှတ်လျှင် အေးဆေးစွာ မုန့်နှင့် လဲယူပြီး အဝေးသို့ လမ်းညွှန်ပါ။"),
      t("If she gets very angsty (e.g. jumping on the playpen), carry her and sit together with her on the sofa for a while. You can do your own stuff on your phone and sayang/cuddle her; she will be very happy.", "ナコがサークルを飛び跳ねるなどして興奮している（イライラしている）時は、抱っこしてしばらくソファで一緒に座ってあげてください。スマホをいじりながら彼女をかわいがって（サヤンして）あげると、とても喜びます。", "သူမ အရမ်းဆိုးနွဲ့ပြီး ခြံတံခါးကို ခုန်လှုပ်နေပါက (ဥပမာ ခြံပေါ်သို့ ခုန်တက်ခြင်း)၊ သူမကို ချီပြီး ဆိုဖာပေါ်တွင် အတူတူ ခဏထိုင်ပေးပါ။ ဖုန်းသုံးရင်း သူမကို ပွတ်သပ် ချော့မြူပေးပါက သူမ အလွန်ပျော်ရွှင်ပါလိမ့်မည်။")
    ],
    [
      photo("assets/routines/nako-playing-toys.jpg",
        t("Nako sitting in her dog bed in the cage with a purple toy in her mouth", "口に紫のおもちゃをくわえてケージのドッグベッドに座るナコ", "ပါးစပ်တွင် ခရမ်းရောင်ကစားစရာကို ကိုက်ကာ ခြံထဲရှိ ခွေးအိပ်ရာပေါ်တွင် ထိုင်နေသော နာကို"),
        t("When Nako starts jumping in her cage or raising her toys, try to play with her a bit because it is fun for her.", "ナコがケージの中で飛び跳ねたり、おもちゃを持ち上げたりし始めたら、本人は楽しんでいるので少し遊んであげてください。", "နာကိုသည် ခြံထဲတွင် ခုန်ပေါက်နေစဉ် သို့မဟုတ် ကစားစရာများကို မြှောက်ပြစဉ် သူမနှင့် အနည်းငယ် ကစားပေးပါ (၎င်းသည် သူမအတွက် ပျော်စရာဖြစ်သောကြောင့်ဖြစ်သည်)။")),
      photo("assets/routines/nako-training-treats.jpg",
        t("Dog treats container for positive training", "ポジティブトレーニング用のドッグおやつ容器", "အပြုသဘောဆောင်သောလေ့ကျင့်မှုအတွက်သုံးသော ခွေးမုန့်ဘူး"),
        t("Use these treats to reward Nako during training sessions.", "トレーニングの際、このおやつを使ってナコにご褒美をあげてください。", "လေ့ကျင့်ခန်းလုပ်နေစဉ် နာကိုကို ဆုချရန် ဤမုန့်များကို အသုံးပြုပါ။")),
      photo("assets/routines/nako-bribe-houseline.mov",
        t("Bribing Nako with a treat to remove her houseline", "ハウスリードを外すためにおやつでナコを誘う様子", "အိမ်သုံးကြိုးဖြုတ်ရန် နာကိုကို မုန့်ဖြင့် ဆွဲဆောင်ခြင်း"),
        t("An example video showing how to bribe Nako with a treat so you can safely take off her houseline.", "ハウスリードを安全に外すために、おやつでナコを誘い出す手順の実演動画。", "အိမ်သုံးကြိုးကို ဘေးကင်းစွာ ဖြုတ်နိုင်ရန် နာကိုကို မုန့်ဖြင့် ဆွဲဆောင်နည်းကို ပြသထားသည့် နမူနာဗီဒီယို။")),
      photo("assets/routines/nako-obedience-training.mov",
        t("Example obedience training session", "服従訓練（オベディエンストレーニング）の実演", "နာခံမှုရှိစေရန် လေ့ကျင့်ပေးသည့် နမူနာဗီဒီယို"),
        t("An example video showing Nako doing basic obedience training.", "ナコが基本的な服従訓練（コマンド練習）を行っている実演動画。", "နာကို အခြေခံနာခံမှုလေ့ကျင့်ခန်းများ ပြုလုပ်နေသည်ကို ပြသထားသည့် နမူနာဗီဒီယို။")),
      photo("assets/routines/nako-sofa-cuddle.jpg",
        t("Cuddling on the sofa with Edwin", "エドウィンとソファで寄り添うナコ", "Edwin နှင့်အတူ ဆိုဖာပေါ်တွင် ဓာတ်ပုံရိုက်ခြင်း"),
        t("Carry Nako to the sofa and cuddle with her to calm her down when she gets angsty.", "ナコが興奮している時は、ソファに連れて行って抱っこし、落ち着かせてあげてください。", "သူမ ဆိုးနွဲ့နေချိန်တွင် ငြိမ်သက်သွားစေရန် ဆိုဖာပေါ်သို့ ချီသွားပြီး ချော့မြူပေးပါ။"))
    ]),


  routine("nako-supervision", "daily", 70, "!", 
    t("Nako - Supervision", "ナコ - 監視", "Nako - စောင့်ကြည့်ခြင်း"), 
    t("Whenever Nako is out of the pen, she must wear her collar and house leash / house line and be monitored actively.", "ナコがケージの外に出ているときは、常に首輪とハウスリードを着用させ、積極的に監視する必要があります。", "Nako သည် ခြံပြင်ပတွင် ရှိနေသည့်အချိန်တိုင်း လည်ပတ်နှင့် အိမ်သုံးကြိုးကို ဝတ်ဆင်ထားရမည်ဖြစ်ပြီး တက်ကြွစွာ စောင့်ကြည့်ရမည်။"), 
    t("Whenever out of pen / roaming", "ケージの外に出ているとき / 自由に歩き回っているとき", "ခြံပြင်ပသို့ ရောက်နေစဉ် / လွတ်လပ်စွာသွားလာနေစဉ်"), 
    t("Do not leave her roaming unsupervised.", "監視なしで自由に歩き回らせないでください。", "စောင့်ကြည့်မှုမရှိဘဲ လွှတ်မထားပါနှင့်။"),
    [
      photo("assets/routines/nako-supervision-collar-house-line.jpg",
        t("Pink house line and white collar held in one hand", "手に持ったピンクのハウスリードと白い首輪", "လက်ထဲတွင်ကိုင်ထားသော ပန်းရောင်အိမ်သုံးကြိုးနှင့် အဖြူရောင်လည်ပတ်"),
        t("Put this collar and house line on Nako whenever she is outside the pen.", "ナコをケージの外に出すときは、毎回この首輪とハウスリードを着用させます。", "Nako ကို ခြံပြင်ထုတ်သည့်အချိန်တိုင်း ဤလည်ပတ်နှင့် အိမ်သုံးကြိုးကို ဝတ်ပေးပါ။"))
    ]),
  routine("nako-walk-car-bags", "daily", 75, "B",
    t("Nako - Walk & Car Bags", "ナコ - 散歩用・車用バッグ", "နာကို - လမ်းလျှောက်နှင့် ကားစီးအိတ်"),
    t("Pack Nako's correct bag before every walk or car ride, with water, poop bags, and a small treat box if needed.", "散歩や車移動の前に、ナコ用の正しいバッグへ水、うんち袋、必要なら小さいおやつ箱を入れます。", "လမ်းလျှောက်ခြင်း သို့မဟုတ် ကားစီးခြင်းမပြုမီ Nako အတွက် မှန်ကန်သောအိတ်ထဲသို့ ရေ၊ ခွေးချေးအိတ်နှင့် လိုအပ်ပါက treat အဘူးအသေး ၁ ဘူး ထည့်ပါ။"),
    t("Every walk / every car ride", "散歩・車移動のたび", "လမ်းလျှောက်တိုင်း / ကားစီးတိုင်း"),
    [
      t("Walks: use the blue-striped Trader Joe's bag. Car rides: use the large white bag, and keep Nako inside it while she is in the car.", "散歩ではTrader Joe'sの青いシマシマのバッグを使います。車では白い大きなバッグを使い、車内ではナコをその中に入れてください。", "လမ်းလျှောက်သည့်အခါ Trader Joe's အပြာရောင်အစင်းပါသောအိတ်ကို သုံးပါ။ ကားစီးသည့်အခါ အဖြူရောင်အိတ်အကြီးကို သုံးပြီး Nako ကို ကားထဲတွင် ထိုအိတ်အတွင်း၌ထားပါ။"),
      t("Before leaving, check the contents. In the car, secure the large white bag so it cannot move and never block its ventilation.", "出発前に中身を確認します。車内では白い大きなバッグが動かないよう安全に置き、通気を絶対にふさがないでください。", "မထွက်ခင် အိတ်ထဲရှိပစ္စည်းများကို စစ်ပါ။ ကားထဲတွင် အဖြူရောင်အိတ်အကြီး မရွေ့နိုင်အောင် လုံခြုံစွာထားပြီး လေဝင်လေထွက်ကို မပိတ်ပါနှင့်။")
    ],
    [
      photo("assets/routines/nako-bags-trader-joes.jpg",
        t("Trader Joe's canvas tote bag and outing accessories", "Trader Joe'sのキャンバストートバッグと外出用アクセサリー", "Trader Joe's ကတ္တီပါ လမ်းလျှောက်အိတ်နှင့် အပြင်ထွက်ပစ္စည်းများ"),
        t("Daily outing bag containing Nako's water bottle, pee pads, and food container.", "ナコの給水ボトル、ペットシーツ、フード容器を入れる日常の外出用バッグ。", "Nako ၏ ရေဘူး၊ ဆီးခံပြားနှင့် အစာဘူးတို့ ထည့်ထားသည့် နေ့စဉ် အပြင်ထွက်အိတ်။")),
      photo("assets/routines/nako-carrier-onecute.jpg",
        t("ONECUTE mesh carrier bag", "ONECUTE メッシュキャリーバッグ", "ONECUTE ဇကာပါ သယ်ဆောင်သည့်အိတ်"),
        t("Mesh transport carrier bag for Nako.", "ナコ用のメッシュ製キャリーバッグ。", "Nako အတွက် ဇကာပါသော သယ်ဆောင်သည့်အိတ်။"))
    ]),
  routine("general-window-safety", "as-needed", 13, "W",
    t("General Window Safety", "窓の安全", "ပြတင်းပေါက် ဘေးကင်းရေး"),
    t("Keep Nako and every household helper safe around windows and window grilles.", "窓や窓グリルの周りでは、ナコとヘルパー全員の安全を守ってください。", "ပြတင်းပေါက်နှင့် window grille အနီးတွင် Nako နှင့် အိမ်အကူအားလုံး ဘေးကင်းအောင်ထားပါ။"),
    t("Whenever near windows", "窓の近くにいる時", "ပြတင်းပေါက်အနီး ရှိသည့်အခါ"),
    [
      t("Do not climb, lean out, jump, play, or put weight near a window.", "窓の近くで登る、身を乗り出す、跳ぶ、遊ぶ、体重をかける行為は禁止です。", "ပြတင်းပေါက်အနီးတွင် မတက်၊ ကိုယ်မယောင်း၊ မခုန်၊ မကစား၊ ကိုယ်အလေးချိန် မတင်ပါနှင့်။"),
      t("Window grilles do not make the area completely safe. Take care when cleaning, closing, or walking near windows.", "窓グリルがあっても完全に安全ではありません。窓の掃除、開閉、近くを歩く時は注意してください。", "window grille ရှိသော်လည်း လုံးဝဘေးကင်းသည် မဟုတ်ပါ။ ပြတင်းပေါက် သန့်ရှင်းခြင်း၊ ပိတ်ခြင်း သို့မဟုတ် အနီးတွင် လမ်းလျှောက်ခြင်းအခါ သတိထားပါ။"),
      t("Always supervise Nako near windows.", "窓の近くでは常にナコを見守ってください。", "ပြတင်းပေါက်အနီးတွင် Nako ကို အမြဲစောင့်ကြည့်ပါ။")
    ],
    [
      photo("assets/routines/nako-general-window-safety.png",
        t("Closed window with grilles, a paw shield, and a warning symbol", "窓グリル付きの閉じた窓、肉球の盾、警告マーク", "ပိတ်ထားသော grille ပါသည့် ပြတင်းပေါက်၊ ခွေးခြေရာပါ shield နှင့် သတိပေးအမှတ်အသား"),
        t("Keep Nako and helpers away from window edges. Grilles do not make windows completely safe.", "ナコとヘルパーは窓の端から離れてください。窓グリルがあっても完全に安全ではありません。", "Nako နှင့် အိမ်အကူများကို ပြတင်းပေါက်အနားမှ ဝေးဝေးထားပါ။ grille ရှိသော်လည်း ပြတင်းပေါက်သည် လုံးဝဘေးကင်းသည် မဟုတ်ပါ။"))
    ]),
  routine("nako-kind-handling", "daily", 1000, "!", 
    t("Nako - Kind Handling Reminder", "ナコ - 優しい扱いの注意", "နာကို - နူးညံ့စွာကိုင်တွယ်ရန် သတိပြုချက်"),
    t("Always treat Nako gently, kindly, and humanely. Follow Singapore animal welfare law, including Animals and Birds Act 1965 section 42.", "ナコは常に優しく、人道的に扱う。Animals and Birds Act 1965第42条を含むシンガポールの動物福祉法に従う。", "နာကိုကို အမြဲ နူးညံ့၊ ကြင်နာစွာနှင့် လူသားဆန်စွာ ဆက်ဆံပါ။ Singapore animal welfare law၊ Animals and Birds Act 1965 section 42 အပါအဝင် လိုက်နာပါ။"),
    t("Always", "常に", "အမြဲ"),
    t("Tell Edwin immediately if there is any issue. Use calm handling only.", "問題があればすぐエドウィンに伝える。落ち着いて扱うこと。", "ပြဿနာရှိလျှင် Edwin ကို ချက်ချင်းပြောပါ။ အေးဆေးတည်ငြိမ်စွာသာ ကိုင်တွယ်ပါ။"),
    [
      photo("assets/routines/nako-kind-handling-reminder.jpg",
        t("Nako standing inside her pen looking up kindly", "サークルの中で優しそうな表情で見上げるナコ", "ခြံထဲတွင် ချစ်စဖွယ်မော့ကြည့်နေသော နာကို"),
        t("Nako Kind Handling Reminder", "ナコ - 優しい扱いの注意", "နာကို - နူးညံ့စွာကိုင်တွယ်ရန် သတိပြုချက်"))
    ]),

  routine("nako-emergency", "daily", 90, "!", 
    t("🚨 Nako Emergency", "ナコの緊急事態", "🚨 နာကို အရေးပေါ်အခြေအနေ"),
    t("If Nako vomits, has diarrhoea, or will not eat: keep her safe, take a photo, and tell Edwin immediately.", "Nakoが吐く、下痢をする、食べない場合は、安全を確保し、写真を撮り、すぐEdwinに連絡します。", "Nako အန်ရင်၊ ဝမ်းလျှောရင် သို့မဟုတ် မစားရင် လုံခြုံအောင်ထားပါ။ ဓာတ်ပုံရိုက်ပါ။ Edwin ကို ချက်ချင်းပြောပါ။"),
    t("Immediately", "すぐに", "ချက်ချင်း"),
    [
      t("Keep Nako safe and away from anything dangerous. Take a photo if useful.", "ナコの安全を確保し、危険な物から離してください。必要に応じて写真を撮ります。", "Nako ကို လုံခြုံအောင်ထားပြီး အန္တရာယ်ရှိတာတွေနဲ့ ဝေးဝေးထားပါ။ လိုအပ်ရင် ဓာတ်ပုံရိုက်ပါ။"),
      t("Notify Edwin before doing anything else.", "何かする前にエドウィンへ連絡する。", "အခြားဘာမှမလုပ်ခင် Edwin ကို အသိပေးပါ။")
    ],
    [
      photo("assets/sections/nako-emergency.png",
        t("First aid kit with dog paw print, heart, and warning bell", "犬の肉球プリント、ハート、警告ベルが付いた救急箱", "ခွေးခြေရာ၊ အသည်းပုံနှင့် သတိပေးခေါင်းလောင်းပါဝင်သော ရှေးဦးသူနာပြုသေတ္တာ"),
        t("Open this emergency guide if Nako vomits, has diarrhoea, refuses food, or behaves unsafely.", "ナコが吐く、下痢をする、食べない、または危険な行動をした場合は、この緊急ガイドを開いてください。", "Nako အန်ရင်၊ ဝမ်းလျှောရင်၊ အစာမစားရင် သို့မဟုတ် အန္တရာယ်ရှိတဲ့အပြုအမူလုပ်ရင် ဒီအရေးပေါ်လမ်းညွှန်ကို ဖွင့်ပါ။")),
      photo("assets/routines/nako-emergency-vomit.jpg",
        t("Nako's vomit on the tiled floor", "タイルの床の上のナコの嘔吐物", "ကြွေပြားကြမ်းပြင်ပေါ်ရှိ နာကို၏ အန်ဖတ်"),
        t("An example photo of Nako's vomit on the floor.", "床の上のナコの嘔吐物の写真例。", "ကြမ်းပြင်ပေါ်ရှိ နာကို၏ အန်ဖတ်ပုံစံ နမူနာဓာတ်ပုံ။"))
    ]),

  routine("mail-deliveries", "daily", 100, "P", 
    t("Mail & Deliveries", "郵便物と配達対応", "စာတိုက်နှင့် delivery များ"),
    t("Collect deliveries promptly. Always unpack them outside, discard the packaging, and wipe each item fully outside before bringing it in.", "配達物はすぐに回収します。必ず屋外で開封し、梱包材を捨て、商品全体を屋外でしっかり拭いてから家に入れます。", "delivery ပစ္စည်းများကို ချက်ချင်းယူပါ။ အမြဲ အိမ်အပြင်မှာ unpack လုပ်၊ packaging ကို လွှင့်ပြီး ပစ္စည်းတစ်ခုလုံးကို အပြင်မှာ သေချာသုတ်ပြီးမှ အိမ်ထဲသွင်းပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    [
      t("Do not bring dirty packaging into the house. Discard it outside and wipe the unpacked item before bringing it in.", "汚れた梱包材を家の中へ持ち込まないでください。屋外で捨て、開封した商品を拭いてから家に入れます。", "ညစ်ပတ်သော packaging ကို အိမ်ထဲမသွင်းပါနှင့်။ အပြင်မှာလွှင့်ပြီး unpack လုပ်ထားသောပစ္စည်းကို သုတ်ပြီးမှ အိမ်ထဲသွင်းပါ။"),
      t("Keep parcels safe and tell Edwin/Yukari if anything important arrives.", "荷物を安全に保管し、大切な物が届いたらエドウィン／ゆかりに知らせてください。", "parcel များကို လုံခြုံစွာထားပြီး အရေးကြီးသောပစ္စည်းရောက်လျှင် Edwin/Yukari ကို အသိပေးပါ။"),
      t("For a new appliance, follow its manual and run the first cycle normally. Discard the first water, drink, or food output where applicable. Ask Edwin if unsure.", "新しい家電は説明書に従い、最初の運転を通常どおり行ってください。該当する場合、最初の水、飲み物、または食べ物は捨てます。不明な場合はEdwinに確認してください。", "စက်အသစ်အတွက် manual ကိုလိုက်နာပြီး ပထမ cycle ကို ပုံမှန် run ပါ။ သက်ဆိုင်ပါက ပထမဆုံးရေ၊ သောက်စရာ သို့မဟုတ် အစားအစာကို လွှင့်ပစ်ပါ။ မသေချာပါက Edwin ကိုမေးပါ။")
    ],
    [
      photo("assets/routines/nako-delivery-unpack-when-instructed.jpg",
        t("Item unpacked outside with packaging left by the door", "玄関外で梱包を外し、包装材を外に置いた商品", "တံခါးအပြင်တွင် packaging ဖြုတ်ပြီး packaging ကို အပြင်တွင်ထားသော ပစ္စည်း"),
        t("Always unpack outside, discard the packaging there, wipe the item fully, and bring it in promptly.", "必ず屋外で開封し、そこで梱包材を捨て、商品全体を拭いてからすぐ家に入れます。", "အမြဲ အပြင်မှာ unpack လုပ်၊ packaging ကို အဲဒီမှာလွှင့်၊ ပစ္စည်းတစ်ခုလုံးကို သုတ်ပြီး ချက်ချင်း အိမ်ထဲသွင်းပါ။")),
      photo("assets/routines/nako-delivery-wipe-item.jpg",
        t("Delivered appliance being wiped before going inside", "家に入れる前に拭いている配達された家電", "အိမ်ထဲမသွင်းမီ သုတ်နေသော delivery စက်ပစ္စည်း"),
        t("After discarding the packaging outside, wipe every accessible surface of the item before bringing it inside.", "屋外で梱包材を捨てた後、商品の手が届く表面をすべて拭いてから家に入れます。", "အပြင်မှာ packaging ကို လွှင့်ပြီးနောက် ပစ္စည်း၏ လက်လှမ်းမီသောမျက်နှာပြင်အားလုံးကို သုတ်ပြီးမှ အိမ်ထဲသွင်းပါ။"))
    ]),
  routine("physical-mailbox-check", "daily", 105, "M",
    t("Physical Mailbox Check", "郵便受けの確認", "စာတိုက်ပုံး စစ်ဆေးခြင်း"),
    t("Go downstairs and physically open the household mailbox every day. Collect all letters, notices, and other mail, then bring them home.", "毎日、下の階へ行き、家の郵便受けを実際に開けて確認します。手紙、通知、その他の郵便物をすべて回収して家に持ち帰ります。", "နေ့တိုင်း အောက်ထပ်သို့ဆင်းပြီး အိမ်၏ physical mailbox ကို ကိုယ်တိုင်ဖွင့်စစ်ပါ။ စာများ၊ notice များနှင့် အခြား mail များအားလုံးကို ယူပြီး အိမ်သို့ ပြန်ယူလာပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    t("Do not only look from outside. Open the mailbox properly and tell Edwin or Yukari if any important or official letter arrives.", "外から見るだけではなく、必ず郵便受けを開けて中を確認します。重要な手紙や公的な郵便物が届いたら、エドウィンまたはゆかりに知らせてください。", "အပြင်မှကြည့်ရုံမလုပ်ပါနှင့်။ mailbox ကို သေချာဖွင့်ပြီး အတွင်းကို စစ်ပါ။ အရေးကြီးသော သို့မဟုတ် official letter ရောက်ပါက Edwin သို့မဟုတ် Yukari ကို ပြောပါ။"),
    [
      photo("assets/routines/physical-mailbox-location.jpg",
        t("Ground-floor mailbox area beside the Block 1 lift", "ブロック1のエレベーター横にある1階の郵便受けエリア", "Block 1 ဓာတ်လှေကားဘေးရှိ မြေညီထပ် စာတိုက်ပုံးနေရာ"),
        t("Go downstairs to this mailbox area beside the Block 1 lift.", "1階へ下り、ブロック1のエレベーター横にあるこの郵便受けエリアへ行きます。", "အောက်ထပ်ဆင်းပြီး Block 1 ဓာတ်လှေကားဘေးရှိ ဤစာတိုက်ပုံးနေရာသို့ သွားပါ။")),
      photo("assets/routines/physical-mailbox-10-133.jpg",
        t("Household mailbox numbered 10-133", "10-133番の家の郵便受け", "10-133 နံပါတ် အိမ်စာတိုက်ပုံး"),
        t("Open mailbox 10-133 and collect everything inside.", "10-133番の郵便受けを開け、中にある郵便物をすべて回収します。", "10-133 စာတိုက်ပုံးကို ဖွင့်ပြီး အထဲရှိ စာအားလုံးကို ယူပါ။"))
    ]),

  routine("general-tidiness", "daily", 110, "T", 
    t("General Tidiness", "一般的な整理整頓", "ယေဘုယျ သန့်ရှင်းသပ်ရပ်မှု"), 
    t("Wipe down items left outside and keep them properly back in place so things are not left lying around.", "出しっぱなしになっている物を拭き取り、適切に元の場所に戻して、散らかったままにしないようにします。", "အပြင်တွင် ကျန်ခဲ့သော ပစ္စည်းများကို သုတ်ပြီး ပစ္စည်းများ ရှုပ်ပွမနေစေရန် သင့်တော်သောနေရာတွင် ပြန်သိမ်းပါ။"), 
    t("Daily + as needed", "毎日＋必要に応じて", "နေ့စဉ် + လိုအပ်သလို"), 
    t("Do not leave items lying around. Edwin is sensitive to dust and dirt, so clean visible dust promptly instead of waiting for the next scheduled task.", "物を出しっぱなしにしないでください。エドウィンはほこりや汚れに敏感なので、次の予定日まで待たず、見つけたほこりはすぐに掃除してください。", "ပစ္စည်းများကို ဟိုဟိုဒီဒီ ပြန့်ကြဲမထားပါနှင့်။ Edwin သည် ဖုန်နှင့် အညစ်အကြေးကို အာရုံခံလွယ်သောကြောင့် နောက်သန့်ရှင်းရေးအချိန်ကို မစောင့်ဘဲ မြင်ရသောဖုန်ကို ချက်ချင်းသန့်ရှင်းပါ။"),
    [
      photo("assets/routines/nako-general-tidiness.png",
        t("Neatly arranged household shelf with a cleaning cloth", "掃除布と、きちんと整理された日用品の棚", "သန့်ရှင်းရေးအဝတ်နှင့် အိမ်သုံးပစ္စည်းများ သပ်သပ်ရပ်ရပ်ထားသည့် စင်"),
        t("Wipe dusty items and return them to their proper place.", "ほこりのついた物を拭き、決まった場所に戻します。", "ဖုန်ရှိသောပစ္စည်းများကို သုတ်ပြီး သင့်တော်သောနေရာသို့ ပြန်သိမ်းပါ။"))
    ]),
  routine("sofa-hair-room-corner-cleaning", "daily", 115, "S",
    t("Sofa Hair & Room-Corner Spot Cleaning", "ソファの毛と部屋の隅の部分掃除", "ဆိုဖာအမွေးနှင့် အခန်းထောင့် နေရာကွက် သန့်ရှင်းရေး"),
    t("During free time, remove hair or fur from the sofa and wipe dusty room corners.", "時間がある時に、ソファの髪や毛を取り、ほこりのたまった部屋の隅を拭いてください。", "အားလပ်ချိန်တွင် ဆိုဖာပေါ်ရှိ ဆံပင် သို့မဟုတ် အမွေးကိုဖယ်ပြီး ဖုန်ရှိသော အခန်းထောင့်များကို သုတ်ပါ။"),
    t("During free time / as needed", "時間がある時／必要に応じて", "အားလပ်ချိန်တွင် / လိုအပ်သလို"),
    [
      t("Put removed hair or fur straight into the bin.", "取った髪や毛はすぐゴミ箱に捨ててください。", "ဖယ်ထားသော ဆံပင် သို့မဟုတ် အမွေးကို အမှိုက်ပုံးထဲ ချက်ချင်းပစ်ပါ။"),
      t("Wipe dust or dirt from room corners with a tissue or wet wipe.", "部屋の隅のほこりや汚れは、ティッシュまたはウェットティッシュで拭いてください。", "အခန်းထောင့်ရှိ ဖုန် သို့မဟုတ် အညစ်အကြေးကို tissue သို့မဟုတ် wet tissue ဖြင့် သုတ်ပါ။")
    ],
    [
      photo("assets/routines/nako-sofa-hair-room-corner-cleaning.png",
        t("Beige sofa with a lint roller and a cloth wiping a room corner", "粘着クリーナーと部屋の隅を拭く布が描かれたベージュのソファ", "ဆိုဖာအမွေးဖယ်သည့် roller နှင့် အခန်းထောင့်သုတ်သည့်အဝတ်ပါသော အဝါနုရောင်ဆိုဖာ"),
        t("Remove hair or fur from the sofa and wipe dust from room corners.", "ソファの髪や毛を取り、部屋の隅のほこりを拭きます。", "ဆိုဖာပေါ်က ဆံပင် သို့မဟုတ် အမွေးကိုဖယ်ပြီး အခန်းထောင့်ရှိ ဖုန်ကို သုတ်ပါ။"))
    ]),
  routine("vimle-sofa-bed", "as-needed", 117, "B",
    t("IKEA VIMLE Sofa-Bed", "IKEA VIMLE ソファベッド", "IKEA VIMLE ဆိုဖာအိပ်ရာ"),
    t("Open or close the Gunnared beige IKEA VIMLE 2-seat sofa-bed safely. Pull UP first, then pull OUT.", "グンナレッド ベージュのIKEA VIMLE 2人掛けソファベッドを安全に開閉します。最初に上へ引き、その後手前へ引きます。", "Gunnared beige IKEA VIMLE ၂ ယောက်ထိုင် ဆိုဖာအိပ်ရာကို လုံခြုံစွာ ဖွင့်ပိတ်ပါ။ အရင် အပေါ်ဆွဲပြီးမှ အပြင်ဆွဲပါ။"),
    t("As needed", "必要な時", "လိုအပ်သည့်အခါ"),
    [
      t("Important: pull the orange loop UP first, then pull OUT. Do not pull it horizontally while the frame is flat.", "重要：オレンジ色のループは最初に上へ引き、その後手前へ引いてください。フレームが平らな状態で水平方向に引かないでください。", "အရေးကြီးသည် - လိမ္မော်ရောင်ကြိုးကို အရင် အပေါ်ဆွဲပြီးမှ အပြင်ဆွဲပါ။ frame ပြားနေစဉ် ဘေးတန်းမဆွဲပါနှင့်။"),
      t("Keep fingers away from the side hinges and folding joints.", "指を側面のヒンジや折りたたみ部分に近づけないでください。", "လက်ချောင်းများကို ဘေး hinge နဲ့ ခေါက်ဆက်နေရာများမှ ဝေးဝေးထားပါ။"),
      t("For the first attempt, 2 people (one on each side) can control the heavy frame more safely.", "初回は左右に1人ずつ、2人で行うと重いフレームをより安全に扱えます。", "ပထမဆုံးဖွင့်ပိတ်ချိန်တွင် ဘေးတစ်ဖက်စီမှာ လူ ၁ ယောက်စီ၊ စုစုပေါင်း ၂ ယောက်လုပ်ပါက လေးသော frame ကို ပိုလုံခြုံစွာ ထိန်းနိုင်သည်။")
    ],
    [
      photo("assets/routines/vimle-sofa-bed-closed.jpg",
        t("IKEA VIMLE sofa-bed in sofa position", "ソファ状態のIKEA VIMLEソファベッド", "ဆိုဖာပုံစံရှိ IKEA VIMLE ဆိုဖာအိပ်ရာ"),
        t("Clear the front area, remove everything, then put both back cushions and both seat cushions aside.", "前のスペースを空け、すべての物を取り、背もたれクッション2個と座面クッション2個を横に置きます。", "ရှေ့နေရာကို ရှင်းပြီး ပစ္စည်းအားလုံးဖယ်ပါ။ နောက်မှီ cushion ၂ ခုနဲ့ ထိုင်ခုံ cushion ၂ ခုကို ဘေးတွင်ထားပါ။")),
      photo("assets/routines/vimle-sofa-bed-orange-loop.jpg",
        t("Orange loop on the folded sofa-bed frame", "折りたたまれたソファベッドフレームのオレンジ色ループ", "ခေါက်ထားသော ဆိုဖာအိပ်ရာ frame ပေါ်ရှိ လိမ္မော်ရောင်ကြိုး"),
        t("Stand in the centre. Pull the orange loop straight UP first; when the frame rises, pull it OUT toward yourself.", "中央に立ちます。オレンジ色のループを最初に真上へ引き、フレームが上がったら手前へ引き出します。", "အလယ်တွင်ရပ်ပါ။ လိမ္မော်ရောင်ကြိုးကို အရင် တည့်တည့်အပေါ်ဆွဲပါ။ frame မြင့်လာမှ ကိုယ့်ဘက်သို့ အပြင်ဆွဲပါ။")),
      photo("assets/routines/vimle-sofa-bed-open.jpg",
        t("IKEA VIMLE sofa-bed fully opened with a bedsheet", "ベッドシーツを敷いて完全に開いたIKEA VIMLEソファベッド", "အိပ်ရာခင်းခင်းပြီး အပြည့်ဖွင့်ထားသော IKEA VIMLE ဆိုဖာအိပ်ရာ"),
        t("Check the legs are steady, vacuum once, fit the bedsheet, and place the 2 back cushions at the head.", "脚が安定していることを確認し、1回掃除機をかけ、シーツを敷き、背もたれクッション2個を頭側に置きます。", "ခြေထောက်များ ငြိမ်ကြောင်းစစ်၊ တစ်ကြိမ်ဖုန်စုပ်၊ အိပ်ရာခင်းခင်းပြီး နောက်မှီ cushion ၂ ခုကို ခေါင်းရင်းတွင်ထားပါ။"))
    ]),
  routine("floor-cleaning", "daily", 120, "F", 
    t("Floor Cleaning", "床掃除", "ကြမ်းပြင်သန့်ရှင်းရေး"),
    t("Sweep and mop daily. Include normal reachable areas under the sofa/cabinets as part of floor cleaning.", "毎日掃き掃除とモップがけをする。ソファやキャビネット下など、通常手が届く範囲も床掃除に含める。", "နေ့စဉ် တံမြက်စည်းလှည်းပြီး mop လုပ်ပါ။ sofa/cabinet အောက်မှ ပုံမှန်လက်လှမ်းမီသည့်နေရာများကိုလည်း ကြမ်းပြင်သန့်ရှင်းရေးတွင် ထည့်ပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    [
      t("Use only stone-safe, pH-neutral cleaners to protect the onyx green marble.", "オニキスグリーン大理石を守るため、石材対応でpH中性の洗剤だけを使う。", "onyx green marble ကို ကာကွယ်ရန် stone-safe၊ pH-neutral cleaner များကိုသာ အသုံးပြုပါ။"),
      t("Use the sweep broom, dustpan, and the flat mop with bucket system to sweep and mop the floors daily.", "毎日床を掃き、モップをかけるために、ほうき、ちりとり、およびバケツ付きフラットモップシステムを使用してください。", "ကြမ်းပြင်များကို နေ့စဉ်တံမြက်စည်းလှည်းပြီး mop တိုက်ရန်အတွက် တံမြက်စည်း၊ ဂေါ်ပြားနှင့် bucket ပါသော flat mop system ကို အသုံးပြုပါ။")
    ],
    [
      photo("assets/routines/nako-floor-cleaning-tools.jpg",
        t("Broom, dustpan, and mop bucket system", "ほうき、ちりとり、およびモップバケツシステム", "တံမြက်စည်း၊ ဂေါ်ပြားနှင့် mop bucket system"),
        t("Floor cleaning tools including broom, dustpan, and clean water flat mop bucket system.", "ほうき、ちりとり、および清水フラットモップバケツシステムを含む床掃除用具。", "တံမြက်စည်း၊ ဂေါ်ပြားနှင့် ရေသန့် flat mop bucket system အပါအဝင် ကြမ်းပြင်သန့်ရှင်းရေးသုံးပစ္စည်းများ။"))
    ]),

  routine("rubbish", "daily", 130, "R", 
    t("Rubbish", "ゴミ出し", "အမှိုက်ပစ်ခြင်း"),
    t("Clear general rubbish and the dog-waste bin whenever there is food waste, smell, or the bin is getting full.", "食べ物のゴミ、臭い、またはゴミ箱がいっぱいになりそうな時に、一般ゴミと犬用ゴミ箱を捨てます。", "အစားအစာအမှိုက်ရှိလျှင်၊ အနံ့ထွက်လျှင် သို့မဟုတ် အမှိုက်ပုံးပြည့်လာလျှင် အထွေထွေအမှိုက်နှင့် ခွေးအမှိုက်ပုံးကို သွန်ပါ။"),
    t("Throughout the day / as needed", "日中随時／必要に応じて", "တစ်နေ့လုံး / လိုအပ်သလို"),
    [
      t("Dog waste bin should not be left to smell.", "犬用ゴミ箱は臭いが出るまで放置しない。", "ခွေးအမှိုက်ပုံးကို အနံ့ထွက်သည်အထိ မထားပါနှင့်။"),
      t("Check and clear rubbish regularly throughout the day, especially after throwing away food or when a bin is getting full.", "日中こまめにゴミを確認し、特に食べ物を捨てた後やゴミ箱がいっぱいになりそうな時はゴミを出してください。", "တစ်နေ့တာအတွင်း အမှိုက်ကို ပုံမှန်စစ်ပြီး အထူးသဖြင့် အစားအစာပစ်ပြီးနောက် သို့မဟုတ် အမှိုက်ပုံးပြည့်လာသည့်အခါ သွားပစ်ပါ။"),
      t("Put normal bagged household rubbish down the rubbish chute.", "通常の袋に入った家庭ゴミは、ゴミ投入口から捨てます。", "အိတ်ဖြင့်ထည့်ထားသော ပုံမှန်အိမ်သုံးအမှိုက်ကို rubbish chute ထဲ ပစ်ပါ။"),
      t("Do not force large or bulky rubbish, including large delivery packaging, into the chute. Carry it downstairs to the disposal area shown in the photo.", "大きすぎるゴミや大型の配送梱包材をゴミ投入口へ無理に押し込まないでください。写真にある階下のゴミ置き場まで運びます。", "အရွယ်ကြီးသောအမှိုက် သို့မဟုတ် delivery packaging ကြီးများကို chute ထဲ အတင်းမထည့်ပါနှင့်။ ပုံတွင်ပြထားသော အောက်ထပ်အမှိုက်ထားရာနေရာသို့ ယူသွားပါ။")
    ],
    [
      photo("assets/routines/nako-rubbish-bin-daily.jpg",
        t("Rubbish bin with orange plastic bag liner", "オレンジ色のゴミ袋が入ったゴミ箱", "လိမ္မော်ရောင်အမှိုက်အိတ်စွပ်ထားသော အမှိုက်ပုံး"),
        t("Clear general rubbish whenever there is food waste, smell, or the bin is getting full.", "食べ物のゴミ、臭い、またはゴミ箱がいっぱいになりそうな時に一般ゴミを捨てます。", "အစားအစာအမှိုက်ရှိလျှင်၊ အနံ့ထွက်လျှင် သို့မဟုတ် အမှိုက်ပုံးပြည့်လာလျှင် အထွေထွေအမှိုက်ကို သွားပစ်ပါ။")),
      photo("assets/routines/nako-rubbish-downstairs-large-items.jpg",
        t("Route to the downstairs disposal area for oversized rubbish", "大きなゴミを運ぶ階下のゴミ置き場への経路", "အရွယ်ကြီးသောအမှိုက်အတွက် အောက်ထပ်အမှိုက်ထားရာသို့ သွားသည့်လမ်း"),
        t("If rubbish or packaging is too large for the chute, carry it downstairs to this disposal area instead.", "ゴミや梱包材が投入口に入らない大きさの場合は、代わりに階下のこのゴミ置き場まで運びます。", "အမှိုက် သို့မဟုတ် packaging သည် chute အတွက် အရမ်းကြီးပါက အောက်ထပ်ရှိ ဤအမှိုက်ထားရာနေရာသို့ ယူသွားပါ။"))
    ]),

  routine("laundry", "daily", 140, "L", 
    t("Laundry", "洗濯", "အဝတ်လျှော်ခြင်း"),
    t("Wash, dry, fold, and iron clothes as needed.", "服を洗い、乾かして、たたみ、必要に応じてアイロンをかける。", "အဝတ်များကို လျှော်၊ အခြောက်ခံ၊ ခေါက်ပြီး လိုအပ်ပါက ironing လုပ်ပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    [
      t("Separate items if needed. Do not let damp clothes sit too long. Iron work clothes neatly when required.", "必要なら分けて洗う。濡れた服を長時間放置しない。必要な時は仕事着をきれいにアイロンする。", "လိုအပ်လျှင် ပစ္စည်းများကို ခွဲပါ။ စိုနေသောအဝတ်များကို ကြာကြာမထားပါနှင့်။ လိုအပ်ပါက work clothes ကို သပ်သပ်ရပ်ရပ် ironing လုပ်ပါ။"),
      t("Do daily laundry. Wash clothes in the washing machine and hang them on the drying rack near the window to dry properly.", "毎日洗濯を行ってください。洗濯機で服を洗い、窓際の物干しラックに掛けてしっかりと乾かします。", "နေ့စဉ် အဝတ်လျှော်ပါ။ အဝတ်များကို အဝတ်လျှော်စက်ဖြင့် လျှော်ပြီး သေချာခြောက်သွေ့စေရန် ပြတင်းပေါက်အနီးရှိ အခြောက်လှန်းစင်ပေါ်တွင် လှန်းထားပါ။")
    ],
    [
      photo("assets/routines/nako-laundry-washing-machine.jpg",
        t("LG washing machine setup", "LG洗濯機のセットアップ", "LG အဝတ်လျှော်စက် တပ်ဆင်မှု"),
        t("Use the LG washing machine to wash dirty clothes daily.", "毎日汚れた衣服を洗うために、LG洗濯機を使用してください。", "ညစ်ပတ်သောအဝတ်များကို နေ့စဉ်လျှော်ရန် LG အဝတ်လျှော်စက်ကို အသုံးပြုပါ။")),
      photo("assets/routines/nako-laundry-drying-rack.jpg",
        t("Hanging clothes drying rack", "室内物干しラック", "အဝတ်လှန်းစင်"),
        t("Hang washed clothes on this drying rack near the window so they dry thoroughly.", "洗濯した服は窓際のこの物干しラックに掛けて、しっかりと乾かしてください。", "လျှော်ပြီးသောအဝတ်များကို သေချာခြောက်သွေ့စေရန် ပြတင်းပေါက်အနီးရှိ ဤအဝတ်လှန်းစင်ပေါ်တွင် လှန်းထားပါ။"))
    ]),

  routine("toilet-drain-hair-trap", "daily", 150, "D", 
    t("Toilet Drain & Hair Trap Cleaning", "トイレ・排水口・ヘアトラップ掃除", "အိမ်သာရေစီးပေါက်နှင့် hair trap သန့်ရှင်းရေး"),
    t("Check bathroom drains and hair traps. Remove hair and dirt. Use the drain pump only after training.", "浴室の排水口とヘアトラップを確認します。髪と汚れを取ります。教わった後だけ排水ポンプを使います。", "bathroom drain နဲ့ hair trap ကိုစစ်ပါ။ ဆံပင်နဲ့အညစ်အကြေးဖယ်ပါ။ သင်ပေးပြီးမှ drain pump သုံးပါ။"),
    t("Daily check + as needed", "毎日確認＋必要に応じて", "နေ့စဉ်စစ်ဆေး + လိုအပ်သလို"),
    [
      t("Do not force the pump tool until taught. Tell Edwin if water remains stuck or smells bad.", "教わるまではポンプを無理に使わない。水が詰まったまま、または臭いがする場合はエドウィンに伝える。", "သင်မပေးခင် pump tool ကို အတင်းမသုံးပါနှင့်။ ရေမဆင်းသေးလျှင် သို့မဟုတ် အနံ့ဆိုးရှိလျှင် Edwin ကို ပြောပါ။"),
      t("Clean the floor trap and hair trap regularly to prevent blockages.", "排水詰まりを防ぐため、床の排水口とヘアトラップを定期的に掃除してください。", "ပိတ်ဆို့မှုများမဖြစ်စေရန် ကြမ်းပြင်ရေစီးပေါက်နှင့် hair trap ကို ပုံမှန်သန့်ရှင်းရေးလုပ်ပါ။"),
      t("When the toilet is clogged or flooding, use the pressure pump (pumper) to clear the blockage. The pump is stored in the narrow closet next to the refrigerator.", "トイレが詰まったり水が溢れたりした場合は、圧力ポンプを使用して詰まりを解消します。ポンプは冷蔵庫の横にある細い戸棚に保管されています。", "အိမ်သာပိတ်ဆို့လျှင် သို့မဟုတ် ရေလျှံလျှင် ပိတ်ဆို့မှုကိုရှင်းလင်းရန် ဖိအားစုပ်စက်ကို အသုံးပြုပါ။ စုပ်စက်ကို ရေခဲသေတ္တာဘေးရှိ သပ်ရပ်သော ဗီရိုထဲတွင် သိမ်းဆည်းထားသည်။"),
      t("Make sure to clean and rinse the pump after use, and store it back in the closet next to the fridge.", "使用後は必ずポンプをきれいに洗い、冷蔵庫横の戸棚に戻してください。", "အသုံးပြုပြီးနောက် စုပ်စက်ကို သန့်ရှင်းအောင်ဆေးကြောပြီး ရေခဲသေတ္တာဘေးရှိ ဗီရိုထဲသို့ ပြန်သိမ်းပါ။"),
      t("If the toilet remains clogged or continues to flood, notify Edwin immediately.", "詰まりが解消しない場合や水が溢れ続ける場合は、すぐにエドウィンに報告してください。", "အိမ်သာဆက်လက်ပိတ်ဆို့နေပါက သို့မဟုတ် ရေဆက်လျှံနေပါက Edwin ထံ ချက်ချင်းအကြောင်းကြားပါ။")
    ],
    [
      photo("assets/routines/nako-toilet-hair-trap.jpg",
        t("Bathroom floor drain and hair trap", "浴室の床の排水口とヘアトラップ", "ရေချိုးခန်းကြမ်းပြင် ရေစီးပေါက်နှင့် hair trap"),
        t("Clean the floor trap and remove any hair regularly to keep the drains flowing.", "排水をスムーズに保つため、定期的に床のトラップを掃除し、髪の毛を取り除いてください。", "ရေစီးဆင်းမှု ကောင်းမွန်စေရန် ကြမ်းပြင် trap ကို ပုံမှန်သန့်ရှင်းရေးလုပ်ပြီး ဆံပင်များကို ဖယ်ရှားပါ။")),
      photo("assets/routines/toilet-flooding-clog.jpg",
        t("Flooded bathroom floor next to a toilet bowl", "便器の横の溢れた浴室の床", "အိမ်သာခွက်ဘေးရှိ ရေလျှံနေသော ရေချိုးခန်းကြမ်းပြင်"),
        t("Flooded or clogged bathroom floor that needs pumping.", "ポンプで吸い出す必要がある、溢れたまたは詰まった浴室の床。", "ရေစုပ်ရန်လိုအပ်သော ရေလျှံနေသည့် သို့မဟုတ် ပိတ်ဆို့နေသည့် ရေချိုးခန်းကြမ်းပြင်။")),
      photo("assets/routines/toilet-pump-closet.jpg",
        t("Pressure pump stored in a narrow white cabinet next to the refrigerator", "冷蔵庫の横の細い白い戸棚に保管された圧力ポンプ", "ရေခဲသေတ္တာဘေးရှိ အဖြူရောင်ဗီရိုကျဉ်းကျဉ်းထဲတွင် သိမ်းထားသော ဖိအားစုပ်စက်"),
        t("The pump is located inside this cabinet next to the fridge.", "ポンプはこの冷蔵庫の横の戸棚の中にあります。", "ရေစုပ်စက်သည် ရေခဲသေတ္တာဘေးရှိ ဤဗီရိုထဲတွင် ရှိသည်။"))
    ]),


  routine("high-touch-surfaces", "weekly", 10, "H",
    t("High-Touch Surface Cleaning", "頻繁に触れる場所の掃除", "မကြာခဏကိုင်တွယ်သော မျက်နှာပြင်များ သန့်ရှင်းရေး"), 
    t("Clean door knobs, handles, switches, appliance handles, dish area, frequently used surfaces, and Edwin's workspace including keyboard, mouse, and work table.", "ドアノブ、取っ手、スイッチ、電化製品のハンドル、食器洗いエリア、頻繁に使用する表面、およびエドウィンのキーボード、マウス、デスクを含む作業スペースを掃除します。", "တံခါးလက်ကိုင်များ၊ ခလုတ်များ၊ စက်ပစ္စည်းလက်ကိုင်များ၊ ပန်းကန်ဆေးသည့်နေရာ၊ မကြာခဏအသုံးပြုသော မျက်နှာပြင်များနှင့် Edwin ၏ ကီးဘုတ်၊ မောက်စ်၊ အလုပ်စားပွဲ အပါအဝင် အလုပ်လုပ်သည့်နေရာကို သန့်ရှင်းရေးလုပ်ပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"),
    [
      t("Be gentle around electronics and avoid excess liquid near keyboard or mouse.", "電化製品の周囲は優しく扱い、キーボードやマウスの近くで液体を多く使わないでください。", "အီလက်ထရွန်နစ်ပစ္စည်းများကို ညင်သာစွာကိုင်တွယ်ပြီး ကီးဘုတ် သို့မဟုတ် မောက်စ်အနီးတွင် အရည်များများသုံးခြင်းကို ရှောင်ကြဉ်ပါ။"),
      t("Clean frequently touched switches and plugs regularly. Avoid using excessive liquid or spraying directly onto electrical switches.", "頻繁に触れるスイッチやプラグ類を定期的に掃除してください。電気スイッチに液体を多く使ったり、直接スプレーしたりしないでください。", "မကြာခဏကိုင်တွယ်သော ခလုတ်များနှင့် ပလပ်များကို ပုံမှန်သန့်ရှင်းရေးလုပ်ပါ။ လျှပ်စစ်ခလုတ်များပေါ်သို့ အရည်များလွန်းစွာသုံးခြင်း သို့မဟုတ် တိုက်ရိုက်ဖြန်းခြင်းကို ရှောင်ကြဉ်ပါ။")
    ],
    [
      photo("assets/routines/nako-light-switch-panel.jpg",
        t("Light switches and power plugs", "電気スイッチと電源プラグ", "မီးခလုတ်များနှင့် ပါဝါပလပ်များ"),
        t("Wipe light switches and plug adapters gently to keep them clean.", "電気スイッチやプラグのアダプターを優しく拭いて、清潔に保ってください。", "မီးခလုတ်များနှင့် ပလပ်အဒက်တာများကို သန့်ရှင်းစေရန် ညင်သာစွာ သုတ်ပေးပါ။"))
    ]),

  routine("household-supplies-online", "daily", 900, "S",
    t("Household/Nako Supplies & Online Orders", "家庭用品・ナコ用品とオンライン注文", "အိမ်သုံး/Nako သုံးပစ္စည်းများနှင့် အွန်လိုင်းမှာယူမှု"),
    t("Refill low tissue boxes. Check household and Nako supplies weekly. Add low-stock items to the Shopee cart, but do not order.", "少なくなったティッシュを補充します。家庭用品とナコ用品を毎週確認します。残り少ない品はShopeeのカートに入れますが、注文はしません。", "tissue နည်းနေရင် ဖြည့်ပါ။ အိမ်သုံးနဲ့ Nako သုံးပစ္စည်းတွေကို အပတ်စဉ်စစ်ပါ။ ကုန်ခါနီးတာကို Shopee cart ထဲထည့်ပါ။ မမှာပါနဲ့။"),
    t("Daily / throughout the day + weekly stock check", "毎日／日中随時＋毎週の在庫確認", "နေ့စဉ် / တစ်နေ့လုံး + အပတ်စဉ် stock စစ်ဆေးခြင်း"),
    [
      t("When only 1-2 spare tissue packs remain, tell Edwin and add tissue packs to the shopping list or cart. Ask before placing an order.", "予備のティッシュが残り1〜2パックになったら、エドウィンに伝え、買い物リストまたはカートに追加する。注文確定前には必ず確認する。", "tissue အပိုထုပ် ၁-၂ ထုပ်သာကျန်လျှင် Edwin ကိုပြောပြီး ဈေးဝယ်စာရင်း သို့မဟုတ် cart ထဲသို့ tissue ထုပ်များကိုထည့်ပါ။ မှာယူမီ အရင်မေးပါ။"),
      t("Check Nako's food, pee pads, wipes, and poop bags every week. Add anything running low to the shopping list or Shopee cart.", "ナコのフード、おしっこシート、ウェットティッシュ、うんち袋を毎週確認してください。残り少ない品は買い物リストまたはShopeeのカートに追加します。", "Nako ရဲ့အစာ၊ ဆီးခံပြား၊ တစ်ရှူးစိုနဲ့ ချေးကောက်အိတ်တွေကို အပတ်စဉ်စစ်ပါ။ ကုန်ခါနီးတာကို ဈေးဝယ်စာရင်း သို့မဟုတ် Shopee cart ထဲထည့်ပါ။"),
      t("Tell Edwin early before any household or Nako supplies fully run out.", "家庭用品やナコ用品が完全になくなる前に、早めにエドウィンに伝えてください。", "အိမ်သုံးပစ္စည်း သို့မဟုတ် Nako သုံးပစ္စည်းတွေ လုံးဝမကုန်ခင် Edwin ကို စောစောပြောပါ။"),
      t("Do not place orders yourself. Tell Edwin or Yukari to review and check out the cart.", "自分で注文を確定しないでください。エドウィンかゆかりに、カートを確認して決済してもらうよう伝えてください。", "ကိုယ်တိုင် order မတင်ပါနဲ့။ cart ကို စစ်ပြီး check out လုပ်ပေးဖို့ Edwin သို့မဟုတ် Yukari ကို ပြောပါ။")
    ],
    [
      photo("assets/routines/nako-shopee-online-orders.jpg",
        t("Shopee shopping app", "Shopeeショッピングアプリ", "Shopee ဈေးဝယ်အက်ပ်"),
        t("Use the Shopee app to search for and add low supplies to the cart.", "Shopeeアプリを使用して、少なくなった消耗品を検索し、カートに追加してください。", "ကုန်ခါနီးပစ္စည်းများကို ရှာဖွေပြီး cart ထဲသို့ ထည့်ရန် Shopee အက်ပ်ကို အသုံးပြုပါ။")),
      photo("assets/sections/nako-inventory.png",
        t("Storage basket with Nako's food bag, pee pads, wipes, and waste bags", "ナコのフードバッグ、おしっこシート、ウェットティッシュ、袋が入った収納バスケット", "Nako ၏ အစာအိတ်၊ ဆီးခံပြား၊ တစ်ရှူးစိုနှင့် အမှိုက်အိတ်များပါသည့် ပလတ်စတစ်ခြင်းတောင်း"),
        t("Check Nako's supplies every week and add low-stock items to the shopping list or Shopee cart.", "ナコ用品を毎週確認し、残り少ない品は買い物リストまたはShopeeのカートに追加してください。", "Nako သုံးပစ္စည်းတွေကို အပတ်စဉ်စစ်ပြီး ကုန်ခါနီးတာကို ဈေးဝယ်စာရင်း သို့မဟုတ် Shopee cart ထဲထည့်ပါ။"))
    ]),

  routine("kitchen-sink-drain-rack-counter", "weekly", 20, "K", 
    t("Kitchen Rack", "キッチンラック", "မီးဖိုချောင်စင်"),
    t("Clean the kitchen rack. Remove dust, food residue, water stains, and oil marks.", "キッチンラックを掃除します。ほこり、食べかす、水垢、油汚れを取り除きます。", "မီးဖိုချောင်စင်ကို သန့်ရှင်းပါ။ ဖုန်၊ အစားအစာအကြွင်းအကျန်၊ ရေကွက်နှင့် ဆီကွက်များကို ဖယ်ရှားပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Remove all items from the kitchen rack before cleaning.", "掃除の前に、キッチンラックからすべての物を取り出してください。", "မသန့်ရှင်းမီ မီးဖိုချောင်စင်ပေါ်က ပစ္စည်းအားလုံးကို ဖယ်ပါ။"),
      t("Wipe every shelf, rail, corner, and underside.", "棚、レール、角、裏側をすべて拭いてください。", "စင်ချပ်၊ ဘောင်တန်း၊ ထောင့်နှင့် အောက်ဘက်အားလုံးကို သုတ်ပါ။"),
      t("Dry the kitchen rack fully before putting the items back.", "物を戻す前に、キッチンラックを完全に乾かしてください。", "ပစ္စည်းများ ပြန်မထားမီ မီးဖိုချောင်စင်ကို လုံးဝခြောက်အောင်လုပ်ပါ။")
    ],
    [
      photo("assets/routines/nako-kitchen-sink.jpg",
        t("Kitchen rack above the sink", "流し台の上のキッチンラック", "မီးဖိုချောင်စင်ပေါ်ရှိ စင်"),
        t("Clean the kitchen rack every week.", "キッチンラックを毎週掃除してください。", "မီးဖိုချောင်စင်ကို အပတ်စဉ် သန့်ရှင်းပါ။"))
    ]),

  routine("nako-weekly-play-pen-deep-clean", "weekly", 25, "N",
    t("Nako - Weekly Play Pen Deep Clean", "ナコ - サークルの週1徹底掃除", "နာကို - pen အပတ်စဉ် deep clean"),
    t("Deep clean Nako's play pen: wipe the panels, floor or mat, pee tray area, towels, and toys.", "ナコのサークルを徹底的に掃除します。パネル、床またはマット、トイレトレー周り、タオル、おもちゃを拭いてください。", "Nako ၏ play pen ကို နက်နက်ရှိုင်းရှိုင်း သန့်ရှင်းပါ။ panels၊ ကြမ်းပြင် သို့မဟုတ် mat၊ pee tray နေရာ၊ တံဘက်များနှင့် ကစားစရာများကို သုတ်ပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"),
    [
      t("Move Nako safely out of the play pen. Put on her collar and house line, and supervise her actively while you clean.", "ナコを安全にサークルの外へ出します。首輪とハウスリードを着け、掃除中は常に見守ってください。", "Nako ကို play pen အပြင်သို့ လုံခြုံစွာ ထုတ်ပါ။ လည်ပတ်နှင့် house line တပ်ပြီး သန့်ရှင်းနေစဉ် အမြဲစောင့်ကြည့်ပါ။"),
      t("Remove everything from the pen: the bed, floor mats, towels, pee tray, pee pad, and every toy.", "ベッド、床マット、タオル、トイレトレー、ペットシーツ、おもちゃをすべてサークルから出します。", "အိပ်ရာ၊ ကြမ်းခင်း mat၊ တံဘက်၊ pee tray၊ pee pad နှင့် ကစားစရာအားလုံးကို pen ထဲမှ ထုတ်ပါ။"),
      t("Sweep or vacuum loose dirt toward the centre of the pen. Never push dirt into the gaps between the pen walls and floor.", "ほこりやごみはサークルの中央へ向けて掃くか吸い取ります。サークルの壁と床の隙間へ絶対に押し込まないでください。", "ဖုန်နှင့်အမှိုက်များကို pen ၏အလယ်ဘက်သို့ sweep သို့မဟုတ် vacuum လုပ်ပါ။ pen wall နှင့် floor ကြား gap ထဲသို့ လုံးဝမတွန်းပါနှင့်။"),
      t("On hard flooring only, use a stone-safe pH-neutral floor cleaner as directed, then wipe or mop once with clean water to remove it.", "硬い床だけには、石材対応のpH中性床用クリーナーを表示どおりに使い、その後きれいな水で一度拭くかモップがけして落とします。", "မာသောကြမ်းပြင်ပေါ်တွင်သာ stone-safe pH-neutral floor cleaner ကို ညွှန်ကြားချက်အတိုင်းသုံးပြီးနောက် သန့်ရေဖြင့် တစ်ကြိမ် wipe သို့မဟုတ် mop လုပ်ကာ ဖယ်ရှားပါ။"),
      t("Use pet-safe cleaner on appropriate pen panels and surfaces, and enzyme cleaner where pee or poop contact or smell is possible. Leave a product for 2-3 minutes only when Edwin has taught that step or the product label directs it.", "適切なサークルのパネルや表面にはペット用クリーナーを使い、おしっこ・うんちが触れた可能性や臭いがある場所には酵素クリーナーを使います。2〜3分置くのは、Edwinから教わった場合、または製品表示に指示がある場合だけです。", "သင့်တော်သော pen panel နှင့်မျက်နှာပြင်များတွင် pet-safe cleaner ကိုသုံးပြီး ဆီး/ချေးထိနိုင်ခြင်း သို့မဟုတ် အနံ့ရှိနိုင်သောနေရာတွင် enzyme cleaner ကိုသုံးပါ။ Edwin က သင်ပေးထားသည့်အခါ သို့မဟုတ် product label က ညွှန်ကြားသည့်အခါမှသာ ၂-၃ မိနစ်ထားပါ။"),
      t("Take apart the pee tray. Throw away the used pee pad, then wash the tray, grate, edges, underside, and exterior.", "トイレトレーを分解します。使用済みのペットシーツを捨て、トレー、すのこ、縁、裏面、外側を洗います。", "pee tray ကို အစိတ်အပိုင်းခွဲပါ။ သုံးပြီးသား pee pad ကို လွှင့်ပစ်ပြီး tray၊ အပေါ်ဆန်ခါ၊ အနား၊ အောက်ခြေနှင့် အပြင်ဘက်ကို ဆေးပါ။"),
      t("Wipe every play-pen panel on both sides. Clean the rails, joints, wall sides, edges, and every corner.", "サークルの各パネルの内側と外側を拭きます。レール、接続部、壁側、縁、すべての角を掃除します。", "play pen panel တစ်ခုစီ၏ အတွင်းနှင့် အပြင်ကို သုတ်ပါ။ ဘောင်တန်း၊ အဆက်နေရာ၊ နံရံဘက်၊ အနားနှင့် ထောင့်အားလုံးကို သန့်ရှင်းပါ။"),
      t("Clean the floor outside and around the pen. Wipe along the walls and in every corner, rinse cloths or mops thoroughly, and finish with clean water so no cleaner residue remains.", "サークルの外側と周辺の床を掃除します。壁際とすべての角も拭き、布やモップを十分にすすぎ、最後はきれいな水で仕上げて洗剤を残さないでください。", "pen အပြင်နှင့် ပတ်ဝန်းကျင်ကြမ်းပြင်ကို သန့်ရှင်းပါ။ နံရံဘေးနှင့် ထောင့်အားလုံးကို သုတ်ပြီး cloth သို့မဟုတ် mop ကို သေချာ rinse လုပ်ကာ cleaner အကြွင်းအကျန်မရှိစေရန် သန့်ရေဖြင့် အဆုံးသတ်ပါ။"),
      t("Wash the pen floor and all removable floor mats. Remove hair, dirt, pee residue, and smell.", "サークルの床と取り外せる床マットをすべて洗います。毛、汚れ、尿の残り、臭いを取り除きます。", "pen ကြမ်းပြင်နှင့် ဖြုတ်လို့ရသော ကြမ်းခင်း mat အားလုံးကို ဆေးပါ။ အမွေး၊ အညစ်အကြေး၊ ဆီးကျန်နှင့် အနံ့ကို ဖယ်ရှားပါ။"),
      t("Wash all of Nako's towels and every washable part of her bed. Rinse well and dry them fully.", "ナコのタオル全部と、ベッドの洗える部分をすべて洗います。十分にすすぎ、完全に乾かします。", "Nako ရဲ့ တံဘက်အားလုံးနှင့် အိပ်ရာ၏ ဆေးလို့ရသော အစိတ်အပိုင်းအားလုံးကို ဆေးပါ။ ရေစင်အောင်ဆေးပြီး လုံးဝခြောက်အောင်လုပ်ပါ။"),
      t("Separate all toys before washing: toys with a squeaker or sound unit, and toys without one.", "洗う前に、おもちゃを音が鳴る部品入りと、音が鳴る部品なしに分けます。", "ကစားစရာများကို အသံမြည်ပစ္စည်းပါတာနှင့် မပါတာဟူ၍ မဆေးမီ ခွဲထားပါ။"),
      t("Wash squeaky or sound-making toys with water only. Do not use soap or detergent.", "音が鳴るおもちゃは水だけで洗います。石けんや洗剤は使わないでください。", "အသံမြည်သော ကစားစရာများကို ရေနှင့်သာဆေးပါ။ ဆပ်ပြာ သို့မဟုတ် detergent မသုံးပါနှင့်။"),
      t("Wash soft toys without a squeaker with Nako's puppy shampoo. Rinse until no shampoo remains.", "音が鳴らない柔らかいおもちゃは、ナコ用の子犬用シャンプーで洗います。シャンプーが残らないよう十分にすすぎます。", "အသံမမြည်သော အပျော့စားကစားစရာများကို Nako ရဲ့ puppy shampoo နဲ့ ဆေးပါ။ shampoo မကျန်အောင် ရေစင်စင်ဆေးပါ။"),
      t("Whenever soap is needed for Nako's things, use only Nako's puppy shampoo. Never use human soap or normal laundry detergent.", "ナコの物に石けんが必要な場合は、ナコ用の子犬用シャンプーだけを使います。人間用石けんや通常の洗濯洗剤は絶対に使わないでください。", "Nako ရဲ့ ပစ္စည်းများအတွက် ဆပ်ပြာလိုပါက Nako ရဲ့ puppy shampoo ကိုသာသုံးပါ။ လူသုံးဆပ်ပြာ သို့မဟုတ် ပုံမှန်အဝတ်လျှော် detergent ကို လုံးဝမသုံးပါနှင့်။"),
      t("Use enzyme cleaner where needed, especially if there may be pee or poop smell.", "必要に応じて、特におしっこやうんちの臭いがある場合は酵素クリーナーを使ってください。", "လိုအပ်ပါက၊ အထူးသဖြင့် ဆီး သို့မဟုတ် အညစ်အကြေးအနံ့ရှိနိုင်သောနေရာတွင် enzyme cleaner ကို အသုံးပြုပါ။"),
      t("Never mix cleaning products. Use each product only on its suitable surface, rinse it away as directed, and do not leave detergent or cleaner residue.", "洗剤同士を絶対に混ぜないでください。各製品は適した表面にだけ使い、表示どおりにすすぎ、洗剤やクリーナーを残さないでください。", "cleaning product များကို လုံးဝမရောပါနှင့်။ product တစ်ခုစီကို သင့်တော်သောမျက်နှာပြင်တွင်သာသုံးပြီး ညွှန်ကြားချက်အတိုင်း rinse လုပ်ကာ detergent သို့မဟုတ် cleaner အကြွင်းအကျန် မထားပါနှင့်။"),
      t("Dry the pen, pee tray, mats, bed, towels, toys, and nearby floor fully before letting Nako back in. Do not leave damp areas or pee or poop smell outside the pee tray.", "ナコを戻す前に、サークル、トイレトレー、マット、ベッド、タオル、おもちゃ、周辺の床を完全に乾かします。濡れた場所や、トイレトレーの外におしっこ・うんちの臭いを残さないでください。", "Nako ကို ပြန်မထည့်ခင် pen၊ pee tray၊ mat၊ အိပ်ရာ၊ တံဘက်၊ ကစားစရာများနှင့် အနီးရှိကြမ်းပြင်ကို လုံးဝခြောက်အောင်လုပ်ပါ။ စိုနေသည့်နေရာ သို့မဟုတ် pee tray အပြင်မှာ ဆီး/ချေးအနံ့ မကျန်ပါစေနှင့်။"),
      t("Put everything back only when it is clean and dry. Fit a fresh pee pad and return Nako's bed, mats, towels, and toys.", "全部が清潔で乾いてから戻します。新しいペットシーツを取り付け、ナコのベッド、マット、タオル、おもちゃを戻します。", "အရာအားလုံး သန့်ရှင်းခြောက်သွေ့မှ ပြန်ထားပါ။ pee pad အသစ်တပ်ပြီး Nako ရဲ့ အိပ်ရာ၊ mat၊ တံဘက်နှင့် ကစားစရာများကို ပြန်ထားပါ။")
    ],
    [
      photo("assets/routines/nako-weekly-play-pen-deep-clean-setup.jpg",
        t("Play pen emptied for a deep clean with towels and an activity mat hung outside", "タオルと遊び用マットを外に掛け、徹底掃除のため空にしたサークル", "တံဘက်နှင့် activity mat ကို အပြင်မှာလှန်းထားပြီး deep clean လုပ်ရန် ပစ္စည်းများထုတ်ထားသော play pen"),
        t("Remove everything before cleaning the pee tray, panels, floor, bedding, and toys.", "トイレトレー、パネル、床、寝具、おもちゃを掃除する前に、すべてを外へ出します。", "pee tray၊ panel၊ ကြမ်းပြင်၊ အိပ်ရာနှင့် ကစားစရာများကို မသန့်ရှင်းမီ ပစ္စည်းအားလုံးကို အပြင်ထုတ်ပါ။")),
      photo("assets/routines/nako-weekly-play-pen-deep-clean-pet-cleaner.jpg",
        t("Pet-safe cleaner held beside the emptied play pen", "空にしたサークルの横で持っているペット用クリーナー", "ပစ္စည်းများထုတ်ထားသော play pen ဘေးတွင် ကိုင်ထားသည့် အိမ်မွေးတိရစ္ဆာန်သုံး cleaner"),
        t("Use pet-safe cleaner on the pen panels, wall sides, corners, and nearby floor.", "ペット用クリーナーで、サークルのパネル、壁側、角、周辺の床を掃除します。", "pen panel၊ နံရံဘက်၊ ထောင့်နှင့် အနီးရှိကြမ်းပြင်ကို အိမ်မွေးတိရစ္ဆာန်သုံး cleaner ဖြင့် သန့်ရှင်းပါ။"))
    ]),

  routine("nako-teeth-ears-nails", "daily", 75, "N",
    t("Nako - Teeth / Ears / Nails Check", "ナコ - 歯・耳・爪のチェック", "Nako - သွား / နား / ခြေသည်း စစ်ဆေးခြင်း"), 
    t("Brush Nako's teeth daily once taught. Check ears for smell or redness, and check nails or paws for anything unusual each week.", "教わった後は、ナコの歯を毎日磨きます。毎週、耳に臭いや赤みがないか、爪や足に異常がないかも確認してください。", "သင်ပေးပြီးနောက် Nako ၏ သွားကို နေ့စဉ်တိုက်ပါ။ အပတ်စဉ် နားတွင် အနံ့ သို့မဟုတ် နီခြင်းရှိမရှိနှင့် ခြေသည်း သို့မဟုတ် ခြေဖဝါးတွင် မူမမှန်တာရှိမရှိကိုလည်း စစ်ပါ။"),
    t("Teeth daily + ears/nails weekly", "歯磨きは毎日＋耳・爪は毎週", "သွားတိုက်ခြင်း နေ့စဉ် + နား/ခြေသည်း အပတ်စဉ်"),
    [
      t("Use only Nako's dog toothbrush and toothpaste. Do not force teeth brushing or nail handling if she resists.", "ナコ用の犬用歯ブラシと歯磨き粉だけを使ってください。嫌がる場合は、歯磨きや爪の処理を無理に行わないでください。", "Nako အတွက် dog toothbrush နှင့် toothpaste ကိုသာ အသုံးပြုပါ။ သူမ ရုန်းကန်နေပါက သွားတိုက်ခြင်း သို့မဟုတ် ခြေသည်းကိုင်တွယ်ခြင်းကို အတင်းမလုပ်ပါနှင့်။"),
      t("Never use human toothpaste. If Nako resists, pause and tell Edwin.", "人間用の歯磨き粉は絶対に使わないでください。ナコが嫌がる場合は中止して、Edwinに伝えてください。", "လူသုံး toothpaste ကို လုံးဝမသုံးပါနဲ့။ Nako ရုန်းရင် ရပ်ပြီး Edwin ကို ပြောပါ။"),
      t("Brush Nako's teeth daily using the tutorial method. Wrap her in a towel to keep her calm when checking ears, paws, or nails.", "チュートリアル動画に示されている方法で、ナコの歯を毎日磨いてください。耳、足、爪をチェックする時は、落ち着かせるためにタオルで包んでください。", "ဗီဒီယိုသင်ခန်းစာတွင် ပြသထားသည့်နည်းအတိုင်း Nako ၏ သွားကို နေ့စဉ်တိုက်ပါ။ နား၊ ခြေဖဝါး သို့မဟုတ် ခြေသည်းကို စစ်ဆေးသည့်အခါ သူမငြိမ်သက်စေရန် တံဘက်ဖြင့် ပတ်ထားပါ။")
    ],
    [
      photo("assets/routines/nako-paw-check-towel.jpg",
        t("Wrapped in towel for inspection", "タオルに包んでチェック", "စစ်ဆေးရန် တံဘက်ဖြင့် ပတ်ထားခြင်း"),
        t("Wrap Nako in a towel to check paws, ears, or nails calmly.", "耳や足、爪を落ち着いてチェックするために、ナコをタオルで包んでください。", "ခြေဖဝါး၊ နား သို့မဟုတ် ခြေသည်းများကို ငြိမ်သက်စွာ စစ်ဆေးနိုင်ရန် Nako ကို တံဘက်ဖြင့် ပတ်ထားပါ။")),
      photo("assets/routines/nako-brushing-teeth.mov",
        t("Teeth brushing tutorial", "歯磨きのチュートリアル動画", "သွားတိုက်ခြင်း သင်ခန်းစာ ဗီဒီယို"),
        t("A tutorial video showing how to brush Nako's teeth.", "ナコの歯の磨き方を示すチュートリアル動画。", "Nako ၏ သွားတိုက်နည်းကို ပြသထားသည့် သင်ခန်းစာ ဗီဒီယို။"))
    ]),

  routine("nako-weight-tracking", "weekly", 40, "KG", 
    t("Nako - Weight Tracking", "ナコ - 体重測定", "Nako - ကိုယ်အလေးချိန် ခြေရာခံခြင်း"), 
    t("On Sunday before breakfast, weigh yourself, then weigh again holding Nako. Subtract your weight and save Nako's result. Only weigh her when awake.", "日曜日の朝食前、自分だけで測り、次にナコを抱いて測ります。自分の体重を引いてナコの体重を保存します。ナコが起きている時だけ測ってください。", "တနင်္ဂနွေနေ့ မနက်စာမစားမီ မိမိတစ်ယောက်တည်း အရင်ချိန်ပြီး Nako ကိုချီကာ ထပ်ချိန်ပါ။ မိမိအလေးချိန်ကို နုတ်ပြီး Nako ၏အလေးချိန်ကို သိမ်းပါ။ Nako နိုးနေမှသာ ချိန်ပါ။"),
    t("Every Sunday morning before breakfast", "毎週日曜日の朝食前", "တနင်္ဂနွေနေ့ နံနက်တိုင်း အစာမစားမီ"), 
    [
      t("Do not wake Nako just to weigh her. Wait until she is awake and it is nearly breakfast, before she eats.", "体重測定のためだけにナコを起こさないでください。ナコが起きて朝食の時間が近づいたら、食べる前に測ります。", "ကိုယ်အလေးချိန်ချိန်ရန်အတွက် Nako ကို မနှိုးပါနှင့်။ သူနိုးလာပြီး မနက်စာစားချိန်နီးလျှင် အစာမစားမီ ချိန်ပါ။"),
      t("Use the same scale each time.", "毎回同じ体重計を使ってください。", "အကြိမ်တိုင်း တူညီသော ကိုယ်အလေးချိန်စက်ကို သုံးပါ။")
    ],
    [
      photo("assets/routines/nako-weight-person-only.jpg",
        t("Person standing alone on the weighing scale", "一人で体重計に乗っている人", "ကိုယ်အလေးချိန်စက်ပေါ်တွင် တစ်ယောက်တည်း ရပ်နေသူ"),
        t("1. Weigh yourself alone and note the number.", "1. 一人で体重を測り、数字をメモします。", "၁။ မိမိတစ်ယောက်တည်း ချိန်ပြီး ကိန်းဂဏန်းကို မှတ်ထားပါ။")),
      photo("assets/routines/nako-weight-carrying-nako.jpg",
        t("Person holding Nako while standing on the weighing scale", "ナコを抱いて体重計に乗っている人", "Nako ကိုချီ၍ ကိုယ်အလေးချိန်စက်ပေါ်တွင် ရပ်နေသူ"),
        t("2. Hold Nako and weigh again. Subtract your weight, then save Nako's weight in the app.", "2. ナコを抱いてもう一度測ります。自分の体重を引き、ナコの体重をアプリに保存します。", "၂။ Nako ကိုချီပြီး ထပ်ချိန်ပါ။ မိမိအလေးချိန်ကို နုတ်ပြီး Nako ၏အလေးချိန်ကို app တွင် သိမ်းပါ။"))
    ]),
  routine("nako-inventory-check", "weekly", 50, "I", 
    t("Nako - Inventory Check", "ナコ - 在庫チェック", "Nako - ပစ္စည်းစစ်ဆေးခြင်း"), 
    t("Check Nako's food, treats, pee pads, wipes, poop bags, cleaning spray, and other dog supplies.", "ナコのドッグフード、おやつ、おしっこシート、ウェットティッシュ、うんち袋、掃除用スプレー、その他の犬用品をチェックします。", "Nako ၏ အစာ၊ မုန့်၊ ဆီးခံပြား၊ စိုစွတ်သော တစ်ရှူး၊ ချေးကောက်သည့် အိတ်၊ သန့်ရှင်းရေးဖြန်းဆေးနှင့် အခြားခွေးသုံးပစ္စည်းများကို စစ်ဆေးပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Tell Edwin early before items fully run out.", "品物が完全に切れる前に、早めにエドウィンに報告してください。", "ပစ္စည်းများ လုံးဝမကုန်မီ Edwin ထံ စောစောအကြောင်းကြားပါ။"),
      t("Pee pads and cleaning spray are located on top of the bathroom cabinet. Treats, wipes, and other daily dog supplies are stored on the tiered trolley shelf.", "おしっこシートと掃除用スプレーは浴室の戸棚の上にあります。おやつ、ウェットティッシュ、その他の日常の犬用品は、キャスター付きのワゴン（3段ラック）に保管されています。", "ဆီးခံပြားများနှင့် သန့်ရှင်းရေးစပရေးတို့မှာ ရေချိုးခန်းဗီရိုအပေါ်တွင် ရှိသည်။ မုန့်များ၊ တစ်ရှူးစိုများနှင့် အခြားနေ့စဉ်ခွေးသုံးပစ္စည်းများကို ဘီးတပ်စင်ပေါ်တွင် သိမ်းဆည်းထားသည်။")
    ],
    [
      photo("assets/routines/nako-inventory-shelf.jpg",
        t("Tiered trolley shelf setup", "キャスター付きワゴンのセットアップ", "ဘီးတပ်စင် တပ်ဆင်မှု"),
        t("Check dog treats, toys, towels, and wipes on this shelf.", "このワゴンにあるドッグフード、おもちゃ、タオル、ウェットティッシュをチェックしてください。", "ဤစင်ပေါ်ရှိ ခွေးမုန့်များ၊ ကစားစရာများ၊ တံဘက်များနှင့် တစ်ရှူးစိုများကို စစ်ဆေးပါ။")),
      photo("assets/routines/nako-inventory-pads-cupboard.jpg",
        t("Pee pads and cleaning spray storage", "おしっこシートと掃除用スプレーの保管場所", "ဆီးခံပြားများနှင့် သန့်ရှင်းရေးစပရေး သိမ်းဆည်းသည့်နေရာ"),
        t("Pee pads and pet disinfectant sprays are stored on top of this cabinet.", "おしっこシートとペット用除菌スプレーはこの戸棚の上に保管されています。", "ဆီးခံပြားများနှင့် အိမ်မွေးတိရစ္ဆာန် ပိုးသတ်ဆေးဖြန်းဆေးများကို ဤဗီရိုအပေါ်တွင် သိမ်းဆည်းထားသည်။"))
    ]),
  routine("supplement-pill-boxes", "weekly", 60, "P", 
    t("Supplement Pill Boxes", "サプリメントケース", "အားဆေးဗူးများ"), 
    t("Every week, check Edwin's green box for 5 items and Yukari's white box for 3 items, then top up when needed.", "毎週、エドウィンの緑色のケースに5種類、ゆかりの白色のケースに3種類入っているか確認し、必要に応じて補充します。", "အပတ်စဉ် Edwin ၏ အစိမ်းရောင်ဗူးတွင် ပစ္စည်း ၅ မျိုးနှင့် Yukari ၏ အဖြူရောင်ဗူးတွင် ပစ္စည်း ၃ မျိုး ရှိမရှိစစ်ပြီး လိုအပ်ပါက ဖြည့်ပါ။"), 
    t("Weekly check + when empty", "毎週チェック＋空のとき", "အပတ်စဉ်စစ်ဆေးမှု + ကုန်သွားသောအခါ"), 
    [
      t("Keep Edwin's and Yukari's boxes separate. Do not change, add, or remove supplements unless instructed. Ask Edwin if unsure.", "エドウィンとゆかりのケースは別々に保管してください。指示なしにサプリメントを変更、追加、または取り除かないでください。不明な場合はEdwinに確認してください。", "Edwin နဲ့ Yukari ရဲ့ဆေးဗူးတွေကို သီးခြားထားပါ။ ညွှန်ကြားချက်မရှိဘဲ အားဆေးကို မပြောင်း၊ မထည့်၊ မဖယ်ပါနဲ့။ မသေချာရင် Edwin ကို မေးပါ။"),
      t("Use only the exact products and strength shown or instructed. Do not guess, substitute, or change the amount. Ask Edwin if anything is unclear.", "表示または指示された製品と含有量だけを使います。推測、代用、量の変更はしません。不明な点があればEdwinに確認してください。", "ပြထားသော သို့မဟုတ် ညွှန်ကြားထားသော အမျိုးအစားနှင့် ဆေးပမာဏကိုသာ သုံးပါ။ မှန်းဆခြင်း၊ အစားထိုးခြင်း သို့မဟုတ် ပမာဏပြောင်းခြင်း မလုပ်ပါနှင့်။ မရှင်းလင်းပါက Edwin ကို မေးပါ။")
    ],
    [
      photo("assets/routines/supplement-pill-boxes-edwin-five-items.jpg",
        t("Edwin's 5 items beside the green supplement box", "エドウィン用の5種類と緑色のサプリメントケース", "Edwin အတွက် ပစ္စည်း ၅ မျိုးနှင့် အစိမ်းရောင် အားဆေးဗူး"),
        t("Edwin needs multivitamin, Omega-3, probiotic, Vitamin D, and Metformin (Glucophage 750 mg).", "エドウィンには、マルチビタミン、オメガ3、プロバイオティクス、ビタミンD、メトホルミン（グルコファージ750 mg）が必要です。", "Edwin အတွက် multivitamin၊ Omega-3၊ probiotic၊ Vitamin D နှင့် Metformin (Glucophage 750 mg) လိုအပ်သည်။")),
      photo("assets/routines/supplement-pill-boxes-yukari-three-items.jpg",
        t("Yukari's supplements beside the white supplement box", "ゆかり用のサプリメントと白色のサプリメントケース", "Yukari အတွက် အားဆေးများနှင့် အဖြူရောင် အားဆေးဗူး"),
        t("Yukari needs multivitamin, Omega-3, and probiotic. Omega-3 is required even though it is not visible in this photo.", "ゆかりには、マルチビタミン、オメガ3、プロバイオティクスが必要です。この写真に写っていませんが、オメガ3も必要です。", "Yukari အတွက် multivitamin၊ Omega-3 နှင့် probiotic လိုအပ်သည်။ ဤဓာတ်ပုံတွင် Omega-3 မပါသော်လည်း ထည့်ရန်လိုအပ်သည်။")),
      photo("assets/routines/supplement-pill-boxes.jpg",
        t("Supplement pill boxes", "サプリメントケース", "အားဆေးဆေးဗူးများ"),
        t("Green pill organizer for Edwin, white multi-compartment box for Yukari.", "エドウィン用の緑色のサプリメントケースと、ゆかり用の白色のマルチ仕切りケース。", "Edwin အတွက် အစိမ်းရောင်ဆေးဗူးနှင့် Yukari အတွက် အဖြူရောင်အကန့်ပါဆေးဗူး။"))
    ],
    {
      instructions: [
        t("Wash and dry your hands before handling the supplements and medicine.", "サプリメントと薬を扱う前に、手を洗って乾かします。", "အားဆေးနှင့် ဆေးကို မကိုင်မီ လက်ဆေးပြီး ခြောက်အောင်သုတ်ပါ။"),
        t("Edwin - green box: Check for multivitamin, Omega-3, probiotic, Vitamin D, and Metformin (Glucophage 750 mg).", "エドウィン・緑色のケース：マルチビタミン、オメガ3、プロバイオティクス、ビタミンD、メトホルミン（グルコファージ750 mg）を確認します。", "Edwin - အစိမ်းရောင်ဗူး။ multivitamin၊ Omega-3၊ probiotic၊ Vitamin D နှင့် Metformin (Glucophage 750 mg) ရှိမရှိ စစ်ပါ။"),
        t("Yukari - white box: Check for multivitamin, Omega-3, and probiotic.", "ゆかり・白色のケース：マルチビタミン、オメガ3、プロバイオティクスを確認します。", "Yukari - အဖြူရောင်ဗူး။ multivitamin၊ Omega-3 နှင့် probiotic ရှိမရှိ စစ်ပါ။"),
        t("Check every compartment. Top up only the instructed amount of each item.", "すべての仕切りを確認し、各アイテムを指示された量だけ補充します。", "အကန့်တိုင်းကို စစ်ပါ။ ပစ္စည်းတစ်မျိုးစီကို ညွှန်ကြားထားသော ပမာဏအတိုင်းသာ ဖြည့်ပါ။"),
        t("Close every compartment securely and put both boxes back separately.", "すべての仕切りをしっかり閉め、2つのケースを別々に元の場所へ戻します。", "အကန့်တိုင်းကို သေချာပိတ်ပြီး ဗူး ၂ ခုကို သီးခြားစီ မူလနေရာသို့ ပြန်ထားပါ။")
      ]
    }),

  routine("toilet-cleaning", "weekly", 70, "T", 
    t("Deep Toilet Cleaning", "トイレの徹底掃除", "အိမ်သာ အထူးသန့်ရှင်းရေး"),
    t(
      "Wash both toilets every week. Use the white spray for bathroom surfaces, the green cleaner inside the toilet bowl, and the mold remover only when black mold appears.",
      "毎週2つのトイレを洗います。白いスプレーは浴室の表面、緑の洗剤は便器の中、カビ取り剤は黒カビがある時だけ使います。",
      "အိမ်သာ ၂ ခုလုံးကို အပတ်စဉ်ဆေးပါ။ အဖြူရောင် spray ကို ရေချိုးခန်းမျက်နှာပြင်များအတွက်သုံးပါ။ အစိမ်းရောင် cleaner ကို အိမ်သာခွက်အတွင်းသုံးပါ။ မှိုသတ်ဆေးကို အမည်းမှိုရှိမှသာ သုံးပါ။"
    ),
    t("Weekly", "毎週", "အပတ်စဉ်"),
    [
      t(
        "Clean both toilets: the main toilet beside the kitchen and the toilet inside the master bedroom.",
        "キッチン横のメイントイレと、主寝室内のトイレの両方を掃除します。",
        "မီးဖိုချောင်ဘေးရှိ အဓိကအိမ်သာနှင့် master bedroom ထဲရှိ အိမ်သာ ၂ ခုလုံးကို ဆေးပါ။"
      ),

      t(
        "Open the door, turn on the ventilation fan, wear gloves, and keep Nako outside.",
        "ドアを開け、換気扇をつけ、手袋を着けます。Nakoはトイレの外に出します。",
        "တံခါးဖွင့်၊ လေထုတ်ပန်ကာဖွင့်ပြီး လက်အိတ်ဝတ်ပါ။ Nako ကို အိမ်သာအပြင်မှာထားပါ။"
      ),

      t(
        "Spray the white Magiclean Bathroom & Toilet Cleaner on the sink, taps, wall tiles, shower area, and outside of the toilet bowl.",
        "白いMagiclean Bathroom & Toilet Cleanerを、洗面台、蛇口、壁タイル、シャワー周り、便器の外側にスプレーします。",
        "အဖြူရောင် Magiclean Bathroom & Toilet Cleaner ကို လက်ဆေးကန်၊ ရေပိုက်ခေါင်း၊ နံရံကြွေပြား၊ ရေချိုးနေရာနှင့် အိမ်သာခွက်အပြင်ဘက်တွင် ဖြန်းပါ။"
      ),

      t(
        "Scrub with a sponge, then rinse everything thoroughly with water.",
        "スポンジでこすり、その後すべてを水で十分に流します。",
        "ရေမြှုပ်နှင့်တိုက်ပြီး အားလုံးကို ရေနှင့် သေချာဆေးချပါ။"
      ),

      t(
        "Squeeze the green Magiclean Dual Power Toilet Cleaner under the toilet rim and around the inside of the bowl.",
        "緑のMagiclean Dual Power Toilet Cleanerを、便器のふち裏と便器の内側にかけます。",
        "အစိမ်းရောင် Magiclean Dual Power Toilet Cleaner ကို အိမ်သာခွက်အနားအောက်နှင့် ခွက်အတွင်းဘက်တွင် ညှစ်ထည့်ပါ။"
      ),

      t(
        "Scrub the inside with the toilet brush, then flush.",
        "便器の中をトイレブラシでこすり、その後流します。",
        "အိမ်သာခွက်အတွင်းကို အိမ်သာတိုက်တံနှင့်တိုက်ပြီး ရေဆွဲချပါ။"
      ),

      t(
        "Use Magiclean Stain & Mold only when there is black mold. First rinse away every other cleaner completely.",
        "Magiclean Stain & Moldは黒カビがある時だけ使います。先に他の洗剤をすべて完全に水で流します。",
        "Magiclean Stain & Mold ကို အမည်းမှိုရှိမှသာ သုံးပါ။ အရင်သုံးထားသော cleaner အားလုံးကို ရေနှင့် လုံးဝဆေးချပါ။"
      ),

      t(
        "Spray it on the mold, wait 5 minutes, then rinse thoroughly with water.",
        "カビにスプレーし、5分待ってから、水で十分に流します。",
        "မှိုပေါ်တွင် ဖြန်းပါ။ ၅ မိနစ်စောင့်ပြီး ရေနှင့် သေချာဆေးချပါ။"
      ),

      t(
        "Never mix cleaning products or use different cleaners at the same time.",
        "洗剤は絶対に混ぜないでください。違う洗剤を同時に使わないでください。",
        "cleaner များကို လုံးဝမရောပါနှင့်။ မတူသော cleaner များကို တစ်ချိန်တည်း မသုံးပါနှင့်။"
      ),

      t(
        "Rinse the floor and all surfaces, then leave the toilets dry. Let Nako enter only after everything is rinsed and dry.",
        "床とすべての表面を水で流し、トイレを乾かします。完全に洗い流して乾くまでNakoを入れません。",
        "ကြမ်းပြင်နှင့် မျက်နှာပြင်အားလုံးကို ရေဆေးပြီး အိမ်သာကို ခြောက်အောင်ထားပါ။ အားလုံးဆေးပြီး ခြောက်မှသာ Nako ကို ဝင်ခွင့်ပေးပါ။"
      )
    ],
    [
      photo("assets/routines/toilet-cleaning-products.jpg",
        t("Magiclean toilet cleaning products", "マジックリンのトイレ掃除用品", "Magiclean အိမ်သာသန့်ရှင်းရေးသုံးပစ္စည်းများ"),
        t("White bathroom spray, green toilet bowl cleaner, and blue stain/mold remover.", "浴室用の白いスプレー、便器用の緑の洗剤、カビ取り用の青い洗剤。", "ရေချိုးခန်းသုံး အဖြူရောင်စပရေး၊ အိမ်သာခွက်သုံး အစိမ်းရောင် cleaner နှင့် မှိုသတ်ဆေး အပြာရောင်ဘူး။")),
      photo("assets/routines/toilet-kitchen-main.jpg",
        t("Main toilet setup (kitchen)", "メインのトイレのセットアップ（キッチン横）", "အဓိကအိမ်သာ တင်ဆက်မှု (မီးဖိုချောင်)"),
        t("The main common toilet located adjacent to the kitchen area.", "キッチンエリアに隣接するメインの共有トイレ。", "မီးဖိုချောင်နေရာနှင့် ကပ်လျက်ရှိသော အဓိကဘုံအိမ်သာ။")),
      photo("assets/routines/toilet-master-bedroom.jpg",
        t("Master bedroom toilet setup", "主寝室のトイレのセットアップ", "မာစတာအိပ်ခန်း အိမ်သာ တင်ဆက်မှု"),
        t("The toilet located inside the master bedroom.", "主寝室の中にあるトイレ。", "မာစတာအိပ်ခန်းအတွင်းရှိ အိမ်သာ။"))
    ]),

  routine("rubbish-bin-washing", "weekly", 80, "B", 
    t("Rubbish Bin Washing", "ゴミ箱の洗浄", "အမှိုက်ပုံးဆေးခြင်း"), 
    t("Wash rubbish bins, including the dog waste bin if needed. Dry before putting liners back.", "必要に応じて犬用ゴミ箱を含むゴミ箱を洗います。袋を戻す前に乾燥させます。", "ခွေးအမှိုက်ပုံးအပါအဝင် အမှိုက်ပုံးများကို ဆေးကြောပါ။ အမှိုက်အိတ်မထည့်မီ ခြောက်အောင်ထားပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Prevents smell, stains, and pests.", "臭い、汚れ、および害虫を防ぎます。", "အနံ့ဆိုး၊ အစွန်းအထင်းများနှင့် ပိုးမွှားများကို ကာကွယ်ပေးသည်။"),
      t("Wash the white rubbish bins weekly. Allow them to dry fully before placing a new orange plastic liner bag inside.", "毎週白いゴミ箱を洗ってください。新しいオレンジ色のポリ袋を中に入れる前に、完全に乾燥させてください。", "အဖြူရောင်အမှိုက်ပုံးများကို အပတ်စဉ် ဆေးကြောပေးပါ။ ၎င်းတို့ထဲသို့ လိမ္မော်ရောင်ပလတ်စတစ်အိတ်အသစ် မထည့်မီ လုံးဝခြောက်သွေ့အောင် ထားပါ။")
    ],
    [
      photo("assets/routines/nako-rubbish-bin-washing.jpg",
        t("Washing white rubbish bin", "白いゴミ箱の洗浄", "အဖြူရောင်အမှိုက်ပုံး ဆေးကြောခြင်း"),
        t("Wash the bin clean and dry it before lining it with a new orange plastic bag.", "新しいオレンジ色のビニール袋をセットする前に、ゴミ箱をきれいに洗って乾かしてください。", "အမှိုက်ပုံးကို သန့်ရှင်းအောင်ဆေးပြီး လိမ္မော်ရောင်ပလတ်စတစ်အိတ်အသစ် မစွပ်မီ ခြောက်သွေ့အောင်ထားပါ။"))
    ]),

  routine("pest-check", "weekly", 90, "🐜",
    t("Pest / Ant / Cockroach Check", "害虫/アリ/ゴキブリのチェック", "ပိုးမွှား / ပုရွက်ဆိတ် / ပိုးဟပ် စစ်ဆေးခြင်း"), 
    t("Check kitchen, bins, drains, Nako food area, and under-sink areas for ants, cockroaches, or other pests.", "キッチン、ゴミ箱、排水口、ナコの食事エリア、およびシンクの下のエリアにアリ、ゴキブリ、またはその他の害虫がいないか確認します。", "မီးဖိုချောင်၊ အမှိုက်ပုံး၊ ရေနုတ်မြောင်း၊ Nako အစာကျွေးသည့်နေရာနှင့် စင်အောက်များကို ပုရွက်ဆိတ်၊ ပိုးဟပ် သို့မဟုတ် အခြားပိုးမွှားများရှိမရှိ စစ်ဆေးပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Tell Edwin immediately if pests are seen.", "害虫が見つかった場合は、すぐにエドウィンに報告してください。", "ပိုးမွှားများတွေ့ပါက Edwin ထံ ချက်ချင်းအကြောင်းကြားပါ။"),
      t("Always ensure Nako's treats and food containers on the trolley shelf are sealed tightly to prevent attracting ants or cockroaches.", "アリやゴキブリを引き寄せないように、ワゴンにあるナコのおやつやフードの容器は常にしっかりと密閉されていることを確認してください。", "ပုရွက်ဆိတ် သို့မဟုတ် ပိုးဟပ်များ မဝင်လာစေရန် စင်ပေါ်ရှိ Nako ၏ မုန့်နှင့် အစာဗူးများကို အမြဲတမ်း လုံအောင်ပိတ်ထားပါ။")
    ],
    [
      photo("assets/routines/pest-check-illustration.png",
        t("Pest and cockroach check", "害虫とゴキブリのチェック", "ပိုးမွှားနှင့် ပိုးဟပ် စစ်ဆေးခြင်း"),
        t("Check under the sink, drains, and rubbish bins for any signs of ants or cockroaches.", "流し台の下、排水口、ゴミ箱の周りにアリやゴキブリの形跡がないか確認してください。", "စင်အောက်၊ ရေစီးပေါက်များနှင့် အမှိုက်ပုံးများတွင် ပုရွက်ဆိတ် သို့မဟုတ် ပိုးဟပ်လက္ခဏာများ ရှိမရှိ စစ်ဆေးပါ။")),
      photo("assets/routines/pest-check-treats.jpg",
        t("Dog treats storage shelf check", "おやつ保管棚のチェック", "ခွေးမုန့်များ သိမ်းဆည်းသည့်စင် စစ်ဆေးခြင်း"),
        t("Check treats shelf for ants and ensure all bags/bins are tightly sealed.", "おやつの棚にアリがいないか確認し、すべての袋や容器がしっかりと密閉されていることを確認してください。", "မုန့်စင်တွင် ပုရွက်ဆိတ်ရှိမရှိ စစ်ဆေးပြီး အိတ်/ဗူးများအားလုံး လုံအောင်ပိတ်ထားကြောင်း သေချာပါစေ။"))
    ]),


  routine("floor-mats", "fortnightly", 100, "M",
    t("Floor Mats", "足拭きマット", "ခြေသုတ်ကော်ဇောများ"), 
    t("Wash the 4 floor mats outside the rooms and toilet.", "部屋とトイレの外にある4枚の床マットを洗います。", "အခန်းများနှင့် အိမ်သာအပြင်ဘက်ရှိ ခြေသုတ်ကော်ဇော ၄ ခုကို လျှော်ဖွပ်ပါ။"), 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"),
    [
      t("Dry completely before placing back. Wring or spin-dry mats before hanging them outside. They must not drip onto the downstairs neighbour's clothes.", "完全に乾かしてから戻してください。外に干す前に、しっかり絞るか脱水してください。下の階の洗濯物に水が落ちるため、水が滴る状態で干さないでください。", "ပြန်မထားခင် အပြည့်အဝခြောက်အောင်လုပ်ပါ။ အပြင်တွင် မလှန်းမီ သေချာညှစ်ပါ သို့မဟုတ် spin-dry လုပ်ပါ။ အောက်ထပ်အိမ်နီးချင်း၏ အဝတ်ပေါ် ရေမကျစေရပါ။"),
      t("Floor mats are essential to keep feet clean and prevent dust from spreading. Do not wash all four floor mats at the same time. Wash only two at a time so the living room is never left completely without mats.", "足拭きマットは足を清潔に保ち、ほこりが広がるのを防ぐために不可欠です。リビングルームが完全にマットなしにならないよう、4枚すべてのマットを同時に洗わず、一度に2枚ずつ洗うようにしてください。", "ခြေသုတ်ကော်ဇောများသည် ခြေဖဝါးများကို သန့်ရှင်းစေပြီး ဖုန်မှုန့်များ ပြန့်နှံ့ခြင်းမှ ကာကွယ်ရန် မရှိမဖြစ်လိုအပ်သည်။ ဧည့်ခန်းတွင် ခြေသုတ်ကော်ဇော လုံးဝမရှိဘဲ မဖြစ်စေရန် ခြေသုတ်ကော်ဇော ၄ ခုလုံးကို တစ်ပြိုင်နက် မလျှော်ပါနှင့်။ တစ်ကြိမ်လျှင် ၂ ခုစီသာ လျှော်ပါ။")
    ],
    [
      photo("assets/routines/nako-floor-mat.jpg",
        t("Gray shag floor mat", "グレーのシャギーマット", "မီးခိုးရောင်ခြေသုတ်ကော်ဇော"),
        t("Wipe your feet on this mat to keep them clean. Wash a maximum of two mats at a time.", "足を清潔に保つために、このマットで足を拭いてください。一度に洗うのは最大2枚までにしてください。", "သန့်ရှင်းအောင်ထားရန် ဤကော်ဇောပေါ်တွင် ခြေဖဝါးကို သုတ်ပါ။ တစ်ကြိမ်လျှင် အများဆုံး ၂ ခုသာ လျှော်ပါ။"))
    ]),

  routine("bedrooms-linens", "weekly", 110, "B", 
    t("Bedrooms & Linens", "寝室とシーツ類", "အိပ်ခန်းများနှင့် အိပ်ရာခင်းများ"), 
    t("Change sheets, protector, pillowcases, and bolster covers weekly. Vacuum the mattress and pillows with the dedicated bedding vacuum.", "毎週、シーツ、プロテクター、枕カバー、抱き枕カバーを交換し、寝具専用掃除機でマットレスと枕を掃除します。", "အပတ်စဉ် အိပ်ရာခင်း၊ mattress protector၊ ခေါင်းအုံးစွပ်နှင့် ဖက်လုံးစွပ်များကို လဲပါ။ အိပ်ရာသုံးသီးသန့် ဖုန်စုပ်စက်ဖြင့် မွေ့ရာနှင့် ခေါင်းအုံးများကို ဖုန်စုပ်ပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Always keep at least one protector on the mattress.", "マットレスには必ず少なくとも1枚のプロテクターを付けておいてください。", "မွေ့ရာပေါ်တွင် protector အနည်းဆုံး ၁ ထည် အမြဲထားပါ။"),
      t("Use the dedicated bedding vacuum only on mattresses and pillows.", "寝具専用掃除機はマットレスと枕だけに使用してください。", "အိပ်ရာသုံးသီးသန့် ဖုန်စုပ်စက်ကို မွေ့ရာနှင့် ခေါင်းအုံးများအတွက်သာ သုံးပါ။"),
      t("After fitting the sheet, the mattress must not remain on the white bed-frame handlebar. Tuck the headrest cover in securely.", "シーツを付けた後、マットレスを白いベッドフレームのハンドルバーに載せたままにしないでください。ヘッドレストカバーもしっかり差し込みます。", "အိပ်ရာခင်းတပ်ပြီးနောက် မွေ့ရာကို အဖြူရောင် bed-frame handlebar ပေါ်တွင် မကျန်စေရပါ။ headrest cover ကိုလည်း ခိုင်ခိုင်မာမာ ထိုးထည့်ပါ။")
    ],
    [
      photo("assets/routines/nako-bedrooms-linens-bolster-cover.png",
        t("Putting a clean gray cover on a bolster on the bed", "ベッドの上で抱き枕に清潔なグレーのカバーを付けているところ", "အိပ်ရာပေါ်တွင် ဖက်လုံးကို သန့်ရှင်းသော မီးခိုးရောင်အစွပ် စွပ်နေခြင်း"),
        t("Main weekly reference for changing sheets and putting clean covers on every pillow and bolster.", "毎週、シーツを交換し、すべての枕と抱き枕に清潔なカバーを付けるための主な参考写真です。", "အပတ်စဉ် အိပ်ရာခင်းလဲပြီး ခေါင်းအုံးနှင့် ဖက်လုံးအားလုံးကို သန့်ရှင်းသောအစွပ် တပ်ရန် အဓိကကိုးကားပုံ ဖြစ်သည်။")),
      photo("assets/routines/nako-bedsheets-mattress-protector.jpg",
        t("Mattress protector being changed", "交換中のマットレスプロテクター", "လဲလှယ်နေသော mattress protector"),
        t("2. Wash the used protector, but keep another protector on the mattress.", "2. 使用済みプロテクターを洗い、別のプロテクターをマットレスに付けておきます。", "၂။ အသုံးပြုပြီးသော protector ကိုလျှော်ပြီး အခြား protector တစ်ထည်ကို မွေ့ရာပေါ်တွင် ထားပါ။")),
      photo("assets/routines/nako-bedsheets-dedicated-vacuum.jpg",
        t("Dedicated bedding vacuum on the bare mattress", "むき出しのマットレス上の寝具専用掃除機", "အဖုံးမပါသော မွေ့ရာပေါ်ရှိ အိပ်ရာသုံးသီးသန့် ဖုန်စုပ်စက်"),
        t("3. Vacuum the mattress and pillows. This vacuum is for mattresses and pillows only.", "3. マットレスと枕に掃除機を掛けます。この掃除機はマットレスと枕専用です。", "၃။ မွေ့ရာနှင့် ခေါင်းအုံးများကို ဖုန်စုပ်ပါ။ ဤဖုန်စုပ်စက်သည် မွေ့ရာနှင့် ခေါင်းအုံးများအတွက်သာ ဖြစ်သည်။")),
      photo("assets/routines/nako-bedsheets-sheet-fitted.jpg",
        t("Fresh fitted sheet placed over the mattress", "マットレスに新しいボックスシーツを付けた状態", "မွေ့ရာပေါ်တွင် အိပ်ရာခင်းအသစ် တပ်ထားခြင်း"),
        t("4. Fit the clean sheet and change all pillowcases and bolster covers.", "4. 清潔なシーツを付け、枕カバーと抱き枕カバーをすべて交換します。", "၄။ သန့်ရှင်းသော အိပ်ရာခင်းကိုတပ်ပြီး ခေါင်းအုံးစွပ်နှင့် ဖက်လုံးစွပ်အားလုံးကို လဲပါ။")),
      photo("assets/routines/nako-bedsheets-changing-bolster-cover.jpg",
        t("Putting a clean cover on a bolster", "抱き枕に清潔なカバーを付けているところ", "ဖက်လုံးကို သန့်ရှင်းသောအစွပ် တပ်နေခြင်း"),
        t("Change every pillowcase and bolster cover. Pull each clean cover fully on and straighten the fabric.", "枕カバーと抱き枕カバーをすべて交換し、清潔なカバーを奥までしっかり付けて布を整えます。", "ခေါင်းအုံးစွပ်နှင့် ဖက်လုံးစွပ်အားလုံးကို လဲပါ။ သန့်ရှင်းသောအစွပ်တစ်ခုစီကို အဆုံးထိ သေချာစွပ်ပြီး အထည်ကို ဖြောင့်အောင်လုပ်ပါ။")),
      photo("assets/routines/nako-bedsheets-mattress-tilted.jpg",
        t("Heavy King Koil mattress tilted onto the white bed-frame handlebar", "重いKing Koilマットレスを白いベッドフレームのハンドルバーに傾けた状態", "လေးသော King Koil မွေ့ရာကို အဖြူရောင် bed-frame handlebar ပေါ် စောင်းတင်ထားခြင်း"),
        t("5. For The Knight Super King mattress (183 × 198 cm), tilt it onto the handlebar to fit the hard-to-reach corner.", "5. The Knightスーパーキング（183 × 198 cm）は、届きにくい角にシーツを付けるためハンドルバーに傾けます。", "၅။ The Knight Super King မွေ့ရာ (183 × 198 cm) ၏ လက်လှမ်းမမီသောထောင့်ကို ခင်းရန် handlebar ပေါ်သို့ စောင်းတင်ပါ။")),
      photo("assets/routines/nako-bedsheets-headrest-cover.jpg",
        t("Finished bed with the headrest cover tucked in", "ヘッドレストカバーを差し込んだ完成後のベッド", "headrest cover ကို ထိုးထည့်ပြီး ပြီးစီးသော အိပ်ရာ"),
        t("6. Push the mattress fully back off the handlebar and tuck the headrest cover in so it cannot flop down.", "6. マットレスをハンドルバーから完全に戻し、ヘッドレストカバーが垂れないようしっかり差し込みます。", "၆။ မွေ့ရာကို handlebar ပေါ်မှ အပြည့်ပြန်တွန်းပြီး headrest cover ပြုတ်ကျမလာစေရန် ခိုင်ခိုင်မာမာ ထိုးထည့်ပါ။")),
      photo("assets/routines/nako-bedsheets-weekly-wash.jpg",
        t("LG washing machine with used blankets and pillowcases ready for the weekly linen wash", "週1回の寝具洗濯用に、使用済みの毛布と枕カバーをLG洗濯機の前に用意した状態", "အပတ်စဉ် အိပ်ရာခင်းများလျှော်ရန် အသုံးပြုပြီးသော စောင်နှင့် ခေါင်းအုံးစွပ်များကို LG အဝတ်လျှော်စက်ရှေ့တွင် ပြင်ထားပုံ"),
        t("Weekly linen wash: wash the used bedsheet, blankets, pillowcases, and bolster covers.", "週1回の寝具洗濯では、使用済みのシーツ、毛布、枕カバー、抱き枕カバーを洗います。", "အပတ်စဉ် အိပ်ရာခင်းလျှော်သည့်အခါ အသုံးပြုပြီးသော အိပ်ရာခင်း၊ စောင်၊ ခေါင်းအုံးစွပ်နှင့် ဖက်လုံးစွပ်များကို လျှော်ပါ။"))
    ]),

  routine("windows-glass-mirrors", "fortnightly", 120, "G",
    t("Windows, Glass Panels & Mirrors", "窓、ガラス窓、鏡", "ပြတင်းပေါက်များ၊ မှန်ချပ်များနှင့် မှန်များ"), 
    t("Clean only the safe interior side of windows, glass panels, mirrors, window sills, frames, and tracks.", "窓、ガラスパネル、鏡、窓枠、サッシ、レールは安全な室内側だけ掃除します。", "ပြတင်းပေါက်၊ glass panel၊ မှန်၊ window sill၊ frame နှင့် track များကို လုံခြုံသော အတွင်းဘက်သာ သန့်ရှင်းပါ။"),
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"),
    [
      t("Never clean exterior or outside-facing windows.", "外側・屋外側の窓は絶対に掃除しないでください。", "အပြင်ဘက် သို့မဟုတ် exterior window ကို လုံးဝမသန့်ရှင်းပါနှင့်။"),
      t("Do not reach outside, lean out, climb, stand on stools or chairs, or unlock or remove grilles to clean windows. Ask Edwin if unsure.", "窓掃除のために、外へ手を伸ばす、身を乗り出す、登る、椅子や踏み台に立つ、窓グリルを開ける・外すことは禁止です。不明な場合はEdwinに確認してください。", "ပြတင်းပေါက်သန့်ရှင်းရန် အပြင်သို့ လက်မလှမ်း၊ ကိုယ်မယောင်း၊ မတက်၊ ခုံပေါ်မတက်၊ grille ကို မဖွင့် သို့မဟုတ် မဖြုတ်ပါနှင့်။ မသေချာပါက Edwin ကိုမေးပါ။"),
      t("Keep window tracks and edges clear of dust and grime. Clean all mirrors and glass surfaces regularly.", "窓の溝や端にほこりや汚れが溜まらないようにしてください。すべての鏡やガラス面を定期的に掃除してください。", "ပြတင်းပေါက်လမ်းကြောင်းများနှင့် အနားသတ်များတွင် ဖုန်မှုန့်နှင့် ဂျီးများကင်းစင်အောင် ထားပါ။ မှန်များနှင့် ဖန်သားပြင်အားလုံးကို ပုံမှန်သန့်ရှင်းရေးလုပ်ပါ။")
    ],
    [
      photo("assets/routines/nako-windows-glass-mirrors.jpg",
        t("Windows and frames placeholder", "窓と窓枠のプレースホルダー", "ပြတင်းပေါက်များနှင့် ဘောင်များ နေရာယူပစ္စည်း"),
        t("Every two weeks, wipe only the safe interior frames, tracks, and glass panes.", "2週間おきに、安全な室内側の窓枠、溝、ガラス板だけを拭いてください。", "၂ ပတ်တစ်ကြိမ် လုံခြုံသော အတွင်းဘက် frame၊ track နှင့် glass pane များကိုသာ သုတ်ပါ။"))
    ]),

  routine("sofa-covers-pillows", "fortnightly", 130, "S",
    t("Sofa Covers & Pillows", "ソファカバーとクッション", "ဆိုဖာစွပ်များနှင့် ခေါင်းအုံးများ"), 
    t("Vacuum the sofa and its 2 small square pillows. Wash the 2 sofa covers and the 2 pillows.", "ソファと小さい正方形のクッション2個に掃除機を掛けます。ソファカバー2枚とクッション2個を洗います。", "ဆိုဖာနှင့် စတုရန်းပုံစံ ဆိုဖာခေါင်းအုံးအသေး ၂ ခုကို ဖုန်စုပ်ပါ။ ဆိုဖာစွပ် ၂ ခုနှင့် ခေါင်းအုံး ၂ ခုကို လျှော်ပါ။"), 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"),
    [
      t("Before washing, use the dedicated bedding vacuum on the sofa surface, seams, gaps, and both small square sofa pillows.", "洗う前に、寝具専用掃除機でソファの表面、縫い目、隙間、小さい正方形のクッション2個を掃除します。", "မလျှော်မီ အိပ်ရာသုံးသီးသန့် ဖုန်စုပ်စက်ဖြင့် ဆိုဖာမျက်နှာပြင်၊ ချုပ်ရိုး၊ ကြားနေရာများနှင့် စတုရန်းပုံစံ ခေါင်းအုံးအသေး ၂ ခုကို ဖုန်စုပ်ပါ။"),
      t("Dry fully before putting back to prevent damp smell.", "生乾きの臭いを防ぐため、元に戻す前に完全に乾かしてください。", "စိုထိုင်းသောအနံ့ဆိုးများမထွက်စေရန် ပြန်မစွပ်မီ ခြောက်သွေ့အောင် ထားပါ။"),
      t("Wash the sofa covers and pillowcases every two weeks. If they become dirty or smell before then, wash them sooner.", "ソファカバーとクッションカバーは2週間おきに洗います。その前に汚れたり臭いが出たりした場合は、早めに洗ってください。", "ဆိုဖာစွပ်နှင့် ခေါင်းအုံးစွပ်များကို ၂ ပတ်တစ်ကြိမ် လျှော်ပါ။ ထိုအချိန်မတိုင်မီ ညစ်ပတ်လာပါက သို့မဟုတ် အနံ့ထွက်လာပါက စောစောလျှော်ပါ။")
    ],
    [
      photo("assets/routines/nako-sofa-covers.jpg",
        t("Sofa covers and square pillows", "ソファカバーとクッション", "ဆိုဖာစွပ်များနှင့် ခေါင်းအုံးများ"),
        t("Wash these sofa covers and the small square pillows regularly.", "これらのソファカバーと小さな正方形のクッションを定期的に洗ってください。", "ဤဆိုဖာစွပ်များနှင့် ခေါင်းအုံးစတုရန်းပုံစံအသေးစားများကို ပုံမှန်လျှော်ပေးပါ။")),
      photo("assets/routines/nako-sofa-covers-pillows-vacuum.png",
        t("Dedicated bedding vacuum for the sofa and sofa pillows", "ソファとソファクッション用の寝具専用掃除機", "ဆိုဖာနှင့် ဆိုဖာခေါင်းအုံးအတွက် အိပ်ရာသုံးသီးသန့် ဖုန်စုပ်စက်"),
        t("Vacuum the sofa surface, seams, gaps, and both small square pillows before washing the covers and pillows.", "カバーとクッションを洗う前に、ソファの表面、縫い目、隙間、小さい正方形のクッション2個に掃除機を掛けます。", "ဆိုဖာစွပ်နှင့် ခေါင်းအုံးများကို မလျှော်မီ ဆိုဖာမျက်နှာပြင်၊ ချုပ်ရိုး၊ ကြားနေရာများနှင့် စတုရန်းပုံစံ ခေါင်းအုံးအသေး ၂ ခုကို ဖုန်စုပ်ပါ။"))
    ]),

  routine("ceiling-fan", "weekly", 140, "F", 
    t("Ceiling Fan Cleaning", "天井扇の掃除", "မျက်နှာကျက်ပန်ကာ သန့်ရှင်းရေး"), 
    t("Clean and wipe ceiling fan blades and accessible fan surfaces.", "天井扇の羽根と手の届くファン表面を掃除し、拭きます。", "မျက်နှာကျက်ပန်ကာ အတောင်ပံများနှင့် လက်လှမ်းမီသော ပန်ကာမျက်နှာပြင်များကို သန့်ရှင်းရေးလုပ်ပြီး သုတ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Turn off the fan at the wall switch and wait until the blades stop. Wear a mask because dust may fall.", "壁のスイッチでファンを切り、羽根が止まるまで待ってください。ほこりが落ちるため、マスクを着けてください。", "နံရံ switch မှာ fan ကိုပိတ်ပြီး အတောင်တွေ ရပ်သွားတဲ့အထိ စောင့်ပါ။ ဖုန်ကျနိုင်လို့ mask တပ်ပါ။"),
      t("Put the black stepladder on a flat, dry floor. Open it fully and check that it is stable.", "黒い脚立を平らで乾いた床に置きます。完全に開き、安定していることを確認してください。", "အနက်ရောင် stepladder ကို ညီပြီးခြောက်တဲ့ ကြမ်းပြင်ပေါ်ထားပါ။ အပြည့်ဖွင့်ပြီး တည်ငြိမ်တာကို စစ်ပါ။"),
      t("Do not stand on the top step or reach too far. Move the ladder instead. If it feels unstable, stop and ask someone to hold it.", "一番上の段に立ったり、無理に手を伸ばしたりしないでください。脚立を移動してください。不安定なら中止し、誰かに支えてもらってください。", "အပေါ်ဆုံးအဆင့်မှာ မရပ်ပါနဲ့။ အဝေးကြီး လက်မလှမ်းပါနဲ့။ လှေကားကို ရွှေ့ပါ။ မတည်ငြိမ်ရင် ရပ်ပြီး တစ်ယောက်ယောက်ကို ကိုင်ပေးဖို့ တောင်းပါ။"),
      t("For very dirty or dusty fan areas, use the separate dirty-area cloth with standard Magiclean disinfectant. Do not use a normal household cleaning cloth.", "天井扇周辺が非常に汚れている、またはほこりが多い場合は、汚れた場所専用の布と通常のマジックリン除菌スプレーを使ってください。普段の掃除用布は使わないでください。", "ceiling fan နေရာက အရမ်းညစ်ပတ် သို့မဟုတ် ဖုန်ထူရင် အညစ်အကြေးနေရာသုံး သီးသန့်အဝတ်နဲ့ standard Magiclean disinfectant ကို သုံးပါ။ ပုံမှန်အိမ်သန့်ရှင်းရေးအဝတ်ကို မသုံးပါနဲ့။"),
      t("Use a damp cloth or specialized duster to clean the fan blades weekly to prevent dust buildup.", "ほこりの蓄積を防ぐため、湿らせた布や専用のダスターを使用して、毎週ファンの羽根を掃除してください。", "ဖုန်မှုန့်များ စုပုံခြင်းမှ ကာကွယ်ရန် စိုစွတ်သောအဝတ် သို့မဟုတ် သီးသန့်ဖုန်သုတ်တံကို အသုံးပြု၍ ပန်ကာအတောင်ပံများကို အပတ်စဉ် သန့်ရှင်းရေးလုပ်ပါ။")
    ],
    [
      photo("assets/routines/nako-ceiling-fan.jpg",
        t("Ceiling fan setup", "天井扇のセットアップ", "မျက်နှာကျက်ပန်ကာ တင်ဆက်မှု"),
        t("Wipe fan blades regularly to keep them dust-free.", "ほこりが溜まらないように、定期的にファンの羽根を拭いてください。", "ဖုန်မှုန့်များကင်းစင်စေရန် ပန်ကာအတောင်ပံများကို ပုံမှန်သုတ်ပေးပါ။")),
      photo("assets/routines/separate-cloth-magiclean-dirty-areas.jpg",
        t("Separate dirty-area cloth and Magiclean disinfectant beside luggage wheels", "スーツケースの車輪の横にある汚れた場所専用の布とマジックリン除菌スプレー", "luggage ဘီးဘေးရှိ အညစ်အကြေးနေရာသုံး သီးသန့်အဝတ်နှင့် Magiclean disinfectant"),
        t("Use this separate cloth with standard Magiclean disinfectant when ceiling-fan areas are very dirty or dusty. Do not use the normal household cloth.", "天井扇周辺が非常に汚れている、またはほこりが多い時は、この専用布と通常のマジックリン除菌スプレーを使います。普段の掃除用布は使いません。", "ceiling fan နေရာက အရမ်းညစ်ပတ် သို့မဟုတ် ဖုန်ထူရင် ဒီသီးသန့်အဝတ်နဲ့ standard Magiclean disinfectant ကို သုံးပါ။ ပုံမှန်အိမ်သန့်ရှင်းရေးအဝတ်ကို မသုံးပါနဲ့။"))
    ]),
  routine("fridge-interior", "monthly", 150, "F",
    t("Fridge Interior Cleaning", "冷蔵庫内の掃除", "ရေခဲသေတ္တာအတွင်းပိုင်း သန့်ရှင်းရေး"), 
    t("Remove items from the fridge, wipe inside surfaces and shelves, then put everything back neatly.", "冷蔵庫から品物を取り出し、内側の表面と棚を拭き、すべてをきれいに戻します。", "ရေခဲသေတ္တာထဲမှ ပစ္စည်းများကို ထုတ်ပါ၊ အတွင်းပိုင်းမျက်နှာပြင်များနှင့် စင်များကို သုတ်ပါ၊ ထို့နောက် အားလုံးကို သပ်သပ်ရပ်ရပ် ပြန်ထည့်ပါ။"),
    t("Monthly", "毎月", "လစဉ်"),
    [
      t("Check for expired, leaking, or spoiled food. Keep all food covered.", "期限切れ、液漏れ、傷んだ食品がないか確認してください。食品はすべて覆って保管してください。", "သက်တမ်းကုန်၊ ယိုနေ သို့မဟုတ် ပုပ်နေတဲ့အစားအစာ ရှိမရှိ စစ်ပါ။ အစားအစာအားလုံးကို ဖုံးထားပါ။"),
      t("Do not put a large pot or a large amount of steaming-hot food directly in the fridge. Divide it into small, shallow containers. Let heavy steam reduce briefly, then refrigerate within 2 hours; do not wait until completely cold.", "大きな鍋や大量の熱々の料理をそのまま冷蔵庫に入れないでください。小さく浅い容器に分け、強い湯気が少し落ち着いたら2時間以内に冷蔵します。完全に冷えるまで待たないでください。", "အိုးကြီး သို့မဟုတ် အငွေ့ထွက်နေတဲ့ ပူပူနွေးနွေးအစားအစာအများကြီးကို fridge ထဲ တိုက်ရိုက်မထည့်ပါနဲ့။ သေးပြီးတိမ်တဲ့ဘူးတွေထဲ ခွဲထည့်ပါ။ အငွေ့ပြင်းတာ နည်းနည်းလျော့ရင် ၂ နာရီအတွင်း fridge ထဲထည့်ပါ။ လုံးဝအေးတဲ့အထိ မစောင့်ပါနဲ့။"),
      t("Close the fridge fully, avoid keeping it open long, aim for 5-10 seconds, and close it immediately if it beeps.", "冷蔵庫を完全に閉め、長時間開けたままにしないようにしてください（5〜10秒目安）。警告音が鳴ったらすぐに閉めてください。", "ရေခဲသေတ္တာတံခါးကို လုံအောင်ပိတ်ပါ၊ အချိန်အကြာကြီး ဖွင့်မထားပါနှင့် (၅-၁၀ စက္ကန့်ခန့်သာ ဖွင့်ရန်)၊ အသံမြည်ပါက ချက်ချင်းပြန်ပိတ်ပါ။"),
      t("Keep condiments, jars, and bottles neatly arranged on the side shelves and inside compartments.", "調味料、瓶、ボトル類は、ドアポケットや庫内の仕切りにきれいに整理して保管してください。", "ဟင်းခတ်အမွှေးအကြိုင်များ၊ ဗူးများနှင့် ပုလင်းများကို ဘေးစင်များနှင့် အတွင်းအကန့်များတွင် သပ်သပ်ရပ်ရပ် စီစဉ်ထားပါ။")
    ],
    [
      photo("assets/routines/nako-fridge-interior.jpg",
        t("Fridge interior setup", "冷蔵庫内のセットアップ", "ရေခဲသေတ္တာအတွင်းပိုင်း တင်ဆက်မှု"),
        t("Organize jars, bottles, and storage containers neatly on shelves.", "棚の上の瓶、ボトル、保存容器をきれいに整理整頓してください。", "စင်ပေါ်ရှိ ဗူးများ၊ ပုလင်းများနှင့် သိုလှောင်ဗူးများကို သပ်သပ်ရပ်ရပ် စီစဉ်ထားပါ။"))
    ]),

  routine("cleaning-tools", "fortnightly", 160, "C",
    t("Cleaning Tools Maintenance", "掃除用具の手入れ", "သန့်ရှင်းရေးသုံးပစ္စည်းများ ထိန်းသိမ်းခြင်း"), 
    t("Wash mop heads, rinse buckets, clean vacuum filters or parts as needed, replace dirty sponges, and dry cloths properly.", "モップの頭を洗い、バケツをすすぎ、必要に応じて掃除機のフィルターや部品を掃除し、汚れたスポンジを交換し、雑巾を適切に乾かします。", "မော်ပုခေါင်းများကို လျှော်ပါ၊ ပုံးများကို ဆေးကြောပါ၊ လိုအပ်သလို ဖုန်စုပ်စက်ဇကာများ သို့မဟုတ် အစိတ်အပိုင်းများကို သန့်ရှင်းရေးလုပ်ပါ၊ ညစ်ပတ်သော ရေမြှုပ်များကို လဲလှယ်ပါ၊ အဝတ်များကို ခြောက်အောင်ထားပါ။"),
    t("Fortnightly + as needed", "2週間に1回＋必要に応じて", "နှစ်ပတ်တစ်ကြိမ် + လိုအပ်သလို"),
    [
      t("Dirty cleaning tools spread smell and dirt instead of cleaning properly.", "汚れた掃除用具は、適切に掃除する代わりに臭いや汚れを広げてしまいます。", "ညစ်ပတ်သော သန့်ရှင်းရေးပစ္စည်းများသည် ကောင်းမွန်စွာသန့်ရှင်းပေးမည့်အစား အနံ့ဆိုးများနှင့် ဖုန်မှုန့်များကို ပြန့်နှံ့စေသည်။"),
      t("Reserve a separate cloth for very dirty or dusty surfaces such as ceiling-fan areas and luggage wheels. Use it with standard Magiclean disinfectant. Keep it separate from normal cloths; after use, wash it and return it to its designated place or hanging rack.", "天井扇周辺やスーツケースの車輪など、非常に汚れた・ほこりの多い場所には専用の布を使ってください。通常のマジックリン除菌スプレーと一緒に使い、普段の布と分けて保管します。使用後は洗い、決められた場所またはラックへ戻してください。", "ceiling fan နေရာနှင့် luggage ဘီးများကဲ့သို့ အရမ်းညစ်ပတ် သို့မဟုတ် ဖုန်ထူသောနေရာများအတွက် သီးသန့်အဝတ်ထားပါ။ standard Magiclean disinfectant နှင့်အတူသုံးပြီး ပုံမှန်အဝတ်များနှင့် ခွဲထားပါ။ သုံးပြီးပါက ဆေးပြီး သတ်မှတ်ထားသောနေရာ သို့မဟုတ် hanging rack သို့ ပြန်ထားပါ။"),
      t("Regularly check the vacuum cleaner parts and replace dirty filters using the replacement filter packs stored on the shelf.", "定期的に掃除機の部品を点検し、棚に保管されている予備のフィルターパックを使用して、汚れたフィルターを交換してください。", "ဖုန်စုပ်စက်၏ အစိတ်အပိုင်းများကို ပုံမှန်စစ်ဆေးပြီး စင်ပေါ်တွင် သိမ်းဆည်းထားသော အပို filter packs များကို အသုံးပြု၍ ညစ်ပတ်သော filter များကို လဲလှယ်ပါ။")
    ],
    [
      photo("assets/routines/nako-cleaning-tools-maintenance.jpg",
        t("Vacuum cleaner and filter parts", "掃除機とフィルター部品", "ဖုန်စုပ်စက်နှင့် filter အစိတ်အပိုင်းများ"),
        t("Store the handheld vacuums and filter replacements neatly on this shelf.", "ハンディ掃除機と予備のフィルターはこの棚にきれいに保管してください。", "လက်ကိုင်ဖုန်စုပ်စက်နှင့် အပို filter များကို ဤစင်ပေါ်တွင် သပ်သပ်ရပ်ရပ် သိမ်းဆည်းထားပါ။")),
      photo("assets/routines/separate-cloth-magiclean-dirty-areas.jpg",
        t("Separate cloth and Magiclean disinfectant for very dirty areas", "非常に汚れた場所専用の布とマジックリン除菌スプレー", "အရမ်းညစ်ပတ်တဲ့နေရာသုံး သီးသန့်အဝတ်နှင့် Magiclean disinfectant"),
        t("Keep this cloth separate for very dirty or dusty surfaces. Use it with standard Magiclean disinfectant, then wash it and return it to its designated place or hanging rack.", "この布は、非常に汚れた・ほこりの多い場所専用に分けておきます。通常のマジックリン除菌スプレーと一緒に使い、使用後は洗って決められた場所またはラックへ戻します。", "ဒီအဝတ်ကို အရမ်းညစ်ပတ် သို့မဟုတ် ဖုန်ထူတဲ့နေရာများအတွက် သီးသန့်ထားပါ။ standard Magiclean disinfectant နဲ့ သုံးပြီး သုံးပြီးပါက ဆေးကာ သတ်မှတ်ထားသောနေရာ သို့မဟုတ် hanging rack သို့ ပြန်ထားပါ။"))
    ]),

  routine("blanket-washing", "fortnightly", 10, "B", 
    t("Blanket Washing", "毛布の洗濯", "စောင်လျှော်ခြင်း"), 
    t("Wash thicker blankets one at a time so one blanket is always available for use.", "厚手の毛布を1枚ずつ洗い、常に1枚の毛布を使用できるようにします。", "အမြဲတမ်းသုံးရန် စောင်တစ်ထည် အဆင်သင့်ရှိနေစေရန် ထူထဲသော စောင်များကို တစ်ကြိမ်လျှင် တစ်ထည်စီ လျှော်ပါ။"), 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"), 
    t("Do not wash both blankets on the same day.", "同じ日に両方の毛布を洗わないでください。", "စောင်နှစ်ထည်လုံးကို တစ်ရက်တည်းတွင် မလျှော်ပါနှင့်။")),
  routine("outside-shoe-rack", "monthly", 18, "S",
    t("Outside Shoe Rack & Shoes", "屋外のシューズラックと靴", "အပြင်ဘက် ဖိနပ်စင်နှင့် ဖိနပ်များ"), 
    t("Clean the outside shoe rack and surrounding area. Wipe down the shoes.", "屋外のシューズラックとその周辺エリアを掃除します。靴を拭きます。", "အပြင်ဘက် ဖိနပ်စင်နှင့် ပတ်ဝန်းကျင်နေရာကို သန့်ရှင်းရေးလုပ်ပါ။ ဖိနပ်များကို သုတ်ပါ။"), 
    t("Monthly", "毎月", "လစဉ်"),
    t("Keep the area neat, avoid blocking the corridor, and let shoes dry fully before putting them back.", "周辺をきれいに保ち、廊下を塞がず、靴は完全に乾かしてから戻してください。", "နေရာကို သပ်ရပ်စွာထားပြီး corridor မပိတ်ပါနှင့်။ ဖိနပ်များကို ပြန်မထားခင် အပြည့်အဝခြောက်အောင်ထားပါ။")),
  routine("curtain-steaming", "monthly", 30, "C",
    t("Curtain Steaming", "カーテンのスチーム掛け", "လိုက်ကာများကို မီးပူတိုက်ခြင်း"), 
    t("Use the standing garment steamer / steam iron to steam-clean and freshen the curtains.", "立位式の衣類スチーマー/スチームアイロンを使用して、カーテンをスチームクリーニングし、リフレッシュします。", "လိုက်ကာများကို သန့်ရှင်းလတ်ဆတ်စေရန် မီးပူရပ်တိုင် / ရေနွေးငွေ့မီးပူကို အသုံးပြု၍ သန့်ရှင်းရေးလုပ်ပါ။"), 
    t("Monthly", "毎月", "လစဉ်"),
    t("Move slowly so the steam heats the fabric properly. Be careful with hot steam.", "スチームが生地にしっかりと熱を伝えるようにゆっくり動かしてください。熱いスチームに注意してください。", "ရေနွေးငွေ့က ပိတ်စကို ကောင်းမွန်စွာ အပူပေးနိုင်ရန် ဖြည်းဖြည်းချင်း ရွှေ့ပါ။ ပူပြင်းသော ရေနွေးငွေ့ကို သတိထားပါ။")),
  routine("ikea-bed-frame", "quarterly", 40, "B",
    t("IKEA Bed Frame Under-Compartment Cleaning", "IKEAベッドフレーム下部の掃除", "IKEA ကုတင်အောက်ခြေ သန့်ရှင်းရေး"), 
    t("Lift/open the IKEA king-size bed frame storage area and clean dust and hair collected underneath.", "IKEAキングサイズベッドフレームの収納エリアを持ち上げ/開き、下に溜まったほこりや髪の毛を掃除します。", "IKEA ကင်းဆိုက်ကုတင်အောက် သိုလှောင်မှုနေရာကို မ/ဖွင့်ပြီး အောက်တွင် စုပုံနေသော ဖုန်မှုန့်များနှင့် ဆံပင်များကို သန့်ရှင်းရေးလုပ်ပါ။"), 
    t("Quarterly / every 3 months", "3ヶ月おき / 3ヶ月ごと", "၃ လတစ်ကြိမ် / ၃ လတစ်ခါ"),
    t("Be careful when lifting or opening the bed frame.", "ベッドフレームを持ち上げたり開いたりするときは注意してください。", "ကုတင်ဘောင်ကို မတင်သည့်အခါ သို့မဟုတ် ဖွင့်သည့်အခါ သတိထားပါ။")),
  routine("microwave-interior", "weekly", 10, "M",
    t("Microwave Interior Wipe", "電子レンジ内部の拭き取り", "မိုက်ခရိုဝေ့ဖ်အတွင်းပိုင်း သုတ်ခြင်း"), 
    t("Wipe the microwave after food splatters. Do a complete wipe every week even if it looks clean.", "食品が飛び散った後は電子レンジの内部を拭きます。きれいに見えても毎週全体を拭き掃除します。", "အစားအစာစင်ပါက မိုက်ခရိုဝေ့ဖ်အတွင်းပိုင်းကို သုတ်ပါ။ သန့်ရှင်းနေသော်လည်း အပတ်စဉ် အတွင်းပိုင်းတစ်ခုလုံးကို သုတ်ပါ။"),
    t("After use if dirty + weekly", "汚れた場合は使用後＋毎週", "ညစ်ပတ်ပါက အသုံးပြုပြီးနောက် + အပတ်စဉ်"),
    t("Clean spills early so stains and smells do not set.", "シミや臭いが定着しないよう、こぼれたものは早めに掃除してください。", "အစွန်းအထင်းနှင့် အနံ့ဆိုးများ မကျန်စေရန် စောစောစီးစီး သန့်ရှင်းရေးလုပ်ပါ။")),
  routine("ninja-af141-air-fryer-interior-deep-clean", "weekly", 15, "A",
    t("Ninja AF141 Air Fryer Interior Deep Clean", "Ninja AF141 エアフライヤー内部の徹底掃除", "Ninja AF141 air fryer အတွင်းပိုင်း deep clean"),
    t("Deep clean the fixed interior walls, ceiling, and heating coil of the Ninja AF141 Air Fryer without pouring or spraying water inside.", "Ninja AF141エアフライヤーの固定された内部壁、天井、ヒーターコイルを、本体内に水を注いだりスプレーしたりせずに徹底掃除します。", "Ninja AF141 air fryer ၏ အတွင်းနံရံ၊ အပေါ်မျက်နှာပြင်နှင့် အပူပေး coil ကို အထဲသို့ ရေလောင်းခြင်း သို့မဟုတ် ဖြန်းခြင်းမလုပ်ဘဲ သန့်ရှင်းရေးအကြီးစားလုပ်ပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"),
    [
      t("Switch off the Ninja AF141, unplug it, and let it cool completely.", "Ninja AF141の電源を切り、プラグを抜き、完全に冷まします。", "Ninja AF141 ကို ပိတ်၊ plug ဖြုတ်ပြီး လုံးဝအေးသွားအောင် စောင့်ပါ။"),
      t("Use a slightly damp cleaning cloth to wipe the inside walls and ceiling.", "少し湿らせた掃除布で、内部の壁と天井を拭きます。", "အနည်းငယ်စိုသော သန့်ရှင်းရေးအဝတ်ဖြင့် အတွင်းနံရံနှင့် အပေါ်မျက်နှာပြင်ကို သုတ်ပါ။"),
      t("Gently wipe around the heating coil. Do not pull or bend the coil.", "ヒーターコイルの周りを優しく拭きます。コイルを引っ張ったり曲げたりしないでください。", "အပူပေး coil ပတ်လည်ကို ညင်သာစွာ သုတ်ပါ။ coil ကို မဆွဲ၊ မကွေးပါနှင့်။"),
      t("Wipe the interior again with a clean damp cloth.", "清潔な湿らせた布で、内部をもう一度拭きます。", "သန့်ရှင်းသော စိုစွတ်သည့်အဝတ်ဖြင့် အတွင်းပိုင်းကို ထပ်သုတ်ပါ။"),
      t("Leave the air fryer open until the interior is completely dry.", "内部が完全に乾くまで、エアフライヤーを開けたままにします。", "အတွင်းပိုင်း လုံးဝခြောက်သွားသည်အထိ air fryer ကို ဖွင့်ထားပါ။"),
      t("Do not pour or spray water inside the air fryer.", "エアフライヤーの内部に水を注いだり、直接スプレーしたりしないでください。", "air fryer အတွင်းသို့ ရေမလောင်း၊ တိုက်ရိုက်မဖြန်းပါနှင့်။"),
      t("Do not use bleach, oven cleaner, or metal scrubbers.", "漂白剤、オーブンクリーナー、金属たわしは使わないでください。", "bleach၊ oven cleaner သို့မဟုတ် သံပွတ်တံကို မသုံးပါနှင့်။"),
      t("This weekly task is for the fixed interior and heating coil. Continue cleaning removable oily parts after use under Clean Up & Cooking Appliances.", "この毎週の作業は、固定された内部とヒーターコイル用です。取り外せる油汚れ部品は、使用後に「片付けと調理器具の清掃」で引き続き洗ってください。", "ဤအပတ်စဉ်အလုပ်သည် ဖြုတ်မရသောအတွင်းပိုင်းနှင့် အပူပေး coil အတွက် ဖြစ်သည်။ ဖြုတ်လို့ရသော ဆီပေပစ္စည်းများကို သုံးပြီးတိုင်း Clean Up & Cooking Appliances အလုပ်အတိုင်း ဆက်လက်သန့်ရှင်းပါ။")
    ],
    [
      photo("assets/routines/ninja-af141-air-fryer-interior.jpg",
        t("Inside of the Ninja AF141 Air Fryer showing the heating coil", "ヒーターコイルが見えるNinja AF141エアフライヤー内部", "အပူပေး coil ကို မြင်ရသော Ninja AF141 air fryer အတွင်းပိုင်း"),
        t("Use this photo to identify the interior ceiling and heating coil. Wipe gently without pulling or bending the coil.", "この写真で内部の天井とヒーターコイルを確認します。コイルを引っ張ったり曲げたりせず、優しく拭いてください。", "ဤပုံဖြင့် အတွင်းအပေါ်မျက်နှာပြင်နှင့် အပူပေး coil ကို ကြည့်ပါ။ coil ကို မဆွဲ၊ မကွေးဘဲ ညင်သာစွာ သုတ်ပါ။"))
    ]),
  routine("fujioh-hood-deep-clean", "monthly", 17, "H",
    t("Fujioh Hood FR-FS2290RP Deep Clean", "Fujioh レンジフード FR-FS2290RP 徹底掃除", "Fujioh Hood FR-FS2290RP အကြီးစားသန့်ရှင်းရေး"),
    t("Deep clean the removable oil tray and metal filters, then wipe all safe, accessible hood surfaces.", "取り外せるオイルトレーと金属フィルターを徹底洗浄し、安全に手が届くレンジフード表面を拭きます。", "ဖြုတ်နိုင်သော ဆီခံ tray နှင့် သတ္တု filter များကို သေချာဆေးပြီး လက်လှမ်းမီသော hood မျက်နှာပြင်များကို သုတ်ပါ။"),
    t("Monthly", "毎月", "လစဉ်"),
    t("Do not spray directly inside, wet the motor or wiring, use strong cleaners, or remove the internal fan.", "内部へ直接スプレーしたり、モーターや配線を濡らしたり、強力な洗剤を使ったり、内部ファンを外したりしないでください。", "အတွင်းသို့ တိုက်ရိုက်မဖြန်းပါနှင့်။ motor သို့မဟုတ် wiring ကို မစိုပါနှင့်။ ပြင်းသောသန့်စင်ဆေး မသုံးပါနှင့်။ အတွင်း fan ကို မဖြုတ်ပါနှင့်။"),
    [
      photo("assets/routines/fujioh-fr-fs2290rp-hood-deep-clean.jpg",
        t("Fujioh FR-FS2290RP hood with the white panel open", "白いパネルを開けたFujioh FR-FS2290RPレンジフード", "အဖြူရောင် panel ဖွင့်ထားသော Fujioh FR-FS2290RP hood"),
        t("Open the white panel to reach the oil tray and removable metal filter. Do not remove the internal fan.", "白いパネルを開けてオイルトレーと取り外し可能な金属フィルターを確認します。内部ファンは外さないでください。", "ဆီခံ tray နှင့် ဖြုတ်နိုင်သော သတ္တု filter ကို ရောက်ရန် အဖြူရောင် panel ကို ဖွင့်ပါ။ အတွင်း fan ကို မဖြုတ်ပါနှင့်။"))
    ]),
  routine("general-surface-cleaning", "monthly", 20, "S", 
    t("General Surface Cleaning", "一般的な表面の掃除", "ယေဘုယျမျက်နှာပြင်များ သန့်ရှင်းရေး"), 
    t("Wipe general surfaces including cabinets, cupboards, TV area, router, shelves, vases, handles, and decorative items. Organise if messy.", "キャビネット、食器棚、テレビ周辺、ルーター、棚、花瓶、取っ手、装飾品などの一般的な表面を拭きます。散らかっている場合は整理します。", "ဗီရိုများ၊ တီဗီဧရိယာ၊ ရောက်တာ၊စင်များ၊ ပန်းအိုးများ၊ လက်ကိုင်များနှင့် အလှဆင်ပစ္စည်းများ အပါအဝင် ယေဘုယျမျက်နှာပြင်များကို သုတ်ပါ။ ရှုပ်ပွနေပါက စနစ်တကျ ပြန်စီပါ။"), 
    t("Monthly", "毎月", "လစဉ်"), 
    [
      t("Do ad hoc cleaning sooner if dusty, sticky, oily, or after spills.", "ほこり、粘つき、油汚れがある場合、またはこぼした後は、早めに臨時掃除を行ってください。", "ဖုန်ထူခြင်း၊ စေးကပ်ခြင်း၊ ဆီပေခြင်း သို့မဟုတ် ဖိတ်စင်ပြီးနောက် လိုအပ်ပါက သန့်ရှင်းရေးကို စောစောလုပ်ပါ။"),
      t("Edwin is very sensitive to dust. It can cause sneezing, a runny or itchy nose, and skin reactions. Clean visible dust promptly instead of waiting for the next scheduled task.", "エドウィンはほこりに非常に敏感です。くしゃみ、鼻水、鼻のかゆみ、皮膚の反応が出ることがあります。次の定期掃除を待たず、見えるほこりはすぐに掃除してください。", "Edwin က ဖုန်နဲ့ အရမ်းမတည့်ပါ။ နှာချေခြင်း၊ နှာရည်ယိုခြင်း၊ နှာခေါင်းယားခြင်းနဲ့ အရေပြားဓာတ်မတည့်တာ ဖြစ်နိုင်ပါတယ်။ နောက်သန့်ရှင်းရေးရက်ကို မစောင့်ဘဲ မြင်ရတဲ့ဖုန်ကို ချက်ချင်းသုတ်ပါ။")
    ],
    [
      photo("assets/routines/edwin-dust-allergy.jpg",
        t("Edwin's skin showing allergic redness and itching from dust", "ほこりによるアレルギー性の赤みとかゆみが出たエドウィンの肌", "ဖုန်မှုန့်ကြောင့် အရေပြားနီရဲပြီး ယားယံသည့် ဓာတ်မတည့်မှုဖြစ်နေသော Edwin ၏ အရေပြား"),
        t("Edwin is very sensitive to dust and will get an itchy nose and skin.", "エドウィンはほこりに非常に敏感で、鼻のかゆみや皮膚の荒れ（かゆみ）を引き起こします。", "Edwin သည် ဖုန်မှုန့်များနှင့် မတည့်ပါ (နှာခေါင်းယားခြင်းနှင့် အရေပြားယားယံခြင်း ဖြစ်စေသည်)။"))
    ]),
  routine("pillow-mattress-vacuuming", "monthly", 30, "P", 
    t("Pillow & Mattress Vacuuming", "枕とマットレスの掃除機掛け", "ခေါင်းအုံးနှင့် မွေ့ရာများကို ဖုန်စုပ်ခြင်း"), 
    t("Vacuum pillows and accessible mattress surfaces using the dedicated bedding vacuum. This is now included in Bedrooms & Linens.", "寝具専用掃除機で枕と手の届くマットレス表面に掃除機を掛けます。現在は「寝室とリネン」に含まれています。", "အိပ်ရာသုံးသီးသန့် ဖုန်စုပ်စက်ဖြင့် ခေါင်းအုံးများနှင့် လက်လှမ်းမီသော မွေ့ရာမျက်နှာပြင်များကို ဖုန်စုပ်ပါ။ ယခု Bedrooms & Linens တွင် ထည့်သွင်းထားသည်။"),
    t("Monthly", "毎月", "လစဉ်"), 
    t("Mattress is heavy, so no full mattress airing for now.", "マットレスは重いため、当面の間はマットレス全体の天日干しなどは行いません。", "မွေ့ရာသည် လေးလံသောကြောင့် လောလောဆယ် လေထုတ်ခြင်း အပြည့်အဝမလုပ်ပါ။")),
  routine("aircon-filter-fan-coil", "monthly", 40, "A", 
    t("Aircon Filter & Fan Coil Wipe", "エアコンフィルターとファンコイルの拭き取り", "အဲကွန်းဇကာနှင့် ဖန်ကွိုင်သုတ်ခြင်း"), 
    t("Clean aircon filters and lightly wipe accessible fan coil surfaces after being taught.", "指導後、エアコンフィルターを掃除し、手の届くファンコイル表面を軽く拭きます。", "သင်ကြားပေးပြီးနောက် အဲကွန်းဇကာများကို သန့်ရှင်းရေးလုပ်ပြီး လက်လှမ်းမီသော ဖန်ကွိုင်မျက်နှာပြင်များကို အသာအယာသုတ်ပါ။"), 
    t("Monthly", "毎月", "လစဉ်"), 
    t("Only do safe, accessible parts. Do not dismantle deeper parts.", "安全で手の届く部分のみを行ってください。深い部分まで分解しないでください。", "ဘေးကင်းပြီး လက်လှမ်းမီသော အစိတ်အပိုင်းများကိုသာ လုပ်ဆောင်ပါ။ ပိုမိုနက်ရှိုင်းသော အစိတ်အပိုင်းများကို ဖြုတ်ခြင်းမပြုပါနှင့်။")),
  routine("washer-deep-clean", "quarterly", 10, "W", 
    t("Washer Deep Clean", "洗濯機の大掃除", "အဝတ်လျှော်စက် အကြီးစားသန့်ရှင်းရေး"),
    t("Clean the LG washer drawer, pump filter, seal, and outside. Run Tub Clean. Check inlet screens only if filling is slow.",
      "LG洗濯機の洗剤引き出し、ポンプフィルター、パッキン、外側を掃除します。槽洗浄を実行します。給水が遅い場合のみ給水フィルターを確認します。",
      "LG အဝတ်လျှော်စက်၏ ဆပ်ပြာအံဆွဲ၊ ပန့်ဇကာ၊ ရာဘာကွင်းနှင့် အပြင်ပိုင်းကို သန့်ရှင်းပါ။ Tub Clean လုပ်ပါ။ ရေဝင်နှေးမှသာ ရေဝင်ဆန်ခါကို စစ်ပါ။"),
    t("Quarterly / every 3 months", "3ヶ月おき / 3ヶ月ごと", "၃ လတစ်ကြိမ် / ၃ လတစ်ခါ"), 
    t("Do this task only when Edwin asks and supervises.", "この作業は、Edwinが依頼し監督する場合にのみ行ってください。", "Edwin က တောင်းဆိုပြီး ကြီးကြပ်သည့်အခါမှသာ ဤအလုပ်ကို လုပ်ပါ။")
  ),
  routine("doorbell-charging", "quarterly", 20, "D", 
    t("Doorbell Charging", "ドアホンの充電", "တံခါးခေါင်းလောင်း အားသွင်းခြင်း"), 
    t("Charge the Dling doorbell regularly so it does not run out of battery.", "バッテリー切れにならないよう、Dlingドアホンを定期的に充電します。", "ဘက်ထရီမကုန်စေရန် Dling တံခါးခေါင်းလောင်းကို ပုံမှန်အားသွင်းပါ။"), 
    t("Quarterly / every 3 months", "3ヶ月おき / 3ヶ月ごと", "၃ လတစ်ကြိမ် / ၃ လတစ်ခါ"), 
    t("Check battery level if the app shows low battery earlier.", "アプリで事前にローバッテリーが表示された場合は、バッテリー残量を確認してください。", "အက်ပ်တွင် ဘက်ထရီအားနည်းနေကြောင်း စောစောပြသပါက ဘက်ထရီပမာဏကို စစ်ဆေးပါ။")),
  routine("coffee-machine-descaling", "quarterly", 30, "C", 
    t("Coffee Machine Descaling", "コーヒーマシンの石灰除去", "ကော်ဖီစက် သံချေးချွတ်ခြင်း"), 
    t("Descale the coffee machine only when the red descale light flashes.", "赤い除石灰ランプが点滅した時だけ、コーヒーマシンの除石灰を行います。", "အနီရောင် descale မီးတောက်သည့်အခါမှသာ ကော်ဖီစက်ကို descale လုပ်ပါ။"),
    t("Only when the red descale light flashes", "赤い除石灰ランプが点滅した時だけ", "အနီရောင် descale မီးတောက်သည့်အခါမှသာ"),
    t("Follow the machine indicator and use the correct descaling process.", "マシンのインジケーターに従い、適切な石灰除去手順を行ってください。", "စက်၏ အချက်ပြချက်ကို လိုက်နာပြီး မှန်ကန်သော သံချေးချွတ်ခြင်း လုပ်ငန်းစဉ်ကို အသုံးပြုပါ။")),
  routine("grocery-shopping", "as-needed", 10, "G", 
    t("Grocery Shopping", "食料品の買い物", "ကုန်စုံဆိုင် စျေးဝယ်ခြင်း"), 
    t("Restock pantry and fridge. Check what food is running low before buying.", "パントリーと冷蔵庫を補充します。購入する前に不足している食品を確認します。", "ဟင်းချက်စရာများနှင့် ရေခဲသေတ္တာကို ဖြည့်ပါ။ မဝယ်မီ မည်သည့်အရာ ကုန်ခါနီးနေသည်ကို စစ်ဆေးပါ။"), 
    t("As needed", "必要に応じて", "လိုအပ်သလို"), 
    t("Coordinate before buying larger or unusual items.", "大きな品物や普通でない品物を購入する前に調整してください。", "ကြီးမားသော သို့မဟုတ် ပုံမှန်မဟုတ်သော ပစ္စည်းများ မဝယ်မီ ညှိနှိုင်းပါ။")),
  routine("serve-spirit-with-ice", "as-needed", 12, "🥃",
    t("Serve a Spirit with Ice", "氷入りスピリッツの提供", "ရေခဲနှင့် spirit ဖျော်ပေးခြင်း"),
    t("When asked, put ice and the requested spirit in a clean glass. Add mixer or water only when asked.", "頼まれたら、きれいなグラスに氷と希望のお酒を入れます。ミキサーや水は頼まれた時だけ加えます。", "တောင်းရင် ဖန်ခွက်သန့်ထဲ ရေခဲနဲ့ တောင်းထားတဲ့ spirit ထည့်ပါ။ တောင်းမှ mixer သို့မဟုတ် ရေထည့်ပါ။"),
    t("When requested", "頼まれた時", "တောင်းဆိုသည့်အခါ"),
    [
      t("Take a clean glass from the cabinet above the coffee machine.", "コーヒーマシンの上にある戸棚から、きれいなグラスを取る。", "ကော်ဖီစက်အပေါ်ရှိဗီရိုမှ သန့်ရှင်းသောဖန်ခွက်ကို ယူပါ။"),
      t("Spirits are on the top shelves. Use a stable ladder if needed; do not climb on a chair or stool. If the bottle cannot be reached safely, ask for help.", "スピリッツは上段の棚にある。必要なら安定した脚立を使い、椅子やスツールには乗らない。安全に取れない場合は助けを求める。", "spirit များသည် အပေါ်ဆုံးစင်များတွင်ရှိသည်။ လိုအပ်ပါက တည်ငြိမ်သော ladder ကိုသုံးပြီး ထိုင်ခုံ သို့မဟုတ် stool ပေါ်မတက်ပါနှင့်။ ဘေးကင်းစွာမယူနိုင်ပါက အကူအညီတောင်းပါ။"),
      t("Add a handful of ice to the glass.", "グラスに氷をひとつかみ入れる。", "ဖန်ခွက်ထဲသို့ ရေခဲတစ်လက်တစ်ဆုပ် ထည့်ပါ။"),
      t("Pour a generous but moderate amount of the requested spirit, enough to enjoy but not too much.", "希望されたスピリッツを、楽しめる十分な量だが入れすぎない適量で注ぐ。", "တောင်းထားသော spirit ကို သောက်ကောင်းလောက်အောင်ထည့်ပါ၊ သို့သော် အလွန်အကျွံမထည့်ပါနှင့်။"),
      t("If Edwin or Yukari asks for a mixer or water, add the requested one. Otherwise, serve the spirit over ice.", "エドウィンまたはゆかりからミキサーや水を頼まれた場合は、希望されたものを加える。指定がなければ、氷入りのスピリッツとして提供する。", "Edwin သို့မဟုတ် Yukari က mixer သို့မဟုတ် ရေတောင်းဆိုပါက တောင်းထားသည့်အရာကိုထည့်ပါ။ မတောင်းဆိုပါက spirit ကို ရေခဲနှင့်ပဲ ပေးပါ။")
    ],
    [
      photo("assets/routines/serve-spirit-glasses-cabinet.jpg",
        t("Glass cabinet above the coffee machine", "コーヒーマシン上のグラス用戸棚", "ကော်ဖီစက်အပေါ်ရှိ ဖန်ခွက်ဗီရို"),
        t("Take a clean glass from this cabinet above the coffee machine.", "コーヒーマシンの上にあるこの戸棚から、きれいなグラスを取る。", "ကော်ဖီစက်အပေါ်ရှိ ဤဗီရိုမှ သန့်ရှင်းသောဖန်ခွက်ကို ယူပါ။")),
      photo("assets/routines/serve-spirit-top-shelf.jpg",
        t("Top shelf with spirits", "スピリッツがある上段の棚", "spirit များရှိသော အပေါ်ဆုံးစင်"),
        t("The spirits are on the top shelves. Use a stable ladder when needed and ask for help if they cannot be reached safely.", "スピリッツは上段の棚にある。必要なら安定した脚立を使い、安全に取れない場合は助けを求める。", "spirit များသည် အပေါ်ဆုံးစင်များတွင်ရှိသည်။ လိုအပ်ပါက တည်ငြိမ်သော ladder ကိုသုံးပြီး ဘေးကင်းစွာမယူနိုင်ပါက အကူအညီတောင်းပါ။")),
      photo("assets/routines/serve-spirit-ice.jpg",
        t("Glass with a handful of ice", "氷をひとつかみ入れたグラス", "ရေခဲတစ်လက်တစ်ဆုပ်ပါသော ဖန်ခွက်"),
        t("Add a handful of ice before pouring the spirit.", "スピリッツを注ぐ前に、氷をひとつかみ入れる。", "spirit မလောင်းမီ ရေခဲတစ်လက်တစ်ဆုပ် ထည့်ပါ။")),
      photo("assets/routines/serve-spirit-pour.jpg",
        t("Spirit ready to pour over ice", "氷に注ぐ準備ができたスピリッツ", "ရေခဲပေါ်လောင်းရန် အဆင်သင့်ဖြစ်သော spirit"),
        t("Pour a moderate serving over the ice, then add mixer or water only if requested.", "氷に適量を注ぎ、ミキサーや水は頼まれた時だけ加える。", "ရေခဲပေါ်သို့ ပမာဏသင့်တင့်အောင်လောင်းပြီး mixer သို့မဟုတ် ရေကို တောင်းဆိုသည့်အခါမှသာ ထည့်ပါ။"))
    ]),
  routine("laundromat-heavy-items", "as-needed", 14, "L",
    t("Laundromat for Heavy Items", "大型品のコインランドリー洗濯", "အလေးချိန်များသောပစ္စည်းများ Laundromat တွင်လျှော်ခြင်း"),
    t("When Edwin asks, take bulky washable items such as curtains downstairs to the laundromat and use the exact washer setting he gives.", "Edwinに頼まれた時、カーテンなどの大型洗濯物を階下のコインランドリーへ運び、指定された洗濯設定を使います。", "Edwin က တောင်းဆိုသည့်အခါ ကာတန်ကဲ့သို့ လျှော်ရမည့် ပစ္စည်းကြီးများကို အောက်ထပ် laundromat သို့ ယူသွားပြီး Edwin ပြောသည့် washer setting အတိအကျကို သုံးပါ။"),
    t("Only when Edwin asks", "Edwinに頼まれた時のみ", "Edwin က တောင်းဆိုသည့်အခါမှသာ"),
    [
      t("Confirm which items to wash and the exact washer setting with Edwin before going downstairs. Do not choose the setting yourself.", "階下へ行く前に、洗う物と正確な洗濯設定をEdwinに確認します。自分で設定を選ばないでください。", "အောက်ထပ်မဆင်းမီ လျှော်ရမည့်ပစ္စည်းများနှင့် washer setting အတိအကျကို Edwin ထံ အတည်ပြုပါ။ setting ကို ကိုယ်တိုင်မရွေးပါနှင့်။"),
      t("Put curtains or other bulky laundry into manageable bags or baskets and carry them downstairs. Make another trip or ask for help if the load is too heavy.", "カーテンなどの大型洗濯物を運びやすい袋やかごに入れて階下へ運びます。重すぎる場合は分けて運ぶか、助けを求めてください。", "ကာတန် သို့မဟုတ် အခြားပစ္စည်းကြီးများကို သယ်ရလွယ်သောအိတ် သို့မဟုတ် ခြင်းထဲထည့်ပြီး အောက်ထပ်သို့ ယူသွားပါ။ အရမ်းလေးပါက ခွဲသယ်ပါ သို့မဟုတ် အကူအညီတောင်းပါ။"),
      t("Bring Singapore cash notes. The change machine accepts unfolded $2, $5, and $10 notes and pays out $1 coins.", "シンガポールドル紙幣を持参します。両替機は折っていない2ドル、5ドル、10ドル札を受け付け、1ドル硬貨を払い出します。", "စင်္ကာပူဒေါ်လာ ငွေစက္ကူများ ယူသွားပါ။ coin change machine သည် မခေါက်ထားသော $2၊ $5 နှင့် $10 ငွေစက္ကူများကို လက်ခံပြီး $1 အကြွေစေ့များ ထုတ်ပေးသည်။"),
      t("Check the current price board and change enough notes into coins for the instructed washer and programme.", "現在の料金表を確認し、指定された洗濯機とコースに必要な分だけ硬貨へ両替します。", "လက်ရှိဈေးနှုန်းဘုတ်ကို စစ်ပြီး ညွှန်ကြားထားသော washer နှင့် programme အတွက် လုံလောက်သော အကြွေစေ့များ လဲပါ။"),
      t("Load the machine without overfilling it, then use only the setting Edwin specified.", "洗濯機に詰め込みすぎないように入れ、Edwinが指定した設定だけを使います。", "စက်ထဲကို အလွန်ပြည့်ကျပ်အောင်မထည့်ဘဲ Edwin ပြောထားသော setting ကိုသာ သုံးပါ။"),
      t("When finished, collect all laundry and belongings and bring them back upstairs.", "終了したら、洗濯物と持ち物をすべて回収して上階へ戻します。", "ပြီးဆုံးပါက အဝတ်လျှော်ပစ္စည်းများနှင့် ကိုယ်ပိုင်ပစ္စည်းအားလုံးကို ယူပြီး အပေါ်ထပ်သို့ ပြန်ယူလာပါ။")
    ],
    [
      photo("assets/routines/laundromat-washer-price-list.jpg",
        t("Laundromat washer programmes and price list", "コインランドリーの洗濯コースと料金表", "Laundromat washer programme များနှင့် ဈေးနှုန်းစာရင်း"),
        t("Check the current board for the washer size, programme, time, and price, but follow Edwin's exact setting.", "洗濯機の容量、コース、時間、料金は現在の表で確認しますが、設定はEdwinの指示に正確に従ってください。", "washer အရွယ်အစား၊ programme၊ အချိန်နှင့် ဈေးနှုန်းကို လက်ရှိဘုတ်တွင် စစ်ပါ။ သို့သော် Edwin ပြောသည့် setting အတိအကျကို လိုက်နာပါ။")),
      photo("assets/routines/laundromat-coin-change-machine.jpg",
        t("Change machine for one-dollar coins", "1ドル硬貨用の両替機", "$1 အကြွေစေ့အတွက် coin change machine"),
        t("Insert an unfolded $2, $5, or $10 note and collect the $1 coins from the payout tray.", "折っていない2ドル、5ドル、10ドル札のいずれかを入れ、払出口から1ドル硬貨を受け取ります。", "မခေါက်ထားသော $2၊ $5 သို့မဟုတ် $10 ငွေစက္ကူကို ထည့်ပြီး payout tray မှ $1 အကြွေစေ့များကို ယူပါ။"))
    ]),
  routine("rain-window-closing", "as-needed", 15, "R",
    t("Rain - Window Closing", "雨の日の窓閉め", "မိုးရွာချိန် ပြတင်းပေါက်ပိတ်ခြင်း"),
    t("When raining, adjust the windows to prevent rain from splashing in.", "雨の日は、雨が吹き込まないように窓を調整してください。", "မိုးရွာချိန်တွင် မိုးရေများဝင်မလာစေရန် ပြတင်းပေါက်များကို ချိန်ညှိပါ။"),
    t("When raining / heavy rain", "雨の日／大雨の時", "မိုးရွာချိန် / မိုးသည်းချိန်"),
    [
      t("Living room windows splash in easily, so close them almost fully.", "リビングの窓は雨が吹き込みやすいので、ほぼ完全に閉めてください。", "ဧည့်ခန်းပြတင်းပေါက်များမှ မိုးရေဝင်လွယ်သောကြောင့် အားလုံးနီးပါး ပိတ်ထားပါ။"),
      t("Kitchen windows splash in easily, so close them almost fully.", "キッチンの窓は雨が吹き込みやすいので、ほぼ完全に閉めてください。", "မီးဖိုချောင်ပြတင်းပေါက်များမှ မိုးရေဝင်လွယ်သောကြောင့် အားလုံးနီးပါး ပိတ်ထားပါ။"),
      t("Bedroom windows do not spill/splash in even during heavy rain, so they can be left half open.", "寝室の窓は大雨の時でも雨が吹き込まないため、半分開けたままにすることができます。", "အိပ်ခန်းပြတင်းပေါက်များသည် မိုးသည်းထန်စွာရွာသွန်းချိန်တွင်ပင် မိုးရေမဝင်သောကြောင့် တစ်ဝက်ခန့် ဖွင့်ထားနိုင်သည်။"),
      t("After heavy rain, check window sills and floor for water.", "大雨の後は、窓枠や床に水が溜まっていないか確認してください。", "မိုးသည်းထန်စွာရွာပြီးနောက် ပြတင်းပေါက်ဘောင်များနှင့် ကြမ်းပြင်တွင် ရေဝင်ခြင်းရှိမရှိ စစ်ဆေးပါ။")
    ],
    [
      photo("assets/routines/nako-window-bedroom.jpg",
        t("Bedroom window setup", "寝室の窓のセットアップ", "အိပ်ခန်းပြတင်းပေါက် တင်ဆက်မှု"),
        t("Can be closed to half as it doesn't spill in even during heavy rain.", "大雨の時でも雨が入らないため、半分閉める程度で大丈夫です。", "မိုးသည်းထန်စွာရွာချိန်တွင်ပင် မိုးရေမဝင်သောကြောင့် တစ်ဝက်ခန့် ပိတ်ထားနိုင်ပါသည်။")),
      photo("assets/routines/nako-window-living-room.jpg",
        t("Living room sliding window setup", "リビングの引き違い窓のセットアップ", "ဧည့်ခန်းလျှောပြတင်းပေါက် တင်ဆက်မှု"),
        t("Close almost fully to prevent rain from splashing inside.", "室内に雨が吹き込むのを防ぐため、ほぼ完全に閉めてください。", "အတွင်းသို့ မိုးရေများဝင်မလာစေရန် အားလုံးနီးပါး ပိတ်ထားပါ။")),
      photo("assets/routines/nako-window-kitchen.jpg",
        t("Kitchen window setup", "キッチンの窓のセットアップ", "မီးဖိုချောင်ပြတင်းပေါက် တင်ဆက်မှု"),
        t("Close almost fully to prevent rain from splashing inside.", "室内に雨が吹き込むのを防ぐため、ほぼ完全に閉めてください。", "အတွင်းသို့ မိုးရေများဝင်မလာစေရန် အားလုံးနီးပါး ပိတ်ထားပါ။"))
    ]),
  routine("yukari-cataplexy-safety", "as-needed", 5, "!",
    t("Yukari - Cataplexy Safety", "ゆかり - カタプレキシー時の安全対応", "Yukari - cataplexy ဖြစ်ချိန် ဘေးကင်းရေး"),
    t("Yukari may suddenly lose muscle control and collapse, including when laughing hard or while walking.", "ゆかりは、大笑いした時や歩いている時などに、突然筋力のコントロールを失って倒れることがあります。", "Yukari သည် အရမ်းရယ်သည့်အခါ သို့မဟုတ် လမ်းလျှောက်နေစဉ်တွင်ပင် ကြွက်သားထိန်းချုပ်မှုကို ရုတ်တရက်ဆုံးရှုံးပြီး လဲကျနိုင်သည်။"),
    t("If it happens", "起きた時", "ဖြစ်လာပါက"),
    [
      t("Protect her head immediately from the floor or nearby furniture, and move hard or sharp objects away.", "すぐに頭を床や近くの家具から守り、硬い物や鋭い物を周りからどけてください。", "သူမ၏ခေါင်းကို ကြမ်းပြင် သို့မဟုတ် အနီးရှိ furniture နှင့် မတိုက်မိအောင် ချက်ချင်းကာကွယ်ပြီး မာသော သို့မဟုတ် ချွန်သောပစ္စည်းများကို ဖယ်ရှားပါ။"),
      t("Stay calm and tell Edwin immediately. If she is injured or does not recover normally, call for emergency help.", "落ち着いて、すぐにエドウィンへ知らせてください。けがをした場合、または普通に回復しない場合は、緊急の助けを呼んでください。", "စိတ်အေးအေးထားပြီး Edwin ကို ချက်ချင်းပြောပါ။ ဒဏ်ရာရပါက သို့မဟုတ် ပုံမှန်အတိုင်း ပြန်မကောင်းပါက emergency help ကို ခေါ်ပါ။")
    ],
    [
      photo("assets/routines/yukari-cataplexy.png",
        t("Yukari resting", "休息するゆかり", "နားနေသော ယူကာရီ"),
        t("Reference photo of Yukari resting or experiencing a cataplexy episode.", "休息中またはカタプレキシー発作時のゆかりの参考写真。", "ယူကာရီ နားနေစဉ် သို့မဟုတ် cataplexy ဖြစ်နေစဉ် ကိုးကားပုံ။"))
    ]),
  routine("leaving-home-house-keys", "as-needed", 10, "KEY",
    t("Leaving Home - House Keys", "外出時 - 家の鍵", "အပြင်ထွက်ချိန် - အိမ်သော့"),
    t("Whenever Chocho leaves, even briefly, take the countertop house key with the red rubber band.", "Chochoは短い外出でも、カウンタートップにある赤い輪ゴム付きの家の鍵を持って行きます。", "Chocho သည် ခဏသာအပြင်ထွက်လျှင်ပင် countertop ပေါ်ရှိ အနီရောင် rubber band ပါသော အိမ်သော့ကို ယူသွားရမည်။"),
    t("Every time leaving home", "外出するたび", "အိမ်မှထွက်သည့်အခါတိုင်း"),
    t("Before closing the door, check that you have the correct key: the house key with the red rubber band from the countertop. Do not depend on someone being home to open it.", "ドアを閉める前に、正しい鍵、つまりカウンタートップにある赤い輪ゴム付きの家の鍵を持っているか確認します。家にいる誰かが開けてくれることを当てにしないでください。", "တံခါးမပိတ်မီ မှန်ကန်သောသော့ဖြစ်သည့် countertop ပေါ်ရှိ အနီရောင် rubber band ပါသော အိမ်သော့ကို ယူထားကြောင်း စစ်ပါ။ အိမ်တွင်တစ်ယောက်ယောက်ရှိပြီး တံခါးဖွင့်ပေးမည်ဟု မမှီခိုပါနှင့်။"),
    [
      photo("assets/routines/leaving-home-house-keys.png",
        t("House key with a red loop", "赤いループが付いた家の鍵", "အနီရောင်ကြိုးကွင်းပါသော အိမ်သော့"),
        t("Take the countertop house key with the red rubber band every time you leave, even for a short trip nearby.", "近所への短い外出でも、外出するたびにカウンタートップの赤い輪ゴム付きの家の鍵を持って行きます。", "အနီးအနားသို့ ခဏသွားခြင်းဖြစ်စေ၊ အပြင်ထွက်တိုင်း countertop ပေါ်ရှိ အနီရောင် rubber band ပါသော အိမ်သော့ကို ယူသွားပါ။"))
    ]),
  routine("yukari-flight-packing", "as-needed", 20, "Y", 
    t("Yukari - Flight Work Packing", "ゆかり - フライト業務の荷造り", "Yukari - လေယာဉ်ခရီးစဉ်အတွက် အထုပ်ပြင်ခြင်း"), 
    t("Help pack and unpack Yukari's work items and luggage when she needs to fly.", "ゆかりがフライトする際に、仕事用アイテムやスーツケースの荷造り・荷解きを手伝います。", "Yukari လေယာဉ်စီးရန် ရှိသည့်အခါ သူမ၏ အလုပ်ပစ္စည်းများနှင့် ခရီးဆောင်အိတ်များကို ထုပ်ပိုးခြင်းနှင့် ဖွင့်ခြင်းများ ကူညီပေးပါ။"), 
    t("When Yukari has flights", "ゆかりにフライトがあるとき", "Yukari လေယာဉ်ခရီးစဉ်ရှိသည့်အခါ"), 
    t("Check uniform/work items, toiletries, chargers, and anything needed for flight duty.", "制服/仕事用アイテム、洗面用具、充電器、およびフライト業務に必要なものをチェックします。", "ယူနီဖောင်း/အလုပ်ပစ္စည်းများ၊ တစ်ကိုယ်ရေသုံးပစ္စည်းများ၊ အားသွင်းကြိုးများနှင့် လေယာဉ်ခရီးစဉ်အတွက် လိုအပ်သောအရာများကို စစ်ဆေးပါ။")),
  routine("general-household-duties", "as-needed", 30, "H", 
    t("General Household Duties", "一般的な家事任務", "ယေဘုယျ အိမ်မှုကိစ္စများ"), 
    t("Catch-all for reasonable household duties not specifically listed above. This list may be adjusted as required.", "上記に明確に記載されていない合理的な家事任務のすべて。このリストは必要に応じて調整される場合があります。", "အထက်တွင် အထူးဖော်ပြမထားသော သင့်လျော်သောအိမ်မှုကိစ္စများ။ ဤစာရင်းကို လိုအပ်သလို ညှိနှိုင်းပြင်ဆင်နိုင်သည်။"), 
    t("Ad hoc / as needed", "臨時 / 必要に応じて", "လိုအပ်သလို / အခြေအနေအရ"), 
    t("Use common sense. Ask if unsure, especially if outside normal household duties.", "常識を働かせてください。特に通常の家事の範囲外で不明な点がある場合は質問してください。", "ယေဘုယျဆင်ခြင်တုံတရားကို အသုံးပြုပါ။ မသေချာပါက အထူးသဖြင့် သာမန်အိမ်မှုကိစ္စများအပြင်ဘက်ဖြစ်ပါက မေးမြန်းပါ။")),
  routine("fire-extinguisher-training", "as-needed", 40, "!",
    t("Fire Extinguisher Training", "消火器の使い方の確認", "မီးသတ်ဆေးဘူး အသုံးပြုနည်း လေ့ကျင့်ခြင်း"),
    t("Learn where the fire extinguisher is kept, how to check its pressure gauge, and how to use it safely.", "消火器の保管場所、圧力計の確認方法、安全な使い方を学びます。", "မီးသတ်ဆေးဘူးထားသည့်နေရာ၊ ဖိအားမီတာစစ်ဆေးနည်းနှင့် လုံခြုံစွာအသုံးပြုနည်းကို သင်ယူပါ။"),
    t("One-off training", "1回限りの訓練", "တစ်ကြိမ်တည်း လေ့ကျင့်မှု"),
    [
      t("1. CHECK THE GAUGE. Green = ready to use. Red = do not use; arrange servicing or replacement.", "1. 圧力計を確認。緑＝使用可能。赤＝使用せず、点検または交換を依頼します。", "၁။ ဖိအားမီတာ စစ်ပါ။ အစိမ်း = အသင့်သုံးနိုင်သည်။ အနီ = မသုံးပါနှင့်။ စစ်ဆေးပြုပြင်ရန် သို့မဟုတ် အစားထိုးရန် ပြောပါ။"),
      t("2. Use only on a small fire. Keep the exit behind you. If smoke is heavy or fire spreads, leave and call emergency services.", "2. 小さな火にのみ使用します。出口を背にします。煙が多い、または火が広がる場合は避難して緊急通報します。", "၂။ မီးငယ်အတွက်သာ သုံးပါ။ ထွက်ပေါက်ကို နောက်တွင်ထားပါ။ မီးခိုးများလျှင် သို့မဟုတ် မီးပျံ့လျှင် ထွက်ပြီး အရေးပေါ်အကူအညီခေါ်ပါ။"),
      t("3. MOST IMPORTANT: PULL THE SAFETY PIN completely out. The lever will not work until the pin is removed.", "3. 最重要：安全ピンを完全に引き抜きます。ピンを抜かないとレバーは使えません。", "၃။ အရေးအကြီးဆုံး: လုံခြုံရေးပင်ကို လုံးဝဆွဲထုတ်ပါ။ ပင်မထုတ်လျှင် လက်ကိုင်ကို ညှစ်၍မရပါ။"),
      t("4. AIM at the base of the fire, not the flames.", "4. 炎ではなく、火元の根元を狙います。", "၄။ မီးတောက်ကိုမဟုတ်ဘဲ မီး၏အောက်ခြေကို ချိန်ပါ။"),
      t("5. SQUEEZE the lever.", "5. レバーを握ります。", "၅။ လက်ကိုင်ကို ညှစ်ပါ။"),
      t("6. SWEEP side to side across the base of the fire.", "6. 火元の根元を左右に掃くように噴射します。", "၆။ မီး၏အောက်ခြေတစ်လျှောက် ဘယ်ညာရွှေ့ပြီး ဖြန်းပါ။"),
      t("7. If the fire does not go out quickly, leave and call emergency services.", "7. すぐに消えない場合は避難して緊急通報します。", "၇။ မီးချက်ချင်းမငြိမ်းလျှင် ထွက်ပြီး အရေးပေါ်အကူအညီခေါ်ပါ။")
    ],
    [
      photo("assets/routines/fire-extinguisher-overview.jpg",
        t("ABC dry-powder fire extinguisher", "ABC粉末消火器", "ABC အမှုန့် မီးသတ်ဆေးဘူး"),
        t("Read the extinguisher label and use it only for the fire types shown.", "消火器のラベルを読み、表示されている種類の火災にのみ使用してください。", "မီးသတ်ဆေးဘူးပေါ်ရှိ အညွှန်းကိုဖတ်ပြီး ဖော်ပြထားသော မီးအမျိုးအစားများအတွက်သာ အသုံးပြုပါ။")),
      photo("assets/routines/fire-extinguisher-pull-pin.jpg",
        t("Pulling out the safety pin", "安全ピンを引き抜く", "လုံခြုံရေးပင်ကို ဆွဲထုတ်ခြင်း"),
        t("First, pull the metal safety pin completely out so the lever can be squeezed.", "最初に金属製の安全ピンを完全に引き抜き、レバーを握れる状態にします。", "ပထမဦးစွာ လက်ကိုင်ကိုညှစ်နိုင်ရန် သတ္တုလုံခြုံရေးပင်ကို လုံးဝဆွဲထုတ်ပါ။")),
      photo("assets/routines/fire-extinguisher-pressure-gauge.jpg",
        t("Fire-extinguisher pressure gauge", "消火器の圧力計", "မီးသတ်ဆေးဘူး ဖိအားမီတာ"),
        t("The needle should be in the green working-pressure zone. Either red zone means the extinguisher needs professional attention.", "針が緑色の使用圧力範囲にあることを確認します。左右どちらの赤色範囲でも、専門業者による対応が必要です。", "အပ်သည် အစိမ်းရောင် အသုံးပြုနိုင်သောဖိအားအပိုင်းတွင် ရှိရမည်။ အနီရောင်အပိုင်းတစ်ဖက်ဖက်တွင်ရှိလျှင် ကျွမ်းကျင်သူဖြင့် စစ်ဆေးရန်လိုသည်။"))
    ]),
  routine("upload-shared-album", "daily", 6, "📷",
    t("Upload Photos & Videos to Shared Album", "共有アルバムへの写真・動画のアップロード", "မျှဝေထားသော အယ်လ်ဘမ်သို့ ဓာတ်ပုံနှင့် ဗီဒီယိုများ တင်ခြင်း"),
    t("Upload photos and videos to the shared Google Photos album whenever you complete tasks, find something unusual, or are unsure of what to do.", "タスク完了時、異常を見つけた時、またはどうすべきか判断に迷う時に、共有のGoogleフォトアルバムに写真や動画をアップロードします。", "အလုပ်များပြီးစီးသည့်အခါ၊ ပုံမှန်မဟုတ်သောအရာများ တွေ့ရှိသည့်အခါ သို့မဟုတ် ဘာလုပ်ရမှန်း မသေချာသည့်အခါ မျှဝေထားသော Google Photos အယ်လ်ဘမ်သို့ ဓာတ်ပုံနှင့် ဗီဒီယိုများ တင်ပေးပါ။"),
    t("Daily / after tasks or when needed", "毎日／作業後または必要な時", "နေ့စဉ် / အလုပ်ပြီးနောက် သို့မဟုတ် လိုအပ်သည့်အခါ"),
    [
      t("1. Open Google Photos.", "1. Googleフォトを開きます。", "၁။ Google Photos ကို ဖွင့်ပါ။"),
      t("2. Press and hold a photo, then select all photos or videos to share.", "2. 写真を長押しし、共有するすべての写真または動画を選択します。", "၂။ ဓာတ်ပုံတစ်ပုံကို ဖိထားပြီး မျှဝေလိုသော ဓာတ်ပုံ သို့မဟုတ် ဗီဒီယိုအားလုံးကို ရွေးချယ်ပါ။"),
      t("3. Press Add to album.", "3. 「アルバムに追加」を押します。", "၃။ “Add to album” ကို နှိပ်ပါ။"),
      t("4. Select the shared album named exactly CHO MDM SIR.", "4. 「CHO MDM SIR」という名前の共有アルバムを選択します。", "၄။ “CHO MDM SIR” ဟု အတိအကျ အမည်ပေးထားသော မျှဝေထားသည့် အယ်လ်ဘမ်ကို ရွေးပါ။"),
      t("5. Once added, Edwin and Yukari can view the photos and videos.", "5. 追加されると、エドウィンとゆかりがその写真や動画を閲覧できるようになります。", "၅။ ထည့်သွင်းပြီးပါက Edwin နှင့် Yukari တို့သည် ဓာတ်ပုံနှင့် ဗီဒီယိုများကို ကြည့်ရှုနိုင်မည် ဖြစ်သည်။"),
      t("6. Whenever something is completed, unclear, unusual, or you are unsure what to do, take a photo or video and add it to this album.", "6. タスク完了時、不明な点や異常がある時、またはどうすべきか迷う時は、写真や動画を撮影してこのアルバムに追加してください。", "၆။ အလုပ်တစ်ခုခု ပြီးစီးသည့်အခါ၊ မရှင်းလင်းသည့်အခါ၊ ပုံမှန်မဟုတ်သည့်အခါ သို့မဟုတ် ဘာလုပ်ရမှန်း မသေချာသည့်အခါတိုင်း ဓာတ်ပုံ သို့မဟုတ် ဗီဒီယိုရိုက်ပြီး ဤအယ်လ်ဘမ်ထဲသို့ ထည့်ပါ။"),
      t("7. Edwin will review the album, add relevant photos to the Nako app GitHub repository, and follow up through WhatsApp if he has questions.", "7. エドウィンがアルバムを確認し、関連する写真をNakoアプリのGitHubリポジトリに追加し、質問がある場合はWhatsAppで連絡します。", "၇။ Edwin က အယ်လ်ဘမ်ကို စစ်ဆေးပြီး သက်ဆိုင်ရာဓာတ်ပုံများကို Nako app GitHub repository တွင် ထည့်သွင်းပေးမည်ဖြစ်ကာ မေးခွန်းရှိပါက WhatsApp မှတစ်ဆင့် ဆက်သွယ်မေးမြန်းပါမည်။")
    ],
    [
      photo("assets/routines/google-photos-shared-album.webp",
        t("Google Photos app icon", "Googleフォトのアプリアイコン", "Google Photos app အိုင်ကွန်"),
        t("Use Google Photos to upload task photos and videos to the shared album.", "Googleフォトを使って、作業の写真や動画を共有アルバムにアップロードします。", "အလုပ်ဓာတ်ပုံနှင့် ဗီဒီယိုများကို မျှဝေထားသော အယ်လ်ဘမ်သို့ တင်ရန် Google Photos ကို သုံးပါ။"))
    ]
  ),
];

const fujiohHoodDeepCleanRoutine = routineTasks.find((task) => task.id === "fujioh-hood-deep-clean");
if (fujiohHoodDeepCleanRoutine) {
  fujiohHoodDeepCleanRoutine.instructions = [
    t("Switch off or unplug the hood.", "レンジフードの電源を切るか、プラグを抜きます。", "hood ကို switch ပိတ်ပါ သို့မဟုတ် plug ဖြုတ်ပါ။"),
    t("Open the white panel. Remove and empty the oil tray.", "白いパネルを開けます。オイルトレーを取り外して中身を捨てます。", "အဖြူရောင် panel ကို ဖွင့်ပါ။ ဆီခံ tray ကို ဖြုတ်ပြီး အထဲရှိဆီကို သွန်ပါ။"),
    t("Slide the black lock forward. Unhook and remove the metal filter.", "黒いロックを手前へスライドします。フックを外し、金属フィルターを取り外します。", "အနက်ရောင် lock ကို ရှေ့ဘက်သို့ တွန်းပါ။ ချိတ်ဖြုတ်ပြီး သတ္တု filter ကို ထုတ်ပါ။"),
    t("Unscrew the black knob. Separate the two filter layers.", "黒いノブを回して外します。2層のフィルターを分けます。", "အနက်ရောင် knob ကို လှည့်ဖြုတ်ပါ။ filter အလွှာ ၂ ခုကို ခွဲပါ။"),
    t("Wash the oil tray and filters with water, mild dish soap, and a soft cloth. Rinse them and dry them fully.", "オイルトレーとフィルターを水、中性食器用洗剤、柔らかい布で洗います。すすいで完全に乾かします。", "ဆီခံ tray နှင့် filter များကို ရေ၊ အပျော့စား ပန်းကန်ဆေးဆပ်ပြာနှင့် အဝတ်ပျော့ဖြင့် ဆေးပါ။ ရေဆေးချပြီး လုံးဝခြောက်အောင်ထားပါ။"),
    t("Wipe the panel, inside, outside, and top exhaust grille with a damp soapy cloth. Wipe again with clean water, then dry.", "パネル、内側、外側、上部の排気グリルを、石けん水で湿らせた布で拭きます。きれいな水で水拭きし、乾かします。", "panel၊ အတွင်း၊ အပြင်နှင့် အပေါ်ဘက် exhaust grille ကို ဆပ်ပြာရည်စိုအဝတ်ဖြင့် သုတ်ပါ။ ရေသန့်စိုအဝတ်ဖြင့် ထပ်သုတ်ပြီး ခြောက်အောင်လုပ်ပါ။"),
    t("Reassemble the two filter layers. Reinstall the filter and oil tray securely, then close the panel.", "2層のフィルターを組み直します。フィルターとオイルトレーを確実に戻し、パネルを閉じます。", "filter အလွှာ ၂ ခုကို ပြန်တပ်ပါ။ filter နှင့် ဆီခံ tray ကို ခိုင်ခိုင်မာမာ ပြန်တပ်ပြီး panel ကို ပိတ်ပါ။")
  ];
  fujiohHoodDeepCleanRoutine.mustRemember = [
    t("Do not spray cleaner or water directly inside the hood. Put cleaner on the cloth instead.", "洗剤や水をレンジフード内部へ直接スプレーしないでください。洗剤は布に付けて使います。", "hood အတွင်းသို့ သန့်စင်ဆေး သို့မဟုတ် ရေကို တိုက်ရိုက်မဖြန်းပါနှင့်။ သန့်စင်ဆေးကို အဝတ်ပေါ်တွင် ထည့်သုံးပါ။"),
    t("Do not wet the motor or wiring.", "モーターや配線を濡らさないでください。", "motor သို့မဟုတ် wiring ကို မစိုပါနှင့်။"),
    t("Use only mild dish soap and a soft cloth. Do not use strong cleaners.", "中性食器用洗剤と柔らかい布だけを使います。強力な洗剤は使わないでください。", "အပျော့စား ပန်းကန်ဆေးဆပ်ပြာနှင့် အဝတ်ပျော့ကိုသာ သုံးပါ။ ပြင်းသောသန့်စင်ဆေး မသုံးပါနှင့်။"),
    t("Do not remove the internal fan.", "内部ファンは取り外さないでください。", "အတွင်း fan ကို မဖြုတ်ပါနှင့်။")
  ];
  fujiohHoodDeepCleanRoutine.videoUrl = "https://youtu.be/bGK8jplSfQg?t=45";
  fujiohHoodDeepCleanRoutine.videoUrlLabel = t(
    "Fujioh Hood Video Tutorial: Start at 0:45",
    "Fujiohレンジフード動画チュートリアル：0:45から",
    "Fujioh hood video tutorial: 0:45 မှစကြည့်ပါ"
  );
}

const microwaveInteriorRoutine = routineTasks.find((task) => task.id === "microwave-interior");
if (microwaveInteriorRoutine) {
  microwaveInteriorRoutine.photos = [
    photo("assets/routines/nako-microwave-interior.jpg",
      t("Open microwave interior", "開いた電子レンジ内部", "ဖွင့်ထားသော မိုက်ခရိုဝေ့ဗ် အတွင်းပိုင်း"),
      t("Reference setup for wiping the inside walls, door, and glass turntable. Keep the microwave clean and dry after use.", "内側の壁、ドア、ガラス皿を拭くための参考写真です。使用後は電子レンジを清潔で乾いた状態にしてください。", "အတွင်းနံရံများ၊ တံခါးနှင့် ဖန်လှည့်ပြားကို သုတ်ရန် ကိုးကားပုံဖြစ်သည်။ အသုံးပြုပြီးနောက် မိုက်ခရိုဝေ့ဗ်ကို သန့်ရှင်းပြီး ခြောက်သွေ့အောင်ထားပါ။"))
  ];
}

const generalSurfaceCleaningRoutine = routineTasks.find((task) => task.id === "general-surface-cleaning");
if (generalSurfaceCleaningRoutine) {
  generalSurfaceCleaningRoutine.photos = [
    photo("assets/routines/nako-general-surface-cleaning.jpg",
      t("General surfaces around the home", "家の中の一般的な表面", "အိမ်တွင်းရှိ အထွေထွေ မျက်နှာပြင်များ"),
      t("Main reference for tables, cabinets, drawers, and visible surfaces. Wipe dust, clear loose items, and keep these areas neat.", "テーブル、棚、引き出し、見える表面の主な参考写真です。ほこりを拭き、散らかった物を片付け、きれいに保ってください。", "စားပွဲများ၊ ကဗတ်များ၊ အံဆွဲများနှင့် မြင်ရသောမျက်နှာပြင်များအတွက် အဓိကကိုးကားပုံဖြစ်သည်။ ဖုန်သုတ်၊ ပြန့်ကျဲနေသောပစ္စည်းများကိုရှင်းပြီး သပ်ရပ်အောင်ထားပါ။")),
    ...generalSurfaceCleaningRoutine.photos
  ];
}

const bedroomsLinensRoutine = routineTasks.find((task) => task.id === "bedrooms-linens");
if (bedroomsLinensRoutine) {
  bedroomsLinensRoutine.instructions = [
    t("Put pillows, bolsters, and blankets on a chair, not on the floor.", "枕、抱き枕、毛布は床ではなく椅子に置きます。", "ခေါင်းအုံး၊ ဖက်လုံးနှင့် စောင်များကို ကြမ်းပြင်ပေါ်မထားဘဲ ကုလားထိုင်ပေါ်တင်ပါ။"),
    t("Wash the used mattress protector, but always keep another protector on the mattress.", "使用済みのマットレスプロテクターを洗いますが、マットレスには必ず別のプロテクターを付けておきます。", "အသုံးပြုပြီးသော mattress protector ကိုလျှော်ပါ။ သို့သော် မွေ့ရာပေါ်တွင် အခြား protector တစ်ထည် အမြဲထားပါ။"),
    t("Vacuum the mattress and pillows with the dedicated bedding vacuum only.", "寝具専用掃除機だけを使って、マットレスと枕に掃除機を掛けます。", "အိပ်ရာသုံးသီးသန့် ဖုန်စုပ်စက်ဖြင့်သာ မွေ့ရာနှင့် ခေါင်းအုံးများကို ဖုန်စုပ်ပါ။"),
    t("Change all pillowcases and bolster covers.", "枕カバーと抱き枕カバーをすべて交換します。", "ခေါင်းအုံးစွပ်နှင့် ဖက်လုံးစွပ်အားလုံးကို လဲပါ။"),
    t("Fit the clean sheet. For the heavy King Koil The Knight Super King mattress (183 × 198 cm), tilt it onto the white bed-frame handlebar to reach the far corner.", "清潔なシーツを付けます。重いKing Koil The Knightスーパーキングマットレス（183 × 198 cm）は、奥の角に届くよう白いベッドフレームのハンドルバーに傾けます。", "သန့်ရှင်းသော အိပ်ရာခင်းကို တပ်ပါ။ လေးသော King Koil The Knight Super King မွေ့ရာ (183 × 198 cm) ၏ အဝေးထောင့်ကို လက်လှမ်းမီရန် အဖြူရောင် bed-frame handlebar ပေါ်သို့ စောင်းတင်ပါ။"),
    t("When finished, push the mattress fully back. Make sure it is no longer sitting on the white handlebar.", "終わったらマットレスを完全に元へ戻し、白いハンドルバーに載っていないことを確認します。", "ပြီးလျှင် မွေ့ရာကို မူလနေရာသို့ အပြည့်ပြန်တွန်းပါ။ အဖြူရောင် handlebar ပေါ်တွင် မကျန်ကြောင်း သေချာစစ်ပါ။"),
    t("Tuck the headrest cover in securely so it does not flop down.", "ヘッドレストカバーが垂れないよう、しっかり差し込みます。", "headrest cover ပြုတ်ကျမလာစေရန် ခိုင်ခိုင်မာမာ ထိုးထည့်ပါ။")
  ];
}

const pillowMattressVacuumingRoutine = routineTasks.find((task) => task.id === "pillow-mattress-vacuuming");
if (pillowMattressVacuumingRoutine) {
  pillowMattressVacuumingRoutine.active = false;
  pillowMattressVacuumingRoutine.photos = [
    photo("assets/routines/nako-pillow-mattress-vacuuming.jpg",
      t("Small vacuum cleaner on the bed", "ベッド上の小型掃除機", "အိပ်ရာပေါ်ရှိ သေးငယ်သော ဖုန်စုပ်စက်"),
      t("Use the small vacuum cleaner on pillows and accessible mattress surfaces. Focus on dust, hair, and fabric debris.", "枕と手が届くマットレス表面に小型掃除機を使ってください。ほこり、毛、布くずを重点的に掃除します。", "ခေါင်းအုံးများနှင့် လက်လှမ်းမီသော မွေ့ရာမျက်နှာပြင်များတွင် သေးငယ်သော ဖုန်စုပ်စက်ကို အသုံးပြုပါ။ ဖုန်၊ အမွှေးနှင့် အထည်အမှိုက်များကို အဓိကထားပါ။"))
  ];
}

const airconFilterFanCoilRoutine = routineTasks.find((task) => task.id === "aircon-filter-fan-coil");
if (airconFilterFanCoilRoutine) {
  airconFilterFanCoilRoutine.photos = [
    photo("assets/routines/nako-aircon-filter-fan-coil.jpg",
      t("Open aircon filter and fan coil area", "開いたエアコンフィルターとファンコイル部分", "ဖွင့်ထားသော အဲကွန်း filter နှင့် fan coil နေရာ"),
      t("Reference for the accessible aircon filter and fan coil area. Clean only the safe parts that have been taught, and do not dismantle deeper parts.", "手が届くエアコンフィルターとファンコイル部分の参考写真です。教わった安全な部分だけを掃除し、奥の部品は分解しないでください。", "လက်လှမ်းမီသော အဲကွန်း filter နှင့် fan coil နေရာအတွက် ကိုးကားပုံဖြစ်သည်။ သင်ပေးထားသော လုံခြုံသော အပိုင်းများကိုသာ သန့်ရှင်းရေးလုပ်ပြီး အတွင်းပိုင်းကို မဖြုတ်ပါနှင့်။"))
  ];
}

const washerDeepCleanRoutine = routineTasks.find((task) => task.id === "washer-deep-clean");
if (washerDeepCleanRoutine) {
  washerDeepCleanRoutine.instructions = [
    t("1. Do this only when Edwin asks and guides you. Keep the drum empty. Switch off and unplug the washer, and make sure any water inside has cooled.",
      "1. この作業は、Edwinが依頼し指導する場合にのみ行ってください。ドラムは空にしておきます。洗濯機の電源を切り、プラグをコンセントから抜き、内部の温水が冷めていることを確認します。",
      "၁။ Edwin က တောင်းဆိုပြီး လမ်းညွှန်သည့်အခါမှသာ ဤအလုပ်ကို လုပ်ပါ။ ဒရမ်ကို ဗလာဖြစ်အောင် ထားပါ။ အဝတ်လျှော်စက်ကို ပိတ်ပြီး ပလပ်ဖြုတ်ပါ၊ စက်အတွင်းရှိ ရေများ အေးသွားကြောင်း သေချာပါစေ။"),
    t("2. Remove the detergent drawer. Rinse it with warm water and clean residue using a soft brush. Wipe the drawer housing, dry the parts and reinstall the drawer.",
      "2. 洗剤引き出しを取り外します。温水ですすぎ、柔らかいブラシを使って残りカスをきれいにします。引き出しのハウジング（挿入部）を拭き取り、部品を乾かしてから引き出しを元に戻します。",
      "၂။ ဆပ်ပြာအံဆွဲကို ဖြုတ်ပါ။ ရေနွေးနွေးဖြင့် ဆေးပြီး soft brush သုံးကာ အနယ်များကို သန့်ရှင်းရေးလုပ်ပါ။ အံဆွဲအိမ်ကိုသုတ်ပါ၊ အစိတ်အပိုင်းများကို ခြောက်အောင်လုပ်ပြီး အံဆွဲကို ပြန်တပ်ပါ။"),
    t("3. Open the lower access flap. Place towels and a shallow tray underneath. Use the small emergency drain hose to drain the remaining water, then replace its cap securely.",
      "3. 下部のアクセスフラップ（カバー）を開きます。下にタオルと浅いトレイを置きます。小さな非常用排水ホースを使って残っている水を排出し、キャップをしっかりと閉め直します。",
      "၃။ အောက်ခြေအဖုံးကို ဖွင့်ပါ။ အောက်တွင် တဘက်များနှင့် တိမ်သောလင်ပန်းကို ချထားပါ။ ကျန်ရှိသော ရေများကို ထုတ်ရန် အရေးပေါ်ရေထုတ်ပိုက်အသေးကို သုံးပါ၊ ထို့နောက် ၎င်း၏အဖုံးကို သေချာစွာ ပြန်ပိတ်ပါ။"),
    t("4. Unscrew the pump filter slowly. Remove hair, lint, coins and other debris. Rinse the filter, then refit and tighten it securely before closing the flap.",
      "4. ポンプフィルターをゆっくりと回して外します。髪の毛、糸くず、硬貨、その他のゴミを取り除きます。フィルターをすすぎ、元に戻してしっかりと締め直してからフラップを閉じます。",
      "၄။ ပန့် filter ကို ဖြည်းညှင်းစွာ လှည့်ဖြုတ်ပါ။ ဆံပင်၊ ဖုန်၊ အကြွေစေ့များနှင့် အခြားအမှိုက်များကို ဖယ်ရှားပါ။ filter ကို ဆေးပါ၊ ထို့နောက် ပြန်တပ်ပြီး သေချာစွာ တင်းကျပ်အောင်ပိတ်ပြီးမှ အဖုံးကို ပိတ်ပါ။"),
    t("5. Wipe inside every fold of the rubber door seal and remove hair, dirt and trapped objects. If mould is present, use only a washer-safe mould cleaner or bleach diluted according to its product label. Rinse thoroughly and wipe dry.",
      "5. ドアのゴムパッキンのすべての折り目の内側を拭き、髪の毛、汚れ、挟まっている異物を取り除きます。カビがある場合は、洗濯機用の防カビ剤または製品ラベルに従って希釈した漂白剤のみを使用してください。十分に水拭きし、乾いた布で水分を拭き取ります。",
      "၅။ တံခါးရာဘာကွင်း၏ ခေါက်များအတွင်းပိုင်းကို သုတ်ပြီး ဆံပင်၊ ဖုန်များနှင့် ညပ်နေသောပစ္စည်းများကို ဖယ်ရှားပါ။ မှိုရှိပါက စက်အတွက် ဘေးကင်းသော မှိုသတ်ဆေး သို့မဟုတ် ၎င်း၏ဘူးပေါ်ရှိ လမ်းညွှန်ချက်အတိုင်း ရောစပ်ထားသော ချွတ်ဆေးကိုသာ သုံးပါ။ ရေစင်အောင်ဆေးပြီး ခြောက်အောင်သုတ်ပါ။"),
    t("6. Wipe the door, glass, control panel and exterior with a damp cloth, then dry them. Do not dismantle any panels or internal parts.",
      "6. ドア、ガラス、コントロールパネル、外装を濡れた布で拭き、その後乾かします。パネルや内部部品は分解しないでください。",
      "၆။ တံခါး၊ မှန်၊ control panel နှင့် အပြင်ပိုင်းကို စိုစွတ်သောအဝတ်ဖြင့်သုတ်ပြီး ခြောက်အောင်လုပ်ပါ။ မည်သည့် panel သို့မဟုတ် အတွင်းပိုင်း အစိတ်အပိုင်းများကိုမျှ မဖြုတ်ပါနှင့်။"),
    t("7. Run the built-in Tub Clean programme with an empty drum. Use only a washing-machine cleaner approved for front-loading machines and follow the cleaner’s instructions. Do not add normal laundry detergent.",
      "7. ドラムが空の状態で、内蔵されている槽洗浄（Tub Clean）コースを実行します。ドラム式（フロントロード）洗濯機用として承認されたクリーナーのみを使用し、クリーナーの指示に従ってください。通常の洗濯洗剤は入れないでください。",
      "၇။ အဝတ်မရှိသော drum ဖြင့် စက်တွင်ပါဝင်သည့် Tub Clean လုပ်ဆောင်ချက်ကို ဖွင့်ပါ။ front-loading စက်များအတွက် ခွင့်ပြုထားသော သန့်စင်ဆေးကိုသာ အသုံးပြုပြီး သန့်စင်ဆေးဘူးပေါ်ရှိ လမ်းညွှန်ချက်ကို လိုက်နာပါ။ ပုံမှန်အဝတ်လျှော်ဆပ်ပြာ မထည့်ပါနှင့်။"),
    t("8. After the cycle, leave the door and detergent drawer slightly open so the washer can dry.",
      "8. サイクルが終了したら、洗濯機が乾くように、ドアと洗剤引き出しを少し開けたままにしておきます。",
      "၈။ စက်လည်ပတ်ပြီးနောက် စက်ခြောက်သွေ့စေရန် တံခါးနှင့် ဆပ်ပြာအံဆွဲကို အနည်းငယ် ဟထားပါ။"),
    t("9. Check the water-inlet mesh filters only if filling is slow or an inlet-water error appears. Turn off the water taps before disconnecting the inlet hoses. Edwin must guide this step.",
      "9. 水のたまり方が遅い場合、または給水エラーが表示された場合にのみ、給水フィルターのメッシュを確認してください。給水ホースを取り外す前に、必ず水栓を閉めてください。この手順は、必ずEdwinの指導のもとで行ってください。",
      "၉။ ရေဝင်နှေးသည့်အခါ သို့မဟုတ် ရေဝင် error ပြသည့်အခါမှသာ ရေဝင်ဇကာဆန်ခါများကို စစ်ဆေးပါ။ ရေဝင်ပိုက်များကို မဖြုတ်မီ ရေခေါင်းများကို ပိတ်ပါ။ Edwin က ဤအဆင့်ကို လမ်းညွှန်ပေးရမည်။")
  ];
  washerDeepCleanRoutine.mustRemember = [
    t("Never mix bleach with vinegar, acid, ammonia or any other cleaner. Dangerous gas can form.",
      "漂白剤を酢、酸、アンモニア、または他のクリーナーと絶対に混ぜないでください。危険なガスが発生する恐れがあります。",
      "ချွတ်ဆေးကို ဗာနီဂါ၊ အက်စစ်၊ အမ်မိုနီးယား သို့မဟုတ် အခြားသန့်စင်ဆေးများနှင့် လုံးဝမရောပါနှင့်။ အန္တရာယ်ရှိသော ဓာတ်ငွေ့များ ဖြစ်ပေါ်နိုင်သည်။"),
    t("Do not use a 1:1 vinegar-water mixture on the rubber seal.",
      "ゴムパッキンに対して酢と水を1対1で混ぜた溶液を使用しないでください。",
      "ရာဘာကွင်းအတွက် ဗာနီဂါနှင့် ရေ ၁:၁ ရောစပ်ထားသော ဆေးရည်ကို အသုံးမပြုပါနှင့်။"),
    t("Do not use an unspecified amount of citric acid.",
      "不特定の分量のクエン酸を使用しないでください。",
      "ပမာဏသတ်မှတ်မထားသော citric acid ကို အသုံးမပြုပါနှင့်။"),
    t("Do not substitute a generic 90°C wash for the machine’s Tub Clean programme.",
      "洗濯機独自の槽洗浄（Tub Clean）コースの代わりに、一般的な90℃での空洗濯を行わないでください。",
      "စက်၏ Tub Clean အစီအစဉ်အစား ပုံမှန် ၉၀ ဒီဂရီဖြင့် လျှော်ခြင်းကို အသုံးမပြုပါနှင့်။"),
    t("After refitting the emergency drain-hose cap and pump filter, confirm both are secure.",
      "非常用排水ホースのキャップとポンプフィルターを取り付け直した後は、両方がしっかりと固定されていることを確認してください。",
      "အရေးပေါ်ရေထုတ်ပိုက်အဖုံးနှင့် ပန့် filter ကို ပြန်တပ်ပြီးနောက် နှစ်ခုလုံး လုံခြုံမှုရှိမရှိ အတည်ပြုပါ။"),
    t("Stop using the washer and tell Edwin immediately if water leaks.",
      "水漏れが発生した場合は、すぐに洗濯機の使用を中止し、Edwinに連絡してください。",
      "ရေယိုစိမ့်မှုရှိပါက စက်သုံးခြင်းကို ရပ်ပြီး Edwin ထံ ချက်ချင်း အကြောင်းကြားပါ။"),
    t("This remains a guided task and should only be done when Edwin requests it.",
      "この作業はガイド付き作業であり、Edwinから依頼された場合にのみ行うようにしてください。",
      "၎င်းသည် လမ်းညွှန်ချက်ဖြင့်လုပ်ရသော အလုပ်ဖြစ်ပြီး Edwin က တောင်းဆိုသည့်အခါမှသာ လုပ်ဆောင်ရမည်။")
  ];
  washerDeepCleanRoutine.videoUrl = "https://www.youtube.com/embed/YJDnRU0Zvd4";
  washerDeepCleanRoutine.videoUrlLabel = t(
    "Official LG Guide - Cleaning the Drain-Pump Filter",
    "LG公式ガイド - 排水ポンプフィルターの掃除",
    "LG တရားဝင်လမ်းညွှန် - ရေထုတ်ပန့် filter သန့်ရှင်းခြင်း"
  );
  washerDeepCleanRoutine.photos = [
    photo("assets/routines/nako-washer-deep-clean.jpg",
      t("Washing machine cleaner for deep clean", "洗濯機の徹底洗浄用クリーナー", "အဝတ်လျှော်စက် deep clean အတွက် သန့်ရှင်းရေးဆေး"),
      t("Use this washing machine cleaner for the empty-drum deep clean only when guided. Follow Edwin's instructions for the exact cycle and steps.", "案内があるときだけ、この洗濯機クリーナーを空のドラムの徹底洗浄に使用してください。正確なコースと手順はEdwinの指示に従ってください。", "လမ်းညွှန်ချက်ရှိသောအခါမှသာ ဤအဝတ်လျှော်စက်သန့်ရှင်းရေးဆေးကို အဝတ်မရှိသော drum deep clean အတွက် အသုံးပြုပါ။ တိကျသော cycle နှင့် အဆင့်များအတွက် Edwin ၏ညွှန်ကြားချက်ကို လိုက်နာပါ။"))
  ];
}
const doorbellChargingRoutine = routineTasks.find((task) => task.id === "doorbell-charging");
if (doorbellChargingRoutine) {
  doorbellChargingRoutine.mustRemember.push(
    t("Use the small pin on the top release hole to remove the doorbell, then bring it inside to charge. Edwin will demonstrate first and add more detailed photos/steps here later.", "上部の解除穴に小さなピンを差してドアベルを外し、室内に持って入って充電してください。Edwinが先に実演し、あとで詳しい写真と手順をここに追加します。", "အပေါ်ပိုင်း release hole တွင် သေးငယ်သော pin ကိုထိုး၍ doorbell ကိုဖြုတ်ပြီး အိမ်ထဲယူလာကာ အားသွင်းပါ။ Edwin က အရင်ပြသမည်ဖြစ်ပြီး နောက်ပိုင်းတွင် ပိုအသေးစိတ်သော ဓာတ်ပုံနှင့်အဆင့်များကို ဤနေရာတွင် ထည့်မည်။")
  );
  doorbellChargingRoutine.photos = [
    photo("assets/routines/nako-doorbell-charging.jpg",
      t("Dlingsmart doorbell mounted outside", "外に取り付けられているDlingsmartドアベル", "အပြင်ဘက်တွင် တပ်ထားသော Dlingsmart doorbell"),
      t("This is the Dlingsmart doorbell to remove for charging. Use the small pin at the top only after Edwin has demonstrated the release step.", "充電のために外すDlingsmartドアベルです。上部の小さなピンは、Edwinが外し方を実演した後にだけ使ってください。", "အားသွင်းရန် ဖြုတ်ရမည့် Dlingsmart doorbell ဖြစ်သည်။ Edwin က release လုပ်နည်းကို ပြသပြီးမှသာ အပေါ်ပိုင်း pin သေးသေးကို အသုံးပြုပါ။"))
  ];
}

const coffeeMachineDescalingRoutine = routineTasks.find((task) => task.id === "coffee-machine-descaling");
if (coffeeMachineDescalingRoutine) {
  coffeeMachineDescalingRoutine.instructions = [
    t("Turn the machine on and wait until it is ready.", "マシンの電源を入れ、準備完了になるまで待ちます。", "စက်ကိုဖွင့်ပြီး အသင့်ဖြစ်သည်အထိ စောင့်ပါ။"),
    t("Empty the drip tray and coffee grounds container.", "水受けトレーとコーヒーかす容器を空にします。", "ရေစက်ခံ tray နှင့် ကော်ဖီအကြွင်းအကျန်ဘူးကို ရှင်းပါ။"),
    t("Remove the water filter if one is installed.", "ウォーターフィルターが付いている場合は外します。", "ရေ filter တပ်ထားပါက ဖြုတ်ပါ။"),
    t("Add coffee-machine-safe descaler into the water tank, then add water to the marked level.", "コーヒーマシン用の安全な除石灰剤を水タンクに入れ、表示された線まで水を足します。", "ကော်ဖီစက်အတွက်သင့်သော descaler ကို ရေတိုင်ကီထဲထည့်ပြီး သတ်မှတ်ထားသောအမှတ်အထိ ရေဖြည့်ပါ။"),
    t("Place a large container under the cappuccino or steam spout.", "カプチーノまたはスチームノズルの下に大きな容器を置きます。", "cappuccino သို့မဟုတ် steam spout အောက်တွင် ကြီးသောခွက်/ဘူးတစ်ခု ထားပါ။"),
    t("Start descaling mode when the descale button/light flashes red.", "除石灰ボタンまたはランプが赤く点滅したら、除石灰モードを開始します。", "descale ခလုတ်/မီးနီ တောက်လာသောအခါ descaling mode ကိုစတင်ပါ။"),
    t("Let the machine run the descaling cycle.", "マシンに除石灰サイクルを実行させます。", "စက်ကို descaling cycle ပြီးဆုံးသည်အထိ လည်ပတ်စေပါ။"),
    t("Rinse the tank, refill with clean water, then run the rinse cycle.", "タンクをすすぎ、きれいな水を入れて、すすぎサイクルを実行します。", "တိုင်ကီကို ဆေးကြောပြီး ရေသန့်ပြန်ဖြည့်ကာ rinse cycle ကိုလုပ်ပါ။"),
    t("Reinsert the water filter after rinsing, if one is used.", "ウォーターフィルターを使っている場合は、すすぎ後に戻します。", "ရေ filter အသုံးပြုပါက ဆေးကြောပြီးနောက် ပြန်တပ်ပါ။")
  ];
  coffeeMachineDescalingRoutine.mustRemember.push(
    t("Do not descale the machine alone yet. Edwin must guide the first descaling while you follow the tutorial video.", "まだ一人で除石灰を行わないでください。初回はチュートリアル動画を見ながら、Edwinの指導の下で行ってください。", "လောလောဆယ် စက်ကို တစ်ယောက်တည်း descale မလုပ်ပါနဲ့။ ပထမဆုံးအကြိမ်မှာ tutorial video ကိုကြည့်ပြီး Edwin ရဲ့ လမ်းညွှန်မှုနဲ့ လုပ်ပါ။"),
    t("When descaling is needed, the descale button/light will flash red. We have not done this yet as of July 2026.", "除石灰が必要になると、除石灰ボタンまたはランプが赤く点滅します。2026年7月時点では、まだこの作業は行っていません。", "Descaling လိုအပ်လာသောအခါ descale ခလုတ်/မီးနီ တောက်မည်။ 2026 ဇူလိုင်အထိ ဤအလုပ်ကို မလုပ်ရသေးပါ။"),
    t("Use only a coffee-machine-safe descaler. Wipe any spilled descaler quickly because it can damage surfaces.", "コーヒーマシン用として安全な除石灰剤だけを使用してください。こぼれた場合は表面を傷めることがあるため、すぐに拭き取ってください。", "ကော်ဖီစက်အတွက် သင့်သော descaler ကိုသာ အသုံးပြုပါ။ ဖိတ်ကျပါက မျက်နှာပြင်များ ပျက်စီးနိုင်သောကြောင့် ချက်ချင်းသုတ်ပါ။")
  );
  coffeeMachineDescalingRoutine.photos = [
    photo("assets/routines/nako-coffee-machine-descaling.jpg",
      t("De'Longhi descaling tutorial", "De'Longhi除石灰チュートリアル", "De'Longhi descaling သင်ခန်းစာ"),
      t("Use the De'Longhi descaling tutorial video as the reference for this task.", "この作業の参考としてDe'Longhiの除石灰チュートリアル動画を使ってください。", "ဤအလုပ်အတွက် De'Longhi descaling သင်ခန်းစာဗီဒီယိုကို ကိုးကားပါ။")),
    photo("assets/routines/nako-coffee-machine-descaling-red-button.jpg",
      t("Red flashing descale button", "赤く点滅する除石灰ボタン", "နီရောင်တောက်နေသော descale ခလုတ်"),
      t("When the machine needs descaling, the descale button/light will flash red.", "マシンに除石灰が必要なとき、除石灰ボタンまたはランプが赤く点滅します。", "စက်သည် descaling လိုအပ်သောအခါ descale ခလုတ်/မီးနီ တောက်မည်။"))
  ];
  coffeeMachineDescalingRoutine.videoUrl = "https://www.youtube.com/embed/vcVPB1-0huA";
}

const vimleSofaBedRoutine = routineTasks.find((task) => task.id === "vimle-sofa-bed");
if (vimleSofaBedRoutine) {
  vimleSofaBedRoutine.instructions = [
    t("Opening: Clear the area in front. The bed extends about 241 cm from the back of the sofa.", "開く時：前のスペースを空けます。ベッドはソファの背面から約241 cmまで伸びます。", "ဖွင့်ရန် - ရှေ့နေရာကို ရှင်းပါ။ အိပ်ရာသည် ဆိုဖာနောက်ဘက်မှ 241 cm ခန့်အထိ ရှည်ထွက်သည်။"),
    t("Remove everything from the sofa.", "ソファの上にある物をすべて取ります。", "ဆိုဖာပေါ်ရှိ ပစ္စည်းအားလုံးကို ဖယ်ပါ။"),
    t("Remove both back cushions and both seat cushions, then put them aside.", "背もたれクッション2個と座面クッション2個を外し、横に置きます。", "နောက်မှီ cushion ၂ ခုနဲ့ ထိုင်ခုံ cushion ၂ ခုကို ဖယ်ပြီး ဘေးတွင်ထားပါ။"),
    t("Stand in the centre and hold the orange loop firmly.", "ソファの中央に立ち、オレンジ色のループをしっかり持ちます。", "ဆိုဖာအလယ်တွင်ရပ်ပြီး လိမ္မော်ရောင်ကြိုးကို ခိုင်ခိုင်ကိုင်ပါ။"),
    t("Pull the orange loop straight UP first.", "オレンジ色のループを最初に真上へ引きます。", "လိမ္မော်ရောင်ကြိုးကို အရင် တည့်တည့်အပေါ်ဆွဲပါ။"),
    t("When the frame rises, pull it OUT toward yourself while stepping backwards.", "フレームが上がったら、後ろへ下がりながら手前へ引き出します。", "frame မြင့်လာသောအခါ နောက်သို့ခြေလှမ်းဆုတ်ရင်း ကိုယ့်ဘက်သို့ အပြင်ဆွဲပါ။"),
    t("Guide the frame down gently until the mattress is flat.", "マットレスが平らになるまで、フレームをゆっくり下ろします。", "မွေ့ရာပြားသည်အထိ frame ကို ဖြည်းဖြည်းချပါ။"),
    t("Check every bottom leg rests steadily on the floor.", "下の脚がすべて床にしっかり着いていることを確認します。", "အောက်ခြေထောက်အားလုံး ကြမ်းပြင်ပေါ်တွင် ငြိမ်ငြိမ်ထောက်ထားကြောင်း စစ်ပါ။"),
    t("Vacuum the mattress once with the dedicated mattress vacuum cleaner.", "マットレス専用の掃除機でマットレスを1回掃除します。", "မွေ့ရာသီးသန့် ဖုန်စုပ်စက်ဖြင့် မွေ့ရာကို တစ်ကြိမ်ဖုန်စုပ်ပါ။"),
    t("Put on the bedsheet.", "ベッドシーツを掛けます。", "အိပ်ရာခင်းကို ခင်းပါ။"),
    t("Put the 2 back cushions at the head of the bed. Store the 2 seat cushions elsewhere.", "背もたれクッション2個をベッドの頭側に置き、座面クッション2個は別の場所に保管します。", "နောက်မှီ cushion ၂ ခုကို အိပ်ရာခေါင်းရင်းတွင်ထားပြီး ထိုင်ခုံ cushion ၂ ခုကို အခြားနေရာတွင် သိမ်းပါ။"),
    t("Closing: Remove the sheet, pillows, and all loose bedding.", "閉じる時：シーツ、枕、寝具をすべて外します。", "ပိတ်ရန် - အိပ်ရာခင်း၊ ခေါင်းအုံးနဲ့ အိပ်ရာပစ္စည်းအားလုံးကို ဖယ်ပါ။"),
    t("Lift the front edge of the metal frame UP, then push it toward the sofa.", "金属フレームの前端を上へ持ち上げてから、ソファ側へ押します。", "သတ္တု frame ရှေ့အစွန်းကို အပေါ်မြှောက်ပြီးမှ ဆိုဖာဘက်သို့ တွန်းပါ။"),
    t("Guide the frame as it folds in stages, then lower it fully into the sofa.", "段階的に折りたたまれるフレームを支え、ソファの中へ完全に下ろします。", "frame အဆင့်ဆင့်ခေါက်သွားချိန်တွင် ထိန်းပေးပြီး ဆိုဖာထဲသို့ လုံးဝချပါ။"),
    t("Leave the orange loop visible on top.", "次回見つけやすいよう、オレンジ色のループを上に見える状態で残します。", "နောက်တစ်ကြိမ် လွယ်လွယ်ရှာနိုင်ရန် လိမ္မော်ရောင်ကြိုးကို အပေါ်တွင် မြင်ရအောင်ထားပါ။"),
    t("Replace the 2 seat cushions first, then the 2 back cushions.", "座面クッション2個を先に戻し、その後、背もたれクッション2個を戻します。", "ထိုင်ခုံ cushion ၂ ခုကို အရင်ပြန်ထားပြီး နောက်မှီ cushion ၂ ခုကို နောက်မှပြန်ထားပါ။")
  ];
}

const essentialFoodStockRoutine = routineTasks.find((task) => task.id === "essential-food-stock");
if (essentialFoodStockRoutine) {
  essentialFoodStockRoutine.active = false;
}

const groceryShoppingRoutine = routineTasks.find((task) => task.id === "grocery-shopping");
if (groceryShoppingRoutine) {
  groceryShoppingRoutine.frequencyBucket = "daily";
  groceryShoppingRoutine.frequencyText = t("Daily active check", "毎日の確認", "နေ့စဉ် စစ်ဆေးရန်");
  groceryShoppingRoutine.sortOrder = 14;
  groceryShoppingRoutine.summary = t(
    "Check what is running low, then restock the pantry and fridge using the timing and store rules below.",
    "不足している物を確認し、下記の時間帯と店のルールに従って食品棚と冷蔵庫を補充します。",
    "ကုန်လုနီးသောပစ္စည်းများကို စစ်ပြီး အောက်ပါအချိန်နှင့်ဆိုင် စည်းမျဉ်းများအတိုင်း pantry နှင့် fridge ကို ပြန်ဖြည့်ပါ။"
  );
  groceryShoppingRoutine.groceryShops = [
    {
      id: "ntuc-fairprice",
      name: t("NTUC FairPrice", "NTUCフェアプライス", "NTUC FairPrice ဆိုင်"),
      icon: "🛒",
      sortOrder: 10,
      items: [
        {
          id: "milk",
          name: t("Milk", "牛乳", "နွားနို့"),
          icon: "🥛",
          category: "dairy",
          categorySort: 10,
          sortOrder: 10,
          photos: [photo("assets/ingredients/milk.jpg",
            t("Carton of milk", "牛乳パック", "နွားနို့ဘူး"),
            t("Choose the usual milk and check the expiry date.", "いつもの牛乳を選び、賞味期限を確認します。", "ပုံမှန်ဝယ်နေကျ နွားနို့ကိုရွေးပြီး သက်တမ်းကုန်ရက် စစ်ပါ။"))],
          instructions: [
            t("Check the fridge before buying.", "買う前に冷蔵庫を確認します。", "မဝယ်မီ ရေခဲသေတ္တာကို စစ်ပါ။"),
            t("Choose the usual milk with a suitable expiry date.", "賞味期限に余裕がある、いつもの牛乳を選びます。", "သက်တမ်းကုန်ရက် အဆင်ပြေသော ပုံမှန်ဝယ်နေကျ နွားနို့ကို ရွေးပါ။")
          ]
        },
        {
          id: "eggs",
          name: t("Eggs", "卵", "ကြက်ဥ"),
          icon: "🥚",
          category: "dairy",
          categorySort: 10,
          sortOrder: 20,
          photos: [photo("assets/ingredients/egg.jpg",
            t("Tray of eggs", "卵のパック", "ကြက်ဥကတ်"),
            t("Check that the eggs are not cracked.", "卵にひびがないことを確認します。", "ကြက်ဥများ အက်ကွဲမနေကြောင်း စစ်ပါ။"))],
          instructions: [
            t("Check how many eggs are left at home.", "家に卵がいくつ残っているか確認します。", "အိမ်မှာ ကြက်ဥ ဘယ်နှလုံးကျန်သလဲ စစ်ပါ။"),
            t("Choose a clean tray with no cracked eggs.", "汚れがなく、ひび割れた卵がないパックを選びます。", "သန့်ရှင်းပြီး အက်ကွဲနေသော ကြက်ဥမပါသည့်ကတ်ကို ရွေးပါ။")
          ]
        },
        {
          id: "bread",
          name: t("Bread", "パン", "ပေါင်မုန့်"),
          icon: "🍞",
          category: "bakery",
          categorySort: 20,
          sortOrder: 10,
          photos: [photo("assets/ingredients/bread.jpg",
            t("Loaf of bread", "食パン", "ပေါင်မုန့်ထုပ်"),
            t("Buy the usual loaf with a suitable expiry date.", "賞味期限に余裕がある、いつもの食パンを買います。", "သက်တမ်းကုန်ရက် အဆင်ပြေသော ပုံမှန်ဝယ်နေကျ ပေါင်မုန့်ကို ဝယ်ပါ။"))],
          instructions: [
            t("Check the bread at home before buying.", "買う前に家のパンを確認します。", "မဝယ်မီ အိမ်မှာရှိသော ပေါင်မုန့်ကို စစ်ပါ။"),
            t("Choose the usual loaf and check the expiry date.", "いつもの食パンを選び、賞味期限を確認します。", "ပုံမှန်ဝယ်နေကျ ပေါင်မုန့်ကိုရွေးပြီး သက်တမ်းကုန်ရက် စစ်ပါ။")
          ]
        },
        {
          id: "japanese-rice",
          name: t("Japanese rice", "日本米", "ဂျပန်ဆန်"),
          icon: "🍚",
          category: "pantry",
          categorySort: 30,
          sortOrder: 10,
          photos: [photo("assets/ingredients/rice.jpg",
            t("Japanese rice", "日本米", "ဂျပန်ဆန်"),
            t("Use this photo to identify Japanese rice.", "この写真を日本米を見分ける参考にします。", "ဂျပန်ဆန်ကို ခွဲသိရန် ဒီပုံကို ကြည့်ပါ။"))],
          instructions: [
            t("Check the rice container and spare bag first.", "米びつと予備の袋を先に確認します。", "ဆန်ပုံးနဲ့ ဆန်အပိုအိတ်ကို အရင်စစ်ပါ။"),
            t("If the brand or bag size is unclear, ask before buying.", "銘柄や袋の大きさが分からない場合は、買う前に確認します。", "ဆန်တံဆိပ် သို့မဟုတ် အိတ်အရွယ်အစား မသေချာပါက မဝယ်မီ မေးပါ။")
          ]
        },
        {
          id: "tofu",
          name: t("Tofu", "豆腐", "တို့ဖူး"),
          icon: "◻️",
          category: "chilled",
          categorySort: 40,
          sortOrder: 10,
          photos: [photo("assets/ingredients/firm-tofu.jpg",
            t("Pack of firm tofu", "木綿豆腐のパック", "တို့ဖူးအမာထုပ်"),
            t("Check the tofu type and expiry date.", "豆腐の種類と賞味期限を確認します。", "တို့ဖူးအမျိုးအစားနဲ့ သက်တမ်းကုန်ရက်ကို စစ်ပါ။"))],
          instructions: [
            t("Check the fridge before buying tofu.", "豆腐を買う前に冷蔵庫を確認します。", "တို့ဖူးမဝယ်မီ ရေခဲသေတ္တာကို စစ်ပါ။"),
            t("Choose the usual type and check the expiry date.", "いつもの種類を選び、賞味期限を確認します。", "ပုံမှန်ဝယ်နေကျ အမျိုးအစားကိုရွေးပြီး သက်တမ်းကုန်ရက် စစ်ပါ။")
          ]
        }
      ]
    },
    {
      id: "giant",
      name: t("Giant", "ジャイアント", "Giant ဆိုင်"),
      icon: "🟢",
      sortOrder: 20,
      items: [
        {
          id: "enoki-mushrooms",
          name: t("Enoki mushrooms", "えのき", "enoki မှို"),
          icon: "🍄",
          category: "mushrooms",
          categorySort: 10,
          sortOrder: 10,
          photos: [photo("assets/ingredients/enoki-mushroom.jpg",
            t("Pack of enoki mushrooms", "えのきのパック", "enoki မှိုထုပ်"),
            t("Choose fresh, pale enoki with no slime.", "白く新鮮で、ぬめりのないえのきを選びます。", "လတ်ဆတ်ပြီး ဖြူဖွေးကာ ချွဲမနေသော enoki မှိုကို ရွေးပါ။"))],
          instructions: [
            t("Choose a fresh pack with no slime or dark wet spots.", "ぬめりや黒く濡れた部分がない新鮮なパックを選びます。", "ချွဲမနေဘဲ မည်းပြီးစိုနေသော အစက်မရှိသည့် လတ်ဆတ်သောအထုပ်ကို ရွေးပါ။"),
            t("Put it in the fridge after returning home.", "帰宅後は冷蔵庫に入れます。", "အိမ်ပြန်ရောက်လျှင် ရေခဲသေတ္တာထဲ ထည့်ပါ။")
          ]
        },
        {
          id: "brown-shimeji-mushrooms",
          name: t("Brown shimeji mushrooms", "茶色のしめじ", "အညိုရောင် shimeji မှို"),
          icon: "🍄",
          category: "mushrooms",
          categorySort: 10,
          sortOrder: 20,
          photos: [photo("assets/ingredients/shimeji-mushroom.jpg",
            t("Pack of brown shimeji mushrooms", "茶色のしめじのパック", "အညိုရောင် shimeji မှိုထုပ်"),
            t("Choose firm brown shimeji mushrooms.", "しっかりした茶色のしめじを選びます。", "တင်းရင်းသော အညိုရောင် shimeji မှိုကို ရွေးပါ။"))],
          instructions: [
            t("Choose firm mushrooms with a dry, clean pack.", "しっかりしていて、パックが乾いて清潔なものを選びます。", "တင်းရင်းပြီး အထုပ်ခြောက်သွေ့သန့်ရှင်းသော မှိုကို ရွေးပါ။"),
            t("Put them in the fridge after returning home.", "帰宅後は冷蔵庫に入れます。", "အိမ်ပြန်ရောက်လျှင် ရေခဲသေတ္တာထဲ ထည့်ပါ။")
          ]
        },
        {
          id: "frozen-sliced-pork",
          name: t("Frozen sliced pork", "冷凍豚肉スライス", "အေးခဲဝက်သားပါးပါး"),
          icon: "🥩",
          category: "frozen",
          categorySort: 20,
          sortOrder: 10,
          photos: [photo("assets/ingredients/pork.jpg",
            t("Sliced pork", "豚肉スライス", "ဝက်သားပါးပါး"),
            t("Buy the usual frozen sliced pork.", "いつもの冷凍豚肉スライスを買います。", "ပုံမှန်ဝယ်နေကျ အေးခဲဝက်သားပါးပါးကို ဝယ်ပါ။"))],
          instructions: [
            t("Check the freezer before buying.", "買う前に冷凍庫を確認します。", "မဝယ်မီ freezer ကို စစ်ပါ။"),
            t("Choose the usual frozen sliced pork and keep it cold on the way home.", "いつもの冷凍豚肉スライスを選び、帰宅まで冷たい状態を保ちます。", "ပုံမှန်ဝယ်နေကျ အေးခဲဝက်သားပါးပါးကိုရွေးပြီး အိမ်ပြန်ရောက်သည်အထိ အေးနေအောင်ထားပါ။"),
            t("Put it in the freezer immediately after returning home.", "帰宅後すぐに冷凍庫へ入れます。", "အိမ်ပြန်ရောက်သည်နှင့် freezer ထဲ ချက်ချင်းထည့်ပါ။")
          ]
        },
        {
          id: "broccoli",
          name: t("Broccoli", "ブロッコリー", "ဘရိုကိုလီ"),
          icon: "🥦",
          category: "vegetables",
          categorySort: 30,
          sortOrder: 10,
          photos: [photo("assets/ingredients/broccoli.jpg",
            t("Fresh broccoli", "新鮮なブロッコリー", "လတ်ဆတ်သော ဘရိုကိုလီ"),
            t("Choose firm, dark-green broccoli.", "硬くて濃い緑色のブロッコリーを選びます。", "တင်းရင်းပြီး အစိမ်းရင့်ရောင် ဘရိုကိုလီကို ရွေးပါ။"))],
          instructions: [
            t("Choose firm broccoli with dark-green florets.", "硬く、花蕾が濃い緑色のブロッコリーを選びます。", "တင်းရင်းပြီး အဖူးများ အစိမ်းရင့်ရောင်ရှိသော ဘရိုကိုလီကို ရွေးပါ။"),
            t("Put it in the fridge after returning home.", "帰宅後は冷蔵庫に入れます。", "အိမ်ပြန်ရောက်လျှင် ရေခဲသေတ္တာထဲ ထည့်ပါ။")
          ]
        }
      ]
    },
    {
      id: "wet-market",
      name: t("Wet Market", "ウェットマーケット", "ရပ်ကွက်ဈေး"),
      icon: "🐟",
      sortOrder: 30,
      items: [
        {
          id: "fresh-prawns",
          name: t("Fresh prawns", "新鮮なエビ", "ပုစွန်လတ်"),
          icon: "🦐",
          category: "seafood",
          categorySort: 10,
          sortOrder: 10,
          photos: [photo("assets/routines/grocery-shopping-wet-market-prawns.jpg",
            t("Fresh prawns at the wet-market seafood stall", "市場の鮮魚店にある新鮮なエビ", "စျေးပင်လယ်စာဆိုင်ရှိ ပုစွန်လတ်များ"),
            t("Use this stall and prawn display as the buying reference.", "この店とエビの陳列を購入時の目印にします。", "ဝယ်သည့်အခါ ဒီဆိုင်နဲ့ ပုစွန်ခင်းထားပုံကို မှတ်သားပါ။"))],
          instructions: [
            t("Buy prawns only when they are on the shopping list or requested.", "エビは買い物リストにある時、または頼まれた時だけ買います。", "ပုစွန်ကို shopping list ထဲမှာပါသည့်အခါ သို့မဟုတ် တောင်းဆိုထားသည့်အခါမှသာ ဝယ်ပါ။"),
            t("If the amount is unclear, ask before buying.", "量が分からない場合は、買う前に確認します。", "ပမာဏမသေချာပါက မဝယ်မီ မေးပါ။")
          ]
        },
        {
          id: "bananas",
          name: t("Bananas", "バナナ", "ငှက်ပျောသီး"),
          icon: "🍌",
          category: "fruit",
          categorySort: 20,
          sortOrder: 10,
          photos: [photo("assets/routines/essential-food-stock-bananas.jpg",
            t("Banana bunches at the wet-market fruit stall", "市場の果物店に吊られたバナナ", "စျေးသစ်သီးဆိုင်တွင် ချိတ်ထားသော ငှက်ပျောသီးခိုင်များ"),
            t("Use the marked banana bunches as the buying reference.", "印を付けたバナナの房を購入時の目印にします。", "ဝယ်သည့်အခါ အမှတ်အသားပြထားသော ငှက်ပျောသီးခိုင်များကို ကြည့်ပါ။"))],
          instructions: [
            t("Check the bananas at home before buying.", "買う前に家のバナナを確認します。", "မဝယ်မီ အိမ်မှာရှိသော ငှက်ပျောသီးကို စစ်ပါ။"),
            t("Use the marked bunches in the photo as the buying reference.", "写真で印を付けた房を購入時の目印にします。", "ဝယ်သည့်အခါ ပုံထဲမှာ အမှတ်အသားပြထားသော ငှက်ပျောသီးခိုင်များကို ကြည့်ပါ။")
          ]
        }
      ]
    },
    {
      id: "u-stars",
      name: t("U Stars", "U Starsスーパー", "U Stars ဆိုင်"),
      icon: "⭐",
      sortOrder: 40,
      items: [
        {
          id: "tomatoes",
          name: t("Tomatoes", "トマト", "ခရမ်းချဉ်သီး"),
          icon: "🍅",
          category: "vegetables",
          categorySort: 10,
          sortOrder: 10,
          photos: [photo("assets/ingredients/tomato.jpg",
            t("Fresh tomatoes", "新鮮なトマト", "ခရမ်းချဉ်သီးလတ်"),
            t("Choose firm tomatoes with no bruises.", "硬く、傷みのないトマトを選びます。", "တင်းရင်းပြီး ထိခိုက်ပျက်စီးရာမရှိသော ခရမ်းချဉ်သီးကို ရွေးပါ။"))],
          instructions: [
            t("Choose firm tomatoes with smooth skin and no bruises.", "皮が滑らかで、硬く、傷みのないトマトを選びます。", "အခွံချောပြီး တင်းရင်းကာ ထိခိုက်ပျက်စီးရာမရှိသော ခရမ်းချဉ်သီးကို ရွေးပါ။"),
            t("Do not buy more than needed for the planned meals.", "予定している食事に必要な量を超えて買わないでください。", "ချက်မည့်အစားအစာအတွက် လိုသည့်ပမာဏထက် ပိုမဝယ်ပါနှင့်။")
          ]
        }
      ]
    }
  ];
  groceryShoppingRoutine.mustRemember.push(
    t("This is a daily active reference check, not a completion-checklist item. Check the fridge, pantry, shopping list, and meal needs before buying.", "これは毎日確認する参照ページで、完了チェックリストの項目ではありません。買う前に冷蔵庫、食品棚、買い物リスト、食事に必要なものを確認してください。", "ဤအရာသည် နေ့စဉ် active reference check ဖြစ်ပြီး completion checklist အလုပ်မဟုတ်ပါ။ မဝယ်မီ fridge၊ pantry၊ shopping list နှင့် အစားအစာလိုအပ်ချက်များကို စစ်ပါ။"),
    t("Before about 9 a.m., buy fresh meat, fish, or vegetables from a clean, busy wet-market stall if they look fresh. After about 9 a.m., use Giant, NTUC FairPrice, Sheng Siong, Cold Storage, or another major supermarket.", "午前9時ごろより前なら、清潔で客の多いウェットマーケットの店で、新鮮に見える肉、魚、野菜を買ってよいです。午前9時ごろ以降は、Giant、NTUC FairPrice、Sheng Siong、Cold Storageなどの大手スーパーを使います。", "မနက် ၉ နာရီခန့်မတိုင်မီဆိုလျှင် သန့်ရှင်းပြီး လူဝယ်များသော wet-market ဆိုင်မှ လတ်ဆတ်ပုံရသော အသား၊ ငါး သို့မဟုတ် ဟင်းသီးဟင်းရွက်များကို ဝယ်နိုင်သည်။ မနက် ၉ နာရီခန့်နောက်ပိုင်းတွင် Giant၊ NTUC FairPrice၊ Sheng Siong၊ Cold Storage သို့မဟုတ် အခြား supermarket ကြီးများကို သုံးပါ။"),
    t("Always keep the receipt. Bring chilled or frozen food home immediately so it stays cold. Coordinate before buying large or unusual items.", "必ずレシートを保管してください。冷蔵・冷凍食品は冷たい状態を保つため、すぐ家に持ち帰ります。大きい物や普段買わない物を買う前に確認してください。", "receipt ကို အမြဲသိမ်းထားပါ။ chilled သို့မဟုတ် frozen food ကို အေးနေစေရန် ချက်ချင်းအိမ်ပြန်ယူပါ။ ကြီးသော သို့မဟုတ် ပုံမှန်မဝယ်သော ပစ္စည်းများ မဝယ်မီ အရင်မေးပါ။"),
    t("Check expiry dates. Store sliced pork in the freezer and broccoli in the fridge. Restock broccoli before it runs out.", "賞味期限を確認します。豚肉スライスは冷凍庫、ブロッコリーは冷蔵庫で保管し、なくなる前に補充します。", "သက်တမ်းကုန်ရက်ကို စစ်ပါ။ ဝက်သားပါးပါးကို freezer ထဲ၊ ဘရိုကိုလီကို ရေခဲသေတ္တာထဲ သိမ်းပါ။ ဘရိုကိုလီ မကုန်မီ ပြန်ဝယ်ပါ။"),
    t("Add items to the shopping list before they run out.", "なくなる前に買い物リストへ追加してください。", "ပစ္စည်းမကုန်မီ shopping list ထဲထည့်ပါ။")
  );
  groceryShoppingRoutine.photos = [
    photo("assets/routines/nako-grocery-shopping.png",
      t("Daily grocery shopping items", "毎日の食料品の買い物品", "နေ့စဉ် ကုန်စုံဝယ်သော ပစ္စည်းများ"),
      t("Buy daily groceries based on what is running low and what is needed for meals.", "少なくなっているものと食事に必要なものを確認して、毎日の食料品を買ってください。", "ကုန်သွားခါနီးသောအရာများနှင့် အစားအစာအတွက် လိုအပ်သောအရာများအပေါ်မူတည်၍ နေ့စဉ်ကုန်စုံဝယ်ပါ။")),
    photo("assets/routines/grocery-shopping-wet-market-prawns.jpg",
      t("Fresh prawns at the wet-market seafood stall", "市場の鮮魚店にある新鮮なエビ", "စျေးပင်လယ်စာဆိုင်ရှိ ပုစွန်လတ်များ"),
      t("Buy fresh prawns here only when they are on the shopping list or requested. Confirm the amount if unsure.", "買い物リストにある時、または頼まれた時だけ、ここで新鮮なエビを買います。量が不明な場合は確認してください。", "shopping list ထဲတွင်ပါသည့်အခါ သို့မဟုတ် တောင်းဆိုထားသည့်အခါမှသာ ဤနေရာမှ ပုစွန်လတ်များ ဝယ်ပါ။ ပမာဏမသေချာပါက မေးပါ။")),
    photo("assets/routines/essential-food-stock-bananas.jpg",
      t("Banana bunches at the wet-market fruit stall", "市場の果物店に吊られたバナナ", "စျေးသစ်သီးဆိုင်တွင် ချိတ်ထားသော ငှက်ပျောသီးခိုင်များ"),
      t("Use the marked banana bunches as the buying reference when home stock is running low.", "家の在庫が少なくなった時は、印を付けたバナナの房を購入の目安にします。", "အိမ်တွင် ငှက်ပျောသီးနည်းလာပါက အမှတ်အသားပြထားသော ငှက်ပျောသီးခိုင်များကို ဝယ်ယူရန် ကိုးကားပါ။")),
    ...groceryShoppingRoutine.photos
  ];
}

const yukariFlightPackingRoutine = routineTasks.find((task) => task.id === "yukari-flight-packing");
if (yukariFlightPackingRoutine) {
  yukariFlightPackingRoutine.instructions = [
    t("Check the details/packing list for the specific items needed for that flight or trip.", "そのフライトまたは旅行に必要な具体的な物は、詳細または荷造りリストで確認してください。", "ထိုလေယာဉ်ခရီး သို့မဟုတ် ခရီးစဉ်အတွက် လိုအပ်သောပစ္စည်းများကို အသေးစိတ်/packing list တွင် စစ်ပါ။"),
    t("Packing depends on the trip type, destination, and length of the flight duty.", "荷造りは、旅行の種類、行き先、フライト勤務の長さによって変わります。", "အထုပ်ပြင်ခြင်းသည် ခရီးအမျိုးအစား၊ သွားမည့်နေရာနှင့် flight duty ကြာချိန်အပေါ် မူတည်သည်။"),
    t("For turnaround trips, pack much less; usually one small luggage is enough.", "日帰り往復のようなターンアラウンド便では荷物は少なめで、通常は小さいスーツケース1つで十分です。", "Turnaround ခရီးများအတွက် ပစ္စည်းအနည်းငယ်သာထည့်ပါ။ ပုံမှန်အားဖြင့် luggage အသေးတစ်လုံးလုံလောက်သည်။"),
    t("For Japan trips or longer flights, the big grey luggage may be needed. Confirm before packing.", "日本行きや長いフライトでは、大きなグレーのスーツケースが必要になる場合があります。荷造り前に確認してください。", "Japan ခရီး သို့မဟုတ် ပိုရှည်သော flight များအတွက် မီးခိုးရောင် luggage ကြီးလိုနိုင်သည်။ အထုပ်မပြင်မီ အတည်ပြုပါ။"),
    t("When packing or unpacking, check the luggage wheels. If they are dirty or dusty, clean them with the separate dirty-area cloth and standard Magiclean disinfectant. Do not use a normal household cloth.", "荷造りまたは荷解きの時に、スーツケースの車輪を確認してください。汚れやほこりがある場合は、汚れた場所専用の布と通常のマジックリン除菌スプレーで掃除します。普段の掃除用布は使わないでください。", "luggage ထုပ်တဲ့အခါ သို့မဟုတ် ဖွင့်တဲ့အခါ ဘီးတွေကို စစ်ပါ။ ညစ်ပတ် သို့မဟုတ် ဖုန်ထူနေရင် အညစ်အကြေးနေရာသုံး သီးသန့်အဝတ်နဲ့ standard Magiclean disinfectant ကို သုံးပြီး သုတ်ပါ။ ပုံမှန်အိမ်သန့်ရှင်းရေးအဝတ်ကို မသုံးပါနဲ့။")
  ];
  yukariFlightPackingRoutine.mustRemember.push(
    t("Do not assume every flight needs the same luggage. Match the bag size and packed items to the actual trip.", "すべてのフライトで同じ荷物が必要だと思い込まないでください。実際の旅行に合わせてバッグの大きさと中身を調整してください。", "Flight တိုင်းတွင် luggage တူတူလိုသည်ဟု မယူဆပါနှင့်။ အမှန်တကယ်ခရီးနှင့်ကိုက်ညီအောင် အိတ်အရွယ်အစားနှင့် ထည့်မည့်ပစ္စည်းများကို ရွေးပါ။")
  );
  yukariFlightPackingRoutine.photos = [
    photo("assets/routines/nako-yukari-flight-packing.jpg",
      t("Flight work packing with luggage", "フライト勤務用の荷物準備", "Flight အလုပ်အတွက် luggage ထုပ်ပိုးခြင်း"),
      t("Reference setup for packing flight work items. Use the details list and adjust luggage size by trip type.", "フライト勤務用品の荷造り参考写真です。詳細リストを使い、旅行の種類に合わせてスーツケースの大きさを調整してください。", "Flight အလုပ်ပစ္စည်းများ ထုပ်ပိုးရန် ကိုးကားပုံဖြစ်သည်။ အသေးစိတ်စာရင်းကိုသုံးပြီး ခရီးအမျိုးအစားအလိုက် luggage အရွယ်အစားကိုညှိပါ။")),
    photo("assets/routines/separate-cloth-magiclean-dirty-areas.jpg",
      t("Separate cloth and Magiclean disinfectant beside luggage wheels", "スーツケースの車輪の横にある専用布とマジックリン除菌スプレー", "luggage ဘီးဘေးရှိ သီးသန့်အဝတ်နှင့် Magiclean disinfectant"),
      t("Clean dirty or dusty luggage wheels with this separate cloth and standard Magiclean disinfectant. Do not use the normal household cloth.", "汚れやほこりのあるスーツケースの車輪は、この専用布と通常のマジックリン除菌スプレーで掃除します。普段の掃除用布は使いません。", "ညစ်ပတ် သို့မဟုတ် ဖုန်ထူနေတဲ့ luggage ဘီးတွေကို ဒီသီးသန့်အဝတ်နဲ့ standard Magiclean disinfectant သုံးပြီး သုတ်ပါ။ ပုံမှန်အိမ်သန့်ရှင်းရေးအဝတ်ကို မသုံးပါနဲ့။")),
    ...yukariFlightPackingRoutine.photos
  ];
}

const nakoSupervisionRoutine = routineTasks.find((task) => task.id === "nako-supervision");
if (nakoSupervisionRoutine) {
  nakoSupervisionRoutine.mustRemember.unshift(
    t("Check that exactly two fingers fit between Nako's collar and neck. It must not be too tight or too loose; check before she goes out or roams.", "ナコの首輪と首の間に指がちょうど2本入るか確認する。きつ過ぎず、緩過ぎないようにし、外出または自由に歩き回らせる前に毎回確認する。", "Nako ၏လည်ပတ်နှင့်လည်ပင်းကြား လက်ချောင်း ၂ ချောင်းတိတိ ဝင်နိုင်မဝင်နိုင် စစ်ပါ။ အရမ်းကျပ်လွန်း သို့မဟုတ် ချောင်လွန်းမနေစေရ၊ အပြင်ထွက်မီ သို့မဟုတ် လွတ်လပ်စွာသွားလာမီ စစ်ပါ။"),
    t("⚠️ **WINDOW SAFETY ALERT:** Window grilles do not make the area completely safe. Keep Nako away from window edges and do not lean out, climb, or put weight near windows.", "⚠️ **窓の安全注意:** 窓グリルがあっても完全に安全ではありません。ナコを窓の端から離し、身を乗り出す、登る、窓の近くに体重をかける行為は禁止です。", "⚠️ **ပြတင်းပေါက် ဘေးကင်းရေး:** window grille ရှိသော်လည်း လုံးဝဘေးကင်းသည် မဟုတ်ပါ။ Nako ကို ပြတင်းပေါက်အနားမှ ဝေးဝေးထားပြီး ကိုယ်မယောင်း၊ မတက်၊ ပြတင်းပေါက်အနီး ကိုယ်အလေးချိန် မတင်ပါနှင့်။")
  );
}

const dailyCookingRoutine = routineTasks.find((task) => task.id === "daily-cooking");
if (dailyCookingRoutine) {
  dailyCookingRoutine.mustRemember.push(
    t("**WHITE RICE (Tefal Mini):** 1) Turn on the main power switch. 2) Press **Menu** until the white line is on **White Rice**. 3) Press **Start**.", "**白米（Tefal Mini）:** ①元の電源スイッチを入れる。②白いラインが**White Rice**に来るまで**Menu**を押す。③**Start**を押す。", "**ဆန်ဖြူ (Tefal Mini):** ၁) ပင်မ power switch ကိုဖွင့်ပါ။ ၂) အဖြူရောင်လိုင်း **White Rice** နေရာရောက်အောင် **Menu** ကိုနှိပ်ပါ။ ၃) **Start** ကိုနှိပ်ပါ။"),
    t("Keep food and snacks out of bedrooms. Use only the kitchen, dining, or living areas to prevent crumbs, smells, stains, ants, cockroaches, and other pests.", "寝室に食べ物やお菓子を持ち込まないでください。食べ物はキッチン、ダイニング、リビングだけで扱い、食べくず、臭い、汚れ、アリ、ゴキブリなどの害虫を防いでください。", "အိပ်ခန်းထဲ အစားအစာနဲ့ မုန့်တွေ မယူပါနဲ့။ အစားအစာကို မီးဖိုချောင်၊ dining သို့မဟုတ် living area မှာပဲ စား/ထားပါ။ အစအန၊ အနံ့၊ အစွန်းအထင်း၊ ပုရွက်ဆိတ်၊ ပိုးဟပ်နဲ့ အခြားပိုးမွှားတွေကို ကာကွယ်ဖို့ပါ။"),
    t("**FYI ONLY:** Other food recipes are reference only. Make them only when you are asked.", "**参考のみ:** ほかの料理レシピは参考用です。頼まれた時だけ作る。", "**အချက်အလက်အတွက်သာ:** အခြားဟင်းချက်နည်းများသည် ကိုးကားရန်သာဖြစ်သည်။ တောင်းဆိုသည့်အခါမှသာ ချက်ပါ။")
  );
  dailyCookingRoutine.photos = [
    photo("assets/routines/tefal-mini-rice-cooker-white-rice.jpg",
      t("Tefal Mini rice cooker: White Rice controls", "Tefal Mini炊飯器：White Riceの操作", "Tefal Mini ထမင်းပေါင်းအိုး: White Rice ခလုတ်များ"),
      t("For white rice: turn on the main power switch, press Menu until the white line is on White Rice, then press Start.", "白米の場合：元の電源スイッチを入れ、白いラインがWhite Riceに来るまでMenuを押し、Startを押します。", "ဆန်ဖြူအတွက် ပင်မ power switch ကိုဖွင့်ပါ၊ အဖြူရောင်လိုင်း White Rice နေရာရောက်အောင် Menu ကိုနှိပ်ပြီး Start ကိုနှိပ်ပါ။")),
    ...dailyCookingRoutine.photos
  ];
}

const nakoPottyPenRoutine = routineTasks.find((task) => task.id === "nako-potty-pen");
if (nakoPottyPenRoutine) {
  nakoPottyPenRoutine.instructions = [
    ...nakoPottyPenRoutine.instructions,
    t("When changing the pee pad, keep the pad inside the pink side line. The pad must never cross the line.", "ペットシーツを交換するときは、シーツをピンクの横線の内側に収めてください。絶対に線を越えないようにします。", "pee pad လဲသောအခါ pad ကို ပန်းရောင်ဘေးလိုင်းအတွင်းတွင်ထားပါ။ pad သည် လိုင်းကို ဘယ်တော့မှ မကျော်ရပါ။"),
    t("If the pee pad crosses the line, the tray cover will not fully hide it and Nako may bite, pull out, and tear the pad.", "ペットシーツが線を越えると、トレーの上カバーで完全に隠れず、Nakoが噛んだり引っ張り出したり破いたりする可能性があります。", "pee pad သည် လိုင်းကျော်ပါက tray cover က အပြည့်မဖုံးနိုင်ဘဲ Nako က ကိုက်ခြင်း၊ ဆွဲထုတ်ခြင်း၊ ဖြဲခြင်းလုပ်နိုင်သည်။"),
    t("If Nako pulls out or ravages the pee pad, do a full cleaning of the entire pen.", "Nakoがペットシーツを引っ張り出したり荒らしたりした場合は、ペン全体をしっかり掃除してください。", "Nako က pee pad ကို ဆွဲထုတ်ခြင်း သို့မဟုတ် ဖျက်ဆီးခြင်းလုပ်ပါက pen တစ်ခုလုံးကို အပြည့်သန့်ရှင်းရေးလုပ်ပါ။"),
    t("If poop lands outside the tray, it may have stuck to Nako's fur or legs after she used the tray. Pick it up, check and clean her fur and legs, then clean the entire pen floor.", "トレーの外にうんちが落ちている場合、トレー使用後にナコの毛や足に付いて落ちた可能性があります。うんちを拾い、毛と足を確認してきれいにし、ペンの床全体を掃除してください。", "tray အပြင်ဘက်တွင် ချေးကျနေပါက tray သုံးပြီးနောက် Nako ၏အမွေး သို့မဟုတ် ခြေထောက်တွင်ကပ်ပြီး ကျလာနိုင်သည်။ ချေးကိုကောက်၊ အမွေးနှင့်ခြေထောက်များကို စစ်ပြီးသန့်ရှင်းကာ pen ကြမ်းပြင်တစ်ခုလုံးကို သန့်ရှင်းပါ။"),
    t("Use the pet urine and odour-removal spray on urine marks and the pee tray or pen floor as needed to remove urine and pee smell.", "尿の跡やトイレトレー、ペンの床には、必要に応じてペット用の尿・消臭スプレーを使い、尿やおしっこの臭いを取り除いてください。", "ဆီးကွက်များနှင့် pee tray သို့မဟုတ် pen ကြမ်းပြင်ပေါ်တွင် လိုအပ်သလို pet urine and odour-removal spray ကိုသုံးပြီး ဆီးနှင့် pee အနံ့ကို ဖယ်ရှားပါ။")
  ];
  nakoPottyPenRoutine.mustRemember.push(
    t("Key principle: only the pee tray may have pee or poop smell. If anything outside the tray may have touched pee or poop, wipe it clean and use enzyme cleaner as appropriate.", "重要原則: おしっこ・うんちの臭いがあってよい場所はトレーだけです。トレーの外で触れた可能性がある物や場所は拭き、適切に酵素クリーナーを使ってください。", "အဓိကစည်းမျဉ်း: ဆီး သို့မဟုတ် ချေးအနံ့ရှိနိုင်သောနေရာသည် pee tray တစ်ခုတည်းသာဖြစ်ရမည်။ tray အပြင်ဘက်တွင် ဆီး/ချေးထိနိုင်သော ပစ္စည်း သို့မဟုတ် နေရာကို သုတ်ပြီး သင့်တော်သလို enzyme cleaner သုံးပါ။")
  );
  nakoPottyPenRoutine.photos = [
    photo("assets/routines/nako-potty-outside-poop-floor.jpg",
      t("Poop outside the potty tray in Nako's pen", "ナコのペン内でトイレトレーの外にあるうんち", "နာကို၏ pen တွင် potty tray အပြင်ဘက်၌ရှိသောချေး"),
      t("If poop lands outside the tray, pick it up and clean the entire pen floor; it may have caught in the hair around Nako's bottom after she pooped in the pen.", "うんちがトレーの外に落ちたら拾い、ペンの床全体を掃除します。ナコがペン内で排便した後、お尻まわりの毛に付いて落ちた可能性があります。", "ချေးသည် tray အပြင်ဘက်တွင် ကျနေပါက ကောက်ပြီး pen ကြမ်းပြင်တစ်ခုလုံးကို သန့်ရှင်းပါ။ နာကိုက pen အတွင်းတွင် ချေးသွားပြီးနောက် တင်ပါးပတ်ဝန်းကျင်အမွေးတွင် ကပ်နေ၍ ကျလာနိုင်သည်။")),
    photo("assets/routines/nako-potty-urine-odour-spray.jpg",
      t("Pet urine and odour-removal spray for Nako's pen", "ナコのペン用のペット尿・消臭スプレー", "နာကို၏ pen အတွက် pet urine and odour-removal spray"),
      t("Use this spray on urine marks and the pee tray or pen floor as needed to remove urine and pee smell.", "尿の跡やトイレトレー、ペンの床に必要に応じて使い、尿やおしっこの臭いを取り除きます。", "ဆီးကွက်များနှင့် pee tray သို့မဟုတ် pen ကြမ်းပြင်ပေါ်တွင် လိုအပ်သလိုသုံးပြီး ဆီးနှင့် pee အနံ့ကို ဖယ်ရှားပါ။")),
    photo("assets/routines/nako-potty-pee-pad-line.jpg",
      t("Correct pee pad placement inside the pink line", "ピンクの線の内側に正しく置かれたペットシーツ", "ပန်းရောင်လိုင်းအတွင်းတွင် မှန်ကန်စွာထားသော pee pad"),
      t("Keep the pee pad inside the pink side line before closing the tray cover. If it sticks out, Nako can grab and tear it.", "トレーのカバーを閉める前に、ペットシーツをピンクの横線の内側に収めてください。はみ出すと、Nakoがつかんで破ることがあります。", "tray cover မပိတ်မီ pee pad ကို ပန်းရောင်ဘေးလိုင်းအတွင်းထားပါ။ အပြင်ထွက်နေပါက Nako က ဆွဲယူပြီး ဖြဲနိုင်သည်။")),
    ...nakoPottyPenRoutine.photos
  ];
}

const generalHouseholdDutiesRoutine = routineTasks.find((task) => task.id === "general-household-duties");
if (generalHouseholdDutiesRoutine) {
  generalHouseholdDutiesRoutine.photos = [
    photo("assets/routines/nako-general-household-duties.png",
      t("General household duties catch-all", "一般的な家事のまとめ項目", "အထွေထွေ အိမ်မှုကိစ္စများ စုစည်းထားသော အပိုင်း"),
      t("Catch-all section for reasonable household duties that are not specifically listed elsewhere. Ask if unsure, especially for unusual tasks.", "他の場所に明記されていない、通常の範囲内の家事をまとめる項目です。不明な場合、特に普段と違う作業は確認してください。", "အခြားနေရာတွင် သီးသန့်မဖော်ပြထားသော သင့်လျော်သည့် အိမ်မှုကိစ္စများအတွက် စုစည်းထားသောအပိုင်းဖြစ်သည်။ မသေချာပါက၊ အထူးသဖြင့် ပုံမှန်မဟုတ်သောအလုပ်များအတွက် မေးပါ။"))
  ];
}

const blanketWashingRoutine = routineTasks.find((task) => task.id === "blanket-washing");
if (blanketWashingRoutine) {
  blanketWashingRoutine.photos = [
    photo("assets/routines/nako-blanket-washing.jpg",
      t("Blankets for fortnightly washing", "隔週で洗うブランケット", "နှစ်ပတ်တစ်ကြိမ် လျှော်ရန် စောင်များ"),
      t("Wash thicker blankets one at a time so one blanket is always available. Do not wash both blankets on the same day.", "厚めのブランケットは1枚ずつ洗い、常に1枚は使えるようにしてください。2枚を同じ日に洗わないでください。", "ထူသောစောင်များကို တစ်ကြိမ်လျှင် တစ်ထည်စီလျှော်ပါ၊ ထို့ကြောင့် စောင်တစ်ထည် အမြဲအသုံးပြုနိုင်မည်။ စောင်နှစ်ထည်လုံးကို တစ်နေ့တည်း မလျှော်ပါနှင့်။"))
  ];
}

const outsideShoeRackRoutine = routineTasks.find((task) => task.id === "outside-shoe-rack");
if (outsideShoeRackRoutine) {
  outsideShoeRackRoutine.photos = [
    photo("assets/routines/nako-outside-shoe-rack.jpg",
      t("Outside shoe rack and shoes", "外の靴ラックと靴", "အပြင်ဘက် ဖိနပ်စင်နှင့် ဖိနပ်များ"),
      t("Monthly reference for cleaning the outside shoe rack, wiping shoes, tidying the surrounding area, and keeping the corridor clear.", "外の靴ラックを掃除し、靴を拭き、周辺を整え、廊下をすっきり保つための毎月の参考写真です。", "အပြင်ဘက် ဖိနပ်စင်ကို သန့်ရှင်းရေးလုပ်ခြင်း၊ ဖိနပ်များသုတ်ခြင်း၊ အနီးတဝိုက်ကိုသပ်ရပ်စေခြင်းနှင့် လမ်းကြောင်းရှင်းလင်းထားခြင်းအတွက် လစဉ် ကိုးကားပုံဖြစ်သည်။"))
  ];
}

const curtainSteamingRoutine = routineTasks.find((task) => task.id === "curtain-steaming");
if (curtainSteamingRoutine) {
  curtainSteamingRoutine.photos = [
    photo("assets/routines/nako-curtain-steaming.jpg",
      t("Curtain steaming setup and curtain areas", "カーテンスチームの準備と対象エリア", "ကာတန် steam လုပ်ရန် ပြင်ဆင်မှုနှင့် ကာတန်နေရာများ"),
      t("Monthly reference for steaming the curtains in the rooms after being taught. Use the steamer carefully and cover the visible curtain panels.", "教わった後、部屋のカーテンにスチームをかけるための毎月の参考写真です。スチーマーは注意して使い、見えているカーテン部分を一通り行ってください。", "သင်ပေးပြီးနောက် အခန်းများရှိ ကာတန်များကို steam လုပ်ရန် လစဉ် ကိုးကားပုံဖြစ်သည်။ steamer ကို ဂရုတစိုက်အသုံးပြုပြီး မြင်ရသော ကာတန် panel များကို လုပ်ပါ။"))
  ];
}

const ikeaBedFrameRoutine = routineTasks.find((task) => task.id === "ikea-bed-frame");
if (ikeaBedFrameRoutine) {
  ikeaBedFrameRoutine.photos = [
    photo("assets/routines/nako-ikea-bed-frame-under-compartment.jpg",
      t("IKEA bed frame under-compartment", "IKEAベッドフレーム下の収納部分", "IKEA အိပ်ရာဘောင်အောက် သိုလှောင်ခန်း"),
      t("Quarterly reference for lifting or opening the IKEA bed frame storage area and cleaning dust and hair collected underneath.", "IKEAベッドフレームの収納部分を持ち上げる、または開けて、下にたまったほこりや毛を掃除するための3か月ごとの参考写真です。", "IKEA အိပ်ရာဘောင် storage area ကို မထောင်ခြင်း သို့မဟုတ် ဖွင့်ခြင်းဖြင့် အောက်တွင် စုနေသောဖုန်နှင့်အမွှေးများကို သန့်ရှင်းရေးလုပ်ရန် သုံးလတစ်ကြိမ် ကိုးကားပုံဖြစ်သည်။"))
  ];
}

const nakoWeightTrackingRoutine = routineTasks.find((task) => task.id === "nako-weight-tracking");
if (nakoWeightTrackingRoutine) {
  nakoWeightTrackingRoutine.instructions = [
    t("Take out the scale. Weigh yourself alone and note the number.", "体重計を出し、一人で測って数字をメモします。", "ကိုယ်အလေးချိန်စက်ကို ထုတ်ပါ။ မိမိတစ်ယောက်တည်း ချိန်ပြီး ကိန်းဂဏန်းကို မှတ်ပါ။"),
    t("Step off, pick up Nako, and weigh together.", "体重計から降り、ナコを抱いて一緒に測ります。", "စက်ပေါ်မှဆင်းပြီး Nako ကိုချီကာ အတူတူ ချိန်ပါ။"),
    t("Subtract your weight from the total. The difference is Nako's weight.", "合計から自分の体重を引きます。その差がナコの体重です。", "စုစုပေါင်းအလေးချိန်မှ မိမိအလေးချိန်ကို နုတ်ပါ။ ကွာခြားချက်သည် Nako ၏အလေးချိန်ဖြစ်သည်။"),
    t("Enter Nako's weight in the app and save it.", "ナコの体重をアプリに入力して保存します。", "Nako ၏အလေးချိန်ကို app တွင် ထည့်ပြီး သိမ်းပါ။")
  ];
}

const mailDeliveriesRoutine = routineTasks.find((task) => task.id === "mail-deliveries");
if (mailDeliveriesRoutine) {
  mailDeliveriesRoutine.instructions = [
    t("Collect deliveries promptly. Do not leave them outside where they could be stolen.", "配達物はすぐに回収し、盗難のおそれがあるため外に放置しないでください。", "delivery ပစ္စည်းများကို ချက်ချင်းယူပါ။ ခိုးယူခံရနိုင်သောကြောင့် အပြင်တွင် မထားပါနှင့်။"),
    t("Always unpack the delivery outside and discard all packaging outside.", "配達物は必ず屋外で開封し、梱包材はすべて屋外で捨てます。", "delivery ကို အမြဲ အပြင်မှာ unpack လုပ်ပြီး packaging အားလုံးကို အပြင်မှာ လွှင့်ပါ။"),
    t("Wipe every accessible surface of the unpacked item fully while it is still outside.", "開封した商品がまだ屋外にある間に、手が届く表面をすべてしっかり拭きます。", "unpack လုပ်ထားသောပစ္စည်း အပြင်မှာရှိနေစဉ် လက်လှမ်းမီသောမျက်နှာပြင်အားလုံးကို သေချာသုတ်ပါ။"),
    t("Bring the clean item inside promptly and put it in the correct place.", "きれいにした商品をすぐ家に入れ、正しい場所へ置きます。", "သန့်ရှင်းထားသောပစ္စည်းကို ချက်ချင်းအိမ်ထဲသွင်းပြီး မှန်ကန်သောနေရာတွင်ထားပါ။")
  ];
}

const fridgeInteriorRoutine = routineTasks.find((task) => task.id === "fridge-interior");
if (fridgeInteriorRoutine) fridgeInteriorRoutine.legacyTrackingCadences = ["weekly"];

const cleaningToolsRoutine = routineTasks.find((task) => task.id === "cleaning-tools");
if (cleaningToolsRoutine) cleaningToolsRoutine.legacyTrackingCadences = ["weekly"];

const curtainSteamingTrackingRoutine = routineTasks.find((task) => task.id === "curtain-steaming");
if (curtainSteamingTrackingRoutine) curtainSteamingTrackingRoutine.legacyTrackingCadences = ["fortnightly"];

const floorMatsRoutine = routineTasks.find((task) => task.id === "floor-mats");
if (floorMatsRoutine) floorMatsRoutine.legacyTrackingCadences = ["weekly"];

const windowsGlassMirrorsRoutine = routineTasks.find((task) => task.id === "windows-glass-mirrors");
if (windowsGlassMirrorsRoutine) windowsGlassMirrorsRoutine.legacyTrackingCadences = ["weekly"];

const sofaCoversPillowsRoutine = routineTasks.find((task) => task.id === "sofa-covers-pillows");
if (sofaCoversPillowsRoutine) sofaCoversPillowsRoutine.legacyTrackingCadences = ["weekly"];

const ninjaAirFryerDeepCleanRoutine = routineTasks.find((task) => task.id === "ninja-af141-air-fryer-interior-deep-clean");
if (ninjaAirFryerDeepCleanRoutine) ninjaAirFryerDeepCleanRoutine.legacyTrackingCadences = ["monthly"];



// Exclusions for non-daily routine tasks that are intentionally reference-only.
// If a non-daily actionable task is deliberately excluded, we declare a reason here.
const routineTrackingExclusions = {
  "nako-inventory-check": "Inventory check is a reference guidelines page for stocking items",
  "pest-check": "Pest check is reference information for checking ants/cockroaches",
  "cleaning-tools": "Cleaning tools maintenance is fortnightly reference guidance and is intentionally excluded from Routine Check-in",
  "coffee-machine-descaling": "Descaling is indicator-led and should be done only when the red descale light flashes"
};

// Display-only grouping for the Daily Care Guide. This does not affect routine tracking.
const dailyGuideLayout = {
  start: [
    "google-calendar-check",
    "upload-shared-album"
  ],
  "food-kitchen": [
    "drinking-water-prep",
    "grocery-shopping",
    "daily-cooking",
    "clean-up-cooking-appliances",
    "coffee-machine-upkeep",
    "protein-shake-creatine-prep"
  ],
  "nako-care": [
    "nako-feeding-water",
    "nako-potty-pen",
    "nako-exercise-grooming",
    "nako-walk-car-bags",
    "nako-teeth-ears-nails",
    "nako-training-fun"
  ],
  "home-care": [
    "laundry",
    "toilet-drain-hair-trap",
    "sofa-hair-room-corner-cleaning",
    "floor-cleaning",
    "rubbish",
    "general-tidiness"
  ],
  "admin-supplies": [
    "mail-deliveries",
    "physical-mailbox-check",
    "household-supplies-online",
    "helper-diary-feedback"
  ],
  safety: [
    "nako-supervision",
    "nako-kind-handling",
    "nako-emergency"
  ]
};

Object.entries(dailyGuideLayout).forEach(([groupId, taskIds]) => {
  taskIds.forEach((taskId, index) => {
    const task = routineTasks.find((entry) => entry.id === taskId);
    if (!task) return;
    task.dailyGuideGroup = groupId;
    task.dailyGuideOrder = index + 1;
  });
});

// Display-only grouping for the Weekly Care Guide. This does not affect routine tracking.
const weeklyGuideLayout = {
  "nako-care": [
    "nako-weekly-play-pen-deep-clean",
    "nako-weight-tracking",
    "nako-inventory-check"
  ],
  "kitchen-health": [
    "kitchen-sink-drain-rack-counter",
    "microwave-interior",
    "ninja-af141-air-fryer-interior-deep-clean",
    "supplement-pill-boxes"
  ],
  "whole-home-cleaning": [
    "high-touch-surfaces",
    "toilet-cleaning",
    "rubbish-bin-washing",
    "ceiling-fan"
  ],
  "living-maintenance": [
    "bedrooms-linens",
    "pest-check"
  ]
};

Object.entries(weeklyGuideLayout).forEach(([groupId, taskIds]) => {
  taskIds.forEach((taskId, index) => {
    const task = routineTasks.find((entry) => entry.id === taskId);
    if (!task) return;
    task.weeklyGuideGroup = groupId;
    task.weeklyGuideOrder = index + 1;
  });
});

// Automatic single-source-of-truth metadata application
routineTasks.forEach((task) => {
  const isPinnedSafety = ["nako-emergency", "nako-kind-handling", "nako-supervision"].includes(task.id);
  const isDailyOrAsNeeded = task.frequencyBucket === "daily" || task.frequencyBucket === "as-needed";
  const nonDailyCadences = ["weekly", "fortnightly", "monthly", "quarterly", "one-off"];
  const isNonDaily = nonDailyCadences.includes(task.frequencyBucket);
  const isExplicitDailyTask = task.frequencyBucket === "daily" && task.trackingCadence === "daily" && task.trackingMode !== "none";

  const isTrackedCandidate = isExplicitDailyTask || (isNonDaily && !isPinnedSafety && !isDailyOrAsNeeded) || task.id === "fire-extinguisher-training";

  if (isTrackedCandidate) {
    const exclusionReason = routineTrackingExclusions[task.id];
    if (exclusionReason) {
      task.trackingMode = "none";
      task.trackingCadence = null;
      task.trackingAnchor = null;
      task.trackingSource = null;
      task.checkInTitle = null;
      task.itemKind = "reference";
      task.trackingExclusionReason = exclusionReason;
    } else {
      task.itemKind = "task";
      task.trackingExclusionReason = null;

      if (isExplicitDailyTask) {
        task.trackingAnchor = null;
        task.trackingSource = task.trackingSource || null;
        task.checkInTitle = task.checkInTitle || null;
      } else if (task.id === "fire-extinguisher-training") {
        task.trackingCadence = "one-off";
        task.trackingMode = "one-off";
        task.trackingSource = null;
        task.checkInTitle = null;
      } else {
        task.trackingCadence = task.frequencyBucket;
        task.trackingSource = null;
        task.checkInTitle = null;
        if (task.id === "nako-weight-tracking") {
          task.trackingMode = "metric";
        } else if (task.frequencyBucket === "one-off") {
          task.trackingMode = "one-off";
        } else {
          task.trackingMode = "checkbox";
        }
      }

      if (task.trackingCadence === "fortnightly") {
        task.trackingAnchor = "2026-07-06";
      } else {
        task.trackingAnchor = null;
      }
    }
  } else {
    // Daily, as-needed, or pinned safety are reference-only by default
    task.trackingMode = "none";
    task.trackingCadence = null;
    task.trackingAnchor = null;
    task.trackingSource = null;
    task.checkInTitle = null;
    task.itemKind = "reference";
    task.trackingExclusionReason = null;
  }
});


// Nako's force-free command training, play, and progress reference data.
const trainingData = (() => {
  const tx = (en, jp, mm) => t(en, jp, mm);
  const categories = {
    safety: tx("Safety & Daily Control", "安全と日常コントロール", "လုံခြုံရေးနှင့် နေ့စဉ်ထိန်းချုပ်မှု"),
    handling: tx("Positioning & Handling", "ポジションとハンドリング", "နေရာချထားခြင်းနှင့် ကိုင်တွယ်ခြင်း"),
    tricks: tx("Tricks & Confidence", "トリックと自信づくり", "လှည့်ကွက်များနှင့် ယုံကြည်မှုတိုးတက်ရေး")
  };
  const priorities = {
    critical: tx("Critical", "最重要", "အလွန်အရေးကြီး"),
    high: tx("High", "高", "အရေးကြီး"),
    useful: tx("Useful", "便利", "အသုံးဝင်")
  };
  const priorityIds = { Critical: "critical", High: "high", Useful: "useful" };
  const command = (id, category, title, score, priority, milestone, note = "", extra = {}) => ({
    id, category, title, initialScore: score, priorityId: priorityIds[priority], priority: priorities[priorityIds[priority]],
    milestone, baselineComment: note ? tx(note, extra.jpNote || note, extra.mmNote || note) : tx("", "", ""),
    purpose: extra.purpose || tx("Practise with short, reward-based sessions.", "短く、ごほうびを使う練習をします。", "တိုတောင်းပြီး ဆုအသုံးပြုသည့် လေ့ကျင့်ခန်းလုပ်ပါ။"),
    instructions: extra.instructions || [tx("Give the cue once, mark the correct response, then reward.", "合図は一度だけ出し、正しい反応をマークしてからほめます。", "အမိန့်ကို တစ်ကြိမ်သာပေး၍ မှန်ကန်သောတုံ့ပြန်မှုကို အမှတ်အသားပြုပြီး ဆုချပါ။")],
    safety: extra.safety || [], displayCue: extra.displayCue || null, setting: extra.setting || null, order: extra.order,
    defaultCue: extra.defaultCue || "", initialRewardReliance: extra.initialRewardReliance ?? 6,
    initialEnvironment: extra.initialEnvironment ?? 6, initialSuccesses: extra.initialSuccesses ?? null,
    initialAttempts: extra.initialAttempts ?? null, initialLastPractisedAt: extra.initialLastPractisedAt || null
  });
  const commands = [
    command("name-look", "safety", tx("Name / Look", "名前 / 見て", "နာမည် / ကြည့်"), 0, "High", tx("Respond on the first cue in 4 of 5 quiet-home trials.", "静かな家で5回中4回、最初の合図で反応する。", "တိတ်ဆိတ်သောအိမ်တွင် ၅ ကြိမ်အနက် ၄ ကြိမ် ပထမအမိန့်တွင် တုံ့ပြန်ရန်။"), "", { order: 1, purpose: tx("Hear her name and offer eye contact or turn toward the handler.", "名前を聞いて、飼い主を見るか振り向く。", "နာမည်ကြားလျှင် ကိုင်တွယ်သူကိုကြည့် သို့မဟုတ် လှည့်လာရန်။"), instructions: [tx("Say her name once.", "名前は一度だけ呼びます。", "နာမည်ကို တစ်ကြိမ်သာခေါ်ပါ။"), tx("Mark and reward when she looks.", "見たらマークしてほめます。", "ကြည့်လာလျှင် အမှတ်အသားပြုပြီး ဆုချပါ။")]}),
    command("come", "safety", tx("Come", "おいで", "လာ"), 3, "Critical", tx("Come in 4 of 5 indoor trials while the reward is hidden.", "ごほうびを隠した屋内練習で5回中4回成功する。", "ဆုကိုဖျောက်ထားပြီး အိမ်တွင်း ၅ ကြိမ်အနက် ၄ ကြိမ် လာရန်။"), "She responds occasionally and works extremely well when food is visible.", { order: 2, jpNote: "ときどき反応し、食べ物が見えるととてもよく反応する。", mmNote: "တစ်ခါတစ်ရံတုံ့ပြန်ပြီး အစားအစာမြင်ရလျှင် အလွန်ကောင်းစွာလာသည်။", safety: [tx("Never punish her after she comes.", "来た後に罰を与えないでください。", "လာပြီးနောက် ဘယ်တော့မှ မပြစ်ဒဏ်မပေးပါနှင့်။"), tx("Move away from her rather than chasing her.", "追いかけず、飼い主が少し離れます。", "လိုက်မဖမ်းဘဲ ကိုင်တွယ်သူက နောက်ဆုတ်ပါ။")]}),
    command("emergency-recall", "safety", tx("Emergency Recall", "緊急呼び戻し", "အရေးပေါ်ပြန်ခေါ်"), 0, "Critical", tx("Condition the cue indoors from a very short distance with a jackpot reward.", "室内の近い距離で大きなごほうびとともに合図を育てる。", "အိမ်တွင်း အကွာအဝေးတိုတွင် အထူးဆုဖြင့် အမိန့်ကို လေ့ကျင့်ရန်။"), "", { order: 3, setting: "emergencyCue", purpose: tx("A unique cue reserved for a genuine emergency.", "本当の緊急時だけに使う特別な合図。", "အမှန်တကယ် အရေးပေါ်အခြေအနေအတွက်သာ သီးသန့်ထားသောအမိန့်။"), safety: [tx("Practise rarely and only in controlled conditions.", "まれに、管理された状況でのみ練習します。", "ထိန်းချုပ်ထားသောအခြေအနေတွင်သာ ရှားရှားပါးပါး လေ့ကျင့်ပါ။"), tx("Do not simulate danger.", "危険を再現しないでください。", "အန္တရာယ်ကို အတုယူမလုပ်ပါနှင့်။")]}),
    command("lets-go", "safety", tx("Let's Go", "行こう", "သွားကြမယ်"), 7, "High", tx("Respond reliably outdoors with a mild distraction.", "軽い気の散りがある屋外でも確実に反応する。", "အနည်းငယ်အာရုံပျံ့စရာရှိသော အပြင်တွင်လည်း ယုံကြည်စိတ်ချရစွာ တုံ့ပြန်ရန်။"), "Generally good and responsive.", { order: 8, jpNote: "全体的に良く反応する。", mmNote: "ယေဘုယျအားဖြင့် ကောင်းစွာတုံ့ပြန်သည်။"}),
    command("wait", "safety", tx("Wait", "待って", "စောင့်"), 7, "High", tx("Wait while the handler takes two steps away, then follow the next cue.", "飼い主が2歩離れても待ち、次の合図に従う。", "ကိုင်တွယ်သူ နှစ်လှမ်းဝေးသွားစဉ် စောင့်ပြီး နောက်အမိန့်ကို လိုက်နာရန်။"), "She can wait well.", { order: 6, jpNote: "よく待てる。", mmNote: "ကောင်းစွာစောင့်နိုင်သည်။"}),
    command("stay", "safety", tx("Stay", "ステイ", "နေ"), 7, "High", tx("Hold position for 10–15 seconds with the handler one or two steps away.", "飼い主が1～2歩離れても10～15秒その位置にいる。", "ကိုင်တွယ်သူ တစ်လှမ်း သို့မဟုတ် နှစ်လှမ်းဝေးသွားစဉ် ၁၀–၁၅ စက္ကန့် နေရန်။"), "She can stay well.", { order: 7, jpNote: "よくステイできる。", mmNote: "ကောင်းစွာနေတတ်သည်။", safety: [tx("Increase only one of duration, distance, or distraction at a time.", "時間・距離・気の散りのうち一度に増やすのは一つだけです。", "ကြာချိန်၊ အကွာအဝေး၊ အာရုံပျံ့စရာထဲမှ တစ်ခုပဲ တစ်ကြိမ်တိုးပါ။")]}),
    command("gaman-ok", "safety", tx("Gaman → OK", "我慢 → OK", "သည်းခံ → OK"), 7, "Useful", tx("Wait while food is placed down and the handler changes position slightly.", "食べ物を置き、飼い主が少し位置を変えても待つ。", "အစားအစာချထားပြီး ကိုင်တွယ်သူ အနည်းငယ်နေရာပြောင်းသော်လည်း စောင့်ရန်။"), "She can wait when food is present and takes it only after OK.", { order: 12, jpNote: "食べ物があっても待ち、OKの後だけ取れる。", mmNote: "အစားအစာရှိသော်လည်း စောင့်ပြီး OK ပြီးမှသာ ယူသည်။"}),
    command("leave-it", "safety", tx("Leave It", "ちょうだいしない", "မယူနဲ့"), 0, "Critical", tx("Turn away from a closed hand containing food and take a reward from the other hand.", "食べ物の入った握った手から顔をそらし、反対の手からごほうびを取る。", "အစားအစာပါသော လက်သီးမှ မျက်နှာလွှဲပြီး အခြားလက်မှ ဆုယူရန်။"), "", { order: 4, purpose: tx("Do not pick up or approach the item.", "物を取ったり近づいたりしない。", "ပစ္စည်းကို မယူဘဲ မချဉ်းကပ်ရန်။")}),
    command("drop-give", "safety", tx("Drop / Give", "ドロップ / ちょうだい", "လွှတ် / ပေး"), 0, "Critical", tx("Release a low-value toy for a reward, then receive the toy back.", "低価値のおもちゃをほうびと交換し、すぐ返してもらう。", "တန်ဖိုးနည်းကစားစရာကို ဆုနှင့်လဲ၍ ပြန်ရရန်။"), "", { order: 5, safety: [tx("Never chase, pry her jaw, or forcibly pull a toy.", "追いかけたり、口をこじ開けたり、無理に引っ張ったりしないでください。", "မလိုက်ဖမ်း၊ ပါးစပ်မဖြဲ၊ ကစားစရာကို အတင်းမဆွဲပါနှင့်။")]}),
    command("place-break", "safety", tx("Place → Break", "マット → 解放", "နေရာ → လွှတ်"), 2, "Useful", tx("Keep four paws on the mat for three seconds before Break.", "ブレイクの前にマットに4本の足を3秒置く。", "Break မပြောမီ ဖျာပေါ် ခြေလေးချောင်း ၃ စက္ကန့်ထားရန်။"), "She responds mainly with treats and does not yet appear to understand the complete Place and Break concept.", { order: 13, jpNote: "主におやつで反応し、PlaceとBreakの全体の意味はまだ理解していないようです。", mmNote: "ဆုဖြင့်သာ အဓိကတုံ့ပြန်ပြီး Place နှင့် Break အဓိပ္ပာယ်အပြည့်ကို မနားလည်သေးပုံရသည်။"}),
    command("settle", "safety", tx("Settle", "落ち着く", "ငြိမ်သက်"), 0, "Useful", tx("Relax on a mat for 15–30 seconds while rewards are delivered calmly.", "落ち着いてごほうびを受けながら、マットで15～30秒リラックスする。", "ငြိမ်သက်စွာဆုပေးစဉ် ဖျာပေါ် ၁၅–၃၀ စက္ကန့် အနားယူရန်။"), "", { order: 14 }),
    command("sit", "handling", tx("Sit", "おすわり", "ထိုင်"), 6, "High", tx("Correct Sit in 4 of 5 first-cue trials without visible food.", "食べ物を見せずに、最初の合図で5回中4回正しいおすわりをする。", "အစားအစာမပြဘဲ ပထမအမိန့်တွင် ၅ ကြိမ်အနက် ၄ ကြိမ် မှန်ကန်စွာထိုင်ရန်။"), "Nako can sit, but she sometimes lies down fully instead.", { order: 15, jpNote: "ナコは座れるが、ときどき完全に伏せてしまう。", mmNote: "Nako ထိုင်တတ်သော်လည်း တစ်ခါတစ်ရံ အပြည့်လှဲချတတ်သည်။", safety: [tx("A full lie down is not a Sit; reset gently and make the next attempt easier.", "完全な伏せはおすわりではありません。やさしくリセットして次を簡単にします。", "အပြည့်လှဲခြင်းသည် ထိုင်ခြင်းမဟုတ်ပါ။ နူးညံ့စွာ ပြန်စပြီး နောက်တစ်ကြိမ် လွယ်အောင်လုပ်ပါ။")]}),
    command("lie-down", "handling", tx("Down / Lie Down", "伏せ", "လှဲ"), 0, "Useful", tx("Lie down from Sit with a clear cue and minimal lure.", "明確な合図と最小限の誘導で、おすわりから伏せる。", "ရှင်းလင်းသောအမိန့်နှင့် အနည်းဆုံးဆွဲဆောင်မှုဖြင့် ထိုင်ရာမှလှဲရန်။"), "", { order: 16, displayCue: tx("Down / Lie Down", "伏せ", "လှဲ") }),
    command("up", "handling", tx("Up", "上がって", "တက်"), 6, "Useful", tx("Use several low, stable, non-slip surfaces.", "低く安定した滑らない面でできる。", "နိမ့်၍တည်ငြိမ်ပြီး မချောသောမျက်နှာပြင်အမျိုးမျိုးတွင် လုပ်နိုင်ရန်။"), "She is fairly comfortable climbing onto a low step.", { order: 17, jpNote: "低い段に上がることはかなり平気です。", mmNote: "နိမ့်သောအဆင့်ပေါ်တက်ရာတွင် အတော်လေး အဆင်ပြေသည်။"}),
    command("step-down", "handling", tx("Step Down / Off", "降りて", "ဆင်း"), 4, "Useful", tx("Make a controlled descent from a low step without hesitation.", "低い段からためらわずにコントロールして降りる。", "နိမ့်သောအဆင့်မှ မတွန့်ဆုတ်ဘဲ ထိန်းချုပ်ပြီးဆင်းရန်။"), "She is less confident going down and still appears cautious.", { order: 18, jpNote: "下りるのは少し自信がなく、まだ慎重に見えます。", mmNote: "ဆင်းရာတွင် ယုံကြည်မှုနည်းပြီး သတိထားနေသေးသည်။", safety: [tx("Use a very low, non-slip surface and never pull her downward.", "とても低く滑らない面を使い、下へ引っ張らないでください。", "အလွန်နိမ့်ပြီး မချောသောမျက်နှာပြင်သုံးကာ အောက်သို့မဆွဲပါနှင့်။")]}),
    command("touch", "handling", tx("Touch", "タッチ", "ထိ"), 0, "High", tx("Touch an open palm in 4 of 5 quiet-home trials.", "静かな家で5回中4回、開いた手のひらに鼻で触れる。", "တိတ်ဆိတ်သောအိမ်တွင် ၅ ကြိမ်အနက် ၄ ကြိမ် ဖွင့်ထားသောလက်ဖဝါးကို နှာခေါင်းဖြင့်ထိရန်။"), "", { order: 9, purpose: tx("Touch the handler's open palm with her nose.", "飼い主の開いた手のひらに鼻で触れる。", "ကိုင်တွယ်သူ၏ ဖွင့်ထားသောလက်ဖဝါးကို နှာခေါင်းဖြင့်ထိရန်။")}),
    command("ashi-middle", "handling", tx("Ashi / Middle", "足の間 / ミドル", "ခြေကြား / Middle"), 2, "Useful", tx("Enter from behind, stand facing forward between legs, and Sit with reduced luring.", "後ろから入り、足の間で前を向き、誘導を減らして座る。", "နောက်မှဝင်၍ ခြေကြားတွင် ရှေ့ကိုမျက်နှာမူကာ ဆွဲဆောင်မှုနည်းနည်းဖြင့်ထိုင်ရန်။"), "Yukari guides her behind the legs and into the middle, but success is still inconsistent.", { order: 19, jpNote: "ユカリが足の後ろからミドルへ導いているが、まだ成功は安定していない。", mmNote: "Yukari က ခြေနောက်မှ Middle သို့လမ်းညွှန်ပေးသော်လည်း အောင်မြင်မှုမတည်ငြိမ်သေးပါ။"}),
    command("paw", "handling", tx("Paw", "おて", "လက်ပေး"), 8, "Useful", tx("Allow a brief, gentle paw inspection after Paw.", "おての後に短くやさしい足の確認を受け入れる。", "လက်ပေးပြီးနောက် ခြေထောက်ကို ခဏနူးညံ့စွာစစ်ဆေးခွင့်ပြုရန်။"), "She initially responded only with visible food but can now perform without visible food.", { order: 21, jpNote: "最初は見える食べ物だけで反応したが、今は見せなくてもできる。", mmNote: "အစတွင် မြင်ရသောအစားအစာဖြင့်သာတုံ့ပြန်သော်လည်း ယခုမပြဘဲလုပ်နိုင်သည်။"}),
    command("chin-rest", "handling", tx("Chin", "あご乗せ", "မေးတင်"), 0, "High", tx("Hold chin position for two seconds while the other hand briefly approaches.", "もう一方の手が近づく間、2秒あごを乗せる。", "အခြားလက်အနီးကပ်လာစဉ် ၂ စက္ကန့် မေးတင်ထားရန်။"), "", { order: 10, purpose: tx("Rest her chin voluntarily on a hand, towel, or cushion for cooperative care.", "ケアのために、手・タオル・クッションに自発的にあごを乗せる。", "ပူးပေါင်းစောင့်ရှောက်မှုအတွက် လက်၊ တဘက် သို့မဟုတ်ခေါင်းအုံးပေါ် မေးကို စိတ်လိုလက်ရတင်ရန်။"), safety: [tx("When she lifts her chin, handling pauses.", "あごを上げたらケアを止めます。", "မေးမြှောက်လျှင် ကိုင်တွယ်ခြင်းရပ်ပါ။")]}),
    command("lift-carry", "handling", tx("Bao Bao: Lift / Carry", "Bao Bao：抱き上げ / 抱っこ", "Bao Bao: ချီ / ပွေ့"), 6, "High", tx("Try the full sequence without giving a food treat after every repetition; keep rewarding often enough that Nako stays positive.", "毎回おやつを与えずに一連の動作を試しつつ、ナコが楽しく続けられる頻度でごほうびを与える。", "အကြိမ်တိုင်း အစားအစာဆုမပေးဘဲ အစအဆုံးလုပ်ကြည့်ပါ။ Nako ပျော်ရွှင်စွာဆက်လုပ်နိုင်ရန် လိုအပ်သလို မကြာခဏဆုချပါ။"), "First session on 11 July 2026: about 10 repetitions. She progressed from stepping up onto the offered left hand and receiving a treat, to responding after the Bao Bao cue, accepting right-hand support under her hindquarters, being lifted with her whole body supported, and then receiving a treat. She can complete the full sequence, but a no-treat repetition has not been tested yet.", { order: 11, setting: "liftCue", defaultCue: "Bao Bao", initialRewardReliance: 2, initialEnvironment: 0, initialLastPractisedAt: "2026-07-11T00:00:00+08:00", jpNote: "2026年7月11日の初回練習：約10回。差し出した左手に前足を乗せてからおやつをもらう段階から、Bao Bao の合図で立ち上がって左手に両前足を乗せ、右手で後ろ足側を支え、全身を支えて抱き上げた後におやつをもらうところまで進んだ。一連の動作はできるが、おやつなしの反復はまだ試していない。", mmNote: "၂၀၂၆ ခုနှစ် ဇူလိုင် ၁၁ ရက် ပထမအကြိမ်လေ့ကျင့်မှုတွင် ၁၀ ကြိမ်ခန့် လုပ်ခဲ့သည်။ ကမ်းပေးထားသော ဘယ်လက်ပေါ် ရှေ့ခြေနှစ်ချောင်းတင်ပြီး ဆုစားရသည့်အဆင့်မှ Bao Bao အမိန့်ကြားလျှင် မတ်တပ်ရပ်ကာ ဘယ်လက်ပေါ် ရှေ့ခြေနှစ်ချောင်းတင်ခြင်း၊ ညာလက်ဖြင့် နောက်ပိုင်းကိုပံ့ပိုးခြင်း၊ ကိုယ်တစ်ခုလုံးကိုပံ့ပိုးပြီး ချီခြင်း၊ ထို့နောက် ဆုစားရခြင်းအထိ တိုးတက်ခဲ့သည်။ အစအဆုံးလုပ်နိုင်ပြီဖြစ်သော်လည်း ဆုမပါဘဲ မစမ်းရသေးပါ။", purpose: tx("On Bao Bao, put both front paws on the left hand. Support her hindquarters before lifting.", "Bao Bao の合図で左手に両前足を乗せる。抱き上げる前に右手で後ろ足側を支える。", "Bao Bao အမိန့်ကြားလျှင် ဘယ်လက်ပေါ် ရှေ့ခြေနှစ်ချောင်းတင်ပါ။ မချီမီ ညာလက်ဖြင့် နောက်ပိုင်းကို ပံ့ပိုးပါ။"), instructions: [tx("Bend down and hold the left hand straight out as her platform.", "かがみ、左手をまっすぐ差し出して足場にする。", "ကိုယ်ကိုငုံ့ပြီး ဘယ်လက်ကို သူမတက်နိုင်ရန် တန်းတန်းဆန့်ထားပါ။"), tx("Say Bao Bao once. Wait for her to stand and place both front paws on the left hand.", "Bao Bao と一度だけ言い、立ち上がって左手に両前足を乗せるのを待つ。", "Bao Bao ဟု တစ်ကြိမ်သာပြောပြီး သူမ မတ်တပ်ရပ်ကာ ဘယ်လက်ပေါ် ရှေ့ခြေနှစ်ချောင်းတင်သည်အထိ စောင့်ပါ။"), tx("Place the right hand securely under her hindquarters, support her whole body, and lift smoothly.", "右手を後ろ足側の下にしっかり入れ、全身を支えて滑らかに抱き上げる。", "ညာလက်ကို သူမ၏ နောက်ပိုင်းအောက်တွင် သေချာထားပြီး ကိုယ်တစ်ခုလုံးကိုပံ့ပိုးကာ ညင်သာစွာချီပါ။"), tx("Reward after the lift. When she remains comfortable, begin mixing in an occasional repetition without a food treat.", "抱き上げた後にごほうびを与える。落ち着いてできるようになったら、時々おやつなしの反復を混ぜる。", "ချီပြီးနောက် ဆုချပါ။ သူမ သက်တောင့်သက်သာရှိနေပါက တစ်ခါတစ်ရံ အစားအစာဆုမပေးသော အကြိမ်ကို စတင်ရောထည့်ပါ။")], safety: [tx("Her left-hand paw placement is the ready position, not the lifting point; support her whole body before her feet leave the floor.", "左手への前足乗せは準備姿勢であり、そこだけで持ち上げない。足が床を離れる前に全身を支える。", "ဘယ်လက်ပေါ် ရှေ့ခြေတင်ခြင်းသည် အဆင်သင့်အနေအထားသာဖြစ်ပြီး ထိုနေရာမှမချီပါနှင့်။ ခြေထောက်များ မြေပြင်မှမလွတ်မီ ကိုယ်တစ်ခုလုံးကိုပံ့ပိုးပါ။"), tx("Never lift only by the front legs or armpits.", "前足やわきの下だけで持ち上げないでください。", "ရှေ့ခြေ သို့မဟုတ် ချိုင်းအောက်မှသာ မချီပါနှင့်။"), tx("Stop if she pulls away, looks worried, struggles, or seems sore.", "離れようとする、不安そう、暴れる、痛そうな場合は中止する。", "သူမ ရှောင်ထွက်ခြင်း၊ စိုးရိမ်ပုံရခြင်း၊ ရုန်းကန်ခြင်း သို့မဟုတ် နာကျင်ပုံရပါက ရပ်ပါ။")]}),
    command("jump-arms", "handling", tx("Jump to Arms", "腕へ上がる", "လက်မောင်းပေါ်တက်"), 3, "Useful", tx("Confidently climb onto the handler's seated lap on cue.", "合図で飼い主の座ったひざへ自信を持って上がる。", "အမိန့်ပေးလျှင် ထိုင်နေသောကိုင်တွယ်သူ၏ ပေါင်ပေါ်ကို ယုံကြည်စွာတက်ရန်။"), "She can jump upward from approximately sitting level. Long-term aim is a safe assisted transfer into the handler's arms.", { order: 20, jpNote: "座った高さから上へ跳べます。長期目標は飼い主の腕への安全な補助移動です。", mmNote: "ထိုင်နေသည့်အမြင့်မှ အပေါ်သို့တက်နိုင်သည်။ ရေရှည်ရည်မှန်းချက်မှာ ကိုင်တွယ်သူ၏လက်မောင်းသို့ လုံခြုံစွာကူညီပြောင်းရွှေ့ခြင်းဖြစ်သည်။", safety: [tx("For a real emergency, pick her up safely; do not depend on this trick.", "本当の緊急時は安全に抱き上げ、このトリックに頼らないでください。", "အမှန်တကယ် အရေးပေါ်တွင် လုံခြုံစွာချီပါ။ ဤလှည့်ကွက်ကိုမမှီခိုပါနှင့်။"), tx("No high-impact jumps or jumping from a distance.", "高い衝撃のジャンプや離れた所からのジャンプはしません。", "ပြင်းထန်သောခုန်ခြင်းနှင့် အဝေးမှခုန်ခြင်းမလုပ်ပါနှင့်။")]}),
    command("hoop", "tricks", tx("Hoop", "フープ", "ကွင်း"), 2, "Useful", tx("Walk completely through a floor-level hoop without hesitation.", "床に置いたフープをためらわずに完全に歩いて通る。", "ကြမ်းပြင်ပေါ်ကွင်းကို မတွန့်ဆုတ်ဘဲ လုံးဝလျှောက်ဖြတ်ရန်။"), "She currently appears to climb or walk through rather than jump.", { order: 22, jpNote: "現在は跳ぶより、またいだり歩いて通ったりしているようです。", mmNote: "လက်ရှိတွင် ခုန်ခြင်းထက် ကျော်သွား သို့မဟုတ် လျှောက်ဖြတ်နေသည်။", safety: [tx("Walking through is the correct first stage; keep the hoop on the floor.", "歩いて通るのが正しい最初の段階です。フープは床に置きます。", "လျှောက်ဖြတ်ခြင်းက မှန်ကန်သောပထမအဆင့်ဖြစ်သည်။ ကွင်းကိုကြမ်းပြင်ပေါ်ထားပါ။")]}),
    command("find-it", "tricks", tx("Find It", "探して", "ရှာ"), 0, "High", tx("Find a visibly tossed kibble after hearing Find it.", "『探して』の後、見えるように投げたキブルを見つける。", "Find it ကြားပြီးနောက် မြင်သာစွာပစ်ထားသော kibble ကိုရှာရန်။"), "", { order: 23, purpose: tx("Use her nose to search for food, a person, or a toy.", "鼻を使って食べ物・人・おもちゃを探す。", "အစားအစာ၊ လူ သို့မဟုတ်ကစားစရာကို နှာခေါင်းသုံး၍ရှာရန်။")}),
    command("spin", "tricks", tx("Spin", "スピン", "လှည့်"), 0, "Useful", tx("Complete one slow, controlled circle.", "ゆっくりコントロールされた一周をする。", "ဖြည်းဖြည်းထိန်းချုပ်ပြီး တစ်ပတ်လှည့်ရန်။"), "", { order: 24, safety: [tx("Do not encourage rapid repeated spinning.", "速い繰り返しのスピンは促さないでください。", "မြန်မြန်ထပ်ခါထပ်ခါ လှည့်ခြင်းကို မအားပေးပါနှင့်။")]})
  ];
  const activities = [
    { id: "tug-fetch", title: tx("Structured Tug + Fetch", "ルールのある引っ張り遊びと持ってこい", "စနစ်တကျ ဆွဲကစားခြင်းနှင့်ယူလာခြင်း"), purpose: tx("Exercise, Drop practice, recall, impulse control, and interactive play.", "運動、ドロップ、呼び戻し、衝動コントロール、交流遊び。", "လေ့ကျင့်ခန်း၊ လွှတ်ခြင်း၊ ပြန်လာခြင်း၊ စိတ်ထိန်းချုပ်မှုနှင့် အပြန်အလှန်ကစားခြင်း။"), duration: 5, intensity: tx("Moderate", "中くらい", "အလယ်အလတ်"), steps: ["Say Take it before she grabs the toy.", "Tug gently, then freeze the toy for Drop.", "Reward a voluntary release and throw a short distance.", "Finish with All Done."], safety: ["Keep the toy low and use gentle side-to-side movement.", "Use a non-slip floor; avoid hard braking and inspect the toy." ] },
    { id: "find-it-game", title: tx("Find It Scent Game", "探してノーズゲーム", "ရှာပါ အနံ့ဂိမ်း"), purpose: tx("Calm nose work using part of her daily food allowance.", "1日の食事量の一部を使う落ち着いたノーズワーク。", "နေ့စဉ်အစားအစာပမာဏ၏တစ်စိတ်တစ်ပိုင်းသုံးသော ငြိမ်သက်သည့်အနံ့အလုပ်။"), duration: 5, intensity: tx("Low", "低い", "နိမ့်"), steps: ["Say Find it and toss one kibble visibly nearby.", "Progress behind a leg, under an open towel, then behind a light object.", "Later search for a toy."], safety: ["Keep searches easy and account for food in the daily allowance."] },
    { id: "hide-seek-people", title: tx("Hide-and-Seek People", "人を探すかくれんぼ", "လူရှာ ပုန်းတမ်း"), purpose: tx("Build recall and confidence through easy people searches.", "簡単な人探しで呼び戻しと自信を育てる。", "လွယ်ကူသောလူရှာခြင်းဖြင့် ပြန်လာမှုနှင့် ယုံကြည်မှုတိုးစေသည်။"), duration: 5, intensity: tx("Low", "低い", "နိမ့်"), steps: ["One person gently holds Nako while Edwin or Yukari hides somewhere easy.", "Release with Find Edwin or Find Yukari."], safety: ["Start with very easy hiding places and never frighten her."] },
    { id: "cup-game", title: tx("Cup Game", "カップゲーム", "ခွက်ဂိမ်း"), purpose: tx("Simple scent choice and thinking game.", "シンプルなにおい選びと思考ゲーム。", "ရိုးရှင်းသောအနံ့ရွေးချယ်မှုနှင့် စဉ်းစားဂိမ်း။"), duration: 3, intensity: tx("Low", "低い", "နိမ့်"), steps: ["Place one treat under one of two cups.", "Let Nako sniff and choose; later use three cups."], safety: ["Do not shuffle cups rapidly to confuse her."] },
    { id: "toy-names", title: tx("Toy Name Game", "おもちゃの名前ゲーム", "ကစားစရာအမည်ဂိမ်း"), purpose: tx("Learn names for visually different toys.", "見た目が違うおもちゃの名前を学ぶ。", "ပုံစံမတူသော ကစားစရာအမည်များကိုသင်ယူရန်။"), duration: 5, intensity: tx("Low", "低い", "နိမ့်"), steps: ["Start with two different toys such as a ball and rope.", "Reward touching or retrieving the named toy."], safety: ["Keep choices clear and stop before frustration."] },
    { id: "confidence-course", title: tx("Low Confidence Course", "低い自信コース", "နိမ့်သောယုံကြည်မှုလမ်းကြောင်း"), purpose: tx("Explore safe textures and small obstacles at her own pace.", "安全な感触と小さな障害を自分のペースで探索する。", "လုံခြုံသောမျက်နှာပြင်နှင့် အတားအဆီးငယ်များကို မိမိအရှိန်ဖြင့် စူးစမ်းရန်။"), duration: 5, intensity: tx("Low", "低い", "နိမ့်"), steps: ["Walk between boxes, onto a low mat, through a floor-level hoop, or around a chair.", "Reward voluntary movement."], safety: ["No high jumps, unstable furniture, slippery surfaces, or forced movement."] },
    { id: "which-hand", title: tx("Which Hand?", "どっちの手？", "ဘယ်လက်လဲ?"), purpose: tx("Short scent and choice game.", "短いにおいと選択のゲーム。", "တိုတောင်းသောအနံ့နှင့်ရွေးချယ်မှုဂိမ်း။"), duration: 3, intensity: tx("Low", "低い", "နိမ့်"), steps: ["Hide a treat in one closed fist.", "Let Nako choose, then reward."], safety: ["Keep sessions short."] },
    { id: "toy-search", title: tx("Toy Search", "おもちゃ探し", "ကစားစရာရှာ"), purpose: tx("Build a toy search gradually.", "おもちゃ探しを少しずつ育てる。", "ကစားစရာရှာခြင်းကို တဖြည်းဖြည်းတိုးတက်စေရန်။"), duration: 5, intensity: tx("Low", "低い", "နိမ့်"), steps: ["Show a familiar toy, hide it somewhere very easy, then say Find it.", "Increase difficulty gradually."], safety: ["Choose safe, reachable hiding places."] },
    { id: "calm-enrichment", title: tx("Calm Enrichment", "落ち着く知育", "ငြိမ်သက်စေသောစိတ်လှုပ်ရှားမှု"), purpose: tx("Offer calming activity; play does not always need more excitement.", "遊びはいつも興奮を高める必要はありません。落ち着く活動を選びます。", "ကစားခြင်းသည် အမြဲစိတ်လှုပ်ရှားမှုပိုမိုစေဖို့မလိုပါ။ ငြိမ်သက်သောလှုပ်ရှားမှုကိုရွေးပါ။"), duration: 10, intensity: tx("Low", "低い", "နိမ့်"), steps: ["Offer a lick mat, stuffed Kong, safe chew, snuffle mat, scatter feed, or calm grooming.", "Finish active play by settling on a mat."], safety: ["Use only safe, supervised enrichment items."] }
  ];
  const activityTranslations = {
    "tug-fetch": { jp: ["取る前に「テイク」と言う。", "やさしく引っ張り、ドロップではおもちゃを止める。", "自発的に離したらほめ、短い距離に投げる。", "最後は「オールダン」で終える。"], mm: ["ကစားစရာမယူမီ Take it ဟုပြောပါ။", "နူးညံ့စွာဆွဲကစားပြီး Drop တွင် ကစားစရာကိုငြိမ်ထားပါ။", "စိတ်လိုလက်ရလွှတ်လျှင် ဆုချပြီး အနီးသို့ပစ်ပါ။", "All Done ဖြင့်အဆုံးသတ်ပါ။"], sjp: ["ကစားစရာကိုနိမ့်နိမ့်ထားပြီး ဘေးဘက်သို့သာ နူးညံ့စွာလှုပ်ပါ။", "မချောသောကြမ်းပြင်သုံးပြီး ရုတ်တရက်ရပ်ခြင်းရှောင်ကာ ကစားစရာစစ်ဆေးပါ။"], sja: ["おもちゃを低く保ち、やさしく横に動かします。", "滑らない床を使い、急停止を避けておもちゃを点検します。"] },
    "find-it-game": { jp: ["「探して」と言い、近くにキブルを見えるように投げる。", "脚の後ろ、開いたタオルの下、軽い物の後ろへ少しずつ進める。", "後でおもちゃも探す。"], mm: ["Find it ဟုပြောပြီး kibble ကိုအနီးတွင်မြင်သာစွာပစ်ပါ။", "ခြေနောက်၊ ဖွင့်ထားသောတဘက်အောက်၊ ပေါ့ပါးသောပစ္စည်းနောက်သို့ တဖြည်းဖြည်းတိုးပါ။", "နောက်ပိုင်းတွင် ကစားစရာကိုလည်းရှာပါ။"], sja: ["簡単な探索にし、1日の食事量に入れます。"], sjp: ["ရှာဖွေမှုကိုလွယ်ကူစွာထားပြီး နေ့စဉ်အစားအစာပမာဏထဲထည့်တွက်ပါ။"] },
    "hide-seek-people": { jp: ["エドウィンかユカリが簡単な場所に隠れる間、1人がナコをやさしく支える。", "「エドウィンを探して」または「ユカリを探して」で解放する。"], mm: ["Edwin သို့မဟုတ် Yukari လွယ်ကူသောနေရာတွင်ပုန်းစဉ် လူတစ်ယောက်က Nako ကိုနူးညံ့စွာထိန်းထားပါ။", "Find Edwin သို့မဟုတ် Find Yukari ဖြင့်လွှတ်ပါ။"], sja: ["とても簡単な隠れ場所から始め、怖がらせないでください。"], sjp: ["အလွန်လွယ်ကူသောပုန်းနေရာမှစပြီး မကြောက်စေပါနှင့်။"] },
    "cup-game": { jp: ["2つのカップの一方におやつを置く。", "ナコににおいを嗅いで選ばせ、後で3つのカップにする。"], mm: ["ခွက်နှစ်ခွက်အနက် တစ်ခွက်အောက်တွင် ဆုထားပါ။", "Nako ကိုအနံ့ခံ၍ရွေးစေပြီး နောက်ပိုင်းတွင် သုံးခွက်သုံးပါ။"], sja: ["混乱させるためにカップを速く動かさないでください。"], sjp: ["စိတ်ရှုပ်စေရန် ခွက်များကိုမြန်မြန်မရွှေ့ပါနှင့်။"] },
    "toy-names": { jp: ["ボールとロープなど、違う2つのおもちゃから始める。", "名前を言ったおもちゃに触る・持ってくることをほめる。"], mm: ["ဘောလုံးနှင့်ကြိုးကဲ့သို့ မတူသောကစားစရာနှစ်ခုဖြင့်စပါ။", "အမည်ခေါ်သောကစားစရာကိုထိခြင်း သို့မဟုတ်ယူလာခြင်းကိုဆုချပါ။"], sja: ["選択を明確にし、いら立つ前に終えます。"], sjp: ["ရွေးချယ်မှုကိုရှင်းလင်းစွာထားပြီး စိတ်ပျက်မီရပ်ပါ။"] },
    "confidence-course": { jp: ["箱の間、低いマット、床のフープ、椅子の周りを歩く。", "自発的な動きをほめる。"], mm: ["သေတ္တာကြား၊ နိမ့်သောဖျာ၊ ကြမ်းပြင်ကွင်း သို့မဟုတ်ထိုင်ခုံပတ်လည် လျှောက်ပါ။", "စိတ်လိုလက်ရရွေ့လျားမှုကိုဆုချပါ။"], sja: ["高いジャンプ、不安定な家具、滑る面、強制移動はしません。"], sjp: ["မြင့်သောခုန်ခြင်း၊ မတည်ငြိမ်သောပရိဘောဂ၊ မချောမျက်နှာပြင်နှင့် အတင်းရွှေ့ခြင်းမလုပ်ပါနှင့်။"] },
    "which-hand": { jp: ["片方の握った手におやつを隠す。", "ナコに選ばせてからほめる。"], mm: ["လက်သီးတစ်ဖက်တွင် ဆုဖျောက်ထားပါ။", "Nako ကိုရွေးစေပြီးနောက် ဆုချပါ။"], sja: ["練習は短く保ちます。"], sjp: ["လေ့ကျင့်ချိန်တိုတိုထားပါ။"] },
    "toy-search": { jp: ["慣れたおもちゃを見せ、簡単な場所に隠してから「探して」と言う。", "難しさを少しずつ上げる。"], mm: ["ရင်းနှီးသောကစားစရာကိုပြပြီး လွယ်ကူသောနေရာတွင်ဖျောက်ကာ Find it ဟုပြောပါ။", "အခက်အခဲကိုတဖြည်းဖြည်းတိုးပါ။"], sja: ["安全で届く隠れ場所を選びます。"], sjp: ["လုံခြုံပြီးရောက်နိုင်သောပုန်းနေရာကိုရွေးပါ။"] },
    "calm-enrichment": { jp: ["リックマット、詰めたコング、安全なかみ物、ノーズワークマット、ばらまき給餌、落ち着いたグルーミングを用意する。", "活発な遊びの後はマットで落ち着いて終える。"], mm: ["lick mat၊ အစာထည့် Kong၊ လုံခြုံသောဝါးစရာ၊ snuffle mat၊ အစာဖြန့်ကျွေးခြင်း သို့မဟုတ်ငြိမ်သက်သောအမွေးပြင်ဆင်ခြင်းပေးပါ။", "တက်ကြွသောကစားပြီးနောက် ဖျာပေါ်ငြိမ်သက်စွာအဆုံးသတ်ပါ။"], sja: ["安全で見守れる知育アイテムだけを使います。"], sjp: ["လုံခြုံပြီးစောင့်ကြည့်နိုင်သောစိတ်လှုပ်ရှားမှုပစ္စည်းများသာသုံးပါ။"] }
  };
  activities.forEach((activity) => {
    const translated = activityTranslations[activity.id];
    activity.steps = activity.steps.map((step, index) => tx(step, translated.jp[index], translated.mm[index]));
    activity.safety = activity.safety.map((item, index) => tx(item, translated.sja[index], translated.sjp[index]));
  });
  const videos = [
    ["name-look-video", ["name-look"], [], "How to Teach Puppy Recall: A Step-by-Step Guide for Beginners", "McCann Dog Training", "https://www.youtube.com/watch?v=xHdiXy2hPCY", "21:30", true],
    ["come-video", ["come"], [], "Learn The Command That Could Save Your Dogs Life...", "McCann Dog Training", "https://www.youtube.com/watch?v=t-KcoNwtlJY", "11:45", true],
    ["emergency-video", ["emergency-recall"], [], "How to Teach Your Dog an Emergency Recall | Life Saving Command | AKC Training Tips", "American Kennel Club", "https://www.youtube.com/watch?v=d-AzW7BkRdI", "5:42", true],
    ["leave-it-video", ["leave-it"], [], "Teach your puppy to 'Leave It'", "Kikopup", "https://www.youtube.com/watch?v=D9gTe0jPJbU", "4:50", true],
    ["drop-video", ["drop-give"], ["tug-fetch"], "Teach your dog to DROP - Dog Training by Kikopup", "Kikopup", "https://www.youtube.com/watch?v=tVivnOwiMoA", "9:20", true],
    ["stay-video", ["wait", "stay"], [], "How to Teach your Puppy to Sit and Stay", "Zak George’s Dog Training Revolution", "https://www.youtube.com/watch?v=DPNz6reMVXY", "10:45", true],
    ["mat-video", ["place-break", "settle"], [], "Teaching dog to settle aka mat work.", "Tailored Dog Training", "https://www.youtube.com/watch?v=Yne2oR0lUCo", "5:12", true],
    ["touch-review", ["touch"], [], "Dog Tricks: Paw Targeting", "Kikopup", "https://www.youtube.com/watch?v=i9tOdmJLVl0", "5:10", false],
    ["chin-review", ["chin-rest", "paw", "lift-carry"], [], "How to train Attention and Eye Contact!", "Kikopup", "https://www.youtube.com/watch?v=eiMGJBxRtBw", "7:15", false],
    ["middle-review", ["ashi-middle"], [], "COME when called with DISTRACTIONS! - come training / recall proofing game", "Kikopup", "https://www.youtube.com/watch?v=tV5qsH5tjYA", "4:45", false],
    ["jump-review", ["jump-arms"], [], "Dog Tricks: Paw Targeting", "Kikopup", "https://www.youtube.com/watch?v=i9tOdmJLVl0", "6:00", false],
    ["hoop-review", ["hoop"], [], "Proofing Drop it and Get it - Dog Training by Kikopup", "Kikopup", "https://www.youtube.com/watch?v=a4X3CWS-M60", "5:30", false],
    ["find-review", ["find-it"], ["find-it-game"], "Teaching dog to settle aka mat work.", "Tailored Dog Training", "https://www.youtube.com/watch?v=Yne2oR0lUCo", "6:15", false]
  ].map(([id, commandIds, activityIds, title, channel, url, duration, verified]) => ({ id, commandIds, activityIds, title: tx(title, title, title), channel: tx(channel, channel, channel), url, duration, verified, needsReview: !verified, summary: tx("Open in YouTube for the full reward-based demonstration.", "ごほうびベースの実演はYouTubeで確認できます。", "ဆုအခြေပြုသရုပ်ပြအပြည့်အစုံကို YouTube တွင်ကြည့်နိုင်သည်။"), safety: tx("Use only force-free methods and stop if Nako is uncomfortable.", "強制のない方法だけを使い、ナコが不快そうなら止めます。", "အတင်းအကျပ်မရှိသောနည်းလမ်းများသာသုံးပြီး Nako မသက်မသာဖြစ်လျှင်ရပ်ပါ။") }));
  const scoringGuide = [
    { score: "0", description: tx("Not introduced.", "まだ教えていません。", "မသင်ရသေးပါ။") },
    { score: "1–2", description: tx("Follows only a physical lure or visible food lure.", "手や見える食べ物で誘導した時だけできます。", "လက်ဖြင့် သို့မဟုတ် မြင်ရသောအစားအစာဖြင့် လမ်းညွှန်မှသာ လုပ်နိုင်သည်။") },
    { score: "3–4", description: tx("Beginning to understand but normally needs visible food.", "理解し始めていますが、通常は見える食べ物が必要です。", "နားလည်စပြုသော်လည်း အများအားဖြင့် မြင်ရသောအစားအစာ လိုသေးသည်။") },
    { score: "5–6", description: tx("Usually responds at home while food is hidden.", "家では、食べ物を隠していてもだいたいできます。", "အိမ်မှာ အစားအစာဖွက်ထားလည်း အများအားဖြင့် လုပ်နိုင်သည်။") },
    { score: "7–8", description: tx("Responds to the first cue in familiar environments with intermittent rewards.", "慣れた場所で、時々のごほうびでも最初の合図に反応します。", "ရင်းနှီးသောနေရာမှာ တစ်ခါတစ်ရံသာ ဆုပေးလည်း ပထမအမိန့်ကို လုပ်နိုင်သည်။") },
    { score: "9", description: tx("Responds reliably in multiple environments with moderate distractions.", "いくつかの場所で、少し気が散っても確実に反応します。", "နေရာအမျိုးမျိုးမှာ အာရုံအနည်းငယ်ပျံ့လည်း ယုံကြည်စိတ်ချစွာ လုပ်နိုင်သည်။") },
    { score: "10", description: tx("Emergency-level reliability: about 9 successful first-cue responses out of 10.", "緊急時に使える信頼度です。10回中約9回、最初の合図で成功します。", "အရေးပေါ်အဆင့် ယုံကြည်စိတ်ချရသည်။ ၁၀ ကြိမ်မှာ ၉ ကြိမ်ခန့် ပထမအမိန့်ဖြင့် အောင်မြင်သည်။") }
  ];
  const scoringExplanation = tx(
    "A high score means food need not be visible before Nako responds. Rewards may still follow success.",
    "高いスコアは、食べ物を先に見せなくてもNakoが反応できるという意味です。成功後にごほうびを与えてもかまいません。",
    "အမှတ်မြင့်လျှင် အစားအစာကို အရင်မပြဘဲ Nako က လုပ်နိုင်သည်ဟု ဆိုလိုသည်။ အောင်မြင်ပြီးနောက် ဆုပေးနိုင်သေးသည်။"
  );
  const commandMeanings = [
    { name: tx("Sit", "おすわり", "ထိုင်"), description: tx("Bottom down, front body upright.", "お尻を床につけ、上半身を起こします。", "တင်ပါးကိုချပြီး ရှေ့ကိုယ်ကို မတ်ထားပါ။") },
    { name: tx("Lie Down", "伏せ", "လှဲ"), description: tx("Body fully lying on the floor.", "体全体を床に伏せます。", "ကိုယ်တစ်ခုလုံးကို ကြမ်းပြင်ပေါ် လှဲပါ။") },
    { name: tx("Up", "上がる", "တက်"), description: tx("Climb onto a surface.", "台や面の上に上がります。", "မျက်နှာပြင်တစ်ခုပေါ် တက်ပါ။") },
    { name: tx("Step Down / Off", "降りる", "ဆင်း"), description: tx("Descend from a surface.", "台や面から降ります。", "မျက်နှာပြင်ပေါ်မှ ဆင်းပါ။") },
    { name: tx("Wait", "待って", "စောင့်"), description: tx("Pause temporarily.", "一時的に動きを止めます。", "ခဏရပ်ပြီး စောင့်ပါ။") },
    { name: tx("Stay", "ステイ", "နေ"), description: tx("Remain until formally released.", "解除の合図までその場にいます。", "လွှတ်သည့်အမိန့်မရမချင်း နေရာမှာနေပါ။") },
    { name: tx("Break", "解除", "လွှတ်"), description: tx("Formal release from Stay or Place.", "StayやPlaceを終える正式な解除合図です。", "Stay သို့မဟုတ် Place ကို အဆုံးသတ်သည့် လွှတ်အမိန့်ဖြစ်သည်။") },
    { name: tx("Gaman → OK", "我慢 → OK", "စောင့် → OK"), description: tx("Wait and tolerate; OK permits taking food.", "我慢して待ち、OKで食べ物を取れます。", "စောင့်ထားပါ။ OK ကြားမှ အစားအစာယူနိုင်သည်။") },
    { name: tx("Leave It", "放って", "မယူနဲ့"), description: tx("Do not take or approach.", "取らず、近づきません。", "မယူပါနှင့်။ အနီးမသွားပါနှင့်။") },
    { name: tx("Drop / Give", "離す", "ချ"), description: tx("Release something already in the mouth.", "口にある物を離します。", "ပါးစပ်ထဲရှိပစ္စည်းကို လွှတ်ချပါ။") },
    { name: tx("Place", "所定の場所へ", "နေရာသွား"), description: tx("Go independently to a defined mat or bed.", "決めたマットやベッドへ自分で行きます。", "သတ်မှတ်ထားသော ဖျာ သို့မဟုတ် အိပ်ရာသို့ ကိုယ်တိုင်သွားပါ။") },
    { name: tx("Settle", "落ち着く", "ငြိမ်"), description: tx("Relax calmly rather than wait tensely.", "緊張して待つのではなく、静かにくつろぎます。", "တင်းမာစွာစောင့်မနေဘဲ အေးအေးဆေးဆေး နားပါ။") },
    { name: tx("All Done", "終わり", "ပြီးပြီ"), description: tx("The session has ended.", "練習は終わりです。", "လေ့ကျင့်ချိန် ပြီးပါပြီ။") }
  ];
  const labels = {
    tabs: { commands: tx("Commands", "コマンド", "အမိန့်များ"), play: tx("Play & Enrichment", "遊びと知育", "ကစားခြင်းနှင့် စိတ်ပိုင်းဆိုင်ရာလှုပ်ရှားမှု"), log: tx("Training Log", "トレーニング記録", "လေ့ကျင့်ရေးမှတ်တမ်း") },
    addLog: tx("Add log", "記録を追加", "မှတ်တမ်းထည့်ရန်"), history: tx("View history", "履歴を見る", "မှတ်တမ်းကြည့်ရန်"), save: tx("Save", "保存", "သိမ်းရန်"), cancel: tx("Cancel", "キャンセル", "ပယ်ဖျက်ရန်"), commandLog: tx("Training log", "トレーニング記録", "လေ့ကျင့်ရေးမှတ်တမ်း"), playLog: tx("Play log", "遊びの記録", "ကစားမှတ်တမ်း"), score: tx("Progress score", "進捗スコア", "တိုးတက်မှုအမှတ်"), reward: tx("Reward reliance", "ごほうびへの依存度", "ဆုလာဘ်အပေါ် မှီခိုမှု"), environment: tx("Environment", "環境", "နေရာအခြေအနေ"), successes: tx("Successful first-cue responses", "最初の合図での成功回数", "ပထမအမိန့်အောင်မြင်မှု"), attempts: tx("Total attempts", "試行回数", "စုစုပေါင်းကြိုးစားမှု"), duration: tx("Duration (minutes)", "時間（分）", "ကြာချိန် (မိနစ်)"), comment: tx("Comment", "メモ", "မှတ်ချက်"), date: tx("Date and time", "日時", "ရက်စွဲနှင့်အချိန်"), lastPractised: tx("Last practised", "最終練習", "နောက်ဆုံးလေ့ကျင့်ချိန်"), milestone: tx("Next milestone", "次の目標", "နောက်တစ်ဆင့်ရည်မှန်းချက်"), needsPractice: tx("Needs Practice", "練習が必要", "လေ့ကျင့်ရန်လို"), filters: tx("Filters", "絞り込み", "စစ်ထုတ်ရန်"), all: tx("All", "すべて", "အားလုံး"), category: tx("Category", "カテゴリー", "အမျိုးအစား"), priority: tx("Priority", "優先度", "ဦးစားပေး"), recent: tx("Recently practised", "最近練習した", "မကြာသေးမီကလေ့ကျင့်ခဲ့"), rules: tx("Training Rules", "トレーニングのルール", "လေ့ကျင့်ရေးစည်းမျဉ်းများ"), meanings: tx("Command meanings", "コマンドの意味", "အမိန့်အဓိပ္ပာယ်များ"), scoring: tx("How scoring works", "スコアの仕組み", "အမှတ်ပေးနည်း"), review: tx("Reference needs review", "参考動画の確認が必要です", "ရည်ညွှန်းဗီဒီယိုကို ပြန်လည်စစ်ဆေးရန်လိုသည်"), openYouTube: tx("Open in YouTube", "YouTubeで開く", "YouTube တွင်ဖွင့်ရန်"), engagement: tx("Engagement (1–5)", "集中度（1～5）", "ပါဝင်မှု (၁–၅)"), energyBefore: tx("Energy before (1–5)", "遊び前の元気さ（1～5）", "မကစားမီစွမ်းအင် (၁–၅)"), energyAfter: tx("Energy after (1–5)", "遊び後の元気さ（1～5）", "ကစားပြီးနောက်စွမ်းအင် (၁–၅)"), dropResponse: tx("Response to Drop", "ドロップへの反応", "Drop တုံ့ပြန်မှု"), allDoneResponse: tx("Response to All Done", "オールダンへの反応", "All Done တုံ့ပြန်မှု"), favouriteToy: tx("Favourite toy", "お気に入りのおもちゃ", "အကြိုက်ဆုံးကစားစရာ"), unusual: tx("Unusual behaviour or health note", "気になる様子・健康メモ", "ထူးခြားအပြုအမူ သို့မဟုတ် ကျန်းမာရေးမှတ်ချက်"), delete: tx("Delete", "削除", "ဖျက်ရန်"), edit: tx("Edit", "編集", "ပြင်ရန်"), saved: tx("Saved", "保存しました", "သိမ်းပြီးပါပြီ"), cueNotSelected: tx("Not selected", "未選択", "မရွေးရသေး"), cueLabel: tx("Preferred cue", "希望する合図", "နှစ်သက်သောအမိန့်"), trialResult: tx("5-trial result", "5回の結果", "၅ ကြိမ်ရလဒ်"), details: tx("Details", "詳細", "အသေးစိတ်"), hideDetails: tx("Hide details", "詳細を隠す", "အသေးစိတ်ဖျောက်ရန်"), noLogs: tx("No saved training logs yet.", "保存されたトレーニング記録はまだありません。", "သိမ်းထားသောလေ့ကျင့်ရေးမှတ်တမ်း မရှိသေးပါ။"), videoSafety: tx("Safety", "安全", "ဘေးကင်းရေး")
  };
  Object.assign(labels, {
    confirmDeleteTraining: tx("Delete this training log?", "このトレーニング記録を削除しますか？", "ဒီလေ့ကျင့်ရေးမှတ်တမ်းကို ဖျက်မလား။"),
    confirmDeletePlay: tx("Delete this play log?", "この遊びの記録を削除しますか？", "ဒီကစားမှတ်တမ်းကို ဖျက်မလား။"),
    invalidCommandLog: tx("Use a score from 0 to 10. Successes cannot be more than attempts.", "スコアは0～10にしてください。成功回数は試行回数以下にします。", "အမှတ်ကို ၀ မှ ၁၀ အတွင်းထည့်ပါ။ အောင်မြင်မှုက ကြိုးစားမှုထက် မများရပါ။"),
    invalidPlayLog: tx("Use scores from 1 to 5.", "スコアは1～5にしてください。", "အမှတ်ကို ၁ မှ ၅ အတွင်းထည့်ပါ။")
  });
  const rules = [
    tx("Reward good behaviour.", "良い行動にはごほうびを与えます。", "အပြုအမူကောင်းရင် ဆုပေးပါ။"),
    tx("Keep training short. Make it easier after repeated failure.", "練習は短くします。失敗が続いたら簡単にします。", "လေ့ကျင့်ချိန်တိုတိုထားပါ။ မအောင်မြင်ရင် ပိုလွယ်အောင်လုပ်ပါ။"),
    tx("Never scare, hit, pin, shout at, or force Nako.", "Nakoを怖がらせる、叩く、押さえる、怒鳴る、無理に動かすことは禁止です。", "Nako ကို မခြောက်လှန့်ပါနဲ့။ မရိုက်ပါနဲ့။ မဖိပါနဲ့။ မအော်ပါနဲ့။ အတင်းမလုပ်ပါနဲ့။"),
    tx("Never use shock, prong, choke, or punishment tools.", "電気、プロング、チョークなどの罰を与える道具は禁止です。", "လျှပ်စစ်၊ ဆူး၊ လည်ပင်းညှစ် သို့မဟုတ် အပြစ်ပေးပစ္စည်း မသုံးပါနဲ့။"),
    tx("Never punish Nako for coming back. Never force an item from her mouth.", "戻って来たNakoを叱りません。口から物を無理に取りません。", "Nako ပြန်လာရင် မဆူပါနဲ့။ ပါးစပ်ထဲကပစ္စည်းကို အတင်းမယူပါနဲ့။"),
    tx("Stop if Nako is sore, afraid, tired, unwilling, or unsteady. Tell Edwin about pain, limping, coughing, injury, fear, aggression, or unusual behaviour.", "痛み、怖がる、疲れる、嫌がる、ふらつく場合は中止します。痛み、足を引きずる、咳、けが、強い恐怖、攻撃性、異常な行動はEdwinに伝えます。", "Nako နာရင်၊ ကြောက်ရင်၊ ပင်ပန်းရင်၊ မလုပ်ချင်ရင် သို့မဟုတ် မတည်ငြိမ်ရင် ရပ်ပါ။ နာကျင်မှု၊ ခြေထော့ခြင်း၊ ချောင်းဆိုးခြင်း၊ ဒဏ်ရာ၊ ကြောက်ရွံ့မှု၊ ရန်လိုမှု သို့မဟုတ် ထူးခြားမှုကို Edwin ကိုပြောပါ။")
  ];
  const rewardOptions = [tx("Food visible", "食べ物が見える", "အစားအစာမြင်ရ"), tx("Food lure", "食べ物で誘導", "အစားအစာဖြင့်ဆွဲဆောင်"), tx("Food hidden", "食べ物を隠す", "အစားအစာဖျောက်ထား"), tx("Intermittent food", "時々食べ物", "တစ်ခါတစ်ရံအစားအစာ"), tx("Toy or play reward", "おもちゃ・遊びのごほうび", "ကစားစရာ သို့မဟုတ်ကစားခြင်းဆု"), tx("Praise only", "ほめるだけ", "ချီးမွမ်းခြင်းသာ"), tx("Not tested", "未テスト", "မစမ်းသပ်ရသေး")];
  const environmentOptions = [tx("Quiet home", "静かな家", "တိတ်ဆိတ်သောအိမ်"), tx("Home with mild distractions", "軽い気の散りがある家", "အနည်းငယ်အာရုံပျံ့စရာရှိသောအိမ်"), tx("Corridor or common area", "廊下・共用エリア", "စင်္ကြံ သို့မဟုတ်အများသုံးနေရာ"), tx("Outdoors with mild distractions", "軽い気の散りがある屋外", "အနည်းငယ်အာရုံပျံ့စရာရှိသောအပြင်"), tx("Busy environment", "にぎやかな環境", "လူရှုပ်သောနေရာ"), tx("Strong distraction or emergency simulation", "強い気の散り・緊急シミュレーション", "ပြင်းထန်သောအာရုံပျံ့စရာ သို့မဟုတ်အရေးပေါ်စမ်းသပ်မှု"), tx("Not tested", "未テスト", "မစမ်းသပ်ရသေး")];
  return { categories, priorities, commands, activities, videos, labels, rules, rewardOptions, environmentOptions, scoringGuide, scoringExplanation, commandMeanings };
})();


const recipes = [
  recipe("sasami", 
    t("Chicken tender topping", "ささみトッピング", "ကြက်သားဖတ် အပေါ်မှထည့်ရန်"), 
    [
      [t("Chicken tender", "ささみ", "ကြက်သားဖတ်"), "100g", "chicken-tender"], 
      [t("Pumpkin", "かぼちゃ", "ရွှေဖရုံသီး"), "40g", "pumpkin"], 
      [t("Carrot", "にんじん", "မုန်လာဥနီ"), "40g", "carrot"]
    ], 
    [
      t("Boil or steam the chicken tender until fully cooked.", "ささみを完全に火が通るまで茹でるか蒸します。", "ကြက်သားဖတ်ကို ကျက်အောင် ပြုတ်ပါ သို့မဟုတ် ပေါင်းပါ။"), 
      t("Steam pumpkin and carrot until soft.", "かぼちゃとにんじんを柔らかくなるまで蒸します。", "ရွှေဖရုံသီးနှင့် မုန်လာဥနီကို နူးညံ့သွားအောင် ပေါင်းပါ။"), 
      t("Cool, cut small, and mix only the approved amount with food.", "冷まし、小さくカットし、承認された分量のみをドッグフードと混ぜます。", "အေးအောင်ထားပါ၊ အတုံးသေးသေးတုံးပြီး ခွင့်ပြုထားသော ပမာဏကိုသာ အစာနှင့် ရောမွှေပါ။")
    ], 
    t("No seasoning, oil, onion, or garlic.", "調味料、油、玉ねぎ、にんにくは使用しないでください。", "ဟင်းခတ်မှုန့်၊ ဆီ၊ ကြက်သွန်နီ သို့မဟုတ် ကြက်သွန်ဖြူ လုံးဝမသုံးရ။"),
    [
      photo("assets/recipes/sasami-ingredients.jpg",
        t("Chicken tender, pumpkin, and carrot ingredients at the store", "店でのささみ、かぼちゃ、にんじんの食材", "ဆိုင်ရှိ ကြက်သားဖတ်၊ ရွှေဖရုံသီးနှင့် မုန်လာဥနီ ပါဝင်ပစ္စည်းများ"),
        t("Buy high-quality chicken tender, pumpkin slice, and fresh carrots.", "質の良いささみ、カットかぼちゃ、新鮮なにんじんを購入します。", "အရည်အသွေးကောင်းသော ကြက်သားဖတ်၊ ရွှေဖရုံသီးစိတ်နှင့် လတ်ဆတ်သော မုန်လာဥနီများကို ဝယ်ယူပါ။")),
      photo("assets/recipes/sasami-prep.jpg",
        t("Preparing the ingredients in the kitchen", "キッチンでの食材の準備", "မီးဖိုချောင်တွင် ပါဝင်ပစ္စည်းများ ပြင်ဆင်ခြင်း"),
        t("Place chicken, pumpkin slice, and carrots on the clean kitchen counter before cutting.", "カットする前に、きれいにしたキッチンの天板に鶏肉、かぼちゃ、にんじんを置きます。", "အတုံးမတုံးမီ သန့်ရှင်းသော မီးဖိုချောင်စားပွဲပေါ်တွင် ကြက်သား၊ ရွှေဖရုံသီးနှင့် မုန်လာဥနီတို့ကို တင်ထားပါ။")),
      photo("assets/recipes/sasami-cooking.jpg",
        t("Chopping and boiling the topping ingredients", "トッピング食材の刻みと煮沸", "ပါဝင်ပစ္စည်းများ ညှပ်ခြင်းနှင့် ပြုတ်ခြင်း"),
        t("Chop the pumpkin and carrots finely, boil with chicken tender, and skim off the foam.", "かぼちゃとにんじんを細かく刻み、ささみと一緒に茹で、アクをすくい取ります。", "ရွှေဖရုံသီးနှင့် မုန်လာဥနီများကို သေးသေးညှပ်ပါ၊ ကြက်သားဖတ်နှင့်အတူ ပြုတ်ပြီး အမြှုပ်များကို ခပ်ထုတ်ပါ။")),
      photo("assets/recipes/sasami-portioning.jpg",
        t("Portioning the cooked topping into containers", "調理したトッピングを容器に小分けする", "ကျက်သွားသော အစာများကို ဗူးများထဲသို့ ခွဲထည့်ခြင်း"),
        t("Distribute the cooked and cooled topping into clean freezer containers for storage.", "保管するために、調理して冷ましたトッピングをきれいな冷凍容器に小分けします。", "သိမ်းဆည်းရန်အတွက် ချက်ပြုတ်အေးခဲထားသော အစာများကို သန့်ရှင်းသော အေးခဲဗူးများထဲသို့ ခွဲထည့်ပါ။"))
    ]),
  recipe("whitefish", 
    t("White fish topping", "白身魚トッピング", "ငါးဖြူ အပေါ်မှထည့်ရန်"), 
    [
      [t("White fish", "白身魚", "ငါးဖြူ"), "100g", "whitefish"], 
      [t("Sweet potato", "さつまいも", "ကန်စွန်းဥ"), "40g", "sweet-potato"], 
      [t("Zucchini", "ズッキーニ", "ဇူကီနီ"), "40g", "zucchini"]
    ], 
    [
      t("Steam or boil the white fish and remove all bones carefully.", "白身魚を蒸すか茹で、すべての骨を丁寧に取り除きます。", "ငါးဖြူကို ပေါင်းပါ သို့မဟုတ် ပြုတ်ပါ၊ အရိုးအားလုံးကို ဂရုတစိုက် ဖယ်ရှားပါ။"), 
      t("Steam sweet potato and zucchini until soft.", "さつまいもとズッキーニを柔らかくなるまで蒸します。", "ကန်စွန်းဥနှင့် ဇူကီနီကို နူးညံ့သွားအောင် ပေါင်းပါ။"), 
      t("Cool everything and break into small pieces before serving.", "すべてを冷まし、小さくほぐしてから与えます。", "အားလုံးအေးအောင်ထားပြီး မကျွေးမီ အပိုင်းအစလေးများဖြစ်အောင် ခြေပေးပါ။")
    ], 
    t("Check carefully for fish bones before serving.", "与える前に魚の骨がないか注意深く確認してください。", "မကျွေးမီ ငါးရိုးများ ရှိမရှိ သေချာစွာ စစ်ဆေးပါ။")),
  recipe("chickenbreast", 
    t("Chicken breast topping", "鶏むね肉トッピング", "ကြက်ရင်ပုံသား အပေါ်မှထည့်ရန်"), 
    [
      [t("Chicken breast", "鶏むね肉", "ကြက်ရင်ပုံသား"), "100g", "chicken-breast"], 
      [t("Napa cabbage", "白菜", "မုန်ညင်းဖြူ"), "40g", "napa-cabbage"], 
      [t("Broccoli", "ブロッコリー", "ပန်းဂေါ်ဖီစိမ်း"), "30g", "broccoli"]
    ], 
    [
      t("Boil chicken breast until fully cooked and shred finely.", "鶏むね肉を完全に火が通るまで茹で、細かく割きます。", "ကြက်ရင်ပုံသားကို ကျက်အောင်ပြုတ်ပြီး အမျှင်လေးများရအောင် နွှာပါ။"), 
      t("Steam napa cabbage and broccoli until soft.", "白菜とブロッコリーを柔らかくなるまで蒸します。", "မုန်ညင်းဖြူနှင့် ပန်းဂေါ်ဖီစိမ်းကို နူးညံ့အောင် ပေါင်းပါ။"), 
      t("Cool, chop small, and mix gently with the regular meal.", "冷まし、細かく刻んで、通常のドッグフードと優しく混ぜ合わせます。", "အေးအောင်ထားပါ၊ အတုံးသေးသေးတုံးပြီး ပုံမှန်အစာနှင့် ညင်သာစွာ ရောမွှေပါ။")
    ], 
    t("Use plain cooked ingredients only.", "味付けのない調理済みの材料のみを使用してください。", "ရိုးရိုးကျက်အောင် ချက်ထားသော ပါဝင်ပစ္စည်းများကိုသာ သုံးပါ။")),
  recipe("nako-chicken-apple-vegetable-meal-prep",
    t("Nako's Chicken, Apple & Vegetable Meal Prep", "ナコの鶏肉・りんご・野菜の作り置き", "နာကိုအတွက် ကြက်သား၊ ပန်းသီးနှင့် ဟင်းသီးဟင်းရွက် အကြိုပြင်အစာ"),
    [
      [t("Plain chicken, fully cooked", "味付けなしで十分に加熱した鶏肉", "အရသာမထည့်ဘဲ ကျက်အောင်ချက်ထားသော ကြက်သား"), t("As needed", "適量", "လိုအပ်သလို"), "chicken-breast"],
      [t("Carrot", "にんじん", "မုန်လာဥနီ"), t("As needed", "適量", "လိုအပ်သလို"), "carrot"],
      [t("Cabbage", "キャベツ", "ဂေါ်ဖီထုပ်"), t("As needed", "適量", "လိုအပ်သလို"), "napa-cabbage"],
      [t("Apple, core and seeds removed", "芯と種を除いたりんご", "အူတိုင်နှင့် အစေ့များ ဖယ်ထားသော ပန်းသီး"), t("As needed", "適量", "လိုအပ်သလို"), "apple"],
      [t("Store-bought shimeji mushroom (optional; only if approved)", "市販のしめじ（任可されている場合のみ・任意）", "ဆိုင်မှဝယ်သော ရှိမေဂျီမှို (ခွင့်ပြုထားမှသာ၊ မထည့်လည်းရသည်)"), t("As needed", "適量", "လိုအပ်သလို"), "shimeji-mushroom"],
      [t("Water", "水", "ရေ"), t("As needed", "適量", "လိုအပ်သလို"), "water"]
    ],
    [
      t("Wash the produce. Remove the apple core, seeds, and stem; omit the mushroom unless it is already approved for Nako.", "野菜と果物を洗います。りんごの芯、種、軸を除き、しめじはナコに与えてよいと確認済みの場合のみ使います。", "ဟင်းသီးဟင်းရွက်နှင့် သစ်သီးကို ဆေးပါ။ ပန်းသီး၏ အူတိုင်၊ အစေ့နှင့် အညှာကို ဖယ်ပါ။ ရှိမေဂျီမှိုကို နာကိုအတွက် ခွင့်ပြုထားပြီးသားဖြစ်မှသာ သုံးပါ။"),
      t("Finely chop the carrot, cabbage, apple, and any approved shimeji mushroom.", "にんじん、キャベツ、りんご、使用する場合は許可済みのしめじを細かく刻みます。", "မုန်လာဥနီ၊ ဂေါ်ဖီထုပ်၊ ပန်းသီးနှင့် ခွင့်ပြုထားသော ရှိမေဂျီမှိုကို သေးသေးလေး လှီးပါ။"),
      t("Cook the chicken completely in plain water, then shred or mince it into small pieces.", "鶏肉を水だけで完全に火が通るまで加熱し、細かくほぐすか刻みます。", "ကြက်သားကို ရေသန့်ဖြင့် ကျက်အောင်ချက်ပြီး သေးသေးလေး မျှင်မျှင်ဖွာပါ သို့မဟုတ် နုပ်နုပ်စဉ်းပါ။"),
      t("Add the chopped ingredients and simmer only until soft. Do not add salt, oil, seasoning, sauce, onion, or garlic.", "刻んだ材料を加え、柔らかくなるまで煮ます。塩、油、調味料、ソース、玉ねぎ、にんにくは加えません。", "လှီးထားသော ပါဝင်ပစ္စည်းများကို ထည့်ပြီး နူးသည်အထိသာ တည်ပါ။ ဆား၊ ဆီ၊ ဟင်းခတ်မှုန့်၊ ဆော့စ်၊ ကြက်သွန်နီ သို့မဟုတ် ကြက်သွန်ဖြူ မထည့်ပါနှင့်။"),
      t("Cool completely, portion into clean freezer trays, and serve only the instructed amount with Nako's usual food.", "完全に冷ましてから清潔な冷凍トレーに小分けし、ナコの普段のフードに指示された量だけ混ぜて与えます。", "လုံးဝအေးသွားလျှင် သန့်ရှင်းသော ရေခဲသေတ္တာခွဲထည့်ပုံးများတွင် အပိုင်းခွဲထည့်ပြီး နာကို၏ ပုံမှန်အစာနှင့် ညွှန်ကြားထားသော ပမာဏကိုသာ ရောကျွေးပါ။")
    ],
    t("Never use onion, garlic, seasoning, sauce, oil, salt, bones, apple seeds, or wild mushrooms. Exact portions and feeding frequency must follow Nako's existing instructions.", "玉ねぎ、にんにく、調味料、ソース、油、塩、骨、りんごの種、野生のきのこは絶対に使わないでください。分量と与える頻度はナコの既存の指示に従います。", "ကြက်သွန်နီ၊ ကြက်သွန်ဖြူ၊ ဟင်းခတ်မှုန့်၊ ဆော့စ်၊ ဆီ၊ ဆား၊ အရိုး၊ ပန်းသီးအစေ့ သို့မဟုတ် တောမှိုများကို လုံးဝမသုံးပါနှင့်။ ပမာဏနှင့် ကျွေးသည့်အကြိမ်ရေကို နာကိုအတွက် ရှိပြီးသားညွှန်ကြားချက်အတိုင်း လိုက်နာပါ။"),
    [
      photo("assets/recipes/nako-chicken-apple-vegetable-meal-prep-portions.jpg", t("Portioned chicken and vegetable meal prep", "小分けした鶏肉と野菜の作り置き", "အပိုင်းခွဲထည့်ထားသော ကြက်သားနှင့် ဟင်းသီးဟင်းရွက် အကြိုပြင်အစာ"), t("The finished meal prep is divided into clean freezer trays after it has cooled.", "冷ましてから、完成した作り置きを清潔な冷凍トレーに小分けします。", "အေးသွားပြီးနောက် ပြီးစီးသောအစာကို သန့်ရှင်းသော ရေခဲသေတ္တာခွဲထည့်ပုံးများတွင် အပိုင်းခွဲထည့်ပါ။")),
      photo("assets/recipes/nako-chicken-apple-vegetable-meal-prep-ingredients.jpg", t("Apple, carrot, cabbage, and shimeji ingredients", "りんご、にんじん、キャベツ、しめじの材料", "ပန်းသီး၊ မုန်လာဥနီ၊ ဂေါ်ဖီထုပ်နှင့် ရှိမေဂျီမှို ပါဝင်ပစ္စည်းများ"), t("Prepare the apple, carrot, cabbage, and optional approved store-bought shimeji before chopping.", "りんご、にんじん、キャベツ、使用する場合は許可済みの市販しめじを刻む前に準備します。", "ပန်းသီး၊ မုန်လာဥနီ၊ ဂေါ်ဖီထုပ်နှင့် ခွင့်ပြုထားသော ဆိုင်မှဝယ်သည့် ရှိမေဂျီမှိုကို လှီးမတိုင်မီ ပြင်ဆင်ပါ။")),
      photo("assets/recipes/nako-chicken-apple-vegetable-meal-prep-chopped.jpg", t("Finely chopped meal-prep ingredients", "細かく刻んだ作り置きの材料", "သေးသေးလေး လှီးထားသော အကြိုပြင်အစာ ပါဝင်ပစ္စည်းများ"), t("Keep every piece small and even for the final soft mixture.", "仕上がりがやわらかく均一になるよう、すべて小さく刻みます。", "နောက်ဆုံးအစာပျော့ပျော့ညီညီ ဖြစ်စေရန် အားလုံးကို သေးသေးလေး ညီညီလှီးပါ။")),
      photo("assets/recipes/nako-chicken-apple-vegetable-meal-prep-simmering.jpg", t("Plain chicken and vegetables simmering", "鶏肉と野菜を味付けなしで煮ているところ", "အရသာမထည့်ဘဲ ကြက်သားနှင့် ဟင်းသီးဟင်းရွက်များကို တည်နေစဉ်"), t("Simmer the cooked chicken and chopped ingredients in plain water until soft.", "加熱した鶏肉と刻んだ材料を水だけで柔らかくなるまで煮ます。", "ကျက်ပြီးသားကြက်သားနှင့် လှီးထားသော ပါဝင်ပစ္စည်းများကို ရေသန့်ဖြင့် နူးသည်အထိ တည်ပါ။"))
    ]),
  recipe("nako-chicken-sweet-potato-daikon-vegetable-meal-prep",
    t("Nako's Chicken, Sweet Potato & Daikon Meal Prep", "ナコの鶏肉・さつまいも・大根の作り置き", "Nako အတွက် ကြက်သား၊ ကန်စွန်းဥနှင့် မုန်လာဥဖြူ အကြိုပြင်အစာ"),
    [
      [t("Plain minced chicken", "味付けなしの鶏ひき肉", "အရသာမထည့်ထားသော ကြက်သားစဉ်းကော"), t("Not specified", "未指定", "မသတ်မှတ်ထား"), "chicken-minced"],
      [t("Japanese sweet potato", "日本のさつまいも", "ဂျပန်ကန်စွန်းဥ"), t("Not specified", "未指定", "မသတ်မှတ်ထား"), "sweet-potato"],
      [t("Daikon radish", "大根", "မုန်လာဥဖြူ"), t("Not specified", "未指定", "မသတ်မှတ်ထား"), "daikon-radish"],
      [t("Tomato", "トマト", "ခရမ်းချဉ်သီး"), t("Not specified", "未指定", "မသတ်မှတ်ထား"), "tomato"],
      [t("Napa cabbage", "白菜", "မုန်ညင်းဖြူ"), t("Not specified", "未指定", "မသတ်မှတ်ထား"), "napa-cabbage"],
      [t("Water", "水", "ရေ"), t("Not specified", "未指定", "မသတ်မှတ်ထား"), "water"]
    ],
    [
      t("Wash the vegetables and peel the sweet potato and daikon.", "野菜を洗い、さつまいもと大根の皮をむきます。", "ဟင်းသီးဟင်းရွက်များကို ဆေးပြီး ကန်စွန်းဥနှင့် မုန်လာဥဖြူကို အခွံခွာပါ။"),
      t("Chop the sweet potato, daikon, tomato, and napa cabbage into small, even pieces.", "さつまいも、大根、トマト、白菜を小さく均一に刻みます。", "ကန်စွန်းဥ၊ မုန်လာဥဖြူ၊ ခရမ်းချဉ်သီးနှင့် မုန်ညင်းဖြူကို သေးသေးလေး ညီညီလှီးပါ။"),
      t("Cook the minced chicken completely in plain water.", "鶏ひき肉を水だけで完全に火が通るまで加熱します。", "ကြက်သားစဉ်းကောကို ရေသန့်ဖြင့် လုံးဝကျက်အောင် ချက်ပါ။"),
      t("Add the chopped vegetables and simmer until everything is soft.", "刻んだ野菜を加え、すべて柔らかくなるまで煮ます。", "လှီးထားသော ဟင်းသီးဟင်းရွက်များကို ထည့်ပြီး အားလုံးနူးသည်အထိ တည်ပါ။"),
      t("Cool completely and divide into clean freezer trays.", "完全に冷ましてから、清潔な冷凍トレーに小分けします。", "လုံးဝအေးသွားအောင်ထားပြီး သန့်ရှင်းသော ရေခဲသေတ္တာခွဲထည့်ပုံးများတွင် အပိုင်းခွဲထည့်ပါ။"),
      t("Serve only the instructed amount with Nako's usual food.", "ナコの普段のフードに、指示された量だけ混ぜて与えます。", "Nako ၏ ပုံမှန်အစာနှင့် ညွှန်ကြားထားသော ပမာဏကိုသာ ရောကျွေးပါ။")
    ],
    t("Use no seasoning, sauce, oil, salt, onion, garlic, bones, or tomato stems and leaves. The photos do not show ingredient amounts, so follow Nako's existing portion instructions.", "調味料、ソース、油、塩、玉ねぎ、にんにく、骨、トマトのへたや葉は使いません。写真には材料の分量が写っていないため、ナコの既存の分量指示に従ってください。", "ဟင်းခတ်မှုန့်၊ ဆော့စ်၊ ဆီ၊ ဆား၊ ကြက်သွန်နီ၊ ကြက်သွန်ဖြူ၊ အရိုး သို့မဟုတ် ခရမ်းချဉ်သီးအညှာနှင့် အရွက်များကို မသုံးပါနှင့်။ ဓာတ်ပုံများတွင် ပါဝင်ပစ္စည်းပမာဏ မပါသဖြင့် Nako အတွက် ရှိပြီးသား ပမာဏညွှန်ကြားချက်ကို လိုက်နာပါ။"),
    [
      photo("assets/recipes/nako-chicken-sweet-potato-daikon-meal-prep-portions.jpg",
        t("Portioned chicken, sweet potato, daikon, tomato, and napa cabbage meal prep", "鶏肉、さつまいも、大根、トマト、白菜の作り置きを小分けしたもの", "ကြက်သား၊ ကန်စွန်းဥ၊ မုန်လာဥဖြူ၊ ခရမ်းချဉ်သီးနှင့် မုန်ညင်းဖြူ အကြိုပြင်အစာကို အပိုင်းခွဲထားပုံ"),
        t("The finished meal prep is cooling in clean storage containers.", "完成した作り置きを清潔な保存容器に入れて冷ましています。", "ပြီးစီးသော အကြိုပြင်အစာကို သန့်ရှင်းသော သိမ်းဆည်းပုံးများတွင် အေးအောင်ထားပါ။")),
      photo("assets/recipes/nako-chicken-sweet-potato-daikon-meal-prep-preparation.jpg",
        t("Chopped vegetables and plain chicken mixture simmering", "刻んだ野菜と味付けなしの鶏肉を煮ているところ", "လှီးထားသော ဟင်းသီးဟင်းရွက်များနှင့် အရသာမထည့်ထားသော ကြက်သားကို တည်နေပုံ"),
        t("Chop every ingredient small, then simmer the plain mixture until fully cooked and soft.", "すべての材料を小さく刻み、味付けせずに完全に火が通って柔らかくなるまで煮ます。", "ပါဝင်ပစ္စည်းအားလုံးကို သေးသေးလေးလှီးပြီး အရသာမထည့်ဘဲ လုံးဝကျက်ကာ နူးသည်အထိ တည်ပါ။"))
    ]),


  recipe("pork-shogayaki-no-onion",
    t("Pork Shogayaki (No Onion)", "豚の生姜焼き（玉ねぎなし）", "ဝက်သား ချင်းကြော် (ကြက်သွန်မပါ)"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "170g", "rice", { calories: 221, protein: 4.0, carbs: 48.8, fat: 0.3 }],
      [t("Lean pork slices", "豚薄切り肉（脂身の少ないもの）", "အဆီနည်းသော ဝက်သားပါးပါးလှီး"), "220g", "pork", { calories: 240, protein: 46.1, carbs: 0.0, fat: 4.8 }],
      [t("Cabbage", "キャベツ", "ဂေါ်ဖီထုပ်"), "120g", "cabbage", { calories: 30, protein: 1.5, carbs: 7.0, fat: 0.1 }],
      [t("Grated ginger", "おろし生姜", "ချင်းခြစ်"), "10g", "ginger", { calories: 8, protein: 0.2, carbs: 1.8, fat: 0.1 }],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "20g", "soy-sauce", { calories: 11, protein: 1.6, carbs: 1.0, fat: 0.1 }],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "18g", "mirin", { calories: 43, protein: 0.1, carbs: 7.8, fat: 0.0 }],
      ingredient(
        t("Cooking sake or water", "料理酒または水", "ဟင်းချက်ဆာကေး သို့မဟုတ် ရေ"),
        "18g",
        "cooking-sake",
        [
          ingredientOption("cooking-sake", t("Cooking sake", "料理酒", "ဟင်းချက်ဆာကေး")),
          ingredientOption("water", t("Water", "水", "ရေ"))
        ],
        { calories: 0, protein: 0.0, carbs: 0.0, fat: 0.0 }
      ),
      [t("Sugar", "砂糖", "သကြား"), "3g", "sugar", { calories: 12, protein: 0.0, carbs: 3.0, fat: 0.0 }],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "5g", "oil", { calories: 44, protein: 0.0, carbs: 0.0, fat: 5.0 }]
    ],
    [
      t("Slice 120g cabbage thinly and place it on the serving plate.", "120gのキャベツを千切りにし、盛り付け用の皿に盛ります。", "ဂေါ်ဖီထုပ် ၁၂၀ ဂရမ်ကို ပါးပါးလှီးပြီး ပန်းကန်ပြားပေါ်တွင် ခင်းပါ။"),
      t("Mix 10g grated ginger, 20g soy sauce, 18g mirin, 18g sake or water, and 3g sugar in a bowl.", "ボウルにおろし生姜10g、醤油20g、みりん18g、酒または水18g、砂糖3gを混ぜ合わせます。", "ဇလုံထဲတွင် ချင်းခြစ် ၁၀ ဂရမ်၊ ပဲငံပြာရည် ၂၀ ဂရမ်၊ မီရင် ၁၈ ဂရမ်၊ ဆာကေး သို့မဟုတ် ရေ ၁၈ ဂရမ်နှင့် သကြား ၃ ဂရမ်တို့ကို ရောမွှေပါ။"),
      t("Heat 5g cooking oil in a pan on medium heat.", "フライパンに5gのサラダ油を入れて中火で熱します。", "ဒယ်အိုးထဲတွင် ဟင်းချက်ဆီ ၅ ဂရမ်ကို အလယ်အလတ်မီးဖြင့် ပူအောင်တည်ပါ။"),
      t("Add 220g lean pork slices and cook for 3 to 4 minutes.", "220gの豚薄切り肉を加えて3〜4分間焼きます。", "ဝက်သားပါးပါးလှီး ၂၂၀ ဂရမ်ကို ထည့်ပြီး ၃ မှ ၄ မိနစ်ခန့် ကင်ပါ။"),
      t("When the pork is no longer pink, add the sauce.", "豚肉にピンク色がなくなったらタレを加えます。", "ဝက်သားတွင် ပန်းရောင်မကျန်တော့သောအခါ အချိုရည်ကို ထည့်ပါ။"),
      t("Stir-fry for another 2 to 3 minutes until the pork is coated and fully cooked.", "さらに2〜3分炒め、豚肉にタレが絡み完全に火が通るまで調理します。", "ဝက်သားပေါ်တွင် အချိုရည်ကျီးကပ်ပြီး ကျက်သည်အထိ နောက်ထပ် ၂ မှ ၃ မိနစ်ခန့် ဆီသတ်ကြော်ပါ။"),
      t("Serve the pork beside the cabbage.", "豚肉をキャベツの横に盛り付けます。", "ဝက်သားကို ဂေါ်ဖီထုပ်ဘေးတွင် ခင်းပါ။"),
      t("Serve with 170g cooked rice.", "170gのご飯と一緒に提供します。", "ချက်ပြီးသားထမင်း ၁၇၀ ဂရမ်နှင့်အတူ ပြင်ဆင်ပါ။")
    ],
    t("No onion version of Japanese ginger pork. Use lean pork slices and do not add onion.", "玉ねぎなしの生姜焼きです。脂身の少ない豚肉を使い、玉ねぎは入れないでください。", "ကြက်သွန်မပါသော ဂျပန်ဝက်သားချင်းကြော်ဖြစ်သည်။ အဆီနည်းသော ဝက်သားကို သုံးပြီး ကြက်သွန်နီ လုံးဝမထည့်ပါနှင့်။"),
    [
      photo("assets/recipes/human-food/pork-shogayaki-no-onion-main.jpg",
        t("Pork shogayaki ginger pork", "豚の生姜焼き", "ဝက်သား ချင်းကြော်"),
        t("Ginger pork with shredded cabbage and rice", "千切りキャベツとご飯を添えた豚の生姜焼き", "ဂေါ်ဖီထုပ်လှီးနှင့် ထမင်းပါသော ဝက်သားချင်းကြော်"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食/夕食", "နေ့လယ်စာ/ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("15 mins", "15分", "၁၅ မိနစ်"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်"),
      nutrition: {
        calories: 609,
        protein: 53.5,
        carbs: 69.3,
        fat: 10.4,
        basis: t(
          "Calculated using raw lean pork tenderloin and water for the sake-or-water option.",
          "脂身の少ない生の豚ヒレ肉を使用し、酒または水の選択肢は水で計算しています。",
          "အဆီနည်းသော ဝက်သား tenderloin အစိမ်းနှင့် ဆာကေး သို့မဟုတ် ရေ ရွေးချယ်မှုတွင် ရေကို အသုံးပြု၍ တွက်ချက်ထားသည်။"
        )
      }
    }
  ),
  recipe("chicken-oyakodon-no-onion",
    t("Oyakodon (Chicken & Egg Rice Bowl)", "親子丼", "အိုယာကိုဒုံ (ကြက်သားနှင့် ကြက်ဥ ထမင်းပေါ်ဟင်း)"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), t("1 bowl", "1杯", "၁ ပန်းကန်"), "rice"],
      ingredient(
        t("Skinless chicken thigh or breast", "鶏もも肉または鶏むね肉（皮なし）", "ကြက်ပေါင်သား သို့မဟုတ် ကြက်ရင်ပုံသား (အရေပြားမပါ)"),
        t("as needed", "必要量", "လိုအပ်သလို"),
        "chicken-thigh",
        [
          ingredientOption("chicken-thigh", t("Skinless chicken thigh", "皮なし鶏もも肉", "အရေပြားမပါသော ကြက်ပေါင်သား")),
          ingredientOption("chicken-breast", t("Skinless chicken breast", "皮なし鶏むね肉", "အရေပြားမပါသော ကြက်ရင်ပုံသား"))
        ]
      ),
      [t("Egg", "卵", "ကြက်ဥ"), t("as needed", "必要量", "လိုအပ်သလို"), "eggs"],
      ingredient(
        t("Shimeji or button mushroom", "しめじまたはマッシュルーム", "ရှီမဲဂျီ သို့မဟုတ် မှို"),
        t("as needed", "必要量", "လိုအပ်သလို"),
        "shimeji-mushroom",
        [
          ingredientOption("shimeji-mushroom", t("Shimeji mushroom", "しめじ", "ရှီမဲဂျီမှို")),
          ingredientOption("button-mushroom", t("Button mushroom", "マッシュルーム", "ဘတန်မှို"))
        ]
      ),
      [t("Hot water", "お湯", "ရေနွေး"), t("1 rice-bowlful", "お茶碗1杯", "ထမင်းပန်းကန် ၁ လုံးစာ"), "water"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), t("1 spoonful", "スプーン1杯", "ဇွန်း ၁ ဇွန်း"), "soy-sauce"],
      [t("Mirin", "みりん", "mirin"), t("1 spoonful", "スプーン1杯", "ဇွန်း ၁ ဇွန်း"), "mirin"],
      [t("Honey", "はちみつ", "ပျားရည်"), t("a little", "少量", "အနည်းငယ်"), "honey"]
    ],
    [
      t("Cut the chicken into pieces about 2 cm wide.", "チキンを約2cm角に切ります。", "ကြက်သားကို ၂ စင်တီမီတာခန့် အတုံးများ လှီးပါ။"),
      t("Add 1 rice-bowlful of hot water to a frying pan.", "フライパンにお湯をお茶碗1杯入れます。", "ဒယ်အိုးထဲသို့ ရေနွေး ထမင်းပန်းကန် ၁ လုံးစာ ထည့်ပါ။"),
      t("Add 1 spoonful of soy sauce, 1 spoonful of mirin, and a little honey.", "醤油をスプーン1杯、みりんをスプーン1杯、はちみつを少し入れます。", "ပဲငံပြာရည် ဇွန်း ၁ ဇွန်း၊ mirin ဇွန်း ၁ ဇွန်းနှင့် ပျားရည် အနည်းငယ် ထည့်ပါ။"),
      t("Add the chicken and simmer for 5 minutes.", "チキンを入れて5分煮ます。", "ကြက်သားထည့်ပြီး ၅ မိနစ် တည်ပါ။"),
      t("Add the mushrooms and simmer for 3 minutes.", "きのこを入れて3分煮ます。", "မှိုထည့်ပြီး ၃ မိနစ် တည်ပါ။"),
      t("Add the egg.", "卵を入れます。", "ကြက်ဥထည့်ပါ။"),
      t("Check that the egg and chicken are fully cooked.", "卵とチキンの中まで火が通っていることを確認します。", "ကြက်ဥနှင့် ကြက်သား လုံးဝကျက်ကြောင်း စစ်ပါ။"),
      t("Serve the chicken and egg mixture over the cooked rice.", "チキンと卵をご飯の上にかけます。", "ကြက်သားနှင့် ကြက်ဥအရောကို ထမင်းပေါ်တင်ပါ။")
    ],
    t("Keep the chicken pieces around 2 cm and use only a little honey. Make sure the chicken is fully cooked before serving.", "チキンは約2cmにそろえ、はちみつは少量だけ使います。食べる前にチキンの中まで火が通っていることを確認してください。", "ကြက်သားတုံးများကို ၂ စင်တီမီတာခန့်ထားပြီး ပျားရည် အနည်းငယ်သာ သုံးပါ။ မစားမီ ကြက်သားလုံးဝကျက်ကြောင်း စစ်ပါ။"),
    [
      photo("assets/recipes/human-food/chicken-oyakodon-no-onion-main.jpg",
        t("Oyakodon with chicken, egg, and mushrooms", "チキン、卵、きのこの親子丼", "ကြက်သား၊ ကြက်ဥနှင့် မှိုပါသော အိုယာကိုဒုံ"),
        t("Serve the cooked chicken, egg, and mushroom mixture over rice.", "火を通したチキン、卵、きのこをご飯の上にかけます。", "ချက်ထားသော ကြက်သား၊ ကြက်ဥနှင့် မှိုအရောကို ထမင်းပေါ်တင်ပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食/夕食", "နေ့လယ်စာ/ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("20 mins", "20分", "၂၀ မိနစ်"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),


  recipe("chicken-miso-nabe",
    t("Chicken Miso Nabe", "鶏肉の味噌鍋", "ကြက်သား မစ်ဆိုဟော့ပေါ့"),
    [
      ingredient(
        t("Skinless chicken thigh or breast", "鶏もも肉またはむね肉（皮なし）", "ကြက်ပေါင်သား သို့မဟုတ် ကြက်ရင်ပုံသား (အရေပြားမပါ)"),
        "220g",
        "chicken-thigh",
        [
          ingredientOption("chicken-thigh", t("Skinless chicken thigh", "皮なし鶏もも肉", "အရေပြားမပါသော ကြက်ပေါင်သား")),
          ingredientOption("chicken-breast", t("Skinless chicken breast", "皮なし鶏むね肉", "အရေပြားမပါသော ကြက်ရင်ပုံသား"))
        ],
        { calories: 247, protein: 49.6, carbs: 0.0, fat: 4.3 }
      ),
      [t("Firm tofu", "木綿豆腐", "တိုဖူးမာ"), "150g", "tofu", { calories: 110, protein: 10.5, carbs: 2.2, fat: 7.3 }],
      [t("Napa cabbage", "白菜", "မုန်ညင်းဖြူ"), "150g", "napa-cabbage", { calories: 24, protein: 1.8, carbs: 4.8, fat: 0.3 }],
      ingredient(
        t("Shimeji or button mushroom", "しめじまたはマッシュルーム", "ရှီမဲဂျီ သို့မဟုတ် မှို"),
        "80g",
        "shimeji-mushroom",
        [
          ingredientOption("shimeji-mushroom", t("Shimeji mushroom", "しめじ", "ရှီမဲဂျီမှို")),
          ingredientOption("button-mushroom", t("Button mushroom", "マッシュルーム", "ဘတန်မှို"))
        ],
        { calories: 18, protein: 2.5, carbs: 2.6, fat: 0.3 }
      ),
      [t("Carrot", "にんじん", "မုန်လာဥနီ"), "50g", "carrot", { calories: 20, protein: 0.5, carbs: 4.8, fat: 0.1 }],
      [t("Water", "水", "ရေ"), "450g", "water", { calories: 0, protein: 0.0, carbs: 0.0, fat: 0.0 }],
      [t("Miso paste", "味噌", "မစ်ဆိုအနှစ်"), "35g", "miso", { calories: 64, protein: 4.4, carbs: 7.7, fat: 2.1 }],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "10g", "soy-sauce", { calories: 5, protein: 0.8, carbs: 0.5, fat: 0.1 }],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "12g", "mirin", { calories: 29, protein: 0.0, carbs: 5.2, fat: 0.0 }],
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "150g", "rice", { calories: 195, protein: 3.5, carbs: 43.1, fat: 0.3 }]
    ],
    [
      t("Cut 220g chicken into bite-sized pieces, about 2cm each.", "220gの鶏肉を約2cmの一口大に切ります。", "ကြက်သား ၂၂၀ ဂရမ်ကို ၂ စင်တီမီတာခန့် အတုံးလေးများ တုံးပါ။"),
      t("Cut 150g tofu into cubes.", "150gの豆腐を角切りにします。", "တိုဖူး ၁၅၀ ဂရမ်ကို အတုံးများ တုံးပါ။"),
      t("Cut 150g napa cabbage, 80g mushroom, and 50g carrot into small pieces.", "150gの白菜、80gのきのこ、50gのにんじんを小さく切ります。", "မုန်ညင်းဖြူ ၁၅၀ ဂရမ်၊ မှို ၈၀ ဂရမ်နှင့် မုန်လာဥနီ ၅၀ ဂရမ်တို့ကို အတုံးသေးသေး တုံးပါ။"),
      t("Add 450g water, 10g soy sauce, and 12g mirin into a pot.", "鍋に水450g、醤油10g、みりん12gを入れます。", "အိုးထဲသို့ ရေ ၄၅၀ ဂရမ်၊ ပဲငံပြာရည် ၁၀ ဂရမ်နှင့် မီရင် ၁၂ ဂရမ်တို့ကို ထည့်ပါ။"),
      t("Bring to a gentle boil over medium heat.", "中火で軽く沸騰させます。", "အလယ်အလတ်မီးဖြင့် ညင်သာစွာ ဆူပွက်အောင် တည်ပါ။"),
      t("Add chicken and carrot. Cook for 6 minutes.", "鶏肉とにんじんを加えます。6分間煮ます。", "ကြက်သားနှင့် မုန်လာဥနီကို ထည့်ပါ။ ၆ မိနစ်ခန့် ချက်ပါ။"),
      t("Add napa cabbage, mushroom, and tofu. Cook for another 5 minutes.", "白菜、きのこ、豆腐を加えます。さらに5分間煮ます。", "မုန်ညင်းဖြူ၊ မှိုနှင့် တိုဖူးတို့ကို ထည့်ပါ။ နောက်ထပ် ၅ မိနစ်ခန့် ချက်ပါ။"),
      t("Turn heat to low.", "弱火にします。", "မီးအေးအေး လျှော့ပါ။"),
      t("Add 35g miso paste and stir until dissolved. Do not boil strongly after adding miso.", "味噌35gを加え、溶けるまで混ぜます。味噌を加えた後は強く沸騰させないでください。", "မစ်ဆိုအနှစ် ၃၅ ဂရမ်ကို ထည့်ပြီး ပျော်ဝင်သည်အထိ မွှေပါ။ မစ်ဆိုထည့်ပြီးနောက် ပြင်းထန်စွာ ဆူပွက်အောင် မလုပ်ပါနှင့်။"),
      t("Check that the chicken is fully cooked.", "鶏肉に完全に火が通っているか確認します。", "ကြက်သားကျက်ကြောင်း သေချာစစ်ပါ။"),
      t("Serve with 150g cooked rice.", "150gのご飯と一緒に提供します。", "ချက်ပြီးသားထမင်း ၁၅၀ ဂရမ်နှင့်အတူ ပြင်ဆင်ပါ။")
    ],
    t("Warm high-protein dinner. Good when you want something lighter than a fried dish.", "温かい高タンパクな夕食です。揚げ物や炒め物よりも軽いものが食べたいときに最適です。", "နွေးထွေးသော ပရိုတင်းဓာတ်မြင့် ညစာဖြစ်သည်။ ကြော်လှော်ထားသော အစားအစာထက် ပေါ့ပေါ့ပါးပါး စားလိုသောအခါ ကောင်းသည်။"),
    [
      photo("assets/recipes/human-food/chicken-miso-nabe-main.jpg",
        t("Chicken miso nabe", "鶏肉の味噌鍋", "ကြက်သား မစ်ဆိုဟော့ပေါ့"),
        t("Warm chicken and vegetable hot pot in miso soup", "温かい鶏肉と野菜の味噌鍋", "မစ်ဆိုစွပ်ပြုတ်ဖြင့် နွေးထွေးသော ကြက်သားနှင့် ဟင်းသီးဟင်းရွက် ဟော့ပေါ့"))
    ],
    "human",
    {
      mealType: t("Dinner", "夕食", "ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("20 mins", "20分", "၂၀ မိနစ်"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်"),
      nutrition: {
        calories: 711,
        protein: 73.6,
        carbs: 70.9,
        fat: 14.7,
        basis: t(
          "Calculated using skinless chicken breast, Japanese firm momen tofu, button mushrooms and light-coloured rice miso.",
          "皮なし鶏むね肉、日本の木綿豆腐、マッシュルーム、淡色米みそを使用して計算しています。",
          "အရေပြားမပါသော ကြက်ရင်ပုံသား၊ ဂျပန် momen tofu၊ button mushroom နှင့် အရောင်ဖျော့သော ဆန်မစ်ဆိုကို အသုံးပြု၍ တွက်ချက်ထားသည်။"
        )
      }
    }
  ),
  recipe("banana-toast",
    t("Banana Toast", "バナナトースト", "ငှက်ပျောသီးပေါင်မုန့်ကင်"),
    [
      [t("Bread", "パン", "ပေါင်မုန့်"), t("1 slice", "1枚", "၁ ချပ်"), "bread"],
      [t("Peanut butter", "ピーナッツバター", "မြေပဲထောပတ်"), t("as needed", "必要に応じて", "လိုအပ်သလို"), "peanut-butter"],
      [t("Strawberry jam", "いちごジャム", "စတော်ဘယ်ရီယို"), t("as needed", "必要に応じて", "လိုအပ်သလို"), "strawberry-jam"],
      [t("Banana", "バナナ", "ငှက်ပျောသီး"), t("1 banana", "バナナ1本", "ငှက်ပျောသီး ၁ လုံး"), "banana"]
    ],
    [
      t("Spread peanut butter and strawberry jam on the bread.", "パンにピーナッツバターといちごジャムを塗る。", "ပေါင်မုန့်ပေါ်တွင် မြေပဲထောပတ်နှင့် စတော်ဘယ်ရီယိုကို လိမ်းပါ။"),
      t("Place sliced banana on top.", "スライスしたバナナを上にのせる。", "လှီးထားသော ငှက်ပျောသီးကို အပေါ်တွင် တင်ပါ။"),
      t("Put it in the air fryer and cook at 190°C for 4 minutes.", "エアフライヤーに入れ、190℃で4分加熱する。", "air fryer ထဲထည့်ပြီး 190°C ဖြင့် 4 မိနစ် အပူပေးပါ။")
    ],
    t("Air-fry at 190°C for 4 minutes. The toast and air-fryer basket will be hot when finished.", "エアフライヤーは190℃・4分。終了後はトーストとバスケットが熱いので注意する。", "air fryer ကို 190°C ဖြင့် 4 မိနစ်ထားပါ။ ပြီးသွားပါက toast နှင့် air-fryer basket ပူနေမည်ဖြစ်သောကြောင့် သတိထားပါ။"),
    [
      photo("assets/recipes/human-food/banana-toast.jpg",
        t("Banana toast", "バナナトースト", "ငှက်ပျောသီးပေါင်မုန့်ကင်"),
        t("A slice of air-fried toast spread with peanut butter and strawberry jam, covered with overlapping slices of banana.", "ピーナッツバターといちごジャムを塗り、スライスしたバナナをきれいに並べて焼いたトースト。", "မြေပဲထောပတ်နှင့် စတော်ဘယ်ရီယိုများ လိမ်းကျံထားပြီး အပေါ်မှ ငှက်ပျောသီးလွှာများ စီထပ်တင်ကာ air fryer ဖြင့် ကင်ထားသော ပေါင်မုန့်ကင်တစ်ချပ်။"))
    ],
    "human",
    {
      mealType: t("Breakfast/Snack", "朝食／軽食", "မနက်စာ / snack"),
      style: t("Quick", "簡単", "လွယ်ကူသော"),
      timeEstimate: t("4 mins", "4分", "၄ မိနစ်"),
      highProtein: false
    }
  ),
  recipe("edwin-childhood-bee-hoon-breakfast",
    t("Edwin's Childhood Bee Hoon Breakfast", "エドウィンの思い出の朝食ビーフン", "Edwin ရဲ့ ကလေးဘဝအမှတ်တရ မနက်စာ Bee Hoon"),
    [
      [t("Plain bee hoon with vegetables", "野菜入りのプレーンビーフン", "ဟင်းသီးဟင်းရွက်ပါသော Bee Hoon အဖြူ"), t("1 packet or enough for the meal", "1包または食べる分", "၁ ထုပ် သို့မဟုတ် စားရန်လောက်"), "plain-bee-hoon"],
      [t("Eggs", "卵", "ကြက်ဥ"), t("2", "2個", "၂ လုံး"), "eggs"],
      [t("Lean sliced pork", "脂身の少ない薄切り豚肉", "အဆီနည်း ဝက်သားလွှာ"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "pork"],
      [t("Cooking oil", "調理油", "ဟင်းချက်ဆီ"), t("as needed", "適量", "လိုအပ်သလို"), "oil"]
    ],
    [
      t("Buy plain bee hoon with vegetables from downstairs. Check that it has no onion, coriander, parsley, or bean sprouts.", "階下で野菜入りのプレーンビーフンを買います。玉ねぎ、パクチー、パセリ、もやしが入っていないことを確認します。", "အောက်ထပ်မှ ဟင်းသီးဟင်းရွက်ပါသော Bee Hoon အဖြူကို ဝယ်ပါ။ ကြက်သွန်နီ၊ နံနံပင်၊ parsley နှင့် ပဲပင်ပေါက် မပါကြောင်း စစ်ပါ။"),
      t("Cut the lean pork into bite-sized pieces.", "脂身の少ない豚肉を食べやすい大きさに切ります。", "အဆီနည်းဝက်သားကို စားရလွယ်သော အတုံးလေးများ လှီးပါ။"),
      t("Crack 2 eggs into a bowl and beat them.", "卵2個をボウルに割り入れて溶きます。", "ကြက်ဥ ၂ လုံးကို ဇလုံထဲ ဖောက်ထည့်ပြီး ခလောက်ပါ။"),
      t("Heat a small amount of oil in a frying pan over medium heat.", "フライパンに少量の油を入れ、中火で熱します。", "ဒယ်အိုးထဲ ဆီအနည်းငယ်ထည့်ပြီး မီးအလယ်အလတ်ဖြင့် ပူအောင်လုပ်ပါ။"),
      t("Add the pork and stir-fry until fully cooked with no pink inside.", "豚肉を入れ、中にピンク色が残らず完全に火が通るまで炒めます。", "ဝက်သားကို ထည့်ပြီး အတွင်းသားပန်းရောင်မကျန်ဘဲ လုံးဝကျက်သည်အထိ ကြော်ပါ။"),
      t("Add the beaten eggs and scramble them into small pieces.", "溶き卵を加え、小さくほぐしながら炒めます。", "ခလောက်ထားသော ကြက်ဥကို ထည့်ပြီး သေးသေးလေးဖြစ်အောင် မွှေကြော်ပါ။"),
      t("Add the bee hoon and vegetables.", "ビーフンと野菜を加えます。", "Bee Hoon နှင့် ဟင်းသီးဟင်းရွက်များကို ထည့်ပါ။"),
      t("Stir-fry until everything is hot and evenly mixed.", "全体が熱くなり、均一に混ざるまで炒めます。", "အားလုံးပူပြီး သမသွားသည်အထိ မွှေကြော်ပါ။"),
      t("Serve the breakfast immediately.", "朝食としてすぐに出します。", "မနက်စာအဖြစ် ချက်ချင်းတည်ခင်းပါ။")
    ],
    t("When Edwin was a child, his mother liked to buy plain bee hoon downstairs and fry eggs with it. This one-off breakfast is an upgraded version: buy plain bee hoon with vegetables, always add 2 eggs, and add a protein. For this version, use lean pork. This is human food; do not give it to Nako. Cook the pork to at least 71°C.", "エドウィンが子どもの頃、母は階下でプレーンビーフンを買い、卵を焼いて添えるのが好きでした。この一度きりの朝食は、その思い出を少し豪華にしたものです。野菜入りのプレーンビーフンを買い、卵2個は必ず入れ、さらにたんぱく質を加えます。今回は脂身の少ない豚肉を使います。人用の料理なので、ナコには与えません。豚肉は中心温度71℃以上まで加熱します。", "Edwin ငယ်ငယ်တုန်းက သူ့အမေက အောက်ထပ်မှ Bee Hoon အဖြူဝယ်ပြီး ကြက်ဥကြော်နဲ့ တွဲကျွေးလေ့ရှိတယ်။ ဒီတစ်ကြိမ်သာလုပ်မယ့် မနက်စာက အဲဒီအမှတ်တရကို ပိုကောင်းအောင်လုပ်ထားတာပါ။ ဟင်းသီးဟင်းရွက်ပါ Bee Hoon အဖြူကို ဝယ်ပြီး ကြက်ဥ ၂ လုံး မဖြစ်မနေထည့်ကာ ပရိုတင်းတစ်မျိုး ထပ်ထည့်ပါ။ ဒီတစ်ခါ အဆီနည်းဝက်သားကို သုံးပါ။ ဒါက လူစားဖို့ဖြစ်လို့ Nako ကို မကျွေးပါနှင့်။ ဝက်သားအတွင်းအပူချိန် 71°C အနည်းဆုံး ရောက်အောင် ချက်ပါ။"),
    [
      photo("assets/recipes/human-food/edwin-childhood-bee-hoon-breakfast.jpg",
        t("Finished bee hoon with eggs, vegetables, and lean pork", "卵、野菜、脂身の少ない豚肉入りの完成したビーフン", "ကြက်ဥ၊ ဟင်းသီးဟင်းရွက်နှင့် အဆီနည်းဝက်သားပါသော Bee Hoon အချောပန်းကန်"),
        t("The finished breakfast mixes plain bee hoon and vegetables with 2 eggs and lean pork.", "野菜入りのプレーンビーフンに、卵2個と脂身の少ない豚肉を混ぜた朝食です。", "ဟင်းသီးဟင်းရွက်ပါ Bee Hoon အဖြူကို ကြက်ဥ ၂ လုံးနှင့် အဆီနည်းဝက်သားတို့ဖြင့် ရောထားသော မနက်စာအချောပန်းကန်ပါ။")),
      photo("assets/recipes/human-food/edwin-childhood-bee-hoon-breakfast-ingredients.jpg",
        t("Plain bee hoon parcels, 2 eggs, and lean pork", "包んだプレーンビーフン、卵2個、脂身の少ない豚肉", "Bee Hoon အဖြူထုပ်များ၊ ကြက်ဥ ၂ လုံးနှင့် အဆီနည်းဝက်သား"),
        t("The bought bee hoon is wrapped in brown paper; add 2 eggs and lean pork at home.", "購入したビーフンは茶色い紙に包まれています。家で卵2個と脂身の少ない豚肉を加えます。", "ဝယ်လာသော Bee Hoon ကို အညိုရောင်စက္ကူဖြင့် ထုပ်ထားသည်။ အိမ်တွင် ကြက်ဥ ၂ လုံးနှင့် အဆီနည်းဝက်သားကို ထည့်ပါ။"))
    ],
    "human",
    {
      mealType: t("Breakfast", "朝食", "မနက်စာ"),
      style: t("Singapore", "シンガポール", "စင်ကာပူစတိုင်"),
      timeEstimate: t("15 mins after buying the bee hoon", "ビーフン購入後15分", "Bee Hoon ဝယ်ပြီးနောက် ၁၅ မိနစ်"),
      highProtein: true
    }
  ),
  recipe("three-ingredient-pancakes-honey-jam",
    t("Three-Ingredient Pancakes with Honey & Jam", "材料3つのパンケーキ（はちみつ・ジャム添え）", "ပါဝင်ပစ္စည်း ၃ မျိုး ပန်ကိတ်၊ ပျားရည်နှင့် သစ်သီးယို"),
    [
      [t("Plain flour", "小麦粉", "ဂျုံမှုန့်"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "flour"],
      [t("Eggs", "卵", "ကြက်ဥ"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "eggs"],
      [t("Milk", "牛乳", "နွားနို့"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "milk"],
      [t("Honey, for serving", "はちみつ（仕上げ用）", "တည်ခင်းရန် ပျားရည်"), t("as needed", "必要に応じて", "လိုအပ်သလို"), "honey"],
      [t("Jam, for serving", "ジャム（仕上げ用）", "တည်ခင်းရန် သစ်သီးယို"), t("as needed", "必要に応じて", "လိုအပ်သလို"), "jam"]
    ],
    [
      t("Put the flour in a mixing bowl.", "小麦粉をボウルに入れます。", "ဂျုံမှုန့်ကို ဇလုံထဲ ထည့်ပါ။"),
      t("Crack the eggs into the flour.", "小麦粉に卵を割り入れます。", "ကြက်ဥများကို ဂျုံမှုန့်ထဲ ဖောက်ထည့်ပါ။"),
      t("Add the milk gradually and stir until the batter is smooth.", "牛乳を少しずつ加え、生地がなめらかになるまで混ぜます。", "နွားနို့ကို နည်းနည်းစီထည့်ပြီး မုန့်နှစ်ချောမွေ့သည်အထိ မွှေပါ။"),
      t("Heat a dry non-stick frying pan over low-medium heat.", "油をひかずに、ノンスティックのフライパンを弱めの中火で温めます。", "ဆီမထည့်ထားသော non-stick ဒယ်အိုးကို မီးအေးအေးမှ အလယ်အလတ်ဖြင့် ပူအောင်လုပ်ပါ။"),
      t("Pour small rounds of batter into the pan.", "生地を小さな丸形になるようフライパンに流し入れます。", "မုန့်နှစ်ကို ဒယ်အိုးထဲ အဝိုင်းငယ်များဖြစ်အောင် လောင်းပါ။"),
      t("Cook until small bubbles appear and the edges begin to set.", "小さな気泡が出て、縁が固まり始めるまで焼きます。", "ပူဖောင်းငယ်များပေါ်လာပြီး အနားများတည်လာသည်အထိ ချက်ပါ။"),
      t("Flip each pancake and cook until the centre is fully cooked.", "パンケーキを裏返し、中まで完全に火が通るまで焼きます。", "ပန်ကိတ်တစ်ခုစီကို လှန်ပြီး အလယ်သားလုံးဝကျက်သည်အထိ ချက်ပါ။"),
      t("Serve with honey and jam.", "はちみつとジャムを添えます。", "ပျားရည်နှင့် သစ်သီးယိုဖြင့် တည်ခင်းပါ။")
    ],
    t("Use only flour, eggs, and milk in the batter. Do not add sugar, baking powder, butter, or oil. Keep the heat low enough to avoid burning, and cook the egg batter fully before serving.", "生地には小麦粉、卵、牛乳だけを使います。砂糖、ベーキングパウダー、バター、油は加えません。焦げないよう火加減を弱めに保ち、卵を含む生地の中まで完全に火を通してから出します。", "မုန့်နှစ်တွင် ဂျုံမှုန့်၊ ကြက်ဥနှင့် နွားနို့ကိုသာ သုံးပါ။ သကြား၊ baking powder၊ ထောပတ် သို့မဟုတ် ဆီ မထည့်ပါနှင့်။ မလောင်စေရန် မီးအေးအေးထားပြီး ကြက်ဥပါသော မုန့်နှစ်အလယ်သား လုံးဝကျက်မှ တည်ခင်းပါ။"),
    [
      photo("assets/recipes/human-food/three-ingredient-pancakes-served.jpg",
        t("Three-ingredient pancakes served with honey and jam", "はちみつとジャムを添えた材料3つのパンケーキ", "ပျားရည်နှင့် သစ်သီးယိုဖြင့် တည်ခင်းထားသော ပါဝင်ပစ္စည်း ၃ မျိုး ပန်ကိတ်"),
        t("Serve the cooked pancakes with honey and fruit jam.", "焼き上がったパンケーキにはちみつとフルーツジャムを添えます。", "ကျက်ပြီးသော ပန်ကိတ်များကို ပျားရည်နှင့် သစ်သီးယိုဖြင့် တည်ခင်းပါ။")),
      photo("assets/recipes/human-food/three-ingredient-pancakes-pouring-batter.jpg",
        t("Pouring pancake batter into a non-stick pan", "ノンスティックのフライパンにパンケーキ生地を流し入れる", "non-stick ဒယ်အိုးထဲ ပန်ကိတ်မုန့်နှစ် လောင်းထည့်နေပုံ"),
        t("Pour small portions of the smooth batter into the dry pan.", "なめらかな生地を、油をひいていないフライパンに少量ずつ流し入れます。", "ချောမွေ့သော မုန့်နှစ်ကို ဆီမထည့်ထားသော ဒယ်အိုးထဲ အနည်းငယ်စီ လောင်းပါ။")),
      photo("assets/recipes/human-food/three-ingredient-pancakes-flipping.jpg",
        t("Flipping pancakes in the frying pan", "フライパンでパンケーキを裏返す", "ဒယ်အိုးထဲရှိ ပန်ကိတ်များကို လှန်နေပုံ"),
        t("Flip the pancakes carefully and cook the centre completely.", "パンケーキを丁寧に裏返し、中まで完全に火を通します。", "ပန်ကိတ်များကို ဂရုတစိုက်လှန်ပြီး အလယ်သားလုံးဝကျက်အောင် ချက်ပါ။"))
    ],
    "human",
    {
      mealType: t("Breakfast/Snack", "朝食／軽食", "မနက်စာ / မုန့်စားချိန်"),
      style: t("Simple", "簡単", "ရိုးရှင်းသော"),
      highProtein: false
    }
  ),
  recipe("macaroni-salad",
    t("Macaroni Salad", "マカロニサラダ", "မကာရိုနီသုပ်"),
    [
      [t("Elbow macaroni", "マカロニ", "မကာရိုနီ"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "macaroni"],
      [t("Eggs", "卵", "ကြက်ဥ"), t("About 2", "約2個", "၂ လုံးခန့်"), "eggs"],
      [t("Tomato, diced", "角切りトマト", "အတုံးသေးသေးလှီးထားသော ခရမ်းချဉ်သီး"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "tomato"],
      [t("Mayonnaise", "マヨネーズ", "မရိုနိစ် (Mayonnaise)"), t("as needed", "適量", "လိုအပ်သလို"), "mayonnaise"],
      [t("Salt", "塩", "ဆား"), t("to taste", "適量", "အရသာအလိုက်"), "salt"]
    ],
    [
      t("Boil about 2 eggs until fully cooked.", "卵約2個を中まで完全に火が通るまでゆでます。", "ကြက်ဥ ၂ လုံးခန့်ကို ကျက်အောင် ပြုတ်ပါ။"),
      t("Cool the eggs, then peel and chop them.", "卵を冷まし、殻をむいて小さく切ります。", "ကြက်ဥကို အေးအောင်ထားပြီး အခွံခွာကာ သေးသေးလှီးပါ။"),
      t("Boil the macaroni until tender.", "マカロニを柔らかくなるまでゆでます。", "မကာရိုနီကို နူးအိလာသည်အထိ ပြုတ်ပါ။"),
      t("Drain the macaroni and let it cool.", "マカロニの湯を切り、冷まします。", "မကာရိုနီကို ရေစစ်ပြီး အေးအောင်ထားပါ။"),
      t("Dice the tomato into small pieces.", "トマトを小さな角切りにします。", "ခရမ်းချဉ်သီးကို အတုံးသေးသေးလှီးပါ။"),
      t("Mix the macaroni, boiled eggs, tomato, mayonnaise, and salt.", "マカロニ、ゆで卵、トマト、マヨネーズ、塩を混ぜます。", "မကာရိုနီ၊ ကြက်ဥပြုတ်၊ ခရမ်းချဉ်သီး၊ Mayonnaise နှင့် ဆားကို ရောမွှေပါ။"),
      t("Put the salad in a covered container and keep it in the fridge.", "サラダをふた付きの容器に入れ、冷蔵庫で保存します。", "အသုပ်ကို အဖုံးပါသောဘူးထဲထည့်ပြီး ရေခဲသေတ္တာထဲတွင် သိမ်းထားပါ။")
    ],
    t("Keep the finished salad covered in the fridge. Do not leave it on the counter after mixing.", "完成したサラダはふたをして冷蔵庫で保存します。混ぜ終わった後は室温に置いたままにしないでください。", "ပြီးသောအသုပ်ကို အဖုံးပိတ်ပြီး ရေခဲသေတ္တာထဲတွင် သိမ်းပါ။ ရောမွှေပြီးနောက် စားပွဲပေါ်တွင် မထားပါနှင့်။"),
    [
      photo("assets/recipes/human-food/macaroni-salad.png",
        t("Finished macaroni salad in a metal bowl", "金属製のボウルに入った完成したマカロニサラダ", "သံဇလုံထဲရှိ ပြီးစီးသော မကာရိုနီသုပ်"),
        t("Mix the tender macaroni with boiled eggs, diced tomato, mayonnaise, and salt.", "柔らかくゆでたマカロニに、ゆで卵、角切りトマト、マヨネーズ、塩を混ぜます。", "နူးအိသော မကာရိုနီကို ကြက်ဥပြုတ်၊ ခရမ်းချဉ်သီးအတုံး၊ Mayonnaise နှင့် ဆားတို့ဖြင့် ရောမွှေပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Side", "昼食／副菜", "နေ့လယ်စာ / အရံဟင်း"),
      style: t("Cold salad", "冷製サラダ", "အအေးသုပ်"),
      highProtein: false
    }
  ),
  recipe("creamy-tomato-shrimp-pasta",
    t("Creamy Tomato Shrimp Pasta", "クリーミートマトシュリンプパスタ", "ခရမ်းချဉ်သီးအရသာ ပုစွန်နို့နှစ် Pasta"),
    [
      [t("Olive oil", "オリーブオイル", "သံလွင်ဆီ"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "oil"],
      [t("Garlic, finely minced", "にんにく（みじん切り）", "နုပ်နုပ်စဉ်းထားသော ကြက်သွန်ဖြူ"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "garlic"],
      [t("Shrimp", "えび", "ပုစွန်"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "prawns"],
      [t("Water", "水", "ရေ"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "water"],
      [t("Milk", "牛乳", "နို့"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "milk"],
      [t("Tomato ketchup", "トマトケチャップ", "ခရမ်းချဉ်သီး ketchup"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "tomato-ketchup"],
      [t("Consommé powder", "コンソメ顆粒", "ကွန်ဆိုမေးဟင်းရည်မှုန့်"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "consomme-powder"],
      [t("Salt", "塩", "ဆား"), t("to taste", "適量", "အရသာအလိုက်"), "salt"],
      [t("Uncooked pasta", "乾燥パスタ", "မပြုတ်ရသေးသော pasta"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "pasta"],
      [t("Mushrooms", "きのこ", "မှို"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "mushrooms"],
      [t("Black pepper", "黒こしょう", "ငရုတ်ကောင်းမှုန့်"), t("to taste", "適量", "အရသာအလိုက်"), "black-pepper"]
    ],
    [
      t("Add the olive oil and minced garlic to a pan.", "フライパンにオリーブオイルとみじん切りのにんにくを入れます。", "ဒယ်အိုးထဲသို့ သံလွင်ဆီနှင့် နုပ်နုပ်စဉ်းထားသော ကြက်သွန်ဖြူကို ထည့်ပါ။"),
      t("Sauté the garlic until fragrant.", "にんにくの香りが出るまで炒めます。", "ကြက်သွန်ဖြူအနံ့မွှေးလာသည်အထိ ဆီသတ်ပါ။"),
      t("Add the shrimp and cook lightly until they begin to change colour.", "えびを加え、色が変わり始めるまで軽く炒めます。", "ပုစွန်ကိုထည့်ပြီး အရောင်အနည်းငယ်ပြောင်းလာသည်အထိ ပေါ့ပေါ့ပါးပါး ကြော်ပါ။"),
      t("Add the water, milk, tomato ketchup, consommé powder, and salt.", "水、牛乳、トマトケチャップ、コンソメ顆粒、塩を加えます。", "ရေ၊ နို့၊ ခရမ်းချဉ်သီး ketchup၊ ကွန်ဆိုမေးဟင်းရည်မှုန့်နှင့် ဆားတို့ကို ထည့်ပါ။"),
      t("Stir the sauce until evenly combined.", "ソースが均一になるまで混ぜます。", "ဆော့စ်သမသွားသည်အထိ မွှေပါ။"),
      t("Add the uncooked pasta and mushrooms.", "乾燥パスタときのこを加えます。", "မပြုတ်ရသေးသော pasta နှင့် မှိုကို ထည့်ပါ။"),
      t("Cover the pan and cook over low heat until the pasta is tender.", "ふたをして、パスタが柔らかくなるまで弱火で煮ます。", "အဖုံးဖုံးပြီး pasta နူးလာသည်အထိ မီးအေးအေးဖြင့် ချက်ပါ။"),
      t("Open the lid and stir occasionally to prevent sticking or burning.", "時々ふたを開けて混ぜ、鍋底への焦げ付きや焦げを防ぎます。", "အောက်ခြေမကပ်ဘဲ မီးမတူးစေရန် တစ်ခါတလေ အဖုံးဖွင့်ပြီး မွှေပါ။"),
      t("Check that the shrimp are opaque and fully cooked.", "えびが不透明になり、中まで完全に火が通っていることを確認します。", "ပုစွန်များ အရောင်မကြည်တော့ဘဲ လုံးဝကျက်ကြောင်း စစ်ပါ။"),
      t("Sprinkle with black pepper and serve.", "仕上げに黒こしょうを振って盛り付けます。", "နောက်ဆုံးတွင် ငရုတ်ကောင်းမှုန့်ဖြူးပြီး တည်ခင်းပါ။")
    ],
    t("Keep the heat low and stir occasionally so the pasta does not stick or burn. Make sure the shrimp are fully cooked before serving.", "パスタが鍋底に付いたり焦げたりしないよう、弱火を保って時々混ぜます。えびは中まで完全に火を通してから出してください。", "pasta အောက်ခြေမကပ်ဘဲ မီးမတူးစေရန် မီးအေးအေးထားပြီး တစ်ခါတလေ မွှေပါ။ မတည်ခင်းမီ ပုစွန်များ လုံးဝကျက်ကြောင်း သေချာစစ်ပါ။"),
    [
      photo("assets/recipes/human-food/creamy-tomato-shrimp-pasta-finished.jpg",
        t("Creamy tomato shrimp pasta ready in the pan", "フライパンで完成したクリーミートマトシュリンプパスタ", "ဒယ်အိုးထဲတွင် အဆင်သင့်ဖြစ်နေသော ခရမ်းချဉ်သီးအရသာ ပုစွန်နို့နှစ် pasta"),
        t("Serve when the pasta is tender and the shrimp are fully cooked.", "パスタが柔らかくなり、えびに完全に火が通ったら盛り付けます。", "pasta နူးပြီး ပုစွန်များ လုံးဝကျက်လျှင် တည်ခင်းပါ။")),
      photo("assets/recipes/human-food/creamy-tomato-shrimp-pasta-saute-shrimp.jpg",
        t("Shrimp cooking with olive oil and minced garlic", "オリーブオイルとみじん切りにんにくで炒めるえび", "သံလွင်ဆီနှင့် နုပ်နုပ်စဉ်းထားသော ကြက်သွန်ဖြူဖြင့် ကြော်နေသော ပုစွန်"),
        t("Cook the garlic until fragrant, then lightly cook the shrimp.", "にんにくの香りを出してから、えびを軽く炒めます。", "ကြက်သွန်ဖြူအနံ့မွှေးလာအောင် ဆီသတ်ပြီး ပုစွန်ကို ပေါ့ပေါ့ပါးပါး ကြော်ပါ။")),
      photo("assets/recipes/human-food/creamy-tomato-shrimp-pasta-seasoning-sauce.jpg",
        t("Adding ketchup, consommé powder, milk, water, and salt", "ケチャップ、コンソメ顆粒、牛乳、水、塩を加える", "ketchup၊ ကွန်ဆိုမေးဟင်းရည်မှုန့်၊ နို့၊ ရေနှင့် ဆားထည့်နေပုံ"),
        t("Add the sauce ingredients and stir until evenly combined.", "ソースの材料を加え、均一になるまで混ぜます。", "ဆော့စ်ပါဝင်ပစ္စည်းများကို ထည့်ပြီး သမသွားသည်အထိ မွှေပါ။")),
      photo("assets/recipes/human-food/creamy-tomato-shrimp-pasta-add-pasta.jpg",
        t("Adding uncooked pasta to the creamy sauce", "クリーミーなソースに乾燥パスタを加える", "နို့နှစ်ဆော့စ်ထဲသို့ မပြုတ်ရသေးသော pasta ထည့်နေပုံ"),
        t("Add the uncooked pasta and mushrooms, then cover and cook over low heat.", "乾燥パスタときのこを加え、ふたをして弱火で煮ます。", "မပြုတ်ရသေးသော pasta နှင့် မှိုကို ထည့်ပြီး အဖုံးဖုံးကာ မီးအေးအေးဖြင့် ချက်ပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("One-pan pasta", "ワンパンパスタ", "ဒယ်အိုးတစ်လုံးတည်း pasta"),
      highProtein: true
    }
  ),
  recipe("tuna-mushroom-one-pan-pasta",
    t("Tuna & Mushroom One-Pan Pasta", "ツナとキノコの激うまパスタ", "တူနာနှင့် မှို ဒယ်အိုးတစ်လုံးတည်း Pasta"),
    [
      [t("Olive oil", "オリーブオイル", "သံလွင်ဆီ"), t("1 tbsp", "大さじ1", "စားပွဲတင်ဇွန်း ၁ ဇွန်း"), "oil"],
      [t("Bunashimeji mushrooms", "ぶなしめじ", "ဘူနာရှိမေဂျီမှို"), t("1 pack", "1パック", "၁ ထုပ်"), "shimeji-mushroom"],
      [t("Maitake mushrooms", "まいたけ", "မိုင်တာကေမှို"), t("1/2 pack", "1/2パック", "ထုပ်ဝက်"), "maitake-mushroom"],
      [t("Canned tuna, drained", "ツナ缶（水気を切る）", "တူနာငါးဗူး (အရည်စစ်ထားသော)"), t("1 can", "1缶", "၁ ဗူး"), "tuna"],
      [t("Garlic paste", "にんにくペースト", "ကြက်သွန်ဖြူ paste"), t("3 cm", "3センチ", "၃ စင်တီမီတာ"), "garlic-paste"],
      [t("Water", "水", "ရေ"), "350 ml", "water"],
      [t("Pasta (ZENB yellow pea noodles were used in the video)", "パスタ（動画ではZENB黄えんどう豆麺を使用）", "Pasta (ဗီဒီယိုတွင် ZENB အဝါရောင် ပဲခေါက်ဆွဲကို သုံးထားသည်)"), "100 g", "pasta"],
      [t("Shirodashi", "白だし", "Shirodashi ဟင်းရည်"), t("2 tbsp", "大さじ2", "စားပွဲတင်ဇွန်း ၂ ဇွန်း"), "dashi-soy-sauce"],
      [t("Mirin", "みりん", "မီရင်"), t("1 tsp", "小さじ1", "လက်ဖက်ရည်ဇွန်း ၁ ဇွန်း"), "mirin"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), t("1 tsp", "小さじ1", "လက်ဖက်ရည်ဇွန်း ၁ ဇွန်း"), "soy-sauce"],
      [t("Salt-and-pepper seasoning", "塩こしょう", "ဆားနှင့် ငရုတ်ကောင်း အရသာမှုန့်"), t("2 shakes", "2振り", "၂ ခါ ဖြူးရန်"), "salt-pepper-seasoning"],
      [t("Black pepper, for topping", "黒こしょう（仕上げ用）", "အပေါ်မှဖြူးရန် ငရုတ်ကောင်းမှုန့်"), t("to taste", "適量", "အရသာအလိုက်"), "black-pepper"],
      [t("Chopped green onions, for topping", "刻みねぎ（仕上げ用）", "အပေါ်မှဖြူးရန် လှီးထားသော ကြက်သွန်မြိတ်"), t("to taste", "適量", "အရသာအလိုက်"), "spring-onion"]
    ],
    [
      t("Heat 1 tbsp olive oil in a frying pan.", "フライパンにオリーブオイル大さじ1を入れて熱します。", "ဒယ်အိုးထဲတွင် သံလွင်ဆီ စားပွဲတင်ဇွန်း ၁ ဇွန်းကို အပူပေးပါ။"),
      t("Add 1 pack of bunashimeji mushrooms.", "ぶなしめじ1パックを加えます。", "ဘူနာရှိမေဂျီမှို ၁ ထုပ်ကို ထည့်ပါ။"),
      t("Tear 1/2 pack of maitake mushrooms into the pan by hand.", "まいたけ1/2パックを手で割きながらフライパンに加えます。", "မိုင်တာကေမှို ထုပ်ဝက်ကို လက်ဖြင့်ဖဲ့ပြီး ဒယ်အိုးထဲ ထည့်ပါ။"),
      t("Sauté the mushrooms lightly.", "きのこを軽く炒めます。", "မှိုများကို ပေါ့ပေါ့ပါးပါး ကြော်ပါ။"),
      t("Add 1 drained can of tuna and 3 cm garlic paste.", "水気を切ったツナ1缶と、にんにくペースト3 cmを加えます。", "အရည်စစ်ထားသော တူနာငါး ၁ ဗူးနှင့် ကြက်သွန်ဖြူ paste ၃ စင်တီမီတာကို ထည့်ပါ။"),
      t("Sauté until fragrant and the tuna changes colour slightly.", "香りが立ち、ツナの色が少し変わるまで軽く炒めます。", "အနံ့မွှေးလာပြီး တူနာငါးအရောင် အနည်းငယ်ပြောင်းသည်အထိ ပေါ့ပေါ့ပါးပါး ကြော်ပါ။"),
      t("Pour in 350 ml water.", "水350 mlを注ぎます。", "ရေ ၃၅၀ ml ကို လောင်းထည့်ပါ။"),
      t("Bring the water to a boil.", "沸騰させます。", "ရေဆူလာအောင် တည်ပါ။"),
      t("Add 100 g pasta and separate the strands so they do not stick together.", "パスタ100 gを加え、麺同士がくっつかないようにほぐします。", "pasta ၁၀၀ g ကို ထည့်ပြီး အချောင်းများမကပ်စေရန် ခွဲမွှေပါ။"),
      t("Cook for the time shown on the pasta package, stirring occasionally.", "時々混ぜながら、パスタの袋に表示された時間どおりに煮ます。", "တစ်ခါတလေ မွှေပေးပြီး pasta အထုပ်ပေါ်တွင် ဖော်ပြထားသော အချိန်အတိုင်း ချက်ပါ။"),
      t("Add 2 tbsp shirodashi, 1 tsp mirin, 1 tsp soy sauce, and 2 shakes of salt-and-pepper seasoning.", "白だし大さじ2、みりん小さじ1、醤油小さじ1、塩こしょう2振りを加えます。", "Shirodashi စားပွဲတင်ဇွန်း ၂ ဇွန်း၊ မီရင် လက်ဖက်ရည်ဇွန်း ၁ ဇွန်း၊ ပဲငံပြာရည် လက်ဖက်ရည်ဇွန်း ၁ ဇွန်းနှင့် ဆားငရုတ်ကောင်း အရသာမှုန့် ၂ ခါ ဖြူးထည့်ပါ။"),
      t("Stir until the seasonings are evenly mixed.", "調味料が均一になじむまで混ぜます。", "ဟင်းခတ်များ သမသွားသည်အထိ မွှေပါ။"),
      t("Near the end, turn the heat to high and reduce the excess liquid until a light sauce coats the pasta.", "仕上げに強火にし、余分な水分を飛ばして、軽いソースがパスタに絡むまで煮詰めます。", "ချက်ခါနီးတွင် မီးပြင်းပြင်းတင်ပြီး အရည်ပိုများကို ခန်းအောင်ချက်ကာ ဆော့စ်ပါးပါးက pasta ကို ဖုံးသွားသည်အထိ ချက်ပါ။"),
      t("Top with black pepper and chopped green onions.", "黒こしょうと刻みねぎを振りかけます。", "ငရုတ်ကောင်းမှုန့်နှင့် လှီးထားသော ကြက်သွန်မြိတ်ကို အပေါ်မှ ဖြူးပါ။"),
      t("Serve immediately.", "すぐに盛り付けます。", "ချက်ချင်း တည်ခင်းပါ။")
    ],
    t("Watch the pan closely after turning the heat to high. Stir continuously enough to prevent sticking, and stop reducing while a light sauce still coats the noodles.", "強火にした後はフライパンから目を離さないでください。焦げ付かないよう十分に混ぜ、麺に軽いソースが絡む状態で煮詰めるのを止めます。", "မီးပြင်းပြင်းတင်ပြီးနောက် ဒယ်အိုးကို သေချာစောင့်ကြည့်ပါ။ မကပ်စေရန် လုံလောက်အောင် မွှေပြီး ခေါက်ဆွဲတွင် ဆော့စ်ပါးပါးကပ်နေစဉ် မီးပိတ်ပါ။"),
    [
      photo("assets/recipes/human-food/tuna-mushroom-one-pan-pasta-finished.png",
        t("Tuna and mushroom one-pan pasta ready to serve", "ツナときのこのワンパンパスタの完成品", "တည်ခင်းရန်အဆင်သင့်ဖြစ်သော တူနာနှင့် မှို ဒယ်အိုးတစ်လုံးတည်း pasta"),
        t("Serve the pasta while the light sauce still coats the noodles.", "軽いソースが麺に絡んでいるうちに盛り付けます。", "ဆော့စ်ပါးပါးက ခေါက်ဆွဲတွင် ကပ်နေစဉ် တည်ခင်းပါ။")),
      photo("assets/recipes/human-food/tuna-mushroom-one-pan-pasta-tuna-garlic.jpg",
        t("Adding tuna and garlic paste to the mushrooms", "きのこにツナとにんにくペーストを加える", "မှိုထဲသို့ တူနာငါးနှင့် ကြက်သွန်ဖြူ paste ထည့်နေပုံ"),
        t("Add the drained tuna and 3 cm garlic paste, then sauté lightly.", "水気を切ったツナとにんにくペースト3 cmを加え、軽く炒めます。", "အရည်စစ်ထားသော တူနာငါးနှင့် ကြက်သွန်ဖြူ paste ၃ စင်တီမီတာကို ထည့်ပြီး ပေါ့ပေါ့ပါးပါး ကြော်ပါ။")),
      photo("assets/recipes/human-food/tuna-mushroom-one-pan-pasta-add-water.jpg",
        t("Pouring water into the tuna and mushrooms", "ツナときのこに水を注ぐ", "တူနာငါးနှင့် မှိုထဲသို့ ရေလောင်းထည့်နေပုံ"),
        t("Pour in 350 ml water and bring it to a boil.", "水350 mlを注ぎ、沸騰させます。", "ရေ ၃၅၀ ml လောင်းထည့်ပြီး ဆူလာအောင် တည်ပါ။")),
      photo("assets/recipes/human-food/tuna-mushroom-one-pan-pasta-add-pasta.jpg",
        t("Adding dry pasta to the boiling pan", "沸騰したフライパンに乾燥パスタを加える", "ဆူနေသော ဒယ်အိုးထဲသို့ pasta အခြောက် ထည့်နေပုံ"),
        t("Add 100 g pasta and separate the strands as they soften.", "パスタ100 gを加え、柔らかくなり始めたら麺をほぐします。", "pasta ၁၀၀ g ကို ထည့်ပြီး နူးလာသည်နှင့် အချောင်းများကို ခွဲမွှေပါ။")),
      photo("assets/recipes/human-food/tuna-mushroom-one-pan-pasta-add-shirodashi.jpg",
        t("Measuring shirodashi into the pasta", "パスタに白だしを計って加える", "pasta ထဲသို့ Shirodashi တိုင်းထည့်နေပုံ"),
        t("Add 2 tbsp shirodashi.", "白だし大さじ2を加えます。", "Shirodashi စားပွဲတင်ဇွန်း ၂ ဇွန်း ထည့်ပါ။")),
      photo("assets/recipes/human-food/tuna-mushroom-one-pan-pasta-add-mirin-soy.jpg",
        t("Measuring mirin and soy sauce into the pasta", "パスタにみりんと醤油を計って加える", "pasta ထဲသို့ မီရင်နှင့် ပဲငံပြာရည် တိုင်းထည့်နေပုံ"),
        t("Add 1 tsp mirin and 1 tsp soy sauce.", "みりん小さじ1と醤油小さじ1を加えます。", "မီရင် လက်ဖက်ရည်ဇွန်း ၁ ဇွန်းနှင့် ပဲငံပြာရည် လက်ဖက်ရည်ဇွန်း ၁ ဇွန်း ထည့်ပါ။")),
      photo("assets/recipes/human-food/tuna-mushroom-one-pan-pasta-add-salt-pepper.jpg",
        t("Adding salt-and-pepper seasoning to the pasta", "パスタに塩こしょうを加える", "pasta ထဲသို့ ဆားငရုတ်ကောင်း အရသာမှုန့် ထည့်နေပုံ"),
        t("Add 2 shakes of salt-and-pepper seasoning.", "塩こしょうを2振り加えます。", "ဆားငရုတ်ကောင်း အရသာမှုန့်ကို ၂ ခါ ဖြူးထည့်ပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Japanese one-pan", "和風ワンパン", "ဂျပန်စတိုင် ဒယ်အိုးတစ်လုံးတည်း"),
      highProtein: true,
      videoUrl: "https://vt.tiktok.com/ZSXQh9Prn/",
      videoUrlLabel: t("Open TikTok recipe video", "TikTokのレシピ動画を開く", "TikTok ဟင်းချက်နည်းဗီဒီယိုကို ဖွင့်ပါ")
    }
  ),
  recipe("egg-toast",
    t("Egg Toast", "卵トースト", "ကြက်ဥပေါင်မုန့်ကင်"),
    [
      [t("Bread", "パン", "ပေါင်မုန့်"), t("1 slice", "1枚", "၁ ချပ်"), "bread"],
      [t("Egg", "卵", "ကြက်ဥ"), t("1 egg", "卵1個", "ကြက်ဥ ၁ လုံး"), "eggs"],
      [t("Mayonnaise", "マヨネーズ", "မေယိုနိစ်"), t("to taste", "お好みで", "အရသာအလိုက်"), "mayonnaise"],
      [t("Salt", "塩", "ဆား"), t("to taste", "お好みで", "အရသာအလိုက်"), "salt"]
    ],
    [
      t("Boil the egg in water for 10 minutes to make a hard-boiled egg, then peel it.", "卵をお湯で10分ゆでてゆで卵を作り、殻をむく。", "ကြက်ဥကို ရေနွေးထဲတွင် ၁၀ မိနစ်ပြုတ်ပြီး ကြက်ဥပြုတ်လုပ်ကာ အခွံခွာပါ။"),
      t("Add mayonnaise and salt, then mix well.", "マヨネーズと塩を加えてよく混ぜる。", "mayonnaise နှင့် ဆားထည့်ပြီး ကောင်းကောင်းရောပါ။"),
      t("Place the egg mixture on the toast.", "卵のミックスをトーストの上にのせる。", "ကြက်ဥအရောကို toast ပေါ်တွင် တင်ပါ။"),
      t("Put it in the air fryer and cook at 190°C for 4 minutes.", "エアフライヤーに入れ、190℃で4分加熱する。", "air fryer ထဲထည့်ပြီး 190°C ဖြင့် 4 မိနစ် အပူပေးပါ။")
    ],
    t("Boil the egg for 10 minutes and air-fry at 190°C for 4 minutes. Be careful with boiling water and the hot air-fryer basket.", "卵は10分ゆで、エアフライヤーは190℃で4分。熱湯と熱いバスケットに注意する。", "ကြက်ဥကို ၁၀ မိနစ်ပြုတ်ပြီး air fryer ကို 190°C ဖြင့် 4 မိနစ်ထားပါ။ ရေနွေးပူနှင့် ပူသော air-fryer basket ကို သတိထားပါ။"),
    [
      photo("assets/recipes/human-food/egg-toast-served.jpg",
        t("Egg toast ready to serve", "提供準備ができた卵トースト", "ပေးရန်အဆင်သင့်ဖြစ်သော ကြက်ဥ toast"),
        t("Serve the egg toast once it is hot and ready.", "温かいうちに、完成した卵トーストを提供する。", "ပူပူနွေးနွေးဖြစ်နေစဉ် အဆင်သင့်ဖြစ်သော ကြက်ဥ toast ကို ပေးပါ။")),
      photo("assets/recipes/human-food/egg-toast-boil-eggs.jpg",
        t("Boiling eggs on the induction hob", "IHコンロで卵をゆでる", "induction hob ပေါ်တွင် ကြက်ဥပြုတ်ခြင်း"),
        t("Boil the eggs in water for 10 minutes to make hard-boiled eggs.", "卵をお湯で10分ゆでて、ゆで卵を作る。", "ကြက်ဥပြုတ်လုပ်ရန် ကြက်ဥကို ရေနွေးထဲတွင် ၁၀ မိနစ်ပြုတ်ပါ။")),
      photo("assets/recipes/human-food/egg-toast-mayonnaise-fridge.jpg",
        t("Mayonnaise in the refrigerator door", "冷蔵庫のドアポケットにあるマヨネーズ", "ရေခဲသေတ္တာတံခါးတွင်ရှိသော mayonnaise"),
        t("Take the mayonnaise from the refrigerator door.", "冷蔵庫のドアポケットからマヨネーズを取る。", "ရေခဲသေတ္တာတံခါးမှ mayonnaise ကို ယူပါ။")),
      photo("assets/recipes/human-food/egg-toast-mayonnaise-counter.jpg",
        t("Mayonnaise ready on the kitchen counter", "キッチンカウンターに用意したマヨネーズ", "မီးဖိုချောင်ကောင်တာပေါ်တွင် အဆင်သင့်ထားသော mayonnaise"),
        t("Keep the mayonnaise ready while preparing the egg mixture.", "卵のミックスを作る間、マヨネーズを用意しておく。", "ကြက်ဥအရောပြင်ဆင်နေစဉ် mayonnaise ကို အဆင်သင့်ထားပါ။")),
      photo("assets/recipes/human-food/egg-toast-mix.jpg",
        t("Boiled eggs with mayonnaise and salt", "ゆで卵、マヨネーズ、塩", "ကြက်ဥပြုတ်၊ mayonnaise နှင့် ဆား"),
        t("Peel the boiled eggs, add mayonnaise and salt, then mix well.", "ゆで卵の殻をむき、マヨネーズと塩を加えてよく混ぜる。", "ကြက်ဥပြုတ်အခွံခွာပြီး mayonnaise နှင့် ဆားထည့်ကာ ကောင်းကောင်းရောပါ။")),
      photo("assets/recipes/human-food/egg-toast-air-fryer.jpg",
        t("Egg toast in the Ninja air fryer", "Ninjaエアフライヤーの卵トースト", "Ninja air fryer ထဲရှိ ကြက်ဥ toast"),
        t("Put the egg mixture on toast, then air-fry at 190°C for 4 minutes.", "卵のミックスをトーストにのせ、190℃で4分エアフライする。", "ကြက်ဥအရောကို toast ပေါ်တင်ပြီး 190°C ဖြင့် 4 မိနစ် air fry လုပ်ပါ။"))
    ],
    "human",
    {
      mealType: t("Breakfast/Snack", "朝食／軽食", "မနက်စာ / snack"),
      style: t("Quick", "簡単", "လွယ်ကူသော"),
      timeEstimate: t("14 mins", "14分", "၁၄ မိနစ်"),
      highProtein: false
    }
  ),
  recipe("air-fryer-chicken-wings",
    t("Air-Fryer Chicken Wings", "手羽先（チキンウィング）", "Air Fryer ကြက်တောင်ပံ"),
    [
      [t("Chicken wings", "手羽先", "ကြက်တောင်ပံ"), t("as needed", "必要量", "လိုအပ်သလို"), "chicken-wings"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), t("for the marinade", "漬け込み用", "နှပ်ရန်"), "soy-sauce"],
      [t("Salt", "塩", "ဆား"), t("for the marinade", "漬け込み用", "နှပ်ရန်"), "salt"],
      [t("Sesame oil", "ごま油", "နှမ်းဆီ"), t("for the marinade", "漬け込み用", "နှပ်ရန်"), "sesame-oil"]
    ],
    [
      t("Put the soy sauce, salt, sesame oil, and chicken wings in a pot.", "鍋に醤油、塩、ごま油、手羽先を入れます。", "အိုးထဲသို့ ပဲငံပြာရည်၊ ဆား၊ နှမ်းဆီနှင့် ကြက်တောင်ပံများ ထည့်ပါ။"),
      t("Marinate in the fridge for 30 minutes to 1 hour.", "冷蔵庫で30分〜1時間漬け込みます。", "ရေခဲသေတ္တာထဲတွင် မိနစ် ၃၀ မှ ၁ နာရီအထိ နှပ်ထားပါ။"),
      t("Air-fry at 200°C for 20 minutes.", "エアフライヤーで200℃・20分加熱します。", "air fryer ဖြင့် 200°C တွင် မိနစ် ၂၀ ချက်ပါ။"),
      t("Turn the wings after 10 minutes.", "10分後に手羽先を裏返します。", "၁၀ မိနစ်ကြာလျှင် ကြက်တောင်ပံများကို လှန်ပါ။"),
      t("Check frequently and make sure the chicken is fully cooked.", "こまめに確認し、チキンの中まで火が通っていることを確かめます。", "မကြာခဏ စစ်ပြီး ကြက်သားလုံးဝကျက်ကြောင်း သေချာပါစေ။")
    ],
    t("Soy sauce can make the wings brown quickly. Turn them after 10 minutes, check often, and take care with the hot air-fryer basket.", "醤油で焦げ色が早く付くことがあります。10分後に裏返し、こまめに確認し、熱いバスケットに注意してください。", "ပဲငံပြာရည်ကြောင့် အရောင်မြန်မြန်ညိုနိုင်သည်။ ၁၀ မိနစ်တွင် လှန်ပြီး မကြာခဏစစ်ပါ။ ပူသော air-fryer basket ကို သတိထားပါ။"),
    [
      photo("assets/recipes/human-food/air-fryer-chicken-wings-served.jpg",
        t("Air-fryer chicken wings ready to serve", "提供準備ができたエアフライヤー手羽先", "ပေးရန်အဆင်သင့်ဖြစ်သော air-fryer ကြက်တောင်ပံများ"),
        t("Air-fry at 200°C for 20 minutes, turning after 10 minutes. Serve only when fully cooked.", "200℃で20分加熱し、10分後に裏返します。中まで完全に火が通ってから提供してください。", "200°C ဖြင့် မိနစ် ၂၀ air fry လုပ်ပြီး ၁၀ မိနစ်တွင် လှန်ပါ။ အတွင်းထိ လုံးဝကျက်မှ ပေးပါ။")),
      photo("assets/recipes/human-food/air-fryer-chicken-wings-wet-market-stall.jpg",
        t("Chicken wings at the marked wet-market stall", "印を付けた市場の売り場にある手羽先", "အမှတ်အသားပြထားသော စျေးဆိုင်ရှိ ကြက်တောင်ပံများ"),
        t("Buy chicken wings from the marked trays. Ask the vendor if unsure.", "印を付けたトレーから手羽先を買います。不明な場合は店員に確認してください。", "အမှတ်အသားပြထားသော ခြင်းများမှ ကြက်တောင်ပံ ဝယ်ပါ။ မသေချာပါက ဆိုင်ရှင်ကို မေးပါ။")),
      photo("assets/recipes/human-food/air-fryer-chicken-wings-marinating-pot.jpg",
        t("Raw chicken wings in the marinating pot", "漬け込み用の鍋に入れた生の手羽先", "နှပ်ရန်အိုးထဲရှိ ကြက်တောင်ပံအစိမ်းများ"),
        t("Mix the wings with soy sauce, salt, and sesame oil, then marinate in the fridge for 30 minutes to 1 hour.", "手羽先に醤油、塩、ごま油を混ぜ、冷蔵庫で30分〜1時間漬け込みます。", "ကြက်တောင်ပံများကို ပဲငံပြာရည်၊ ဆား၊ နှမ်းဆီနှင့်ရောပြီး ရေခဲသေတ္တာထဲတွင် မိနစ် ၃၀ မှ ၁ နာရီအထိ နှပ်ထားပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Air Fryer", "エアフライヤー", "လေပူကြော်စက်"),
      timeEstimate: t("50-80 mins", "50〜80分", "မိနစ် ၅၀-၈၀"),
      highProtein: true
    }
  ),
  recipe("air-fryer-marinated-boneless-chicken-leg",
    t("Air-Fryer Marinated Boneless Chicken Leg", "味付き骨なし鶏もも肉（エアフライヤー）", "Air Fryer နှပ်ထားသော အရိုးမဲ့ ကြက်ပေါင်သား"),
    [
      [
        t("Seara marinated boneless chicken leg, either flavour", "Seara 味付き骨なし鶏もも肉（どちらの味でも可）", "Seara နှပ်ထားသော အရိုးမဲ့ ကြက်ပေါင်သား (မည်သည့်အရသာမဆို)"),
        t("1 × 300 g pack", "300g入り1パック", "၃၀၀ ဂရမ် ၁ ထုပ်"),
        "chicken-thigh"
      ]
    ],
    [
      t("Remove the marinated chicken from the package.", "味付き鶏肉をパックから取り出します。", "နှပ်ထားသော ကြက်သားကို အထုပ်ထဲမှ ထုတ်ပါ။"),
      t("Place the pieces in one layer in the air-fryer basket, skin side down.", "鶏肉を重ならないように、皮を下にしてエアフライヤーのバスケットへ入れます。", "ကြက်သားတုံးများ မထပ်အောင် air-fryer basket ထဲတွင် အရေပြားဘက်ကို အောက်ထားပြီး ထည့်ပါ။"),
      t("Air-fry at 200°C for 12–15 minutes in total.", "200℃で合計12〜15分エアフライします。", "200°C ဖြင့် စုစုပေါင်း ၁၂–၁၅ မိနစ် air fry လုပ်ပါ။"),
      t("Flip the chicken halfway through the chosen time so the skin side faces up.", "設定した時間の半分で鶏肉を裏返し、皮を上にします。", "သတ်မှတ်ထားသော အချိန်တစ်ဝက်တွင် ကြက်သားကို လှန်ပြီး အရေပြားဘက်ကို အပေါ်ထားပါ။"),
      t("Keep the skin side up for the rest of the cooking time.", "残りの加熱時間は皮を上にしたままにします。", "ကျန်ချက်ချိန်တစ်လျှောက် အရေပြားဘက်ကို အပေါ်မှာပဲ ထားပါ။"),
      t("Check the thickest part with a food thermometer. It must reach at least 74°C.", "食品用温度計で最も厚い部分を確認します。74℃以上になっている必要があります。", "အထူဆုံးနေရာကို အစားအသောက်သုံး အပူချိန်တိုင်းကိရိယာဖြင့် စစ်ပါ။ အနည်းဆုံး 74°C ရှိရမည်။"),
      t("If it is below 74°C, cook for 1–2 more minutes with the skin side up, then check again.", "74℃未満の場合は、皮を上にしたままさらに1〜2分加熱し、もう一度確認します。", "74°C မရောက်သေးပါက အရေပြားဘက်ကို အပေါ်ထားပြီး နောက်ထပ် ၁–၂ မိနစ်ချက်ကာ ထပ်စစ်ပါ။")
    ],
    t("The 12–15 minute time is a guide. Check the thickest piece before serving, and take care with the hot basket and juices.", "12〜15分は目安です。提供前に最も厚い部分を確認し、熱いバスケットと肉汁に注意してください。", "၁၂–၁၅ မိနစ်သည် ခန့်မှန်းချက်ဖြစ်သည်။ မစားမီ အထူဆုံးတုံးကို စစ်ပြီး ပူသော basket နှင့် အသားရည်ကို သတိထားပါ။"),
    [
      photo("assets/recipes/human-food/air-fryer-marinated-boneless-chicken-leg-finished.jpg",
        t("Cooked marinated boneless chicken legs with the skin facing up", "皮を上にして焼き上げた味付き骨なし鶏もも肉", "အရေပြားဘက် အပေါ်ထားပြီး ကျက်အောင်ချက်ထားသော နှပ်ထားသည့် အရိုးမဲ့ ကြက်ပေါင်သား"),
        t("Finish cooking with the skin side up. Serve only after the thickest part reaches at least 74°C.", "最後は皮を上にして仕上げます。最も厚い部分が74℃以上になってから提供してください。", "နောက်ဆုံးတွင် အရေပြားဘက်ကို အပေါ်ထားပါ။ အထူဆုံးနေရာ အနည်းဆုံး 74°C ရောက်မှ စားပါ။")),
      photo("assets/recipes/human-food/air-fryer-marinated-boneless-chicken-leg-package.jpg",
        t("Seara marinated boneless chicken leg packages", "Seara 味付き骨なし鶏もも肉のパック", "Seara နှပ်ထားသော အရိုးမဲ့ ကြက်ပေါင်သားအထုပ်များ"),
        t("Use 1 × 300 g pack. Either the Smoky Mountain or 10 Spices flavour can be used.", "300g入りを1パック使います。Smoky Mountain味または10 Spices味のどちらでも使えます。", "၃၀၀ ဂရမ် ၁ ထုပ် သုံးပါ။ Smoky Mountain သို့မဟုတ် 10 Spices အရသာ မည်သည့်တစ်မျိုးမဆို သုံးနိုင်ပါသည်။")),
      photo("assets/recipes/human-food/air-fryer-marinated-boneless-chicken-leg-flip.jpg",
        t("Marinated boneless chicken legs being flipped in the air fryer", "エアフライヤーで味付き骨なし鶏もも肉を裏返しているところ", "air fryer ထဲတွင် နှပ်ထားသော အရိုးမဲ့ ကြက်ပေါင်သားကို လှန်နေခြင်း"),
        t("Flip once at the halfway point. Leave every piece skin side up for the remaining time.", "加熱時間の半分で一度裏返し、残りはすべて皮を上にして焼きます。", "ချက်ချိန်တစ်ဝက်တွင် ၁ ကြိမ်လှန်ပါ။ ကျန်အချိန်တွင် အားလုံးကို အရေပြားဘက် အပေါ်ထားပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Air Fryer", "エアフライヤー", "လေပူကြော်စက်"),
      timeEstimate: t("12–15 mins", "12〜15分", "၁၂–၁၅ မိနစ်"),
      highProtein: true
    }
  ),
  recipe("air-fryer-broccoli",
    t("Air-Fryer Broccoli", "ブロッコリー（エアフライヤー）", "Air Fryer ဘရိုကိုလီ"),
    [
      [t("Broccoli", "ブロッコリー", "ဘရိုကိုလီ"), t("1 head or as needed", "1株または必要な量", "၁ စည်း သို့မဟုတ် လိုအပ်သလောက်"), "broccoli"],
      [t("Garlic pepper", "ガーリックペッパー", "garlic pepper"), t("a light sprinkle", "少量", "အနည်းငယ်ဖြူးရန်"), "garlic-pepper"],
      [t("Steak pepper", "ステーキペッパー", "steak pepper"), t("a light sprinkle", "少量", "အနည်းငယ်ဖြူးရန်"), "steak-pepper"],
      [t("Salt", "塩", "ဆား"), t("a light sprinkle", "少量", "အနည်းငယ်ဖြူးရန်"), "salt"],
      [t("Cooking oil", "調理油", "ဟင်းချက်ဆီ"), t("a light spray or drizzle", "軽くスプレーまたは回しかける", "အနည်းငယ်ဖြန်းရန် သို့မဟုတ် လောင်းရန်"), "oil"]
    ],
    [
      t("Cut the broccoli into bite-sized pieces.", "ブロッコリーを一口サイズに切ります。", "ဘရိုကိုလီကို တစ်ကိုက်စာအရွယ် လှီးပါ။"),
      t("Put it in the air-fryer basket and lightly season with garlic pepper, steak pepper, and salt.", "エアフライヤーのバスケットに入れ、ガーリックペッパー、ステーキペッパー、塩を少量振ります。", "air-fryer basket ထဲထည့်ပြီး garlic pepper၊ steak pepper နှင့် ဆားကို အနည်းငယ်ဖြူးပါ။"),
      t("Lightly spray or drizzle with oil.", "油を軽くスプレーするか回しかけます。", "ဆီကို အနည်းငယ်ဖြန်းပါ သို့မဟုတ် လောင်းပါ။"),
      t("Air-fry at 180°C for up to 10 minutes. Check around halfway and stop early if the edges brown too quickly.", "180℃で最長10分エアフライします。5分前後で確認し、端が早く焦げそうなら早めに止めます。", "180°C ဖြင့် ၁၀ မိနစ်အထိ air fry လုပ်ပါ။ ချက်ချိန်တစ်ဝက်ခန့်တွင် စစ်ပြီး အစွန်းများ မြန်မြန်ညိုလာပါက စောစောရပ်ပါ။")
    ],
    t("Broccoli burns easily. Watch it closely, and be careful because the air-fryer basket will be hot.", "ブロッコリーは焦げやすいので、こまめに確認します。熱いエアフライヤーのバスケットにも注意してください。", "ဘရိုကိုလီသည် လွယ်ကူစွာလောင်နိုင်သဖြင့် သေချာစောင့်ကြည့်ပါ။ ပူနေသော air-fryer basket ကိုလည်း သတိထားပါ။"),
    [],
    "human",
    {
      mealType: t("Side dish", "副菜", "အရံဟင်း"),
      style: t("Air fryer", "エアフライヤー", "လေပူကြော်စက်"),
      timeEstimate: t("15 mins", "15分", "၁၅ မိနစ်"),
      highProtein: false
    }
  ),
  recipe("squid-vegetable-stir-fry",
    t("Squid & Vegetable Stir-Fry", "イカと野菜の炒め物", "ပြည်ကြီးငါးနှင့် ဟင်းသီးဟင်းရွက်ကြော်"),
    [
      [t("Squid", "イカ", "ပြည်ကြီးငါး"), t("as needed", "必要な量", "လိုအပ်သလောက်"), "squid"],
      [t("Suitable vegetables, such as mushrooms, cabbage, or komatsuna", "きのこ、キャベツ、小松菜などの野菜", "မှို၊ ဂေါ်ဖီထုပ် သို့မဟုတ် komatsuna စသည့် ဟင်းသီးဟင်းရွက်"), t("as needed", "必要な量", "လိုအပ်သလောက်"), "mixed-vegetables"],
      [t("Garlic", "にんにく", "ကြက်သွန်ဖြူ"), t("a small amount", "少量", "အနည်းငယ်"), "garlic"],
      [t("Spring onions", "青ねぎ", "ကြက်သွန်မြိတ်"), t("as needed", "必要な量", "လိုအပ်သလောက်"), "spring-onion"],
      [t("Olive oil", "オリーブオイル", "olive oil"), t("a small amount", "少量", "အနည်းငယ်"), "oil"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), t("a small amount", "少量", "အနည်းငယ်"), "soy-sauce"],
      [t("Salt", "塩", "ဆား"), t("a small amount", "少量", "အနည်းငယ်"), "salt"]
    ],
    [
      t("If the squid is frozen, thaw it in the refrigerator. If it is needed quickly, keep it in a sealed leak-proof bag and submerge the bag in cold water. Never put the squid directly in the water.", "冷凍イカは冷蔵庫で解凍します。急ぐ場合は、漏れない密閉袋に入れたまま冷水につけます。イカを水へ直接入れないでください。", "ပြည်ကြီးငါး အေးခဲထားပါက refrigerator ထဲတွင် အရည်ဖျော်ပါ။ အမြန်လိုလျှင် ရေမယိုသော sealed bag ထဲတွင်ထားပြီး အိတ်ကို ရေအေးထဲစိမ်ပါ။ ပြည်ကြီးငါးကို ရေထဲတိုက်ရိုက်မထည့်ပါနှင့်။"),
      t("Drain the squid and pat it dry before cooking.", "調理前にイカの水気を切り、しっかり拭きます。", "မချက်မီ ပြည်ကြီးငါးကို ရေစစ်ပြီး ခြောက်အောင်သုတ်ပါ။"),
      t("Heat a small amount of olive oil in a frying pan, then add the garlic.", "フライパンに少量のオリーブオイルを熱し、にんにくを加えます。", "ဒယ်အိုးထဲတွင် olive oil အနည်းငယ်ပူအောင်လုပ်ပြီး ကြက်သွန်ဖြူထည့်ပါ။"),
      t("Add the squid and stir-fry until it starts to turn opaque.", "イカを加え、白くなり始めるまで炒めます。", "ပြည်ကြီးငါးထည့်ပြီး အဖြူရောင်ပြောင်းစပြုသည်အထိ ကြော်ပါ။"),
      t("Add the vegetables and spring onions.", "野菜と青ねぎを加えます。", "ဟင်းသီးဟင်းရွက်များနှင့် ကြက်သွန်မြိတ်ထည့်ပါ။"),
      t("Add a little soy sauce and salt, then mix well.", "醤油と塩を少量加え、よく混ぜます。", "ပဲငံပြာရည်နှင့် ဆား အနည်းငယ်ထည့်ပြီး ကောင်းကောင်းရောပါ။"),
      t("Stir-fry until the squid is fully cooked and the vegetables are ready.", "イカに完全に火が通り、野菜が仕上がるまで炒めます。", "ပြည်ကြီးငါးအပြည့်ကျက်ပြီး ဟင်းသီးဟင်းရွက်များ အဆင်သင့်ဖြစ်သည်အထိ ကြော်ပါ။")
    ],
    t("Start with small amounts of seasoning and add more only if needed. Pat thawed squid dry before it touches hot oil to reduce splattering.", "調味料は少量から始め、必要な場合だけ足します。油はねを減らすため、解凍したイカは熱い油へ入れる前に水気をよく拭いてください。", "ဟင်းခတ်များကို အနည်းငယ်မှစပြီး လိုအပ်မှသာ ထပ်ထည့်ပါ။ ဆီမစင်အောင် အရည်ဖျော်ထားသော ပြည်ကြီးငါးကို ဆီပူထဲမထည့်မီ ခြောက်အောင်သုတ်ပါ။"),
    [
      photo("assets/recipes/human-food/squid-vegetable-stir-fry-cooked.jpg",
        t("Cooked squid and vegetable stir-fry in the frying pan", "フライパンで仕上がったイカと野菜の炒め物", "ဒယ်အိုးထဲတွင် ကျက်အောင်ကြော်ထားသော ပြည်ကြီးငါးနှင့် ဟင်းသီးဟင်းရွက်ကြော်"),
        t("Finish the stir-fry with garlic, spring onions, soy sauce, and a little salt.", "にんにく、青ねぎ、醤油、少量の塩を加えて仕上げます。", "ကြက်သွန်ဖြူ၊ ကြက်သွန်မြိတ်၊ ပဲငံပြာရည်နှင့် ဆားအနည်းငယ်ထည့်ပြီး အပြီးသတ်ကြော်ပါ။")),
      photo("assets/recipes/human-food/squid-vegetable-stir-fry-cooking-squid.jpg",
        t("Squid cooking first in the frying pan", "フライパンで先にイカを炒めているところ", "ဒယ်အိုးထဲတွင် ပြည်ကြီးငါးကို အရင်ကြော်နေခြင်း"),
        t("Cook the squid until it starts to turn opaque before adding the vegetables.", "イカが白くなり始めるまで炒めてから野菜を加えます。", "ပြည်ကြီးငါး အဖြူရောင်ပြောင်းစပြုသည်အထိ ကြော်ပြီးမှ ဟင်းသီးဟင်းရွက်များ ထည့်ပါ။")),
      photo("assets/recipes/human-food/squid-vegetable-stir-fry-ingredients.jpg",
        t("Stir-fry ingredients in the refrigerator drawer", "冷蔵庫の引き出しにある炒め物の材料", "ရေခဲသေတ္တာအံဆွဲထဲရှိ အကြော်အတွက် ပါဝင်ပစ္စည်းများ"),
        t("Select suitable vegetables such as komatsuna (Xiao Pek Chye), cabbage, and shimeji mushrooms to cook with the squid.", "イカと一緒に調理する小松菜（Xiao Pek Chye）、キャベツ、しめじなどの適当な野菜を選びます。", "ပြည်ကြီးငါးနှင့်အတူချက်ရန် komatsuna (Xiao Pek Chye)၊ ဂေါ်ဖီထုပ်နှင့် shimeji မှိုကဲ့သို့သော သင့်လျော်သည့် ဟင်းသီးဟင်းရွက်များကို ရွေးချယ်ပါ။")),
      photo("assets/recipes/human-food/squid-vegetable-stir-fry-squid.jpg",
        t("Frozen squid (sotong) package before thawing", "解凍前の冷凍イカ（sotong）のパック", "အရည်မဖျော်မီ အေးခဲထားသော ပြည်ကြီးငါး (sotong) အထုပ်"),
        t("If the squid is frozen, thaw it in the refrigerator or in a sealed bag submerged in cold water.", "イカが冷凍の場合は、冷蔵庫で解凍するか、密閉袋に入れて冷水に浸して解凍します。", "ပြည်ကြီးငါး အေးခဲထားပါက refrigerator ထဲတွင် သို့မဟုတ် sealed bag ထဲထည့်၍ ရေအေးတွင်စိမ်ပြီး အရည်ဖျော်ပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Stir-fry", "炒め物", "ကြော်ဟင်း"),
      timeEstimate: t("20 mins plus thawing", "解凍時間＋20分", "အရည်ဖျော်ချိန် + မိနစ် ၂၀"),
      highProtein: true
    }
  ),
  recipe("prawn-mushroom-greens-rice-soup",
    t("Prawns with Mushroom, Greens & Sotong Stir-Fry", "海老ときのこ・青菜・イカの炒め物", "ပုစွန်နှင့် မှို၊ အရွက်စိမ်း၊ ပြည်ကြီးငါးကြော်"),
    [
      [t("Shell-on prawns", "殻付き海老", "အခွံပါ ပုစွန်"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "prawns"],
      [t("Sotong (squid)", "イカ", "ပြည်ကြီးငါး"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "squid"],
      [t("Shimeji mushrooms", "しめじ", "Shimeji မှို"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "shimeji-mushroom"],
      [t("Leafy greens such as spinach or xiao bai cai", "ほうれん草や小白菜などの葉物野菜", "ဟင်းနုနွယ် သို့မဟုတ် Xiao Bai Cai ကဲ့သို့ အရွက်စိမ်းဟင်းသီးဟင်းရွက်"), t("Amount not specified", "分量未指定", "ပမာဏ မဖော်ပြထားပါ"), "spinach"],
      [t("Cooking oil", "調理油", "ဟင်းချက်ဆီ"), t("a small amount", "少量", "အနည်းငယ်"), "oil"]
    ],
    [
      t("If the prawns or sotong are frozen, thaw them safely in the fridge before cooking.", "海老やイカが冷凍の場合は、調理前に冷蔵庫で安全に解凍します。", "ပုစွန် သို့မဟုတ် ပြည်ကြီးငါး အေးခဲထားပါက မချက်မီ ရေခဲသေတ္တာထဲတွင် ဘေးကင်းစွာ အရည်ဖျော်ပါ။"),
      t("Rinse the prawns and remove any visible vein while keeping the shells on.", "海老を洗い、殻を付けたまま見える背わたを取り除きます。", "ပုစွန်ကို ဆေးပြီး အခွံမခွာဘဲ မြင်ရသော အမည်းကြောင်းကို ဖယ်ပါ။"),
      t("Drain the sotong and pat it dry.", "イカの水気を切り、よく拭きます。", "ပြည်ကြီးငါးကို ရေစစ်ပြီး ခြောက်အောင် သုတ်ပါ။"),
      t("Trim the shimeji base and separate the mushrooms.", "しめじの根元を切り落とし、ほぐします。", "Shimeji မှိုအမြစ်ကို ဖြတ်ပြီး မှိုများကို ခွဲပါ။"),
      t("Wash and cut the leafy greens.", "葉物野菜を洗って切ります。", "အရွက်စိမ်းဟင်းသီးဟင်းရွက်ကို ဆေးပြီး လှီးပါ။"),
      t("Dry the mushrooms and leafy greens well.", "きのこと葉物野菜の水気をよく取ります。", "မှိုနှင့် အရွက်စိမ်းဟင်းသီးဟင်းရွက်များကို ရေခြောက်အောင် သုတ်ပါ။"),
      t("Pan-fry the prawns gently over medium heat until fully cooked and just firm.", "海老を中火のフライパンで、中まで完全に火が通り、ちょうど弾力が出るまでやさしく焼きます。", "ပုစွန်ကို မီးအလယ်အလတ်ဖြင့် ဒယ်အိုးထဲတွင် လုံးဝကျက်ကာ အသားတင်းရုံအထိ အသာအယာကြော်ပါ။"),
      t("Remove the prawns from the pan as soon as they are fully cooked.", "海老に完全に火が通ったら、すぐにフライパンから取り出します。", "ပုစွန်လုံးဝကျက်သည်နှင့် ဒယ်အိုးထဲမှ ချက်ချင်းထုတ်ပါ။"),
      t("Heat a small amount of oil in a wide frying pan over medium-high heat.", "広めのフライパンに少量の油を入れ、中火から強めの中火で熱します。", "ဒယ်အိုးကျယ်ထဲ ဆီအနည်းငယ်ထည့်ပြီး မီးအလယ်အလတ်မှ အနည်းငယ်ပြင်းပြင်းဖြင့် ပူအောင်လုပ်ပါ။"),
      t("Add the shimeji and stir-fry uncovered. Do not add water.", "しめじを加え、ふたをせずに炒めます。水は加えません。", "Shimeji မှိုကို ထည့်ပြီး အဖုံးမအုပ်ဘဲ ကြော်ပါ။ ရေမထည့်ပါနှင့်။"),
      t("Keep stir-frying until most of the liquid released by the mushrooms has evaporated.", "きのこから出た水分がほとんど蒸発するまで炒め続けます。", "မှိုမှထွက်လာသော ရေအများစု ခမ်းသွားသည်အထိ ဆက်ကြော်ပါ။"),
      t("Add the sotong and stir-fry until it begins to turn opaque.", "イカを加え、白くなり始めるまで炒めます。", "ပြည်ကြီးငါးကို ထည့်ပြီး အဖြူရောင်ပြောင်းစပြုသည်အထိ ကြော်ပါ။"),
      t("Add the leafy greens and stir-fry until the sotong is fully cooked and the greens are just tender.", "葉物野菜を加え、イカに完全に火が通り、青菜がちょうどやわらかくなるまで炒めます。", "အရွက်စိမ်းဟင်းသီးဟင်းရွက်ကို ထည့်ပြီး ပြည်ကြီးငါး လုံးဝကျက်ကာ ဟင်းသီးဟင်းရွက် နူးရုံအထိ ကြော်ပါ။"),
      t("Serve the mushroom, greens, and sotong stir-fry with the prawns.", "きのこ・青菜・イカの炒め物を海老と一緒に盛り付けます。", "မှို၊ အရွက်စိမ်းနှင့် ပြည်ကြီးငါးကြော်ကို ပုစွန်နှင့်အတူ တည်ခင်းပါ။")
    ],
    t("Edwin thinks the air fryer overcooked the prawns in the photo. The shells were very hard to peel, but the exact reason is not known. Next time, do not use the air fryer. Gently pan-fry the prawns and stop as soon as they are fully cooked; boiling them briefly for a different soup may also work better. The mushrooms release plenty of liquid, so do not add water to this stir-fry. Cook uncovered until most of the liquid evaporates.", "写真の海老はエアフライヤーで加熱しすぎたのではないかとエドウィンは考えています。殻がとてもむきにくくなりましたが、正確な原因は分かりません。次回はエアフライヤーを使いません。フライパンでやさしく焼き、中まで完全に火が通ったらすぐに加熱を止めます。別のスープに使うなら、短時間ゆでる方法もよさそうです。きのこから十分な水分が出るため、この炒め物には水を加えません。ふたをせず、水分がほとんど蒸発するまで炒めます。", "ပုံထဲက ပုစွန်တွေကို air fryer နှင့် အကျက်လွန်သွားတယ်လို့ Edwin ထင်တယ်။ အခွံခွာရတာ အရမ်းခက်ပေမယ့် ဘာကြောင့်လဲဆိုတာ အတိအကျ မသိပါ။ နောက်တစ်ခါ air fryer မသုံးပါနှင့်။ ဒယ်အိုးနှင့် အသာအယာကြော်ပြီး လုံးဝကျက်သည်နှင့် ချက်ချင်း မီးပိတ်ပါ။ အခြားဟင်းချိုတစ်မျိုးအတွက်ဆိုလျှင် ခဏပြုတ်တာ ပိုကောင်းနိုင်ပါတယ်။ မှိုမှ ရေအများကြီးထွက်သောကြောင့် ဒီအကြော်ထဲ ရေမထည့်ပါနှင့်။ အဖုံးမအုပ်ဘဲ ရေအများစု ခမ်းသွားသည်အထိ ကြော်ပါ။"),
    [
      photo("assets/recipes/human-food/prawn-mushroom-greens-stir-fry.jpg",
        t("Shell-on prawns with mushroom, greens, and sotong stir-fry", "殻付き海老と、きのこ・青菜・イカの炒め物", "အခွံပါပုစွန်နှင့် မှို၊ အရွက်စိမ်း၊ ပြည်ကြီးငါးကြော်"),
        t("The photographed meal has air-fried shell-on prawns beside a watery stir-fry of shimeji mushrooms, leafy greens, and sotong.", "写真の食事は、エアフライした殻付き海老と、水分が多く出たしめじ・青菜・イカの炒め物です。", "ပုံထဲက အစားအစာတွင် air fryer နှင့်ချက်ထားသော အခွံပါပုစွန်ကို ရေများထွက်နေသော Shimeji မှို၊ အရွက်စိမ်းနှင့် ပြည်ကြီးငါးကြော်ဘေးတွင် တည်ခင်းထားသည်။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Stir-fry", "炒め物", "ကြော်ဟင်း"),
      highProtein: true
    }
  ),
  recipe("braised-pork-tau-pok-eggs-no-onion",
    t("Braised Pork, Tau Pok & Eggs", "豚肉・厚揚げ・卵の醤油煮込み", "ဝက်သား၊ တိုဟူးကြော်နှင့် ကြက်ဥ ပဲငံပြာရည်နှပ်"),
    [
      [t("Cubed pork", "角切り豚肉", "အတုံးလေးများလှီးထားသော ဝက်သား"), t("as needed", "必要な量", "လိုအပ်သလောက်"), "pork"],
      [t("Garlic", "にんにく", "ကြက်သွန်ဖြူ"), t("3-4 cloves", "3〜4片", "၃-၄ မွှာ"), "garlic"],
      [t("Ginger", "生姜", "ဂျင်း"), t("3-4 slices", "3〜4枚", "၃-၄ ပြား"), "ginger"],
      [t("Onion", "玉ねぎ", "ကြက်သွန်နီ"), t("a small amount", "少量", "အနည်းငယ်"), "onion"],
      [t("Tau Pok", "厚揚げ（Tau Pok）", "တိုဟူးကြော် (Tau Pok)"), t("as needed", "必要な量", "လိုအပ်သလောက်"), "tau-pok"],
      [t("Boiled eggs", "ゆで卵", "ကြက်ဥပြုတ်"), t("about 5, adjusted to servings", "約5個、人数に合わせる", "၅ လုံးခန့်၊ စားမည့်လူအရေအတွက်အလိုက်"), "eggs"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), t("1 tablespoon", "大さじ1", "စားပွဲတင်ဇွန်း ၁ ဇွန်း"), "soy-sauce"],
      [t("Dark soy sauce, red-label bottle", "ダークソイソース（赤いラベル）", "dark soy sauce (အနီရောင် label)"), t("1 tablespoon", "大さじ1", "စားပွဲတင်ဇွန်း ၁ ဇွန်း"), "dark-soy-sauce"],
      [t("Garlic pepper", "ガーリックペッパー", "garlic pepper"), t("a small amount", "少量", "အနည်းငယ်"), "garlic-pepper"],
      [t("Cooking oil", "調理油", "ဟင်းချက်ဆီ"), t("a small amount", "少量", "အနည်းငယ်"), "oil"],
      [t("Water", "水", "ရေ"), t("enough to half-cover the ingredients", "材料が半分浸かる量", "ပါဝင်ပစ္စည်းများ တစ်ဝက်ခန့်မြုပ်ရန်"), "water"]
    ],
    [
      t("If the pork is frozen, thaw it safely before cooking.", "豚肉が冷凍の場合は、安全に解凍してから調理します。", "ဝက်သားအေးခဲထားပါက ဘေးကင်းစွာ အရည်ဖျော်ပြီးမှ ချက်ပါ။"),
      t("Heat a small amount of oil in a frying pan. Sauté the garlic, ginger, and onion until fragrant.", "フライパンに少量の油を熱し、にんにく、生姜、玉ねぎを香りが出るまで炒めます。", "ဒယ်အိုးထဲတွင် ဆီအနည်းငယ်ပူအောင်လုပ်ပြီး ကြက်သွန်ဖြူ၊ ဂျင်းနှင့် ကြက်သွန်နီကို မွှေးလာသည်အထိ ကြော်ပါ။"),
      t("Add the pork and cook until the outside is lightly browned.", "豚肉を加え、表面に軽く焼き色が付くまで炒めます。", "ဝက်သားထည့်ပြီး အပြင်ဘက် အနည်းငယ်ညိုလာသည်အထိ ကြော်ပါ။"),
      t("Add 1 tablespoon soy sauce, 1 tablespoon red-label dark soy sauce, and a little garlic pepper. Mix well.", "醤油大さじ1、赤いラベルのダークソイソース大さじ1、ガーリックペッパー少々を加えてよく混ぜます。", "ပဲငံပြာရည် ၁ ဇွန်း၊ အနီရောင် label ပါသော dark soy sauce ၁ ဇွန်းနှင့် garlic pepper အနည်းငယ်ထည့်ပြီး ကောင်းကောင်းရောပါ။"),
      t("Add the Tau Pok and boiled eggs, then add enough water to cover about half of the ingredients.", "厚揚げとゆで卵を加え、材料が半分くらい浸かるまで水を入れます。", "Tau Pok နှင့် ကြက်ဥပြုတ်ထည့်ပြီး ပါဝင်ပစ္စည်းများ တစ်ဝက်ခန့်မြုပ်သည်အထိ ရေထည့်ပါ။"),
      t("Transfer to a pot and simmer gently over low to medium heat for about 45 minutes. Add water before the pot dries out.", "鍋へ移し、弱火〜中火で約45分ゆっくり煮込みます。鍋が乾く前に水を足してください。", "အိုးထဲပြောင်းပြီး မီးအေးမှ မီးအလယ်အလတ်ဖြင့် ၄၅ မိနစ်ခန့် ဖြည်းဖြည်းတည်ပါ။ အိုးမခြောက်မီ ရေထပ်ထည့်ပါ။"),
      t("Make sure the pork is fully cooked before serving.", "提供前に豚肉へ完全に火が通っていることを確認します。", "မပေးမီ ဝက်သား လုံးဝကျက်ကြောင်း စစ်ပါ။")
    ],
    t("Everyone's favorite recipe. Onion is required in this human-only recipe. Never feed this dish to Nako. Use the red-label bottle for dark soy sauce, keep the simmer gentle, and adjust the boiled eggs to the number of servings.", "みんなのお気に入りレシピです。この人用レシピには玉ねぎが必要です。この料理は絶対にナコへ与えないでください。ダークソイソースは赤いラベルのボトルを使い、弱めの火で煮込み、ゆで卵は人数に合わせます。", "လူတိုင်းအကြိုက်ဆုံး ဟင်းချက်နည်းဖြစ်သည်။ လူစားရန်သာဖြစ်သော ဤဟင်းတွင် ကြက်သွန်နီ မဖြစ်မနေထည့်ရမည်။ ဤဟင်းကို Nako ကို လုံးဝမကျွေးပါနှင့်။ dark soy sauce အတွက် အနီရောင် label ပါသောပုလင်းကိုသုံးပြီး မီးအေးအေးဖြင့်တည်ကာ ကြက်ဥပြုတ်ကို စားမည့်လူအရေအတွက်အလိုက် ချိန်ညှိပါ။"),
    [
      photo("assets/recipes/human-food/braised-pork-simmering.jpg",
        t("Simmering braised pork with Tau Pok and eggs", "厚揚げと卵入りの豚の醤油煮込みを煮る", "တိုဟူးကြော်နှင့် ကြက်ဥပါသော ဝက်သားပဲငံပြာရည်နှပ်ကို ချက်ခြင်း"),
        t("Simmer gently over low to medium heat for about 45 minutes, adding water as needed.", "弱火〜中火で約45分ゆっくり煮込み、必要に応じて水を足します。", "မီးအေးအေးမှ မီးအလယ်အလတ်ဖြင့် ၄၅ မိနစ်ခန့် ဖြည်းဖြည်းတည်ပြီး လိုအပ်ပါက ရေထည့်ပါ။")),
      photo("assets/recipes/human-food/braised-pork-ingredients.jpg",
        t("Garlic, ginger, onion, and pork in frying pan", "フライパンに入れたにんにく、生姜、玉ねぎ、豚肉", "ဒယ်အိုးထဲရှိ ကြက်သွန်ဖြူ၊ ဂျင်း၊ ကြက်သွန်နီနှင့် ဝက်သား"),
        t("Sauté the required onion with the garlic, ginger, and pork in the pan.", "必要な玉ねぎを、にんにく、生姜、豚肉と一緒にフライパンで炒めます。", "မဖြစ်မနေထည့်ရသော ကြက်သွန်နီကို ကြက်သွန်ဖြူ၊ ဂျင်းနှင့် ဝက်သားတို့နှင့်အတူ ဒယ်အိုးထဲတွင် လှော်ပါ။")),
      photo("assets/recipes/human-food/braised-pork-sauting.jpg",
        t("Sautéing cubed pork belly in the frying pan", "フライパンで角切りの豚バラ肉を炒める", "ဒယ်အိုးထဲတွင် ဝက်သုံးထပ်သားတုံးများကို လှော်ခြင်း"),
        t("Cook the cubed pork belly until the outside is lightly browned.", "角切りの豚バラ肉の表面に軽く焼き色が付くまで炒めます。", "ဝက်သုံးထပ်သားတုံးများ အပြင်ဘက် အနည်းငယ်ညိုလာသည်အထိ ကြော်ပါ။")),
      photo("assets/recipes/human-food/braised-pork-soy-sauce.jpg",
        t("Adding one tablespoon of light soy sauce", "醤油を大さじ1加える", "ပဲငံပြာရည် စားပွဲတင်ဇွန်း ၁ ဇွန်းထည့်ခြင်း"),
        t("Measure and pour one tablespoon of light soy sauce into the pork mix.", "醤油大さじ1を測って豚肉の炒め物に加えます。", "ပဲငံပြာရည် စားပွဲတင်ဇွန်း ၁ ဇွန်းကို ချိန်ပြီး ဝက်သားထဲ ထည့်ပါ။")),
      photo("assets/recipes/human-food/braised-pork-dark-soy-sauce.jpg",
        t("Adding dark soy sauce from the red-label bottle", "赤いラベルのボトルからダークソイソースを加える", "အနီရောင် label ပုလင်းမှ dark soy sauce ထည့်ခြင်း"),
        t("Pour one tablespoon of dark soy sauce (using the red-label Golden Swan Brand bottle).", "赤いラベル（ゴールデンスワンブランド）のダークソイソース大さじ1を加えます。", "အနီရောင် label ပါသော Golden Swan Brand ပုလင်းမှ dark soy sauce စားပွဲတင်ဇွန်း ၁ ဇွန်းထည့်ပါ။")),
      photo("assets/recipes/human-food/braised-pork-garlic-pepper.jpg",
        t("Sprinkling a little garlic pepper spice blend", "ガーリックペッパーを少量振りかける", "garlic pepper အနည်းငယ် ဖြူးခြင်း"),
        t("Sprinkle a small amount of MasterFoods Garlic Pepper Spice Blend over the meat and mix well.", "MasterFoodsのガーリックペッパーを少量振りかけ、よく混ぜ合わせます。", "MasterFoods garlic pepper အနည်းငယ်ကို အသားပေါ် ဖြူးပြီး ကောင်းကောင်းမွှေပါ။"))
    ],
    "human",
    {
      shareSlug: "braised-pork-tau-pok-eggs",
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Braised", "煮込み", "နှပ်ဟင်း"),
      timeEstimate: t("60 mins", "60分", "မိနစ် ၆၀"),
      highProtein: true
    }
  ),
  recipe("salt-garlic-pepper-pork-shoulder",
    t("Salt and Garlic Pepper Pork Shoulders", "塩ガーリックペッパー豚肩肉", "ဆား၊ ကြက်သွန်ဖြူငရုတ်ကောင်းနဲ့ ဝက်ပခုံးသား"),
    [
      [t("Pork shoulder butt", "豚肩ロース", "ဝက်ပခုံးသား"), t("2 slices", "2枚", "၂ ချပ်"), "pork-shoulder"],
      [t("Salt", "塩", "ဆား"), t("as needed", "適量", "လိုအပ်သလို"), "salt"],
      [t("Garlic pepper", "ガーリックペッパー", "ကြက်သွန်ဖြူငရုတ်ကောင်းမှုန့်"), t("as needed", "適量", "လိုအပ်သလို"), "garlic-pepper"]
    ],
    [
      t("Buy 2 pork shoulder butt slices from Cut Butchery at Bukit Timah Plaza. The price is about $2.20 per 100 g; the photo shows only 1 slice.", "Bukit Timah PlazaのCut Butcheryで豚肩ロースを2枚買う。価格は100 gあたり約$2.20で、写真には1枚だけ写っている。", "Bukit Timah Plaza ရှိ Cut Butchery မှ ဝက်ပခုံးသား ၂ ချပ် ဝယ်ပါ။ 100 g လျှင် $2.20 ခန့်ဖြစ်ပြီး ပုံထဲတွင် ၁ ချပ်သာ ပြထားသည်။"),
      t("Put both slices directly in the air-fryer basket.", "2枚ともエアフライヤーのバスケットに直接入れる。", "ဝက်သား ၂ ချပ်လုံးကို air-fryer basket ထဲ တိုက်ရိုက်ထည့်ပါ။"),
      t("Season the top with salt and garlic pepper.", "上面に塩とガーリックペッパーを振る。", "အပေါ်ဘက်ကို ဆားနဲ့ ကြက်သွန်ဖြူငရုတ်ကောင်းမှုန့် ဖြူးပါ။"),
      t("Air-fry at 200°C for 6 min.", "200℃で6分エアフライする。", "200°C ဖြင့် ၆ မိနစ် air fry လုပ်ပါ။"),
      t("Flip the pork and season the other side.", "豚肉を裏返し、反対側にも味付けする。", "ဝက်သားကိုလှန်ပြီး အခြားတစ်ဖက်ကို ဟင်းခတ်ပါ။"),
      t("Air-fry at 200°C for another 6 min.", "200℃でもう6分エアフライする。", "200°C ဖြင့် နောက်ထပ် ၆ မိနစ် air fry လုပ်ပါ။"),
      t("Check the thickest part reaches at least 71°C; add time for thicker slices.", "最も厚い部分が71℃以上になっていることを確認し、厚い場合は加熱時間を延ばす。", "အထူဆုံးနေရာ 71°C အနည်းဆုံး ရောက်ကြောင်း စစ်ပါ။ အသားထူလျှင် အချိန်ထပ်တိုးပါ။"),
      t("Rest for 5 min, then slice.", "5分休ませてから切る。", "၅ မိနစ်ထားပြီးမှ လှီးပါ။")
    ],
    t("12 min is a guide; adjust for the thickness. Resting lets the pork continue cooking inside, but check it is safely cooked before resting.", "合計12分は目安です。厚さに合わせて調整してください。休ませている間も余熱で中まで火が通りますが、休ませる前に安全に加熱できていることを確認してください。", "စုစုပေါင်း ၁၂ မိနစ်သည် ခန့်မှန်းချိန်သာဖြစ်သည်။ အသားအထူအလိုက် ချိန်ညှိပါ။ နားထားချိန်တွင် အတွင်းပိုင်း ဆက်ကျက်မည်ဖြစ်သော်လည်း မနားထားမီ လုံခြုံစွာကျက်ကြောင်း စစ်ပါ။"),
    [
      photo("assets/recipes/human-food/salt-garlic-pepper-pork-shoulder-sliced.jpg",
        t("Sliced salt and garlic pepper pork shoulder", "切り分けた塩ガーリックペッパー豚肩肉", "လှီးထားသော ဆားနဲ့ ကြက်သွန်ဖြူငရုတ်ကောင်း ဝက်ပခုံးသား"),
        t("Rest the pork for 5 min, then slice it.", "豚肉を5分休ませてから切る。", "ဝက်သားကို ၅ မိနစ်ထားပြီးမှ လှီးပါ။")),
      photo("assets/recipes/human-food/salt-garlic-pepper-pork-shoulder-purchase.jpg",
        t("Pork shoulder butt from Cut Butchery", "Cut Butcheryの豚肩ロース", "Cut Butchery မှ ဝက်ပခုံးသား"),
        t("Buy 2 slices at Cut Butchery, Bukit Timah Plaza. The photo shows 1 slice.", "Bukit Timah PlazaのCut Butcheryで2枚買う。写真には1枚だけ写っている。", "Bukit Timah Plaza ရှိ Cut Butchery မှ ၂ ချပ်ဝယ်ပါ။ ပုံထဲတွင် ၁ ချပ်သာ ပြထားသည်။")),
      photo("assets/recipes/human-food/salt-garlic-pepper-pork-shoulder-seasoning.jpg",
        t("Salt and garlic pepper beside the raw pork", "生の豚肉と塩、ガーリックペッパー", "ဝက်သားအစိမ်းဘေးရှိ ဆားနဲ့ ကြက်သွန်ဖြူငရုတ်ကောင်းမှုန့်"),
        t("Put the pork directly in the basket and season the top.", "豚肉をバスケットに直接入れ、上面に味付けする。", "ဝက်သားကို basket ထဲ တိုက်ရိုက်ထည့်ပြီး အပေါ်ဘက် ဟင်းခတ်ပါ။")),
      photo("assets/recipes/human-food/salt-garlic-pepper-pork-shoulder-first-side.png",
        t("Pork after cooking the first side", "片面を加熱した豚肉", "ပထမတစ်ဖက်ချက်ပြီးသော ဝက်သား"),
        t("Air-fry the first side at 200°C for 6 min.", "片面を200℃で6分エアフライする。", "ပထမတစ်ဖက်ကို 200°C ဖြင့် ၆ မိနစ် air fry လုပ်ပါ။")),
      photo("assets/recipes/human-food/salt-garlic-pepper-pork-shoulder-flip.jpg",
        t("Flipping the pork in the air fryer", "エアフライヤーで豚肉を裏返す", "air fryer ထဲတွင် ဝက်သားလှန်ခြင်း"),
        t("Flip the pork and season the other side.", "豚肉を裏返し、反対側にも味付けする。", "ဝက်သားကိုလှန်ပြီး အခြားတစ်ဖက်ကို ဟင်းခတ်ပါ။")),
      photo("assets/recipes/human-food/salt-garlic-pepper-pork-shoulder-finished.jpg",
        t("Cooked pork shoulder in the air fryer", "エアフライヤーで焼いた豚肩肉", "air fryer ထဲတွင်ချက်ပြီးသော ဝက်ပခုံးသား"),
        t("Cook the second side at 200°C for 6 min, adjusting for thickness.", "反対側を200℃で6分加熱し、厚さに合わせて調整する。", "အခြားတစ်ဖက်ကို 200°C ဖြင့် ၆ မိနစ်ချက်ပြီး အသားအထူအလိုက် ချိန်ညှိပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Air Fryer", "エアフライヤー", "လေပူကြော်စက်"),
      timeEstimate: t("17 mins", "17分", "၁၇ မိနစ်"),
      highProtein: true
    }
  ),
  recipe("matcha-milk-manuka-honey",
    t("Matcha Milk with Manuka Honey", "マヌカハニー抹茶ミルク", "Manuka ပျားရည် မတ်ချာနို့"),
    [
      [t("Matcha powder", "抹茶", "မတ်ချာမှုန့်"), t("2 g", "2グラム", "၂ ဂရမ်"), "matcha"],
      [t("Milk", "牛乳", "နို့"), t("200 ml", "200ミリリットル", "၂၀၀ မီလီလီတာ"), "milk"],
      [t("Manuka honey", "マヌカハニー", "Manuka ပျားရည်"), t("to taste", "お好みで", "အရသာအလိုက်"), "honey"]
    ],
    [
      t("Weigh 2 g of matcha powder.", "抹茶を2 g量る。", "မတ်ချာမှုန့် 2 g ချိန်ပါ။"),
      t("Put the matcha in a glass and add a small splash of milk.", "抹茶をグラスに入れ、牛乳を少量加える。", "မတ်ချာမှုန့်ကို ဖန်ခွက်ထဲထည့်ပြီး နို့နည်းနည်းထည့်ပါ။"),
      t("Stir until smooth with no lumps.", "ダマがなくなるまでなめらかに混ぜる。", "အဖုမရှိအောင် ချောမွေ့သည်အထိ မွှေပါ။"),
      t("Add the remaining milk.", "残りの牛乳を加える。", "ကျန်နို့ကို ထည့်ပါ။"),
      t("Add Manuka honey to taste and stir well.", "好みの量のマヌカハニーを加え、よく混ぜる。", "Manuka ပျားရည်ကို အရသာအလိုက်ထည့်ပြီး ကောင်းကောင်းမွှေပါ။")
    ],
    t("Mix the matcha with a little milk first so it does not form lumps.", "抹茶がダマにならないよう、最初に少量の牛乳で混ぜてください。", "မတ်ချာမှုန့် အဖုမဖြစ်အောင် နို့နည်းနည်းနဲ့ အရင်မွှေပါ။"),
    [
      photo("assets/recipes/human-food/matcha-milk-manuka-honey.jpg",
        t("Matcha milk with matcha powder, milk, and Manuka honey", "抹茶、牛乳、マヌカハニーで作った抹茶ミルク", "မတ်ချာမှုန့်၊ နို့နဲ့ Manuka ပျားရည်ဖြင့် ဖျော်ထားသော မတ်ချာနို့"),
        t("Use matcha powder, milk, and Manuka honey for this drink.", "このドリンクには抹茶、牛乳、マヌカハニーを使う。", "ဤသောက်စရာအတွက် မတ်ချာမှုန့်၊ နို့နဲ့ Manuka ပျားရည်ကို သုံးပါ။"))
    ],
    "human",
    {
      mealType: t("Drink", "飲み物", "သောက်စရာ"),
      style: t("Quick", "簡単", "လွယ်ကူသော"),
      timeEstimate: t("3 mins", "3分", "၃ မိနစ်"),
      highProtein: false
    }
  ),
  recipe("apple-ginger-pork-loin-enoki",
    t("Apple-Ginger Pork Loin with Enoki", "りんご生姜だれの豚ロースとえのき", "ပန်းသီးချင်းဆော့စ် ဝက်ခါးသားနဲ့ enoki မှို"),
    [
      [t("Thick-cut pork loin chops", "厚切り豚ロース", "ဝက်ခါးသားအထူ"), t("2 chops", "2枚", "၂ ချပ်"), "pork-loin"],
      [t("Apple", "りんご", "ပန်းသီး"), t("1/2 apple", "1/2個", "ပန်းသီး တစ်ဝက်"), "apple"],
      [t("Enoki mushrooms", "えのき", "enoki မှို"), t("1/2 pack", "1/2袋", "အထုပ်တစ်ဝက်"), "enoki-mushroom"],
      [t("Ginger", "生姜", "ချင်း"), t("about a 2 cm piece", "約2 cm分", "2 cm ခန့် တစ်တုံး"), "ginger"],
      [t("Garlic", "にんにく", "ကြက်သွန်ဖြူ"), t("1 clove", "1片", "၁ မွှာ"), "garlic"],
      [t("Potato starch", "片栗粉", "အာလူးကော်မှုန့်"), t("2 tbsp", "大さじ2", "စားပွဲတင်ဇွန်း ၂ ဇွန်း"), "potato-starch"],
      [t("Dashi soy sauce", "だし醤油", "dashi ပဲငံပြာရည်"), t("2 tbsp", "大さじ2", "စားပွဲတင်ဇွန်း ၂ ဇွန်း"), "dashi-soy-sauce"],
      [t("Cooking sake", "料理酒", "ချက်ပြုတ်ဆာကေး"), t("2 tbsp", "大さじ2", "စားပွဲတင်ဇွန်း ၂ ဇွန်း"), "cooking-sake"],
      [t("Manuka honey", "マヌカハニー", "Manuka ပျားရည်"), t("1 tbsp", "大さじ1", "စားပွဲတင်ဇွန်း ၁ ဇွန်း"), "honey"],
      [t("Sesame oil", "ごま油", "နှမ်းဆီ"), t("1 tsp", "小さじ1", "လက်ဖက်ရည်ဇွန်း ၁ ဇွန်း"), "sesame-oil"],
      [t("Water", "水", "ရေ"), t("100 ml", "100ミリリットル", "၁၀၀ မီလီလီတာ"), "water"],
      [t("Olive oil", "オリーブオイル", "သံလွင်ဆီ"), t("1 tsp", "小さじ1", "လက်ဖက်ရည်ဇွန်း ၁ ဇွန်း"), "oil"]
    ],
    [
      t("Remove the apple core and seeds. Grate 1/4 apple and cut the other 1/4 into wedges.", "りんごの芯と種を取り除く。1/4個はすりおろし、残りの1/4個はくし形に切る。", "ပန်းသီးအူတိုင်နဲ့ အစေ့ကို ဖယ်ပါ။ ပန်းသီး 1/4 ကို ခြစ်ပြီး ကျန် 1/4 ကို အစိတ်များ လှီးပါ။"),
      t("Peel and grate the ginger and garlic.", "生姜とにんにくの皮をむき、すりおろす。", "ချင်းနဲ့ ကြက်သွန်ဖြူကို အခွံခွာပြီး ခြစ်ပါ။"),
      t("Mix the grated apple, ginger, garlic, dashi soy sauce, cooking sake, honey, sesame oil, and water.", "すりおろしたりんご、生姜、にんにく、だし醤油、料理酒、はちみつ、ごま油、水を混ぜる。", "ခြစ်ထားသော ပန်းသီး၊ ချင်း၊ ကြက်သွန်ဖြူ၊ dashi ပဲငံပြာရည်၊ ချက်ပြုတ်ဆာကေး၊ ပျားရည်၊ နှမ်းဆီနဲ့ ရေကို ရောပါ။"),
      t("Trim the enoki base and separate the mushrooms.", "えのきの根元を切り落とし、ほぐす。", "enoki မှိုအမြစ်ကို ဖြတ်ပြီး မှိုများကို ခွဲပါ။"),
      t("Coat both sides of the pork with potato starch.", "豚肉の両面に片栗粉をまぶす。", "ဝက်သားနှစ်ဖက်လုံးကို အာလူးကော်မှုန့် ကပ်ပါ။"),
      t("Heat the olive oil over medium heat and sear the pork for 2-3 min per side.", "オリーブオイルを中火で熱し、豚肉を片面2〜3分ずつ焼く。", "သံလွင်ဆီကို မီးအလယ်အလတ်ဖြင့် အပူပေးပြီး ဝက်သားတစ်ဖက်စီကို ၂-၃ မိနစ် ကင်ပါ။"),
      t("Add the sauce, apple wedges, and enoki. Simmer for 5-8 min, turning the pork once.", "たれ、りんご、えのきを加える。豚肉を一度返しながら5〜8分煮る。", "ဆော့စ်၊ ပန်းသီးအစိတ်များနဲ့ enoki မှိုကို ထည့်ပါ။ ဝက်သားကို တစ်ကြိမ်လှန်ပြီး ၅-၈ မိနစ် တည်ပါ။"),
      t("Check the thickest part of the pork reaches at least 71°C before serving.", "提供前に、豚肉の最も厚い部分が71℃以上になっていることを確認する。", "မစားမီ ဝက်သားအထူဆုံးနေရာ 71°C အနည်းဆုံး ရောက်ကြောင်း စစ်ပါ။")
    ],
    t("The photos show the ingredients and cooking order, but not exact measurements. Use these amounts as a starting point and adjust the sauce to taste. Do not add onion.", "写真で材料と手順は確認できますが、正確な分量は写っていません。この分量を目安に、たれは好みに合わせて調整してください。玉ねぎは入れません。", "ပုံများတွင် ပါဝင်ပစ္စည်းနဲ့ ချက်သည့်အစဉ်ကို မြင်ရသော်လည်း ပမာဏအတိအကျ မပါပါ။ ဤပမာဏများကို အစအဖြစ်သုံးပြီး ဆော့စ်ကို အရသာအလိုက် ချိန်ညှိပါ။ ကြက်သွန်နီ မထည့်ပါနှင့်။"),
    [
      photo("assets/recipes/human-food/apple-ginger-pork-loin-enoki-finished.jpg",
        t("Apple-ginger pork loin and enoki simmering in the pan", "フライパンで煮ているりんご生姜だれの豚ロースとえのき", "ဒယ်အိုးထဲတွင် တည်နေသော ပန်းသီးချင်းဆော့စ် ဝက်ခါးသားနဲ့ enoki မှို"),
        t("Simmer the pork, apple wedges, and enoki in the sauce until the pork is safely cooked.", "豚肉、りんご、えのきをたれで煮て、豚肉に安全に火を通す。", "ဝက်သား၊ ပန်းသီးအစိတ်များနဲ့ enoki မှိုကို ဆော့စ်ထဲတွင် ဝက်သားလုံခြုံစွာကျက်သည်အထိ တည်ပါ။")),
      photo("assets/recipes/human-food/apple-ginger-pork-loin-enoki-ingredients.jpg",
        t("Pork loin, apple, ginger, garlic, sauces, and honey", "豚ロース、りんご、生姜、にんにく、調味料、はちみつ", "ဝက်ခါးသား၊ ပန်းသီး၊ ချင်း၊ ကြက်သွန်ဖြူ၊ ဟင်းခတ်ရည်များနဲ့ ပျားရည်"),
        t("Prepare 2 pork chops and the sauce ingredients; the enoki is shown in a later photo.", "豚ロース2枚とたれの材料を用意する。えのきは後の写真に写っています。", "ဝက်သား ၂ ချပ်နဲ့ ဆော့စ်ပါဝင်ပစ္စည်းများ ပြင်ပါ။ enoki မှိုကို နောက်ပုံတွင် ပြထားသည်။")),
      photo("assets/recipes/human-food/apple-ginger-pork-loin-enoki-prep.jpg",
        t("Apple, ginger, and garlic ready to grate", "すりおろす前のりんご、生姜、にんにく", "ခြစ်ရန်အဆင်သင့် ပန်းသီး၊ ချင်းနဲ့ ကြက်သွန်ဖြူ"),
        t("Peel the ginger and garlic, then prepare the apple with its core and seeds removed.", "生姜とにんにくの皮をむき、芯と種を取ったりんごを用意する。", "ချင်းနဲ့ ကြက်သွန်ဖြူကို အခွံခွာပြီး အူတိုင်နဲ့ အစေ့ဖယ်ထားသော ပန်းသီးကို ပြင်ပါ။")),
      photo("assets/recipes/human-food/apple-ginger-pork-loin-enoki-grating.jpg",
        t("Grating the apple, ginger, and garlic", "りんご、生姜、にんにくをすりおろす", "ပန်းသီး၊ ချင်းနဲ့ ကြက်သွန်ဖြူကို ခြစ်ခြင်း"),
        t("Grate the apple, ginger, and garlic for the sauce.", "たれ用にりんご、生姜、にんにくをすりおろす。", "ဆော့စ်အတွက် ပန်းသီး၊ ချင်းနဲ့ ကြက်သွန်ဖြူကို ခြစ်ပါ။")),
      photo("assets/recipes/human-food/apple-ginger-pork-loin-enoki-starch-sauce.jpg",
        t("Pork coated with starch beside the sauce and enoki", "片栗粉をまぶした豚肉とたれ、えのき", "အာလူးကော်မှုန့်ကပ်ထားသော ဝက်သား၊ ဆော့စ်နဲ့ enoki မှို"),
        t("Coat the pork, mix the sauce, and separate the enoki before cooking.", "豚肉に片栗粉をまぶし、たれを混ぜ、えのきをほぐしてから焼く。", "မချက်မီ ဝက်သားကို အာလူးကော်မှုန့်ကပ်၊ ဆော့စ်ရောပြီး enoki မှိုကို ခွဲပါ။")),
      photo("assets/recipes/human-food/apple-ginger-pork-loin-enoki-searing.jpg",
        t("Searing the pork loin in olive oil", "オリーブオイルで豚ロースを焼く", "သံလွင်ဆီဖြင့် ဝက်ခါးသားကင်ခြင်း"),
        t("Sear both sides of the pork before adding the sauce, apple, and enoki.", "たれ、りんご、えのきを加える前に豚肉の両面を焼く。", "ဆော့စ်၊ ပန်းသီးနဲ့ enoki မှိုမထည့်မီ ဝက်သားနှစ်ဖက်လုံးကို ကင်ပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Japanese", "和風", "ဂျပန်စတိုင်"),
      timeEstimate: t("25 mins", "25分", "၂၅ မိနစ်"),
      highProtein: true
    }
  ),
  recipe("bak-kut-teh",
    t("Bak Kut Teh", "バクテー", "Bak Kut Teh (ဝက်နံရိုးစွပ်ပြုတ်)"),
    [
      [t("Pork spare ribs", "豚スペアリブ", "ဝက်နံရိုး"), t("2 ribs", "2本", "ဝက်နံရိုး ၂ ချောင်း"), "pork-ribs"],
      [t("Bak Kut Teh spice sachet", "バクテー用スパイス小袋", "Bak Kut Teh ဟင်းခတ်အထုပ်"), t("1 sachet", "1袋", "၁ ထုပ်"), "bak-kut-teh-spices"],
      [t("Garlic cloves", "にんにく", "ကြက်သွန်ဖြူ"), t("a few cloves", "数片", "အနည်းငယ်"), "garlic"],
      [t("Water", "水", "ရေ"), t("8 bowls", "8杯", "၈ ပန်းကန်"), "water"],
      [t("Dark soy sauce", "濃口醤油", "ပဲငံပြာရည်အမည်း"), t("to taste", "お好みで", "အရသာအလိုက်"), "dark-soy-sauce"]
    ],
    [
      t("Put 1 sachet of Bak Kut Teh spices, 2 pork ribs, a few garlic cloves, and 8 bowls of water into a pot.", "鍋にバクテー用スパイス1袋、豚スペアリブ2本、にんにく数片、水8杯を入れる。", "အိုးထဲသို့ Bak Kut Teh ဟင်းခတ်အထုပ် ၁ ထုပ်၊ ဝက်နံရိုး ၂ ချောင်း၊ ကြက်သွန်ဖြူအနည်းငယ်နှင့် ရေ ၈ ပန်းကန်ထည့်ပါ။"),
      t("Bring it to a boil, then keep boiling for 45 minutes.", "沸騰させてから、45分間煮る。", "ဆူအောင်တည်ပြီးနောက် ၄၅ မိနစ် ဆက်တည်ပါ။"),
      t("Check that the pork is fully cooked and tender.", "豚肉に完全に火が通り、柔らかくなっていることを確認する。", "ဝက်သားသည် လုံးဝကျက်ပြီး နူးနေကြောင်း စစ်ပါ။"),
      t("Add dark soy sauce to taste, then serve hot.", "好みで濃口醤油を加え、温かいうちに提供する。", "အရသာအလိုက် ပဲငံပြာရည်အမည်းထည့်ပြီး ပူပူနွေးနွေးပေးပါ။")
    ],
    t("Use the packet directions: 1 sachet with 2 pork ribs, a few garlic cloves, and 8 bowls of water. Pork must be fully cooked before serving.", "パッケージの手順に従う：スパイス1袋に豚スペアリブ2本、にんにく数片、水8杯を使う。提供前に豚肉に完全に火が通っていることを確認する。", "အထုပ်ပါညွှန်ကြားချက်ကိုလိုက်နာပါ - ဟင်းခတ်အထုပ် ၁ ထုပ်အတွက် ဝက်နံရိုး ၂ ချောင်း၊ ကြက်သွန်ဖြူအနည်းငယ်နှင့် ရေ ၈ ပန်းကန်သုံးပါ။ မပေးမီ ဝက်သားလုံးဝကျက်ကြောင်း စစ်ပါ။"),
    [
      photo("assets/recipes/human-food/bak-kut-teh-served.jpg",
        t("Bak Kut Teh ready to serve", "提供準備ができたバクテー", "ပေးရန်အဆင်သင့်ဖြစ်သော Bak Kut Teh"),
        t("Serve the hot soup after the pork is fully cooked; add dark soy sauce to taste.", "豚肉に完全に火が通ったら、好みで濃口醤油を加えて温かいうちに提供する。", "ဝက်သားလုံးဝကျက်ပြီးနောက် အရသာအလိုက် ပဲငံပြာရည်အမည်းထည့်ကာ ပူပူနွေးနွေးပေးပါ။")),
      photo("assets/recipes/human-food/bak-kut-teh-spice-pack.jpg",
        t("Bak Kut Teh spice packet", "バクテー用スパイスのパケット", "Bak Kut Teh ဟင်းခတ်အထုပ်"),
        t("Use one sachet of this Bak Kut Teh spice mix.", "このバクテー用スパイスミックスを1袋使う。", "ဤ Bak Kut Teh ဟင်းခတ်အရော ၁ ထုပ်ကိုသုံးပါ။")),
      photo("assets/recipes/human-food/bak-kut-teh-simmering.jpg",
        t("Pork ribs cooking in the pot", "鍋で煮込んでいる豚スペアリブ", "အိုးထဲတွင်တည်နေသော ဝက်နံရိုး"),
        t("Bring the pork ribs, spices, garlic, and water to a boil, then cook for 45 minutes.", "豚スペアリブ、スパイス、にんにく、水を沸騰させてから45分煮る。", "ဝက်နံရိုး၊ ဟင်းခတ်၊ ကြက်သွန်ဖြူနှင့်ရေကို ဆူအောင်တည်ပြီးနောက် ၄၅ မိနစ်တည်ပါ။")),
      photo("assets/recipes/human-food/bak-kut-teh-wet-market-cuts.jpg",
        t("Wet-market pork cuts marked for Pai Gu and Bak Kut Teh", "排骨用とバクテー用に印を付けた市場の豚肉", "Pai Gu နှင့် Bak Kut Teh အတွက် အမှတ်အသားပြထားသော စျေးမှ ဝက်သားအပိုင်းများ"),
        t("Use the section marked ‘Bak Kut Teh’ when buying pork ribs for this recipe. Ask the butcher if unsure.", "このレシピの豚スペアリブを買う時は「Bak Kut Teh」と印を付けた部分を選び、不明な場合は肉屋に確認します。", "ဤဟင်းအတွက် ဝက်နံရိုးဝယ်သည့်အခါ ‘Bak Kut Teh’ ဟု အမှတ်အသားပြထားသော အပိုင်းကို ရွေးပါ။ မသေချာပါက အသားဆိုင်ကို မေးပါ။")),
      photo("assets/recipes/human-food/bak-kut-teh-market-stall-landmark.jpg",
        t("Marked wet-market stall landmark", "印を付けた市場の売り場の目印", "အမှတ်အသားပြထားသော စျေးဆိုင်နေရာအညွှန်း"),
        t("Use the marked stall as a landmark when looking for the Bak Kut Teh ingredients.", "バクテーの材料を探す時は、印を付けた売り場を目印にします。", "Bak Kut Teh ပါဝင်ပစ္စည်းများ ရှာသည့်အခါ အမှတ်အသားပြထားသော ဆိုင်ကို နေရာအညွှန်းအဖြစ် သုံးပါ။")),
      photo("assets/recipes/human-food/bak-kut-teh-spice-sachet-vendor.jpg",
        t("Red Bak Kut Teh spice sachet at the wet-market counter", "市場の売り場にある赤いバクテー用スパイス袋", "စျေးဆိုင်ကောင်တာရှိ အနီရောင် Bak Kut Teh ဟင်းခတ်အထုပ်"),
        t("Buy one sachet matching this red packet. Show the photo to the vendor if unsure.", "この赤い袋と同じスパイスを1袋買います。不明な場合は店員に写真を見せてください。", "ဤအနီရောင်အထုပ်နှင့်တူသော ဟင်းခတ် ၁ ထုပ်ဝယ်ပါ။ မသေချာပါက ဆိုင်ရှင်ကို ပုံပြပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Singaporean", "シンガポール料理", "စင်္ကာပူစတိုင်"),
      timeEstimate: t("45 mins", "45分", "၄၅ မိနစ်"),
      highProtein: false
    }
  ),
  recipe("soy-marinated-eggs-chilli",
    t("Soy-Marinated Eggs with Chilli (10 Eggs)", "唐辛子入り醤油漬け卵（卵10個）", "ငရုတ်သီးပါ ပဲငံပြာရည်နှပ်ကြက်ဥ (ကြက်ဥ ၁၀ လုံး)"),
    [
      [t("Eggs", "卵", "ကြက်ဥ"), t("10", "10個", "၁၀ လုံး"), "eggs"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), t("8 tbsp", "大さじ8", "စားပွဲတင်ဇွန်း ၈ ဇွန်း"), "soy-sauce"],
      [t("Water", "水", "ရေ"), t("8 tbsp", "大さじ8", "စားပွဲတင်ဇွန်း ၈ ဇွန်း"), "water"],
      [t("Mirin", "みりん", "mirin"), t("1½ tbsp", "大さじ1½", "စားပွဲတင်ဇွန်း ၁½ ဇွန်း"), "mirin"],
      [t("Honey", "はちみつ", "ပျားရည်"), t("1½ tbsp", "大さじ1½", "စားပွဲတင်ဇွန်း ၁½ ဇွန်း"), "honey"],
      [t("Sesame oil", "ごま油", "နှမ်းဆီ"), t("1½ tsp", "小さじ1½", "လက်ဖက်ရည်ဇွန်း ၁½ ဇွန်း"), "sesame-oil"],
      [t("Fresh chillies, thinly sliced", "生唐辛子（薄切り）", "ပါးပါးလှီးထားသော ငရုတ်သီးလတ်လတ်"), t("1-2", "1〜2本", "၁-၂ တောင့်"), "fresh-chilli"],
      [t("Spring onion, finely chopped", "青ねぎ（小口切り）", "နုပ်နုပ်လှီးထားသော ကြက်သွန်မြိတ်"), t("2-3 stalks", "2〜3本", "၂-၃ ပင်"), "spring-onion"]
    ],
    [
      t("Boil the eggs for 6½-7 minutes for soft centres, or 9 minutes for firm centres.", "半熟なら6分30秒〜7分、固ゆでなら9分、卵をゆでます。", "အနှစ်ပျော့အတွက် ကြက်ဥကို ၆½-၇ မိနစ်၊ အနှစ်မာအတွက် ၉ မိနစ် ပြုတ်ပါ။"),
      t("Transfer immediately to cold water, then peel.", "すぐに冷水へ移し、殻をむきます。", "ချက်ချင်း ရေအေးထဲသို့ပြောင်းထည့်ပြီး အခွံခွာပါ။"),
      t("Mix the soy sauce, water, mirin, honey, sesame oil, chilli, and spring onion.", "醤油、水、みりん、はちみつ、ごま油、唐辛子、青ねぎを混ぜます。", "ပဲငံပြာရည်၊ ရေ၊ mirin၊ ပျားရည်၊ နှမ်းဆီ၊ ငရုတ်သီးနှင့် ကြက်သွန်မြိတ်ကို ရောပါ။"),
      t("Put the peeled eggs in a container with the marinade.", "殻をむいた卵を容器に入れ、漬け汁を加えます。", "အခွံခွာထားသော ကြက်ဥများကို ဗူးထဲထည့်ပြီး နှပ်ရည်ထည့်ပါ။"),
      t("Refrigerate for at least 6 hours, ideally overnight. Turn the eggs occasionally if they are not fully submerged.", "冷蔵庫で最低6時間、できれば一晩漬けます。卵が完全に浸からない場合は、時々返します。", "ရေခဲသေတ္တာထဲတွင် အနည်းဆုံး ၆ နာရီ၊ ဖြစ်နိုင်လျှင် တစ်ညလုံး နှပ်ထားပါ။ ကြက်ဥများ နှပ်ရည်ထဲ လုံးဝမမြုပ်ပါက တစ်ခါတစ်ရံ လှန်ပေးပါ။"),
      t("Serve with warm rice and a little marinade.", "温かいご飯に、漬け汁を少量添えて提供します。", "နွေးသောထမင်းနှင့် နှပ်ရည်အနည်းငယ်ဖြင့် စားပါ။")
    ],
    t("Keep refrigerated and finish within 3 days. Do not add garlic or sesame seeds; sesame oil is included.", "冷蔵保存し、3日以内に食べ切ります。にんにくやごま粒は加えません。ごま油は使用します。", "ရေခဲသေတ္တာထဲတွင် သိမ်းပြီး ၃ ရက်အတွင်း စားပြီးပါ။ ကြက်သွန်ဖြူ သို့မဟုတ် နှမ်းစေ့ မထည့်ပါနှင့်။ နှမ်းဆီကိုတော့ သုံးပါ။"),
    [
      photo("assets/recipes/human-food/soy-marinated-eggs-chilli.png",
        t("Ten soy-marinated eggs with chilli and spring onion", "唐辛子と青ねぎを入れた醤油漬け卵10個", "ငရုတ်သီးနှင့် ကြက်သွန်မြိတ်ပါသော ပဲငံပြာရည်နှပ်ကြက်ဥ ၁၀ လုံး"),
        t("Marinate for at least 6 hours, ideally overnight, and finish within 3 days.", "最低6時間、できれば一晩漬け、3日以内に食べ切ります。", "အနည်းဆုံး ၆ နာရီ၊ ဖြစ်နိုင်လျှင် တစ်ညလုံး နှပ်ပြီး ၃ ရက်အတွင်း စားပြီးပါ။"))
    ],
    "human",
    {
      mealType: t("Side/Meal Prep", "副菜／作り置き", "အရံဟင်း / ကြိုတင်ပြင်ဆင်ထားသောအစားအစာ"),
      style: t("Soy-Marinated", "醤油漬け", "ပဲငံပြာရည်နှပ်"),
      timeEstimate: t("20 mins + 6 hrs marinating", "20分＋漬け込み6時間", "မိနစ် ၂၀ + နှပ်ချိန် ၆ နာရီ"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("knorr-chicken-quick-serve-macaroni",
    t("Knorr Chicken Quick Serve Macaroni Breakfast", "クノール チキン・クイックサーブ・マカロニ朝食", "Knorr ကြက်သားအရသာ Quick Serve Macaroni မနက်စာ"),
    [
      [t("Knorr Chicken Quick Serve Macaroni", "クノール チキン味クイックサーブ・マカロニ", "Knorr ကြက်သားအရသာ Quick Serve Macaroni"), t("2 packets", "2袋", "၂ ထုပ်"), "knorr-quick-serve-macaroni"],
      [t("Ham", "ハム", "ဟမ်"), t("as needed", "適量", "လိုအပ်သလို"), "ham"],
      [t("Water", "水", "ရေ"), t("1 litre", "1リットル", "၁ လီတာ"), "water"]
    ],
    [
      t("Cut the ham into small squares.", "ハムを小さな四角に切ります。", "ဟမ်ကို လေးထောင့်ကွက်သေးသေးလေးများ လှီးပါ။"),
      t("Boil 1 litre of water.", "水1リットルを沸騰させます。", "ရေ ၁ လီတာကို ဆူအောင်တည်ပါ။"),
      t("Add 2 packets of Knorr macaroni and cook for about 3 minutes.", "クノールのマカロニ2袋を入れ、約3分ゆでます。", "Knorr macaroni ၂ ထုပ်ကို ထည့်ပြီး ၃ မိနစ်ခန့် ပြုတ်ပါ။"),
      t("Add the ham during the last 30 seconds.", "最後の30秒でハムを加えます。", "နောက်ဆုံး စက္ကန့် ၃၀ တွင် ဟမ်ကို ထည့်ပါ။"),
      t("Turn off the heat and mix in both seasoning packets.", "火を止め、付属の粉末スープ2袋を混ぜます。", "မီးပိတ်ပြီး ဟင်းခတ်အထုပ် ၂ ထုပ်လုံးကို ထည့်မွှေပါ။"),
      t("Pour into 2 bowls and serve.", "2つのボウルに分けて提供します。", "ပန်းကန်လုံး ၂ လုံးထဲ ခွဲထည့်ပြီး ပေးပါ။")
    ],
    t("Use the chicken-flavour packets. The supplied FairPrice link is for the Japanese Pork Bone variant, so check the packet label before buying.", "チキン味の袋を使います。記載のFairPriceリンクは和風豚骨味の商品ページなので、購入前に袋の表示を確認してください。", "ကြက်သားအရသာအထုပ်ကို သုံးပါ။ ပေးထားသော FairPrice လင့်ခ်သည် Japanese Pork Bone အရသာစာမျက်နှာဖြစ်သောကြောင့် မဝယ်မီ အထုပ်တံဆိပ်ကို စစ်ပါ။"),
    [
      photo("assets/recipes/human-food/knorr-chicken-quick-serve-macaroni-served.png",
        t("Chicken Quick Serve Macaroni with small ham squares", "小さく切ったハム入りチキン味クイックサーブ・マカロニ", "ဟမ်လေးထောင့်ကွက်သေးသေးများပါသော ကြက်သားအရသာ Quick Serve Macaroni"),
        t("Divide the cooked macaroni, soup, and ham evenly between 2 bowls.", "調理したマカロニ、スープ、ハムを2つのボウルに均等に分けます。", "ချက်ပြီးသော macaroni၊ စွပ်ပြုတ်နှင့် ဟမ်ကို ပန်းကန်လုံး ၂ လုံးထဲ ညီညီမျှမျှ ခွဲထည့်ပါ။")),
      photo("assets/recipes/human-food/knorr-quick-serve-macaroni-packets.png",
        t("Knorr Quick Serve Macaroni flavour packets", "クノール クイックサーブ・マカロニの各種味", "Knorr Quick Serve Macaroni အရသာအထုပ်များ"),
        t("Choose the chicken-flavour packet and check the label carefully because several flavours look similar.", "似た外観の味が複数あるため、表示をよく確認してチキン味を選びます。", "အရသာအမျိုးမျိုး၏ အထုပ်များ ဆင်တူသောကြောင့် တံဆိပ်ကို သေချာစစ်ပြီး ကြက်သားအရသာကို ရွေးပါ။"))
    ],
    "human",
    {
      mealType: t("Breakfast", "朝食", "မနက်စာ"),
      style: t("Quick", "簡単", "အမြန်"),
      timeEstimate: t("10 mins", "10分", "၁၀ မိနစ်"),
      highProtein: false,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("sushiroll",
    t("Sushi Roll", "巻き寿司", "ဆူရှီလိပ်"),
    [
      [t("Nori seaweed", "のり", "ရေညှိခြောက်"), t("as needed", "適量", "လိုအပ်သလို"), "nori"],
      [t("Cooked Japanese rice", "炊いた日本米", "ချက်ပြီးသား ဂျပန်ဆန်"), t("as needed", "適量", "လိုအပ်သလို"), "rice"],
      [t("Eggs", "卵", "ကြက်ဥ"), t("as needed", "適量", "လိုအပ်သလို"), "eggs"],
      [t("Oil", "油", "ဆီ"), t("a little", "少々", "အနည်းငယ်"), "oil"],
      [t("Salt", "塩", "ဆား"), t("a little", "少々", "အနည်းငယ်"), "salt"],
      {
        key: "tuna",
        name: t("Optional protein (tuna, salmon, chicken, beef, pork, crab stick)", "好みの具材（ツナ、サーモン、鶏肉、牛肉、豚肉、カニカマなど）", "ရွေးချယ်နိုင်သော ပရိုတင်း (တူနာ၊ ဆယ်လ်မွန်၊ ကြက်သား၊ အမဲသား၊ ဝက်သား၊ ကဏန်းချောင်း)"),
        amount: t("as needed", "適量", "လိုအပ်သလို"),
        alternatives: [
          ingredientOption("tuna", t("Tuna", "ツナ", "တူနာ")),
          ingredientOption("salmon-fillet", t("Salmon", "サーモン", "ဆယ်လ်မွန်")),
          ingredientOption("chicken-breast", t("Chicken", "鶏肉", "ကြက်သား")),
          ingredientOption("beef", t("Beef", "牛肉", "အမဲသား")),
          ingredientOption("pork", t("Pork", "豚肉", "ဝက်သား")),
          ingredientOption("crab-stick", t("Crab stick", "カニカマ", "ကဏန်းချောင်း"))
        ]
      }
    ],
    [
      t("Cook the rice and let it cool slightly.", "ご飯を炊いて、少し冷まします。", "ထမင်းချက်ပြီး အနည်းငယ် အအေးခံပါ။"),
      t("Cook the eggs as an omelette and cut into long strips.", "卵を薄焼き卵（卵焼き）にして、細長く切ります。", "ကြက်ဥကို အကြော်ကြော်ပြီး အမြှောင်းရှည်များ လှီးပါ။"),
      t("Put nori on the sushi mat.", "巻きすの上にのりを置きます。", "လိပ်သည့် ဖျာပေါ်တွင် ရေညှိချပ်ကို တင်ပါ။"),
      t("Spread a thin layer of rice on the nori.", "のりの上にご飯を薄く広げます。", "ရေညှိချပ်ပေါ်တွင် ထမင်းကို ပါးပါးဖြန့်ခင်းပါ။"),
      t("Put the egg and optional protein in the middle.", "真ん中に卵と好みの具材（プロテイン）をのせます。", "အလယ်တွင် ကြက်ဥနှင့် ရွေးချယ်နိုင်သော ပရိုတင်းတို့ကို တင်ပါ။"),
      t("Roll tightly using the mat.", "巻きすを使ってきつく巻きます。", "ဖျာကိုသုံးပြီး တင်းတင်းလိပ်ပါ။"),
      t("Cut into pieces with a wet knife.", "濡らした包丁で食べやすい大きさに切ります。", "ဓားစိုဖြင့် အပိုင်းပိုင်း လှီးပါ။")
    ],
    t("**Important:** Do not put too much rice or filling, otherwise the roll may be difficult to close.", "**重要:** ご飯や具材をのせすぎると、巻きにくくなる（閉じられなくなる）ので注意してください。", "**အရေးကြီးပါသည် -** ထမင်း သို့မဟုတ် အစာများကို အလွန်အကျွံ မထည့်ပါနှင့်၊ မဟုတ်ပါက လိပ်ရန် ခက်ခဲနိုင်ပါသည်။"),
    [
      photo("assets/recipes/human-food/sushiroll-sliced.png",
        t("Sushi roll slices on a plate", "お皿に盛った巻き寿司", "ပန်းကန်ထဲရှိ လှီးထားသော ဆူရှီလိပ်များ"),
        t("Sushi sliced into pieces with a wet knife and served on a plate.", "濡らした包丁で切り、お皿に並べた巻き寿司。", "ဓားစိုဖြင့် ညီညီညာညာလှီးပြီး ပန်းကန်ထဲတွင် ပြင်ဆင်ထားသော ဆူရှီ။")),
      photo("assets/recipes/human-food/sushiroll-prep.jpg",
        t("Preparing sushi on a bamboo mat", "巻きすでのりを巻く準備", "ဝါးဖျာပေါ်တွင် ဆူရှီပြင်ဆင်ခြင်း"),
        t("Nori seaweed on a mat with rice, egg omelette strips, and fillings before rolling.", "巻く前にのり、ご飯、細長い卵焼き、具材をのせた状態。", "မလိပ်မီ ရေညှိချပ်၊ ထမင်း၊ ကြက်ဥအမြှောင်းများနှင့် အစာများ ထည့်ထားပုံ။"))
    ],
    "human",
    {
      mealType: t("Main", "主食", "အဓိကအစားအစာ"),
      style: t("Sushi", "寿司", "ဆူရှီ"),
      timeEstimate: t("30 mins", "30分", "မိနစ် ၃၀"),
      highProtein: false,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("simple-wagyu-steak",
    t("Simple Wagyu Steak", "シンプルな和牛ステーキ", "ရိုးရှင်းသော ဝါးဂယူ အမဲသားကင်"),
    [
      [t("Wagyu steak", "和牛ステーキ", "ဝါးဂယူ အမဲသား"), t("1 piece", "1枚", "၁ ပြား"), "wagyu-steak"],
      [t("Salt", "塩", "ဆား"), t("a little", "少々", "အနည်းငယ်"), "salt"],
      [t("Black pepper", "黒コショウ", "ငရုတ်ကောင်းမှုန့်"), t("a little", "少々", "အနည်းငယ်"), "black-pepper"]
    ],
    [
      t("Defrost the steak.", "ステーキを解凍します。", "အမဲသားကို ရေခဲအရည်ပျော်အောင်ထားပါ။"),
      t("Add salt and pepper on both sides.", "両面に塩とコショウを振ります。", "နှစ်ဖက်လုံးကို ဆားနှင့် ငရုတ်ကောင်း ဖြန်းပါ။"),
      t("Heat the pan.", "フライパンを温めます。", "ဒယ်အိုးကို အပူပေးပါ။"),
      t("Cook for 1–2 minutes on each side.", "片面ずつ1〜2分ずつ焼きます。", "တစ်ဖက်လျှင် ၁ မိနစ်မှ ၂ မိနစ်ခန့် ကင်ပါ။"),
      t("Rest for 3 minutes, then cut and serve.", "3分休ませてから、切って盛り付けます。", "၃ မိနစ်ခန့် အနားပေးပြီးနောက် လှီးပြီး သုံးဆောင်ပါ။")
    ],
    t("Choose the doneness to your liking. Wagyu is best served medium-rare to appreciate its fat quality.", "焼き加減はお好みに調整してください。和牛は脂の甘みを味わうためにミディアムレアがおすすめです。", "အကျက်နှုန်းကို စိတ်ကြိုက်ပြင်ဆင်ပါ။ ဝါးဂယူ၏ အဆီအရသာကို ကောင်းစွာရရှိရန် အလယ်အလတ်အကျက် (medium-rare) ကင်ရန် အကြံပြုပါသည်။"),
    [
      photo("assets/recipes/human-food/wagyu-steak-sliced.png",
        t("Wagyu steak sliced and served", "切り分けて盛り付けた和牛ステーキ", "လှီးပြီး ပြင်ဆင်ထားသော ဝါးဂယူ အမဲသားကင်"),
        t("Steak sliced showing the pink medium-rare center.", "断面がきれいなピンク色のミディアムレアのステーキ。", "အလယ်အလတ်အကျက် ပန်းရောင်သန်းနေသော လှီးထားသော အမဲသားကင်။")),
      photo("assets/recipes/human-food/wagyu-steak-raw.jpg",
        t("Raw marbled Wagyu steak", "綺麗なサシの入った生の和牛", "အဆီအစင်းများပါဝင်သော ဝါးဂယူ အမဲသားစိမ်း"),
        t("Raw marbled Wagyu steak package showing the fat veins.", "美しい霜降りの入ったパッケージ入りの生の和牛ステーキ肉。", "အဆီအစင်းလှလှလေးများပါသော ထုပ်ပိုးထားသည့် ဝါးဂယူ အမဲသားစိမ်း။")),
      photo("assets/recipes/human-food/wagyu-steak-cooked.png",
        t("Cooked Wagyu steak on a plate", "お皿にのせた和牛ステーキ", "ပန်းကန်ထဲတွင် ကင်ထားသော ဝါးဂယူ အမဲသား"),
        t("Cooked whole Wagyu steak resting on a white plate.", "お皿に盛り付けて休ませている状態の和牛ステーキ。", "ပန်းကန်လုံးထဲတွင် အနားပေးထားသော ဝါးဂယူ အမဲသားကင် တစ်ပြားလုံး။"))
    ],
    "human",
    {
      mealType: t("Main", "主食", "အဓိကအစားအစာ"),
      style: t("Steak", "ステーキ", "အမဲသားကင်"),
      timeEstimate: t("15 mins", "15分", "၁၅ မိနစ်"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("japanese-curry-rice",
    t("Japanese Curry Rice", "カレーライス", "ဂျပန်ဟင်းချက်နည်း ကာရီထမင်း"),
    [
      [t("Japanese curry blocks", "カレールー", "ဂျပန်ကာရီတုံး"), t("1 package", "1箱", "၁ ဘူး"), "japanese-curry-blocks"],
      [t("Beef", "牛肉", "အမဲသား"), t("as needed", "適量", "လိုအပ်သလို"), "beef"],
      [t("Potatoes", "じゃがいも", "အာလူး"), t("as needed", "適量", "လိုအပ်သလို"), "potato"],
      [t("Carrots", "人参", "မုန်လာဥနီ"), t("as needed", "適量", "လိုအပ်သလို"), "carrot"],
      [t("Water", "水", "ရေ"), t("as needed", "適量", "လိုအပ်သလို"), "water"],
      [t("Cooked rice", "ご飯", "ထမင်း"), t("as needed", "適量", "လိုအပ်သလို"), "rice"]
    ],
    [
      t("Cut the beef and vegetables.", "牛肉と野菜を切ります。", "အမဲသားနှင့် ဟင်းသီးဟင်းရွက်များကို လှီးပါ။"),
      t("Cook the beef in a pot.", "鍋で牛肉を炒めます。", "ဒယ်အိုးထဲတွင် အမဲသားကို ချက်ပါ။"),
      t("Add the potatoes, carrots and water.", "じゃがいも、人参、水を加えます。", "အာလူး၊ မုန်လာဥနီနှင့် ရေတို့ကို ထည့်ပါ။"),
      t("Boil until everything is soft.", "具材が柔らかくなるまで煮込みます。", "အရာအားလုံး နူးညံ့သွားသည်အထိ ပြုတ်ပါ။"),
      t("Turn off the heat and add the curry blocks.", "火を止め、カレールーを加えます。", "မီးပိတ်ပြီး ကာရီတုံးများကို ထည့်ပါ။"),
      t("Stir until melted, then cook for a few more minutes.", "ルーが溶けるまで混ぜ、さらに数分間煮込みます。", "အရည်ပျော်သည်အထိ မွှေပေးပါ၊ ထို့နောက် မိနစ်အနည်းငယ် ထပ်ချက်ပါ။"),
      t("Serve with rice.", "ご飯と一緒に盛り付けます。", "ထမင်းနှင့်အတူ တွဲဖက်သုံးဆောင်ပါ။")
    ],
    t("Keep Nako away from any onion or chocolate. Japanese curry blocks contain onion and other spices which are highly toxic to dogs.", "玉ねぎやチョコレートなどはナコに与えないでください。カレールーには玉ねぎや香辛料が含まれており、犬には非常に有害です。", "Nako ကို ကြက်သွန်နီ သို့မဟုတ် ချောကလက်နှင့် ဝေးဝေးတွင် ထားပါ။ ဂျပန်ကာရီတုံးများတွင် ခွေးများအတွက် အလွန်အဆိပ်သင့်စေသော ကြက်သွန်နီနှင့် အခြားဟင်းခတ်အမွှေးအကြိုင်များ ပါဝင်သည်။"),
    [
      photo("assets/recipes/human-food/japanese-curry-served.png",
        t("Japanese curry rice served on a plate", "お皿に盛ったカレーライス", "ပန်းကန်ထဲတွင် ပြင်ဆင်ထားသော ဂျပန်ကာရီထမင်း"),
        t("A close-up view of Japanese curry with beef, potato, and carrots served with rice.", "お皿に盛り付けた、牛肉、じゃがいも、人参が入った温かいカレーライス。", "အမဲသား၊ အာလူး၊ မုန်လာဥနီတို့ပါဝင်သော ဂျပန်ကာရီထမင်း ပူပူနွေးနွေးကို ပန်းကန်ထဲတွင် ပြင်ဆင်ထားပုံ။")),
      photo("assets/recipes/human-food/japanese-curry-table.jpg",
        t("Dinner table with Japanese curry and sides", "カレーと副菜が並んだ夕食の食卓", "ဂျပန်ကာရီနှင့် အရံဟင်းများပါဝင်သော ညစာစားပွဲ"),
        t("A dinner table showing plates of Japanese curry rice alongside salad, fried chicken, and cake.", "カレーライス、サラダ、唐揚げ、ケーキなどが並んだ賑やかな食卓の様子。", "ကာရီထမင်း၊ သုပ်၊ ကြက်ကြော်နှင့် ကိတ်မုန့်တို့ဖြင့် စည်ကားလှပသော ညစာစားပွဲရှုခင်း။"))
    ],
    "human",
    {
      mealType: t("Main", "主食", "အဓိကအစားအစာ"),
      style: t("Curry", "カレー", "ကာရီ"),
      timeEstimate: t("45 mins", "45分", "၄၅ မိနစ်"),
      highProtein: false,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("beef-mushroom-egg-bowl",
    t("Beef, Mushroom and Egg Rice Bowl", "牛肉とエリンギと卵の丼", "အမဲသား၊ မှိုနှင့် ကြက်ဥ ထမင်းသုပ်ပန်းကန်"),
    [
      [t("Cooked rice", "ご飯", "ထမင်း"), t("as needed", "適量", "လိုအပ်သလို"), "rice"],
      [t("Sliced beef", "薄切り牛肉", "အမဲသားလွှာ"), t("as needed", "適量", "လိုအပ်သလို"), "beef"],
      [t("King oyster mushroom", "エリンギ", "ဘုရင်မှိုခြောက် / King oyster မှို"), t("as needed", "適量", "လိုအပ်သလို"), "king-oyster-mushroom"],
      [t("Egg", "卵", "ကြက်ဥ"), t("1", "1個", "၁ လုံး"), "eggs"],
      [t("Cherry tomatoes", "ミニトマト", "ခရမ်းချဉ်သီးချို"), t("as needed", "適量", "လိုအပ်သလို"), "cherry-tomatoes"],
      [t("Salt and pepper", "塩コショウ", "ဆားနှင့် ငရုတ်ကောင်း"), t("a little", "少々", "အနည်းငယ်"), "salt"],
      [t("Chilli powder", "チリパウダー", "ငရုတ်သီးမှုန့်"), t("a little", "少々", "အနည်းငယ်"), "chilli-powder"]
    ],
    [
      t("Cook the egg until soft-boiled.", "卵を半熟（温泉卵）にゆでます。", "ကြက်ဥကို အကျက်ပျော့ပျော့ ပြုတ်ပါ။"),
      t("Slice and cook the mushroom.", "エリンギをスライスして炒めます。", "မှိုကို ပါးပါးလှီးပြီး ချက်ပါ။"),
      t("Add the beef, salt and pepper, then cook together.", "牛肉、塩コショウを加え、一緒に炒めます。", "အမဲသား၊ ဆားနှင့် ငရုတ်ကောင်းတို့ကို ထည့်ပြီး အတူတူချက်ပါ။"),
      t("Put everything on top of hot rice.", "温かいご飯の上にすべてをのせます。", "ပူပူနွေးနွေး ထမင်းပေါ်တွင် အားလုံးကို တင်ပါ။"),
      t("Add the egg and cherry tomatoes.", "卵とミニトマトをのせます。", "ကြက်ဥနှင့် ခရမ်းချဉ်သီးချိုတို့ကို ထည့်ပါ။"),
      t("Sprinkle chilli powder on top.", "上からチリパウダーを振ります。", "အပေါ်မှ ငရုတ်သီးမှုန့် ဖြန်းပေးပါ။")
    ],
    t("Do not add onion, garlic or other toxic ingredients if sharing with pets, and keep Nako away from chilli powder.", "ペットと共有する場合は、玉ねぎやにんにくなどの有害な食材を加えないでください。また、チリパウダーは犬に与えないでください。", "အိမ်မွေးတိရစ္ဆာန်များနှင့် မျှဝေပါက ကြက်သွန်နီ၊ ကြက်သွန်ဖြူ သို့မဟုတ် အခြားအဆိပ်သင့်စေသော ပါဝင်ပစ္စည်းများကို မထည့်ပါနှင့်။ Nako ကို ငရုတ်သီးမှုန့်နှင့် ဝေးဝေးတွင် ထားပါ။"),
    [
      photo("assets/recipes/human-food/beef-mushroom-egg-bowl.jpg",
        t("Beef, mushroom and egg rice bowl", "牛肉、エリンギ、卵の丼", "အမဲသား၊ မှိုနှင့် ကြက်ဥ ထမင်းသုပ်ပန်းကန်"),
        t("Wagyu beef strips and sliced king oyster mushrooms over rice, topped with a soft-boiled egg, red chilli powder, and cherry tomatoes on the side.", "ご飯の上にのせた牛肉とエリンギ、温泉卵、チリパウダー、そしてミニトマト。", "ထမင်းပေါ်တွင် အမဲသားဖတ်များ၊ မှိုလွှာများ၊ ကြက်ဥပျော့၊ ငရုတ်သီးမှုန့်နှင့် ခရမ်းချဉ်သီးချိုများ။"))
    ],
    "human",
    {
      mealType: t("Main", "主食", "အဓိကအစားအစာ"),
      style: t("Gyudon/Bowl", "丼もの", "ထမင်းသုပ်ပန်းကန်"),
      timeEstimate: t("20 mins", "20分", "မိနစ် ၂၀"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("soy-braised-beef-egg",
    t("Soy-Braised Beef and Egg with Rice", "牛肉と煮卵の醤油煮込みご飯", "အမဲသားနှင့် ပဲငပိရည်ပြုတ်ကြက်ဥ ထမင်း"),
    [
      [t("Sliced beef", "薄切り牛肉", "အမဲသားလွှာ"), t("as needed", "適量", "လိုအပ်သလို"), "beef"],
      [t("Boiled eggs", "ゆで卵", "ပြုတ်ကြက်ဥ"), t("as needed", "適量", "လိုအပ်သလို"), "eggs"],
      [t("Soy sauce", "醤油", "ပဲငပိရည်/ပဲငါးပိရည်"), t("as needed", "適量", "လိုအပ်သလို"), "soy-sauce"],
      [t("Water", "水", "ရေ"), t("a little", "少々", "အနည်းငယ်"), "water"],
      [t("Cooked rice", "ご飯", "ထမင်း"), t("as needed", "適量", "လိုအပ်သလို"), "rice"]
    ],
    [
      t("Boil the eggs and remove the shells.", "卵をゆでて殻をむきます。", "ကြက်ဥကို ပြုတ်ပြီး အခွံနွှာပါ။"),
      t("Cook beef, eggs, soy sauce and a little water together.", "牛肉、ゆで卵、醤油、少量の水を一緒に煮込みます。", "အမဲသား၊ ကြက်ဥ၊ ပဲငပိရည်နှင့် ရေအနည်းငယ်တို့ကို အတူတူချက်ပါ။"),
      t("Serve with rice.", "ご飯と一緒に盛り付けます。", "ထမင်းနှင့်အတူ တည်ခင်းပါ။")
    ],
    t("Do not add onion or garlic if sharing with pets, and keep soy sauce quantities minimal/diluted if pets taste any part of the food.", "ペットと共有する場合は玉ねぎやにんにくを加えないでください。また、ペットが味見をする場合は醤油の量を最小限にし、薄めてください。", "အိမ်မွေးတိရစ္ဆာန်များနှင့် မျှဝေပါက ကြက်သွန်နီ သို့မဟုတ် ကြက်သွန်ဖြူ မထည့်ပါနှင့်၊ တိရစ္ဆာန်များ အနည်းငယ် မြည်းစမ်းမည်ဆိုပါက ပဲငပိရည်ပမာဏကို အနည်းဆုံး/ရေရောပြီး သုံးပါ။"),
    [
      photo("assets/recipes/human-food/soy-braised-beef-egg.jpg",
        t("Soy-braised beef and egg", "牛肉と煮卵の醤油煮込み", "ပဲငပိရည်ပြုတ် အမဲသားနှင့် ကြက်ဥ"),
        t("A bowl of soy-braised sliced beef with a whole braised egg next to a plate of white rice with chopsticks.", "丸ごとの煮卵と牛肉の醤油煮込み、そしてお箸を添えた白いご飯。", "ပဲငပိရည်ပြုတ် အမဲသား၊ ကြက်ဥပြုတ်တစ်လုံးနှင့် ထမင်းဖြူ၊ တူတစ်စုံ။"))
    ],
    "human",
    {
      mealType: t("Main", "主食", "အဓိကအစားအစာ"),
      style: t("Braised/Rice", "煮込み・ご飯", "ပြုတ်/ထမင်း"),
      timeEstimate: t("25 mins", "25分", "၂၅ မိနစ်"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("onigiri-rice-balls",
    t("Onigiri Rice Balls", "おにぎり", "အိုနီဂီရိ ထမင်းဆုပ်"),
    [
      [t("Cooked Japanese rice", "ご飯（日本米）", "ဂျပန်ထမင်း"), t("as needed", "適量", "လိုအပ်သလို"), "rice"],
      [t("Cooked protein (meat, fish, etc.)", "具材（肉、魚など）", "ချက်ပြုတ်ထားသော ပရိုတင်း (အသား၊ ငါး စသည်)"), t("as needed", "適量", "လိုအပ်သလို"), "cooked-protein"],
      [t("Rice seasoning (Furikake)", "ふりかけ・味付け", "ထမင်းဖြူးမွှေး (Furikake)"), t("as needed", "適量", "လိုအပ်သလို"), "rice-seasoning"]
    ],
    [
      t("Mix the rice, cooked protein and seasoning.", "ご飯、具材、ふりかけを混ぜ合わせます。", "ထမင်း၊ ချက်ပြုတ်ထားသော ပရိုတင်းနှင့် ထမင်းဖြူးမွှေးတို့ကို ရောမွှေပါ။"),
      t("Shape into rice balls with wet hands or plastic wrap.", "濡らした手やラップを使って、おにぎりの形に整えます。", "စိုစွတ်သောလက် သို့မဟုတ် ပလတ်စတစ်စဖြင့် ထမင်းဆုပ်ပုံဖော်ပါ။")
    ],
    t("Avoid using seasonings containing onion, garlic, or excessive salt if sharing with pets.", "ペットと共有する場合は、玉ねぎ、にんにく、または過度な塩分を含むふりかけ・調味料は使用しないでください。", "အိမ်မွေးတိရစ္ဆာန်များနှင့် မျှဝေပါက ကြက်သွန်နီ၊ ကြက်သွန်ဖြူ သို့မဟုတ် ဆားအလွန်အကျွံပါဝင်သော အမွှေးအကြိုင်များ သုံးစွဲခြင်းမှ ရှောင်ကြဉ်ပါ။"),
    [
      photo("assets/recipes/human-food/onigiri-rice-balls.png",
        t("Onigiri rice balls wrapped in plastic wrap", "ラップに包まれたおにぎり", "ပလတ်စတစ်စဖြင့် ထုပ်ထားသော အိုနီဂီရိ ထမင်းဆုပ်"),
        t("Two triangular-shaped onigiri rice balls wrapped in plastic wrap, showing flecks of seaweed and seasoning.", "ラップに包まれた、海苔やふりかけが混ざった2つの三角形のおにぎり。", "ရေညှိနှင့် ထမင်းဖြူးမွှေးများ ရောနှောနေပြီး ပလတ်စတစ်စဖြင့် ထုပ်ပိုးထားသော တြိဂံပုံစံ အိုနီဂီရိ ထမင်းဆုပ် နှစ်ခု။"))
    ],
    "human",
    {
      mealType: t("Snack/Light Meal", "軽食・スナック", "သရေစာ/အပေါ့စား အစားအစာ"),
      style: t("Onigiri/Rice", "おにぎり・米", "ထမင်းဆုပ်"),
      timeEstimate: t("15 mins", "15分", "၁၅ မိနစ်"),
      highProtein: false,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("clean-yukari-style-salad",
    t("Clean Yukari-Style Salad", "ゆかり風クリーンサラダ", "ယူကာရီစတိုင် သန့်ရှင်းလတ်ဆတ်သော သုပ်"),
    [
      [t("Chicken breast", "鶏胸肉", "ကြက်ရင်အုံသား"), t("as needed", "適量", "လိုအပ်သလို"), "chicken-breast"],
      [t("Kale", "ケール", "ကိုက်လန်/Kale"), t("as needed", "適量", "လိုအပ်သလို"), "kale"],
      [t("Pumpkin", "かぼちゃ", "ရွှေဖရုံသီး"), t("as needed", "適量", "လိုအပ်သလို"), "pumpkin"],
      [t("Mushrooms", "キノコ", "မှို"), t("as needed", "適量", "လိုအပ်သလို"), "mushrooms"],
      [t("Cherry tomatoes", "ミニトマト", "ခရမ်းချဉ်သီးချို"), t("as needed", "適量", "လိုအပ်သလို"), "cherry-tomatoes"],
      [t("Egg", "卵", "ကြက်ဥ"), t("1", "1個", "၁ လုံး"), "eggs"],
      [t("Salt and pepper", "塩コショウ", "ဆားနှင့် ငရုတ်ကောင်း"), t("a little", "少々", "အနည်းငယ်"), "salt"]
    ],
    [
      t("Boil the egg and pumpkin.", "卵とかぼちゃをゆでます。", "ကြက်ဥနှင့် ရွှေဖရုံသီးတို့ကို ပြုတ်ပါ။"),
      t("Cook the chicken and mushrooms with salt and pepper.", "鶏肉とキノコを塩コショウで炒めます。", "ကြက်သားနှင့် မှိုတို့ကို ဆား၊ ငရုတ်ကောင်းတို့ဖြင့် ချက်ပါ။"),
      t("Put everything together on a plate.", "すべての具材をお皿に盛り付けます。", "အားလုံးကို ပန်းကန်တစ်ခုတည်းတွင် အတူတူပြင်ဆင်ပါ။")
    ],
    t("Do not add onion, garlic or toxic herbs. Keep seasonings minimal if sharing any clean chicken or pumpkin with pets.", "ペットと共有する場合は、玉ねぎ、にんにく、または有害なハーブを加えないでください。鶏肉やかぼちゃをペットに与える場合は味付けを避けてください。", "အိမ်မွေးတိရစ္ဆာန်များနှင့် မျှဝေပါက ကြက်သွန်နီ၊ ကြက်သွန်ဖြူ သို့မဟုတ် အဆိပ်သင့်စေသော ဆေးဖက်ဝင်အပင်များ မထည့်ပါနှင့်။ ကြက်သား သို့မဟုတ် ရွှေဖရုံသီးကို ကျွေးမည်ဆိုပါက အမွှေးအကြိုင်များကို အနည်းဆုံးသာ သုံးပါ။"),
    [
      photo("assets/recipes/human-food/clean-yukari-style-salad.jpg",
        t("Clean Yukari-style salad", "ゆかり風クリーンサラダ", "ယူကာရီစတိုင် သန့်ရှင်းလတ်ဆတ်သော သုပ်"),
        t("A clean salad plate with pan-fried chicken and mushrooms, fresh kale, boiled pumpkin chunks, a sliced boiled egg, and halved cherry tomatoes.", "炒めた鶏肉とキノコ、ケール、ゆでたかぼちゃ、ゆで卵、そしてミニトマトが盛られたクリーンサラダのプレート。", "ကြော်ထားသော ကြက်သားနှင့် မှို၊ လတ်ဆတ်သော ကိုက်လန်၊ ပြုတ်ထားသော ရွှေဖရုံသီးတုံးများ၊ ကြက်ဥပြုတ်နှင့် ခရမ်းချဉ်သီးချိုများ ပါဝင်သည့် သန့်ရှင်းလတ်ဆတ်သော သုပ်ပန်းကန်။"))
    ],
    "human",
    {
      mealType: t("Salad/Meal", "サラダ・主食", "သုပ်/အစားအစာ"),
      style: t("Clean/Healthy", "クリーン・健康食", "သန့်ရှင်း/ကျန်းမာရေးနှင့်ညီညွတ်သော"),
      timeEstimate: t("20 mins", "20分", "မိနစ် ၂၀"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("love-bentos-by-yukari",
    t("Love Bentos by Yukari", "ゆかり特製愛妻弁当", "ယူကာရီ၏ မေတ္တာကမ္ဘာ ဘင်တိုဗူး"),
    [
      [t("Cooked rice", "ご飯", "ထမင်း"), t("as needed", "適量", "လိုအပ်သလို"), "rice"],
      [t("Salmon or sliced meat", "鮭または薄切り肉", "ဆော်လမွန်ငါး သို့မဟုတ် အသားလွှာ"), t("as needed", "適量", "လိုအပ်သလို"), "salmon-or-meat"],
      [t("Eggs", "卵", "ကြက်ဥ"), t("2–3", "2〜3個", "၂ သို့မဟုတ် ၃ လုံး"), "eggs"],
      [t("Cherry tomatoes", "ミニトマト", "ခရမ်းချဉ်သီးချို"), t("as needed", "適量", "လိုအပ်သလို"), "cherry-tomatoes"],
      [t("Salt and pepper", "塩コショウ", "ဆားနှင့် ငရုတ်ကောင်း"), t("a little", "少々", "အနည်းငယ်"), "salt"]
    ],
    [
      t("Cook the salmon or meat with salt and pepper.", "鮭またはお肉を塩コショウで焼きます。", "ဆော်လမွန်ငါး သို့မဟုတ် အသားကို ဆား၊ ငရုတ်ကောင်းတို့ဖြင့် ချက်ပါ။"),
      t("Cook and roll or fold the eggs.", "卵焼き（または折りたたんだ卵）を作ります。", "ကြက်ဥကို ကြော်ပြီး လိပ်ပါ သို့မဟုတ် ခေါက်ပါ။"),
      t("Pack everything with rice and cherry tomatoes.", "ご飯、ミニトマトと一緒に弁当箱に詰めます。", "ထမင်း၊ ခရမ်းချဉ်သီးချိုတို့နှင့်အတူ အားလုံးကို ဘင်တိုဗူးထဲသို့ ထည့်ပါ။")
    ],
    t("Do not add onion or garlic if choosing sliced meat. Ensure salmon has all bones removed before cooking, and keep seasonings plain for pet consumption.", "薄切り肉を選ぶ場合は玉ねぎやにんにくを加えないでください。また、鮭は調理前にすべての骨を取り除き、ペットが食べる分は味付けを避けてください。", "အသားလွှာကို ရွေးချယ်ပါက ကြက်သွန်နီ သို့မဟုတ် ကြက်သွန်ဖြူ မထည့်ပါနှင့်။ မချက်ပြုတ်မီ ဆော်လမွန်ငါးရှိ အရိုးအားလုံးကို ဖယ်ရှားပြီး အိမ်မွေးတိရစ္ဆာန်များစားရန်အတွက် အမွှေးအကြိုင်များကို ရှောင်ကြဉ်ပါ။"),
    [
      photo("assets/recipes/human-food/love-bentos-salmon.jpg",
        t("Love bento with grilled salmon and rolled egg", "焼き鮭と卵焼きの愛妻弁当", "ဆော်လမွန်ကင်နှင့် ကြက်ဥလိပ်ပါဝင်သော မေတ္တာဘင်တိုဗူး"),
        t("A bento box filled with seasoned brown rice, topped with a cooked salmon fillet and two slices of rolled egg omelette.", "味付けご飯の上に焼き鮭と2切れの卵焼きがのったお弁当。", "နယ်ထားသော ထမင်းညိုပေါ်တွင် ဆော်လမွန်ကင်တစ်ဖတ်နှင့် ကြက်ဥလိပ် နှစ်ခု တင်ထားသော ဘင်တိုဗူး။")),
      photo("assets/recipes/human-food/love-bentos-meat.png",
        t("Love bento with meat rolls and rolled egg", "肉巻きと卵焼きの愛妻弁当", "အသားလိပ်နှင့် ကြက်ဥလိပ်ပါဝင်သော မေတ္တာဘင်တိုဗူး"),
        t("A bento box containing seasoned rice with diced potatoes/scallops, rolled egg omelette slices, meat rolls, and cherry tomatoes.", "ご飯、卵焼き、肉巻き、そしてミニトマトが入ったお弁当。", "ထမင်း၊ ကြက်ဥလိပ်၊ အသားလိပ်နှင့် ခရမ်းချဉ်သီးချိုများ ပါဝင်သော ဘင်တိုဗူး။"))
    ],
    "human",
    {
      mealType: t("Main/Bento", "お弁当・主食", "ဘင်တိုဗူး/အစားအစာ"),
      style: t("Bento", "お弁当", "ဘင်တိုဗူး"),
      timeEstimate: t("25 mins", "25分", "၂၅ မိနစ်"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  ),
  recipe("shogatsu-osechi",
    t("Shōgatsu Osechi", "おせち料理", "ဂျပန်နှစ်သစ်ကူး အိုဆဲချိ ဟင်းလျာ"),
    [
      [t("Prawns", "海老", "ပုစွန်"), t("as needed", "適量", "လိုအပ်သလို"), "prawns"],
      [t("Pork belly and ham", "豚バラ肉とハム", "ဝက်သုံးထပ်သားနှင့် ဟမ်း"), t("as needed", "適量", "လိုအပ်သလို"), "pork-belly"],
      [t("Datemaki rolled egg", "伊達巻", "ဒါတဲမာကိ ကြက်ဥလိပ်"), t("as needed", "適量", "လိုအပ်သလို"), "eggs"],
      [t("Kamaboko fish cake", "かまぼこ", "ခါမာဘိုကို ငါးကိတ်"), t("as needed", "適量", "လိုအပ်သလို"), "fish-cake"],
      [t("Kuromame black beans", "黒豆", "ခူရိုမာမဲ ပဲနက်ချို"), t("as needed", "適量", "လိုအပ်သလို"), "black-beans"],
      [t("Kuri-kinton (sweet potato mash with chestnuts)", "栗きんとん", "ကူရီကင်တွန် ကန်စွန်းဥအနှစ်"), t("as needed", "適量", "လိုအပ်သလို"), "sweet-potato"],
      [t("Lotus root, carrots, bamboo shoots and mushrooms", "蓮根、人参、筍、椎茸", "ကြာစွယ်၊ မုန်လာဥနီ၊ မျှစ်နှင့် မှို"), t("as needed", "適量", "လိုအပ်သလို"), "osechi-vegetables"],
      [t("Other Osechi dishes (konjac, herring roe, etc.)", "その他のおせち料理（こんにゃく、数の子など）", "အခြား အိုဆဲချိ ဟင်းလျာများ (ဝက်ဂျယ်လီ၊ kazunoko စသည်)"), t("as needed", "適量", "လိုအပ်သလို"), "osechi-sides"]
    ],
    [
      t("Cook each dish separately with Japanese seasoning.", "それぞれの料理を和風の味付けで個別に調理します。", "ဟင်းလျာတစ်ခုချင်းစီကို ဂျပန်အရသာဖြင့် သီးခြားစီချက်ပြုတ်ပါ။"),
      t("Cool everything and arrange neatly in osechi boxes.", "すべての具材を冷まし、重箱にきれいに盛り付けます。", "အားလုံးကို အေးအောင်ထားပြီး Osechi သေတ္တာများထဲတွင် သပ်သပ်ရပ်ရပ် ပြင်ဆင်ပါ။")
    ],
    t("Osechi dishes contain high sugar, salt, soy sauce, and potential toxic ingredients (onions/garlic in meats). Do not share Osechi dishes with pets.", "おせち料理は糖分、塩分、醤油が多く含まれ、肉類には玉ねぎやにんにく等の有害物質が入っている可能性があります。ペットには絶対に与えないでください。", "အိုဆဲချိ ဟင်းလျာများတွင် သကြား၊ ဆား၊ ပဲငပိရည် အလွန်များပြားပြီး အဆိပ်သင့်စေသော ပါဝင်ပစ္စည်းများ (အသားထဲရှိ ကြက်သွန်နီ/ကြက်သွန်ဖြူ) ပါဝင်နိုင်ပါသည်။ အိုဆဲချိ ဟင်းလျာများကို အိမ်မွေးတိရစ္ဆာန်များနှင့် မျှဝေခြင်းမပြုပါနှင့်။"),
    [
      photo("assets/recipes/human-food/shogatsu-osechi.png",
        t("Shōgatsu Osechi New Year dishes", "お正月のおせち料理", "ဂျပန်နှစ်သစ်ကူး အိုဆဲချိ ဟင်းလျာများ"),
        t("Multi-tiered Osechi boxes beautifully arranged with prawns, braised pork belly, sliced ham, rolled egg, lotus root, shiitake mushrooms, pink and white kamaboko, and black beans.", "海老、豚の角煮、ハム、伊達巻、蓮根、椎茸、かまぼこ、黒豆などが美しく並べられた多段のおせち料理。", "ပုစွန်၊ ဝက်သားချက်၊ ဟမ်းပြားများ၊ ကြက်ဥလိပ်၊ ကြာစွယ်၊ ရှီတာကေမှို၊ ပန်းရောင်နှင့် အဖြူရောင် kamaboko ငါးကိတ်နှင့် ပဲနက်ချိုတို့ဖြင့် လှပစွာ ပြင်ဆင်ထားသော Osechi ဟင်းလျာသေတ္တာများ။")),
      photo("assets/recipes/human-food/shogatsu-osechi-family.jpg",
        t("Family gathering with Osechi meal", "おせち料理を囲む家族の集まり", "အိုဆဲချိ ဟင်းလျာများနှင့်အတူ မိသားစုဆုံတွေ့ပွဲ"),
        t("A large family gathering standing around a dinner table set with Osechi dishes in a brightly lit room.", "明るい部屋で、おせち料理が並ぶ食卓を囲んで笑顔で立つ大家族の様子。", "လင်းထိန်နေသောအခန်းတွင် အိုဆဲချိဟင်းလျာများ ပြင်ဆင်ထားသည့် စားပွဲဝိုင်းကို ဝိုင်းရံလျက် ရပ်နေသော မိသားစုဝင်များ၏ ပုံရိပ်။"))
    ],
    "human",
    {
      mealType: t("Festive/Main", "お正月料理・主食", "ပွဲတော်/အဓိကအစားအစာ"),
      style: t("Osechi", "おせち・日本食", "အိုဆဲချိ"),
      timeEstimate: t("120 mins", "120分", "၁၂၀ မိနစ်"),
      highProtein: true,
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်")
    }
  )
];

recipes.sort((a, b) => Number(Boolean(a.demoStatus)) - Number(Boolean(b.demoStatus)));


// Global Translation Reconciliation Check Function


// Global Translation Reconciliation Check Function
function checkTranslations() {
  const missing = [];
  const ui = window.nakoData.ui;
  const allowSameAsEnglish = new Set([
    "Nako Home Care"
  ]);
  const shouldCheck = (value) => value && !allowSameAsEnglish.has(value);
  const addIssue = (type, key, english, flags) => {
    missing.push({ type, key, english, ...flags });
  };
  const placeholders = (value) => [...new Set(String(value || "").match(/\{[^{}]+\}/g) || [])];
  const checkPlaceholderParity = (english, translated, language, path) => {
    const missingPlaceholders = placeholders(english).filter((token) => !placeholders(translated).includes(token));
    if (missingPlaceholders.length) {
      addIssue(`Placeholder (${language.toUpperCase()})`, path, english, {
        reason: `Missing ${missingPlaceholders.join(", ")}`
      });
    }
  };
  const checkBurmeseQuality = (value, path, english) => {
    const problems = [];
    if (/[\u0E00-\u0E7F]/u.test(value)) problems.push("Thai characters");
    if (/[\u3040-\u30FF\u3400-\u9FFF]/u.test(value)) problems.push("Japanese characters");
    if (/[\u3000-\u303F]/u.test(value)) problems.push("Japanese punctuation");
    if (problems.length) {
      addIssue("Content quality (MM)", path, english, {
        invalidMmScript: true,
        reason: problems.join(", ")
      });
    }
  };
  
  // 1. Check UI Keys
  for (const key in ui.en) {
    const val = ui.en[key];
    if (!shouldCheck(val)) continue;

    if (!ui.jp[key] || ui.jp[key] === val) {
      addIssue("UI Key (JP)", `ui.jp.${key}`, val, { missingJp: !ui.jp[key], sameAsEnglishJp: ui.jp[key] === val });
    }
    if (!ui.mm[key] || ui.mm[key] === val) {
      addIssue("UI Key (MM)", `ui.mm.${key}`, val, { missingMm: !ui.mm[key], sameAsEnglishMm: ui.mm[key] === val });
    }
    checkPlaceholderParity(val, ui.jp[key], "jp", `ui.jp.${key}`);
    checkPlaceholderParity(val, ui.mm[key], "mm", `ui.mm.${key}`);
    checkBurmeseQuality(ui.mm[key] || "", `ui.mm.${key}`, val);
  }

  // 2. Check Database Objects
  const checkObj = (obj, path) => {
    if (!obj || typeof obj !== "object") return;
    // Official video titles and channel names are source metadata, so retain the
    // verified YouTube spelling rather than translating or flagging those names.
    if (path?.startsWith("trainingData.videos") && (path.endsWith(".title") || path.endsWith(".channel"))) return;
    if (obj.en !== undefined) {
      if (shouldCheck(obj.en)) {
        if (obj._missingJp || !obj.jp || obj.jp === obj.en) {
          addIssue("Content (JP)", path, obj.en, { missingJp: obj._missingJp || !obj.jp, sameAsEnglishJp: obj.jp === obj.en });
        }
        if (obj._missingMm || !obj.mm || obj.mm === obj.en) {
          addIssue("Content (MM)", path, obj.en, { missingMm: obj._missingMm || !obj.mm, sameAsEnglishMm: obj.mm === obj.en });
        }
        checkPlaceholderParity(obj.en, obj.jp, "jp", `${path}.jp`);
        checkPlaceholderParity(obj.en, obj.mm, "mm", `${path}.mm`);
        checkBurmeseQuality(obj.mm || "", `${path}.mm`, obj.en);
      }
      return;
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        checkObj(obj[key], path ? `${path}.${key}` : key);
      }
    }
  };

  checkObj(window.nakoData.homeSections, "homeSections");
  checkObj(window.nakoData.cookingRules, "cookingRules");
  checkObj(window.nakoData.householdCookingRulesItem, "householdCookingRulesItem");
  checkObj(window.nakoData.foodItems, "foodItems");
  checkObj(window.nakoData.foodSafetyItems, "foodSafetyItems");
  checkObj(window.nakoData.officialReferences, "officialReferences");
  checkObj(window.nakoData.routineTasks, "routineTasks");
  checkObj(window.nakoData.recipes, "recipes");
  checkObj(window.nakoData.additionalResources, "additionalResources");
  checkObj(window.nakoData.trainingData, "trainingData");
  checkObj(window.nakoData.gamificationData, "gamificationData");

  // Quantities such as "100g" are language-neutral. Any amount containing
  // user-facing words must use t(en, jp, mm) so the renderer can localize it.
  const languageNeutralAmount = /^\d+(?:\.\d+)?\s*(?:g|kg|ml|l)$/i;
  window.nakoData.recipes.forEach((recipe, recipeIndex) => {
    recipe.ingredients.forEach((item, ingredientIndex) => {
      if (typeof item.amount === "string" && !languageNeutralAmount.test(item.amount.trim())) {
        addIssue(
          "Plain user-facing string",
          `recipes.${recipeIndex}.ingredients.${ingredientIndex}.amount`,
          item.amount,
          { plainString: true, reason: "Textual recipe amounts must use t(en, jp, mm)" }
        );
      }
    });
  });

  return missing;
}


(() => {
  const fairPrice = "https://www.fairprice.com.sg";
  const product = (path) => `${fairPrice}${path}`;
  const search = (query) => `${fairPrice}/search?query=${encodeURIComponent(query)}`;

  window.nakoIngredientCatalog = Object.freeze({
    "chicken-tender": { file: "chicken-tender.jpg", source: product("/product/master-grocer-99-fat-free-chicken-tenderloin-250g-chilled-250-g-90175216"), target: "Raw chicken tenderloin in a chilled supermarket pack" },
    "chicken-minced": { file: "chicken-minced.jpg", source: product("/product/kee-song-fresh-chicken-minced-300g-13097678"), target: "Fresh minced chicken in a labelled supermarket tray" },
    "chicken-breast": { file: "chicken-breast.jpg", source: product("/product/aw-s-market-kampong-chicken-breast-fillet-cube-300-g-90125965"), target: "Raw skinless chicken breast in a chilled supermarket pack" },
    "chicken-thigh": { file: "chicken-thigh.jpg", source: product("/product/farmfresh-chicken-leg-boneless-cube-250-g-90199908"), target: "Raw boneless chicken thigh in a chilled supermarket pack" },
    "chicken-wings": { file: null, source: search("fresh chicken wings"), target: "Raw chicken wings in a chilled supermarket pack" },
    pumpkin: { file: "pumpkin.jpg", source: product("/product/orgo-fresh-pumpkin-whole-pumkin-1-pc-90145601"), target: "Whole fresh pumpkin" },
    carrot: { file: "carrot.jpg", source: product("/product/snackables-snack-fresh-carrots-250g-13280574"), target: "Fresh whole carrots" },
    whitefish: { file: "whitefish.jpg", source: product("/product/catch-seafood-pacific-dory-fillet"), target: "Plain frozen dory / white-fish fillet package" },
    "sweet-potato": { file: "sweet-potato.jpg", source: product("/product/13135134"), target: "Fresh sweet potatoes" },
    "daikon-radish": { file: null, source: product("/product/japan-daikon-white-radish-500g-13103250"), target: "Fresh whole daikon radish" },
    tomato: { file: null, source: search("fresh tomato"), target: "Fresh whole tomatoes" },
    zucchini: { file: "zucchini.jpg", source: product("/product/thygrace-green-zucchini-2-per-pack-13183890"), target: "Fresh green zucchini" },
    "napa-cabbage": { file: "napa-cabbage.jpg", source: product("/product/wa-wa-chye-baby-wongbok-250g-10950392"), target: "Whole wong bok / napa cabbage" },
    broccoli: { file: "broccoli.jpg", source: product("/product/orgo-fresh-royal-broccoli-280-g-90153099"), target: "Fresh broccoli head or supermarket pack" },
    "steak-pepper": { file: null, source: product("/product/10351373"), target: "Steak-pepper seasoning packet" },
    rice: { file: "rice.jpg", source: product("/product/fairprice-japonica-rice-premium-short-grain-25kg-13086207"), target: "Japanese-style short-grain rice bag" },
    "soy-sauce": { file: "soy-sauce.jpg", source: product("/product/12400028"), target: "Japanese-style soy sauce bottle" },
    mirin: { file: "mirin.jpg", source: product("/product/takara-mirin-japanese-sweet-cooking-rice-wine-300ml-90002289"), target: "Mirin bottle" },
    "cooking-sake": { file: "cooking-sake.jpg", source: product("/product/kirei-premium-hinode-japan-ryorishu-cooking-sake-400-ml-90121995"), target: "Japanese cooking-sake bottle" },
    sugar: { file: "sugar.jpg", source: product("/product/fairprice-pure-cane-sugar-fine-grain-3kg-13179180"), target: "White-sugar packet" },
    honey: { file: null, source: search("manuka honey"), target: "Honey bottle or jar" },
    matcha: { file: null, source: product("/product/kirei-premium-100-japan-matcha-tea-powder-30-g-90091862"), target: "Japanese matcha powder packet" },
    milk: { file: null, source: search("Meiji fresh milk"), target: "Fresh milk bottle" },
    ginger: { file: "ginger.jpg", source: product("/product/orgo-fresh-ginger-210-g-90160216"), target: "Fresh ginger root" },
    oil: { file: "oil.png", source: null, target: "Premium bottle of extra virgin olive oil" },
    sesame: { file: "sesame.jpg", source: product("/product/pasar-white-sesame-seed-150g-13218883"), target: "White sesame seed packet" },
    "salmon-fillet": { file: "salmon.jpg", source: product("/product/catch-seafood-atlantic-salmon-fillet-1-3-kg-90122048"), target: "Raw salmon fillet package" },
    salt: { file: "salt.jpg", source: product("/product/fairprice-premium-fine-salt-500g-432823"), target: "Ordinary table-salt packet" },
    eggs: { file: "egg.jpg", source: product("/product/pasar-fresh-eggs-30-per-pack-13197730"), target: "Fresh egg carton" },
    "plain-bee-hoon": { file: "plain-bee-hoon.jpg", source: null, target: "Cooked plain bee hoon with vegetables, wrapped in brown paper" },
    "knorr-quick-serve-macaroni": { file: null, source: product("/product/knorr-chicken-quick-serve-macaroni-bundle-of-4"), target: "Knorr Chicken Quick Serve Macaroni packet" },
    ham: { file: null, source: search("sliced ham"), target: "Ready-to-eat sliced ham" },
    "fresh-chilli": { file: null, source: product("/product/simply-finest-red-chilli-150g-13093893"), target: "Fresh red chillies" },
    "spring-onion": { file: null, source: product("/product/10554146"), target: "Fresh spring onion stalks" },
    onion: { file: null, source: search("fresh onion"), target: "Fresh whole onion" },
    spinach: { file: "spinach.jpg", source: product("/product/kok-fah-baby-spinach-200g-13032623"), target: "Fresh spinach pack" },
    lemon: { file: "lemon.jpg", source: product("/product/freshco-lemons-fresh"), target: "Fresh lemons" },
    pork: { file: "pork.jpg", source: product("/product/simply-yumme-pork-lean-slice"), target: "Lean raw pork slices in a labelled pack" },
    "pork-shoulder": { file: null, source: search("pork shoulder butt"), target: "Pork shoulder butt slices" },
    "pork-loin": { file: null, source: search("pork loin chop"), target: "Thick-cut pork loin chops" },
    cabbage: { file: "cabbage.jpg", source: product("/product/orgo-fresh-cabbage-whole-1-pc-90150967"), target: "Ordinary whole green cabbage" },
    squid: { file: null, source: search("squid"), target: "Cleaned squid in a labelled chilled or frozen pack" },
    "mixed-vegetables": { file: null, source: product("/product/fairprice-mixed-vegetable-1kg-11475941"), target: "Mixed vegetables pack" },
    "shimeji-mushroom": { file: "shimeji-mushroom.jpg", source: product("/product/hokto-mushroom-white-shimeiji-100g-11017131"), target: "Shimeji mushroom retail pack" },
    "button-mushroom": { file: "button-mushroom.jpg", source: product("/product/pasar-white-button-mushroom-200g-13101275"), target: "White button mushroom retail pack" },
    "enoki-mushroom": { file: null, source: product("/product/simply-finest-enoki-mushroom-300g-13092651"), target: "Fresh enoki mushroom pack" },
    dashi: { file: "dashi.jpg", source: product("/product/ajinomoto-hon-dashi-kirei-1-kg-90155858"), target: "Japanese dashi stock packet" },
    tuna: { file: "tuna.jpg", source: product("/product/fairprice-tuna-flakes-in-water-160g-13256630"), target: "Canned tuna in water" },
    tofu: { file: "firm-tofu.jpg", source: product("/product/fairprice-tau-kwa-2s-400g-13233989"), target: "Firm tofu in refrigerated retail packaging" },
    cucumber: { file: "cucumber.jpg", source: product("/product/malaysia-naturally-fresh-japanese-cucumber-400g-13097478"), target: "Fresh Japanese cucumber" },
    "sesame-oil": { file: "sesame-oil.jpg", source: product("/product/lee-kum-kee-pure-sesame-oil-207ml-13160717"), target: "Sesame-oil bottle" },
    "rice-vinegar": { file: "rice-vinegar.jpg", source: product("/product/redman-rice-vinegar"), target: "Rice-vinegar bottle" },
    miso: { file: "miso-paste.jpg", source: product("/product/kirei-yamataka-omiso-ya-san-japanese-shiro-miso-paste-1-kg-90085339"), target: "Japanese miso tub or pouch" },
    water: { file: "water.png", source: null, target: "A clean glass of water" },
    apple: { file: null, source: product("/product/china-fuji-apples-5-per-pack-13198956"), target: "Fresh apple" },
    bread: { file: null, source: product("/product/fairprice-wholemeal-bread-80g-420g-12324272"), target: "Sliced sandwich bread" },
    "peanut-butter": { file: null, source: search("FairPrice creamy peanut butter"), target: "Peanut butter jar" },
    "strawberry-jam": { file: null, source: search("strawberry jam"), target: "Strawberry jam jar" },
    banana: { file: null, source: product("/product/13135270"), target: "Fresh banana" },
    mayonnaise: { file: null, source: search("Kewpie Japanese mayonnaise"), target: "Mayonnaise bottle" },
    dashi: { file: "dashi.jpg", source: product("/product/ajinomoto-hon-dashi-kirei-1-kg-90155858"), target: "Japanese dashi stock packet" },
    tuna: { file: "tuna.jpg", source: product("/product/fairprice-tuna-flakes-in-water-160g-13256630"), target: "Canned tuna in water" },
    tofu: { file: "firm-tofu.jpg", source: product("/product/fairprice-tau-kwa-2s-400g-13233989"), target: "Firm tofu in refrigerated retail packaging" },
    cucumber: { file: "cucumber.jpg", source: product("/product/malaysia-naturally-fresh-japanese-cucumber-400g-13097478"), target: "Fresh Japanese cucumber" },
    "sesame-oil": { file: "sesame-oil.jpg", source: product("/product/lee-kum-kee-pure-sesame-oil-207ml-13160717"), target: "Sesame-oil bottle" },
    "rice-vinegar": { file: "rice-vinegar.jpg", source: product("/product/redman-rice-vinegar"), target: "Rice-vinegar bottle" },
    miso: { file: "miso-paste.jpg", source: product("/product/kirei-yamataka-omiso-ya-san-japanese-shiro-miso-paste-1-kg-90085339"), target: "Japanese miso tub or pouch" },
    water: { file: "water.png", source: null, target: "A clean glass of water" },
    apple: { file: null, source: product("/product/china-fuji-apples-5-per-pack-13198956"), target: "Fresh apple" },
    bread: { file: null, source: product("/product/fairprice-wholemeal-bread-80g-420g-12324272"), target: "Sliced sandwich bread" },
    "peanut-butter": { file: null, source: search("FairPrice creamy peanut butter"), target: "Peanut butter jar" },
    "strawberry-jam": { file: null, source: search("strawberry jam"), target: "Strawberry jam jar" },
    banana: { file: null, source: product("/product/13135270"), target: "Fresh banana" },
    mayonnaise: { file: null, source: search("Kewpie Japanese mayonnaise"), target: "Mayonnaise bottle" },
    flour: { file: null, source: search("plain flour"), target: "Plain wheat flour packet" },
    jam: { file: null, source: search("fruit jam"), target: "Fruit jam jar" },
    macaroni: { file: null, source: product("/product/prego-pasta-macaroni-500g-13083276"), target: "Plain elbow macaroni packet" },
    pasta: { file: null, source: product("/product/fairprice-pasta-spaghetti-500g-13184515"), target: "Plain dried spaghetti or pasta packet" },
    "tomato-ketchup": { file: null, source: product("/product/fairprice-tomato-ketchup-320g-13066243"), target: "Tomato ketchup bottle" },
    "consomme-powder": { file: null, source: search("Ajinomoto chicken consomme powder"), target: "Chicken consommé powder packet or tub" },
    "maitake-mushroom": { file: null, source: product("/product/hokto-maitake-mushroom-100g-13041084"), target: "Fresh maitake mushroom pack" },
    "garlic-paste": { file: null, source: product("/product/13157215"), target: "Garlic-paste jar or tube" },
    "salt-pepper-seasoning": { file: null, source: product("/product/sandb-salt-pepper-ajitsuke-shio-kosho-seasoning"), target: "S&B salt-and-pepper seasoning shaker or refill pack" },
    "pork-ribs": { file: null, source: search("fresh pork ribs"), target: "Raw pork ribs" },
    "bak-kut-teh-spices": { file: null, source: product("/product/song-fa-bak-kut-teh-spices-30g-13190511"), target: "Singapore bak kut teh spice packet" },
    garlic: { file: null, source: search("fresh garlic"), target: "Fresh garlic bulb" },
    "tau-pok": { file: null, source: search("tau pok"), target: "Tau Pok fried tofu puffs in a labelled pack" },
    "garlic-pepper": { file: null, source: search("garlic pepper seasoning"), target: "Garlic pepper seasoning bottle" },
    "potato-starch": { file: null, source: search("Japanese potato starch katakuriko"), target: "Potato starch packet" },
    "dashi-soy-sauce": { file: null, source: product("/product/yamaki-shiro-dashi-bonito-stock-seasoning-500-ml-90045774"), target: "Japanese shiro dashi seasoning bottle" },
    "dark-soy-sauce": { file: null, source: search("dark soy sauce"), target: "Dark soy sauce bottle" },
    nori: { file: null, source: "https://payment.fairprice.com.sg/product/hamaotome-ariake-san-yakinori-10-pcs-sushi-seaweed-sheet-10-pc-90081194", target: "Japanese nori seaweed sheets packet" },
    beef: { file: null, source: search("fresh sliced beef"), target: "Minced beef or sliced beef packet" },
    "crab-stick": { file: null, source: search("Japanese crab sticks surimi"), target: "Crab sticks / surimi package" },
    "wagyu-steak": { file: null, source: search("wagyu steak"), target: "Wagyu steak package (chilled/frozen)" },
    "black-pepper": { file: null, source: search("black pepper grinder"), target: "Black pepper grinder or shaker bottle" },
    potato: { file: null, source: product("/product/holland-potato-china-1kg-13057650"), target: "Fresh whole potatoes" },
    "japanese-curry-blocks": { file: null, source: search("S&B Golden Curry mild"), target: "Japanese curry roux block packet" },
    "king-oyster-mushroom": { file: null, source: product("/product/eloasis-king-oyster-mushroom-300g-13243900"), target: "Fresh king oyster mushroom pack" },
    "cherry-tomatoes": { file: null, source: search("fresh cherry tomatoes"), target: "Fresh cherry tomatoes punnet" },
    "chilli-powder": { file: null, source: search("Japanese ichimi chilli powder"), target: "Chilli powder bottle or shaker" },
    "cooked-protein": { file: "tuna.jpg", source: product("/product/fairprice-tuna-flakes-in-water-160g-13256630"), target: "Cooked meat, fish, or other protein flakes/pieces" },
    "rice-seasoning": { file: null, source: search("Japanese furikake rice seasoning"), target: "Furikake rice seasoning packet" },
    kale: { file: null, source: product("/product/vegeponics-pesticide-free-curly-kale-120-g-90065989"), target: "Fresh kale leaves pack" },
    mushrooms: { file: null, source: product("/product/eloasis-mixed-mushroom-combo-200g-13256463"), target: "Fresh mixed mushrooms" },
    "salmon-or-meat": { file: "salmon.jpg", source: product("/product/catch-seafood-atlantic-salmon-fillet-1-3-kg-90122048"), target: "Raw salmon fillet or sliced beef/pork packet" },
    prawns: { file: null, source: search("fresh prawns"), target: "Fresh whole prawns/shrimps packet" },
    "pork-belly": { file: null, source: search("fresh pork belly"), target: "Raw pork belly block or slices" },
    "lotus-root": { file: "lotus-root.jpg", source: product("/product/mr-fresh-slices-lotus-root-350g-13235036"), target: "Fresh lotus root" },
    "fish-cake": { file: null, source: search("Japanese kamaboko fish cake"), target: "Japanese kamaboko fish cake log" },
    "black-beans": { file: null, source: "https://www.fulamingo.com/products/isshin-kuromame-black-beans", target: "Sweetened black soybeans (kuromame)" },
    "osechi-sides": { file: null, source: "https://www.ristorantetakada.com.sg/news-1-1/limited-to-30-sets-%E2%80%93-celebrate-2026-with-ristorante-takada%E2%80%99s-italian-osechi", target: "Japanese Osechi side-dish assortment" },
    "bamboo-shoots": { file: null, source: search("bamboo shoots"), target: "Fresh or canned bamboo shoots" },
    "osechi-vegetables": { file: "lotus-root.jpg", source: product("/product/mr-fresh-slices-lotus-root-350g-13235036"), target: "Fresh lotus root, carrots, bamboo shoots, and mushrooms mix" }
  });
})();


window.nakoData = { 
  langs: ["en", "jp", "mm"], 
  ui, 
  homeSections, 
  foodItems, 
  foodSafetyItems,
  officialReferences,
  routineTasks, 
  recipes, 
  cookingRules,
  householdCookingRulesItem,
  additionalResources,
  trainingData,
  gamificationData,
  checkTranslations
};

// Automatic validation in local testing
if (typeof window !== "undefined") {
  const missing = checkTranslations();
  if (missing.length > 0) {
    console.warn(`[Translation Warning] Found ${missing.length} missing/untranslated strings. Run window.nakoData.checkTranslations() in console for details.`);
  }
}

})();
