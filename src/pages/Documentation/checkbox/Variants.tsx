/**
 * Variants Page for Checkbox
 */

import { Checkbox, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { defaultVariantCode, filledVariantCode, outlinedVariantCode, squareShapeCode, roundedShapeCode } from './codeExamples/codeExamples';

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
          Different style variants for the Checkbox component.
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
              Default Variant
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Default unchecked"
                variant="default"
              />
              <Checkbox
                label="Default checked"
                variant="default"
                defaultChecked={true}
              />
            </div>
            <CodeBlock
              code={defaultVariantCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Filled Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Filled Variant
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Filled unchecked"
                variant="filled"
              />
              <Checkbox
                label="Filled checked"
                variant="filled"
                defaultChecked={true}
              />
            </div>
            <CodeBlock
              code={filledVariantCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Outlined Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outlined Variant
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Outlined unchecked"
                variant="outlined"
              />
              <Checkbox
                label="Outlined checked"
                variant="outlined"
                defaultChecked={true}
              />
            </div>
            <CodeBlock
              code={outlinedVariantCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Shapes */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Square Shape
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Square checkbox"
                shape="square"
                defaultChecked={true}
              />
            </div>
            <CodeBlock
              code={squareShapeCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Rounded Shape
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Rounded checkbox"
                shape="rounded"
                defaultChecked={true}
              />
            </div>
            <CodeBlock
              code={roundedShapeCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Variants;

