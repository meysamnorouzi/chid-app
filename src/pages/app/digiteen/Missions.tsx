import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WalletHeader } from "../../../components/shared/Wallet";
import { DigiteenTabs } from "../../../components/shared/DigiteenTabs";

interface Mission {
  id: string;
  title: string;
  description?: string;
  deadline?: string; // تاریخ مهلت انجام
  rewardType: "digit" | "money";
  rewardAmount: number;
  completed: boolean;
  createdAt: string;
}

const Missions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    // بارگذاری ماموریت‌ها از localStorage یا API
    const storedMissions = localStorage.getItem("parentMissions");
    if (storedMissions) {
      setMissions(JSON.parse(storedMissions));
    } else {
      // نمونه ماموریت‌های پیش‌فرض
      const defaultMissions: Mission[] = [
        {
          id: "1",
          title: "تمیز کردن اتاق",
          description: "اتاقت رو تمیز کن و مرتب کن",
          deadline: "2026-01-25",
          rewardType: "digit",
          rewardAmount: 50,
          completed: false,
          createdAt: "2026-01-20",
        },
        {
          id: "2",
          title: "انجام تکالیف",
          description: "تمام تکالیف امروز رو انجام بده",
          deadline: "2026-01-22",
          rewardType: "money",
          rewardAmount: 50000,
          completed: false,
          createdAt: "2026-01-20",
        },
        {
          id: "3",
          title: "کمک در خانه",
          description: "در کارهای خانه کمک کن",
          deadline: "2026-01-30",
          rewardType: "digit",
          rewardAmount: 100,
          completed: true,
          createdAt: "2026-01-19",
        },
      ];
      setMissions(defaultMissions);
      localStorage.setItem("parentMissions", JSON.stringify(defaultMissions));
    }
  }, []);

  const formatBalance = (amount: number): string => {
    return new Intl.NumberFormat("fa-IR").format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const isOverdue = (deadline?: string): boolean => {
    if (!deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate < today;
  };

  const getDaysRemaining = (deadline?: string): number | null => {
    if (!deadline) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32 overflow-hidden">
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader subtitle="@mohammad-mehrabi" />
        <DigiteenTabs activeTab="missions" />
      </div>
      <div className="px-4 mt-6 flex-1 overflow-y-auto min-h-0 flex flex-col gap-3">
        {missions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 text-center">
              هنوز ماموریتی تعریف نشده است
            </p>
            <p className="text-sm text-gray-400 mt-2">
              والدین شما می‌توانند ماموریت جدید تعریف کنند
            </p>
          </div>
        ) : (
          missions.map((mission) => {
            const daysRemaining = getDaysRemaining(mission.deadline);
            const overdue = isOverdue(mission.deadline);

            return (
              <motion.div
                key={mission.id}
                whileHover={{ scale: 1.02 }}
                className={`flex flex-col p-4 border rounded-xl ${
                  mission.completed
                    ? "bg-green-50 border-green-200"
                    : overdue
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        mission.completed
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {mission.completed && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-bold text-lg ${
                          mission.completed
                            ? "text-green-700"
                            : overdue
                            ? "text-red-700"
                            : "text-gray-800"
                        }`}
                      >
                        {mission.title}
                      </p>
                      {mission.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {mission.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Deadline and Reward */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex flex-col gap-1">
                    {mission.deadline && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span
                          className={`text-xs ${
                            overdue
                              ? "text-red-600 font-bold"
                              : mission.completed
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {mission.completed
                            ? "انجام شده"
                            : overdue
                            ? `مهلت گذشته: ${formatDate(mission.deadline)}`
                            : daysRemaining !== null && daysRemaining > 0
                            ? `${daysRemaining} روز باقی مانده`
                            : "امروز آخرین مهلت"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {mission.rewardType === "digit" ? (
                      <img
                        src="/icons/digitcoin.svg"
                        className="w-6 h-6"
                        alt="دیجیت"
                      />
                    ) : (
                      <span className="text-xs text-gray-600">تومان</span>
                    )}
                    <span className="text-sm font-bold text-[#7e4bd0]">
                      {formatBalance(mission.rewardAmount)}
                      {mission.rewardType === "money" && " تومان"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Missions;

