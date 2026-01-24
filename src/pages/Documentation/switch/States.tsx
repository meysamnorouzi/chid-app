/**
 * States Page for Switch
 */

import { Switch, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode, uncontrolledCode } from './codeExamples/codeExamples';

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
          Different states of the Switch component.
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
              Disabled State
            </h3>
            <div className="mb-4 space-y-4">
              <Switch
                checked={false}
                disabled
                onChange={() => {}}
              />
              <Switch
                checked={true}
                disabled
                onChange={() => {}}
              />
              <Switch
                label="Disabled switch"
                checked={true}
                disabled
                onChange={() => {}}
              />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Switch"
            />
          </div>

          {/* Uncontrolled */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Uncontrolled
            </h3>
            <div className="mb-4">
              <Switch
                defaultChecked={true}
                onChange={(checked) => console.log('Changed to:', checked)}
              />
            </div>
            <CodeBlock
              code={uncontrolledCode}
              title="Code"
              componentPath="@/components/shared/Switch"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

