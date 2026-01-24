import { useLocalStorage } from './useLocalStorage';
import { parsePrice } from '../utils/priceUtils';

export interface CartItem {
  productId: string;
  title: string;
  image: string;
  price: string;
  quantity: number;
  selectedVariants?: Record<string, string>; // variant های انتخاب شده
  finalPrice: string; // قیمت نهایی با در نظر گیری variant ها
  sellerId?: string; // شناسه فروشنده
  sellerName?: string; // نام فروشنده
  shopName?: string; // نام فروشگاه
}

export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      // بررسی اینکه آیا این محصول با همان variant ها در سبد خرید وجود دارد
      const existingItemIndex = prevItems.findIndex(
        (existingItem) =>
          existingItem.productId === item.productId &&
          JSON.stringify(existingItem.selectedVariants) ===
            JSON.stringify(item.selectedVariants)
      );

      if (existingItemIndex >= 0) {
        // اگر وجود داشت، تعداد را افزایش می‌دهیم
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // اگر وجود نداشت، محصول جدید را اضافه می‌کنیم
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string, selectedVariants?: Record<string, string>) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => {
        if (item.productId !== productId) return true;
        if (selectedVariants) {
          return (
            JSON.stringify(item.selectedVariants) !== JSON.stringify(selectedVariants)
          );
        }
        return false;
      });
    });
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedVariants?: Record<string, string>
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariants);
      return;
    }

    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productId !== productId) return item;
        if (selectedVariants) {
          if (JSON.stringify(item.selectedVariants) !== JSON.stringify(selectedVariants)) {
            return item;
          }
        }
        return { ...item, quantity };
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = (): number => {
    if (!cartItems || cartItems.length === 0) return 0;
    
    return cartItems.reduce((total, item) => {
      if (!item.finalPrice) {
        console.warn('Item missing finalPrice:', item);
        return total;
      }
      
      const price = parsePrice(item.finalPrice);
      const itemTotal = price * item.quantity;
      
      return total + itemTotal;
    }, 0);
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };
}

