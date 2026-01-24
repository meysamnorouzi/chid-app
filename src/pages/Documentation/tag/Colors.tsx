/**
 * Colors Page for Tag
 */

import { Tag, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { colorsCode } from './codeExamples/codeExamples';

const Colors = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Colors
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different color schemes for the Tag component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* All Colors */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Available Colors
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag color="primary">Primary</Tag>
              <Tag color="secondary">Secondary</Tag>
              <Tag color="success">Success</Tag>
              <Tag color="warning">Warning</Tag>
              <Tag color="danger">Danger</Tag>
              <Tag color="info">Info</Tag>
              <Tag color="gray">Gray</Tag>
            </div>
          </div>

          {/* Solid Variant Colors */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Solid Variant
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag variant="solid" color="primary">Primary</Tag>
              <Tag variant="solid" color="secondary">Secondary</Tag>
              <Tag variant="solid" color="success">Success</Tag>
              <Tag variant="solid" color="warning">Warning</Tag>
              <Tag variant="solid" color="danger">Danger</Tag>
              <Tag variant="solid" color="info">Info</Tag>
              <Tag variant="solid" color="gray">Gray</Tag>
            </div>
          </div>

          {/* Outline Variant Colors */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outline Variant
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag variant="outline" color="primary">Primary</Tag>
              <Tag variant="outline" color="secondary">Secondary</Tag>
              <Tag variant="outline" color="success">Success</Tag>
              <Tag variant="outline" color="warning">Warning</Tag>
              <Tag variant="outline" color="danger">Danger</Tag>
              <Tag variant="outline" color="info">Info</Tag>
              <Tag variant="outline" color="gray">Gray</Tag>
            </div>
          </div>

          <CodeBlock
            code={colorsCode}
            title="Code"
            componentPath="@/components/shared/Tag"
          />
        </div>
      </section>
    </div>
  );
};

export default Colors;

