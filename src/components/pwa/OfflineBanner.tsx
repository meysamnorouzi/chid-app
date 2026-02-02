/**
 * PWA Offline Banner
 * Shows a slim banner when the user goes offline (network lost).
 */

import { useState, useEffect } from 'react';

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9997] py-2 px-4 bg-amber-500 text-gray-900 text-center text-sm font-medium"
      style={{ direction: 'rtl' }}
      role="status"
      aria-live="polite"
    >
      شما آفلاین هستید. برخی امکانات ممکن است در دسترس نباشند.
    </div>
  );
}
