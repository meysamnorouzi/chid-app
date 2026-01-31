import { useNavigate } from "react-router-dom";
import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useFavorites } from "../../../hooks/useFavorites";
import { useToast } from "../../../components/shared";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useFavorites();
  const { showToast } = useToast();

  const handleRemoveFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromFavorites(productId);
    showToast({
      type: 'success',
      title: 'موفق',
      message: 'محصول از علاقه‌مندی‌ها حذف شد',
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col bg-white min-h-screen pb-24">
      <div className="px-4 flex flex-col gap-4 mt-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">علاقه‌مندی‌های من</h1>
          {favorites.length > 0 && (
            <p className="text-sm text-gray-500">{favorites.length} محصول</p>
          )}
        </div>

        {/* Favorites List */}
        {favorites.length > 0 ? (
          <div className="flex flex-col gap-4">
            {favorites.map((item) => (
              <div
                key={item.productId}
                onClick={() => navigate(`/shop/${item.productId}`)}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#7e4bd0] transition-colors"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col gap-2 min-w-0">
                    <div className="flex items-center gap-1">
                      <ShoppingBagIcon className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">فروشگاه دیجی تین</p>
                    </div>

                    <h3 className="text-sm font-semibold text-black line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-1 mt-auto">
                      <p className="text-base font-bold text-black">{item.price}</p>
                      <p className="text-xs text-gray-500">تومان</p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => handleRemoveFavorite(item.productId, e)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    aria-label="حذف از علاقه‌مندی‌ها"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <img
              src="/gif/List alaghe mandia.gif"
              alt=""
              className="w-48 h-48 object-contain"
            />
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold text-black">لیست علاقه‌مندی‌های شما خالی است</h2>
              <p className="text-sm text-gray-500 text-center">
                محصولاتی که دوست دارید را به علاقه‌مندی‌ها اضافه کنید
              </p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-3 bg-[#7e4bd0] text-white rounded-lg font-semibold text-sm hover:bg-[#6b3fb8] transition-colors mt-4"
            >
              رفتن به فروشگاه
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

