/**
 * Basic Examples Page for Chips
 */

import { Chips, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, clickableCode, combinedCode } from './codeExamples/codeExamples';

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
          Basic usage examples of the Chips component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Chip */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Chip
            </h3>
            <div className="mb-4">
              <Chips>Basic Chip</Chips>
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Chips"
            />
          </div>

          {/* Clickable Chip */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Clickable Chip
            </h3>
            <div className="mb-4">
              <Chips clickable onClick={() => alert('Chip clicked!')}>
                Clickable Chip
              </Chips>
            </div>
            <CodeBlock
              code={clickableCode}
              title="Code"
              componentPath="@/components/shared/Chips"
            />
          </div>

          {/* Combined Example */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Combined Features
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Chips
                variant="primary"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
                deletable
                onDelete={() => console.log('Deleted!')}
              >
                Verified
              </Chips>
              <Chips
                variant="success"
                clickable
                onClick={() => console.log('Clicked!')}
              >
                Clickable
              </Chips>
            </div>
            <CodeBlock
              code={combinedCode}
              title="Code"
              componentPath="@/components/shared/Chips"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

