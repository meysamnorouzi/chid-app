import { useNavigate } from 'react-router-dom';

const PasswordNot = () => {
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
            <div className="flex flex-col gap-3 justify-center items-center">
            <p className="text-2xl text-black">
              درخواست بازیابی رمزعبورت ارسال شد
            </p>
            <p className="text-center">
              یک لینک بازیابی برای شماره وارد شده ارسال شد با اون میتونی یک رمز
              جدید برای خودت انتخاب کنی{" "}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-6 bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
          >
            تایید و برگشت به صفحه ورود
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordNot;
