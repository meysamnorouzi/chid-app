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

export type PartType = "text" | "image";

export interface BookPart {
  id: string;
  title: string;
  type: PartType;
  /** For text: paragraph strings. For image: image URLs (WebP preferred). */
  content: string[] | string;
}

export interface BookDetail extends BookItem {
  summary: string;
  tags: string[];
  parts: BookPart[];
}

const IMG = "/image/c30443dd88560f56a71aef4bc60965b7.jpg";
const IMG2 = "/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png";

/** Mock books for list views (Home, Explore, Library). */
export const TRENDING_BOOKS: BookItem[] = [
  { id: "t1", title: "سفر به ستاره‌ها", author: "نویسنده الف", coverUrl: IMG, categoryId: "scifi" },
  { id: "t2", title: "قلعه اژدها", author: "نویسنده ب", coverUrl: IMG2, categoryId: "fantasy" },
  { id: "t3", title: "راز شب", author: "نویسنده ج", coverUrl: IMG, categoryId: "mystery" },
];

export const CONTINUE_READING: BookItem[] = [
  { id: "c1", title: "دنیای مانگا", author: "نویسنده د", coverUrl: IMG2, categoryId: "manga", part: 3, progress: 45 },
  { id: "c2", title: "کمیک قهرمانان", author: "نویسنده ه", coverUrl: IMG, categoryId: "comic", part: 1, progress: 80 },
];

export const LIBRARY_OFFLINE: BookItem[] = [
  { id: "o1", title: "کتاب آفلاین نمونه", author: "نویسنده و", coverUrl: IMG2, categoryId: "fantasy", isOffline: true },
];

/** All book IDs that have detail + parts (for detail page and reader). */
const BOOK_IDS = new Set(["t1", "t2", "t3", "c1", "c2", "o1"]);

/** Mock book details with parts (صفحه شناسنامه کتاب + ریدر). */
const BOOK_DETAILS: Record<string, BookDetail> = {
  t1: {
    id: "t1",
    title: "سفر به ستاره‌ها",
    author: "نویسنده الف",
    coverUrl: IMG,
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
    coverUrl: IMG2,
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
    coverUrl: IMG,
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
  c1: {
    id: "c1",
    title: "دنیای مانگا",
    author: "نویسنده د",
    coverUrl: IMG2,
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
    coverUrl: IMG,
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
    coverUrl: IMG2,
    categoryId: "fantasy",
    summary: "نمونه‌ای که ذخیره آفلاین شده است.",
    tags: ["فانتزی", "آفلاین"],
    parts: [
      { id: "o1-p1", title: "پارت اول", type: "text", content: ["متن نمونه برای خواندن بدون اینترنت."] },
    ],
  },
};

export function getBookById(id: string): BookDetail | null {
  return BOOK_DETAILS[id] ?? null;
}

export function getCategoryName(categoryId: string): string {
  const names: Record<string, string> = {
    manga: "مانگا",
    comic: "کمیک",
    fanfiction: "فن‌فیکشن",
    fantasy: "فانتزی",
    scifi: "علمی‌تخیلی",
    horror: "ترسناک",
    teen: "داستان نوجوان",
    mystery: "معمایی/جنایی",
    action: "اکشن",
    paranormal: "ماوراءالطبیعه",
    magazines: "مجلات معروف",
  };
  return names[categoryId] ?? categoryId;
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
