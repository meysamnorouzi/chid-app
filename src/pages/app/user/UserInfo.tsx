import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FireIcon, 
  TrophyIcon, 
  BoltIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  QrCodeIcon,
  UserPlusIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  SparklesIcon,
  GiftIcon,
  MoonIcon,
  CloudIcon,
  ArrowRightIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  StarIcon,
  PencilIcon
} from "@heroicons/react/24/solid";
import { WalletIcon } from "@heroicons/react/24/outline";
import { Modal } from "../../../components/shared";
import { lineIconPaths } from "../../../utils/lineIcons";

interface MonthlyBadge {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgColor: string;
  iconColor: string;
}

interface Achievement {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgColor: string;
  iconColor: string;
  count: number;
}

const UserInfo = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [digitBalance, setDigitBalance] = useState<number>(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    phone_number: "",
    nickname: "",
    about: "",
    avatar: "",
  });
  const [friendSearchInput, setFriendSearchInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const avatarScrollRef = useRef<HTMLDivElement>(null);
  const selectedAvatarRef = useRef<HTMLButtonElement>(null);

  // Avatar list from teens profiles
  const avatarList = [
    "arnold.svg",
    "batman.svg",
    "booghi.svg",
    "booki.svg",
    "cap.svg",
    "corn.svg",
    "darkoob.svg",
    "dep.svg",
    "digi teen.svg",
    "digidin.svg",
    "elphy.svg",
    "fer top.svg",
    "ferzi.svg",
    "hero.svg",
    "kachal.svg",
    "kaftar.svg",
    "karagah.svg",
    "kiti kid.svg",
    "kola daar.svg",
    "kola kesh.svg",
    "marmooz.svg",
    "moosh.svg",
    "naroto.svg",
    "nostalgia.svg",
    "rabi.svg",
    "robot police.svg",
    "sarmaee.svg",
    "skull.svg",
    "ufi.svg",
    "wiking.svg",
  ];

  // Sample data - replace with actual API calls
  const monthlyBadges: MonthlyBadge[] = [
    { 
      id: "1", 
      name: "Seashell", 
      icon: SparklesIcon, 
      gradient: "from-blue-400 to-cyan-300",
      bgColor: "bg-gradient-to-br",
      iconColor: "text-white"
    },
    { 
      id: "2", 
      name: "Cookie", 
      icon: GiftIcon, 
      gradient: "from-pink-500 to-rose-400",
      bgColor: "bg-gradient-to-br",
      iconColor: "text-white"
    },
    { 
      id: "3", 
      name: "Owl", 
      icon: MoonIcon, 
      gradient: "from-indigo-400 to-purple-300",
      bgColor: "bg-gradient-to-br",
      iconColor: "text-white"
    },
    { 
      id: "4", 
      name: "Fluffy", 
      icon: CloudIcon, 
      gradient: "from-gray-300 to-gray-100",
      bgColor: "bg-gradient-to-br",
      iconColor: "text-gray-600"
    },
  ];

  const achievements: Achievement[] = [
    { 
      id: "1", 
      name: "Fighter", 
      icon: ShieldCheckIcon, 
      gradient: "",
      bgColor: "bg-yellow-400",
      iconColor: "text-white",
      count: 10 
    },
    { 
      id: "2", 
      name: "Explorer", 
      icon: LightBulbIcon, 
      gradient: "",
      bgColor: "bg-orange-500",
      iconColor: "text-white",
      count: 300 
    },
    { 
      id: "3", 
      name: "Champion", 
      icon: TrophyIcon, 
      gradient: "",
      bgColor: "bg-blue-500",
      iconColor: "text-white",
      count: 250 
    },
    { 
      id: "4", 
      name: "Archer", 
      icon: ArrowRightIcon, 
      gradient: "",
      bgColor: "bg-green-500",
      iconColor: "text-white",
      count: 50 
    },
  ];

  useEffect(() => {
    // Get user data from localStorage
    const getUserData = () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          return JSON.parse(userStr);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
      return null;
    };

    const data = getUserData();
    setUserData(data);
    
    // Initialize edit form data
    if (data) {
      // Extract avatar filename from path if it's a full path
      let avatarFilename = data.avatar || "karagah.svg";
      if (avatarFilename.includes("/")) {
        avatarFilename = avatarFilename.split("/").pop() || "karagah.svg";
      }
      
      setEditFormData({
        phone_number: data.phone_number || data.phone || "",
        nickname: data.nickname || data.name || data.first_name || "",
        about: data.about || data.bio || "",
        avatar: avatarFilename,
      });
    }

    // Load wallet data
    const loadWalletData = () => {
      const parentWalletKey = "parentWallet";
      const storedParentWallet = localStorage.getItem(parentWalletKey);
      
      if (storedParentWallet) {
        const walletData = JSON.parse(storedParentWallet);
        setWalletBalance(walletData.money || 0);
        setDigitBalance(walletData.digits || 0);
      } else {
        // Initialize with default values
        const defaultWallet = {
          money: 10000000, // 10 million Toman
          digits: 1000, // 1000 digits
        };
        localStorage.setItem(parentWalletKey, JSON.stringify(defaultWallet));
        setWalletBalance(defaultWallet.money);
        setDigitBalance(defaultWallet.digits);
      }
    };

    loadWalletData();
  }, []);

  const userName = userData?.name || userData?.nickname || "کاربر";
  // Get avatar path - handle both full path and filename
  const getAvatarPath = (avatar: string | undefined) => {
    if (!avatar) return "/logo/teens profiles/karagah.svg";
    if (avatar.startsWith("/")) return avatar;
    return `/logo/teens profiles/${avatar}`;
  };
  const userAvatar = getAvatarPath(userData?.avatar);
  const userHandle = userData?.phone_number || userData?.phone || userData?.nickname || "@user";
  const joinYear = userData?.created_at ? new Date(userData.created_at).getFullYear() : 2024;

  // Sample stats
  const stats = {
    courses: 7,
    following: 32,
    followers: 48,
    streak: 1,
    league: "Emerald",
    xp: 65638,
    topFinishes: 10,
  };

  // Format balance function
  const formatBalance = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  };

  // Handle edit modal open
  const handleOpenEditModal = () => {
    if (userData) {
      // Extract avatar filename from path if it's a full path
      let avatarFilename = userData.avatar || "karagah.svg";
      if (avatarFilename.includes("/")) {
        avatarFilename = avatarFilename.split("/").pop() || "karagah.svg";
      }
      
      setEditFormData({
        phone_number: userData.phone_number || userData.phone || "",
        nickname: userData.nickname || userData.name || userData.first_name || "",
        about: userData.about || userData.bio || "",
        avatar: avatarFilename,
      });
    }
    setIsEditModalOpen(true);
  };

  // Scroll to selected avatar when modal opens
  useEffect(() => {
    if (isEditModalOpen && selectedAvatarRef.current && avatarScrollRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        selectedAvatarRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }, 100);
    }
  }, [isEditModalOpen, editFormData.avatar]);

  // Handle edit modal close
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Handle add friend modal
  const handleOpenAddFriendModal = () => {
    setIsAddFriendModalOpen(true);
  };

  const handleCloseAddFriendModal = () => {
    setIsAddFriendModalOpen(false);
    setFriendSearchInput("");
  };

  // Handle QR Code modal
  const handleOpenQrCodeModal = () => {
    setIsQrCodeModalOpen(true);
  };

  const handleCloseQrCodeModal = () => {
    setIsQrCodeModalOpen(false);
  };

  // Handle add friend
  const handleAddFriend = () => {
    // TODO: Implement add friend logic
    console.log("Adding friend:", friendSearchInput);
    // You can add API call here
    handleCloseAddFriendModal();
  };

  // Handle save user info
  const handleSaveUserInfo = async () => {
    if (!userData) return;

    setIsSaving(true);
    try {
      // Update user data
      const updatedUserData = {
        ...userData,
        name: editFormData.nickname,
        nickname: editFormData.nickname,
        phone_number: editFormData.phone_number,
        phone: editFormData.phone_number,
        about: editFormData.about,
        bio: editFormData.about,
        avatar: editFormData.avatar,
      };

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      // Update state
      setUserData(updatedUserData);
      
      // Close modal
      setIsEditModalOpen(false);
      
      // You can also add API call here to save to backend
      // await profileService.updateProfile(updatedUserData);
      
    } catch (error) {
      console.error('Error saving user info:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      {/* Profile Section */}
      <div className="px-4 pt-6">
        {/* Wallet Info Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          {/* Wallet Balance */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/wallet-money')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
          >
            <WalletIcon className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-bold text-gray-800">
              {new Intl.NumberFormat("fa-IR").format(walletBalance)} تومان
            </span>
          </motion.button>

          {/* Digit Balance */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/wallet-digit')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
          >
            <img src={lineIconPaths.digit} className="w-5 h-5" alt="دیجیت" />
            <span className="text-sm font-bold text-gray-800">
              {new Intl.NumberFormat("fa-IR").format(digitBalance)} دیجیت
            </span>
          </motion.button>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>

        {/* Avatar Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="relative mb-4">
            <img
              src={userAvatar}
              className="w-32 h-32 object-cover border-4 border-[#7e4bd0] object-top rounded-full"
              alt="پروفایل کاربر"
            />
            <div className="w-4 h-4 rounded-full bg-green-500 absolute bottom-2 right-2 border-2 border-white"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-800 text-sm font-medium">{userHandle}</span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">عضویت در {joinYear}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenAddFriendModal}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition-colors border border-gray-200"
          >
            <UserPlusIcon className="w-5 h-5" />
            <span>افزودن دوست</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenQrCodeModal}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors border border-gray-200"
          >
            <QrCodeIcon className="w-6 h-6 text-gray-800" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenEditModal}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors border border-gray-200"
          >
            <PencilIcon className="w-6 h-6 text-gray-800" />
          </motion.button>
        </div>

        {/* Stats Section */}
        <div className="mb-6">
          <h2 className="text-gray-800 text-lg font-bold mb-4">آمار</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{stats.courses}</span>
                <span className="text-xs text-gray-600 mt-1">دوره‌ها</span>
              </div>
              <div className="flex flex-col items-center border-r border-l border-gray-200">
                <span className="text-2xl font-bold text-gray-800">{stats.following}</span>
                <span className="text-xs text-gray-600 mt-1">کتاب ها</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{stats.followers}</span>
                <span className="text-xs text-gray-600 mt-1">پادکست ها</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mb-6">
          <h2 className="text-gray-800 text-lg font-bold mb-4">خلاصه</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Streak */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#7e4bd0] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <FireIcon className="w-5 h-5 text-orange-500" />
                <span className="text-gray-800 font-bold text-lg">{stats.streak}</span>
              </div>
              <span className="text-gray-600 text-xs">روز استریک</span>
            </motion.div>

            {/* League */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#7e4bd0] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrophyIcon className="w-5 h-5 text-[#7e4bd0]" />
                <span className="text-gray-800 font-bold text-lg">{stats.league}</span>
              </div>
              <span className="text-gray-600 text-xs">لیگ</span>
            </motion.div>

            {/* XP */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#7e4bd0] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <BoltIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-800 font-bold text-lg">
                  {new Intl.NumberFormat("fa-IR").format(stats.xp)}
                </span>
              </div>
              <span className="text-gray-600 text-xs">امتیاز XP</span>
            </motion.div>

            {/* Top Finishes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#7e4bd0] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrophyIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-800 font-bold text-lg">{stats.topFinishes}</span>
              </div>
              <span className="text-gray-600 text-xs">رتبه‌های برتر</span>
            </motion.div>
          </div>
        </div>

        {/* Monthly Badges Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800 text-lg font-bold">نشان‌های ماهانه</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
            {monthlyBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="shrink-0"
                >
                  <div className={`relative w-20 h-20 ${badge.bgColor} ${badge.gradient} rounded-2xl flex items-center justify-center border-2 border-white group cursor-pointer overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                    <IconComponent className={`w-10 h-10 ${badge.iconColor} relative z-10`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800 text-lg font-bold">دستاوردها</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="shrink-0 relative"
                >
                  <div className={`w-24 h-28 ${achievement.bgColor} rounded-2xl rounded-b-xl flex flex-col items-center justify-center border-2 border-white relative overflow-hidden group cursor-pointer`}>
                    {/* Icon Section */}
                    <div className="flex-1 flex items-center justify-center w-full rounded-t-2xl">
                      <IconComponent className={`w-12 h-12 ${achievement.iconColor}`} />
                    </div>
                    
                    {/* Count Badge */}
                    <div className="w-full bg-white px-2 py-2.5 rounded-b-xl">
                      <span className="text-xs font-bold text-gray-800 block text-center">
                        {new Intl.NumberFormat("fa-IR").format(achievement.count)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit User Info Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="ویرایش اطلاعات کاربری"
        maxHeight="90vh"
      >
        <div className="space-y-6" dir="rtl">
          {/* Avatar Selection - Horizontal Scrollable */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              انتخاب عکس پروفایل
            </label>
            <div 
              ref={avatarScrollRef}
              className="overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2"
            >
              <div className="flex items-center gap-4" style={{ width: 'max-content' }}>
                {avatarList.map((avatar) => (
                  <motion.button
                    key={avatar}
                    ref={editFormData.avatar === avatar ? selectedAvatarRef : null}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setEditFormData({ ...editFormData, avatar })
                    }
                    className={`relative shrink-0 w-28 h-28 rounded-full border-2 transition-all overflow-hidden bg-white ${
                      editFormData.avatar === avatar
                        ? "border-[#7e4bd0] ring-2 ring-[#7e4bd0] ring-opacity-30 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={`/logo/teens profiles/${avatar}`}
                      alt={avatar.replace(".svg", "")}
                      className="w-full h-full object-contain p-1.5"
                    />
                    {editFormData.avatar === avatar && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-[#7e4bd0] rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Nickname Field */}
          <div className="space-y-2">
            <label
              htmlFor="nickname"
              className="block text-sm font-semibold text-gray-700"
            >
              نام مستعار
            </label>
            <input
              type="text"
              id="nickname"
              value={editFormData.nickname}
              onChange={(e) =>
                setEditFormData({ ...editFormData, nickname: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0] focus:ring-opacity-20 outline-none transition-all"
              placeholder="نام مستعار خود را وارد کنید"
            />
          </div>

          {/* Phone Number Field */}
          <div className="space-y-2">
            <label
              htmlFor="phone_number"
              className="block text-sm font-semibold text-gray-700"
            >
              شماره موبایل
            </label>
            <input
              type="tel"
              id="phone_number"
              value={editFormData.phone_number}
              onChange={(e) =>
                setEditFormData({ ...editFormData, phone_number: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0] focus:ring-opacity-20 outline-none transition-all"
              placeholder="شماره موبایل خود را وارد کنید"
              dir="ltr"
            />
          </div>

          {/* About Field */}
          <div className="space-y-2">
            <label
              htmlFor="about"
              className="block text-sm font-semibold text-gray-700"
            >
              درباره من
            </label>
            <textarea
              id="about"
              value={editFormData.about}
              onChange={(e) =>
                setEditFormData({ ...editFormData, about: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0] focus:ring-opacity-20 outline-none transition-all resize-none"
              placeholder="درباره خود بنویسید..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCloseEditModal}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              انصراف
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveUserInfo}
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-[#7e4bd0] text-white rounded-xl font-semibold hover:bg-indigo-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "در حال ذخیره..." : "ذخیره"}
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Add Friend Modal */}
      <Modal
        isOpen={isAddFriendModalOpen}
        onClose={handleCloseAddFriendModal}
        title="افزودن دوست"
        maxHeight="90vh"
      >
        <div className="space-y-6" dir="rtl">
          <div className="space-y-2">
            <label
              htmlFor="friend_search"
              className="block text-sm font-semibold text-gray-700"
            >
              نام کاربری
            </label>
            <input
              type="text"
              id="friend_search"
              value={friendSearchInput}
              onChange={(e) => setFriendSearchInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7e4bd0] focus:ring-2 focus:ring-[#7e4bd0] focus:ring-opacity-20 outline-none transition-all"
              placeholder="نام کاربری را وارد کنید"
              dir="ltr"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCloseAddFriendModal}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              انصراف
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddFriend}
              disabled={!friendSearchInput.trim()}
              className="flex-1 px-6 py-3 bg-[#7e4bd0] text-white rounded-xl font-semibold hover:bg-indigo-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              افزودن
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* QR Code Modal */}
      <Modal
        isOpen={isQrCodeModalOpen}
        onClose={handleCloseQrCodeModal}
        title="QR Code پروفایل"
        maxHeight="90vh"
      >
        <div className="space-y-6" dir="rtl">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-gray-600 text-center">
              این QR Code را با دوستان خود به اشتراک بگذارید
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                  userData?.phone_number || userData?.phone || userData?.username || userData?.id || ""
                )}&bgcolor=ffffff&color=7e4bd0`}
                alt="QR Code"
                className="w-64 h-64"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">شماره موبایل یا شناسه شما:</p>
              <p className="text-sm font-semibold text-gray-800">
                {userData?.phone_number || userData?.phone || userData?.username || userData?.id || "-"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCloseQrCodeModal}
              className="flex-1 px-6 py-3 bg-[#7e4bd0] text-white rounded-xl font-semibold hover:bg-indigo-800 transition-all"
            >
              بستن
            </motion.button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserInfo;
