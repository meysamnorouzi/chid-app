import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { lineIconPaths } from "../../../utils/lineIcons";

export interface ProfileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  greeting?: string;
  subtitle?: string;
  showBalance?: boolean;
  balance?: string;
  avatarSrc?: string;
}

function getDefaultUser() {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      const avatar = user.avatar
        ? user.avatar.startsWith("/")
          ? user.avatar
          : `/logo/teens profiles/${user.avatar}`
        : "/logo/teens profiles/karagah.svg";
      return {
        name: user.name ?? "محمد مهرابی",
        username: user.username ?? "@mohammad-mehrabi",
        avatar,
      };
    }
  } catch {
    // ignore
  }
  return {
    name: "محمد مهرابی",
    username: "@mohammad-mehrabi",
    avatar: "/logo/teens profiles/karagah.svg",
  };
}

function ProfileMenuModal({
  isOpen,
  onClose,
  greeting,
  subtitle,
  showBalance = false,
  balance,
  avatarSrc,
}: ProfileMenuModalProps) {
  const navigate = useNavigate();
  const defaultUser = getDefaultUser();
  const displayGreeting = greeting ?? defaultUser.name;
  const displaySubtitle = subtitle ?? defaultUser.username;
  const displayAvatar = avatarSrc ?? defaultUser.avatar;

  const handleMenuClick = (menuItem: string) => {
    onClose();
    switch (menuItem) {
      case "orders":
        navigate("/orders");
        break;
      case "favorites":
        navigate("/favorites");
        break;
      case "profile":
        navigate("/user-info");
        break;
      case "settings":
        break;
      case "logout":
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={true}
      showHandleBar={true}
      maxHeight="85vh"
    >
      <div className="flex flex-col">
        {/* Profile Header */}
        <div className="flex flex-col items-center pb-6 border-b border-gray-200">
          <div className="relative mb-4">
            <img
              src={displayAvatar.startsWith("/") ? displayAvatar : `/logo/teens profiles/${displayAvatar}`}
              className="w-24 h-24 object-cover border-4 border-[#7e4bd0] object-top rounded-full"
              alt="Profile"
            />
            <div className="w-4 h-4 rounded-full bg-green-600 absolute top-1 right-1 border-2 border-white"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{displayGreeting}</h3>
          <p className="text-sm text-gray-600">{displaySubtitle}</p>
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
            <img src={lineIconPaths.list} className="w-6 h-6 shrink-0" alt="orders" />
            <span className="flex-1 text-gray-800 font-medium">لیست سفارشات</span>
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => handleMenuClick("favorites")}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-right"
          >
            <img src={lineIconPaths.like} className="w-6 h-6 shrink-0" alt="favorites" />
            <span className="flex-1 text-gray-800 font-medium">علاقه‌مندی‌ها</span>
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => handleMenuClick("profile")}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-right"
          >
            <img src={lineIconPaths.profile} className="w-6 h-6 shrink-0" alt="profile" />
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
            <img src={lineIconPaths.logout} className="w-6 h-6 shrink-0" alt="logout" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
            <span className="flex-1 text-red-500 font-medium">خروج از حساب</span>
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileMenuModal;
