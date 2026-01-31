import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import AuthInput from "../../../components/shared/AuthInput";

function InviteParent() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const validatePhoneNumber = (phone: string): boolean => {
    // Iranian phone number validation (09xxxxxxxxx)
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "");
    // Limit to 11 digits
    return digits.slice(0, 11);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError("");
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("لطفاًتره موبایل معتبر وارد کنید (مثال: 09123456789)");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save to localStorage
    const inviteData = {
      phoneNumber,
      invitedAt: Date.now(),
      status: "pending",
    };
    localStorage.setItem("parentInvitation", JSON.stringify(inviteData));

    setIsLoading(false);
    setShowSuccess(true);

    // Redirect after showing success message
    setTimeout(() => {
      navigate("/wallet-money");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-[#7e4bd0] text-white px-4 md:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-2 max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold">دعوت والد</h1>
        </div>
        <p className="text-white/70 text-sm md:text-base mr-13 max-w-4xl mx-auto">
          والدینت رو به اپلیکیشن دعوت کن
        </p>
      </div>

      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Info Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 md:p-6 mb-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7e4bd0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserPlusIcon className="w-5 h-5 md:w-6 md:h-6 text-[#7e4bd0]" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-sm md:text-base mb-1">
                      چرا والدین رو دعوت کنم؟
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm leading-5">
                      با دعوت والدین، اونها می‌تونن حسابت رو شارژ کنن، هدیه بفرستن و فعالیت‌های مالیت رو مدیریت کنن.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Input */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                <AuthInput
                  id="phoneNumber"
                  label="شماره موبایل پدر یا مادر"
                  type="tel"
                  value={phoneNumber}
                  onChange={(value) => {
                    const formatted = formatPhoneNumber(value);
                    setPhoneNumber(formatted);
                    setError("");
                  }}
                  placeholder="09123456789"
                  error={error}
                  isNumberOrLink={true}
                  required
                />
                <p className="text-gray-400 text-xs mt-2">
                  یک پیامک دعوت برای این شماره ارسال می‌شود
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || phoneNumber.length < 11}
                className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-[ad80f4] border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98]"
              >
                {isLoading ? 'در حال ارسال...' : 'ارسال دعوت‌نامه'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircleIcon className="w-14 h-14 text-green-500" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-gray-800 mb-2"
              >
                دعوت‌نامه ارسال شد!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-sm text-center mb-4"
              >
                پیامک دعوت بهتره {phoneNumber} ارسال شد.
                <br />
                منتظر تأیید والدین باشید.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-gray-400 text-sm"
              >
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#7e4bd0] rounded-full animate-spin"></div>
                <span>در حال انتقال به کیف پول...</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default InviteParent;
