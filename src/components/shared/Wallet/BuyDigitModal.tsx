import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal";

interface DigitPackage {
  id: string;
  digits: number;
  price: number;
  label?: string;
  popular?: boolean;
}

interface BuyDigitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (digits: number, price: number) => void;
  formatBalance: (balance: number) => string;
  parentMoneyBalance: number;
  loadParentWallet: () => void;
}

const DIGIT_PACKAGES: DigitPackage[] = [
  { id: "1", digits: 10, price: 25000, label: "پکیج کوچک" },
  { id: "2", digits: 25, price: 60000, label: "پکیج متوسط" },
  { id: "3", digits: 50, price: 115000, label: "پکیج بزرگ", popular: true },
  { id: "4", digits: 100, price: 220000, label: "پکیج ویژه" },
  { id: "5", digits: 200, price: 420000, label: "پکیج طلایی" },
  { id: "6", digits: 500, price: 1000000, label: "پکیج الماس" },
];

function BuyDigitModal({
  isOpen,
  onClose,
  onPurchase,
  formatBalance,
  parentMoneyBalance,
  loadParentWallet,
}: BuyDigitModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<DigitPackage | null>(
    null
  );
  const [customDigits, setCustomDigits] = useState<string>("");

  const handlePurchase = () => {
    if (selectedPackage) {
      const digits = selectedPackage.digits;
      const price = selectedPackage.price;

      // Check if user has enough money
      if (parentMoneyBalance >= price) {
        // Deduct money from parent wallet
        const parentWalletKey = "parentWallet";
        const storedParentWallet = localStorage.getItem(parentWalletKey);
        const walletData = storedParentWallet
          ? JSON.parse(storedParentWallet)
          : { money: 0, digits: 0 };
        walletData.money = (walletData.money || 0) - price;
        walletData.digits = (walletData.digits || 0) + digits;
        localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

        loadParentWallet();
        onPurchase(digits, price);
        handleClose();
      }
    } else if (customDigits && parseFloat(customDigits) > 0) {
      const digits = parseFloat(customDigits);
      const price = Math.ceil((digits / 10) * 25000); // هر 10 دیجیت 25 هزار تومان

      if (parentMoneyBalance >= price) {
        // Deduct money from parent wallet
        const parentWalletKey = "parentWallet";
        const storedParentWallet = localStorage.getItem(parentWalletKey);
        const walletData = storedParentWallet
          ? JSON.parse(storedParentWallet)
          : { money: 0, digits: 0 };
        walletData.money = (walletData.money || 0) - price;
        walletData.digits = (walletData.digits || 0) + digits;
        localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

        loadParentWallet();
        onPurchase(digits, price);
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setSelectedPackage(null);
    setCustomDigits("");
    onClose();
  };

  const calculateCustomPrice = (digits: number): number => {
    return Math.ceil((digits / 10) * 25000);
  };

  const canPurchase = () => {
    if (selectedPackage) {
      return parentMoneyBalance >= selectedPackage.price;
    }
    if (customDigits && parseFloat(customDigits) > 0) {
      const price = calculateCustomPrice(parseFloat(customDigits));
      return parentMoneyBalance >= price;
    }
    return false;
  };

  const getSelectedPrice = (): number => {
    if (selectedPackage) {
      return selectedPackage.price;
    }
    if (customDigits && parseFloat(customDigits) > 0) {
      return calculateCustomPrice(parseFloat(customDigits));
    }
    return 0;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="خرید دیجیت"
      maxHeight="90vh"
    >
      <div className="space-y-6">

        <div className="w-full flex justify-center items-center">
          <img src="/logo/digit.svg" alt="logo" className="w-40" />
        </div>

        {/* Exchange Rate Info */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            مقدار پولی که باید پرداخت کنی (هر ۱۰ دیجیت ۲۵ هزارتومان)
          </label>
          {getSelectedPrice() > 0 ? (
            <div className="bg-[#7e4bd0] w-full h-14 rounded-xl flex justify-center items-center text-white">
              <span className="text-lg font-bold">
                مبلغ: {formatBalance(getSelectedPrice())} تومان
              </span>
            </div>
          ) : (
            <div className="bg-gray-100 w-full h-14 rounded-xl flex justify-center items-center text-gray-500">
              <span className="text-sm">یک پکیج انتخاب کنید</span>
            </div>
          )}
        </div>

        {/* Package Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            انتخاب پکیج دیجیت
          </label>
          <div className="grid grid-cols-2 gap-3">
            {DIGIT_PACKAGES.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              const canAfford = parentMoneyBalance >= pkg.price;

              return (
                <motion.button
                  key={pkg.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setCustomDigits("");
                  }}
                  disabled={!canAfford}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[#7e4bd0] bg-indigo-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${
                    !canAfford
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      محبوب
                    </div>
                  )}
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900 mb-1">
                      {formatBalance(pkg.digits)} دیجیت
                    </p>
                    <p className="text-xs text-gray-500 mb-2">{pkg.label}</p>
                    <p
                      className={`text-sm font-semibold ${
                        isSelected ? "text-[#7e4bd0]" : "text-gray-700"
                      }`}
                    >
                      {formatBalance(pkg.price)} تومان
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 left-2">
                      <div className="w-5 h-5 bg-[#7e4bd0] rounded-full flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            یا مقدار دلخواه دیجیت وارد کنید
          </label>
          <div className="relative">
            <input
              type="number"
              value={customDigits}
              onChange={(e) => {
                setCustomDigits(e.target.value);
                setSelectedPackage(null);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 outline-none transition-all"
              placeholder="مثال: 100"
              dir="ltr"
              min="1"
            />
            {customDigits && parseFloat(customDigits) > 0 && (
              <div className="mt-2 text-right">
                <p className="text-xs text-gray-500">
                  قیمت: {formatBalance(calculateCustomPrice(parseFloat(customDigits)))}{" "}
                  تومان
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Balance Info */}
        <div className="flex items-center justify-between text-xs bg-gray-50 p-3 rounded-xl">
          <span className="text-gray-500">موجودی شما:</span>
          <span className="font-semibold text-[#7e4bd0]">
            {formatBalance(parentMoneyBalance)} تومان
          </span>
        </div>

        {getSelectedPrice() > parentMoneyBalance && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-red-700 text-sm font-semibold">
              موجودی کافی نیست!
            </p>
            <p className="text-red-600 text-xs mt-1">
              موجودی مورد نیاز: {formatBalance(getSelectedPrice())} تومان
            </p>
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
            onClick={handlePurchase}
            disabled={!canPurchase()}
            className="flex-1 bg-[#7e4bd0] text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CheckIcon className="w-5 h-5" />
            <span>خرید دیجیت</span>
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

export default BuyDigitModal;

