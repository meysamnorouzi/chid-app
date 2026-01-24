import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
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

interface Order {
  orderId: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
  status: string;
  statusBadge: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      const parsedOrders: Order[] = JSON.parse(storedOrders);
      // Sort by date (newest first)
      const sortedOrders = parsedOrders.sort((a, b) => {
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      });
      setOrders(sortedOrders);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "در انتظار تایید والد":
        return "bg-yellow-100 text-yellow-700";
      case "با موفقیت پرداخت شد":
        return "bg-green-100 text-green-700";
      case "لغو شده":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col bg-white min-h-screen pb-32">
        <WalletHeader
          greeting="سلام ، محمد"
          subtitle="لیست سفارشات"
        />

        <div className="flex flex-col items-center justify-center flex-1 px-4 py-20">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <DocumentTextIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-black mb-2">شما هنوز سفارشی ثبت نکرده‌اید</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            سفارشات شما در اینجا نمایش داده می‌شود
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
    <div className="flex flex-col bg-white min-h-screen pb-32">
      <WalletHeader
        greeting="سلام ، محمد"
        subtitle="لیست سفارشات"
      />

      <div className="px-4 flex flex-col gap-4 mt-2 pb-8">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">شماره سفارش:</span>
                  <span className="text-sm font-semibold text-gray-800">{order.orderId}</span>
                </div>
                <span className="text-xs text-gray-500">{order.orderDate}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(order.statusBadge)}`}>
                {order.statusBadge}
              </span>
            </div>

            {/* Order Items Preview */}
            <div className="flex flex-col gap-3 mb-4">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={index} className="flex gap-3">
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
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">تعداد: {item.quantity}</span>
                      <span className="text-sm font-bold text-gray-800">
                        {formatPrice(parseFloat(item.finalPrice) * item.quantity)} تومان
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {order.items.length > 2 && (
                <p className="text-xs text-gray-500 text-center">
                  و {order.items.length - 2} محصول دیگر
                </p>
              )}
            </div>

            {/* Order Total */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-800">جمع کل سفارش</span>
              <span className="text-lg font-bold text-[#7e4bd0]">
                {formatPrice(order.totalPrice)} تومان
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

