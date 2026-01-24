/**
 * Positions Page for FloatingToolbar
 */

import { FloatingToolbar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { positionsCode } from './codeExamples/codeExamples';

const Positions = () => {
  const { theme } = useDocumentationTheme();

  const actions = [
    {
      id: 'action1',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      onClick: () => console.log('Action clicked'),
    },
    {
      id: 'action2',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      onClick: () => console.log('Action clicked'),
    },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Positions
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different positioning options for the FloatingToolbar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-12 w-full">
          {/* Top */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Top
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="top"
                actions={actions}
              />
            </div>
          </div>

          {/* Bottom */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bottom
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="bottom"
                actions={actions}
              />
            </div>
          </div>

          {/* Left */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Left
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="left"
                actions={actions}
              />
            </div>
          </div>

          {/* Right */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Right
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="right"
                actions={actions}
              />
            </div>
          </div>

          {/* Top Left */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Top Left
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="top-left"
                actions={actions}
              />
            </div>
          </div>

          {/* Top Right */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Top Right
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="top-right"
                actions={actions}
              />
            </div>
          </div>

          {/* Bottom Left */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bottom Left
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="bottom-left"
                actions={actions}
              />
            </div>
          </div>

          {/* Bottom Right */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bottom Right
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                position="bottom-right"
                actions={actions}
              />
            </div>
          </div>

          <CodeBlock
            code={positionsCode}
            title="Code"
            componentPath="@/components/shared/FloatingToolbar"
          />
        </div>
      </section>
    </div>
  );
};

export default Positions;

