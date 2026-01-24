/**
 * With Icons Page for Button
 */

import { Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withLeftIconCode, withRightIconCode, withBadgeCode } from './codeExamples/codeExamples';

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
          Buttons with icons and badges.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Left Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Left Icon
            </h3>
            <div className="mb-4">
              <Button
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Add Item
              </Button>
            </div>
            <CodeBlock
              code={withLeftIconCode}
              title="Code"
              componentPath="@/components/shared/Button"
            />
          </div>

          {/* Right Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Right Icon
            </h3>
            <div className="mb-4">
              <Button
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Next
              </Button>
            </div>
            <CodeBlock
              code={withRightIconCode}
              title="Code"
              componentPath="@/components/shared/Button"
            />
          </div>

          {/* With Badge */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Badge
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Button badge={5}>Notifications</Button>
              <Button badge="New">Messages</Button>
            </div>
            <CodeBlock
              code={withBadgeCode}
              title="Code"
              componentPath="@/components/shared/Button"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WithIcons;

