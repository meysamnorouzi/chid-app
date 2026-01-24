/**
 * States Page for Button
 */

import { Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { loadingCode, disabledCode, fullWidthCode } from './codeExamples/codeExamples';

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
          Different button states and behaviors.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Loading State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Loading State
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Button loading>Loading...</Button>
              <Button loading disabled>Loading...</Button>
            </div>
            <CodeBlock
              code={loadingCode}
              title="Code"
              componentPath="@/components/shared/Button"
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
            <div className="mb-4 flex gap-2 flex-wrap">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
              <Button variant="ghost" disabled>Disabled Ghost</Button>
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Button"
            />
          </div>

          {/* Full Width */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Full Width
            </h3>
            <div className="mb-4">
              <Button fullWidth>Full Width Button</Button>
            </div>
            <CodeBlock
              code={fullWidthCode}
              title="Code"
              componentPath="@/components/shared/Button"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

