/**
 * Sizes Page for Radio
 */

import { useState } from 'react';
import { Radio, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { sizesCode } from './codeExamples/codeExamples';

const Sizes = () => {
  const { theme } = useDocumentationTheme();
  const [selected1, setSelected1] = useState<string | number>('1');
  const [selected2, setSelected2] = useState<string | number>('1');
  const [selected3, setSelected3] = useState<string | number>('1');

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
          Different size options for the Radio component.
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
            <div className="mb-4 flex gap-4">
              <Radio
                size="sm"
                label="Small"
                value="1"
                checked={selected1 === '1'}
                onChange={(value) => setSelected1(value)}
              />
              <Radio
                size="sm"
                label="Small Option 2"
                value="2"
                checked={selected1 === '2'}
                onChange={(value) => setSelected1(value)}
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
            <div className="mb-4 flex gap-4">
              <Radio
                size="md"
                label="Medium"
                value="1"
                checked={selected2 === '1'}
                onChange={(value) => setSelected2(value)}
              />
              <Radio
                size="md"
                label="Medium Option 2"
                value="2"
                checked={selected2 === '2'}
                onChange={(value) => setSelected2(value)}
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
            <div className="mb-4 flex gap-4">
              <Radio
                size="lg"
                label="Large"
                value="1"
                checked={selected3 === '1'}
                onChange={(value) => setSelected3(value)}
              />
              <Radio
                size="lg"
                label="Large Option 2"
                value="2"
                checked={selected3 === '2'}
                onChange={(value) => setSelected3(value)}
              />
            </div>
          </div>

          <CodeBlock
            code={sizesCode}
            title="Code"
            componentPath="@/components/shared/Radio"
          />
        </div>
      </section>
    </div>
  );
};

export default Sizes;

