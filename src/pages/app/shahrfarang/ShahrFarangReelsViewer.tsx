/**
 * Fullscreen Reels viewer — Instagram-style
 * Vertical scroll between videos, like & save actions
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  XMarkIcon,
  HeartIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

export interface ReelsVideo {
  id: string;
  src: string;
  categoryId: string;
  views: string;
  title?: string;
}

interface ShahrFarangReelsViewerProps {
  videos: ReelsVideo[];
  initialIndex: number;
  onClose: () => void;
}

const ShahrFarangReelsViewer = ({
  videos,
  initialIndex,
  onClose,
}: ShahrFarangReelsViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const currentVideo = videos[currentIndex];

  // Play current video, pause others
  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === currentIndex) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [currentIndex]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, videos.length - 1));
  }, [videos.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  // Keyboard: escape to close, arrows to navigate
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") goToNext();
      if (e.key === "ArrowUp") goToPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, goToNext, goToPrev]);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 10) return;
    e.preventDefault();
    if (e.deltaY > 0) goToNext();
    else goToPrev();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  const toggleLike = () => {
    if (!currentVideo) return;
    setLiked((prev) => ({ ...prev, [currentVideo.id]: !prev[currentVideo.id] }));
  };

  const toggleSave = () => {
    if (!currentVideo) return;
    setSaved((prev) => ({ ...prev, [currentVideo.id]: !prev[currentVideo.id] }));
  };

  const content = (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col"
      dir="rtl"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        aria-label="بستن"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {/* Video carousel - vertical stack, translate to show current */}
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="h-screen w-full flex items-center justify-center bg-black"
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.src}
                className="max-h-full max-w-full w-auto h-full object-contain"
                playsInline
                muted={false}
                loop
                preload="auto"
                onClick={(e) => {
                  const v = e.currentTarget;
                  if (v.paused) v.play();
                  else v.pause();
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right side actions - like, save (Instagram style, RTL so on left visually) */}
      <div className="absolute bottom-24 left-4 flex flex-col gap-6 z-20">
        <button
          onClick={toggleLike}
          className="flex flex-col items-center gap-1 text-white"
        >
          {liked[currentVideo?.id ?? ""] ? (
            <HeartSolidIcon className="w-8 h-8 text-red-500" />
          ) : (
            <HeartIcon className="w-8 h-8" />
          )}
          <span className="text-xs">لایک</span>
        </button>
        <button
          onClick={toggleSave}
          className="flex flex-col items-center gap-1 text-white"
        >
          {saved[currentVideo?.id ?? ""] ? (
            <BookmarkSolidIcon className="w-8 h-8 text-amber-400" />
          ) : (
            <BookmarkIcon className="w-8 h-8" />
          )}
          <span className="text-xs">ذخیره</span>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-4 right-4 left-16 z-20 text-white text-sm">
        <p className="font-medium">{currentVideo?.views} بازدید</p>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default ShahrFarangReelsViewer;
