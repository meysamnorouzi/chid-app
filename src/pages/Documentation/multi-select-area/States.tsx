/**
 * States Page for Multi Select Area
 */

import { MultiSelectArea, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode, withoutCopyCode, withCustomCopyTextCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();

  const items = [
    { value: '1', label: 'Ecuador' },
    { value: '2', label: 'Indonesia' },
    { value: '3', label: 'Estonia' },
    { value: '4', label: 'Norway' },
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
          Different states of the Multi Select Area component.
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
            <div className="mb-4">
              <MultiSelectArea
                items={items}
                disabled
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/MultiSelectArea"
            />
          </div>

          {/* Without Copy */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without Copy Button
            </h3>
            <div className="mb-4">
              <MultiSelectArea
                items={items}
                copyable={false}
              />
            </div>
            <CodeBlock
              code={withoutCopyCode}
              title="Code"
              componentPath="@/components/shared/MultiSelectArea"
            />
          </div>

          {/* With Custom Copy Text */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Custom Copy Text
            </h3>
            <div className="mb-4">
              <MultiSelectArea
                items={items}
                copyText="Custom text to copy instead of items"
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
            <CodeBlock
              code={withCustomCopyTextCode}
              title="Code"
              componentPath="@/components/shared/MultiSelectArea"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

