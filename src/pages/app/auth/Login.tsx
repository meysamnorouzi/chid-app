import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AuthInput from '../../../components/shared/AuthInput';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  const validateUsername = (username: string): boolean => {
    // فقط حروف انگلیسی و اعداد
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username) && username.length >= 3 && username.length <= 20;
  };

  const handleLogin = async () => {
    // Validation
    if (!username.trim()) {
      setError('لطفاً نام کاربری را وارد کنید');
      return;
    }
    if (!validateUsername(username)) {
      setError('نام کاربری باید فقط شامل حروف و اعداد انگلیسی باشد (3 تا 20 کاراکتر)');
      return;
    }
    if (!password.trim()) {
      setError('لطفاً رمز عبور را وارد کنید');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await apiClient.post('/auth/login', { username, password });
      // const { token, user } = response;

      // For now, simulate a successful login with a mock token
      const mockToken = `token_${username}_${Date.now()}`;
      const mockUser = {
        id: 1,
        username: username,
        name: 'محمد مهرابی',
      };

      // Save auth data to localStorage
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Navigate to the page user was trying to access, or home
      navigate(from, { replace: true });
    } catch (err) {
      setError('نام کاربری یا رمز عبور اشتباه است');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen md:justify-center md:items-center md:bg-gray-50">
      <div className="w-full flex flex-col md:max-w-md md:bg-white md:rounded-2xl md:shadow-lg md:overflow-hidden">
        <div className="w-full flex justify-center items-center bg-[#7e4bd0] p-12 min-h-[300px] rounded-b-3xl md:min-h-[200px] md:rounded-t-2xl md:rounded-b-none">
          <img
            src="/logo/cheshmak.gif"
            alt=""
            className="w-40 -mt-14"
          />
        </div>
        <div className="flex flex-col w-full items-center justify-start flex-1 pt-10 p-4 md:pt-0 md:p-8">
          <div className="w-full mb-8 md:mb-0">
            <div className="flex flex-col gap-3">
            {error && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <AuthInput
              id="username"
              label="نام کاربری (فقط حروف و اعداد انگلیسی)"
              type="text"
              value={username}
              onChange={(value) => {
                setUsername(value);
                if (error) setError('');
              }}
              placeholder="username123"
              error={error && !username.trim() ? error : undefined}
              isNumberOrLink={true}
              required
            />
            <AuthInput
              id="password"
              label="رمز عبور"
              type="password"
              value={password}
              onChange={(value) => {
                setPassword(value);
                if (error) setError('');
              }}
              placeholder="********"
              error={error && !password.trim() ? error : undefined}
              isNumberOrLink={true}
              required
            />
          <div className="flex gap-2 w-full mb-5">
            <p>رمزعبور رو فراموش کردی؟</p>
            <p 
              className=" text-[#7e4bd0] cursor-pointer hover:underline"
              onClick={() => navigate('/password')}
            >
              بازیابی رمزعبور
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/qrcode')}
            className="w-full border border-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-[#7e4bd0] font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
          >
            ورود با کیوارکد
          </button>
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
          >
            {isLoading ? 'در حال ورود...' : 'ورود به دیجی تین'}
          </button>

          <div className="flex gap-2 w-full mt-8 justify-center text-center">
            <p>اکانت نداری؟</p>
            <p 
              className=" text-[#7e4bd0] cursor-pointer hover:underline"
              onClick={() => navigate('/register')}
            >
              ثبت نام کن
            </p>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
