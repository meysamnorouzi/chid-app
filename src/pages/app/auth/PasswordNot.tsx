import { useNavigate } from 'react-router-dom';

const PasswordNot = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full min-h-0 md:justify-center md:items-center md:bg-gray-50 md:min-h-screen">
      <div className="w-full flex flex-col h-full min-h-0 md:h-auto md:max-w-md md:bg-white md:rounded-2xl md:shadow-lg md:overflow-hidden">
        {/* Top section: same height on all auth pages */}
        <div className="w-full shrink-0 flex justify-center items-center bg-[#7e4bd0] h-[250px] py-4 px-6 rounded-b-3xl md:h-[250px] md:min-h-[250px] md:py-12 md:px-12 md:rounded-t-2xl md:rounded-b-none">
          <img
            src="/gif/Done.gif"
            alt=""
            className="w-20 h-20 object-contain md:w-52"
          />
        </div>
        <div className="flex-1 min-h-0 flex flex-col w-full items-center justify-start pt-4 pb-4 px-4 overflow-y-auto md:pt-0 md:p-8 md:overflow-visible">
          <div className="w-full mb-4 md:mb-0">
            <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-3 justify-center items-center">
            <p className="text-xl text-black text-center">
              درخواست بازیابی رمزعبورت ارسال شد
            </p>
            <p className="text-center">
               لینک بازیابی برای والدت ارسال شد , با استفاده از اون رمزت رو عوض کن
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-4 md:mt-6 bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl shadow-gray-300 transition-all active:scale-[0.98] md:py-3.5"
          >
           متوجه شدم
          </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordNot;
