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
  ),
  recipe("banana-toast",
    t("Banana Toast", "バナナトースト", "ငှက်ပျောသီးပေါင်မုန့်ကင်"),
    [
      [t("Bread", "パン", "ပေါင်မုန့်"), "1 slice", "bread"],
      [t("Peanut butter", "ピーナッツバター", "မြေပဲထောပတ်"), "as needed", "peanut-butter"],
      [t("Strawberry jam", "いちごジャム", "စတော်ဘယ်ရီယို"), "as needed", "strawberry-jam"],
      [t("Banana", "バナナ", "ငှက်ပျောသီး"), "1 banana", "banana"]
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
      [t("Bread", "パン", "ပေါင်မုန့်"), "1 slice", "bread"],
      [t("Egg", "卵", "ကြက်ဥ"), "1 egg", "eggs"],
      [t("Mayonnaise", "マヨネーズ", "မေယိုနိစ်"), "to taste", "mayonnaise"],
      [t("Salt", "塩", "ဆား"), "to taste", "salt"]
    ],
    [
      t("Boil the egg in water for 10 minutes to make a hard-boiled egg, then peel it.", "卵をお湯で10分ゆでてゆで卵を作り、殻をむく。", "ကြက်ဥကို ရေနွေးထဲတွင် ၁၀ မိနစ်ပြုတ်ပြီး ကြက်ဥပြုတ်လုပ်ကာ အခွံခွာပါ။"),
      t("Add mayonnaise and salt, then mix well.", "マヨネーズと塩を加えてよく混ぜる。", "mayonnaise နှင့် ဆားထည့်ပြီး ကောင်းကောင်းရောပါ။"),
      t("Place the egg mixture on the toast.", "卵のミックスをトーストの上にのせる。", "ကြက်ဥအရောကို toast ပေါ်တွင် တင်ပါ။"),
      t("Put it in the air fryer and cook at 190°C for 4 minutes.", "エアフライヤーに入れ、190℃で4分加熱する。", "air fryer ထဲထည့်ပြီး 190°C ဖြင့် 4 မိနစ် အပူပေးပါ။")
    ],
    t("Boil the egg for 10 minutes and air-fry at 190°C for 4 minutes. Be careful with boiling water and the hot air-fryer basket.", "卵は10分ゆで、エアフライヤーは190℃で4分。熱湯と熱いバスケットに注意する。", "ကြက်ဥကို ၁၀ မိနစ်ပြုတ်ပြီး air fryer ကို 190°C ဖြင့် 4 မိနစ်ထားပါ။ ရေနွေးပူနှင့် ပူသော air-fryer basket ကို သတိထားပါ။"),
    [
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
        t("Put the egg mixture on toast, then air-fry at 190°C for 4 minutes.", "卵のミックスをトーストにのせ、190℃で4分エアフライする。", "ကြက်ဥအရောကို toast ပေါ်တင်ပြီး 190°C ဖြင့် 4 မိနစ် air fry လုပ်ပါ။")),
      photo("assets/recipes/human-food/egg-toast-served.jpg",
        t("Egg toast ready to serve", "提供準備ができた卵トースト", "ပေးရန်အဆင်သင့်ဖြစ်သော ကြက်ဥ toast"),
        t("Serve the egg toast once it is hot and ready.", "温かいうちに、完成した卵トーストを提供する。", "ပူပူနွေးနွေးဖြစ်နေစဉ် အဆင်သင့်ဖြစ်သော ကြက်ဥ toast ကို ပေးပါ။"))
    ],
    "human",
    {
      mealType: t("Breakfast/Snack", "朝食／軽食", "မနက်စာ / snack"),
      style: t("Quick", "簡単", "လွယ်ကူသော"),
      timeEstimate: t("14 mins", "14分", "၁၄ မိနစ်"),
      highProtein: false
    }
  )
];


// Global Translation Reconciliation Check Function
