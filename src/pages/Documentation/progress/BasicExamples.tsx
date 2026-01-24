/**
 * Basic Examples Page for Progress
 */

import { Progress, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withLabelCode, indeterminateCode, withCustomMaxCode } from './codeExamples/codeExamples';

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
          Basic usage examples of the Progress component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Progress */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Progress
            </h3>
            <div className="mb-4">
              <Progress value={50} />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Progress"
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
            <div className="mb-4 space-y-4">
              <Progress value={50} showLabel />
              <Progress value={75} label="Loading..." />
              <Progress value={30} showLabel labelPosition="outside" />
            </div>
            <CodeBlock
              code={withLabelCode}
              title="Code"
              componentPath="@/components/shared/Progress"
            />
          </div>

          {/* Indeterminate */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Indeterminate
            </h3>
            <div className="mb-4">
              <Progress indeterminate />
            </div>
            <CodeBlock
              code={indeterminateCode}
              title="Code"
              componentPath="@/components/shared/Progress"
            />
          </div>

          {/* With Custom Max */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Custom Max
            </h3>
            <div className="mb-4">
              <Progress value={75} max={150} showLabel />
            </div>
            <CodeBlock
              code={withCustomMaxCode}
              title="Code"
              componentPath="@/components/shared/Progress"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

