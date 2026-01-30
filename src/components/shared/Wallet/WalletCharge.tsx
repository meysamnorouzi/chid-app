import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CheckIcon,
  CurrencyDollarIcon,
  StarIcon,
  ArrowPathIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import WalletHeader from "./WalletHeader";
import { useToast } from "../Toast/ToastProvider";
import AuthInput from "../AuthInput";

const SUGGESTED_AMOUNTS = [
  50000,
  100000,
  200000,
  500000,
  1000000,
  2000000,
  5000000,
  10000000,
];

interface Activity {
  id: string;
  title: string;
  amount: number;
  type: "expense" | "income";
  date: number;
  icon: string;
}

interface ReceiptData {
  amount: number;
  transactionId: string;
  date: number;
  type: "charge" | "deposit";
  status: "success" | "failed";
  errorMessage?: string;
}

function WalletCharge() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"charge" | "deposit">("charge");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  // Read success parameter from URL on mount/change
  useEffect(() => {
    const successParam = searchParams.get("success");
    if ((successParam === "true" || successParam === "false") && !receiptData) {
      // If URL has success parameter but no receipt data, create one
      const status: "success" | "failed" = successParam === "true" ? "success" : "failed";
      const transactionId = `${status === "success" ? "CHG" : "FAIL"}-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      setReceiptData({
        amount: 100000, // Default amount
        transactionId,
        date: Date.now(),
        type: "charge",
        status,
        errorMessage: status === "failed" ? "این یک تست برای نمایش وضعیت ناموفق است" : undefined,
      });
      setShowReceipt(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Update URL when receipt status changes
  useEffect(() => {
    if (showReceipt && receiptData) {
      setSearchParams({ success: receiptData.status === "success" ? "true" : "false" });
    } else if (!showReceipt) {
      // Remove query params when receipt is closed
      setSearchParams({}, { replace: true });
    }
  }, [showReceipt, receiptData, setSearchParams]);

  // charge states
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isCharging, setIsCharging] = useState(false);

  // deposit states
  const [depositAmount, setDepositAmount] = useState("");
  const [depositReason, setDepositReason] = useState("");
  const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false);

  const chargeAmount =
    selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("fa-IR");
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("fa-IR", options).format(date);
  };

  const handleCharge = async () => {
    if (chargeAmount <= 0) return;

    setIsCharging(true);
    try {
      // Load current wallet
      const parentWalletKey = "parentWallet";
      const storedParentWallet = localStorage.getItem(parentWalletKey);
      const walletData = storedParentWallet
        ? JSON.parse(storedParentWallet)
        : { money: 0, digits: 0 };

      // Add charge amount to wallet
      walletData.money = (walletData.money || 0) + chargeAmount;
      localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

      // Add activity to wallet activities
      const walletActivitiesKey = "walletActivities";
      const storedActivities = localStorage.getItem(walletActivitiesKey);
      const activities: Activity[] = storedActivities
        ? JSON.parse(storedActivities)
        : [];
      
      activities.unshift({
        id: `charge_${Date.now()}`,
        title: "افزایش موجودی",
        amount: chargeAmount,
        type: "income",
        date: Date.now(),
        icon: "wallet",
      });
      
      localStorage.setItem(
        walletActivitiesKey,
        JSON.stringify(activities)
      );

      // Generate transaction ID
      const transactionId = `CHG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Set receipt data and show receipt
      setReceiptData({
        amount: chargeAmount,
        transactionId,
        date: Date.now(),
        type: "charge",
        status: "success",
      });
      setShowReceipt(true);

      // Reset form
      setSelectedAmount(null);
      setCustomAmount("");

      // Trigger storage event to update other components
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      // Generate transaction ID for failed transaction
      const transactionId = `CHG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Set receipt data with failed status
      setReceiptData({
        amount: chargeAmount,
        transactionId,
        date: Date.now(),
        type: "charge",
        status: "failed",
        errorMessage: "متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      });
      setShowReceipt(true);
    } finally {
      setIsCharging(false);
    }
  };

  const handleDepositRequest = async () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) return;

    setIsSubmittingDeposit(true);
    try {
      // Store deposit request (for future parent approval)
      const depositRequestsKey = "depositRequests";
      const storedRequests = localStorage.getItem(depositRequestsKey);
      const requests = storedRequests ? JSON.parse(storedRequests) : [];

      requests.unshift({
        id: `deposit_${Date.now()}`,
        amount: amount,
        reason: depositReason,
        status: "pending",
        date: Date.now(),
      });

      localStorage.setItem(depositRequestsKey, JSON.stringify(requests));

      // For now, simulate parent approval and add to wallet
      // In production, this would wait for parent approval
      const parentWalletKey = "parentWallet";
      const storedParentWallet = localStorage.getItem(parentWalletKey);
      const walletData = storedParentWallet
        ? JSON.parse(storedParentWallet)
        : { money: 0, digits: 0 };

      walletData.money = (walletData.money || 0) + amount;
      localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

      // Add activity
      const walletActivitiesKey = "walletActivities";
      const storedActivities = localStorage.getItem(walletActivitiesKey);
      const activities: Activity[] = storedActivities
        ? JSON.parse(storedActivities)
        : [];

      activities.unshift({
        id: `deposit_${Date.now()}`,
        title: "درخواست شارژ (تایید شده)",
        amount: amount,
        type: "income",
        date: Date.now(),
        icon: "wallet",
      });

      localStorage.setItem(
        walletActivitiesKey,
        JSON.stringify(activities)
      );

      // Generate transaction ID
      const transactionId = `DEP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Set receipt data and show receipt
      setReceiptData({
        amount: amount,
        transactionId,
        date: Date.now(),
        type: "deposit",
        status: "success",
      });
      setShowReceipt(true);

      // Reset form
      setDepositAmount("");
      setDepositReason("");

      // Trigger storage event
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      // Generate transaction ID for failed transaction
      const transactionId = `DEP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Set receipt data with failed status
      setReceiptData({
        amount: amount,
        transactionId,
        date: Date.now(),
        type: "deposit",
        status: "failed",
        errorMessage: "متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      });
      setShowReceipt(true);
    } finally {
      setIsSubmittingDeposit(false);
    }
  };

  // Receipt Screen
  if (showReceipt && receiptData) {
    return (
      <div className="w-full min-h-full pb-4 md:pb-6 bg-gradient-to-b from-purple-50/30 via-white to-white">
        <WalletHeader subtitle="رسید پرداخت" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-3xl mx-auto w-full"
        >
          {/* Status GIF */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, bounce: 0.4 }}
            className="flex justify-center mb-6 md:mb-8"
          >
            <img
              src={receiptData.status === "success" ? "/gif/Done2.gif" : "/gif/Xkhata.gif"}
              alt={receiptData.status === "success" ? "موفقیت" : "خطا"}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Status Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 ${
              receiptData.status === "success" ? "text-gray-800" : "text-red-600"
            }`}>
              {receiptData.status === "success"
                ? "پرداخت با موفقیت انجام شد"
                : "پرداخت ناموفق بود"}
            </h2>
            <p className={`text-sm md:text-base lg:text-lg ${
              receiptData.status === "success" ? "text-gray-600" : "text-red-500"
            }`}>
              {receiptData.status === "success"
                ? receiptData.type === "charge"
                  ? "موجودی کیف پولت با موفقیت افزایش یافت"
                  : "درخواست شارژت ثبت و تایید شد"
                : receiptData.errorMessage || "متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید."}
            </p>
          </motion.div>

          {/* Receipt Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl md:rounded-[2rem] shadow-xl border-2 border-purple-100 overflow-hidden mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-[#7e4bd0] to-[#9d6ff3] p-4 md:p-5">
              <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl text-center">
                رسید پرداخت
              </h3>
            </div>

            <div className="p-6 md:p-8 space-y-4 md:space-y-5">
              {/* Amount */}
              <div className="flex justify-between items-center py-3 md:py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium text-base md:text-lg">مبلغ:</span>
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#7e4bd0]">
                  {formatAmount(receiptData.amount)} تومان
                </span>
              </div>

              {/* Transaction ID */}
              <div className="flex justify-between items-center py-3 md:py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium text-base md:text-lg">شماره تراکنش:</span>
                <span className="text-sm md:text-base font-mono text-gray-800">
                  {receiptData.transactionId}
                </span>
              </div>

              {/* Date */}
              <div className="flex justify-between items-center py-3 md:py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium text-base md:text-lg">تاریخ و زمان:</span>
                <span className="text-sm md:text-base text-gray-800">
                  {formatDate(receiptData.date)}
                </span>
              </div>

              {/* Type */}
              <div className="flex justify-between items-center py-3 md:py-4">
                <span className="text-gray-600 font-medium text-base md:text-lg">نوع تراکنش:</span>
                <span className="text-sm md:text-base font-semibold text-purple-600">
                  {receiptData.type === "charge"
                    ? "افزایش موجودی"
                    : "درخواست شارژ"}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              {receiptData.status === "success" ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl md:rounded-3xl p-4 md:p-5 flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckIcon className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800 text-sm md:text-base">وضعیت: موفق</p>
                    <p className="text-xs md:text-sm text-green-600 mt-1 md:mt-2">
                      تراکنشت با موفقیت انجام شد
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl md:rounded-3xl p-4 md:p-5 flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <XCircleIcon className="w-6 h-6 md:w-7 md:h-7 text-red-600" />
                  </div>
                  <div>
                    <p className="font-bold text-red-800 text-sm md:text-base">وضعیت: ناموفق</p>
                    <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">
                      تراکنشت انجام نشد
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 md:space-y-4"
          >
            <button
              type="button"
              onClick={() => {
                navigate("/wallet-money");
              }}
              className={`w-full font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98] ${
                receiptData.status === "success"
                  ? "bg-[#7e4bd0] hover:bg-gray-800 border border-[#7e4bd0] text-white"
                  : "bg-red-500 hover:bg-red-600 border border-red-500 text-white"
              }`}
            >
              بازگشت به کیف پول
            </button>

            {receiptData.status === "success" && (
              <button
                type="button"
                onClick={() => {
                  setShowReceipt(false);
                  setReceiptData(null);
                  setSelectedAmount(null);
                  setCustomAmount("");
                  setActiveTab("charge");
                  setSearchParams({}, { replace: true });
                }}
                className="w-full border border-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-[#7e4bd0] font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98]"
              >
                افزایش موجودی مجدد
              </button>
            )}

            {receiptData.status === "failed" && (
              <button
                type="button"
                onClick={() => {
                  setShowReceipt(false);
                  setReceiptData(null);
                  setSelectedAmount(null);
                  setCustomAmount("");
                  setActiveTab("charge");
                  setSearchParams({}, { replace: true });
                }}
                className="w-full border border-red-500 hover:bg-red-50 disabled:bg-gray-400 disabled:cursor-not-allowed text-red-500 font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98]"
              >
                تلاش مجدد
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full space-y-6 pb-4 md:pb-6 bg-gradient-to-b from-purple-50/30 via-white to-white">
      {/* Header */}
      <WalletHeader subtitle="@mohammad-mehrabi" />

   <div className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
       {/* Tabs - Enhanced Design */}
       <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r mb-2 md:mb-4 from-gray-50 to-gray-100 rounded-2xl md:rounded-3xl p-1.5 md:p-2 shadow-inner"
      >
        <div className="flex relative">
          <motion.div
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-[#7e4bd0] to-[#9d6ff3] rounded-xl shadow-lg"
            initial={false}
            animate={{
              right: activeTab === "charge" ? "0%" : "50%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
          <button
            onClick={() => setActiveTab("charge")}
            className={`relative flex-1 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all z-10 ${
              activeTab === "charge"
                ? "text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CurrencyDollarIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span>افزایش موجودی</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("deposit")}
            className={`relative flex-1 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all z-10 ${
              activeTab === "deposit"
                ? "text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <StarIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span>درخواست شارژ</span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "charge" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === "charge" ? 20 : -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* ---------------- Charge Tab ---------------- */}
          {activeTab === "charge" && (
            <div className="space-y-6 md:space-y-8">
              {/* Charge GIF */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="flex justify-center mb-4 md:mb-6"
              >
                <img
                  src="/gif/Afzayesh-mozoodi.gif"
                  alt="افزایش موجودی"
                  className="w-full max-w-[180px] md:max-w-[240px] lg:max-w-[280px] h-auto object-contain drop-shadow-lg rounded-2xl"
                />
              </motion.div>

              {/* Amount Selection Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
                {SUGGESTED_AMOUNTS.map((amount, index) => {
                  const isSelected = selectedAmount === amount;
                  return (
                    <motion.button
                      key={amount}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`relative p-5 md:p-6 lg:p-7 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 overflow-hidden group ${
                        isSelected
                          ? "border-[#7e4bd0] bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg shadow-purple-200/50"
                          : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-indigo-100/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                      <div className="relative z-10">
                        <p
                          className={`text-lg md:text-xl lg:text-2xl font-bold transition-colors ${
                            isSelected
                              ? "text-[#7e4bd0]"
                              : "text-gray-800 group-hover:text-[#7e4bd0]"
                          }`}
                        >
                          {formatAmount(amount)}
                        </p>
                        <p
                          className={`text-xs md:text-sm mt-1 md:mt-2 transition-colors ${
                            isSelected
                              ? "text-purple-600"
                              : "text-gray-500"
                          }`}
                        >
                          تومان
                        </p>
                      </div>
                      {isSelected && (
                        <motion.div
                          className="absolute top-2 md:top-3 left-2 md:left-3 w-6 h-6 md:w-7 md:h-7 bg-[#7e4bd0] rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom Amount Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <AuthInput
                  id="customAmount"
                  label="مبلغ دلخواه"
                  type="number"
                  value={customAmount}
                  onChange={(value) => {
                    setCustomAmount(value);
                    setSelectedAmount(null);
                  }}
                  placeholder="مبلغ دلخواه را وارد کنید"
                  isNumberOrLink={true}
                />
              </motion.div>

           

              {/* Action Button */}
              <button
                type="button"
                disabled={chargeAmount <= 0 || isCharging}
                onClick={handleCharge}
                className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98]"
              >
                {isCharging ? 'در حال پردازش...' : 'افزایش موجودی'}
              </button>

              {/* Test Failed Button */}
              <button
                type="button"
                onClick={() => {
                  const testAmount = chargeAmount > 0 ? chargeAmount : 100000;
                  const transactionId = `TEST-FAIL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
                  
                  setReceiptData({
                    amount: testAmount,
                    transactionId,
                    date: Date.now(),
                    type: "charge",
                    status: "failed",
                    errorMessage: "این یک تست برای نمایش وضعیت ناموفق است",
                  });
                  setShowReceipt(true);
                }}
                className="w-full bg-red-500 hover:bg-red-600 border border-red-500 text-white font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98]"
              >
                تست وضعیت ناموفق
              </button>
            </div>
          )}

          {/* ---------------- Deposit Tab ---------------- */}
          {activeTab === "deposit" && (
            <div className="space-y-6 md:space-y-8">
              {/* Deposit GIF */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="flex justify-center mb-4 md:mb-6"
              >
                <img
                  src="/gif/Darkhast-sharj-va-enteghal.gif"
                  alt="درخواست شارژ و انتقال"
                  className="w-full max-w-[180px] md:max-w-[240px] lg:max-w-[280px] h-auto object-contain drop-shadow-lg rounded-2xl"
                />
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl md:rounded-3xl p-5 md:p-6 border-2 border-blue-200 shadow-sm"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <StarIcon className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                  </div>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    پس از ثبت، درخواستت برای والد ارسال می‌شود و پس از تایید
                    والد، موجودی کیف پولت افزایش می‌یابد.
                  </p>
                </div>
              </motion.div>

              {/* Amount Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <AuthInput
                  id="depositAmount"
                  label="مبلغ واریز"
                  type="number"
                  value={depositAmount}
                  onChange={(value) => setDepositAmount(value)}
                  placeholder="مبلغ مورد نظر را وارد کنید"
                  isNumberOrLink={true}
                />
                {depositAmount && parseFloat(depositAmount) > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm md:text-base text-gray-500 mt-2 md:mt-3 text-left"
                  >
                    {formatAmount(parseFloat(depositAmount))} تومان
                  </motion.p>
                )}
              </motion.div>

              {/* Reason Textarea */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2 md:mb-3">
                  علت درخواست شارژ
                </label>
                <textarea
                  value={depositReason}
                  onChange={(e) => setDepositReason(e.target.value)}
                  placeholder="علت درخواست شارژ حساب خود را بنویسید..."
                  className="w-full px-4 md:px-6 py-4 md:py-5 rounded-2xl md:rounded-3xl border-2 border-gray-200 bg-white focus:border-[#7e4bd0] focus:ring-4 focus:ring-purple-100 transition-all min-h-[140px] md:min-h-[160px] resize-none placeholder:text-gray-400 text-base md:text-lg"
                  dir="rtl"
                />
              </motion.div>

              {/* Action Button */}
              <button
                type="button"
                disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isSubmittingDeposit}
                onClick={handleDepositRequest}
                className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98]"
              >
                {isSubmittingDeposit ? 'در حال ثبت...' : 'ثبت درخواست'}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
   </div>
    </div>
  );
}
export default WalletCharge;
