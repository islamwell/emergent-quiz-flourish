// Mock data for NurulQuran redesign — sourced/adapted from nurulquran.com
// NOTE: This is MOCK data for the frontend-only preview.

// Resolve a course/media image: full URL passes through, otherwise look up key.
export const resolveImage = (key) => {
  if (!key) return undefined;
  if (typeof key === "string" && key.startsWith("http")) return key;
  return images[key];
};


export const images = {
  heroValley:
    "https://images.unsplash.com/photo-1535025075092-5a1cf795130b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHw0fHxtaXN0eSUyMGdyZWVuJTIwdmFsbGV5fGVufDB8fHx8MTc4MjQ1MTAzN3ww&ixlib=rb-4.1.0&q=85",
  valley2:
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwzfHxtaXN0eSUyMGdyZWVuJTIwdmFsbGV5fGVufDB8fHx8MTc4MjQ1MTAzN3ww&ixlib=rb-4.1.0&q=85",
  valley3:
    "https://images.unsplash.com/photo-1468434453985-b1ca3b555f00?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxtaXN0eSUyMGdyZWVuJTIwdmFsbGV5fGVufDB8fHx8MTc4MjQ1MTAzN3ww&ixlib=rb-4.1.0&q=85",
  valley4:
    "https://images.unsplash.com/photo-1531932594968-e5e5e9dee95a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxtaXN0eSUyMGdyZWVuJTIwdmFsbGV5fGVufDB8fHx8MTc4MjQ1MTAzN3ww&ixlib=rb-4.1.0&q=85",
  cloudsSky:
    "https://images.unsplash.com/photo-1560837616-fee1f3d8753a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxzb2Z0JTIwY2xvdWRzJTIwc2t5fGVufDB8fHx8MTc4MjQ1MTAzN3ww&ixlib=rb-4.1.0&q=85",
  clouds2:
    "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwY2xvdWRzJTIwc2t5fGVufDB8fHx8MTc4MjQ1MTAzN3ww&ixlib=rb-4.1.0&q=85",
  waterfall1:
    "https://images.unsplash.com/photo-1493713838217-28e23b41b798?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBmb3Jlc3R8ZW58MHx8fHwxNzgyNDUxMDczfDA&ixlib=rb-4.1.0&q=85",
  waterfall2:
    "https://images.unsplash.com/photo-1667337104810-b846d9293ed4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwzfHx3YXRlcmZhbGwlMjBmb3Jlc3R8ZW58MHx8fHwxNzgyNDUxMDczfDA&ixlib=rb-4.1.0&q=85",
  leaves1:
    "https://images.unsplash.com/photo-1520121401995-928cd50d4e27?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxncmVlbiUyMGxlYXZlc3xlbnwwfHx8fDE3ODI0NTEwNzN8MA&ixlib=rb-4.1.0&q=85",
  leaves2:
    "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYXZlc3xlbnwwfHx8fDE3ODI0NTEwNzN8MA&ixlib=rb-4.1.0&q=85",
  greenForest:
    "https://images.pexels.com/photos/2873624/pexels-photo-2873624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  greenStream:
    "https://images.pexels.com/photos/1878304/pexels-photo-1878304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Kids", to: "/kids" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
  { label: "Arabic Quiz", to: "/quiz" },
  { label: "Contact", to: "/contact" },
];

export const subjects = [
  {
    icon: "BookOpen",
    title: "Translation & Tafseer",
    desc: "Word-by-word translation and detailed explanation of the Quran, including reasons of revelation.",
  },
  {
    icon: "AudioLines",
    title: "Tajweed Al-Quran",
    desc: "Master the art of correct, beautiful recitation following authentic rules of Tajweed.",
  },
  {
    icon: "Brain",
    title: "Hifz & Duas",
    desc: "Memorization of the Quran along with Masnoon and Quranic supplications for daily life.",
  },
  {
    icon: "Sparkles",
    title: "Seerah & Hadith",
    desc: "Learn the noble life of Prophet Muhammad (\u00b7) and the authentic teachings of the Sunnah.",
  },
  {
    icon: "Languages",
    title: "Arabic Grammar",
    desc: "Root words, conjugation and syntax \u2014 the key to understanding the Quran in its own language.",
  },
  {
    icon: "HeartHandshake",
    title: "Character Building",
    desc: "Personality development, life, home and time management rooted in Quran & Sunnah.",
  },
];

export const courses = [
  {
    id: "sabeel-ul-jannah",
    title: "Sabeel Ul Jannah",
    tag: "Flagship",
    level: "All Levels",
    language: "English",
    duration: "2.5 Years",
    start: "Jun 2, 2025",
    image: "valley2",
    desc: "A comprehensive journey through Tafseer, Seerah and character building \u2014 the path that leads to Jannah.",
  },
  {
    id: "nurun-ala-nur",
    title: "NurunAlaNur",
    tag: "Tafseer",
    level: "Intermediate",
    language: "English",
    duration: "Semester based",
    start: "Apr 2026",
    image: "waterfall1",
    desc: "Light upon light \u2014 an in-depth Tafseer of the Makki and Madani Surahs of the Holy Quran.",
  },
  {
    id: "ramadan-2026",
    title: "Ramadan Special 2026",
    tag: "Seasonal",
    level: "Open to all",
    language: "English / Urdu",
    duration: "1 Month",
    start: "Mar 2026",
    image: "clouds2",
    desc: "Prepare your heart for the blessed month with focused lessons, duas and a daily worship checklist.",
  },
  {
    id: "kids-course",
    title: "Kids Course \u2014 Sem III",
    tag: "Kids",
    level: "Ages 5\u201312",
    language: "English / Urdu",
    duration: "3 Months",
    start: "Apr 2025",
    image: "leaves1",
    desc: "Fun, interactive classes teaching little ones Quran basics, beautiful duas and the Seerah.",
  },
  {
    id: "seerah-2026",
    title: "Seerah Course 2026",
    tag: "Seerah",
    level: "Beginner",
    language: "English",
    duration: "1 Year",
    start: "2026",
    image: "greenForest",
    desc: "Walk through the blessed biography of the Prophet (\u00b7) and draw timeless lessons for today.",
  },
  {
    id: "al-lulu-wal-marjaan",
    title: "Al Lulu Wal Marjaan",
    tag: "Hadith",
    level: "Advanced",
    language: "English",
    duration: "Semester I & II",
    start: "2025",
    image: "greenStream",
    desc: "Agreed-upon ahadith of Bukhari & Muslim with practical guidance on crisis and life management.",
  },
];

export const stats = [
  { value: "250K+", label: "Students Enlightened" },
  { value: "120+", label: "Countries Reached" },
  { value: "40+", label: "Courses Offered" },
  { value: "18", label: "Years of Service" },
];

export const approachSteps = [
  {
    step: "01",
    title: "Authentic Knowledge",
    desc: "Every lesson is rooted purely in the Quran and authentic Sunnah \u2014 no opinions, only guidance.",
  },
  {
    step: "02",
    title: "Live Interactive Classes",
    desc: "Join real-time sessions with Q&A, flexible 1\u20134 day schedules and early or evening slots.",
  },
  {
    step: "03",
    title: "Learn at Your Pace",
    desc: "Recorded lessons, reading material and a supportive community keep you moving forward.",
  },
  {
    step: "04",
    title: "Transform & Give Back",
    desc: "Apply what you learn, share goodness, and become a beacon of light for those around you.",
  },
];

export const testimonials = [
  {
    name: "Aisha R.",
    location: "Toronto, Canada",
    initials: "AR",
    quote:
      "This journey changed my relationship with the Quran entirely. I no longer just read words \u2014 I understand and feel them.",
  },
  {
    name: "Fatima S.",
    location: "London, UK",
    initials: "FS",
    quote:
      "The teachers are so sincere and patient. The serene, well-structured lessons make even deep Tafseer easy to follow.",
  },
  {
    name: "Maryam K.",
    location: "Dubai, UAE",
    initials: "MK",
    quote:
      "As a busy mother, the flexible schedule was a blessing. I finally completed a full Tafseer course alhamdulillah.",
  },
  {
    name: "Zainab H.",
    location: "Sydney, Australia",
    initials: "ZH",
    quote:
      "From character building to Arabic grammar, every module added light to my life. Truly Nur upon Nur.",
  },
];

export const resources = [
  {
    title: "Reading Material",
    desc: "Curated book series including Tafheem-us-Sunnah and course companions.",
    icon: "Library",
    cta: "Browse Library",
  },
  {
    title: "Ramadan Portal",
    desc: "Special programs, daily checklists and a collection of essential duas.",
    icon: "Moon",
    cta: "Open Portal",
  },
  {
    title: "Audio & Lectures",
    desc: "Listen to recitations and recorded sessions anytime, anywhere.",
    icon: "Headphones",
    cta: "Listen Now",
  },
  {
    title: "Courses Gallery",
    desc: "Student projects, presentations and inspiring work from our community.",
    icon: "GalleryHorizontalEnd",
    cta: "View Gallery",
  },
];

export const ayah = {
  arabic: "\u0627\u0644\u0644\u0651\u064e\u0647\u064f \u0646\u064f\u0648\u0631\u064f \u0627\u0644\u0633\u0651\u064e\u0645\u064e\u0627\u0648\u064e\u0627\u062a\u0650 \u0648\u064e\u0627\u0644\u0623\u064e\u0631\u0652\u0636\u0650",
  translation:
    "Allah is the Light of the heavens and the earth.",
  reference: "Surah An-Nur, 24:35",
};

export const footer = {
  email: "info@nurulquran.com",
  phone: "+47 45 84 70 09",
  tagline: "Enlighten Your Lives with the Nur of Al Quran",
};

// Extended per-course content for the detail pages
export const courseExtras = {
  "sabeel-ul-jannah": {
    longDesc:
      "Sabeel Ul Jannah is our flagship journey \u2014 a structured 2.5 year program that walks you through detailed Tafseer, the blessed Seerah and deep character building. It is designed to transform not just your knowledge, but your heart and daily life.",
    instructor: "Senior Faculty Team",
    days: "Tue \u2022 Thu",
    time: "Morning & Evening slots",
    fee: "From $50 / semester",
    modules: [
      "Detailed word-by-word Tafseer of selected Surahs",
      "Seerah of the Prophet \u00b7 with practical lessons",
      "Foundations of Arabic for Quranic understanding",
      "Character building & spiritual purification",
    ],
    outcomes: [
      "Understand the Quran with depth and context",
      "Build a consistent connection with Allah",
      "Apply prophetic guidance to modern life",
    ],
  },
  "nurun-ala-nur": {
    longDesc:
      "NurunAlaNur \u2014 light upon light \u2014 is an in-depth Tafseer program covering the Makki and Madani Surahs of the Holy Quran, revealing the timeless wisdom within every verse.",
    instructor: "Tafseer Faculty",
    days: "Mon \u2022 Wed",
    time: "Evening slot",
    fee: "From $40 / semester",
    modules: [
      "Asbab al-Nuzul \u2014 reasons of revelation",
      "Makki vs Madani themes and structure",
      "Linguistic miracles of the Quran",
      "Practical reflections (tadabbur)",
    ],
    outcomes: [
      "Grasp the deeper meanings of revelation",
      "Recognise the coherence of the Quran",
      "Reflect and act upon each verse",
    ],
  },
  "ramadan-2026": {
    longDesc:
      "A focused one-month program to prepare your heart and home for the blessed month of Ramadan, with daily lessons, essential duas and a practical worship checklist.",
    instructor: "Guest Scholars",
    days: "Daily (short sessions)",
    time: "Early morning",
    fee: "Free / Donation",
    modules: [
      "Fiqh of fasting made simple",
      "Daily duas and adhkar",
      "Last ten nights game plan",
      "Worship & charity checklist",
    ],
    outcomes: [
      "Enter Ramadan with clarity and intention",
      "Maximise reward in the blessed month",
      "Build habits that last beyond Ramadan",
    ],
  },
  "kids-course": {
    longDesc:
      "A joyful, interactive course crafted for young hearts (ages 5\u201312). Through stories, activities and gentle guidance, children learn Quran basics, beautiful duas and the Seerah.",
    instructor: "Kids Faculty",
    days: "Sat \u2022 Sun",
    time: "Weekend mornings",
    fee: "From $25 / term",
    modules: [
      "Quranic Arabic letters & short Surahs",
      "Everyday Masnoon duas",
      "Stories from the Seerah",
      "Good manners (Akhlaq) & kindness",
    ],
    outcomes: [
      "Love for the Quran from an early age",
      "Confidence in recitation and duas",
      "Strong moral foundation",
    ],
  },
  "seerah-2026": {
    longDesc:
      "A one-year journey through the blessed biography of the Prophet \u00b7 \u2014 from his noble lineage to the everlasting legacy of his message, with lessons for every stage of life.",
    instructor: "Seerah Faculty",
    days: "Fri",
    time: "Evening slot",
    fee: "From $35 / semester",
    modules: [
      "The Makkan period & early da'wah",
      "The Hijrah and the Madinan society",
      "Battles, treaties and mercy",
      "The final sermon and legacy",
    ],
    outcomes: [
      "Know the life of the Prophet \u00b7 in detail",
      "Draw timeless lessons for today",
      "Strengthen love for the Messenger \u00b7",
    ],
  },
  "al-lulu-wal-marjaan": {
    longDesc:
      "An advanced study of the agreed-upon ahadith of Bukhari and Muslim, paired with practical guidance on managing life's crises with patience and trust in Allah.",
    instructor: "Hadith Faculty",
    days: "Tue \u2022 Sat",
    time: "Evening slot",
    fee: "From $45 / semester",
    modules: [
      "Authentication and the science of Hadith",
      "Selected agreed-upon narrations",
      "Crisis & life management from the Sunnah",
      "Practical application workshops",
    ],
    outcomes: [
      "Engage with authentic Hadith confidently",
      "Navigate hardship with prophetic wisdom",
      "Apply the Sunnah in daily decisions",
    ],
  },
};

// About page content
export const aboutValues = [
  { title: "Authenticity", desc: "Knowledge grounded purely in the Quran and authentic Sunnah." },
  { title: "Sincerity", desc: "Seeking only the pleasure of Allah in all that we teach and do." },
  { title: "Accessibility", desc: "Beautiful, structured learning for every age, place and pace." },
  { title: "Goodness", desc: "Encouraging kindness, gratitude and service in our community." },
];

export const milestones = [
  { year: "2008", title: "A humble beginning", desc: "NurulQuran is founded with a single Tafseer circle." },
  { year: "2013", title: "Going global", desc: "Online classes connect students across continents." },
  { year: "2019", title: "Kids & families", desc: "Dedicated programs launched for children and mothers." },
  { year: "2026", title: "A growing light", desc: "Hundreds of thousands enlightened across 120+ countries." },
];

// Kids page content
export const kidsFeatures = [
  { title: "Story-based learning", desc: "Lessons brought to life through engaging prophetic stories." },
  { title: "Bite-sized classes", desc: "Short, joyful sessions perfectly paced for young minds." },
  { title: "Duas & manners", desc: "Everyday duas and beautiful Islamic manners (akhlaq)." },
  { title: "Caring teachers", desc: "Patient, encouraging guides who make learning a delight." },
];

export const kidsLevels = [
  { name: "Little Sprouts", age: "Ages 5\u20137", desc: "Quranic letters, short Surahs and simple duas." },
  { name: "Growing Gardens", age: "Ages 8\u201310", desc: "Reading fluency, Seerah stories and good manners." },
  { name: "Bright Stars", age: "Ages 11\u201312", desc: "Tajweed basics, meanings and character building." },
];

// Resources page
export const readingMaterial = [
  { title: "Tafheem-us-Sunnah", desc: "A companion series unpacking the Sunnah with clarity." },
  { title: "Tafseer Workbooks", desc: "Guided notes and reflections for every Tafseer module." },
  { title: "Dua Collections", desc: "Masnoon and Quranic supplications for daily life." },
  { title: "Seerah Reader", desc: "An accessible journey through the prophetic biography." },
];

// Contact page
export const faqs = [
  {
    q: "How do I enroll in a course?",
    a: "Simply choose a course, fill the registration form and you'll receive joining details by email before the intake begins.",
  },
  {
    q: "Are the classes live or recorded?",
    a: "Most courses include live interactive sessions with Q&A, and recordings are shared so you never miss a lesson.",
  },
  {
    q: "Is there a fee?",
    a: "NurulQuran is a non-profit. Many resources are free; structured courses have modest fees that vary by country.",
  },
  {
    q: "What languages are courses offered in?",
    a: "Courses are offered primarily in English, with several programs available in Urdu as well.",
  },
];
