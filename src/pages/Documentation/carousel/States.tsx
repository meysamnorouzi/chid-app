/**
 * States Page for Carousel
 */

import { useState } from 'react';
import { Carousel, CodeBlock, Button } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { autoplayCode, nonInfiniteCode, controlledIndexCode, swipeableCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    <div key="1" className="h-64 bg-blue-100 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.info.light }}>
      <span className="text-2xl font-semibold" style={{ color: theme.colors.info.default }}>Slide 1</span>
    </div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.success.light }}>
      <span className="text-2xl font-semibold" style={{ color: theme.colors.success.default }}>Slide 2</span>
    </div>,
    <div key="3" className="h-64 bg-purple-100 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.secondary.light }}>
      <span className="text-2xl font-semibold" style={{ color: theme.colors.secondary.default }}>Slide 3</span>
    </div>,
    <div key="4" className="h-64 bg-yellow-100 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.warning.light }}>
      <span className="text-2xl font-semibold" style={{ color: theme.colors.warning.default }}>Slide 4</span>
    </div>,
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          States
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different states and behaviors for the Carousel component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Autoplay */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Autoplay
            </h3>
            <div className="mb-4">
              <Carousel 
                autoplay={true} 
                autoplayInterval={3000}
                items={slides} 
              />
            </div>
            <CodeBlock
              code={autoplayCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Non-Infinite */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Non-Infinite Loop
            </h3>
            <div className="mb-4">
              <Carousel infinite={false} items={slides} />
            </div>
            <CodeBlock
              code={nonInfiniteCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Controlled Index */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Controlled Index
            </h3>
            <div className="mb-4 space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => setCurrentIndex(0)} variant="outline" size="sm">
                  Go to Slide 1
                </Button>
                <Button onClick={() => setCurrentIndex(1)} variant="outline" size="sm">
                  Go to Slide 2
                </Button>
                <Button onClick={() => setCurrentIndex(2)} variant="outline" size="sm">
                  Go to Slide 3
                </Button>
                <Button onClick={() => setCurrentIndex(3)} variant="outline" size="sm">
                  Go to Slide 4
                </Button>
              </div>
              <div>
                <p className="text-sm mb-2" style={{ color: theme.colors.gray[600] }}>
                  Current slide: {currentIndex + 1}
                </p>
                <Carousel 
                  currentIndex={currentIndex}
                  onSlideChange={(index) => setCurrentIndex(index)}
                  items={slides} 
                />
              </div>
            </div>
            <CodeBlock
              code={controlledIndexCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Swipeable */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Swipeable (Touch Support)
            </h3>
            <div className="mb-4">
              <p className="text-sm mb-2" style={{ color: theme.colors.gray[600] }}>
                Swipe left or right on touch devices to navigate
              </p>
              <Carousel swipeable={true} items={slides} />
            </div>
            <CodeBlock
              code={swipeableCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

