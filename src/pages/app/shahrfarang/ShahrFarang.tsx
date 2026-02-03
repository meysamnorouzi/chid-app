import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";
import { lineIconPaths } from "../../../utils/lineIcons";
import ShahrFarangReelsViewer, {
  type ReelsVideo,
} from "./ShahrFarangReelsViewer";

const SHAHRFARANG_IMAGE_BASE = "/image";
const VIDEOS_BASE = "/videos";

/** دسته‌بندی‌های شهر فرنگ */
export interface ShahrfarangCategory {
  id: string;
  name: string;
  desc: string;
  imageUrl: string;
}

const CATEGORIES: ShahrfarangCategory[] = [
  { id: "all", name: "همه", desc: "همه دسته‌ها", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/فان تایم.jpg` },
  { id: "funtime", name: "فان تایم", desc: "سرگرمی و لحظات شاد", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/فان تایم.jpg` },
  { id: "tech", name: "تکنولوژی و دیجیتال", desc: "نکات و ترفندهای دیجیتال", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/تکنولوژی.jpg` },
  { id: "fashion", name: "مد و فشن", desc: "استایل و مد نوجوان", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/مد.jpg` },
  { id: "cooking", name: "آشپزی", desc: "دستور پخت و تنقلات", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/آشپزی.jpg` },
  { id: "body-soul", name: "جسم و روح", desc: "سلامت و آرامش", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/جسم و روح.jpg` },
  { id: "short-tricks", name: "ترفندهای کوتاه", desc: "نکات کوتاه و کاربردی", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/ترفندهای کوتاه.jpg` },
  { id: "science-edu", name: "علمی و آموزشی", desc: "علم به زبان ساده", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/علمی و آموزشی.jpg` },
  { id: "travel", name: "سیر و سفر", desc: "مناظر و ماجراجویی", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/سیر و سفر.jpg` },
  { id: "bizteen", name: "بیزینس تین", desc: "کسب‌وکار نوجوان", imageUrl: `${SHAHRFARANG_IMAGE_BASE}/بیزینس تین.jpg` },
];

/** Base videos from public/videos/ — repeated to fill page for sample */
const BASE_VIDEOS: ReelsVideo[] = [
  { id: "1", src: `${VIDEOS_BASE}/IMG_0798.MP4`, categoryId: "funtime", views: "۱۲K", title: "ویدیو سرگرمی" },
  { id: "2", src: `${VIDEOS_BASE}/IMG_0810.MP4`, categoryId: "tech", views: "۸.۵K", title: "تکنولوژی" },
  { id: "3", src: `${VIDEOS_BASE}/video_2026-01-31_19-06-29.mp4`, categoryId: "fashion", views: "۲۳K", title: "مد و فشن" },
  { id: "4", src: `${VIDEOS_BASE}/video_2026-01-31_19-06-33.mp4`, categoryId: "cooking", views: "۱۵K", title: "آشپزی" },
];

/** Repeat base videos to fill full page as sample tiles */
const VIDEOS: ReelsVideo[] = Array.from({ length: 24 }, (_, i) => {
  const base = BASE_VIDEOS[i % BASE_VIDEOS.length];
  return { ...base, id: `${base.id}-${i}` };
});

/** Aspect ratio classes for varied tile sizes — Instagram Explore style */
const ASPECT_RATIOS = [
  "aspect-square",       // 1:1
  "aspect-video",        // 16:9
  "aspect-[9/16]",       // portrait (reels)
  "aspect-[4/5]",        // portrait
  "aspect-[4/3]",        // landscape
  "aspect-[3/4]",        // portrait
] as const;

const ShahrFarang = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reelsOpen, setReelsOpen] = useState(false);
  const [reelsInitialIndex, setReelsInitialIndex] = useState(0);

  const filteredVideos = useMemo(() => {
    let list = activeCategory === "all"
      ? VIDEOS
      : VIDEOS.filter((v) => v.categoryId === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const catNames: Record<string, string> = {
        funtime: "فان تایم", tech: "تکنولوژی", fashion: "مد", cooking: "آشپزی",
        "body-soul": "جسم", "short-tricks": "ترفند", "science-edu": "علمی",
        travel: "سفر", bizteen: "بیزینس",
      };
      list = list.filter(
        (v) =>
          v.views.includes(q) ||
          (v.title && v.title.toLowerCase().includes(q)) ||
          (catNames[v.categoryId] && catNames[v.categoryId].includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const openReels = (index: number) => {
    setReelsInitialIndex(index);
    setReelsOpen(true);
  };

  return (
    <div className="flex flex-col bg-white pb-24 min-h-screen overflow-hidden" dir="rtl">
      <div className="px-4 md:px-6 lg:px-8 flex-1 overflow-y-auto min-h-0 max-w-7xl pt-0 pb-4 mx-auto w-full">
        {/* Categories row — like Shop */}
        <div className="flex gap-3 md:gap-4 lg:gap-5 mb-3 md:mb-4 overflow-x-auto md:overflow-x-visible scrollbar-hide pb-2 md:pb-0 md:justify-center md:flex-wrap">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex flex-col items-center cursor-pointer shrink-0"
            >
              <div
                className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border rounded-xl md:rounded-2xl transition-all overflow-hidden bg-white hover:shadow-md ${
                  activeCategory === cat.id
                    ? "border-[#7e4bd0] border-2 md:border-[3px]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className={`text-xs md:text-sm lg:text-base font-medium mt-2 md:mt-3 ${
                  activeCategory === cat.id
                    ? "text-[#7e4bd0] font-semibold"
                    : "text-gray-700"
                }`}
              >
                {cat.name}
              </p>
            </div>
          ))}
        </div>

        {/* Search input — below categories, like Shop */}
        <div className="mb-3 md:mb-4 lg:mb-6">
          <div className="relative max-w-2xl md:mx-auto">
            <img
              src={lineIconPaths.searchRiz}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 opacity-50"
              alt="جستجو"
            />
            <input
              type="text"
              placeholder="جستجوی ویدیوها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 md:pr-12 pl-4 md:pl-6 py-3 md:py-4 placeholder-gray-400 text-black bg-white border border-gray-400 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base"
            />
          </div>
        </div>

        {/* Explore grid — varied aspect ratios, Instagram style (columns = masonry) */}
        <div className="columns-3 gap-1">
          {filteredVideos.map((video, index) => {
            const aspect = ASPECT_RATIOS[index % ASPECT_RATIOS.length];
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                onClick={() => openReels(index)}
                className={`relative cursor-pointer group overflow-hidden bg-gray-100 break-inside-avoid mb-1 ${aspect}`}
              >
                <video
                  src={video.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onLoadedData={(e) => {
                    const v = e.currentTarget;
                    v.currentTime = 0.1;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <PlayIcon className="w-10 h-10 md:w-12 md:h-12 text-white opacity-0 group-hover:opacity-90 drop-shadow-lg transition-opacity" />
                </div>
                <div className="absolute bottom-1 right-1 flex items-center gap-0.5 text-white text-xs font-medium drop-shadow-md">
                  <PlayIcon className="w-3.5 h-3.5" />
                  <span>{video.views}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#7e4bd0]/10 flex items-center justify-center mb-4">
              <span className="text-3xl" aria-hidden>🎬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">ویدیویی یافت نشد</h3>
            <p className="text-gray-600 text-sm">
              {searchQuery
                ? "نتیجه‌ای برای جستجوی شما یافت نشد."
                : "در این دسته هنوز ویدیویی قرار نگرفته است."}
            </p>
          </div>
        )}
      </div>

      {/* Reels fullscreen viewer */}
      {reelsOpen && (
        <ShahrFarangReelsViewer
          videos={filteredVideos}
          initialIndex={reelsInitialIndex}
          onClose={() => setReelsOpen(false)}
        />
      )}
    </div>
  );
};

export default ShahrFarang;
