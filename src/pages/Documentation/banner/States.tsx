/**
 * States Page for Banner
 */

import { useState } from 'react';
import { Banner, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { closableCode, withActionCode, controlledVisibleCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);

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
          Different states of the Banner component.
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
              <Banner
                title="Closable Banner"
                description="This banner can be closed by clicking the X button."
                type="info"
                closable={true}
                onClose={() => alert('Banner closed')}
              />
            </div>
            <CodeBlock
              code={closableCode}
              title="Code"
              componentPath="@/components/shared/Banner"
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
              <Banner
                title="Banner with Action"
                description="This banner includes an action button."
                type="success"
                action={
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: theme.colors.success.default,
                      color: theme.colors.success.inverse,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.colors.success.active;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme.colors.success.default;
                    }}
                  >
                    Take Action
                  </button>
                }
              />
            </div>
            <CodeBlock
              code={withActionCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* Controlled Visible */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Controlled Visibility
            </h3>
            <div className="mb-4">
              <div className="space-y-3">
                <button
                  onClick={() => setVisible(!visible)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: theme.colors.primary.default,
                    color: theme.colors.primary.inverse,
                  }}
                >
                  Toggle Banner
                </button>
                <Banner
                  title="Controlled Banner"
                  description="This banner visibility is controlled by external state."
                  type="warning"
                  visible={visible}
                />
              </div>
            </div>
            <CodeBlock
              code={controlledVisibleCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

