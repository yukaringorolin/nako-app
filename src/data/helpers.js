function t(en, jp, mm) {
  // If jp or mm are omitted, fallback to english and flag as missing
  return {
    en: en || "",
    jp: jp || en || "",
    mm: mm || en || "",
    _missingJp: !jp,
    _missingMm: !mm
  };
}

function sec(id, icon, accent, iconBg, title, description, image = "") {
  return { id, icon, accent, iconBg, title, description, image };
}


function food(id, type, icon, title, summary, instructions, note, sortOrder, photos = []) {
  return { id, type, icon, title, summary, instructions: [instructions], mustRemember: Array.isArray(note) ? note : [note], photos, videoUrl: "", trackingMode: type === "placeholder" ? "future" : "reference", sortOrder };
}

function photo(src, alt, caption) {
  return { src, alt, caption };
}

function routine(id, bucket, sortOrder, icon, title, summary, frequencyText, note, photos = []) {
  return { id, section: "routine", frequencyBucket: bucket, frequencyText, icon, title, summary, instructions: [summary], mustRemember: Array.isArray(note) ? note : [note], photos, videoUrl: "", trackingMode: "light", tags: [], sortOrder };
}


function recipe(id, title, ingredients, method, note, photos = [], type = "dog", attrs = {}) {
  const isHuman = type === "human";
  return { 
    id, 
    icon: "R", 
    title, 
    description: isHuman 
      ? t("Japanese home-cooked recipe idea.", "日本の家庭料理レシピのアイデア。", "ဂျပန်အိမ်ချက် ဟင်းချက်နည်းအိုင်ဒီယာ။")
      : t("Approved topping recipe for Nako.", "ナコ用の承認されたトッピングレシピ。", "Nako အတွက် ခွင့်ပြုထားသော အပေါ်မှတင်ရန် ဟင်းချက်နည်း。"), 
    ingredients: ingredients.map(([name, amount, key]) => ({ key, name, amount })), 
    method, 
    note: isHuman ? note : (photos.length > 0 ? note : recipeNote(note)),
    photos,
    type,
    ...attrs
  };
}

function recipeNote(note) {
  return {
    en: `TBC - this recipe has not been tried yet and no photos have been added. ${note.en}`,
    jp: `TBC - このレシピはまだ試しておらず、写真もまだ追加されていません。${note.jp}`,
    mm: `TBC - ဤဟင်းချက်နည်းကို မစမ်းရသေးပြီး ဓာတ်ပုံများလည်း မထည့်ရသေးပါ။ ${note.mm}`,
    _missingJp: note._missingJp,
    _missingMm: note._missingMm
  };
}
