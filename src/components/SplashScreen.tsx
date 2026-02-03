import { useEffect, useRef } from 'react';

const SPLASH_VIDEO = '/videos/IMG_5515.MP4';
const SPLASH_GIF = '/gif/Splashscreen.gif';

/** iOS (Safari, Chrome/CriOS, etc.) – use video because GIF doesn't play reliably. */
function isIOS(): boolean {
  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    /CriOS|FxiOS|EdgiOS/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

const splashMediaStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  maxWidth: '100vw',
  maxHeight: '100vh',
  objectFit: 'contain',
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isIOS() && imgRef.current) {
      const img = imgRef.current;
      const src = img.src;
      img.src = '';
      img.src = src;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const useVideo = isIOS();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#7e4bd0' }}
    >
      <div className="flex flex-col items-center justify-center">
        {useVideo ? (
          <video
            src={SPLASH_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="object-contain"
            style={splashMediaStyle}
            aria-label="Logo"
          />
        ) : (
          <img
            ref={imgRef}
            src={SPLASH_GIF}
            alt="Logo"
            className="object-contain"
            style={splashMediaStyle}
          />
        )}
      </div>
    </div>
  );
};

export default SplashScreen;

