/**
 * Variants Page for Loader
 */

import { Loader, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
  const { theme } = useDocumentationTheme();

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
          Different visual variants of the Loader component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Spinner */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Spinner
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader variant="spinner" />
            </div>
          </div>

          {/* Dots */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Dots
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader variant="dots" />
            </div>
          </div>

          {/* Bars */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bars
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader variant="bars" />
            </div>
          </div>

          {/* Pulse */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Pulse
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader variant="pulse" />
            </div>
          </div>

          {/* Ring */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Ring
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <Loader variant="ring" />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/Loader"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

