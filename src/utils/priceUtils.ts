/**
 * Utility functions for price formatting and parsing
 */

// تابع برای تبدیل عدد به فرمت فارسی با جداکننده هزارگان
export const formatPrice = (price: number): string => {
  return price.toLocaleString("fa-IR");
};

// تابع برای تبدیل رشته قیمت فارسی به عدد
export const parsePrice = (priceStr: string): number => {
  if (!priceStr || typeof priceStr !== 'string') return 0;
  
  try {
    // تبدیل اعداد فارسی به انگلیسی
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    
    let cleaned = priceStr
      .replace(/,/g, '') // حذف کاما
      .split('')
      .map((char) => {
        const index = persianDigits.indexOf(char);
        return index >= 0 ? englishDigits[index] : char;
      })
      .join('')
      .replace(/[^\d]/g, '') // حذف هر کاراکتر غیر عددی
      .trim();
    
    if (!cleaned) return 0;
    
    const result = Number(cleaned);
    return isNaN(result) ? 0 : result;
  } catch (error) {
    console.error('Error parsing price:', priceStr, error);
    return 0;
  }
};

