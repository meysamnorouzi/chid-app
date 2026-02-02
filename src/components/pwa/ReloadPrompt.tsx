/**
 * PWA Reload Prompt
 * Shows toast only when new content is available (needRefresh). offlineReady is ignored.
 * Uses registerType: 'prompt' so user can choose when to reload.
 */

import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      if (registration) {
        setInterval(() => registration.update(), 60 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.warn('SW registration error', error);
    },
  });

  // Ignore offlineReady: clear it so we never show any "offline ready" UI.
  useEffect(() => {
    if (offlineReady) setOfflineReady(false);
  }, [offlineReady, setOfflineReady]);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!needRefresh) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[9999] p-4 rounded-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
      style={{ direction: 'rtl' }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          محتوای جدید موجود است. برای به‌روزرسانی دکمه بارگذاری را بزنید.
        </p>
        <div className="flex gap-2 justify-end">
          {needRefresh && (
            <button
              type="button"
              onClick={() => updateServiceWorker(true)}
              className="px-4 py-2 rounded-lg bg-[#7653AE] text-white text-sm font-medium hover:opacity-90"
            >
              بارگذاری مجدد
            </button>
          )}
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
