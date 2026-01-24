import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import WalletHeader from "../../../components/shared/Wallet/WalletHeader";
import { formatPrice } from "../../../utils/priceUtils";

interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: string;
  quantity: number;
  finalPrice: string;
  shopName?: string;
  sellerName?: string;
}

interface OrderData {
  orderId: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
  status: string;
}

const OrderReceipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData as OrderData | undefined;

  if (!orderData) {
    // اگر داده سفارش وجود نداشت، به صفحه سبد خرید برگرد
    navigate("/cart");
    return null;
  }

  const handleViewOrders = () => {
    navigate("/orders");
  };

  const handleBackToShop = () => {
    navigate("/shop");
  };

  return (
    <div className="flex flex-col bg-white min-h-screen pb-32">
      <WalletHeader
        greeting="سلام ، محمد"
        subtitle="رسید خرید"
      />

      <div className="flex flex-col items-center px-4 py-8">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircleIcon className="w-16 h-16 text-green-600" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          با موفقیت پرداخت شد
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          سفارش شما با موفقیت ثبت شد
        </p>

        {/* Order Details Card */}
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 mb-6">
          {/* Order ID */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <span className="text-sm text-gray-600">شماره سفارش</span>
            <span className="text-sm font-bold text-gray-800">{orderData.orderId}</span>
          </div>

          {/* Order Date */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <span className="text-sm text-gray-600">تاریخ سفارش</span>
            <span className="text-sm font-semibold text-gray-800">{orderData.orderDate}</span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <span className="text-sm text-gray-600">وضعیت</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              {orderData.status}
            </span>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">محصولات سفارش</h3>
            <div className="flex flex-col gap-3">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {item.title}
                    </h4>
                    {item.shopName && (
                      <p className="text-xs text-gray-500">{item.shopName}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">تعداد: {item.quantity}</span>
                      <span className="text-sm font-bold text-gray-800">
                        {formatPrice(parseFloat(item.finalPrice) * item.quantity)} تومان
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-base font-semibold text-gray-800">جمع کل</span>
            <span className="text-xl font-bold text-[#7e4bd0]">
              {formatPrice(orderData.totalPrice)} تومان
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md flex flex-col gap-3">
          <button
            onClick={handleViewOrders}
            className="w-full py-3 bg-[#7e4bd0] text-white rounded-lg font-semibold hover:bg-[#6b3fb8] transition-colors"
          >
            مشاهده لیست سفارشات
          </button>
          <button
            onClick={handleBackToShop}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;

