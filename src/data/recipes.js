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
      [t("Plain chicken, fully cooked", "味付けなしで十分に加熱した鶏肉", "အရသာမထည့်ဘဲ ကျက်အောင်ချက်ထားသော ကြက်သား"), "—", "chicken-breast"],
      [t("Carrot", "にんじん", "မုန်လာဥနီ"), "—", "carrot"],
      [t("Cabbage", "キャベツ", "ဂေါ်ဖီထုပ်"), "—", "napa-cabbage"],
      [t("Apple, core and seeds removed", "芯と種を除いたりんご", "အူတိုင်နှင့် အစေ့များ ဖယ်ထားသော ပန်းသီး"), "—", "apple"],
      [t("Store-bought shimeji mushroom (optional; only if approved)", "市販のしめじ（任可されている場合のみ・任意）", "ဆိုင်မှဝယ်သော ရှိမေဂျီမှို (ခွင့်ပြုထားမှသာ၊ မထည့်လည်းရသည်)"), "—", "shimeji-mushroom"],
      [t("Water", "水", "ရေ"), "—", "water"]
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
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်"),
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
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်"),
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
      highProtein: true
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
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်"),
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
      demoStatus: t("Pending demo", "実演待ち", "လက်တွေ့ပြသရန် စောင့်ဆိုင်းနေသည်"),
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
    [],
    "human",
    {
      mealType: t("Breakfast/Snack", "朝食／軽食", "မနက်စာ / snack"),
      style: t("Quick", "簡単", "လွယ်ကူသော"),
      timeEstimate: t("4 mins", "4分", "၄ မိနစ်"),
      highProtein: false
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
    [],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Air Fryer", "エアフライヤー", "လေပူကြော်စက်"),
      timeEstimate: t("50-80 mins", "50〜80分", "မိနစ် ၅၀-၈၀"),
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
        t("Use the section marked ‘Bak Kut Teh’ when buying pork ribs for this recipe. Ask the butcher if unsure.", "このレシピの豚スペアリブを買う時は「Bak Kut Teh」と印を付けた部分を選び、不明な場合は肉屋に確認します。", "ဤဟင်းအတွက် ဝက်နံရိုးဝယ်သည့်အခါ ‘Bak Kut Teh’ ဟု အမှတ်အသားပြထားသော အပိုင်းကို ရွေးပါ။ မသေချာပါက အသားဆိုင်ကို မေးပါ။"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食／夕食", "နေ့လယ်စာ / ညစာ"),
      style: t("Singaporean", "シンガポール料理", "စင်္ကာပူစတိုင်"),
      timeEstimate: t("45 mins", "45分", "၄၅ မိနစ်"),
      highProtein: false
    }
  )
];

recipes.sort((a, b) => Number(Boolean(a.demoStatus)) - Number(Boolean(b.demoStatus)));


// Global Translation Reconciliation Check Function
