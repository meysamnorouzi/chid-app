import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthInput from '../../../components/shared/AuthInput';

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
            className="w-40 -mt-14"
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
            <AuthInput
              id="username"
              label="نام کاربری (فقط حروف و اعداد انگلیسی)"
              type="text"
              value={formData.username}
              onChange={(value) => handleChange('username', value)}
              placeholder="username123"
              error={errors.username}
              isNumberOrLink={true}
              required
            />
            <AuthInput
              id="nickname"
              label="نام مستعار"
              type="text"
              value={formData.nickname}
              onChange={(value) => handleChange('nickname', value)}
              placeholder=" نام مستعار ..."
              error={errors.nickname}
              required
            />
            <AuthInput
              id="password"
              label="رمز عبور"
              type="password"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
              placeholder="********"
              error={errors.password}
              isNumberOrLink={true}
              required
            />
            <AuthInput
              id="confirmPassword"
              label="تکرار رمز عبور"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => handleChange('confirmPassword', value)}
              placeholder="********"
              error={errors.confirmPassword}
              isNumberOrLink={true}
              required
            />
            <AuthInput
              id="referrerUsername"
              label="نام کاربری معرف (اختیاری)"
              type="text"
              value={formData.referrerUsername}
              onChange={(value) => handleChange('referrerUsername', value)}
              placeholder="username123"
              error={errors.referrerUsername}
              isNumberOrLink={true}
            />
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
