/**
 * Shapes Page for Chips
 */

import { Chips, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { shapesCode } from './codeExamples/codeExamples';

const Shapes = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Shapes
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different chip shapes available.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* All Shapes */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              All Shapes
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Chips shape="default">Default</Chips>
              <Chips shape="rounded">Rounded</Chips>
              <Chips shape="pill">Pill</Chips>
            </div>
            <CodeBlock
              code={shapesCode}
              title="Code"
              componentPath="@/components/shared/Chips"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shapes;

