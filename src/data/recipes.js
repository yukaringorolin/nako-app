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
  recipe("crispy-skin-pan-fried-salmon",
    t("Crispy-Skin Pan-Fried Salmon", "皮パリパリのフライパン焼きサーモン", "အရေပြားကြွပ်ကြွပ် ဒယ်အိုးကြော် ဆယ်လ်မွန်"),
    [
      [t("Skin-on salmon fillet", "皮付きサーモンフィレ", "အရေပြားပါ ဆယ်လ်မွန်အသားတုံး"), t("1 fillet", "1切れ", "၁ တုံး"), "salmon-fillet"],
      [t("Cooking oil spray", "調理用オイルスプレー", "ဟင်းချက်ဆီ spray"), t("exactly 1 spray", "1回だけ", "၁ ခါသာ"), "oil"]
    ],
    [
      t("If the salmon is frozen, thaw it safely in the fridge before cooking.", "サーモンが冷凍の場合は、調理前に冷蔵庫で安全に解凍します。", "ဆယ်လ်မွန်အေးခဲထားပါက မချက်မီ ရေခဲသေတ္တာထဲတွင် ဘေးကင်းစွာ အရည်ဖျော်ပါ။"),
      t("Remove the salmon from the bag and pat both sides completely dry.", "サーモンを袋から出し、両面の水気を完全に拭き取ります。", "ဆယ်လ်မွန်ကို အိတ်ထဲမှထုတ်ပြီး နှစ်ဖက်လုံးကို ရေလုံးဝခြောက်အောင် သုတ်ပါ။"),
      t("Check the salmon and remove any pin bones.", "サーモンを確認し、残っている小骨を取り除きます。", "ဆယ်လ်မွန်တွင် အရိုးသေးများ ကျန်မကျန် စစ်ပြီး ဖယ်ပါ။"),
      t("Heat a frying pan over medium heat.", "フライパンを中火で熱します。", "ဒယ်အိုးကို မီးအလယ်အလတ်ဖြင့် ပူအောင်လုပ်ပါ။"),
      t("Spray the pan exactly once with cooking oil.", "フライパンに調理用オイルを1回だけスプレーします。", "ဒယ်အိုးထဲ ဟင်းချက်ဆီ ၁ ခါသာ ဖြန်းပါ။"),
      t("Place the salmon in the pan with the skin side down.", "サーモンを皮目を下にしてフライパンへ入れます。", "ဆယ်လ်မွန်ကို အရေပြားဘက်အောက်ထားပြီး ဒယ်အိုးထဲ ထည့်ပါ။"),
      t("Cook without flipping until the skin is very crisp and the opaque cooked colour reaches about 80-90% up the side.", "裏返さず、皮がしっかりパリパリになり、火が通った不透明な色が側面の約80〜90％まで上がるまで焼きます。", "မလှန်ဘဲ အရေပြားအရမ်းကြွပ်လာပြီး ကျက်၍ အရောင်ဖျော့လာသောအပိုင်းက ဘေးဘက် 80-90% ခန့်အထိ တက်လာသည်အထိ ချက်ပါ။"),
      t("Flip the salmon once.", "サーモンを1回だけ裏返します。", "ဆယ်လ်မွန်ကို ၁ ကြိမ်သာ လှန်ပါ။"),
      t("Cook the other side until the thickest part reaches about 60°C.", "反対側を焼き、最も厚い部分の中心温度が約60℃になるまで加熱します。", "အခြားဘက်ကို ချက်ပြီး အသားအထူဆုံးနေရာ အတွင်းအပူချိန် 60°C ခန့် ရောက်အောင်လုပ်ပါ။"),
      t("Check that the centre is not undercooked; cook a little longer if needed.", "中心が生焼けでないことを確認し、必要ならもう少し加熱します。", "အလယ်သား မကျက်သေးခြင်း မရှိကြောင်း စစ်ပါ။ လိုပါက ခဏထပ်ချက်ပါ။"),
      t("Serve with the crispy skin facing up.", "パリパリの皮を上にして盛り付けます。", "ကြွပ်နေသော အရေပြားဘက်ကို အပေါ်ထားပြီး တည်ခင်းပါ။")
    ],
    t("Use exactly 1 spray of oil. Do not pour extra oil into the pan because the salmon releases plenty of its own fat. Cook most of the fillet skin-side down and flip only after the skin is very crisp and the cooked colour has risen about 80-90% up the side. The thickest part should reach about 60°C, and the centre must not be undercooked.", "油はスプレー1回だけ使います。サーモン自体から十分な脂が出るため、フライパンに追加の油を注がないでください。ほとんどの時間を皮目で焼き、皮がしっかりパリパリになり、火が通った色が側面の約80〜90％まで上がってから1回だけ裏返します。最も厚い部分は約60℃に達し、中心が生焼けでないことを確認します。", "ဆီကို ၁ ခါသာ ဖြန်းပါ။ ဆယ်လ်မွန်မှ ဆီအများကြီးထွက်သောကြောင့် ဒယ်အိုးထဲ ဆီထပ်မလောင်းပါနှင့်။ ချက်ချိန်အများစုကို အရေပြားဘက်အောက်ထားပြီး ချက်ပါ။ အရေပြားအရမ်းကြွပ်လာကာ ကျက်သောအရောင်က ဘေးဘက် 80-90% ခန့်အထိ တက်လာမှ ၁ ကြိမ်သာ လှန်ပါ။ အသားအထူဆုံးနေရာ 60°C ခန့် ရောက်ရမည်ဖြစ်ပြီး အလယ်သား မကျက်သေးခြင်း မရှိရပါ။"),
    [
      photo("assets/recipes/human-food/crispy-skin-pan-fried-salmon.jpg",
        t("Pan-fried salmon opened to show the cooked centre and crispy skin", "中の火通りとパリパリの皮を確認できるフライパン焼きサーモン", "အတွင်းသားကျက်မှုနှင့် ကြွပ်သောအရေပြားကို မြင်ရသည့် ဒယ်အိုးကြော် ဆယ်လ်မွန်"),
        t("After the long skin-side cook and short flesh-side finish, check that the thickest part is about 60°C and not undercooked.", "皮目を長く焼き、身側を短く仕上げた後、最も厚い部分が約60℃で生焼けでないことを確認します。", "အရေပြားဘက်ကို ကြာကြာချက်ပြီး အသားဘက်ကို ခဏချက်ပြီးနောက် အထူဆုံးနေရာ 60°C ခန့် ရောက်ကာ မကျက်သေးခြင်း မရှိကြောင်း စစ်ပါ။")),
      photo("assets/recipes/human-food/crispy-skin-pan-fried-salmon-preparation.jpg",
        t("Skin-on salmon fillet beside the frying pan and oil spray", "フライパンとオイルスプレーのそばに置いた皮付きサーモンフィレ", "ဒယ်အိုးနှင့် ဆီ spray ဘေးရှိ အရေပြားပါ ဆယ်လ်မွန်အသားတုံး"),
        t("Pat the fillet dry and use only 1 spray of oil before cooking it skin-side down.", "切り身の水気を拭き、オイルスプレーは1回だけ使って皮目から焼きます。", "ဆယ်လ်မွန်အသားတုံးကို ရေခြောက်အောင်သုတ်ပြီး အရေပြားဘက်အောက်ထားမချက်မီ ဆီကို ၁ ခါသာ ဖြန်းပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Pan-fried", "フライパン焼き", "ဒယ်အိုးကြော်"),
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
