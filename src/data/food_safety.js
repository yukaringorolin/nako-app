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
    t("Thaw frozen meat and seafood in the fridge, cold water, or microwave—not on the counter.", "冷凍の肉や魚介類は、室温ではなく、冷蔵庫、冷水、または電子レンジで解凍します。", "အေးခဲထားသော အသားနှင့် ပင်လယ်စာကို အပြင်မှာမထားဘဲ fridge၊ ရေအေး သို့မဟုတ် microwave ဖြင့် အရည်ဖျော်ပါ။"),
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

