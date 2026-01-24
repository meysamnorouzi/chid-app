import { motion } from "framer-motion";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import {
  AiOutlineWallet,
  AiOutlineShopping,
  AiOutlineRest,
  AiOutlineArrowDown,
} from "react-icons/ai";

interface Activity {
  id: string;
  title: string;
  amount: number;
  type: "expense" | "income";
  date: number;
  icon: string;
}

interface RecentTransactionsProps {
  activities: Activity[];
  formatBalance: (balance: number) => string;
  formatTime: (timestamp: number) => string;
  emptyMessage?: string;
  amountLabel?: string;
}

function RecentTransactions({
  activities,
  formatBalance,
  formatTime,
  emptyMessage = "هنوز تراکنشی ثبت نشده است",
  amountLabel = "تومان",
}: RecentTransactionsProps) {
  const getActivityIcon = (iconType: string) => {
    switch (iconType) {
      case "game":
        return <AiOutlineShopping className="w-5 h-5" />;
      case "food":
        return <AiOutlineRest className="w-5 h-5" />;
      default:
        return <AiOutlineWallet className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-xl p-5 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">تراکنش‌های اخیر</h2>
        <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
          مشاهده همه
        </button>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  activity.type === "income"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {activity.type === "income" ? (
                  <AiOutlineArrowDown className="w-6 h-6" />
                ) : (
                  getActivityIcon(activity.icon)
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {activity.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">
                    {formatTime(activity.date)}
                  </p>
                </div>
              </div>

              <div className="text-left shrink-0">
                <p
                  className={`text-sm font-bold ${
                    activity.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {activity.type === "income" ? "+" : "-"}{" "}
                  {formatBalance(activity.amount)}
                </p>
                <p className="text-xs text-gray-500">{amountLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CurrencyDollarIcon className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
        </div>
      )}
    </motion.div>
  );
}

export default RecentTransactions;

