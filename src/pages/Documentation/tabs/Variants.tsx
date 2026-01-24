/**
 * Variants Page for Tabs
 */

import { useState } from 'react';
import { Tabs, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
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
          Variants
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different visual variants of the Tabs component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default
            </h3>
            <div className="mb-4">
              <Tabs
                variant="default"
                items={items}
                value={value1}
                onChange={(val) => setValue1(val)}
              />
            </div>
          </div>

          {/* Underlined Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Underlined
            </h3>
            <div className="mb-4">
              <Tabs
                variant="underlined"
                items={items}
                value={value2}
                onChange={(val) => setValue2(val)}
              />
            </div>
          </div>

          {/* Pills Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Pills
            </h3>
            <div className="mb-4">
              <Tabs
                variant="pills"
                items={items}
                value={value3}
                onChange={(val) => setValue3(val)}
              />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/Tabs"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

