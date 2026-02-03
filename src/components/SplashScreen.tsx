import { useEffect, useRef, useState } from 'react';

// Video lives in public/gif/ next to Splashscreen.gif
const SPLASH_VIDEO = '/gif/IMG_5515.MP4';
const SPLASH_GIF = '/gif/Splashscreen.gif';

/** iOS (Safari, Chrome/CriOS, etc.) – prefer video; fall back to GIF if video fails. */
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const useVideo = isIOS() && !videoFailed;

  // iOS: programmatic play() – autoPlay often ignored until we call play()
  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const onError = () => setVideoFailed(true);
    const play = () => {
      video.play().catch(onError);
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener('loadeddata', play, { once: true });
      video.addEventListener('canplay', play, { once: true });
      video.addEventListener('error', onError, { once: true });
      return () => {
        video.removeEventListener('loadeddata', play);
        video.removeEventListener('canplay', play);
        video.removeEventListener('error', onError);
      };
    }
  }, [useVideo]);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#7e4bd0' }}
    >
      <div className="flex flex-col items-center justify-center">
        {useVideo ? (
          <video
            ref={videoRef}
            src={SPLASH_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="object-contain"
            style={splashMediaStyle}
            aria-label="Logo"
            onError={() => setVideoFailed(true)}
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

