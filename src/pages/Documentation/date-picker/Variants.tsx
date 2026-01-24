/**
 * Variants Page for DatePicker
 */

import { DatePicker, CodeBlock } from '../../../components/shared';
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
          Different DatePicker variants available.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* All Variants */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              All Variants
            </h3>
            <div className="mb-4 flex flex-col gap-4 w-full max-w-xs">
              <DatePicker variant="primary" />
              <DatePicker variant="secondary" />
              <DatePicker variant="outline" />
              <DatePicker variant="ghost" />
            </div>
            <CodeBlock
              code={variantsCode}
              title="Code"
              componentPath="@/components/shared/DatePicker"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Variants;

