import { useNavigate } from 'react-router-dom';

const Password = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-full flex justify-center items-center bg-[#7e4bd0] p-12 min-h-[300px] rounded-b-3xl">
        <img
          src="/logo/line.svg"
          alt=""
          className="w-40 h-40"
        />
      </div>
      <div className="flex flex-col w-full items-center justify-start flex-1 pt-10 p-4">
        <div className="w-full mb-8">
          <div className="flex flex-col gap-3">
            <div className="space-y-2 w-full">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              شماره موبایل مادر یا پدر
            </label>
            <input
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300 outline-none transition-all "
              placeholder="  شماره موبایل ..."
              dir="rtl"
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => navigate('/password-not')}
            className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
          >
            ارسال لینک بازیابی
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full border border-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-[#7e4bd0] font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
          >
            بازگشت به صفحه ورود
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
