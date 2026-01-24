/**
 * Variants Page for Tag
 */

import { Tag, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Variants
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different visual variants of the Tag component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag variant="default" color="primary">Primary</Tag>
              <Tag variant="default" color="success">Success</Tag>
              <Tag variant="default" color="warning">Warning</Tag>
            </div>
          </div>

          {/* Solid Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Solid
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag variant="solid" color="primary">Primary</Tag>
              <Tag variant="solid" color="success">Success</Tag>
              <Tag variant="solid" color="warning">Warning</Tag>
            </div>
          </div>

          {/* Outline Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outline
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag variant="outline" color="primary">Primary</Tag>
              <Tag variant="outline" color="success">Success</Tag>
              <Tag variant="outline" color="warning">Warning</Tag>
            </div>
          </div>

          {/* Subtle Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Subtle
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Tag variant="subtle" color="primary">Primary</Tag>
              <Tag variant="subtle" color="success">Success</Tag>
              <Tag variant="subtle" color="warning">Warning</Tag>
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/Tag"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

