/**
 * With Marks Page for Range
 */

import { useState } from 'react';
import { Range, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withMarksCode, withCustomMarksCode, withStepCode } from './codeExamples/codeExamples';

const WithMarks = () => {
  const { theme } = useDocumentationTheme();
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(50);
  const [value3, setValue3] = useState(50);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          With Marks
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Range component with marks and steps.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Marks */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Marks
            </h3>
            <div className="mb-4">
              <Range
                value={value1}
                showMarks
                marks={[0, 25, 50, 75, 100]}
                onChange={(val) => setValue1(val as number)}
              />
            </div>
            <CodeBlock
              code={withMarksCode}
              title="Code"
              componentPath="@/components/shared/Range"
            />
          </div>

          {/* With Custom Marks */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Custom Marks
            </h3>
            <div className="mb-4">
              <Range
                value={value2}
                marks={[
                  { value: 0, label: '0%' },
                  { value: 20, label: '20%' },
                  { value: 40, label: '40%' },
                  { value: 60, label: '60%' },
                  { value: 80, label: '80%' },
                  { value: 100, label: '100%' },
                ]}
                onChange={(val) => setValue2(val as number)}
              />
            </div>
            <CodeBlock
              code={withCustomMarksCode}
              title="Code"
              componentPath="@/components/shared/Range"
            />
          </div>

          {/* With Step */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Step
            </h3>
            <div className="mb-4">
              <Range
                value={value3}
                min={0}
                max={100}
                step={10}
                showMarks
                onChange={(val) => setValue3(val as number)}
              />
            </div>
            <CodeBlock
              code={withStepCode}
              title="Code"
              componentPath="@/components/shared/Range"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WithMarks;

