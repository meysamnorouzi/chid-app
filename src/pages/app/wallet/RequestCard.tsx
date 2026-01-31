import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowsRightLeftIcon,
  DocumentTextIcon,
  CameraIcon,
  PhotoIcon,
  VideoCameraIcon,
  StopIcon,
} from "@heroicons/react/24/outline";

interface CardDesign {
  id: string;
  name: string;
  image: string;
}

const cardDesigns: CardDesign[] = [
  { id: "1", name: "دیجی تینیا", image: "/carts/1.svg" },
  { id: "2", name: "صولتین", image: "/carts/2.svg" },
  { id: "3", name: "چیلی تین", image: "/carts/3.svg" },
  { id: "4", name: "گیرین لند", image: "/carts/4.svg" },
  { id: "5", name: "پیکاتو", image: "/carts/5.svg" },
  { id: "6", name: "آرت تین", image: "/carts/7.svg" },
  { id: "7", name: "انقراض بزرگ", image: "/carts/8.svg" },
  { id: "8", name: "آذرخش", image: "/carts/9.svg" },
  { id: "9", name: "بیکران", image: "/carts/10.svg" },
  { id: "10", name: "گود وایب", image: "/carts/11.svg" },
  { id: "11", name: "آتشین", image: "/carts/c7.svg" },
  { id: "12", name: "شگفت انگیزان", image: "/carts/c8.svg" },
  { id: "c-special-1", name: "کیوتین", image: "/carts/c special 1.svg" },
  { id: "c-special-2", name: "ناروتو", image: "/carts/c special 2.svg" },
  { id: "c-special-3", name: "لیلی", image: "/carts/c special 3.svg" },
  { id: "c-special-4", name: "شازده", image: "/carts/c special 4.svg" },
  { id: "13", name: "کارت دیجی تین", image: "/carts/Screenshot 2026-01-31 at 1.16.16 AM.png" },
];

// Step types: 3 verification steps before card selection
type Step = "intro" | "id-upload" | "video" | "select" | "preview" | "success";

// Sentence user must read in the video (for verification)
const VIDEO_READ_SENTENCE =
  "من با درخواست کارت خرید دیجی‌تین موافقم و تأیید می‌کنم که اطلاعاتم صحیح است.";

function RequestCard() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [isLoading, setIsLoading] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [dominantColor, setDominantColor] = useState<string>("#7e4bd0");
  const [darkerColor, setDarkerColor] = useState<string>("#8b5cf6");
  const [dominantColorRgba, setDominantColorRgba] = useState<string>("rgba(126, 75, 208, 0.4)");
  const [dominantColorRgbaShadow, setDominantColorRgbaShadow] = useState<string>("rgba(126, 75, 208, 0.3)");

  // Step 2: ID image
  const [idImageUrl, setIdImageUrl] = useState<string | null>(null);
  const idImageInputRef = useRef<HTMLInputElement>(null);
  const idCameraInputRef = useRef<HTMLInputElement>(null);

  // Step 3: Video
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecordedVideo, setHasRecordedVideo] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Get user name from localStorage or use default
  const userName = "میثم نوروزی"; // Can be loaded from localStorage/context

  // Extract dominant color from image
  const extractDominantColor = (imageUrl: string) => {
    const img = new Image();
    // Only set crossOrigin for non-SVG images
    if (!imageUrl.endsWith('.svg')) {
      img.crossOrigin = "anonymous";
    }
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Sample pixels (every 10th pixel for performance)
      const colorCounts: { [key: string]: number } = {};
      const sampleRate = 10;

      for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Skip transparent pixels
        if (a < 128) continue;

        // Quantize colors to reduce variations
        const quantizedR = Math.floor(r / 32) * 32;
        const quantizedG = Math.floor(g / 32) * 32;
        const quantizedB = Math.floor(b / 32) * 32;

        const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
        colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
      }

      // Find the most common color
      let maxCount = 0;
      let dominantColorKey = "126,75,208"; // Default purple

      for (const [colorKey, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count;
          dominantColorKey = colorKey;
        }
      }

      const [r, g, b] = dominantColorKey.split(",").map(Number);
      
      // Adjust brightness to make it suitable for card background
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      let adjustedR = r;
      let adjustedG = g;
      let adjustedB = b;

      // Darken if too bright, lighten if too dark
      if (brightness > 180) {
        adjustedR = Math.max(0, r * 0.7);
        adjustedG = Math.max(0, g * 0.7);
        adjustedB = Math.max(0, b * 0.7);
      } else if (brightness < 80) {
        adjustedR = Math.min(255, r * 1.3);
        adjustedG = Math.min(255, g * 1.3);
        adjustedB = Math.min(255, b * 1.3);
      }

      const color = `rgb(${Math.round(adjustedR)}, ${Math.round(adjustedG)}, ${Math.round(adjustedB)})`;
      setDominantColor(color);
      
      // Create darker version for gradient
      const darkerR = Math.max(0, adjustedR * 0.7);
      const darkerG = Math.max(0, adjustedG * 0.7);
      const darkerB = Math.max(0, adjustedB * 0.7);
      const darker = `rgb(${Math.round(darkerR)}, ${Math.round(darkerG)}, ${Math.round(darkerB)})`;
      setDarkerColor(darker);
      
      // Create RGBA versions for glow and shadow effects
      setDominantColorRgba(`rgba(${Math.round(adjustedR)}, ${Math.round(adjustedG)}, ${Math.round(adjustedB)}, 0.4)`);
      setDominantColorRgbaShadow(`rgba(${Math.round(adjustedR)}, ${Math.round(adjustedG)}, ${Math.round(adjustedB)}, 0.3)`);
    };

    img.onerror = () => {
      // Fallback to default color if image fails to load
      setDominantColor("#7e4bd0");
      setDarkerColor("#8b5cf6");
      setDominantColorRgba("rgba(126, 75, 208, 0.4)");
      setDominantColorRgbaShadow("rgba(126, 75, 208, 0.3)");
    };

    img.src = imageUrl;
  };

  const getSelectedCardDesign = () => {
    return cardDesigns.find((card) => card.id === selectedCard);
  };

  // Extract dominant color when entering preview step
  useEffect(() => {
    if (currentStep === "preview" && selectedCard) {
      const cardDesign = getSelectedCardDesign();
      if (cardDesign?.image) {
        extractDominantColor(cardDesign.image);
      }
    }
  }, [currentStep, selectedCard]);

  const handleNextStep = () => {
    if (currentStep === "intro") setCurrentStep("id-upload");
    else if (currentStep === "id-upload" && idImageUrl) setCurrentStep("video");
    else if (currentStep === "video" && (hasRecordedVideo || videoUrl)) setCurrentStep("select");
    else if (currentStep === "select" && selectedCard) setCurrentStep("preview");
  };

  const handleBack = () => {
    if (currentStep === "preview") setCurrentStep("select");
    else if (currentStep === "select") setCurrentStep("video");
    else if (currentStep === "video") {
      if (isRecording) stopVideoRecording();
      setCurrentStep("id-upload");
    } else if (currentStep === "id-upload") setCurrentStep("intro");
    else if (currentStep === "intro") navigate(-1);
    else navigate(-1);
  };

  // Step 2: ID image handlers
  const handleIdImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      if (idImageUrl) URL.revokeObjectURL(idImageUrl);
      setIdImageUrl(url);
    }
    e.target.value = "";
  };

  const triggerIdUpload = () => idImageInputRef.current?.click();
  const triggerIdCamera = () => idCameraInputRef.current?.click();

  // Step 3: Video recording
  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoPreviewRef.current) videoPreviewRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        if (chunks.length) {
          const blob = new Blob(chunks, { type: "video/webm" });
          setVideoBlob(blob);
          setVideoUrl(URL.createObjectURL(blob));
          setHasRecordedVideo(true);
        }
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        if (videoPreviewRef.current) videoPreviewRef.current.srcObject = null;
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (idImageUrl) URL.revokeObjectURL(idImageUrl);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleFinalSubmit = async () => {
    if (!selectedCard) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save to localStorage
    const cardRequest = {
      cardDesignId: selectedCard,
      requestedAt: Date.now(),
      status: "pending",
    };
    localStorage.setItem("physicalCardRequest", JSON.stringify(cardRequest));
    localStorage.setItem("hasPhysicalCard", "true");

    setIsLoading(false);
    setCurrentStep("success");
  };

  const getHeaderTitle = () => {
    switch (currentStep) {
      case "intro":
        return "درخواست کارت خرید";
      case "id-upload":
        return "صفحه اول شناسنامه";
      case "video":
        return "ارسال ویدیو و صدا";
      case "select":
        return "انتخاب طرح کارت";
      case "preview":
        return "پیش‌نمایش کارت";
      case "success":
        return "ثبت درخواست";
    }
  };

  const getHeaderSubtitle = () => {
    switch (currentStep) {
      case "intro":
        return "مراحل درخواست کارت";
      case "id-upload":
        return "عکس صفحه اول شناسنامه";
      case "video":
        return "ضبط ویدیو تأیید هویت";
      case "select":
        return "";
      case "preview":
        return "کارت انتخابی خودت رو ببین";
      case "success":
        return "درخواست با موفقیت ثبت شد";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-[#7e4bd0] text-white px-4 md:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-2 max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold">{getHeaderTitle()}</h1>
        </div>
        {getHeaderSubtitle() && (
          <p className="text-white/70 text-sm md:text-base mr-13 max-w-6xl mx-auto">
            {getHeaderSubtitle()}
          </p>
        )}
      </div>

      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 mx-auto pb-32 md:pb-24 max-w-6xl min-h-screen flex md:items-center">
        <AnimatePresence mode="wait">
          {/* Step 1: Intro - Description & Continue */}
          {currentStep === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#7e4bd0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <DocumentTextIcon className="w-6 h-6 text-[#7e4bd0]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-2">کارت دیجی‌تینتو بگیر!</h2>
                    <p className="text-gray-600 text-sm leading-6">
                      فقط این ۳ تا کارو انجام بده و تمومه:
                    </p>
                  </div>
                </div>
                <ol className="space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3 items-start">
                    <span className="w-7 h-7 rounded-full bg-[#7e4bd0] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">۱</span>
                    <span>یه عکس واضح از صفحه اول شناسنامه‌ت بگیر و آپلود کن.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-7 h-7 rounded-full bg-[#7e4bd0] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">۲</span>
                    <span>برو یه جای آروم با نور خوب، از خودت وقتی متن رو می‌خونی یه ویدیو بگیر و بفرست.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-7 h-7 rounded-full bg-[#7e4bd0] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">۳</span>
                    <span>حالا طرح کارت موردعلاقتو انتخاب کن و درخواستتو نهایی کن!</span>
                  </li>
                </ol>
                <p className="text-gray-500 text-xs mt-6 pt-4 border-t border-gray-100">
                  همین. بعد از تأیید، ۳ تا ۵ روز کاری بعدش کارت توی جیبته!
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: ID Upload - صفحه اول شناسنامه */}
          {currentStep === "id-upload" && (
            <motion.div
              key="id-upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 md:p-6 mb-6">
                <p className="text-gray-800 text-sm leading-6">
                  برای داشتن کارت باید عکس از صفحه اول شناسنامه جوری که همه اطلاعات خوانا باشن برامون بفرستی.
                </p>
              </div>

              <input
                ref={idImageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleIdImageChange}
              />
              <input
                ref={idCameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleIdImageChange}
              />

              {!idImageUrl ? (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                      <img src="/image/Aks shenas name.png" alt="عکس صفحه اول شناسنامه" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-gray-500 text-sm mb-6">عکس صفحه اول شناسنامه رو آپلود کن یا با دوربین بگیر</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        type="button"
                        onClick={triggerIdUpload}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#7e4bd0] text-[#7e4bd0] font-semibold text-sm hover:bg-[#7e4bd0]/5 transition-colors"
                      >
                        <PhotoIcon className="w-5 h-5" />
                        آپلود عکس
                      </button>
                      <button
                        type="button"
                        onClick={triggerIdCamera}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7e4bd0] text-white font-semibold text-sm hover:bg-[#6b3fbf] transition-colors"
                      >
                        <CameraIcon className="w-5 h-5" />
                        عکس بگیر
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <p className="text-sm font-medium text-gray-700 mb-3">عکس شناسنامه</p>
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-[4/3] max-h-64 bg-gray-100">
                    <img
                      src={idImageUrl}
                      alt="صفحه اول شناسنامه"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => { setIdImageUrl(null); }}
                      className="absolute top-2 left-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white text-sm hover:bg-black/70"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={triggerIdUpload}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
                    >
                      <PhotoIcon className="w-4 h-4" />
                      تغییر عکس (آپلود)
                    </button>
                    <button
                      type="button"
                      onClick={triggerIdCamera}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#7e4bd0] text-[#7e4bd0] text-sm font-medium hover:bg-[#7e4bd0]/5"
                    >
                      <CameraIcon className="w-4 h-4" />
                      عکس بگیر
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Video - ارسال ویدیو و صدا */}
          {currentStep === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 md:p-6 mb-6">
                <p className="text-gray-800 text-sm leading-6">
                  تو این مرحله باید یجا باشی که آروم باشه، نور کافی داشته باشه و یه ویدیو در حالی که متن زیر کادر دوربین رو می‌خونی برامون بفرستی. مطمئن باش که توی کادر هستی.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                {!hasRecordedVideo ? (
                  <>
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-4">
                      <video
                        ref={videoPreviewRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover mirror-video"
                        style={{ transform: "scaleX(-1)" }}
                      />
                      {!isRecording && !streamRef.current && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
                          <img src="/image/Video selfie.png" alt="ویدیو سلفی" className="w-32 h-32 object-contain opacity-60" />
                        </div>
                      )}
                      {/* Face guide overlay: only when recording — human-head shape (taller than wide), centered */}
                      {isRecording && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                          {/* Dimmed area with oval cutout — taller-than-wide ellipse, centered */}
                          <div
                            className="absolute inset-0 bg-black/50"
                            style={{
                              maskImage: "radial-gradient(ellipse 38% 58% at 50% 50%, transparent 0%, transparent 99%, black 99%)",
                              WebkitMaskImage: "radial-gradient(ellipse 38% 58% at 50% 50%, transparent 0%, transparent 99%, black 99%)",
                              maskSize: "100% 100%",
                              WebkitMaskSize: "100% 100%",
                            }}
                          />
                          {/* Face frame: oval taller than wide (human head shape), centered */}
                          <div
                            className="absolute left-1/2 top-1/2 w-[44%] h-[70%] -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.2)]"
                          />
                          {/* Optional hint — subtle so it doesn't block face */}
                          <span
                            className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/90 text-xs font-medium drop-shadow-md whitespace-nowrap"
                            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                          >
                            صورت خود را در کادر قرار دهید
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-4">
                      <p className="text-xs text-gray-500 mb-2">متن زیر رو در ویدیو بخون:</p>
                      <p className="text-gray-800 text-sm font-medium leading-6" dir="rtl">
                        {VIDEO_READ_SENTENCE}
                      </p>
                    </div>
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startVideoRecording}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#7e4bd0] text-white font-semibold text-sm hover:bg-[#6b3fbf] transition-colors"
                      >
                        <VideoCameraIcon className="w-5 h-5" />
                        شروع به فیلم‌برداری
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopVideoRecording}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors"
                      >
                        <StopIcon className="w-5 h-5" />
                        توقف ضبط
                      </button>
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-sm font-medium text-gray-700 mb-3">ویدیوی ضبط‌شده</p>
                    <div className="rounded-xl overflow-hidden bg-black aspect-[4/3] mb-4">
                      {videoUrl && (
                        <video
                          src={videoUrl}
                          controls
                          className="w-full h-full object-contain"
                          playsInline
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (videoUrl) URL.revokeObjectURL(videoUrl);
                        setVideoUrl(null);
                        setVideoBlob(null);
                        setHasRecordedVideo(false);
                      }}
                      className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
                    >
                      ضبط مجدد
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Select Card */}
          {currentStep === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                x: -100,
                scale: 0.8,
                rotateY: -90
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="w-full"
            >
              {/* Card Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-6">
                {cardDesigns.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCard(card.id)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-3 transition-all hover:scale-105 hover:shadow-lg ${
                      selectedCard === card.id
                        ? "border-[#7e4bd0] ring-2 md:ring-4 ring-[#7e4bd0]/30"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="aspect-[1.6/1] bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <p className="text-sm md:text-base text-center w-full mt-2 md:mt-3 text-black font-medium">{card.name}</p>
                    {selectedCard === card.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 md:top-3 left-2 md:left-3 w-6 h-6 md:w-8 md:h-8 bg-[#7e4bd0] rounded-full flex items-center justify-center shadow-lg"
                      >
                        <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Preview Card */}
          {currentStep === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-12 items-center w-full"
            >
              {/* Card Preview */}
              <div className="w-full md:w-1/2 lg:w-2/5 mb-8 md:mb-0 max-w-2xl md:max-w-none mx-auto">
                <motion.div
                  initial={{ 
                    scale: 0.3, 
                    rotateY: -180,
                    rotateX: 45,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: 1, 
                    rotateY: 0,
                    rotateX: 0,
                    opacity: 1
                  }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                    delay: 0.2
                  }}
                  className="relative"
                  style={{ perspective: "1000px" }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    key={dominantColorRgba}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0, 0.6, 0.3, 0.6, 0.3],
                      scale: [0.8, 1.05, 1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle, ${dominantColorRgba} 0%, transparent 70%)`,
                      filter: "blur(20px)",
                      zIndex: -1
                    }}
                  />
                  
                  {/* Flip Container */}
                  <div
                    className="relative w-full cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                  >
                    {/* Front of Card */}
                    <motion.div 
                      key={dominantColorRgbaShadow}
                      className="relative aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      animate={{
                        boxShadow: [
                          `0 20px 60px ${dominantColorRgbaShadow}`,
                          `0 20px 80px ${dominantColorRgba}`,
                          `0 20px 60px ${dominantColorRgbaShadow}`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <img
                        src={getSelectedCardDesign()?.image}
                        alt="کارت انتخابی"
                        className="w-full h-full object-cover"
                      />

                      {/* Shine Effect */}
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{
                          duration: 1.5,
                          delay: 1.2,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />
                    </motion.div>

                    {/* Back of Card */}
                    <div
                      className="absolute inset-0 aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: `linear-gradient(to bottom right, ${dominantColor}, ${darkerColor})`,
                      }}
                    >
                      {/* Card Pattern Background */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                      </div>

                      {/* Back Content - matches WalletMoney card back layout */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-6">
                        <div className="flex-1 flex flex-col justify-start pt-1">
                          {/* Full name on right (justify-start in RTL = right side) */}
                          <div className="w-full flex justify-start mb-3">
                            <p className="text-white text-base font-semibold drop-shadow-lg">
                              {userName}
                            </p>
                          </div>

                          {/* Row: card number on right (bigger), CVV2/EXP on left with labels left of values */}
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex flex-col items-start text-start">
                              <p className="text-white text-xl font-semibold tracking-wider drop-shadow-lg">
                                1234 5678 9012 3456
                              </p>
                            </div>
                            <div className="flex flex-col shrink-0 items-end gap-2">
                              {/* CVV2: label on left of value (in RTL: value first = right, label second = left) */}
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                  <p className="text-white text-sm font-bold tracking-widest drop-shadow-lg">123</p>
                                </div>
                                <span className="text-white/80 text-xs drop-shadow">CVV2</span>
                              </div>
                              {/* EXP: label on left of value */}
                              <div className="flex items-center gap-2">
                                <p className="text-white text-sm font-semibold drop-shadow-lg">12/24</p>
                                <span className="text-white/80 text-xs drop-shadow">EXP</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Magnet bar - below the card content (taller like WalletMoney) */}
                        <div className="h-16 bg-black/30 rounded mt-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card Design Name */}
                <motion.p
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.9,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="text-center text-gray-500 text-sm mt-4"
                >
                  {getSelectedCardDesign()?.name}
                </motion.p>

                {/* Flip Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    backgroundColor: dominantColor,
                    boxShadow: `0 4px 12px ${dominantColorRgbaShadow}`
                  }}
                  transition={{ 
                    delay: 1.0,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 180,
                    backgroundColor: darkerColor,
                    boxShadow: `0 6px 20px ${dominantColorRgba}`
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="mt-4 w-12 h-12 mx-auto flex items-center justify-center rounded-full text-white transition-colors"
                >
                  <ArrowsRightLeftIcon className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Card Info and Actions - Right Side on Desktop */}
              <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 1.0,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                  className="w-full bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm"
                >
                  <h3 className="text-gray-800 font-bold mb-4 md:mb-6 text-lg md:text-xl">اطلاعات کارت</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between py-2 md:py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm md:text-base">نام صاحب کارت</span>
                      <span className="text-gray-800 font-semibold text-sm md:text-base">
                        {userName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 md:py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm md:text-base">طرح کارت</span>
                      <span className="text-gray-800 font-semibold text-sm md:text-base">
                        {getSelectedCardDesign()?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 md:py-3">
                      <span className="text-gray-500 text-sm md:text-base">زمان تحویل</span>
                      <span className="text-gray-800 font-semibold text-sm md:text-base">
                        ۳ تا ۵ روز کاری
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Change Card Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    color: dominantColor
                  }}
                  transition={{ 
                    delay: 1.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep("select")}
                  className="mt-4 md:mt-0 text-sm md:text-base font-semibold flex items-center justify-center md:justify-start gap-1 px-4 py-3 rounded-xl border-2 transition-all hover:bg-gray-50"
                  style={{ 
                    borderColor: dominantColor,
                    color: dominantColor
                  }}
                >
                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                  تغییر طرح کارت
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {currentStep === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 w-full"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, bounce: 0.4 }}
                className="mb-6 md:mb-8"
              >
                <img
                  src="/gif/Done2.gif"
                  alt="موفقیت"
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-4"
              >
                درخواست ثبت شد!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-sm md:text-base lg:text-lg text-center mb-4 md:mb-6 max-w-2xl"
              >
                درخواست کارت خرید با طرح «{getSelectedCardDesign()?.name}» ثبت
                شد.
                <br />
                کارت طی ۳ تا ۵ روز کاری به دستت می‌رسه.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          {currentStep === "intro" ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextStep}
              className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: "#7e4bd0" }}
            >
              <span>ادامه</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>
          ) : currentStep === "id-upload" ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextStep}
              disabled={!idImageUrl}
              className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: "#7e4bd0" }}
            >
              <span>ادامه</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>
          ) : currentStep === "video" ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextStep}
              disabled={!hasRecordedVideo && !videoUrl}
              className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: "#7e4bd0" }}
            >
              <span>ادامه</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>
          ) : currentStep === "select" ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextStep}
              disabled={!selectedCard}
              className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: "#7e4bd0" }}
            >
              <span>ادامه</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>
          ) : currentStep === "preview" ? (
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: darkerColor,
                boxShadow: `0 6px 20px ${dominantColorRgba}`
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinalSubmit}
              disabled={isLoading}
              className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: dominantColor,
                boxShadow: `0 4px 12px ${dominantColorRgbaShadow}`
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>در حال ثبت درخواست...</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>تأیید نهایی و ثبت درخواست</span>
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/wallet-money")}
              className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: "#7e4bd0",
                boxShadow: "0 4px 12px rgba(126, 75, 208, 0.3)"
              }}
            >
              <span>متوجه شدم</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestCard;
