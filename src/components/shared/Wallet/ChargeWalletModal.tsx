import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckIcon, ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal";

interface ChargeWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  formatBalance: (balance: number) => string;
  onCharge: (amount: number) => void;
}

const SUGGESTED_AMOUNTS = [
  100000,
  50000,
  500000,
  200000,
  2000000,
  1000000,
  10000000,
  5000000,
];

function ChargeWalletModal({
  isOpen,
  onClose,
  formatBalance,
  onCharge,
}: ChargeWalletModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [chargedAmount, setChargedAmount] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setShowSuccess(false);
      setSelectedAmount(null);
      setCustomAmount("");
      setChargedAmount(0);
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedAmount(null);
    setCustomAmount("");
    setShowSuccess(false);
    setChargedAmount(0);
    onClose();
  };

  const handleCharge = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount && amount > 0) {
      // Show success message
      setShowSuccess(true);
      setChargedAmount(amount);
      
      // Call onCharge callback
      onCharge(amount);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  const getChargeAmount = (): number => {
    if (selectedAmount) return selectedAmount;
    if (customAmount && parseFloat(customAmount) > 0) {
      return parseFloat(customAmount);
    }
    return 0;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={showSuccess ? "موفق" : "افزایش موجودی"}
      maxHeight="90vh"
    >
      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-8 space-y-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              موجودی با موفقیت افزایش یافت
            </h3>
            <p className="text-lg text-gray-600">
              مبلغ: {formatBalance(chargedAmount)} تومان
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Suggested Amounts */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              انتخاب از مبالغ پیشنهادی
            </label>
            <div className="grid grid-cols-2 gap-3">
              {SUGGESTED_AMOUNTS.map((amount) => {
                const isSelected = selectedAmount === amount;
                return (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-[#7e4bd0] bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 left-2">
                        <div className="w-5 h-5 bg-[#7e4bd0] rounded-full flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="text-center">
                      <p
                        className={`text-lg font-bold ${
                          isSelected ? "text-[#7e4bd0]" : "text-gray-900"
                        }`}
                      >
                        {formatBalance(amount)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">تومان</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              یا مبلغ دلخواه وارد کنید
            </label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
              placeholder="مثال: 150000"
              dir="ltr"
              min="1"
            />
            {customAmount && parseFloat(customAmount) > 0 && (
              <div className="mt-2 text-right">
                <p className="text-xs text-gray-500">
                  مبلغ: {formatBalance(parseFloat(customAmount))} تومان
                </p>
              </div>
            )}
          </div>

          {/* Selected Amount Display */}
          {getChargeAmount() > 0 && (
            <div className="bg-[#7e4bd0] w-full h-14 rounded-xl flex justify-center items-center text-white">
              <span className="text-lg font-bold">
                مبلغ: {formatBalance(getChargeAmount())} تومان
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleClose}
              className="px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              بازگشت
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCharge}
              disabled={getChargeAmount() <= 0}
              className="flex-1 bg-[#7e4bd0] text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckIcon className="w-5 h-5" />
              <span>افزایش موجودی</span>
            </motion.button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ChargeWalletModal;

