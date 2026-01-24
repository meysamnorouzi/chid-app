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

interface TransferDigitModalProps {
  isOpen: boolean;
  onClose: () => void;
  formatBalance: (balance: number) => string;
  parentDigitBalance: number;
  onTransfer: (username: string, amount: number) => void;
  loadParentWallet: () => void;
}

// Use the same user profiles from GiftModal
const getUserProfile = (username: string): UserProfile | null => {
  const profilesKey = "userProfiles";
  const storedProfiles = localStorage.getItem(profilesKey);
  
  if (storedProfiles) {
    const profiles: Record<string, UserProfile> = JSON.parse(storedProfiles);
    return profiles[username.trim().toLowerCase()] || null;
  }
  
  return null;
};

function TransferDigitModal({
  isOpen,
  onClose,
  formatBalance,
  parentDigitBalance,
  onTransfer,
  loadParentWallet,
}: TransferDigitModalProps) {
  const [username, setUsername] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [searchedProfile, setSearchedProfile] = useState<UserProfile | null>(null);
  const [usernameError, setUsernameError] = useState<string>("");
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setUsername("");
      setTransferAmount("");
      setSearchedProfile(null);
      setUsernameError("");
      setInsufficientBalance(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setUsername("");
    setTransferAmount("");
    setSearchedProfile(null);
    setUsernameError("");
    setInsufficientBalance(false);
    onClose();
  };

  const handleSearchUser = () => {
    if (!username.trim()) {
      setUsernameError("لطفاً نام کاربری را وارد کنید");
      setSearchedProfile(null);
      return;
    }

    const profile = getUserProfile(username.trim());
    
    if (profile) {
      setSearchedProfile(profile);
      setUsernameError("");
    } else {
      setSearchedProfile(null);
      setUsernameError("کاربری با این نام کاربری یافت نشد");
    }
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    
    if (!searchedProfile) {
      setUsernameError("لطفاً ابتدا نام کاربری را جستجو کنید");
      return;
    }

    if (!amount || amount <= 0) {
      return;
    }

    if (amount > parentDigitBalance) {
      setInsufficientBalance(true);
      return;
    }

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
      id: `transfer_${Date.now()}`,
      title: `انتقال دیجیت به ${searchedProfile.name}`,
      amount: amount,
      type: "expense",
      date: Date.now(),
      icon: "wallet",
    });
    localStorage.setItem(walletDigitActivitiesKey, JSON.stringify(activities));

    loadParentWallet();
    onTransfer(searchedProfile.username, amount);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="انتقال دیجیت"
      maxHeight="80vh"
    >
      <div className="space-y-6">
        {/* Username Search */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700"
          >
            نام کاربری فرد مقصد
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

        {/* User Profile Display */}
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

        {/* Transfer Amount */}
        {searchedProfile && (
          <>
            <div className="space-y-2">
              <label
                htmlFor="transferAmount"
                className="block text-sm font-semibold text-gray-700"
              >
                مقدار دیجیت برای انتقال
              </label>
              <input
                type="number"
                id="transferAmount"
                value={transferAmount}
                onChange={(e) => {
                  setTransferAmount(e.target.value);
                  setInsufficientBalance(false);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
                placeholder="مثال: 100"
                dir="ltr"
                min="1"
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">موجودی شما:</span>
                <span className="font-semibold text-[#7e4bd0]">
                  {formatBalance(parentDigitBalance)} دیجیت
                </span>
              </div>
            </div>

            {/* Insufficient Balance Warning */}
            {insufficientBalance && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-700 text-sm font-semibold">
                  موجودی کافی نیست!
                </p>
                <p className="text-red-600 text-xs mt-1">
                  موجودی شما: {formatBalance(parentDigitBalance)} دیجیت
                </p>
                <p className="text-red-600 text-xs mt-1">
                  مبلغ درخواستی: {formatBalance(parseFloat(transferAmount) || 0)} دیجیت
                </p>
              </div>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleClose}
            className="px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            بازگشت
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleTransfer}
            disabled={
              !searchedProfile ||
              !transferAmount ||
              parseFloat(transferAmount) <= 0 ||
              parseFloat(transferAmount) > parentDigitBalance
            }
            className="flex-1 bg-[#7e4bd0] text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckIcon className="w-5 h-5" />
            <span>انتقال دیجیت</span>
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

export default TransferDigitModal;

