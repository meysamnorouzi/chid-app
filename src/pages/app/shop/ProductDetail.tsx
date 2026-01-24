import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  ArrowUpTrayIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import WalletHeader from "../../../components/shared/Wallet/WalletHeader";
import { Breadcrumb, Chips, useToast } from "../../../components/shared";
import { useCart } from "../../../hooks/useCart";
import { formatPrice, parsePrice } from "../../../utils/priceUtils";

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

interface UserReview {
  id: string;
  userName: string;
  isBuyer: boolean; // آیا خریدار است
  rating: number; // امتیاز از 1 تا 5
  text: string; // متن دیدگاه
  date: string; // تاریخ دیدگاه
}

interface ReviewSummary {
  overallRating: number; // امتیاز کلی
  totalReviews: number; // تعداد کل دیدگاه‌ها
  buyerReviewsCount: number; // تعداد دیدگاه‌های خریداران
  aiSummary?: string; // خلاصه دیدگاه‌ها تولید شده با AI
}

interface Product {
  id: string;
  image: string;
  images?: string[]; // لیست تصاویر محصول برای carousel
  title: string;
  price: string;
  isFavorite?: boolean;
  categoryId?: string;
  description?: string;
  variantOptions?: ProductVariantOption[]; // گزینه‌های variant محصول
  sellers?: Seller[]; // لیست فروشندگان و قیمت‌های آن‌ها
  specifications?: ProductSpecification[]; // مشخصات محصول
  reviews?: {
    summary: ReviewSummary;
    userReviews: UserReview[];
  };
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
          images: [
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
            "https://dkstatics-public.digikala.com/digikala-products/5d3dd3e71dc621bb60c9fecfdfe83237b4e74159_1746056905.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          ],
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
          reviews: {
            summary: {
              overallRating: 4.6,
              totalReviews: 209,
              buyerReviewsCount: 262,
              aiSummary: "کنسول بازی با قابلیت بازی آنلاین و دو دسته اضافه. این محصول یک محصول پرچم‌دار با طراحی با کیفیت، عملکرد قدرتمند و تجربه گیمینگ بهتر است. مناسب برای کاربران حرفه‌ای، گیمرها و تولیدکنندگان محتوا.",
            },
            userReviews: [
              {
                id: "review1",
                userName: "کاربر دیجی پلی",
                isBuyer: true,
                rating: 5,
                text: "درباره نقاط قوت و ضعف این محصول باید بگویم که تخصصی و فنی زیادی در طراحی و عملکرد دارد. تجربه خرید باید بگم از فروشگاه عالی بود و محصول به موقع رسید.",
                date: "۲۱ دی ۱۴۰۴",
              },
              {
                id: "review2",
                userName: "کاربر دیجی پلی",
                isBuyer: true,
                rating: 4,
                text: "محصول خوبی است اما قیمت کمی بالا است. کیفیت ساخت عالی است و عملکرد خوبی دارد.",
                date: "۱۸ دی ۱۴۰۴",
              },
            ],
          },
        },
        {
          id: "2",
          image:
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
          images: [
            "https://dkstatics-public.digikala.com/digikala-products/c83ed1542213c501b673031e33e4faa53a6791dc_1750576597.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
            "https://dkstatics-public.digikala.com/digikala-products/2a4a9b54fe7e10129644d6a9a54268c2208580c4_1758041894.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
            "https://dkstatics-public.digikala.com/digikala-products/4ba5899a913140dddf69798fc936ff8c565af35f_1763455046.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
          ],
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
          reviews: {
            summary: {
              overallRating: 4.7,
              totalReviews: 156,
              buyerReviewsCount: 189,
              aiSummary: "لپ تاپ گیمینگ ایسوس با پردازنده قدرتمند و کارت گرافیک اختصاصی. این محصول یک لپ تاپ گیمینگ حرفه‌ای با طراحی با کیفیت، صفحه نمایش عالی و عملکرد فوق‌العاده است. مناسب برای گیمرها، طراحان گرافیک و کاربران حرفه‌ای که به عملکرد بالا نیاز دارند.",
            },
            userReviews: [
              {
                id: "review1",
                userName: "کاربر دیجی پلی",
                isBuyer: true,
                rating: 5,
                text: "لپ تاپ فوق‌العاده‌ای است! کارت گرافیک NVIDIA خیلی قوی است و بازی‌های سنگین را بدون مشکل اجرا می‌کند. صفحه نمایش ۱۷ اینچی هم کیفیت عالی دارد. تنها نکته منفی وزن آن است که کمی سنگین است.",
                date: "۲۵ دی ۱۴۰۴",
              },
              {
                id: "review2",
                userName: "کاربر دیجی پلی",
                isBuyer: true,
                rating: 4,
                text: "لپ تاپ خوبی است و عملکرد مناسبی دارد. برای کارهای گرافیکی و بازی مناسب است. اما باتری خیلی دوام نمی‌آورد و باید همیشه به برق وصل باشد.",
                date: "۲۰ دی ۱۴۰۴",
              },
              {
                id: "review3",
                userName: "کاربر دیجی پلی",
                isBuyer: true,
                rating: 5,
                text: "بهترین لپ تاپ گیمینگی که تا حالا داشتم. پردازنده AMD Ryzen 9 خیلی قدرتمند است و همه بازی‌ها را با تنظیمات بالا اجرا می‌کند. صفحه کلید RGB هم خیلی زیبا است.",
                date: "۱۵ دی ۱۴۰۴",
              },
            ],
          },
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


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allProducts = getAllProducts();
  const product = allProducts.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // State برای variant های انتخاب شده
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  
  // State برای carousel تصاویر محصول
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State برای modal بزرگنمایی تصویر
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  // لیست تصاویر محصول
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
    ? [product.image] 
    : [];
  
  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);
  
  // Navigation functions
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };
  
  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };
  
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  // Add to cart handler
  const handleAddToCart = () => {
    if (!product) return;
    
    const finalPrice = calculateFinalPrice();
    
    // پیدا کردن فروشنده اول (ارزان‌ترین یا پیش‌فرض)
    const selectedSeller = product.sellers && product.sellers.length > 0 
      ? product.sellers[0] 
      : null;
    
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      selectedVariants: selectedVariants,
      finalPrice: finalPrice,
      sellerId: selectedSeller?.id,
      sellerName: selectedSeller?.name || "فروشگاه دیجی پلی",
      shopName: "فروشگاه دیجی پلی",
    });
    
    // Show success toast message
    showToast({
      type: 'success',
      title: 'موفق',
      message: 'محصول به سبد خرید اضافه شد',
      duration: 3000,
    });
  };
  
  // Modal functions
  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setIsImageModalOpen(true);
  };
  
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };
  
  const goToNextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % productImages.length);
  };
  
  const goToPreviousModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

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

  // پیدا کردن محصولات مشابه بر اساس categoryId
  const getSimilarProducts = (): Product[] => {
    if (!product || !product.categoryId) return [];
    
    const similar = allProducts
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 10); // حداکثر 10 محصول مشابه
    
    return similar;
  };

  const similarProducts = getSimilarProducts();

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
    <div className="flex flex-col bg-white min-h-screen pb-40">
      <WalletHeader
        greeting="سلام ، محمد"
        subtitle="مشاهده اطلاعات کامل محصول"
        icon={<ShoppingBagIcon className="w-5 h-5 text-[#7e4bd0]" />}
        showCartBadge={true}
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

        {/* Product Image Carousel */}
        <div className="relative w-full rounded-lg overflow-hidden">
          <div 
            className="relative w-full aspect-square overflow-hidden cursor-pointer"
            onClick={() => openImageModal(currentImageIndex)}
          >
            {/* Images Container */}
            <div 
              className="flex transition-transform duration-300 ease-in-out h-full"
              style={{ 
                transform: `translateX(-${currentImageIndex * 100}%)`,
                width: `${productImages.length * 100}%`
              }}
            >
              {productImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-full shrink-0"
                    style={{ width: `${100 / productImages.length}%` }}
                  >
                  <img
                    src={image}
                    alt={`${product.title} - تصویر ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots Indicator - Outside the image */}
          {productImages.length > 1 && (
            <div className="flex items-center justify-center w-full gap-1 mt-2">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentImageIndex === index
                      ? "bg-black w-5"
                      : "bg-gray-500 w-2 hover:bg-gray-400"
                  } h-2`}
                  aria-label={`رفتن به تصویر ${index + 1}`}
                />
              ))}
            </div>
          )}
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

          {/* User Reviews Section */}
          {product.reviews && (
            <div className="flex flex-col gap-4 mt-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  مشاهده {product.reviews.summary.totalReviews} دیدگاه <span className="inline-block">›</span>
                </button>
                <h2 className="text-base font-semibold text-black">دیدگاه کاربرها</h2>
              </div>

              {/* Overall Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-base font-semibold text-black">
                    {product.reviews.summary.overallRating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  (بر اساس نظر {product.reviews.summary.buyerReviewsCount} خریدار)
                </span>
              </div>

              {/* Review Cards - Horizontal Scroll */}
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-3" style={{ direction: 'rtl' }}>
                  {/* AI Summary Card */}
                  {product.reviews.summary.aiSummary && (
                    <div className="bg-[#7e4bd0] rounded-lg p-4 text-white shrink-0 w-[85%] min-w-[280px]">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <h3 className="text-sm font-semibold">خلاصه دیدگاه های خریداران</h3>
                      </div>
                      <p className="text-sm leading-relaxed mb-2">
                        {product.reviews.summary.aiSummary}
                      </p>
                      <button className="text-sm underline opacity-90 hover:opacity-100">
                        مشاهده بیشتر
                      </button>
                      <p className="text-xs opacity-75 mt-2">تولید شده با هوش مصنوعی</p>
                    </div>
                  )}

                  {/* User Reviews */}
                  {product.reviews.userReviews.map((review) => (
                    <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4 shrink-0 w-[85%] min-w-[280px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-black">{review.userName}</span>
                        {review.isBuyer && (
                          <>
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-xs text-gray-500">خریدار</span>
                          </>
                        )}
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-gray-700 leading-relaxed mb-2 line-clamp-3">
                        {review.text}
                      </p>

                      <button className="text-sm text-[#7e4bd0] hover:underline mb-2">
                        مشاهده بیشتر
                      </button>

                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="flex flex-col gap-3 mt-6 mb-4">
              <h2 className="text-base font-semibold text-black">محصولات مشابه</h2>
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-3" style={{ direction: 'rtl' }}>
                  {similarProducts.map((similarProduct) => (
                    <div
                      key={similarProduct.id}
                      onClick={() => navigate(`/shop/${similarProduct.id}`)}
                      className="bg-white border border-gray-200 rounded-lg p-3 shrink-0 w-[45%] min-w-[160px] cursor-pointer hover:border-[#7e4bd0] transition-colors"
                    >
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                        <img
                          src={similarProduct.image}
                          alt={similarProduct.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xs font-semibold text-black mb-1 line-clamp-2 min-h-10">
                        {similarProduct.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-bold text-black">
                            {similarProduct.price}
                          </p>
                          <p className="text-xs text-gray-500">تومان</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all z-10"
            aria-label="بستن"
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-full max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={productImages[modalImageIndex]}
              alt={`${product.title} - تصویر ${modalImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousModalImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all z-10"
                  aria-label="تصویر قبلی"
                >
                  <ChevronRightIcon className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextModalImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all z-10"
                  aria-label="تصویر بعدی"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {productImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
                {modalImageIndex + 1} / {productImages.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fixed Price and Action Buttons */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-40">
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
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 bg-[#7e4bd0] text-white rounded-lg font-semibold text-sm hover:bg-[#6b3fb8] transition-colors"
          >
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

