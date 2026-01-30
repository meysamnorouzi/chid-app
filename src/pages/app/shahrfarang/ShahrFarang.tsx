import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { WalletHeader } from "../../../components/shared/Wallet";

const SHAHRFARANG_IMAGE_BASE = "/image";

/** دسته‌بندی‌های شهر فرنگ — با تصویر برای کارت‌ها */
export interface ShahrfarangCategory {
  id: string;
  name: string;
  desc: string;
  imageUrl: string;
}

const CATEGORIES: ShahrfarangCategory[] = [
  { id: "funtime", name: "فان تایم", desc: "سرگرمی و لحظات شاد", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/c30443dd88560f56a71aef4bc60965b7.jpg` },
  { id: "tech", name: "تکنولوژی و دیجیتال", desc: "نکات و ترفندهای دیجیتال", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/69c68ee04e3f0f73009ee241d8716406.jpg` },
  { id: "fashion", name: "مد و فشن", desc: "استایل و مد نوجوان", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png` },
  { id: "cooking", name: "آشپزی", desc: "دستور پخت و تنقلات", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/a4f66065367b0a02199f1991d0eaf38b.jpg` },
  { id: "body-soul", name: "جسم و روح", desc: "سلامت و آرامش", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/b0ae40ff-a6cd-4056-b726-fee0e49e7c4f.png` },
  { id: "short-tricks", name: "ترفندهای کوتاه", desc: "نکات کوتاه و کاربردی", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/68c1c772093c3c54af39e41cfbec79de.jpg` },
  { id: "science-edu", name: "علمی و آموزشی", desc: "علم به زبان ساده", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/5004bb46-663e-459e-90de-7ba155a866b0.png` },
  { id: "travel", name: "سیر و سفر", desc: "مناظر و ماجراجویی", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/b92984d3cf394fb4421bd48e9641c964.jpg` },
  { id: "bizteen", name: "بیزینس تین", desc: "کسب‌وکار نوجوان", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/ChatGPTd.png` },
];

const ShahrFarang = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const category = selectedCategoryId
    ? CATEGORIES.find((c) => c.id === selectedCategoryId)
    : null;

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const q = searchQuery.trim().toLowerCase();
    return CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCategoryClick = (id: string) => {
    setSelectedCategoryId(id);
  };

  const handleBack = () => {
    setSelectedCategoryId(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24 overflow-hidden" dir="rtl">
      {/* Header — مثل دیجی‌بوک و رادیوتین */}
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader greeting="شهر فرنگ" subtitle="ویدیوهای کوتاه" />
      </div>

      <div className="px-4 flex-1 overflow-y-auto min-h-0 pt-4">
        <AnimatePresence mode="wait">
          {/* ——— نمای اول: فقط دسته‌بندی‌ها در کارت با تصویر ——— */}
          {!selectedCategoryId && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <section>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="جستجو در دسته‌بندی‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0]/20 outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  دسته‌بندی‌های شهر فرنگ
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {filteredCategories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition relative min-h-[100px] w-full text-right"
                    >
                      <img
                        src={cat.imageUrl}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="relative p-3 flex flex-col justify-end min-h-[100px] text-white">
                        <span className="font-bold text-base">{cat.name}</span>
                        <span className="text-xs opacity-90 mt-0.5">
                          {cat.desc}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
                {filteredCategories.length === 0 && (
                  <p className="text-center text-gray-500 py-6">
                    دسته‌ای یافت نشد.
                  </p>
                )}
              </section>
            </motion.div>
          )}

          {/* ——— نمای دسته انتخاب‌شده: فقط placeholder (بدون ویدیو) ——— */}
          {selectedCategoryId && category && (
            <motion.div
              key="category-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBack}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                  aria-label="برگشت"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h2>
              </div>

              <div className="relative rounded-2xl overflow-hidden min-h-[180px]">
                <img
                  src={category.imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative p-4 flex flex-col justify-end min-h-[180px] text-white">
                  <span className="font-bold text-xl drop-shadow-md">
                    {category.name}
                  </span>
                  <span className="text-sm opacity-90 mt-0.5 drop-shadow-sm">
                    {category.desc}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-2xl">
                <div className="w-20 h-20 rounded-2xl bg-[#7e4bd0]/10 flex items-center justify-center mb-4">
                  <span className="text-3xl" aria-hidden>
                    🎬
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ویدیوها به زودی
                </h3>
                <p className="text-gray-600 text-sm max-w-[280px]">
                  محتوای ویدیویی این دسته به زودی در دسترس خواهد بود.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShahrFarang;
