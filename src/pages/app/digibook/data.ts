/**
 * DigiBook shared types and mock data.
 * Used by DigiBook list, BookDetail (صفحه شناسنامه کتاب), and Reader.
 */

export interface BookItem {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  categoryId: string;
  summary?: string;
  tags?: string[];
  part?: number;
  progress?: number;
  isOffline?: boolean;
}

export type PartType = "text" | "image" | "pdf";

export interface BookPart {
  id: string;
  title: string;
  type: PartType;
  /** For text: paragraph strings. For image: image URLs. For pdf: PDF URL (e.g. /pdf/Kmyk.pdf). */
  content: string[] | string;
}

/** Public path for the main PDF book file (DigiBook). */
export const DIGIBOOK_PDF_URL = "/pdf/Kmyk.pdf";

/** Base path for DigiBook category card images (public/image/digibook/). */
const DIGIBOOK_IMAGE_BASE = "/image/digibook";

/** DigiBook category for the Explore tab (جستجو و کاوش). */
export interface DigiBookCategory {
  id: string;
  name: string;
  color: string;
  desc: string;
  /** Card image from public/image/digibook/ (e.g. مانگا.png). */
  imageUrl: string;
}
/** All DigiBook categories — single source of truth for second tab. Uses digibook images for cards. */
export const DIGIBOOK_CATEGORIES: DigiBookCategory[] = [
  { id: "manga", name: "مانگا", color: "from-rose-500 to-pink-600", desc: "دنیای اختصاصی آثار ژاپنی", imageUrl: `${DIGIBOOK_IMAGE_BASE}/مانگا.png` },
  { id: "comic", name: "کمیک بوک", color: "from-blue-500 to-indigo-600", desc: "آثار غربی و ایرانی", imageUrl: `${DIGIBOOK_IMAGE_BASE}/کمیک بوک.png` },
  { id: "characters", name: "شخصیت‌های محبوب", color: "from-violet-500 to-purple-600", desc: "داستان‌های بر پایه قهرمانان محبوب", imageUrl: `${DIGIBOOK_IMAGE_BASE}/شخصیت های محبوب.png` },
  { id: "fantasy", name: "فانتزی", color: "from-amber-500 to-orange-600", desc: "جادویی، حماسی", imageUrl: `${DIGIBOOK_IMAGE_BASE}/فانتزی.png` },
  { id: "scifi", name: "علمی‌تخیلی", color: "from-cyan-500 to-teal-600", desc: "آینده‌نگرانه، فضایی", imageUrl: `${DIGIBOOK_IMAGE_BASE}/علمی تخیلی.png` },
  { id: "mystery", name: "جنایی معمایی", color: "from-slate-600 to-slate-800", desc: "پلیسی و رازآلود", imageUrl: `${DIGIBOOK_IMAGE_BASE}/جنایی معمایی.png` },
  { id: "adventure", name: "ماجراجویی", color: "from-red-500 to-rose-600", desc: "سفر و کشف و هیجان", imageUrl: `${DIGIBOOK_IMAGE_BASE}/ماجراجویی.png` },
  { id: "literature", name: "ادبیات ایران و جهان", color: "from-emerald-500 to-green-600", desc: "کلاسیک و معاصر", imageUrl: `${DIGIBOOK_IMAGE_BASE}/ادبیات ایران و جهان.png` },
  { id: "digiteen", name: "اختصاصی دیجی‌تین", color: "from-[#7e4bd0] to-[#6a3fb8]", desc: "محتوای انحصاری دیجی‌تین", imageUrl: `${DIGIBOOK_IMAGE_BASE}/اختصاصی دیجی تین.png` },
];

export interface BookDetail extends BookItem {
  summary: string;
  tags: string[];
  parts: BookPart[];
}

/** Cover images from public/image/digibook/ */
const COVER_BASE = "/image/digibook";
const COVER1 = `${COVER_BASE}/cover 1.jpg`;
const COVER2 = `${COVER_BASE}/cover 2.jpg`;
const COVER3 = `${COVER_BASE}/cover 3.jpg`;
const COVER4 = `${COVER_BASE}/cover 4.jpg`;
const COVER5 = `${COVER_BASE}/cover 5.jpg`;

/** Legacy image refs (for parts/content that still use them). */
const IMG = "/image/c30443dd88560f56a71aef4bc60965b7.jpg";
const IMG2 = "/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png";

/** Mock books for list views (Home, Explore, Library). */
export const TRENDING_BOOKS: BookItem[] = [
  { id: "t1", title: "سفر به ستاره‌ها", author: "نویسنده الف", coverUrl: COVER1, categoryId: "scifi" },
  { id: "t2", title: "قلعه اژدها", author: "نویسنده ب", coverUrl: COVER2, categoryId: "fantasy" },
  { id: "t3", title: "راز شب", author: "نویسنده ج", coverUrl: COVER3, categoryId: "mystery" },
  { id: "pdf1", title: "کتاب نمونه PDF", author: "دیجی‌بوک", coverUrl: COVER4, categoryId: "literature" },
  { id: "t4", title: "دنیای مانگا", author: "نویسنده د", coverUrl: COVER5, categoryId: "manga" },
];

export const CONTINUE_READING: BookItem[] = [
  { id: "c1", title: "دنیای مانگا", author: "نویسنده د", coverUrl: COVER5, categoryId: "manga", part: 3, progress: 45 },
  { id: "c2", title: "کمیک قهرمانان", author: "نویسنده ه", coverUrl: COVER1, categoryId: "comic", part: 1, progress: 80 },
];

export const LIBRARY_OFFLINE: BookItem[] = [
  { id: "o1", title: "کتاب آفلاین نمونه", author: "نویسنده و", coverUrl: COVER2, categoryId: "fantasy", isOffline: true },
];

/** All books for list views (Explore, Home) — used by getBooksByCategory. */
const ALL_BOOKS: BookItem[] = [...TRENDING_BOOKS, ...CONTINUE_READING];

/** Books in a given category (for Explore tab drill-down). */
export function getBooksByCategory(categoryId: string): BookItem[] {
  return ALL_BOOKS.filter((b) => b.categoryId === categoryId);
}

/** All book IDs that have detail + parts (for detail page and reader). */
const BOOK_IDS = new Set(["t1", "t2", "t3", "t4", "c1", "c2", "o1", "pdf1"]);

/** Mock book details with parts (صفحه شناسنامه کتاب + ریدر). */
const BOOK_DETAILS: Record<string, BookDetail> = {
  t1: {
    id: "t1",
    title: "سفر به ستاره‌ها",
    author: "نویسنده الف",
    coverUrl: COVER1,
    categoryId: "scifi",
    summary: "داستان نوجوانی که با سفینهٔ خود به اعماق فضا سفر می‌کند و با موجودات فرازمینی روبه‌رو می‌شود.",
    tags: ["فضا", "علمی‌تخیلی", "ماجراجویی"],
    parts: [
      {
        id: "t1-p1",
        title: "پارت اول: آغاز سفر",
        type: "text",
        content: [
          "صبح روز پرتاب، آسمان صاف بود. همهٔ تیم در پایگاه حاضر بودند.",
          "سفینهٔ ما آمادهٔ پرواز بود. موتورها روشن شدند و زمین به لرزه درآمد.",
          "چند ثانیه بعد در فضا بودیم. زمین آرام آرام کوچک می‌شد.",
          "این آغاز یک ماجرای بزرگ بود.",
        ],
      },
      {
        id: "t1-p2",
        title: "پارت دوم: نخستین تماس",
        type: "text",
        content: [
          "در مدار مریخ، سیگنال عجیبی دریافت کردیم.",
          "منبع سیگنال ناشناخته بود. تصمیم گرفتیم نزدیک‌تر برویم.",
          "وقتی به محل رسیدیم، چیزی که دیدیم باورنکردنی بود.",
        ],
      },
    ],
  },
  t2: {
    id: "t2",
    title: "قلعه اژدها",
    author: "نویسنده ب",
    coverUrl: COVER2,
    categoryId: "fantasy",
    summary: "شوالیهٔ جوانی باید قلعهٔ اژدها را فتح کند تا پادشاهی را نجات دهد.",
    tags: ["فانتزی", "اکشن", "اژدها"],
    parts: [
      {
        id: "t2-p1",
        title: "فصل اول",
        type: "image",
        content: [IMG, IMG2, IMG],
      },
    ],
  },
  t3: {
    id: "t3",
    title: "راز شب",
    author: "نویسنده ج",
    coverUrl: COVER3,
    categoryId: "mystery",
    summary: "یک کارآگاه جوان باید راز قتل در شب را حل کند.",
    tags: ["معمایی", "جنایی", "نوجوان"],
    parts: [
      {
        id: "t3-p1",
        title: "پارت اول",
        type: "text",
        content: [
          "شب بود و باران می‌بارید. تلفن زنگ زد.",
          "مأموریت جدید: جسدی در خانهٔ قدیمی پیدا شده بود.",
          "من و دستیارم به محل حادثه رفتیم.",
        ],
      },
    ],
  },
  t4: {
    id: "t4",
    title: "دنیای مانگا",
    author: "نویسنده د",
    coverUrl: COVER5,
    categoryId: "manga",
    summary: "مانگای محبوب نوجوانان با دنیای خیالی و قهرمانان فراموش‌نشدنی.",
    tags: ["مانگا", "ژاپنی", "اکشن"],
    parts: [
      {
        id: "t4-p1",
        title: "فصل اول",
        type: "text",
        content: [
          "در دنیایی پر از ماجرا، قهرمان ما راه خود را پیدا می‌کند.",
          "دوستی‌ها و نبردها او را به سمت سرنوشتش می‌برند.",
        ],
      },
    ],
  },
  c1: {
    id: "c1",
    title: "دنیای مانگا",
    author: "نویسنده د",
    coverUrl: COVER5,
    categoryId: "manga",
    summary: "مانگای محبوب نوجوانان با دنیای خیالی و قهرمانان فراموش‌نشدنی.",
    tags: ["مانگا", "ژاپنی", "اکشن"],
    parts: [
      { id: "c1-p1", title: "فصل ۱", type: "image", content: [IMG2, IMG, IMG2] },
      { id: "c1-p2", title: "فصل ۲", type: "image", content: [IMG, IMG2] },
      { id: "c1-p3", title: "فصل ۳", type: "image", content: [IMG2, IMG, IMG2, IMG] },
    ],
  },
  c2: {
    id: "c2",
    title: "کمیک قهرمانان",
    author: "نویسنده ه",
    coverUrl: COVER1,
    categoryId: "comic",
    summary: "قهرمانان ابرقدرت در نبرد با شر.",
    tags: ["کمیک", "قهرمانی", "اکشن"],
    parts: [
      { id: "c2-p1", title: "شماره ۱", type: "text", content: ["داستان از شهری شروع می‌شود که در خطر است.", "قهرمان ما باید انتخاب کند: زندگی عادی یا نجات جهان؟"] },
      { id: "c2-p2", title: "شماره ۲", type: "image", content: [IMG, IMG2, IMG] },
    ],
  },
  o1: {
    id: "o1",
    title: "کتاب آفلاین نمونه",
    author: "نویسنده و",
    coverUrl: COVER2,
    categoryId: "fantasy",
    summary: "نمونه‌ای که ذخیره آفلاین شده است.",
    tags: ["فانتزی", "آفلاین"],
    parts: [
      { id: "o1-p1", title: "پارت اول", type: "text", content: ["متن نمونه برای خواندن بدون اینترنت."] },
    ],
  },
  pdf1: {
    id: "pdf1",
    title: "کتاب نمونه PDF",
    author: "دیجی‌بوک",
    coverUrl: COVER4,
    categoryId: "literature",
    summary: "خواندن فایل PDF در دیجی‌بوک. این کتاب از فایل Kmyk.pdf استفاده می‌کند.",
    tags: ["PDF", "کتاب الکترونیک"],
    parts: [
      { id: "pdf1-p1", title: "مطالعه کتاب", type: "pdf", content: DIGIBOOK_PDF_URL },
    ],
  },
};

export function getBookById(id: string): BookDetail | null {
  return BOOK_DETAILS[id] ?? null;
}

export function getCategoryName(categoryId: string): string {
  const cat = DIGIBOOK_CATEGORIES.find((c) => c.id === categoryId);
  return cat?.name ?? categoryId;
}

/** Offline: persist saved book IDs (e.g. in localStorage). */
const OFFLINE_KEY = "digibook_offline_ids";

export function getOfflineBookIds(): string[] {
  try {
    const raw = localStorage.getItem(OFFLINE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setBookOffline(bookId: string, add: boolean): void {
  const ids = getOfflineBookIds();
  const next = add ? (ids.includes(bookId) ? ids : [...ids, bookId]) : ids.filter((id) => id !== bookId);
  localStorage.setItem(OFFLINE_KEY, JSON.stringify(next));
}

export function isBookOffline(bookId: string): boolean {
  return getOfflineBookIds().includes(bookId);
}

/** List of books saved for offline (for Library → دانلودها). */
export function getOfflineBooks(): BookItem[] {
  return getOfflineBookIds()
    .map((id) => getBookById(id))
    .filter(Boolean)
    .map((b) => ({
      id: b!.id,
      title: b!.title,
      author: b!.author,
      coverUrl: b!.coverUrl,
      categoryId: b!.categoryId,
      isOffline: true,
    }));
}
