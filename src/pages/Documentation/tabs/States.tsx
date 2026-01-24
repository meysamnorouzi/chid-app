/**
 * States Page for Tabs
 */

import { useState } from 'react';
import { Tabs, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode, withDisabledTabCode, fullWidthCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [value1, setValue1] = useState<string | number>('tab1');
  const [value2, setValue2] = useState<string | number>('tab1');
  const [value3, setValue3] = useState<string | number>('tab1');

  const items = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' },
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
          Different states of the Tabs component.
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
              <Tabs
                items={items}
                disabled
                value={value1}
                onChange={(val) => setValue1(val)}
              />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Tabs"
            />
          </div>

          {/* With Disabled Tab */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Disabled Tab
            </h3>
            <div className="mb-4">
              <Tabs
                items={[
                  { value: 'tab1', label: 'Tab 1' },
                  { value: 'tab2', label: 'Tab 2', disabled: true },
                  { value: 'tab3', label: 'Tab 3' },
                ]}
                value={value2}
                onChange={(val) => setValue2(val)}
              />
            </div>
            <CodeBlock
              code={withDisabledTabCode}
              title="Code"
              componentPath="@/components/shared/Tabs"
            />
          </div>

          {/* Full Width */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Full Width
            </h3>
            <div className="mb-4">
              <Tabs
                items={items}
                fullWidth
                value={value3}
                onChange={(val) => setValue3(val)}
              />
            </div>
            <CodeBlock
              code={fullWidthCode}
              title="Code"
              componentPath="@/components/shared/Tabs"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

