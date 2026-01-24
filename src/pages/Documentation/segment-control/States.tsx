/**
 * States Page for Segment Control
 */

import { useState } from 'react';
import { SegmentControl, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode, withDisabledItemCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [value1, setValue1] = useState<string | number>('option1');
  const [value2, setValue2] = useState<string | number>('option1');

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
          States
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different states of the Segment Control component.
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
            <div className="mb-4">
              <SegmentControl
                items={items}
                disabled
                value={value1}
                onChange={(val) => setValue1(val)}
              />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/SegmentControl"
            />
          </div>

          {/* With Disabled Item */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Disabled Item
            </h3>
            <div className="mb-4">
              <SegmentControl
                items={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2', disabled: true },
                  { value: 'option3', label: 'Option 3' },
                ]}
                value={value2}
                onChange={(val) => setValue2(val)}
              />
            </div>
            <CodeBlock
              code={withDisabledItemCode}
              title="Code"
              componentPath="@/components/shared/SegmentControl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

