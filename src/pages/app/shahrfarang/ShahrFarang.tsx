import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline, BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { WalletHeader } from "../../../components/shared/Wallet";

// دسته‌بندی‌های شهر فرنگ
const CATEGORIES = [
  { id: "funtime", name: "فان تایم" },
  { id: "tech", name: "تکنولوژی و دیجیتال" },
  { id: "fashion", name: "مد و فشن" },
  { id: "cooking", name: "آشپزی" },
  { id: "body-soul", name: "جسم و روح" },
  { id: "short-tricks", name: "ترفندهای کوتاه" },
  { id: "science-edu", name: "علمی و آموزشی" },
  { id: "travel", name: "سیر و سفر" },
  { id: "bizteen", name: "بیزینس تین" },
];

export interface ReelItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl?: string;
  author: string;
  likes: number;
  categoryId: string;
}

const SAMPLE_REELS: ReelItem[] = [
  { id: "1", title: "طبیعت زیبا", description: "مناظر کوهستانی ایران", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", author: "دیجی‌نوجوان", likes: 1240, categoryId: "travel" },
  { id: "2", title: "ماجراجویی", description: "سفر به شمال", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", author: "سارا", likes: 890, categoryId: "travel" },
  { id: "3", title: "سرگرمی", description: "لحظات شاد", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", author: "علی", likes: 2340, categoryId: "funtime" },
  { id: "4", title: "موسیقی", description: "آهنگ مورد علاقه", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", author: "رضا", likes: 560, categoryId: "funtime" },
  { id: "5", title: "علم و فناوری", description: "نکات جالب", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", author: "زهرا", likes: 1890, categoryId: "tech" },
  { id: "6", title: "استایل تابستانه", description: "مد و فشن نوجوان", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", author: "سارا", likes: 720, categoryId: "fashion" },
  { id: "7", title: "صبحانه فوری", description: "دستور پخت آسان", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", author: "علی", likes: 1100, categoryId: "cooking" },
  { id: "8", title: "مدیتیشن ۵ دقیقه", description: "آرامش جسم و روح", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", author: "زهرا", likes: 950, categoryId: "body-soul" },
  { id: "9", title: "ترفند آیفون", description: "۴ نکته که نمی‌دانستی", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", author: "رضا", likes: 2100, categoryId: "short-tricks" },
  { id: "10", title: "چرا آسمان آبیه؟", description: "علم به زبان ساده", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", author: "دیجی‌نوجوان", likes: 1680, categoryId: "science-edu" },
  { id: "11", title: "استارتاپ در نوجوانی", description: "بیزینس تین", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", author: "سارا", likes: 830, categoryId: "bizteen" },
];

interface ReelCardProps {
  reel: ReelItem;
  isActive: boolean;
  isLiked: boolean;
  isSaved: boolean;
  onLike: () => void;
  onSave: () => void;
}

function ReelCard({ reel, isActive, isLiked, isSaved, onLike, onSave }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-full min-h-[100dvh] snap-center snap-always flex-shrink-0 bg-black">
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        poster={reel.posterUrl}
      />

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"
        aria-hidden
      />

      {/* Right-side actions (RTL: visually on left) - Like, Save */}
      <div className="absolute bottom-28 left-4 flex flex-col gap-6 z-10">
        <motion.button
          type="button"
          onClick={onLike}
          className="flex flex-col items-center gap-1 text-white"
          whileTap={{ scale: 0.9 }}
          aria-label={isLiked ? "لغو لایک" : "لایک"}
        >
          {isLiked ? (
            <HeartIcon className="w-9 h-9 text-red-500 drop-shadow-lg" />
          ) : (
            <HeartOutline className="w-9 h-9 drop-shadow-lg" />
          )}
          <span className="text-xs font-medium drop-shadow-md">{reel.likes}</span>
        </motion.button>
        <motion.button
          type="button"
          onClick={onSave}
          className="flex flex-col items-center gap-1 text-white"
          whileTap={{ scale: 0.9 }}
          aria-label={isSaved ? "حذف از ذخیره" : "ذخیره"}
        >
          {isSaved ? (
            <BookmarkIcon className="w-9 h-9 text-[#7e4bd0] drop-shadow-lg" />
          ) : (
            <BookmarkOutline className="w-9 h-9 drop-shadow-lg" />
          )}
          <span className="text-xs font-medium drop-shadow-md">ذخیره</span>
        </motion.button>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-6 right-4 left-16 z-10 text-right">
        <p className="text-white font-bold text-lg drop-shadow-md">{reel.author}</p>
        <p className="text-white/95 text-sm mt-0.5 drop-shadow-md line-clamp-2">{reel.description}</p>
      </div>
    </div>
  );
}

const ShahrFarang = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredReels = useMemo(() => {
    let list = SAMPLE_REELS;
    if (selectedCategoryId) {
      list = list.filter((r) => r.categoryId === selectedCategoryId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery, selectedCategoryId]);

  const handleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Snap scroll: detect which reel is in view and set activeIndex
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number(entry.target.getAttribute("data-reel-index"));
          if (!Number.isNaN(index)) setActiveIndex(index);
        }
      },
      { root: container, rootMargin: "0px", threshold: 0.6 }
    );

    const slides = container.querySelectorAll("[data-reel-index]");
    slides.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredReels.length]);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery, selectedCategoryId]);

  return (
    <div className="flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden bg-black" dir="rtl">
      {/* Header with search */}
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader
          greeting="شهر فرنگ"
          subtitle="ویدیوهای کوتاه"
          icon={
            <motion.button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full border border-[#7e4bd0] bg-white hover:bg-purple-50 transition-colors"
              aria-label="جستجو"
              whileTap={{ scale: 0.95 }}
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-[#7e4bd0]" />
            </motion.button>
          }
        />

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="p-4 flex gap-2 items-center">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو در ویدیوها..."
                    className="w-full py-2.5 pr-10 pl-10 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0]/20 outline-none text-right"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="بستن"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category pills */}
      <div className="shrink-0 px-4 py-2 bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          <button
            type="button"
            onClick={() => setSelectedCategoryId(null)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategoryId === null
                ? "bg-[#7e4bd0] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            همه
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategoryId === cat.id
                  ? "bg-[#7e4bd0] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Reels feed - full height scroll with snap (scrollbar hidden) */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory overscroll-y-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {filteredReels.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-white/80 px-4">
            <p className="text-lg font-medium">ویدیویی یافت نشد</p>
            <p className="text-sm mt-2">عبارت جستجو را عوض کنید</p>
          </div>
        ) : (
          filteredReels.map((reel, index) => (
            <div
              key={reel.id}
              data-reel-index={index}
              className="w-full min-h-[100dvh] snap-center snap-always"
              style={{ scrollSnapAlign: "start" }}
            >
              <ReelCard
                reel={reel}
                isActive={index === activeIndex}
                isLiked={likedIds.has(reel.id)}
                isSaved={savedIds.has(reel.id)}
                onLike={() => handleLike(reel.id)}
                onSave={() => handleSave(reel.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShahrFarang;
