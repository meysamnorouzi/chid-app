import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  PauseIcon,
  HeartIcon,
  ShareIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { WalletHeader } from "../../../components/shared/Wallet";

// Category pill (7 from spec; 8th optional for "داستان")
const PILL_CATEGORIES = [
  { id: "science-comedy", name: "علمی کمدی", color: "from-[#7e4bd0] to-[#a855f7]", isFlagship: true },
  { id: "true-crime", name: "جنایت و معما", color: "from-[#dc2626] to-[#b91c1c]" },
  { id: "business", name: "پول‌ساز", color: "from-[#16a34a] to-[#15803d]" },
  { id: "tech", name: "گیک‌تین", color: "from-[#2563eb] to-[#1d4ed8]" },
  { id: "wellness", name: "وایب مثبت", color: "from-[#ea580c] to-[#c2410c]" },
  { id: "pop-culture", name: "رادیو سینما", color: "from-[#db2777] to-[#be185d]" },
  { id: "gaming", name: "گیم‌روم", color: "from-[#4f46e5] to-[#4338ca]" },
];

interface Episode {
  id: string;
  title: string;
  coverUrl: string;
  duration: string;
  categoryId: string;
  podcastName: string;
}

// Mock episodes per category (cover: square WebP-ready placeholders)
const MOCK_EPISODES: Episode[] = [
  { id: "e1", title: "علم در برابر شایعات", coverUrl: "/image/c30443dd88560f56a71aef4bc60965b7.jpg", duration: "۴۵ دقیقه", categoryId: "science-comedy", podcastName: "Science Vs" },
  { id: "e2", title: "ستاره‌ها و فضا", coverUrl: "/image/c30443dd88560f56a71aef4bc60965b7.jpg", duration: "۳۸ دقیقه", categoryId: "science-comedy", podcastName: "StarTalk" },
  { id: "e3", title: "اپیزود نمونه جنایت", coverUrl: "/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png", duration: "۵۰ دقیقه", categoryId: "true-crime", podcastName: "جنایت و معما" },
  { id: "e4", title: "سرمایه‌گذاری برای نوجوانان", coverUrl: "/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png", duration: "۴۲ دقیقه", categoryId: "business", podcastName: "پول‌ساز" },
  { id: "e5", title: "هوش مصنوعی به زبان ساده", coverUrl: "/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png", duration: "۳۵ دقیقه", categoryId: "tech", podcastName: "گیک‌تین" },
  { id: "e6", title: "ذهن آگاه و آرامش", coverUrl: "/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png", duration: "۴۰ دقیقه", categoryId: "wellness", podcastName: "وایب مثبت" },
  { id: "e7", title: "سینمای امروز", coverUrl: "/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png", duration: "۳۳ دقیقه", categoryId: "pop-culture", podcastName: "رادیو سینما" },
  { id: "e8", title: "بازی‌های پرفروش", coverUrl: "/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png", duration: "۴۸ دقیقه", categoryId: "gaming", podcastName: "گیم‌روم" },
  { id: "e9", title: "اپیزود دوم علمی کمدی", coverUrl: "/image/c30443dd88560f56a71aef4bc60965b7.jpg", duration: "۴۱ دقیقه", categoryId: "science-comedy", podcastName: "Science Vs" },
];

type ViewMode = "home" | "category" | "player";

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5];

const RadioTeen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("home");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const category = selectedCategoryId
    ? PILL_CATEGORIES.find((c) => c.id === selectedCategoryId)
    : null;

  const episodesByCategory = useMemo(() => {
    if (!selectedCategoryId) return [];
    return MOCK_EPISODES.filter((e) => e.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  const filteredEpisodes = useMemo(() => {
    if (!searchQuery.trim()) return episodesByCategory;
    const q = searchQuery.trim().toLowerCase();
    return episodesByCategory.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.podcastName.toLowerCase().includes(q)
    );
  }, [episodesByCategory, searchQuery]);

  const allEpisodesFiltered = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_EPISODES;
    const q = searchQuery.trim().toLowerCase();
    return MOCK_EPISODES.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.podcastName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCategoryClick = (id: string) => {
    setSelectedCategoryId(id);
    setViewMode("category");
  };

  const handleBackFromCategory = () => {
    setSelectedCategoryId(null);
    setViewMode("home");
    setSearchQuery("");
  };

  const handleEpisodeClick = (ep: Episode) => {
    setSelectedEpisode(ep);
    setViewMode("player");
    setIsPlaying(true);
    setProgress(0);
  };

  const handleClosePlayer = () => {
    setViewMode(selectedCategoryId ? "category" : "home");
    // Keep selectedEpisode & isPlaying for background playback + mini-player
  };

  const handleShare = () => {
    if (selectedEpisode)
      navigator.clipboard?.writeText?.(`اپیزود: ${selectedEpisode.title}`);
    setShowSpeedMenu(false);
  };

  const isPlayerOpen = viewMode === "player" && selectedEpisode;
  const showMiniPlayer = isPlaying && selectedEpisode && viewMode !== "player";

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24 overflow-hidden" dir="rtl">
      {/* Fixed header - same as Friends page */}
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader subtitle="@mohammad-mehrabi" />
      </div>

      <div className="px-4 flex-1 overflow-y-auto min-h-0">
        <AnimatePresence mode="wait">
          {viewMode === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Featured: ویژه امروز - علمی کمدی */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#7e4bd0] to-[#6a3fb8] p-5 text-white shadow-lg"
              >
                <p className="text-sm font-medium opacity-90 mb-1">
                  ویژه امروز: علمی کمدی
                </p>
                <h2 className="text-xl font-bold mb-2">
                  Science Vs / StarTalk — ترجمه و بومی شده
                </h2>
                <p className="text-sm opacity-90 mb-4">
                  پادکست پیشنهادی این هفته
                </p>
                <div className="flex gap-3">
                  {MOCK_EPISODES.filter((e) => e.categoryId === "science-comedy")
                    .slice(0, 2)
                    .map((ep) => (
                      <button
                        key={ep.id}
                        onClick={() => handleEpisodeClick(ep)}
                        className="flex-1 min-w-0 flex items-center gap-2 bg-white/20 rounded-xl p-2 backdrop-blur-sm hover:bg-white/30 transition"
                      >
                        <img
                          src={ep.coverUrl}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover aspect-square"
                        />
                        <div className="text-right truncate">
                          <p className="text-sm font-semibold truncate">
                            {ep.title}
                          </p>
                          <p className="text-xs opacity-80">{ep.duration}</p>
                        </div>
                      </button>
                    ))}
                </div>
              </motion.section>

              {/* Search */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="چی می‌خوای بشنوی؟"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0]/20 outline-none text-gray-800 placeholder-gray-400 font-sans"
                  />
                </div>
              </motion.section>

              {/* 7 Pill Categories - Spotify-style tiles */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  دسته‌بندی پادکست‌ها
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {PILL_CATEGORIES.map((pill) => (
                    <motion.button
                      key={pill.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryClick(pill.id)}
                      className={`rounded-xl bg-gradient-to-br ${pill.color} p-4 text-white text-right shadow-md hover:shadow-lg transition flex flex-col justify-end min-h-[100px]`}
                    >
                      <span className="font-bold text-base">{pill.name}</span>
                      {pill.isFlagship && (
                        <span className="text-xs opacity-90 mt-0.5">
                          پرچمدار
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            </motion.div>
          )}

          {viewMode === "category" && category && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackFromCategory}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                  aria-label="برگشت"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h2>
              </div>

              <div className="relative">
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="چی می‌خوای بشنوی؟"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0]/20 outline-none text-gray-800 placeholder-gray-400 font-sans"
                />
              </div>

              <div className="space-y-2">
                {filteredEpisodes.length > 0 ? (
                  filteredEpisodes.map((ep) => (
                    <motion.div
                      key={ep.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => handleEpisodeClick(ep)}
                    >
                      <img
                        src={ep.coverUrl}
                        alt=""
                        className="w-14 h-14 rounded-lg object-cover aspect-square"
                      />
                      <div className="flex-1 min-w-0 text-right">
                        <p className="font-semibold text-gray-800 truncate">
                          {ep.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {ep.podcastName} · {ep.duration}
                        </p>
                      </div>
                      <PlayIcon className="w-6 h-6 text-[#7e4bd0] shrink-0" />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    اپیزودی یافت نشد.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen Player (Bottom Sheet style) */}
      <AnimatePresence>
        {isPlayerOpen && selectedEpisode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <button
                onClick={handleClosePlayer}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="بستن"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-700" />
              </button>
              <span className="text-sm font-medium text-gray-600">در حال پخش</span>
              <div className="w-10" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
              <motion.img
                key={selectedEpisode.coverUrl}
                src={selectedEpisode.coverUrl}
                alt=""
                className="w-64 h-64 rounded-2xl object-cover shadow-xl aspect-square mb-8"
              />
              <h3 className="text-xl font-bold text-gray-800 text-center mb-1">
                {selectedEpisode.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {selectedEpisode.podcastName}
              </p>

              {/* Seek bar */}
              <div className="w-full max-w-sm mb-6">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) =>
                    setProgress(Number((e.target as HTMLInputElement).value))
                  }
                  className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-[#7e4bd0]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{Math.floor((progress / 100) * 45)} دقیقه</span>
                  <span>{selectedEpisode.duration}</span>
                </div>
              </div>

              {/* Playback controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <button
                  onClick={() => setProgress((p) => Math.max(0, p - (100 / 45) * (10 / 60)))}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  aria-label="۱۰ ثانیه عقب"
                >
                  <BackwardIcon className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 rounded-full bg-[#7e4bd0] text-white hover:bg-[#6a3fb8] transition shadow-lg"
                  aria-label={isPlaying ? "توقف" : "پخش"}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-8 h-8" />
                  ) : (
                    <PlayIcon className="w-8 h-8" />
                  )}
                </button>
                <button
                  onClick={() => setProgress((p) => Math.min(100, p + (100 / 45) * (10 / 60)))}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  aria-label="۱۰ ثانیه جلو"
                >
                  <ForwardIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Like, Share, Speed */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  aria-label="لایک"
                >
                  {isLiked ? (
                    <HeartIconSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  aria-label="اشتراک‌گذاری"
                >
                  <ShareIcon className="w-6 h-6 text-gray-600" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-gray-700"
                  >
                    {playbackSpeed}x
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-full left-0 mb-2 py-2 bg-white rounded-xl shadow-lg border border-gray-100 min-w-[80px]">
                      {SPEED_OPTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setPlaybackSpeed(s);
                            setShowSpeedMenu(false);
                          }}
                          className={`block w-full px-4 py-2 text-sm text-right hover:bg-gray-50 ${
                            playbackSpeed === s ? "text-[#7e4bd0] font-semibold" : ""
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini-Player (Glassmorphism) - above tab bar when playing */}
      <AnimatePresence>
        {showMiniPlayer && selectedEpisode && !isPlayerOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-4 right-4 z-40 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg p-3 flex items-center gap-3"
            style={{ maxWidth: "calc(430px - 2rem)", margin: "0 auto" }}
          >
            <img
              src={selectedEpisode.coverUrl}
              alt=""
              className="w-12 h-12 rounded-lg object-cover aspect-square"
            />
            <div className="flex-1 min-w-0 text-right">
              <p className="font-semibold text-gray-800 text-sm truncate">
                {selectedEpisode.title}
              </p>
              <p className="text-xs text-gray-500">{selectedEpisode.podcastName}</p>
            </div>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-2 rounded-full bg-[#7e4bd0] text-white shrink-0"
              aria-label={isPlaying ? "توقف" : "پخش"}
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setViewMode("player")}
              className="text-xs text-[#7e4bd0] font-medium shrink-0"
              aria-label="باز کردن پلیر"
            >
              باز کردن
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RadioTeen;
