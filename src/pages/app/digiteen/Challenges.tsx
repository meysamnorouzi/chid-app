import { useState } from "react";
import { motion } from "framer-motion";
import { DigiteenTabs } from "../../../components/shared/DigiteenTabs";
import { lineIconPaths } from "../../../utils/lineIcons";

interface Challenge {
  id: string;
  title: string;
  digitReward: number;
  completed?: boolean;
  progressCurrent?: number;
  progressTotal?: number;
}

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">("daily");

  // نمونه چالش‌های تعریف شده
  const dailyChallenges: Challenge[] = [
    {
      id: "1",
      title: "تموم کردن پنج تا درس مالی",
      digitReward: 50,
      completed: false,
      progressCurrent: 2,
      progressTotal: 5,
    },
    {
      id: "2",
      title: "گوش کردن به پادکست و حل کوییز",
      digitReward: 30,
      completed: false,
      progressCurrent: 0,
      progressTotal: 1,
    },
    {
      id: "3",
      title: "گرفتن ده تا دیجیت",
      digitReward: 10,
      completed: true,
      progressCurrent: 10,
      progressTotal: 10,
    },
  ];

  const weeklyChallenges: Challenge[] = [
    {
      id: "4",
      title: "تموم کردن بیست تا درس مالی",
      digitReward: 200,
      completed: false,
      progressCurrent: 7,
      progressTotal: 20,
    },
    {
      id: "5",
      title: "گوش کردن به پنج پادکست",
      digitReward: 150,
      completed: false,
      progressCurrent: 1,
      progressTotal: 5,
    },
    {
      id: "6",
      title: "کسب صد دیجیت",
      digitReward: 50,
      completed: false,
      progressCurrent: 40,
      progressTotal: 100,
    },
  ];

  const monthlyChallenges: Challenge[] = [
    {
      id: "7",
      title: "تموم کردن صد تا درس مالی",
      digitReward: 1000,
      completed: false,
      progressCurrent: 25,
      progressTotal: 100,
    },
    {
      id: "8",
      title: "گوش کردن به بیست پادکست",
      digitReward: 600,
      completed: false,
      progressCurrent: 4,
      progressTotal: 20,
    },
    {
      id: "9",
      title: "کسب پانصد دیجیت",
      digitReward: 200,
      completed: false,
      progressCurrent: 110,
      progressTotal: 500,
    },
  ];

  const getCurrentChallenges = () => {
    switch (activeTab) {
      case "daily":
        return dailyChallenges;
      case "weekly":
        return weeklyChallenges;
      case "monthly":
        return monthlyChallenges;
      default:
        return dailyChallenges;
    }
  };

  const formatBalance = (amount: number): string => {
    return new Intl.NumberFormat("fa-IR").format(amount);
  };

  const getChallengeProgress = (challenge: Challenge) => {
    if (!challenge.progressTotal || challenge.progressTotal <= 0) return null;
    const total = challenge.progressTotal;
    const currentRaw = challenge.progressCurrent ?? 0;
    const current = Math.max(0, Math.min(currentRaw, total));
    const percent = Math.round((current / total) * 100);
    const isCompleted = challenge.completed ?? current >= total;

    return { current, total, percent, isCompleted };
  };

  const periodLabel =
    activeTab === "daily" ? "روزانه" : activeTab === "weekly" ? "هفتگی" : "ماهانه";

  return (
    <div className="w-full bg-white flex flex-col pb-24 overflow-hidden">
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <DigiteenTabs activeTab="challenges" />
      </div>

      <div className="px-4 flex-1 overflow-y-auto min-h-0">
        {/* Banner – مثل Friends ولی مخصوص چالش */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-4 flex items-center justify-between gap-4 p-6 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 relative overflow-hidden"
        >
          <div className="flex flex-col w-[65%] relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="font-bold text-[18px] text-white"
            >
              چالش بزن، دیجیت بگیر
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-semibold text-sm text-white/90 mt-1"
            >
              درس و پادکست تموم کن، جایزه بگیر
            </motion.p>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            src="/image/Challenge .png"
            alt="چالش"
            className="w-[32%] shrink-0 object-contain relative z-10"
          />
        </motion.div>

        {/* دوره چالش – سکشن rounded-2xl مثل Friends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mt-6 py-4 rounded-2xl bg-gray-50/50"
        >
          <h2 className="font-bold text-lg text-gray-700 mb-3">دوره چالش</h2>
          <div className="flex items-center justify-center gap-3">
            {(["daily", "weekly", "monthly"] as const).map((tab) => {
              const isActive = activeTab === tab;
              const label = tab === "daily" ? "روزانه" : tab === "weekly" ? "هفتگی" : "ماهانه";
              return (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3] text-white shadow-md"
                      : "bg-white text-gray-500 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                  }`}
                >
                  {label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* لیست چالش‌ها – سکشن rounded-2xl و کارت‌های border-2 */}
        {getCurrentChallenges().length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="mt-6 p-6 rounded-2xl bg-gray-50/50 flex flex-col items-center justify-center py-12 gap-4"
          >
            <img
              src="/gif/Challenge .gif"
              alt="چالش‌ها"
              className="w-[50%] max-w-[200px]"
            />
            <div className="flex flex-col items-center gap-2 w-full">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {activeTab === "daily"
                  ? "چالش روزانه‌ای نیست"
                  : activeTab === "weekly"
                  ? "چالش هفتگی‌ای نیست"
                  : "چالش ماهانه‌ای نیست"}
              </h2>
              <p className="text-sm text-gray-500 text-center px-4">
                به زودی چالش‌های جدید اضافه می‌شه؛ این تب رو بعداً چک کن
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          className="py-5"
        >
          <div className="flex flex-col gap-3">
            {getCurrentChallenges().map((challenge, index) => {
              const progress = getChallengeProgress(challenge);
              const isCompleted =
                progress?.isCompleted ?? !!challenge.completed;
              const showProgress = !!progress && !isCompleted;
        
              const accent = isCompleted
                ? "from-emerald-400 to-emerald-500"
                : "from-violet-400 to-violet-500";
        
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.25 + index * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -2 }}
                  className="relative flex items-start justify-between gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  {/* accent bar */}
                  <div
                    className={`absolute right-0 top-4 bottom-4 w-1 rounded-l-full bg-gradient-to-b ${accent}`}
                  />
        
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* checkbox */}
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                        isCompleted
                          ? "bg-emerald-500"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {isCompleted ? (
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
                        className={`font-bold leading-6 ${
                          isCompleted ? "text-emerald-700" : "text-gray-800"
                        }`}
                      >
                        {challenge.title}
                      </p>
        
                      {showProgress && progress && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>پیشرفت</span>
                            <span className="font-medium text-gray-600">
                              {formatBalance(progress.current)} از{" "}
                              {formatBalance(progress.total)}
                            </span>
                          </div>
        
                          <div
                            className="h-2 w-full bg-gray-100 rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={progress.total}
                            aria-valuenow={progress.current}
                            aria-label="پیشرفت چالش"
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress.percent}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-[#7e4bd0] to-[#9d6ff3] rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
        
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl">
                      <img
                        src={lineIconPaths.digit}
                        className="w-5 h-5"
                        alt="دیجیت"
                      />
                      <span className="text-sm font-black text-violet-600">
                        {formatBalance(challenge.digitReward)}
                      </span>
                    </div>
        
                    {isCompleted && (
                      <span className="text-xs font-bold text-emerald-600">
                        انجام شد
                      </span>
                    )}
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

export default Challenges;
