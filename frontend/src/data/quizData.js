// Arabic Language Quiz — Question Bank
// 9 question types × 3 difficulty levels × 1 question = 27 questions
// Each quiz session = 9 questions (1 per type, filtered by chosen difficulty)

export const DIFFICULTIES = [
  {
    id: "beginner",
    label: "Beginner",
    labelAr: "مُبْتَدِئ",
    description: "Foundation vocabulary and core Arabic concepts",
    icon: "🌱",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    labelAr: "مُتَوَسِّط",
    description: "Richer vocabulary, wisdom sayings, and character traits",
    icon: "🌿",
  },
  {
    id: "advanced",
    label: "Advanced",
    labelAr: "مُتَقَدِّم",
    description: "Quranic vocabulary, classical Arabic, and morphology",
    icon: "🌳",
  },
];

export const TYPE_LABELS = {
  "true-false": "True or False",
  "multiple-choice": "Multiple Choice",
  synonyms: "Find the Synonym",
  antonyms: "Find the Antonym",
  "fill-blank": "Fill in the Blank",
  matching: "Word Matching",
  "odd-one-out": "Odd One Out",
  "emoji-clue": "Emoji Clue",
  "category-sort": "Category Sort",
};

// Canonical question order per session
export const QUESTION_ORDER = [
  "true-false",
  "multiple-choice",
  "synonyms",
  "antonyms",
  "fill-blank",
  "matching",
  "odd-one-out",
  "emoji-clue",
  "category-sort",
];

export const questions = [
  // ── TRUE / FALSE ──────────────────────────────────────────────────────────
  {
    id: "tf-b",
    type: "true-false",
    difficulty: "beginner",
    arabic: "الصَّبْر",
    statement: 'The word الصَّبْر (aṣ-Ṣabr) means "patience" in Arabic.',
    answer: true,
    explanation:
      "Correct! الصَّبْر (aṣ-Ṣabr) means patience — one of the most praised virtues in Arabic literature and Islamic ethics.",
  },
  {
    id: "tf-i",
    type: "true-false",
    difficulty: "intermediate",
    arabic: "غَيْث",
    statement:
      'The rare Arabic word غَيْث (Ghayth) means "drought" — a prolonged dry period.',
    answer: false,
    explanation:
      "غَيْث (ghayth) actually means life-giving rain — the opposite of drought. It is a poetic synonym for rain rarely found outside classical Arabic poetry.",
  },
  {
    id: "tf-a",
    type: "true-false",
    difficulty: "advanced",
    arabic: "حَسْبِيَ اللهُ",
    statement:
      'The Quranic phrase حَسْبِيَ اللهُ (Ḥasbiyallāh) translates as "Allah is my witness".',
    answer: false,
    explanation:
      "حَسْبِيَ اللهُ means \"Allah is sufficient for me\" — an expression of complete reliance on Allah (tawakkul), not merely calling Him as a witness.",
  },

  // ── MULTIPLE CHOICE ───────────────────────────────────────────────────────
  {
    id: "mc-b",
    type: "multiple-choice",
    difficulty: "beginner",
    arabic: "تَوَاضُع",
    question: "What does تَوَاضُع mean?",
    options: ["Pride", "Anger", "Humility", "Wealth"],
    answer: 2,
    explanation:
      "تَوَاضُع (tawāḍuʿ) means humility — the quality of being modest, lowering oneself, and not placing oneself above others.",
  },
  {
    id: "mc-i",
    type: "multiple-choice",
    difficulty: "intermediate",
    arabic: "اِزْدِرَاء",
    question: "What is the most accurate meaning of اِزْدِرَاء?",
    options: ["Admiration", "Contempt / Disdain", "Gratitude", "Grief"],
    answer: 1,
    explanation:
      "اِزْدِرَاء (izdirāʾ) means contempt or disdain — looking down on someone with scorn. It is considered a reprehensible character trait in Islamic ethics.",
  },
  {
    id: "mc-a",
    type: "multiple-choice",
    difficulty: "advanced",
    arabic: "مُسْتَوْدَع",
    question: "Which meaning best matches the Quranic term مُسْتَوْدَع?",
    options: [
      "A sacred covenant",
      "A repository / place of trust",
      "A guiding leader",
      "An eternal blessing",
    ],
    answer: 1,
    explanation:
      "مُسْتَوْدَع (mustawdaʿ) means a place of deposit or entrustment. It appears in Quran 6:98 referring to the 'resting place and repository' of humanity — a profound Quranic metaphor.",
  },

  // ── SYNONYMS ──────────────────────────────────────────────────────────────
  {
    id: "syn-b",
    type: "synonyms",
    difficulty: "beginner",
    arabic: "غَضَب",
    arabicMeaning: "anger",
    question: "Which word is closest in meaning to غَضَب?",
    options: ["سُرُور", "سَخَط", "خَوْف", "حُزْن"],
    optionMeanings: ["joy", "wrath", "fear", "sadness"],
    answer: 1,
    explanation:
      "سَخَط (sakhaṭ) means wrath or intense displeasure — the closest Arabic synonym to غَضَب (anger).",
  },
  {
    id: "syn-i",
    type: "synonyms",
    difficulty: "intermediate",
    arabic: "وَجَل",
    arabicMeaning: "apprehension / fearful reverence",
    question: "Which word is a synonym of وَجَل?",
    options: ["أَمَل", "فَرَح", "هَيْبَة", "صِدْق"],
    optionMeanings: ["hope", "joy", "reverent awe / fear", "truth"],
    answer: 2,
    explanation:
      "هَيْبَة (hayba) means awe or reverential fear — a close synonym of وَجَل, which denotes apprehension before something sublime or powerful.",
  },
  {
    id: "syn-a",
    type: "synonyms",
    difficulty: "advanced",
    arabic: "طُغْيَان",
    arabicMeaning: "extreme transgression",
    question: "Which word best matches the Quranic term طُغْيَان in meaning?",
    options: ["تَوْبَة", "تَجَاوُز", "صَبْر", "رَحْمَة"],
    optionMeanings: ["repentance", "overstepping / transgression", "patience", "mercy"],
    answer: 1,
    explanation:
      "تَجَاوُز (tajāwuz) means overstepping bounds — the closest synonym to طُغْيَان, which refers to extreme rebellion against divine limits in the Quran.",
  },

  // ── ANTONYMS ──────────────────────────────────────────────────────────────
  {
    id: "ant-b",
    type: "antonyms",
    difficulty: "beginner",
    arabic: "كَرِيم",
    arabicMeaning: "generous",
    question: "What is the opposite of كَرِيم?",
    options: ["شَجَاع", "بَخِيل", "عَاقِل", "جَمِيل"],
    optionMeanings: ["brave", "miserly", "wise", "beautiful"],
    answer: 1,
    explanation:
      "بَخِيل (bakhīl) means miserly or stingy — the direct antonym of كَرِيم (generous).",
  },
  {
    id: "ant-i",
    type: "antonyms",
    difficulty: "intermediate",
    arabic: "صَمْت",
    arabicMeaning: "silence",
    question: "What is the antonym of صَمْت?",
    options: ["نُور", "عِلْم", "ضَوْضَاء", "حِلْم"],
    optionMeanings: ["light", "knowledge", "noise / clamour", "forbearance"],
    answer: 2,
    explanation:
      "ضَوْضَاء (ḍawḍāʾ) means noise or clamour — the direct antonym of صَمْت (silence).",
  },
  {
    id: "ant-a",
    type: "antonyms",
    difficulty: "advanced",
    arabic: "الخُشُوع",
    arabicMeaning: "humble inner submission / reverence",
    question: "What is the spiritual antonym of الخُشُوع?",
    options: ["الإِخْلاص", "الغُرُور", "الصِّدْق", "التَّقْوَى"],
    optionMeanings: ["sincerity", "vanity / self-delusion", "truthfulness", "God-consciousness"],
    answer: 1,
    explanation:
      "الغُرُور (al-ghurūr) — vanity or self-delusion — is the spiritual antonym of الخُشُوع, which is the state of profound inner humility and submission before Allah.",
  },

  // ── FILL IN THE BLANK ─────────────────────────────────────────────────────
  {
    id: "fib-b",
    type: "fill-blank",
    difficulty: "beginner",
    sentence: "الصَّبْرُ ________ النَّصْرِ",
    translation: "Patience is the ________ of victory",
    options: ["مِفْتَاحُ", "نِهَايَةُ", "بِدَايَةُ", "أَسَاسُ"],
    optionMeanings: ["key", "end", "beginning", "foundation"],
    answer: 0,
    explanation:
      "الصَّبْرُ مِفْتَاحُ النَّصْرِ — \"Patience is the key to victory.\" A celebrated Arabic proverb deeply rooted in Islamic tradition.",
  },
  {
    id: "fib-i",
    type: "fill-blank",
    difficulty: "intermediate",
    sentence: "الْعِلْمُ بِلَا عَمَلٍ كَالشَّجَرِ بِلَا ________",
    translation: "Knowledge without action is like a tree without ________",
    options: ["مَاءٍ", "ثَمَرٍ", "ظِلٍّ", "جَذْرٍ"],
    optionMeanings: ["water", "fruit", "shade", "root"],
    answer: 1,
    explanation:
      "الْعِلْمُ بِلَا عَمَلٍ كَالشَّجَرِ بِلَا ثَمَرٍ — \"Knowledge without action is like a tree without fruit.\" A celebrated Arabic wisdom saying that challenges the student to act on what they learn.",
  },
  {
    id: "fib-a",
    type: "fill-blank",
    difficulty: "advanced",
    sentence: "إِنَّ مَعَ الْعُسْرِ ________",
    translation: "Indeed, with hardship there is ________  (Quran 94:6)",
    options: ["صَبْرًا", "يُسْرًا", "خَيْرًا", "فَرَجًا"],
    optionMeanings: ["patience", "ease", "goodness", "relief"],
    answer: 1,
    explanation:
      "Quran 94:6 — إِنَّ مَعَ الْعُسْرِ يُسْرًا: \"Indeed, with hardship there is ease.\" The distinction between يُسْرًا (ease) and فَرَجًا (relief) is theologically significant — ease accompanies the hardship itself, not just after it.",
  },

  // ── WORD MATCHING ─────────────────────────────────────────────────────────
  {
    id: "match-b",
    type: "matching",
    difficulty: "beginner",
    question: "Match each Arabic word to its correct English meaning.",
    pairs: [
      { arabic: "ظَلَام", english: "Darkness" },
      { arabic: "فَجْر", english: "Dawn" },
      { arabic: "غُرُوب", english: "Sunset" },
      { arabic: "نَهَار", english: "Daytime" },
    ],
    explanation:
      "Four moments of a day: ظَلَام (darkness of night), فَجْر (dawn), نَهَار (daytime), غُرُوب (sunset).",
  },
  {
    id: "match-i",
    type: "matching",
    difficulty: "intermediate",
    question: "Match each Arabic character trait to its correct meaning.",
    pairs: [
      { arabic: "وَفَاء", english: "Loyalty" },
      { arabic: "جُرْأَة", english: "Boldness" },
      { arabic: "حِلْم", english: "Forbearance" },
      { arabic: "نِفَاق", english: "Hypocrisy" },
    ],
    explanation:
      "وَفَاء (loyalty/faithfulness), جُرْأَة (boldness/daring), حِلْم (forbearance — patience with others' faults), نِفَاق (hypocrisy — one of Islam's gravest sins).",
  },
  {
    id: "match-a",
    type: "matching",
    difficulty: "advanced",
    question: "Match these spiritual stations (مَقَامَات) to their precise meanings.",
    pairs: [
      { arabic: "تَوَكُّل", english: "Trust in Allah" },
      { arabic: "رِيَاء", english: "Showing off" },
      { arabic: "زُهْد", english: "Detachment from world" },
      { arabic: "مُرَاقَبَة", english: "Constant God-awareness" },
    ],
    explanation:
      "Four Sufi spiritual states: تَوَكُّل (reliance on Allah), رِيَاء (ostentation — a hidden form of shirk), زُهْد (worldly detachment), مُرَاقَبَة (watchful God-consciousness).",
  },

  // ── ODD ONE OUT ───────────────────────────────────────────────────────────
  {
    id: "odd-b",
    type: "odd-one-out",
    difficulty: "beginner",
    question: "Which word does NOT belong to the same category as the others?",
    options: ["أَسَد", "نَمِر", "فِيل", "وَرْدَة"],
    optionMeanings: ["lion", "tiger", "elephant", "rose"],
    answer: 3,
    explanation:
      "وَرْدَة (wardah) means rose — a flower, while أَسَد (lion), نَمِر (tiger), and فِيل (elephant) are all animals.",
  },
  {
    id: "odd-i",
    type: "odd-one-out",
    difficulty: "intermediate",
    question: "Which of these is NOT a virtue (فَضِيلَة)?",
    options: ["صِدْق", "كَرَم", "حِقْد", "وَفَاء"],
    optionMeanings: ["honesty", "generosity", "grudge / spite", "loyalty"],
    answer: 2,
    explanation:
      "حِقْد (ḥiqd) means a deep-seated grudge — a spiritual vice (رَذِيلَة), while صِدْق (honesty), كَرَم (generosity), and وَفَاء (loyalty) are all virtues.",
  },
  {
    id: "odd-a",
    type: "odd-one-out",
    difficulty: "advanced",
    question: "Which is NOT a term from Arabic morphology (عِلْم الصَّرْف)?",
    options: [
      "اِسْمُ الْفَاعِل",
      "اِسْمُ الْمَفْعُول",
      "اِسْمُ الْإِشَارَة",
      "صِيغَةُ الْمُبَالَغَة",
    ],
    optionMeanings: [
      "active participle",
      "passive participle",
      "demonstrative pronoun",
      "hyperbolic form",
    ],
    answer: 2,
    explanation:
      "اِسْمُ الْإِشَارَة (demonstrative pronoun, e.g. هَذَا 'this') belongs to Arabic grammar (النَّحْو), not morphology (الصَّرْف). The others are derived noun forms (مُشْتَقَّات) studied in ʿilm al-ṣarf.",
  },

  // ── EMOJI CLUE ────────────────────────────────────────────────────────────
  {
    id: "emoji-b",
    type: "emoji-clue",
    difficulty: "beginner",
    emojis: ["🌙", "⭐", "🌌"],
    question: "What Arabic word do these emojis represent?",
    options: ["صَبَاح", "لَيْل", "ظَهِيرَة", "غُرُوب"],
    optionMeanings: ["morning", "night", "noon", "sunset"],
    answer: 1,
    explanation:
      "The crescent moon, star, and night sky together represent لَيْل (layl) — night. These symbols are deeply woven into Arabic poetry and Islamic culture.",
  },
  {
    id: "emoji-i",
    type: "emoji-clue",
    difficulty: "intermediate",
    emojis: ["📚", "🖊️", "🧠"],
    question: "What Arabic word do these emojis represent?",
    options: ["جَهْل", "كِتَابَة", "عِلْم", "قِرَاءَة"],
    optionMeanings: ["ignorance", "writing", "knowledge", "reading"],
    answer: 2,
    explanation:
      "Books, pen, and a brain together represent عِلْم (ʿilm) — knowledge. The very first Quranic revelation was إِقْرَأ (\"Read!\"), placing knowledge at the heart of Islam.",
  },
  {
    id: "emoji-a",
    type: "emoji-clue",
    difficulty: "advanced",
    emojis: ["⚖️", "🏛️", "📜"],
    question: "What Arabic concept do these emojis represent?",
    options: ["حُرِّيَّة", "عَدَالَة", "قَضَاء", "شُورَى"],
    optionMeanings: ["freedom", "justice", "judicial decree", "consultation"],
    answer: 1,
    explanation:
      "Scales of balance, a court building, and a scroll represent عَدَالَة (ʿadāla) — justice. One of Islam's supreme social values, it appears repeatedly throughout Quranic legislation.",
  },

  // ── CATEGORY SORT ─────────────────────────────────────────────────────────
  {
    id: "cat-b",
    type: "category-sort",
    difficulty: "beginner",
    question: "Sort these Arabic words into the correct categories.",
    categories: ["فَضَائِل (Virtues)", "رَذَائِل (Vices)"],
    words: [
      { arabic: "صِدْق", english: "Honesty", category: 0 },
      { arabic: "كَذِب", english: "Lying", category: 1 },
      { arabic: "كَرَم", english: "Generosity", category: 0 },
      { arabic: "حَسَد", english: "Envy", category: 1 },
      { arabic: "صَبْر", english: "Patience", category: 0 },
      { arabic: "غَضَب", english: "Rage", category: 1 },
    ],
    explanation:
      "Virtues (فَضَائِل): صِدْق, كَرَم, صَبْر. Vices (رَذَائِل): كَذِب, حَسَد, غَضَب. A Muslim strives to cultivate virtues and purify the soul from vices.",
  },
  {
    id: "cat-i",
    type: "category-sort",
    difficulty: "intermediate",
    question: "Sort into: Quranic Prophets (أَنْبِيَاء) or Islamic Months (أَشْهُر).",
    categories: ["أَنْبِيَاء (Prophets)", "أَشْهُر (Months)"],
    words: [
      { arabic: "مُحَرَّم", english: "Muharram", category: 1 },
      { arabic: "مُوسَى", english: "Moses", category: 0 },
      { arabic: "رَجَب", english: "Rajab", category: 1 },
      { arabic: "إِبْرَاهِيم", english: "Abraham", category: 0 },
      { arabic: "شَعْبَان", english: "Shaʿban", category: 1 },
      { arabic: "يُوسُف", english: "Joseph", category: 0 },
    ],
    explanation:
      "Prophets: مُوسَى (Moses), إِبْرَاهِيم (Abraham), يُوسُف (Joseph). Islamic months: مُحَرَّم, رَجَب, شَعْبَان — three of the twelve months in the Hijri lunar calendar.",
  },
  {
    id: "cat-a",
    type: "category-sort",
    difficulty: "advanced",
    question: "Sort these Arabic words by their grammatical class.",
    categories: ["أَسْمَاء (Nouns)", "أَفْعَال (Verbs)"],
    words: [
      { arabic: "كَتَبَ", english: "he wrote", category: 1 },
      { arabic: "عِلْمٌ", english: "knowledge", category: 0 },
      { arabic: "يَذْهَبُ", english: "he goes", category: 1 },
      { arabic: "كِتَابٌ", english: "book", category: 0 },
      { arabic: "قَرَأَ", english: "he read", category: 1 },
      { arabic: "مَدْرَسَةٌ", english: "school", category: 0 },
    ],
    explanation:
      "Nouns: عِلْمٌ, كِتَابٌ, مَدْرَسَةٌ (note the tanwin ـٌ — a key noun marker). Verbs: كَتَبَ (past), يَذْهَبُ (present), قَرَأَ (past).",
  },

  // ── [NEW] 11 MORE QUESTIONS FOR ENRICHED POOL ─────────────────────────────
  {
    id: "tf-b-2",
    type: "true-false",
    difficulty: "beginner",
    arabic: "الكِتَاب",
    statement: 'The word الكِتَاب (al-Kitāb) means "the book" in Arabic.',
    answer: true,
    explanation:
      "Correct! الكِتَاب (al-Kitāb) simply means 'the book' (with the definite article 'al-'). It is also one of the names of the Holy Quran.",
  },
  {
    id: "mc-b-2",
    type: "multiple-choice",
    difficulty: "beginner",
    arabic: "قَلَم",
    question: "What does قَلَم mean?",
    options: ["Book", "Pen", "Desk", "Chair"],
    answer: 1,
    explanation:
      "قَلَم (qalam) means pen. The pen is highly honored in Arabic tradition, and an entire Surah in the Quran is named 'Al-Qalam' (The Pen).",
  },
  {
    id: "syn-b-2",
    type: "synonyms",
    difficulty: "beginner",
    arabic: "بَيْت",
    arabicMeaning: "house",
    question: "Which word is closest in meaning to بَيْت?",
    options: ["مَدْرَسَة", "مَسْجِد", "مَنْزِل", "حَدِيقَة"],
    optionMeanings: ["school", "mosque", "house / dwelling", "garden"],
    answer: 2,
    explanation:
      "مَنْزِل (manzil) means house or landing place — the most common synonym for بَيْت (house/home) in Arabic.",
  },
  {
    id: "ant-b-2",
    type: "antonyms",
    difficulty: "beginner",
    arabic: "جَدِيد",
    arabicMeaning: "new",
    question: "What is the opposite of جَدِيد?",
    options: ["كَبِير", "صَغِير", "قَدِيم", "جَمِيل"],
    optionMeanings: ["big", "small", "old", "beautiful"],
    answer: 2,
    explanation:
      "قَدِيم (qadīm) means old — the direct opposite of جَدِيد (new).",
  },
  {
    id: "fib-i-2",
    type: "fill-blank",
    difficulty: "intermediate",
    sentence: "الْوَقْتُ كَالسَّيْفِ إِنْ لَمْ تَقْطَعْهُ ________",
    translation: "Time is like a sword, if you do not cut it, it ________",
    options: ["قَطَعَكَ", "نَفَعَكَ", "حَفِظَكَ", "ضَرَّكَ"],
    optionMeanings: ["cuts you", "benefits you", "protects you", "harms you"],
    answer: 0,
    explanation:
      "الْوَقْتُ كَالسَّيْفِ إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ — 'Time is like a sword, if you do not cut it, it cuts you.' One of the most famous classical Arabic adages emphasizing the urgency of time management.",
  },
  {
    id: "odd-i-2",
    type: "odd-one-out",
    difficulty: "intermediate",
    question: "Which word does NOT belong to the same category as the others?",
    options: ["شَمْس", "قَمَر", "نَجْم", "بَحْر"],
    optionMeanings: ["sun", "moon", "star", "sea"],
    answer: 3,
    explanation:
      "بَحْر (baḥr) means sea, which is a body of water. The others (شَمْس, قَمَر, نَجْم) are celestial bodies in the sky.",
  },
  {
    id: "emoji-i-2",
    type: "emoji-clue",
    difficulty: "intermediate",
    emojis: ["🍎", "🍌", "🍇"],
    question: "What Arabic word do these emojis represent?",
    options: ["خُضَار", "فَوَاكِه", "لُحُوم", "خُبْز"],
    optionMeanings: ["vegetables", "fruits", "meats", "bread"],
    answer: 1,
    explanation:
      "The apple, banana, and grapes emojis together represent فَوَاكِه (fawākih) — fruits.",
  },
  {
    id: "tf-a-2",
    type: "true-false",
    difficulty: "advanced",
    arabic: "الرَّحْمَن",
    statement: 'The divine name الرَّحْمَن (ar-Raḥmān) translates to "The Creator".',
    answer: false,
    explanation:
      "الرَّحْمَن actually translates to 'The Entirely Merciful' or 'The All-Merciful', denoting infinite divine mercy, whereas Creator is الخَالِق (al-Khāliq).",
  },
  {
    id: "mc-a-2",
    type: "multiple-choice",
    difficulty: "advanced",
    arabic: "بَرْزَخ",
    question: "Which of these best defines the classical term بَرْزَخ?",
    options: ["An eternal garden", "A barrier / partition", "The final judgment", "A path of light"],
    answer: 1,
    explanation:
      "بَرْزَخ (barzakh) means a barrier, partition, or intermediate state. In Islamic theology, it represents the realm of souls between physical death and resurrection.",
  },
  {
    id: "match-a-2",
    type: "matching",
    difficulty: "advanced",
    question: "Match each classical term for time to its correct definition.",
    pairs: [
      { arabic: "سَرْمَد", english: "Eternal time" },
      { arabic: "أَبَد", english: "Endless future" },
      { arabic: "دَهْر", english: "Epoch / Eon" },
      { arabic: "خُلُود", english: "Immortality" },
    ],
    explanation:
      "Classical time sub-terms: سَرْمَد (timeless eternity), أَبَد (endless future duration), دَهْر (historical eon/span of time), خُلُود (perpetual durability / immortality).",
  },
  {
    id: "cat-a-2",
    type: "category-sort",
    difficulty: "advanced",
    question: "Sort these Arabic nouns into their correct grammatical state classes.",
    categories: ["مَرْفُوع (Nominative)", "مَجْرُور (Genitive)"],
    words: [
      { arabic: "مَعْرِفَةٌ", english: "knowledge", category: 0 },
      { arabic: "بِالْمَعْرِفَةِ", english: "by knowledge", category: 1 },
      { arabic: "كِتَابٌ", english: "a book", category: 0 },
      { arabic: "فِي كِتَابٍ", english: "in a book", category: 1 },
      { arabic: "مُدَرِّسٌ", english: "a teacher", category: 0 },
      { arabic: "لِلْمُدَرِّسِ", english: "for the teacher", category: 1 },
    ],
    explanation:
      "Nominative (مَرْفُوع) nouns typically end with damma (ـٌ / ـُ), while Genitive (مَجْرُور) nouns end with kasra (ـٍ / ـِ) due to prepositions like بِ, فِي, لِ.",
  },
];

/**
 * Returns exactly 9 questions (one per type) for the chosen difficulty level,
 * picking randomly from the matching question pool.
 */
export function getSessionQuestions(difficulty) {
  return QUESTION_ORDER.map((type) => {
    const pool = questions.filter((q) => q.type === type && q.difficulty === difficulty);
    if (pool.length === 0) return null;
    // Pick a random question from the pool
    return pool[Math.floor(Math.random() * pool.length)];
  }).filter(Boolean);
}
