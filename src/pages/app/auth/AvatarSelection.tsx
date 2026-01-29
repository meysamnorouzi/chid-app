import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const AvatarSelection = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatarList[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // محاسبه زاویه از مرکز به نقطه کلیک/لمس
  const getAngleFromCenter = (clientX: number, clientY: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    return Math.atan2(deltaY, deltaX);
  };

  // شروع drag
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    const angle = getAngleFromCenter(clientX, clientY);
    setStartAngle(angle);
    setStartRotation(rotationAngle);
  };

  // در حال drag
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const currentAngle = getAngleFromCenter(clientX, clientY);
    const deltaAngle = currentAngle - startAngle;
    const newRotation = startRotation + deltaAngle;
    setRotationAngle(newRotation);
    
    // محاسبه آواتار انتخاب شده بر اساس زاویه
    const normalizedAngle = ((newRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const index = Math.round((normalizedAngle / (2 * Math.PI)) * avatarList.length) % avatarList.length;
    setSelectedAvatar(avatarList[index]);
  };

  // پایان drag
  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // اضافه کردن event listeners برای mouse events در سطح window
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
      };
      const handleGlobalMouseUp = () => {
        handleEnd();
      };

      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, startAngle, startRotation]);

  const handleContinue = () => {
    if (selectedAvatar) {
      // TODO: Save selected avatar to user profile via API
      // For now, just navigate to home
      navigate('/');
    }
  };

  // محاسبه موقعیت آواتارها در دایره با در نظر گیری چرخش
  const getCircularPosition = (index: number, total: number, radius: number) => {
    // محاسبه زاویه برای هر آواتار (شروع از بالا) + چرخش
    const baseAngle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const angle = baseAngle + rotationAngle;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Circular Avatar Selector */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden py-8 px-4">
        <div 
          ref={containerRef}
          className="relative w-full max-w-2xl aspect-square touch-none select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Center Avatar - Large */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-30" />
              
              {/* Avatar Circle */}
              <div className="relative w-full h-full rounded-full border-4 border-purple-600 shadow-2xl shadow-purple-300/50 bg-white  overflow-hidden">
                <img
                  src={`/logo/teens profiles/${selectedAvatar}`}
                  alt={selectedAvatar.replace('.svg', '')}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Selection Indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Circular Avatars - Rotating Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            {avatarList.map((avatar, index) => {
              // محاسبه موقعیت در دایره با در نظر گیری چرخش
              const radius = 180; // فاصله از مرکز (پیکسل)
              const position = getCircularPosition(index, avatarList.length, radius);
              
              return (
                <div
                  key={`${avatar}-${index}`}
                  className="absolute w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gray-200 bg-white  shadow-lg overflow-hidden pointer-events-none"
                  style={{
                    left: `calc(50% + ${position.x}px)`,
                    top: `calc(50% + ${position.y}px)`,
                    transition: isDragging ? 'none' : 'all 0.1s ease-out',
                  }}
                >
                  <img
                    src={`/logo/teens profiles/${avatar}`}
                    alt={avatar.replace('.svg', '')}
                    className="w-full h-full object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Continue Button - Fixed Bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl font-bold text-lg bg-[#7e4bd0] hover:bg-purple-700 text-white shadow-xl shadow-purple-300/50 hover:shadow-2xl hover:shadow-purple-400/50 transition-all active:scale-[0.98]"
          >
            ادامه
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelection;

