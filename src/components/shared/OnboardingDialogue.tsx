import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ONBOARDING_TEXTS: Record<string, string> = {
  "first-welcome": `به شهر دیجی‌تین خوش اومدی
اینجا فقط یه اپ نیست؛
یه شهره که توش می‌تونی
بگردی، انتخاب کنی و کم‌کم پیشرفت کنی.

من کنارتم که توی شهر گم نشی`,
  "wallet-shape": `اینجا مرکز فرماندهی پولته
می‌تونی ببینی چقدر داری،
کِی خرج کردی
و همه‌چی رو تحت کنترل داشته باشی.

با کارت خرید مخصوص خودت،
هم حضوری هم آنلاین خرید کن
سریع، راحت و همیشه در دسترس.

بعدش همه‌چی دست خودته`,
  "shop-shape": `فروشگاه بازه!
اینجا جاییه که چیزای باحال مخصوص تو جمع شده.
می‌تونی بگردی، انتخاب کنی و هر چی خوشت اومد سفارش بدی
و راحت تحویلش بگیری.

این فروشگاه برای وقتاییه که دنبال یه چیز جدیدی،
یا فقط دلت می‌خواد یه چرخی بزنی و چیزای جذاب ببینی

یه سر بزن،
شاید همون چیزی که دنبالش هستی اینجاست!`,
  "cafe-shape": `این کافه شهر دیجی‌تینه
جایی برای آشنا شدن،
دوست پیدا کردن
و در ارتباط موندن.

دوستاتو دعوت کن
و جمع خودتو بساز`,
  "profile-shape": `پروفایل
اینجا جاییه که مسیرت دیده می‌شه.
هر کاری که توی شهر دیجی‌تین انجام دادی،
هر قدمی که جلو اومدی،
و هر لِوِلی که رد کردی،
اینجا جمع شده.

این صفحه فقط عدد نیست؛
داستانِ پیشرفت توئه`,
  "saving-shape": `اینجا جاییه برای پس اندازهات!
پولاتو برای روز مبادا یا خریدای بزرگ جمع کن!
موجودی پس‌اندازت رو از خرج‌های روزانه جدا کن تا جاش امن باشه.`,
  "onboarding-only-shape": `اینجا دیجی پلیه!
بازی‌ها منتظرتن... از بازی‌های فکری تا هیجان‌انگیز و بامزه؛ برای هر سلیقه‌ای یه بازی جذاب داریم.`,
  "cinema-onboarding-shape": `به سینمای اختصاصی دیجی‌تین خوش اومدی.
اینجا ردیف اول همیشه مال توئه.
هر چی که برای دیدن لازم داری، از انیمیشن‌های جدید تا سریال‌های ترند، همه رو توی سینمای دیجی‌تین پیدا می‌کنی.`,
  "smartinez-onboarding-shape": `به دنیای اسمارتینز خوش اومدی!
اینجا پاتوق هوشمندهای دیجی‌تینه؛
جایی که با محتوای اختصاصی،
اطلاعاتت رو در مورد دنیای دیجیتال و مالی به‌روز می‌کنی. راستی اینجا معدن دیجیته! استخراجش کن.`,
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
    if (path) navigate(path);
  };

  const isOnboardingOnly = !path;

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
            animate={{ opacity: 1 }}
            onClick={handleGo}
            className="mt-4 w-full py-3 px-4 rounded-xl bg-[#7e4bd0] text-white font-bold text-base shadow-lg hover:bg-[#6a3fb8] transition-all active:scale-[0.98]"
          >
            {isOnboardingOnly ? "متوجه شدم" : `برو به ${label}`}
          </motion.button>
          <button
            onClick={onClose}
            className="mt-2 w-full py-1.5 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            {isOnboardingOnly ? "رد کردن" : "بعداً"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
