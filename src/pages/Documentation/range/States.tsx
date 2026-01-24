/**
 * States Page for Range
 */

import { useState } from 'react';
import { Range, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [value, setValue] = useState(50);
  const [rangeValues, setRangeValues] = useState<[number, number]>([20, 80]);

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
          Different states of the Range component.
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
              <Range
                value={50}
                disabled
                onChange={(val) => console.log(val)}
              />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Range"
            />
          </div>

          {/* Range Disabled */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Range Disabled
            </h3>
            <div className="mb-4">
              <Range
                range
                values={[20, 80]}
                disabled
                onChange={(vals) => console.log(vals)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

