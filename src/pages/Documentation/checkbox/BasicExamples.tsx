/**
 * Basic Examples Page for Checkbox
 */

import { Checkbox, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withDefaultCheckedCode, withDescriptionCode, controlledCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

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
          Basic usage examples of the Checkbox component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Checkbox */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default Checkbox
            </h3>
            <div className="mb-4">
              <Checkbox
                label="Accept terms and conditions"
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* With Default Checked */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Default Checked
            </h3>
            <div className="mb-4">
              <Checkbox
                label="Subscribe to newsletter"
                defaultChecked={true}
              />
            </div>
            <CodeBlock
              code={withDefaultCheckedCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
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
              <Checkbox
                label="Enable notifications"
                description="You will receive push notifications on your device"
              />
            </div>
            <CodeBlock
              code={withDescriptionCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Controlled */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Controlled Checkbox
            </h3>
            <div className="mb-4">
              <Checkbox
                label="Controlled checkbox"
                checked={false}
                onChange={(checked) => console.log('Checked:', checked)}
              />
            </div>
            <CodeBlock
              code={controlledCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

