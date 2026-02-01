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
import { FaStar, FaTrophy, FaCrown, FaGraduationCap } from "react-icons/fa";

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
  icon: string;
  count: number;
}

interface Package {
  id: string;
  digits: number;
  price: number;
  label: string;
  giftIcon: string;
  gradient: string;
  popular?: boolean;
  bonus?: number;
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
      name: "مهر ماه", 
      icon: SparklesIcon, 
      gradient: "from-blue-400 to-cyan-300",
      bgColor: "bg-gradient-to-br",
      iconColor: "text-white"
    },
  ];

  const allAchievements: Achievement[] = [
    { 
      id: "1", 
      name: "کرم کتاب", 
      icon: "/image/Profile achivments (1).png", 
      count: 300 
    },
    { 
      id: "2", 
      name: "تیزگوش", 
      icon: "/image/Profile achivments (2).png", 
      count: 10 
    },
    { 
      id: "3", 
      name: "دیجی تینی", 
      icon: "/image/Profile achivments (3).png", 
      count: 100 
    },  { 
      id: "4", 
      name: "دیجی تینی", 
      icon: "/image/Profile achivments (4).png", 
      count: 100 
    },  { 
      id: "5", 
      name: "دیجی تینی", 
      icon: "/image/Profile achivments (5).png", 
      count: 100 
    },    { 
      id: "6", 
      name: "دیجی تینی", 
      icon: "/image/Profile achivments (6).png", 
      count: 100 
    },    { 
      id: "7", 
      name: "دیجی تینی", 
      icon: "/image/Profile achivments (7).png", 
      count: 100 
    },    
    { 
      id: "8", 
      name: "دیجی تینی", 
      icon: "/image/Profile achivments (8).png", 
      count: 100 
    },      
  ];
  // Only show کرم کتاب and تیزگوش for now - hide others
  const achievements = allAchievements.filter((a) => 
    a.name === "کرم کتاب" || a.name === "تیزگوش"
  );

  const packages: Package[] = [
    { id: "1", digits: 100, price: 25000, label: "پکیج کوچک", giftIcon: "/iconGift/IMG_5447.PNG", gradient: "from-blue-50 to-blue-100" },
    { id: "2", digits: 200, price: 50000, label: "پکیج متوسط", giftIcon: "/iconGift/IMG_5448.PNG", gradient: "from-green-50 to-green-100" },
    { id: "3", digits: 300, price: 75000, label: "پکیج بزرگ", popular: true, giftIcon: "/iconGift/IMG_5449.PNG", gradient: "from-purple-50 to-purple-100" },
    { id: "4", digits: 400, price: 100000, label: "پکیج ویژه", giftIcon: "/iconGift/IMG_5450.PNG", gradient: "from-pink-50 to-pink-100" },
    { id: "5", digits: 1000, price: 250000, label: "پکیج طلایی", giftIcon: "/iconGift/IMG_5451.PNG", gradient: "from-yellow-50 to-yellow-100", bonus: 100 },
    { id: "6", digits: 2000, price: 500000, label: "پکیج الماس", giftIcon: "/iconGift/IMG_5452.PNG", gradient: "from-indigo-50 to-indigo-100", bonus: 100 },
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
  
  // Format join date in Persian with day, month, and year
  const formatJoinDate = (): string => {
    if (!userData?.created_at) {
      // Default to current date if no date is available
      const date = new Date();
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    }
    const date = new Date(userData.created_at);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  const joinDate = formatJoinDate();

  // Sample stats
  const stats = {
    courses: 7,
    following: 32,
    followers: 48,
    streak: 1,
    league: "Emerald",
    xp: 65638,
    topFinishes: 10,
    level: 15,
    record: 265,
    monthlyTitle: "تیزگوش برتر",
    digit: 100000,
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
            <span className="text-gray-500 text-sm">دیجی تینی از {joinDate}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenAddFriendModal}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors border border-gray-200"
          >
            <UserPlusIcon className="w-6 h-6 text-gray-800" />
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

        {/* Asset Shelf Section */}
        <div className="mb-6">
          <h2 className="text-gray-800 text-lg font-bold mb-4">طاقچه دارایی‌ها</h2>
          <div className="grid grid-cols-3 gap-3">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className={`relative bg-gradient-to-br ${pkg.gradient} rounded-2xl p-3 border-2 border-white shadow-md cursor-pointer group overflow-hidden`}
              >
                <div className="flex flex-col items-center">
                  <img 
                    src={pkg.giftIcon} 
                    alt={pkg.label}
                    className="w-16 h-16 object-contain mb-2 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-gray-800 text-xs font-semibold text-center">{pkg.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-6">
          <h2 className="text-gray-800 text-lg font-bold mb-4">وضعیت</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center border-l border-gray-200">
                <span className="text-2xl font-bold text-gray-800">{stats.following}</span>
                <img src={lineIconPaths.book} className="w-5 h-5 mt-1" alt="کتاب" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{stats.followers}</span>
                <img src={lineIconPaths.podcast} className="w-5 h-5 mt-1" alt="پادکست" />
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mb-6">
          <h2 className="text-gray-800 text-lg font-bold mb-4">خلاصه</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Level */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex flex-col items-center">
                <FaStar className="w-6 h-6 text-yellow-500 mb-2" />
                <span className="text-gray-600 text-sm mb-1">سطح</span>
                <span className="text-2xl font-bold text-gray-800">
                  {new Intl.NumberFormat("fa-IR").format(stats.level)}
                </span>
              </div>
            </motion.div>

            {/* Record */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex flex-col items-center">
                <FaTrophy className="w-6 h-6 text-orange-500 mb-2" />
                <span className="text-gray-600 text-sm mb-1">رکورد</span>
                <span className="text-2xl font-bold text-gray-800">
                  {new Intl.NumberFormat("fa-IR").format(stats.record)} روز
                </span>
              </div>
            </motion.div>

            {/* Monthly Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex flex-col items-center">
                <FaCrown className="w-6 h-6 text-purple-500 mb-2" />
                <span className="text-gray-600 text-sm mb-1">لقب ماه</span>
                <span className="text-lg font-bold text-gray-800 text-center">
                  {stats.monthlyTitle}
                </span>
              </div>
            </motion.div>

            {/* Digit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex flex-col items-center">
                <img src={lineIconPaths.digit} className="w-6 h-6 mb-2" alt="دیجیت" />
                <span className="text-gray-600 text-sm mb-1">دیجیت</span>
                <span className="text-2xl font-bold text-gray-800">
                  {new Intl.NumberFormat("fa-IR").format(stats.digit)}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Monthly Badges Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800 text-lg font-bold">دستاوردهای  ماه</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center justify-start">
            {monthlyBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex flex-col items-center"
                >
                  <div className={`relative w-24 h-24 ${badge.bgColor} ${badge.gradient} rounded-2xl flex items-center justify-center border-2 border-white shadow-lg group cursor-pointer overflow-hidden mb-3`}>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                    <IconComponent className={`w-12 h-12 ${badge.iconColor} relative z-10`} />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">{badge.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800 text-lg font-bold">مدال‌های من</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex flex-col items-center"
                >
                  <img src={achievement.icon} alt="" className="w-full aspect-[1/1] rounded-2xl" />
                  <span className="text-gray-800 text-sm font-semibold mt-2">{achievement.name}</span>
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
