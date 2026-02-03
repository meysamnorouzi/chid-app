import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { lineIconPaths } from "../../../utils/lineIcons";

const TEEN_AVATARS_BASE = "/logo/teens%20profiles";

export interface UserProfile {
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  digits?: number; // optional display balance
}

// Searchable users – multiple results with more data (teen profile avatars)
const SEARCHABLE_USERS: UserProfile[] = [
  { username: "ali_rezaei", name: "علی رضایی", avatar: `${TEEN_AVATARS_BASE}/dep.svg`, bio: "برنامه‌نویس و عاشق تکنولوژی", digits: 320 },
  { username: "sara_mohammadi", name: "سارا محمدی", avatar: `${TEEN_AVATARS_BASE}/ferzi.svg`, bio: "طراح UI/UX", digits: 150 },
  { username: "amir_khan", name: "امیر خان", avatar: `${TEEN_AVATARS_BASE}/batman.svg`, bio: "بازیکن حرفه‌ای", digits: 500 },
  { username: "fateme_ahmadi", name: "فاطمه احمدی", avatar: `${TEEN_AVATARS_BASE}/rabi.svg`, bio: "دانشجو", digits: 80 },
  { username: "ali_digi", name: "علی", avatar: `${TEEN_AVATARS_BASE}/batman.svg`, bio: "علاقه‌مند به بازی", digits: 200 },
  { username: "sara_teen", name: "سارا", avatar: `${TEEN_AVATARS_BASE}/elphy.svg`, bio: "دوستان جدید", digits: 100 },
  { username: "mamad", name: "ممد", avatar: `${TEEN_AVATARS_BASE}/hero.svg`, bio: "دیجیت نوجوان", digits: 450 },
  { username: "reza_teen", name: "رضا", avatar: `${TEEN_AVATARS_BASE}/dep.svg`, bio: "کافه و دوستان", digits: 120 },
  { username: "parsa", name: "پارسا", avatar: `${TEEN_AVATARS_BASE}/naroto.svg`, bio: "انیمه و گیم", digits: 90 },
  { username: "narges", name: "نرگس", avatar: `${TEEN_AVATARS_BASE}/skull.svg`, bio: "موسیقی و هنر", digits: 300 },
  { username: "amir_digi", name: "امیر", avatar: `${TEEN_AVATARS_BASE}/wiking.svg`, bio: "کتاب و سفر", digits: 180 },
  { username: "dorsa", name: "درسا", avatar: `${TEEN_AVATARS_BASE}/cap.svg`, bio: "ورزش و سلامتی", digits: 220 },
];

function searchUsers(query: string): UserProfile[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCHABLE_USERS.filter(
    (u) =>
      u.username.toLowerCase().includes(q) ||
      u.name.includes(query.trim()) ||
      u.name.toLowerCase().includes(q)
  );
}

// Gift card config: amount, title, icon from public/icons/gift
const GIFT_CARDS = [
  { amount: 100, title: "هدیه ۱۰۰ دیجیت", icon: "/icons/gift/small.svg" },
  { amount: 500, title: "هدیه ۵۰۰ دیجیت", icon: "/icons/gift/medium.svg" },
  { amount: 1000, title: "هدیه ۱۰۰۰ دیجیت", icon: "/icons/gift/large.svg" },
] as const;

const GiftIconWhite = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 91 102"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 1.5 }}
  >
    <g transform="matrix(1,0,0,1,-952.555475,-193.846865)">
      <g transform="matrix(1,0,0,1,-150.643,2.40858)">
        <path
          d="M1190.31,236.965L1190.31,272.368C1190.31,282.138 1182.38,290.07 1172.61,290.07L1137.21,290.07C1115.19,290.07 1095.67,285.958 1113.11,265.523L1119.01,258.613L1119.5,236.965C1119.5,217.569 1127.44,219.263 1137.21,219.263L1172.61,219.263C1182.38,219.263 1190.31,217.857 1190.31,236.965ZM1119.57,248.475L1187.54,248.475M1156.36,221.585C1155.71,238.766 1156.11,244.111 1155.18,258.186L1155.18,288.195M1143.56,258.086C1135.75,257.665 1135.26,267.16 1143.28,267.216M1144.67,279.274C1144.02,282.19 1139.64,288.493 1135.06,289.651M1155.18,219.562C1154.13,219.492 1134.25,220.188 1131.9,207.062C1129.85,195.634 1155.4,184.216 1156.01,211.369C1156.03,212.326 1156.01,212.31 1155.92,216.731C1162.33,182.413 1184.48,196.045 1182.17,206.916C1182.06,207.441 1180.52,212.87 1173.49,216.636C1166.6,220.334 1156.66,219.662 1155.18,219.562Z"
          style={{ fill: "none", stroke: "white", strokeWidth: "6.38px" }}
        />
      </g>
    </g>
  </svg>
);

const formatBalance = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

function GiveGiftDigit() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [selectedGiftAmount, setSelectedGiftAmount] = useState<number | null>(GIFT_CARDS[0].amount);
  const [giftMessage, setGiftMessage] = useState("");
  const [cardIndex, setCardIndex] = useState(0);
  const [parentDigitBalance, setParentDigitBalance] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const submitSectionRef = useRef<HTMLDivElement>(null);
  const lastProgrammaticScrollAt = useRef<number>(0);

  useEffect(() => {
    const parentWalletKey = "parentWallet";
    const stored = localStorage.getItem(parentWalletKey);
    if (stored) {
      const data = JSON.parse(stored);
      setParentDigitBalance(data.digits ?? 0);
    } else {
      setParentDigitBalance(1000);
    }
  }, []);

  // Search: show multiple results when user types
  useEffect(() => {
    const results = searchUsers(searchQuery);
    setSearchResults(results);
    if (!searchQuery.trim()) setSelectedProfile(null);
  }, [searchQuery]);

  const updateSelectedFromScroll = useCallback(() => {
    if (Date.now() - lastProgrammaticScrollAt.current < 500) return;
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.88 + 12;
    const isRtl = document.documentElement.dir === "rtl" || document.documentElement.getAttribute("dir") === "rtl";
    const scrollPos = isRtl ? -el.scrollLeft : el.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    const clamped = Math.max(0, Math.min(index, GIFT_CARDS.length - 1));
    setCardIndex(clamped);
    setSelectedGiftAmount(GIFT_CARDS[clamped].amount);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateSelectedFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateSelectedFromScroll);
  }, [updateSelectedFromScroll]);

  // When user first selects a recipient, reset gift card selection to first (slider stays at 0)
  useEffect(() => {
    if (selectedProfile) {
      setCardIndex(0);
      setSelectedGiftAmount(GIFT_CARDS[0].amount);
    }
  }, [selectedProfile]);

  // Scroll page to submit section once when user first selects a recipient (not on every card change)
  useEffect(() => {
    if (!selectedProfile) return;
    const t = setTimeout(() => {
      submitSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
    return () => clearTimeout(t);
  }, [selectedProfile]);

  const handleGiveGift = () => {
    if (!selectedProfile || !selectedGiftAmount || selectedGiftAmount <= 0 || selectedGiftAmount > parentDigitBalance) return;

    const parentWalletKey = "parentWallet";
    const stored = localStorage.getItem(parentWalletKey);
    const walletData = stored ? JSON.parse(stored) : { money: 0, digits: 0 };
    walletData.digits = (walletData.digits || 0) - selectedGiftAmount;
    localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

    const walletDigitActivitiesKey = "walletDigitActivities";
    const storedActivities = localStorage.getItem(walletDigitActivitiesKey);
    const activities = storedActivities ? JSON.parse(storedActivities) : [];
    activities.unshift({
      id: `gift_${Date.now()}`,
      title: `هدیه دادن دیجیت به ${selectedProfile.name}`,
      amount: selectedGiftAmount,
      type: "expense",
      date: Date.now(),
      icon: "wallet",
    });
    localStorage.setItem(walletDigitActivitiesKey, JSON.stringify(activities));

    navigate("/wallet-digit");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32" dir="rtl">
      {/* Header */}
      <div className="bg-[#7e4bd0] text-white px-4 py-5">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <button
            type="button"
            onClick={() => navigate("/wallet-digit")}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">هدیه دادن دیجیت</h1>
        </div>
        <p className="text-white/80 text-sm mt-1 px-4 max-w-6xl mx-auto mr-13">
          نام کاربری فردی که میخوای بهش هدیه بدی
        </p>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Search input — typing anything shows علی رضایی */}
        <div className="space-y-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0]/20 outline-none transition-all"
            placeholder="نام کاربری را وارد کنید"
            dir="ltr"
          />
        </div>

        {/* Search results: multiple users with more data */}
        {searchQuery.trim() && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">
              {searchResults.length > 0
                ? `${searchResults.length} نفر یافت شد — یکی را انتخاب کنید`
                : "نتیجه‌ای یافت نشد"}
            </p>
            {searchResults.length > 0 && (
              <div className="max-h-64 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                {searchResults.map((user) => (
                  <motion.div
                    key={user.username}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProfile(user)}
                    className={`bg-white border rounded-xl p-3 shadow-sm cursor-pointer transition-all flex items-center gap-3 ${
                      selectedProfile?.username === user.username
                        ? "border-[#7e4bd0] ring-2 ring-[#7e4bd0]/30"
                        : "border-gray-200 hover:border-[#7e4bd0]/50"
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover object-top border-2 border-gray-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 dir-ltr text-right">@{user.username}</p>
                      {user.bio && (
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{user.bio}</p>
                      )}
                      {user.digits != null && (
                        <p className="text-xs text-amber-600 mt-1">
                          موجودی: {formatBalance(user.digits)} دیجیت
                        </p>
                      )}
                    </div>
                    {selectedProfile?.username === user.username && (
                      <CheckIcon className="w-6 h-6 text-[#7e4bd0] shrink-0" strokeWidth={2.5} />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {!searchQuery.trim() && !selectedProfile && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <img src={lineIconPaths.searchRiz} className="w-16 h-16 mb-2" alt="جستجو" />
            <p className="text-sm">نام کاربری را وارد کنید</p>
          </div>
        )}

        {/* Selected recipient — visible when user is chosen for sending gift */}
        {selectedProfile && (
          <div className="bg-gradient-to-r from-[#7e4bd0]/10 to-amber-500/10 border-2 border-[#7e4bd0]/30 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 mb-2">هدیه به:</p>
            <div className="flex items-center gap-3">
              <img
                src={selectedProfile.avatar}
                alt={selectedProfile.name}
                className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#7e4bd0]"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">{selectedProfile.name}</p>
                <p className="text-sm text-gray-500 dir-ltr text-right">@{selectedProfile.username}</p>
                {selectedProfile.bio && (
                  <p className="text-xs text-gray-600 mt-1">{selectedProfile.bio}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedProfile(null)}
                className="text-sm font-medium text-[#7e4bd0] hover:underline shrink-0"
              >
                تغییر
              </button>
            </div>
          </div>
        )}

        {selectedProfile && (
          <>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                مقدار دیجیتی که میخوای هدیه بدی
              </label>
              <div
                ref={sliderRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 no-scrollbar"
                style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
              >
                {GIFT_CARDS.map((card, index) => {
                  const isDisabled = card.amount > parentDigitBalance;
                  const isSelected = selectedGiftAmount === card.amount;
                  return (
                    <motion.div
                      key={card.amount}
                      ref={(el) => {
                        if (cardRefs.current) cardRefs.current[index] = el;
                      }}
                      role="button"
                      tabIndex={0}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCardIndex(index);
                        setSelectedGiftAmount(card.amount);
                        lastProgrammaticScrollAt.current = Date.now();
                        cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setCardIndex(index);
                          setSelectedGiftAmount(card.amount);
                          lastProgrammaticScrollAt.current = Date.now();
                          cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                        }
                      }}
                      className={`flex-[0_0_88%] min-w-[88%] snap-start snap-always shrink-0 rounded-2xl overflow-hidden shadow-lg transition-all my-4 mx-2 ${
                        isSelected ? "ring-2 ring-amber-500 ring-offset-2" : ""
                      } ${isDisabled ? "opacity-75" : ""}`}
                      style={{ scrollSnapAlign: "start" }}
                    >
                      <div
                        className={`relative w-full rounded-2xl p-5 min-h-[200px] flex flex-col justify-between bg-gradient-to-br ${
                          isDisabled ? "from-gray-400 to-gray-500" : "from-amber-500 via-amber-600 to-amber-700"
                        } text-white`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="w-9 h-9 flex items-center justify-center shrink-0 relative">
                            <AnimatePresence mode="wait">
                              {isSelected ? (
                                <motion.div
                                  key="tick"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                                >
                                  <CheckIcon className="w-5 h-5 text-emerald-600" strokeWidth={3} />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="gift"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  className="w-full h-full flex items-center justify-center text-white"
                                >
                                  <GiftIconWhite className="w-full h-full" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <span className="text-sm font-bold drop-shadow-sm bg-white/20 px-2.5 py-1 rounded-lg">
                            {card.title}
                          </span>
                        </div>
                        <div className="mt-3 flex justify-between items-center gap-3">
                          <div>
                            <p className="text-3xl font-bold tracking-tight drop-shadow-sm">
                              {formatBalance(card.amount)}
                            </p>
                            <p className="text-sm opacity-90 mt-0.5">دیجیت</p>
                          </div>
                          <img src={card.icon} alt={card.title} className="w-28 h-28 object-contain shrink-0 drop-shadow-sm" />
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/30">
                          <p className="text-sm opacity-90 truncate" title={giftMessage || "—"}>
                            پیام: {giftMessage.trim() || "—"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <p className="text-center text-xs text-gray-500">کارت را بکشید یا اسکرول کنید</p>
              {selectedGiftAmount != null && selectedGiftAmount > parentDigitBalance && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-red-700 text-sm font-semibold">موجودی کافی نیست!</p>
                  <p className="text-red-600 text-xs mt-1">
                    موجودیت: {formatBalance(parentDigitBalance)} دیجیت
                  </p>
                </div>
              )}
            </div>

            <div ref={submitSectionRef} className="space-y-2">
              <label htmlFor="giftMessage" className="block text-sm font-semibold text-gray-700">
                پیام هدیه (اختیاری)
              </label>
              <textarea
                id="giftMessage"
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all resize-none"
                placeholder="برای تو هدیه‌ای دارم!"
                rows={3}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleGiveGift}
              disabled={
                !selectedGiftAmount ||
                selectedGiftAmount <= 0 ||
                selectedGiftAmount > parentDigitBalance
              }
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <img src={lineIconPaths.gift} alt="gift" className="w-5 h-5 invert brightness-0" />
              <span>ارسال هدیه</span>
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}

export default GiveGiftDigit;
