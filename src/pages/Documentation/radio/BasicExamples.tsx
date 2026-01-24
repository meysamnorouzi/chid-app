/**
 * Basic Examples Page for Radio
 */

import { useState } from 'react';
import { Radio, RadioGroup, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, radioGroupCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();
  const [selectedValue, setSelectedValue] = useState<string | number>('1');
  const [groupValue, setGroupValue] = useState<string | number>('1');

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
          Basic usage examples of the Radio component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Radio */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Radio
            </h3>
            <div className="mb-4 flex gap-4">
              <Radio
                label="Option 1"
                value="1"
                checked={selectedValue === '1'}
                onChange={(value) => setSelectedValue(value)}
              />
              <Radio
                label="Option 2"
                value="2"
                checked={selectedValue === '2'}
                onChange={(value) => setSelectedValue(value)}
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Radio"
            />
          </div>

          {/* Radio Group */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Radio Group
            </h3>
            <div className="mb-4">
              <RadioGroup
                options={[
                  { label: 'Option 1', value: '1' },
                  { label: 'Option 2', value: '2' },
                  { label: 'Option 3', value: '3' },
                ]}
                value={groupValue}
                onChange={(value) => setGroupValue(value)}
              />
            </div>
            <CodeBlock
              code={radioGroupCode}
              title="Code"
              componentPath="@/components/shared/Radio"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

