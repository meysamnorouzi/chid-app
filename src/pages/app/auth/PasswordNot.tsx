import { useNavigate } from 'react-router-dom';

const PasswordNot = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen md:justify-center md:items-center md:bg-gray-50">
      <div className="w-full flex flex-col md:max-w-md md:bg-white md:rounded-2xl md:shadow-lg md:overflow-hidden">
        <div className="w-full flex justify-center items-center bg-[#7e4bd0] p-12 min-h-[300px] rounded-b-3xl md:min-h-[200px] md:rounded-t-2xl md:rounded-b-none">
          <img
            src="/gif/Done.gif"
            alt=""
            className="w-52"
          />
        </div>
        <div className="flex flex-col w-full items-center justify-start flex-1 pt-10 p-4 md:pt-0 md:p-8">
          <div className="w-full mb-8 md:mb-0">
            <div className="flex flex-col gap-3">
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
            className="w-full mt-6 bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
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
