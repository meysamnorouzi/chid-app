import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  WalletIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  CheckIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../../components/shared/Modal";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import {
  WalletHeader,
  WalletTabs,
  StatsCards,
  RecentTransactions,
  BuyDigitModal,
  TransferModal,
  ChargeWalletModal,
} from "../../../components/shared/Wallet";

interface Activity {
  id: string;
  title: string;
  amount: number;
  type: "expense" | "income";
  date: number;
  icon: string;
}

function WalletMoney() {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    transactionsCount: 0,
  });
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showBuyDigitModal, setShowBuyDigitModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showTransferToSavingModal, setShowTransferToSavingModal] = useState(false);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Parent wallet state
  const [parentMoneyBalance, setParentMoneyBalance] = useState<number>(0);
  const [parentDigitBalance, setParentDigitBalance] = useState<number>(0);



  const loadParentWallet = () => {
    // Load parent wallet (money and digits)
    const parentWalletKey = "parentWallet";
    const storedParentWallet = localStorage.getItem(parentWalletKey);

    if (storedParentWallet) {
      const walletData = JSON.parse(storedParentWallet);
      setParentMoneyBalance(walletData.money || 0);
      setParentDigitBalance(walletData.digits || 0);
    } else {
      // Initialize with default values
      const defaultWallet = {
        money: 10000000, // 10 million Toman
        digits: 1000, // 1000 digits
      };
      localStorage.setItem(parentWalletKey, JSON.stringify(defaultWallet));
      setParentMoneyBalance(defaultWallet.money);
      setParentDigitBalance(defaultWallet.digits);
    }
  };

  const loadWalletData = () => {
    // Load wallet activities from localStorage
    const walletActivitiesKey = "walletActivities";
    const storedActivities = localStorage.getItem(walletActivitiesKey);
    const allActivities: Activity[] = storedActivities
      ? JSON.parse(storedActivities)
      : [];

    // If no activities, create default ones
    if (allActivities.length === 0) {
      const now = Date.now();
      const defaultActivities: Activity[] = [
        {
          id: "activity_1",
          title: "فروشگاه پلی‌استیشن",
          amount: 1599000,
          type: "expense",
          date: now - 2 * 60 * 60 * 1000, // 2 hours ago
          icon: "game",
        },
        {
          id: "activity_2",
          title: "مک‌دونالد",
          amount: 850000,
          type: "expense",
          date: now - 24 * 60 * 60 * 1000 - 5 * 60 * 60 * 1000, // Yesterday
          icon: "food",
        },
        {
          id: "activity_3",
          title: "واریز حقوق هفتگی",
          amount: 1000000,
          type: "income",
          date: now - 3 * 24 * 60 * 60 * 1000, // 3 days ago
          icon: "wallet",
        },
        {
          id: "activity_4",
          title: "خرید کتاب",
          amount: 450000,
          type: "expense",
          date: now - 5 * 24 * 60 * 60 * 1000, // 5 days ago
          icon: "wallet",
        },
        {
          id: "activity_5",
          title: "پاداش انجام تسک",
          amount: 500000,
          type: "income",
          date: now - 7 * 24 * 60 * 60 * 1000, // 7 days ago
          icon: "wallet",
        },
        {
          id: "activity_6",
          title: "واریز اولیه",
          amount: 5000000,
          type: "income",
          date: now - 10 * 24 * 60 * 60 * 1000, // 10 days ago
          icon: "wallet",
        },
        {
          id: "activity_7",
          title: "خرید آنلاین",
          amount: 750000,
          type: "expense",
          date: now - 12 * 24 * 60 * 60 * 1000, // 12 days ago
          icon: "wallet",
        },
        {
          id: "activity_8",
          title: "پرداخت قبوض",
          amount: 1200000,
          type: "expense",
          date: now - 15 * 24 * 60 * 60 * 1000, // 15 days ago
          icon: "wallet",
        },
      ];
      localStorage.setItem(walletActivitiesKey, JSON.stringify(defaultActivities));
      allActivities.push(...defaultActivities);
    }

    // Calculate total balance from parent wallet
    const parentWalletKey = "parentWallet";
    const storedParentWallet = localStorage.getItem(parentWalletKey);
    if (storedParentWallet) {
      const walletData = JSON.parse(storedParentWallet);
      setTotalBalance(walletData.money || 0);
    } else {
      setTotalBalance(0);
    }

    // Sort activities by date and get recent 10
    const sortedActivities = allActivities
      .sort((a, b) => b.date - a.date)
      .slice(0, 10);
    setRecentActivities(sortedActivities);

    // Calculate stats from all activities (not just recent 10)
    const allSortedActivities = allActivities.sort((a, b) => b.date - a.date);
    const income = allSortedActivities
      .filter((a) => a.type === "income")
      .reduce((sum, a) => sum + a.amount, 0);

    const expense = allSortedActivities
      .filter((a) => a.type === "expense")
      .reduce((sum, a) => sum + a.amount, 0);

    setStats({
      totalIncome: income,
      totalExpense: expense,
      transactionsCount: allSortedActivities.length,
    });
  };

  // Load data on component mount
  useEffect(() => {
    loadParentWallet();
    loadWalletData();
  }, []);

  const formatBalance = (balance: number): string => {
    return new Intl.NumberFormat("fa-IR").format(balance);
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes < 1 ? "همین الان" : `${minutes} دقیقه پیش`;
      }
      return `${hours} ساعت پیش`;
    }
    const days = Math.floor(hours / 24);
    if (days === 1) return "دیروز";
    if (days < 7) return `${days} روز پیش`;
    return date.toLocaleDateString("fa-IR", { month: "long", day: "numeric" });
  };



  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart(touch.clientX);
    setTouchEnd(null);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart !== null) {
      e.preventDefault();
      const touch = e.touches[0];
      setTouchEnd(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;

      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          // Swipe left (RTL) - flip to back
          setIsCardFlipped(true);
        } else {
          // Swipe right (RTL) - flip to front
          setIsCardFlipped(false);
        }
      }
    }

    // Reset after a short delay to prevent click event
    setTimeout(() => {
      setTouchStart(null);
      setTouchEnd(null);
      setIsDragging(false);
    }, 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setTouchEnd(null);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart !== null && isDragging) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;

      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          // Swipe left (RTL) - flip to back
          setIsCardFlipped(true);
        } else {
          // Swipe right (RTL) - flip to front
          setIsCardFlipped(false);
        }
      }
    }

    // Reset after a short delay to prevent click event
    setTimeout(() => {
      setTouchStart(null);
      setTouchEnd(null);
      setIsDragging(false);
    }, 100);
  };

  const handleCardClick = () => {
    // Only flip on click if it wasn't a drag
    // Check if mouse moved less than 10px (click, not drag)
    if (touchStart !== null && touchEnd !== null) {
      const moveDistance = Math.abs(touchStart - touchEnd);
      if (moveDistance < 10) {
        setIsCardFlipped(!isCardFlipped);
      }
    } else {
      // If no drag was detected, it's a click
      setIsCardFlipped(!isCardFlipped);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      <WalletHeader subtitle="به کیف پول خوش اومدی" />
      <WalletTabs activeTab="money" />

      <div className="bg-white min-h-screen px-4 py-6 max-w-4xl mx-auto">
        {/* Main Balance Card */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
            style={{
              perspective: "1000px",
              touchAction: "pan-x",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            <div
              className="relative w-full cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: "auto",
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                handleTouchStart(e);
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
                handleTouchMove(e);
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                handleTouchEnd();
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e);
              }}
              onMouseMove={(e) => {
                e.stopPropagation();
                handleMouseMove(e);
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
                handleMouseUp();
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                handleMouseUp();
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              {/* Front of Card */}
              <div
                className="relative bg-[#7e4bd0] rounded-2xl p-6 overflow-hidden aspect-video cursor-pointer select-none"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  pointerEvents: "auto",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Check if it was a click (not drag)
                  if (touchStart !== null && touchEnd !== null) {
                    const moveDistance = Math.abs(touchStart - touchEnd);
                    if (moveDistance < 10) {
                      setIsCardFlipped(!isCardFlipped);
                    }
                  } else {
                    setIsCardFlipped(!isCardFlipped);
                  }
                }}
              >
                {/* Card Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top Section - Card Type */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-medium mb-1">
                        کارت بانکی
                      </p>
                      <p className="text-white text-sm font-semibold">
                        Digi Card
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowChargeModal(true)}
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      <PlusIcon className="w-8 h-8" />
                    </motion.button>
                  </div>

                  {/* Balance Display - Center */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center flex items-center gap-2">
                      <p className="text-white text-4xl font-bold mb-1">
                        {formatBalance(parentMoneyBalance)}
                      </p>
                      <p className="text-white/70 text-sm font-medium">تومان</p>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-end justify-between mt-auto">
                    {/* Left Side - Account Owner */}
                    <div>
                      <p className="text-white/70 text-xs font-medium mb-1">
                        صاحب حساب
                      </p>
                      <p className="text-white text-sm font-semibold">
                        میثم نوروزی
                      </p>
                    </div>

                    {/* Right Side - Card Number */}
                    <div className="text-left">
                      <p className="text-white text-sm font-semibold tracking-wider">
                        •••• •••• •••• 1214
                      </p>
                      <p className="text-white/70 text-xs mt-1">12/24</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back of Card */}
              <div
                className="absolute inset-0 bg-[#7e4bd0] rounded-2xl p-6 overflow-hidden aspect-video select-none cursor-pointer"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  pointerEvents: "auto",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Check if it was a click (not drag)
                  if (touchStart !== null && touchEnd !== null) {
                    const moveDistance = Math.abs(touchStart - touchEnd);
                    if (moveDistance < 10) {
                      setIsCardFlipped(!isCardFlipped);
                    }
                  } else {
                    setIsCardFlipped(!isCardFlipped);
                  }
                }}
              >
                {/* Card Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mt-16"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full -mr-12 -mb-12"></div>
                </div>

                {/* Back Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Middle Section - CVV */}
                  <div className="flex-1 flex flex-col mb-2 justify-center">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white/70 text-xs">CVV</p>
                        <p className="text-white text-lg font-bold tracking-widest">
                          123
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Additional Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-white/70 text-xs">شماره کارت</p>
                      <p className="text-white text-sm font-semibold tracking-wider">
                        1214 5678 9012 3456
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-white/70 text-xs">تاریخ انقضا</p>
                      <p className="text-white text-sm font-semibold">12/24</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-white/70 text-xs">صاحب کارت</p>
                      <p className="text-white text-sm font-semibold">
                        میثم نوروزی
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4 mb-4">
            <button
              onClick={() => setIsCardFlipped(false)}
              className={`w-2 h-2 rounded-full transition-all ${
                !isCardFlipped ? "bg-[#7e4bd0] w-6" : "bg-gray-300"
              }`}
            />
            <button
              onClick={() => setIsCardFlipped(true)}
              className={`w-2 h-2 rounded-full transition-all ${
                isCardFlipped ? "bg-[#7e4bd0] w-6" : "bg-gray-300"
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTransferModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#7e4bd0] text-white px-4 py-3 rounded-xl font-semibold transition-all"
            >
              <ArrowsRightLeftIcon className="w-5 h-5" />
              <span>انتقال و خرید</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDepositModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#7e4bd0] text-white px-4 py-3 rounded-xl font-semibold transition-all"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              <span>شارژ کیف پول</span>
            </motion.button>
          </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/messages")}
              className="flex-1 flex items-center w-full mt-2 justify-center gap-2 bg-[#7e4bd0] text-white px-4 py-3 rounded-xl font-semibold transition-all"
            >
              <ListBulletIcon className="w-5 h-5" />
              <span>  گردش حساب </span>
            </motion.button>
        </div>

        {/* Stats Cards */}
        <StatsCards
          totalExpense={stats.totalExpense}
          transactionsCount={stats.transactionsCount}
          formatBalance={formatBalance}
        />

        {/* Recent Transactions */}
        <RecentTransactions
          activities={recentActivities}
          formatBalance={formatBalance}
          formatTime={formatTime}
        />
      </div>

      {/* Deposit Modal */}
      <Modal
        isOpen={showDepositModal}
        onClose={() => {
          setShowDepositModal(false);
          setDepositAmount("");
        }}
        title="درخواست شارژ حساب"
        maxHeight="70vh"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="depositAmount"
              className="block text-sm font-semibold text-gray-700"
            >
              مبلغ واریز (تومان)
            </label>
            <input
              type="number"
              id="depositAmount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
              placeholder="مثال: 1000000"
              dir="ltr"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="depositAmount"
              className="block text-sm font-semibold text-gray-700"
            >
              علت درخواست شارژ حساب
            </label>
            <input
              type="text"
              id="depositAmount"
              className="w-full px-4 py-20 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
              dir="rtl"
              min="1"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const amount = parseFloat(depositAmount);
              if (amount > 0) {
                // Update parent wallet
                const parentWalletKey = "parentWallet";
                const storedParentWallet =
                  localStorage.getItem(parentWalletKey);
                const walletData = storedParentWallet
                  ? JSON.parse(storedParentWallet)
                  : { money: 0, digits: 0 };
                walletData.money = (walletData.money || 0) + amount;
                localStorage.setItem(
                  parentWalletKey,
                  JSON.stringify(walletData)
                );

                // Reload parent wallet
                loadParentWallet();

                // Close modal
                setShowDepositModal(false);
                setDepositAmount("");
              }
            }}
            disabled={!depositAmount || parseFloat(depositAmount) <= 0}
            className="w-full bg-[#7e4bd0] text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckIcon className="w-6 h-6" />
            <span>ثبت درخواست</span>
          </motion.button>
        </div>
      </Modal>

      {/* Transfer and Buy Modal */}
      <Modal
        isOpen={showTransferModal}
        onClose={() => {
          setShowTransferModal(false);
        }}
        title="انتقال و خرید"
        maxHeight="70vh"
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-600 text-center mb-4">
            میخوای دیجیت بخری یا پول انتقال بدی ؟
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowTransferModal(false);
                setShowTransferToSavingModal(true);
              }}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all bg-white"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <WalletIcon className="w-8 h-8 text-gray-700" />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 mb-1">انتقال به پس‌انداز</p>
                <p className="text-xs text-gray-500">
                  موجودی: {formatBalance(parentMoneyBalance)} تومان
                </p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowTransferModal(false);
                setShowBuyDigitModal(true);
              }}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all bg-white"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <CurrencyDollarIcon className="w-8 h-8 text-gray-700" />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 mb-1">خرید دیجیت</p>
                <p className="text-xs text-gray-500">
                  موجودی: {formatBalance(parentDigitBalance)} دیجیت
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Transfer to Saving Modal */}
      <TransferModal
        isOpen={showTransferToSavingModal}
        onClose={() => {
          setShowTransferToSavingModal(false);
        }}
        direction="to-saving"
        formatBalance={formatBalance}
        sourceBalance={parentMoneyBalance}
        targetBalance={40000}
        targetName="میثم نوروزی"
        onTransfer={(amount) => {
          // Deduct from parent wallet
          const parentWalletKey = "parentWallet";
          const storedParentWallet = localStorage.getItem(parentWalletKey);
          const walletData = storedParentWallet
            ? JSON.parse(storedParentWallet)
            : { money: 0, digits: 0 };
          walletData.money = (walletData.money || 0) - amount;
          localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

          // Add activity to wallet activities
          const walletActivitiesKey = "walletActivities";
          const storedActivities = localStorage.getItem(walletActivitiesKey);
          const activities: Activity[] = storedActivities
            ? JSON.parse(storedActivities)
            : [];
          activities.unshift({
            id: `transfer_${Date.now()}`,
            title: `انتقال به پس‌انداز`,
            amount: amount,
            type: "expense",
            date: Date.now(),
            icon: "wallet",
          });
          localStorage.setItem(
            walletActivitiesKey,
            JSON.stringify(activities)
          );

          // Reload data
          loadParentWallet();
          loadWalletData();
        }}
      />


      {/* Buy Digit Modal */}
      <BuyDigitModal
        isOpen={showBuyDigitModal}
        onClose={() => {
          setShowBuyDigitModal(false);
        }}
        onPurchase={(digits, price) => {
          // Add activity to wallet activities
          const walletActivitiesKey = "walletActivities";
          const storedActivities = localStorage.getItem(walletActivitiesKey);
          const activities: Activity[] = storedActivities
            ? JSON.parse(storedActivities)
            : [];
          activities.unshift({
            id: `purchase_${Date.now()}`,
            title: `خرید ${formatBalance(digits)} دیجیت`,
            amount: price,
            type: "expense",
            date: Date.now(),
            icon: "wallet",
          });
          localStorage.setItem(
            walletActivitiesKey,
            JSON.stringify(activities)
          );
          loadWalletData();
        }}
        formatBalance={formatBalance}
        parentMoneyBalance={parentMoneyBalance}
        loadParentWallet={loadParentWallet}
      />

      {/* Charge Wallet Modal */}
      <ChargeWalletModal
        isOpen={showChargeModal}
        onClose={() => {
          setShowChargeModal(false);
        }}
        formatBalance={formatBalance}
        onCharge={(amount) => {
          // Add to parent wallet
          const parentWalletKey = "parentWallet";
          const storedParentWallet = localStorage.getItem(parentWalletKey);
          const walletData = storedParentWallet
            ? JSON.parse(storedParentWallet)
            : { money: 0, digits: 0 };
          walletData.money = (walletData.money || 0) + amount;
          localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

          // Add activity
          const walletActivitiesKey = "walletActivities";
          const storedActivities = localStorage.getItem(walletActivitiesKey);
          const activities: Activity[] = storedActivities
            ? JSON.parse(storedActivities)
            : [];
          activities.unshift({
            id: `charge_${Date.now()}`,
            title: `افزایش موجودی`,
            amount: amount,
            type: "income",
            date: Date.now(),
            icon: "wallet",
          });
          localStorage.setItem(walletActivitiesKey, JSON.stringify(activities));

          // Reload data
          loadParentWallet();
          loadWalletData();
        }}
      />
    </div>
  );
}

export default WalletMoney;
