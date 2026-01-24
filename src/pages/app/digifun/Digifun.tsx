import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { VideoCameraIcon, SpeakerWaveIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface Slide {
  id: string;
  type: 'mode-selection' | 'time-selection' | 'fashion' | 'default';
  image?: string;
  question?: string;
  options?: string[];
}

// Progress Indicator Component
const ProgressIndicator = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = 3;
  
  return (
    <div className="flex items-center justify-center mb-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        
        return (
          <div key={index} className="flex items-center">
            {/* Circle - All filled */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ease-out ${
                isCompleted || isActive
                  ? 'bg-[#7e4bd0] animate-circle-fill'
                  : 'bg-white'
              }`}
              style={{
                animationDelay: isActive ? '0.3s' : '0s',
              }}
            >
              {isCompleted ? (
                <svg 
                  className="w-6 h-6 text-white animate-checkmark-appear" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className={`text-sm font-medium transition-all duration-500 ${isActive ? 'text-white animate-number-fade' : 'text-gray-800'}`}>
                  {stepNumber}
                </span>
              )}
            </div>
            
            {/* Dotted Line with gap */}
            {index < totalSteps - 1 && (
              <div className="flex items-center mx-3">
                <div
                  className={`w-12 h-0.5 transition-all duration-700 ${
                    isCompleted ? 'animate-line-fill' : ''
                  }`}
                  style={{
                    borderTop: `2px dashed ${isCompleted ? '#7e4bd0' : 'rgba(255,255,255,0.5)'}`,
                    animationDelay: isCompleted ? '0.5s' : '0s',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Mode Selection Slide Component (First Slide)
const ModeSelectionSlide = ({ onModeSelect }: { onModeSelect: (mode: string) => void }) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleModeClick = (modeId: string) => {
    setSelectedMode(modeId);
    setIsAnimating(true);
    
    // Add delay before transitioning to next step
    setTimeout(() => {
      onModeSelect(modeId);
    }, 300);
  };

  const modes = [
    {
      id: 'watch',
      label: 'می‌خوام ببینم',
      icon: VideoCameraIcon,
    },
    {
      id: 'listen',
      label: 'می‌خوام بشنوم',
      icon: SpeakerWaveIcon,
    },
    {
      id: 'read',
      label: 'می‌خوام بخونم',
      icon: BookOpenIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden" dir="rtl">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 25%, #9ca3af 50%, #6b7280 75%, #4b5563 100%)',
        }}
      />

      {/* Content Overlay */}
      <div className="relative flex flex-col items-center justify-end min-h-screen">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={1} />
        
        {/* White Box with Options */}
        <div className="w-full bg-white rounded-t-3xl p-6 pt-8">
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* Center Image */}
            <div className="flex justify-center mb-4">
              <img
                src="/image/5004bb46-663e-459e-90de-7ba155a866b0.png"
                alt="Center"
                className="max-w-2xl max-h-64 object-contain animate-image-slide"
              />
            </div>
            
            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              چه نوع محتوایی می‌خوای؟
            </h2>
            
            {/* Options */}
            <div className="space-y-3">
              {modes.map((mode, index) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeClick(mode.id)}
                  className={`w-full h-16 border-2 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform animate-option-slide ${
                    isSelected
                      ? 'bg-[#7e4bd0] border-[#7e4bd0] text-white shadow-lg shadow-[#7e4bd0]/50'
                      : 'bg-white border-[#7e4bd0] text-gray-800 hover:scale-102 hover:shadow-md active:scale-95'
                  } ${isAnimating && isSelected ? 'animate-pulse' : ''}`}
                  style={{
                    borderColor: '#7e4bd0',
                    animationDelay: `${index * 0.1}s`,
                  }}
                  disabled={isAnimating}
                >
                  <Icon 
                    className={`w-6 h-6 transition-all duration-300 ${
                      isSelected 
                        ? 'text-white rotate-12' 
                        : 'text-[#7e4bd0]'
                    }`} 
                  />
                  <span className={`text-lg font-medium transition-all duration-300 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                    {mode.label}
                  </span>
                </button>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Time Selection Slide Component
const TimeSelectionSlide = ({ onTimeSelect }: { onTimeSelect: (time: string) => void }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const times = [
    { id: 'short', label: 'تا پنج دقیقه' },
    { id: 'medium', label: 'تا ده دقیقه' },
    { id: 'long', label: 'طولانی باشه' },
  ];

  const handleTimeClick = (timeId: string) => {
    setSelectedTime(timeId);
    setIsAnimating(true);
    
    // Add delay before transitioning to next step
    setTimeout(() => {
      onTimeSelect(timeId);
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" dir="rtl">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 25%, #9ca3af 50%, #6b7280 75%, #4b5563 100%)',
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} />
        
        {/* White Box with Options */}
        <div className="w-full bg-white rounded-t-3xl p-6 pt-8">
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* Center Image */}
            <div className="flex justify-center mb-4">
              <img
                src="/image/af0a4321-a97c-4f47-82c1-1507d9c2ca61.png"
                alt="Center"
                className="max-w-2xl max-h-64 object-contain animate-image-slide"
              />
            </div>
            
            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              چقدر تایم داری؟
            </h2>
            
            {/* Options */}
            <div className="space-y-3">
              {times.map((time, index) => {
                const isSelected = selectedTime === time.id;
                return (
                  <button
                    key={time.id}
                    onClick={() => handleTimeClick(time.id)}
                    className={`w-full h-16 border-2 rounded-xl flex items-center justify-center transition-all duration-300 transform animate-option-slide ${
                      isSelected
                        ? 'bg-[#7e4bd0] border-[#7e4bd0] text-white shadow-lg shadow-[#7e4bd0]/50'
                        : 'bg-white border-[#7e4bd0] text-gray-800 hover:scale-102 hover:shadow-md active:scale-95'
                    } ${isAnimating && isSelected ? 'animate-pulse' : ''}`}
                    style={{
                      borderColor: '#7e4bd0',
                      animationDelay: `${index * 0.1}s`,
                    }}
                    disabled={isAnimating}
                  >
                    <span className={`text-lg font-medium transition-all duration-300 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                      {time.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Selection Slide Component (Third Slide)
const CategorySelectionSlide = ({ 
  mode, 
  onCategoriesSelect 
}: { 
  mode: string;
  onCategoriesSelect: (categories: string[]) => void;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Categories based on mode
  const categoriesByMode: Record<string, string[]> = {
    listen: [
      'چی می‌شه اگه',
      'زندگی‌نامه آدم‌های مهم',
      'تو بگو بعدش چی میشه',
      'خلاصه صوتی کتاب (خلاصه صوتی خیلی ساده کتاب)',
      'تاریخ در کپسول',
      'عجیب اما واقعی',
    ],
    watch: [
      'اخبار سریع دنیای مجازی',
      'بررسی گجت‌های جذاب',
      'تد، انیمیشن‌های کوتاه',
      'خلاصه و بررسی فیلم، سریال و انیمه',
      'کجا بریم؟ چی بخوریم؟/ ترند خوراکی‌ها',
      'گل یا پوچ باز‌ها',
      'مافیا ببینم',
    ],
    read: [
      'کامیک‌ها',
      'مانگاها',
      'خلاصه یا اینفوگرافیک رمان‌ها و داستان‌های معروف',
    ],
  };

  const categories = categoriesByMode[mode] || [];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      onCategoriesSelect(newCategories);
      return newCategories;
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" dir="rtl">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 25%, #9ca3af 50%, #6b7280 75%, #4b5563 100%)',
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={3} />
        
        {/* White Box with Options */}
        <div className="w-full bg-white rounded-t-3xl p-6 pt-8">
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* Center Image */}
            <div className="flex justify-center mb-4">
              <img
                src="/image/b0ae40ff-a6cd-4056-b726-fee0e49e7c4f.png"
                alt="Center"
                className="max-w-2xl max-h-64 object-contain animate-image-slide"
              />
            </div>
            
            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
              دسته‌بندی‌ها رو انتخاب کن
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              می‌تونی چند تا انتخاب کنی
            </p>
            
            {/* Options */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {categories.map((category, index) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={index}
                    onClick={() => toggleCategory(category)}
                    className={`w-full min-h-14 border-2 rounded-xl flex items-center justify-center p-4 transition-all duration-300 transform animate-option-slide ${
                      isSelected
                        ? 'bg-[#7e4bd0] border-[#7e4bd0] text-white shadow-lg shadow-[#7e4bd0]/50'
                        : 'bg-white border-[#7e4bd0] text-gray-800 hover:scale-102 hover:shadow-md active:scale-95'
                    }`}
                    style={{
                      borderColor: '#7e4bd0',
                      animationDelay: `${index * 0.08}s`,
                    }}
                  >
                    <span className={`text-base font-medium text-center transition-all duration-300 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                      {category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default Slide Component
const DefaultSlide = ({ slide }: { slide: Slide }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">اسلاید {slide.id === 'slide-2' ? '۲' : '۳'}</h2>
        <p className="text-gray-600">محتوای این اسلاید به زودی اضافه می‌شود</p>
      </div>
    </div>
  );
};

const Digifun = () => {
  const location = useLocation();
  const [step, setStep] = useState<number>(1);
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Reset step when navigating to base path
  useEffect(() => {
    if (location.pathname === '/digifun') {
      setStep(1);
      setSelectedMode('');
      setSelectedTime('');
      setSelectedCategories([]);
    }
  }, [location.pathname]);

  // Handle mode selection - go to next step
  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    setTimeout(() => {
      setStep(2);
    }, 300);
  };

  // Handle time selection - go to next step
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setTimeout(() => {
      setStep(3);
    }, 300);
  };

  // Handle categories selection
  const handleCategoriesSelect = (categories: string[]) => {
    setSelectedCategories(categories);
    // Here you can navigate to results or show content
    console.log('Selected:', {
      mode: selectedMode,
      time: selectedTime,
      categories: categories,
    });
    // TODO: Navigate to results page or show content
  };

  // Render content based on step
  const renderContent = () => {
    switch (step) {
      case 1:
        return <ModeSelectionSlide onModeSelect={handleModeSelect} key="step-1" />;
      case 2:
        return <TimeSelectionSlide onTimeSelect={handleTimeSelect} key="step-2" />;
      case 3:
        return (
          <CategorySelectionSlide 
            mode={selectedMode} 
            onCategoriesSelect={handleCategoriesSelect}
            key="step-3"
          />
        );
      default:
        return <ModeSelectionSlide onModeSelect={handleModeSelect} key="step-default" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden" dir="rtl">
      <style>{`
        @keyframes imageSlide {
          from {
            opacity: 0;
            transform: translateX(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes optionSlide {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes circleFill {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes checkmarkAppear {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-45deg);
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes numberFade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
        
        @keyframes lineFill {
          0% {
            border-color: rgba(255,255,255,0.5);
            opacity: 0.5;
          }
          50% {
            border-color: rgba(126, 75, 208, 0.5);
          }
          100% {
            border-color: #7e4bd0;
            opacity: 1;
          }
        }
        
        .animate-image-slide {
          animation: imageSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        .animate-option-slide {
          animation: optionSlide 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        .animate-circle-fill {
          animation: circleFill 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        
        .animate-checkmark-appear {
          animation: checkmarkAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        
        .animate-number-fade {
          animation: numberFade 0.4s ease-out both;
        }
        
        .animate-line-fill {
          animation: lineFill 0.6s ease-out both;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default Digifun;
