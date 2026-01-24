/**
 * Variants Page for Segment Control
 */

import { useState } from 'react';
import { SegmentControl, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
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
          Variants
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different visual variants of the Segment Control component.
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
              <SegmentControl
                variant="default"
                items={items}
                value={value1}
                onChange={(val) => setValue1(val)}
              />
            </div>
          </div>

          {/* Filled Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Filled
            </h3>
            <div className="mb-4">
              <SegmentControl
                variant="filled"
                items={items}
                value={value2}
                onChange={(val) => setValue2(val)}
              />
            </div>
          </div>

          {/* Outlined Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outlined
            </h3>
            <div className="mb-4">
              <SegmentControl
                variant="outlined"
                items={items}
                value={value3}
                onChange={(val) => setValue3(val)}
              />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/SegmentControl"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

