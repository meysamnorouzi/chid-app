import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ChevronLeftIcon,
  WalletIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../../../hooks/useCart";
import { formatPrice } from "../../../utils/priceUtils";
import { useToast } from "../../../components/shared/Toast/ToastProvider";

const Cart = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
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

  // Scroll to top when entering cart
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Handle purchase
  const handlePurchase = () => {
    if (!hasEnoughBalance || totalPrice === 0 || cartItems.length === 0) {
      return;
    }

    try {
      // 1. Deduct from wallet balance
      const parentWalletKey = "parentWallet";
      const storedParentWallet = localStorage.getItem(parentWalletKey);
      
      if (storedParentWallet) {
        const walletData = JSON.parse(storedParentWallet);
        const newBalance = walletData.money - totalPrice;
        
        if (newBalance < 0) {
          showToast({
            type: 'error',
            title: 'خطا',
            message: 'موجودی کیف پول کافی نیست',
          });
          return;
        }

        walletData.money = newBalance;
        localStorage.setItem(parentWalletKey, JSON.stringify(walletData));
        setWalletBalance(newBalance);
      }

      // 2. Create order
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date();
      const orderDate = now.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const orderData = {
        orderId,
        items: cartItems.map(item => ({
          productId: item.productId,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          finalPrice: item.finalPrice,
          shopName: item.shopName,
          sellerName: item.sellerName,
        })),
        totalPrice,
        orderDate,
        status: "با موفقیت پرداخت شد",
        statusBadge: "در انتظار تایید والد",
      };

      // 3. Save order to localStorage
      const storedOrders = localStorage.getItem("orders");
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      orders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(orders));

      // 4. Add notification
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      notifications.unshift({
        id: `notif-${Date.now()}`,
        type: "shop",
        title: "سفارش جدید",
        message: `سفارشت باتره ${orderId} ثبت شد و در انتظار تایید والد است`,
        date: new Date().toISOString(),
        read: false,
      });
      localStorage.setItem("notifications", JSON.stringify(notifications));

      // 5. Clear cart
      clearCart();

      // 6. Show success toast
      showToast({
        type: 'success',
        title: 'موفقیت',
        message: 'سفارشت با موفقیت ثبت شد',
        duration: 3000,
      });

      // 7. Navigate to receipt page
      setTimeout(() => {
        navigate("/order-receipt", { state: { orderData } });
      }, 500);

    } catch (error) {
      console.error("Error processing purchase:", error);
      showToast({
        type: 'error',
        title: 'خطا',
        message: 'خطایی در پردازش سفارش رخ داد. لطفا دوباره تلاش کنید.',
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col bg-white min-h-screen pb-32">
        <div className="flex flex-col items-center justify-center flex-1 px-4 md:px-6 lg:px-8 py-20 md:py-32">
          <div className="mb-4 md:mb-6">
            <img 
              src="/gif/Sabadkhali.gif" 
              alt="سبد خرید خالی" 
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
            />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-2 md:mb-3">سبد خریدت خالی است</h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-500 text-center mb-6 md:mb-8 max-w-md">
            محصولات مورد نظر خود را به سبد خرید اضافه کنید
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 md:px-8 py-3 md:py-4 bg-[#7e4bd0] text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-[#6b3fb8] transition-colors"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white min-h-screen pb-24 md:pb-4">
      <div className="px-4 md:px-6 lg:px-8 flex flex-col md:flex-row md:gap-6 lg:gap-8 gap-4 pb-40 md:pb-4 max-w-7xl mx-auto w-full">
        {/* Left Column: Cart Items */}
        <div className="md:w-2/3 lg:w-3/5 flex flex-col gap-4 md:gap-6">
          {/* Cart Items */}
          <div className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-0">
            {cartItems.map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3 md:gap-4">
                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/shop/${item.productId}`)}
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg md:rounded-xl overflow-hidden bg-gray-100 shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col gap-2 md:gap-3 min-w-0">
                    <h3
                      onClick={() => navigate(`/shop/${item.productId}`)}
                      className="text-sm md:text-base lg:text-lg font-semibold text-black line-clamp-2 cursor-pointer hover:text-[#7e4bd0] transition-colors"
                    >
                      {item.title}
                    </h3>

                    {/* Shop and Seller Info */}
                    <div className="flex flex-col gap-1 md:gap-2">
                      {item.shopName && (
                        <div className="flex items-center gap-1 md:gap-2">
                          <ShoppingBagIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                          <p className="text-xs md:text-sm text-gray-500">{item.shopName}</p>
                        </div>
                      )}
                      {item.sellerName && (
                        <div className="flex items-center gap-1 md:gap-2">
                          <p className="text-xs md:text-sm text-gray-500">فروشنده: {item.sellerName}</p>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1 md:gap-2">
                      <p className="text-base md:text-lg lg:text-xl font-bold text-black">
                        {item.finalPrice}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">تومان</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 md:gap-4 mt-auto">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg md:rounded-xl">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.selectedVariants
                            )
                          }
                          className="p-1.5 md:p-2 hover:bg-gray-100 transition-colors"
                        >
                          <MinusIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                        </button>
                        <span className="px-3 md:px-4 py-1 md:py-1.5 text-sm md:text-base font-semibold text-black min-w-8 md:min-w-10 text-center">
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
                          className="p-1.5 md:p-2 hover:bg-gray-100 transition-colors"
                        >
                          <PlusIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeFromCart(item.productId, item.selectedVariants)
                        }
                        className="p-2 md:p-2.5 text-red-500 hover:bg-red-50 rounded-lg md:rounded-xl transition-colors"
                        aria-label="حذف از سبد خرید"
                      >
                        <TrashIcon className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Summary and Actions - Desktop */}
        <div className="hidden md:flex md:w-1/3 lg:w-2/5 flex-col gap-4 lg:gap-6">
          <div className="sticky top-4 self-start w-full">

            {/* Wallet Balance */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 mb-3 md:mb-4 text-[#7e4bd0] shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <WalletIcon className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-sm md:text-base font-medium">موجودی کیف پول</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold">{formatPrice(walletBalance)}</span>
                  <span className="text-sm md:text-base opacity-90">تومان</span>
                </div>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 md:p-5 mb-3 md:mb-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-sm md:text-base text-gray-600">تعداد کالاها</span>
                <span className="text-sm md:text-base font-semibold text-black">{totalItems} عدد</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-gray-600">جمع کل</span>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-black">
                  {totalPrice > 0 ? formatPrice(totalPrice) : '۰'} تومان
                </span>
              </div>
            </div>

            {/* Insufficient Balance Message */}
            {!hasEnoughBalance && totalPrice > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 md:p-4 mb-3 md:mb-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full shrink-0"></div>
                  <p className="text-sm md:text-base text-red-700">
                    موجودی کیف پولت کافی نیست. مبلغ مورد نیاز: {formatPrice(insufficientAmount)} تومان
                  </p>
                </div>
              </div>
            )}

            {/* Charge Wallet Button - Show when balance is insufficient */}
            {!hasEnoughBalance && totalPrice > 0 && (
              <button
                onClick={() => navigate("/wallet_charge")}
                className="w-full py-3 md:py-4 bg-[#7e4bd0] text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-[#6b3fb8] transition-all mb-3 md:mb-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>افزودن موجودی</span>
                <ArrowDownTrayIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:gap-4">
              <button
                onClick={clearCart}
                className="py-3 md:py-4 border-2 border-red-500 text-red-500 rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-red-50 transition-colors"
              >
                پاک کردن سبد خرید
              </button>
              <button
                onClick={handlePurchase}
                disabled={!hasEnoughBalance || totalPrice === 0}
                className={`py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all ${
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
      </div>

      {/* Fixed Summary and Action Buttons - Mobile Only */}
      <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 z-40">
        {/* Wallet Balance */}
        <div className="rounded-lg p-4 mb-3 text-[#7e4bd0]">
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
                موجودی کیف پولت کافی نیست. مبلغ مورد نیاز: {formatPrice(insufficientAmount)} تومان
              </p>
            </div>
          </div>
        )}

        {/* Charge Wallet Button - Show when balance is insufficient */}
        {!hasEnoughBalance && totalPrice > 0 && (
          <button
            onClick={() => navigate("/wallet_charge")}
            className="w-full py-3 bg-[#7e4bd0] text-white rounded-lg font-semibold text-sm hover:bg-[#6b3fb8] transition-all mb-3 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>افزودن موجودی</span>
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
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
            onClick={handlePurchase}
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

