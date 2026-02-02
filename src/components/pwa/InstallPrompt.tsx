/**
 * PWA Install Prompt
 * - Android/Chrome: uses beforeinstallprompt, shows "نصب" button.
 * - iOS Safari: no beforeinstallprompt; shows instructions (Share → Add to Home Screen).
 */

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pwa-install-dismissed';
const DISMISS_DAYS = 7;

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as { standalone?: boolean }).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    const installed = isStandalone();
    setIsInstalled(installed);
    if (installed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // iOS: no beforeinstallprompt; show instructions after a short delay so we don't flash on non‑iOS
    const isIos = isIOS();
    if (isIos) {
      const dismissed = localStorage.getItem(DISMISS_KEY);
      const t = dismissed ? Number(dismissed) : 0;
      if (!dismissed || Date.now() - t >= DISMISS_DAYS * 24 * 60 * 60 * 1000) {
        setShowIOSHint(true);
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const t = Number(dismissed);
      if (Date.now() - t < DISMISS_DAYS * 24 * 60 * 60 * 1000) {
        setShowPrompt(false);
        setShowIOSHint(false);
      }
    }
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
    setShowIOSHint(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  };

  // Android/Chrome: native install prompt
  if (showPrompt && deferredPrompt && !isInstalled) {
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
          <button type="button" onClick={dismiss} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            بعداً
          </button>
        </div>
      </div>
    );
  }

  // iOS: instructions (Share → Add to Home Screen)
  if (showIOSHint && !isInstalled) {
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              دکمه Share (مربع با فلش بالا) را بزنید، سپس «افزودن به صفحهٔ اصلی» را انتخاب کنید.
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <button type="button" onClick={dismiss} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            متوجه شدم
          </button>
        </div>
      </div>
    );
  }

  return null;
}
