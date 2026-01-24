/**
 * Types Page for Toast
 */

import { useState } from 'react';
import { Toast, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { infoTypeCode, successTypeCode, warningTypeCode, errorTypeCode } from './codeExamples/codeExamples';

const Types = () => {
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
          Types
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different types of Toast notifications.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Info Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Info
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast1(!showToast1)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.info.default,
                  color: '#fff',
                }}
              >
                {showToast1 ? 'Hide Toast' : 'Show Info Toast'}
              </button>
              {showToast1 && (
                <div className="mt-4">
                  <Toast
                    title="Information"
                    message="This is an informational message."
                    type="info"
                    onClose={() => setShowToast1(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={infoTypeCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* Success Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Success
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast2(!showToast2)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.success.default,
                  color: '#fff',
                }}
              >
                {showToast2 ? 'Hide Toast' : 'Show Success Toast'}
              </button>
              {showToast2 && (
                <div className="mt-4">
                  <Toast
                    title="Success"
                    message="Operation completed successfully."
                    type="success"
                    onClose={() => setShowToast2(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={successTypeCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* Warning Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Warning
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast3(!showToast3)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.warning.default,
                  color: '#fff',
                }}
              >
                {showToast3 ? 'Hide Toast' : 'Show Warning Toast'}
              </button>
              {showToast3 && (
                <div className="mt-4">
                  <Toast
                    title="Warning"
                    message="Please review your input before proceeding."
                    type="warning"
                    onClose={() => setShowToast3(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={warningTypeCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* Error Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Error
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast4(!showToast4)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.danger.default,
                  color: '#fff',
                }}
              >
                {showToast4 ? 'Hide Toast' : 'Show Error Toast'}
              </button>
              {showToast4 && (
                <div className="mt-4">
                  <Toast
                    title="Error"
                    message="Something went wrong. Please try again."
                    type="error"
                    onClose={() => setShowToast4(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={errorTypeCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Types;

