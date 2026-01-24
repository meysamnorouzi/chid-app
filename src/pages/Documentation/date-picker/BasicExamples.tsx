/**
 * Basic Examples Page for DatePicker
 */

import { useState } from 'react';
import { DatePicker, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withValueCode, customPlaceholderCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Basic Examples
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Basic usage examples of the DatePicker component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic DatePicker */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic DatePicker
            </h3>
            <div className="mb-4">
              <DatePicker />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/DatePicker"
            />
          </div>

          {/* With Value */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Value
            </h3>
            <div className="mb-4">
              <DatePicker
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </div>
            <CodeBlock
              code={withValueCode}
              title="Code"
              componentPath="@/components/shared/DatePicker"
            />
          </div>

          {/* Custom Placeholder */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Custom Placeholder
            </h3>
            <div className="mb-4">
              <DatePicker placeholder="Choose a date" />
            </div>
            <CodeBlock
              code={customPlaceholderCode}
              title="Code"
              componentPath="@/components/shared/DatePicker"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

