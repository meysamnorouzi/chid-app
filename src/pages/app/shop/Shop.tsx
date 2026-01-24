import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  WalletIcon,
  CheckCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { ReactNode, useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WalletHeader from "../../../components/shared/Wallet/WalletHeader";

interface Category {
  id: string;
  name: string;
  icon: ReactNode;
  isActive?: boolean;
}

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  isFavorite?: boolean;
  categoryId?: string;
}

interface ProductSection {
  id: string;
  title: string;
  products: Product[];
}

const Shop = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const banners = [
    "https://dkstatics-public.digikala.com/digikala-adservice-banners/56a42a1e2d4961d575fc4d9917f46eb0258e3dbd_1761147699.jpg?x-oss-process=image/quality,q_95",

  ];

  const resetAutoPlay = useCallback(() => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
  }, [banners.length]);

  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [resetAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < banners.length - 1) {
      goToSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const categories: Category[] = [
    {
      id: "all",
      name: "همه",
      icon: <HeartIcon className="w-6 h-6" />,
    },
    {
      id: "entertainment",
      name: "سرگرمی",
      icon: <CheckCircleIcon className="w-6 h-6" />,
    },
    {
      id: "laptops",
      name: "لپ تاپ ها",
      icon: <WalletIcon className="w-6 h-6" />,
    },
    {
      id: "room",
      name: "اتاق",
      icon: <ShoppingBagIcon className="w-6 h-6" />,
    },
  ];

  const productSections: ProductSection[] = [
    {
      id: "electronics",
      title: "وسایل برقی",
      products: [
        {
          id: "1",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۲۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
        },
        {
          id: "2",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "لپ تاپ گیمینگ ایسوس",
          price: "۱۳۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "laptops",
        },
        {
          id: "3",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۴۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
        },
        {
          id: "4",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "میز اتاق بازی",
          price: "۱۵۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "room",
        },
        {
          id: "5",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۶۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
        },
        {
          id: "6",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "لپ تاپ لنوو",
          price: "۱۷۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "laptops",
        },
        {
          id: "7",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۸۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
        },
        {
          id: "8",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "صندلی اتاق بازی",
          price: "۱۹۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "room",
        },
      ],
    },
    {
      id: "gaming",
      title: "وسایل گیمینگ",
      products: [
        {
          id: "9",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۰۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
        },
        {
          id: "10",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "لپ تاپ ایسوس",
          price: "۲۱۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "laptops",
        },
        {
          id: "11",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۲۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
        },
        {
          id: "12",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "میز گیمینگ",
          price: "۲۳۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "room",
        },
        {
          id: "13",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۴۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
        },
        {
          id: "14",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "لپ تاپ اپل",
          price: "۲۵۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "laptops",
        },
        {
          id: "15",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۶۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
        },
        {
          id: "16",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "صندلی گیمینگ",
          price: "۲۷۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "room",
        },
      ],
    },
  ];

  const allProducts = useMemo(() => {
    return productSections.flatMap((section) => section.products);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === activeCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allProducts, activeCategory, searchQuery]);

  const ProductCard = ({ product }: { product: Product }) => (
    <div
      onClick={() => navigate(`/shop/${product.id}`)}
      className="w-[calc(50vw-22px)] shrink-0 shadow-sm bg-white overflow-hidden rounded-lg relative cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="relative">
        {product.isFavorite && (
          <div className="absolute right-1 top-1 flex gap-1 justify-center items-center p-1 bg-[#00000038] backdrop-blur-xs rounded-lg">
            <HeartIcon className="w-6 h-6 text-white" />
            <p className="text-xs text-white">علاقه مندی</p>
          </div>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <ShoppingBagIcon className="w-4 h-4" />
          <p className="text-xs">فروشگاه دیجی پلی</p>
        </div>
        <p className="text-sm text-black font-medium">{product.title}</p>
        <div className="flex gap-1 mt-8 items-center justify-end w-full">
          <p className="text-black text-sm">{product.price}</p>
          <p className="text-xs">تومان</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-white pb-24 gap-2 min-h-screen">
      <WalletHeader
        greeting="سلام ، محمد"
        subtitle="به فروشگاه دیجی پلی خوش اومدی"
        icon={<ShoppingBagIcon className="w-5 h-5 text-[#7e4bd0]" />}
      />
      <div className="px-4">

      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`h-20 border mb-3 flex items-center justify-center flex-col rounded-lg cursor-pointer transition-colors ${
              activeCategory === category.id
                ? "border-[#7e4bd0]"
                : "border-gray-200"
            }`}
          >
            <div
              className={
                activeCategory === category.id ? "text-[#7e4bd0]" : "text-black"
              }
            >
              {category.icon}
            </div>
            <p
              className={`text-xs font-semibold mt-1 ${
                activeCategory === category.id
                  ? "text-[#7e4bd0]"
                  : "text-gray-900"
              }`}
            >
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-3"
      >
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجوی محصولات ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 placeholder-gray-400 text-black bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
          />
        </div>
      </motion.div>

      <div className="w-full mt-3 relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center w-full gap-1 mt-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? "bg-black w-5"
                  : "bg-gray-500 w-2 hover:bg-gray-400"
              } h-2`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-5">
          <div className="flex w-full items-center justify-between mb-3">
            <p className="text-black font-medium text-sm">
              {searchQuery || activeCategory !== "all"
                ? `نتایج جستجو (${filteredProducts.length})`
                : "همه محصولات"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 text-center py-8">
          <p className="text-gray-500 text-sm">
            محصولی یافت نشد. لطفاً جستجوی دیگری امتحان کنید.
          </p>
        </div>
      )}

      {!searchQuery && activeCategory === "all" && (
        <>
          {productSections.map((section) => (
            <div key={section.id}>
              <div className="flex w-full items-center justify-between mt-5">
                <p className="text-black font-medium text-sm">
                  {section.title}
                </p>
                <div className="text-[#7e4bd0] text-xs flex gap-1 items-center">
                  <p>مشاهده همه</p>
                  <ChevronLeftIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-2 overflow-x-auto scrollbar-hide">
                <div
                  className="flex gap-3 pb-2"
                  style={{ width: "max-content" }}
                >
                  {section.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      </div>
    </div>
  );
};

export default Shop;
