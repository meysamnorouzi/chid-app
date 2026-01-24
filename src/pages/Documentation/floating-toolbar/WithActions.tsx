/**
 * With Actions Page for FloatingToolbar
 */

import { FloatingToolbar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { verticalOrientationCode, withCustomOffsetCode } from './codeExamples/codeExamples';

const WithActions = () => {
  const { theme } = useDocumentationTheme();

  const actions = [
    {
      id: 'bold',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9M6 4v16" />
        </svg>
      ),
      onClick: () => console.log('Bold clicked'),
    },
    {
      id: 'italic',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4M10 4v16M10 4l-4 8M14 4l4 8" />
        </svg>
      ),
      onClick: () => console.log('Italic clicked'),
    },
    {
      id: 'underline',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19h14M5 5v8a4 4 0 008 0V5" />
        </svg>
      ),
      onClick: () => console.log('Underline clicked'),
    },
    {
      id: 'link',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      onClick: () => console.log('Link clicked'),
    },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Advanced Actions
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Advanced usage examples with custom orientations and offsets.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Vertical Orientation */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Vertical Orientation
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                orientation="vertical"
                position="right"
                actions={actions}
              />
            </div>
            <CodeBlock
              code={verticalOrientationCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>

          {/* Custom Offset */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Custom Offset
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="bottom-right"
                offset={{ bottom: 40, right: 40 }}
                actions={actions}
              />
            </div>
            <CodeBlock
              code={withCustomOffsetCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WithActions;

