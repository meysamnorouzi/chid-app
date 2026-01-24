/**
 * States Page for Toast
 */

import { useState } from 'react';
import { Toast, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { closableCode, nonClosableCode, customDurationCode, noAutoDismissCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);

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
          Different states and behaviors of Toast notifications.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Closable */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Closable
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast1(!showToast1)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.primary.default,
                  color: '#fff',
                }}
              >
                {showToast1 ? 'Hide Toast' : 'Show Closable Toast'}
              </button>
              {showToast1 && (
                <div className="mt-4">
                  <Toast
                    message="This toast can be closed."
                    closable={true}
                    onClose={() => setShowToast1(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={closableCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* Non-Closable */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Non-Closable
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast2(!showToast2)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.primary.default,
                  color: '#fff',
                }}
              >
                {showToast2 ? 'Hide Toast' : 'Show Non-Closable Toast'}
              </button>
              {showToast2 && (
                <div className="mt-4">
                  <Toast
                    message="This toast cannot be closed manually."
                    closable={false}
                    onClose={() => setShowToast2(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={nonClosableCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* Custom Duration */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Custom Duration
            </h3>
            <div className="mb-4">
              <button
                onClick={() => {
                  setShowToast3(true);
                  setTimeout(() => setShowToast3(false), 10000);
                }}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.primary.default,
                  color: '#fff',
                }}
              >
                Show Toast (10s)
              </button>
              {showToast3 && (
                <div className="mt-4">
                  <Toast
                    message="This toast will disappear after 10 seconds."
                    duration={10000}
                    onClose={() => setShowToast3(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={customDurationCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* No Auto-Dismiss */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              No Auto-Dismiss
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast4(!showToast4)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.primary.default,
                  color: '#fff',
                }}
              >
                {showToast4 ? 'Hide Toast' : 'Show Persistent Toast'}
              </button>
              {showToast4 && (
                <div className="mt-4">
                  <Toast
                    message="This toast will not auto-dismiss."
                    duration={null}
                    onClose={() => setShowToast4(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={noAutoDismissCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

