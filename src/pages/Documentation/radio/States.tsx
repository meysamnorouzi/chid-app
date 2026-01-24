/**
 * States Page for Radio
 */

import { useState } from 'react';
import { Radio, RadioGroup, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode, horizontalGroupCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [selectedValue, setSelectedValue] = useState<string | number>('1');

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
          Different states of the Radio component.
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
            <div className="mb-4 flex gap-4">
              <Radio label="Disabled" value="1" disabled />
              <Radio label="Disabled Checked" value="2" checked disabled />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Radio"
            />
          </div>

          {/* Horizontal Group */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Horizontal Group
            </h3>
            <div className="mb-4">
              <RadioGroup
                orientation="horizontal"
                options={[
                  { label: 'Option 1', value: '1' },
                  { label: 'Option 2', value: '2' },
                  { label: 'Option 3', value: '3' },
                ]}
                value={selectedValue}
                onChange={(value) => setSelectedValue(value)}
              />
            </div>
            <CodeBlock
              code={horizontalGroupCode}
              title="Code"
              componentPath="@/components/shared/Radio"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

