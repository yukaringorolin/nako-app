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
  )
];
