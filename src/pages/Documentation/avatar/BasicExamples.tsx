/**
 * Basic Examples Page for Avatar
 */

import { Avatar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withImageCode, withFallbackCode, withIconCode } from './codeExamples/codeExamples';

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
          Basic usage examples of the Avatar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Avatar */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default Avatar
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                fallback="JD"
                alt="John Doe"
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* With Image */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Image
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg"
                alt="User Avatar"
                fallback="JD"
              />
            </div>
            <CodeBlock
              code={withImageCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* With Fallback */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Fallback (Initials)
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                fallback="JD"
                alt="John Doe"
              />
              <Avatar
                fallback="AB"
                alt="Alice Brown"
              />
              <Avatar
                fallback="SM"
                alt="Sarah Miller"
              />
            </div>
            <CodeBlock
              code={withFallbackCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
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
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                alt="User"
              />
            </div>
            <CodeBlock
              code={withIconCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

