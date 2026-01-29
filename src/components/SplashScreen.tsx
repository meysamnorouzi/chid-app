import { useEffect, useRef } from 'react';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Force GIF to restart from beginning
    if (imgRef.current) {
      const img = imgRef.current;
      const src = img.src;
      // Remove and re-add src to force reload
      img.src = '';
      img.src = src;
    }
  }, []);

  useEffect(() => {
    // Complete after exactly 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#7e4bd0' }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* GIF - Static in center */}
        <div className="flex items-center justify-center">
          <img
            ref={imgRef}
            src="/gif/Splashscreen.gif"
            alt="Logo"
            className="object-contain"
            style={{ 
              width: '100vw', 
              height: '100vh',
              maxWidth: '100vw',
              maxHeight: '100vh'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

