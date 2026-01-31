import { useState, useEffect, useMemo } from "react";
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
  CreditCardIcon,
  UserPlusIcon,
  DevicePhoneMobileIcon,
  PaperAirplaneIcon,
  LockClosedIcon,
  QrCodeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../../components/shared/Modal";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import AuthInput from "../../../components/shared/AuthInput";
import { lineIconPaths } from "../../../utils/lineIcons";
import {
  WalletTabs,
  StatsCards,
  RecentTransactions,
  BuyDigitModal,
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
  const [depositAmount, setDepositAmount] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Physical card state
  const [hasPhysicalCard, setHasPhysicalCard] = useState<boolean>(false);
  const [cardRequestPending, setCardRequestPending] = useState<boolean>(false);
  const [cardRequestApproved, setCardRequestApproved] = useState<boolean>(false);
  const [selectedCardDesign, setSelectedCardDesign] = useState<string | null>(null);

  // Card color state (extracted from card design)
  const [dominantColor, setDominantColor] = useState<string>("#7e4bd0");
  const [darkerColor, setDarkerColor] = useState<string>("#8b5cf6");

  // Parent invitation state
  const [isParentInvited, setIsParentInvited] = useState<boolean>(false);
  const [parentPhoneNumber, setParentPhoneNumber] = useState<string>("");
  const [isSendingInvite, setIsSendingInvite] = useState<boolean>(false);
  const [inviteSent, setInviteSent] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Generate unique invite code for QR (stable across renders)
  const inviteCode = useMemo(() => {
    // Try to get existing code from localStorage or generate new one
    const storedCode = localStorage.getItem("userInviteCode");
    if (storedCode) return storedCode;
    const newCode = "DIGI-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem("userInviteCode", newCode);
    return newCode;
  }, []);
  const inviteLink = `https://digiteen.app/invite/${inviteCode}`;

  // Parent wallet state
  const [parentMoneyBalance, setParentMoneyBalance] = useState<number>(0);
  const [parentDigitBalance, setParentDigitBalance] = useState<number>(0);



  // Map card design IDs to their actual image paths
  const getCardImagePath = (cardDesignId: string | null): string => {
    if (!cardDesignId) {
      return "/digitandpasandcards/normal-cart-2.svg";
    }

    const cardImageMap: { [key: string]: string } = {
      "1": "/carts/1.svg",
      "2": "/carts/2.svg",
      "3": "/carts/3.svg",
      "4": "/carts/4.svg",
      "5": "/carts/5.svg",
      "6": "/carts/7.svg",
      "7": "/carts/8.svg",
      "8": "/carts/9.svg",
      "9": "/carts/10.svg",
      "10": "/carts/11.svg",
      "11": "/carts/c7.svg",
      "12": "/carts/c8.svg",
      "c-special-1": "/carts/c special 1.svg",
      "c-special-2": "/carts/c special 2.svg",
      "c-special-3": "/carts/c special 3.svg",
      "c-special-4": "/carts/c special 4.svg",
      "13": "/carts/Screenshot 2026-01-31 at 1.16.16 AM.png",
    };

    return cardImageMap[cardDesignId] || `/carts/${cardDesignId}.svg`;
  };

  // Extract dominant color from card image
  const extractDominantColor = (imageUrl: string) => {
    const img = new Image();
    if (!imageUrl.endsWith('.svg')) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Sample pixels (every 10th pixel for performance)
      const colorCounts: { [key: string]: number } = {};
      const sampleRate = 10;

      for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Skip transparent pixels
        if (a < 128) continue;

        // Quantize colors to reduce variations
        const quantizedR = Math.floor(r / 32) * 32;
        const quantizedG = Math.floor(g / 32) * 32;
        const quantizedB = Math.floor(b / 32) * 32;

        const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
        colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
      }

      // Find the most common color
      let maxCount = 0;
      let dominantColorKey = "126,75,208"; // Default purple

      for (const [colorKey, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count;
          dominantColorKey = colorKey;
        }
      }

      const [r, g, b] = dominantColorKey.split(",").map(Number);

      // Adjust brightness to make it suitable for card background
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      let adjustedR = r;
      let adjustedG = g;
      let adjustedB = b;

      // Darken if too bright, lighten if too dark
      if (brightness > 180) {
        adjustedR = Math.max(0, r * 0.7);
        adjustedG = Math.max(0, g * 0.7);
        adjustedB = Math.max(0, b * 0.7);
      } else if (brightness < 80) {
        adjustedR = Math.min(255, r * 1.3);
        adjustedG = Math.min(255, g * 1.3);
        adjustedB = Math.min(255, b * 1.3);
      }

      const color = `rgb(${Math.round(adjustedR)}, ${Math.round(adjustedG)}, ${Math.round(adjustedB)})`;
      setDominantColor(color);

      // Create darker version for gradient
      const darkerR = Math.max(0, adjustedR * 0.7);
      const darkerG = Math.max(0, adjustedG * 0.7);
      const darkerB = Math.max(0, adjustedB * 0.7);
      const darker = `rgb(${Math.round(darkerR)}, ${Math.round(darkerG)}, ${Math.round(darkerB)})`;
      setDarkerColor(darker);
    };

    img.onerror = () => {
      // Fallback to default color if image fails to load
      setDominantColor("#7e4bd0");
      setDarkerColor("#8b5cf6");
    };

    img.src = imageUrl;
  };

  const loadParentWallet = () => {
    // Load physical card state
    const physicalCardKey = "hasPhysicalCard";
    const storedPhysicalCard = localStorage.getItem(physicalCardKey);
    setHasPhysicalCard(storedPhysicalCard === "true");

    // Load card request state (pending approval)
    const cardRequestKey = "physicalCardRequest";
    const storedCardRequest = localStorage.getItem(cardRequestKey);
    if (storedCardRequest) {
      const cardRequest = JSON.parse(storedCardRequest);
      // Always load the selected card design
      setSelectedCardDesign(cardRequest.cardDesignId);

      // Extract dominant color from selected card design
      if (cardRequest.cardDesignId) {
        const cardImageUrl = getCardImagePath(cardRequest.cardDesignId);
        extractDominantColor(cardImageUrl);
      }

      // Check card request status
      if (cardRequest.status === "pending") {
        setCardRequestPending(true);
        setCardRequestApproved(false);
      } else if (cardRequest.status === "approved") {
        setCardRequestPending(false);
        setCardRequestApproved(true);
      } else if (cardRequest.status === "activated") {
        setCardRequestPending(false);
        setCardRequestApproved(false);
        // Card is activated, so hasPhysicalCard should be true
        setHasPhysicalCard(true);
      } else {
        setCardRequestPending(false);
        setCardRequestApproved(false);
      }
    }

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
        money: 0, // 0 Toman
        digits: 1000, // 1000 digits
      };
      localStorage.setItem(parentWalletKey, JSON.stringify(defaultWallet));
      setParentMoneyBalance(defaultWallet.money);
      setParentDigitBalance(defaultWallet.digits);
    }
  };

  // Modal for parent invitation requirement
  const [showParentRequiredModal, setShowParentRequiredModal] = useState(false);

  // Modal for card activation
  const [showActivateCardModal, setShowActivateCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [activationError, setActivationError] = useState("");
  const [isActivating, setIsActivating] = useState(false);

  const handleGetCard = () => {
    // Check if parent is invited
    const parentInvitation = localStorage.getItem("parentInvitation");
    if (!parentInvitation) {
      // Show modal to invite parent first
      setShowParentRequiredModal(true);
    } else {
      // Navigate to card request page
      navigate("/request-card");
    }
  };

  const handleInviteParent = () => {
    // Navigate to parent invitation page or show modal
    navigate("/invite-parent");
  };

  const handleSendInvitation = async () => {
    if (!parentPhoneNumber || parentPhoneNumber.length < 11) return;

    setIsSendingInvite(true);

    // Simulate sending invitation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store invitation in localStorage
    const invitation = {
      phoneNumber: parentPhoneNumber,
      inviteCode: inviteCode,
      sentAt: Date.now(),
      status: "pending",
    };
    localStorage.setItem("parentInvitation", JSON.stringify(invitation));

    setIsSendingInvite(false);
    setInviteSent(true);

    // Show success modal
    setShowSuccessModal(true);

    // After 3 seconds, close modal and reload to show the unlocked page
    setTimeout(() => {
      setShowSuccessModal(false);
      setIsParentInvited(true);
    }, 3000);
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "");
    // Limit to 11 digits
    return digits.slice(0, 11);
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
          title: "پاداش انجام ماموریت",
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
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4" dir="rtl">
      <WalletTabs activeTab="money" />

      <div className={`px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 max-w-6xl mx-auto relative ${isParentInvited ? 'bg-white' : 'inset-0 bg-gradient-to-br from-white/95 via-purple-50/90 to-indigo-50/90 backdrop-blur-md'}`}>
        {isParentInvited ? (
          <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:items-start">
            {/* Left Column: Card + Buttons + Stats */}
            <div className="md:col-span-1">
              {/* Main Balance Card - Always Active */}
              <div className="mb-6 md:mb-8">
                <div
                  className="relative w-full max-w-2xl md:max-w-3xl mx-auto"
                >
                  <div
                    className="relative w-full cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
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
                      className="relative rounded-2xl overflow-hidden cursor-pointer select-none aspect-video"
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
                      {/* Card Background Image */}
                      <img
                        src={getCardImagePath(selectedCardDesign)}
                        alt="کارت بانکی"
                        className="w-full h-auto"
                        draggable={false}
                      />
                      {/* Dark Overlay for better text visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      {/* Balance Overlay */}
                      <div className="absolute bottom-6 right-6 text-white drop-shadow-lg">
                        <p className="text-sm font-medium opacity-90">موجودی کیف پول</p>
                        <p className="text-2xl font-bold drop-shadow-md">{formatBalance(parentMoneyBalance)} <span className="text-sm font-medium">تومان</span></p>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div
                      className="absolute inset-0 rounded-2xl p-6 overflow-hidden aspect-video select-none cursor-pointer"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        pointerEvents: "auto",
                        background: selectedCardDesign
                          ? `linear-gradient(to bottom right, ${dominantColor}, ${darkerColor})`
                          : "linear-gradient(to bottom right, #7e4bd0, #8b5cf6)",
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

                      {/* Back Content: full name top-right, below it card number; CVV2/EXP labels left of values; magnet bar at bottom */}
                      <div className="relative z-10 h-full flex flex-col justify-between">

                        <div className="flex-1 flex flex-col justify-start pt-1">
                          {/* Full name on right (justify-start in RTL = right side) */}
                          <div className="w-full flex justify-start mb-3">
                            <p className="text-white text-base font-semibold drop-shadow-lg">
                              میثم نوروزی
                            </p>
                          </div>

                          {/* Row: card number on right (bigger), CVV2/EXP on left with labels left of values */}
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex flex-col items-start text-start">
                              <p className="text-white text-xl font-semibold tracking-wider drop-shadow-lg">
                                1214 5678 9012 3456
                              </p>
                            </div>
                            <div className="flex flex-col shrink-0 items-end gap-2">
                              {/* CVV2: label on left of value (in RTL: value first = right, label second = left) */}
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                  <p className="text-white text-sm font-bold tracking-widest drop-shadow-lg">123</p>
                                </div>
                                <span className="text-white/80 text-xs drop-shadow">CVV2</span>
                              </div>
                              {/* EXP: label on left of value */}
                              <div className="flex items-center gap-2">
                                <p className="text-white text-sm font-semibold drop-shadow-lg">1409/09</p>
                                <span className="text-white/80 text-xs drop-shadow">EXP</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Magnet bar - below the card content */}
                        <div className="h-16 bg-black/30 rounded mt-2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Physical Card & Parent Invitation Box */}
                {(!hasPhysicalCard || !isParentInvited) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: 1,
                      y: [0, -3, 0, -3, 0],
                      scale: [1, 1.03, 1, 1.03, 1],
                      rotate: [0, -1, 1, -1, 0],
                      boxShadow: [
                        "0 0 0px rgba(126, 75, 208, 0), 0 0 0px rgba(139, 92, 246, 0)",
                        "0 0 30px rgba(126, 75, 208, 0.5), 0 0 50px rgba(139, 92, 246, 0.3)",
                        "0 0 0px rgba(126, 75, 208, 0), 0 0 0px rgba(139, 92, 246, 0)"
                      ],
                      borderColor: [
                        "rgba(126, 75, 208, 0.2)",
                        "rgba(126, 75, 208, 0.6)",
                        "rgba(126, 75, 208, 0.2)"
                      ]
                    }}
                    transition={{
                      duration: 0.4,
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      },
                      boxShadow: {
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      },
                      borderColor: {
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      }
                    }}
                    className="mb-4 bg-gradient-to-r mt-4 from-purple-50 to-indigo-50 border-2 rounded-2xl p-4 relative overflow-hidden"
                  >
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-0 pointer-events-none"
                      animate={{
                        opacity: [0, 0.3, 0],
                        x: ["-100%", "100%", "-100%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(126, 75, 208, 0.2), transparent)",
                        width: "50%"
                      }}
                    />
                    <div className="flex items-start gap-3 mb-4 relative z-10">
                      <motion.div
                        className="w-10 h-10 bg-[#7e4bd0]/10 rounded-full flex items-center justify-center flex-shrink-0 relative"
                        animate={{
                          scale: [1, 1.2, 1.15, 1],
                          rotate: [0, 10, -10, 5, -5, 0],
                          backgroundColor: [
                            "rgba(126, 75, 208, 0.1)",
                            "rgba(126, 75, 208, 0.25)",
                            "rgba(139, 92, 246, 0.2)",
                            "rgba(126, 75, 208, 0.1)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Pulsing ring effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#7e4bd0]"
                          animate={{
                            scale: [1, 1.5, 1.8],
                            opacity: [0.6, 0.3, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeOut"
                          }}
                        />
                        <img
                          src={lineIconPaths.wallet}
                          className="w-5 h-5 relative z-10"
                          alt="کارت"
                          style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(1352%) hue-rotate(243deg) brightness(95%) contrast(85%)' }}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <motion.p
                          className="text-gray-800 font-bold text-sm mb-1"
                          animate={{
                            scale: [1, 1.05, 1],
                            color: [
                              "rgb(31, 41, 55)",
                              "rgb(126, 75, 208)",
                              "rgb(31, 41, 55)"
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                          }}
                        >
                          {!hasPhysicalCard && !isParentInvited
                            ? "کارت خریدتو انتخاب کن"
                            : !hasPhysicalCard
                              ? "کارت خریدتو انتخاب کن"
                              : "والدین دعوت نشدن!"}
                        </motion.p>
                        <p className="text-gray-500 text-xs leading-5">
                          {!hasPhysicalCard && !isParentInvited
                            ? "لذت خرید حضوری و آنلاین با کارت مخصوص خودت"
                            : !hasPhysicalCard
                              ? "لذت خرید حضوری و آنلاین با کارت مخصوص خودت"
                              : "والدینت رو دعوت کن تا بتونن حسابت رو شارژ کنن و هدیه بفرستن."}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 relative z-10">
                      {!hasPhysicalCard && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleGetCard}
                          className="flex-1 flex items-center justify-center gap-2 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                          style={{ backgroundColor: dominantColor }}
                        >
                          <img
                            src={lineIconPaths.wallet}
                            className="w-4 h-4"
                            alt="کارت"
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                          <span>درخواست کارت</span>
                        </motion.button>
                      )}
                      {!isParentInvited && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleInviteParent}
                          className={`flex-1 flex items-center justify-center gap-2 ${!hasPhysicalCard
                            ? "bg-white border-2 text-white"
                            : "text-white"
                            } px-4 py-2.5 rounded-xl font-semibold text-sm transition-all`}
                          style={!hasPhysicalCard
                            ? { borderColor: dominantColor, color: dominantColor }
                            : { backgroundColor: dominantColor }
                          }
                        >
                          <img
                            src={lineIconPaths.share}
                            className="w-4 h-4"
                            alt="دعوت"
                            style={{
                              filter: !hasPhysicalCard
                                ? 'brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(1352%) hue-rotate(243deg) brightness(95%) contrast(85%)'
                                : 'brightness(0) invert(1)'
                            }}
                          />
                          <span>دعوت والد</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Card Request Pending Box */}
                {cardRequestPending && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-4 bg-gradient-to-r mt-4 from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="relative">
                          <CreditCardIcon className="w-5 h-5 text-amber-600" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-bold text-sm mb-1">
                          در انتظار تایید والد
                        </p>
                        <p className="text-gray-500 text-xs leading-5">
                          درخواست کارت خرید ثبت شد! منتظر تایید والدین باش تا کارت برات ارسال بشه.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Card Request Approved Box */}
                {cardRequestApproved && !hasPhysicalCard && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-4 bg-gradient-to-r mt-4 from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <CreditCardIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-bold text-sm mb-1">
                          کارت تایید شد!
                        </p>
                        <p className="text-gray-500 text-xs leading-5">
                          کارت خریدت توسط والدین تایید شد. حالا می‌تونی کارت رو فعال کنی.
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowActivateCardModal(true)}
                      className="w-full flex items-center justify-center gap-2 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                      style={{ backgroundColor: dominantColor }}
                    >
                      <CreditCardIcon className="w-4 h-4" />
                      <span>فعال سازی کارت</span>
                    </motion.button>
                  </motion.div>
                )}

                {/* Action Buttons - Always Show */}
                <div className="flex mt-2 gap-2 md:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTransferModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all text-sm md:text-base"
                    style={{ backgroundColor: dominantColor }}
                  >
                    <ArrowsRightLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
                    <span>انتقال و خرید</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/wallet_charge")}
                    className="flex-1 flex items-center justify-center gap-2 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all text-sm md:text-base"
                    style={{ backgroundColor: dominantColor }}
                  >
                    <ArrowDownTrayIcon className="w-5 h-5 md:w-6 md:h-6" />
                    <span>شارژ کیف پول</span>
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/messages")}
                  className="flex-1 flex items-center w-full mt-2 justify-center gap-2 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all text-sm md:text-base"
                  style={{ backgroundColor: dominantColor }}
                >
                  <ListBulletIcon className="w-5 h-5 md:w-6 md:h-6" />
                  <span>گردش حساب</span>
                </motion.button>
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
        ) : (
          <div className=" flex items-start justify-center pt-8" style={{ bottom: '80px', top: 0, height: 'calc(100% - 80px)' }}>
            <div className="w-full max-w-md px-4">
              <div className="flex flex-col items-center justify-start pb-8">
                {/* Lock GIF Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
                  className="mb-3"
                >
                  <img
                    src="/gif/Lock.gif"
                    alt="Lock"
                    className="w-44  object-contain drop-shadow-2xl"
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-xl font-bold text-gray-900 mb-1 text-center"
                >
                  دعوت والد الزامیه!
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-gray-600 text-center text-xs leading-5 mb-1 max-w-sm"
                >
                میخوای کیف پولت رو فعال کنی ؟
                </motion.p>
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-gray-600 text-center text-xs leading-5 mb-1 max-w-sm"
                >
                  از والدت دعوت کن تا دیجی پرنت رو نصب کنه !
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-gray-600 text-center text-xs leading-5 mb-4 max-w-sm"
                >
                  راه اول ; اسکن کیوارکد
                </motion.p>
                {/* QR Code - Simple */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mb-4 flex justify-center"
                >
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(inviteLink)}&bgcolor=ffffff&color=7e4bd0`}
                      alt="QR Code"
                      className="w-36 h-36 "
                    />
                  </div>
                </motion.div>

                {/* Divider - Enhanced */}
                <div className="flex items-center gap-3 w-full max-w-sm mb-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
                  <span className="text-gray-500 text-xs font-medium bg-white px-3 py-1 rounded-full border border-gray-200"> راه دوم ; ارسال لینک به شماره موبایل</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
                </div>

                {/* Invitation Form - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="w-full max-w-sm"
                >
                  {/* Phone Input - Enhanced */}
                  <div className="mb-3">
                    <AuthInput
                      id="parentPhoneNumber"
                      label="شماره موبایل والد"
                      type="tel"
                      value={parentPhoneNumber}
                      onChange={(value) => setParentPhoneNumber(formatPhoneNumber(value))}
                      placeholder="09123456789"
                      isNumberOrLink={true}
                      disabled={isSendingInvite || inviteSent}
                      required
                    />
                  </div>

                  {/* Send Button - Enhanced */}
                  <button
                    type="button"
                    onClick={handleSendInvitation}
                    disabled={isSendingInvite || parentPhoneNumber.length < 11 || inviteSent}
                    className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-[ad80f4] border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98]"
                  >
                    {isSendingInvite ? 'در حال ارسال...' : 'ارسال دعوتنامه'}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        )}
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
                <img src={lineIconPaths.sendToPasandaz} className="w-8 h-8" alt="انتقال به پس‌انداز" />
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
                <img src={lineIconPaths.digit} className="w-8 h-8" alt="خرید دیجیت" />
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
        dominantColor={dominantColor}
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

      {/* Parent Required Modal */}
      <Modal
        isOpen={showParentRequiredModal}
        onClose={() => setShowParentRequiredModal(false)}
        title="دعوت والد الزامیه!"
        maxHeight="50vh"
      >
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlusIcon className="w-10 h-10 text-[#7e4bd0]" />
          </div>
          <p className="text-gray-600 text-sm mb-6 leading-6">
            برای دریافت کارت خرید، اول باید والدینت رو به اپلیکیشن دعوت کنی تا بتونن درخواست کارت رو تأیید کنن.
          </p>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowParentRequiredModal(false)}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold"
            >
              بعداً
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowParentRequiredModal(false);
                navigate("/invite-parent");
              }}
              className="flex-1 py-3 rounded-xl bg-[#7e4bd0] text-white font-semibold flex items-center justify-center gap-2"
            >
              <UserPlusIcon className="w-5 h-5" />
              دعوت والد
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Card Activation Modal */}
      <Modal
        isOpen={showActivateCardModal}
        onClose={() => {
          setShowActivateCardModal(false);
          setCardNumber("");
          setActivationError("");
        }}
        title="فعال سازی کارت"
        maxHeight="60vh"
      >
        <div className="py-4">
          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCardIcon className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-gray-600 text-sm leading-6">
                اگر کارت خرید به دستت رسیده، برای استفاده از اون باید فعالش کنی.تره ۱۶ رقمی کارت رو وارد کن.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              تره کارت
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => {
                // Remove non-digits and format with spaces
                const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                // Add space every 4 digits
                const formatted = value.replace(/(.{4})/g, "$1 ").trim();
                setCardNumber(formatted);
                setActivationError("");
              }}
              placeholder="۱۲۳۴ ۵۶۷۸ ۹۰۱۲ ۳۴۵۶"
              className={`w-full px-4 py-4 rounded-xl border-2 text-center text-xl font-bold tracking-wider ${activationError
                ? "border-red-300 focus:border-red-500"
                : "border-gray-200 focus:border-[#7e4bd0]"
                } outline-none transition-all`}
              dir="ltr"
            />
            {activationError && (
              <p className="text-red-500 text-xs mt-2 text-center">
                {activationError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={async () => {
              const digitsOnly = cardNumber.replace(/\s/g, "");
              if (digitsOnly.length !== 16) {
                setActivationError("لطفاًتره ۱۶ رقمی کارت رو کامل وارد کن");
                return;
              }

              setIsActivating(true);

              // Simulate API call
              await new Promise((resolve) => setTimeout(resolve, 1500));

              // Update card request status to activated
              const cardRequest = JSON.parse(
                localStorage.getItem("physicalCardRequest") || "{}"
              );
              cardRequest.status = "activated";
              cardRequest.activatedAt = Date.now();
              cardRequest.cardNumber = digitsOnly;
              localStorage.setItem(
                "physicalCardRequest",
                JSON.stringify(cardRequest)
              );

              // Mark physical card as active
              localStorage.setItem("hasPhysicalCard", "true");

              setIsActivating(false);
              setShowActivateCardModal(false);
              setCardNumber("");

              // Reload data
              loadParentWallet();
            }}
            disabled={isActivating || cardNumber.replace(/\s/g, "").length !== 16}
            className="w-full bg-[#7e4bd0] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isActivating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>در حال فعال سازی...</span>
              </>
            ) : (
              <>
                <CheckIcon className="w-5 h-5" />
                <span>تایید و فعال سازی</span>
              </>
            )}
          </motion.button>
        </div>
      </Modal>

      {/* Success Modal - Invitation Sent */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        showCloseButton={false}
        maxHeight="50vh"
        backgroundColor="bg-gradient-to-br from-green-50 to-emerald-50"
      >
        <div className="flex flex-col items-center justify-center py-8 px-4">
          {/* Success GIF */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
            className="mb-6"
          >
            <img
              src="/gif/Done2.gif"
              alt="موفقیت"
              className="w-48 h-48 object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              دعوتنامه ارسال شد!
            </h3>
            <p className="text-gray-600 text-sm leading-6">
              دعوتنامه با موفقیت برای والدینت ارسال شد.
              <br />
              منتظر تأیید والدینت باش...
            </p>
          </motion.div>
        </div>
      </Modal>
    </div>
  );
}

export default WalletMoney;
