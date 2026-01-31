import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DigiteenTabs } from "../../../components/shared/DigiteenTabs";
import { lineIconPaths } from "../../../utils/lineIcons";

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
    <div className="w-full bg-white flex flex-col pb-24 overflow-hidden">
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <DigiteenTabs activeTab="missions" />
      </div>

      <div className="px-4 flex-1 overflow-y-auto min-h-0">
        {/* Banner – مثل Friends/Goals/Challenges، مخصوص ماموریت */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-4 flex items-center justify-between gap-4 p-6 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 relative overflow-hidden"
        >
          <div className="flex flex-col w-[68%] relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="font-bold text-[18px] text-white"
            >
              ماموریت‌ها رو انجام بده، جایزه بگیر
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-semibold text-sm text-white/90 mt-1"
            >
              والدین برات ماموریت می‌ذارن؛ انجام بده و دیجیت یا پول بگیر
            </motion.p>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            src="/image/Mission .png"
            alt="ماموریت"
            className="w-[28%] shrink-0 object-contain relative z-10"
          />
        </motion.div>

        {/* لیست ماموریت‌ها */}
        {missions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="mt-6 p-6 rounded-2xl bg-gray-50/50 flex flex-col items-center justify-center py-12 gap-4"
          >
            <img
              src="/gif/Mission .gif"
              alt="ماموریت‌ها"
              className="w-[50%] max-w-[200px]"
            />
            <div className="flex flex-col items-center gap-2 w-full">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                هنوز ماموریتی تعریف نشده است
              </h2>
              <p className="text-sm text-gray-500 text-center px-4">
                والدین شما می‌توانند ماموریت جدید تعریف کنند
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="py-5"
        >
          <h2 className="font-semibold text-xl text-gray-800 mb-3">ماموریت‌ها</h2>
        
          <div className="flex flex-col gap-3">
            {missions.map((mission, index) => {
              const daysRemaining = getDaysRemaining(mission.deadline);
              const overdue = isOverdue(mission.deadline);
        
              const statusColor = mission.completed
                ? "from-emerald-400 to-emerald-500"
                : overdue
                ? "from-rose-400 to-rose-500"
                : "from-violet-400 to-violet-500";
        
              return (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.2 + index * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -2 }}
                  className="relative flex flex-col p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  {/* accent bar */}
                  <div
                    className={`absolute right-0 top-4 bottom-4 w-1 rounded-l-full bg-gradient-to-b ${statusColor}`}
                  />
        
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      {/* checkbox */}
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          mission.completed
                            ? "bg-emerald-500"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {mission.completed ? (
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
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                        )}
                      </div>
        
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-extrabold text-lg leading-snug ${
                            mission.completed
                              ? "text-emerald-700"
                              : overdue
                              ? "text-rose-700"
                              : "text-gray-800"
                          }`}
                        >
                          {mission.title}
                        </p>
        
                        {mission.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {mission.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
        
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-gray-200">
                    <div className="flex flex-col gap-1">
                      {mission.deadline && (
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-400 shrink-0"
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
                            className={`text-xs font-medium ${
                              mission.completed
                                ? "text-emerald-600"
                                : overdue
                                ? "text-rose-600"
                                : "text-gray-500"
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
        
                    <div className="flex items-center gap-2 shrink-0 bg-gray-50 px-3 py-1.5 rounded-xl">
                      {mission.rewardType === "digit" ? (
                        <img
                          src={lineIconPaths.digit}
                          className="w-5 h-5"
                          alt="دیجیت"
                        />
                      ) : (
                        <span className="text-xs text-gray-500">تومان</span>
                      )}
        
                      <span className="text-sm font-black text-violet-600">
                        {formatBalance(mission.rewardAmount)}
                        {mission.rewardType === "money" && " تومان"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        )}
      </div>
    </div>
  );
};

export default Missions;

