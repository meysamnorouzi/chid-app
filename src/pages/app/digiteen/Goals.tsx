import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PlusIcon, ShoppingBagIcon, TrashIcon, FolderPlusIcon } from "@heroicons/react/24/outline";
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
    <div className="w-full bg-white flex flex-col pb-24 overflow-hidden">
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <DigiteenTabs activeTab="goals" />
      </div>

      <div className="px-4 flex-1 overflow-y-auto min-h-0">
        {/* Banner - مثل Friends */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-4 flex items-center justify-between gap-4 p-6 rounded-2xl bg-linear-to-r from-[#7e4bd0] to-[#9d6ff3] relative overflow-hidden"
        >
          <div className="flex flex-col w-[70%] relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="font-bold text-[18px] text-white"
            >
              اهداف خریدت رو مشخص کن
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-semibold text-sm text-white/90 mt-1"
            >
              از علاقه‌مندی‌ها به دسته‌بندی هدف اضافه کن
            </motion.p>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            src="/image/Ahdaf.png"
            alt="اهداف"
            className="w-[28%] shrink-0 object-contain relative z-10"
          />
        </motion.div>

        {/* دسته‌بندی‌ها - سبک Friends (rounded-2xl, bg-gray-50/50) */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="mt-6 py-4 rounded-2xl bg-gray-50/50"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-gray-700">دسته‌بندی‌ها</h2>
              <motion.button
                onClick={openCreateCategory}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 bg-[#7e4bd0] text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#6b3fb8] transition-all"
              >
                <FolderPlusIcon className="w-4 h-4" />
                <span>دسته‌بندی جدید</span>
              </motion.button>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((c, index) => {
                const isActive = c.id === selectedCategoryId;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.05, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 shadow-sm ${
                      isActive ? "border-[#7e4bd0] bg-purple-50/80" : "border-gray-200 bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setSelectedCategoryId(c.id)}
                      className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${isActive ? "text-[#7e4bd0]" : "text-gray-600 hover:text-[#7e4bd0]"}`}
                    >
                      {c.name}
                      <span className={`text-xs ${isActive ? "text-[#7e4bd0]/80" : "text-gray-400"}`}>
                        ({c.items.length})
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCategory(c.id, c.name);
                      }}
                      className="p-1 hover:bg-red-50 rounded-lg transition-colors group"
                      aria-label={`حذف دسته‌بندی ${c.name}`}
                    >
                      <TrashIcon className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* لیست اهداف - سبک Friends (rounded-2xl, کارت‌ها با border-2 و rounded-xl) */}
        {selectedCategory && selectedCategory.items.length > 0 ? (
         <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
         className="mt-6 py-5"
       >
         {/* Header */}
         <div className="flex items-center justify-between mb-3">
           <h2 className="font-semibold text-xl text-gray-800">
             اهداف {selectedCategory.name}
           </h2>
       
           <motion.button
             onClick={handleOpenModal}
             whileTap={{ scale: 0.97 }}
             className="px-4 py-2 bg-gradient-to-r from-[#7e4bd0] to-[#9d6ff3] text-white rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-all text-sm shadow-sm"
           >
             <PlusIcon className="w-4 h-4" />
             <span>افزودن هدف</span>
           </motion.button>
         </div>
       
         <div className="flex flex-col gap-3">
           {selectedCategory.items.map((goal, index) => {
             const progress = calculateProgress(goal.price);
             const productPrice = parsePrice(goal.price);
             const remaining = Math.max(0, productPrice - walletBalance);
             const isReached = progress === 100;
       
             return (
               <motion.div
                 key={goal.productId}
                 initial={{ opacity: 0, y: 12 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{
                   duration: 0.35,
                   delay: 0.25 + index * 0.05,
                   ease: "easeOut",
                 }}
                 whileHover={{ y: -2 }}
                 className="group p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
               >
                 <div className="flex gap-4">
                   {/* Image */}
                   <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:ring-2 ring-violet-100 transition-all">
                     <img
                       src={goal.image}
                       alt={goal.title}
                       className="w-full h-full object-cover"
                     />
       
                     {isReached && (
                       <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent" />
                     )}
                   </div>
       
                   {/* Info */}
                   <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                     <div className="flex items-center gap-1">
                       <ShoppingBagIcon className="w-3 h-3 text-gray-400" />
                       <p className="text-xs text-gray-500">فروشگاه دیجی تین</p>
                     </div>
       
                     <h3 className="text-sm font-bold text-gray-800 line-clamp-2">
                       {goal.title}
                     </h3>
       
                     <div className="flex items-center gap-1">
                       <p className="text-base font-black text-gray-900">
                         {goal.price}
                       </p>
                       <p className="text-xs text-gray-400">تومان</p>
                     </div>
                   </div>
       
                   {/* Delete */}
                   <motion.button
                     whileTap={{ scale: 0.95 }}
                     onClick={() =>
                       handleRemoveGoal(selectedCategory.id, goal.productId)
                     }
                     className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shrink-0"
                     aria-label="حذف از اهداف"
                   >
                     <TrashIcon className="w-5 h-5" />
                   </motion.button>
                 </div>
       
                 {/* Progress Section */}
                 <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-semibold text-gray-600">
                       پیشرفت خرید
                     </span>
       
                     <span className="text-sm font-black text-violet-600">
                       {progress}%
                     </span>
                   </div>
       
                   <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                     <motion.div
                       initial={{ width: 0 }}
                       animate={{ width: `${progress}%` }}
                       transition={{ duration: 0.6, ease: "easeOut" }}
                       className="h-full rounded-full bg-gradient-to-r from-[#7e4bd0] to-[#9d6ff3]"
                     />
                   </div>
       
                   <div className="flex items-center justify-between mt-3 text-xs">
                     <span className="text-gray-500">
                       موجودی:
                       <span className="font-semibold text-gray-800 mr-1">
                         {formatPrice(walletBalance)} تومان
                       </span>
                     </span>
       
                     {remaining > 0 && (
                       <span className="text-amber-600 font-semibold">
                         باقیمانده: {formatPrice(remaining)} تومان
                       </span>
                     )}
       
                     {isReached && (
                       <span className="flex items-center gap-1 text-emerald-600 font-bold">
                         <svg
                           className="w-4 h-4"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                         >
                           <path
                             fillRule="evenodd"
                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                             clipRule="evenodd"
                           />
                         </svg>
                         قابل خرید
                       </span>
                     )}
                   </div>
                 </div>
               </motion.div>
             );
           })}
         </div>
       </motion.div>
       
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="p-6 rounded-2xl bg-gray-50/50 flex flex-col items-center justify-center py-12 gap-4"
          >
            <img src="/gif/Ahdaf.gif" alt="empty-goals" className="w-[50%] max-w-[200px]" />
            <div className="flex flex-col items-center gap-2 w-full">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {selectedCategory ? "این دسته‌بندی هنوز هدفی ندارد" : "اول یک دسته‌بندی بساز"}
              </h2>
              <p className="text-sm text-gray-500 text-center px-4">
                {selectedCategory
                  ? "محصولات مورد علاقه‌ات رو به عنوان هدف به این دسته‌بندی اضافه کن"
                  : "بعد از ساخت دسته‌بندی، می‌تونی محصول اضافه کنی"}
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={selectedCategory ? handleOpenModal : openCreateCategory}
              className="w-full mt-2 py-4 bg-[#7e4bd0] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#6b3fb8] transition-all shadow-sm"
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
            </motion.button>
          </motion.div>
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
                    <motion.div
                      key={item.productId}
                      onClick={() => !alreadyInGoals && handleToggleSelection(item.productId)}
                      whileHover={!alreadyInGoals ? { scale: 1.01 } : undefined}
                      whileTap={!alreadyInGoals ? { scale: 0.99 } : undefined}
                      className={`bg-white border-2 rounded-xl p-4 cursor-pointer transition-all shadow-sm ${alreadyInGoals
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
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 ${isSelected
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
                    </motion.div>
                  );
                })}
              </div>

              {/* Confirm Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={selectedProducts.length === 0}
                className={`w-full py-4 rounded-xl font-semibold transition-colors ${selectedProducts.length > 0
                    ? "bg-[#7e4bd0] text-white hover:bg-[#6b3fb8]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                تایید و افزودن ({selectedProducts.length})
              </motion.button>
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
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setCategoryToDelete(null);
              }}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              انصراف
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={confirmDeleteCategory}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
            >
              حذف دسته‌بندی
            </motion.button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Goals;

