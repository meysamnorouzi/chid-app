/**
 * States Page for Accordion
 */

import { useState } from 'react';
import { AccordionItem, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledStateCode, loadingStateCode, controlledStateCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [controlledExpanded, setControlledExpanded] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  // Simulate loading
  const handleLoadingToggle = () => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  };

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
          Different states of the Accordion component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Disabled State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="state-disabled"
                title="Content Title"
                disabled={true}
              >
                <p>This content cannot be expanded</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={disabledStateCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          {/* Loading State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Loading
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="state-loading"
                title="Content Title"
                loading={loadingState}
                onToggle={handleLoadingToggle}
              >
                <p>Content loaded after animation</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={loadingStateCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          {/* Controlled State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Controlled
            </h3>
            <div className="space-y-3 mb-4">
              <button
                onClick={() => setControlledExpanded(!controlledExpanded)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: theme.colors.primary.default,
                  color: theme.colors.primary.inverse,
                }}
              >
                Toggle Accordion
              </button>
              <AccordionItem
                id="state-controlled"
                title="Content Title"
                expanded={controlledExpanded}
                onToggle={(expanded) => setControlledExpanded(expanded)}
              >
                <p>This accordion is controlled by external state</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={controlledStateCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

