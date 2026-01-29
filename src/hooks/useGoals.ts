import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { FavoriteItem } from './useFavorites';

export interface GoalItem extends FavoriteItem {
  addedAt: string;
}

export interface GoalCategory {
  id: string;
  name: string;
  createdAt: string;
  items: GoalItem[];
}

const GOAL_CATEGORIES_KEY = 'goalCategories';
const LEGACY_GOALS_KEY = 'goals';

function createId(prefix = 'goalcat') {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function useGoals() {
  const [categories, setCategories] = useLocalStorage<GoalCategory[]>(GOAL_CATEGORIES_KEY, []);

  // Migrate legacy flat goals[] -> a default category
  useEffect(() => {
    try {
      const legacyRaw = window.localStorage.getItem(LEGACY_GOALS_KEY);
      if (!legacyRaw) return;
      if (categories.length > 0) return;

      const legacyGoals = JSON.parse(legacyRaw) as GoalItem[];
      if (!Array.isArray(legacyGoals) || legacyGoals.length === 0) return;

      const migrated: GoalCategory[] = [
        {
          id: createId('goalcat'),
          name: 'دسته‌بندی پیش‌فرض',
          createdAt: new Date().toISOString(),
          items: legacyGoals,
        },
      ];

      setCategories(migrated);
    } catch {
      // ignore migration errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategory = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const id = createId('goalcat');

    setCategories((prev) => [
      ...prev,
      { id, name: trimmed, createdAt: new Date().toISOString(), items: [] },
    ]);

    return id;
  };

  const removeCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  const renameCategory = (categoryId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, name: trimmed } : c))
    );
  };

  const addToCategory = (categoryId: string, item: FavoriteItem | FavoriteItem[]) => {
    const itemsToAdd = Array.isArray(item) ? item : [item];

    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;

        const newItems: GoalItem[] = [];
        itemsToAdd.forEach((it) => {
          const existsInCategory = c.items.some((x) => x.productId === it.productId);
          if (!existsInCategory) {
            newItems.push({ ...it, addedAt: new Date().toISOString() });
          }
        });

        return { ...c, items: [...c.items, ...newItems] };
      })
    );
  };

  const removeFromCategory = (categoryId: string, productId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId ? { ...c, items: c.items.filter((i) => i.productId !== productId) } : c
      )
    );
  };

  const isGoal = (productId: string): boolean => {
    return categories.some((c) => c.items.some((i) => i.productId === productId));
  };

  const clearGoals = () => {
    setCategories([]);
  };

  return {
    categories,
    addCategory,
    removeCategory,
    renameCategory,
    addToCategory,
    removeFromCategory,
    isGoal,
    clearGoals,
  };
}

