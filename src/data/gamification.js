const gamificationData = (() => {
  const tx = (en, jp, mm) => t(en, jp, mm);
  const labels = {
    title: tx("Nako Says Thank You", "ナコからありがとう", "Nako က ကျေးဇူးတင်ပါတယ်"),
    thisWeek: tx("This Week with Nako", "ナコと今週", "Nako နဲ့ ဒီအပတ်"),
    weekIntro: tx("Little moments of care recorded this week.", "今週記録された、小さなお世話の時間です。", "ဒီအပတ်မှာ မှတ်တမ်းတင်ထားတဲ့ ဂရုစိုက်မှုလေးတွေပါ။"),
    postcards: tx("Nako Postcards", "ナコのポストカード", "Nako ပို့စကတ်များ"),
    postcardCount: tx("{count} postcards", "ポストカード {count}枚", "ပို့စကတ် {count} ခု"),
    albumIntro: tx("Every postcard is a permanent thank-you from Nako.", "どのカードも、ナコからのずっと残る「ありがとう」です。", "ပို့စကတ်တိုင်းက Nako ဆီက အမြဲသိမ်းထားနိုင်တဲ့ ကျေးဇူးတင်စကားပါ။"),
    futureMemory: tx("A new Nako memory will appear here.", "ここに新しいナコの思い出が増えていきます。", "ဒီနေရာမှာ Nako ရဲ့ အမှတ်တရအသစ်တစ်ခု ပေါ်လာပါမယ်။"),
    routines: tx("Routines", "ルーティン", "ပုံမှန်အလုပ်များ"),
    trainingPlay: tx("Training & play", "トレーニング・遊び", "လေ့ကျင့်ရေးနှင့် ကစားချိန်"),
    health: tx("Nako health", "ナコの健康", "Nako ကျန်းမာရေး"),
    diary: tx("Diary", "日記", "နေ့စဉ်မှတ်တမ်း"),
    fourPaws: tx("Four kinds of care shared this week. Thank you.", "今週は4つの形でお世話を記録できました。ありがとう。", "ဒီအပတ်မှာ ဂရုစိုက်မှု လေးမျိုးလုံးကို မှတ်တမ်းတင်ထားပါတယ်။ ကျေးဇူးတင်ပါတယ်။"),
    close: tx("Close", "閉じる", "ပိတ်ရန်"),
    imageFallback: tx("Nako illustration", "ナコのイラスト", "Nako ပုံလေး"),
    albumReady: tx("Your Nako postcard album is ready.", "ナコのポストカードアルバムができました。", "Nako ပို့စကတ်အယ်လ်ဘမ် အဆင်သင့်ဖြစ်ပါပြီ။"),
    newPostcard: tx("New Nako postcard: {title}", "新しいナコのポストカード：{title}", "Nako ပို့စကတ်အသစ် ရပါပြီ — {title}"),
    praiseRoutine: tx("Nako says thank you for caring for our home.", "おうちを大切にしてくれて、ナコからありがとう。", "အိမ်ကို ဂရုစိုက်ပေးလို့ Nako က ကျေးဇူးတင်ပါတယ်။"),
    praiseTraining: tx("Lovely practice with Nako today!", "今日もナコとやさしく練習できました！", "ဒီနေ့ Nako နဲ့ နူးနူးညံ့ညံ့ လေ့ကျင့်ပေးတာ ကောင်းပါတယ်။"),
    praiseTrainingBest: tx("A new personal best for {command}. Wonderful practice!", "{command}の自己ベスト更新。すてきな練習でした！", "{command} အတွက် အကောင်းဆုံးရလဒ်အသစ် ရပါပြီ။ လေ့ကျင့်ပေးတာ အရမ်းကောင်းပါတယ်။"),
    praisePlay: tx("Nako loved that playtime. Thank you!", "ナコとの楽しい遊び時間、ありがとう！", "Nako နဲ့ ပျော်ပျော်ရွှင်ရွှင် ကစားပေးလို့ ကျေးဇူးတင်ပါတယ်။"),
    praiseHealth: tx("Thank you for checking in on Nako.", "ナコの様子を記録してくれて、ありがとう。", "Nako ရဲ့ အခြေအနေကို မှတ်တမ်းတင်ပေးလို့ ကျေးဇူးတင်ပါတယ်။"),
    praiseDiary: tx("Thank you for sharing today's diary.", "今日の日記を書いてくれて、ありがとう。", "ဒီနေ့မှတ်တမ်းကို ရေးပေးလို့ ကျေးဇူးတင်ပါတယ်။")
  };

  Object.assign(labels, {
    taskAppetite: tx("Appetite check-in", "食欲のチェック", "အစာစားချင်စိတ် စစ်ဆေးမှု"),
    taskWeight: tx("Weight check-in", "体重のチェック", "ကိုယ်အလေးချိန် စစ်ဆေးမှု"),
    taskDiary: tx("Diary & Feedback", "日記・フィードバック", "နေ့စဉ်မှတ်တမ်းနှင့် အကြံပြုချက်")
  });

  const toastFamilies = [
    {
      id: "sparkling-surfaces",
      image: "assets/gamification/toast-icons/sparkling-surfaces.webp",
      motion: "sparkle",
      praise: tx("Everything feels brighter. Nako says thank you!", "すっきり明るくなりました。ナコからありがとう！", "အားလုံး ပိုတောက်ပသွားပြီ။ Nako က ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "bubbly-washing",
      image: "assets/gamification/toast-icons/bubbly-washing.webp",
      motion: "bubbles",
      praise: tx("Fresh and clean—Nako noticed your lovely care!", "さっぱりきれいになりました。やさしいお手入れを、ナコからありがとう！", "သန့်ရှင်းလတ်ဆတ်သွားပြီ။ ဂရုစိုက်ပေးတာကို Nako သတိထားမိပါတယ်။")
    },
    {
      id: "cozy-laundry",
      image: "assets/gamification/toast-icons/cozy-laundry.webp",
      motion: "cozy",
      praise: tx("Soft, fresh, and cozy. Thank you from Nako!", "ふんわり清潔で、もっと心地よくなりました。ナコからありがとう！", "နူးညံ့၊ သန့်ရှင်းပြီး နွေးထွေးနေပြီ။ Nako က ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "nako-nook",
      image: "assets/gamification/toast-icons/nako-nook.webp",
      motion: "bounce",
      praise: tx("Nako's little space feels fresh and comfy. Thank you!", "ナコの小さな場所が、きれいで心地よくなりました。ありがとう！", "Nako ရဲ့ နေရာလေး သန့်ရှင်းပြီး သက်သောင့်သက်သာ ဖြစ်သွားပြီ။ ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "health-heart",
      image: "assets/gamification/toast-icons/health-heart.webp",
      motion: "heartbeat",
      praise: labels.praiseHealth
    },
    {
      id: "fresh-air",
      image: "assets/gamification/toast-icons/fresh-air.webp",
      motion: "sway",
      praise: tx("The home feels fresh and comfortable. Nako says thank you!", "おうちがさわやかで心地よくなりました。ナコからありがとう！", "အိမ်က လတ်ဆတ်ပြီး သက်သောင့်သက်သာ ဖြစ်နေပြီ။ Nako က ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "kitchen-sparkle",
      image: "assets/gamification/toast-icons/kitchen-sparkle.webp",
      motion: "shine",
      praise: tx("Clean and ready for the next little moment. Thank you!", "きれいになって、次のひとときの準備もできました。ありがとう！", "သန့်ရှင်းပြီး နောက်တစ်ကြိမ်အသုံးပြုဖို့ အဆင်သင့်ဖြစ်နေပြီ။ ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "cozy-bedroom",
      image: "assets/gamification/toast-icons/cozy-bedroom.webp",
      motion: "breathe",
      praise: tx("A cozy resting place is a lovely gift. Nako says thank you!", "心地よく休める場所は、すてきな贈りものです。ナコからありがとう！", "နားနေရာလေးကို သက်သောင့်သက်သာ ဖြစ်အောင်လုပ်ပေးတာ ချစ်စရာလက်ဆောင်ပါ။ Nako က ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "safe-home",
      image: "assets/gamification/toast-icons/safe-home.webp",
      motion: "pop",
      praise: tx("Thank you for helping keep our home safe.", "おうちの安全を守ってくれて、ありがとう。", "အိမ်ကို လုံခြုံအောင် ကူညီပေးလို့ ကျေးဇူးတင်ပါတယ်။")
    },
    {
      id: "gentle-training",
      image: "assets/gamification/toast-icons/gentle-training.webp",
      motion: "tilt",
      praise: labels.praiseTraining
    },
    {
      id: "purple-play",
      image: "assets/gamification/toast-icons/purple-play.webp",
      motion: "hop",
      praise: labels.praisePlay
    },
    {
      id: "diary-flower",
      image: "assets/gamification/toast-icons/diary-flower.webp",
      motion: "page",
      praise: labels.praiseDiary
    }
  ];

  const routineToastFamilyByTaskId = {
    "high-touch-surfaces": "sparkling-surfaces",
    "general-surface-cleaning": "sparkling-surfaces",
    "windows-glass-mirrors": "sparkling-surfaces",
    "kitchen-sink-drain-rack-counter": "bubbly-washing",
    "rubbish": "bubbly-washing",
    "rubbish-bin-washing": "bubbly-washing",
    "cleaning-tools": "bubbly-washing",
    "floor-mats": "cozy-laundry",
    "bedrooms-linens": "cozy-laundry",
    "sofa-covers-pillows": "cozy-laundry",
    "blanket-washing": "cozy-laundry",
    "curtain-steaming": "cozy-laundry",
    "washer-deep-clean": "cozy-laundry",
    "nako-weekly-play-pen-deep-clean": "nako-nook",
    "nako-weight-tracking": "health-heart",
    "ceiling-fan": "fresh-air",
    "aircon-filter-fan-coil": "fresh-air",
    "fridge-interior": "kitchen-sparkle",
    "ninja-af141-air-fryer-interior-deep-clean": "kitchen-sparkle",
    "fujioh-hood-deep-clean": "kitchen-sparkle",
    "coffee-machine-descaling": "kitchen-sparkle",
    "ikea-bed-frame": "cozy-bedroom",
    "pillow-mattress-vacuuming": "cozy-bedroom",
    "doorbell-charging": "safe-home",
    "fire-extinguisher-training": "safe-home"
  };

  const postcards = [
    {
      id: "nako-hello",
      image: "assets/gamification/postcards/nako-hello.webp",
      title: tx("Hello from Nako", "ナコからこんにちは", "Nako ဆီက မင်္ဂလာပါ"),
      description: tx("A little hello and a heart just for you.", "小さなあいさつとハートをあなたへ。", "သင့်အတွက် နှုတ်ဆက်စကားလေးနဲ့ နှလုံးသားလေးပါ။"),
      alt: tx("Watercolor Nako waving beside a heart envelope", "ハートの封筒のそばで手を振るナコの水彩画", "နှလုံးပုံစာအိတ်ဘေးမှာ လက်လှမ်းနှုတ်ဆက်နေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "routine-sparkle",
      image: "assets/gamification/postcards/routine-sparkle.webp",
      title: tx("A Caring Home", "大切にされるおうち", "ဂရုစိုက်ထားတဲ့ အိမ်"),
      description: tx("Small routines help Nako feel safe and cozy.", "小さなルーティンが、ナコの安心につながります。", "ပုံမှန်အလုပ်လေးတွေက Nako ကို လုံခြုံပြီး သက်သောင့်သက်သာ ရှိစေပါတယ်။"),
      alt: tx("Watercolor Nako beside a tidy pink care basket", "整ったピンクのお世話バスケットの横にいるナコの水彩画", "သပ်သပ်ရပ်ရပ် ပန်းရောင်ဂရုစိုက်ရေးခြင်းဘေးမှာ ရှိနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "training-paw",
      image: "assets/gamification/postcards/training-paw.webp",
      title: tx("Gentle Practice", "やさしい練習", "နူးညံ့တဲ့ လေ့ကျင့်ချိန်"),
      description: tx("Kind practice builds trust one paw at a time.", "やさしい練習が、少しずつ信頼を育てます。", "နူးညံ့စွာ လေ့ကျင့်ပေးခြင်းက ယုံကြည်မှုကို တဖြည်းဖြည်း တိုးစေပါတယ်။"),
      alt: tx("Watercolor Nako happily offering one paw", "うれしそうに前足を差し出すナコの水彩画", "ရှေ့ခြေတစ်ဖက်ကို ပျော်ပျော်ရွှင်ရွှင် ပေးနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "purple-playtime",
      image: "assets/gamification/postcards/purple-playtime.webp",
      title: tx("Purple Playtime", "むらさきのお遊びタイム", "ခရမ်းရောင် ကစားချိန်"),
      description: tx("A playful moment makes Nako's day brighter.", "楽しいひとときで、ナコの一日がもっと明るくなります。", "ပျော်စရာကစားချိန်လေးက Nako ရဲ့နေ့ကို ပိုရွှင်လန်းစေပါတယ်။"),
      alt: tx("Watercolor Nako playing with a small purple toy", "小さなむらさきのおもちゃで遊ぶナコの水彩画", "ခရမ်းရောင်အရုပ်လေးနဲ့ ကစားနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "health-heart",
      image: "assets/gamification/postcards/health-heart.webp",
      title: tx("A Thoughtful Check-in", "やさしい健康チェック", "ဂရုတစိုက် စစ်ဆေးမှု"),
      description: tx("Noticing and recording is a loving kind of care.", "気づいて記録することも、大切なお世話です。", "သတိထားပြီး မှတ်တမ်းတင်ပေးတာကလည်း ချစ်ခင်စွာ ဂရုစိုက်ခြင်းပါ။"),
      alt: tx("Watercolor Nako beside a notebook marked with a heart", "ハートのついたノートの横にいるナコの水彩画", "နှလုံးပုံပါတဲ့ မှတ်စုစာအုပ်ဘေးမှာ ရှိနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "diary-flower",
      image: "assets/gamification/postcards/diary-flower.webp",
      title: tx("Today's Little Memory", "今日の小さな思い出", "ဒီနေ့ရဲ့ အမှတ်တရလေး"),
      description: tx("Every shared thought becomes part of Nako's home story.", "書いてくれた言葉も、ナコのおうちの物語になります。", "မျှဝေပေးတဲ့ အတွေးတိုင်းက Nako အိမ်ရဲ့ ဇာတ်လမ်းတစ်ပိုင်း ဖြစ်လာပါတယ်။"),
      alt: tx("Watercolor Nako beside an open diary and a small flower", "開いた日記と小さな花の横にいるナコの水彩画", "ဖွင့်ထားတဲ့နေ့စဉ်မှတ်တမ်းနဲ့ ပန်းလေးဘေးမှာ ရှိနေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "four-care-paws",
      image: "assets/gamification/postcards/four-care-paws.webp",
      title: tx("Four Caring Paws", "4つのお世話の足あと", "ဂရုစိုက်မှု ခြေရာလေးခု"),
      description: tx("Many different moments came together for Nako.", "いろいろなお世話の時間が、ナコのためにつながりました。", "ဂရုစိုက်မှုအမျိုးမျိုးက Nako အတွက် အတူတကွ ပြည့်စုံလာပါတယ်။"),
      alt: tx("Watercolor Nako surrounded by four colorful pawprints", "4色の足あとに囲まれたナコの水彩画", "အရောင်စုံခြေရာလေးခု ဝန်းရံထားတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "cozy-three",
      image: "assets/gamification/postcards/cozy-three.webp",
      title: tx("Cozy Nako", "ぬくぬくナコ", "နွေးနွေးထွေးထွေး Nako"),
      description: tx("A few caring days make home feel extra cozy.", "お世話の日々が、おうちをもっと心地よくします。", "ဂရုစိုက်ပေးတဲ့ နေ့လေးတွေက အိမ်ကို ပိုနွေးထွေးစေပါတယ်။"),
      alt: tx("Watercolor Nako sleeping under a soft pink blanket", "やわらかなピンクの毛布で眠るナコの水彩画", "ပန်းရောင်စောင်နုနုအောက်မှာ အိပ်နေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "sunny-seven",
      image: "assets/gamification/postcards/sunny-seven.webp",
      title: tx("Sunny Nako Days", "ナコの晴れやかな日々", "Nako ရဲ့ နေသာတဲ့နေ့များ"),
      description: tx("Care grows quietly, like plants in the sunshine.", "お世話は、日なたの植物のように静かに育ちます。", "ဂရုစိုက်မှုက နေရောင်အောက်က အပင်လေးတွေလို တိတ်တိတ်လေး ကြီးထွားလာပါတယ်။"),
      alt: tx("Watercolor Nako among sunny tropical balcony plants", "明るいベランダの南国植物に囲まれたナコの水彩画", "နေရောင်လင်းတဲ့ လသာဆောင်အပင်တွေကြားက Nako ရေဆေးပန်းချီ")
    },
    {
      id: "rain-or-shine",
      image: "assets/gamification/postcards/rain-or-shine.webp",
      title: tx("Rain or Shine", "雨の日も晴れの日も", "မိုးရွာရွာ နေပူပူ"),
      description: tx("Kind care matters on every kind of day.", "どんな日にも、やさしいお世話は大切です。", "ဘယ်လိုနေ့မျိုးမှာမဆို နူးညံ့စွာ ဂရုစိုက်ပေးတာ အရေးကြီးပါတယ်။"),
      alt: tx("Watercolor Nako by a rainy window with a small umbrella", "小さな傘と雨の窓辺にいるナコの水彩画", "ထီးလေးနဲ့ မိုးရွာနေတဲ့ပြတင်းပေါက်ဘေးက Nako ရေဆေးပန်းချီ")
    },
    {
      id: "thank-you-stars",
      image: "assets/gamification/postcards/thank-you-stars.webp",
      title: tx("Thank-You Stars", "ありがとうの星", "ကျေးဇူးတင်ကြယ်လေးများ"),
      description: tx("So many caring days deserve a sky full of thanks.", "たくさんのお世話の日々に、星いっぱいのありがとう。", "ဂရုစိုက်ပေးတဲ့ နေ့များစွာအတွက် ကြယ်ပြည့်ကောင်းကင်လို ကျေးဇူးတင်ပါတယ်။"),
      alt: tx("Watercolor Nako sitting beneath a gentle star garland", "やさしい星のガーランドの下に座るナコの水彩画", "ကြယ်ပန်းကုံးနုနုအောက်မှာ ထိုင်နေတဲ့ Nako ရေဆေးပန်းချီ")
    },
    {
      id: "happy-home",
      image: "assets/gamification/postcards/happy-home.webp",
      title: tx("Nako's Happy Home", "ナコのしあわせなおうち", "Nako ရဲ့ ပျော်ရွှင်တဲ့အိမ်"),
      description: tx("A home filled with steady care is worth celebrating.", "いつものお世話に包まれたおうちは、お祝いしたくなる場所です。", "အမြဲဂရုစိုက်ပေးမှုနဲ့ ပြည့်နေတဲ့အိမ်က ပျော်ပွဲရွှင်ပွဲလုပ်ထိုက်တဲ့ နေရာပါ။"),
      alt: tx("Watercolor Nako celebrating in a cozy home with soft confetti", "やわらかな紙吹雪と居心地のよい部屋でお祝いするナコの水彩画", "နူးညံ့တဲ့ စက္ကူပန်းလေးတွေနဲ့ နွေးထွေးတဲ့အိမ်မှာ ပျော်နေတဲ့ Nako ရေဆေးပန်းချီ")
    }
  ];

  return { labels, postcards, routineToastFamilyByTaskId, toastFamilies };
})();
