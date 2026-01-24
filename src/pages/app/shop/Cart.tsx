import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ChevronLeftIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import WalletHeader from "../../../components/shared/Wallet/WalletHeader";
import { useCart } from "../../../hooks/useCart";
import { formatPrice } from "../../../utils/priceUtils";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  
  // Wallet balance state
  const [walletBalance, setWalletBalance] = useState<number>(0);
  
  // Check if user has enough balance
  const hasEnoughBalance = walletBalance >= totalPrice;
  const insufficientAmount = totalPrice > walletBalance ? totalPrice - walletBalance : 0;
  
  // Load wallet balance
  useEffect(() => {
    const loadWalletBalance = () => {
      const parentWalletKey = "parentWallet";
      const storedParentWallet = localStorage.getItem(parentWalletKey);
      
      if (storedParentWallet) {
        const walletData = JSON.parse(storedParentWallet);
        setWalletBalance(walletData.money || 0);
      } else {
        // Initialize with default value
        const defaultWallet = {
          money: 10000000, // 10 million Toman
          digits: 1000,
        };
        localStorage.setItem(parentWalletKey, JSON.stringify(defaultWallet));
        setWalletBalance(defaultWallet.money);
      }
    };
    
    loadWalletBalance();
    
    // Listen for storage changes to update balance
    const handleStorageChange = () => {
      loadWalletBalance();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically (in case of same-tab updates)
    const interval = setInterval(loadWalletBalance, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col bg-white min-h-screen pb-32">
        <WalletHeader
          greeting="سلام ، محمد"
          subtitle="سبد خرید شما"
          icon={<ShoppingBagIcon className="w-5 h-5 text-[#7e4bd0]" />}
        />

        <div className="flex flex-col items-center justify-center flex-1 px-4 py-20">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-black mb-2">سبد خرید شما خالی است</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            محصولات مورد نظر خود را به سبد خرید اضافه کنید
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-[#7e4bd0] text-white rounded-lg font-semibold"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white min-h-screen pb-40">
      <WalletHeader
        greeting="سلام ، محمد"
        subtitle="سبد خرید شما"
        icon={<ShoppingBagIcon className="w-5 h-5 text-[#7e4bd0]" />}
      />

      <div className="px-4 flex flex-col gap-4 pb-40">
        {/* Cart Items */}
        <div className="flex flex-col gap-3 mt-2">
          {cartItems.map((item, index) => (
            <div
              key={`${item.productId}-${index}`}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex gap-3">
                {/* Product Image */}
                <div
                  onClick={() => navigate(`/shop/${item.productId}`)}
                  className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <h3
                    onClick={() => navigate(`/shop/${item.productId}`)}
                    className="text-sm font-semibold text-black line-clamp-2 cursor-pointer hover:text-[#7e4bd0]"
                  >
                    {item.title}
                  </h3>

                  {/* Shop and Seller Info */}
                  <div className="flex flex-col gap-1">
                    {item.shopName && (
                      <div className="flex items-center gap-1">
                        <ShoppingBagIcon className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{item.shopName}</p>
                      </div>
                    )}
                    {item.sellerName && (
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-gray-500">فروشنده: {item.sellerName}</p>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1">
                    <p className="text-base font-bold text-black">
                      {item.finalPrice}
                    </p>
                    <p className="text-xs text-gray-500">تومان</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1,
                            item.selectedVariants
                          )
                        }
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-black min-w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1,
                            item.selectedVariants
                          )
                        }
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        removeFromCart(item.productId, item.selectedVariants)
                      }
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="حذف از سبد خرید"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Summary and Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-40">
        {/* Wallet Balance */}
        <div className="bg-gradient-to-r from-[#7e4bd0] to-[#9d6fe8] rounded-lg p-4 mb-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WalletIcon className="w-5 h-5" />
              <span className="text-sm font-medium">موجودی کیف پول</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">{formatPrice(walletBalance)}</span>
              <span className="text-sm opacity-90">تومان</span>
            </div>
          </div>
        </div>
        
        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">تعداد کالاها</span>
            <span className="text-sm font-semibold text-black">{totalItems} عدد</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">جمع کل</span>
            <span className="text-lg font-bold text-black">
              {totalPrice > 0 ? formatPrice(totalPrice) : '۰'} تومان
            </span>
          </div>
        </div>

        {/* Insufficient Balance Message */}
        {!hasEnoughBalance && totalPrice > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full shrink-0"></div>
              <p className="text-sm text-red-700">
                موجودی کیف پول شما کافی نیست. مبلغ مورد نیاز: {formatPrice(insufficientAmount)} تومان
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={clearCart}
            className="py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold text-sm"
          >
            پاک کردن سبد خرید
          </button>
          <button
            onClick={() => {
              if (hasEnoughBalance && totalPrice > 0) {
                // TODO: Process payment and navigate to checkout
                alert("در حال توسعه...");
              }
            }}
            disabled={!hasEnoughBalance || totalPrice === 0}
            className={`py-3 rounded-lg font-semibold text-sm transition-all ${
              hasEnoughBalance && totalPrice > 0
                ? 'bg-[#7e4bd0] text-white hover:bg-[#6b3fb8]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            ثبت درخواست خرید ({totalPrice > 0 ? formatPrice(totalPrice) : '۰'} تومان)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

