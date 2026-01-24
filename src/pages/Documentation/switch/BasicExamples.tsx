/**
 * Basic Examples Page for Switch
 */

import { useState } from 'react';
import { Switch, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withLabelCode, withDescriptionCode, labelPositionCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);

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
          Basic usage examples of the Switch component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Switch */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Switch
            </h3>
            <div className="mb-4">
              <Switch
                checked={checked1}
                onChange={(val) => setChecked1(val)}
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Switch"
            />
          </div>

          {/* With Label */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Label
            </h3>
            <div className="mb-4">
              <Switch
                label="Enable notifications"
                checked={checked2}
                onChange={(val) => setChecked2(val)}
              />
            </div>
            <CodeBlock
              code={withLabelCode}
              title="Code"
              componentPath="@/components/shared/Switch"
            />
          </div>

          {/* With Description */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Description
            </h3>
            <div className="mb-4">
              <Switch
                label="Enable notifications"
                description="Receive push notifications on your device"
                checked={checked3}
                onChange={(val) => setChecked3(val)}
              />
            </div>
            <CodeBlock
              code={withDescriptionCode}
              title="Code"
              componentPath="@/components/shared/Switch"
            />
          </div>

          {/* Label Position */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Label Position
            </h3>
            <div className="mb-4 space-y-4">
              <Switch
                label="Label on left"
                labelPosition="left"
                checked={checked4}
                onChange={(val) => setChecked4(val)}
              />
              <Switch
                label="Label on right"
                labelPosition="right"
                checked={checked5}
                onChange={(val) => setChecked5(val)}
              />
            </div>
            <CodeBlock
              code={labelPositionCode}
              title="Code"
              componentPath="@/components/shared/Switch"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

