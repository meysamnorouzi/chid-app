import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  CheckIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../../components/shared/Modal";
import {
  WalletTabs,
  RecentTransactions,
  BuyDigitModal,
} from "../../../components/shared/Wallet";

interface Activity {
  id: string;
  title: string;
  amount: number;
  type: "expense" | "income";
  date: number;
  icon: string;
}

function WalletDigit() {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    transactionsCount: 0,
  });
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Parent wallet state
  const [parentMoneyBalance, setParentMoneyBalance] = useState<number>(0);
  const [parentDigitBalance, setParentDigitBalance] = useState<number>(0);

  // Parent invitation state
  const [isParentInvited, setIsParentInvited] = useState<boolean>(false);

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
    // Load wallet digit activities from localStorage
    const walletDigitActivitiesKey = "walletDigitActivities";
    const storedActivities = localStorage.getItem(walletDigitActivitiesKey);
    const allActivities: Activity[] = storedActivities
      ? JSON.parse(storedActivities)
      : [];

    // If no activities, create default ones
    if (allActivities.length === 0) {
          const now = Date.now();
      const defaultActivities: Activity[] = [
        {
          id: "activity_1",
          title: "ماموریت: تمیز کردن اتاق",
          amount: 500,
          type: "income",
              date: now - 2 * 60 * 60 * 1000, // 2 hours ago
          icon: "wallet",
        },
        {
          id: "activity_2",
          title: "ماموریت: انجام تکالیف",
          amount: 300,
          type: "income",
              date: now - 24 * 60 * 60 * 1000 - 5 * 60 * 60 * 1000, // Yesterday
          icon: "wallet",
        },
        {
          id: "activity_3",
          title: "ماموریت: کمک در کارهای خانه",
          amount: 200,
              type: "income",
              date: now - 3 * 24 * 60 * 60 * 1000, // 3 days ago
              icon: "wallet",
        },
        {
          id: "activity_4",
          title: "خرید بازی",
          amount: 150,
              type: "expense",
              date: now - 5 * 24 * 60 * 60 * 1000, // 5 days ago
          icon: "game",
        },
        {
          id: "activity_5",
          title: "ماموریت: مطالعه کتاب",
          amount: 400,
              type: "income",
              date: now - 7 * 24 * 60 * 60 * 1000, // 7 days ago
              icon: "wallet",
        },
        {
          id: "activity_6",
          title: "واریز اولیه دیجیت",
          amount: 1000,
          type: "income",
          date: now - 10 * 24 * 60 * 60 * 1000, // 10 days ago
          icon: "wallet",
        },
        {
          id: "activity_7",
          title: "خرید اپلیکیشن",
          amount: 250,
          type: "expense",
          date: now - 12 * 24 * 60 * 60 * 1000, // 12 days ago
          icon: "game",
        },
        {
          id: "activity_8",
          title: "ماموریت: ورزش کردن",
          amount: 350,
          type: "income",
          date: now - 15 * 24 * 60 * 60 * 1000, // 15 days ago
          icon: "wallet",
        },
      ];
      localStorage.setItem(walletDigitActivitiesKey, JSON.stringify(defaultActivities));
      allActivities.push(...defaultActivities);
    }

    // Calculate total balance from parent wallet (digits)
    const parentWalletKey = "parentWallet";
    const storedParentWallet = localStorage.getItem(parentWalletKey);
    if (storedParentWallet) {
      const walletData = JSON.parse(storedParentWallet);
      setTotalBalance(walletData.digits || 0);
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
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4" dir="rtl">
      <WalletTabs activeTab="digit" isParentInvited={isParentInvited} />

      <div className="bg-white min-h-screen px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-6xl mx-auto">
        {/* Desktop Layout: Card + Buttons on left, Transactions on right */}
        <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:items-start">
          {/* Left Column: Card + Buttons */}
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
                  src="/digitandpasandcards/Digit-cart.svg" 
                  alt="کارت دیجیت" 
                  className="w-full h-auto"
                  draggable={false}
                />
                {/* Balance Overlay */}
                <div className="absolute bottom-6 right-6 text-white">
                  <p className="text-sm font-medium opacity-80">موجودی دیجیت</p>
                  <p className="text-2xl font-bold">{formatBalance(parentDigitBalance)} <span className="text-sm font-medium">دیجیت</span></p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4 mb-4">
            <button
              onClick={() => setIsCardFlipped(true)}
              className={`w-6 h-2 rounded-full transition-all ${
                isCardFlipped ? "bg-amber-600 w-6" : "bg-amber-600"
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/messages?filter=buy")}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all text-sm md:text-base"
            >
              <ArrowsRightLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span> لیست خرید ها </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDepositModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all text-sm md:text-base"
            >
              <ArrowDownTrayIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span> خرید دیجیت </span>
            </motion.button>
          </div>
          <div className="flex gap-2 md:gap-3 mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/wallet-digit/gift")}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all text-sm md:text-base"
            >
              <GiftIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span> هدیه </span>
            </motion.button>
          </div>
        </div>
          </div>

          {/* Right Column: Recent Transactions */}
          <div className="md:col-span-1 mt-6 md:mt-0">
            <RecentTransactions
              activities={recentActivities}
              formatBalance={formatBalance}
              formatTime={formatTime}
              emptyMessage="هنوز ماموریت ثبت نشده که بتونی از اون دیجیت بگیری :)"
              amountLabel="دیجیت"
            />
          </div>
        </div>

  
      </div>

      {/* Deposit Modal */}
      <BuyDigitModal
        isOpen={showDepositModal}
        onClose={() => {
          setShowDepositModal(false);
        }}
        onPurchase={(digits, price) => {
          // Add activity to wallet digit activities
          const walletDigitActivitiesKey = "walletDigitActivities";
          const storedActivities = localStorage.getItem(walletDigitActivitiesKey);
          const activities: Activity[] = storedActivities
            ? JSON.parse(storedActivities)
            : [];
          activities.unshift({
            id: `purchase_${Date.now()}`,
            title: `خرید ${formatBalance(digits)} دیجیت`,
            amount: digits,
            type: "income",
            date: Date.now(),
            icon: "wallet",
          });
                localStorage.setItem(
            walletDigitActivitiesKey,
            JSON.stringify(activities)
          );
          loadWalletData();
        }}
        formatBalance={formatBalance}
        parentMoneyBalance={parentMoneyBalance}
        loadParentWallet={loadParentWallet}
      />

    </div>
  );
}

export default WalletDigit;
