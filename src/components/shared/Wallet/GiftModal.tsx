import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal";

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
  const [selectedGiftAmount, setSelectedGiftAmount] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");
  const [giftMessage, setGiftMessage] = useState<string>("");
  const [searchedProfile, setSearchedProfile] = useState<UserProfile | null>(null);
  const [usernameError, setUsernameError] = useState<string>("");

  // Predefined gift amounts
  const giftAmounts = [100, 500, 1000];

  useEffect(() => {
    if (isOpen) {
      initializeSampleProfiles();
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedGiftAmount(null);
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
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
                  placeholder="مثال: ali_rezaei"
                  dir="ltr"
                />
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSearchUser}
                  className="px-6 py-3 bg-[#7e4bd0] text-white rounded-xl font-semibold hover:bg-indigo-800 transition-all"
                >
                  جستجو
                </motion.button>
              </div>
              {usernameError && (
                <p className="text-red-600 text-xs mt-1">{usernameError}</p>
              )}
            </div>

            {searchedProfile && (
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
            )}

            {searchedProfile && (
              <>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    مقدار دیجیتی که میخوای هدیه بدی
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {giftAmounts.map((amount) => (
                      <motion.button
                        key={amount}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedGiftAmount(amount)}
                        disabled={amount > parentDigitBalance}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedGiftAmount === amount
                            ? "border-[#7e4bd0] bg-[#7e4bd0] text-white"
                            : amount > parentDigitBalance
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-center">
                          <p className="text-2xl font-bold mb-1">
                            {formatBalance(amount)}
                          </p>
                          <p className="text-xs opacity-80">دیجیت</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-gray-500">موجودی شما:</span>
                    <span className="font-semibold text-[#7e4bd0]">
                      {formatBalance(parentDigitBalance)} دیجیت
                    </span>
                  </div>
                  {selectedGiftAmount && selectedGiftAmount > parentDigitBalance && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-red-700 text-sm font-semibold">
                        موجودی کافی نیست!
                      </p>
                      <p className="text-red-600 text-xs mt-1">
                        موجودی شما: {formatBalance(parentDigitBalance)} دیجیت
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all resize-none"
                    placeholder="برای تو هدیه‌ای دارم!"
                    rows={3}
                  />
                </div>
              </>
            )}

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleClose}
            className="px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            انصراف
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGiveGift}
            disabled={
              !searchedProfile ||
              !selectedGiftAmount ||
              selectedGiftAmount <= 0 ||
              selectedGiftAmount > parentDigitBalance
            }
            className="flex-1 bg-[#7e4bd0] text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckIcon className="w-5 h-5" />
            <span>انتقال</span>
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

export default GiftModal;

