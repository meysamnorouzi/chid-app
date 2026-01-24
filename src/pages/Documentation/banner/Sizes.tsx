/**
 * Sizes Page for Banner
 */

import { Banner, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { smallSizeCode, mediumSizeCode, largeSizeCode } from './codeExamples/codeExamples';

const Sizes = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Sizes
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different size options for the Banner component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Small (sm)
            </h3>
            <div className="mb-4">
              <Banner
                title="Small Banner"
                description="This is a small size banner."
                size="sm"
                type="info"
              />
            </div>
            <CodeBlock
              code={smallSizeCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Medium (md) - Default
            </h3>
            <div className="mb-4">
              <Banner
                title="Medium Banner"
                description="This is a medium size banner (default)."
                size="md"
                type="info"
              />
            </div>
            <CodeBlock
              code={mediumSizeCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Large (lg)
            </h3>
            <div className="mb-4">
              <Banner
                title="Large Banner"
                description="This is a large size banner."
                size="lg"
                type="info"
              />
            </div>
            <CodeBlock
              code={largeSizeCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sizes;

