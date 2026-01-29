import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    referrerUsername: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateUsername = (username: string): boolean => {
    // فقط حروف انگلیسی و اعداد
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username) && username.length >= 3 && username.length <= 20;
  };

  const validatePassword = (password: string): boolean => {
    // حداقل 6 کاراکتر
    return password.length >= 6;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // پاک کردن خطای مربوط به فیلد هنگام تایپ
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // اعتبارسنجی نام کاربری
    if (!formData.username.trim()) {
      newErrors.username = 'لطفاً نام کاربری را وارد کنید';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'نام کاربری باید فقط شامل حروف و اعداد انگلیسی باشد (3 تا 20 کاراکتر)';
    }

    // اعتبارسنجی نام مستعار
    if (!formData.nickname.trim()) {
      newErrors.nickname = 'لطفاً نام مستعار را وارد کنید';
    } else if (formData.nickname.trim().length < 2) {
      newErrors.nickname = 'نام مستعار باید حداقل 2 کاراکتر باشد';
    }

    // اعتبارسنجی رمز عبور
    if (!formData.password) {
      newErrors.password = 'لطفاً رمز عبور را وارد کنید';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'رمز عبور باید حداقل 6 کاراکتر باشد';
    }

    // اعتبارسنجی تکرار رمز عبور
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'لطفاً تکرار رمز عبور را وارد کنید';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیستند';
    }

    // اعتبارسنجی نام کاربری معرف (اختیاری اما اگر وارد شده باشد باید معتبر باشد)
    if (formData.referrerUsername.trim() && !validateUsername(formData.referrerUsername)) {
      newErrors.referrerUsername = 'نام کاربری معرف باید فقط شامل حروف و اعداد انگلیسی باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await apiClient.post('/auth/register', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to avatar selection
      navigate('/select-avatar');
    } catch (err) {
      setErrors({ submit: 'خطا در ثبت نام. لطفاً دوباره تلاش کنید.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen md:justify-center md:items-center md:bg-gray-50">
      <div className="w-full flex flex-col md:max-w-md md:bg-white md:rounded-2xl md:shadow-lg md:overflow-hidden">
        <div className="w-full flex justify-center items-center bg-[#7e4bd0] p-12 min-h-[280px] rounded-b-3xl md:min-h-[200px] md:rounded-t-2xl md:rounded-b-none">
          <img
            src="/logo/Form.gif"
            alt=""
            className="w-40"
          />
        </div>
        <div className="flex flex-col w-full items-center justify-center flex-1 p-4 md:p-8">
          <div className="w-full mb-8 md:mb-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {errors.submit && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {errors.submit}
              </div>
            )}
            <div className="space-y-2 mt-3 w-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                نام کاربری (فقط حروف و اعداد انگلیسی)
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.username
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300'
                } outline-none transition-all`}
                placeholder="نام کاربری ..."
                dir="rtl"
                required
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div className="space-y-2 w-full">
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                نام مستعار
              </label>
              <input
                id="nickname"
                type="text"
                value={formData.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.nickname
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300'
                } outline-none transition-all`}
                placeholder=" نام مستعار ..."
                dir="rtl"
                required
              />
              {errors.nickname && (
                <p className="text-red-500 text-xs mt-1">{errors.nickname}</p>
              )}
            </div>
            <div className="space-y-2 w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300'
                } outline-none transition-all`}
                placeholder="رمز عبور ..."
                dir="rtl"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2 w-full">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                تکرار رمز عبور
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.confirmPassword
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300'
                } outline-none transition-all`}
                placeholder=" تکرار رمز عبور ..."
                dir="rtl"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="space-y-2 w-full">
              <label
                htmlFor="referrerUsername"
                className="block text-sm font-medium text-gray-700"
              >
                نام کاربری معرف (اختیاری)
              </label>
              <input
                id="referrerUsername"
                type="text"
                value={formData.referrerUsername}
                onChange={(e) => handleChange('referrerUsername', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.referrerUsername
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300'
                } outline-none transition-all`}
                placeholder="نام کاربری معرف ..."
                dir="rtl"
              />
              {errors.referrerUsername && (
                <p className="text-red-500 text-xs mt-1">{errors.referrerUsername}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-gray-300 transition-all active:scale-[0.98]"
            >
              {isLoading ? 'در حال ثبت نام...' : 'ثبت نام'}
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
