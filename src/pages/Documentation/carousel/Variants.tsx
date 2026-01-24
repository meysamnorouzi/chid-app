/**
 * Variants Page for Carousel
 */

import { Carousel, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { defaultVariantCode, borderedVariantCode, shadowVariantCode, insideNavigationCode, outsideNavigationCode, bottomIndicatorsCode, topIndicatorsCode } from './codeExamples/codeExamples';

const Variants = () => {
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

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Variants
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different style variants for the Carousel component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default Variant
            </h3>
            <div className="mb-4">
              <Carousel variant="default" items={slides} />
            </div>
            <CodeBlock
              code={defaultVariantCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Bordered Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bordered Variant
            </h3>
            <div className="mb-4">
              <Carousel variant="bordered" items={slides} />
            </div>
            <CodeBlock
              code={borderedVariantCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Shadow Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Shadow Variant
            </h3>
            <div className="mb-4">
              <Carousel variant="shadow" items={slides} />
            </div>
            <CodeBlock
              code={shadowVariantCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Navigation Positions */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Navigation Position: Inside
            </h3>
            <div className="mb-4">
              <Carousel navigationPosition="inside" items={slides} />
            </div>
            <CodeBlock
              code={insideNavigationCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Navigation Position: Outside
            </h3>
            <div className="mb-4" style={{ padding: '0 50px' }}>
              <Carousel navigationPosition="outside" items={slides} />
            </div>
            <CodeBlock
              code={outsideNavigationCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          {/* Indicator Positions */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Indicator Position: Bottom
            </h3>
            <div className="mb-4">
              <Carousel indicatorPosition="bottom" items={slides} />
            </div>
            <CodeBlock
              code={bottomIndicatorsCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Indicator Position: Top
            </h3>
            <div className="mb-4">
              <Carousel indicatorPosition="top" items={slides} />
            </div>
            <CodeBlock
              code={topIndicatorsCode}
              title="Code"
              componentPath="@/components/shared/Carousel"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Variants;

