import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { WalletHeader } from "../../../components/shared/Wallet";

const TEEN_AVATARS_BASE = "/logo/teens%20profiles";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  invitedAt: string;
}

interface UserProfile {
  username: string;
  name: string;
  avatar: string;
  bio?: string;
}

interface FriendRequest {
  id: string;
  fromUsername: string;
  fromName: string;
  avatar: string;
  sentAt: string;
}

// Invited friends – use teen profile avatars
const invitedFriends: Friend[] = [
  {
    id: "1",
    name: "محمد",
    avatar: `${TEEN_AVATARS_BASE}/arnold.svg`,
    invitedAt: "2026-01-20",
  },
  {
    id: "2",
    name: "سارا",
    avatar: `${TEEN_AVATARS_BASE}/elphy.svg`,
    invitedAt: "2026-01-21",
  },
  {
    id: "3",
    name: "علی",
    avatar: `${TEEN_AVATARS_BASE}/darkoob.svg`,
    invitedAt: "2026-01-22",
  },
];

// Friend requests (incoming) – 2 requests with accept/reject
const initialFriendRequests: FriendRequest[] = [
  {
    id: "req1",
    fromUsername: "reza_teen",
    fromName: "رضا",
    avatar: `${TEEN_AVATARS_BASE}/dep.svg`,
    sentAt: "2026-01-27",
  },
  {
    id: "req2",
    fromUsername: "zahra_digi",
    fromName: "زهرا",
    avatar: `${TEEN_AVATARS_BASE}/rabi.svg`,
    sentAt: "2026-01-28",
  },
];

// Searchable users – data to find friends by username (teen profile avatars)
const searchableUsers: UserProfile[] = [
  { username: "ali_digi", name: "علی", avatar: `${TEEN_AVATARS_BASE}/batman.svg`, bio: "علاقه‌مند به بازی" },
  { username: "sara_teen", name: "سارا", avatar: `${TEEN_AVATARS_BASE}/ferzi.svg`, bio: "دوستان جدید" },
  { username: "mamad", name: "ممد", avatar: `${TEEN_AVATARS_BASE}/hero.svg`, bio: "دیجیت نوجوان" },
  { username: "reza_teen", name: "رضا", avatar: `${TEEN_AVATARS_BASE}/dep.svg` },
  { username: "zahra_digi", name: "زهرا", avatar: `${TEEN_AVATARS_BASE}/rabi.svg` },
  { username: "parsa", name: "پارسا", avatar: `${TEEN_AVATARS_BASE}/naroto.svg` },
  { username: "narges", name: "نرگس", avatar: `${TEEN_AVATARS_BASE}/skull.svg` },
  { username: "amir_digi", name: "امیر", avatar: `${TEEN_AVATARS_BASE}/wiking.svg` },
  { username: "dorsa", name: "درسا", avatar: `${TEEN_AVATARS_BASE}/cap.svg` },
  { username: "sina_teen", name: "سینا", avatar: `${TEEN_AVATARS_BASE}/kachal.svg` },
];

function findUserByUsername(query: string): UserProfile | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    searchableUsers.find(
      (u) =>
        u.username.toLowerCase() === q ||
        u.username.toLowerCase().includes(q) ||
        u.name === query.trim()
    ) ?? null
  );
}

const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProfile, setSearchedProfile] = useState<UserProfile | null>(null);
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(initialFriendRequests);

  useEffect(() => {
    setFriends(invitedFriends);
  }, []);

  const handleSearchUser = () => {
    if (!searchQuery.trim()) {
      setSearchError("لطفاً نام کاربری را وارد کنید");
      setSearchedProfile(null);
      return;
    }

    setIsSearching(true);
    setSearchError("");

    setTimeout(() => {
      const profile = findUserByUsername(searchQuery);
      if (profile) {
        setSearchedProfile(profile);
        setSearchError("");
      } else {
        setSearchedProfile(null);
        setSearchError("کاربری با این نام کاربری یافت نشد");
      }
      setIsSearching(false);
    }, 300);
  };

  const handleInviteFriend = (username: string) => {
    alert(`دعوتنامه برای ${username} ارسال شد!`);
    setSearchQuery("");
    setSearchedProfile(null);
    setSearchError("");
  };

  const handleAcceptRequest = (id: string) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== id));
    // Could add to friends list here
  };

  const handleRejectRequest = (id: string) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32 overflow-hidden">
      {/* Fixed header - stays on top when scrolling */}
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader subtitle="@mohammad-mehrabi" />
      </div>

      <div className="px-4 flex-1 overflow-y-auto min-h-0">
        {/* Invite Friend Banner */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-4 flex items-center justify-between gap-4 p-6 rounded-2xl bg-[#F9A307] relative"
        >
          <div className="flex flex-col w-[60%]">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="font-bold text-[20px] text-black"
            >
              دوستاتو دعوت کن ، دیجیت بگیر
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-semibold text-lg text-black"
            >
              کد دعوت تو = نام کاربری
            </motion.p>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            src="/icons/invite-friend/invite-friend.svg"
            alt="Invite Friend"
            className="w-[37%] flex-shrink-0 absolute bottom-0 left-3"
          />
        </motion.div>

        {/* Search User Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mt-4 space-y-2"
        >
          <label
            htmlFor="username-search"
            className="block text-lg font-semibold text-gray-700 mt-6 mb-4"
          >
            جستجوی کاربر برای دعوت
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username-search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchedProfile(null);
                  setSearchError("");
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSearchUser();
                }}
                className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-[#F9A307] focus:ring-2 focus:ring-[#F9A307] focus:ring-opacity-20 outline-none transition-all text-right"
                placeholder="نام کاربری را وارد کنید (مثلاً ali_digi، sara_teen)"
                disabled={isSearching}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSearchUser}
              disabled={isSearching}
              className="px-6 py-3 bg-[#F9A307] text-white rounded-xl font-semibold hover:bg-[#e89406] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? "..." : "جستجو"}
            </motion.button>
          </div>
          {searchError && (
            <p className="text-red-600 text-xs mt-1">{searchError}</p>
          )}
        </motion.div>

        {/* Searched User Profile */}
        {searchedProfile && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-4 bg-gray-50  rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={searchedProfile.avatar}
                  alt={searchedProfile.name}
                  className="w-12 h-12 rounded-full object-cover bg-gray-100 ring-2 ring-gray-200 border-2 border-white shadow-sm"
                />
                <div className="text-right">
                  <p className="font-semibold">{searchedProfile.name}</p>
                  <p className="text-sm text-gray-500" dir="rtl">
                    @{searchedProfile.username}
                  </p>
                  {searchedProfile.bio && (
                    <p className="text-xs text-gray-400 mt-1">
                      {searchedProfile.bio}
                    </p>
                  )}
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleInviteFriend(searchedProfile.username)}
                className="px-4 py-2 bg-[#F9A307] text-white rounded-lg font-semibold text-sm hover:bg-[#e89406] transition-all"
              >
                دعوت
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Friend Requests Section */}
        {friendRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="mt-6 p-4 rounded-2xl bg-gray-50/50 "
          >
            <h2 className="font-bold text-lg mb-3 text-gray-700">درخواست دوستی</h2>
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {friendRequests.map((req, index) => (
                  <motion.div
                    key={req.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.25 + index * 0.06,
                      ease: "easeOut",
                    }}
                    className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm"
                  >
                  <div className="flex items-center gap-3">
                    <img
                      src={req.avatar}
                      alt={req.fromName}
                      className="w-12 h-12 rounded-full object-cover bg-white ring-2 ring-gray-200 border-2 border-white shadow-sm"
                    />
                    <div className="text-right flex-1">
                      <p className="font-semibold">{req.fromName}</p>
                      <p className="text-xs text-gray-500" dir="rtl">
                        @{req.fromUsername}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {req.sentAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAcceptRequest(req.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      title="قبول"
                    >
                      <CheckIcon className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-xs font-medium">قبول</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleRejectRequest(req.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors"
                      title="رد"
                    >
                      <XMarkIcon className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-xs font-medium">رد</span>
                    </motion.button>
                  </div>
                </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Invited Friends List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
          className="mt-6 p-4 rounded-2xl  bg-white  flex flex-col gap-3"
        >
          <h2 className="font-bold text-lg mb-2 text-gray-700">دوستان دعوت‌شده</h2>
          {friends.length === 0 ? (
            <p className="text-sm text-gray-500">
              هنوز دوستی دعوت نکرده‌اید
            </p>
          ) : (
            friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.35 + index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl bg-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100 ring-2 ring-gray-200 border-2 border-white shadow-sm"
                  />
                  <div className="text-right">
                    <p className="font-semibold">{friend.name}</p>
                    <p className="text-xs text-gray-500">
                      دعوت شده: {friend.invitedAt}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-green-600">
                  قبول کرد
                </span>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Friends;
