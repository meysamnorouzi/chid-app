import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal";
import { lineIconPaths } from "../../../utils/lineIcons";

// Gift card config: amount, title, icon from public/icons/gift
const GIFT_CARDS = [
  { amount: 100, title: "هدیه ۱۰۰ دیجیت", icon: "/icons/gift/small.svg" },
  { amount: 500, title: "هدیه ۵۰۰ دیجیت", icon: "/icons/gift/medium.svg" },
  { amount: 1000, title: "هدیه ۱۰۰۰ دیجیت", icon: "/icons/gift/large.svg" },
] as const;

// Inline gift icon (from gift.svg) in white for card decoration
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

interface UserProfile {
  username: string;
  name: string;
  avatar?: string;
  bio?: string;
}

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  formatBalance: (balance: number) => string;
  parentDigitBalance: number;
  onGiveGift: (username: string, amount: number, message?: string) => void;
  loadParentWallet: () => void;
}

// Initialize some sample user profiles in localStorage
const initializeSampleProfiles = () => {
  const profilesKey = "userProfiles";
  const existingProfiles = localStorage.getItem(profilesKey);
  
  if (!existingProfiles) {
    const sampleProfiles: Record<string, UserProfile> = {
      "ali_rezaei": {
        username: "ali_rezaei",
        name: "علی رضایی",
        avatar: "image/69c68ee04e3f0f73009ee241d8716406.jpg",
        bio: "برنامه‌نویس و عاشق تکنولوژی",
      },
      "sara_mohammadi": {
        username: "sara_mohammadi",
        name: "سارا محمدی",
        avatar: "image/69c68ee04e3f0f73009ee241d8716406.jpg",
        bio: "طراح UI/UX",
      },
      "amir_khan": {
        username: "amir_khan",
        name: "امیر خان",
        avatar: "image/69c68ee04e3f0f73009ee241d8716406.jpg",
        bio: "بازیکن حرفه‌ای",
      },
      "fateme_ahmadi": {
        username: "fateme_ahmadi",
        name: "فاطمه احمدی",
        avatar: "image/69c68ee04e3f0f73009ee241d8716406.jpg",
        bio: "دانشجو",
      },
    };
    localStorage.setItem(profilesKey, JSON.stringify(sampleProfiles));
  }
};

function GiftModal({
  isOpen,
  onClose,
  formatBalance,
  parentDigitBalance,
  onGiveGift,
  loadParentWallet,
}: GiftModalProps) {
  const [selectedGiftAmount, setSelectedGiftAmount] = useState<number | null>(GIFT_CARDS[0].amount);
  const [username, setUsername] = useState<string>("");
  const [giftMessage, setGiftMessage] = useState<string>("");
  const [searchedProfile, setSearchedProfile] = useState<UserProfile | null>(null);
  const [usernameError, setUsernameError] = useState<string>("");
  const [cardIndex, setCardIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const lastProgrammaticScrollAt = useRef<number>(0);

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
  }, [updateSelectedFromScroll, isOpen]);

  useEffect(() => {
    if (isOpen) {
      initializeSampleProfiles();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchedProfile) {
      setCardIndex(0);
      setSelectedGiftAmount(GIFT_CARDS[0].amount);
      requestAnimationFrame(() => {
        sliderRef.current?.scrollTo({ left: 0, behavior: "auto" });
      });
    }
  }, [searchedProfile]);

  const handleClose = () => {
    setSelectedGiftAmount(null);
    setCardIndex(0);
    setUsername("");
    setGiftMessage("");
    setSearchedProfile(null);
    setUsernameError("");
    onClose();
  };

  const handleSearchUser = () => {
    if (!username.trim()) {
      setUsernameError("لطفاً نام کاربری را وارد کنید");
      setSearchedProfile(null);
      return;
    }

    const profilesKey = "userProfiles";
    const storedProfiles = localStorage.getItem(profilesKey);
    
    if (storedProfiles) {
      const profiles: Record<string, UserProfile> = JSON.parse(storedProfiles);
      const profile = profiles[username.trim().toLowerCase()];
      
      if (profile) {
        setSearchedProfile(profile);
        setUsernameError("");
      } else {
        setSearchedProfile(null);
        setUsernameError("کاربری با این نام کاربری یافت نشد");
      }
    } else {
      setSearchedProfile(null);
      setUsernameError("کاربری با این نام کاربری یافت نشد");
    }
  };

  const handleGiveGift = () => {
    if (selectedGiftAmount && selectedGiftAmount > 0 && selectedGiftAmount <= parentDigitBalance && searchedProfile) {
      const amount = selectedGiftAmount;
      // Deduct from parent wallet
      const parentWalletKey = "parentWallet";
      const storedParentWallet = localStorage.getItem(parentWalletKey);
      const walletData = storedParentWallet
        ? JSON.parse(storedParentWallet)
        : { money: 0, digits: 0 };
      walletData.digits = (walletData.digits || 0) - amount;
      localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

      // Add activity
      const walletDigitActivitiesKey = "walletDigitActivities";
      const storedActivities = localStorage.getItem(walletDigitActivitiesKey);
      const activities = storedActivities ? JSON.parse(storedActivities) : [];
      activities.unshift({
        id: `gift_${Date.now()}`,
        title: `هدیه دادن دیجیت به ${searchedProfile.name}`,
        amount: amount,
        type: "expense",
        date: Date.now(),
        icon: "wallet",
      });
      localStorage.setItem(walletDigitActivitiesKey, JSON.stringify(activities));

      loadParentWallet();
      onGiveGift(searchedProfile.username, amount, giftMessage.trim() || undefined);
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="هدیه دادن دیجیت"
      maxHeight="80vh"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700"
          >
            نام کاربری فردی که میخوای بهش هدیه بدی
          </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setSearchedProfile(null);
                    setUsernameError("");
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearchUser();
                    }
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 focus:ring-opacity-20 outline-none transition-all"
                  placeholder="مثال: ali_rezaei"
                  dir="ltr"
                />
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSearchUser}
                  className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all"
                >
                  جستجو
                </motion.button>
              </div>
              {usernameError && (
                <p className="text-red-600 text-xs mt-1">{usernameError}</p>
              )}
            </div>

            {searchedProfile ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={searchedProfile.avatar || "image/69c68ee04e3f0f73009ee241d8716406.jpg"}
                    alt={searchedProfile.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{searchedProfile.name}</p>
                    <p className="text-xs text-gray-500">@{searchedProfile.username}</p>
                    {searchedProfile.bio && (
                      <p className="text-xs text-gray-600 mt-1">{searchedProfile.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            ):(
              <div className="h-96 pt-10 flex w-full items-center justify-center">
            <img src={lineIconPaths.searchRiz} className="w-20 h-20" alt="search" />
              </div>
            )}

            {searchedProfile && (
              <>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    مقدار دیجیتی که میخوای هدیه بدی
                  </label>
                  <div
                    ref={sliderRef}
                    className="flex gap-3 p overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 no-scrollbar touch-pan-x"
                    style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
                  >
                    {GIFT_CARDS.map((card, index) => {
                      const isDisabled = card.amount > parentDigitBalance;
                      const isSelected = selectedGiftAmount === card.amount;
                      return (
                        <motion.div
                          key={card.amount}
                          role="button"
                          tabIndex={0}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const el = sliderRef.current;
                            if (!el) return;
                            const cardWidth = el.offsetWidth * 0.88 + 12;
                            const isRtl = document.documentElement.dir === "rtl" || document.documentElement.getAttribute("dir") === "rtl";
                            setCardIndex(index);
                            setSelectedGiftAmount(card.amount);
                            lastProgrammaticScrollAt.current = Date.now();
                            el.scrollTo({
                              left: isRtl ? -index * cardWidth : index * cardWidth,
                              behavior: "smooth",
                            });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              const el = sliderRef.current;
                              if (!el) return;
                              const cardWidth = el.offsetWidth * 0.88 + 12;
                              const isRtl = document.documentElement.dir === "rtl" || document.documentElement.getAttribute("dir") === "rtl";
                              setCardIndex(index);
                              setSelectedGiftAmount(card.amount);
                              lastProgrammaticScrollAt.current = Date.now();
                              el.scrollTo({
                                left: isRtl ? -index * cardWidth : index * cardWidth,
                                behavior: "smooth",
                              });
                            }
                          }}
                          className={`flex-[0_0_88%] min-w-[88%] snap-start snap-always shrink-0 rounded-2xl overflow-hidden shadow-lg transition-all my-4 mx-2 ${
                            isSelected ? "ring-2 ring-amber-500 ring-offset-2" : ""
                          } ${isDisabled ? "opacity-75" : ""}`}
                          style={{ scrollSnapAlign: "start" }}
                        >
                          <div
                            className={`relative w-full rounded-2xl p-5 min-h-[200px] flex flex-col justify-between bg-gradient-to-br ${
                              isDisabled
                                ? "from-gray-400 to-gray-500"
                                : "from-amber-500 via-amber-600 to-amber-700"
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
                              <img
                                src={card.icon}
                                alt={card.title}
                                className="w-28 h-28 object-contain shrink-0 drop-shadow-sm"
                              />
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
                  <p className="text-center text-xs text-gray-500">
                    کارت را بکشید یا اسکرول کنید
                  </p>
                  {selectedGiftAmount && selectedGiftAmount > parentDigitBalance && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-red-700 text-sm font-semibold">
                        موجودی کافی نیست!
                      </p>
                      <p className="text-red-600 text-xs mt-1">
                        موجودیت: {formatBalance(parentDigitBalance)} دیجیت
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="giftMessage"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    پیام هدیه (اختیاری)
                  </label>
                  <textarea
                    id="giftMessage"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 focus:ring-opacity-20 outline-none transition-all resize-none"
                    placeholder="برای تو هدیه‌ای دارم!"
                    rows={3}
                  />
                </div>
              </>
            )}

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGiveGift}
            disabled={
              !searchedProfile ||
              !selectedGiftAmount ||
              selectedGiftAmount <= 0 ||
              selectedGiftAmount > parentDigitBalance
            }
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl w-full font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-xl transition-all"
          >
            <img src={lineIconPaths.gift} alt="gift" className="w-5 h-5 invert brightness-0" />
            <span>ارسال هدیه</span>
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

export default GiftModal;

