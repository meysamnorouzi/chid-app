/**
 * States Page for DatePicker
 */

import { DatePicker, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode, withoutIconCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();

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
          Different DatePicker states available.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Disabled State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled State
            </h3>
            <div className="mb-4 w-full max-w-xs">
              <DatePicker disabled />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/DatePicker"
            />
          </div>

          {/* Without Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without Icon
            </h3>
            <div className="mb-4 w-full max-w-xs">
              <DatePicker showIcon={false} />
            </div>
            <CodeBlock
              code={withoutIconCode}
              title="Code"
              componentPath="@/components/shared/DatePicker"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

