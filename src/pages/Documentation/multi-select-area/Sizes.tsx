/**
 * Sizes Page for Multi Select Area
 */

import { MultiSelectArea, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { sizesCode } from './codeExamples/codeExamples';

const Sizes = () => {
  const { theme } = useDocumentationTheme();

  const items = [
    { value: '1', label: 'Ecuador' },
    { value: '2', label: 'Indonesia' },
    { value: '3', label: 'Estonia' },
  ];

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
          Different size options for the Multi Select Area component.
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
            <div className="mb-4">
              <MultiSelectArea
                size="sm"
                items={items}
                onCopy={(text) => console.log('Copied:', text)}
              />
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
            <div className="mb-4">
              <MultiSelectArea
                size="md"
                items={items}
                onCopy={(text) => console.log('Copied:', text)}
              />
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
            <div className="mb-4">
              <MultiSelectArea
                size="lg"
                items={items}
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
          </div>

          <CodeBlock
            code={sizesCode}
            title="Code"
            componentPath="@/components/shared/MultiSelectArea"
          />
        </div>
      </section>
    </div>
  );
};

export default Sizes;

