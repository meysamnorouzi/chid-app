import { useEffect, useRef, useState } from 'react';

const SPLASH_GIF = '/gif/Splashscreen.gif';

/** Detect iOS (Safari, Chrome/CriOS, etc.) for GIF animation workarounds. */
function isIOS(): boolean {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod|CriOS|FxiOS|EdgiOS/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [gifSrc, setGifSrc] = useState(() => `${SPLASH_GIF}#t=${Date.now()}`);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const runForcePlay = () => {
      const currentSrc = img.src;
      img.src = '';
      img.removeAttribute('src');
      requestAnimationFrame(() => {
        img.src = currentSrc.split('#')[0] + `#t=${Date.now()}`;
      });
    };

    if (isIOS()) {
      // iOS/WebKit: GIF often doesn't animate until after a short delay and a forced reload.
      const t = setTimeout(runForcePlay, 150);
      return () => clearTimeout(t);
    }

    runForcePlay();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#7e4bd0' }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex items-center justify-center">
          <img
            ref={imgRef}
            src={gifSrc}
            alt="Logo"
            className="object-contain"
            style={{
              width: '100vw',
              height: '100vh',
              maxWidth: '100vw',
              maxHeight: '100vh',
              // Promote to own layer so WebKit animates the GIF (helps on iOS)
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

