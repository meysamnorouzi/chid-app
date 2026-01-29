import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import WalletHeader from "../../../components/shared/Wallet/WalletHeader";
import {
  getBookById,
  getCategoryName,
  getOfflineBookIds,
  setBookOffline,
  isBookOffline,
} from "./data";
import { useState, useEffect } from "react";

export default function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [offlineIds, setOfflineIds] = useState<string[]>(() => getOfflineBookIds());

  const book = bookId ? getBookById(bookId) : null;
  const isOffline = bookId ? isBookOffline(bookId) : false;

  useEffect(() => {
    setOfflineIds(getOfflineBookIds());
  }, [bookId]);

  const handleSaveOffline = () => {
    if (!bookId) return;
    setBookOffline(bookId, !isOffline);
    setOfflineIds(getOfflineBookIds());
  };

  const handlePartClick = (partId: string) => {
    if (!bookId) return;
    navigate(`/digibook/${bookId}/part/${partId}`);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-white flex flex-col pb-24" dir="rtl">
        <WalletHeader subtitle="دیجی بوک" />
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-gray-500">کتاب یافت نشد.</p>
          <button
            type="button"
            onClick={() => navigate("/digibook")}
            className="mt-4 text-[#7e4bd0] font-semibold"
          >
            بازگشت به دیجی بوک
          </button>
        </div>
      </div>
    );
  }

  const categoryName = getCategoryName(book.categoryId);

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24" dir="rtl">
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader subtitle="شناسنامه کتاب" />
      </div>

      <div className="px-4 flex-1 overflow-y-auto">
        {/* Cover + title (Aspect Ratio 2:3 for cover per spec) */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 pb-6"
        >
          <div className="flex gap-4">
            <div className="w-28 shrink-0 aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h1>
              <p className="text-sm text-gray-600 mb-2">{book.author}</p>
              <p className="text-xs text-gray-500">{categoryName}</p>
              {book.tags && book.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Summary */}
        {book.summary && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="pb-6"
          >
            <h2 className="text-sm font-bold text-gray-800 mb-2">خلاصه داستان</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{book.summary}</p>
          </motion.section>
        )}

        {/* ذخیره آفلاین — دکمه در صفحه شناسنامه کتاب (per spec) */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pb-6"
        >
          <button
            type="button"
            onClick={handleSaveOffline}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              isOffline
                ? "bg-gray-200 text-gray-600"
                : "bg-[#7e4bd0] text-white hover:bg-[#6a3fb8]"
            }`}
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            {isOffline ? "ذخیره شده آفلاین" : "ذخیره آفلاین"}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {isOffline
              ? "فایل‌های متنی و تصاویر در دستگاه ذخیره شده‌اند."
              : "برای خواندن بدون اینترنت، ذخیره آفلاین کنید."}
          </p>
        </motion.section>

        {/* List of parts — کلیک روی پارت → ریدر */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-sm font-bold text-gray-800 mb-3">پارت‌ها</h2>
          <div className="space-y-2">
            {book.parts.map((part) => (
              <button
                key={part.id}
                type="button"
                onClick={() => handlePartClick(part.id)}
                className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-right"
              >
                <span className="font-medium text-gray-800">{part.title}</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400 shrink-0" />
              </button>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
