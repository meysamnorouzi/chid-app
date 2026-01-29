import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type FontFamily = "vazir" | "iranyekan";
type ThemeMode = "light" | "dark" | "sepia";

interface TextReaderProps {
  title: string;
  paragraphs: string[];
  onClose: () => void;
}

const FONT_SIZES = [14, 16, 18, 20, 22];
const FONTS: { id: FontFamily; label: string; fontFamily: string }[] = [
  { id: "vazir", label: "وزیر", fontFamily: "'YekanBakh', system-ui, sans-serif" },
  { id: "iranyekan", label: "ایران‌یکان", fontFamily: "'YekanBakh', system-ui, sans-serif" },
];

const THEMES: { id: ThemeMode; label: string; bg: string; text: string }[] = [
  { id: "light", label: "روشن", bg: "bg-white", text: "text-gray-900" },
  { id: "dark", label: "شب", bg: "bg-gray-900", text: "text-gray-100" },
  { id: "sepia", label: "کاهی", bg: "bg-amber-50", text: "text-amber-900" },
];

export default function TextReader({ title, paragraphs, onClose }: TextReaderProps) {
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<FontFamily>("vazir");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [showSettings, setShowSettings] = useState(false);
  const [commentParagraphIndex, setCommentParagraphIndex] = useState<number | null>(null);

  const themeConfig = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  const handleParagraphClick = useCallback((index: number) => {
    setCommentParagraphIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col ${themeConfig.bg} ${themeConfig.text}`}
      dir="rtl"
    >
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between p-4 border-b border-gray-200/50">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-black/5"
          aria-label="بستن"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold truncate flex-1 text-center mx-2">{title}</h1>
        <button
          type="button"
          onClick={() => setShowSettings((s) => !s)}
          className="p-2 rounded-full hover:bg-black/5"
          aria-label="تنظیمات"
        >
          <AdjustmentsHorizontalIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Settings panel: سایز فونت، فونت (Vazir/IranYekan)، حالت شب، کاهی */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-gray-200/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">سایز فونت</p>
                <div className="flex gap-2 flex-wrap">
                  {FONT_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFontSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        fontSize === size
                          ? "bg-[#7e4bd0] text-white"
                          : "bg-gray-200/80 text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">فونت</p>
                <div className="flex gap-2">
                  {FONTS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFontFamily(f.id)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        fontFamily === f.id
                          ? "bg-[#7e4bd0] text-white"
                          : "bg-gray-200/80 text-gray-700"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">حالت نمایش</p>
                <div className="flex gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        theme === t.id
                          ? "bg-[#7e4bd0] text-white"
                          : "bg-gray-200/80 text-gray-700"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content: پاراگراف‌ها — کلیک روی هر پاراگراف → پنل حاشیه‌نویسی */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div
          className="max-w-[65ch] mx-auto"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.8,
            fontFamily: FONTS.find((f) => f.id === fontFamily)?.fontFamily ?? "'YekanBakh', system-ui, sans-serif",
          }}
        >
          {paragraphs.map((text, index) => (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={() => handleParagraphClick(index)}
                className={`w-full text-right py-2 px-1 rounded-lg transition-colors ${
                  commentParagraphIndex === index
                    ? "bg-[#7e4bd0]/20 ring-1 ring-[#7e4bd0]"
                    : "hover:bg-black/5"
                }`}
              >
                {text}
              </button>
              {commentParagraphIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 rounded-xl bg-gray-100 border border-gray-200 flex items-start gap-2"
                >
                  <ChatBubbleLeftIcon className="w-5 h-5 text-[#7e4bd0] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 mb-1">حاشیه‌نویسی (این بخش)</p>
                    <p className="text-sm text-gray-500">نظرات و یادداشت‌ها به زودی.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCommentParagraphIndex(null)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
