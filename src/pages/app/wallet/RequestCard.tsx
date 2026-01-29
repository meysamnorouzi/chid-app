import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CreditCardIcon,
  ArrowLeftIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

interface CardDesign {
  id: string;
  name: string;
  image: string;
}

const cardDesigns: CardDesign[] = [
  { id: "1", name: "دیجی تینیا", image: "/carts/1.svg" },
  { id: "2", name: "صولتین", image: "/carts/2.svg" },
  { id: "3", name: "چیلی تین", image: "/carts/3.svg" },
  { id: "4", name: "گیرین لند", image: "/carts/4.svg" },
  { id: "5", name: "پیکاتو", image: "/carts/5.svg" },
  { id: "6", name: "آرت تین", image: "/carts/7.svg" },
  { id: "7", name: "انقراض بزرگ", image: "/carts/8.svg" },
  { id: "8", name: "آذرخش", image: "/carts/9.svg" },
  { id: "9", name: "بیکران", image: "/carts/10.svg" },
  { id: "10", name: "گود وایب", image: "/carts/11.svg" },
  { id: "11", name: "آتشین", image: "/carts/c7.svg" },
  { id: "12", name: "شگفت انگیزان", image: "/carts/c8.svg" },
];

// Step types
type Step = "select" | "preview" | "success";

function RequestCard() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("select");
  const [isLoading, setIsLoading] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [dominantColor, setDominantColor] = useState<string>("#7e4bd0");
  const [darkerColor, setDarkerColor] = useState<string>("#8b5cf6");
  const [dominantColorRgba, setDominantColorRgba] = useState<string>("rgba(126, 75, 208, 0.4)");
  const [dominantColorRgbaShadow, setDominantColorRgbaShadow] = useState<string>("rgba(126, 75, 208, 0.3)");

  // Get user name from localStorage or use default
  const userName = "میثم نوروزی"; // Can be loaded from localStorage/context

  // Extract dominant color from image
  const extractDominantColor = (imageUrl: string) => {
    const img = new Image();
    // Only set crossOrigin for non-SVG images
    if (!imageUrl.endsWith('.svg')) {
      img.crossOrigin = "anonymous";
    }
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Sample pixels (every 10th pixel for performance)
      const colorCounts: { [key: string]: number } = {};
      const sampleRate = 10;

      for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Skip transparent pixels
        if (a < 128) continue;

        // Quantize colors to reduce variations
        const quantizedR = Math.floor(r / 32) * 32;
        const quantizedG = Math.floor(g / 32) * 32;
        const quantizedB = Math.floor(b / 32) * 32;

        const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
        colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
      }

      // Find the most common color
      let maxCount = 0;
      let dominantColorKey = "126,75,208"; // Default purple

      for (const [colorKey, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count;
          dominantColorKey = colorKey;
        }
      }

      const [r, g, b] = dominantColorKey.split(",").map(Number);
      
      // Adjust brightness to make it suitable for card background
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      let adjustedR = r;
      let adjustedG = g;
      let adjustedB = b;

      // Darken if too bright, lighten if too dark
      if (brightness > 180) {
        adjustedR = Math.max(0, r * 0.7);
        adjustedG = Math.max(0, g * 0.7);
        adjustedB = Math.max(0, b * 0.7);
      } else if (brightness < 80) {
        adjustedR = Math.min(255, r * 1.3);
        adjustedG = Math.min(255, g * 1.3);
        adjustedB = Math.min(255, b * 1.3);
      }

      const color = `rgb(${Math.round(adjustedR)}, ${Math.round(adjustedG)}, ${Math.round(adjustedB)})`;
      setDominantColor(color);
      
      // Create darker version for gradient
      const darkerR = Math.max(0, adjustedR * 0.7);
      const darkerG = Math.max(0, adjustedG * 0.7);
      const darkerB = Math.max(0, adjustedB * 0.7);
      const darker = `rgb(${Math.round(darkerR)}, ${Math.round(darkerG)}, ${Math.round(darkerB)})`;
      setDarkerColor(darker);
      
      // Create RGBA versions for glow and shadow effects
      setDominantColorRgba(`rgba(${Math.round(adjustedR)}, ${Math.round(adjustedG)}, ${Math.round(adjustedB)}, 0.4)`);
      setDominantColorRgbaShadow(`rgba(${Math.round(adjustedR)}, ${Math.round(adjustedG)}, ${Math.round(adjustedB)}, 0.3)`);
    };

    img.onerror = () => {
      // Fallback to default color if image fails to load
      setDominantColor("#7e4bd0");
      setDarkerColor("#8b5cf6");
      setDominantColorRgba("rgba(126, 75, 208, 0.4)");
      setDominantColorRgbaShadow("rgba(126, 75, 208, 0.3)");
    };

    img.src = imageUrl;
  };

  const getSelectedCardDesign = () => {
    return cardDesigns.find((card) => card.id === selectedCard);
  };

  // Extract dominant color when entering preview step
  useEffect(() => {
    if (currentStep === "preview" && selectedCard) {
      const cardDesign = getSelectedCardDesign();
      if (cardDesign?.image) {
        extractDominantColor(cardDesign.image);
      }
    }
  }, [currentStep, selectedCard]);

  const handleNextStep = () => {
    if (selectedCard) {
      setCurrentStep("preview");
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("select");
    } else {
      navigate(-1);
    }
  };

  const handleFinalSubmit = async () => {
    if (!selectedCard) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save to localStorage
    const cardRequest = {
      cardDesignId: selectedCard,
      requestedAt: Date.now(),
      status: "pending",
    };
    localStorage.setItem("physicalCardRequest", JSON.stringify(cardRequest));
    localStorage.setItem("hasPhysicalCard", "true");

    setIsLoading(false);
    setCurrentStep("success");
  };

  const getHeaderTitle = () => {
    switch (currentStep) {
      case "select":
        return "درخواست کارت خرید";
      case "preview":
        return "پیش‌نمایش کارت";
      case "success":
        return "ثبت درخواست";
    }
  };

  const getHeaderSubtitle = () => {
    switch (currentStep) {
      case "select":
        return "";
      case "preview":
        return "کارت انتخابی خودت رو ببین";
      case "success":
        return "درخواست با موفقیت ثبت شد";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 mx-auto pb-32 md:pb-24 max-w-6xl min-h-screen flex md:items-center">
        {/* Back Button - Top Left */}
        <button
          onClick={handleBack}
          className="fixed top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-50"
        >
          <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
        </button>
        <AnimatePresence mode="wait">
          {/* Step 1: Select Card */}
          {currentStep === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                x: -100,
                scale: 0.8,
                rotateY: -90
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="w-full"
            >
              {/* Card Selection Title */}
              <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
                <h2 className="text-gray-800 font-bold text-lg md:text-xl lg:text-2xl">انتخاب طرح کارت</h2>
                <span className="text-gray-400 text-sm md:text-base lg:text-lg">
                  {cardDesigns.length} طرح
                </span>
              </div>

              {/* Card Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-6">
                {cardDesigns.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCard(card.id)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-3 transition-all hover:scale-105 hover:shadow-lg ${
                      selectedCard === card.id
                        ? "border-[#7e4bd0] ring-2 md:ring-4 ring-[#7e4bd0]/30"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="aspect-[1.6/1] bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <p className="text-sm md:text-base text-center w-full mt-2 md:mt-3 text-black font-medium">{card.name}</p>
                    {selectedCard === card.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 md:top-3 left-2 md:left-3 w-6 h-6 md:w-8 md:h-8 bg-[#7e4bd0] rounded-full flex items-center justify-center shadow-lg"
                      >
                        <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Preview Card */}
          {currentStep === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-12 items-center w-full"
            >
              {/* Card Preview */}
              <div className="w-full md:w-1/2 lg:w-2/5 mb-8 md:mb-0 max-w-2xl md:max-w-none mx-auto">
                <motion.div
                  initial={{ 
                    scale: 0.3, 
                    rotateY: -180,
                    rotateX: 45,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: 1, 
                    rotateY: 0,
                    rotateX: 0,
                    opacity: 1
                  }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                    delay: 0.2
                  }}
                  className="relative"
                  style={{ perspective: "1000px" }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    key={dominantColorRgba}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0, 0.6, 0.3, 0.6, 0.3],
                      scale: [0.8, 1.05, 1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle, ${dominantColorRgba} 0%, transparent 70%)`,
                      filter: "blur(20px)",
                      zIndex: -1
                    }}
                  />
                  
                  {/* Flip Container */}
                  <div
                    className="relative w-full cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                  >
                    {/* Front of Card */}
                    <motion.div 
                      key={dominantColorRgbaShadow}
                      className="relative aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      animate={{
                        boxShadow: [
                          `0 20px 60px ${dominantColorRgbaShadow}`,
                          `0 20px 80px ${dominantColorRgba}`,
                          `0 20px 60px ${dominantColorRgbaShadow}`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <img
                        src={getSelectedCardDesign()?.image}
                        alt="کارت انتخابی"
                        className="w-full h-full object-cover"
                      />

                      {/* Shine Effect */}
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{
                          duration: 1.5,
                          delay: 1.2,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />
                    </motion.div>

                    {/* Back of Card */}
                    <div
                      className="absolute inset-0 aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: `linear-gradient(to bottom right, ${dominantColor}, ${darkerColor})`,
                      }}
                    >
                      {/* Card Pattern Background */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                      </div>

                      {/* Back Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-6 gap-1">
                        {/* Top Section */}
                        <div className="flex items-center justify-between">
                          <div className="text-white/70 text-xs font-medium">
                            CVV
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <p className="text-white text-lg font-bold tracking-widest">
                              123
                            </p>
                          </div>
                        </div>

                        {/* Middle Section - Magnetic Strip */}
                        <div className="h-12 bg-black/30 rounded"></div>

                        {/* Bottom Section */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-white/70 text-xs">شماره کارت</p>
                            <p className="text-white text-sm font-semibold tracking-wider">
                              1234 5678 9012 3456
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white/70 text-xs">تاریخ انقضا</p>
                            <p className="text-white text-sm font-semibold">12/24</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white/70 text-xs">صاحب کارت</p>
                            <p className="text-white text-sm font-semibold">
                              {userName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card Design Name */}
                <motion.p
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.9,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="text-center text-gray-500 text-sm mt-4"
                >
                  {getSelectedCardDesign()?.name}
                </motion.p>

                {/* Flip Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    backgroundColor: dominantColor,
                    boxShadow: `0 4px 12px ${dominantColorRgbaShadow}`
                  }}
                  transition={{ 
                    delay: 1.0,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 180,
                    backgroundColor: darkerColor,
                    boxShadow: `0 6px 20px ${dominantColorRgba}`
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="mt-4 w-12 h-12 mx-auto flex items-center justify-center rounded-full text-white transition-colors"
                >
                  <ArrowsRightLeftIcon className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Card Info and Actions - Right Side on Desktop */}
              <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 1.0,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                  className="w-full bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm"
                >
                  <h3 className="text-gray-800 font-bold mb-4 md:mb-6 text-lg md:text-xl">اطلاعات کارت</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between py-2 md:py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm md:text-base">نام صاحب کارت</span>
                      <span className="text-gray-800 font-semibold text-sm md:text-base">
                        {userName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 md:py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm md:text-base">طرح کارت</span>
                      <span className="text-gray-800 font-semibold text-sm md:text-base">
                        {getSelectedCardDesign()?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 md:py-3">
                      <span className="text-gray-500 text-sm md:text-base">زمان تحویل</span>
                      <span className="text-gray-800 font-semibold text-sm md:text-base">
                        ۳ تا ۵ روز کاری
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Change Card Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    color: dominantColor
                  }}
                  transition={{ 
                    delay: 1.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep("select")}
                  className="mt-4 md:mt-0 text-sm md:text-base font-semibold flex items-center justify-center md:justify-start gap-1 px-4 py-3 rounded-xl border-2 transition-all hover:bg-gray-50"
                  style={{ 
                    borderColor: dominantColor,
                    color: dominantColor
                  }}
                >
                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                  تغییر طرح کارت
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {currentStep === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 w-full"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, bounce: 0.4 }}
                className="mb-6 md:mb-8"
              >
                <img
                  src="/gif/Done2.gif"
                  alt="موفقیت"
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-4"
              >
                درخواست ثبت شد!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-sm md:text-base lg:text-lg text-center mb-4 md:mb-6 max-w-2xl"
              >
                درخواست کارت خرید با طرح «{getSelectedCardDesign()?.name}» ثبت
                شد.
                <br />
                کارت طی ۳ تا ۵ روز کاری به دستت می‌رسه.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          {currentStep === "select" ? (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextStep}
                disabled={!selectedCard}
                className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: "#7e4bd0"
                }}
              >
                <span>ادامه</span>
                <ArrowLeftIcon className="w-5 h-5" />
              </motion.button>
            </>
          ) : currentStep === "preview" ? (
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: darkerColor,
                boxShadow: `0 6px 20px ${dominantColorRgba}`
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinalSubmit}
              disabled={isLoading}
              className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: dominantColor,
                boxShadow: `0 4px 12px ${dominantColorRgbaShadow}`
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>در حال ثبت درخواست...</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>تأیید نهایی و ثبت درخواست</span>
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/wallet-money")}
              className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: "#7e4bd0",
                boxShadow: "0 4px 12px rgba(126, 75, 208, 0.3)"
              }}
            >
              <span>متوجه شدم</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestCard;
