import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  ArrowUpTrayIcon,
  HeartIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import WalletHeader from "../../../components/shared/Wallet/WalletHeader";
import { Breadcrumb, Chips } from "../../../components/shared";

interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier?: number; // تغییر قیمت بر اساس variant (مثلاً +50000 یا -10000)
  image?: string; // تصویر مخصوص این variant
  available?: boolean;
  colorCode?: string; // کد رنگ برای variant های رنگی (مثل #000000)
}

interface ProductVariantOption {
  type: "color" | "size" | "storage" | "ram" | "custom"; // نوع variant
  label: string; // عنوان variant (مثل "رنگ" یا "سایز")
  variants: ProductVariant[];
}

interface Seller {
  id: string;
  name: string;
  price: string; // قیمت محصول از این فروشنده
  badges?: string[]; // بج‌های فروشنده مثل "منتخب" یا "عملکرد عالی"
  rating?: number; // امتیاز فروشنده
  isVerified?: boolean; // آیا فروشنده تایید شده است
}

interface ProductSpecification {
  label: string; // عنوان مشخصه (مثل "نورپردازی صفحه کلید")
  value: string; // مقدار مشخصه (مثل "تک رنگ")
}

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  isFavorite?: boolean;
  categoryId?: string;
  description?: string;
  variantOptions?: ProductVariantOption[]; // گزینه‌های variant محصول
  sellers?: Seller[]; // لیست فروشندگان و قیمت‌های آن‌ها
  specifications?: ProductSpecification[]; // مشخصات محصول
}

// این داده‌ها باید از API یا state management بیایند
// برای حالا از همان داده‌های Shop استفاده می‌کنیم
const getAllProducts = (): Product[] => {
  const productSections = [
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
          description: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. مناسب برای بازی‌های گروهی و تجربه گیمینگ حرفه‌ای.",
          variantOptions: [
            {
              type: "color" as const,
              label: "رنگ",
              variants: [
                { id: "black", name: "مشکی", value: "مشکی", priceModifier: 0, colorCode: "#000000" },
                { id: "white", name: "سفید", value: "سفید", priceModifier: 5000000, colorCode: "#FFFFFF" },
                { id: "blue", name: "آبی", value: "آبی", priceModifier: 3000000, colorCode: "#3B82F6" },
              ],
            },
            {
              type: "storage" as const,
              label: "حافظه",
              variants: [
                { id: "512gb", name: "۵۱۲ گیگابایت", value: "512GB", priceModifier: 0 },
                { id: "1tb", name: "۱ ترابایت", value: "1TB", priceModifier: 10000000 },
                { id: "2tb", name: "۲ ترابایت", value: "2TB", priceModifier: 20000000 },
              ],
            },
          ],
          sellers: [
            {
              id: "seller1",
              name: "طرح اندیشان سمت نو",
              price: "۱۲۰,۰۰۰,۰۰۰",
              badges: ["منتخب", "عملکرد عالی"],
              rating: 4.8,
              isVerified: true,
            },
            {
              id: "seller2",
              name: "فروشگاه دیجی پلی",
              price: "۱۱۸,۰۰۰,۰۰۰",
              badges: ["منتخب"],
              rating: 4.6,
              isVerified: true,
            },
            {
              id: "seller3",
              name: "گیمینگ استور",
              price: "۱۲۲,۰۰۰,۰۰۰",
              rating: 4.5,
              isVerified: false,
            },
          ],
          specifications: [
            {
              label: "نورپردازی صفحه کلید",
              value: "تک رنگ",
            },
            {
              label: "سازنده پردازنده گرافیکی",
              value: "NVIDIA",
            },
            {
              label: "ظرفیت حافظه رم (M)",
              value: "۲۰ گیگابایت",
            },
            {
              label: "نوع پردازنده",
              value: "Intel Core i7",
            },
            {
              label: "ظرفیت حافظه داخلی",
              value: "۵۱۲ گیگابایت",
            },
            {
              label: "اندازه صفحه نمایش",
              value: "۱۵.۶ اینچ",
            },
          ],
        },
        {
          id: "2",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "لپ تاپ گیمینگ ایسوس",
          price: "۱۳۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "laptops",
          description: "لپ تاپ گیمینگ ایسوس با پردازنده قدرتمند و کارت گرافیک اختصاصی. مناسب برای بازی‌های سنگین و کارهای گرافیکی.",
          sellers: [
            {
              id: "seller1",
              name: "فروشگاه تکنولوژی",
              price: "۱۲۸,۰۰۰,۰۰۰",
              badges: ["منتخب"],
              rating: 4.7,
              isVerified: true,
            },
            {
              id: "seller2",
              name: "گیمینگ استور",
              price: "۱۳۰,۰۰۰,۰۰۰",
              rating: 4.5,
              isVerified: true,
            },
            {
              id: "seller3",
              name: "دیجی پلی",
              price: "۱۳۲,۰۰۰,۰۰۰",
              badges: ["عملکرد عالی"],
              rating: 4.6,
              isVerified: false,
            },
          ],
          specifications: [
            {
              label: "نورپردازی صفحه کلید",
              value: "RGB",
            },
            {
              label: "سازنده پردازنده گرافیکی",
              value: "NVIDIA",
            },
            {
              label: "ظرفیت حافظه رم",
              value: "۱۶ گیگابایت",
            },
            {
              label: "نوع پردازنده",
              value: "AMD Ryzen 9",
            },
            {
              label: "ظرفیت حافظه داخلی",
              value: "۱ ترابایت",
            },
            {
              label: "اندازه صفحه نمایش",
              value: "۱۷.۳ اینچ",
            },
          ],
          variantOptions: [
            {
              type: "ram" as const,
              label: "رم",
              variants: [
                { id: "8gb", name: "۸ گیگابایت", value: "8GB", priceModifier: 0 },
                { id: "16gb", name: "۱۶ گیگابایت", value: "16GB", priceModifier: 8000000 },
                { id: "32gb", name: "۳۲ گیگابایت", value: "32GB", priceModifier: 15000000 },
              ],
            },
            {
              type: "storage" as const,
              label: "حافظه",
              variants: [
                { id: "256gb", name: "۲۵۶ گیگابایت", value: "256GB", priceModifier: 0 },
                { id: "512gb", name: "۵۱۲ گیگابایت", value: "512GB", priceModifier: 5000000 },
                { id: "1tb", name: "۱ ترابایت", value: "1TB", priceModifier: 12000000 },
              ],
            },
          ],
        },
        {
          id: "3",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۴۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
          description: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. مناسب برای بازی‌های گروهی و تجربه گیمینگ حرفه‌ای.",
        },
        {
          id: "4",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "میز اتاق بازی",
          price: "۱۵۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "room",
          description: "میز اتاق بازی با طراحی ارگونومیک و فضای کافی برای تمام تجهیزات گیمینگ.",
          variantOptions: [
            {
              type: "color" as const,
              label: "رنگ",
              variants: [
                { id: "black", name: "مشکی", value: "مشکی", priceModifier: 0, colorCode: "#000000" },
                { id: "brown", name: "قهوه‌ای", value: "قهوه‌ای", priceModifier: 2000000, colorCode: "#8B4513" },
                { id: "white", name: "سفید", value: "سفید", priceModifier: 3000000, colorCode: "#FFFFFF" },
              ],
            },
            {
              type: "size" as const,
              label: "سایز",
              variants: [
                { id: "small", name: "کوچک", value: "کوچک", priceModifier: -5000000 },
                { id: "medium", name: "متوسط", value: "متوسط", priceModifier: 0 },
                { id: "large", name: "بزرگ", value: "بزرگ", priceModifier: 8000000 },
              ],
            },
          ],
        },
        {
          id: "5",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۶۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
          description: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. مناسب برای بازی‌های گروهی و تجربه گیمینگ حرفه‌ای.",
        },
        {
          id: "6",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "لپ تاپ لنوو",
          price: "۱۷۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "laptops",
          description: "لپ تاپ لنوو با طراحی مدرن و عملکرد بالا. مناسب برای کار و بازی.",
        },
        {
          id: "7",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۱۸۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
          description: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. مناسب برای بازی‌های گروهی و تجربه گیمینگ حرفه‌ای.",
        },
        {
          id: "8",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "صندلی اتاق بازی",
          price: "۱۹۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "room",
          description: "صندلی اتاق بازی با طراحی ارگونومیک و پشتیبانی کامل از کمر.",
          variantOptions: [
            {
              type: "color" as const,
              label: "رنگ",
              variants: [
                { id: "red", name: "قرمز", value: "قرمز", priceModifier: 0, colorCode: "#EF4444" },
                { id: "black", name: "مشکی", value: "مشکی", priceModifier: 0, colorCode: "#000000" },
                { id: "blue", name: "آبی", value: "آبی", priceModifier: 2000000, colorCode: "#3B82F6" },
                { id: "green", name: "سبز", value: "سبز", priceModifier: 2000000, colorCode: "#10B981" },
              ],
            },
          ],
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
          description: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. مناسب برای بازی‌های گروهی و تجربه گیمینگ حرفه‌ای.",
        },
        {
          id: "10",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "لپ تاپ ایسوس",
          price: "۲۱۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "laptops",
          description: "لپ تاپ ایسوس با پردازنده قدرتمند و کارت گرافیک اختصاصی. مناسب برای بازی‌های سنگین.",
        },
        {
          id: "11",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۲۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
          description: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. مناسب برای بازی‌های گروهی و تجربه گیمینگ حرفه‌ای.",
        },
        {
          id: "12",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "میز گیمینگ",
          price: "۲۳۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "room",
          description: "میز گیمینگ با طراحی ارگونومیک و فضای کافی برای تمام تجهیزات گیمینگ.",
        },
        {
          id: "13",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۴۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
          description: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. مناسب برای بازی‌های گروهی و تجربه گیمینگ حرفه‌ای.",
        },
        {
          id: "14",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "لپ تاپ اپل",
          price: "۲۵۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "laptops",
          description: "لپ تاپ اپل با طراحی زیبا و عملکرد بالا. مناسب برای کار و بازی.",
        },
        {
          id: "15",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          title: "کنسول بازی (همراه بازی انلاین و دو دسته اضافه )",
          price: "۲۶۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "entertainment",
          description: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. مناسب برای بازی‌های گروهی و تجربه گیمینگ حرفه‌ای.",
        },
        {
          id: "16",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          title: "صندلی گیمینگ",
          price: "۲۷۰,۰۰۰,۰۰۰",
          isFavorite: true,
          categoryId: "room",
          description: "صندلی گیمینگ با طراحی ارگونومیک و پشتیبانی کامل از کمر.",
        },
      ],
    },
  ];

  return productSections.flatMap((section) => section.products);
};

// تابع برای تبدیل عدد به فرمت فارسی با جداکننده هزارگان
const formatPrice = (price: number): string => {
  return price.toLocaleString("fa-IR");
};

// تابع برای تبدیل رشته قیمت فارسی به عدد
const parsePrice = (priceStr: string): number => {
  return parseInt(priceStr.replace(/,/g, "").replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()));
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allProducts = getAllProducts();
  const product = allProducts.find((p) => p.id === id);

  // State برای variant های انتخاب شده
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  // مقداردهی اولیه variant ها (اولین گزینه هر variant)
  useEffect(() => {
    if (product?.variantOptions) {
      const initial: Record<string, string> = {};
      product.variantOptions.forEach((option) => {
        if (option.variants.length > 0) {
          initial[option.type] = option.variants[0].id;
        }
      });
      setSelectedVariants(initial);
    } else {
      // اگر محصول variant نداشت، state را خالی کنیم
      setSelectedVariants({});
    }
  }, [id]); // استفاده از id به جای product برای جلوگیری از re-render بی‌نهایت

  // محاسبه قیمت نهایی بر اساس variant های انتخاب شده
  const calculateFinalPrice = (): string => {
    if (!product) return "۰";
    
    const basePrice = parsePrice(product.price);
    let totalModifier = 0;

    if (product.variantOptions) {
      product.variantOptions.forEach((option) => {
        const selectedVariantId = selectedVariants[option.type];
        if (selectedVariantId) {
          const variant = option.variants.find((v) => v.id === selectedVariantId);
          if (variant && variant.priceModifier) {
            totalModifier += variant.priceModifier;
          }
        }
      });
    }

    const finalPrice = basePrice + totalModifier;
    return formatPrice(finalPrice);
  };

  // تغییر variant انتخاب شده
  const handleVariantChange = (optionType: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [optionType]: variantId,
    }));
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-gray-500 text-lg mb-4">محصول یافت نشد</p>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-2 bg-[#7e4bd0] text-white rounded-lg"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white min-h-screen pb-32">
      <WalletHeader
        greeting="سلام ، محمد"
        subtitle="مشاهده اطلاعات کامل محصول"
        icon={<ShoppingBagIcon className="w-5 h-5 text-[#7e4bd0]" />}
      />

      <div className="px-4 flex flex-col gap-4">
        {/* Breadcrumb and Share */}
        <div className="flex bg-gray-100 p-2 rounded-lg items-center justify-between mt-2">
          <Breadcrumb
            items={[
              {
                label: "فروشگاه",
                onClick: () => navigate("/shop"),
              },
              {
                label: product.title,
                disabled: true,
              },
            ]}
            separator="/"
            className="text-sm"
          />
          <button className="p-2 bg-gray-100 rounded-full text-gray-700">
            <ArrowUpTrayIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <ShoppingBagIcon className="w-4 h-4 text-gray-500" />
            <p className="text-xs text-gray-500">فروشگاه دیجی پلی</p>
          </div>

          <h1 className="text-xl font-bold text-black">{product.title}</h1>

          {product.description && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-sm font-semibold text-black mb-2">
                توضیحات محصول
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Product Variants */}
          {product.variantOptions && product.variantOptions.length > 0 && (
            <div className="flex flex-col gap-4">
              {product.variantOptions.map((option) => {
                const selectedVariantId = selectedVariants[option.type];
                return (
                  <div key={option.type} className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-black">
                      {option.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {option.variants.map((variant) => {
                        const isSelected = selectedVariantId === variant.id;
                        const isColorVariant = option.type === "color";
                        
                        return (
                          <button
                            key={variant.id}
                            onClick={() => handleVariantChange(option.type, variant.id)}
                            className={`
                              ${isColorVariant ? 'w-10 h-10' : 'px-4 py-2'}
                              rounded-lg border-2 transition-all
                              ${isSelected 
                                ? 'border-[#7e4bd0] bg-[#7e4bd0]' 
                                : 'border-gray-300 bg-white hover:border-gray-400'
                              }
                              ${variant.available === false ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                            disabled={variant.available === false}
                            style={
                              isColorVariant
                                ? {
                                    backgroundColor: variant.colorCode || variant.value,
                                    borderColor: isSelected ? '#7e4bd0' : (variant.colorCode || variant.value),
                                  }
                                : undefined
                            }
                          >
                            {!isColorVariant && (
                              <span
                                className={`text-sm ${
                                  isSelected ? 'text-white font-semibold' : 'text-gray-700'
                                }`}
                              >
                                {variant.name}
                              </span>
                            )}
                            {isColorVariant && isSelected && (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {selectedVariantId && (
                      (() => {
                        const selectedVariant = option.variants.find(
                          (v) => v.id === selectedVariantId
                        );
                        if (selectedVariant?.priceModifier && selectedVariant.priceModifier !== 0) {
                          return (
                            <p className="text-xs text-gray-500">
                              {selectedVariant.priceModifier > 0 ? "+" : ""}
                              {formatPrice(selectedVariant.priceModifier)} تومان
                            </p>
                          );
                        }
                        return null;
                      })()
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Sellers Section */}
          {product.sellers && product.sellers.length > 0 && (
            <div className="flex flex-col gap-3 mt-4">
              <h2 className="text-base font-semibold text-black">فروشندگان</h2>
              <div className="flex flex-col gap-2">
                {product.sellers.map((seller, index) => (
                  <div
                    key={seller.id}
                    className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white ${
                      index === 0 ? 'border-[#7e4bd0] bg-purple-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {/* Seller Icon */}
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        {seller.isVerified ? (
                          <CheckCircleIcon className="w-6 h-6 text-green-500" />
                        ) : (
                          <ShoppingBagIcon className="w-5 h-5 text-gray-500" />
                        )}
                      </div>

                      {/* Seller Info */}
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-black truncate">
                            {seller.name}
                          </h3>
                          {seller.badges && seller.badges.length > 0 && (
                            <div className="flex gap-1 shrink-0">
                              {seller.badges.map((badge, badgeIndex) => (
                                <span
                                  key={badgeIndex}
                                  className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full whitespace-nowrap"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {seller.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              امتیاز: {seller.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex flex-col items-end">
                          <p className="text-base font-bold text-black">
                            {seller.price}
                          </p>
                          <p className="text-xs text-gray-500">تومان</p>
                        </div>
                        <ChevronLeftIcon className="w-5 h-5 text-gray-400 shrink-0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Specifications Section */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-black">مشخصات کالا</h2>
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  مشاهده همه <span className="inline-block">›</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.specifications.slice(0, 3).map((spec, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-[calc(33.333%-0.5rem)] bg-white border border-gray-200 rounded-lg p-3"
                  >
                    <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                    <p className="text-sm font-semibold text-black">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Price and Action Buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full  bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        {/* Price */}
        <div className="flex items-center w-full justify-between pb-4">
          <div className="flex items-center  w-full justify-between gap-1">
            <p className="text-xs text-gray-500">قیمت</p>
            <div className="flex items-center gap-1">
              <p className="text-2xl font-bold text-black">
                {calculateFinalPrice()}
              </p>
              <p className="text-sm text-gray-500">تومان</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex-1 py-3 bg-[#7e4bd0] text-white rounded-lg font-semibold text-sm">
            افزودن به سبد خرید
          </button>
          <button className="px-6 py-3 border-2 border-[#7e4bd0] text-[#7e4bd0] rounded-lg font-semibold text-sm flex items-center justify-center">
            <HeartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

