/**
 * Formats Page for DatePicker
 */

import { DatePicker, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { dateFormatsCode } from './codeExamples/codeExamples';

const Formats = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Date Formats
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different date format options available.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* All Formats */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              All Formats
            </h3>
            <div className="mb-4 flex flex-col gap-4 w-full max-w-xs">
              <DatePicker dateFormat="DD/MM/YYYY" />
              <DatePicker dateFormat="MM/DD/YYYY" />
              <DatePicker dateFormat="YYYY/MM/DD" />
              <DatePicker dateFormat="DD MMM YYYY" />
              <DatePicker dateFormat="MMM DD, YYYY" />
            </div>
            <CodeBlock
              code={dateFormatsCode}
              title="Code"
              componentPath="@/components/shared/DatePicker"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formats;

