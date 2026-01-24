/**
 * Sizes Page for Tag
 */

import { Tag, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { sizesCode } from './codeExamples/codeExamples';

const Sizes = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Sizes
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different size options for the Tag component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Small */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Small
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap items-center">
              <Tag size="sm">Small Tag</Tag>
              <Tag size="sm" variant="solid" color="primary">Small Solid</Tag>
              <Tag size="sm" variant="outline" color="success">Small Outline</Tag>
            </div>
          </div>

          {/* Medium */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Medium
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap items-center">
              <Tag size="md">Medium Tag</Tag>
              <Tag size="md" variant="solid" color="primary">Medium Solid</Tag>
              <Tag size="md" variant="outline" color="success">Medium Outline</Tag>
            </div>
          </div>

          {/* Large */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Large
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap items-center">
              <Tag size="lg">Large Tag</Tag>
              <Tag size="lg" variant="solid" color="primary">Large Solid</Tag>
              <Tag size="lg" variant="outline" color="success">Large Outline</Tag>
            </div>
          </div>

          <CodeBlock
            code={sizesCode}
            title="Code"
            componentPath="@/components/shared/Tag"
          />
        </div>
      </section>
    </div>
  );
};

export default Sizes;

