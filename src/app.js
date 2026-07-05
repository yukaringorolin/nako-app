const LANG_KEY = "nako-care-language";
const STATE_KEY = "nako-care-state-v1";

const langs = ["en", "jp", "mm"];

const ui = {
  en: {
    appTitle: "Nako Home Care",
    appSubtitle: "Daily home, cooking, and Nako care tasks for the maid team.",
    homeEyebrow: "Maid task app",
    categories: "Categories",
    subcategories: "Subcategories",
    description: "Description",
    checklist: "Checklist",
    notes: "Notes",
    status: "Status",
    memo: "Memo",
    memoPlaceholder: "Add notes, questions, or anything to confirm.",
    photo: "Photo",
    attachPhoto: "Attach photo",
    photoOptional: "Optional photo for confirmation.",
    lastCompleted: "Last completed",
    never: "Not completed yet",
    recipes: "Topping recipes",
    recipeName: "Recipe name",
    ingredients: "Ingredients",
    amount: "Amount",
    method: "How to make",
    shoppingItems: "Shopping items",
    productName: "Product",
    quantity: "Quantity",
    category: "Category",
    shoppingStatus: "Shopping status",
    cookingRules: "Cooking rules",
    noItems: "No sample items yet.",
    back: "Back",
    open: "Open",
    statuses: {
      not_started: "Not started",
      complete: "Complete",
      need_help: "Need help",
    },
    shoppingStatuses: {
      need: "Need to buy",
      cart: "Added to cart",
      bought: "Purchased",
      approval: "Needs approval",
    },
  },
  jp: {
    appTitle: "ナコ ホームケア",
    appSubtitle: "家事・料理・ナコのお世話を毎日確認できます。",
    homeEyebrow: "メイドさん用タスクアプリ",
    categories: "カテゴリー",
    subcategories: "サブカテゴリー",
    description: "説明",
    checklist: "チェックリスト",
    notes: "注意事項",
    status: "ステータス",
    memo: "メモ",
    memoPlaceholder: "確認したいこと、気づいたことを書いてください。",
    photo: "写真",
    attachPhoto: "写真を添付",
    photoOptional: "確認用の写真を任意で添付できます。",
    lastCompleted: "最終完了日",
    never: "まだ完了していません",
    recipes: "トッピングレシピ",
    recipeName: "レシピ名",
    ingredients: "材料",
    amount: "分量",
    method: "作り方",
    shoppingItems: "買い物項目",
    productName: "商品名",
    quantity: "数量",
    category: "カテゴリー",
    shoppingStatus: "買い物ステータス",
    cookingRules: "クッキングのルール",
    noItems: "サンプル項目はまだありません。",
    back: "戻る",
    open: "開く",
    statuses: {
      not_started: "未開始",
      complete: "完了",
      need_help: "助けが必要",
    },
    shoppingStatuses: {
      need: "買う必要あり",
      cart: "カートに追加",
      bought: "購入済み",
      approval: "承認必要",
    },
  },
  mm: {
    appTitle: "နာကို အိမ်စောင့်ရှောက်မှု",
    appSubtitle: "အိမ်မှု၊ ချက်ပြုတ်မှု၊ နာကိုစောင့်ရှောက်မှုကို နေ့စဉ် စစ်ဆေးရန်။",
    homeEyebrow: "အိမ်အကူတာဝန်အက်ပ်",
    categories: "အမျိုးအစားများ",
    subcategories: "ခွဲအမျိုးအစားများ",
    description: "ရှင်းလင်းချက်",
    checklist: "စစ်ဆေးရန်စာရင်း",
    notes: "သတိပြုရန်",
    status: "အခြေအနေ",
    memo: "မှတ်စု",
    memoPlaceholder: "မေးရန်၊ အတည်ပြုရန်၊ သတိထားမိသည်များရေးပါ။",
    photo: "ဓာတ်ပုံ",
    attachPhoto: "ဓာတ်ပုံထည့်ရန်",
    photoOptional: "လိုအပ်ပါက အတည်ပြုရန် ဓာတ်ပုံထည့်နိုင်သည်။",
    lastCompleted: "နောက်ဆုံးပြီးသောနေ့",
    never: "မပြီးသေးပါ",
    recipes: "အပေါ်တင်အစာချက်နည်းများ",
    recipeName: "ချက်နည်းအမည်",
    ingredients: "ပါဝင်ပစ္စည်းများ",
    amount: "ပမာဏ",
    method: "ပြုလုပ်နည်း",
    shoppingItems: "ဝယ်ရန်ပစ္စည်းများ",
    productName: "ပစ္စည်းအမည်",
    quantity: "အရေအတွက်",
    category: "အမျိုးအစား",
    shoppingStatus: "ဝယ်ယူမှုအခြေအနေ",
    cookingRules: "ချက်ပြုတ်စည်းကမ်းများ",
    noItems: "နမူနာပစ္စည်း မရှိသေးပါ။",
    back: "နောက်သို့",
    open: "ဖွင့်ရန်",
    statuses: {
      not_started: "မစတင်သေး",
      complete: "ပြီးပါပြီ",
      need_help: "အကူအညီလို",
    },
    shoppingStatuses: {
      need: "ဝယ်ရန်လို",
      cart: "ကတ်ထဲထည့်ပြီး",
      bought: "ဝယ်ပြီး",
      approval: "အတည်ပြုချက်လို",
    },
  },
};

function t(en, jp, mm) {
  return { en, jp, mm };
}

const cookingRules = [
  t("Cook up to 3 meals a day when needed.", "必要に応じて1日3食作る。", "လိုအပ်ပါက တစ်နေ့ ၃ နပ်အထိ ချက်ပါ။"),
  t("Focus on high protein and low fat.", "高タンパク・低脂質を意識する。", "ပရိုတင်းများပြီး အဆီနည်းစေရန် ဂရုစိုက်ပါ။"),
  t("Do not use onion, cilantro, parsley, or bean sprouts.", "玉ねぎ、パクチー、パセリ、もやしは使わない。", "ကြက်သွန်နီ၊ နံနံပင်၊ ပါစလီ၊ ပဲပင်ပေါက် မသုံးပါနှင့်။"),
  t("Ask before using unfamiliar ingredients.", "慣れていない食材を使う前は確認する。", "မရင်းနှီးသောစား材 မသုံးမီ အတည်ပြုပါ။"),
  t("Ask before changing the menu.", "メニュー変更前は確認する。", "မီနူးမပြောင်းမီ အတည်ပြုပါ။"),
  t("Clean the kitchen after cooking.", "料理後はキッチンを片付ける。", "ချက်ပြီးနောက် မီးဖိုချောင်ကို သန့်ရှင်းပါ။"),
];

const dailyCaution = [
  t("Ask if anything looks unusual.", "いつもと違うことがあれば確認する。", "မူမမှန်ပါက မေးမြန်းအတည်ပြုပါ။"),
  t("Take a photo when confirmation is easier with an image.", "写真で確認した方が分かりやすい場合は添付する。", "ဓာတ်ပုံဖြင့် ပိုရှင်းလျှင် ထည့်ပေးပါ။"),
];

const nakoCaution = [
  t("Use only approved food, tools, and routines for Nako.", "ナコには承認済みの食べ物・道具・手順だけを使う。", "နာကိုအတွက် အတည်ပြုပြီးသော အစာ၊ ပစ္စည်း၊ လုပ်နည်းသာ သုံးပါ။"),
  t("If Nako seems sick, injured, or distressed, ask for help immediately.", "ナコの体調不良・けが・不安そうな様子があればすぐ相談する。", "နာကို နေမကောင်း၊ ဒဏ်ရာ၊ စိတ်မအေး ဖြစ်ပါက ချက်ချင်းအကူအညီတောင်းပါ။"),
];

const cleaningCaution = [
  t("Keep cleaning products away from Nako.", "掃除用品はナコの届かない場所に置く。", "သန့်ရှင်းရေးပစ္စည်းများကို နာကိုမထိနိုင်သောနေရာတွင်ထားပါ။"),
  t("Ventilate rooms when using strong smells.", "においが強いものを使う時は換気する。", "အနံ့ပြင်းသောပစ္စည်းသုံးလျှင် လေဝင်လေထွက်လုပ်ပါ။"),
];

const categories = [
  {
    id: "daily",
    accent: "#f7b7be",
    iconBg: "#fff1f2",
    icon: "✓",
    title: t("Daily Tasks", "毎日のタスク", "နေ့စဉ်တာဝန်များ"),
    description: t("Check the repeating home tasks for today.", "今日やる家事を一覧で確認します。", "ယနေ့လုပ်ရန် အိမ်မှုတာဝန်များကို စစ်ဆေးပါ။"),
    items: [
      basicTask("daily-nako-food", "🍽", t("Nako's meal", "ナコのごはん", "နာကိုအစာ"), t("Prepare Nako's food and confirm her appetite.", "ナコのごはんを用意して食欲を確認します。", "နာကိုအစာပြင်ပြီး စားချင်စိတ်ကို စစ်ဆေးပါ။"), [
        t("Wash and dry the bowl.", "器を洗って乾かす。", "ပန်းကန်ကို ဆေးပြီး ခြောက်အောင်လုပ်ပါ။"),
        t("Serve the planned amount.", "決められた量を入れる。", "သတ်မှတ်ထားသောပမာဏကို ထည့်ပါ။"),
        t("Check how much Nako eats.", "ナコがどれくらい食べたか確認する。", "နာကိုဘယ်လောက်စားသည်ကို စစ်ပါ။"),
      ], nakoCaution),
      basicTask("daily-water", "💧", t("Check Nako's water bottle", "ナコの水ボトル確認", "နာကိုရေဘူးစစ်ဆေး"), t("Make sure clean water is available.", "きれいな水が飲める状態か確認します。", "သန့်ရှင်းသောရေ ရနိုင်ကြောင်းစစ်ပါ။"), [
        t("Refill with fresh water.", "新しい水に入れ替える。", "ရေသစ်ဖြည့်ပါ။"),
        t("Check the bottle tip or bowl for dirt.", "飲み口や器の汚れを確認する。", "ရေသောက်နေရာ ညစ်ပတ်မှုရှိမရှိစစ်ပါ။"),
        t("Confirm there is no leaking.", "水漏れがないか確認する。", "ရေယိုခြင်းမရှိကြောင်းစစ်ပါ။"),
      ], nakoCaution),
      basicTask("daily-toilet", "🧻", t("Check Nako's toilet", "ナコのトイレ確認", "နာကိုအိမ်သာစစ်ဆေး"), t("Check sheets, smell, and cleanliness.", "シート・におい・清潔さを確認します。", "စာရွက်၊ အနံ့၊ သန့်ရှင်းမှုကို စစ်ပါ။"), [
        t("Replace dirty sheets.", "汚れたシートを交換する。", "ညစ်ပတ်သောစာရွက်ကို လဲပါ။"),
        t("Wipe the tray and nearby floor.", "トレーと周りの床を拭く。", "ဗန်းနှင့်အနီးရှိကြမ်းပြင်ကို သုတ်ပါ။"),
        t("Report unusual stool or urine.", "便や尿がいつもと違う時は共有する。", "မူမမှန်သော မစင်/ဆီး ရှိပါက ပြောပါ။"),
      ], nakoCaution),
      basicTask("daily-walk", "🦮", t("Nako's walk", "ナコの散歩", "နာကိုလမ်းလျှောက်"), t("Take Nako out safely and record anything unusual.", "安全に散歩して、気になることを記録します。", "နာကိုကို လုံခြုံစွာလမ်းလျှောက်စေပြီး မူမမှန်ပါက မှတ်ပါ။"), [
        t("Put on leash and harness correctly.", "リードとハーネスを正しく付ける。", "ကြိုးနှင့်ဟာနက်စ်ကို မှန်ကန်စွာတပ်ပါ။"),
        t("Bring water and poop bags.", "水と排泄袋を持つ。", "ရေနှင့်အိတ်များယူပါ။"),
        t("Clean paws after returning.", "帰宅後に足を拭く。", "ပြန်လာပြီးခြေကို သုတ်ပါ။"),
      ], nakoCaution),
      mealTask("daily-breakfast", "🌅", t("Make breakfast", "朝ごはん作り", "မနက်စာချက်"), t("Prepare a simple high-protein breakfast.", "高タンパクを意識して朝ごはんを作ります。", "ပရိုတင်းများသော မနက်စာကို ပြင်ပါ။")),
      mealTask("daily-lunch", "☀", t("Make lunch", "昼ごはん作り", "နေ့လယ်စာချက်"), t("Prepare lunch and keep the kitchen easy to reset.", "昼ごはんを作り、片付けやすく進めます。", "နေ့လယ်စာပြင်ပြီး မီးဖိုချောင်ကို စနစ်တကျထားပါ။")),
      mealTask("daily-dinner", "🌙", t("Make dinner", "夜ごはん作り", "ညစာချက်"), t("Prepare dinner and confirm any menu changes first.", "メニュー変更が必要な時は確認してから夜ごはんを作ります。", "မီနူးပြောင်းရန်လိုပါက အတည်ပြုပြီးမှ ညစာချက်ပါ။")),
      basicTask("daily-kitchen-reset", "🧽", t("Kitchen cleanup after cooking", "料理後のキッチン片付け", "ချက်ပြီး မီးဖိုချောင်ရှင်း"), t("Reset the kitchen after meals.", "料理後にキッチンを元の状態へ戻します。", "ချက်ပြီးနောက် မီးဖိုချောင်ကို မူလအခြေအနေသို့ ပြန်ထားပါ။"), [
        t("Wash pans, tools, and counters.", "鍋・道具・カウンターを洗う。", "အိုး၊ ပစ္စည်း၊ ကောင်တာကို ဆေးပါ။"),
        t("Put ingredients back in the right place.", "食材を正しい場所に戻す。", "စား材များကို မှန်ကန်သောနေရာသို့ ပြန်ထားပါ။"),
        t("Take out food trash if needed.", "必要なら生ゴミを捨てる。", "လိုအပ်ပါက အစားအစာအမှိုက်ကို ပစ်ပါ။"),
      ], cleaningCaution),
      basicTask("daily-floor", "🧹", t("Floor cleaning", "床掃除", "ကြမ်းပြင်သန့်ရှင်းရေး"), t("Keep the main floor clean for Nako and people.", "ナコと人が過ごしやすいよう床をきれいにします。", "နာကိုနှင့်လူများအတွက် ကြမ်းပြင်ကို သန့်ရှင်းပါ။"), [
        t("Pick up visible items first.", "見える物を先に片付ける。", "မြင်သာသောပစ္စည်းများကို အရင်ကောက်ပါ။"),
        t("Vacuum or mop main walking areas.", "よく歩く場所を掃除機またはモップで掃除する。", "အဓိကလမ်းကြောင်းများကို စုပ်စက်/မော့ပ်ဖြင့်သန့်ရှင်းပါ။"),
        t("Check corners for hair or dust.", "角の毛やほこりを確認する。", "ထောင့်များရှိ အမွှေး/ဖုန်ကို စစ်ပါ။"),
      ], cleaningCaution),
      basicTask("daily-laundry", "🧺", t("Laundry", "洗濯", "အဝတ်လျှော်"), t("Wash, dry, fold, and place laundry correctly.", "洗う・乾かす・たたむ・収納まで確認します。", "လျှော်၊ ခြောက်၊ ခေါက်၊ နေရာချပါ။"), [
        t("Sort clothes and towels.", "服とタオルを分ける。", "အဝတ်နှင့်တဘက်များ ခွဲပါ။"),
        t("Use the correct detergent amount.", "洗剤の量を確認する。", "ဆပ်ပြာပမာဏကို မှန်ကန်စွာသုံးပါ။"),
        t("Fold and put away dry laundry.", "乾いた洗濯物をたたんで収納する。", "ခြောက်ပြီးသောအဝတ်ကို ခေါက်ပြီးသိမ်းပါ။"),
      ], cleaningCaution),
      basicTask("daily-trash", "🗑", t("Take out trash", "ゴミ出し", "အမှိုက်ပစ်"), t("Check trash schedule and remove full bags.", "ゴミの日と袋の状態を確認します。", "အမှိုက်ပစ်နေ့နှင့်အိတ်ပြည့်မှုကို စစ်ပါ။"), [
        t("Separate trash correctly.", "分別を確認する。", "အမှိုက်ခွဲခြားမှုကို စစ်ပါ။"),
        t("Tie bags tightly.", "袋をしっかり結ぶ。", "အိတ်ကို ခိုင်ခိုင်ချည်ပါ။"),
        t("Replace bin liners.", "新しい袋をセットする。", "အိတ်အသစ်ထည့်ပါ။"),
      ], cleaningCaution),
      basicTask("daily-mail", "📦", t("Check mail and packages", "郵便物・荷物確認", "စာနှင့်ပါဆယ်စစ်"), t("Check the mailbox and entrance for deliveries.", "ポストと玄関の荷物を確認します。", "စာတိုက်ပုံးနှင့်ဝင်ပေါက်ပါဆယ်များကို စစ်ပါ။"), [
        t("Bring in mail and packages.", "郵便物と荷物を室内に入れる。", "စာနှင့်ပါဆယ်များကို အိမ်ထဲယူပါ။"),
        t("Take a photo of unknown packages.", "不明な荷物は写真を撮る。", "မသိသောပါဆယ်ကို ဓာတ်ပုံရိုက်ပါ။"),
        t("Place items in the agreed area.", "決められた場所に置く。", "သတ်မှတ်ထားသောနေရာတွင်ထားပါ။"),
      ], dailyCaution),
    ],
  },
  {
    id: "care",
    accent: "#92c9ad",
    iconBg: "#e7f6ee",
    icon: "♡",
    title: t("Nako Care", "ナコのケア", "နာကို စောင့်ရှောက်မှု"),
    description: t("Food, walks, cleaning, play, and emergency notes for Nako.", "ナコのごはん・散歩・掃除・遊び・緊急対応を確認します。", "နာကိုအစာ၊ လမ်းလျှောက်၊ သန့်ရှင်းရေး၊ ကစားခြင်း၊ အရေးပေါ်အချက်များ။"),
    items: [
      {
        ...basicTask("care-food", "🍚", t("Nako's meals", "ナコのごはん", "နာကိုအစာ"), t("Prepare Nako's regular food and choose toppings only from approved recipes.", "ナコの通常ごはんと承認済みトッピングを確認します。", "နာကို၏ ပုံမှန်အစာနှင့် အတည်ပြုထားသော အပေါ်တင်အစာကို ပြင်ပါ။"), [
          t("Check the planned meal amount.", "予定のごはん量を確認する。", "သတ်မှတ်ထားသောအစာပမာဏကို စစ်ပါ။"),
          t("Open topping recipes when making a topping.", "トッピングを作る時はレシピを開く。", "အပေါ်တင်အစာလုပ်လျှင် ချက်နည်းကို ဖွင့်ပါ။"),
          t("Record appetite and leftovers.", "食欲と残した量を記録する。", "စားချင်စိတ်နှင့်ကျန်သောပမာဏကို မှတ်ပါ။"),
        ], nakoCaution),
        recipes: ["sasami", "whitefish", "chickenbreast"],
      },
      basicTask("care-walk", "🦮", t("Nako's walk", "ナコの散歩", "နာကိုလမ်းလျှောက်"), t("Walk safely with leash, bags, and water.", "リード・袋・水を持って安全に散歩します。", "ကြိုး၊ အိတ်၊ ရေယူပြီး လုံခြုံစွာလမ်းလျှောက်ပါ။"), [
        t("Check weather and ground temperature.", "天気と地面の熱さを確認する。", "ရာသီဥတုနှင့်မြေပြင်အပူကို စစ်ပါ။"),
        t("Avoid unsafe dogs, bikes, and roads.", "危ない犬・自転車・道路を避ける。", "အန္တရာယ်ရှိသောခွေး၊ စက်ဘီး၊ လမ်းများကိုရှောင်ပါ။"),
        t("Wipe paws after returning.", "帰宅後に足を拭く。", "ပြန်လာပြီး ခြေကိုသုတ်ပါ။"),
      ], nakoCaution),
      basicTask("care-toilet", "🧼", t("Toilet and circle cleaning", "ナコのトイレ・サークル掃除", "အိမ်သာနှင့်ခြံသန့်ရှင်းရေး"), t("Keep Nako's toilet and circle clean and dry.", "トイレとサークルを清潔で乾いた状態にします。", "နာကိုအိမ်သာနှင့်ခြံကို သန့်ရှင်းခြောက်သွေ့စွာထားပါ။"), [
        t("Replace toilet sheets.", "トイレシートを交換する。", "အိမ်သာစာရွက်ကို လဲပါ။"),
        t("Wipe the circle floor.", "サークル床を拭く。", "ခြံကြမ်းပြင်ကို သုတ်ပါ။"),
        t("Check bedding for smell or stains.", "ベッドのにおい・汚れを確認する。", "အိပ်ရာအနံ့/အစွန်းကို စစ်ပါ။"),
      ], nakoCaution),
      basicTask("care-brushing", "🪮", t("Nako brushing", "ナコのブラッシング", "နာကိုအမွှေးဖြီး"), t("Brush gently and check skin condition.", "やさしくブラッシングして皮膚の様子を確認します。", "ညင်သာစွာဖြီးပြီး အရေပြားကို စစ်ပါ။"), [
        t("Use the correct brush.", "正しいブラシを使う。", "မှန်ကန်သောဖြီးကို သုံးပါ။"),
        t("Brush slowly around ears and legs.", "耳や足まわりはゆっくり行う。", "နားနှင့်ခြေတစ်ဝိုက်ကို ဖြည်းဖြည်းဖြီးပါ။"),
        t("Report redness, mats, or pain.", "赤み・毛玉・痛がる様子があれば共有する。", "နီမြန်းခြင်း၊ အမွှေးကပ်ခြင်း၊ နာကျင်ခြင်းရှိပါက ပြောပါ။"),
      ], nakoCaution),
      basicTask("care-play", "🎾", t("Play and training", "ナコの遊び・トレーニング", "ကစားခြင်းနှင့်လေ့ကျင့်ခြင်း"), t("Give Nako safe play and short training time.", "ナコに安全な遊びと短いトレーニング時間を作ります。", "နာကိုကို လုံခြုံသောကစားချိန်နှင့်တိုတောင်းသောလေ့ကျင့်ချိန်ပေးပါ။"), [
        t("Use approved toys only.", "承認済みのおもちゃだけ使う。", "အတည်ပြုပြီးသောကစားစရာသာ သုံးပါ။"),
        t("Keep sessions short and happy.", "短く楽しく行う。", "တိုတိုနှင့်ပျော်ရွှင်စွာလုပ်ပါ။"),
        t("Stop if Nako looks tired or stressed.", "疲れた・嫌そうな時は止める。", "နာကိုပင်ပန်း/စိတ်ဖိစီးပါက ရပ်ပါ။"),
      ], nakoCaution),
      basicTask("care-emergency", "🚑", t("Nako emergency response", "ナコの緊急時対応", "နာကိုအရေးပေါ်တုံ့ပြန်"), t("Steps to follow if Nako seems unwell or unsafe.", "ナコに異変がある時の対応を確認します。", "နာကိုမူမမှန်ပါက လုပ်ဆောင်ရန်အဆင့်များ။"), [
        t("Move Nako to a safe quiet area.", "安全で静かな場所に移動する。", "နာကိုကို လုံခြုံပြီးတိတ်ဆိတ်သောနေရာသို့ရွှေ့ပါ။"),
        t("Take a photo or short note of symptoms.", "症状を写真またはメモで残す。", "လက္ခဏာကို ဓာတ်ပုံ/မှတ်စုဖြင့် မှတ်ပါ။"),
        t("Contact for help immediately.", "すぐに連絡して助けを求める。", "ချက်ချင်း ဆက်သွယ်အကူအညီတောင်းပါ။"),
      ], [
        t("Do not give medicine unless approved.", "承認なしで薬をあげない。", "အတည်ပြုချက်မရှိဘဲ ဆေးမပေးပါနှင့်။"),
        t("Urgent signs: repeated vomiting, collapse, bleeding, breathing trouble.", "緊急サイン：嘔吐の繰り返し、ぐったり、出血、呼吸が苦しそう。", "အရေးပေါ်လက္ခဏာများ- အန်တာထပ်ခါထပ်ခါ၊ လဲကျခြင်း၊ သွေးထွက်ခြင်း၊ အသက်ရှူခက်ခြင်း။"),
      ]),
      basicTask("care-weight", "⚖", t("Nako weight management", "ナコの体重管理", "နာကိုကိုယ်အလေးချိန်စီမံ"), t("Track weight and body condition calmly.", "体重と体型の変化を落ち着いて確認します。", "ကိုယ်အလေးချိန်နှင့်ခန္ဓာကိုယ်အခြေအနေကို မှန်မှန်စစ်ပါ။"), [
        t("Use the same scale when possible.", "できるだけ同じ体重計を使う。", "ဖြစ်နိုင်လျှင် တူညီသောချိန်ခွင်သုံးပါ။"),
        t("Write weight in the memo.", "体重をメモに書く。", "ကိုယ်အလေးချိန်ကို မှတ်စုတွင်ရေးပါ။"),
        t("Report sudden changes.", "急な変化は共有する。", "ရုတ်တရက်ပြောင်းလဲပါက ပြောပါ။"),
      ], nakoCaution),
      basicTask("care-supplies", "🧸", t("Nako supplies check", "ナコ用品チェック", "နာကိုပစ္စည်းစစ်"), t("Check stock and condition of Nako items.", "ナコ用品の在庫と状態を確認します。", "နာကိုပစ္စည်းလက်ကျန်နှင့်အခြေအနေကို စစ်ပါ။"), [
        t("Check food, sheets, wipes, treats, and bags.", "ごはん・シート・ウェットティッシュ・おやつ・袋を確認する。", "အစာ၊ စာရွက်၊ ဝိုင်ပ်၊ အစားအသောက်လက်ဆောင်၊ အိတ်ကိုစစ်ပါ။"),
        t("Add low stock items to shopping.", "少ないものは買うものに追加する。", "လျော့နေသောပစ္စည်းများကို ဝယ်ရန်စာရင်းထဲထည့်ပါ။"),
        t("Take a photo of damaged items.", "壊れたものは写真を撮る。", "ပျက်နေသောပစ္စည်းကို ဓာတ်ပုံရိုက်ပါ။"),
      ], dailyCaution),
    ],
  },
  {
    id: "shopping",
    accent: "#f2c36f",
    iconBg: "#fff6df",
    icon: "🛒",
    title: t("Shopping", "買うもの", "ဝယ်ရန်"),
    description: t("Track what needs to be bought, confirmed, or ordered.", "買うもの・確認するもの・注文するものを管理します。", "ဝယ်ရန်၊ အတည်ပြုရန်၊ အော်ဒါတင်ရန်များကို စီမံပါ။"),
    items: [
      shoppingList("shop-groceries", "🥬", t("Groceries", "食料品", "စား料"), t("Food ingredients for meals and Nako-safe preparation.", "食事とナコ用に必要な食材です。", "အစားအစာနှင့်နာကိုအတွက်လိုအပ်သောစား材များ။"), [
        shopItem("eggs", t("Eggs", "卵", "ကြက်ဥ"), "10", t("Groceries", "食料品", "စား料"), "need"),
        shopItem("chicken-breast", t("Chicken breast", "鶏むね肉", "ကြက်ရင်အုံ"), "2 packs", t("Groceries", "食料品", "စား料"), "need"),
        shopItem("broccoli", t("Broccoli", "ブロッコリー", "ဘရိုကိုလီ"), "1", t("Groceries", "食料品", "စား料"), "cart"),
      ]),
      shoppingList("shop-household", "🧴", t("Household goods", "日用品", "အိမ်သုံးပစ္စည်း"), t("Daily household items and cleaning refills.", "日常的に使う日用品と掃除用品です。", "နေ့စဉ်အိမ်သုံးနှင့်သန့်ရှင်းရေးပစ္စည်းများ။"), [
        shopItem("trash-bags", t("Trash bags", "ゴミ袋", "အမှိုက်အိတ်"), "1 box", t("Household", "日用品", "အိမ်သုံး"), "need"),
        shopItem("laundry-detergent", t("Laundry detergent", "洗濯洗剤", "အဝတ်လျှော်ဆပ်ပြာ"), "1", t("Household", "日用品", "အိမ်သုံး"), "approval"),
        shopItem("tissues", t("Tissues", "ティッシュ", "တစ်ရှူး"), "3 boxes", t("Household", "日用品", "အိမ်သုံး"), "bought"),
      ]),
      shoppingList("shop-nako", "🐾", t("Nako supplies", "ナコ用品", "နာကိုပစ္စည်း"), t("Food, sheets, wipes, and small supplies for Nako.", "ナコのごはん・シート・ケア用品です。", "နာကိုအစာ၊ စာရွက်၊ စောင့်ရှောက်ရေးပစ္စည်းများ။"), [
        shopItem("pee-sheets", t("Pee sheets", "トイレシート", "အိမ်သာစာရွက်"), "1 pack", t("Nako supplies", "ナコ用品", "နာကိုပစ္စည်း"), "need"),
        shopItem("poop-bags", t("Poop bags", "排泄袋", "အိတ်"), "1 roll", t("Nako supplies", "ナコ用品", "နာကိုပစ္စည်း"), "cart"),
        shopItem("dog-wipes", t("Dog wipes", "犬用ウェットティッシュ", "ခွေးဝိုင်ပ်"), "2 packs", t("Nako supplies", "ナコ用品", "နာကိုပစ္စည်း"), "need"),
      ]),
      shoppingList("shop-online", "📱", t("Online orders", "オンライン注文", "အွန်လိုင်းအော်ဒါ"), t("Items to order online instead of buying in store.", "店頭ではなくオンラインで注文するものです。", "ဆိုင်မဟုတ်ဘဲ အွန်လိုင်းမှမှာရန်ပစ္စည်းများ။"), [
        shopItem("water-filter", t("Water filter cartridge", "浄水フィルター", "ရေစစ်ကတ်ထရစ်"), "1", t("Online", "オンライン", "အွန်လိုင်း"), "approval"),
        shopItem("storage-bags", t("Food storage bags", "保存袋", "အစားအစာသိမ်းအိတ်"), "1 set", t("Online", "オンライン", "အွန်လိုင်း"), "need"),
      ]),
      shoppingList("shop-low-stock", "⚠", t("Low stock", "在庫少", "လက်ကျန်နည်း"), t("Items that are running low soon.", "もうすぐなくなりそうなものです。", "မကြာမီကုန်တော့မည့်ပစ္စည်းများ။"), [
        shopItem("rice", t("Rice", "お米", "ဆန်"), "5 kg", t("Groceries", "食料品", "စား料"), "need"),
        shopItem("paper-towels", t("Paper towels", "キッチンペーパー", "မီးဖိုချောင်တစ်ရှူး"), "2 rolls", t("Household", "日用品", "အိမ်သုံး"), "need"),
      ]),
      shoppingList("shop-confirm", "?", t("Check before buying", "確認してから買うもの", "မဝယ်မီအတည်ပြုရန်"), t("Items that need approval before purchase.", "購入前に確認が必要なものです。", "မဝယ်မီ အတည်ပြုရန်လိုသောပစ္စည်းများ။"), [
        shopItem("new-treat", t("New Nako treat", "ナコの新しいおやつ", "နာကိုအစားအသောက်အသစ်"), "1", t("Nako supplies", "ナコ用品", "နာကိုပစ္စည်း"), "approval"),
        shopItem("new-spice", t("New seasoning", "新しい調味料", "ဟင်းခတ်အသစ်"), "1", t("Groceries", "食料品", "စား料"), "approval"),
      ]),
    ],
  },
  {
    id: "cleaning",
    accent: "#9bc4db",
    iconBg: "#eaf6fb",
    icon: "✦",
    title: t("Cleaning", "掃除", "သန့်ရှင်းရေး"),
    description: t("Room, floor, laundry, trash, and deep cleaning routines.", "床・洗濯・部屋・キッチン・月1掃除を確認します。", "ကြမ်းပြင်၊ အဝတ်၊ အခန်း၊ မီးဖိုချောင်၊ လစဉ်သန့်ရှင်းရေး။"),
    items: [
      cleaningTask("clean-mop", "🧹", t("Mop floors", "床のモップがけ", "ကြမ်းပြင်မော့ပ်တိုက်"), t("Mop main floor areas safely.", "よく使う床を安全にモップがけします。", "အဓိကကြမ်းပြင်ကို လုံခြုံစွာမော့ပ်တိုက်ပါ။")),
      cleaningTask("clean-laundry", "🧺", t("Laundry", "洗濯", "အဝတ်လျှော်"), t("Wash, dry, fold, and store laundry.", "洗濯から収納まで行います。", "လျှော်ခြင်းမှသိမ်းခြင်းအထိလုပ်ပါ။")),
      cleaningTask("clean-rooms", "🛋", t("Room cleaning", "部屋の掃除", "အခန်းသန့်ရှင်းရေး"), t("Reset rooms so they feel calm and easy to use.", "部屋を落ち着いて使いやすい状態に戻します。", "အခန်းကို သန့်ရှင်းပြီးအသုံးပြုရလွယ်အောင်ထားပါ။")),
      cleaningTask("clean-kitchen", "🍳", t("Kitchen cleaning", "キッチン掃除", "မီးဖိုချောင်သန့်ရှင်းရေး"), t("Clean counters, sink, stove, and cooking tools.", "カウンター・シンク・コンロ・調理道具を掃除します。", "ကောင်တာ၊ စင့်ခ်၊ မီးဖို၊ ချက်ပြုတ်ပစ္စည်းများကို သန့်ရှင်းပါ။")),
      cleaningTask("clean-bathroom", "🚿", t("Bathroom and toilet", "バスルーム・トイレ掃除", "ရေချိုးခန်းနှင့်အိမ်သာ"), t("Clean wet areas and check supplies.", "水回りを掃除して備品を確認します。", "ရေနေရာများကို သန့်ရှင်းပြီးပစ္စည်းများစစ်ပါ။")),
      cleaningTask("clean-trash", "🗑", t("Trash", "ゴミ出し", "အမှိုက်ပစ်"), t("Separate, tie, and remove trash bags.", "分別・袋結び・ゴミ出しを行います。", "အမှိုက်ခွဲ၊ အိတ်ချည်၊ ပစ်ပါ။")),
      cleaningTask("clean-windows", "🪟", t("Windows and mirrors", "窓・鏡掃除", "ပြတင်းပေါက်နှင့်မှန်"), t("Remove marks from glass and mirrors.", "ガラスと鏡の跡をきれいにします。", "မှန်နှင့်ပြတင်းပေါက်ရှိအစွန်းများဖယ်ပါ။")),
      cleaningTask("clean-fridge", "❄", t("Fridge cleaning", "冷蔵庫掃除", "ရေခဲသေတ္တာသန့်ရှင်းရေး"), t("Check expired items and wipe shelves.", "期限切れと棚の汚れを確認します。", "သက်တမ်းကုန်ပစ္စည်းနှင့်စင်များကို စစ်ပါ။")),
      cleaningTask("clean-sofa", "🧵", t("Sofa and fabrics", "ソファ・布製品", "ဆိုဖာနှင့်အထည်"), t("Refresh sofa, blankets, and fabric items.", "ソファ・ブランケット・布製品を整えます。", "ဆိုဖာ၊ စောင်၊ အထည်များကို သန့်ရှင်းပါ။")),
      cleaningTask("clean-deep", "🧰", t("Monthly deep cleaning", "月1回 / ディープクリーニング", "လစဉ်အထူးသန့်ရှင်းရေး"), t("Handle deeper monthly cleaning tasks.", "月1回のしっかり掃除を行います。", "လစဉ် အနက်ရှိုင်းသန့်ရှင်းရေးလုပ်ပါ။")),
    ],
  },
  {
    id: "cooking",
    accent: "#f19a82",
    iconBg: "#fff0eb",
    icon: "🍳",
    title: t("Cooking", "クッキング", "ချက်ပြုတ်ခြင်း"),
    description: t("Menus, meals, recipes, rules, cleanup, and ingredients.", "献立・食事・ルール・片付け・食材を管理します。", "မီနူး၊ အစားအစာ၊ စည်းကမ်း၊ သန့်ရှင်းရေး၊ စား材များ။"),
    items: [
      cookingTask("cook-today", "📋", t("Today's menu", "今日の献立", "ယနေ့မီနူး"), t("Review the planned meals for today.", "今日の食事予定を確認します。", "ယနေ့စားစရာအစီအစဉ်ကို စစ်ပါ။")),
      cookingTask("cook-breakfast", "🌅", t("Breakfast", "朝ごはん", "မနက်စာ"), t("Prepare breakfast with protein in mind.", "タンパク質を意識して朝食を作ります。", "ပရိုတင်းစဉ်းစားပြီး မနက်စာပြင်ပါ။")),
      cookingTask("cook-lunch", "☀", t("Lunch", "昼ごはん", "နေ့လယ်စာ"), t("Prepare lunch and save leftovers safely.", "昼食を作り、残りは安全に保存します。", "နေ့လယ်စာပြင်ပြီး ကျန်တာကို လုံခြုံစွာသိမ်းပါ။")),
      cookingTask("cook-dinner", "🌙", t("Dinner", "夜ごはん", "ညစာ"), t("Prepare dinner and confirm any changes.", "夜食を作り、変更は事前に確認します。", "ညစာပြင်ပြီးပြောင်းလဲမှုရှိပါက အတည်ပြုပါ။")),
      cookingTask("cook-snack", "🥣", t("Snacks", "軽食", "အဆာပြေ"), t("Prepare light snacks when requested.", "必要な時に軽食を用意します。", "လိုအပ်ပါက အဆာပြေပြင်ပါ။")),
      cookingTask("cook-recipes", "📖", t("Recipes", "レシピ", "ချက်နည်းများ"), t("Use approved recipes and write notes for next time.", "承認済みレシピを使い、次回用メモを残します。", "အတည်ပြုပြီးသောချက်နည်းသုံးပြီး နောက်တစ်ခါအတွက်မှတ်ပါ။")),
      {
        ...cookingTask("cook-rules", "!", t("Meal rules", "食事ルール", "အစားအစာစည်းကမ်း"), t("Check the cooking rules before deciding or changing meals.", "献立を決める・変える前にルールを確認します。", "မီနူးဆုံးဖြတ်/ပြောင်းမီ စည်းကမ်းများစစ်ပါ။")),
        checklist: cookingRules,
        cautions: cookingRules,
      },
      cookingTask("cook-cleanup", "🧽", t("Kitchen cleanup after cooking", "料理後のキッチン片付け", "ချက်ပြီး မီးဖိုချောင်ရှင်း"), t("Clean the kitchen after cooking every time.", "料理後は毎回キッチンを片付けます。", "ချက်ပြီးတိုင်း မီးဖိုချောင်ကို သန့်ရှင်းပါ။")),
      cookingTask("cook-ingredients", "🥦", t("Needed ingredients", "必要な食材", "လိုအပ်သောစား材"), t("Check ingredients before cooking and add missing items to shopping.", "料理前に食材を確認し、不足分を買うものへ追加します。", "ချက်မီစား材စစ်ပြီး မလုံလောက်ပါက ဝယ်ရန်ထဲထည့်ပါ။")),
    ],
  },
];

const recipes = [
  {
    id: "sasami",
    icon: "🍗",
    title: t("Chicken tender topping", "ささみトッピング", "ကြက်သားနု အပေါ်တင်အစာ"),
    description: t("A gentle chicken and vegetable topping for Nako.", "ささみと野菜のやさしいトッピングです。", "နာကိုအတွက် ကြက်သားနှင့်ဟင်းသီးဟင်းရွက်အပေါ်တင်အစာ။"),
    ingredients: [
      ingredient("chicken-tender", t("Chicken tender", "ささみ", "ကြက်သားနု"), "100g"),
      ingredient("pumpkin", t("Pumpkin", "かぼちゃ", "ရွှေဖရုံသီး"), "40g"),
      ingredient("carrot", t("Carrot", "にんじん", "မုန်လာဥနီ"), "40g"),
    ],
    method: [
      t("Boil or steam the chicken tender until fully cooked.", "ささみを中まで火が通るまで茹でる、または蒸す。", "ကြက်သားနုကို အပြည့်အဝကျက်အောင် ပြုတ်/နူးအောင်ပေါင်းပါ။"),
      t("Steam pumpkin and carrot until soft.", "かぼちゃとにんじんを柔らかくなるまで蒸す。", "ရွှေဖရုံသီးနှင့်မုန်လာဥနီကို နူးအောင်ပေါင်းပါ။"),
      t("Cool, cut into small pieces, and mix only the approved amount with food.", "冷まして小さく切り、承認された量だけごはんに混ぜる。", "အေးပြီးသေးသေးလှီးကာ အတည်ပြုပမာဏသာ အစာနှင့်ရောပါ။"),
    ],
    note: t("No seasoning, oil, onion, or garlic.", "味付け・油・玉ねぎ・にんにくは使わない。", "ဟင်းခတ်၊ ဆီ၊ ကြက်သွန်နီ၊ ကြက်သွန်ဖြူ မသုံးပါနှင့်။"),
  },
  {
    id: "whitefish",
    icon: "🐟",
    title: t("White fish topping", "白身魚トッピング", "ငါးဖြူ အပေါ်တင်အစာ"),
    description: t("A light fish topping with sweet potato and zucchini.", "白身魚・さつまいも・ズッキーニの軽いトッピングです。", "ငါးဖြူ၊ ကန်စွန်းဥ၊ ဇူကီနီ ပါသောအပေါ်တင်အစာ။"),
    ingredients: [
      ingredient("whitefish", t("White fish", "白身魚", "ငါးဖြူ"), "100g"),
      ingredient("sweet-potato", t("Sweet potato", "さつまいも", "ကန်စွန်းဥ"), "40g"),
      ingredient("zucchini", t("Zucchini", "ズッキーニ", "ဇူကီနီ"), "40g"),
    ],
    method: [
      t("Steam or boil the white fish and remove all bones carefully.", "白身魚を茹でる、または蒸して、骨を丁寧に取る。", "ငါးဖြူကို ပြုတ်/ပေါင်းပြီး အရိုးအားလုံးကို သေချာဖယ်ပါ။"),
      t("Steam sweet potato and zucchini until soft.", "さつまいもとズッキーニを柔らかくなるまで蒸す。", "ကန်စွန်းဥနှင့်ဇူကီနီကို နူးအောင်ပေါင်းပါ။"),
      t("Cool everything and break into small pieces before serving.", "すべて冷まして小さくほぐしてから出す。", "အားလုံးအေးပြီး သေးသေးခွဲကာပေးပါ။"),
    ],
    note: t("Check carefully for fish bones before serving.", "出す前に魚の骨が残っていないか必ず確認する。", "ပေးမီ ငါးအရိုးကျန်မကျန် သေချာစစ်ပါ။"),
  },
  {
    id: "chickenbreast",
    icon: "🍗",
    title: t("Chicken breast topping", "鶏むねトッピング", "ကြက်ရင်အုံ အပေါ်တင်အစာ"),
    description: t("Lean chicken breast with cabbage and broccoli.", "鶏むね・白菜・ブロッコリーの低脂質トッピングです。", "ကြက်ရင်အုံ၊ ဟင်းနုနွယ်ထုပ်၊ ဘရိုကိုလီ ပါသော အဆီနည်းအစာ။"),
    ingredients: [
      ingredient("chicken-breast", t("Chicken breast", "鶏むね", "ကြက်ရင်အုံ"), "100g"),
      ingredient("napa-cabbage", t("Napa cabbage", "白菜", "ဟင်းနုနွယ်ထုပ်"), "40g"),
      ingredient("broccoli", t("Broccoli", "ブロッコリー", "ဘရိုကိုလီ"), "30g"),
    ],
    method: [
      t("Boil chicken breast until fully cooked and shred finely.", "鶏むねを中まで火が通るまで茹で、細かくほぐす。", "ကြက်ရင်အုံကို ကျက်အောင်ပြုတ်ပြီး သေးသေးခွဲပါ။"),
      t("Steam napa cabbage and broccoli until soft.", "白菜とブロッコリーを柔らかくなるまで蒸す。", "ဟင်းနုနွယ်ထုပ်နှင့်ဘရိုကိုလီကို နူးအောင်ပေါင်းပါ။"),
      t("Cool, chop small, and mix gently with the regular meal.", "冷まして小さく切り、いつものごはんにやさしく混ぜる。", "အေးပြီးသေးသေးလှီးကာ ပုံမှန်အစာနှင့်ညင်သာစွာရောပါ။"),
    ],
    note: t("Use plain cooked ingredients only.", "火を通した食材だけを味付けなしで使う。", "အရသာမထည့်သော ကျက်ပြီးစား材များသာသုံးပါ။"),
  },
];

function basicTask(id, icon, title, description, checklist, cautions = dailyCaution) {
  return {
    id,
    type: "task",
    icon,
    title,
    description,
    checklist,
    cautions,
  };
}

function mealTask(id, icon, title, description) {
  return basicTask(id, icon, title, description, [
    t("Confirm the planned menu.", "予定メニューを確認する。", "အစီအစဉ်မီနူးကို စစ်ပါ။"),
    t("Prepare with high protein and low fat in mind.", "高タンパク・低脂質を意識して作る。", "ပရိုတင်းများပြီး အဆီနည်းစေရန် ပြင်ပါ။"),
    t("Clean tools and counters after cooking.", "料理後に道具とカウンターを片付ける。", "ချက်ပြီးနောက် ပစ္စည်းနှင့်ကောင်တာကို သန့်ရှင်းပါ။"),
  ], cookingRules);
}

function cleaningTask(id, icon, title, description) {
  return basicTask(id, icon, title, description, [
    t("Prepare the right tools.", "必要な道具を用意する。", "လိုအပ်သောပစ္စည်းများပြင်ပါ။"),
    t("Clean the main visible area first.", "まず見える場所をきれいにする。", "ပထမမြင်သာသောနေရာကို သန့်ရှင်းပါ။"),
    t("Put supplies back after finishing.", "終わったら道具を戻す。", "ပြီးလျှင်ပစ္စည်းများကို ပြန်ထားပါ။"),
  ], cleaningCaution);
}

function cookingTask(id, icon, title, description) {
  return basicTask(id, icon, title, description, [
    t("Check the plan and ingredients.", "予定と食材を確認する。", "အစီအစဉ်နှင့်စား材များကို စစ်ပါ။"),
    t("Ask before changing the menu.", "メニュー変更前は確認する。", "မီနူးမပြောင်းမီ အတည်ပြုပါ။"),
    t("Clean up after cooking.", "料理後は片付ける。", "ချက်ပြီးနောက် သန့်ရှင်းပါ။"),
  ], cookingRules);
}

function shoppingList(id, icon, title, description, shoppingItems) {
  return {
    id,
    type: "shoppingList",
    icon,
    title,
    description,
    checklist: [
      t("Check current stock first.", "まず在庫を確認する。", "လက်ရှိလက်ကျန်ကို အရင်စစ်ပါ။"),
      t("Confirm items marked for approval.", "承認必要のものは確認する。", "အတည်ပြုချက်လိုသောပစ္စည်းများကို စစ်ပါ။"),
      t("Update status after purchase.", "購入後にステータスを更新する。", "ဝယ်ပြီးလျှင် အခြေအနေကို ပြောင်းပါ။"),
    ],
    cautions: [
      t("Do not buy new ingredients for Nako without approval.", "承認なしでナコ用の新しい食材を買わない。", "အတည်ပြုချက်မရှိဘဲ နာကိုအတွက်စား材အသစ် မဝယ်ပါနှင့်။"),
      t("Take a photo if the product choice is unclear.", "商品が分かりにくい時は写真で確認する。", "ပစ္စည်းရွေးချယ်ရန်မရှင်းပါက ဓာတ်ပုံဖြင့်မေးပါ။"),
    ],
    shoppingItems,
  };
}

function shopItem(id, product, quantity, category, status) {
  return { id, product, quantity, category, status };
}

function ingredient(key, name, amount) {
  return { key, name, amount };
}

let currentLang = langs.includes(localStorage.getItem(LANG_KEY))
  ? localStorage.getItem(LANG_KEY)
  : "en";

let appState = loadState();
const app = document.querySelector("#app");

window.addEventListener("hashchange", render);
document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("input", handleInput);

render();

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STATE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(appState));
}

function translate(value) {
  if (!value || typeof value !== "object") return value || "";
  return value[currentLang] || value.en || "";
}

function label(key) {
  return ui[currentLang][key];
}

function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "category" && parts[1]) return { view: "category", categoryId: parts[1] };
  if (parts[0] === "detail" && parts[1] && parts[2]) {
    return { view: "detail", categoryId: parts[1], itemId: parts[2] };
  }
  if (parts[0] === "recipe" && parts[1]) return { view: "recipe", recipeId: parts[1] };
  return { view: "home" };
}

function go(path) {
  if (location.hash === path) {
    render();
    return;
  }
  location.hash = path;
}

function render() {
  document.documentElement.lang = currentLang === "jp" ? "ja" : currentLang === "mm" ? "my" : "en";
  const route = parseRoute();
  if (route.view === "category") return renderCategory(route.categoryId);
  if (route.view === "detail") return renderDetail(route.categoryId, route.itemId);
  if (route.view === "recipe") return renderRecipe(route.recipeId);
  return renderHome();
}

function renderShell(title, content, showBack = false) {
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <button class="icon-button ${showBack ? "" : "is-hidden"}" data-back title="${escapeAttr(label("back"))}" aria-label="${escapeAttr(label("back"))}">‹</button>
        <div class="brand-mini">
          <img src="assets/nako-logo.png" alt="Nako" />
          <span class="screen-title">${escapeHtml(title)}</span>
        </div>
        <div class="language-toggle" aria-label="Language">
          ${langs.map((language) => `
            <button data-lang="${language}" aria-pressed="${language === currentLang}">
              ${language.toUpperCase()}
            </button>
          `).join("")}
        </div>
      </header>
      <div class="content">${content}</div>
    </div>
  `;
}

function renderHome() {
  const content = `
    <section class="home-hero">
      <img src="assets/nako-logo.png" alt="Nako" />
      <div>
        <p class="eyebrow">${escapeHtml(label("homeEyebrow"))}</p>
        <h1>${escapeHtml(label("appTitle"))}</h1>
        <p class="lead">${escapeHtml(label("appSubtitle"))}</p>
      </div>
    </section>
    <p class="section-label">${escapeHtml(label("categories"))}</p>
    <section class="card-list">
      ${categories.map(renderCategoryCard).join("")}
    </section>
  `;
  renderShell(label("appTitle"), content, false);
}

function renderCategory(categoryId) {
  const category = findCategory(categoryId);
  if (!category) return renderHome();
  const content = `
    <section class="detail-head" style="--icon-bg: ${category.iconBg}">
      <div class="large-icon">${escapeHtml(category.icon)}</div>
      <div>
        <p class="eyebrow">${escapeHtml(label("subcategories"))}</p>
        <h1>${escapeHtml(translate(category.title))}</h1>
        <p class="lead">${escapeHtml(translate(category.description))}</p>
      </div>
    </section>
    ${category.id === "cooking" ? renderCookingRulesPanel() : ""}
    <section class="card-list">
      ${category.items.map((item) => renderItemCard(category, item)).join("")}
    </section>
  `;
  renderShell(translate(category.title), content, true);
}

function renderDetail(categoryId, itemId) {
  const category = findCategory(categoryId);
  const item = findItem(categoryId, itemId);
  if (!category || !item) return renderHome();
  const state = getTaskState(item.id);
  const content = `
    <section class="detail-head" style="--icon-bg: ${category.iconBg}">
      <div class="large-icon">${escapeHtml(item.icon)}</div>
      <div>
        <p class="eyebrow">${escapeHtml(translate(category.title))}</p>
        <h1>${escapeHtml(translate(item.title))}</h1>
        <p class="lead">${escapeHtml(translate(item.description))}</p>
      </div>
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("description"))}</h2>
      <p>${escapeHtml(translate(item.description))}</p>
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("checklist"))}</h2>
      ${renderChecklist(item, state)}
    </section>
    <section class="panel soft">
      <h2>${escapeHtml(label("notes"))}</h2>
      ${renderNotes(item.cautions)}
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("status"))}</h2>
      ${renderStatusButtons(item.id, state.status)}
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("memo"))}</h2>
      <textarea class="memo-field" data-task-memo="${escapeAttr(item.id)}" placeholder="${escapeAttr(label("memoPlaceholder"))}">${escapeHtml(state.memo || "")}</textarea>
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("photo"))}</h2>
      <p>${escapeHtml(label("photoOptional"))}</p>
      ${renderPhotoControl("task", item.id, state.photo)}
    </section>
    <section class="panel">
      <div class="last-date">
        <span>${escapeHtml(label("lastCompleted"))}</span>
        <strong>${escapeHtml(state.lastCompleted || label("never"))}</strong>
      </div>
    </section>
    ${item.recipes ? renderRecipeSection(item.recipes) : ""}
    ${item.shoppingItems ? renderShoppingSection(item.shoppingItems) : ""}
  `;
  renderShell(translate(item.title), content, true);
}

function renderRecipe(recipeId) {
  const recipe = recipes.find((entry) => entry.id === recipeId);
  if (!recipe) return renderHome();
  const state = getRecipeState(recipe.id);
  const content = `
    <section class="recipe-head">
      <div class="large-icon">${escapeHtml(recipe.icon)}</div>
      <div>
        <p class="eyebrow">${escapeHtml(label("recipes"))}</p>
        <h1>${escapeHtml(translate(recipe.title))}</h1>
        <p class="lead">${escapeHtml(translate(recipe.description))}</p>
      </div>
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("recipeName"))}</h2>
      <p>${escapeHtml(translate(recipe.title))}</p>
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("ingredients"))}</h2>
      <ul class="ingredient-list">
        ${recipe.ingredients.map((item) => `
          <li class="ingredient-row">
            <img src="${ingredientImage(item.key)}" alt="${escapeAttr(translate(item.name))}" />
            <span class="ingredient-name">${escapeHtml(translate(item.name))}</span>
            <span class="amount">${escapeHtml(item.amount)}</span>
          </li>
        `).join("")}
      </ul>
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("method"))}</h2>
      <ol class="method-list">
        ${recipe.method.map((step, index) => `
          <li><span>${index + 1}.</span><span>${escapeHtml(translate(step))}</span></li>
        `).join("")}
      </ol>
    </section>
    <section class="panel soft">
      <h2>${escapeHtml(label("notes"))}</h2>
      <p>${escapeHtml(translate(recipe.note))}</p>
    </section>
    <section class="panel">
      <h2>${escapeHtml(label("memo"))}</h2>
      <textarea class="memo-field" data-recipe-memo="${escapeAttr(recipe.id)}" placeholder="${escapeAttr(label("memoPlaceholder"))}">${escapeHtml(state.memo || "")}</textarea>
    </section>
  `;
  renderShell(translate(recipe.title), content, true);
}

function renderCategoryCard(category) {
  return `
    <button class="category-card" data-category="${escapeAttr(category.id)}" style="--accent: ${category.accent}; --icon-bg: ${category.iconBg}" aria-label="${escapeAttr(translate(category.title))}">
      <span class="card-icon">${escapeHtml(category.icon)}</span>
      <span class="card-copy">
        <span class="card-title">${escapeHtml(translate(category.title))}</span>
        <span class="card-description">${escapeHtml(translate(category.description))}</span>
      </span>
      <span class="chevron">›</span>
    </button>
  `;
}

function renderItemCard(category, item) {
  const taskState = getTaskState(item.id);
  const shoppingCount = item.shoppingItems ? item.shoppingItems.length : 0;
  const meta = item.shoppingItems
    ? `<span class="badge">${shoppingCount} ${escapeHtml(label("shoppingItems"))}</span>`
    : `<span class="badge ${taskState.status === "complete" ? "complete" : taskState.status === "need_help" ? "need_help" : ""}">${escapeHtml(ui[currentLang].statuses[taskState.status])}</span>`;
  return `
    <button class="item-card" data-detail-category="${escapeAttr(category.id)}" data-detail-item="${escapeAttr(item.id)}" style="--accent: ${category.accent}; --icon-bg: ${category.iconBg}" aria-label="${escapeAttr(translate(item.title))}">
      <span class="card-icon">${escapeHtml(item.icon)}</span>
      <span class="card-copy">
        <span class="card-title">${escapeHtml(translate(item.title))}</span>
        <span class="card-description">${escapeHtml(translate(item.description))}</span>
        <span class="card-meta">${meta}</span>
      </span>
      <span class="chevron">›</span>
    </button>
  `;
}

function renderChecklist(item, state) {
  return `
    <div class="checklist">
      ${item.checklist.map((entry, index) => {
        const checked = state.checklist?.[index] ? "checked" : "";
        return `
          <label class="check-row">
            <input type="checkbox" data-check-task="${escapeAttr(item.id)}" data-check-index="${index}" ${checked} />
            <span>${escapeHtml(translate(entry))}</span>
          </label>
        `;
      }).join("")}
    </div>
  `;
}

function renderNotes(notes = []) {
  if (!notes.length) return `<p>${escapeHtml(label("noItems"))}</p>`;
  return `
    <ul class="note-list">
      ${notes.map((note) => `<li><span>•</span><span>${escapeHtml(translate(note))}</span></li>`).join("")}
    </ul>
  `;
}

function renderStatusButtons(taskId, activeStatus) {
  return `
    <div class="status-group" role="group" aria-label="${escapeAttr(label("status"))}">
      ${Object.entries(ui[currentLang].statuses).map(([status, text]) => `
        <button class="status-button" data-task-status="${escapeAttr(taskId)}" data-status-value="${status}" aria-pressed="${status === activeStatus}">
          ${escapeHtml(text)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderPhotoControl(kind, id, photo) {
  const preview = photo ? `<img class="photo-preview" src="${photo}" alt="${escapeAttr(label("photo"))}" />` : "";
  return `
    <label class="photo-button">
      <span>📎</span>
      <span>${escapeHtml(label("attachPhoto"))}</span>
      <input class="photo-input" type="file" accept="image/*" capture="environment" data-photo-kind="${escapeAttr(kind)}" data-photo-id="${escapeAttr(id)}" />
    </label>
    ${preview}
  `;
}

function renderRecipeSection(recipeIds) {
  return `
    <section class="panel">
      <h2>${escapeHtml(label("recipes"))}</h2>
      <div class="recipe-list">
        ${recipeIds.map((recipeId) => {
          const recipe = recipes.find((entry) => entry.id === recipeId);
          if (!recipe) return "";
          return `
            <button class="recipe-card" data-recipe="${escapeAttr(recipe.id)}">
              <span class="card-icon">${escapeHtml(recipe.icon)}</span>
              <span class="card-copy">
                <span class="card-title">${escapeHtml(translate(recipe.title))}</span>
                <span class="card-description">${escapeHtml(translate(recipe.description))}</span>
              </span>
              <span class="chevron">›</span>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderShoppingSection(items = []) {
  if (!items.length) return "";
  return `
    <section class="panel">
      <h2>${escapeHtml(label("shoppingItems"))}</h2>
      <div class="shopping-list">
        ${items.map(renderShoppingItem).join("")}
      </div>
    </section>
  `;
}

function renderShoppingItem(item) {
  const state = getShoppingState(item.id, item.status);
  return `
    <article class="shopping-card">
      <h3>${escapeHtml(translate(item.product))}</h3>
      <div class="shopping-grid">
        <label class="field-label">
          ${escapeHtml(label("quantity"))}
          <span class="field-value">${escapeHtml(item.quantity)}</span>
        </label>
        <label class="field-label">
          ${escapeHtml(label("category"))}
          <span class="field-value">${escapeHtml(translate(item.category))}</span>
        </label>
      </div>
      <label class="field-label">
        ${escapeHtml(label("shoppingStatus"))}
        <select class="shopping-status" data-shopping-status="${escapeAttr(item.id)}">
          ${Object.entries(ui[currentLang].shoppingStatuses).map(([value, text]) => `
            <option value="${value}" ${state.status === value ? "selected" : ""}>${escapeHtml(text)}</option>
          `).join("")}
        </select>
      </label>
      <label class="field-label">
        ${escapeHtml(label("memo"))}
        <textarea class="shopping-memo" data-shopping-memo="${escapeAttr(item.id)}" placeholder="${escapeAttr(label("memoPlaceholder"))}">${escapeHtml(state.memo || "")}</textarea>
      </label>
      ${renderPhotoControl("shopping", item.id, state.photo)}
    </article>
  `;
}

function renderCookingRulesPanel() {
  return `
    <section class="rule-strip">
      <h2>${escapeHtml(label("cookingRules"))}</h2>
      <ul>
        ${cookingRules.map((rule) => `<li>${escapeHtml(translate(rule))}</li>`).join("")}
      </ul>
    </section>
  `;
}

function handleClick(event) {
  const back = event.target.closest("[data-back]");
  if (back) {
    if (history.length > 1) history.back();
    else go("");
    return;
  }

  const langButton = event.target.closest("[data-lang]");
  if (langButton) {
    currentLang = langButton.dataset.lang;
    localStorage.setItem(LANG_KEY, currentLang);
    render();
    return;
  }

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    go(`#category/${categoryButton.dataset.category}`);
    return;
  }

  const detailButton = event.target.closest("[data-detail-category]");
  if (detailButton) {
    go(`#detail/${detailButton.dataset.detailCategory}/${detailButton.dataset.detailItem}`);
    return;
  }

  const recipeButton = event.target.closest("[data-recipe]");
  if (recipeButton) {
    go(`#recipe/${recipeButton.dataset.recipe}`);
    return;
  }

  const statusButton = event.target.closest("[data-task-status]");
  if (statusButton) {
    const state = getTaskState(statusButton.dataset.taskStatus);
    state.status = statusButton.dataset.statusValue;
    if (state.status === "complete") state.lastCompleted = todayString();
    saveState();
    render();
  }
}

function handleChange(event) {
  const checkbox = event.target.closest("[data-check-task]");
  if (checkbox) {
    const state = getTaskState(checkbox.dataset.checkTask);
    state.checklist[checkbox.dataset.checkIndex] = checkbox.checked;
    saveState();
    return;
  }

  const shoppingStatus = event.target.closest("[data-shopping-status]");
  if (shoppingStatus) {
    const state = getShoppingState(shoppingStatus.dataset.shoppingStatus);
    state.status = shoppingStatus.value;
    saveState();
    return;
  }

  const photoInput = event.target.closest("[data-photo-kind]");
  if (photoInput && photoInput.files?.[0]) {
    const reader = new FileReader();
    const kind = photoInput.dataset.photoKind;
    const id = photoInput.dataset.photoId;
    reader.onload = () => {
      if (kind === "shopping") getShoppingState(id).photo = reader.result;
      else getTaskState(id).photo = reader.result;
      saveState();
      render();
    };
    reader.readAsDataURL(photoInput.files[0]);
  }
}

function handleInput(event) {
  const taskMemo = event.target.closest("[data-task-memo]");
  if (taskMemo) {
    getTaskState(taskMemo.dataset.taskMemo).memo = taskMemo.value;
    saveState();
    return;
  }

  const recipeMemo = event.target.closest("[data-recipe-memo]");
  if (recipeMemo) {
    getRecipeState(recipeMemo.dataset.recipeMemo).memo = recipeMemo.value;
    saveState();
    return;
  }

  const shoppingMemo = event.target.closest("[data-shopping-memo]");
  if (shoppingMemo) {
    getShoppingState(shoppingMemo.dataset.shoppingMemo).memo = shoppingMemo.value;
    saveState();
  }
}

function findCategory(categoryId) {
  return categories.find((category) => category.id === categoryId);
}

function findItem(categoryId, itemId) {
  return findCategory(categoryId)?.items.find((item) => item.id === itemId);
}

function getTaskState(taskId) {
  appState.tasks ||= {};
  appState.tasks[taskId] ||= {
    status: "not_started",
    checklist: {},
    memo: "",
    photo: "",
    lastCompleted: "",
  };
  appState.tasks[taskId].checklist ||= {};
  appState.tasks[taskId].status ||= "not_started";
  return appState.tasks[taskId];
}

function getRecipeState(recipeId) {
  appState.recipes ||= {};
  appState.recipes[recipeId] ||= { memo: "" };
  return appState.recipes[recipeId];
}

function getShoppingState(itemId, defaultStatus = "need") {
  appState.shopping ||= {};
  appState.shopping[itemId] ||= {
    status: defaultStatus,
    memo: "",
    photo: "",
  };
  appState.shopping[itemId].status ||= defaultStatus;
  return appState.shopping[itemId];
}

function todayString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ingredientImage(key) {
  const visuals = {
    "chicken-tender": ["🍗", "#f7d9c4"],
    pumpkin: ["🎃", "#ffd998"],
    carrot: ["🥕", "#ffd1a8"],
    whitefish: ["🐟", "#d8edf7"],
    "sweet-potato": ["🍠", "#f1d0e4"],
    zucchini: ["🥒", "#d7edce"],
    "chicken-breast": ["🍗", "#f4d9d2"],
    "napa-cabbage": ["🥬", "#dff2cf"],
    broccoli: ["🥦", "#d7efd9"],
  };
  const [emoji, color] = visuals[key] || ["●", "#edf1ee"];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="16" fill="${color}" />
      <circle cx="70" cy="22" r="20" fill="#ffffff" opacity=".38" />
      <text x="48" y="60" text-anchor="middle" font-size="42">${emoji}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
