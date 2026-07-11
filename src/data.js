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


function food(id, type, icon, title, summary, instructions, note, sortOrder, photos = []) {
  return { id, type, icon, title, summary, instructions: [instructions], mustRemember: Array.isArray(note) ? note : [note], photos, videoUrl: "", trackingMode: type === "placeholder" ? "future" : "reference", sortOrder };
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

function routine(id, bucket, sortOrder, icon, title, summary, frequencyText, note, photos = []) {
  return { id, section: "routine", frequencyBucket: bucket, frequencyText, icon, title, summary, instructions: [summary], mustRemember: Array.isArray(note) ? note : [note], photos, videoUrl: "", trackingMode: "none", trackingCadence: null, trackingAnchor: null, active: true, tags: [], sortOrder };
}


function recipe(id, title, ingredients, method, note, photos = [], type = "dog", attrs = {}) {
  const isHuman = type === "human";
  return { 
    id, 
    icon: "R", 
    title, 
    description: isHuman 
      ? t("Japanese home-cooked recipe idea.", "日本の家庭料理レシピのアイデア。", "ဂျပန်အိမ်ချက် ဟင်းချက်နည်းအိုင်ဒီယာ။")
      : t("Approved topping recipe for Nako.", "ナコ用の承認されたトッピングレシピ。", "Nako အတွက် ခွင့်ပြုထားသော အပေါ်မှတင်ရန် ဟင်းချက်နည်း。"), 
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
    photos: "Photos",
    mustRemember: "Must remember",
    video: "Training video",
    memo: "Memo",
    memoPlaceholder: "Add notes, questions, or anything to confirm.",
    cookingRules: "Cooking Rules For Humans",
    futureTracking: "Tracking placeholder",
    recipes: "Nako Topping Recipes",
    recipeName: "Recipe name",
    ingredients: "Ingredients",
    amount: "Amount",
    method: "How to make",
    routineItems: "Routine items",
    foodItems: "Food and tracking items",
    pinnedSafety: "Pinned safety",
    noItems: "No items yet.",
    back: "Back",
    humanRecipes: "Human recipes",
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
    quickShortcuts: "Quick Shortcuts",
    shortcutNakoWeight: "Nako Weight Tracking",
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
    routineCheckInSubtitle: "Only the recurring tasks worth remembering, all in one place.",
    routineHistory: "Routine History",
    routineHomeRemaining: "{count} current tasks remaining",
    routineHomeComplete: "All current tasks completed",
    currentSingaporeDate: "Singapore date",
    currentPeriods: "Current periods",
    due: "Due",
    completed: "Completed",
    progressSummary: "{done} of {total} completed",
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
    metricOpenWeight: "Open Weight Quick Entry",
    metricCompleted: "Completed by weight entry",
    undo: "Undo",
    completionSaved: "Completion saved.",
    completionRemoved: "Completion removed.",
    backdatePreviousCycle: "Saved to the earlier cycle. The current cycle remains incomplete.",
    historyIntro: "Newest first. Showing the most recent eight weeks by default.",
    filterTask: "Task",
    filterCadence: "Cadence",
    filterFrom: "From",
    filterTo: "To",
    allTasks: "All tasks",
    allCadences: "All cadences",
    noRoutineHistory: "No matching completion history.",
    notCompleted: "Not completed",
    removeCompletion: "Remove completion",
    confirmRemoveCompletion: "Remove this completion?",
    oneOffLifetime: "Lifetime",
    currentWeightDate: "This week's weight date",
    routineDateInvalid: "Choose a valid date.",
    routinePeriodRange: "{start} – {end}",
  },
  jp: {
    appTitle: "Nako Home Care",
    appSubtitle: "食事、レシピ、追跡、および頻度別の家事ガイド。",
    homeEyebrow: "ヘルパーお仕事ガイド",
    sections: "セクション",
    foodFirst: "食事と追跡は頻繁に変更されるため、上部に表示されます。",
    frequency: "頻度",
    description: "説明",
    instructions: "指示事項",
    photos: "写真",
    mustRemember: "重要注意事項",
    video: "トレーニング動画",
    memo: "メモ",
    memoPlaceholder: "メモ、質問、または確認したいことを追加してください。",
    cookingRules: "人間用の料理ルール",
    futureTracking: "追跡用プレースホルダー",
    recipes: "ナコのトッピングレシピ",
    recipeName: "レシピ名",
    ingredients: "材料",
    amount: "分量",
    method: "作り方",
    routineItems: "ルーティン項目",
    foodItems: "食事と追跡項目",
    pinnedSafety: "ピン留めされた安全情報",
    noItems: "項目はありません。",
    back: "戻る",
    humanRecipes: "人間のレシピ",
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
    quickShortcuts: "クイックショートカット",
    shortcutNakoWeight: "ナコの体重測定",
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
    routineCheckInSubtitle: "忘れやすく、記録する価値のある定期作業だけを1か所で確認します。",
    routineHistory: "ルーティン履歴",
    routineHomeRemaining: "現在のタスクがあと{count}件",
    routineHomeComplete: "現在のタスクはすべて完了しました",
    currentSingaporeDate: "シンガポールの日付",
    currentPeriods: "現在の期間",
    due: "未完了",
    completed: "完了",
    progressSummary: "{total}件中{done}件完了",
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
    metricOpenWeight: "体重のクイック入力を開く",
    metricCompleted: "体重入力により完了",
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
  },
  mm: {
    appTitle: "Nako Home Care",
    appSubtitle: "အစားအသောက်၊ ဟင်းချက်နည်း၊ ခြေရာခံခြင်းနှင့် လုပ်ဆောင်ရမည့် အိမ်အလုပ်လမ်းညွှန်။",
    homeEyebrow: "အိမ်ကူညီသူ အလုပ်သင်လမ်းညွှန်",
    sections: "ကဏ္ဍများ",
    foodFirst: "အစားအသောက်နှင့် ခြေရာခံခြင်းသည် မကြာခဏ ပြောင်းလဲသောကြောင့် ထိပ်ဆုံးတွင် ရှိနေသည်။",
    frequency: "ကြိမ်နှုန်း",
    description: "ဖော်ပြချက်",
    instructions: "ညွှန်ကြားချက်များ",
    photos: "ဓာတ်ပုံများ",
    mustRemember: "မဖြစ်မနေ မှတ်သားရန်",
    video: "လေ့ကျင့်ရေးဗီဒီယို",
    memo: "မှတ်စု",
    memoPlaceholder: "မှတ်စု၊ မေးခွန်း သို့မဟုတ် အတည်ပြုရန်အရာများ ထည့်ပါ။",
    cookingRules: "လူသားများအတွက် ချက်ပြုတ်ခြင်းဆိုင်ရာ စည်းကမ်းများ",
    futureTracking: "ခြေရာခံရန်နေရာ",
    recipes: "Nako အတွက် အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ",
    recipeName: "ဟင်းချက်နည်းအမည်",
    ingredients: "ပါဝင်ပစ္စည်းများ",
    amount: "ပမာဏ",
    method: "ပြုလုပ်နည်း",
    routineItems: "ပုံမှန်လုပ်ဆောင်ချက်များ",
    foodItems: "အစားအသောက်နှင့် ခြေရာခံစရာများ",
    pinnedSafety: "အရေးကြီးဘေးကင်းလုံခြုံရေး",
    noItems: "ဘာမှမရှိသေးပါ။",
    back: "နောက်သို့",
    humanRecipes: "လူသားများအတွက် ဟင်းချက်နည်းများ",
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
    quickShortcuts: "အမြန်ဖြတ်လမ်းများ",
    shortcutNakoWeight: "Nako ကိုယ်အလေးချိန်",
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
    routineCheckInSubtitle: "မမေ့သင့်သော ပုံမှန်အလုပ်များကို တစ်နေရာတည်းတွင် စစ်ဆေးပါ။",
    routineHistory: "ပုံမှန်အလုပ် မှတ်တမ်း",
    routineHomeRemaining: "လက်ရှိအလုပ် {count} ခု ကျန်သေးသည်",
    routineHomeComplete: "လက်ရှိအလုပ်အားလုံး ပြီးပါပြီ",
    currentSingaporeDate: "စင်ကာပူရက်စွဲ",
    currentPeriods: "လက်ရှိကာလများ",
    due: "လုပ်ရန်",
    completed: "ပြီးပါပြီ",
    progressSummary: "{total} ခုအနက် {done} ခု ပြီးပါပြီ",
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
    metricOpenWeight: "ကိုယ်အလေးချိန် အမြန်ထည့်သွင်းမှု ဖွင့်ရန်",
    metricCompleted: "ကိုယ်အလေးချိန်ထည့်ပြီး ပြီးစီးသည်",
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
  },
};


const homeSections = [
  sec("food", "F", "#f19a82", "#fff0eb", 
    t("Food, Recipes & Nako Tracking", "食事、レシピ、ナコの追跡", "အစားအသောက်၊ ဟင်းချက်နည်းနှင့် Nako ခြေရာခံခြင်း"), 
    t("Recipes, cooking rules, and future daily tracking placeholders.", "レシピ、料理のルール、および将来の日々の追跡用プレースホルダー。", "ဟင်းချက်နည်းများ၊ ချက်ပြုတ်ခြင်းစည်းကမ်းများနှင့် နေ့စဉ်ခြေရာခံရန်နေရာများ။"),
    "assets/sections/food.png"),
  sec("daily", "D", "#f7b7be", "#fff1f2", 
    t("Daily / Active", "毎日 / アクティブ", "နေ့စဉ် / လက်ရှိလုပ်ဆောင်ဆဲ"), 
    t("Tasks that happen every day, after use, or whenever Nako is active.", "毎日、使用後、またはナコが活動しているときに発生するタスク。", "နေ့စဉ်၊ အသုံးပြုပြီးနောက် သို့မဟုတ် Nako လှုပ်ရှားနေချိန် လုပ်ဆောင်ရမည့်အရာများ။"),
    "assets/sections/daily-active.jpg"),
  sec("weekly", "W", "#92c9ad", "#e7f6ee", 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("The main weekly reset list for the home, Nako, and supplies.", "家庭、ナコ、および消耗品の主な週次リセットリスト。", "အိမ်၊ Nako နှင့် အိမ်သုံးပစ္စည်းများအတွက် အဓิက အပတ်စဉ်ရှင်းလင်းရေးစာရင်း။"),
    "assets/sections/weekly-reset.jpg"),
  sec("fortnightly", "14", "#f2c36f", "#fff6df", 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"), 
    t("Bigger refresh tasks that do not need to happen weekly.", "毎週行う必要のない、より大きなリフレッシュタスク。", "အပတ်စဉ်လုပ်ရန်မလိုသော ပိုမိုကြီးမားသည့် သန့်ရှင်းရေးအလုပ်များ။"),
    "assets/sections/fortnightly-refresh.jpg"),
  sec("monthly", "M", "#b7a4d8", "#f2eefb", 
    t("Monthly", "毎月", "လစဉ်"), 
    t("Monthly maintenance and deeper cleaning references.", "毎月のメンテナンスおよび大掃除の基準。", "လစဉ်ထိန်းသိမ်းမှုနှင့် ပိုမိုနက်ရှိုင်းသော သန့်ရှင်းရေးလုပ်ငန်းများ။"),
    "assets/sections/monthly-maintenance.jpg"),
  sec("quarterly", "Q", "#7db6a5", "#e7f4f0", 
    t("Quarterly / Long Interval", "3ヶ月おき / 長期の間隔", "၃ လတစ်ကြိမ် / ကာလရှည်လုပ်ဆောင်ချက်များ"), 
    t("Rare maintenance tasks kept near the bottom.", "頻度の低いメンテナンス作業（下部に配置）。", "အောက်ဆုံးတွင် ဖော်ပြထားသော လုပ်ခဲသည့် ထိန်းသိမ်းရေးအလုပ်များ။"),
    "assets/sections/quarterly-maintenance.png"),
  sec("as-needed", "?", "#f19a82", "#fff0eb", 
    t("As Needed / Event-Based", "必要に応じて / イベントベース", "လိုအပ်သလို / အခြေအနေအလိုက်"), 
    t("Tasks triggered by shopping, travel, or unusual household needs.", "買い物、旅行、または特別な家庭の必要性によって発生するタスク。", "စျေးဝယ်ခြင်း၊ ခရီးသွားခြင်း သို့မဟုတ် ထူးခြားသောအိမ်သုံးလိုအပ်ချက်များကြောင့် လုပ်ဆောင်ရမည့်အရာများ。"),
    "assets/sections/as-needed.png"),
];


const cookingRules = [
  t("Cook up to 3 meals a day when needed.", "必要に応じて1日最大3食調理します。", "လိုအပ်ပါက တစ်နေ့လျှင် ၃ နပ်အထိ ချက်ပြုတ်ပါ။"),
  t("Focus on high protein and low fat.", "高タンパク質かつ低脂質を意識してください。", "ပရိုတင်းဓာတ်မြင့်မားပြီး အဆီဓာတ်နည်းပါးခြင်းကို အဓိကထားပါ။"),
  t("Do not use onion, coriander, parsley, or bean sprouts.", "玉ねぎ、パクチー、パセリ、もやしは使用しないでください。", "ကြက်သွันနီ၊ နံနံပင်၊ ပါစလီ သို့မဟုတ် ပဲပင်ပေါက် လုံးဝမသုံးပါနှင့်။"),
  t("Ask before using unfamiliar ingredients.", "見慣れない食材を使用する前には確認してください。", "မရင်းနှီးသော ပါဝင်ပစ္စည်းများကို အသုံးမပြုမီ အရင်မေးပါ။"),
  t("Ask before changing the menu.", "メニューを変更する前には確認してください。", "မီနူးကို မပြောင်းလဲမီ အရင်မေးပါ။"),
  t("Clean the kitchen after cooking.", "調理後にキッチンを掃除してください。", "ချက်ပြုတ်ပြီးနောက် မီးဖိုချောင်ကို သန့်ရှင်းရေးလုပ်ပါ။"),
];


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
        t("Global Expansion (10,000 Years Ago): As dogs accompanied humans across the planet, their physical appearance naturally adapted to new environments—developing shorter fur in hot climates and changing tail and ear shapes.", "世界への拡大（1万年前）：犬が人間とともに世界中へ広がるにつれ、その外見は新しい環境に自然に適応しました。暑い地域では毛が短くなり、尾や耳の形も変化しました。", "ကမ္ဘာတစ်ဝန်း ပျံ့နှံ့ခြင်း (လွန်ခဲ့သော နှစ် ၁၀,၀၀၀) - ခွေးများသည် လူသားများနှင့်အတူ ကမ္ဘာတစ်ဝန်း သွားလာလာသည့်အခါ ၎င်းတို့၏ ရုပ်သွင်သည် ပတ်ဝန်းကျင်အသစ်များနှင့် သဘာဝအလျောက် လိုက်လျောညီထွေ ဖြစ်လာခဲ့သည်။ ပူပြင်းသော ရာသီဥတုတွင် အမွေးတိုလာပြီး အမြီးနှင့် နားပုံသဏ္ဌာန်များလည်း ပြောင်းလဲလာခဲ့သည်။"),
        t("Birth of Civilizations (12,000 Years Ago): When humans settled in Mesopotamia to grow the first crops, heavy Mastiff-like dogs protected the harvest from wild animals. This crucial defense allowed humans to build food reserves and transition from nomads to farmers.", "文明の誕生（1万2000年前）：人間がメソポタミアに定住して最初の作物を育て始めたとき、大型のマスティフ系の犬が収穫物を野生動物から守りました。この重要な防衛によって食料を蓄えられるようになり、人間は遊牧生活から農耕生活へ移行できました。", "ယဉ်ကျေးမှုများ ပေါ်ပေါက်ခြင်း (လွန်ခဲ့သော နှစ် ၁၂,၀၀၀) - လူသားများသည် ပထမဆုံးသီးနှံများ စိုက်ပျိုးရန် မက်ဆိုပိုတေးမီးယားတွင် အခြေချသည့်အခါ ကိုယ်ထည်ကြီးသော Mastiff ကဲ့သို့ ခွေးများက သီးနှံရိတ်သိမ်းမှုကို တောရိုင်းတိရစ္ဆာန်များမှ ကာကွယ်ပေးခဲ့သည်။ ဤအရေးကြီးသော ကာကွယ်မှုကြောင့် လူသားများသည် အစားအစာ သိုလှောင်နိုင်ပြီး လှည့်လည်နေထိုင်သူများမှ လယ်သမားများအဖြစ် ပြောင်းလဲနိုင်ခဲ့သည်။"),
        t("Evolution of the Shepherd: As humans became herdsmen, dogs adapted their predatory instincts into a protective role. By raised alongside livestock from birth, they accepted other species as family.", "牧羊犬の進化：人間が牧畜を始めると、犬は捕食本能を守る役割へと適応させました。生まれたときから家畜と一緒に育てられることで、ほかの種を家族として受け入れました。", "သိုးထိန်းခွေး၏ ဆင့်ကဲပြောင်းလဲမှု - လူသားများ မွေးမြူရေးသမားများ ဖြစ်လာသည့်အခါ ခွေးများသည် ၎င်းတို့၏ အမဲလိုက်ဗီဇကို ကာကွယ်စောင့်ရှောက်သည့် အခန်းကဏ္ဍအဖြစ် ပြောင်းလဲအသုံးချလာခဲ့သည်။ မွေးကတည်းက မွေးမြူရေးတိရစ္ဆာန်များနှင့်အတူ ကြီးပြင်းလာခြင်းကြောင့် အခြားမျိုးစိတ်များကို မိသားစုအဖြစ် လက်ခံလာခဲ့သည်။"),
        t("Masters of Human Psychology: Over millennia, dogs developed a brilliant capability to decode human facial expressions, moods, and emotions to survive alongside us.", "人間心理の達人：数千年にわたり、犬は人間とともに生きるために、表情、気分、感情を読み取る優れた能力を発達させました。", "လူသားစိတ်ပညာကို ကျွမ်းကျင်သူများ - နှစ်ထောင်ပေါင်းများစွာအတွင်း ခွေးများသည် ကျွန်ုပ်တို့နှင့်အတူ အသက်ရှင်နိုင်ရန် လူသားတို့၏ မျက်နှာအမူအရာ၊ စိတ်နေစိတ်ထားနှင့် ခံစားချက်များကို ဖတ်ရှုနိုင်သည့် ထူးချွန်သော စွမ်းရည်ကို ဖွံ့ဖြိုးစေခဲ့သည်။"),
        t("The Chemistry of the Bond: Interacting with a dog triggers a mutual release of oxytocin in both human and animal, creating a virtuous circle that lowers heart rates and eases anxiety.", "絆を生む化学：犬と触れ合うと、人間と犬の双方でオキシトシンが放出されます。心拍数を下げ、不安を和らげる好循環が生まれます。", "သံယောဇဉ်၏ ဓာတုဖြစ်စဉ် - ခွေးနှင့် ထိတွေ့ဆက်ဆံခြင်းသည် လူနှင့်တိရစ္ဆာန် နှစ်ဖက်စလုံးတွင် oxytocin ထွက်ရှိစေပြီး နှလုံးခုန်နှုန်းကို လျော့ကျစေကာ စိုးရိမ်ပူပန်မှုကို သက်သာစေသည့် ကောင်းမွန်သော စက်ဝန်းတစ်ခု ဖန်တီးပေးသည်။"),
        t("The Emotional Foundation: A dog's loyalty is driven by reciprocity. Keeping them focused and fulfilled requires active bonding—sharing affection, playing, and simply resting by each other's side.", "感情的な基盤：犬の忠誠心は相互の関係によって育まれます。犬の集中力と充足感を保つには、愛情を分かち合う、一緒に遊ぶ、そばで静かに休むといった積極的な絆づくりが必要です。", "စိတ်ခံစားမှုဆိုင်ရာ အခြေခံ - ခွေး၏ သစ္စာရှိမှုသည် အပြန်အလှန် တုံ့ပြန်မှုအပေါ် အခြေခံသည်။ ၎င်းတို့ကို အာရုံစိုက်ပြီး စိတ်ကျေနပ်မှုရှိစေရန် ချစ်ခင်မှု မျှဝေခြင်း၊ အတူကစားခြင်းနှင့် တစ်ဦးဘေးတစ်ဦး ရိုးရိုးအနားယူခြင်းတို့ဖြင့် တက်ကြွစွာ သံယောဇဉ်တည်ဆောက်ရန် လိုအပ်သည်။")
      ]
    }
  ]
};


const foodItems = [
  food("recipes", "recipeIndex", "R", 
    t("Nako Topping Recipes", "ナコのトッピングレシピ", "Nako အတွက် အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ"), 
    t("Approved Nako topping recipes with ingredients and amounts.", "材料と分量が記載された、承認済みのナコ用トッピングレシピ。", "ပါဝင်ပစ္စည်းများနှင့် ပမာဏများပါဝင်သော Nako အတွက် ခွင့်ပြုထားသော အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ။"), 
    t("Open a recipe before preparing any topping.", "トッピングを準備する前にレシピを開いてください。", "မည်သည့်အပေါ်မှတင်စရာမဆို မပြင်ဆင်မီ ဟင်းချက်နည်းကို အရင်ဖွင့်ပါ။"), 
    t("No seasoning, oil, onion, or garlic unless approved.", "承認されない限り、調味料、油、玉ねぎ、にんにくは使用しないでください。", "ခွင့်ပြုချက်မရှိဘဲ ဟင်းခတ်မှုန့်、ဆီ、ကြက်သွန်နီ သို့မဟုတ် ကြက်သွန်ဖြူ မသုံးပါနှင့်။"), 1,
    [
      photo("assets/sections/topping-recipes.png", 
        t("Healthy dog food bowl with chicken, broccoli, and carrots", "鶏肉、ブロッコリー、にんじんが入った健康的なドッグフードボウル", "ကြက်သား၊ ပန်းဂေါ်ဖီစိမ်းနှင့် မုန်လာဥနီတို့ပါဝင်သော ကျန်းမာရေးနှင့်ညီညွတ်သည့် ခွေးစာခွက်"),
        t("Nako Topping Recipes", "ナコのトッピングレシピ", "Nako အတွက် အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ"))
    ]),
  food("cooking-rules", "rules", "!", 
    t("Cooking Rules For Humans", "人間用の料理ルール", "လူသားများအတွက် ချက်ပြုတ်ခြင်းဆိုင်ရာ စည်းကမ်းများ"), 
    t("Rules to check before cooking or changing any menu.", "調理を始める前やメニューを変更する前に確認すべきルール。", "ချက်ပြုတ်ခြင်း သို့မဟုတ် မီနူးပြောင်းလဲခြင်းမပြုမီ စစ်ဆေးရမည့်စည်းကမ်းများ။"), 
    t("Read all rules before cooking.", "調理する前にすべてのルールを読んでください。", "မချက်ပြုတ်မီ စည်းကမ်းအားလုံးကို ဖတ်ပါ။"), 
    t("Menu changes and unfamiliar ingredients must be confirmed first.", "メニューの変更や見慣れない食材については、まず確認が必要です。", "မီနူးပြောင်းလဲခြင်းနှင့် မရင်းနှီးသော ပါဝင်ပစ္စည်းများကို အရင်အတည်ပြုရမည်။"), 2,
    [
      photo("assets/sections/cooking-rules.png", 
        t("Chef hat with warning and forbidden ingredients", "警告と禁止食材が描かれたシェフの帽子", "သတိပေးချက်နှင့် တားမြစ်ထားသော ဟင်းချက်ပါဝင်ပစ္စည်းများပါရှိသည့် စားဖိုမှူးဦးထုပ်"),
        t("Cooking Rules For Humans", "人間用の料理ルール", "လူသားများအတွက် ချက်ပြုတ်ခြင်းဆိုင်ရာ စည်းကမ်းများ"))
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
    ]),
  food("nako-inventory", "placeholder", "I", 
    t("Nako Inventory", "ナコの在庫状況", "Nako ၏ပစ္စည်းစာရင်း"), 
    t("Future stock tracking for Nako food, pee pads, wipes, and bags.", "ナコのフード、おしっこシート、ウェットティッシュ、袋の将来的な在庫管理機能。", "Nako ၏အစာ၊ ဆီးခံပြား၊ စိုစွတ်သောတစ်ရှူးနှင့် အိတ်များအတွက် နောင်တွင်သုံးမည့် ပစ္စည်းခြေရာခံခြင်း။"), 
    t("Check Nako supplies weekly and add low-stock items to shopping.", "毎週ナコの用品をチェックし、残り少なくなった品物を買い物リストに追加します。", "Nako သုံးပစ္စည်းများကို အပတ်စဉ်စစ်ဆေးပြီး ကုန်ခါနီးပစ္စည်းများကို ဝယ်ယူရန်စာရင်းထဲ ထည့်ပါ။"), 
    t("Tell Edwin early before items fully run out.", "品物が完全に切れる前に、早めにエドウィンに報告してください。", "ပစ္စည်းများ လုံးဝမကုန်မီ Edwin ထံ စောစောအကြောင်းကြားပါ။"), 6,
    [
      photo("assets/sections/nako-inventory.png", 
        t("Storage basket with Nako's food bag, pee pads, wipes, and waste bags", "ナコのフードバッグ、おしっこシート、ウェットティッシュ、袋が入った収納バスケット", "Nako ၏ အစာအိတ်၊ ဆီးခံပြား၊ စိုစွတ်သောတစ်ရှူးနှင့် အိတ်များပါဝင်သော ပလတ်စတစ်ခြင်းတောင်း"),
        t("Nako Inventory", "ナコの在庫状況", "Nako ၏ပစ္စည်းစာရင်း"))
    ]),
  food("nako-emergency", "placeholder", "!", 
    t("Nako Emergency Quick Guide", "ナコ緊急事態クイックガイド", "Nako အရေးပေါ် အမြန်လမ်းညွှန်"), 
    t("Pinned emergency reminder for vomiting, diarrhoea, refusing food, or unsafe behavior.", "嘔吐、下痢、食欲不振、または安全でない行動に対する、ピン留めされた緊急リマインダー。", "အော့အန်ခြင်း၊ ဝမ်းလျှောခြင်း၊ အစာမစားခြင်း သို့မဟုတ် မလုံခြုံသောအပြုအမူများအတွက် ချိတ်ဆွဲထားသော အရေးပေါ်သတိပေးချက်。"), 
    t("Safely isolate Nako, take a photo if useful, and notify Edwin immediately before doing anything else.", "ナコを安全に隔離し、必要に応じて写真を撮り、他のことをする前にすぐにエドウィンに通知してください。", "Nako ကို ဘေးကင်းစွာသီးခြားထားပါ、လိုအပ်လျှင် ဓာတ်ပုံရိုက်ပြီး အခြားအရာများမလုပ်မီ Edwin ထံ ချက်ချင်းအကြောင်းကြားပါ။"), 
    t("Notify Edwin before doing anything else.", "他のことをする前にエドウィンに連絡してください。", "အခြားအရာများ မလုပ်ဆောင်မီ Edwin ထံ အရင်အကြောင်းကြားပါ။"), 7,
    [
      photo("assets/sections/nako-emergency.png", 
        t("First aid kit with dog paw print, heart, and warning bell", "犬の肉球プリント、ハート、警告ベルが付いた救急箱", "ခွေးခြေရာ၊ အသည်းပုံနှင့် သတိပေးခေါင်းလောင်းပါဝင်သော ရှေးဦးသူနာပြုသေတ္တာ"),
        t("Nako Emergency Quick Guide", "ナコ緊急事態クイックガイド", "Nako အရေးပေါ် အမြန်လမ်းညွှန်"))
    ]),
  food("human-food", "recipeIndex", "H", 
    t("Human Food", "人間の食事", "လူသားများအတွက် အစားအစာ"), 
    t("Ideas and recipes for human meals.", "人間用の食事のアイデアとレシピ。", "လူသားများအတွက် စားစရာအိုင်ဒီယာများနှင့် ဟင်းချက်နည်းများ။"), 
    t("Select a recipe to view details.", "詳細を表示するレシピを選択してください。", "အသေးစိတ်ကြည့်ရန် ဟင်းချက်နည်းတစ်ခုကို ရွေးချယ်ပါ။"), 
    t("Double-check ingredients at home before starting to cook.", "料理を始める前に、家にある食材を再確認してください。", "ဟင်းမချက်မီ အိမ်ရှိပါဝင်ပစ္စည်းများကို ထပ်မံစစ်ဆေးပါ။"), 0, [
      photo("assets/sections/human-food.png", 
        t("Healthy breakfast tray with salmon, egg, rice, and miso soup", "鮭、卵、ご飯、味噌汁が入った健康的な朝食トレイ", "ဆယ်လ်မွန်ငါး၊ ကြက်ဥ၊ ထမင်းနှင့် မစ်ဆိုစွပ်ပြုတ်တို့ပါဝင်သည့် ကျန်းမာရေးနှင့်ညီညွတ်သော နံနက်စာလင်ပန်း"),
        t("Human Food", "人間の食事", "လူသားများအတွက် အစားအစာ"))
    ]),
];


const routineTasks = [
  routine("helper-diary-feedback", "daily", 200, "D",
    t("Diary & Feedback", "日記・フィードバック", "နေ့စဉ်မှတ်တမ်းနှင့် အကြံပြုချက်"),
    t("Write anything on your mind: daily thoughts, feelings, questions, feedback, worries, missing family, or anything hard to explain verbally. The app will save it and open a short WhatsApp notice.", "心にあることを何でも書いてください。日々の考え、気持ち、質問、フィードバック、心配なこと、家族が恋しい気持ち、口頭で説明しにくいことなど。アプリが保存し、短いWhatsApp通知を開きます。", "စိတ်ထဲရှိသည့်အရာများကို ဘာမဆိုရေးပါ။ နေ့စဉ်အတွေးများ၊ ခံစားချက်များ၊ မေးခွန်းများ၊ အကြံပြုချက်များ၊ စိုးရိမ်စရာများ၊ မိသားစုကိုလွမ်းနေခြင်း သို့မဟုတ် ပါးစပ်ဖြင့်ရှင်းပြရန်ခက်သည့်အရာများ။ App က သိမ်းဆည်းပြီး WhatsApp အသိပေးချက်အတိုကို ဖွင့်ပေးမည်။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    t("Use this as a personal diary space when speaking is difficult or unclear. Write freely first, then submit to save the entry.", "話すことが難しい、または伝わりにくいときの、個人の日記スペースとして使ってください。まず自由に書き、送信すると記録が保存されます。", "စကားပြောရန်ခက်ခဲသည့်အခါ သို့မဟုတ် မရှင်းလင်းသည့်အခါ ကိုယ်ပိုင်နေ့စဉ်မှတ်တမ်းနေရာအဖြစ် အသုံးပြုပါ။ အရင်ဆုံးလွတ်လပ်စွာရေးပြီး ပို့ပါ၊ ထို့နောက် မှတ်တမ်းကို သိမ်းထားပါမည်။")),
  routine("drinking-water-prep", "daily", 10, "W", 
    t("Drinking Water Prep", "飲料水の準備", "သောက်ရေပြင်ဆင်ခြင်း"), 
    t("Boil water, cool it, and store it in the fridge so there is always enough drinking water at home.", "お湯を沸かして冷まし、冷蔵庫に保管して、常に十分な飲料水があるようにします。", "ရေကိုကျိုပြီး အအေးခံကာ ရေခဲသေတ္တာထဲတွင် ထည့်ထားပါ။ အိမ်တွင် သောက်ရေအမြဲလုံလောက်စွာ ရှိပါစေ။"), 
    t("Daily", "毎日", "နေ့စဉ်"), 
    t("This helps reduce the need to keep buying bottled water.", "これによりボトル入りの水を購入し続ける必要が減ります。", "၎င်းသည် ရေသန့်ဗူးများ အမြဲဝယ်ယူရန် လိုအပ်မှုကို လျှော့ချပေးသည်။"),
    [
      photo("assets/routines/drinking-water-prep-kettle.jpg",
        t("Kettle for boiling drinking water", "飲料水を沸かすやかん", "သောက်ရေကျိုရန် ရေနွေးအိုး"),
        t("Use this kettle to boil the drinking water.", "このやかんで飲料水を沸かします。", "သောက်ရေကို ဤရေနွေးအိုးဖြင့် ကျိုပါ။")),
      photo("assets/routines/drinking-water-prep-fridge-bottles.jpg",
        t("Upright reused glass bottles in the fridge", "冷蔵庫内で立てて保管する再利用ガラス瓶", "ရေခဲသေတ္တာထဲတွင် မတ်မတ်ထားသော ပြန်သုံးဖန်ပုလင်းများ"),
        t("After the boiled water cools, store it upright in the reused glass bottles in the fridge.", "沸かした水が冷めたら、再利用しているガラス瓶に入れて、冷蔵庫で立てて保管します。", "ကျိုထားသောရေ အေးသွားပြီးနောက် ပြန်သုံးသော ဖန်ပုလင်းများထဲထည့်ပြီး ရေခဲသေတ္တာတွင် မတ်မတ်ထား၍ သိမ်းပါ။")),
    ]),
  routine("daily-cooking", "daily", 15, "C",
    t("Daily Cooking", "毎日の料理", "နေ့စဉ်ချက်ပြုတ်ခြင်း"),
    t("Cook 3 meals a day, focusing on high-protein, lower-fat dishes to hit the 180g daily target, plus ad hoc snacks.", "高タンパク・低脂質を意識して、1日3食と必要に応じた軽食を作る。", "တစ်နေ့ ၃ နပ် ချက်ပါ။ နေ့စဉ် protein 180g ရောက်ရန် protein များပြီး အဆီနည်းသော ဟင်းများကို အဓိကထားပါ။ လိုအပ်လျှင် snack များလည်းပြင်ပါ။"),
    t("3 meals/day + snacks", "1日3食＋軽食", "တစ်နေ့ ၃ နပ် + snack"),
    t("Strictly NO onions, NO coriander, NO parsley, NO beansprouts. Do not eat or keep food or snacks in bedrooms; use only the kitchen, dining, or living areas.", "玉ねぎ、パクチー、パセリ、もやしは絶対に入れない。寝室では食べ物やお菓子を食べたり保管したりせず、キッチン、ダイニング、リビングだけで扱ってください。", "ကြက်သွန်နီ၊ နံနံပင်၊ parsley နှင့် ပဲပင်ပေါက်ကို လုံးဝမထည့်ပါနှင့်။ အိပ်ခန်းများတွင် အစားအစာ သို့မဟုတ် မုန့်များကို မစား၊ မထားပါနှင့်။ မီးဖိုချောင်၊ dining သို့မဟုတ် living area တွင်သာ စား/ထားပါ။"),
    [
      photo("assets/routines/daily-cooking-induction.jpg",
        t("Pots on the induction hob for daily cooking", "日々の料理で使用するIHコンロ上の鍋", "နေ့စဉ်ချက်ပြုတ်ခြင်းအတွက် hob ပေါ်ရှိ အိုးများ"),
        t("Cook meals using the induction hob and stainless steel pots.", "IHコンロとステンレス鍋を使用して料理を作ります。", "Hob နှင့် အိုးများကို အသုံးပြု၍ နေ့စဉ်ဟင်းလျာများ ချက်ပြုတ်ပါ။"))
    ]),
  routine("protein-shake-creatine-prep", "daily", 18, "P",
    t("Protein Shake & Creatine Prep", "プロテインシェイクとクレアチン準備", "protein shake နှင့် creatine ပြင်ဆင်ခြင်း"),
    t("Make Edwin's daily protein shake using 1 scoop Optimum Nutrition protein powder and 1 scoop creatine. One scoop of protein powder is about 24g protein.", "エドウィン用に毎日、Optimum Nutritionのプロテインパウダー1スクープとクレアチン1スクープでプロテインシェイクを作る。プロテイン1スクープは約24gのタンパク質。", "Edwin အတွက် နေ့စဉ် protein shake ပြင်ပါ။ Optimum Nutrition protein powder ၁ scoop နှင့် creatine ၁ scoop ကို အသုံးပြုပါ။ protein powder ၁ scoop သည် protein ၂၄g ခန့်ပါသည်။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    t("Use the correct scoop for protein and creatine. Keep the portions consistent unless Edwin gives different instructions.", "プロテインとクレアチンはそれぞれ正しいスプーンを使う。エドウィンから別の指示がない限り、量は一定にする。", "protein နှင့် creatine အတွက် မှန်ကန်သော scoop ကို အသုံးပြုပါ။ Edwin က မတူညီသော ညွှန်ကြားချက် မပေးလျှင် ပမာဏကို တည်ငြိမ်စွာ ထားပါ။"),
    [
      photo("assets/routines/protein-shake-creatine-prep-supplies.jpg",
        t("Protein powder and creatine stored in the kitchen cabinet", "キッチン戸棚に保管しているプロテインパウダーとクレアチン", "မီးဖိုချောင်ဗီရိုထဲတွင် သိမ်းထားသော protein powder နှင့် creatine"),
        t("Use the Optimum Nutrition protein powder and creatine stored together in this cabinet.", "この戸棚に一緒に保管しているOptimum Nutritionのプロテインパウダーとクレアチンを使います。", "ဤဗီရိုထဲတွင် အတူတကွ သိမ်းထားသော Optimum Nutrition protein powder နှင့် creatine ကို အသုံးပြုပါ။")),
    ]),
  routine("clean-up-cooking-appliances", "daily", 20, "K", 
    t("Clean Up & Cooking Appliances", "片付けと調理器具の清掃", "သန့်ရှင်းရေးနှင့် ချက်ပြုတ်သည့်ပစ္စည်းများ"), 
    t("Wash cookware and plates. Wipe kitchen down after every meal. Clean cooking appliances used, including Ninja air fryer, hob, Fujioh hood area, and removable parts if oily or dirty.", "調理器具と皿を洗います。毎食後にキッチンを拭きます。使用した調理器具（Ninjaノンフライヤー、コンロ、Fujiohレンジフード、油汚れのある取り外し可能な部品など）を掃除します。", "အိုးခွက်ပန်းကန်များ ဆေးကြောပါ။ ထမင်းစားပြီးတိုင်း မီးဖိုချောင်ကို သုတ်ပါ။ အသုံးပြုထားသော Ninja လေပူကြော်အိုး၊ မီးဖို၊ Fujioh မီးခိုးစုပ်စက်နှင့် ဆီပေနေသော ဖြုတ်၍ရသည့် အစိတ်အပိုင်းများကို သန့်ရှင်းရေးလုပ်ပါ။"), 
    t("After every meal + as needed", "毎食後＋必要に応じて", "စားပြီးတိုင်း + လိုအပ်သလို"), 
    t("Do not leave oily cookware, food waste, or greasy appliance parts overnight.", "油のついた調理器具、生ゴミ、または脂っこい器具の部品を翌日まで放置しないでください。", "ဆီပေနေသော အိုးခွက်များ၊ စွန့်ပစ်အစားအစာများနှင့် အဆီများသော စက်ပစ္စည်းအစိတ်အပိုင်းများကို တစ်ညတာ မထားခဲ့ပါနှင့်。"),
    [
      photo("assets/routines/clean-up-cooking-appliances-kitchen-overview.jpg",
        t("Kitchen counter and cooking appliances to clean", "掃除するキッチンカウンターと調理家電", "သန့်ရှင်းရေးလုပ်ရမည့် မီးဖိုချောင်ကောင်တာနှင့် ချက်ပြုတ်စက်ပစ္စည်းများ"),
        t("Use this photo as the kitchen cleanup reference. Wash cookware and plates, wipe the hob, countertop, and sink area, and clean appliances such as the Ninja air fryer, blender, and Fujioh hood area when oily or dirty.", "この写真をキッチン清掃の目安にします。調理器具と皿を洗い、コンロ、天板、シンク周りを拭き、Ninjaノンフライヤー、ブレンダー、Fujiohレンジフード周りなど、油汚れや汚れがある調理家電を掃除します。", "ဤဓာတ်ပုံကို မီးဖိုချောင်သန့်ရှင်းရေးအတွက် မှတ်သားပါ။ အိုးခွက်ပန်းကန်များကို ဆေးပါ၊ မီးဖို၊ ကောင်တာနှင့် စင်ပတ်လည်ကို သုတ်ပါ၊ ဆီပေခြင်း သို့မဟုတ် ညစ်ပတ်ခြင်းရှိပါက Ninja air fryer၊ blender နှင့် Fujioh hood ပတ်လည်ကို သန့်ရှင်းရေးလုပ်ပါ။")),
    ]),
  routine("coffee-machine-upkeep", "daily", 30, "C", 
    t("Coffee Machine Upkeep", "コーヒーマシンの手入れ", "ကော်ဖီစက် ထိန်းသိမ်းခြင်း"), 
    t("Empty coffee grounds, rinse the drip tray, refill the water tank, and wipe around the De'Longhi coffee machine.", "コーヒーかすを捨て、ドリップトレイをすすぎ、水タンクに水を補充し、De'Longhiコーヒーマシンの周囲を拭きます。", "ကော်ဖီအနှစ်များကို သွန်ပါ၊ ရေခံပြားကို ဆေးကြောပါ、ရေကန်ကို ရေဖြည့်ပြီး De'Longhi ကော်ဖီစက်ပတ်ပတ်လည်ကို သုတ်ပါ။"), 
    t("Daily / after use", "毎日 / 使用後", "နေ့စဉ် / အသုံးပြုပြီးနောက်"), 
    t("Do not let used coffee grounds or drip tray water sit too long.", "使用済みのコーヒーかすやドリップトレイの水を長時間放置しないでください。", "ကော်ဖီအနှစ်ဟောင်းများနှင့် ရေခံပြားမှ ရေများကို အကြာကြီး ပစ်မထားပါနှင့်။"),
    [
      photo("assets/routines/coffee-machine-upkeep-parts.jpg",
        t("De'Longhi coffee machine with removable parts opened for cleaning", "取り外し部品を開けて掃除するDe'Longhiコーヒーマシン", "သန့်ရှင်းရေးလုပ်ရန် ဖြုတ်နိုင်သော အစိတ်အပိုင်းများ ဖွင့်ထားသော De'Longhi ကော်ဖီစက်"),
        t("After use, empty the coffee grounds, rinse the drip tray and removable parts, refill the water tank, and wipe around the De'Longhi coffee machine.", "使用後はコーヒーかすを捨て、ドリップトレイと取り外し可能な部品をすすぎ、水タンクを補充し、De'Longhiコーヒーマシンの周囲を拭きます。", "အသုံးပြုပြီးနောက် ကော်ဖီအနှစ်များကို သွန်ပါ၊ ရေခံပြားနှင့် ဖြုတ်နိုင်သော အစိတ်အပိုင်းများကို ဆေးပါ၊ ရေကန်ကို ရေဖြည့်ပြီး De'Longhi ကော်ဖီစက်ပတ်လည်ကို သုတ်ပါ။")),
    ]),
  routine("nako-feeding-water", "daily", 35, "N",
    t("Nako - Feeding & Water", "ナコ - エサと水", "နာကို - အစာနှင့်ရေ"),
    t("Feed Nako about 3-4 times a day: kibbles + K9 Natural. Current preferred method: feed dry unless instructed otherwise. After she finishes eating, let her drink water directly from the water bottle to increase water intake. Once her mouth is wet, wipe her mouth down. Wash and refill water bottle daily.", "ナコに1日3〜4回、キブルとK9 Naturalを与える。現在の希望方法は、特に指示がなければドライで与える。食べ終わった後、水分摂取を増やすために水ボトルから直接水を飲ませる。口元が濡れたら口周りを拭く。水ボトルは毎日洗って補充する。", "နာကိုကို တစ်နေ့ ၃-၄ ကြိမ် kibbles + K9 Natural ကျွေးပါ။ လောလောဆယ် ညွှန်ကြားချက်မရှိလျှင် dry အဖြစ်ကျွေးပါ။ စားပြီးနောက် ရေပိုသောက်စေရန် ရေဘူးမှ တိုက်ရိုက်ရေသောက်ခိုင်းပါ။ ပါးစပ်စိုလာလျှင် ပါးစပ်ပတ်ဝန်းကျင်ကို သုတ်ပါ။ ရေဘူးကို နေ့စဉ်ဆေးပြီး ပြန်ဖြည့်ပါ။"),
    t("3-4 meals/day", "1日3〜4食", "တစ်နေ့ ၃-၄ ကြိမ်"),
    [
      t("Monitor whether she eats properly. Keep meal portions consistent unless instructed otherwise. Make sure she drinks water after eating and wipe her mouth after it gets wet.", "ちゃんと食べているか確認する。特に指示がなければ食事量は一定にする。食後に水を飲ませ、口元が濡れたら拭く。", "သူမ အစာကောင်းကောင်းစားနေသလား စောင့်ကြည့်ပါ။ ညွှန်ကြားချက်မရှိလျှင် အစာပမာဏကို မပြောင်းပါနှင့်။ စားပြီးနောက် ရေသောက်စေပြီး ပါးစပ်စိုလာလျှင် သုတ်ပါ။"),
      t("Only leave food out for a short while and watch when Nako eats. When she gets full or is done eating, she will start playing with the bowl and try to flip it, which will cause spillage and dirty the cage. She will also try to stick her paw into the bowl and end up dirtying the cage.", "エサは短い時間だけ出し、ナコが食べている間は様子を見てください。お腹がいっぱいになるか食べ終わると、ボウルで遊び始めてひっくり返そうとし、エサがこぼれてケージが汚れてしまいます。また、ボウルに足を突っ込んでケージを汚してしまうこともあります。", "ခွေးစာကို အချိန်အနည်းငယ်သာ ချထားပေးပြီး နာကို စားနေချိန်တွင် စောင့်ကြည့်ပါ။ သူမ ဗိုက်ပြည့်သွားလျှင် သို့မဟုတ် စားပြီးသွားလျှင် ခွက်ကို ကစားပြီး မှောက်ရန် ကြိုးစားလိမ့်မည်၊ ၎င်းသည် ဖိတ်စင်ပြီး ခြံကို ညစ်ပတ်စေလိမ့်မည်။ သူမသည် ခွက်ထဲသို့ ခြေထောက်ထည့်ရန် ကြိုးစားပြီး ခြံကို ညစ်ပတ်စေလိမ့်မည်။"),
      t("Let Nako drink water regularly from her manual water bottle. The water nozzle attached to her pen flows too slowly, which can cause dehydration. Do not use a water bowl in the pen because she will immediately put her paws in and play with the water, spilling it everywhere.", "手動の給水ボトルから定期的に水を飲ませてください。サークルに取り付けられている給水器は水の出が遅く、脱水症状になる恐れがあります。サークル内に水皿を置くと、ナコがすぐに足を入れて水遊びをしてしまい、辺り一面が濡れてしまうため、水皿は置かないでください。", "လက်ဆွဲရေဘူးမှ ရေကို ပုံမှန်တိုက်ပေးပါ။ ခြံတွင်တပ်ဆင်ထားသော ရေပိုက်ခေါင်းသည် ရေစီးနှေးလွန်းသဖြင့် ရေဓာတ်ခမ်းခြောက်နိုင်ပါသည်။ ခြံထဲတွင် ရေခွက်မထားပါနှင့်၊ အဘယ်ကြောင့်ဆိုသော် သူမသည် ချက်ချင်းခြေထောက်ထည့်၍ ရေဆော့ပြီး ဖိတ်စင်စေသောကြောင့် ဖြစ်သည်။")
    ],
    [
      photo("assets/routines/nako-feeding-spillage.jpg",
        t("Nako standing in her cage next to spilt food on the floor", "床にこぼれたエサの横のケージに立つナコ", "ကြမ်းပြင်ပေါ်တွင် ဖိတ်ကျနေသော အစားအစာဘေးရှိ ခြံထဲတွင်ရပ်နေသော နာကို"),
        t("Only leave food out for a short while and watch when Nako eats. When she gets full or is done eating, she will start playing with the bowl and try to flip it, which will cause spillage and dirty the cage. She will also try to stick her paw into the bowl and end up dirtying the cage.", "エサは短い時間だけ出し、ナコが食べている間は様子を見てください。お腹がいっぱいになるか食べ終わると、ボウルで遊び始めてひっくり返そうとし、エサがこぼれてケージが汚れてしまいます。また、ボウルに足を突っ込んでケージを汚してしまうこともあります。", "ခွေးစာကို အချိန်အနည်းငယ်သာ ချထားပေးပြီး နာကို စားနေချိန်တွင် စောင့်ကြည့်ပါ။ သူမ ဗိုက်ပြည့်သွားလျှင် သို့မဟုတ် စားပြီးသွားလျှင် ခွက်ကို ကစားပြီး မှောက်ရန် ကြိုးစားလိမ့်မည်၊ ၎င်းသည် ဖိတ်စင်ပြီး ခြံကို ညစ်ပတ်စေလိမ့်မည်။ သူမသည် ခွက်ထဲသို့ ခြေထောက်ထည့်ရန် ကြိုးစားပြီး ခြံကို ညစ်ပတ်စေလိမ့်မည်။")),
      photo("assets/routines/nako-meal-prep-bowl.jpg",
        t("Nako's meal bowl with kibble and chicken mixture", "キブルとチキンが混ざったナコのエサ皿", "kibbles နှင့် ကြက်သားရောထားသော နာကို၏ အစာခွက်"),
        t("Portion kibbles mixed with K9 Natural chicken toppings as instructed.", "指示通りにキブルとK9 Naturalのチキントッピングを混ぜ合わせて与えます。", "ညွှန်ကြားထားသည့်အတိုင်း K9 Natural ကြက်သားတပတ်နှင့် kibbles ကို ရောစပ်ကျွေးပါ။")),
      photo("assets/routines/nako-manual-water-bottle.jpg",
        t("Offering water from the manual squeeze travel bottle", "手動のスクイーズボトルから水を飲ませる様子", "လက်ဆွဲရေဘူးဖြင့် ရေတိုက်ကျွေးခြင်း"),
        t("Squeeze the manual water bottle to let her drink regularly, as the pen's nozzle flows too slowly.", "サークルの給水器は水の出が遅いため、手動ボトルを少し押して定期的に水を飲ませてください。", "ခြံ၏ ရေပိုက်ခေါင်းသည် ရေစီးနှေးလွန်းသဖြင့် လက်ဆွဲရေဘူးကို ညှစ်၍ ပုံမှန်ရေတိုက်ပေးပါ။"))
    ]),
  

  routine("nako-potty-pen", "daily", 40, "N", 
    t("Nako - Potty & Pen", "ナコ - トイレとケージ", "Nako - အပေါ့အလေးသွားရာနေရာနှင့် ခြံ"), 
    t("Pick up poop immediately, change soaked pee pads, clean the tray daily, and wash towels or wipe toys regularly.", "ウンチはすぐに拾い、濡れたおしっこシートを交換し、トレイを毎日掃除し、タオルを洗うか、おもちゃを定期的に拭きます。", "ချေးများကို ချက်ချင်းကောက်ပါ၊ စိုစွတ်သော ဆီးခံပြားများကို လဲလှယ်ပါ、လင်ပန်းကို နေ့စဉ်ဆေးကြောပါ、တဘက်များကို လျှော်ပါ သို့မဟုတ် ကစားစရာများကို ပုံမှန်သုတ်ပါ။"), 
    t("Throughout day", "一日中随時", "တစ်နေ့တာလုံး"), 
    t("Clean accidents quickly and keep the pen hygienic.", "排泄物の失敗は素早く掃除し、ケージ内を衛生的に保ちます。", "မတော်တဆ ဖြစ်ပွားမှုများကို မြန်မြန်ဆန်ဆန် သန့်ရှင်းရေးလုပ်ပြီး ခြံကို သန့်ရှင်းအောင် ထားပါ။"),
    [
      photo("assets/routines/nako-potty-pen-tray.jpg",
        t("Nako potty tray with pee pad and poop to clear", "片付けるウンチとおしっこシートがあるナコのトイレトレイ", "ရှင်းလင်းရန် ချေးနှင့် ဆီးခံပြားရှိသော Nako အပေါ့အလေးသွားရာလင်ပန်း"),
        t("Pick up poop immediately, replace soaked pee pads, and clean the tray so Nako's pen stays hygienic.", "ウンチはすぐに拾い、濡れたおしっこシートを交換し、ナコのケージ内を衛生的に保つためトレイを掃除します。", "ချေးများကို ချက်ချင်းကောက်ပါ၊ စိုစွတ်သော ဆီးခံပြားများကို လဲပါ၊ Nako ၏ ခြံကို သန့်ရှင်းစေရန် လင်ပန်းကို ဆေးကြောပါ။")),
    ]),
  routine("nako-exercise-grooming", "daily", 50, "N", 
    t("Nako - Clean, Dry & Groomed", "ナコ - 清潔・乾燥・グルーミング", "နာကို - သန့်ရှင်း၊ ခြောက်သွေ့၊ grooming"), 
    t("After walks, outdoor play, or beach trips, wipe Nako down, dry her fully, brush her coat, and wipe her eyes before she rests on the bed or sofa.", "散歩、外遊び、ビーチの後は、ナコの体を拭き、しっかり乾かし、毛をブラッシングし、目元を拭いてからベッドやソファで休ませる。", "လမ်းလျှောက်ပြီးနောက်၊ အပြင်ကစားပြီးနောက် သို့မဟုတ် ကမ်းခြေသွားပြီးနောက် နာကိုကို သုတ်ပါ၊ အပြည့်အဝ ခြောက်အောင်လုပ်ပါ၊ အမွေးကိုဖြီးပါ、မျက်လုံးပတ်ဝန်းကျင်ကို သုတ်ပြီးမှ အိပ်ရာ သို့မဟုတ် sofa ပေါ်မှာ နားစေပါ။"), 
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
    t("Do not leave her roaming unsupervised.", "監視なしで自由に歩き回らせないでください。", "စောင့်ကြည့်မှုမရှိဘဲ လွှတ်မထားပါနှင့်။")),
  routine("nako-kind-handling", "daily", 80, "!", 
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
    t("If she vomits, has diarrhoea, or refuses food, safely isolate her, take a photo of the mess, and notify me immediately before doing anything else.", "吐く、下痢をする、ご飯を食べない場合は、安全に隔離し、汚れた場所の写真を撮り、何かする前にすぐ連絡する。", "အန်ခြင်း၊ ဝမ်းလျှောခြင်း သို့မဟုတ် အစာမစားခြင်းရှိပါက လုံခြုံစွာ ခွဲထားပါ၊ ညစ်ပတ်နေသည့်နေရာကို ဓာတ်ပုံရိုက်ပါ၊ အခြားဘာမှမလုပ်ခင် ချက်ချင်း ဆက်သွယ်ပါ။"),
    t("Immediately", "すぐに", "ချက်ချင်း"),
    t("Notify Edwin before doing anything else.", "何かする前にエドウィンへ連絡する。", "อခြားဘာမှမလုပ်ခင် Edwin ကို အသိပေးပါ။"),
    [
      photo("assets/routines/nako-emergency-vomit.jpg",
        t("Nako's vomit on the tiled floor", "タイルの床の上のナコの嘔吐物", "ကြွေပြားကြမ်းပြင်ပေါ်ရှိ နာကို၏ အန်ဖတ်"),
        t("An example photo of Nako's vomit on the floor.", "床の上のナコの嘔吐物の写真例。", "ကြမ်းပြင်ပေါ်ရှိ နာကို၏ အန်ဖတ်ပုံစံ နမူနာဓာတ်ပုံ။"))
    ]),

  routine("mail-deliveries", "daily", 100, "P", 
    t("Mail & Deliveries", "郵便物と配達対応", "စာတိုက်နှင့် delivery များ"),
    t("Check the mailbox daily, bring in packages, and answer the door for deliveries. Upon receiving items, unpack them outside, throw away the packaging, and fully wipe down the items outside the house before bringing them in.", "毎日郵便受けを確認し、荷物を持ち帰り、配達が来たら対応する。荷物を受け取ったら、家の外で開封し、梱包材を捨て、家に入れる前に外で商品をしっかり拭く。", "mailbox ကိုနေ့စဉ်စစ်ပါ၊ package များယူလာပါ၊ delivery လာပါက တံခါးဖွင့်လက်ခံပါ။ ပစ္စည်းရပါက အိမ်အပြင်မှာ unpack လုပ်၊ packaging ကိုလွှင့်ပြီး အိမ်ထဲမသွင်းခင် ပစ္စည်းကို အပြင်မှာ သေချာသုတ်ပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    [
      t("Keep parcels safe and inform Edwin/Yukari if anything important arrives. Do not bring dirty packaging directly into the house.", "荷物を安全に保管し、大事な物が届いたらエドウィン／ゆかりに知らせる。汚れた梱包材をそのまま家に入れない。", "parcel များကို လုံခြုံစွာထားပြီး အရေးကြီးသောပစ္စည်းရောက်လျှင် Edwin/Yukari ကို အသိပေးပါ။ ညစ်ပတ်သော packaging ကို အိမ်ထဲ တိုက်ရိုက်မသွင်းပါနှင့်။"),
      t("Unpack everything outside of the house. All unnecessary packaging stays outside and never enters the house; strip the items to bare.", "すべての開封作業は屋外で行ってください。不要な梱包材は屋外に留め、家の中に持ち込まないようにし、中身だけにしてください。", "အိမ်အပြင်ဘက်မှာ အရာအားလုံးကို ထုပ်ပိုးမှုဖြုတ်ပါ။ မလိုအပ်သောအကာအကွယ်ထုပ်ပိုးမှုများအားလုံးကို အပြင်မှာထားခဲ့ပါ၊ အိမ်ထဲကို ဘယ်တော့မှမသွင်းပါနှင့်၊ ပစ္စည်းသက်သက်သာဖြစ်အောင် အခွံခွာပါ။"),
      t("Wipe down the items using disinfectant spray (or wash with water if the item is water-washable, e.g. not electronics) before bringing them in.", "家に入れる前に、消毒スプレーで商品を拭いてください（電化製品以外など、水洗い可能なものは水洗いします）。", "ပစ္စည်းများကို အိမ်ထဲသို့မသွင်းမီ ပိုးသတ်ဆေးစပရေးဖြင့် သုတ်ပါ (အကယ်၍ ပစ္စည်းမှာ ရေဆေးနိုင်သောပစ္စည်းဖြစ်လျှင် ရေဖြင့်ဆေးပါ၊ ဥပမာ- လျှပ်စစ်ပစ္စည်းများ မဟုတ်လျှင်)။")
    ],
    [
      photo("assets/routines/nako-delivery-unpack-outside.jpg",
        t("Package left outside the door", "ドアの外に置かれた荷物", "တံခါးအပြင်ဘက်တွင် ထားရှိသော ပါဆယ်လ်"),
        t("Unpack all mail and packages outside. Disinfect or wash items before bringing them in.", "郵便物や荷物はすべて屋外で開封してください。家に入れる前に消毒または洗浄します。", "စာတိုက်ပစ္စည်းများနှင့် ပါဆယ်လ်အားလုံးကို အပြင်တွင် ထုပ်ပိုးမှုဖြုတ်ပါ။ အိမ်ထဲမသွင်းမီ ပိုးသတ်ဆေးဖျန်းပါ သို့မဟုတ် ဆေးကြောပါ။"))
    ]),

  routine("general-tidiness", "daily", 110, "T", 
    t("General Tidiness", "一般的な整理整頓", "ယေဘုယျ သန့်ရှင်းသပ်ရပ်မှု"), 
    t("Wipe down items left outside and keep them properly back in place so things are not left lying around.", "出しっぱなしになっている物を拭き取り、適切に元の場所に戻して、散らかったままにしないようにします。", "အပြင်တွင် ကျန်ခဲ့သော ပစ္စည်းများကို သုတ်ပြီး ပစ္စည်းများ ရှုပ်ပွမနေစေရန် သင့်တော်သောနေရာတွင် ပြန်သိမ်းပါ။"), 
    t("Daily + as needed", "毎日＋必要に応じて", "နေ့စဉ် + လိုအပ်သလို"), 
    t("Do not leave items lying around. Edwin is sensitive to dust and dirt, so clean visible dust promptly instead of waiting for the next scheduled task.", "物を出しっぱなしにしないでください。エドウィンはほこりや汚れに敏感なので、次の予定日まで待たず、見つけたほこりはすぐに掃除してください。", "ပစ္စည်းများကို ဟိုဟိုဒီဒီ ပြန့်ကြဲမထားပါနှင့်။ Edwin သည် ဖုန်နှင့် အညစ်အကြေးကို အာရုံခံလွယ်သောကြောင့် နောက်သန့်ရှင်းရေးအချိန်ကို မစောင့်ဘဲ မြင်ရသောဖုန်ကို ချက်ချင်းသန့်ရှင်းပါ။")),
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
    t("Take out general trash and dog waste bins daily.", "一般ゴミと犬用ゴミ箱を毎日捨てる。", "အထွေထွေအမှိုက်နှင့် ခွေးအမှိုက်ပုံးကို နေ့စဉ်သွန်ပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    [
      t("Dog waste bin should not be left to smell.", "犬用ゴミ箱は臭いが出るまで放置しない。", "ခွေးအမှိုက်ပုံးကို အနံ့ထွက်သည်အထိ မထားပါနှင့်။"),
      t("Throw all rubbish and general trash daily. Do not let trash accumulate in the bins.", "毎日すべてのゴミや一般ゴミを捨ててください。ゴミ箱にゴミがたまらないようにしてください。", "အမှိုက်များနှင့် အထွေထွေအမှိုက်အားလုံးကို နေ့စဉ်ပစ်ပါ။ အမှိုက်ပုံးထဲတွင် အမှိုက်များ စုပုံမနေပါစေနှင့်။")
    ],
    [
      photo("assets/routines/nako-rubbish-bin-daily.jpg",
        t("Rubbish bin with orange plastic bag liner", "オレンジ色のゴミ袋が入ったゴミ箱", "လိမ္မော်ရောင်အမှိုက်အိတ်စွပ်ထားသော အမှိုက်ပုံး"),
        t("Throw general trash and rubbish daily. Do not let trash build up.", "一般ゴミや生ゴミは毎日捨ててください。ゴミをためないようにします。", "အထွေထွေအမှိုက်နှင့် အမှိုက်များကို နေ့စဉ်ပစ်ပါ။ အမှိုက်များ စုမနေအောင် ထားပါ။"))
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
    t("Check the bathroom/toilet drain holes and hair traps. Remove hair or stuck debris. If water does not drain properly, use the drain pump tool after being taught.", "トイレ・浴室 de 排水口やヘアトラップを確認し、髪の毛や詰まった汚れを取る。水の流れが悪い時は、教わった後に排水ポンプを使う。", "bathroom/toilet drain holes နှင့် hair traps ကို စစ်ပါ။ ဆံပင် သို့မဟုတ် ပိတ်နေသောအညစ်အကြေးများကို ဖယ်ရှားပါ။ ရေကောင်းကောင်းမစီးပါက သင်ပေးပြီးနောက် drain pump tool ကို အသုံးပြုပါ။"),
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
    t("Clean door knobs, handles, switches, appliance handles, dish area, frequently used surfaces, and Edwin's workspace including keyboard, mouse, and work table.", "ドアノブ、取っ手、スイッチ、電化製品のハンドル、食器洗いエリア、頻繁に使用する表面、およびエドウィンのキーボード、マウス、デスクを含む作業スペースを掃除します。", "တံခါးလက်ကိုင်များ၊ ขလုတ်များ၊ စက်ပစ္စည်းလက်ကိုင်များ၊ ပန်းကန်ဆေးသည့်နေရာ၊ မကြာခဏအသုံးပြုသော မျက်နှာပြင်များနှင့် Edwin ၏ ကီးဘုတ်၊ မောက်စ်၊ အလုပ်စားပွဲ အပါအဝင် အလုပ်လုပ်သည့်နေရာကို သန့်ရှင်းရေးလုပ်ပါ။"), 
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

  routine("household-supplies-online", "daily", 145, "S",
    t("Household Supplies & Online Orders", "家庭用消耗品のオンライン注文", "အိမ်သုံးပစ္စည်းများနှင့် အွန်လိုင်းမှ မှာယူခြင်း"), 
    t("Check all tissue boxes regularly and replace or refill any that are low. Check spare household stock weekly, then use Shopee or another agreed platform to add needed items to the cart.", "ティッシュ箱をこまめに確認し、少なくなったら交換・補充する。毎週、家庭用消耗品の予備在庫を確認し、必要な品はShopeeなど合意したオンラインサービスのカートに追加する。", "tissue box အားလုံးကို ပုံမှန်စစ်ပြီး နည်းလာပါက လဲပါ သို့မဟုတ် ဖြည့်ပါ။ အိမ်သုံးပစ္စည်းအပို stock ကို အပတ်စဉ်စစ်ပြီး လိုအပ်တာများကို Shopee သို့မဟုတ် သဘောတူထားသော online platform cart ထဲထည့်ပါ။"),
    t("Daily / throughout the day + weekly stock check", "毎日／日中随時＋毎週の在庫確認", "နေ့စဉ် / တစ်နေ့လုံး + အပတ်စဉ် stock စစ်ဆေးခြင်း"),
    [
      t("When only 1-2 spare tissue packs remain, tell Edwin and add tissue packs to the shopping list or cart. Ask before placing an order.", "予備のティッシュが残り1〜2パックになったら、エドウィンに伝え、買い物リストまたはカートに追加する。注文確定前には必ず確認する。", "tissue အပိုထုပ် ၁-၂ ထုပ်သာကျန်လျှင် Edwin ကိုပြောပြီး ဈေးဝယ်စာရင်း သို့မဟုတ် cart ထဲသို့ tissue ထုပ်များကိုထည့်ပါ။ မှာယူမီ အရင်မေးပါ။"),
      t("Ask before placing orders until the process is clear.", "手順が明確になるまでは、注文する前に確認してください。", "လုပ်ငန်းစဉ်ကို ကောင်းစွာနားမလည်မချင်း မမှာယူမီ အရင်မေးပါ။"),
      t("When household supplies or dog items are running low, add them to the Shopee shopping cart. Do not place the order immediately; inform Edwin or Yukari to review and check out the cart.", "消耗品や犬用品が少なくなってきたら、Shopeeのショッピングカートに追加してください。すぐに注文を確定せず、エドウィンかゆかりに連絡してカートを確認・決済してもらってください。", "အိမ်သုံးပစ္စည်းများ သို့မဟုတ် ခွေးသုံးပစ္စည်းများ ကုန်ခါနီးပါက ၎င်းတို့ကို Shopee ဈေးဝယ်လှည်း (cart) ထဲသို့ ထည့်ပါ။ ချက်ချင်း မှာယူခြင်းမပြုပါနှင့်။ Edwin သို့မဟုတ် Yukari ကို cart ကို စစ်ဆေးပြီး check out လုပ်ရန် အကြောင်းကြားပါ။")
    ],
    [
      photo("assets/routines/nako-shopee-online-orders.jpg",
        t("Shopee shopping app", "Shopeeショッピングアプリ", "Shopee ဈေးဝယ်အက်ပ်"),
        t("Use the Shopee app to search for and add low supplies to the cart.", "Shopeeアプリを使用して、少なくなった消耗品を検索し、カートに追加してください。", "ကုန်ခါနီးပစ္စည်းများကို ရှာဖွေပြီး cart ထဲသို့ ထည့်ရန် Shopee အက်ပ်ကို အသုံးပြုပါ။"))
    ]),

  routine("kitchen-sink-drain-rack-counter", "weekly", 20, "K", 
    t("Kitchen Sink, Drain, Dish Rack & Countertop", "流し台、排水口、水切りラック、天板", "မီးဖိုချောင်စင်၊ ရေနုတ်မြောင်း၊ ပန်းကန်ပြားစင်နှင့် စားပွဲမျက်နှာပြင်"), 
    t("Deep clean the kitchen sink, drain area, dish rack, and kitchen cabinet countertop. Remove slime, food residue, water stains, and oil marks.", "流し台、排水口、水切りラック、キッチンの天板を大掃除します。ぬめり、食べ残し、水垢、油汚れを取り除きます。", "မီးဖိုချောင်စင်၊ ရေနုတ်မြောင်းနေရာ၊ ပန်းကန်ပြားစင်နှင့် မီးဖိုချောင် ကက်ဘိနက် စားပွဲမျက်နှာပြင်ကို သန့်ရှင်းရေးအကြီးစားလုပ်ပါ။ ဂျီးများ၊ အစားအစာအကြွင်းအကျန်များ၊ ရေကွက်များနှင့် ဆီကွက်များကို ဖယ်ရှားပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("This is separate from normal after-meal cleanup because these areas build up grime quickly.", "これらのエリアは汚れが溜まりやすいため、通常の食後の片付けとは別に行います。", "ဤနေရာများသည် ဂျီးမြန်မြန်တက်တတ်သဖြင့် သာမန် ထမင်းစားပြီးနောက် သန့်ရှင်းရေးနှင့် သီးခြားဖြစ်သည်။"),
      t("Deep clean the kitchen sink, faucet, drain, dish rack, and the white marble countertop weekly to prevent stains and mold.", "シミやカビを防ぐため、流し台、蛇口、排水口、水切りラック、および白い大理石の天板を毎週大掃除してください。", "အစွန်းအထင်းများနှင့် မှိုများမဖြစ်စေရန် မီးဖိုချောင်စင်၊ ဘုံဘိုင်၊ ရေနုတ်မြောင်း၊ ပန်းကန်ပြားစင်နှင့် အဖြူရောင်ကျောက်ပြား စားပွဲမျက်နှာပြင်ကို အပတ်စဉ် သန့်ရှင်းရေးအကြီးစားလုပ်ပါ။")
    ],
    [
      photo("assets/routines/nako-kitchen-sink.jpg",
        t("Kitchen sink and countertop setup", "流し台とキッチンの天板のセットアップ", "မီးဖိုချောင်စင်နှင့် စားပွဲမျက်နှာပြင် တပ်ဆင်မှု"),
        t("Keep the sink, black faucet, and white marble countertop clean and free of water stains.", "流し台、黒い蛇口、および白い大理石の天板を清潔に保ち、水垢がつかないようにしてください。", "စင်၊ အနက်ရောင်ဘုံဘိုင်နှင့် အဖြူရောင်ကျောက်ပြား စားပွဲမျက်နှာပြင်ကို သန့်ရှင်းအောင်ထားပြီး ရေကွက်များ ကင်းစင်ပါစေ।"))
    ]),

  routine("nako-weekly-play-pen-deep-clean", "weekly", 25, "N",
    t("Nako - Weekly Play Pen Deep Clean", "ナコ - サークルの週1徹底掃除", "နာကို - pen အပတ်စဉ် deep clean"),
    t("Deep clean Nako's play pen: wipe the panels, floor or mat, pee tray area, towels, and toys.", "ナコのサークルを徹底的に掃除します。パネル、床またはマット、トイレトレー周り、タオル、おもちゃを拭いてください。", "Nako ၏ play pen ကို နက်နက်ရှိုင်းရှိုင်း သန့်ရှင်းပါ။ panels၊ ကြမ်းပြင် သို့မဟုတ် mat၊ pee tray နေရာ၊ တံဘက်များနှင့် ကစားစရာများကို သုတ်ပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"),
    t("Use enzyme cleaner where needed, especially if there may be pee or poop smell.", "必要に応じて、特におしっこやうんちの臭いがある場合は酵素クリーナーを使ってください。", "လိုအပ်ပါက၊ အထူးသဖြင့် ဆီး သို့မဟုတ် အညစ်အကြေးအနံ့ရှိနိုင်သောနေရာတွင် enzyme cleaner ကို အသုံးပြုပါ။")),

  routine("nako-teeth-ears-nails", "daily", 75, "N",
    t("Nako - Teeth / Ears / Nails Check", "ナコ - 歯・耳・爪のチェック", "Nako - သွား / နား / ခြေသည်း စစ်ဆေးခြင်း"), 
    t("Brush Nako's teeth daily once taught. Check ears for smell or redness, and check nails or paws for anything unusual each week.", "教わった後は、ナコの歯を毎日磨きます。毎週、耳に臭いや赤みがないか、爪や足に異常がないかも確認してください。", "သင်ပေးပြီးနောက် Nako ၏ သွားကို နေ့စဉ်တိုက်ပါ။ အပတ်စဉ် နားတွင် အနံ့ သို့မဟုတ် နီခြင်းရှိမရှိနှင့် ခြေသည်း သို့မဟုတ် ခြေဖဝါးတွင် မူမမှန်တာရှိမရှိကိုလည်း စစ်ပါ။"),
    t("Teeth daily + ears/nails weekly", "歯磨きは毎日＋耳・爪は毎週", "သွားတိုက်ခြင်း နေ့စဉ် + နား/ခြေသည်း အပတ်စဉ်"),
    [
      t("Use only Nako's dog toothbrush and toothpaste. Do not force teeth brushing or nail handling if she resists.", "ナコ用の犬用歯ブラシと歯磨き粉だけを使ってください。嫌がる場合は、歯磨きや爪の処理を無理に行わないでください。", "Nako အတွက် dog toothbrush နှင့် toothpaste ကိုသာ အသုံးပြုပါ။ သူမ ရုန်းကန်နေပါက သွားတိုက်ခြင်း သို့မဟုတ် ခြေသည်းကိုင်တွယ်ခြင်းကို အတင်းမလုပ်ပါနှင့်။"),
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
    t("Weigh Nako first thing Sunday morning before breakfast and record the date and weight clearly.", "日曜日の朝一番、朝食前にナコの体重を測り、日付と体重を明確に記録します。", "တနင်္ဂနွေနေ့ နံနက်ပိုင်း အစာမစားမီ Nako ကို ကိုယ်အလေးချိန်ချိန်ပြီး နေ့စွဲနှင့် ကိုယ်အလေးချိန်ကို ရှင်းလင်းစွာ မှတ်တမ်းတင်ပါ။"), 
    t("Every Sunday morning before breakfast", "毎週日曜日の朝食前", "တနင်္ဂနွေနေ့ နံနက်တိုင်း အစာမစားမီ"), 
    t("Use the same scale each time where possible.", "可能な限り毎回同じ体重計を使用してください。", "ဖြစ်နိုင်လျှင် အချိန်တိုင်း တူညီသော ကိုယ်အလေးချိန်စက်ကို အသုံးပြုပါ။"),
    [
      photo("assets/sections/nako-weight.png",
        t("Pink weight scale with paw prints and dog tail", "肉球のプリントと犬の尻尾が付いたピンクの体重計", "ခြေရာများနှင့် ခွေးအမြီးပါဝင်သော ပန်းရောင်ကိုယ်အလေးချိန်စက်"),
        t("Nako Weight Tracking", "ナコの体重測定", "Nako ၏ကိုယ်အလေးချိန် ခြေရာခံခြင်း"))
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
    t("Check and top up daily supplement / pill boxes for Edwin and Yukari when empty or running low.", "エドウィンとゆかりの毎日のサプリメント/ピルボックスが空または少なくなっているか確認し、補充します。", "Edwin နှင့် Yukari တို့အတွက် နေ့စဉ်သောက်ရန် အားဆေး/ဆေးဗူးများ ကုန်ခါနီး သို့မဟုတ် ကုန်သွားပါက ဖြည့်ပေးပါ။"), 
    t("Weekly check + when empty", "毎週チェック＋空のとき", "အပတ်စဉ်စစ်ဆေးမှု + ကုန်သွားသောအခါ"), 
    [
      t("Keep Edwin's and Yukari's boxes separate. Do not change supplements unless instructed.", "エドウィンとゆかりのケースは別々に保管してください。指示がない限り、サプリメントの内容を変更しないでください。", "Edwin နှင့် Yukari ၏ဆေးဗူးများကို သီးခြားစီထားပါ။ ညွှန်ကြားချက်မရှိဘဲ အားဆေးများကို မပြောင်းပါနှင့်。"),
      t("The green box is for Edwin, and the white box is for Yukari. Specific pill instructions for each box will be provided later.", "緑色のケースはエドウィン用、白色のケースはゆかり用です。それぞれのケースに入れる具体的な薬の指示は後日提供されます。", "အစိမ်းရောင်ဗူးမှာ Edwin အတွက်ဖြစ်ပြီး အဖြူရောင်ဗူးမှာ Yukari အတွက်ဖြစ်သည်။ ဗူးတစ်ခုစီတွင် ထည့်ရမည့် အသေးစိတ်ဆေးညွှန်ကြားချက်များကို နောက်ပိုင်းတွင် ဖော်ပြပေးပါမည်။")
    ],
    [
      photo("assets/routines/supplement-pill-boxes.jpg",
        t("Supplement pill boxes", "サプリメントケース", "အားဆေးဆေးဗူးများ"),
        t("Green pill organizer for Edwin, white multi-compartment box for Yukari.", "エドウィン用の緑色のサプリメントケースと、ゆかり用の白色のマルチ仕切りケース。", "Edwin အတွက် အစိမ်းရောင်ဆေးဗူးနှင့် Yukari အတွက် အဖြူရောင်အကန့်ပါဆေးဗူး။"))
    ]),

  routine("toilet-cleaning", "weekly", 70, "T", 
    t("Toilet Cleaning", "トイレの掃除", "အိမ်သာသန့်ရှင်းရေး"), 
    t("Scrub and wash toilets regularly.", "定期的に便器をこすり洗いし、掃除します。", "အိမ်သာများကို ပုံမှန်တိုက်ချွတ်ဆေးကြောပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Keep toilet areas dry and hygienic.", "トイレのエリアは乾燥させ、衛生的に保ってください。", "အိမ်သာနေရာများကို ခြောက်သွေ့ပြီး သန့်ရှင်းအောင် ထားပါ။"),
      t("The main toilet is located next to the kitchen. The other toilet is in the master bedroom.", "メインのトイレはキッチンの隣にあります。もう一方のトイレは主寝室にあります。", "အဓိကအိမ်သာမှာ မီးဖိုချောင်ဘေးတွင် ရှိသည်။ အခြားအိမ်သာတစ်ခုမှာ မာစတာအိပ်ခန်းထဲတွင် ရှိသည်။")
    ],
    [
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


  routine("floor-mats", "weekly", 100, "M", 
    t("Floor Mats", "足拭きマット", "ခြေသုတ်ကော်ဇောများ"), 
    t("Wash the 4 floor mats outside the rooms and toilet.", "部屋とトイレの外にある4枚の床マットを洗います。", "အခန်းများနှင့် အိမ်သာအပြင်ဘက်ရှိ ခြေသုတ်ကော်ဇော ၄ ခုကို လျှော်ဖွပ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Dry completely before placing back to prevent smell, mould, or dampness.", "臭い、カビ、または湿気を防ぐため、元に戻す前に完全に乾かしてください。", "အနံ့ဆိုး၊ မှို သို့မဟုတ် စိုစွတ်မှုမဖြစ်စေရန် ပြန်မချမီ လုံးဝခြောက်သွေ့အောင်ထားပါ။"),
      t("Floor mats are essential to keep feet clean and prevent dust from spreading. Do not wash all four floor mats at the same time—wash only two at a time so the living room is never left completely without mats.", "足拭きマットは足を清潔に保ち、ほこりが広がるのを防ぐために不可欠です。リビングルームが完全にマットなしにならないよう、4枚すべてのマットを同時に洗わず、一度に2枚ずつ洗うようにしてください。", "ခြေသုတ်ကော်ဇောများသည် ခြေဖဝါးများကို သန့်ရှင်းစေပြီး ဖုန်မှုန့်များ ပြန့်နှံ့ခြင်းမှ ကာကွယ်ရန် မရှိမဖြစ်လိုအပ်သည်။ ဧည့်ခန်းတွင် ခြေသုတ်ကော်ဇော လုံးဝမရှိဘဲ မဖြစ်စေရန် ခြေသုတ်ကော်ဇော ၄ ခုလုံးကို တစ်ပြိုင်နက် မလျှော်ပါနှင့် — တစ်ကြိမ်လျှင် ၂ ခုစီသာ လျှော်ပါ။")
    ],
    [
      photo("assets/routines/nako-floor-mat.jpg",
        t("Gray shag floor mat", "グレーのシャギーマット", "မီးခိုးရောင်ခြေသုတ်ကော်ဇော"),
        t("Wipe your feet on this mat to keep them clean. Wash a maximum of two mats at a time.", "足を清潔に保つために、このマットで足を拭いてください。一度に洗うのは最大2枚までにしてください。", "သန့်ရှင်းအောင်ထားရန် ဤကော်ဇောပေါ်တွင် ခြေဖဝါးကို သုတ်ပါ။ တစ်ကြိမ်လျှင် အများဆုံး ၂ ခုသာ လျှော်ပါ။"))
    ]),

  routine("bedrooms-linens", "weekly", 110, "B", 
    t("Bedrooms & Linens", "寝室とシーツ類", "အိပ်ခန်းများနှင့် အိပ်ရာခင်းများ"), 
    t("Tidy bedrooms and change bedsheets regularly.", "寝室を片付け、定期的にベッドシーツを交換します。", "အိပ်ခန်းများကို သပ်ရပ်အောင်ထားပြီး bedsheets များကို ပုံမှန်လဲလှယ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Keep bedsheets and linens fresh.", "ベッドシーツとリネン類を清潔に保ちます。", "အိပ်ရာခင်းများနှင့် အဝတ်အထည်များကို လတ်ဆတ်သန့်ရှင်းအောင် ထားပါ။"),
      t("Change the bed sheets and pillowcases weekly on a regular basis. Keep the bedrooms neat and tidy.", "ベッドシーツと枕カバーを毎週定期的に交換してください。寝室をきれいに整理整頓しておいてください。", "အိပ်ရာခင်းများနှင့် ခေါင်းအုံးစွပ်များကို အပတ်စဉ် ပုံမှန်လဲလှယ်ပေးပါ။ အိပ်ခန်းများကို သပ်ရပ်သန့်ရှင်းအောင် ထားပါ။")
    ],
    [
      photo("assets/routines/nako-bedroom-bedsheet.jpg",
        t("Bedroom bedsheets setup", "寝室のベッドシーツのセットアップ", "အိပ်ခန်း အိပ်ရာခင်းများ တင်ဆက်မှု"),
        t("Weekly change of bedsheets, bolsters, and pillowcases.", "ベッドシーツ、抱き枕カバー、枕カバーの毎週の交換。", "အိပ်ရာခင်းများ၊ ဖက်လုံးစွပ်များနှင့် ခေါင်းအုံးစွပ်များကို အပတ်စဉ် လဲလှယ်ခြင်း။"))
    ]),

  routine("windows-glass-mirrors", "weekly", 120, "G", 
    t("Windows, Glass Panels & Mirrors", "窓、ガラス窓、鏡", "ပြတင်းပေါက်များ၊ မှန်ချပ်များနှင့် မှန်များ"), 
    t("Clean all windows, glass panels, mirrors, window sills, frames, and tracks.", "すべての窓、ガラスパネル、鏡、窓枠、フレーム、およびサッシの溝を掃除します。", "ပြတင်းပေါက်များ၊ မှန်ချပ်များ၊ မှန်များ၊ ပြတင်းပေါက်ခုံများ၊ ဘောင်များနှင့် လမ်းကြောင်းများကို သန့်ရှင်းရေးလုပ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Wipe streak-free where possible. Be careful around window tracks and edges.", "可能な限り跡が残らないように拭き取ってください。窓の溝や端の周りは注意してください。", "ဖြစ်နိုင်လျှင် အစွန်းအထင်းမရှိအောင် သုတ်ပါ။ ပြတင်းပေါက်လမ်းကြောင်းများနှင့် အနားသတ်များအနီးတွင် သတိထားပါ။"),
      t("Keep window tracks and edges clear of dust and grime. Clean all mirrors and glass surfaces regularly.", "窓の溝や端にほこりや汚れが溜まらないようにしてください。すべての鏡やガラス面を定期的に掃除してください。", "ပြတင်းပေါက်လမ်းကြောင်းများနှင့် အနားသတ်များတွင် ဖုန်မှုန့်နှင့် ဂျီးများကင်းစင်အောင် ထားပါ။ မှန်များနှင့် ဖန်သားပြင်အားလုံးကို ပုံမှန်သန့်ရှင်းရေးလုပ်ပါ။")
    ],
    [
      photo("assets/routines/nako-windows-glass-mirrors.jpg",
        t("Windows and frames placeholder", "窓と窓枠のプレースホルダー", "ပြတင်းပေါက်များနှင့် ဘောင်များ နေရာယူပစ္စည်း"),
        t("Wipe the frames, tracks, and glass panes weekly.", "毎週窓枠、溝、ガラス板を拭いてください。", "ဘောင်များ၊ လမ်းကြောင်းများနှင့် ဖန်ချပ်များကို အပတ်စဉ် သုတ်ပေးပါ။"))
    ]),

  routine("sofa-covers-pillows", "weekly", 130, "S", 
    t("Sofa Covers & Pillows", "ソファカバーとクッション", "ဆိုဖာစွပ်များနှင့် ခေါင်းအုံးများ"), 
    t("Wash the 2 sofa covers and the 2 small square sofa pillows.", "2枚のソファカバーと2個の小さな正方形のソファクッションを洗います。", "ဆိုဖာစွပ် ၂ ခုနှင့် စတုရန်းပုံစံ ဆိုဖာခေါင်းအုံးအသေး ၂ ခုကို လျှော်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Dry fully before putting back to prevent damp smell.", "生乾きの臭いを防ぐため、元に戻す前に完全に乾かしてください。", "စိုထိုင်းသောအနံ့ဆိုးများမထွက်စေရန် ပြန်မစွပ်မီ ခြောက်သွေ့အောင် ထားပါ။"),
      t("Wash the sofa covers and pillowcases weekly on a regular basis. If you cannot do it weekly, stretching the interval slightly longer is fine.", "ソファカバーと枕カバーを毎週定期的に洗ってください。毎週行うのが難しい場合は、間隔を少し長めに延ばしても大丈夫です。", "ဆိုဖာစွပ်များနှင့် ခေါင်းအုံးစွပ်များကို အပတ်စဉ် ပုံမှန်လျှော်ပေးပါ။ အပတ်စဉ်မလျှော်နိုင်ပါက လျှော်သည့်ရက်ခြားကာလကို အနည်းငယ် ပိုဆွဲထားနိုင်ပါသည်။")
    ],
    [
      photo("assets/routines/nako-sofa-covers.jpg",
        t("Sofa covers and square pillows", "ソファカバーとクッション", "ဆိုဖာစွပ်များနှင့် ခေါင်းအုံးများ"),
        t("Wash these sofa covers and the small square pillows regularly.", "これらのソファカバーと小さな正方形のクッションを定期的に洗ってください。", "ဤဆိုဖာစွပ်များနှင့် ခေါင်းအုံးစတုရန်းပုံစံအသေးစားများကို ပုံမှန်လျှော်ပေးပါ။"))
    ]),

  routine("ceiling-fan", "weekly", 140, "F", 
    t("Ceiling Fan Cleaning", "天井扇の掃除", "မျက်နှာကျက်ပန်ကာ သန့်ရှင်းရေး"), 
    t("Clean and wipe ceiling fan blades and accessible fan surfaces.", "天井扇の羽根と手の届くファン表面を掃除し、拭きます。", "မျက်နှာကျက်ပန်ကာ အတောင်ပံများနှင့် လက်လှမ်းမီသော ပန်ကာမျက်နှာပြင်များကို သန့်ရှင်းရေးလုပ်ပြီး သုတ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Turn off the fan first. Be careful when using a ladder or stool.", "最初にファンの電源を切ってください。はしごや踏み台を使用するときは注意してください。", "ပထမဦးစွာ ပန်ကာကို ပိတ်ပါ။ လှေကား သို့မဟုတ် ထိုင်ခုံကို အသုံးပြုသည့်အခါ သတိထားပါ။"),
      t("Use a damp cloth or specialized duster to clean the fan blades weekly to prevent dust buildup.", "ほこりの蓄積を防ぐため、湿らせた布や専用のダスターを使用して、毎週ファンの羽根を掃除してください。", "ဖုန်မှုန့်များ စုပုံခြင်းမှ ကာကွယ်ရန် စိုစွတ်သောအဝတ် သို့မဟုတ် သီးသန့်ဖုန်သုတ်တံကို အသုံးပြု၍ ပန်ကာအတောင်ပံများကို အပတ်စဉ် သန့်ရှင်းရေးလုပ်ပါ။")
    ],
    [
      photo("assets/routines/nako-ceiling-fan.jpg",
        t("Ceiling fan setup", "天井扇のセットアップ", "မျက်နှာကျက်ပန်ကာ တင်ဆက်မှု"),
        t("Wipe fan blades regularly to keep them dust-free.", "ほこりが溜まらないように、定期的にファンの羽根を拭いてください。", "ဖုန်မှုန့်များကင်းစင်စေရန် ပန်ကာအတောင်ပံများကို ပုံမှန်သုတ်ပေးပါ။"))
    ]),
  routine("fridge-interior", "weekly", 150, "F", 
    t("Fridge Interior Cleaning", "冷蔵庫内の掃除", "ရေခဲသေတ္တာအတွင်းပိုင်း သန့်ရှင်းရေး"), 
    t("Remove items from the fridge, wipe inside surfaces and shelves, then put everything back neatly.", "冷蔵庫から品物を取り出し、内側の表面と棚を拭き、すべてをきれいに戻します。", "ရေခဲသေတ္တာထဲမှ ပစ္စည်းများကို ထုတ်ပါ၊ အတွင်းပိုင်းမျက်နှာပြင်များနှင့် စင်များကို သုတ်ပါ၊ ထို့နောက် အားလုံးကို သပ်သပ်ရပ်ရပ် ပြန်ထည့်ပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Close the fridge fully, avoid keeping it open long, aim for 5-10 seconds, and close it immediately if it beeps.", "冷蔵庫を完全に閉め、長時間開けたままにしないようにしてください（5〜10秒目安）。警告音が鳴ったらすぐに閉めてください。", "ရေခဲသေတ္တာတံခါးကို လုံအောင်ပိတ်ပါ၊ အချိန်အကြာကြီး ဖွင့်မထားပါနှင့် (၅-၁၀ စက္ကန့်ခန့်သာ ဖွင့်ရန်)၊ အသံမြည်ပါက ချက်ချင်းပြန်ပိတ်ပါ။"),
      t("Keep condiments, jars, and bottles neatly arranged on the side shelves and inside compartments.", "調味料、瓶、ボトル類は、ドアポケットや庫内の仕切りにきれいに整理して保管してください。", "ဟင်းခတ်အမွှေးအကြိုင်များ၊ ဗူးများနှင့် ပုလင်းများကို ဘေးစင်များနှင့် အတွင်းအကန့်များတွင် သပ်သပ်ရပ်ရပ် စီစဉ်ထားပါ။")
    ],
    [
      photo("assets/routines/nako-fridge-interior.jpg",
        t("Fridge interior setup", "冷蔵庫内のセットアップ", "ရေခဲသေတ္တာအတွင်းပိုင်း တင်ဆက်မှု"),
        t("Organize jars, bottles, and storage containers neatly on shelves.", "棚の上の瓶、ボトル、保存容器をきれいに整理整頓してください。", "စင်ပေါ်ရှိ ဗူးများ၊ ပုလင်းများနှင့် သိုလှောင်ဗူးများကို သပ်သပ်ရပ်ရပ် စီစဉ်ထားပါ။"))
    ]),

  routine("cleaning-tools", "weekly", 160, "C", 
    t("Cleaning Tools Maintenance", "掃除用具の手入れ", "သန့်ရှင်းရေးသုံးပစ္စည်းများ ထိန်းသိမ်းခြင်း"), 
    t("Wash mop heads, rinse buckets, clean vacuum filters or parts as needed, replace dirty sponges, and dry cloths properly.", "モップの頭を洗い、バケツをすすぎ、必要に応じて掃除機のフィルターや部品を掃除し、汚れたスポンジを交換し、雑巾を適切に乾かします。", "မော်ပုခေါင်းများကို လျှော်ပါ၊ ပုံးများကို ဆေးကြောပါ၊ လိုအပ်သလို ဖုန်စုပ်စက်ဇကာများ သို့မဟုတ် အစိတ်အပိုင်းများကို သန့်ရှင်းရေးလုပ်ပါ၊ ညစ်ပတ်သော ရေမြှုပ်များကို လဲလှယ်ပါ၊ အဝတ်များကို ခြောက်အောင်ထားပါ။"),
    t("Weekly + as needed", "毎週チェック＋必要に応じて", "အပတ်စဉ် + လိုအပ်သလို"), 
    [
      t("Dirty cleaning tools spread smell and dirt instead of cleaning properly.", "汚れた掃除用具は、適切に掃除する代わりに臭いや汚れを広げてしまいます。", "ညစ်ပတ်သော သန့်ရှင်းရေးပစ္စည်းများသည် ကောင်းမွန်စွာသန့်ရှင်းပေးမည့်အစား အနံ့ဆိုးများနှင့် ဖုန်မှုန့်များကို ပြန့်နှံ့စေသည်။"),
      t("Regularly check the vacuum cleaner parts and replace dirty filters using the replacement filter packs stored on the shelf.", "定期的に掃除機の部品を点検し、棚に保管されている予備のフィルターパックを使用して、汚れたフィルターを交換してください。", "ဖုန်စုပ်စက်၏ အစိတ်အပိုင်းများကို ပုံမှန်စစ်ဆေးပြီး စင်ပေါ်တွင် သိမ်းဆည်းထားသော အပို filter packs များကို အသုံးပြု၍ ညစ်ပတ်သော filter များကို လဲလှယ်ပါ။")
    ],
    [
      photo("assets/routines/nako-cleaning-tools-maintenance.jpg",
        t("Vacuum cleaner and filter parts", "掃除機とフィルター部品", "ဖုန်စုပ်စက်နှင့် filter အစိတ်အပိုင်းများ"),
        t("Store the handheld vacuums and filter replacements neatly on this shelf.", "ハンディ掃除機と予備のフィルターはこの棚にきれいに保管してください。", "လက်ကိုင်ဖုန်စုပ်စက်နှင့် အပို filter များကို ဤစင်ပေါ်တွင် သပ်သပ်ရပ်ရပ် သိမ်းဆည်းထားပါ။"))
    ]),

  routine("blanket-washing", "fortnightly", 10, "B", 
    t("Blanket Washing", "毛布の洗濯", "စောင်လျှော်ခြင်း"), 
    t("Wash thicker blankets one at a time so one blanket is always available for use.", "厚手の毛布を1枚ずつ洗い、常に1枚の毛布を使用できるようにします。", "အမြဲတမ်းသုံးရန် စောင်တစ်ထည် အဆင်သင့်ရှိနေစေရန် ထူထဲသော စောင်များကို တစ်ကြိမ်လျှင် တစ်ထည်စီ လျှော်ပါ။"), 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"), 
    t("Do not wash both blankets on the same day.", "同じ日に両方の毛布を洗わないでください。", "စောင်နှစ်ထည်လုံးကို တစ်ရက်တည်းတွင် မလျှော်ပါနှင့်။")),
  routine("outside-shoe-rack", "fortnightly", 20, "S", 
    t("Outside Shoe Rack & Shoes", "屋外のシューズラックと靴", "အပြင်ဘက် ဖိနပ်စင်နှင့် ဖိနပ်များ"), 
    t("Clean the outside shoe rack and surrounding area. Wipe down the shoes.", "屋外のシューズラックとその周辺エリアを掃除します。靴を拭きます。", "အပြင်ဘက် ဖိနပ်စင်နှင့် ပတ်ဝန်းကျင်နေရာကို သန့်ရှင်းရေးလုပ်ပါ။ ဖိနပ်များကို သုတ်ပါ။"), 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"), 
    t("Keep the area neat and avoid blocking the corridor.", "エリアを整然と保地、廊下をふさがないようにしてください。", "နေရာကို သပ်သပ်ရပ်ရပ် ထားရှိပြီး လူသွားလမ်းပိတ်ဆို့ခြင်းကို ရှောင်ကြဉ်ပါ။")),
  routine("curtain-steaming", "fortnightly", 30, "C", 
    t("Curtain Steaming", "カーテンのスチーム掛け", "လိုက်ကာများကို မီးပူတိုက်ခြင်း"), 
    t("Use the standing garment steamer / steam iron to steam-clean and freshen the curtains.", "立位式の衣類スチーマー/スチームアイロンを使用して、カーテンをスチームクリーニングし、リフレッシュします。", "လိုက်ကာများကို သန့်ရှင်းလတ်ဆတ်စေရန် မီးပူရပ်တိုင် / ရေနွေးငွေ့မီးပူကို အသုံးပြု၍ သန့်ရှင်းရေးလုပ်ပါ။"), 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"), 
    t("Move slowly so the steam heats the fabric properly. Be careful with hot steam.", "スチームが生地にしっかりと熱を伝えるようにゆっくり動かしてください。熱いスチームに注意してください。", "ရေနွေးငွေ့က ပိတ်စကို ကောင်းမွန်စွာ အပူပေးနိုင်ရန် ဖြည်းဖြည်းချင်း ရွှေ့ပါ။ ပူပြင်းသော ရေနွေးငွေ့ကို သတိထားပါ။")),
  routine("ikea-bed-frame", "fortnightly", 40, "B", 
    t("IKEA Bed Frame Under-Compartment Cleaning", "IKEAベッドフレーム下部の掃除", "IKEA ကုတင်အောက်ခြေ သန့်ရှင်းရေး"), 
    t("Lift/open the IKEA king-size bed frame storage area and clean dust and hair collected underneath.", "IKEAキングサイズベッドフレームの収納エリアを持ち上げ/開き、下に溜まったほこりや髪の毛を掃除します。", "IKEA ကင်းဆိုက်ကုတင်အောက် သိုလှောင်မှုနေရာကို မ/ဖွင့်ပြီး အောက်တွင် စုပုံနေသော ဖုန်မှုန့်များနှင့် ဆံပင်များကို သန့်ရှင်းရေးလုပ်ပါ။"), 
    t("Fortnightly", "2週間おき", "၂ ပတ်တစ်ကြိမ်"), 
    t("Be careful when lifting or opening the bed frame.", "ベッドフレームを持ち上げたり開いたりするときは注意してください。", "ကုတင်ဘောင်ကို မတင်သည့်အခါ သို့မဟုတ် ဖွင့်သည့်အခါ သတိထားပါ။")),
  routine("microwave-interior", "monthly", 10, "M", 
    t("Microwave Interior Wipe", "電子レンジ内部の拭き取り", "မိုက်ခရိုဝေ့ဖ်အတွင်းပိုင်း သုတ်ခြင်း"), 
    t("Wipe down the microwave interior, especially after food splatters. Do a complete wipe-down monthly even if it looks clean.", "特に食品が飛び散った後は、電子レンジの内部を拭き取ります。きれいに見えても毎月完全に拭き掃除を行います。", "မိုက်ခရိုဝေ့ဖ်အတွင်းပိုင်းကို သုတ်ပါ၊ အထူးသဖြင့် အစာများ စင်ပြီးနောက်။ သန့်ရှင်းသည်ဟု ထင်ရသော်လည်း လစဉ် အပြီးအပိုင် သုတ်ပေးပါ။"), 
    t("After use if dirty + monthly", "汚れた場合は使用後＋毎月", "ညစ်ပတ်ပါက အသုံးပြုပြီးနောက် + လစဉ်"), 
    t("Clean spills early so stains and smells do not set.", "シミや臭いが定着しないよう、こぼれたものは早めに掃除してください。", "အစွန်းအထင်းနှင့် အနံ့ဆိုးများ မကျန်စေရန် စောစောစီးစီး သန့်ရှင်းရေးလုပ်ပါ။")),
  routine("general-surface-cleaning", "monthly", 20, "S", 
    t("General Surface Cleaning", "一般的な表面の掃除", "ယေဘုယျမျက်နှာပြင်များ သန့်ရှင်းရေး"), 
    t("Wipe general surfaces including cabinets, cupboards, TV area, router, shelves, vases, handles, and decorative items. Organise if messy.", "キャビネット、食器棚、テレビ周辺、ルーター、棚、花瓶、取っ手、装飾品などの一般的な表面を拭きます。散らかっている場合は整理します。", "ဗီရိုများ၊ တီဗီဧရိယာ၊ ရောက်တာ၊စင်များ၊ ပန်းအိုးများ၊ လက်ကိုင်များနှင့် အလှဆင်ပစ္စည်းများ အပါအဝင် ယေဘုယျမျက်နှာပြင်များကို သုတ်ပါ။ ရှုပ်ပွနေပါက စနစ်တကျ ပြန်စီပါ။"), 
    t("Monthly", "毎月", "လစဉ်"), 
    [
      t("Do ad hoc cleaning sooner if dusty, sticky, oily, or after spills.", "ほこり、粘つき、油汚れがある場合、またはこぼした後は、早めに臨時掃除を行ってください。", "ဖုန်ထူခြင်း၊ စေးကပ်ခြင်း၊ ဆီပေခြင်း သို့မဟုတ် ဖိတ်စင်ပြီးနောက် လိုအပ်ပါက သန့်ရှင်းရေးကို စောစောလုပ်ပါ။"),
      t("Edwin is very sensitive to dust and will get an itchy nose and skin. Perform dusting and surface wiping regularly to keep the home dust-free.", "エドウィンはほこりに非常に敏感で、鼻のかゆみや皮膚の荒れ（かゆみ）を引き起こします。家の中にほこりがたまらないよう、定期的にほこり取りと表面の拭き掃除を行ってください。", "Edwin သည် ဖုန်မှုန့်များနှင့် မတည့်ပါ (နှာခေါင်းယားခြင်းနှင့် အရေပြားယားယံခြင်း ဖြစ်စေသည်)။ အိမ်တွင် ဖုန်ကင်းစင်စေရန် ပုံမှန် ဖုန်သုတ်ခြင်းနှင့် မျက်နှာပြင်များကို သုတ်ခြင်းတို့ ပြုလုပ်ပါ။")
    ],
    [
      photo("assets/routines/edwin-dust-allergy.jpg",
        t("Edwin's skin showing allergic redness and itching from dust", "ほこりによるアレルギー性の赤みとかゆみが出たエドウィンの肌", "ဖုန်မှုန့်ကြောင့် အရေပြားနီရဲပြီး ယားယံသည့် ဓာတ်မတည့်မှုဖြစ်နေသော Edwin ၏ အရေပြား"),
        t("Edwin is very sensitive to dust and will get an itchy nose and skin.", "エドウィンはほこりに非常に敏感で、鼻のかゆみや皮膚の荒れ（かゆみ）を引き起こします。", "Edwin သည် ဖုန်မှုန့်များနှင့် မတည့်ပါ (နှာခေါင်းယားခြင်းနှင့် အရေပြားယားယံခြင်း ဖြစ်စေသည်)။"))
    ]),
  routine("pillow-mattress-vacuuming", "monthly", 30, "P", 
    t("Pillow & Mattress Vacuuming", "枕とマットレスの掃除機掛け", "ခေါင်းအုံးနှင့် မွေ့ရာများကို ဖုန်စုပ်ခြင်း"), 
    t("Vacuum pillows and accessible mattress surfaces using a small mattress/pillow vacuum cleaner after one is bought.", "専用の小型掃除機が購入された後、それを使用して枕と手の届くマットレス表面に掃除機を掛けます。", "ခေါင်းအုံး/မွေ့ရာ ဖုန်စုပ်စက်ဝယ်ပြီးပါက ခေါင်းအုံးများနှင့် လက်လှမ်းမီသော မွေ့ရာမျက်နှာပြင်များကို ဖုန်စုပ်ပေးပါ။"), 
    t("Monthly", "毎月", "လစဉ်"), 
    t("Mattress is heavy, so no full mattress airing for now.", "マットレスは重いため、当面の間はマットレス全体の天日干しなどは行いません。", "မွေ့ရာသည် လေးလံသောကြောင့် လောလောဆယ် လေထုတ်ခြင်း အပြည့်အဝမလုပ်ပါ။")),
  routine("aircon-filter-fan-coil", "monthly", 40, "A", 
    t("Aircon Filter & Fan Coil Wipe", "エアコンフィルターとファンコイルの拭き取り", "အဲကွန်းဇကာနှင့် ဖန်ကွိုင်သုတ်ခြင်း"), 
    t("Clean aircon filters and lightly wipe accessible fan coil surfaces after being taught.", "指導後、エアコンフィルターを掃除し、手の届くファンコイル表面を軽く拭きます。", "သင်ကြားပေးပြီးနောက် အဲကွန်းဇကာများကို သန့်ရှင်းရေးလုပ်ပြီး လက်လှမ်းမီသော ဖန်ကွိုင်မျက်နှာပြင်များကို အသာအယာသုတ်ပါ။"), 
    t("Monthly", "毎月", "လစဉ်"), 
    t("Only do safe, accessible parts. Do not dismantle deeper parts.", "安全で手の届く部分のみを行ってください。深い部分まで分解しないでください。", "ဘေးကင်းပြီး လက်လှမ်းမီသော အစိတ်အပိုင်းများကိုသာ လုပ်ဆောင်ပါ။ ပိုမိုနက်ရှိုင်းသော အစိတ်အပိုင်းများကို ဖြုတ်ခြင်းမပြုပါနှင့်။")),
  routine("washer-deep-clean", "quarterly", 10, "W", 
    t("Washer Deep Clean", "洗濯機の大掃除", "အဝတ်လျှော်စက် သန့်ရှင်းရေးအကြီးစား"), 
    t("Empty drum deep clean: rinse detergent drawer, clean pump filter, treat rubber-seal mould, wipe exterior and vents, and optionally run a 90C empty wash with descaler or citric acid.", "空のドラムの大掃除：洗剤投入口をすすぎ、ポンプフィルターを掃除し、ゴムシールのカビを処理し、外装と通気口を拭き、必要に応じてディスケラーまたはクエン酸を使用して90℃の空洗濯を行います。", "ဗလာဒရမ် သန့်ရှင်းရေးအကြီးစား- ဆပ်ပြာအံဆွဲကို ဆေးကြောပါ၊ ပန့်ဇကာကို သန့်ရှင်းရေးလုပ်ပါ၊ ရာဘာကွင်းမှ မှိုများကို ရှင်းလင်းပါ၊ အပြင်ပန်းနှင့် လေဝင်ပေါက်များကို သုတ်ပါ၊ လိုအပ်ပါက သံချေးချွတ်ဆေး သို့မဟုတ် citric acid သုံးပြီး ၉၀ ဒီဂရီဖြင့် ဗလာလျှော်ပါ။"), 
    t("Quarterly", "3ヶ月おき", "၃ လတစ်ကြိမ်"), 
    t("For pump filter: open bottom flap, place tray, drain water, unscrew cap, remove debris, and refit securely.", "ポンプフィルターの場合：下部のフラップを開き、トレイを置き、水を排出し、キャップを外し、ゴミを取り除き、しっかりと元に戻します。", "ပန့်ဇကာအတွက်- အောက်ခြေအဖုံးကို ဖွင့်ပါ၊ လင်ပန်းချပါ、ရေထုတ်ပါ、အဖုံးကို လှည့်ဖွင့်ပါ、အမှိုက်များကို ဖယ်ရှားပြီး သေချာစွာ ပြန်ပိတ်ပါ။")),
  routine("doorbell-charging", "quarterly", 20, "D", 
    t("Doorbell Charging", "ドアホンの充電", "တံခါးခေါင်းလောင်း အားသွင်းခြင်း"), 
    t("Charge the Dling doorbell regularly so it does not run out of battery.", "バッテリー切れにならないよう、Dlingドアホンを定期的に充電します。", "ဘက်ထရီမကုန်စေရန် Dling တံခါးခေါင်းလောင်းကို ပုံမှန်အားသွင်းပါ။"), 
    t("Quarterly / every 3 months", "3ヶ月おき / 3ヶ月ごと", "၃ လတစ်ကြိမ် / ၃ လတစ်ခါ"), 
    t("Check battery level if the app shows low battery earlier.", "アプリで事前にローバッテリーが表示された場合は、バッテリー残量を確認してください。", "အက်ပ်တွင် ဘက်ထရီအားနည်းနေကြောင်း စောစောပြသပါက ဘက်ထရီပမာဏကို စစ်ဆေးပါ။")),
  routine("coffee-machine-descaling", "quarterly", 30, "C", 
    t("Coffee Machine Descaling", "コーヒーマシンの石灰除去", "ကော်ဖီစက် သံချေးချွတ်ခြင်း"), 
    t("Descale the coffee machine when it blinks/shows the descaling indicator, or every 4-6 months depending on usage.", "石灰除去インジケーターが点滅/表示されたとき、または使用状況に応じて4〜6ヶ月ごとにコーヒーマシンの石灰除去を行います。", "သံချေးချွတ်ရန် သတိပေးချက်ပြသောအခါ သို့မဟုတ် အသုံးပြုမှုအပေါ် မူတည်၍ ၄-၆ လတစ်ကြိမ် ကော်ဖီစက်ကို သံချေးချွတ်ပါ။"), 
    t("Ad hoc / every 4-6 months", "臨時 / 4〜6ヶ月ごと", "လိုအပ်သလို / ၄-၆ လတစ်ကြိမ်"), 
    t("Follow the machine indicator and use the correct descaling process.", "マシンのインジケーターに従い、適切な石灰除去手順を行ってください。", "စက်၏ အချက်ပြချက်ကို လိုက်နာပြီး မှันကန်သော သံချေးချွတ်ခြင်း လုပ်ငန်းစဉ်ကို အသုံးပြုပါ။")),
  routine("grocery-shopping", "as-needed", 10, "G", 
    t("Grocery Shopping", "食料品の買い物", "ကုန်စုံဆိုင် စျေးဝယ်ခြင်း"), 
    t("Restock pantry and fridge. Check what food is running low before buying.", "パントリーと冷蔵庫を補充します。購入する前に不足している食品を確認します。", "ဟင်းချက်စရာများနှင့် ရေခဲသေတ္တာကို ဖြည့်ပါ။ မဝယ်မီ မည်သည့်အရာ ကုန်ခါနီးနေသည်ကို စစ်ဆေးပါ။"), 
    t("As needed", "必要に応じて", "လိုအပ်သလို"), 
    t("Coordinate before buying larger or unusual items.", "大きな品物や普通でない品物を購入する前に調整してください。", "ကြီးမားသော သို့မဟုတ် ပုံမှန်မဟုတ်သော ပစ္စည်းများ မဝယ်မီ ညှိနှိုင်းပါ။")),
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
  routine("yukari-flight-packing", "as-needed", 20, "Y", 
    t("Yukari - Flight Work Packing", "ゆかり - フライト業務の荷造り", "Yukari - လေယာဉ်ခရီးစဉ်အတွက် အထုပ်ပြင်ခြင်း"), 
    t("Help pack and unpack Yukari's work items and luggage when she needs to fly.", "ゆかりがフライトする際に、仕事用アイテムやスーツケースの荷造り・荷解きを手伝います。", "Yukari လေယာဉ်စီးရန် ရှိသည့်အခါ သူမ၏ အလုပ်ပစ္စည်းများနှင့် ခရီးဆောင်အိတ်များကို ထုပ်ပိုးခြင်းနှင့် ဖွင့်ခြင်းများ ကူညီပေးပါ။"), 
    t("When Yukari has flights", "ゆかりにフライトがあるとき", "Yukari လေယာဉ်ခရီးစဉ်ရှိသည့်အခါ"), 
    t("Check uniform/work items, toiletries, chargers, and anything needed for flight duty.", "制服/仕事用アイテム、洗面用具、充電器、およびフライト業務に必要なものをチェックします。", "ယူနီဖောင်း/အလုပ်ပစ္စည်းများ၊ တစ်ကိုယ်ရေသုံးပစ္စည်းများ၊ အားသွင်းကြိုးများနှင့် လေယာဉ်ခရီးစဉ်အတွက် လိုအပ်သောအရာများကို စစ်ဆေးပါ။")),
  routine("general-household-duties", "as-needed", 30, "H", 
    t("General Household Duties", "一般的な家事任務", "ယေဘုယျ အိမ်မှုကိစ္စများ"), 
    t("Catch-all for reasonable household duties not specifically listed above. This list may be adjusted as required.", "上記に明確に記載されていない合理的な家事任務のすべて。このリストは必要に応じて調整される場合があります。", "အထက်တွင် အထူးဖော်ပြမထားသော သင့်လျော်သောအိမ်မှုကိစ္စများ။ ဤစာရင်းကို လိုအပ်သလို ညှိနှိုင်းပြင်ဆင်နိုင်သည်။"), 
    t("Ad hoc / as needed", "臨時 / 必要に応じて", "လိုအပ်သလို / အခြေအနေအရ"), 
    t("Use common sense. Ask if unsure, especially if outside normal household duties.", "常識を働かせてください。特に通常の家事の範囲外で不明な点がある場合は質問してください。", "ယေဘုယျဆင်ခြင်တုံတရားကို အသုံးပြုပါ။ မသေချာပါက အထူးသဖြင့် သာမန်အိမ်မှုကิစ္စများအပြင်ဘက်ဖြစ်ပါか မေးမြန်းပါ။")),
  routine("fire-extinguisher-training", "as-needed", 40, "!",
    t("Fire Extinguisher Training", "消火器の使い方の確認", "မီးသတ်ဆေးဘူး အသုံးပြုနည်း လေ့ကျင့်ခြင်း"),
    t("One-off training to learn where the fire extinguisher is kept and how to use it safely.", "消火器の保管場所と安全な使い方を学ぶための一回限りの訓練です。", "မီးသတ်ဆေးဘူးထားသည့်နေရာနှင့် လုံခြုံစွာအသုံးပြုနည်းကို သင်ယူရန် တစ်ကြိမ်တည်း လေ့ကျင့်မှုဖြစ်သည်။"),
    t("One-off training", "1回限りの訓練", "တစ်ကြိမ်တည်း လေ့ကျင့်မှု"),
    t("Use it only if safe. If unsure, leave the area and call for help. Remove this task after the training is completed.", "安全な場合のみ使ってください。不安ならその場を離れ、助けを呼んでください。訓練が完了したらこの項目を削除してください。", "လုံခြုံပါကသာ အသုံးပြုပါ။ မသေချာပါက နေရာမှထွက်ပြီး အကူအညီခေါ်ပါ။ လေ့ကျင့်မှုပြီးပါက ဤ task ကို ဖယ်ရှားပါ။")),
];

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

const pillowMattressVacuumingRoutine = routineTasks.find((task) => task.id === "pillow-mattress-vacuuming");
if (pillowMattressVacuumingRoutine) {
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
  washerDeepCleanRoutine.mustRemember.push(
    t("Rare guided task: do this only when Edwin asks and guides the exact steps. More detailed steps will be added here after the first walkthrough.", "まれに行うガイド付き作業です。Edwinが依頼し、正確な手順を案内したときだけ行ってください。最初の説明後に、より詳しい手順をここに追加します。", "ရှားရှားပါးပါး လမ်းညွှန်ချက်ဖြင့်လုပ်ရသောအလုပ်ဖြစ်သည်။ Edwin ကတောင်းဆိုပြီး တိကျသောအဆင့်များကို လမ်းညွှန်သောအခါမှသာလုပ်ပါ။ ပထမဆုံး walkthrough ပြီးနောက် အသေးစိတ်အဆင့်များကို ဤနေရာတွင် ထပ်ထည့်မည်။")
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
  coffeeMachineDescalingRoutine.videoUrl = "https://www.youtube.com/embed/30EVN-fIM3I";
}

const groceryShoppingRoutine = routineTasks.find((task) => task.id === "grocery-shopping");
if (groceryShoppingRoutine) {
  groceryShoppingRoutine.frequencyBucket = "daily";
  groceryShoppingRoutine.frequencyText = t("Daily", "毎日", "နေ့စဉ်");
  groceryShoppingRoutine.sortOrder = 32;
  groceryShoppingRoutine.mustRemember.push(
    t("Grocery shopping is now a daily task. Check the fridge, pantry, and meal needs before buying.", "食料品の買い物は毎日の作業になりました。買う前に冷蔵庫、食品棚、食事に必要なものを確認してください。", "ကုန်စုံဝယ်ခြင်းသည် ယခု နေ့စဉ်အလုပ်ဖြစ်သည်။ မဝယ်မီ ရေခဲသေတ္တာ၊ pantry နှင့် အစားအစာအတွက်လိုအပ်ချက်များကို စစ်ပါ။")
  );
  groceryShoppingRoutine.photos = [
    photo("assets/routines/nako-grocery-shopping.png",
      t("Daily grocery shopping items", "毎日の食料品の買い物品", "နေ့စဉ် ကုန်စုံဝယ်သော ပစ္စည်းများ"),
      t("Buy daily groceries based on what is running low and what is needed for meals.", "少なくなっているものと食事に必要なものを確認して、毎日の食料品を買ってください。", "ကုန်သွားခါနီးသောအရာများနှင့် အစားအစာအတွက် လိုအပ်သောအရာများအပေါ်မူတည်၍ နေ့စဉ်ကုန်စုံဝယ်ပါ။")),
    ...groceryShoppingRoutine.photos
  ];
}

const yukariFlightPackingRoutine = routineTasks.find((task) => task.id === "yukari-flight-packing");
if (yukariFlightPackingRoutine) {
  yukariFlightPackingRoutine.instructions = [
    t("Check the details/packing list for the specific items needed for that flight or trip.", "そのフライトまたは旅行に必要な具体的な物は、詳細または荷造りリストで確認してください。", "ထိုလေယာဉ်ခရီး သို့မဟုတ် ခရီးစဉ်အတွက် လိုအပ်သောပစ္စည်းများကို အသေးစိတ်/packing list တွင် စစ်ပါ။"),
    t("Packing depends on the trip type, destination, and length of the flight duty.", "荷造りは、旅行の種類、行き先、フライト勤務の長さによって変わります。", "အထုပ်ပြင်ခြင်းသည် ခရီးအမျိုးအစား၊ သွားမည့်နေရာနှင့် flight duty ကြာချိန်အပေါ် မူတည်သည်။"),
    t("For turnaround trips, pack much less; usually one small luggage is enough.", "日帰り往復のようなターンアラウンド便では荷物は少なめで、通常は小さいスーツケース1つで十分です。", "Turnaround ခရီးများအတွက် ပစ္စည်းအနည်းငယ်သာထည့်ပါ။ ပုံမှန်အားဖြင့် luggage အသေးတစ်လုံးလုံလောက်သည်။"),
    t("For Japan trips or longer flights, the big grey luggage may be needed. Confirm before packing.", "日本行きや長いフライトでは、大きなグレーのスーツケースが必要になる場合があります。荷造り前に確認してください。", "Japan ခရီး သို့မဟုတ် ပိုရှည်သော flight များအတွက် မီးခိုးရောင် luggage ကြီးလိုနိုင်သည်။ အထုပ်မပြင်မီ အတည်ပြုပါ။")
  ];
  yukariFlightPackingRoutine.mustRemember.push(
    t("Do not assume every flight needs the same luggage. Match the bag size and packed items to the actual trip.", "すべてのフライトで同じ荷物が必要だと思い込まないでください。実際の旅行に合わせてバッグの大きさと中身を調整してください。", "Flight တိုင်းတွင် luggage တူတူလိုသည်ဟု မယူဆပါနှင့်။ အမှန်တကယ်ခရီးနှင့်ကိုက်ညီအောင် အိတ်အရွယ်အစားနှင့် ထည့်မည့်ပစ္စည်းများကို ရွေးပါ။")
  );
  yukariFlightPackingRoutine.photos = [
    photo("assets/routines/nako-yukari-flight-packing.jpg",
      t("Flight work packing with luggage", "フライト勤務用の荷物準備", "Flight အလုပ်အတွက် luggage ထုပ်ပိုးခြင်း"),
      t("Reference setup for packing flight work items. Use the details list and adjust luggage size by trip type.", "フライト勤務用品の荷造り参考写真です。詳細リストを使い、旅行の種類に合わせてスーツケースの大きさを調整してください。", "Flight အလုပ်ပစ္စည်းများ ထုပ်ပိုးရန် ကိုးကားပုံဖြစ်သည်။ အသေးစိတ်စာရင်းကိုသုံးပြီး ခရီးအမျိုးအစားအလိုက် luggage အရွယ်အစားကိုညှိပါ။")),
    ...yukariFlightPackingRoutine.photos
  ];
}

const nakoSupervisionRoutine = routineTasks.find((task) => task.id === "nako-supervision");
if (nakoSupervisionRoutine) {
  nakoSupervisionRoutine.mustRemember.unshift(
    t("Check that exactly two fingers fit between Nako's collar and neck. It must not be too tight or too loose; check before she goes out or roams.", "ナコの首輪と首の間に指がちょうど2本入るか確認する。きつ過ぎず、緩過ぎないようにし、外出または自由に歩き回らせる前に毎回確認する。", "Nako ၏လည်ပတ်နှင့်လည်ပင်းကြား လက်ချောင်း ၂ ချောင်းတိတိ ဝင်နိုင်မဝင်နိုင် စစ်ပါ။ အရမ်းကျပ်လွန်း သို့မဟုတ် ချောင်လွန်းမနေစေရ၊ အပြင်ထွက်မီ သို့မဟုတ် လွတ်လပ်စွာသွားလာမီ စစ်ပါ။"),
    t("⚠️ **WINDOW SAFETY ALERT:** There are no window grills right now. Chocho/helper must not lean out or stand close to open windows, and Nako must be kept away from window edges at all times.", "⚠️ **窓の安全注意:** 現在、窓にグリルは付いていません。Chocho/ヘルパーは開いた窓から身を乗り出したり近くに立ったりしないでください。Nakoも常に窓の端から離してください。", "⚠️ **ပြတင်းပေါက် ဘေးကင်းရေး သတိပေးချက်:** လောလောဆယ် ပြတင်းပေါက်တွင် grill မရှိပါ။ Chocho/helper သည် ဖွင့်ထားသောပြတင်းပေါက်အနားတွင် မယောင်းထွက်ရ၊ မနီးကပ်စွာမရပ်ရပါ။ Nako ကိုလည်း အမြဲ ပြတင်းပေါက်အနားမှ ဝေးဝေးထားပါ။")
  );
  nakoSupervisionRoutine.photos = [
    photo("assets/routines/nako-window-no-grills-alert.jpg",
      t("Open window with no grills", "グリルのない開いた窓", "grill မရှိသော ဖွင့်ထားသည့် ပြတင်းပေါက်"),
      t("Window safety reminder: no grills are installed right now, so both Chocho/helper and Nako must stay safely away from open window edges.", "窓の安全リマインダーです。現在グリルがないため、Chocho/ヘルパーもNakoも開いた窓の端から安全に離れてください。", "ပြတင်းပေါက် ဘေးကင်းရေး သတိပေးချက်ဖြစ်သည်။ လောလောဆယ် grill မတပ်ထားသောကြောင့် Chocho/helper နှင့် Nako နှစ်ဦးလုံး ဖွင့်ထားသောပြတင်းပေါက်အနားမှ လုံခြုံစွာဝေးဝေးနေပါ။")),
    ...nakoSupervisionRoutine.photos
  ];
}

const nakoPottyPenRoutine = routineTasks.find((task) => task.id === "nako-potty-pen");
if (nakoPottyPenRoutine) {
  nakoPottyPenRoutine.instructions = [
    ...nakoPottyPenRoutine.instructions,
    t("When changing the pee pad, keep the pad inside the pink side line. The pad must never cross the line.", "ペットシーツを交換するときは、シーツをピンクの横線の内側に収めてください。絶対に線を越えないようにします。", "pee pad လဲသောအခါ pad ကို ပန်းရောင်ဘေးလိုင်းအတွင်းတွင်ထားပါ။ pad သည် လိုင်းကို ဘယ်တော့မှ မကျော်ရပါ။"),
    t("If the pee pad crosses the line, the tray cover will not fully hide it and Nako may bite, pull out, and tear the pad.", "ペットシーツが線を越えると、トレーの上カバーで完全に隠れず、Nakoが噛んだり引っ張り出したり破いたりする可能性があります。", "pee pad သည် လိုင်းကျော်ပါက tray cover က အပြည့်မဖုံးနိုင်ဘဲ Nako က ကိုက်ခြင်း၊ ဆွဲထုတ်ခြင်း၊ ဖြဲခြင်းလုပ်နိုင်သည်။"),
    t("If Nako pulls out or ravages the pee pad, do a full cleaning of the entire pen.", "Nakoがペットシーツを引っ張り出したり荒らしたりした場合は、ペン全体をしっかり掃除してください。", "Nako က pee pad ကို ဆွဲထုတ်ခြင်း သို့မဟုတ် ဖျက်ဆီးခြင်းလုပ်ပါက pen တစ်ခုလုံးကို အပြည့်သန့်ရှင်းရေးလုပ်ပါ။")
  ];
  nakoPottyPenRoutine.mustRemember.push(
    t("Key principle: pee and poop must not be visible or anywhere outside the pee tray.", "重要原則: おしっことうんちは見えてはいけません。トレーの外にも絶対に出ないようにしてください。", "အဓိကစည်းမျဉ်း: ဆီးနှင့်အညစ်အကြေးများကို မြင်မနေရပါ။ pee tray အပြင်ဘက်တွင်လည်း ဘယ်နေရာမှ မရှိရပါ။")
  );
  nakoPottyPenRoutine.photos = [
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
      t("Fortnightly reference for cleaning the outside shoe rack, wiping shoes, tidying the surrounding area, and keeping the corridor clear.", "外の靴ラックを掃除し、靴を拭き、周辺を整え、廊下をすっきり保つための隔週の参考写真です。", "အပြင်ဘက် ဖိနပ်စင်ကို သန့်ရှင်းရေးလုပ်ခြင်း၊ ဖိနပ်များသုတ်ခြင်း၊ အနီးတဝိုက်ကိုသပ်ရပ်စေခြင်းနှင့် လမ်းကြောင်းရှင်းလင်းထားခြင်းအတွက် နှစ်ပတ်တစ်ကြိမ် ကိုးကားပုံဖြစ်သည်။"))
  ];
}

const curtainSteamingRoutine = routineTasks.find((task) => task.id === "curtain-steaming");
if (curtainSteamingRoutine) {
  curtainSteamingRoutine.photos = [
    photo("assets/routines/nako-curtain-steaming.jpg",
      t("Curtain steaming setup and curtain areas", "カーテンスチームの準備と対象エリア", "ကာတန် steam လုပ်ရန် ပြင်ဆင်မှုနှင့် ကာတန်နေရာများ"),
      t("Fortnightly reference for steaming the curtains in the rooms after being taught. Use the steamer carefully and cover the visible curtain panels.", "教わった後、部屋のカーテンにスチームをかけるための隔週の参考写真です。スチーマーは注意して使い、見えているカーテン部分を一通り行ってください。", "သင်ပေးပြီးနောက် အခန်းများရှိ ကာတန်များကို steam လုပ်ရန် နှစ်ပတ်တစ်ကြိမ် ကိုးကားပုံဖြစ်သည်။ steamer ကို ဂရုတစိုက်အသုံးပြုပြီး မြင်ရသော ကာတန် panel များကို လုပ်ပါ။"))
  ];
}

const ikeaBedFrameRoutine = routineTasks.find((task) => task.id === "ikea-bed-frame");
if (ikeaBedFrameRoutine) {
  ikeaBedFrameRoutine.photos = [
    photo("assets/routines/nako-ikea-bed-frame-under-compartment.jpg",
      t("IKEA bed frame under-compartment", "IKEAベッドフレーム下の収納部分", "IKEA အိပ်ရာဘောင်အောက် သိုလှောင်ခန်း"),
      t("Fortnightly reference for lifting or opening the IKEA bed frame storage area and cleaning dust and hair collected underneath.", "IKEAベッドフレームの収納部分を持ち上げる、または開けて、下にたまったほこりや毛を掃除するための隔週の参考写真です。", "IKEA အိပ်ရာဘောင် storage area ကို မထောင်ခြင်း သို့မဟုတ် ဖွင့်ခြင်းဖြင့် အောက်တွင် စုနေသောဖုန်နှင့်အမွှေးများကို သန့်ရှင်းရေးလုပ်ရန် နှစ်ပတ်တစ်ကြိမ် ကိုးကားပုံဖြစ်သည်။"))
  ];
}

// Only the curated, easy-to-forget recurring work belongs in Routine Check-in.
// Stable routine IDs are reused so reference pages and completion history link
// to the same task definition. Fortnightly cycles share a fixed Monday anchor.
const routineTrackingConfig = {
  "high-touch-surfaces": ["checkbox", "weekly"],
  "kitchen-sink-drain-rack-counter": ["checkbox", "weekly"],
  "nako-weekly-play-pen-deep-clean": ["checkbox", "weekly"],
  "nako-weight-tracking": ["metric", "weekly"],
  "rubbish-bin-washing": ["checkbox", "weekly"],
  "floor-mats": ["checkbox", "weekly"],
  "bedrooms-linens": ["checkbox", "weekly"],
  "windows-glass-mirrors": ["checkbox", "weekly"],
  "sofa-covers-pillows": ["checkbox", "weekly"],
  "ceiling-fan": ["checkbox", "weekly"],
  "fridge-interior": ["checkbox", "weekly"],
  "cleaning-tools": ["checkbox", "weekly"],
  "blanket-washing": ["checkbox", "fortnightly", "2026-07-06"],
  "curtain-steaming": ["checkbox", "fortnightly", "2026-07-06"],
  "ikea-bed-frame": ["checkbox", "fortnightly", "2026-07-06"],
  "general-surface-cleaning": ["checkbox", "monthly"],
  "pillow-mattress-vacuuming": ["checkbox", "monthly"],
  "aircon-filter-fan-coil": ["checkbox", "monthly"],
  "washer-deep-clean": ["checkbox", "quarterly"],
  "doorbell-charging": ["checkbox", "quarterly"],
  "coffee-machine-descaling": ["checkbox", "quarterly"],
  "fire-extinguisher-training": ["one-off", "one-off"]
};

routineTasks.forEach((task) => {
  const config = routineTrackingConfig[task.id];
  if (!config) return;
  task.trackingMode = config[0];
  task.trackingCadence = config[1];
  task.trackingAnchor = config[2] || null;
});


// Nako's force-free command training, play, and progress reference data.
const trainingData = (() => {
  const tx = (en, jp, mm) => t(en, jp, mm);
  const categories = {
    safety: tx("Safety & Daily Control", "安全と日常コントロール", "လုံခြုံရေးနှင့် နေ့စဉ်ထိန်းချုပ်မှု"),
    handling: tx("Positioning & Handling", "ポジションとハンドリング", "နေရာချထားခြင်းနှင့် ကိုင်တွယ်ခြင်း"),
    tricks: tx("Tricks & Confidence", "トリックと自信づくり", "လှည့်ကွက်များနှင့် ယုံကြည်မှုတိုးတက်ရေး")
  };
  const command = (id, category, title, score, priority, milestone, note = "", extra = {}) => ({
    id, category, title, initialScore: score, priority: tx(priority, priority === "Critical" ? "最重要" : priority === "High" ? "高" : "便利", priority === "Critical" ? "အလွန်အရေးကြီး" : priority === "High" ? "အရေးကြီး" : "အသုံးဝင်"),
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
    command("lift-carry", "handling", tx("Bao Bao — Lift / Carry", "Bao Bao — 抱き上げ / 抱っこ", "Bao Bao — ချီ / ပွေ့"), 6, "High", tx("Try the full sequence without giving a food treat after every repetition; keep rewarding often enough that Nako stays positive.", "毎回おやつを与えずに一連の動作を試しつつ、ナコが楽しく続けられる頻度でごほうびを与える。", "အကြိမ်တိုင်း အစားအစာဆုမပေးဘဲ အစအဆုံးလုပ်ကြည့်ပါ။ Nako ပျော်ရွှင်စွာဆက်လုပ်နိုင်ရန် လိုအပ်သလို မကြာခဏဆုချပါ။"), "First session on 11 July 2026: about 10 repetitions. She progressed from stepping up onto the offered left hand and receiving a treat, to responding after the Bao Bao cue, accepting right-hand support under her hindquarters, being lifted with her whole body supported, and then receiving a treat. She can complete the full sequence, but a no-treat repetition has not been tested yet.", { order: 11, setting: "liftCue", defaultCue: "Bao Bao", initialRewardReliance: 2, initialEnvironment: 0, initialLastPractisedAt: "2026-07-11T00:00:00+08:00", jpNote: "2026年7月11日の初回練習：約10回。差し出した左手に前足を乗せてからおやつをもらう段階から、Bao Bao の合図で立ち上がって左手に両前足を乗せ、右手で後ろ足側を支え、全身を支えて抱き上げた後におやつをもらうところまで進んだ。一連の動作はできるが、おやつなしの反復はまだ試していない。", mmNote: "၂၀၂၆ ခုနှစ် ဇူလိုင် ၁၁ ရက် ပထမအကြိမ်လေ့ကျင့်မှုတွင် ၁၀ ကြိမ်ခန့် လုပ်ခဲ့သည်။ ကမ်းပေးထားသော ဘယ်လက်ပေါ် ရှေ့ခြေနှစ်ချောင်းတင်ပြီး ဆုစားရသည့်အဆင့်မှ Bao Bao အမိန့်ကြားလျှင် မတ်တပ်ရပ်ကာ ဘယ်လက်ပေါ် ရှေ့ခြေနှစ်ချောင်းတင်ခြင်း၊ ညာလက်ဖြင့် နောက်ပိုင်းကိုပံ့ပိုးခြင်း၊ ကိုယ်တစ်ခုလုံးကိုပံ့ပိုးပြီး ချီခြင်း၊ ထို့နောက် ဆုစားရခြင်းအထိ တိုးတက်ခဲ့သည်။ အစအဆုံးလုပ်နိုင်ပြီဖြစ်သော်လည်း ဆုမပါဘဲ မစမ်းရသေးပါ။", purpose: tx("On Bao Bao, stand and place both front paws on the handler's outstretched left hand so the handler can add right-hand hindquarter support and lift her safely.", "Bao Bao の合図で立ち上がり、差し出された飼い主の左手に両前足を乗せる。飼い主は右手で後ろ足側を支え、安全に抱き上げる。", "Bao Bao အမိန့်ကြားလျှင် မတ်တပ်ရပ်ပြီး ကိုင်တွယ်သူ၏ ဆန့်ထားသော ဘယ်လက်ပေါ် ရှေ့ခြေနှစ်ချောင်းတင်ရန်။ ထို့နောက် ကိုင်တွယ်သူက ညာလက်ဖြင့် နောက်ပိုင်းကိုပံ့ပိုးကာ လုံခြုံစွာချီရန်။"), instructions: [tx("Bend down and hold the left hand straight out as her platform.", "かがみ、左手をまっすぐ差し出して足場にする。", "ကိုယ်ကိုငုံ့ပြီး ဘယ်လက်ကို သူမတက်နိုင်ရန် တန်းတန်းဆန့်ထားပါ။"), tx("Say Bao Bao once. Wait for her to stand and place both front paws on the left hand.", "Bao Bao と一度だけ言い、立ち上がって左手に両前足を乗せるのを待つ。", "Bao Bao ဟု တစ်ကြိမ်သာပြောပြီး သူမ မတ်တပ်ရပ်ကာ ဘယ်လက်ပေါ် ရှေ့ခြေနှစ်ချောင်းတင်သည်အထိ စောင့်ပါ။"), tx("Place the right hand securely under her hindquarters, support her whole body, and lift smoothly.", "右手を後ろ足側の下にしっかり入れ、全身を支えて滑らかに抱き上げる。", "ညာလက်ကို သူမ၏ နောက်ပိုင်းအောက်တွင် သေချာထားပြီး ကိုယ်တစ်ခုလုံးကိုပံ့ပိုးကာ ညင်သာစွာချီပါ။"), tx("Reward after the lift. When she remains comfortable, begin mixing in an occasional repetition without a food treat.", "抱き上げた後にごほうびを与える。落ち着いてできるようになったら、時々おやつなしの反復を混ぜる。", "ချီပြီးနောက် ဆုချပါ။ သူမ သက်တောင့်သက်သာရှိနေပါက တစ်ခါတစ်ရံ အစားအစာဆုမပေးသော အကြိမ်ကို စတင်ရောထည့်ပါ။")], safety: [tx("Her left-hand paw placement is the ready position, not the lifting point; support her whole body before her feet leave the floor.", "左手への前足乗せは準備姿勢であり、そこだけで持ち上げない。足が床を離れる前に全身を支える。", "ဘယ်လက်ပေါ် ရှေ့ခြေတင်ခြင်းသည် အဆင်သင့်အနေအထားသာဖြစ်ပြီး ထိုနေရာမှမချီပါနှင့်။ ခြေထောက်များ မြေပြင်မှမလွတ်မီ ကိုယ်တစ်ခုလုံးကိုပံ့ပိုးပါ။"), tx("Never lift only by the front legs or armpits.", "前足やわきの下だけで持ち上げないでください。", "ရှေ့ခြေ သို့မဟုတ် ချိုင်းအောက်မှသာ မချီပါနှင့်။"), tx("Stop if she pulls away, looks worried, struggles, or seems sore.", "離れようとする、不安そう、暴れる、痛そうな場合は中止する。", "သူမ ရှောင်ထွက်ခြင်း၊ စိုးရိမ်ပုံရခြင်း၊ ရုန်းကန်ခြင်း သို့မဟုတ် နာကျင်ပုံရပါက ရပ်ပါ။")]}),
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
  const labels = {
    tabs: { commands: tx("Commands", "コマンド", "အမိန့်များ"), play: tx("Play & Enrichment", "遊びと知育", "ကစားခြင်းနှင့် စိတ်ပိုင်းဆိုင်ရာလှုပ်ရှားမှု"), log: tx("Training Log", "トレーニング記録", "လေ့ကျင့်ရေးမှတ်တမ်း") },
    addLog: tx("Add log", "記録を追加", "မှတ်တမ်းထည့်ရန်"), history: tx("View history", "履歴を見る", "မှတ်တမ်းကြည့်ရန်"), save: tx("Save", "保存", "သိမ်းရန်"), cancel: tx("Cancel", "キャンセル", "ပယ်ဖျက်ရန်"), commandLog: tx("Training log", "トレーニング記録", "လေ့ကျင့်ရေးမှတ်တမ်း"), playLog: tx("Play log", "遊びの記録", "ကစားမှတ်တမ်း"), score: tx("Progress score", "進捗スコア", "တိုးတက်မှုအမှတ်"), reward: tx("Reward reliance", "ごほうびへの依存度", "ဆုလာဘ်အပေါ် မှီခိုမှု"), environment: tx("Environment", "環境", "နေရာအခြေအနေ"), successes: tx("Successful first-cue responses", "最初の合図での成功回数", "ပထမအမိန့်အောင်မြင်မှု"), attempts: tx("Total attempts", "試行回数", "စုစုပေါင်းကြိုးစားမှု"), duration: tx("Duration (minutes)", "時間（分）", "ကြာချိန် (မိနစ်)"), comment: tx("Comment", "メモ", "မှတ်ချက်"), date: tx("Date and time", "日時", "ရက်စွဲနှင့်အချိန်"), lastPractised: tx("Last practised", "最終練習", "နောက်ဆုံးလေ့ကျင့်ချိန်"), milestone: tx("Next milestone", "次の目標", "နောက်တစ်ဆင့်ရည်မှန်းချက်"), needsPractice: tx("Needs Practice", "練習が必要", "လေ့ကျင့်ရန်လို"), filters: tx("Filters", "絞り込み", "စစ်ထုတ်ရန်"), all: tx("All", "すべて", "အားလုံး"), category: tx("Category", "カテゴリー", "အမျိုးအစား"), priority: tx("Priority", "優先度", "ဦးစားပေး"), recent: tx("Recently practised", "最近練習した", "မကြာသေးမီကလေ့ကျင့်ခဲ့"), rules: tx("Training Rules", "トレーニングのルール", "လေ့ကျင့်ရေးစည်းမျဉ်းများ"), meanings: tx("Command meanings", "コマンドの意味", "အမိန့်အဓိပ္ပာယ်များ"), scoring: tx("How scoring works", "スコアの仕組み", "အမှတ်ပေးနည်း"), review: tx("Reference needs review", "参考動画の確認が必要です", "ရည်ညွှန်းဗီဒီယိုကို ပြန်လည်စစ်ဆေးရန်လိုသည်"), openYouTube: tx("Open in YouTube", "YouTubeで開く", "YouTube တွင်ဖွင့်ရန်"), engagement: tx("Engagement (1–5)", "集中度（1～5）", "ပါဝင်မှု (၁–၅)"), energyBefore: tx("Energy before (1–5)", "遊び前の元気さ（1～5）", "မကစားမီစွမ်းအင် (၁–၅)"), energyAfter: tx("Energy after (1–5)", "遊び後の元気さ（1～5）", "ကစားပြီးနောက်စွမ်းအင် (၁–၅)"), dropResponse: tx("Response to Drop", "ドロップへの反応", "Drop တုံ့ပြန်မှု"), allDoneResponse: tx("Response to All Done", "オールダンへの反応", "All Done တုံ့ပြန်မှု"), favouriteToy: tx("Favourite toy", "お気に入りのおもちゃ", "အကြိုက်ဆုံးကစားစရာ"), unusual: tx("Unusual behaviour or health note", "気になる様子・健康メモ", "ထူးခြားအပြုအမူ သို့မဟုတ် ကျန်းမာရေးမှတ်ချက်"), delete: tx("Delete", "削除", "ဖျက်ရန်"), edit: tx("Edit", "編集", "ပြင်ရန်"), saved: tx("Saved", "保存しました", "သိမ်းပြီးပါပြီ"), cueNotSelected: tx("Not selected", "未選択", "မရွေးရသေး"), cueLabel: tx("Preferred cue", "希望する合図", "နှစ်သက်သောအမိန့်"), trialResult: tx("5-trial result", "5回の結果", "၅ ကြိမ်ရလဒ်"), details: tx("Details", "詳細", "အသေးစိတ်"), hideDetails: tx("Hide details", "詳細を隠す", "အသေးစိတ်ဖျောက်ရန်"), noLogs: tx("No saved training logs yet.", "保存されたトレーニング記録はまだありません。", "သိမ်းထားသောလေ့ကျင့်ရေးမှတ်တမ်း မရှိသေးပါ။"), videoSafety: tx("Safety", "安全", "ဘေးကင်းရေး")
  };
  const rewardOptions = [tx("Food visible", "食べ物が見える", "အစားအစာမြင်ရ"), tx("Food lure", "食べ物で誘導", "အစားအစာဖြင့်ဆွဲဆောင်"), tx("Food hidden", "食べ物を隠す", "အစားအစာဖျောက်ထား"), tx("Intermittent food", "時々食べ物", "တစ်ခါတစ်ရံအစားအစာ"), tx("Toy or play reward", "おもちゃ・遊びのごほうび", "ကစားစရာ သို့မဟုတ်ကစားခြင်းဆု"), tx("Praise only", "ほめるだけ", "ချီးမွမ်းခြင်းသာ"), tx("Not tested", "未テスト", "မစမ်းသပ်ရသေး")];
  const environmentOptions = [tx("Quiet home", "静かな家", "တိတ်ဆိတ်သောအိမ်"), tx("Home with mild distractions", "軽い気の散りがある家", "အနည်းငယ်အာရုံပျံ့စရာရှိသောအိမ်"), tx("Corridor or common area", "廊下・共用エリア", "စင်္ကြံ သို့မဟုတ်အများသုံးနေရာ"), tx("Outdoors with mild distractions", "軽い気の散りがある屋外", "အနည်းငယ်အာရုံပျံ့စရာရှိသောအပြင်"), tx("Busy environment", "にぎやかな環境", "လူရှုပ်သောနေရာ"), tx("Strong distraction or emergency simulation", "強い気の散り・緊急シミュレーション", "ပြင်းထန်သောအာရုံပျံ့စရာ သို့မဟုတ်အရေးပေါ်စမ်းသပ်မှု"), tx("Not tested", "未テスト", "မစမ်းသပ်ရသေး")];
  return { categories, commands, activities, videos, labels, rewardOptions, environmentOptions };
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
  recipe("chicken-teriyaki-rice",
    t("Chicken Teriyaki Rice Bowl", "鶏の照り焼き丼", "ကြက်သား ထရီယာကီ ထမင်းသုပ်"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "180g", "rice", { calories: 234, protein: 4.2, carbs: 51.7, fat: 0.3 }],
      [t("Skinless chicken breast", "鶏むね肉（皮なし）", "အရေပြားမပါသော ကြက်ရင်ပုံသား"), "220g", "chicken-breast", { calories: 247, protein: 49.6, carbs: 0.0, fat: 4.3 }],
      [t("Broccoli", "ブロッコリー", "ပန်းဂေါ်ဖီစိမ်း"), "80g", "broccoli", { calories: 27, protein: 2.3, carbs: 5.3, fat: 0.3 }],
      [t("Carrot", "にんじん", "မုန်လာဥနီ"), "50g", "carrot", { calories: 20, protein: 0.5, carbs: 4.8, fat: 0.1 }],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "18g", "soy-sauce", { calories: 10, protein: 1.5, carbs: 0.9, fat: 0.1 }],
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
      [t("Sugar", "砂糖", "သကြား"), "4g", "sugar", { calories: 15, protein: 0.0, carbs: 4.0, fat: 0.0 }],
      [t("Grated ginger", "おろし生姜", "ချင်းခြစ်"), "5g", "ginger", { calories: 4, protein: 0.1, carbs: 0.9, fat: 0.0 }],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "5g", "oil", { calories: 44, protein: 0.0, carbs: 0.0, fat: 5.0 }],
      [t("White sesame seeds", "白ごま", "နှမ်းဖြူ"), "2g", "sesame", { calories: 11, protein: 0.4, carbs: 0.5, fat: 1.0 }]
    ],
    [
      t("Cut 220g chicken breast into bite-sized pieces of about 2cm.", "220gの鶏むね肉を約2cmの一口大に切ります。", "ကြက်ရင်ပုံသား ၂၂၀ ဂရမ်ကို ၂ စင်တီမီတာခန့် အတုံးလေးများ တုံးပါ။"),
      t("Mix 18g soy sauce, 18g mirin, 18g sake or water, 4g sugar, and 5g grated ginger in a small bowl.", "小さなボウルに醤油18g、みりん18g、酒または水18g、砂糖4g、おろし生姜5gを混ぜ合わせます。", "ဇလုံအသေးတစ်ခုထဲတွင် ပဲငံပြာရည် ၁၈ ဂရမ်၊ မီရင် ၁၈ ဂရမ်၊ ဆာကေး သို့မဟုတ် ရေ ၁၈ ဂရမ်၊ သကြား ၄ ဂရမ်နှင့် ချင်းခြစ် ၅ ဂရမ်တို့ကို ရောမွှေပါ။"),
      t("Steam or boil 80g broccoli and 50g carrot for 3 to 4 minutes until cooked but not mushy.", "80gのブロッコリーと50gのにんじんを3〜4分蒸すか茹でます。火は通すが柔らかくなりすぎないようにします。", "ပန်းဂေါ်ဖီစိမ်း ၈၀ ဂရမ်နှင့် မုန်လာဥနီ ၅၀ ဂရမ်ကို ၃ မှ ၄ မိနစ်ခန့် ပေါင်းပါ သို့မဟုတ် ပြုတ်ပါ။ ကျက်ရမည်ဖြစ်သော်လည်း ပျော့အောင်မချက်ပါနှင့်။"),
      t("Heat 5g cooking oil in a pan on medium heat.", "フライパンに5gのサラダ油を入れて中火で熱します。", "ဒယ်အိုးထဲတွင် ဟင်းချက်ဆီ ၅ ဂရမ်ကို အလယ်အလတ်မီးဖြင့် ပူအောင်တည်ပါ။"),
      t("Add the chicken and cook for 5 to 6 minutes until the outside is no longer pink.", "鶏肉を加えて5〜6分間、外側にピンク色がなくなるまで焼きます。", "ကြက်သားကို ထည့်ပြီး အပြင်ဘက်တွင် ပန်းရောင်မကျန်သည်အထိ ၅ မှ ၆ မိနစ်ခန့် ကင်ပါ။"),
      t("Add the sauce and simmer for 3 to 4 minutes until the chicken is fully cooked and the sauce lightly thickens.", "タレを加え、鶏肉に完全に火が通りタレが少しとろみがつくまで3〜4分煮ます。", "အချိုရည်ကို ထည့်ပြီး ကြက်သားကျက်ပြီး အချိုရည်အနည်းငယ် ပျစ်လာသည်အထိ ၃ မှ ၄ မိနစ်ခန့် တည်ပါ။"),
      t("Put 180g cooked rice into a bowl.", "丼に180gのご飯を盛ります。", "ပန်းကန်လုံးထဲတွင် ချက်ပြီးသားထမင်း ၁၈၀ ဂရမ်ကို ထည့်ပါ။"),
      t("Add the cooked chicken, broccoli, and carrot on top.", "焼いた鶏肉、ブロッコリー、にんじんを上にのせます。", "ကျက်ပြီးသော ကြက်သား၊ ပန်းဂေါ်ဖီစိမ်းနှင့် မုန်လာဥနီတို့ကို အပေါ်မှတင်ပါ။"),
      t("Sprinkle 2g sesame seeds before serving.", "2gのごまをふりかけて完成です。", "မစားမီ နှမ်းဖြူ ၂ ဂရမ်ကို ဖြူးပါ။")
    ],
    t("High-protein simple rice bowl. Use chicken breast for a lower-fat version. Make sure the chicken is fully cooked before serving.", "高タンパクなシンプル丼です。低脂質にするために鶏むね肉を使用します。鶏肉に完全に火が通ったことを確認してから提供してください。", "ပရိုတင်းဓာတ်မြင့်သော ရိုးရှင်းသည့် ထမင်းသုပ်ဖြစ်သည်။ အဆီနည်းစေရန် ကြက်ရင်ပုံသားကို သုံးပါ။ မစားမီ ကြက်သားကျက်ကြောင်း သေချာစစ်ပါ။"),
    [
      photo("assets/recipes/human-food/chicken-teriyaki-rice-bowl-main.jpg",
        t("Chicken teriyaki rice bowl", "鶏の照り焼き丼", "ကြက်သား ထရီယာကီ ထမင်းသုပ်"),
        t("Teriyaki chicken with broccoli and carrot over rice", "ブロッコリーとにんじんを添えた照り焼きチキン丼", "ပန်းဂေါ်ဖီစိမ်းနှင့် မုန်လာဥနီပါသော ကြက်သား ထရီယာကီ ထမင်းသုပ်"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食/夕食", "နေ့လယ်စာ/ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("20 mins", "20分", "၂၀ မိနစ်"),
      highProtein: true,
      nutrition: {
        calories: 657,
        protein: 58.5,
        carbs: 75.8,
        fat: 11.1,
        basis: t(
          "Calculated using water for the sake-or-water option.",
          "酒または水の選択肢は、水を使用して計算しています。",
          "ဆာကေး သို့မဟုတ် ရေ ရွေးချယ်မှုတွင် ရေကို အသုံးပြု၍ တွက်ချက်ထားသည်။"
        )
      }
    }
  ),
  recipe("salmon-shioyaki-set",
    t("Salmon Shioyaki Protein Set", "鮭の塩焼き定食", "ဆယ်လ်မွန်ငါး ဆားကင် ပရိုတင်းအစုံ"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "160g", "rice", { calories: 208, protein: 3.8, carbs: 46.0, fat: 0.3 }],
      [t("Salmon fillet", "鮭の切り身", "ဆယ်လ်မွန်ငါးအသားလွှာ"), "180g", "salmon-fillet", { calories: 374, protein: 36.8, carbs: 0.0, fat: 24.2 }],
      [t("Salt", "塩", "ဆား"), "2g", "salt", { calories: 0, protein: 0.0, carbs: 0.0, fat: 0.0 }],
      [t("Egg", "卵", "ကြက်ဥ"), "100g", "eggs", { calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5 }],
      [t("Spinach", "ほうれん草", "ဟင်းနွယ်စိမ်း"), "80g", "spinach", { calories: 18, protein: 2.3, carbs: 2.9, fat: 0.3 }],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "8g", "soy-sauce", { calories: 4, protein: 0.7, carbs: 0.4, fat: 0.0 }],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "3g", "oil", { calories: 27, protein: 0.0, carbs: 0.0, fat: 3.0 }],
      [t("Lemon wedge", "レモンくし切り", "ရှောက်သီးလွှာ"), "15g", "lemon", { calories: 4, protein: 0.2, carbs: 1.4, fat: 0.0 }]
    ],
    [
      t("Pat dry 180g salmon fillet with kitchen paper.", "180gの鮭の切り身をキッチンペーパーで水気を拭き取ります。", "ဆယ်လ်မွန်ငါးအသားလွှာ ၁၈၀ ဂရမ်ကို မီးဖိုချောင်စက္ကူဖြင့် ခြောက်အောင်သုတ်ပါ။"),
      t("Rub 2g salt evenly over the salmon.", "2gの塩を鮭全体にまんべんなくまぶします。", "ဆား ၂ ဂရမ်ကို ဆယ်လ်မွန်ငါးတစ်ခုလုံးတွင် ညီညာစွာ လိမ်းပါ။"),
      t("Rest the salmon for 10 minutes.", "鮭を10分間置きます。", "ဆယ်လ်မွန်ငါးကို ၁၀ မိနစ်ခန့် နားထားပါ။"),
      t("Heat a non-stick pan on medium heat and add 3g cooking oil.", "フッ素加工のフライパンを中火で熱し、3gのサラダ油を加えます。", "ဒယ်အိုးကို အလယ်အလတ်မီးဖြင့် ပူအောင်တည်ပြီး ဟင်းချက်ဆီ ၃ ဂရမ်ထည့်ပါ။"),
      t("Cook the salmon skin-side down for 4 minutes.", "鮭を皮目を下にして4分間焼きます。", "ဆယ်လ်မွန်ငါးကို အရေပြားဘက်ကို အောက်သို့လှန်ထားပြီး ၄ မိနစ်ခန့် ကင်ပါ။"),
      t("Turn the salmon and cook for another 3 to 4 minutes until fully cooked.", "鮭をひっくり返し、完全に火が通るまでさらに3〜4分焼きます。", "ဆယ်လ်မွန်ငါးကို လှန်ပြီး ကျက်သည်အထိ နောက်ထပ် ၃ မှ ၄ မိနစ်ခန့် ကင်ပါ။"),
      t("Beat 100g egg in a bowl.", "100gの卵をボウルで溶きほぐします。", "ကြက်ဥ ၁၀၀ ဂရမ်ကို ဇလုံထဲတွင် ခေါက်ပါ။"),
      t("Cook the egg in the same pan on low heat for 1 to 2 minutes until softly scrambled.", "同じフライパンで弱火にして1〜2分、ふんわりとしたスクランブルエッグにします。", "တူညီသော ဒယ်အိုးထဲတွင် မီးအေးအေးဖြင့် ၁ မှ ၂ မိနစ်ခန့် ကြက်ဥကို ပျော့ပျော့မွှေကြော်ပါ။"),
      t("Boil or steam 80g spinach for 1 minute, then drain well.", "80gのほうれん草を1分間茹でるか蒸し、よく水気を切ります。", "ဟင်းနွယ်စိမ်း ၈၀ ဂရမ်ကို ၁ မိနစ်ခန့် ပြုတ်ပါ သို့မဟုတ် ပေါင်းပါ၊ ပြီးလျှင် ရေကို ကောင်းကောင်း စစ်ထုတ်ပါ။"),
      t("Add 8g soy sauce to the spinach.", "ほうれん草に8gの醤油をかけます。", "ဟင်းနွယ်စိမ်းပေါ်သို့ ပဲငံပြာရည် ၈ ဂရမ် ထည့်ပါ။"),
      t("Serve with 160g cooked rice and 15g lemon wedge.", "160gのご飯と15gのレモンくし切りを添えて盛り付けます。", "ချက်ပြီးသားထမင်း ၁၆၀ ဂရမ်နှင့် ရှောက်သီးလွှာ ၁၅ ဂရမ်တို့နှင့်အတူ ပြင်ဆင်ပါ။")
    ],
    t("Simple grilled fish set with extra egg for protein. Check carefully for fish bones before serving.", "タンパク質を補う卵付きのシンプルな焼き魚定食です。提供前に魚の骨がないか注意深く確認してください。", "ပရိုတင်းဓာတ်အတွက် ကြက်ဥပါသော ရိုးရှင်းသည့် ငါးကင်အစုံဖြစ်သည်။ မစားမီ ငါးရိုးများ ရှိမရှိ သေချာစွာ စစ်ဆေးပါ။"),
    [
      photo("assets/recipes/human-food/salmon-shioyaki-protein-set-main.jpg",
        t("Salmon shioyaki protein set meal", "鮭の塩焼き定食", "ဆယ်လ်မွန်ငါး ဆားကင် ပရိုတင်းအစုံ"),
        t("Grilled salmon with egg, spinach, and rice", "卵、ほうれん草、ご飯を添えた鮭の塩焼き", "ကြက်ဥ၊ ဟင်းနွယ်စိမ်းနှင့် ထမင်းပါသော ဆယ်လ်မွန်ငါးကင်"))
    ],
    "human",
    {
      mealType: t("Breakfast/Lunch", "朝食/昼食", "မနက်စာ/နေ့လယ်စာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("25 mins", "25分", "၂၅ မိနစ်"),
      highProtein: true,
      nutrition: {
        calories: 779,
        protein: 56.2,
        carbs: 51.4,
        fat: 37.4,
        basis: t(
          "Calculated using raw farmed Atlantic salmon.",
          "生の養殖アトランティックサーモンを使用して計算しています。",
          "မွေးမြူထားသော Atlantic salmon အစိမ်းကို အသုံးပြု၍ တွက်ချက်ထားသည်။"
        )
      }
    }
  ),
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
    t("Chicken Oyakodon (No Onion)", "親子丼（玉ねぎなし）", "ကြက်သားဥဝိုင်းထမင်းသုပ် (ကြက်သွန်မပါ)"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "180g", "rice", { calories: 234, protein: 4.2, carbs: 51.7, fat: 0.3 }],
      ingredient(
        t("Skinless chicken thigh or breast", "鶏もも肉または鶏むね肉（皮なし）", "ကြက်ပေါင်သား သို့မဟုတ် ကြက်ရင်ပုံသား (အရေပြားမပါ)"),
        "200g",
        "chicken-thigh",
        [
          ingredientOption("chicken-thigh", t("Skinless chicken thigh", "皮なし鶏もも肉", "အရေပြားမပါသော ကြက်ပေါင်သား")),
          ingredientOption("chicken-breast", t("Skinless chicken breast", "皮なし鶏むね肉", "အရေပြားမပါသော ကြက်ရင်ပုံသား"))
        ],
        { calories: 224, protein: 45.0, carbs: 0.0, fat: 3.9 }
      ),
      [t("Egg", "卵", "ကြက်ဥ"), "100g", "eggs", { calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5 }],
      ingredient(
        t("Shimeji or button mushroom", "しめじまたはマッシュルーム", "ရှီမဲဂျီ သို့မဟုတ် မှို"),
        "70g",
        "shimeji-mushroom",
        [
          ingredientOption("shimeji-mushroom", t("Shimeji mushroom", "しめじ", "ရှီမဲဂျီမှို")),
          ingredientOption("button-mushroom", t("Button mushroom", "マッシュルーム", "ဘတန်မှို"))
        ],
        { calories: 15, protein: 2.2, carbs: 2.3, fat: 0.2 }
      ),
      [t("Napa cabbage", "白菜", "မုန်ညင်းဖြူ"), "70g", "napa-cabbage", { calories: 11, protein: 0.8, carbs: 2.3, fat: 0.1 }],
      ingredient(
        t("Dashi or water", "だし汁または水", "ဒါရှီ သို့မဟုတ် ရေ"),
        "100g",
        "dashi",
        [
          ingredientOption("dashi", t("Dashi stock", "だし汁", "ဒါရှီစတော့")),
          ingredientOption("water", t("Water", "水", "ရေ"))
        ],
        { calories: 0, protein: 0.0, carbs: 0.0, fat: 0.0 }
      ),
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "18g", "soy-sauce", { calories: 10, protein: 1.5, carbs: 0.9, fat: 0.1 }],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "18g", "mirin", { calories: 43, protein: 0.1, carbs: 7.8, fat: 0.0 }],
      [t("Sugar", "砂糖", "သကြား"), "3g", "sugar", { calories: 12, protein: 0.0, carbs: 3.0, fat: 0.0 }]
    ],
    [
      t("Cut 200g chicken into bite-sized pieces of about 2cm.", "200gの鶏肉を約2cmの一口大に切ります。", "ကြက်သား ၂၀၀ ဂရမ်ကို ၂ စင်တီမီတာခန့် အတုံးလေးများ တုံးပါ။"),
      t("Cut 70g mushroom and 70g napa cabbage into small pieces.", "70gのきのこと70gの白菜を小さく切ります。", "မှို ၇၀ ဂရမ်နှင့် မုန်ညင်းဖြူ ၇၀ ဂရမ်ကို အတုံးသေးသေး တုံးပါ။"),
      t("Beat 100g egg lightly in a bowl. Do not overmix.", "100gの卵をボウルで軽く溶きほぐします。混ぜすぎないでください。", "ကြက်ဥ ၁၀၀ ဂရမ်ကို ဇလုံထဲတွင် ဖွဖွခေါက်ပါ။ အလွန်အကျွံ မမွှေပါနှင့်။"),
      t("Add 100g dashi or water, 18g soy sauce, 18g mirin, and 3g sugar into a small pan.", "小さなフライパンにだし汁または水100g、醤油18g、みりん18g、砂糖3gを入れます。", "ဒယ်အိုးသေးတစ်ခုထဲတွင် ဒါရှီ သို့မဟုတ် ရေ ၁၀၀ ဂရမ်၊ ပဲငံပြာရည် ၁၈ ဂရမ်၊ မီရင် ၁၈ ဂရမ်နှင့် သကြား ၃ ဂရမ်တို့ကို ထည့်ပါ။"),
      t("Bring the liquid to a gentle simmer on medium heat.", "中火で軽く煮立たせます。", "အလယ်အလတ်မီးဖြင့် ညင်သာစွာ ဆူပွက်အောင် တည်ပါ။"),
      t("Add the chicken and cook for 5 minutes.", "鶏肉を加えて5分間煮ます。", "ကြက်သားကို ထည့်ပြီး ၅ မိနစ်ခန့် ချက်ပါ။"),
      t("Add the mushroom and napa cabbage, then cook for another 3 minutes.", "きのこと白菜を加え、さらに3分間煮ます。", "မှိုနှင့် မုန်ညင်းဖြူကို ထည့်ပြီး နောက်ထပ် ၃ မိနစ်ခန့် ချက်ပါ။"),
      t("Check that the chicken is fully cooked.", "鶏肉に完全に火が通っているか確認します。", "ကြက်သားကျက်ကြောင်း သေချာစစ်ပါ။"),
      t("Pour the beaten egg evenly over the chicken mixture.", "溶き卵を鶏肉の上にまんべんなく回し入れます。", "ခေါက်ထားသော ကြက်ဥကို ကြက်သားအရောအပေါ်သို့ ညီညာစွာ လောင်းထည့်ပါ။"),
      t("Cover the pan and cook on low heat for 1 to 2 minutes until the egg is just set.", "蓋をして弱火で1〜2分、卵がちょうど固まるまで加熱します。", "အဖုံးအုပ်ပြီး မီးအေးအေးဖြင့် ၁ မှ ၂ မိနစ်ခန့် ကြက်ဥ ကျုံ့သည်အထိ ချက်ပါ။"),
      t("Put 180g cooked rice into a bowl.", "丼に180gのご飯を盛ります。", "ပန်းကန်လုံးထဲတွင် ချက်ပြီးသားထမင်း ၁၈၀ ဂရမ်ကို ထည့်ပါ။"),
      t("Pour the chicken and egg mixture over the rice.", "鶏肉と卵をご飯の上にかけます。", "ကြက်သားနှင့် ကြက်ဥအရောကို ထမင်းပေါ်သို့ လောင်းထည့်ပါ။")
    ],
    t("No onion version of oyakodon. Use mushroom and napa cabbage instead of onion.", "玉ねぎなしの親子丼です。玉ねぎの代わりにきのこと白菜を使います。", "ကြက်သွန်မပါသော ကြက်သားဥဝိုင်းထမင်းသုပ်ဖြစ်သည်။ ကြက်သွန်နီအစား မှိုနှင့် မုန်ညင်းဖြူကို သုံးပါ။"),
    [
      photo("assets/recipes/human-food/chicken-oyakodon-no-onion-main.jpg",
        t("Chicken oyakodon without onion", "玉ねぎなし親子丼", "ကြက်သွန်မပါသော ကြက်သားဥဝိုင်းထမင်းသုပ်"),
        t("Chicken and egg over rice with mushroom and napa cabbage", "きのこと白菜を使った親子丼", "မှိုနှင့် မုန်ညင်းဖြူပါသော ကြက်သားဥဝိုင်းထမင်းသုပ်"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食/夕食", "နေ့လယ်စာ/ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("20 mins", "20分", "၂၀ မိနစ်"),
      highProtein: true,
      nutrition: {
        calories: 693,
        protein: 66.4,
        carbs: 68.6,
        fat: 14.2,
        basis: t(
          "Calculated using skinless chicken breast, button mushrooms and water.",
          "皮なし鶏むね肉、マッシュルーム、水を使用して計算しています。",
          "အရေပြားမပါသော ကြက်ရင်ပုံသား၊ button mushroom နှင့် ရေကို အသုံးပြု၍ တွက်ချက်ထားသည်။"
        )
      }
    }
  ),
  recipe("tuna-tofu-egg-rice",
    t("Tuna Tofu Egg Rice Bowl", "ツナ豆腐卵丼", "ငါးတူနာ ပဲပိစပ် ကြက်ဥ ထမင်းသုပ်"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "160g", "rice", { calories: 208, protein: 3.8, carbs: 46.0, fat: 0.3 }],
      [t("Canned tuna in water, drained", "ツナ缶（水煮、水切り済み）", "ရေနှင့်ထည့်ထားသော ငါးတူနာအံဘူး (ရေစစ်ပြီး)"), "120g", "tuna", { calories: 139, protein: 30.6, carbs: 0.0, fat: 1.0 }],
      [t("Firm tofu", "木綿豆腐", "တိုဖူးမာ"), "150g", "tofu", { calories: 110, protein: 10.5, carbs: 2.2, fat: 7.3 }],
      [t("Egg", "卵", "ကြက်ဥ"), "100g", "eggs", { calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5 }],
      [t("Cucumber", "きゅうり", "သခွားသီး"), "80g", "cucumber", { calories: 12, protein: 0.5, carbs: 2.9, fat: 0.1 }],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "12g", "soy-sauce", { calories: 6, protein: 1.0, carbs: 0.6, fat: 0.1 }],
      [t("Sesame oil", "ごま油", "နှမ်းဆီ"), "4g", "sesame-oil", { calories: 35, protein: 0.0, carbs: 0.0, fat: 4.0 }],
      [t("Rice vinegar", "米酢", "ထမင်းရည်ချဉ်"), "8g", "rice-vinegar", { calories: 1, protein: 0.0, carbs: 0.0, fat: 0.0 }],
      [t("White sesame seeds", "白ごま", "နှမ်းဖြူ"), "2g", "sesame", { calories: 11, protein: 0.4, carbs: 0.5, fat: 1.0 }]
    ],
    [
      t("Drain the canned tuna until the tuna weight is 120g.", "ツナ缶の水気を切り、ツナの重さが120gになるようにします。", "ငါးတူနာအံဘူးမှ ရေကို စစ်ထုတ်ပြီး ငါးတူနာ ၁၂၀ ဂရမ်ဖြစ်အောင် ထားပါ။"),
      t("Cut 150g firm tofu into small cubes.", "150gの木綿豆腐を小さな角切りにします。", "တိုဖူးမာ ၁၅၀ ဂရမ်ကို အတုံးသေးသေး တုံးပါ။"),
      t("Slice 80g cucumber thinly.", "80gのきゅうりを薄切りにします。", "သခွားသီး ၈၀ ဂရမ်ကို ပါးပါးလှီးပါ။"),
      t("Beat 100g egg in a bowl.", "100gの卵をボウルで溶きほぐします。", "ကြက်ဥ ၁၀၀ ဂရမ်ကို ဇလုံထဲတွင် ခေါက်ပါ။"),
      t("Cook the egg in a non-stick pan on low heat for 1 to 2 minutes until softly scrambled.", "フッ素加工のフライパンで弱火にして1〜2分、ふんわりとしたスクランブルエッグにします。", "ဒယ်အိုးထဲတွင် မီးအေးအေးဖြင့် ၁ မှ ၂ မိနစ်ခန့် ကြက်ဥကို ပျော့ပျော့မွှေကြော်ပါ။"),
      t("Mix 12g soy sauce, 4g sesame oil, and 8g rice vinegar in a small bowl.", "小さなボウルに醤油12g、ごま油4g、米酢8gを混ぜ合わせます。", "ဇလုံအသေးတစ်ခုထဲတွင် ပဲငံပြာရည် ၁၂ ဂရမ်၊ နှမ်းဆီ ၄ ဂရမ်နှင့် ထမင်းရည်ချဉ် ၈ ဂရမ်တို့ကို ရောမွှေပါ။"),
      t("Put 160g cooked rice into a bowl.", "丼に160gのご飯を盛ります。", "ပန်းကန်လုံးထဲတွင် ချက်ပြီးသားထမင်း ၁၆၀ ဂရမ်ကို ထည့်ပါ။"),
      t("Add 120g tuna, 150g tofu, 100g cooked egg, and 80g cucumber on top.", "120gのツナ、150gの豆腐、100gの卵、80gのきゅうりを上にのせます。", "ငါးတူနာ ၁၂၀ ဂရမ်၊ တိုဖူး ၁၅၀ ဂရမ်၊ ကြက်ဥ ၁၀၀ ဂရမ်နှင့် သခွားသီး ၈၀ ဂရမ်တို့ကို အပေါ်မှတင်ပါ။"),
      t("Pour the sauce over the bowl.", "タレを丼全体にかけます。", "အချိုရည်ကို ပန်းကန်လုံးပေါ်သို့ လောင်းပါ။"),
      t("Sprinkle 2g sesame seeds before serving.", "2gのごまをふりかけて完成です。", "မစားမီ နှမ်းဖြူ ၂ ဂရမ်ကို ဖြူးပါ။")
    ],
    t("Very quick high-protein bowl using tuna, tofu, and egg. Good for emergency simple cooking when there is no time.", "ツナ、豆腐、卵を使った超簡単な高タンパク丼です。時間がないときの簡単料理に最適です。", "ငါးတူနာ၊ တိုဖူးနှင့် ကြက်ဥတို့ကို သုံးသော ပရိုတင်းဓာတ်မြင့်သည့် အလွန်မြန်ဆန်သော ထမင်းသုပ်ဖြစ်သည်။ အချိန်မရှိသောအခါ ရိုးရှင်းသည့် အရေးပေါ်ချက်ပြုတ်ခြင်းအတွက် ကောင်းသည်။"),
    [
      photo("assets/recipes/human-food/tuna-tofu-egg-rice-bowl-main.jpg",
        t("Tuna tofu egg rice bowl", "ツナ豆腐卵丼", "ငါးတူနာ ပဲပိစပ် ကြက်ဥ ထမင်းသုပ်"),
        t("Quick protein bowl with tuna, tofu, egg, and cucumber", "ツナ、豆腐、卵、きゅうりのクイックプロテイン丼", "ငါးတူနာ၊ တိုဖူး၊ ကြက်ဥနှင့် သခွားသီးပါသော အမြန်ပရိုတင်းသုပ်"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食/夕食", "နေ့လယ်စာ/ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("10 mins", "10分", "၁၀ မိနစ်"),
      highProtein: true,
      nutrition: {
        calories: 666,
        protein: 59.3,
        carbs: 52.9,
        fat: 23.3,
        basis: t(
          "Calculated using drained tuna in water and Japanese firm momen tofu.",
          "水煮で水切りしたツナと、日本の木綿豆腐を使用して計算しています。",
          "ရေထဲထည့်ထားပြီး ရေစစ်ထားသော tuna နှင့် ဂျပန် momen tofu ကို အသုံးပြု၍ တွက်ချက်ထားသည်။"
        )
      }
    }
  ),
  recipe("chicken-soboro-don",
    t("Chicken Soboro Don", "鶏そぼろ丼", "ကြက်သား စိုဘိုရို ထမင်းသုပ်"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "180g", "rice", { calories: 234, protein: 4.2, carbs: 51.7, fat: 0.3 }],
      [t("Minced chicken breast", "鶏ひき肉", "ကြက်သားနုတ်နုတ်စင်း"), "220g", "chicken-minced", { calories: 247, protein: 49.6, carbs: 0.0, fat: 4.3 }],
      [t("Egg", "卵", "ကြက်ဥ"), "100g", "eggs", { calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5 }],
      [t("Spinach", "ほうれん草", "ဟင်းနွယ်စိမ်း"), "80g", "spinach", { calories: 18, protein: 2.3, carbs: 2.9, fat: 0.3 }],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "18g", "soy-sauce", { calories: 10, protein: 1.5, carbs: 0.9, fat: 0.1 }],
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
      [t("Sugar", "砂糖", "သကြား"), "4g", "sugar", { calories: 15, protein: 0.0, carbs: 4.0, fat: 0.0 }],
      [t("Grated ginger", "おろし生姜", "ချင်းခြစ်"), "5g", "ginger", { calories: 4, protein: 0.1, carbs: 0.9, fat: 0.0 }],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "5g", "oil", { calories: 44, protein: 0.0, carbs: 0.0, fat: 5.0 }]
    ],
    [
      t("Beat 100g egg in a bowl.", "100gの卵をボウルで溶きほぐします。", "ကြက်ဥ ၁၀၀ ဂရမ်ကို ဇလုံထဲတွင် ခေါက်ပါ။"),
      t("Heat 2g cooking oil in a pan over low heat.", "フライパンに2gのサラダ油を入れて弱火で熱します。", "ဒယ်အိုးထဲတွင် ဟင်းချက်ဆီ ၂ ဂရမ်ကို မီးအေးအေးဖြင့် ပူအောင်တည်ပါ။"),
      t("Add the egg and stir continuously for 1-2 minutes to make soft scrambled egg. Remove and set aside.", "卵を加え、絶えず混ぜながら1〜2分加熱し、ふんわりとしたスクランブルエッグにします。取り出して取りおきます。", "ကြက်ဥထည့်ပြီး ၁-၂ မိနစ်ခန့် စဉ်ဆက်မပြတ်မွှေကာ ကြက်ဥမွှေကြော်ပျော့ပျော့လေးလုပ်ပါ။ ဖယ်ပြီး သီးသန့်ထားပါ။"),
      t("Heat 3g cooking oil in the same pan over medium heat.", "同じフライパンに3gのサラダ油を入れて中火で熱します。", "တူညီသော ဒယ်အိုးထဲတွင် ဟင်းချက်ဆီ ၃ ဂရမ်ကို အလယ်အလတ်မီးဖြင့် ပူအောင်တည်ပါ။"),
      t("Add 220g minced chicken breast.", "220gの鶏ひき肉を加えます。", "ကြက်သားနုတ်နုတ်စင်း ၂၂၀ ဂရမ်ကို ထည့်ပါ။"),
      t("Stir and break the chicken into small pieces while cooking for 4-5 minutes.", "鶏肉をポロポロにほぐしながら4〜5分間炒めます。", "ချက်နေစဉ် ကြက်သားများကို ခြေပြီး ၄-၅ မိနစ်ခန့် မွှေကြော်ပါ။"),
      t("Add 18g soy sauce, 18g mirin, 18g sake or water, 4g sugar, and 5g grated ginger.", "醤油18g、みりん18g、酒または水18g、砂糖4g、おろし生姜5gを加えます。", "ပဲငံပြာရည် ၁၈ ဂရမ်၊ မီရင် ၁၈ ဂရမ်၊ ဆာကေး သို့မဟုတ် ရေ ၁၈ ဂရမ်၊ သကြား ၄ ဂရမ်နှင့် ချင်းခြစ် ၅ ဂရမ်တို့ကို ထည့်ပါ။"),
      t("Cook for another 3-4 minutes until the chicken is fully cooked and the liquid is mostly reduced.", "鶏肉に完全に火が通り、水分がほとんどなくなるまでさらに3〜4分煮つめます。", "ကြက်သားကျက်ပြီး အရည်ခမ်းလုနီးပါးဖြစ်သည်အထိ နောက်ထပ် ၃-၄ မိနစ်ခန့် ချက်ပါ။"),
      t("Boil or steam 80g spinach for 1 minute, then drain.", "80gのほうれん草を1分間茹でるか蒸し、水気を切ります。", "ဟင်းနွယ်စိမ်း ၈၀ ဂရမ်ကို ၁ မိနစ်ခန့် ပြုတ်ပါ သို့မဟုတ် ပေါင်းပါ၊ ပြီးလျှင် ရေစစ်ထုတ်ပါ။"),
      t("Place 180g cooked rice in a bowl.", "丼に180gのご飯を盛ります。", "ပန်းကန်လုံးထဲတွင် ချက်ပြီးသားထမင်း ၁၈၀ ဂရမ်ကို ထည့်ပါ။"),
      t("Add chicken soboro, scrambled egg, and spinach on top.", "鶏そぼろ、スクランブルエッグ、ほうれん草をご飯の上にのせます。", "ကြက်သားစိုဘိုရို၊ ကြက်ဥမွှေကြော်နှင့် ဟင်းနွယ်စိမ်းတို့ကို ထမင်းပေါ်သို့ တင်ပါ။")
    ],
    t("Good meal-prep recipe. Minced chicken breast makes it higher protein and lower fat.", "作り置きに便利なレシピです。鶏むねのひき肉を使うことで、高タンパク・低脂質に仕上がります。", "ကြိုတင်ပြင်ဆင်ထားရန် ကောင်းသော ဟင်းချက်နည်းဖြစ်သည်။ ကြက်ရင်ပုံသား နုတ်နုတ်စင်းကို သုံးခြင်းက ပရိုတင်းပိုမြင့်ပြီး အဆီနည်းစေသည်။"),
    [
      photo("assets/recipes/human-food/chicken-soboro-don-main.jpg",
        t("Chicken soboro don", "鶏そぼろ丼", "ကြက်သား စိုဘိုရို ထမင်းသုပ်"),
        t("Minced chicken, egg, and spinach over rice", "鶏そぼろ、卵、ほうれん草の三色丼", "ကြက်သားနုတ်နုတ်စင်း၊ ကြက်ဥနှင့် ဟင်းနွယ်စိမ်းပါသော သုံးရောင်ခြယ်ထမင်းသုပ်"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食/夕食", "နေ့လယ်စာ/ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("15 mins", "15分", "၁၅ မိနစ်"),
      highProtein: true,
      nutrition: {
        calories: 759,
        protein: 70.3,
        carbs: 68.9,
        fat: 19.6,
        basis: t(
          "Calculated using minced skinless chicken breast and water for the sake-or-water option.",
          "皮なし鶏むねひき肉を使用し、酒または水の選択肢は水で計算しています。",
          "အရေပြားမပါသော ကြက်ရင်ပုံသားနုတ်နုတ်စင်းနှင့် ဆာကေး သို့မဟုတ် ရေ ရွေးချယ်မှုတွင် ရေကို အသုံးပြု၍ တွက်ချက်ထားသည်။"
        )
      }
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
  )
];


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
  checkObj(window.nakoData.foodItems, "foodItems");
  checkObj(window.nakoData.routineTasks, "routineTasks");
  checkObj(window.nakoData.recipes, "recipes");
  checkObj(window.nakoData.additionalResources, "additionalResources");
  checkObj(window.nakoData.trainingData, "trainingData");

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
    pumpkin: { file: "pumpkin.jpg", source: product("/product/orgo-fresh-pumpkin-whole-pumkin-1-pc-90145601"), target: "Whole fresh pumpkin" },
    carrot: { file: "carrot.jpg", source: product("/product/snackables-snack-fresh-carrots-250g-13280574"), target: "Fresh whole carrots" },
    whitefish: { file: "whitefish.jpg", source: product("/product/catch-seafood-pacific-dory-fillet"), target: "Plain frozen dory / white-fish fillet package" },
    "sweet-potato": { file: "sweet-potato.jpg", source: product("/product/13135134"), target: "Fresh sweet potatoes" },
    zucchini: { file: "zucchini.jpg", source: product("/product/thygrace-green-zucchini-2-per-pack-13183890"), target: "Fresh green zucchini" },
    "napa-cabbage": { file: "napa-cabbage.jpg", source: product("/product/wa-wa-chye-baby-wongbok-250g-10950392"), target: "Whole wong bok / napa cabbage" },
    broccoli: { file: "broccoli.jpg", source: product("/product/orgo-fresh-royal-broccoli-280-g-90153099"), target: "Fresh broccoli head or supermarket pack" },
    rice: { file: "rice.jpg", source: product("/product/fairprice-japonica-rice-premium-short-grain-25kg-13086207"), target: "Japanese-style short-grain rice bag" },
    "soy-sauce": { file: "soy-sauce.jpg", source: product("/product/12400028"), target: "Japanese-style soy sauce bottle" },
    mirin: { file: "mirin.jpg", source: product("/product/takara-mirin-japanese-sweet-cooking-rice-wine-300ml-90002289"), target: "Mirin bottle" },
    "cooking-sake": { file: "cooking-sake.jpg", source: product("/product/kirei-premium-hinode-japan-ryorishu-cooking-sake-400-ml-90121995"), target: "Japanese cooking-sake bottle" },
    sugar: { file: "sugar.jpg", source: product("/product/fairprice-pure-cane-sugar-fine-grain-3kg-13179180"), target: "White-sugar packet" },
    ginger: { file: "ginger.jpg", source: product("/product/orgo-fresh-ginger-210-g-90160216"), target: "Fresh ginger root" },
    oil: { file: "oil.png", source: null, target: "Premium bottle of extra virgin olive oil" },
    sesame: { file: "sesame.jpg", source: product("/product/pasar-white-sesame-seed-150g-13218883"), target: "White sesame seed packet" },
    "salmon-fillet": { file: "salmon.jpg", source: product("/product/catch-seafood-atlantic-salmon-fillet-1-3-kg-90122048"), target: "Raw salmon fillet package" },
    salt: { file: "salt.jpg", source: product("/product/fairprice-premium-fine-salt-500g-432823"), target: "Ordinary table-salt packet" },
    eggs: { file: "egg.jpg", source: product("/product/pasar-fresh-eggs-30-per-pack-13197730"), target: "Fresh egg carton" },
    spinach: { file: "spinach.jpg", source: product("/product/kok-fah-baby-spinach-200g-13032623"), target: "Fresh spinach pack" },
    lemon: { file: "lemon.jpg", source: product("/product/freshco-lemons-fresh"), target: "Fresh lemons" },
    pork: { file: "pork.jpg", source: product("/product/simply-yumme-pork-lean-slice"), target: "Lean raw pork slices in a labelled pack" },
    cabbage: { file: "cabbage.jpg", source: product("/product/orgo-fresh-cabbage-whole-1-pc-90150967"), target: "Ordinary whole green cabbage" },
    "shimeji-mushroom": { file: "shimeji-mushroom.jpg", source: product("/product/hokto-mushroom-white-shimeiji-100g-11017131"), target: "Shimeji mushroom retail pack" },
    "button-mushroom": { file: "button-mushroom.jpg", source: product("/product/pasar-white-button-mushroom-200g-13101275"), target: "White button mushroom retail pack" },
    dashi: { file: "dashi.jpg", source: product("/product/ajinomoto-hon-dashi-kirei-1-kg-90155858"), target: "Japanese dashi stock packet" },
    tuna: { file: "tuna.jpg", source: product("/product/fairprice-tuna-flakes-in-water-160g-13256630"), target: "Canned tuna in water" },
    tofu: { file: "firm-tofu.jpg", source: product("/product/fairprice-tau-kwa-2s-400g-13233989"), target: "Firm tofu in refrigerated retail packaging" },
    cucumber: { file: "cucumber.jpg", source: product("/product/malaysia-naturally-fresh-japanese-cucumber-400g-13097478"), target: "Fresh Japanese cucumber" },
    "sesame-oil": { file: "sesame-oil.jpg", source: product("/product/lee-kum-kee-pure-sesame-oil-207ml-13160717"), target: "Sesame-oil bottle" },
    "rice-vinegar": { file: "rice-vinegar.jpg", source: product("/product/redman-rice-vinegar"), target: "Rice-vinegar bottle" },
    miso: { file: "miso-paste.jpg", source: product("/product/kirei-yamataka-omiso-ya-san-japanese-shiro-miso-paste-1-kg-90085339"), target: "Japanese miso tub or pouch" },
    water: { file: "water.png", source: null, target: "A clean, elegant glass of fresh pure water" }
  });
})();


window.nakoData = { 
  langs: ["en", "jp", "mm"], 
  ui, 
  homeSections, 
  foodItems, 
  routineTasks, 
  recipes, 
  cookingRules,
  additionalResources,
  trainingData,
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
