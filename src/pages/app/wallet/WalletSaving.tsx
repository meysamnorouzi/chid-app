import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  WalletIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  CheckIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../../components/shared/Modal";
import {
  WalletTabs,
  StatsCards,
  RecentTransactions,
  TransferModal,
} from "../../../components/shared/Wallet";

interface Activity {
  id: string;
  title: string;
  amount: number;
  type: "expense" | "income";
  date: number;
  icon: string;
}

function WalletSaving() {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    transactionsCount: 0,
  });
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Parent wallet state
  const [parentMoneyBalance, setParentMoneyBalance] = useState<number>(0);
  const [parentDigitBalance, setParentDigitBalance] = useState<number>(0);

  // Parent invitation state
  const [isParentInvited, setIsParentInvited] = useState<boolean>(false);

  // Transfer flow state
  const [transferType, setTransferType] = useState<"money" | "digit" | null>(
    null
  );
  const [chargeAmount, setChargeAmount] = useState("");
  const [insufficientBalance, setInsufficientBalance] = useState(false);



  const loadParentWallet = () => {
    // Load parent invitation state
    const parentInvitationKey = "parentInvitation";
    const storedInvitation = localStorage.getItem(parentInvitationKey);
    setIsParentInvited(!!storedInvitation);

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
    // Load wallet saving activities from localStorage
    const walletSavingActivitiesKey = "walletSavingActivities";
    const storedActivities = localStorage.getItem(walletSavingActivitiesKey);
    const allActivities: Activity[] = storedActivities
      ? JSON.parse(storedActivities)
      : [];

    // If no activities, create default ones
    if (allActivities.length === 0) {
      const now = Date.now();
      const defaultActivities: Activity[] = [
        {
          id: "activity_1",
          title: "انتقال از کیف پول",
          amount: 5000000,
          type: "income",
          date: now - 2 * 60 * 60 * 1000, // 2 hours ago
          icon: "wallet",
        },
        {
          id: "activity_2",
          title: "انتقال از کیف پول",
          amount: 3000000,
          type: "income",
          date: now - 24 * 60 * 60 * 1000 - 5 * 60 * 60 * 1000, // Yesterday
          icon: "wallet",
        },
        {
          id: "activity_3",
          title: "انتقال به کیف پول",
          amount: 1000000,
          type: "expense",
          date: now - 3 * 24 * 60 * 60 * 1000, // 3 days ago
          icon: "wallet",
        },
        {
          id: "activity_4",
          title: "انتقال از کیف پول",
          amount: 2000000,
          type: "income",
          date: now - 5 * 24 * 60 * 60 * 1000, // 5 days ago
          icon: "wallet",
        },
        {
          id: "activity_5",
          title: "واریز اولیه پس‌انداز",
          amount: 10000000,
          type: "income",
          date: now - 7 * 24 * 60 * 60 * 1000, // 7 days ago
          icon: "wallet",
        },
        {
          id: "activity_6",
          title: "انتقال از کیف پول",
          amount: 4000000,
          type: "income",
          date: now - 10 * 24 * 60 * 60 * 1000, // 10 days ago
          icon: "wallet",
        },
        {
          id: "activity_7",
          title: "انتقال به کیف پول",
          amount: 2500000,
          type: "expense",
          date: now - 12 * 24 * 60 * 60 * 1000, // 12 days ago
          icon: "wallet",
        },
        {
          id: "activity_8",
          title: "انتقال از کیف پول",
          amount: 1500000,
          type: "income",
          date: now - 15 * 24 * 60 * 60 * 1000, // 15 days ago
          icon: "wallet",
        },
      ];
      localStorage.setItem(walletSavingActivitiesKey, JSON.stringify(defaultActivities));
      allActivities.push(...defaultActivities);
    }

    // Calculate total balance - saving balance is separate
    const savingBalanceKey = "savingBalance";
    const storedSavingBalance = localStorage.getItem(savingBalanceKey);
    if (storedSavingBalance) {
      setTotalBalance(parseFloat(storedSavingBalance));
    } else {
      // Calculate from activities
      const total = allActivities
        .filter((a) => a.type === "income")
        .reduce((sum, a) => sum + a.amount, 0) -
        allActivities
          .filter((a) => a.type === "expense")
          .reduce((sum, a) => sum + a.amount, 0);
      setTotalBalance(total > 0 ? total : 340000000); // Default if empty
      localStorage.setItem(savingBalanceKey, JSON.stringify(total > 0 ? total : 340000000));
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
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4" dir="rtl">
      <WalletTabs activeTab="saving" isParentInvited={isParentInvited} />

      <div className="bg-white min-h-screen px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-6xl mx-auto">
        {/* Desktop Layout: Card + Buttons on left, Transactions on right */}
        <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:items-start">
          {/* Left Column: Card + Buttons + Stats */}
          <div className="md:col-span-1">
        {/* Main Balance Card */}
        <div className="mb-6 md:mb-8">
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
            >
              {/* Front of Card */}
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  pointerEvents: "auto",
                }}
              >
                <img 
                  src="/digitandpasandcards/Pasandaz-cart.jpg" 
                  alt="کارت پس‌انداز" 
                  className="w-full h-auto"
                  draggable={false}
                />
                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                {/* Balance Overlay */}
                <div className="absolute bottom-6 right-6 text-white drop-shadow-lg">
                  <p className="text-sm font-medium opacity-90">موجودی پس‌انداز</p>
                  <p className="text-2xl font-bold drop-shadow-md">{formatBalance(totalBalance)} <span className="text-sm font-medium">تومان</span></p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4 mb-4">

            <button
              onClick={() => setIsCardFlipped(true)}
              className={`w-6 h-2 rounded-full transition-all ${
                isCardFlipped ? "bg-emerald-600 w-6" : "bg-emerald-600"
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all text-sm md:text-base"
            >
              <ArrowsRightLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span> گردش حساب </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDepositModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all text-sm md:text-base"
            >
              <ArrowDownTrayIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span>انتقال به کیف پول</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-6 md:mt-8">
          <StatsCards
            totalExpense={stats.totalExpense}
            transactionsCount={stats.transactionsCount}
            formatBalance={formatBalance}
          />
        </div>
          </div>

          {/* Right Column: Recent Transactions */}
          <div className="md:col-span-1 mt-6 md:mt-0">
            <RecentTransactions
              activities={recentActivities}
              formatBalance={formatBalance}
              formatTime={formatTime}
            />
          </div>
        </div>
      </div>

      {/* Transfer to Wallet Modal */}
      <TransferModal
        isOpen={showDepositModal}
        onClose={() => {
          setShowDepositModal(false);
        }}
        direction="to-wallet"
        formatBalance={formatBalance}
        sourceBalance={totalBalance}
        dominantColor="#059669"
        onTransfer={(amount) => {
          // Deduct from saving and add to parent wallet
          const savingBalanceKey = "savingBalance";
          const storedSavingBalance = localStorage.getItem(savingBalanceKey);
          const currentSaving = storedSavingBalance
            ? parseFloat(storedSavingBalance)
            : totalBalance;

          if (currentSaving >= amount) {
            // Update saving balance
            const newSavingBalance = currentSaving - amount;
            localStorage.setItem(
              savingBalanceKey,
              JSON.stringify(newSavingBalance)
            );

            // Update parent wallet
            const parentWalletKey = "parentWallet";
            const storedParentWallet = localStorage.getItem(parentWalletKey);
            const walletData = storedParentWallet
              ? JSON.parse(storedParentWallet)
              : { money: 0, digits: 0 };
            walletData.money = (walletData.money || 0) + amount;
            localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

            // Add activity
            const walletSavingActivitiesKey = "walletSavingActivities";
            const storedActivities = localStorage.getItem(
              walletSavingActivitiesKey
            );
            const activities: Activity[] = storedActivities
              ? JSON.parse(storedActivities)
              : [];
            activities.unshift({
              id: `transfer_${Date.now()}`,
              title: "انتقال به کیف پول",
              amount: amount,
              type: "expense",
              date: Date.now(),
              icon: "wallet",
            });
            localStorage.setItem(
              walletSavingActivitiesKey,
              JSON.stringify(activities)
            );

            // Reload data
            loadParentWallet();
            loadWalletData();
          }
        }}
      />

      {/* Transfer Modal */}
      <Modal
        isOpen={showTransferModal}
        onClose={() => {
          setShowTransferModal(false);
          setTransferAmount("");
          setTransferType(null);
          setInsufficientBalance(false);
        }}
        title={
          transferType === null
            ? "انتقال و خرید"
            : transferType === "money"
            ? "انتقال به پس انداز"
            : "خرید دیجیت"
        }
        maxHeight="70vh"
      >
        <div className="space-y-6">
          {transferType === null ? (
            <>
              <p className="text-sm text-gray-600 text-center mb-4">
                میخوای دیجیت بخری یا پول انتقال بدی ؟
              </p>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTransferType("money")}
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
                  onClick={() => setTransferType("digit")}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-gray-200"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <CurrencyDollarIcon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-black mb-1">خرید دیجیت</p>
                    <p className="text-xs text-black">
                      موجودی: {formatBalance(parentDigitBalance)} دیجیت
                    </p>
                  </div>
                </motion.button>
              </div>
            </>
          ) : insufficientBalance ? (
            // Step: Insufficient balance - show charge flow
            <>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-red-700 text-sm font-semibold mb-2">
                  موجودی کافی نیست!
                </p>
                <p className="text-red-600 text-xs">
                  موجودی فعلیت:{" "}
                  {transferType === "money"
                    ? `${formatBalance(parentMoneyBalance)} تومان`
                    : `${formatBalance(parentDigitBalance)} دیجیت`}
                </p>
                <p className="text-red-600 text-xs mt-1">
                  مبلغ درخواستی:{" "}
                  {transferType === "money"
                    ? `${formatBalance(parseFloat(transferAmount) || 0)} تومان`
                    : `${formatBalance(parseFloat(transferAmount) || 0)} دیجیت`}
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="chargeAmount"
                  className="block text-sm font-semibold text-gray-700"
                >
                  مبلغ شارژ ({transferType === "money" ? "تومان" : "دیجیت"})
                </label>
                <input
                  type="number"
                  id="chargeAmount"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
                  placeholder={
                    transferType === "money" ? "مثال: 1000000" : "مثال: 500"
                  }
                  dir="ltr"
                  min="1"
                />
                <p className="text-xs text-gray-500">
                  حداقل مبلغ:{" "}
                  {transferType === "money"
                    ? formatBalance(
                        parseFloat(transferAmount) - parentMoneyBalance
                      ) + " تومان"
                    : formatBalance(
                        parseFloat(transferAmount) - parentDigitBalance
                      ) + " دیجیت"}
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setInsufficientBalance(false);
                    setChargeAmount("");
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  <ArrowLeftIcon className="w-5 h-5 inline ml-2" />
                  بازگشت
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const charge = parseFloat(chargeAmount);
                    const required =
                      transferType === "money"
                        ? parseFloat(transferAmount) - parentMoneyBalance
                        : parseFloat(transferAmount) - parentDigitBalance;

                    if (charge >= required && charge > 0) {
                      // Charge the wallet
                      const parentWalletKey = "parentWallet";
                      const storedParentWallet =
                        localStorage.getItem(parentWalletKey);
                      const walletData = storedParentWallet
                        ? JSON.parse(storedParentWallet)
                        : { money: 0, digits: 0 };

                      if (transferType === "money") {
                        walletData.money = (walletData.money || 0) + charge;
                      } else {
                        walletData.digits = (walletData.digits || 0) + charge;
                      }

                      localStorage.setItem(
                        parentWalletKey,
                        JSON.stringify(walletData)
                      );
                      loadParentWallet();
                      setInsufficientBalance(false);
                      setChargeAmount("");
                    }
                  }}
                  disabled={!chargeAmount || parseFloat(chargeAmount) <= 0}
                  className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckIcon className="w-5 h-5" />
                  شارژ کیف پول
                </motion.button>
              </div>
            </>
          ) : (
            // Step 2: Enter amount
            <>
              <div className="space-y-2">
              <label
                  htmlFor="transferAmount"
                  className="block text-sm font-semibold text-gray-700"
                >
                 {transferType === "money"
                    ? "اطلاعات پس‌انداز"
                    : " مقدار پولی که باید پرداخت کنی  (هر ۱۰ دیحیت ۲۵ هزارتومان) "}
                </label>
                <div className="text-emerald-600 w-full h-14 rounded-xl flex justify-center items-center">
                {transferType === "money"
                    ? " میثم نوروزی - موجودی فعلی : ۴۰,۰۰۰ تومان "
                    : " مبلغ : ۳۰,۰۰۰ تومان "}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="transferAmount"
                  className="block text-sm font-semibold text-gray-700"
                >
                 {transferType === "money"
                    ? "مبلغ انتقال (تومان)"
                    : "مقدار دیجیتی که میخوای بخری"}
                </label>
                <input
                  type="number"
                  id="transferAmount"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
                  placeholder={
                    transferType === "money" ? "مثال: 500000" : "مثال: 100"
                  }
                  dir="ltr"
                  min="1"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">موجودیت:</span>
                  <span
                    className={`font-semibold ${
                      transferType === "money"
                        ? "text-emerald-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {transferType === "money"
                      ? `${formatBalance(parentMoneyBalance)} تومان`
                      : `${formatBalance(parentDigitBalance)} دیجیت`}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTransferType(null);
                    setTransferAmount("");
                    setInsufficientBalance(false);
                  }}
                  className="px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  <ArrowLeftIcon className="w-5 h-5 inline ml-2" />
                  بازگشت
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const amount = parseFloat(transferAmount);
                    const hasEnough =
                      transferType === "money"
                        ? parentMoneyBalance >= amount
                        : parentDigitBalance >= amount;

                    if (!hasEnough) {
                      setInsufficientBalance(true);
                      return;
                    }

                    // Perform transfer - transfer from parent wallet to saving
                    if (transferType === "money") {
                      const parentWalletKey = "parentWallet";
                      const storedParentWallet = localStorage.getItem(parentWalletKey);
                      const walletData = storedParentWallet
                        ? JSON.parse(storedParentWallet)
                        : { money: 0, digits: 0 };
                      
                      if (walletData.money >= amount) {
                        // Deduct from parent wallet
                        walletData.money = (walletData.money || 0) - amount;
                        localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

                        // Add to saving balance
                        const savingBalanceKey = "savingBalance";
                        const storedSavingBalance = localStorage.getItem(savingBalanceKey);
                        const currentSaving = storedSavingBalance ? parseFloat(storedSavingBalance) : totalBalance;
                        const newSavingBalance = currentSaving + amount;
                        localStorage.setItem(savingBalanceKey, JSON.stringify(newSavingBalance));

                        // Add activity
                        const walletSavingActivitiesKey = "walletSavingActivities";
                        const storedActivities = localStorage.getItem(walletSavingActivitiesKey);
                        const activities: Activity[] = storedActivities ? JSON.parse(storedActivities) : [];
                        activities.unshift({
                          id: `transfer_${Date.now()}`,
                          title: "انتقال از کیف پول",
                          amount: amount,
                          type: "income",
                          date: Date.now(),
                          icon: "wallet",
                        });
                        localStorage.setItem(walletSavingActivitiesKey, JSON.stringify(activities));

                        // Reload data
                        loadParentWallet();
                        loadWalletData();

                        // Close modal
                        setShowTransferModal(false);
                        setTransferAmount("");
                        setTransferType(null);
                        setInsufficientBalance(false);
                      }
                    }
                  }}
                  disabled={
                    !transferAmount ||
                    parseFloat(transferAmount) <= 0
                  }
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckIcon className="w-5 h-5" />
                  <span>
                     {transferType === "money" ? "انتقال وجه" : "خرید دیجیت"}
                  </span>
                </motion.button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default WalletSaving;
