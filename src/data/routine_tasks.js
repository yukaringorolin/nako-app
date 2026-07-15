const routineTasks = [
  routine("helper-diary-feedback", "daily", 200, "D",
    t("Diary & Feedback", "日記・フィードバック", "နေ့စဉ်မှတ်တမ်းနှင့် အကြံပြုချက်"),
    t("Write your thoughts, feelings, questions, or worries. The app saves them and opens a WhatsApp notice.", "考え、気持ち、質問、心配なことを書きます。アプリが保存し、WhatsApp通知を開きます。", "အတွေး၊ ခံစားချက်၊ မေးခွန်း သို့မဟုတ် စိုးရိမ်တာကို ရေးပါ။ App က သိမ်းပြီး WhatsApp အသိပေးချက်ဖွင့်ပေးမည်။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    t("Use this as a personal diary space when speaking is difficult or unclear. Write freely first, then submit to save the entry.", "話すことが難しい、または伝わりにくいときの、個人の日記スペースとして使ってください。まず自由に書き、送信すると記録が保存されます。", "စကားပြောရန်ခက်ခဲသည့်အခါ သို့မဟုတ် မရှင်းလင်းသည့်အခါ ကိုယ်ပိုင်နေ့စဉ်မှတ်တမ်းနေရာအဖြစ် အသုံးပြုပါ။ အရင်ဆုံးလွတ်လပ်စွာရေးပြီး ပို့ပါ၊ ထို့နောက် မှတ်တမ်းကို သိမ်းထားပါမည်။")),
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
    t("Keep milk, eggs, bread, Japanese rice, mushrooms, tofu, frozen sliced pork, tomatoes, and bananas in stock.", "牛乳、卵、パン、日本米、きのこ、豆腐、冷凍豚肉スライス、トマト、バナナを常備します。", "နွားနို့၊ ကြက်ဥ၊ ပေါင်မုန့်၊ ဂျပန်ဆန်၊ မှို၊ tofu၊ အေးခဲဝက်သားပါးပါး၊ ခရမ်းချဉ်သီးနှင့် ငှက်ပျောသီးကို အမြဲထားပါ။"),
    t("Daily check / restock as needed", "毎日確認／必要に応じて補充", "နေ့စဉ်စစ်ဆေး / လိုအပ်သလို ပြန်ဖြည့်"),
    [
      t("Add items to the shopping list before they run out.", "なくなる前に買い物リストへ追加してください。", "ပစ္စည်းမကုန်မီ shopping list ထဲထည့်ပါ။"),
      t("Check expiry dates. Keep frozen sliced pork in the freezer.", "賞味期限を確認し、冷凍豚肉スライスは冷凍庫で保管してください。", "သက်တမ်းကုန်ရက်ကို စစ်ပါ။ အေးခဲဝက်သားပါးပါးကို freezer ထဲတွင် သိမ်းပါ။")
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
    t("Strictly NO onions, NO coriander, NO parsley, NO beansprouts. Do not eat or keep food or snacks in bedrooms; use only the kitchen, dining, or living areas.", "玉ねぎ、パクチー、パセリ、もやしは絶対に入れない。寝室では食べ物やお菓子を食べたり保管したりせず、キッチン、ダイニング、リビングだけで扱ってください。", "ကြက်သွန်နီ၊ နံနံပင်၊ parsley နှင့် ပဲပင်ပေါက်ကို လုံးဝမထည့်ပါနှင့်။ အိပ်ခန်းများတွင် အစားအစာ သို့မဟုတ် မုန့်များကို မစား၊ မထားပါနှင့်။ မီးဖိုချောင်၊ dining သို့မဟုတ် living area တွင်သာ စား/ထားပါ။"),
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
  routine("clean-up-cooking-appliances", "daily", 20, "K", 
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
    t("3 meals daily — Breakfast 7:30-8:00 / Lunch 13:00-13:30 / Dinner 19:00-19:30", "1日3食 — 朝食7:30〜8:00／昼食13:00〜13:30／夕食19:00〜19:30", "တစ်နေ့ ၃ နပ် — မနက်စာ 7:30-8:00 / နေ့လယ်စာ 13:00-13:30 / ညစာ 19:00-19:30"),
    [
      t("Each morning, weigh 60 g of Royal Canin kibble for the full day.", "毎朝、1日分のRoyal Canin 60 gを量ってください。", "မနက်တိုင်း တစ်နေ့စာ Royal Canin ၆၀ g ကို ချိန်ပါ။"),
      t("Divide the kibble into 3 portions of about 20 g each.", "キブルを約20 gずつ3回分に分けてください。", "kibble ကို ၂၀ g ခန့်စီ ၃ ပုံခွဲပါ။"),
      t("Add exactly 1 chicken-and-vegetable topping cube to every meal.", "毎食、チキンと野菜のトッピングキューブを必ず1個加えてください。", "တစ်နပ်တိုင်း ကြက်သားနှင့် ဟင်းသီးဟင်းရွက် topping cube ၁ တုံးတိတိ ထည့်ပါ။"),
      t("After each meal, give water from the bottle and wipe Nako's wet mouth. Wash and refill the bottle daily.", "毎食後、ボトルから水を飲ませ、濡れた口元を拭いてください。ボトルは毎日洗って補充します。", "စားပြီးတိုင်း ရေဘူးမှ ရေတိုက်ပြီး Nako ၏ စိုနေသော ပါးစပ်ကို သုတ်ပါ။ ရေဘူးကို နေ့စဉ်ဆေးပြီး ရေပြန်ဖြည့်ပါ။"),
      t("The kibble amount may change as Nako grows. Follow the latest instruction and do not change it yourself.", "成長によりキブル量が変わる場合があります。最新の指示に従い、自分で量を変えないでください。", "Nako ကြီးလာသည့်အခါ kibble ပမာဏ ပြောင်းနိုင်သည်။ နောက်ဆုံးညွှန်ကြားချက်ကို လိုက်နာပြီး ကိုယ်တိုင် မပြောင်းပါနှင့်။"),
      t("Watch Nako while she eats. Remove the bowl when she finishes. She may flip it or put her paws inside.", "Nakoが食べている間は見守ります。食べ終わったらボウルを片付けます。ひっくり返したり、足を入れたりすることがあります。", "Nako စားနေချိန် စောင့်ကြည့်ပါ။ စားပြီးရင် ခွက်ကိုယူပါ။ ခွက်မှောက်တာ သို့မဟုတ် ခြေထောက်ထည့်တာ လုပ်နိုင်သည်။"),
      t("Give water often from the manual bottle. The pen nozzle is too slow. Do not leave a water bowl in the pen.", "手動ボトルでこまめに水を与えます。サークルの給水器は遅すぎます。サークル内に水皿を置きません。", "လက်ဆွဲရေဘူးနဲ့ မကြာခဏ ရေတိုက်ပါ။ ခြံကရေပိုက်ခေါင်း နှေးလွန်းသည်။ ခြံထဲ ရေခွက်မထားပါနဲ့။")
    ],
    [
      photo("assets/routines/nako-feeding-spillage.jpg",
        t("Nako standing in her cage next to spilt food on the floor", "床にこぼれたエサの横のケージに立つナコ", "ကြမ်းပြင်ပေါ်တွင် ဖိတ်ကျနေသော အစားအစာဘေးရှိ ခြံထဲတွင်ရပ်နေသော နာကို"),
        t("Only leave food out for a short while and watch when Nako eats. When she gets full or is done eating, she will start playing with the bowl and try to flip it, which will cause spillage and dirty the cage. She will also try to stick her paw into the bowl and end up dirtying the cage.", "エサは短い時間だけ出し、ナコが食べている間は様子を見てください。お腹がいっぱいになるか食べ終わると、ボウルで遊び始めてひっくり返そうとし、エサがこぼれてケージが汚れてしまいます。また、ボウルに足を突っ込んでケージを汚してしまうこともあります。", "ခွေးစာကို အချိန်အနည်းငယ်သာ ချထားပေးပြီး နာကို စားနေချိန်တွင် စောင့်ကြည့်ပါ။ သူမ ဗိုက်ပြည့်သွားလျှင် သို့မဟုတ် စားပြီးသွားလျှင် ခွက်ကို ကစားပြီး မှောက်ရန် ကြိုးစားလိမ့်မည်၊ ၎င်းသည် ဖိတ်စင်ပြီး ခြံကို ညစ်ပတ်စေလိမ့်မည်။ သူမသည် ခွက်ထဲသို့ ခြေထောက်ထည့်ရန် ကြိုးစားပြီး ခြံကို ညစ်ပတ်စေလိမ့်မည်။")),
      photo("assets/routines/nako-meal-prep-bowl.jpg",
        t("Nako's meal bowl with kibble and chicken mixture", "キブルとチキンが混ざったナコのエサ皿", "kibbles နှင့် ကြက်သားရောထားသော နာကို၏ အစာခွက်"),
        t("Use 1 measured Royal Canin portion and exactly 1 chicken-and-vegetable topping cube for each meal.", "毎食、量ったRoyal Canin 1回分とチキンと野菜のトッピングキューブ1個を使います。", "တစ်နပ်စီအတွက် ချိန်ထားသော Royal Canin ၁ ပုံနှင့် ကြက်သားနှင့် ဟင်းသီးဟင်းရွက် topping cube ၁ တုံးတိတိ သုံးပါ။")),
      photo("assets/routines/nako-manual-water-bottle.jpg",
        t("Offering water from the manual squeeze travel bottle", "手動のスクイーズボトルから水を飲ませる様子", "လက်ဆွဲရေဘူးဖြင့် ရေတိုက်ကျွေးခြင်း"),
        t("Squeeze the manual water bottle to let her drink regularly, as the pen's nozzle flows too slowly.", "サークルの給水器は水の出が遅いため、手動ボトルを少し押して定期的に水を飲ませてください。", "ခြံ၏ ရေပိုက်ခေါင်းသည် ရေစီးနှေးလွန်းသဖြင့် လက်ဆွဲရေဘူးကို ညှစ်၍ ပုံမှန်ရေတိုက်ပေးပါ။"))
    ]),
  

  routine("nako-potty-pen", "daily", 40, "N", 
    t("Nako - Potty & Pen", "ナコ - トイレとケージ", "Nako - အပေါ့အလေးသွားရာနေရာနှင့် ခြံ"), 
    t("Pick up poop immediately, change soaked pee pads, clean the tray daily, and wash towels or wipe toys regularly.", "ウンチはすぐに拾い、濡れたおしっこシートを交換し、トレイを毎日掃除し、タオルを洗うか、おもちゃを定期的に拭きます。", "ချေးများကို ချက်ချင်းကောက်ပါ၊ စိုစွတ်သော ဆီးခံပြားများကို လဲလှယ်ပါ၊ လင်ပန်းကို နေ့စဉ်ဆေးကြောပါ၊ တဘက်များကို လျှော်ပါ သို့မဟုတ် ကစားစရာများကို ပုံမှန်သုတ်ပါ။"),
    t("Throughout day", "一日中随時", "တစ်နေ့တာလုံး"), 
    t("Clean accidents quickly and keep the pen hygienic.", "排泄物の失敗は素早く掃除し、ケージ内を衛生的に保ちます。", "မတော်တဆ ဖြစ်ပွားမှုများကို မြန်မြန်ဆန်ဆန် သန့်ရှင်းရေးလုပ်ပြီး ခြံကို သန့်ရှင်းအောင် ထားပါ။"),
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
    t("Do not leave her roaming unsupervised.", "監視なしで自由に歩き回らせないでください。", "စောင့်ကြည့်မှုမရှိဘဲ လွှတ်မထားပါနှင့်။")),
  routine("general-window-safety", "as-needed", 13, "W",
    t("General Window Safety", "窓の安全", "ပြတင်းပေါက် ဘေးကင်းရေး"),
    t("Keep Nako and every household helper safe around windows and window grilles.", "窓や窓グリルの周りでは、ナコとヘルパー全員の安全を守ってください。", "ပြတင်းပေါက်နှင့် window grille အနီးတွင် Nako နှင့် အိမ်အကူအားလုံး ဘေးကင်းအောင်ထားပါ။"),
    t("Whenever near windows", "窓の近くにいる時", "ပြတင်းပေါက်အနီး ရှိသည့်အခါ"),
    [
      t("Do not climb, lean out, jump, play, or put weight near a window.", "窓の近くで登る、身を乗り出す、跳ぶ、遊ぶ、体重をかける行為は禁止です。", "ပြတင်းပေါက်အနီးတွင် မတက်၊ ကိုယ်မယောင်း၊ မခုန်၊ မကစား၊ ကိုယ်အလေးချိန် မတင်ပါနှင့်။"),
      t("Window grilles do not make the area completely safe. Take care when cleaning, closing, or walking near windows.", "窓グリルがあっても完全に安全ではありません。窓の掃除、開閉、近くを歩く時は注意してください。", "window grille ရှိသော်လည်း လုံးဝဘေးကင်းသည် မဟုတ်ပါ။ ပြတင်းပေါက် သန့်ရှင်းခြင်း၊ ပိတ်ခြင်း သို့မဟုတ် အနီးတွင် လမ်းလျှောက်ခြင်းအခါ သတိထားပါ။"),
      t("Always supervise Nako near windows.", "窓の近くでは常にナコを見守ってください。", "ပြတင်းပေါက်အနီးတွင် Nako ကို အမြဲစောင့်ကြည့်ပါ။")
    ]),
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
    t("If Nako vomits, has diarrhoea, or will not eat: keep her safe, take a photo, and tell Edwin immediately.", "Nakoが吐く、下痢をする、食べない場合は、安全を確保し、写真を撮り、すぐEdwinに連絡します。", "Nako အန်ရင်၊ ဝမ်းလျှောရင် သို့မဟုတ် မစားရင် လုံခြုံအောင်ထားပါ။ ဓာတ်ပုံရိုက်ပါ။ Edwin ကို ချက်ချင်းပြောပါ။"),
    t("Immediately", "すぐに", "ချက်ချင်း"),
    t("Notify Edwin before doing anything else.", "何かする前にエドウィンへ連絡する。", "အခြားဘာမှမလုပ်ခင် Edwin ကို အသိပေးပါ။"),
    [
      photo("assets/routines/nako-emergency-vomit.jpg",
        t("Nako's vomit on the tiled floor", "タイルの床の上のナコの嘔吐物", "ကြွေပြားကြမ်းပြင်ပေါ်ရှိ နာကို၏ အန်ဖတ်"),
        t("An example photo of Nako's vomit on the floor.", "床の上のナコの嘔吐物の写真例。", "ကြမ်းပြင်ပေါ်ရှိ နာကို၏ အန်ဖတ်ပုံစံ နမူနာဓာတ်ပုံ။"))
    ]),

  routine("mail-deliveries", "daily", 100, "P", 
    t("Mail & Deliveries", "郵便物と配達対応", "စာတိုက်နှင့် delivery များ"),
    t("Collect deliveries promptly. Wipe them and bring them inside. Remove packaging outdoors only when instructed; otherwise keep and wipe it.", "配達物はすぐに回収し、拭いて家に入れます。指示がある時だけ屋外で梱包を外し、それ以外は梱包ごと拭いてください。", "delivery ပစ္စည်းများကို ချက်ချင်းယူပြီး သုတ်ကာ အိမ်ထဲသွင်းပါ။ ညွှန်ကြားထားမှသာ အပြင်တွင် packaging ကိုဖြုတ်ပါ။ မဟုတ်လျှင် packaging အတိုင်း သုတ်ပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    [
      t("Generally, wipe every item or outer package before it enters the house.", "原則として、家に入れる前に商品または外装全体を拭いてください。", "ယေဘုယျအားဖြင့် ပစ္စည်း သို့မဟုတ် အပြင် packaging တစ်ခုလုံးကို အိမ်ထဲမသွင်းမီ သုတ်ပါ။"),
      t("Keep parcels safe and tell Edwin/Yukari if anything important arrives.", "荷物を安全に保管し、大切な物が届いたらエドウィン／ゆかりに知らせてください。", "parcel များကို လုံခြုံစွာထားပြီး အရေးကြီးသောပစ္စည်းရောက်လျှင် Edwin/Yukari ကို အသိပေးပါ။"),
      t("For a new appliance, follow its manual and run the first cycle normally. Discard the first water, drink, or food output where applicable. Ask Edwin if unsure.", "新しい家電は説明書に従い、最初の運転を通常どおり行ってください。該当する場合、最初の水、飲み物、または食べ物は捨てます。不明な場合はEdwinに確認してください。", "စက်အသစ်အတွက် manual ကိုလိုက်နာပြီး ပထမ cycle ကို ပုံမှန် run ပါ။ သက်ဆိုင်ပါက ပထမဆုံးရေ၊ သောက်စရာ သို့မဟုတ် အစားအစာကို လွှင့်ပစ်ပါ။ မသေချာပါက Edwin ကိုမေးပါ။")
    ],
    [
      photo("assets/routines/nako-delivery-unpack-when-instructed.jpg",
        t("Item unpacked outside with packaging left by the door", "玄関外で梱包を外し、包装材を外に置いた商品", "တံခါးအပြင်တွင် packaging ဖြုတ်ပြီး packaging ကို အပြင်တွင်ထားသော ပစ္စည်း"),
        t("When instructed to remove packaging, unpack outside, leave the packaging outside, clean the item, and bring it in promptly.", "梱包を外すよう指示された場合は、屋外で開封し、包装材は外に置き、商品をきれいにしてすぐ家に入れます。", "packaging ဖြုတ်ရန် ညွှန်ကြားထားပါက အပြင်တွင်ဖြုတ်၊ packaging ကို အပြင်တွင်ထား၊ ပစ္စည်းကို သန့်ရှင်းပြီး ချက်ချင်း အိမ်ထဲသွင်းပါ။")),
      photo("assets/routines/nako-delivery-wipe-item.jpg",
        t("Delivered appliance being wiped before going inside", "家に入れる前に拭いている配達された家電", "အိမ်ထဲမသွင်းမီ သုတ်နေသော delivery စက်ပစ္စည်း"),
        t("Wipe the item—or the whole package if keeping it—then bring it inside so it is not left outside.", "商品、または梱包を残す場合は外装全体を拭き、外に放置せず家に入れます。", "ပစ္စည်းကို သုတ်ပါ။ packaging ကိုထားမည်ဆိုလျှင် packaging တစ်ခုလုံးကို သုတ်ပြီး အပြင်တွင် မထားဘဲ အိမ်ထဲသွင်းပါ။"))
    ]),

  routine("general-tidiness", "daily", 110, "T", 
    t("General Tidiness", "一般的な整理整頓", "ယေဘုယျ သန့်ရှင်းသပ်ရပ်မှု"), 
    t("Wipe down items left outside and keep them properly back in place so things are not left lying around.", "出しっぱなしになっている物を拭き取り、適切に元の場所に戻して、散らかったままにしないようにします。", "အပြင်တွင် ကျန်ခဲ့သော ပစ္စည်းများကို သုတ်ပြီး ပစ္စည်းများ ရှုပ်ပွမနေစေရန် သင့်တော်သောနေရာတွင် ပြန်သိမ်းပါ။"), 
    t("Daily + as needed", "毎日＋必要に応じて", "နေ့စဉ် + လိုအပ်သလို"), 
    t("Do not leave items lying around. Edwin is sensitive to dust and dirt, so clean visible dust promptly instead of waiting for the next scheduled task.", "物を出しっぱなしにしないでください。エドウィンはほこりや汚れに敏感なので、次の予定日まで待たず、見つけたほこりはすぐに掃除してください。", "ပစ္စည်းများကို ဟိုဟိုဒီဒီ ပြန့်ကြဲမထားပါနှင့်။ Edwin သည် ဖုန်နှင့် အညစ်အကြေးကို အာရုံခံလွယ်သောကြောင့် နောက်သန့်ရှင်းရေးအချိန်ကို မစောင့်ဘဲ မြင်ရသောဖုန်ကို ချက်ချင်းသန့်ရှင်းပါ။")),
  routine("sofa-hair-room-corner-cleaning", "daily", 115, "S",
    t("Sofa Hair & Room-Corner Spot Cleaning", "ソファの毛と部屋の隅の部分掃除", "ဆိုဖာအမွေးနှင့် အခန်းထောင့် နေရာကွက် သန့်ရှင်းရေး"),
    t("During free time, remove hair or fur from the sofa and wipe dusty room corners.", "時間がある時に、ソファの髪や毛を取り、ほこりのたまった部屋の隅を拭いてください。", "အားလပ်ချိန်တွင် ဆိုဖာပေါ်ရှိ ဆံပင် သို့မဟုတ် အမွေးကိုဖယ်ပြီး ဖုန်ရှိသော အခန်းထောင့်များကို သုတ်ပါ။"),
    t("During free time / as needed", "時間がある時／必要に応じて", "အားလပ်ချိန်တွင် / လိုအပ်သလို"),
    [
      t("Put removed hair or fur straight into the bin.", "取った髪や毛はすぐゴミ箱に捨ててください。", "ဖယ်ထားသော ဆံပင် သို့မဟုတ် အမွေးကို အမှိုက်ပုံးထဲ ချက်ချင်းပစ်ပါ။"),
      t("Wipe dust or dirt from room corners with a tissue or wet wipe.", "部屋の隅のほこりや汚れは、ティッシュまたはウェットティッシュで拭いてください。", "အခန်းထောင့်ရှိ ဖုန် သို့မဟုတ် အညစ်အကြေးကို tissue သို့မဟုတ် wet tissue ဖြင့် သုတ်ပါ။")
    ]),
  routine("vimle-sofa-bed", "as-needed", 117, "B",
    t("IKEA VIMLE Sofa-Bed", "IKEA VIMLE ソファベッド", "IKEA VIMLE ဆိုဖာအိပ်ရာ"),
    t("Open or close the Gunnared beige IKEA VIMLE 2-seat sofa-bed safely. Pull UP first, then pull OUT.", "グンナレッド ベージュのIKEA VIMLE 2人掛けソファベッドを安全に開閉します。最初に上へ引き、その後手前へ引きます。", "Gunnared beige IKEA VIMLE ၂ ယောက်ထိုင် ဆိုဖာအိပ်ရာကို လုံခြုံစွာ ဖွင့်ပိတ်ပါ။ အရင် အပေါ်ဆွဲပြီးမှ အပြင်ဆွဲပါ။"),
    t("As needed", "必要な時", "လိုအပ်သည့်အခါ"),
    [
      t("Important: pull the orange loop UP first, then pull OUT. Do not pull it horizontally while the frame is flat.", "重要：オレンジ色のループは最初に上へ引き、その後手前へ引いてください。フレームが平らな状態で水平方向に引かないでください。", "အရေးကြီးသည် - လိမ္မော်ရောင်ကြိုးကို အရင် အပေါ်ဆွဲပြီးမှ အပြင်ဆွဲပါ။ frame ပြားနေစဉ် ဘေးတန်းမဆွဲပါနှင့်။"),
      t("Keep fingers away from the side hinges and folding joints.", "指を側面のヒンジや折りたたみ部分に近づけないでください。", "လက်ချောင်းများကို ဘေး hinge နဲ့ ခေါက်ဆက်နေရာများမှ ဝေးဝေးထားပါ။"),
      t("For the first attempt, 2 people—one on each side—can control the heavy frame more safely.", "初回は左右に1人ずつ、2人で行うと重いフレームをより安全に扱えます。", "ပထမဆုံးဖွင့်ပိတ်ချိန်တွင် ဘေးတစ်ဖက်စီမှာ လူ ၁ ယောက်စီ၊ စုစုပေါင်း ၂ ယောက်လုပ်ပါက လေးသော frame ကို ပိုလုံခြုံစွာ ထိန်းနိုင်သည်။")
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
    t("Take out general trash and dog waste bins daily.", "一般ゴミと犬用ゴミ箱を毎日捨てる。", "အထွေထွေအမှိုက်နှင့် ခွေးအမှိုက်ပုံးကို နေ့စဉ်သွန်ပါ။"),
    t("Daily", "毎日", "နေ့စဉ်"),
    [
      t("Dog waste bin should not be left to smell.", "犬用ゴミ箱は臭いが出るまで放置しない。", "ခွေးအမှိုက်ပုံးကို အနံ့ထွက်သည်အထိ မထားပါနှင့်။"),
      t("Throw all rubbish and general trash daily. Do not let trash accumulate in the bins.", "毎日すべてのゴミや一般ゴミを捨ててください。ゴミ箱にゴミがたまらないようにしてください。", "အမှိုက်များနှင့် အထွေထွေအမှိုက်အားလုံးကို နေ့စဉ်ပစ်ပါ။ အမှိုက်ပုံးထဲတွင် အမှိုက်များ စုပုံမနေပါစေနှင့်။"),
      t("Put normal bagged household rubbish down the rubbish chute.", "通常の袋に入った家庭ゴミは、ゴミ投入口から捨てます。", "အိတ်ဖြင့်ထည့်ထားသော ပုံမှန်အိမ်သုံးအမှိုက်ကို rubbish chute ထဲ ပစ်ပါ။"),
      t("Do not force large or bulky rubbish—including large delivery packaging—into the chute. Carry it downstairs to the disposal area shown in the photo.", "大きすぎるゴミや大型の配送梱包材をゴミ投入口へ無理に押し込まないでください。写真にある階下のゴミ置き場まで運びます。", "အရွယ်ကြီးသောအမှိုက် သို့မဟုတ် delivery packaging ကြီးများကို chute ထဲ အတင်းမထည့်ပါနှင့်။ ပုံတွင်ပြထားသော အောက်ထပ်အမှိုက်ထားရာနေရာသို့ ယူသွားပါ။")
    ],
    [
      photo("assets/routines/nako-rubbish-bin-daily.jpg",
        t("Rubbish bin with orange plastic bag liner", "オレンジ色のゴミ袋が入ったゴミ箱", "လိမ္မော်ရောင်အမှိုက်အိတ်စွပ်ထားသော အမှိုက်ပုံး"),
        t("Throw general trash and rubbish daily. Do not let trash build up.", "一般ゴミや生ゴミは毎日捨ててください。ゴミをためないようにします。", "အထွေထွေအမှိုက်နှင့် အမှိုက်များကို နေ့စဉ်ပစ်ပါ။ အမှိုက်များ စုမနေအောင် ထားပါ။")),
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

  routine("household-supplies-online", "daily", 145, "S",
    t("Household Supplies & Online Orders", "家庭用消耗品のオンライン注文", "အိမ်သုံးပစ္စည်းများနှင့် အွန်လိုင်းမှ မှာယူခြင်း"), 
    t("Refill low tissue boxes. Check spare supplies weekly. Add needed items to the Shopee cart, but do not order.", "少ないティッシュを補充します。予備品を毎週確認します。必要な品はShopeeカートに入れますが、注文しません。", "tissue နည်းရင် ဖြည့်ပါ။ အပိုပစ္စည်းကို အပတ်စဉ်စစ်ပါ။ လိုတာကို Shopee cart ထဲထည့်ပါ။ မမှာပါနဲ့။"),
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
    t("Check and top up daily supplement / pill boxes for Edwin and Yukari when empty or running low.", "エドウィンとゆかりの毎日のサプリメント/ピルボックスが空または少なくなっているか確認し、補充します。", "Edwin နှင့် Yukari တို့အတွက် နေ့စဉ်သောက်ရန် အားဆေး/ဆေးဗူးများ ကုန်ခါနီး သို့မဟုတ် ကုန်သွားပါက ဖြည့်ပေးပါ။"), 
    t("Weekly check + when empty", "毎週チェック＋空のとき", "အပတ်စဉ်စစ်ဆေးမှု + ကုန်သွားသောအခါ"), 
    [
      t("Keep Edwin's and Yukari's boxes separate. Do not change supplements unless instructed.", "エドウィンとゆかりのケースは別々に保管してください。指示がない限り、サプリメントの内容を変更しないでください。", "Edwin နှင့် Yukari ၏ဆေးဗူးများကို သီးခြားစီထားပါ။ ညွှန်ကြားချက်မရှိဘဲ အားဆေးများကို မပြောင်းပါနှင့်။"),
      t("The green box is for Edwin, and the white box is for Yukari. Specific pill instructions for each box will be provided later.", "緑色のケースはエドウィン用、白色のケースはゆかり用です。それぞれのケースに入れる具体的な薬の指示は後日提供されます。", "အစိမ်းရောင်ဗူးမှာ Edwin အတွက်ဖြစ်ပြီး အဖြူရောင်ဗူးမှာ Yukari အတွက်ဖြစ်သည်။ ဗူးတစ်ခုစီတွင် ထည့်ရမည့် အသေးစိတ်ဆေးညွှန်ကြားချက်များကို နောက်ပိုင်းတွင် ဖော်ပြပေးပါမည်။")
    ],
    [
      photo("assets/routines/supplement-pill-boxes.jpg",
        t("Supplement pill boxes", "サプリメントケース", "အားဆေးဆေးဗူးများ"),
        t("Green pill organizer for Edwin, white multi-compartment box for Yukari.", "エドウィン用の緑色のサプリメントケースと、ゆかり用の白色のマルチ仕切りケース。", "Edwin အတွက် အစိမ်းရောင်ဆေးဗူးနှင့် Yukari အတွက် အဖြူရောင်အကန့်ပါဆေးဗူး။"))
    ]),

  routine("toilet-cleaning", "weekly", 70, "T", 
    t("Toilet Cleaning", "トイレの掃除", "အိမ်သာသန့်ရှင်းရေး"),
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


  routine("floor-mats", "weekly", 100, "M", 
    t("Floor Mats", "足拭きマット", "ခြေသုတ်ကော်ဇောများ"), 
    t("Wash the 4 floor mats outside the rooms and toilet.", "部屋とトイレの外にある4枚の床マットを洗います。", "အခန်းများနှင့် အိမ်သာအပြင်ဘက်ရှိ ခြေသုတ်ကော်ဇော ၄ ခုကို လျှော်ဖွပ်ပါ။"), 
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Dry completely before placing back. Wring or spin-dry mats before hanging them outside. They must not drip onto the downstairs neighbour's clothes.", "完全に乾かしてから戻してください。外に干す前に、しっかり絞るか脱水してください。下の階の洗濯物に水が落ちるため、水が滴る状態で干さないでください。", "ပြန်မထားခင် အပြည့်အဝခြောက်အောင်လုပ်ပါ။ အပြင်တွင် မလှန်းမီ သေချာညှစ်ပါ သို့မဟုတ် spin-dry လုပ်ပါ။ အောက်ထပ်အိမ်နီးချင်း၏ အဝတ်ပေါ် ရေမကျစေရပါ။"),
      t("Floor mats are essential to keep feet clean and prevent dust from spreading. Do not wash all four floor mats at the same time—wash only two at a time so the living room is never left completely without mats.", "足拭きマットは足を清潔に保ち、ほこりが広がるのを防ぐために不可欠です。リビングルームが完全にマットなしにならないよう、4枚すべてのマットを同時に洗わず、一度に2枚ずつ洗うようにしてください。", "ခြေသုတ်ကော်ဇောများသည် ခြေဖဝါးများကို သန့်ရှင်းစေပြီး ဖုန်မှုန့်များ ပြန့်နှံ့ခြင်းမှ ကာကွယ်ရန် မရှိမဖြစ်လိုအပ်သည်။ ဧည့်ခန်းတွင် ခြေသုတ်ကော်ဇော လုံးဝမရှိဘဲ မဖြစ်စေရန် ခြေသုတ်ကော်ဇော ၄ ခုလုံးကို တစ်ပြိုင်နက် မလျှော်ပါနှင့် — တစ်ကြိမ်လျှင် ၂ ခုစီသာ လျှော်ပါ။")
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
      photo("assets/routines/nako-bedsheets-items-on-chair.jpg",
        t("Pillows, bolsters, and blankets placed on a chair", "枕、抱き枕、毛布を椅子に置いた状態", "ခေါင်းအုံး၊ ဖက်လုံးနှင့် စောင်များကို ကုလားထိုင်ပေါ် တင်ထားခြင်း"),
        t("1. Put pillows, bolsters, and blankets on a chair—never on the floor.", "1. 枕、抱き枕、毛布は床ではなく椅子に置きます。", "၁။ ခေါင်းအုံး၊ ဖက်လုံးနှင့် စောင်များကို ကြမ်းပြင်ပေါ်မထားဘဲ ကုလားထိုင်ပေါ်တင်ပါ။")),
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

  routine("windows-glass-mirrors", "weekly", 120, "G", 
    t("Windows, Glass Panels & Mirrors", "窓、ガラス窓、鏡", "ပြတင်းပေါက်များ၊ မှန်ချပ်များနှင့် မှန်များ"), 
    t("Clean only the safe interior side of windows, glass panels, mirrors, window sills, frames, and tracks.", "窓、ガラスパネル、鏡、窓枠、サッシ、レールは安全な室内側だけ掃除します。", "ပြတင်းပေါက်၊ glass panel၊ မှန်၊ window sill၊ frame နှင့် track များကို လုံခြုံသော အတွင်းဘက်သာ သန့်ရှင်းပါ။"),
    t("Weekly", "毎週", "အပတ်စဉ်"), 
    [
      t("Never clean exterior or outside-facing windows.", "外側・屋外側の窓は絶対に掃除しないでください。", "အပြင်ဘက် သို့မဟုတ် exterior window ကို လုံးဝမသန့်ရှင်းပါနှင့်။"),
      t("Do not reach outside, lean out, climb, stand on stools or chairs, or unlock or remove grilles to clean windows. Ask Edwin if unsure.", "窓掃除のために、外へ手を伸ばす、身を乗り出す、登る、椅子や踏み台に立つ、窓グリルを開ける・外すことは禁止です。不明な場合はEdwinに確認してください。", "ပြတင်းပေါက်သန့်ရှင်းရန် အပြင်သို့ လက်မလှမ်း၊ ကိုယ်မယောင်း၊ မတက်၊ ခုံပေါ်မတက်၊ grille ကို မဖွင့် သို့မဟုတ် မဖြုတ်ပါနှင့်။ မသေချာပါက Edwin ကိုမေးပါ။"),
      t("Keep window tracks and edges clear of dust and grime. Clean all mirrors and glass surfaces regularly.", "窓の溝や端にほこりや汚れが溜まらないようにしてください。すべての鏡やガラス面を定期的に掃除してください。", "ပြတင်းပေါက်လမ်းကြောင်းများနှင့် အနားသတ်များတွင် ဖုန်မှုန့်နှင့် ဂျီးများကင်းစင်အောင် ထားပါ။ မှန်များနှင့် ဖန်သားပြင်အားလုံးကို ပုံမှန်သန့်ရှင်းရေးလုပ်ပါ။")
    ],
    [
      photo("assets/routines/nako-windows-glass-mirrors.jpg",
        t("Windows and frames placeholder", "窓と窓枠のプレースホルダー", "ပြတင်းပေါက်များနှင့် ဘောင်များ နေရာယူပစ္စည်း"),
        t("Wipe only the safe interior frames, tracks, and glass panes each week.", "毎週、安全な室内側の窓枠、溝、ガラス板だけを拭いてください。", "အပတ်စဉ် လုံခြုံသော အတွင်းဘက် frame၊ track နှင့် glass pane များကိုသာ သုတ်ပါ။"))
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
    t("Keep the area neat, avoid blocking the corridor, and let shoes dry fully before putting them back.", "周辺をきれいに保ち、廊下を塞がず、靴は完全に乾かしてから戻してください。", "နေရာကို သပ်ရပ်စွာထားပြီး corridor မပိတ်ပါနှင့်။ ဖိနပ်များကို ပြန်မထားခင် အပြည့်အဝခြောက်အောင်ထားပါ။")),
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
    t("Descale the coffee machine when it blinks/shows the descaling indicator, or every 4-6 months depending on usage.", "石灰除去インジケーターが点滅/表示されたとき、または使用状況に応じて4〜6ヶ月ごとにコーヒーマシンの石灰除去を行います。", "သံချေးချွတ်ရန် သတိပေးချက်ပြသောအခါ သို့မဟုတ် အသုံးပြုမှုအပေါ် မူတည်၍ ၄-၆ လတစ်ကြိမ် ကော်ဖီစက်ကို သံချေးချွတ်ပါ။"), 
    t("Ad hoc / every 4-6 months", "臨時 / 4〜6ヶ月ごと", "လိုအပ်သလို / ၄-၆ လတစ်ကြိမ်"), 
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
      t("Pour a generous but moderate amount of the requested spirit—enough to enjoy, but not too much.", "希望されたスピリッツを、楽しめる十分な量だが入れすぎない適量で注ぐ。", "တောင်းထားသော spirit ကို သောက်ကောင်းလောက်အောင်ထည့်ပါ၊ သို့သော် အလွန်အကျွံမထည့်ပါနှင့်။"),
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
      t("3. MOST IMPORTANT — PULL THE SAFETY PIN completely out. The lever will not work until the pin is removed.", "3. 最重要：安全ピンを完全に引き抜きます。ピンを抜かないとレバーは使えません。", "၃။ အရေးအကြီးဆုံး — လုံခြုံရေးပင်ကို လုံးဝဆွဲထုတ်ပါ။ ပင်မထုတ်လျှင် လက်ကိုင်ကို ညှစ်၍မရပါ။"),
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
  routine("upload-shared-album", "as-needed", 0, "📷",
    t("Upload Photos & Videos to Shared Album", "共有アルバムへの写真・動画のアップロード", "မျှဝေထားသော အယ်လ်ဘမ်သို့ ဓာတ်ပုံနှင့် ဗီဒီယိုများ တင်ခြင်း"),
    t("Upload photos and videos to the shared Google Photos album whenever you complete tasks, find something unusual, or are unsure of what to do.", "タスク完了時、異常を見つけた時、またはどうすべきか判断に迷う時に、共有のGoogleフォトアルバムに写真や動画をアップロードします。", "အလုပ်များပြီးစီးသည့်အခါ၊ ပုံမှန်မဟုတ်သောအရာများ တွေ့ရှိသည့်အခါ သို့မဟုတ် ဘာလုပ်ရမှန်း မသေချာသည့်အခါ မျှဝေထားသော Google Photos အယ်လ်ဘမ်သို့ ဓာတ်ပုံနှင့် ဗီဒီယိုများ တင်ပေးပါ။"),
    t("As needed", "必要に応じて", "လိုအပ်သလို"),
    [
      t("1. Open Google Photos.", "1. Googleフォトを開きます。", "၁။ Google Photos ကို ဖွင့်ပါ။"),
      t("2. Press and hold a photo, then select all photos or videos to share.", "2. 写真を長押しし、共有するすべての写真または動画を選択します。", "၂။ ဓာတ်ပုံတစ်ပုံကို ဖိထားပြီး မျှဝေလိုသော ဓာတ်ပုံ သို့မဟုတ် ဗီဒီယိုအားလုံးကို ရွေးချယ်ပါ။"),
      t("3. Press Add to album.", "3. 「アルバムに追加」を押します。", "၃။ “Add to album” ကို နှိပ်ပါ။"),
      t("4. Select the shared album named exactly CHO MDM SIR.", "4. 「CHO MDM SIR」という名前の共有アルバムを選択します。", "၄။ “CHO MDM SIR” ဟု အတိအကျ အမည်ပေးထားသော မျှဝေထားသည့် အယ်လ်ဘမ်ကို ရွေးပါ။"),
      t("5. Once added, Edwin and Yukari can view the photos and videos.", "5. 追加されると、エドウィンとゆかりがその写真や動画を閲覧できるようになります。", "၅။ ထည့်သွင်းပြီးပါက Edwin နှင့် Yukari တို့သည် ဓာတ်ပုံနှင့် ဗီဒီယိုများကို ကြည့်ရှုနိုင်မည် ဖြစ်သည်။"),
      t("6. Whenever something is completed, unclear, unusual, or you are unsure what to do, take a photo or video and add it to this album.", "6. タスク完了時、不明な点や異常がある時、またはどうすべきか迷う時は、写真や動画を撮影してこのアルバムに追加してください。", "၆။ အလုပ်တစ်ခုခု ပြီးစီးသည့်အခါ၊ မရှင်းလင်းသည့်အခါ၊ ပုံမှန်မဟုတ်သည့်အခါ သို့မဟုတ် ဘာလုပ်ရမှန်း မသေချာသည့်အခါတိုင်း ဓာတ်ပုံ သို့မဟုတ် ဗီဒီယိုရိုက်ပြီး ဤအယ်လ်ဘမ်ထဲသို့ ထည့်ပါ။"),
      t("7. Edwin will review the album, add relevant photos to the Nako app GitHub repository, and follow up through WhatsApp if he has questions.", "7. エドウィンがアルバムを確認し、関連する写真をNakoアプリのGitHubリポジトリに追加し、質問がある場合はWhatsAppで連絡します。", "၇။ Edwin က အယ်လ်ဘမ်ကို စစ်ဆေးပြီး သက်ဆိုင်ရာဓာတ်ပုံများကို Nako app GitHub repository တွင် ထည့်သွင်းပေးမည်ဖြစ်ကာ မေးခွန်းရှိပါက WhatsApp မှတစ်ဆင့် ဆက်သွယ်မေးမြန်းပါမည်။")
    ]
  ),
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

const bedroomsLinensRoutine = routineTasks.find((task) => task.id === "bedrooms-linens");
if (bedroomsLinensRoutine) {
  bedroomsLinensRoutine.instructions = [
    t("Put pillows, bolsters, and blankets on a chair—not on the floor.", "枕、抱き枕、毛布は床ではなく椅子に置きます。", "ခေါင်းအုံး၊ ဖက်လုံးနှင့် စောင်များကို ကြမ်းပြင်ပေါ်မထားဘဲ ကုလားထိုင်ပေါ်တင်ပါ။"),
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
    photo("assets/routines/grocery-shopping-wet-market-prawns.jpg",
      t("Fresh prawns at the wet-market seafood stall", "市場の鮮魚店にある新鮮なエビ", "စျေးပင်လယ်စာဆိုင်ရှိ ပုစွန်လတ်များ"),
      t("Buy fresh prawns here only when they are on the shopping list or requested. Confirm the amount if unsure.", "買い物リストにある時、または頼まれた時だけ、ここで新鮮なエビを買います。量が不明な場合は確認してください。", "shopping list ထဲတွင်ပါသည့်အခါ သို့မဟုတ် တောင်းဆိုထားသည့်အခါမှသာ ဤနေရာမှ ပုစွန်လတ်များ ဝယ်ပါ။ ပမာဏမသေချာပါက မေးပါ။")),
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
    t("⚠️ **WINDOW SAFETY ALERT:** Window grilles do not make the area completely safe. Keep Nako away from window edges and do not lean out, climb, or put weight near windows.", "⚠️ **窓の安全注意:** 窓グリルがあっても完全に安全ではありません。ナコを窓の端から離し、身を乗り出す、登る、窓の近くに体重をかける行為は禁止です。", "⚠️ **ပြတင်းပေါက် ဘေးကင်းရေး:** window grille ရှိသော်လည်း လုံးဝဘေးကင်းသည် မဟုတ်ပါ။ Nako ကို ပြတင်းပေါက်အနားမှ ဝေးဝေးထားပြီး ကိုယ်မယောင်း၊ မတက်၊ ပြတင်းပေါက်အနီး ကိုယ်အလေးချိန် မတင်ပါနှင့်။")
  );
}

const dailyCookingRoutine = routineTasks.find((task) => task.id === "daily-cooking");
if (dailyCookingRoutine) {
  dailyCookingRoutine.mustRemember.push(
    t("**WHITE RICE — Tefal Mini:** 1) Turn on the main power switch. 2) Press **Menu** until the white line is on **White Rice**. 3) Press **Start**.", "**白米 — Tefal Mini:** ①元の電源スイッチを入れる。②白いラインが**White Rice**に来るまで**Menu**を押す。③**Start**を押す。", "**ဆန်ဖြူ — Tefal Mini:** ၁) ပင်မ power switch ကိုဖွင့်ပါ။ ၂) အဖြူရောင်လိုင်း **White Rice** နေရာရောက်အောင် **Menu** ကိုနှိပ်ပါ။ ၃) **Start** ကိုနှိပ်ပါ။"),
    t("**FYI ONLY:** Other food recipes are reference only—make them only when you are asked.", "**参考のみ:** ほかの料理レシピは参考用です。頼まれた時だけ作る。", "**အချက်အလက်အတွက်သာ:** အခြားဟင်းချက်နည်းများသည် ကိုးကားရန်သာဖြစ်သည်။ တောင်းဆိုသည့်အခါမှသာ ချက်ပါ။")
  );
  dailyCookingRoutine.photos = [
    photo("assets/routines/tefal-mini-rice-cooker-white-rice.jpg",
      t("Tefal Mini rice cooker — White Rice controls", "Tefal Mini炊飯器 — White Riceの操作", "Tefal Mini ထမင်းပေါင်းအိုး — White Rice ခလုတ်များ"),
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
    t("If poop lands outside the tray, it is usually not a potty accident: Nako likely pooped in the pen, but it caught in the hair around her bottom. Pick it up, then clean the entire pen floor.", "トレーの外にうんちが落ちている場合、それは通常トイレの失敗ではありません。ナコはペン内で排便したものの、お尻まわりの毛に付いて落ちた可能性があります。うんちを拾い、ペンの床全体を掃除してください。", "ချေးသည် tray အပြင်ဘက်တွင် ကျနေပါက အများအားဖြင့် အပေါ့အလေးသွားရာ မတော်တဆမှုမဟုတ်ပါ။ နာကိုသည် pen အတွင်းတွင် ချေးသွားပြီး၊ တင်ပါးပတ်ဝန်းကျင်အမွေးတွင် ကပ်နေ၍ ကျလာနိုင်သည်။ ချေးကိုကောက်ပြီး pen ကြမ်းပြင်တစ်ခုလုံးကို သန့်ရှင်းပါ။"),
    t("Use the pet urine and odour-removal spray on urine marks and the pee tray or pen floor as needed to remove urine and pee smell.", "尿の跡やトイレトレー、ペンの床には、必要に応じてペット用の尿・消臭スプレーを使い、尿やおしっこの臭いを取り除いてください。", "ဆီးကွက်များနှင့် pee tray သို့မဟုတ် pen ကြမ်းပြင်ပေါ်တွင် လိုအပ်သလို pet urine and odour-removal spray ကိုသုံးပြီး ဆီးနှင့် pee အနံ့ကို ဖယ်ရှားပါ။")
  ];
  nakoPottyPenRoutine.mustRemember.push(
    t("Key principle: pee and poop must not be visible or anywhere outside the pee tray. If poop lands outside, clean the whole pen floor.", "重要原則: おしっことうんちは見えてはいけません。トレーの外にも絶対に出ないようにしてください。うんちが外に落ちた場合は、ペンの床全体を掃除します。", "အဓိကစည်းမျဉ်း: ဆီးနှင့်အညစ်အကြေးများကို မြင်မနေရပါ။ pee tray အပြင်ဘက်တွင်လည်း ဘယ်နေရာမှ မရှိရပါ။ ချေးသည် အပြင်ဘက်တွင် ကျနေပါက pen ကြမ်းပြင်တစ်ခုလုံးကို သန့်ရှင်းပါ။")
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
    t("Normally, wipe the item or outer package and bring it inside.", "通常は、商品または外装を拭いて家に入れます。", "ပုံမှန်အားဖြင့် ပစ္စည်း သို့မဟုတ် အပြင် packaging ကို သုတ်ပြီး အိမ်ထဲသွင်းပါ။"),
    t("When instructed to remove packaging, unpack outside, leave the packaging outside, clean the item, and bring it in.", "梱包を外すよう指示された場合は、屋外で開封し、包装材は外に置き、商品をきれいにして家に入れます。", "packaging ဖြုတ်ရန် ညွှန်ကြားထားပါက အပြင်တွင်ဖြုတ်၊ packaging ကို အပြင်တွင်ထား၊ ပစ္စည်းကို သန့်ရှင်းပြီး အိမ်ထဲသွင်းပါ။"),
    t("If unsure whether to keep the packaging, keep it. Wipe the whole package and bring it inside.", "梱包を残すべきか迷う場合は捨てず、外装全体を拭いて家に入れてください。", "packaging ကိုထားရမည်လား မသေချာပါက မပစ်ပါနှင့်။ packaging တစ်ခုလုံးကို သုတ်ပြီး အိမ်ထဲသွင်းပါ။")
  ];
}

// Exclusions for non-daily routine tasks that are intentionally reference-only.
// If a non-daily actionable task is deliberately excluded, we declare a reason here.
const routineTrackingExclusions = {
  "toilet-cleaning": "Common/master toilet cleaning is handled during daily cleaning routines and as-needed",
  "nako-inventory-check": "Inventory check is a reference guidelines page for stocking items",
  "supplement-pill-boxes": "Supplement pill boxes check is a reference guidelines page for Edwin and Yukari's medications",
  "pest-check": "Pest check is reference information for checking ants/cockroaches",
  "outside-shoe-rack": "Shoe rack tidiness is managed daily or on-demand, not on a strict fortnightly schedule",
  "microwave-interior": "Microwave interior is cleaned immediately after cooking as-needed, not monthly"
};

// Automatic single-source-of-truth metadata application
routineTasks.forEach((task) => {
  const isPinnedSafety = ["nako-emergency", "nako-kind-handling", "nako-supervision"].includes(task.id);
  const isDailyOrAsNeeded = task.frequencyBucket === "daily" || task.frequencyBucket === "as-needed";
  const nonDailyCadences = ["weekly", "fortnightly", "monthly", "quarterly", "one-off"];
  const isNonDaily = nonDailyCadences.includes(task.frequencyBucket);

  const isTrackedCandidate = (isNonDaily && !isPinnedSafety && !isDailyOrAsNeeded) || task.id === "fire-extinguisher-training";

  if (isTrackedCandidate) {
    const exclusionReason = routineTrackingExclusions[task.id];
    if (exclusionReason) {
      task.trackingMode = "none";
      task.trackingCadence = null;
      task.trackingAnchor = null;
      task.itemKind = "reference";
      task.trackingExclusionReason = exclusionReason;
    } else {
      task.itemKind = "task";
      task.trackingExclusionReason = null;
      
      if (task.id === "fire-extinguisher-training") {
        task.trackingCadence = "one-off";
        task.trackingMode = "one-off";
      } else {
        task.trackingCadence = task.frequencyBucket;
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
    task.itemKind = "reference";
    task.trackingExclusionReason = null;
  }
});
