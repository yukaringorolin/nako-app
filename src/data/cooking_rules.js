const cookingRules = [
  t("Cook up to 3 meals a day when needed.", "必要に応じて1日最大3食調理します。", "လိုအပ်ပါက တစ်နေ့လျှင် ၃ နပ်အထိ ချက်ပြုတ်ပါ။"),
  t("Focus on high protein and low fat.", "高タンパク質かつ低脂質を意識してください。", "ပရိုတင်းဓာတ်မြင့်မားပြီး အဆီဓာတ်နည်းပါးခြင်းကို အဓိကထားပါ။"),
  t("Do not use onion, coriander, parsley, or bean sprouts.", "玉ねぎ、パクチー、パセリ、もやしは使用しないでください。", "ကြက်သွန်နီ၊ နံနံပင်၊ ပါစလီ သို့မဟုတ် ပဲပင်ပေါက် လုံးဝမသုံးပါနှင့်။"),
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
