import { useState, useEffect } from 'react';
import './Onboarding.css';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const steps = [
    {
      title: 'به دنیای دیجی خوش آمدید',
      description: 'تجربه جدیدی از یادگیری و سرگرمی را با ما آغاز کنید',
    },
    {
      title: 'یادگیری تعاملی',
      description: 'با محتوای جذاب و تعاملی، یادگیری را لذت‌بخش کنید',
    },
    {
      title: 'شروع کنید',
      description: 'همین حالا سفر خود را آغاز کنید',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to home or main app
      window.location.href = '/';
    }
  };

  const handleSkip = () => {
    // Navigate to home or main app
    window.location.href = '/';
  };

  return (
    <div className="onboarding-container app-shell">
      {/* Video Background */}
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`onboarding-video ${isVideoLoaded ? 'loaded' : ''}`}
        >
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/1017272898/rendition/720p/file.mp4?loc=external&log_user=0&signature=d02d61e39102e10801a1316ce6ba75bc842b6f7008f05fe111b3cac233caf241"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Content */}
      <div className="onboarding-content">
        {/* Skip Button */}
        <button className="skip-button" onClick={handleSkip}>
          رد کردن
        </button>

        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`step-dot ${index === currentStep ? 'active' : ''} ${
                index < currentStep ? 'completed' : ''
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="step-content">
          <h1 className="step-title">{steps[currentStep].title}</h1>
          <p className="step-description">{steps[currentStep].description}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          {currentStep > 0 && (
            <button
              className="nav-button prev-button"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              قبلی
            </button>
          )}
          <button className="nav-button next-button" onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'شروع' : 'بعدی'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
