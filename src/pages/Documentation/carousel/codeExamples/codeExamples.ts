/**
 * Carousel Code Examples
 * 
 * All code examples for Carousel component documentation
 */

// Basic Examples
export const basicUsageCode = `import { Carousel } from '@/components/shared';

<Carousel
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg flex items-center justify-center">
      <span className="text-2xl">Slide 1</span>
    </div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg flex items-center justify-center">
      <span className="text-2xl">Slide 2</span>
    </div>,
    <div key="3" className="h-64 bg-purple-100 rounded-lg flex items-center justify-center">
      <span className="text-2xl">Slide 3</span>
    </div>,
  ]}
/>`;

export const withMultipleItemsCode = `import { Carousel } from '@/components/shared';

<Carousel
  itemsPerSlide={3}
  items={[
    <div key="1" className="h-32 bg-blue-100 rounded-lg">Item 1</div>,
    <div key="2" className="h-32 bg-green-100 rounded-lg">Item 2</div>,
    <div key="3" className="h-32 bg-purple-100 rounded-lg">Item 3</div>,
    <div key="4" className="h-32 bg-yellow-100 rounded-lg">Item 4</div>,
    <div key="5" className="h-32 bg-pink-100 rounded-lg">Item 5</div>,
    <div key="6" className="h-32 bg-indigo-100 rounded-lg">Item 6</div>,
  ]}
/>`;

export const withoutNavigationCode = `import { Carousel } from '@/components/shared';

<Carousel
  showArrows={false}
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
    <div key="3" className="h-64 bg-purple-100 rounded-lg">Slide 3</div>,
  ]}
/>`;

export const withoutIndicatorsCode = `import { Carousel } from '@/components/shared';

<Carousel
  showIndicators={false}
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
    <div key="3" className="h-64 bg-purple-100 rounded-lg">Slide 3</div>,
  ]}
/>`;

// Variants
export const defaultVariantCode = `import { Carousel } from '@/components/shared';

<Carousel
  variant="default"
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
  ]}
/>`;

export const borderedVariantCode = `import { Carousel } from '@/components/shared';

<Carousel
  variant="bordered"
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
  ]}
/>`;

export const shadowVariantCode = `import { Carousel } from '@/components/shared';

<Carousel
  variant="shadow"
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
  ]}
/>`;

// Navigation Positions
export const insideNavigationCode = `import { Carousel } from '@/components/shared';

<Carousel
  navigationPosition="inside"
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
  ]}
/>`;

export const outsideNavigationCode = `import { Carousel } from '@/components/shared';

<Carousel
  navigationPosition="outside"
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
  ]}
/>`;

// Indicator Positions
export const bottomIndicatorsCode = `import { Carousel } from '@/components/shared';

<Carousel
  indicatorPosition="bottom"
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
  ]}
/>`;

export const topIndicatorsCode = `import { Carousel } from '@/components/shared';

<Carousel
  indicatorPosition="top"
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
  ]}
/>`;

// States
export const autoplayCode = `import { Carousel } from '@/components/shared';

<Carousel
  autoplay={true}
  autoplayInterval={3000}
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
    <div key="3" className="h-64 bg-purple-100 rounded-lg">Slide 3</div>,
  ]}
/>`;

export const nonInfiniteCode = `import { Carousel } from '@/components/shared';

<Carousel
  infinite={false}
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
    <div key="3" className="h-64 bg-purple-100 rounded-lg">Slide 3</div>,
  ]}
/>`;

export const controlledIndexCode = `import { Carousel } from '@/components/shared';
import { useState } from 'react';

const [currentIndex, setCurrentIndex] = useState(0);

<Carousel
  currentIndex={currentIndex}
  onSlideChange={(index) => setCurrentIndex(index)}
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
    <div key="3" className="h-64 bg-purple-100 rounded-lg">Slide 3</div>,
  ]}
/>`;

export const swipeableCode = `import { Carousel } from '@/components/shared';

<Carousel
  swipeable={true}
  items={[
    <div key="1" className="h-64 bg-blue-100 rounded-lg">Slide 1</div>,
    <div key="2" className="h-64 bg-green-100 rounded-lg">Slide 2</div>,
    <div key="3" className="h-64 bg-purple-100 rounded-lg">Slide 3</div>,
  ]}
/>`;

