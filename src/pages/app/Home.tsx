import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 50, y: 50 });
  
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

  const userData = getUserData();
  const userName = userData?.name || userData?.first_name || "کاربر";
  const userAvatar = userData?.avatar || "/logo/teens profiles/karagah.svg";

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartPosition({ ...position });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = ((e.clientX - startPos.x) / window.innerWidth) * 100;
    const deltaY = ((e.clientY - startPos.y) / window.innerHeight) * 100;
    
    setPosition({
      x: Math.max(0, Math.min(100, startPosition.x - deltaX)),
      y: Math.max(0, Math.min(100, startPosition.y - deltaY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setStartPosition({ ...position });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = ((e.touches[0].clientX - startPos.x) / window.innerWidth) * 100;
    const deltaY = ((e.touches[0].clientY - startPos.y) / window.innerHeight) * 100;
    
    setPosition({
      x: Math.max(0, Math.min(100, startPosition.x - deltaX)),
      y: Math.max(0, Math.min(100, startPosition.y - deltaY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUpGlobal);
    window.addEventListener("touchend", handleMouseUpGlobal);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal);
      window.removeEventListener("touchend", handleMouseUpGlobal);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-0 flex flex-col overflow-hidden relative">
      {/* Header with Profile and Notification */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-white/95 to-transparent backdrop-blur-sm"
      >
        <div className="flex items-center justify-between p-4">
          {/* User Profile Section */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer"
              onClick={() => navigate('/user-info')}
            >
              <img
                src={userAvatar.startsWith('/') ? userAvatar : `/logo/teens profiles/${userAvatar}`}
                className="w-12 h-12 object-cover border-2 border-[#7e4bd0] object-top rounded-full shadow-md"
                alt="پروفایل کاربر"
              />
              <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0.5 right-0.5 border-2 border-white shadow-sm"></div>
            </motion.div>
            <div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-bold text-gray-800"
              >
                محمد مهرابی
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-600"
              >
                @mohammad-mehrabi
              </motion.p>
            </div>
          </div>

          {/* Notification Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative cursor-pointer"
            onClick={() => navigate('/messages')}
          >
            <div className="p-2.5 border-2 border-[#7e4bd0] rounded-full bg-white shadow-md hover:bg-purple-50 transition-colors">
              <img 
                src="/icons/noti.svg" 
                className="w-6 h-6" 
                alt="اعلان‌ها" 
              />
            </div>
            {/* Notification Badge - Optional */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-[10px] font-bold text-white">3</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Map Background - fills remaining space */}
      <div
        className="flex-1 min-h-0 w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          backgroundImage: "url('/svg/map.svg')",
          backgroundSize: "cover",
          backgroundPosition: `${position.x}% ${position.y}%`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

export default Home;

