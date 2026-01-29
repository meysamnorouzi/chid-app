import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Password = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (phone: string): boolean => {
    // Iranian phone number validation (09xxxxxxxxx)
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 11 digits
    return digits.slice(0, 11);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError('لطفاً شماره موبایل والد را وارد کنید');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('لطفاً شماره موبایل معتبر وارد کنید (مثال: 09123456789)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // await apiClient.post('/auth/forgot-password', { phoneNumber });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to success page
      navigate('/password-not');
    } catch (err) {
      setError('خطا در ارسال لینک بازیابی. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen md:justify-center md:items-center md:bg-gray-50">
      <div className="w-full flex flex-col md:max-w-md md:bg-white md:rounded-2xl md:shadow-lg md:overflow-hidden">
        <div className="w-full flex justify-center items-center bg-[#7e4bd0] p-12 min-h-[300px] rounded-b-3xl md:min-h-[200px] md:rounded-t-2xl md:rounded-b-none">
          <img
            src="/gif/Password.gif"
            alt=""
            className="w-52"
          />
        </div>
        <div className="flex flex-col w-full items-center justify-start flex-1 pt-10 p-4 md:pt-0 md:p-8">
          <div className="w-full mb-8 md:mb-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {error && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <div className="space-y-2 w-full">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                شماره موبایل والد
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  error
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300'
                } outline-none transition-all`}
                placeholder=" شماره موبایل والد ..."
                dir="rtl"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
            >
              {isLoading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full border border-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-[#7e4bd0] font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
            >
              بازگشت به صفحه ورود
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
