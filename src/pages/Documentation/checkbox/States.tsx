/**
 * States Page for Checkbox
 */

import { useState } from 'react';
import { Checkbox, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode, disabledCheckedCode, indeterminateCode, withFormCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [checked, setChecked] = useState(false);

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
          Different states and behaviors for the Checkbox component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Disabled */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled State
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Disabled checkbox"
                disabled={true}
              />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Disabled Checked */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled Checked State
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Disabled checked checkbox"
                disabled={true}
                defaultChecked={true}
              />
            </div>
            <CodeBlock
              code={disabledCheckedCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Indeterminate */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Indeterminate State
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Indeterminate checkbox"
                indeterminate={true}
              />
            </div>
            <CodeBlock
              code={indeterminateCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Controlled State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Controlled State
            </h3>
            <div className="mb-4 space-y-4">
              <div>
                <Checkbox
                  label={`Controlled checkbox (${checked ? 'checked' : 'unchecked'})`}
                  checked={checked}
                  onChange={(checked) => setChecked(checked)}
                />
              </div>
              <p className="text-sm mt-2" style={{ color: theme.colors.gray[600] }}>
                Current state: {checked ? 'Checked' : 'Unchecked'}
              </p>
            </div>
            <CodeBlock
              code={`import { Checkbox } from '@/components/shared';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Checkbox
  label="Controlled checkbox"
  checked={checked}
  onChange={(checked) => setChecked(checked)}
/>`}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* With Form */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Form
            </h3>
            <div className="mb-4 space-y-4">
              <form>
                <Checkbox
                  name="accept"
                  value="yes"
                  label="I accept the terms and conditions"
                />
              </form>
            </div>
            <CodeBlock
              code={withFormCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

