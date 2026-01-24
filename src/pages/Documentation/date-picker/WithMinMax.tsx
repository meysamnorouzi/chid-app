/**
 * With Min Max Page for DatePicker
 */

import { DatePicker, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withMinMaxCode } from './codeExamples/codeExamples';

const WithMinMax = () => {
  const { theme } = useDocumentationTheme();

  const minDate = new Date(2020, 0, 1);
  const maxDate = new Date(2025, 11, 31);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          With Min/Max Dates
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          DatePicker with minimum and maximum date constraints.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Min Max */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Date Range Constraint
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: theme.colors.gray[600] }}
            >
              Dates between January 1, 2020 and December 31, 2025 are selectable.
            </p>
            <div className="mb-4 w-full max-w-xs">
              <DatePicker
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
            <CodeBlock
              code={withMinMaxCode}
              title="Code"
              componentPath="@/components/shared/DatePicker"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WithMinMax;

