import { useState } from "react";
import { motion } from "framer-motion";
import { WalletHeader } from "../../../components/shared/Wallet";
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

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32 overflow-hidden">
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader subtitle="@mohammad-mehrabi" />
        <DigiteenTabs activeTab="challenges" />
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
      {/* Period Filter - Modern Badge Style */}
      <div className="px-4 py-4 bg-linear-to-b from-purple-50/30 to-white">
        <div className="flex items-center justify-center gap-3">
          <motion.button
            onClick={() => setActiveTab("daily")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === "daily"
                ? "bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3] text-white"
                : "bg-white text-gray-500 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600"
            }`}
          >
            {activeTab === "daily" && (
              <motion.div
                layoutId="activePeriod"
                className="absolute inset-0 rounded-xl bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">روزانه</span>
          </motion.button>
          
          <motion.button
            onClick={() => setActiveTab("weekly")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === "weekly"
                ? "bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3] text-white"
                : "bg-white text-gray-500 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600"
            }`}
          >
            {activeTab === "weekly" && (
              <motion.div
                layoutId="activePeriod"
                className="absolute inset-0 rounded-xl bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">هفتگی</span>
          </motion.button>
          
          <motion.button
            onClick={() => setActiveTab("monthly")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === "monthly"
                ? "bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3] text-white"
                : "bg-white text-gray-500 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600"
            }`}
          >
            {activeTab === "monthly" && (
              <motion.div
                layoutId="activePeriod"
                className="absolute inset-0 rounded-xl bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">ماهانه</span>
          </motion.button>
        </div>
      </div>

      {/* Challenges List */}
      <div className="px-4 mt-6 flex flex-col gap-3">
        {getCurrentChallenges().map((challenge) => {
          const progress = getChallengeProgress(challenge);
          const isCompleted = progress?.isCompleted ?? !!challenge.completed;
          const showProgress = !!progress && !isCompleted;

          return (
            <motion.div
              key={challenge.id}
              whileHover={{ scale: 1.02 }}
              className={`flex items-start justify-between gap-3 p-4 border rounded-xl ${
                isCompleted ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    isCompleted ? "bg-green-500 border-green-500" : "border-gray-300"
                  }`}
                >
                  {isCompleted && (
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

                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold leading-6 ${
                      isCompleted ? "text-green-700" : "text-gray-800"
                    }`}
                  >
                    {challenge.title}
                  </p>

                  {showProgress && progress && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>پیشرفت</span>
                        <span className="font-medium text-gray-600">
                          {formatBalance(progress.current)} از {formatBalance(progress.total)}
                        </span>
                      </div>

                      <div
                        className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden"
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
                          className="h-full bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <img src={lineIconPaths.digit} className="w-6 h-6" alt="دیجیت" />
                  <span className="text-sm font-bold text-[#7e4bd0]">
                    {formatBalance(challenge.digitReward)}
                  </span>
                </div>

                {isCompleted && (
                  <span className="text-xs font-bold text-green-600">انجام شد</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default Challenges;
