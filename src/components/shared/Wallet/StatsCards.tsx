import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

interface StatsCardsProps {
  totalExpense: number;
  transactionsCount: number;
  formatBalance: (balance: number) => string;
}

function StatsCards({
  totalExpense,
  transactionsCount,
  formatBalance,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-4 border border-gray-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-red-50 rounded-lg p-2">
            <ArrowTrendingDownIcon className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-xs text-gray-600 font-medium">هزینه</span>
        </div>
        <p className="text-lg font-bold text-gray-900">
          {formatBalance(totalExpense)}
        </p>
        <p className="text-xs text-gray-500 mt-1">تومان</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-4 border border-gray-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-50 rounded-lg p-2">
            <ChartBarIcon className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs text-gray-600 font-medium">تراکنش</span>
        </div>
        <p className="text-lg font-bold text-gray-900">
          {transactionsCount}
        </p>
        <p className="text-xs text-gray-500 mt-1">مورد</p>
      </motion.div>
    </div>
  );
}

export default StatsCards;

