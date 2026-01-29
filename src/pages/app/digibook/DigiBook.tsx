import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  BookmarkIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { WalletHeader } from "../../../components/shared/Wallet";
import { TRENDING_BOOKS, CONTINUE_READING, getOfflineBooks, type BookItem } from "./data";

type TabId = "home" | "explore" | "create" | "library";

const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "ویترین" },
  { id: "explore", label: "جستجو و کاوش" },
  { id: "create", label: "ایجاد" },
  { id: "library", label: "کتابخانه" },
];

// دسته‌بندی‌های اصلی (Explore) per spec
const CATEGORIES = [
  { id: "manga", name: "مانگا", color: "from-rose-500 to-pink-600", desc: "دنیای اختصاصی آثار ژاپنی" },
  { id: "comic", name: "کمیک", color: "from-blue-500 to-indigo-600", desc: "آثار غربی و ایرانی" },
  { id: "fanfiction", name: "فن‌فیکشن", color: "from-violet-500 to-purple-600", desc: "داستان‌های بر پایه شخصیت‌های محبوب" },
  { id: "fantasy", name: "فانتزی", color: "from-amber-500 to-orange-600", desc: "جادویی، حماسی" },
  { id: "scifi", name: "علمی‌تخیلی", color: "from-cyan-500 to-teal-600", desc: "آینده‌نگرانه، فضایی" },
  { id: "horror", name: "ترسناک", color: "from-gray-700 to-gray-900", desc: "ژانر وحشت و بقا" },
  { id: "teen", name: "داستان نوجوان", color: "from-emerald-500 to-green-600", desc: "روزمرگی نسل Z/Alpha" },
  { id: "mystery", name: "معمایی/جنایی", color: "from-slate-600 to-slate-800", desc: "پلیسی و رازآلود" },
  { id: "action", name: "اکشن", color: "from-red-500 to-rose-600", desc: "ماجراجویی پرتحرک" },
  { id: "paranormal", name: "ماوراءالطبیعه", color: "from-indigo-600 to-purple-800", desc: "ارواح و موجودات خیالی" },
  { id: "magazines", name: "مجلات معروف", color: "from-[#7e4bd0] to-[#6a3fb8]", desc: "مثل نشنال جئوگرافیک" },
];

const DigiBook = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const libraryOfflineBooks = useMemo(() => getOfflineBooks(), [activeTab]);

  const category = selectedCategoryId ? CATEGORIES.find((c) => c.id === selectedCategoryId) : null;

  // Filter books by category (for Explore drill-down) — mock list
  const booksByCategory = useMemo(() => {
    if (!selectedCategoryId) return [];
    return [...TRENDING_BOOKS, ...CONTINUE_READING].filter((b) => b.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const q = searchQuery.trim().toLowerCase();
    return CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24 overflow-hidden" dir="rtl">
      {/* Fixed header - same as Friends page */}
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader subtitle="@mohammad-mehrabi" />
      </div>

      {/* Segment: ویترین | جستجو و کاوش | ایجاد | کتابخانه */}
      <div className="px-4 pb-3 border-b border-gray-100 shrink-0">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedCategoryId(null);
              }}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-[#7e4bd0] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 flex-1 overflow-y-auto min-h-0 pt-4">
        <AnimatePresence mode="wait">
          {/* ——— ویترین (Home): فید شخصی‌سازی شده و ترندها ——— */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#7e4bd0] to-[#6a3fb8] p-5 text-white shadow-lg"
              >
                <p className="text-sm font-medium opacity-90 mb-1">ویژه امروز</p>
                <h2 className="text-xl font-bold mb-2">کتاب و کمیک برای نوجوانان</h2>
                <p className="text-sm opacity-90 mb-4">پیشنهادهای هفته بر اساس سلیقه تو</p>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {TRENDING_BOOKS.slice(0, 3).map((book) => (
                    <button
                      key={book.id}
                      onClick={() => navigate(`/digibook/${book.id}`)}
                      className="shrink-0 w-28 text-right"
                    >
                      <img
                        src={book.coverUrl}
                        alt=""
                        className="w-full aspect-[2/3] rounded-xl object-cover shadow-md"
                      />
                      <p className="text-xs font-semibold mt-2 truncate">{book.title}</p>
                      <p className="text-xs opacity-80 truncate">{book.author}</p>
                    </button>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">ترندها</h3>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {TRENDING_BOOKS.map((book) => (
                    <motion.button
                      key={book.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/digibook/${book.id}`)}
                      className="shrink-0 w-28"
                    >
                      <img
                        src={book.coverUrl}
                        alt=""
                        className="w-full aspect-[2/3] rounded-xl object-cover shadow-md hover:shadow-lg transition"
                      />
                      <p className="text-sm font-semibold text-gray-800 mt-2 truncate">{book.title}</p>
                      <p className="text-xs text-gray-500 truncate">{book.author}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">ادامه بخوان</h3>
                <div className="space-y-3">
                  {CONTINUE_READING.map((book) => (
                    <motion.div
                      key={book.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => navigate(`/digibook/${book.id}`)}
                    >
                      <img
                        src={book.coverUrl}
                        alt=""
                        className="w-14 h-[4.5rem] rounded-lg object-cover aspect-[2/3] shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-right">
                        <p className="font-semibold text-gray-800 truncate">{book.title}</p>
                        <p className="text-sm text-gray-500">
                          {book.author} {book.part != null && ` · پارت ${book.part}`}
                        </p>
                        {book.progress != null && (
                          <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#7e4bd0] rounded-full"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400 shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </motion.div>
          )}

          {/* ——— جستجو و کاوش (Explore): دسته‌بندی‌ها و فیلتر ——— */}
          {activeTab === "explore" && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {!selectedCategoryId ? (
                <>
                  <section>
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="جستجو در دسته‌بندی‌ها یا عنوان کتاب..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0]/20 outline-none text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">دسته‌بندی‌های اصلی</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {filteredCategories.map((cat) => (
                        <motion.button
                          key={cat.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCategoryId(cat.id)}
                          className={`rounded-xl bg-gradient-to-br ${cat.color} p-4 text-white text-right shadow-md hover:shadow-lg transition flex flex-col justify-end min-h-[100px]`}
                        >
                          <span className="font-bold text-base">{cat.name}</span>
                          <span className="text-xs opacity-90 mt-0.5">{cat.desc}</span>
                        </motion.button>
                      ))}
                    </div>
                    {filteredCategories.length === 0 && (
                      <p className="text-center text-gray-500 py-6">دسته‌ای یافت نشد.</p>
                    )}
                  </section>
                </>
              ) : (
                <motion.div
                  key="category-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedCategoryId(null)}
                      className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                      aria-label="برگشت"
                    >
                      <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">
                      {category?.name}
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {booksByCategory.length > 0 ? (
                      booksByCategory.map((book) => (
                        <motion.div
                          key={book.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                          onClick={() => navigate(`/digibook/${book.id}`)}
                        >
                          <img
                            src={book.coverUrl}
                            alt=""
                            className="w-14 h-[4.5rem] rounded-lg object-cover aspect-[2/3] shrink-0"
                          />
                          <div className="flex-1 min-w-0 text-right">
                            <p className="font-semibold text-gray-800 truncate">{book.title}</p>
                            <p className="text-sm text-gray-500">{book.author}</p>
                          </div>
                          <ChevronRightIcon className="w-5 h-5 text-[#7e4bd0] shrink-0" />
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">کتابی در این دسته موجود نیست.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ——— ایجاد (Create/Write): پنل نویسندگان — در مراحل بعدی ——— */}
          {activeTab === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#7e4bd0]/10 flex items-center justify-center mb-4">
                <PencilSquareIcon className="w-10 h-10 text-[#7e4bd0]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">استودیو نویسندگی</h3>
              <p className="text-gray-600 text-sm max-w-[280px] mb-6">
                تعریف داستان، مدیریت پارت‌ها و انتشار محتوا به زودی در دسترس خواهد بود.
              </p>
              <button
                disabled
                className="px-6 py-3 rounded-xl bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
              >
                به زودی
              </button>
            </motion.div>
          )}

          {/* ——— کتابخانه (Library): قفسه فعال و دانلودها ——— */}
          {activeTab === "library" && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BookmarkIcon className="w-5 h-5 text-[#7e4bd0]" />
                  قفسه فعال
                </h3>
                <p className="text-sm text-gray-500 mb-3">آخرین پارت و موقعیت اسکرول ذخیره می‌شود.</p>
                <div className="space-y-3">
                  {CONTINUE_READING.map((book) => (
                    <motion.div
                      key={book.id}
                      layout
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => navigate(`/digibook/${book.id}`)}
                    >
                      <img
                        src={book.coverUrl}
                        alt=""
                        className="w-14 h-[4.5rem] rounded-lg object-cover aspect-[2/3] shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-right">
                        <p className="font-semibold text-gray-800 truncate">{book.title}</p>
                        <p className="text-sm text-gray-500">
                          {book.author} {book.part != null && ` · پارت ${book.part}`}
                        </p>
                        {book.progress != null && (
                          <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#7e4bd0] rounded-full"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400 shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <ArrowDownTrayIcon className="w-5 h-5 text-[#7e4bd0]" />
                  دانلودها
                </h3>
                <p className="text-sm text-gray-500 mb-3">ذخیره آفلاین از صفحه شناسنامه کتاب.</p>
                <div className="space-y-3">
                  {libraryOfflineBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      layout
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => navigate(`/digibook/${book.id}`)}
                    >
                      <img
                        src={book.coverUrl}
                        alt=""
                        className="w-14 h-[4.5rem] rounded-lg object-cover aspect-[2/3] shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-right">
                        <p className="font-semibold text-gray-800 truncate">{book.title}</p>
                        <p className="text-xs text-[#7e4bd0] font-medium">آفلاین</p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400 shrink-0" />
                    </motion.div>
                  ))}
                  {libraryOfflineBooks.length === 0 && (
                    <p className="text-center text-gray-500 py-6">هنوز کتابی آفلاین ندارید.</p>
                  )}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DigiBook;
