/**
 * Variants Page for Radio
 */

import { useState } from 'react';
import { Radio, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
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
          Variants
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different visual variants of the Radio component.
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
            <div className="mb-4 flex gap-4">
              <Radio
                variant="default"
                label="Option 1"
                value="1"
                checked={selected1 === '1'}
                onChange={(value) => setSelected1(value)}
              />
              <Radio
                variant="default"
                label="Option 2"
                value="2"
                checked={selected1 === '2'}
                onChange={(value) => setSelected1(value)}
              />
            </div>
          </div>

          {/* Outline Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outline
            </h3>
            <div className="mb-4 flex gap-4">
              <Radio
                variant="outline"
                label="Option 1"
                value="1"
                checked={selected2 === '1'}
                onChange={(value) => setSelected2(value)}
              />
              <Radio
                variant="outline"
                label="Option 2"
                value="2"
                checked={selected2 === '2'}
                onChange={(value) => setSelected2(value)}
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
            <div className="mb-4 flex gap-4">
              <Radio
                variant="filled"
                label="Option 1"
                value="1"
                checked={selected3 === '1'}
                onChange={(value) => setSelected3(value)}
              />
              <Radio
                variant="filled"
                label="Option 2"
                value="2"
                checked={selected3 === '2'}
                onChange={(value) => setSelected3(value)}
              />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/Radio"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

