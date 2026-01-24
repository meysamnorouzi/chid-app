/**
 * Sizes Page for FloatingToolbar
 */

import { FloatingToolbar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { sizesCode } from './codeExamples/codeExamples';

const Sizes = () => {
  const { theme } = useDocumentationTheme();

  const actions = [
    {
      id: 'bold',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9M6 4v16" />
        </svg>
      ),
      onClick: () => console.log('Bold clicked'),
    },
    {
      id: 'italic',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4M10 4v16M10 4l-4 8M14 4l4 8" />
        </svg>
      ),
      onClick: () => console.log('Italic clicked'),
    },
  ];

  const actionsMd = [
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
  ];

  const actionsLg = [
    {
      id: 'bold',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9M6 4v16" />
        </svg>
      ),
      onClick: () => console.log('Bold clicked'),
    },
    {
      id: 'italic',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4M10 4v16M10 4l-4 8M14 4l4 8" />
        </svg>
      ),
      onClick: () => console.log('Italic clicked'),
    },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Sizes
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different size options for the FloatingToolbar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Small */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Small
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                size="sm"
                actions={actions}
                position="bottom"
              />
            </div>
          </div>

          {/* Medium */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Medium
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                size="md"
                actions={actionsMd}
                position="bottom"
              />
            </div>
          </div>

          {/* Large */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Large
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                size="lg"
                actions={actionsLg}
                position="bottom"
              />
            </div>
          </div>

          <CodeBlock
            code={sizesCode}
            title="Code"
            componentPath="@/components/shared/FloatingToolbar"
          />
        </div>
      </section>
    </div>
  );
};

export default Sizes;

