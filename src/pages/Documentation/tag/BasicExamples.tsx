/**
 * Basic Examples Page for Tag
 */

import { Tag, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withIconsCode, closableCode, withRightIconCode } from './codeExamples/codeExamples';

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
          Basic usage examples of the Tag component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Tag */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Tag
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag>Default Tag</Tag>
              <Tag color="primary">Primary</Tag>
              <Tag color="success">Success</Tag>
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Tag"
            />
          </div>

          {/* With Left Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Left Icon
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
              >
                Verified
              </Tag>
              <Tag
                color="success"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                Active
              </Tag>
            </div>
            <CodeBlock
              code={withIconsCode}
              title="Code"
              componentPath="@/components/shared/Tag"
            />
          </div>

          {/* With Right Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Right Icon
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                }
              >
                Completed
              </Tag>
            </div>
            <CodeBlock
              code={withRightIconCode}
              title="Code"
              componentPath="@/components/shared/Tag"
            />
          </div>

          {/* Closable */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Closable Tag
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag closable onClose={() => console.log('Tag closed')}>
                Closable Tag
              </Tag>
              <Tag color="danger" closable onClose={() => console.log('Tag closed')}>
                Remove
              </Tag>
            </div>
            <CodeBlock
              code={closableCode}
              title="Code"
              componentPath="@/components/shared/Tag"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

