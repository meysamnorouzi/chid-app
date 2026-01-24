/**
 * Basic Examples Page for Tooltip
 */

import { Tooltip, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withIconCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

  // Icon
  const Icon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

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
          Basic usage examples of the Tooltip component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Tooltip */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Tooltip
            </h3>
            <div className="mb-4">
              <Tooltip content="This is a tooltip">
                <Button>Hover me</Button>
              </Tooltip>
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Tooltip"
            />
          </div>

          {/* With Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Icon
            </h3>
            <div className="mb-4">
              <Tooltip 
                content={
                  <div className="flex items-center gap-2">
                    {Icon}
                    <span>This is a tooltip with icon</span>
                  </div>
                }
              >
                <Button>Hover me</Button>
              </Tooltip>
            </div>
            <CodeBlock
              code={withIconCode}
              title="Code"
              componentPath="@/components/shared/Tooltip"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

