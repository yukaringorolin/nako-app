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
    cookingRules: "料理のルール",
    futureTracking: "追跡用プレースホルダー",
    recipes: "トッピングレシピ",
    recipeName: "レシピ名",
    ingredients: "材料",
    amount: "分量",
    method: "作り方",
    routineItems: "ルーティン項目",
    foodItems: "食事と追跡項目",
    pinnedSafety: "ピン留めされた安全情報",
    noItems: "項目はありません。",
    back: "戻る",
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
    cookingRules: "ချက်ပြုတ်ခြင်းဆိုင်ရာ စည်းကမ်းများ",
    futureTracking: "ခြေရာခံရန်နေရာ",
    recipes: "အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ",
    recipeName: "ဟင်းချက်နည်းအမည်",
    ingredients: "ပါဝင်ပစ္စည်းများ",
    amount: "ပမာဏ",
    method: "ပြုလုပ်နည်း",
    routineItems: "ပုံမှန်လုပ်ဆောင်ချက်များ",
    foodItems: "အစားအသောက်နှင့် ခြေရာခံစရာများ",
    pinnedSafety: "အရေးကြီးဘေးကင်းလုံခြုံရေး",
    noItems: "ဘာမှမရှိသေးပါ။",
    back: "နောက်သို့",
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

function sec(id, icon, accent, iconBg, title, description, image = "") {
  return { id, icon, accent, iconBg, title, description, image };
}

const cookingRules = [
  t("Cook up to 3 meals a day when needed.", "必要に応じて1日最大3食調理します。", "လိုအပ်ပါက တစ်နေ့လျှင် ၃ နပ်အထိ ချက်ပြုတ်ပါ။"),
  t("Focus on high protein and low fat.", "高タンパク質かつ低脂質を意識してください。", "ပရိုတင်းဓာတ်မြင့်မားပြီး အဆီဓာတ်နည်းပါးခြင်းကို အဓိကထားပါ။"),
  t("Do not use onion, coriander, parsley, or bean sprouts.", "玉ねぎ、パクチー、パセリ、もやしは使用しないでください。", "ကြက်သွันနီ၊ နံနံပင်၊ ပါစလီ သို့မဟုတ် ပဲပင်ပေါက် လုံးဝမသုံးပါနှင့်။"),
  t("Ask before using unfamiliar ingredients.", "見慣れない食材を使用する前には確認してください。", "မရင်းနှီးသော ပါဝင်ပစ္စည်းများကို အသုံးမပြုမီ အရင်မေးပါ။"),
  t("Ask before changing the menu.", "メニューを変更する前には確認してください。", "မီနူးကို မပြောင်းလဲမီ အရင်မေးပါ။"),
  t("Clean the kitchen after cooking.", "調理後にキッチンを掃除してください。", "ချက်ပြုတ်ပြီးနောက် မီးဖိုချောင်ကို သန့်ရှင်းရေးလုပ်ပါ။"),
];

const foodItems = [
  food("recipes", "recipeIndex", "R", 
    t("Topping Recipes", "トッピングレシピ", "အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ"), 
    t("Approved Nako topping recipes with ingredients and amounts.", "材料と分量が記載された、承認済みのナコ用トッピングレシピ。", "ပါဝင်ပစ္စည်းများနှင့် ပမာဏများပါဝင်သော Nako အတွက် ခွင့်ပြုထားသော အပေါ်မှထည့်ရန် ဟင်းချက်နည်းများ။"), 
    t("Open a recipe before preparing any topping.", "トッピングを準備する前にレシピを開いてください。", "မည်သည့်အပေါ်မှတင်စရာမဆို မပြင်ဆင်မီ ဟင်းချက်နည်းကို အရင်ဖွင့်ပါ။"), 
    t("No seasoning, oil, onion, or garlic unless approved.", "承認されない限り、調味料、油、玉ねぎ、にんにくは使用しないでください。", "ခွင့်ပြုချက်မရှိဘဲ ဟင်းခတ်မှုန့်、ဆီ、ကြက်သွန်နီ သို့မဟုတ် ကြက်သွန်ဖြူ မသုံးပါနှင့်။"), 1),
  food("cooking-rules", "rules", "!", 
    t("Cooking Rules", "料理のルール", "ချက်ပြုတ်ခြင်းဆိုင်ရာ စည်းကမ်းများ"), 
    t("Rules to check before cooking or changing any menu.", "調理を始める前やメニューを変更する前に確認すべきルール。", "ချက်ပြုတ်ခြင်း သို့မဟုတ် မီနူးပြောင်းလဲခြင်းမပြုမီ စစ်ဆေးရမည့်စည်းကမ်းများ။"), 
    t("Read all rules before cooking.", "調理する前にすべてのルールを読んでください。", "မချက်ပြုတ်မီ စည်းကမ်းအားလုံးကို ဖတ်ပါ။"), 
    t("Menu changes and unfamiliar ingredients must be confirmed first.", "メニューの変更や見慣れない食材については、まず確認が必要です。", "မီနူးပြောင်းလဲခြင်းနှင့် မရင်းနှီးသော ပါဝင်ပစ္စည်းများကို အရင်အတည်ပြုရမည်။"), 2),
  food("meal-logs", "placeholder", "L", 
    t("Meal Logs", "食事記録", "အစားအသောက်မှတ်တမ်းများ"), 
    t("Future Streamlit tracking for meals, protein target, and notes.", "食事、タンパク質目標、およびメモのための将来的なStreamlit追跡機能。", "အစားအစာ၊ ပရိုတင်းရည်မှန်းချက်နှင့် မှတ်စုများအတွက် နောင်တွင်သုံးမည့် Streamlit ခြေရာခံခြင်း။"), 
    t("Placeholder only for now. Detailed meal tracking will be handled later.", "現在はプレースホルダーのみです。詳細な食事追跡は後で対応します。", "လောလောဆယ် နေရာလွတ်ပြထားခြင်းသာဖြစ်သည်။ အသေးစိတ်အစားအစာခြေရာခံခြင်းကို နောက်မှဆောင်ရွက်မည်။"), 
    t("Keep cooking rules visible until tracking is built.", "追跡機能が構築されるまで、料理ルールを表示したままにしてください。", "ခြေရာခံစနစ် မဆောက်ရသေးမီ ချက်ပြုတ်ခြင်းစည်းကမ်းများကို မြင်သာအောင်ထားပါ။"), 3),
  food("nako-feeding", "placeholder", "N", 
    t("Nako Feeding", "ナコの給餌", "Nako ကိုအစာကျွေးခြင်း"), 
    t("Future tracking for Nako meals, appetite, water, and notes.", "ナコの食事、食欲、水、およびメモのための将来的な追跡機能。", "Nako ၏အစားအစာ၊ အစာစားချင်စိတ်၊ ရေနှင့် မှတ်စုများအတွက် နောင်တွင်သုံးမည့် ခြေရာခံခြင်း။"), 
    t("Feed Nako consistently and record appetite later when tracking is added.", "ナコに規則正しく餌を与え、後で追跡機能が追加されたら食欲を記録します。", "Nako ကို အချိန်မှန်အစာကျွေးပါ၊ ခြေရာခံစနစ်ထည့်သွင်းပြီးနောက် အစာစားချင်စိတ်ကို မှတ်တမ်းတင်ပါ။"), 
    t("Ask before changing portions or food method.", "分量や給餌方法を変更する前に確認してください。", "ပမာဏ သို့မဟုတ် အစာကျွေးနည်း မပြောင်းလဲမီ အရင်မေးပါ။"), 4),
  food("nako-weight", "placeholder", "KG", 
    t("Nako Weight Tracking", "ナコの体重測定", "Nako ၏ကိုယ်အလေးချိန် ခြေရာခံခြင်း"), 
    t("Future weekly weight log for Nako.", "ナコの将来的な週次の体重記録機能。", "Nako အတွက် နောင်တွင်သုံးမည့် အပတ်စဉ် ကိုယ်အလေးချိန်မှတ်တမ်း။"), 
    t("Weigh Nako Sunday morning before breakfast using the same scale when possible.", "可能な限り同じ体重計を使用し、日曜日の朝食前にナコの体重を測定します。", "ဖြစ်နိုင်လျှင် တူညီသောကိုယ်အလေးချိန်စက်ကို သုံး၍ တနင်္ဂနွေနေ့နံနက် အစာမစားမီ ချိန်ပေးပါ။"), 
    t("Consistency matters more than exact timing perfection.", "正確なタイミングよりも、継続して行うことが重要です。", "တိကျသောအချိန်ထက် ပုံမှန်ပြုလုပ်ရန်က ပိုအရေးကြီးသည်။"), 5),
  food("nako-inventory", "placeholder", "I", 
    t("Nako Inventory", "ナコの在庫状況", "Nako ၏ပစ္စည်းစာရင်း"), 
    t("Future stock tracking for Nako food, pee pads, wipes, and bags.", "ナコのフード、おしっこシート、ウェットティッシュ、袋の将来的な在庫管理機能。", "Nako ၏အစာ၊ ဆီးခံပြား၊ စိုစွတ်သောတစ်ရှူးနှင့် အိတ်များအတွက် နောင်တွင်သုံးမည့် ပစ္စည်းခြေရာခံခြင်း။"), 
    t("Check Nako supplies weekly and add low-stock items to shopping.", "毎週ナコの用品をチェックし、残り少なくなった品物を買い物リストに追加します。", "Nako သုံးပစ္စည်းများကို အပတ်စဉ်စစ်ဆေးပြီး ကုန်ခါနီးပစ္စည်းများကို ဝယ်ယူရန်စာရင်းထဲ ထည့်ပါ။"), 
    t("Tell Edwin early before items fully run out.", "品物が完全に切れる前に、早めにエドウィンに報告してください。", "ပစ္စည်းများ လုံးဝမကုန်မီ Edwin ထံ စောစောအကြောင်းကြားပါ။"), 6),
  food("nako-emergency", "placeholder", "!", 
    t("Nako Emergency Quick Guide", "ナコ緊急事態クイックガイド", "Nako အရေးပေါ် အမြန်လမ်းညွှန်"), 
    t("Pinned emergency reminder for vomiting, diarrhoea, refusing food, or unsafe behavior.", "嘔吐、下痢、食欲不振、または安全でない行動に対する、ピン留めされた緊急リマインダー。", "အော့အန်ခြင်း၊ ဝမ်းလျှောခြင်း၊ အစာမစားခြင်း သို့မဟုတ် မလုံခြုံသောအပြုအမူများအတွက် ချိတ်ဆွဲထားသော အရေးပေါ်သတိပေးချက်。"), 
    t("Safely isolate Nako, take a photo if useful, and notify Edwin immediately before doing anything else.", "ナコを安全に隔離し、必要に応じて写真を撮り、他のことをする前にすぐにエドウィンに通知してください。", "Nako ကို ဘေးကင်းစွာသီးခြားထားပါ、လိုအပ်လျှင် ဓာတ်ပုံရိုက်ပြီး အခြားအရာများမလုပ်မီ Edwin ထံ ချက်ချင်းအကြောင်းကြားပါ။"), 
    t("Notify Edwin before doing anything else.", "他のことをする前にエドウィンに連絡してください。", "အခြားအရာများ မလုပ်ဆောင်မီ Edwin ထံ အရင်အကြောင်းကြားပါ။"), 7),
];

function food(id, type, icon, title, summary, instructions, note, sortOrder) {
  return { id, type, icon, title, summary, instructions: [instructions], mustRemember: [note], videoUrl: "", trackingMode: type === "placeholder" ? "future" : "reference", sortOrder };
}

function photo(src, alt, caption) {
  return { src, alt, caption };
}

function routine(id, bucket, sortOrder, icon, title, summary, frequencyText, note, photos = []) {
  return { id, section: "routine", frequencyBucket: bucket, frequencyText, icon, title, summary, instructions: [summary], mustRemember: [note], photos, videoUrl: "", trackingMode: "light", tags: [], sortOrder };
}

const routineTasks = [
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
  routine("protein-shake-creatine-prep", "daily", 999, "P",
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
    t("Nako - Exercise & Grooming", "ナコ - 運動とグルーミング", "Nako - လေ့ကျင့်ခန်းနှင့် အမွှေးအမျှင်ထိန်းသိမ်းခြင်း"), 
    t("Do 2 walks daily, wipe paws after returning, brush coat, wipe eyes, and wipe Nako down every night before sleep.", "毎日2回散歩させ、戻ったら足を拭き、毛並みをブラッシングし、目を拭き、毎晩寝る前にナコの体を拭きます。", "နေ့စဉ် ၂ ကြိမ် လမ်းလျှောက်ပါ၊ ပြンလာလျှင် ခြေဖဝါးများကို သုတ်ပါ、အမွှေးဖြီးပါ、မျက်စိသုတ်ပါ၊ ညစဉ် မအိပ်မီ Nako ၏ကိုယ်ခန္ဓာကို သုတ်ပေးပါ။"), 
    t("Daily", "毎日", "နေ့စဉ်"), 
    t("Do not leave her damp after wiping; blow dry gently if needed.", "体を拭いた後、湿ったまま放置しないでください。必要に応じてドライヤーで優しく乾かします。", "သုတ်ပြီးနောက် စိုစွတ်မထားပါနှင့်၊ လိုအပ်ပါက လေမှုတ်စက်ဖြင့် ညင်သာစွာ ခြောက်သွေ့အောင် မှုတ်ပေးပါ။")),
  routine("nako-training-fun", "daily", 60, "N", 
    t("Nako - Dog Training & Fun", "ナコ - ドッグトレーニングと遊び", "Nako - လေ့ကျင့်ပေးခြင်းနှင့် ကစားခြင်း"), 
    t("Refresh Nako's commands and do short positive training sessions with treats. Let her out under supervision if she needs to drain energy.", "ナコのコマンドを復習し、おやつを使って短いポジティブなトレーニングを行います。体力を発散させる必要がある場合は、目の届く範囲でケージの外に出します。", "Nako ၏ အမိန့်များကို ပြန်လည်လေ့ကျင့်ပေးပြီး မုန့်များဖြင့် တိုတောင်းသော အပြုသဘောဆောင်သည့် လေ့ကျင့်ခန်းများ ပြုလုပ်ပါ။ အားအင်ကုန်ခမ်းရန် လိုအပ်ပါက စောင့်ကြည့်မှုအောက်တွင် အပြင်သို့ လွှတ်ပေးပါ။"), 
    t("Daily + as needed", "毎日＋必要に応じて", "နေ့စဉ် + လိုအပ်သလို"), 
    t("When out of the pen, use house leash / house line and 100% active supervision.", "ケージの外に出すときは、ハウスリードを使用し、100%注意を怠らないでください。", "ခြံပြင်ပသို့ ရောက်ရှိနေစဉ်၊ အိမ်သုံးကြိုးကို အသုံးပြုပြီး ၁၀၀% အပြည့်အဝ စောင့်ကြည့်ပါ။")),
  routine("nako-supervision", "daily", 70, "!", 
    t("Nako - Supervision", "ナコ - 監視", "Nako - စောင့်ကြည့်ခြင်း"), 
    t("Whenever Nako is out of the pen, she must wear her collar and house leash / house line and be monitored actively.", "ナコがケージの外に出ているときは、常に首輪とハウスリードを着用させ、積極的に監視する必要があります。", "Nako သည် ခြံပြင်ပတွင် ရှိနေသည့်အချိန်တိုင်း လည်ပတ်နှင့် အိမ်သုံးကြိုးကို ဝတ်ဆင်ထားရမည်ဖြစ်ပြီး တက်ကြွစွာ စောင့်ကြည့်ရမည်။"), 
    t("Whenever out of pen / roaming", "ケージの外に出ているとき / 自由に歩き回っているとき", "ခြံပြင်ပသို့ ရောက်နေစဉ် / လွတ်လပ်စွာသွားလာနေစဉ်"), 
    t("Do not leave her roaming unsupervised.", "監視なしで自由に歩き回らせないでください。", "စောင့်ကြည့်မှုမရှိဘဲ လွှတ်မထားပါနှင့်။")),
  routine("nako-kind-handling", "daily", 80, "!", 
    t("Nako - Kind Handling Reminder", "ナコ - 優しく扱うためのリマインダー", "Nako - ညင်သာစွာ ဆက်ဆံရန် သတိပေးချက်"), 
    t("Always treat Nako gently, kindly, and humanely. Use calm handling only.", "常にナコを優しく、親切に、人道的に扱ってください。穏やかな扱い方のみを行ってください。", "Nako ကို အမြဲတမ်း ညင်သာစွာ၊ ကြင်နာစွာနှင့် လူသားဆန်စွာ ဆက်ဆံပါ။ အေးဆေးတည်ငြိမ်စွာသာ ကိုင်တွယ်ပါ။"), 
    t("Always", "常に", "အမြဲတမ်း"), 
    t("Tell Edwin immediately if there is any issue.", "問題がある場合は、すぐにエドウィンに報告してください。", "ပြဿနာတစ်စုံတစ်ရာရှိပါက Edwin ထံ ချက်ချင်းအကြောင်းကြားပါ။")),
  routine("nako-emergency", "daily", 90, "!", 
    t("Nako Emergency", "ナコ 緊急事態", "Nako အရေးပေါ်အခြေအနေ"), 
    t("If she vomits, has diarrhoea, refuses food, or seems unsafe, isolate her safely, take a photo if useful, and notify Edwin immediately.", "嘔吐、下痢、食欲不振、または安全でない様子が見られる場合は、安全に隔離し、必要に応じて写真を撮り、すぐにエドウィンに通知してください。", "သူမ အော့အန်ခြင်း၊ ဝမ်းလျှောခြင်း၊ အစာမစားခြင်း သို့မဟုတ် မလုံခြုံဟု ထင်ရပါက၊ ဘေးကင်းစွာ သီးခြားထားပါ၊ လိုအပ်ပါက ဓာတ်ပုံရိုက်ပြီး Edwin ထံ ချက်ချင်း အကြောင်းကြားပါ။"), 
    t("Immediately", "すぐに", "ချက်ချင်း"), 
    t("Notify Edwin before doing anything else.", "他のことをする前にエドウィンに連絡してください。", "အခြားအရာများ မလုပ်ဆောင်မီ Edwin ထံ အရင်အကြောင်းကြားပါ။")),
  routine("mail-deliveries", "daily", 100, "P", 
    t("Mail & Deliveries", "郵便物と配達物", "စာနှင့် ပါဆယ်ပစ္စည်းများ"), 
    t("Check the mailbox daily, bring in packages, answer the door for deliveries, unpack outside, discard packaging, and wipe items before bringing them in.", "毎日ポストをチェックし、荷物を受け取り、配達に対応します。外で開梱して梱包材を処分し、品物を拭いてから家の中に入れます。", "စာတိုက်ပုံးကို နေ့စဉ်စစ်ဆေးပါ၊ ပါဆယ်များကို ယူပါ、တံခါးဖွင့်ပေးပါ、အပြင်တွင် ပါဆယ်များကို ဖွင့်ပြီး ထုပ်ပိုးမှုများကို စွန့်ပစ်ပါ၊ အထဲသို့ မယူဆောင်မီ ပစ္စည်းများကို သုတ်ပါ။"), 
    t("Daily", "毎日", "နေ့စဉ်"), 
    t("Do not bring dirty packaging directly into the house.", "汚れた梱包材を直接家の中に持ち込まないでください。", "ညစ်ပတ်သော ထုပ်ပိုးမှုများကို အိမ်ထဲသို့ တိုက်ရိုက်မယူလာပါနှင့်။")),
  routine("general-tidiness", "daily", 110, "T", 
    t("General Tidiness", "一般的な整理整頓", "ယေဘုယျ သန့်ရှင်းသပ်ရပ်မှု"), 
    t("Wipe down items left outside and keep them properly back in place so things are not left lying around.", "出しっぱなしになっている物を拭き取り、適切に元の場所に戻して、散らかったままにしないようにします。", "အပြင်တွင် ကျန်ခဲ့သော ပစ္စည်းများကို သုတ်ပြီး ပစ္စည်းများ ရှုပ်ပွမနေစေရန် သင့်တော်သောနေရာတွင် ပြန်သိမ်းပါ။"), 
    t("Daily + as needed", "毎日＋必要に応じて", "နေ့စဉ် + လိုအပ်သလို"), 
    t("Do not leave items lying around.", "物を出しっぱなしにしないでください。", "ပစ္စည်းများကို ဟိုဟိုဒီဒီ ပြန့်ကြဲမထားပါနှင့်。")),
  routine("floor-cleaning", "daily", 120, "F", 
    t("Floor Cleaning", "床の掃除", "ကြမ်းပြင်သန့်ရှင်းရေး"), 
    t("Sweep and mop daily. Include normal reachable areas under the sofa and cabinets.", "毎日掃き掃除とモップ掛けを行います。ソファやキャビネットの下の手の届く範囲も含めます。", "နေ့စဉ် တံမြက်လှည်းပြီး ကြမ်းတိုက်ပါ။ ဆိုဖาနှင့် ဗีရိုများအောက်ရှိ ပုံမှန်လက်လှမ်းမီသော နေရာများကိုပါ ထည့်သွင်းပါ။"), 
    t("Daily", "毎日", "နေ့စဉ်"), 
    t("Use only stone-safe, pH-neutral cleaners to protect the onyx green marble.", "オニキスグリーン大理石を保護するため、石材に安全な中性クリーナーのみを使用してください。", "အိုနစ် အစိမ်းရောင် စကျင်ကျောက်ကို ကာကွယ်ရန် ကျောက်ပြားအတွက် စိတ်ချရသော、pH မျှたသော သန့်ရှင်းရေးဆေးရည်များကိုသာ အသုံးပြုပါ။")),
  routine("rubbish", "daily", 130, "R", 
    t("Rubbish", "ゴミ出し", "အမှိုက်"), 
    t("Take out general trash and dog waste bins daily.", "一般ゴミと犬用ゴミ箱のゴミを毎日出します。", "အထွေထွေအမှိုက်နှင့် ขွေးအမှိုက်ပုံးများကို နေ့စဉ် စွန့်ပစ်ပါ။"), 
    t("Daily", "毎日", "နေ့စဉ်"), 
    t("Dog waste bin should not be left to smell.", "犬用ゴミ箱に臭いが残らないようにしてください。", "ခွေးအမှိုက်ပုံးမှ အနံ့ဆိုးများ မထွက်စေရန် သတိပြုပါ။")),
  routine("laundry", "daily", 140, "L", 
    t("Laundry", "洗濯", "အဝတ်လျှော်ခြင်း"), 
    t("Wash, dry, fold, and iron clothes as needed.", "必要に応じて洗濯、乾燥、たたみ、アイロン掛けを行います。", "လိုအပ်သလို အဝတ်လျှော်ပါ၊ အခြောက်ခံပါ、ခေါက်ပါ、မီးပူတိုက်ပါ။"), 
    t("Daily", "毎日", "နေ့စဉ်"), 
    t("Do not let damp clothes sit too long. Iron work clothes neatly when required.", "室内の湿った服を長時間放置しないでください。仕事用の服は必要に応じてきれいにアイロンを掛けます。", "စိုစွတ်သောအဝတ်များကို အကြာကြီး ပစ်မထားပါနှင့်။ လိုအပ်ပါက အလုပ်ဝတ်စုံများကို သပ်ရပ်စွာ မီးပူတိုက်ပေးပါ။")),
  routine("toilet-drain-hair-trap", "daily", 150, "D", 
    t("Toilet Drain & Hair Trap Cleaning", "浴室の排水口とヘアトラップの掃除", "ရေချိုးခန်း ရေနုတ်မြောင်းနှင့် ဆံပင်ခံဇကာ သန့်ရှင်းရေး"), 
    t("Check bathroom/toilet drain holes and hair traps. Remove hair or stuck debris. Use the drain pump only after being taught.", "浴室/トイレの排水口とヘアトラップをチェックします。髪の毛や詰まったゴミを取り除きます。排水ポンプは使用方法を教わってから使用してください。", "ရေချိုးခန်း/အိမ်သာ ရေနုတ်မြောင်းပေါက်များနှင့် ဆံပင်ခံဇကာများကို စစ်ဆေးပါ။ ဆံပင် သို့မဟုတ် ပိတ်မိနေသောအမှိုက်များကို ဖယ်ရှားပါ။ ရေစုပ်စက်ကို သင်ကြားပေးပြီးမှသာ အသုံးပြုပါ။"), 
    t("Daily check + as needed", "毎日チェック＋必要に応じて", "နေ့စဉ်စစ်ဆေးမှု + လိုအပ်သလို"), 
    t("Tell Edwin if water remains stuck or smells bad.", "水が詰まったままの場合や悪臭がする場合は、エドウィンに報告してください。", "ရေတင်နေခြင်း သို့မဟုတ် အနံ့ဆိုးထွက်ခြင်းရှိပါက Edwin ထံ အကြောင်းကြားပါ။")),
  routine("high-touch-surfaces", "weekly", 10, "H",
    t("High-Touch Surface Cleaning", "頻繁に触れる場所の掃除", "မကြာခဏကိုင်တွယ်သော မျက်နှာပြင်များ သန့်ရှင်းရေး"), 
    t("Clean door knobs, handles, switches, appliance handles, dish area, frequently used surfaces, and Edwin's workspace including keyboard, mouse, and work table.", "ドアノブ、取っ手、スイッチ、電化製品のハンドル、食器洗いエリア、頻繁に使用する表面、およびエドウィンのキーボード、マウス、デスクを含む作業スペースを掃除します。", "တံခါးလက်ကိုင်များ၊ ขလုတ်များ၊ စက်ပစ္စည်းလက်ကိုင်များ၊ ပန်းကန်ဆေးသည့်နေရာ၊ မကြာခဏအသုံးပြုသော မျက်နှာပြင်များနှင့် Edwin ၏ ကီးဘုတ်၊ မောက်စ်၊ အလုပ်စားပွဲ အပါအဝင် အလုပ်လုပ်သည့်နေရာကို သန့်ရှင်းရေးလုပ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"),
    t("Be gentle around electronics and avoid excess liquid near keyboard or mouse.", "電化製品の周囲は優しく扱い、キーボードやマウスの近くで液体を多く使わないでください。", "အီလက်ထရွန်နစ်ပစ္စည်းများကို ညင်သာစွာကိုင်တွယ်ပြီး ကီးဘုတ် သို့မဟုတ် မောက်စ်အနီးတွင် အရည်များများသုံးခြင်းကို ရှောင်ကြဉ်ပါ။")),
  routine("household-supplies-online", "weekly", 10, "S", 
    t("Household Supplies & Online Orders", "家庭用消耗品のオンライン注文", "အိမ်သုံးပစ္စည်းများနှင့် အွန်လိုင်းမှ မှာယူခြင်း"), 
    t("Learn to use online platforms such as Shopee to add or order household supplies when running low.", "消耗品が不足したときに、Shopeeなどのオンラインプラットフォームを使用して家庭用品を追加または注文する方法を学びます。", "အိမ်သုံးပစ္စည်းများ ကုန်ခါနီးတွင် Shopee ကဲ့သို့သော အွန်လိုင်းပလက်ဖောင်းများမှ မှာယူနည်းကို လေ့လာပါ။"), 
    t("Weekly check + as needed", "毎週チェック＋必要に応じて", "အပတ်စဉ်စစ်ဆေးမှု + လိုအပ်သလို"), 
    t("Ask before placing orders until the process is clear.", "手順が明確になるまでは、注文する前に確認してください。", "လုပ်ငန်းစဉ်ကို ကောင်းစွာနားမလည်မချင်း မမှာယူမီ အရင်မေးပါ။")),
  routine("kitchen-sink-drain-rack-counter", "weekly", 20, "K", 
    t("Kitchen Sink, Drain, Dish Rack & Countertop", "流し台、排水口、水切りラック、天板", "မီးဖိုချောင်စင်၊ ရေနုတ်မြောင်း၊ ပန်းကန်ပြားစင်နှင့် စားပွဲမျက်နှာပြင်"), 
    t("Deep clean the kitchen sink, drain area, dish rack, and kitchen cabinet countertop. Remove slime, food residue, water stains, and oil marks.", "流し台、排水口、水切りラック、キッチンの天板を大掃除します。ぬめり、食べ残し、水垢、油汚れを取り除きます。", "မီးဖိုချောင်စင်၊ ရေနုတ်မြောင်းနေရာ၊ ပန်းကန်ပြားစင်နှင့် မီးဖိုချောင် ကက်ဘိနက် စားပွဲမျက်နှာပြင်ကို သန့်ရှင်းရေးအကြီးစားလုပ်ပါ။ ဂျီးများ၊ အစားအစာအကြွင်းအကျန်များ、ရေကွက်များနှင့် ဆီကွက်များကို ဖယ်ရှားပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("This is separate from normal after-meal cleanup because these areas build up grime quickly.", "これらのエリアは汚れが溜まりやすいため、通常の食後の片付けとは別に行います。", "ဤနေရာများသည် ဂျီးမြန်မြန်တက်တတ်သဖြင့် သာမန် ထမင်းစားပြီးနောက် သန့်ရှင်းရေးနှင့် သီးခြားဖြစ်သည်။")),
  routine("nako-teeth-ears-nails", "weekly", 30, "N", 
    t("Nako - Teeth / Ears / Nails Check", "ナコ - 歯・耳・爪のチェック", "Nako - သွား / နား / ခြေသည်း စစ်ဆေးခြင်း"), 
    t("Brush Nako's teeth if trained for it. Check ears for smell or redness, and check nails or paws for anything unusual.", "指示された場合は、ナコの歯を磨きます。耳に臭いや赤みがないかチェックし、爪や足に異常がないか確認します。", "သင်ကြားပေးထားလျှင် Nako ၏ သွားများကို တိုက်ပေးပါ။ နားများတွင် အနံ့ သို့မဟုတ် နီရဲခြင်းရှိမရှိ စစ်ဆေးပါ၊ ခြေသည်း သို့မဟုတ် ခြေဖဝါးများတွင် ထူးခြားမှုရှိမရှိ စစ်ဆေးပါ။"), 
    t("Weekly / when taught", "毎週 / 指導後", "အပတ်စဉ် / သင်ကြားပေးပြီးနောက်"), 
    t("Do not force teeth brushing or nail handling if she resists.", "嫌がる場合は、歯磨きや爪の処理を無理に行わないでください。", "သူမ ရုန်းကန်နေပါက သွားတိုက်ခြင်း သို့မဟုတ် ခြေသည်းညှပ်ခြင်းကို အတင်းအကျပ် မပြုလုပ်ပါနှင့်။")),
  routine("nako-weight-tracking", "weekly", 40, "KG", 
    t("Nako - Weight Tracking", "ナコ - 体重測定", "Nako - ကိုယ်အလေးချိန် ခြေရာခံခြင်း"), 
    t("Weigh Nako first thing Sunday morning before breakfast and record the date and weight clearly.", "日曜日の朝一番、朝食前にナコの体重を測り、日付と体重を明確に記録します。", "တနင်္ဂနွေနေ့ နံနက်ပိုင်း အစာမစားမီ Nako ကို ကိုယ်အလေးချိန်ချိန်ပြီး နေ့စွဲနှင့် ကိုယ်အလေးချိန်ကို ရှင်းလင်းစွာ မှတ်တမ်းတင်ပါ။"), 
    t("Every Sunday morning before breakfast", "毎週日曜日の朝食前", "တနင်္ဂနွေနေ့ နံနက်တိုင်း အစာမစားမီ"), 
    t("Use the same scale each time where possible.", "可能な限り毎回同じ体重計を使用してください。", "ဖြစ်နိုင်လျှင် အချိန်တိုင်း တူညီသော ကိုယ်အလေးချိန်စက်ကို အသုံးပြုပါ။")),
  routine("nako-inventory-check", "weekly", 50, "I", 
    t("Nako - Inventory Check", "ナコ - 在庫チェック", "Nako - ပစ္စည်းစစ်ဆေးခြင်း"), 
    t("Check Nako's food, treats, pee pads, wipes, poop bags, cleaning spray, and other dog supplies.", "ナコのドッグフード、おやつ、おしっこシート、ウェットティッシュ、うんち袋、掃除用スプレー、その他の犬用品をチェックします。", "Nako ၏ အစာ၊ မုန့်၊ ဆီးခံပြား၊ စိုစွတ်သော တစ်ရှူး၊ ချေးကောက်သည့် အိတ်၊ သန့်ရှင်းရေးဖြန်းဆေးနှင့် အခြားခွေးသုံးပစ္စည်းများကို စစ်ဆေးပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Tell Edwin early before items fully run out.", "品物が完全に切れる前に、早めにエドウィンに報告してください。", "ပစ္စည်းများ လုံးဝမကုန်မီ Edwin ထံ စောစောအကြောင်းကြားပါ။")),
  routine("supplement-pill-boxes", "weekly", 60, "P", 
    t("Supplement Pill Boxes", "サプリメントケース", "အားဆေးဗူးများ"), 
    t("Check and top up daily supplement / pill boxes for Edwin and Yukari when empty or running low.", "エドウィンとゆかりの毎日のサプリメント/ピルボックスが空または少なくなっているか確認し、補充します。", "Edwin နှင့် Yukari တို့အတွက် နေ့စဉ်သောက်ရန် အားဆေး/ဆေးဗူးများ ကုန်ခါနီး သို့မဟုတ် ကုန်သွားပါက ဖြည့်ပေးပါ။"), 
    t("Weekly check + when empty", "毎週チェック＋空のとき", "အပတ်စဉ်စစ်ဆေးမှု + ကုန်သွားသောအခါ"), 
    t("Keep Edwin's and Yukari's boxes separate. Do not change supplements unless instructed.", "エドウィンとゆかりのケースは別々に保管してください。指示がない限り、サプリメントの内容を変更しないでください。", "Edwin နှင့် Yukari ၏ဆေးဗူးများကို သီးခြားစီထားပါ။ ညွှန်ကြားချက်မရှိဘဲ အားဆေးများကို မပြောင်းပါနှင့်။")),
  routine("toilet-cleaning", "weekly", 70, "T", 
    t("Toilet Cleaning", "トイレの掃除", "အိမ်သာသန့်ရှင်းရေး"), 
    t("Scrub and wash toilets regularly.", "定期的に便器をこすり洗いし、掃除します。", "အိမ်သာများကို ပုံမှန်တိုက်ချွတ်ဆေးကြောပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Keep toilet areas dry and hygienic.", "トイレのエリアは乾燥させ、衛生的に保ってください。", "အိမ်သာနေရာများကို ခြောက်သွေ့ပြီး သန့်ရှင်းအောင် ထားပါ။")),
  routine("rubbish-bin-washing", "weekly", 80, "B", 
    t("Rubbish Bin Washing", "ゴミ箱の洗浄", "အမှိုက်ပုံးဆေးခြင်း"), 
    t("Wash rubbish bins, including the dog waste bin if needed. Dry before putting liners back.", "必要に応じて犬用ゴミ箱を含むゴミ箱を洗います。袋を戻す前に乾燥させます。", "ခွေးအမှိုက်ပုံးအပါအဝင် အမှိုက်ပုံးများကို ဆေးကြောပါ။ အမှိုက်အိတ်မထည့်မီ ခြောက်အောင်ထားပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Prevents smell, stains, and pests.", "臭い、汚れ、および害虫を防ぎます。", "အနံ့ဆိုး၊ အစွန်းအထင်းများနှင့် ပိုးမွှားများကို ကာကွယ်ပေးသည်။")),
  routine("pest-check", "weekly", 90, "!", 
    t("Pest / Ant / Cockroach Check", "害虫/アリ/ゴキブリのチェック", "ပိုးမွှား / ပုရွက်ဆိတ် / ပိုးဟပ် စစ်ဆေးခြင်း"), 
    t("Check kitchen, bins, drains, Nako food area, and under-sink areas for ants, cockroaches, or other pests.", "キッチン、ゴミ箱、排水口、ナコの食事エリア、およびシンクの下のエリアにアリ、ゴキブリ、またはその他の害虫がいないか確認します。", "မီးဖိုချောင်၊ အမှိုက်ပုံး၊ ရေနုတ်မြောင်း、Nako အစာကျွေးသည့်နေရာနှင့် စင်အောက်များကို ပုရွက်ဆိတ်၊ ပိုးဟပ် သို့မဟုတ် အခြားပိုးမွှားများရှိမရှိ စစ်ဆေးပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Tell Edwin immediately if pests are seen.", "害虫が見つかった場合は、すぐにエドウィンに報告してください。", "ပိုးမွှားများတွေ့ပါက Edwin ထံ ချက်ချင်းအကြောင်းကြားပါ။")),
  routine("floor-mats", "weekly", 100, "M", 
    t("Floor Mats", "足拭きマット", "ခြေသုတ်ကော်ဇောများ"), 
    t("Wash the 4 floor mats outside the rooms and toilet.", "部屋とトイレの外にある4枚の床マットを洗います。", "အခန်းများနှင့် အိမ်သာအပြင်ဘက်ရှိ ခြေသုတ်ကော်ဇော ၄ ခုကို လျှော်ဖွပ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Dry completely before placing back to prevent smell, mould, or dampness.", "臭い、カビ、または湿気を防ぐため、元に戻す前に完全に乾かしてください。", "အနံ့ဆိုး、မှို သို့မဟုတ် စိုစွတ်မှုမဖြစ်စေရန် ပြန်မချမီ လုံးဝခြောက်သွေ့အောင်ထားပါ။")),
  routine("bedrooms-linens", "weekly", 110, "B", 
    t("Bedrooms & Linens", "寝室とシーツ類", "အိပ်ခန်းများနှင့် အိပ်ရာခင်းများ"), 
    t("Tidy bedrooms and change bedsheets regularly.", "寝室を片付け、定期的にベッドシーツを交換します。", "အိပ်ခန်းများကို သပ်ရပ်အောင်ထားပြီး bedsheets များကို ပုံမှန်လဲလှယ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Keep bedsheets and linens fresh.", "ベッドシーツとリネン類を清潔に保ちます。", "အိပ်ရာခင်းများနှင့် အဝတ်အထည်များကို လတ်ဆတ်သန့်ရှင်းအောင် ထားပါ။")),
  routine("windows-glass-mirrors", "weekly", 120, "G", 
    t("Windows, Glass Panels & Mirrors", "窓、ガラス窓、鏡", "ပြတင်းပေါက်များ၊ မှန်ချပ်များနှင့် မှန်များ"), 
    t("Clean all windows, glass panels, mirrors, window sills, frames, and tracks.", "すべての窓、ガラスパネル、鏡、窓枠、フレーム、およびサッシの溝を掃除します。", "ပြတင်းပေါက်များ၊ မှန်ချပ်များ、မှန်များ、ပြတင်းပေါက်ခုံများ、ဘောင်များနှင့် လမ်းကြောင်းများကို သန့်ရှင်းရေးလုပ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Wipe streak-free where possible. Be careful around window tracks and edges.", "可能な限り跡が残らないように拭き取ってください。窓の溝や端の周りは注意してください。", "ဖြစ်နိုင်လျှင် အစွန်းအထင်းမရှိအောင် သုတ်ပါ။ ပြတင်းပေါက်လမ်းကြောင်းများနှင့် အနားသတ်များအနီးတွင် သတိထားပါ။")),
  routine("sofa-covers-pillows", "weekly", 130, "S", 
    t("Sofa Covers & Pillows", "ソファカバーとクッション", "ဆိုဖာစွပ်များနှင့် ခေါင်းအုံးများ"), 
    t("Wash the 2 sofa covers and the 2 small square sofa pillows.", "2枚のソファカバーと2個の小さな正方形のソファクッションを洗います。", "ဆိုဖာစွပ် ၂ ခုနှင့် စတုရန်းပုံစံ ဆိုဖာခေါင်းအုံးအသေး ၂ ခုကို လျှော်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Dry fully before putting back to prevent damp smell.", "生乾きの臭いを防ぐため、元に戻す前に完全に乾かしてください。", "စိုထိုင်းသောအနံ့ဆိုးများမထွက်စေရန် ပြန်မစွပ်မီ ခြောက်သွေ့အောင် ထားပါ။")),
  routine("ceiling-fan", "weekly", 140, "F", 
    t("Ceiling Fan Cleaning", "天井扇の掃除", "မျက်နှာကျက်ပန်ကာ သန့်ရှင်းရေး"), 
    t("Clean and wipe ceiling fan blades and accessible fan surfaces.", "天井扇の羽根と手の届くファン表面を掃除し、拭きます。", "မျက်နှာကျက်ပန်ကာ အတောင်ပံများနှင့် လက်လှမ်းမီသော ပန်ကာမျက်နှာပြင်များကို သန့်ရှင်းရေးလုပ်ပြီး သုတ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Turn off the fan first. Be careful when using a ladder or stool.", "最初にファンの電源を切ってください。はしごや踏み台を使用するときは注意してください。", "ပထမဦးစွာ ပန်ကာကို ပိတ်ပါ။ လှေကား သို့မဟုတ် ထိုင်ခုံကို အသုံးပြုသည့်အခါ သတိထားပါ။")),
  routine("fridge-interior", "weekly", 150, "F", 
    t("Fridge Interior Cleaning", "冷蔵庫内の掃除", "ရေခဲသေတ္တာအတွင်းပိုင်း သန့်ရှင်းရေး"), 
    t("Remove items from the fridge, wipe inside surfaces and shelves, then put everything back neatly.", "冷蔵庫から品物を取り出し、内側の表面と棚を拭き、すべてをきれいに戻します。", "ရေခဲသေတ္တာထဲမှ ပစ္စည်းများကို ထုတ်ပါ၊ အတွင်းပိုင်းမျက်နှာပြင်များနှင့် စင်များကို သုတ်ပါ、ထို့နောက် အားလုံးကို သပ်သပ်ရပ်ရပ် ပြန်ထည့်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    t("Check for expired, leaking, or spoiled items.", "期限切れ、漏れ、または傷んだ品物がないか確認します。", "သက်တမ်းကုန်ဆုံးခြင်း、ယိုစိမ့်ခြင်း သို့မဟုတ် ပျက်စီးနေသောပစ္စည်းများ ရှိမရှိ စစ်ဆေးပါ။")),
  routine("cleaning-tools", "weekly", 160, "C", 
    t("Cleaning Tools Maintenance", "掃除用具の手入れ", "သန့်ရှင်းရေးသုံးပစ္စည်းများ ထိန်းသိမ်းခြင်း"), 
    t("Wash mop heads, rinse buckets, clean vacuum filters or parts as needed, replace dirty sponges, and dry cloths properly.", "モップの頭を洗い、バケツをすすぎ、必要に応じて掃除機のフィルターや部品を掃除し、汚れたスポンジを交換し、雑巾を適切に乾かします。", "မော်ပုခေါင်းများကို လျှော်ပါ、ပုံးများကို ဆေးကြောပါ、လိုအပ်သလို ဖုန်စုပ်စက်ဇကာများ သို့မဟုတ် အစိတ်အပိုင်းများကို သန့်ရှင်းရေးလုပ်ပါ、ညစ်ပတ်သော ရေမြှုပ်များကို လဲလှယ်ပါ、အဝတ်များကို ခြောက်အောင်ထားပါ။"), 
    t("Weekly + as needed", "毎週チェック＋必要に応じて", "အပတ်စဉ် + လိုအပ်သလို"), 
    t("Dirty cleaning tools spread smell and dirt instead of cleaning properly.", "汚れた掃除用具は、適切に掃除する代わりに臭いや汚れを広げてしまいます。", "ညစ်ပတ်သော သန့်ရှင်းရေးပစ္စည်းများသည် ကောင်းမွန်စွာသန့်ရှင်းပေးမည့်အစား အနံ့ဆိုးများနှင့် ဖုန်မှုန့်များကို ပြန့်နှံ့စေသည်။")),
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
    t("Wipe general surfaces including cabinets, cupboards, TV area, router, shelves, vases, handles, and decorative items. Organise if messy.", "キャビネット、食器棚、テレビ周辺、ルーター、棚、花瓶、取っ手、装飾品などの一般的な表面を拭きます。散らかっている場合は整理します。", "ဗီရိုများ၊ တီဗီဧရိယာ၊ ရောက်တာ、စင်များ、ပန်းအိုးများ、လက်ကိုင်များနှင့် အလှဆင်ပစ္စည်းများ အပါအဝင် ယေဘုယျမျက်နှာပြင်များကို သုတ်ပါ။ ရှုပ်ပွနေပါက စနစ်တကျ ပြန်စီပါ။"), 
    t("Monthly", "毎月", "လစဉ်"), 
    t("Do ad hoc cleaning sooner if dusty, sticky, oily, or after spills.", "ほこり、粘つき、油汚れがある場合、またはこぼした後は、早めに臨時掃除を行ってください。", "ဖုန်ထူခြင်း、စေးကပ်ခြင်း、ဆီပေခြင်း သို့မဟုတ် ဖိတ်စင်ပြီးနောက် လိုအပ်ပါက သန့်ရှင်းရေးကို စောစောလုပ်ပါ။")),
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
];

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
];

function recipe(id, title, ingredients, method, note, photos = []) {
  return { 
    id, 
    icon: "R", 
    title, 
    description: t("Approved topping recipe for Nako.", "ナコ用の承認されたトッピングレシピ。", "Nako အတွက် ခွင့်ပြုထားသော အပေါ်မှတင်ရန် ဟင်းချက်နည်း。"), 
    ingredients: ingredients.map(([name, amount, key]) => ({ key, name, amount })), 
    method, 
    note: photos.length > 0 ? note : recipeNote(note),
    photos
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

// Global Translation Reconciliation Check Function
function checkTranslations() {
  const missing = [];
  const ui = window.nakoData.ui;
  
  // 1. Check UI Keys
  const ignoreList = ["Nako Home Care", "Back", "De'Longhi", "Shopee", "Ninja", "Fujioh", "IKEA", "Dling"];
  for (const key in ui.en) {
    const val = ui.en[key];
    const isIgnored = ignoreList.some(ig => val.includes(ig));
    if (isIgnored) continue;

    if (!ui.jp[key] || ui.jp[key] === val) {
      missing.push({ type: "UI Key (JP)", key: `ui.jp.${key}`, english: val });
    }
    if (!ui.mm[key] || ui.mm[key] === val) {
      missing.push({ type: "UI Key (MM)", key: `ui.mm.${key}`, english: val });
    }
  }

  // 2. Check Database Objects
  const checkObj = (obj, path) => {
    if (!obj || typeof obj !== "object") return;
    if (obj.en !== undefined) {
      const isIgnored = ignoreList.some(ig => obj.en.includes(ig));
      if (!isIgnored) {
        if (obj._missingJp) {
          missing.push({ type: "Content (JP)", key: path, english: obj.en });
        }
        if (obj._missingMm) {
          missing.push({ type: "Content (MM)", key: path, english: obj.en });
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

  return missing;
}

window.nakoData = { 
  langs: ["en", "jp", "mm"], 
  ui, 
  homeSections, 
  foodItems, 
  routineTasks, 
  recipes, 
  cookingRules,
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
