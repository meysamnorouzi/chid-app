import { useState, useEffect, useMemo } from "react";
import { PlusIcon, ShoppingBagIcon, TrashIcon, FolderPlusIcon } from "@heroicons/react/24/outline";
import { WalletHeader } from "../../../components/shared/Wallet";
import { DigiteenTabs } from "../../../components/shared/DigiteenTabs";
import Modal from "../../../components/shared/Modal";
import { useFavorites } from "../../../hooks/useFavorites";
import { useGoals } from "../../../hooks/useGoals";
import { useToast } from "../../../components/shared";
import { parsePrice, formatPrice } from "../../../utils/priceUtils";

const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const { favorites } = useFavorites();
  const { categories, addCategory, addToCategory, removeFromCategory, removeCategory, isGoal } = useGoals();
  const { showToast } = useToast();

  const selectedCategory = useMemo(() => {
    if (!selectedCategoryId) return null;
    return categories.find((c) => c.id === selectedCategoryId) ?? null;
  }, [categories, selectedCategoryId]);

  // Auto-select first category
  useEffect(() => {
    if (categories.length === 0) {
      setSelectedCategoryId(null);
      return;
    }
    if (!selectedCategoryId || !categories.some((c) => c.id === selectedCategoryId)) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  // Load wallet balance
  useEffect(() => {
    const loadWalletBalance = () => {
      const parentWalletKey = "parentWallet";
      const storedParentWallet = localStorage.getItem(parentWalletKey);
      
      if (storedParentWallet) {
        const walletData = JSON.parse(storedParentWallet);
        setWalletBalance(walletData.money || 0);
      } else {
        const defaultWallet = {
          money: 10000000,
          digits: 1000,
        };
        localStorage.setItem(parentWalletKey, JSON.stringify(defaultWallet));
        setWalletBalance(defaultWallet.money);
      }
    };
    
    loadWalletBalance();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadWalletBalance();
    };
    
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadWalletBalance, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Calculate progress percentage for a goal
  const calculateProgress = (price: string): number => {
    const productPrice = parsePrice(price);
    if (productPrice === 0) return 0;
    const percentage = Math.min((walletBalance / productPrice) * 100, 100);
    return Math.round(percentage);
  };

  const openCreateCategory = () => {
    setNewCategoryName("");
    setIsCategoryModalOpen(true);
  };

  const handleCreateCategory = () => {
    const id = addCategory(newCategoryName);
    if (!id) {
      showToast({
        type: "warning",
        title: "هشدار",
        message: "لطفاً یک اسم برای دسته‌بندی وارد کنید",
        duration: 3000,
      });
      return;
    }
    setSelectedCategoryId(id);
    setIsCategoryModalOpen(false);
    showToast({
      type: "success",
      title: "موفق",
      message: "دسته‌بندی ساخته شد",
      duration: 2500,
    });
  };

  const handleToggleSelection = (productId: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedProducts.length === 0) {
      showToast({
        type: 'warning',
        title: 'هشدار',
        message: 'لطفاً حداقل یک محصول انتخاب کنید',
        duration: 3000,
      });
      return;
    }

    if (!selectedCategoryId) {
      showToast({
        type: "warning",
        title: "هشدار",
        message: "اول یک دسته‌بندی بساز و انتخاب کن",
        duration: 3000,
      });
      setIsModalOpen(false);
      setSelectedProducts([]);
      setIsCategoryModalOpen(true);
      return;
    }

    const productsToAdd = favorites.filter((fav) =>
      selectedProducts.includes(fav.productId)
    );

    addToCategory(selectedCategoryId, productsToAdd);
    
    showToast({
      type: 'success',
      title: 'موفق',
      message: `${productsToAdd.length} محصول به دسته‌بندی اضافه شد`,
      duration: 3000,
    });

    setSelectedProducts([]);
    setIsModalOpen(false);
  };

  const handleRemoveGoal = (categoryId: string, productId: string) => {
    removeFromCategory(categoryId, productId);
    showToast({
      type: 'success',
      title: 'موفق',
      message: 'محصول از اهداف حذف شد',
      duration: 3000,
    });
  };

  const handleRemoveCategory = (categoryId: string, categoryName: string) => {
    setCategoryToDelete({ id: categoryId, name: categoryName });
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return;
    
    removeCategory(categoryToDelete.id);
    
    // اگر دسته‌بندی حذف شده، انتخاب شده بود، اولین دسته‌بندی باقی‌مانده رو انتخاب کن
    if (selectedCategoryId === categoryToDelete.id) {
      const remaining = categories.filter((c) => c.id !== categoryToDelete.id);
      setSelectedCategoryId(remaining.length > 0 ? remaining[0].id : null);
    }
    
    showToast({
      type: "success",
      title: "موفق",
      message: `دسته‌بندی «${categoryToDelete.name}» حذف شد`,
      duration: 3000,
    });

    setIsDeleteConfirmModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleOpenModal = () => {
    if (favorites.length === 0) {
      showToast({
        type: 'warning',
        title: 'هشدار',
        message: 'لیست علاقه‌مندی‌های شما خالی است',
        duration: 3000,
      });
      return;
    }
    if (categories.length === 0) {
      showToast({
        type: "warning",
        title: "هشدار",
        message: "اول یک دسته‌بندی بساز تا بتونی محصول اضافه کنی",
        duration: 3500,
      });
      openCreateCategory();
      return;
    }
    if (!selectedCategoryId) {
      openCreateCategory();
      return;
    }
    setSelectedProducts([]);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32 overflow-hidden">
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <WalletHeader subtitle="@mohammad-mehrabi" />
        <DigiteenTabs activeTab="goals" />
      </div>
      <div className="px-4 mt-8 flex-1 overflow-y-auto min-h-0 flex flex-col gap-4">
        {/* Categories */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">دسته‌بندی‌ها</h2>
          <button
            onClick={openCreateCategory}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors text-sm"
          >
            <FolderPlusIcon className="w-4 h-4" />
            <span>دسته‌بندی جدید</span>
          </button>
        </div>

        {categories.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((c) => {
              const isActive = c.id === selectedCategoryId;
              return (
                <div
                  key={c.id}
                  className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border transition-colors text-sm font-semibold ${
                    isActive
                      ? "bg-purple-50 border-[#7e4bd0] text-[#7e4bd0]"
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => setSelectedCategoryId(c.id)}
                    className="flex items-center gap-1"
                  >
                    {c.name}
                    <span className="text-xs text-gray-400">({c.items.length})</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCategory(c.id, c.name);
                    }}
                    className="mr-1 p-1 hover:bg-red-50 rounded-full transition-colors group"
                    aria-label={`حذف دسته‌بندی ${c.name}`}
                  >
                    <TrashIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              برای شروع، اول یک دسته‌بندی بساز. بعد می‌تونی هر تعداد محصول خواستی بهش اضافه کنی.
            </p>
            <button
              onClick={openCreateCategory}
              className="mt-3 w-full py-3 bg-[#7e4bd0] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#6b3fb8] transition-colors shadow-md"
            >
              <FolderPlusIcon className="w-5 h-5" />
              <span>ساخت دسته‌بندی</span>
            </button>
          </div>
        )}

        {/* Goals List */}
        {selectedCategory && selectedCategory.items.length > 0 ? (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">اهداف {selectedCategory.name}</h2>
              <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-[#7e4bd0] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#6b3fb8] transition-colors shadow-md text-sm"
              >
                <PlusIcon className="w-4 h-4" />
                <span>افزودن هدف جدید</span>
              </button>
            </div>
            {selectedCategory.items.map((goal) => {
              const progress = calculateProgress(goal.price);
              const productPrice = parsePrice(goal.price);
              const remaining = Math.max(0, productPrice - walletBalance);
              
              return (
                <div
                  key={goal.productId}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#7e4bd0] transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={goal.image}
                        alt={goal.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <div className="flex items-center gap-1">
                        <ShoppingBagIcon className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">فروشگاه دیجی تین</p>
                      </div>

                      <h3 className="text-sm font-semibold text-black line-clamp-2">
                        {goal.title}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-1">
                        <p className="text-base font-bold text-black">{goal.price}</p>
                        <p className="text-xs text-gray-500">تومان</p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveGoal(selectedCategory.id, goal.productId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      aria-label="حذف از اهداف"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress Bar Section */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#7e4bd0]"></div>
                        <span className="text-xs font-semibold text-gray-700">
                          پیشرفت خرید
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#7e4bd0]">
                        {progress}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 right-0 h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${progress}%`,
                          background: progress === 100
                            ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                            : 'linear-gradient(90deg, #7e4bd0 0%, #a855f7 50%, #c084fc 100%)',
                          boxShadow: progress > 0 
                            ? '0 2px 8px rgba(126, 75, 208, 0.4)' 
                            : 'none',
                        }}
                      >
                        {progress > 20 && (
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        )}
                      </div>
                      {progress < 100 && progress > 0 && (
                        <div 
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                            animation: 'shimmer 2s infinite',
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Progress Info */}
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>موجودی:</span>
                        <span className="font-semibold text-gray-800">
                          {formatPrice(walletBalance)} تومان
                        </span>
                      </div>
                      {remaining > 0 && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <span>باقیمانده:</span>
                          <span className="font-semibold">
                            {formatPrice(remaining)} تومان
                          </span>
                        </div>
                      )}
                      {progress === 100 && (
                        <div className="flex items-center gap-1 text-green-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">قابل خرید</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4 mt-8">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <PlusIcon className="w-12 h-12 text-gray-400" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold text-black">
                {selectedCategory ? "این دسته‌بندی هنوز هدفی ندارد" : "اول یک دسته‌بندی بساز"}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                {selectedCategory
                  ? "محصولات مورد علاقه‌ات رو به عنوان هدف به این دسته‌بندی اضافه کن"
                  : "بعد از ساخت دسته‌بندی، می‌تونی محصول اضافه کنی"}
              </p>
            </div>
            {/* Add Goal Button */}
            <button
              onClick={selectedCategory ? handleOpenModal : openCreateCategory}
              className="w-full max-w-xs py-4 bg-[#7e4bd0] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#6b3fb8] transition-colors shadow-md mt-4"
            >
              {selectedCategory ? (
                <>
                  <PlusIcon className="w-5 h-5" />
                  <span>افزودن هدف جدید</span>
                </>
              ) : (
                <>
                  <FolderPlusIcon className="w-5 h-5" />
                  <span>ساخت دسته‌بندی</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Modal for creating category */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="ساخت دسته‌بندی جدید"
        maxHeight="70vh"
      >
        <div className="flex flex-col gap-4">
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              اول اسم دسته‌بندی رو بساز (مثلاً: «گجت‌ها»، «کتاب‌ها»، «اسباب‌بازی‌ها»)، بعد هرچقدر خواستی محصول بهش اضافه کن.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800">اسم دسته‌بندی</label>
            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="مثلاً: گجت‌ها"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#7e4bd0] text-sm"
            />
          </div>

          <button
            onClick={handleCreateCategory}
            className="w-full py-4 bg-[#7e4bd0] text-white rounded-xl font-semibold hover:bg-[#6b3fb8] transition-colors shadow-md"
          >
            ساخت و انتخاب دسته‌بندی
          </button>
        </div>
      </Modal>

      {/* Modal for selecting favorites */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProducts([]);
        }}
        title={
          selectedCategory
            ? `انتخاب محصول برای «${selectedCategory.name}»`
            : "انتخاب محصول از علاقه‌مندی‌ها"
        }
        maxHeight="85vh"
      >
        <div className="flex flex-col gap-4">
          {favorites.length > 0 ? (
            <>
              <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
                {favorites.map((item) => {
                  const isSelected = selectedProducts.includes(item.productId);
                  const alreadyInGoals = isGoal(item.productId);

                  return (
                    <div
                      key={item.productId}
                      onClick={() => !alreadyInGoals && handleToggleSelection(item.productId)}
                      className={`bg-white border rounded-lg p-4 cursor-pointer transition-all ${
                        alreadyInGoals
                          ? "border-gray-300 opacity-60 cursor-not-allowed"
                          : isSelected
                          ? "border-[#7e4bd0] bg-purple-50"
                          : "border-gray-200 hover:border-[#7e4bd0]"
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        {/* Checkbox */}
                        {!alreadyInGoals && (
                          <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-[#7e4bd0] border-[#7e4bd0]"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        )}

                        {/* Product Image */}
                        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col gap-2 min-w-0">
                          {alreadyInGoals && (
                            <span className="text-xs text-[#7e4bd0] font-medium">
                              قبلاً به اهداف اضافه شده
                            </span>
                          )}
                          <h3 className="text-sm font-semibold text-black line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-1">
                            <p className="text-base font-bold text-black">{item.price}</p>
                            <p className="text-xs text-gray-500">تومان</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                disabled={selectedProducts.length === 0}
                className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                  selectedProducts.length > 0
                    ? "bg-[#7e4bd0] text-white hover:bg-[#6b3fb8]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                تایید و افزودن ({selectedProducts.length})
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <p className="text-gray-500 text-center">
                لیست علاقه‌مندی‌های شما خالی است
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={() => {
          setIsDeleteConfirmModalOpen(false);
          setCategoryToDelete(null);
        }}
        title="تایید حذف دسته‌بندی"
        maxHeight="50vh"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 text-center">
              آیا مطمئنی که می‌خوای دسته‌بندی
            </p>
            <p className="text-lg font-bold text-[#7e4bd0] text-center">
              «{categoryToDelete?.name}»
            </p>
            <p className="text-gray-700 text-center">
              رو حذف کنی؟
            </p>
            <p className="text-sm text-red-600 text-center mt-2">
              ⚠️ تمام محصولات این دسته‌بندی هم حذف می‌شن
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setCategoryToDelete(null);
              }}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              انصراف
            </button>
            <button
              onClick={confirmDeleteCategory}
              className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              حذف دسته‌بندی
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Goals;

