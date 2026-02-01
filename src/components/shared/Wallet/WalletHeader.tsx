import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import ProfileMenuModal from "./ProfileMenuModal";
import { lineIconPaths } from "../../../utils/lineIcons";

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
          className={`p-2 border border-[#7e4bd0] w-12 h-12 flex justify-center items-center rounded-full ${showCartBadge ? "cursor-pointer hover:bg-purple-50 transition-colors" : ""
            }`}
        >
          {icon ||
            <div
              onClick={() => navigate(`/messages`)}
            >
              <img src={lineIconPaths.notif} className="w-5 h-5" alt="notifications" />
            </div>
          }
        </div>
        {showCartBadge && cartItemsCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{cartItemsCount}</span>
          </div>
        )}
      </div>

      {/* Profile Modal - same popover as profile avatar on other pages */}
      <ProfileMenuModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        greeting={greeting}
        subtitle={subtitle}
        showBalance={showBalance}
        balance={balance}
      />
    </div>
  );
}

export default WalletHeader;

