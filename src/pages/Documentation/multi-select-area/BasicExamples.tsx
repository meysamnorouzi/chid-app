/**
 * Basic Examples Page for Multi Select Area
 */

import { MultiSelectArea, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withLabelCode, withColorsCode, withMaxHeightCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

  const basicItems = [
    { value: '1', label: 'Ecuador' },
    { value: '2', label: 'Indonesia' },
    { value: '3', label: 'Estonia' },
    { value: '4', label: 'Norway' },
    { value: '5', label: 'Ukraine' },
  ];

  const coloredItems = [
    { value: '1', label: 'Primary', color: 'primary' as const },
    { value: '2', label: 'Success', color: 'success' as const },
    { value: '3', label: 'Warning', color: 'warning' as const },
    { value: '4', label: 'Danger', color: 'danger' as const },
    { value: '5', label: 'Info', color: 'info' as const },
  ];

  const manyItems = [
    { value: '1', label: 'Ecuador' },
    { value: '2', label: 'Indonesia' },
    { value: '3', label: 'Estonia' },
    { value: '4', label: 'Norway' },
    { value: '5', label: 'Ukraine' },
    { value: '6', label: 'Andorra' },
    { value: '7', label: 'Belgium' },
    { value: '8', label: 'Cambodia' },
    { value: '9', label: 'Malaysia' },
    { value: '10', label: 'Chile' },
    { value: '11', label: 'Costa Rica' },
    { value: '12', label: 'Denmark' },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Basic Examples
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Basic usage examples of the Multi Select Area component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Multi Select Area */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Multi Select Area
            </h3>
            <div className="mb-4">
              <MultiSelectArea
                items={basicItems}
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/MultiSelectArea"
            />
          </div>

          {/* With Label and Helper Text */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Label and Helper Text
            </h3>
            <div className="mb-4">
              <MultiSelectArea
                label="Countries"
                helperText="Select countries from the list"
                items={basicItems}
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
            <CodeBlock
              code={withLabelCode}
              title="Code"
              componentPath="@/components/shared/MultiSelectArea"
            />
          </div>

          {/* With Colors */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Colors
            </h3>
            <div className="mb-4">
              <MultiSelectArea
                items={coloredItems}
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
            <CodeBlock
              code={withColorsCode}
              title="Code"
              componentPath="@/components/shared/MultiSelectArea"
            />
          </div>

          {/* With Max Height */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Max Height
            </h3>
            <div className="mb-4">
              <MultiSelectArea
                items={manyItems}
                maxHeight={200}
                onCopy={(text) => console.log('Copied:', text)}
              />
            </div>
            <CodeBlock
              code={withMaxHeightCode}
              title="Code"
              componentPath="@/components/shared/MultiSelectArea"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

