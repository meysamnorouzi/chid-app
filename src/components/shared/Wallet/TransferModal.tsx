import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal";

type TransferDirection = "to-saving" | "to-wallet";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: TransferDirection;
  formatBalance: (balance: number) => string;
  sourceBalance: number;
  targetBalance?: number;
  targetName?: string;
  onTransfer: (amount: number) => void;
  dominantColor?: string;
}

function TransferModal({
  isOpen,
  onClose,
  direction,
  formatBalance,
  sourceBalance,
  targetBalance,
  targetName = "میثم نوروزی",
  onTransfer,
  dominantColor = "#7e4bd0",
}: TransferModalProps) {
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const handleClose = () => {
    setTransferAmount("");
    setInsufficientBalance(false);
    onClose();
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (amount > 0 && amount <= sourceBalance) {
      onTransfer(amount);
      handleClose();
    } else if (amount > sourceBalance) {
      setInsufficientBalance(true);
    }
  };

  const title =
    direction === "to-saving"
      ? "انتقال به پس انداز"
      : "انتقال به کیف پول";

  const buttonText =
    direction === "to-saving"
      ? "انتقال وجه"
      : "تایید و انتقال";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      maxHeight="70vh"
    >
      <div className="space-y-6">
        {/* Target Information - Only for transfer to saving */}
        {direction === "to-saving" && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              اطلاعات پس‌انداز
            </label>
            <div className="w-full h-14 rounded-xl flex justify-center items-center" style={{ color: dominantColor }}>
              {targetName} - موجودی فعلی: {formatBalance(targetBalance || 0)}{" "}
              تومان
            </div>
          </div>
        )}

        {/* Transfer Amount Input */}
        <div className="space-y-2">
          <label
            htmlFor="transferAmount"
            className="block text-sm font-semibold text-gray-700"
          >
            مبلغ انتقال (تومان)
          </label>
          <input
            type="number"
            id="transferAmount"
            value={transferAmount}
            onChange={(e) => {
              setTransferAmount(e.target.value);
              setInsufficientBalance(false);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
            placeholder="مثال: 500000"
            dir="ltr"
            min="1"
          />
        </div>

        {/* Insufficient Balance Warning */}
        {insufficientBalance && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-red-700 text-sm font-semibold">
              موجودی کافی نیست!
            </p>
            <p className="text-red-600 text-xs mt-1">
              موجودیت: {formatBalance(sourceBalance)} تومان
            </p>
            <p className="text-red-600 text-xs mt-1">
              مبلغ درخواستی:{" "}
              {formatBalance(parseFloat(transferAmount) || 0)} تومان
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleTransfer}
            disabled={
              !transferAmount ||
              parseFloat(transferAmount) <= 0 ||
              parseFloat(transferAmount) > sourceBalance
            }
            className="flex-1 text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ backgroundColor: dominantColor }}
          >
            <CheckIcon className="w-5 h-5" />
            <span>{buttonText}</span>
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

export default TransferModal;

