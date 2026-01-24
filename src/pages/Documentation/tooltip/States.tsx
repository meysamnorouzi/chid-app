/**
 * States Page for Tooltip
 */

import { Tooltip, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withDelayCode, disabledCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();

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
          Different states of the Tooltip component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Delay */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Delay
            </h3>
            <div className="mb-4">
              <Tooltip 
                content="This tooltip appears after 500ms"
                delay={500}
              >
                <Button>Hover me (500ms delay)</Button>
              </Tooltip>
            </div>
            <CodeBlock
              code={withDelayCode}
              title="Code"
              componentPath="@/components/shared/Tooltip"
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
            <div className="mb-4">
              <Tooltip 
                content="This tooltip is disabled"
                disabled
              >
                <Button>Hover me (Disabled)</Button>
              </Tooltip>
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Tooltip"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

