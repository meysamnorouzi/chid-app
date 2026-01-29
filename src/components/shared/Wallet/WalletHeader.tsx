import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import Modal from "../Modal";

interface WalletHeaderProps {
  greeting?: string;
  subtitle: string;
  showBalance?: boolean;
  balance?: string;
  icon?: ReactNode;
  showCartBadge?: boolean; // نمایش badge تعداد محصولات در سبد خرید
}

function WalletHeader({
  greeting = "محمد مهرابی",
  subtitle,
  showBalance = false,
  balance,
  icon,
  showCartBadge = false,
}: WalletHeaderProps) {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const cartItemsCount = showCartBadge ? getTotalItems() : 0;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleIconClick = () => {
    if (showCartBadge) {
      navigate("/cart");
    }
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleMenuClick = (menuItem: string) => {
    setIsProfileModalOpen(false);
    // Handle navigation based on menu item
    switch (menuItem) {
      case "orders":
        navigate("/orders");
        break;
      case "favorites":
        navigate("/favorites");
        break;
      case "userInfo":
        navigate("/user-info");
        break;
      case "profile":
        // navigate("/profile");
        break;
      case "settings":
        // navigate("/settings");
        break;
      case "logout":
        // Clear auth data from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        // Redirect to login page
        navigate('/login', { replace: true });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="relative cursor-pointer" onClick={handleProfileClick}>
            <img
              src="/logo/teens profiles/karagah.svg"
              className="w-12 h-12 object-cover border-2 border-[#7e4bd0] object-top rounded-full"
              alt=""
            />
            <div className="w-3 h-3 rounded-full bg-green-600 absolute top-0.5 right-0.5 border border-white"></div>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-xl text-gray-800 font-bold">{greeting}</p>
              {showBalance && balance && (
                <p className="text-xs text-[#7e4bd0] font-medium">{balance}</p>
              )}
            </div>
            <p className="text-xs">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          onClick={showCartBadge ? handleIconClick : undefined}
          className={`p-2 border border-[#7e4bd0] w-12 h-12 flex justify-center items-center rounded-full ${
            showCartBadge ? "cursor-pointer hover:bg-purple-50 transition-colors" : ""
          }`}
        >
          {icon || 
          <div  
      onClick={() => navigate(`/messages`)}
      >
             <img src="/icons/noti.svg" className="w-5 `h-5`" alt="notifications" />
        </div>
          }
        </div>
        {showCartBadge && cartItemsCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{cartItemsCount}</span>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        showCloseButton={true}
        showHandleBar={true}
        maxHeight="85vh"
      >
        <div className="flex flex-col">
          {/* Profile Header */}
          <div className="flex flex-col items-center pb-6 border-b border-gray-200">
            <div className="relative mb-4">
              <img
                 src="/logo/teens profiles/karagah.svg"
                className="w-24 h-24 object-cover border-4 border-[#7e4bd0] object-top rounded-full"
                alt="Profile"
              />
              <div className="w-4 h-4 rounded-full bg-green-600 absolute top-1 right-1 border-2 border-white"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{greeting}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
            {showBalance && balance && (
              <p className="text-sm text-[#7e4bd0] font-medium mt-2">{balance}</p>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => handleMenuClick("orders")}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-right"
            >
              <img src="/icons/list.svg" className="w-6 h-6 shrink-0" alt="orders" />
              <span className="flex-1 text-gray-800 font-medium">لیست سفارشات</span>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => handleMenuClick("favorites")}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-right"
            >
              <img src="/icons/fav.svg" className="w-6 h-6 shrink-0" alt="favorites" />
              <span className="flex-1 text-gray-800 font-medium">علاقه‌مندی‌ها</span>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => handleMenuClick("userInfo")}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-right"
            >
              <img src="/icons/profile.svg" className="w-6 h-6 shrink-0" alt="user info" />
              <span className="flex-1 text-gray-800 font-medium">ویرایش اطلاعات کاربری</span>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => handleMenuClick("profile")}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-right"
            >
              <img src="/icons/profile.svg" className="w-6 h-6 shrink-0" alt="profile" />
              <span className="flex-1 text-gray-800 font-medium">پروفایل</span>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => handleMenuClick("settings")}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-right"
            >
              <img src="/icons/setting.svg" className="w-6 h-6 shrink-0" alt="settings" />
              <span className="flex-1 text-gray-800 font-medium">تنظیمات</span>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="border-t border-gray-200 my-2"></div>

            <button
              onClick={() => handleMenuClick("logout")}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-red-50 transition-colors text-right"
            >
              <img src="/icons/logout.svg" className="w-6 h-6 shrink-0" alt="logout" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
              <span className="flex-1 text-red-500 font-medium">خروج از حساب</span>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WalletHeader;

