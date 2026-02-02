/**
 * PWA Install Prompt
 * Shows "Add to Home Screen" when the app is installable and not yet installed.
 */

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed (standalone / display-mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as { standalone?: boolean }).standalone === true
      || document.referrer.includes('android-app://');
    setIsInstalled(isStandalone);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const dismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const t = Number(dismissed);
      if (Date.now() - t < 7 * 24 * 60 * 60 * 1000) setShowPrompt(false); // Don't show again for 7 days
    }
  }, []);

  if (!showPrompt || !deferredPrompt || isInstalled) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[9998] p-4 rounded-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
      style={{ direction: 'rtl' }}
      role="dialog"
      aria-label="نصب اپلیکیشن"
    >
      <div className="flex items-center gap-3">
        <img src="/logo/logo.svg" alt="" className="w-12 h-12 shrink-0" aria-hidden />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Digiteen را نصب کنید</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">دسترسی سریع از صفحه اصلی</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={handleInstall}
          className="flex-1 px-4 py-2 rounded-lg bg-[#7653AE] text-white text-sm font-medium hover:opacity-90"
        >
          نصب
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          بعداً
        </button>
      </div>
    </div>
  );
}
