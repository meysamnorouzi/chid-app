import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ONBOARDING_TEXTS: Record<string, string> = {
  "wallet-shape": `اینجا کیف پول دیجیته!
می‌تونی دیجیت‌ها رو ببینی، شارژ کنی و از والدین درخواست کارت بدی.
همه تراکنش‌ها و هدایات اینجاست.
یه نگاه بنداز، حتماً بدردت می‌خوره!`,
  "shop-shape": `اینجا فروشگاه چیدیم!
می‌تونی با دیجیت کالا بگیری، سفارش بدی و تحویل بگیری.
از بازی و کتاب تا وسایل مدرسه، همه اینجاست!
برو گشت بزن، کلی چیز قشنگ پیدا می‌کنی!`,
};

const TYPEWRITER_DELAY_MS = 45;

export function OnboardingDialogue({
  hotspotId,
  path,
  label,
  onClose,
}: {
  hotspotId: string;
  path: string;
  label: string;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const fullText = ONBOARDING_TEXTS[hotspotId] ?? "";
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!fullText) {
      setIsComplete(true);
      return;
    }
    setDisplayedText("");
    setIsComplete(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, TYPEWRITER_DELAY_MS);
    return () => clearInterval(timer);
  }, [hotspotId, fullText]);

  const handleGo = () => {
    onClose();
    navigate(path);
  };

  if (!fullText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-32 left-28 right-16 z-[45] mx-auto max-w-sm"
    >
      <div
        className="relative rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/80 overflow-hidden"
        dir="rtl"
      >
        {/* Speech bubble tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-gray-200/80 rounded-sm" />
        <div className="relative p-5 pt-6">
          <p className="text-gray-800 text-[15px] leading-[1.9] min-h-[4.5em] whitespace-pre-wrap font-medium">
            {displayedText}
            {!isComplete && (
              <span className="inline-block w-0.5 h-4 bg-[#7e4bd0] ml-0.5 animate-pulse align-middle" />
            )}
          </p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isComplete ? 1 : 0.5 }}
            transition={{ delay: isComplete ? 0 : 0 }}
            disabled={!isComplete}
            onClick={handleGo}
            className="mt-4 w-full py-3 px-4 rounded-xl bg-[#7e4bd0] text-white font-bold text-base shadow-lg hover:bg-[#6a3fb8] disabled:cursor-not-allowed disabled:opacity-70 transition-all active:scale-[0.98]"
          >
            برو به {label}
          </motion.button>
          <button
            onClick={onClose}
            className="mt-2 w-full py-1.5 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            بعداً
          </button>
        </div>
      </div>
    </motion.div>
  );
}
