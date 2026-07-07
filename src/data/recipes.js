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
  recipe("oyakodon", 
    t("Oyakodon (Chicken & Egg Bowl)", "親子丼", "ကြက်သားဥဝိုင်းထမင်းသုပ်"), 
    [
      [t("Chicken thigh", "鶏もも肉", "ကြက်ပေါင်သား"), "150g", "chicken-thigh"], 
      [t("Onion", "玉ねぎ", "ကြက်သွန်နီ"), "1/2", "onion"], 
      [t("Eggs", "卵", "ကြက်ဥ"), "2", "eggs"],
      [t("Dashi stock", "だし汁", "ဒါရှီစွပ်ပြုတ်ရည်"), "60ml", "dashi"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "1 tbsp", "soy-sauce"],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "1 tbsp", "mirin"],
      [t("Sugar", "砂糖", "သကြား"), "1/2 tsp", "sugar"],
      [t("Steamed rice", "ご飯", "ချက်ပြီးသားထမင်း"), "1 bowl", "rice"]
    ], 
    [
      t("Slice the onion thinly and cut chicken thigh into bite-sized pieces.", "玉ねぎを薄切りにし、鶏もも肉を一口大に切ります。", "ကြက်သွန်နီကို ပါးပါးလှီးပြီး ကြက်ပေါင်သားကို တစ်လုပ်စာအတုံးလေးများ တုံးပါ။"), 
      t("In a small pan, combine dashi, soy sauce, mirin, and sugar. Bring to a simmer.", "小さなフライパンにだし汁、醤油、みりん、砂糖を入れて混ぜ、軽く煮立たせます。", "ဒယ်အိုးသေးတစ်ခုထဲတွင် ဒါရှီ၊ ပဲငံပြာရည်၊ ဂျပန်ချိုသာသောဝိုင်နှင့် သကြားတို့ကို ရောမွှေပြီး ဆူပွက်အောင် တည်ပါ။"), 
      t("Add onion and chicken, cover and cook for 5 minutes until chicken is cooked through.", "玉ねぎと鶏肉を加え、蓋をして鶏肉に火が通るまで約5分間煮ます。", "ကြက်သွန်နီနှင့် ကြက်သားကို ထည့်ပါ၊ အဖုံးအုပ်ပြီး ကြက်သားကျက်သည်အထိ ၅ မိနစ်ခန့် ချက်ပါ။"),
      t("Beat eggs lightly. Pour over the chicken and onion, cover, and cook for 1 minute until eggs are soft-set.", "卵を軽く溶きほぐし、全体に回し入れます。蓋をして卵が半熟になるまで約1分間加熱します。", "ကြက်ဥကို ဖွဖွခေါက်ပါ။ ကြက်သားနှင့် ကြက်သွန်နီပေါ်သို့ လောင်းထည့်ပါ၊ အဖုံးအုပ်ပြီး ကြက်ဥအနှစ် ပျော့ပျော့လေးဖြစ်သည်အထိ ၁ မိနစ်ခန့် ချက်ပါ။"),
      t("Slide carefully onto a bowl of hot steamed rice.", "温かいご飯を盛った丼の上に、崩さないようにスライドさせてのせます。", "ချက်ပြီးသား ထမင်းပူပူတစ်ပန်းကန်ပေါ်သို့ သေသေချာချာ ပုံလောင်းထည့်ပါ။")
    ], 
    t("Watch the eggs closely; they taste best when slightly runny and soft-set.", "卵の状態をよく確認してください。少し半熟でとろりとしているのが一番美味しいです。", "ကြက်ဥကို သေချာကြည့်ပါ၊ ကြက်ဥအနှစ် ပျော့ပျော့ပျောင်းပျောင်းဖြစ်နေချိန်တွင် အကောင်းဆုံးဖြစ်ပါသည်မို့ပါ။"),
    [
      photo("assets/recipes/human-food/oyakodon-main.jpg",
        t("Finished oyakodon in a bowl", "丼に盛られた出来上がりの親子丼", "ပန်းကန်လုံးထဲတွင် အဆင်သင့်ဖြစ်နေသော ကြက်သားဥဝိုင်းထမင်းသုပ်"),
        t("Savory chicken and egg over rice", "鶏肉と卵の美味しい親子丼", "အရသာရှိသော ကြက်သားနှင့် ကြက်ဥ ထမင်းသုပ်")),
      photo("assets/recipes/human-food/oyakodon-prep.jpg",
        t("Cooking oyakodon in a pan", "フライパンで親子丼を調理中", "ဒယ်အိုးထဲတွင် ကြက်သားဥဝိုင်းထမင်းသုပ် ချက်ပြုတ်နေပုံ"),
        t("Simmering the chicken, onion, and eggs", "鶏肉、玉ねぎ、卵を煮ています", "ကြက်သား၊ ကြက်သွန်နီနှင့် ကြက်ဥတို့ကို မီးအေးအေးဖြင့် တည်ထားခြင်း"))
    ],
    "human",
    {
      mealType: t("Lunch/Dinner", "昼食/夕食", "နေ့လယ်စာ/ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("15 mins", "15分", "၁၅ မိနစ်"),
      highProtein: true
    }
  ),
  recipe("nikujaga", 
    t("Nikujaga (Beef & Potato Stew)", "肉じゃが", "အမဲသားအာလူးစွပ်ပြုတ်"), 
    [
      [t("Thinly sliced beef", "牛薄切り肉", "အမဲသားပါးပါးလှီး"), "150g", "sliced-beef"], 
      [t("Potatoes", "じゃがいも", "အာလူး"), "2", "potatoes"], 
      [t("Onion", "玉ねぎ", "ကြက်သွန်နီ"), "1", "onion"],
      [t("Carrot", "にんじん", "မုန်လာဥနီ"), "1/2", "carrot"],
      [t("Dashi stock", "だし汁", "ဒါရှီစွပ်ပြုတ်ရည်"), "300ml", "dashi"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "2 tbsp", "soy-sauce"],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "2 tbsp", "mirin"],
      [t("Sugar", "砂糖", "သကြား"), "1 tbsp", "sugar"],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "1 tbsp", "oil"]
    ], 
    [
      t("Cut potatoes, carrots, and onions into bite-sized chunks. Cut beef into 2-inch wide strips.", "じゃがいも、にんじん、玉ねぎを一口大の大きさに切ります。牛肉は幅約5cmに切ります。", "အာလူး၊ မုန်လာဥနီနှင့် ကြက်သွန်နီတို့ကို တစ်လုပ်စာအရွယ် တုံးပါ။ အမဲသားကို ၅ စင်တီမီတာခန့် အရှည် ဖြတ်ပါ။"), 
      t("Heat oil in a pot. Sauté onions, potatoes, and carrots for 2-3 minutes.", "鍋に油を熱し、玉ねぎ、じゃがいも、にんじんを2〜3分間炒めます。", "အိုးထဲတွင် ဆီပူအောင်တည်ပါ။ ကြက်သွန်နီ၊ အာလူးနှင့် မုန်လာဥနီတို့ကို ၂-၃ မိနစ်ခန့် ဆီသတ်ပါ။"), 
      t("Add beef and sauté until the color changes. Pour in dashi stock, bring to a boil, and skim off any foam.", "牛肉を加えて色が変わるまで炒めます。だし汁を注ぎ、沸騰させてアクをすくい取ります。", "အမဲသားကို ထည့်ပြီး အရောင်ပြောင်းသည်အထိ ဆီသတ်ပါ။ ဒါရှီရည်ကို လောင်းထည့်ပါ، ဆူပွက်အောင်တည်ပြီး အမြှုပ်များကို ခပ်ထုတ်ပါ။"),
      t("Add sugar, mirin, and soy sauce. Cover with a drop-lid (otoshibuta) and simmer on medium-low for 15-20 minutes until potatoes are soft.", "砂糖、みりん、醤油を加えます。落とし蓋をして、中火から弱火でじゃがいもが柔らかくなるまで15〜20分間煮込みます。", "သကြား၊ ဂျပန်ချိုသာသောဝိုင်နှင့် ပဲငံပြာရည်တို့ကို ထည့်ပါ။ အဖုံးအုပ်ပြီး အလယ်အလတ်မီးအေးအေးဖြင့် အာလူးများနူးသွားသည်အထိ ၁၅-၂၀ မိနစ်ခန့် တည်ပါ။"),
      t("Remove the lid, turn up the heat slightly, and cook for another few minutes to reduce the sauce. Let cool slightly to absorb flavors before serving.", "蓋を外し、火を少し強めて余分な水分を飛ばします。少し冷ますことで味がより染み込みます。", "အဖုံးကိုဖွင့်၊ မီးအနည်းငယ်မြှင့်ပြီး အရည်ခမ်းအောင် တည်ပါ။ အရသာပိုဝင်စေရန် မသုံးဆောင်မီ ခဏအေးအောင် ထားပါ။")
    ], 
    t("Letting nikujaga sit for a bit after cooking allows the seasoning to penetrate the potatoes.", "調理後にしばらく置くことで、じゃがいもに味がしっかりと染み込みます。", "ချက်ပြုတ်ပြီးနောက် ခဏထားခြင်းက အရသာကို အာလူးထဲသို့ ပိုမိုစိမ့်ဝင်စေပါသည်။"),
    [
      photo("assets/recipes/human-food/nikujaga-main.jpg",
        t("Finished beef and potato stew", "出来上がりの肉じゃが", "ချက်ပြုတ်ပြီးစီးသွားသော အမဲသားအာလူးစွပ်ပြုတ်"),
        t("Nikujaga main dish", "肉じゃがのメイン料理", "အမဲသားအာလူးစွပ်ပြုတ် အဓိကဟင်းလျာ")),
      photo("assets/recipes/human-food/nikujaga-prep.jpg",
        t("Cooking nikujaga ingredients", "肉じゃがの食材を調理中", "အမဲသားအာလူးစွပ်ပြုတ် ချက်ပြုတ်နေပုံ"),
        t("Simmering potatoes, meat, and carrots in dashi", "だし汁でじゃがいも、肉、にんじんを煮ています", "ဒါရှီစွပ်ပြုတ်ရည်ဖြင့် အာလူး၊ အသားနှင့် မုန်လာဥနီတို့ကို တည်နေပုံ"))
    ],
    "human",
    {
      mealType: t("Dinner", "夕食", "ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("30 mins", "30分", "၃၀ မိနစ်"),
      highProtein: true
    }
  ),
  recipe("miso-salmon", 
    t("Miso Glazed Salmon", "鮭の味噌焼き", "ဆယ်လ်မွန်ငါး မစ်ဆိုကင်"), 
    [
      [t("Salmon fillets", "鮭の切り身", "ဆယ်လ်မွန်ငါးအသားလွှာ"), "2", "salmon-filter"], 
      [t("Miso paste", "味噌", "မစ်ဆိုအနှစ်"), "2 tbsp", "miso"], 
      [t("Sake", "酒", "ဂျပန်အရက် (ဆာကေး)"), "1 tbsp", "sake"],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "1 tbsp", "mirin"],
      [t("Sugar", "砂糖", "သကြား"), "1 tsp", "sugar"],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "1/2 tbsp", "oil"]
    ], 
    [
      t("In a small bowl, mix miso, sake, mirin, and sugar until smooth.", "小さなボウルに味噌、酒、みりん、砂糖を入れて滑らかになるまでよく混ぜ合わせます。", "ဇလုံအသေးတစ်ခုထဲတွင် မစ်ဆိုအနှစ်၊ ဆာကေး၊ ဂျပန်ချိုသာသောဝိုင်နှင့် သကြားတို့ကို သမအောင် မွှေပါ။"), 
      t("Pat salmon fillets dry with paper towels. Spread the miso mixture evenly over both sides of the salmon.", "鮭の切り身の水分をキッチンペーパーで拭き取ります。味噌ダレを鮭の両面に均等に塗ります。", "ဆယ်လ်မွန်ငါးများကို စက္ကူတစ်ရှူးဖြင့် ခြောက်အောင်သုတ်ပါ။ မစ်ဆိုအရောကို ငါး၏တစ်ဖက်စီတွင် ညီညာစွာ သုတ်လိမ်းပါ။"), 
      t("Let marinate in the fridge for 30 minutes (or up to overnight). Wipe off excess marinade gently before cooking to prevent burning.", "冷蔵庫で30分間（または一晩）マリネします。焦げ付きを防ぐため、焼く前に余分な味噌を軽く拭き取ります。", "ရေခဲသေတ္တာထဲတွင် မိနစ် ၃၀ ခန့် (သို့မဟုတ် တစ်ညလုံး) နှပ်ထားပါ။ မကျွမ်းစေရန် မကင်မီ ပိုနေသော မစ်ဆိုများကို ဖွဖွသုတ်ထုတ်ပါ။"),
      t("Heat oil in a pan over medium-low heat. Cook salmon for 3-4 minutes on one side until lightly browned.", "フライパンに油をひき、中火から弱火で熱します。鮭を片面3〜4分感、軽く焼き色がつくまで焼きます。", "ဒယ်အိုးထဲတွင် ဆီကို အလယ်အလတ်မီးအေးအေးဖြင့် ပူအောင်တည်ပါ။ ဆယ်လ်မွန်ငါးကို တစ်ဖက်လျှင် ၃-၄ မိနစ်ခန့် ရွှေဝါရောင်သန်းသည်အထိ ကင်ပါ။"),
      t("Flip and cook the other side for 3 minutes. Cover and cook for another 1-2 minutes until cooked through.", "ひっくり返してもう片面を3分間焼きます。蓋をしてさらに1〜2分間加熱し、中まで火を通します。", "အခြားတစ်ဖက်သို့လှန်ပြီး ၃ မိနစ်ခန့် ကင်ပါ။ အဖုံးအုပ်ပြီး ငါးကျက်သည်အထိ နောက်ထပ် ၁-၂ မိနစ်ခန့် ချက်ပါ။")
    ], 
    t("Miso burns very easily. Keep the heat low and watch closely while pan-frying.", "味噌は非常に焦げやすいです。焼くときは弱火に保ち、目を離さないようにしてください。", "မစ်ဆိုသည် အလွန်ကျွမ်းလွယ်ပါသည်။ ကင်စဉ်အတွင်း မီးအေးအေးထားပြီး သေက်ာစောင့်ကြည့်ပါ။"),
    [
      photo("assets/recipes/human-food/miso-salmon-main.jpg",
        t("Finished miso glazed salmon fillet", "出来上がりの鮭の味噌焼き", "ဆယ်လ်မွန်ငါး မစ်ဆိုကင် အဆင်သင့်ဖြစ်နေပုံ"),
        t("Miso glazed salmon main dish", "鮭の味噌焼きのメイン料理", "ဆယ်လ်မွန်ငါး မစ်ဆိုကင် အဓိကဟင်းလျာ")),
      photo("assets/recipes/human-food/miso-salmon-prep.jpg",
        t("Serving the miso salmon in a bento box with rice", "ご飯と一緒にお弁当箱に鮭の味噌焼きを盛り付けます", "ထမင်းနှင့်အတူ ဆယ်လ်မွန်ငါး မစ်ဆိုကင်ကို ထမင်းဗူးထဲ ထည့်ပြင်ဆင်ပုံ"),
        t("Miso salmon bento prep", "鮭の味噌焼き弁当の準備", "ဆယ်လ်မွန်ငါး မစ်ဆိုကင် ထမင်းဗူးပြင်ဆင်ခြင်း"))
    ],
    "human",
    {
      mealType: t("Dinner", "夕食", "ညစာ"),
      style: t("Japanese", "和食", "ဂျပန်စတိုင်"),
      timeEstimate: t("45 mins", "45分", "၄၅ မိနစ်"),
      highProtein: true
    }
  ),
  recipe("chicken-teriyaki-rice",
    t("Chicken Teriyaki Rice Bowl", "鶏の照り焼き丼", "ကြက်သား ထရီယာကီ ထမင်းသုပ်"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "180g", "rice"],
      [t("Skinless chicken breast", "鶏むね肉（皮なし）", "အရေပြားမပါသော ကြက်ရင်ပုံသား"), "220g", "chicken-breast"],
      [t("Broccoli", "ブロッコリー", "ပန်းဂေါ်ဖီစိမ်း"), "80g", "broccoli"],
      [t("Carrot", "にんじん", "မုန်လာဥနီ"), "50g", "carrot"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "18g", "soy-sauce"],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "18g", "mirin"],
      [t("Sake or water", "酒または水", "ဆာကေး သို့မဟုတ် ရေ"), "18g", "sake"],
      [t("Sugar", "砂糖", "သကြား"), "4g", "sugar"],
      [t("Grated ginger", "おろし生姜", "ချင်းခြစ်"), "5g", "ginger"],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "5g", "oil"],
      [t("White sesame seeds", "白ごま", "နှမ်းဖြူ"), "2g", "sesame"]
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
      highProtein: true
    }
  ),
  recipe("salmon-shioyaki-set",
    t("Salmon Shioyaki Protein Set", "鮭の塩焼き定食", "ဆယ်လ်မွန်ငါး ဆားကင် ပရိုတင်းအစုံ"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "160g", "rice"],
      [t("Salmon fillet", "鮭の切り身", "ဆယ်လ်မွန်ငါးအသားလွှာ"), "180g", "salmon-fillet"],
      [t("Salt", "塩", "ဆား"), "2g", "salt"],
      [t("Egg", "卵", "ကြက်ဥ"), "100g", "eggs"],
      [t("Spinach", "ほうれん草", "ဟင်းနွယ်စိမ်း"), "80g", "spinach"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "8g", "soy-sauce"],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "3g", "oil"],
      [t("Lemon wedge", "レモンくし切り", "ရှောက်သီးလွှာ"), "15g", "lemon"]
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
      highProtein: true
    }
  ),
  recipe("pork-shogayaki-no-onion",
    t("Pork Shogayaki (No Onion)", "豚の生姜焼き（玉ねぎなし）", "ဝက်သား ချင်းကြော် (ကြက်သွန်မပါ)"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "170g", "rice"],
      [t("Lean pork slices", "豚薄切り肉（脂身の少ないもの）", "အဆီနည်းသော ဝက်သားပါးပါးလှီး"), "220g", "pork"],
      [t("Cabbage", "キャベツ", "ဂေါ်ဖီထုပ်"), "120g", "cabbage"],
      [t("Grated ginger", "おろし生姜", "ချင်းခြစ်"), "10g", "ginger"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "20g", "soy-sauce"],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "18g", "mirin"],
      [t("Sake or water", "酒または水", "ဆာကေး သို့မဟုတ် ရေ"), "18g", "sake"],
      [t("Sugar", "砂糖", "သကြား"), "3g", "sugar"],
      [t("Cooking oil", "サラダ油", "ဟင်းချက်ဆီ"), "5g", "oil"]
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
      highProtein: true
    }
  ),
  recipe("chicken-oyakodon-no-onion",
    t("Chicken Oyakodon (No Onion)", "親子丼（玉ねぎなし）", "ကြက်သားဥဝိုင်းထမင်းသုပ် (ကြက်သွန်မပါ)"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "180g", "rice"],
      [t("Skinless chicken thigh or breast", "鶏もも肉または鶏むね肉（皮なし）", "ကြက်ပေါင်သား သို့မဟုတ် ကြက်ရင်ပုံသား (အရေပြားမပါ)"), "200g", "chicken-thigh"],
      [t("Egg", "卵", "ကြက်ဥ"), "100g", "eggs"],
      [t("Shimeji or button mushroom", "しめじまたはマッシュルーム", "ရှီမဲဂျီ သို့မဟုတ် မှို"), "70g", "mushroom"],
      [t("Napa cabbage", "白菜", "မုန်ညင်းဖြူ"), "70g", "napa-cabbage"],
      [t("Dashi or water", "だし汁または水", "ဒါရှီ သို့မဟုတ် ရေ"), "100g", "dashi"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "18g", "soy-sauce"],
      [t("Mirin", "みりん", "ဂျပန်ချိုသာသောဝိုင်"), "18g", "mirin"],
      [t("Sugar", "砂糖", "သကြား"), "3g", "sugar"]
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
      highProtein: true
    }
  ),
  recipe("tuna-tofu-egg-rice",
    t("Tuna Tofu Egg Rice Bowl", "ツナ豆腐卵丼", "ငါးတူနာ ပဲပိစပ် ကြက်ဥ ထမင်းသုပ်"),
    [
      [t("Cooked Japanese rice", "ご飯", "ချက်ပြီးသားထမင်း"), "160g", "rice"],
      [t("Canned tuna in water, drained", "ツナ缶（水煮、水切り済み）", "ရေနှင့်ထည့်ထားသော ငါးတူနာအံဘူး (ရေစစ်ပြီး)"), "120g", "tuna"],
      [t("Firm tofu", "木綿豆腐", "တိုဖူးမာ"), "150g", "tofu"],
      [t("Egg", "卵", "ကြက်ဥ"), "100g", "eggs"],
      [t("Cucumber", "きゅうり", "သခွားသီး"), "80g", "cucumber"],
      [t("Soy sauce", "醤油", "ပဲငံပြာရည်"), "12g", "soy-sauce"],
      [t("Sesame oil", "ごま油", "နှမ်းဆီ"), "4g", "sesame-oil"],
      [t("Rice vinegar", "米酢", "ထမင်းရည်ချဉ်"), "8g", "vinegar"],
      [t("White sesame seeds", "白ごま", "နှမ်းဖြူ"), "2g", "sesame"]
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
      highProtein: true
    }
  )
];
