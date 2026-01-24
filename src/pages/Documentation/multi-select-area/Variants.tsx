/**
 * Variants Page for Multi Select Area
 */

import { MultiSelectArea, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
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
          Variants
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different visual variants of the Multi Select Area component.
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
            <div className="mb-4">
              <MultiSelectArea
                variant="default"
                items={items}
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
          </div>

          {/* Filled Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Filled
            </h3>
            <div className="mb-4">
              <MultiSelectArea
                variant="filled"
                items={items}
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
          </div>

          {/* Outlined Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outlined
            </h3>
            <div className="mb-4">
              <MultiSelectArea
                variant="outlined"
                items={items}
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/MultiSelectArea"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

