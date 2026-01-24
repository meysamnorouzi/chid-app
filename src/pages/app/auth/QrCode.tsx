import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CameraIcon } from '@heroicons/react/24/outline';

const QrCode = () => {
  const navigate = useNavigate();
  const [loginLink, setLoginLink] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerId = 'qr-scanner-preview';

  // Check if camera permission is already granted on mount
  useEffect(() => {
    checkCameraPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start scanner if permission is granted
  useEffect(() => {
    let mounted = true;

    if (hasCameraPermission === true && !isScanning && !scannerRef.current && mounted) {
      // Wait for the element to be rendered in DOM
      const checkAndStart = () => {
        const element = document.getElementById(scannerId);
        if (element && mounted) {
          startScanner();
        } else if (mounted) {
          // Retry after a short delay if element is not yet available
          setTimeout(checkAndStart, 100);
        }
      };
      
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        checkAndStart();
      });
    }

    return () => {
      mounted = false;
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current?.clear();
          })
          .catch((err: unknown) => {
            console.error('Error stopping scanner:', err);
          });
      }
    };
  }, [hasCameraPermission, isScanning]);


  const startScanner = async () => {
    if (scannerRef.current) return; // Already started

    // Check if element exists in DOM
    const element = document.getElementById(scannerId);
    if (!element) {
      console.error(`Element with id ${scannerId} not found`);
      setError('خطا در راه‌اندازی دوربین: المنت اسکنر یافت نشد');
      return;
    }

    try {
      const html5QrCode = new Html5Qrcode(scannerId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText: string) => {
          handleScanSuccess(decodedText);
        },
        () => {
          // Error handling - ignore scan errors
        }
      );

      setIsScanning(true);
      setError('');
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      setError('خطا در راه‌اندازی دوربین');
      setHasCameraPermission(false);
      // Reset scanner ref on error
      scannerRef.current = null;
    }
  };

  const handleScanSuccess = async (decodedText: string) => {
    // Stop scanning
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }

    // Set the scanned data to input
    setLoginLink(decodedText);
  };

  const checkCameraPermission = async () => {
    try {
      // Check if we can query permissions API
      if (navigator.permissions && 'query' in navigator.permissions) {
        try {
          const permissionStatus = await navigator.permissions.query({ 
            name: 'camera' as PermissionName 
          });
          if (permissionStatus.state === 'granted') {
            setHasCameraPermission(true);
          } else if (permissionStatus.state === 'denied') {
            setHasCameraPermission(false);
            setError('دسترسی به دوربین قبلاً رد شده است. لطفاً در تنظیمات مرورگر دسترسی را فعال کنید.');
          } else {
            // 'prompt' state - permission not yet requested
            setHasCameraPermission(null);
          }
        } catch (permErr) {
          // Permission API query failed, assume we can request
          setHasCameraPermission(null);
        }
      } else {
        // Permission API not supported, assume we can request
        setHasCameraPermission(null);
      }
    } catch (err) {
      // Permission API not supported or other error
      setHasCameraPermission(null);
    }
  };

  const handleRequestPermission = async () => {
    setError(''); // Clear previous error
    
    // First check if permission is already denied
    try {
      if (navigator.permissions && 'query' in navigator.permissions) {
        const permissionStatus = await navigator.permissions.query({ 
          name: 'camera' as PermissionName 
        });
        
        if (permissionStatus.state === 'denied') {
          setHasCameraPermission(false);
          setError('دسترسی به دوربین قبلاً رد شده است. لطفاً در تنظیمات مرورگر دسترسی را فعال کنید.');
          return;
        }
      }
    } catch (permErr) {
      // Continue to try getUserMedia
    }
    
    setHasCameraPermission(null); // Reset to show loading state
    
    try {
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('مرورگر شما از دسترسی به دوربین پشتیبانی نمی‌کند.');
        setHasCameraPermission(false);
        return;
      }

      // This will show the browser's native permission dialog
      // Only request video (camera) - no need for microphone for QR scanning
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' 
        }
      });
      
      // Stop all tracks immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
      
      setHasCameraPermission(true);
      setError('');
    } catch (error: any) {
      console.error('Permission error:', error);
      
      // Permission denied or other error
      setHasCameraPermission(false);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setError('دسترسی به دوربین رد شد. لطفاً در تنظیمات مرورگر دسترسی را فعال کنید.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setError('دوربین یافت نشد. لطفاً مطمئن شوید که دوربین به دستگاه متصل است.');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setError('دوربین در حال استفاده توسط برنامه دیگری است. لطفاً برنامه‌های دیگر را ببندید.');
      } else if (error.name === 'OverconstrainedError') {
        // Try with default camera if facingMode is not available
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true 
          });
          stream.getTracks().forEach(track => track.stop());
          setHasCameraPermission(true);
          setError('');
          return;
        } catch (fallbackError: any) {
          setError('خطا در دسترسی به دوربین. لطفاً دوباره تلاش کنید.');
        }
      } else {
        setError('خطا در دسترسی به دوربین. لطفاً دوباره تلاش کنید.');
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-full flex justify-center items-center bg-[#7e4bd0] p-12 min-h-[300px] rounded-b-3xl">
        <img
          src="/logo/QR.gif"
          alt=""
          className="w-40 "
        />
      </div>
      <div className="flex flex-col w-full items-center justify-start flex-1 pt-10 p-4">
        <div className="w-full mb-8">
          <div className="flex flex-col gap-3">
            {/* QR Scanner Preview Box */}
            <div className="space-y-2 w-full">

              <div className="relative w-full">
                {/* Scanner Preview Box */}
                <div className="w-full aspect-square  mx-auto mb-4 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center relative">
                  {/* Always render the scanner element when permission is granted, but hide it when not scanning */}
                  {hasCameraPermission === true && (
                    <div
                      id={scannerId}
                      className={`w-full h-full ${isScanning ? '' : 'hidden'}`}
                    ></div>
                  )}
                  
                  {/* Show button to rescan when permission is granted but not scanning and loginLink exists */}
                  {hasCameraPermission === true && !isScanning && loginLink && (
                    <button
                      onClick={startScanner}
                      className="flex flex-col items-center justify-center gap-3 w-full h-full p-4 text-[#7e4bd0] hover:bg-gray-50 transition-colors absolute inset-0"
                    >
                      <CameraIcon className="w-16 h-16" />
                      <span className="text-sm font-medium">اسکن مجدد کیوآر کد</span>
                    </button>
                  )}
                  
                  {/* Show loading state when permission is granted but scanner is starting */}
                  {hasCameraPermission === true && !isScanning && !loginLink && (
                    <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-4 absolute inset-0">
                      <CameraIcon className="w-16 h-16 text-gray-400 animate-pulse" />
                      <span className="text-sm font-medium text-center px-2 text-gray-600">
                        در حال راه‌اندازی دوربین...
                      </span>
                    </div>
                  )}
                  
                  {/* Show permission request UI when permission is not granted */}
                  {hasCameraPermission !== true && (
                    <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-4">
                      <CameraIcon className="w-16 h-16 text-gray-400" />
                      <span className="text-sm font-medium text-center px-2 text-gray-600">
                        {error
                          ? error
                          : hasCameraPermission === false
                          ? 'برای اسکن کیوآر کد، دسترسی به دوربین لازم است'
                          : 'در حال بررسی دسترسی...'}
                      </span>
                      {(hasCameraPermission === false || hasCameraPermission === null) && (
                        <button
                          onClick={handleRequestPermission}
                          className="bg-[#7e4bd0] hover:bg-[#6a3abf] text-white font-semibold px-6 py-2.5 rounded-xl transition-all active:scale-[0.98] shadow-sm"
                        >
                          اجازه دسترسی به دوربین
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {/* Input Field */}
                <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                لینک ورود
              </label>
                <input
                  type="text"
                  value={loginLink}
                  onChange={(e) => setLoginLink(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl mt-2 border border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300 outline-none transition-all "
                  placeholder="  لینک ورود خود را وارد کنید ..."
                  dir="rtl"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={() => navigate('/')}
              className="w-full bg-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 border border-[#7e4bd0] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
            >
              ورود به دیجی پلی
            </button>
    
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full border border-[#7e4bd0] hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-[#7e4bd0] font-semibold py-3.5 rounded-xl  shadow-gray-300 transition-all active:scale-[0.98]"
            >
              برگشت به صفحه قبلی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
