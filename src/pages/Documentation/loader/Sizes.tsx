/**
 * Sizes Page for Loader
 */

import { Loader, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { sizesCode } from './codeExamples/codeExamples';

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
          Different size options for the Loader component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Extra Small */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Extra Small
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader size="xs" />
            </div>
          </div>

          {/* Small */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Small
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader size="sm" />
            </div>
          </div>

          {/* Medium */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Medium
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader size="md" />
            </div>
          </div>

          {/* Large */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Large
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader size="lg" />
            </div>
          </div>

          {/* Extra Large */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Extra Large
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader size="xl" />
            </div>
          </div>

          <CodeBlock
            code={sizesCode}
            title="Code"
            componentPath="@/components/shared/Loader"
          />
        </div>
      </section>
    </div>
  );
};

export default Sizes;

