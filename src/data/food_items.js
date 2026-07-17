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
        t("Food Memories 2024 — meals Yukari cooked for Edwin during their first 3–4 months together.", "2024年の食の思い出 — 付き合い始めて最初の3〜4か月に、ゆかりがエドウィンのために作った料理。", "၂၀၂၄ ခုနှစ် အစားအသောက်အမှတ်တရများ — အတူရှိခဲ့တဲ့ ပထမ ၃–၄ လအတွင်း Yukari က Edwin အတွက် ချက်ပေးခဲ့တဲ့ အစားအစာများ။"))
    ]),
];
