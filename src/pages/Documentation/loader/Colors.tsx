/**
 * Colors Page for Loader
 */

import { Loader, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { colorsCode } from './codeExamples/codeExamples';

const Colors = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Colors
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different color schemes for the Loader component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* All Colors */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Available Colors
            </h3>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
              <Loader color="primary" />
              <Loader color="secondary" />
              <Loader color="success" />
              <Loader color="warning" />
              <Loader color="danger" />
              <Loader color="info" />
              <Loader color="gray" />
            </div>
          </div>

          {/* White Color */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              White Color (on dark background)
            </h3>
            <div className="mb-4 flex items-center gap-4" style={{ backgroundColor: theme.colors.gray[800], padding: '20px', borderRadius: '8px' }}>
              <Loader color="white" />
            </div>
          </div>

          <CodeBlock
            code={colorsCode}
            title="Code"
            componentPath="@/components/shared/Loader"
          />
        </div>
      </section>
    </div>
  );
};

export default Colors;

