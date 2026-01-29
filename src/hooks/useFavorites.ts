import { useLocalStorage } from './useLocalStorage';

export interface FavoriteItem {
  productId: string;
  title: string;
  image: string;
  price: string;
  categoryId?: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>('favorites', []);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prevItems) => {
      // بررسی اینکه آیا این محصول در علاقه‌مندی‌ها وجود دارد
      const existingItem = prevItems.find(
        (existingItem) => existingItem.productId === item.productId
      );

      if (existingItem) {
        // اگر وجود داشت، هیچ کاری نمی‌کنیم (یا می‌توانیم پیام نمایش دهیم)
        return prevItems;
      } else {
        // اگر وجود نداشت، محصول جدید را اضافه می‌کنیم
        return [...prevItems, item];
      }
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prevItems) => {
      return prevItems.filter((item) => item.productId !== productId);
    });
  };

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prevItems) => {
      const existingItem = prevItems.find(
        (existingItem) => existingItem.productId === item.productId
      );

      if (existingItem) {
        // اگر وجود داشت، حذف می‌کنیم
        return prevItems.filter((prevItem) => prevItem.productId !== item.productId);
      } else {
        // اگر وجود نداشت، اضافه می‌کنیم
        return [...prevItems, item];
      }
    });
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.some((item) => item.productId === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}

