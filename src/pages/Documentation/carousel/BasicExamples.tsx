/**
 * Basic Examples Page for Carousel
 */

import { Carousel, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withMultipleItemsCode, withoutNavigationCode, withoutIndicatorsCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

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
  ];

  const multipleItems = [
    <div key="1" className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.info.light }}>
      <span className="font-semibold" style={{ color: theme.colors.info.default }}>Item 1</span>
    </div>,
    <div key="2" className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.success.light }}>
      <span className="font-semibold" style={{ color: theme.colors.success.default }}>Item 2</span>
    </div>,
    <div key="3" className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.warning.light }}>
      <span className="font-semibold" style={{ color: theme.colors.warning.default }}>Item 3</span>
    </div>,
    <div key="4" className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.danger.light }}>
      <span className="font-semibold" style={{ color: theme.colors.danger.default }}>Item 4</span>
    </div>,
    <div key="5" className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.secondary.light }}>
      <span className="font-semibold" style={{ color: theme.colors.secondary.default }}>Item 5</span>
    </div>,
    <div key="6" className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.primary.light }}>
      <span className="font-semibold" style={{ color: theme.colors.primary.default }}>Item 6</span>
    </div>,
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Basic Examples
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Basic usage examples of the Carousel component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Carousel */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default Carousel
            </h3>
            <div className="mb-4">
              <Carousel items={slides} />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* With Multiple Items Per Slide */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Multiple Items Per Slide
            </h3>
            <div className="mb-4">
              <Carousel itemsPerSlide={3} items={multipleItems} />
            </div>
            <CodeBlock
              code={withMultipleItemsCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Without Navigation */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without Navigation Arrows
            </h3>
            <div className="mb-4">
              <Carousel showArrows={false} items={slides} />
            </div>
            <CodeBlock
              code={withoutNavigationCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Without Indicators */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without Indicators
            </h3>
            <div className="mb-4">
              <Carousel showIndicators={false} items={slides} />
            </div>
            <CodeBlock
              code={withoutIndicatorsCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

