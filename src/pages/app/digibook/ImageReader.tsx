import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

/**
 * ریدر تصویری (Manga/Comic): اسکرول عمودی (Long-strip) متناسب با موبایل.
 * لود تصاویر با loading="lazy" برای پایداری در اینترنت ضعیف.
 * (WebP و Lazy Loading per spec — we use native lazy + img; WebP can be added via picture/source later.)
 */
interface ImageReaderProps {
  title: string;
  imageUrls: string[];
  onClose: () => void;
}

export default function ImageReader({ title, imageUrls, onClose }: ImageReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col bg-black" dir="rtl">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between p-4 bg-black/80 text-white border-b border-white/10">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10"
          aria-label="بستن"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold truncate flex-1 text-center mx-2">{title}</h1>
        <div className="w-10" />
      </div>

      {/* Long-strip: اسکرول عمودی، لود تنبل */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div className="flex flex-col items-center w-full max-w-full">
          {imageUrls.map((url, index) => (
            <motion.figure
              key={`${url}-${index}`}
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "100px" }}
              className="w-full block"
            >
              <img
                src={url}
                alt={`صفحه ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain max-w-full block"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </div>
  );
}
