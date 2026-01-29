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
  giftIcon: string;
  gradient: string;
  bonus?: number;
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
  { 
    id: "1", 
    digits: 100, 
    price: 25000, 
    label: "پکیج کوچک",
    giftIcon: "/iconGift/IMG_5447.PNG",
    gradient: "from-blue-50 to-blue-100"
  },
  { 
    id: "2", 
    digits: 200, 
    price: 50000, 
    label: "پکیج متوسط",
    giftIcon: "/iconGift/IMG_5448.PNG",
    gradient: "from-green-50 to-green-100"
  },
  { 
    id: "3", 
    digits: 300, 
    price: 75000, 
    label: "پکیج بزرگ", 
    popular: true,
    giftIcon: "/iconGift/IMG_5449.PNG",
    gradient: "from-purple-50 to-purple-100"
  },
  { 
    id: "4", 
    digits: 400, 
    price: 100000, 
    label: "پکیج ویژه",
    giftIcon: "/iconGift/IMG_5450.PNG",
    gradient: "from-pink-50 to-pink-100"
  },
  { 
    id: "5", 
    digits: 1000, 
    price: 250000, 
    label: "پکیج طلایی",
    giftIcon: "/iconGift/IMG_5451.PNG",
    gradient: "from-yellow-50 to-yellow-100",
    bonus: 100
  },
  { 
    id: "6", 
    digits: 2000, 
    price: 500000, 
    label: "پکیج الماس",
    giftIcon: "/iconGift/IMG_5452.PNG",
    gradient: "from-indigo-50 to-indigo-100",
    bonus: 100
  },
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
      const bonus = selectedPackage.bonus || 0;
      const totalDigits = digits + bonus;
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
        walletData.digits = (walletData.digits || 0) + totalDigits;
        localStorage.setItem(parentWalletKey, JSON.stringify(walletData));

        loadParentWallet();
        onPurchase(totalDigits, price);
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
      <div className="space-y-6" dir="rtl">
        {/* Header Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full flex justify-center items-center"
        >
          <img src="/logo/digit.svg" alt="logo" className="w-32" />
        </motion.div>

        {/* Exchange Rate Info */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
              هر ۱۰۰ دیجیت = ۲۵ هزار تومان
          </label>
          {getSelectedPrice() > 0 ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 border-2 border-amber-600 w-full h-16 rounded-2xl flex justify-center items-center text-white shadow-lg"
            >
              <div className="text-center">
                <span className="text-xs opacity-90 block mb-1">مبلغ پرداختی</span>
                <span className="text-lg font-bold">
                  {formatBalance(getSelectedPrice())} تومان
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 w-full h-16 rounded-2xl flex justify-center items-center text-gray-500 border-2 border-gray-200">
              <span className="text-sm">یک پکیج هدیه انتخاب کنید </span>
            </div>
          )}
        </div>

        {/* Package Selection with Gift Icons */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            انتخاب پکیج دیجیت
          </label>
          <div className="grid grid-cols-2 gap-4">
            {DIGIT_PACKAGES.map((pkg, index) => {
              const isSelected = selectedPackage?.id === pkg.id;
              const canAfford = parentMoneyBalance >= pkg.price;

              return (
                <motion.button
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: canAfford ? 1.05 : 1, y: canAfford ? -5 : 0 }}
                  whileTap={{ scale: canAfford ? 0.95 : 1 }}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setCustomDigits("");
                  }}
                  disabled={!canAfford}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? `border-amber-600 bg-white shadow-xl ring-4 ring-amber-600 ring-opacity-30`
                      : `border-gray-200 bg-white hover:border-gray-300 shadow-md hover:shadow-lg`
                  } ${
                    !canAfford
                      ? "opacity-40 cursor-not-allowed grayscale"
                      : "cursor-pointer"
                  }`}
                >
                  {/* Bonus Badge */}
                  {pkg.bonus && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -left-2 bg-white border-2 border-amber-600 text-amber-600 text-xs px-2 py-1 rounded-full font-bold shadow-lg z-10"
                    >
                      +{formatBalance(pkg.bonus)}
                    </motion.div>
                  )}

                  {/* Gift Icon */}
                  <div className="flex justify-center items-center mb-3 mt-2">
                    <motion.div
                      animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <img
                        src={pkg.giftIcon}
                        alt={pkg.label}
                        className="w-20 h-20 object-contain drop-shadow-lg"
                      />
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <CheckIcon className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Package Info */}
                  <div className="text-center space-y-1">
                    <p className="text-xl font-bold text-gray-900">
                      {formatBalance(pkg.digits)}
                    </p>
                    <p className="text-xs font-semibold text-gray-600 mb-2">
                      {pkg.label}
                    </p>
                    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                      isSelected 
                        ? "bg-amber-600 text-white" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      <span className="text-sm font-bold">
                        {formatBalance(pkg.price)}
                      </span>
                      <span className="text-xs">تومان</span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 border-4 border-amber-600 rounded-2xl pointer-events-none"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
        

        {/* Insufficient Balance Warning */}
        {getSelectedPrice() > parentMoneyBalance && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-4 shadow-md"
          >
            <p className="text-red-700 text-sm font-bold mb-2 flex items-center gap-2">
             موجودی کافی نیست!
            </p>
            <p className="text-red-600 text-xs">
              موجودی مورد نیاز: <span className="font-bold">{formatBalance(getSelectedPrice())}</span> تومان
            </p>
          </motion.div>
        )}

        {/* Action Button */}
        <div className="flex gap-3 pt-2">
          <motion.button
            whileHover={{ scale: canPurchase() ? 1.02 : 1 }}
            whileTap={{ scale: canPurchase() ? 0.98 : 1 }}
            onClick={handlePurchase}
            disabled={!canPurchase()}
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg hover:shadow-2xl transition-all"
          >
            <CheckIcon className="w-6 h-6" />
            <span>خرید دیجیت</span>
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

export default BuyDigitModal;

