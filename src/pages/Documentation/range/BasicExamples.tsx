/**
 * Basic Examples Page for Range
 */

import { useState } from 'react';
import { Range, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, rangeCode, withLabelCode, withLabelsCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();
  const [value, setValue] = useState(50);
  const [rangeValues, setRangeValues] = useState<[number, number]>([20, 80]);
  const [valueWithLabel, setValueWithLabel] = useState(50);
  const [valueWithLabels, setValueWithLabels] = useState(50);

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
          Basic usage examples of the Range component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Range */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Range
            </h3>
            <div className="mb-4">
              <Range
                value={value}
                onChange={(val) => setValue(val as number)}
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Range"
            />
          </div>

          {/* Range (Two Thumbs) */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Range (Two Thumbs)
            </h3>
            <div className="mb-4">
              <Range
                range
                values={rangeValues}
                onChange={(vals) => setRangeValues(vals as [number, number])}
              />
            </div>
            <CodeBlock
              code={rangeCode}
              title="Code"
              componentPath="@/components/shared/Range"
            />
          </div>

          {/* With Label and Helper Text */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Label and Helper Text
            </h3>
            <div className="mb-4">
              <Range
                label="Price Range"
                helperText="Select your preferred price range"
                value={valueWithLabel}
                onChange={(val) => setValueWithLabel(val as number)}
              />
            </div>
            <CodeBlock
              code={withLabelCode}
              title="Code"
              componentPath="@/components/shared/Range"
            />
          </div>

          {/* With Value Labels */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Value Labels
            </h3>
            <div className="mb-4">
              <Range
                value={valueWithLabels}
                showLabels
                onChange={(val) => setValueWithLabels(val as number)}
              />
            </div>
            <CodeBlock
              code={withLabelsCode}
              title="Code"
              componentPath="@/components/shared/Range"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

