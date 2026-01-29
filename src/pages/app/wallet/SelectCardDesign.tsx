import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CardDesign {
  id: string;
  title: string;
  image: string;
}

const cards: CardDesign[] = [
  {
    id: "classic",
    title: "کارت کلاسیک",
    image: "/cards/card-1.png",
  },
  {
    id: "gold",
    title: "کارت طلایی",
    image: "/cards/card-2.png",
  },
  {
    id: "modern",
    title: "کارت مدرن",
    image: "/cards/card-3.png",
  },
];

const colors = [
  { id: "purple", name: "بنفش", class: "bg-[#7e4bd0]" },
  { id: "blue", name: "آبی", class: "bg-blue-500" },
  { id: "black", name: "مشکی", class: "bg-black" },
];

const SelectCardDesign = () => {
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState<CardDesign>(cards[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleContinue = () => {
    navigate("/confirm-card", {
      state: {
        card: selectedCard,
        color: selectedColor,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32">
      {/* Header */}
      <div className="px-4 md:px-6 lg:px-8 pt-6 pb-4 max-w-6xl mx-auto w-full">
        <h1 className="text-xl md:text-2xl font-bold">انتخاب کارت</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          کارت و رنگ دلخواه خود را انتخاب کنید
        </p>
      </div>

      {/* Card Slider */}
      <div className="mt-4 md:mt-6">
        <motion.div
          className="flex gap-4 md:gap-6 px-4 md:px-6 lg:px-8 overflow-x-auto no-scrollbar max-w-6xl mx-auto"
          drag="x"
          dragConstraints={{ left: -300, right: 0 }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCard(card)}
              className={`min-w-[260px] rounded-2xl p-4 border cursor-pointer ${
                selectedCard.id === card.id
                  ? "border-[#7e4bd0]"
                  : "border-gray-200"
              }`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-contain"
              />
              <p className="text-center font-semibold mt-3">
                {card.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Color Selection */}
      <div className="px-4 md:px-6 lg:px-8 mt-8 max-w-6xl mx-auto w-full">
        <h2 className="font-bold mb-3 md:mb-4 text-base md:text-lg">انتخاب رنگ کارت</h2>

        <div className="flex gap-4 md:gap-6">
          {colors.map((color) => (
            <motion.button
              key={color.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedColor(color)}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${color.class} relative`}
            >
              {selectedColor.id === color.id && (
                <span className="absolute inset-0 rounded-full ring-4 ring-offset-2 ring-[#7e4bd0]" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="px-4 md:px-6 lg:px-8 mt-10 max-w-6xl mx-auto w-full">
        <h2 className="font-bold mb-3 md:mb-4 text-base md:text-lg">پیش‌نمایش</h2>
        <div className={`rounded-2xl p-6 md:p-8 text-white ${selectedColor.class} max-w-md mx-auto md:mx-0`}>
          <p className="text-sm md:text-base opacity-80">کارت انتخابی</p>
          <p className="text-lg md:text-xl font-bold mt-1">
            {selectedCard.title}
          </p>
          <div className="mt-6 h-10 bg-white/20 rounded-md" />
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 md:p-6 border-t">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-xl bg-[#7e4bd0] text-white font-bold text-lg md:text-xl"
          >
            ادامه
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCardDesign;

