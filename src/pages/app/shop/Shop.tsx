import { motion } from "framer-motion";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WalletHeader from "../../../components/shared/Wallet/WalletHeader";
import { lineIconPaths } from "../../../utils/lineIcons";

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

  // Categories synced with public/icons/store/ file names
  const storeCategories: { id: string; name: string; iconFile: string }[] = [
    { id: "all", name: "همه", iconFile: "all.svg" },
    { id: "kala-digital", name: "کالای دیجیتال", iconFile: "kala digital.svg" },
    { id: "baazi-o-sargarmi", name: "بازی و سرگرمی", iconFile: "baazi o sargarmi.svg" },
    { id: "book-lavazem-tahrir", name: "کتاب و لوازم تحریر", iconFile: "book lavazem tahrir.svg" },
    { id: "mod-o-lebas", name: "مد و لباس", iconFile: "mod o lebas.svg" },
    { id: "safar", name: "سفر", iconFile: "safar.svg" },
    { id: "pet", name: "حیوانات خانگی", iconFile: "pet.svg" },
    { id: "labtop", name: "لپ تاپ", iconFile: "labtop.svg" },
    { id: "mobile", name: "موبایل", iconFile: "mobile.svg" },
  ];

  const categories: Category[] = storeCategories.map(({ id, name, iconFile }) => ({
    id,
    name,
    icon: (
      <img
        src={`/icons/store/${encodeURIComponent(iconFile)}`}
        alt={name}
        className="w-full h-full object-cover p-4"
      />
    ),
  }));

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
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "2",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "لپ تاپ گیمینگ ایسوس",
          price: "۱۳۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "labtop",
        },
        {
          id: "3",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۴۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "4",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "میز اتاق بازی",
          price: "۱۵۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "5",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۶۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "6",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "لپ تاپ لنوو",
          price: "۱۷۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "labtop",
        },
        {
          id: "7",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۸۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "8",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "صندلی اتاق بازی",
          price: "۱۹۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
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
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "10",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "لپ تاپ ایسوس",
          price: "۲۱۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "labtop",
        },
        {
          id: "11",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۲۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "12",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "میز گیمینگ",
          price: "۲۳۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "13",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۴۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "14",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "لپ تاپ اپل",
          price: "۲۵۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "labtop",
        },
        {
          id: "15",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۶۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
        {
          id: "16",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "صندلی گیمینگ",
          price: "۲۷۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "baazi-o-sargarmi",
        },
      ],
    },
  ];

  const allProducts = useMemo(() => {
    return productSections.flatMap((section) => section.products);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (activeCategory && activeCategory !== "all") {
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

  const ProductCard = ({ product, isHorizontal = false }: { product: Product; isHorizontal?: boolean }) => (
    <div
      onClick={() => navigate(`/shop/${product.id}`)}
      className={`${isHorizontal ? 'w-[calc(50vw-22px)] md:w-full' : 'w-full'} shrink-0 shadow-sm bg-white overflow-hidden rounded-lg md:rounded-xl relative cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]`}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="p-2 md:p-3 lg:p-4 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <img src={lineIconPaths.store} className="w-4 h-4 md:w-5 md:h-5" alt="فروشگاه" />
          <p className="text-xs md:text-sm">فروشگاه دیجی تین</p>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-black font-medium line-clamp-2">{product.title}</p>
        <div className="flex gap-1 mt-auto items-center justify-end w-full">
          <p className="text-black text-sm md:text-base lg:text-lg font-semibold">{product.price}</p>
          <p className="text-xs md:text-sm">تومان</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-white pb-24 md:pb-4 min-h-screen overflow-hidden">
      {/* Fixed header - stays on top when scrolling */}
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader
          greeting="محمد مهرابی"
          subtitle="@mohammad-mehrabi"
          icon={<img src={lineIconPaths.store} className="w-5 h-5" alt="فروشگاه" />}
          showCartBadge={true}
        />
      </div>
      <div className="px-4 md:px-6 lg:px-8 flex-1 overflow-y-auto min-h-0 max-w-7xl mx-auto w-full">

      <div className="flex gap-3 md:gap-4 lg:gap-5 mb-3 md:mb-4 lg:mb-6 overflow-x-auto md:overflow-x-visible scrollbar-hide pb-2 md:pb-0 md:justify-center md:flex-wrap">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className="flex flex-col items-center cursor-pointer shrink-0"
          >
            <div
              className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border rounded-xl md:rounded-2xl transition-all overflow-hidden bg-white hover:shadow-md ${
                activeCategory === category.id
                  ? "border-[#7e4bd0] border-2 md:border-[3px]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {category.icon}
            </div>
            <p
              className={`text-xs md:text-sm lg:text-base font-medium mt-2 md:mt-3 ${
                activeCategory === category.id
                  ? "text-[#7e4bd0] font-semibold"
                  : "text-gray-700"
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
        className="mb-3 md:mb-4 lg:mb-6"
      >
        <div className="relative max-w-2xl md:mx-auto">
          <img src={lineIconPaths.searchRiz} className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 opacity-50" alt="جستجو" />
          <input
            type="text"
            placeholder="جستجوی محصولات ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 md:pr-12 pl-4 md:pl-6 py-3 md:py-4 placeholder-gray-400 text-black bg-white border border-gray-400 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base"
          />
        </div>
      </motion.div>

      <div className="w-full mt-3 md:mt-4 lg:mt-6 relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl">
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
                className="w-full rounded-lg md:rounded-xl lg:rounded-2xl object-cover"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center w-full gap-1 md:gap-2 mt-2 md:mt-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? "bg-black w-5 md:w-6 h-2 md:h-2.5"
                  : "bg-gray-500 w-2 md:w-3 h-2 md:h-2.5 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-5 md:mt-6 lg:mt-8">
          <div className="flex w-full items-center justify-between mb-3 md:mb-4 lg:mb-6">
            <p className="text-black font-medium text-sm md:text-base lg:text-lg">
              {searchQuery
                ? `نتایج جستجو (${filteredProducts.length})`
                : activeCategory === "all"
                ? `همه محصولات (${filteredProducts.length})`
                : `محصولات (${filteredProducts.length})`}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 md:mt-6 lg:mt-8 text-center py-8 md:py-12 lg:py-16">
          <p className="text-gray-500 text-sm md:text-base lg:text-lg">
            محصولی یافت نشد. لطفاً جستجوی دیگری امتحان کنید.
          </p>
        </div>
      )}

      {!searchQuery && !activeCategory && (
        <>
          {productSections.map((section) => (
            <div key={section.id} className="mt-5 md:mt-6 lg:mt-8">
              <div className="flex w-full items-center justify-between mb-3 md:mb-4 lg:mb-6">
                <p className="text-black font-medium text-sm md:text-base lg:text-lg">
                  {section.title}
                </p>
                <div className="text-[#7e4bd0] text-xs md:text-sm lg:text-base flex gap-1 items-center cursor-pointer hover:text-[#6a3fb8] transition-colors">
                  <p>مشاهده همه</p>
                  <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              {/* Mobile: Horizontal Scroll */}
              <div className="mt-2 md:hidden overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 pb-2" style={{ width: "max-content" }}>
                  {section.products.map((product) => (
                    <ProductCard key={product.id} product={product} isHorizontal={true} />
                  ))}
                </div>
              </div>
              {/* Desktop: Grid Layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mt-3">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} isHorizontal={false} />
                ))}
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
