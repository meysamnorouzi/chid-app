import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  WalletIcon,
  CheckCircleIcon,
  UserIcon,
  HeartIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { WalletHeader } from "../../../components/shared/Wallet";

const TEENS_PROFILE_AVATARS = [
  "/logo/teens profiles/darkoob.svg",
  "/logo/teens profiles/batman.svg",
  "/logo/teens profiles/rabi.svg",
  "/logo/teens profiles/naroto.svg",
  "/logo/teens profiles/hero.svg",
  "/logo/teens profiles/corn.svg",
  "/logo/teens profiles/karagah.svg",
  "/logo/teens profiles/moosh.svg",
  "/logo/teens profiles/ufi.svg",
  "/logo/teens profiles/dep.svg",
] as const;

const GIFT_CARD_CONFIG: Record<number, { title: string; icon: string }> = {
  100: { title: "هدیه ۱۰۰ دیجیت", icon: "/icons/gift/small.svg" },
  500: { title: "هدیه ۵۰۰ دیجیت", icon: "/icons/gift/medium.svg" },
  1000: { title: "هدیه ۱۰۰۰ دیجیت", icon: "/icons/gift/large.svg" },
};

function GiftMessageCard({
  amount,
  message,
  formatBalance,
}: {
  amount: number;
  message: string;
  formatBalance: (n: number) => string;
}) {
  const config = GIFT_CARD_CONFIG[amount as 100 | 500 | 1000] ?? GIFT_CARD_CONFIG[100];
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-amber-200/50 max-w-[280px]">
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold drop-shadow-sm bg-white/20 px-2 py-1 rounded-lg">
            {config.title}
          </span>
          <svg
            className="w-6 h-6 shrink-0 text-white"
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
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xl font-bold tracking-tight drop-shadow-sm">{formatBalance(amount)}</p>
            <p className="text-xs opacity-90">دیجیت</p>
          </div>
          <img src={config.icon} alt={config.title} className="w-14 h-14 object-contain shrink-0 drop-shadow-sm" />
        </div>
        <div className="pt-2 border-t border-white/30">
          <p className="text-xs opacity-90 truncate" title={message || "—"}>
            پیام: {message.trim() || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

interface Activity {
  id: string;
  childId: string;
  childName: string;
  childAvatar: string;
  type: "request" | "transaction" | "login" | "task" | "thanks" | "activity" | "gift";
  title: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  amount?: number;
  status?: "pending" | "approved" | "rejected";
  /** Request category for filtering, e.g. "خرید" (buy) */
  category?: string;
}

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isOnline?: boolean;
}

function MessagesPage() {
  const [searchParams] = useSearchParams();
  const filterBuy = searchParams.get("filter") === "buy";
  const [activities, setActivities] = useState<Activity[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadActivities();

    // Reload activities when page becomes visible (user navigates back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadActivities();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const loadActivities = () => {
    // Load children from localStorage
    const storedChildren = localStorage.getItem("childrenList");
    const parsedChildren: Child[] = storedChildren ? JSON.parse(storedChildren) : [];

    // اگر هیچ کودکی وجود ندارد، یک نمونه کودک ایجاد می‌کنیم
    const rawChildren = parsedChildren.length
      ? parsedChildren
      : [
          {
            id: "child_1",
            firstName: "علیرضا",
            lastName: "محمدی",
            avatar: TEENS_PROFILE_AVATARS[0],
          },
        ];
    const childrenToUse = rawChildren.map((child, i) => ({
      ...child,
      avatar: TEENS_PROFILE_AVATARS[i % TEENS_PROFILE_AVATARS.length],
    }));
    setChildren(childrenToUse);

    const allActivities: Activity[] = [];
    const now = Date.now();

    childrenToUse.forEach((child, childIndex) => {
      const childName = `${child.firstName} ${child.lastName}`;

      // نمونه درخواست‌ها
      const sampleRequests = [
        {
          id: "1",
          title: "درخواست خرید بازی",
          description: "می‌خوام بازی جدید پلی‌استیشن رو بخرم",
          type: "خرید",
          date: now - childIndex * 2 * 60 * 60 * 1000 - 30 * 60 * 1000,
          status: "pending" as const,
          amount: 1599000,
        },
        {
          id: "2",
          title: "درخواست افزایش موجودی",
          description: "می‌خوام موجودی کیف پولم رو افزایش بدی",
          type: "مالی",
          date: now - childIndex * 2 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000,
          status: "pending" as const,
          amount: 500000,
        },
      ];

      sampleRequests.forEach((request) => {
        allActivities.push({
          id: `request_${child.id}_${request.id}`,
          childId: child.id,
          childName,
          childAvatar: child.avatar,
          type: "request",
          title: request.title,
          message: request.description,
          timestamp: request.date,
          isRead: false,
          status: request.status,
          amount: request.amount,
          category: request.type,
        });
      });

      // نمونه فعالیت‌های دیگر
      allActivities.push({
        id: `thanks_${child.id}`,
        childId: child.id,
        childName,
        childAvatar: child.avatar,
        type: "thanks",
        title: "تشکر",
        message: "ممنون از واریز حقوق هفتگی 😊",
        timestamp: now - childIndex * 4 * 60 * 60 * 1000,
        isRead: childIndex === 0 ? false : true,
      });

      allActivities.push({
        id: `task_${child.id}`,
        childId: child.id,
        childName,
        childAvatar: child.avatar,
        type: "task",
        title: "ماموریت انجام شد",
        message: 'ماموریت "خرید کتاب درسی" رو انجام دادم!',
        timestamp: now - childIndex * 5 * 60 * 60 * 1000,
        isRead: true,
      });

      allActivities.push({
        id: `login_${child.id}`,
        childId: child.id,
        childName,
        childAvatar: child.avatar,
        type: "login",
        title: "ورود به اپلیکیشن",
        message: "به اپلیکیشن وارد شد",
        timestamp: now - childIndex * 6 * 60 * 60 * 1000,
        isRead: true,
      });

      // نمونه پیام هدیه
      allActivities.push({
        id: `gift_${child.id}`,
        childId: child.id,
        childName,
        childAvatar: child.avatar,
        type: "gift",
        title: "هدیه دیجیت",
        message: "برای تو هدیه‌ای دارم! تولدت مبارک 🎂",
        timestamp: now - childIndex * 1 * 60 * 60 * 1000,
        isRead: childIndex === 0 ? false : true,
        amount: childIndex === 0 ? 500 : childIndex === 1 ? 1000 : 100,
      });
    });

    // مرتب سازی بر اساس زمان
    const sortedActivities = allActivities.sort((a, b) => b.timestamp - a.timestamp);
    setActivities(sortedActivities);
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "همین الان";
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    if (hours < 24) return `${hours} ساعت پیش`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "دیروز";
    if (days < 7) return `${days} روز پیش`;
    return date.toLocaleDateString("fa-IR", { month: "long", day: "numeric" });
  };

  const formatBalance = (balance: number): string => {
    return new Intl.NumberFormat("fa-IR").format(balance);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "request":
        return <ShoppingBagIcon className="w-5 h-5" />;
      case "transaction":
        return <WalletIcon className="w-5 h-5" />;
      case "task":
        return <CheckCircleIcon className="w-5 h-5" />;
      case "thanks":
        return <HeartIcon className="w-5 h-5" />;
      case "login":
        return <UserIcon className="w-5 h-5" />;
      case "gift":
        return <GiftIcon className="w-5 h-5" />;
      default:
        return <ChatBubbleLeftRightIcon className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "request":
        return "bg-blue-50 text-blue-600";
      case "transaction":
        return "bg-green-50 text-green-600";
      case "task":
        return "bg-purple-50 text-purple-600";
      case "thanks":
        return "bg-pink-50 text-pink-600";
      case "login":
        return "bg-gray-50 text-gray-600";
      case "gift":
        return "bg-amber-50 text-amber-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    switch (status) {
      case "pending":
        return (
          <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
            در انتظار
          </span>
        );
      case "approved":
        return (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
            تأیید شده
          </span>
        );
      case "rejected":
        return (
          <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-medium">
            رد شده
          </span>
        );
      default:
        return null;
    }
  };

  const filteredActivities = filterBuy
    ? activities.filter((a) => a.type === "request" && a.category === "خرید")
    : activities;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col overflow-hidden" dir="rtl">
      {children.length === 0 ? (
        <div className="flex-1 flex items-center justify-center min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 px-4"
          >
            <div className="bg-gray-100 rounded-full w-24 h-24 border border-black flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftRightIcon className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              هنوز پیامی نداری
            </h3>
          </motion.div>
        </div>
      ) : (
        <div className="bg-white flex flex-col flex-1 min-h-0 max-w-4xl mx-auto w-full">
          {/* Fixed header - same as Friends page */}
          <div className="shrink-0 z-30 bg-white border-b border-gray-100">
            <WalletHeader subtitle="@mohammad-mehrabi" />
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
          {filterBuy && (
            <div className="px-4 pt-2">
              <h2 className="text-base font-bold text-gray-900">لیست خرید ها</h2>
              <p className="text-xs text-gray-500 mt-0.5">فقط درخواست‌های خرید</p>
            </div>
          )}

          {/* Activities List */}
          {filteredActivities.length > 0 ? (
            <div className="space-y-3 px-4 mt-3">
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className={`bg-white rounded-xl p-4 border border-gray-200 px-4 hover:bg-gray-50 transition-colors ${
                    !activity.isRead ? "border-l-4 border-l-black" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar - from teens profiles */}
                    <div className="relative shrink-0">
                      <img
                        src={activity.childAvatar.startsWith("/") ? activity.childAvatar : `/logo/teens profiles/${activity.childAvatar}`}
                        alt={activity.childName}
                        className="w-12 h-12 rounded-full object-cover border-2 object-center border-gray-200"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-bold text-gray-900">
                              {activity.childName}
                            </h3>
                            {!activity.isRead && (
                              <span className="w-2 h-2 bg-[#7e4bd0] rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            {activity.title}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-xs text-gray-500">
                            {formatTime(activity.timestamp)}
                          </span>
                          {getStatusBadge(activity.status)}
                        </div>
                      </div>
                      {activity.type === "gift" ? (
                        <div className="mt-2">
                          <GiftMessageCard
                            amount={activity.amount ?? 100}
                            message={activity.message}
                            formatBalance={formatBalance}
                          />
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-gray-600 mb-2">{activity.message}</p>
                          {activity.amount && (
                            <p className="text-xs text-gray-500">
                              مبلغ:{" "}
                              <span className="font-semibold text-gray-900">
                                {formatBalance(activity.amount)}
                              </span>{" "}
                              تومان
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center py-16"
            >
              <div className="border border-black rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftRightIcon className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {filterBuy ? "هنوز درخواست خریدی وجود ندارد" : "هنوز فعالیتی وجود ندارد"}
              </h3>
              <p className="text-gray-500 text-sm">
                {filterBuy
                  ? "درخواست‌های خرید فرزندانت اینجا نمایش داده می‌شود"
                  : "درخواست‌ها و فعالیت‌های فرزندانت اینجا نمایش داده می‌شود"}
              </p>
            </motion.div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;
