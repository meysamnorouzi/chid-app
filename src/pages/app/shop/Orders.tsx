import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WalletHeader from "../../../components/shared/Wallet/WalletHeader";
import { formatPrice } from "../../../utils/priceUtils";
import { useModal } from "../../../contexts/ModalContext";

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
  const { setModalOpen } = useModal();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      const parsed: Order[] = JSON.parse(storedOrders);
      setOrders(
        parsed.sort(
          (a, b) =>
            new Date(b.orderDate).getTime() -
            new Date(a.orderDate).getTime()
        )
      );
    }
  }, []);

  useEffect(() => {
    setModalOpen(selectedOrder !== null);
  }, [selectedOrder, setModalOpen]);

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
        <WalletHeader greeting="محمد مهرابی" subtitle="@mohammad-mehrabi" />
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-20">
          <img src="/gif/List.gif" alt="لیست سفارشات" className="w-60 h-60 mb-4" />
          <p className="font-bold">سفارشی وجود ندارد</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-6 px-6 py-3 bg-[#7e4bd0] text-white rounded-lg"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white min-h-screen pb-32">
      <WalletHeader greeting="محمد مهرابی" subtitle="@mohammad-mehrabi" />

      <div className="px-4 flex flex-col gap-4 mt-2 pb-8">
        {orders.map((order) => (
          <motion.div
            key={order.orderId}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedOrder(order)}
            className="bg-white border rounded-lg p-4 cursor-pointer"
          >
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500">شماره سفارش</p>
                <p className="font-semibold">{order.orderId}</p>
                <p className="text-xs text-gray-500">{order.orderDate}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full h-6 text-xs font-semibold ${getStatusBadgeColor(
                  order.statusBadge
                )}`}
              >
                {order.statusBadge}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {order.items.slice(0, 2).map((item, i) => (
                <div key={i} className="flex gap-3">
                  <img src={item.image} className="w-16 h-16 rounded-lg" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex justify-between">
                      <span className="text-xs">
                        تعداد: {item.quantity}
                      </span>
                   
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 pt-3 border-t">
              <span className="font-semibold">جمع کل</span>
              <span className="font-bold text-[#7e4bd0]">
                {formatPrice(order.totalPrice)} تومان
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 150) {
                  setSelectedOrder(null);
                }
              }}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

              <div className="px-4 pb-4 border-b">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">جزئیات سفارش</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                      selectedOrder.statusBadge
                    )}`}
                  >
                    {selectedOrder.statusBadge}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  سفارش #{selectedOrder.orderId}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedOrder.orderDate}
                </p>
              </div>

              <div className="px-4 py-4 flex flex-col gap-4">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={item.image}
                      className="w-20 h-20 rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.title}</p>
                      {item.shopName && (
                        <p className="text-xs text-gray-500">
                          {item.shopName}
                        </p>
                      )}
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">
                          تعداد: {item.quantity}
                        </span>
         
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-4 border-t flex justify-between">
                <span className="font-semibold">مبلغ نهایی</span>
                <span className="font-bold text-lg text-[#7e4bd0]">
                  {formatPrice(selectedOrder.totalPrice)} تومان
                </span>
              </div>

              <div className="px-4 pb-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-3 rounded-xl bg-gray-100 font-semibold"
                >
                  بستن
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
