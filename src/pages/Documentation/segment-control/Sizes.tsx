/**
 * Sizes Page for Segment Control
 */

import { useState } from 'react';
import { SegmentControl, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { sizesCode } from './codeExamples/codeExamples';

const Sizes = () => {
  const { theme } = useDocumentationTheme();
  const [value1, setValue1] = useState<string | number>('option1');
  const [value2, setValue2] = useState<string | number>('option1');
  const [value3, setValue3] = useState<string | number>('option1');

  const items = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

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
          Different size options for the Segment Control component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Small */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Small
            </h3>
            <div className="mb-4">
              <SegmentControl
                size="sm"
                items={items}
                value={value1}
                onChange={(val) => setValue1(val)}
              />
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
            <div className="mb-4">
              <SegmentControl
                size="md"
                items={items}
                value={value2}
                onChange={(val) => setValue2(val)}
              />
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
            <div className="mb-4">
              <SegmentControl
                size="lg"
                items={items}
                value={value3}
                onChange={(val) => setValue3(val)}
              />
            </div>
          </div>

          <CodeBlock
            code={sizesCode}
            title="Code"
            componentPath="@/components/shared/SegmentControl"
          />
        </div>
      </section>
    </div>
  );
};

export default Sizes;

