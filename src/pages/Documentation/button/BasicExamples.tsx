/**
 * Basic Examples Page for Button
 */

import { Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withOnClickCode, buttonTypesCode } from './codeExamples/codeExamples';

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
          Basic usage examples of the Button component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Button */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Button
            </h3>
            <div className="mb-4">
              <Button>Click me</Button>
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Button"
            />
          </div>

          {/* With onClick */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With onClick Handler
            </h3>
            <div className="mb-4">
              <Button onClick={() => alert('Button clicked!')}>
                Click me
              </Button>
            </div>
            <CodeBlock
              code={withOnClickCode}
              title="Code"
              componentPath="@/components/shared/Button"
            />
          </div>

          {/* Button Types */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Button Types
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Button type="button">Button</Button>
              <Button type="submit">Submit</Button>
              <Button type="reset">Reset</Button>
            </div>
            <CodeBlock
              code={buttonTypesCode}
              title="Code"
              componentPath="@/components/shared/Button"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

