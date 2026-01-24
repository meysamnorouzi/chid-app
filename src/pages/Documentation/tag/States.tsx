/**
 * States Page for Tag
 */

import { Tag, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode } from './codeExamples/codeExamples';

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
          Different states of the Tag component.
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
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag disabled>Disabled Tag</Tag>
              <Tag variant="solid" color="primary" disabled>Disabled Solid</Tag>
              <Tag variant="outline" color="success" disabled>Disabled Outline</Tag>
              <Tag variant="subtle" color="warning" disabled>Disabled Subtle</Tag>
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Tag"
            />
          </div>

          {/* Closable States */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Closable States
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag closable onClose={() => console.log('Closed')}>
                Closable
              </Tag>
              <Tag variant="solid" color="primary" closable onClose={() => console.log('Closed')}>
                Closable Solid
              </Tag>
              <Tag variant="outline" color="danger" closable onClose={() => console.log('Closed')}>
                Closable Outline
              </Tag>
              <Tag closable disabled onClose={() => console.log('Closed')}>
                Disabled Closable
              </Tag>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

