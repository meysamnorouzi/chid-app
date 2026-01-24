/**
 * With Icons Page for Chips
 */

import { Chips, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withLeftIconCode, withRightIconCode } from './codeExamples/codeExamples';

const WithIcons = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          With Icons
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Chips with icons examples.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Left Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Left Icon
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Chips
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
              >
                Verified
              </Chips>
              <Chips
                variant="success"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                New
              </Chips>
            </div>
            <CodeBlock
              code={withLeftIconCode}
              title="Code"
              componentPath="@/components/shared/Chips"
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
              <Chips
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Next
              </Chips>
              <Chips
                variant="info"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
              >
                Continue
              </Chips>
            </div>
            <CodeBlock
              code={withRightIconCode}
              title="Code"
              componentPath="@/components/shared/Chips"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WithIcons;

