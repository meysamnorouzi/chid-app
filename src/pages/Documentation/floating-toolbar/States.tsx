/**
 * States Page for FloatingToolbar
 */

import { useState } from 'react';
import { FloatingToolbar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withActiveStateCode, withDisabledStateCode, controlledVisibilityCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [visible, setVisible] = useState(true);

  const actionsWithActive = [
    {
      id: 'bold',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9M6 4v16" />
        </svg>
      ),
      active: true,
      onClick: () => console.log('Bold clicked'),
    },
    {
      id: 'italic',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4M10 4v16M10 4l-4 8M14 4l4 8" />
        </svg>
      ),
      active: false,
      onClick: () => console.log('Italic clicked'),
    },
    {
      id: 'underline',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19h14M5 5v8a4 4 0 008 0V5" />
        </svg>
      ),
      active: false,
      onClick: () => console.log('Underline clicked'),
    },
  ];

  const actionsWithDisabled = [
    {
      id: 'save',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      ),
      disabled: false,
      onClick: () => console.log('Save clicked'),
    },
    {
      id: 'delete',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      disabled: true,
      onClick: () => console.log('Delete clicked'),
    },
  ];

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
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          States
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different states of the FloatingToolbar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Active State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Active State
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                actions={actionsWithActive}
                position="bottom"
              />
            </div>
            <CodeBlock
              code={withActiveStateCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>

          {/* Disabled State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled State
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                actions={actionsWithDisabled}
                position="bottom"
              />
            </div>
            <CodeBlock
              code={withDisabledStateCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>

          {/* Controlled Visibility */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Controlled Visibility
            </h3>
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setVisible(!visible)}
                className="px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: theme.colors.primary.default,
                  color: theme.colors.primary.inverse,
                }}
              >
                {visible ? 'Hide' : 'Show'} Toolbar
              </button>
            </div>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                visible={visible}
                actions={actions}
                position="bottom"
              />
            </div>
            <CodeBlock
              code={controlledVisibilityCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

