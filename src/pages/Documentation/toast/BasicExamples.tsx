/**
 * Basic Examples Page for Toast
 */

import { useState } from 'react';
import { Toast, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withTitleCode, withIconCode, withActionCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
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
          Basic Examples
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Basic usage examples of the Toast component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Toast */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Toast
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
                {showToast1 ? 'Hide Toast' : 'Show Toast'}
              </button>
              {showToast1 && (
                <div className="mt-4">
                  <Toast
                    message="This is a basic toast message."
                    onClose={() => setShowToast1(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* With Title */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Title
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
                {showToast2 ? 'Hide Toast' : 'Show Toast'}
              </button>
              {showToast2 && (
                <div className="mt-4">
                  <Toast
                    title="Success!"
                    message="Your changes have been saved successfully."
                    type="success"
                    onClose={() => setShowToast2(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={withTitleCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* With Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Custom Icon
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast3(!showToast3)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.info.default,
                  color: '#fff',
                }}
              >
                {showToast3 ? 'Hide Toast' : 'Show Toast'}
              </button>
              {showToast3 && (
                <div className="mt-4">
                  <Toast
                    message="Custom icon toast"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    }
                    onClose={() => setShowToast3(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={withIconCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* With Action */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Action Button
            </h3>
            <div className="mb-4">
              <button
                onClick={() => setShowToast4(!showToast4)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: theme.colors.success.default,
                  color: '#fff',
                }}
              >
                {showToast4 ? 'Hide Toast' : 'Show Toast'}
              </button>
              {showToast4 && (
                <div className="mt-4">
                  <Toast
                    title="File uploaded"
                    message="Your file has been uploaded successfully."
                    type="success"
                    action={
                      <button 
                        className="text-sm font-medium underline"
                        style={{ color: theme.colors.success.default }}
                      >
                        View File
                      </button>
                    }
                    onClose={() => setShowToast4(false)}
                  />
                </div>
              )}
            </div>
            <CodeBlock
              code={withActionCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

