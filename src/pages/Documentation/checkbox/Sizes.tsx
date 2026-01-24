/**
 * Sizes Page for Checkbox
 */

import { Checkbox, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { smallSizeCode, mediumSizeCode, largeSizeCode } from './codeExamples/codeExamples';

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
          Different sizes for the Checkbox component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Small Size */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Small Size
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Small checkbox"
                size="sm"
                defaultChecked={true}
              />
              <Checkbox
                label="Small with description"
                description="This is a small checkbox with description"
                size="sm"
              />
            </div>
            <CodeBlock
              code={smallSizeCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Medium Size */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Medium Size (Default)
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Medium checkbox"
                size="md"
                defaultChecked={true}
              />
              <Checkbox
                label="Medium with description"
                description="This is a medium checkbox with description"
                size="md"
              />
            </div>
            <CodeBlock
              code={mediumSizeCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>

          {/* Large Size */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Large Size
            </h3>
            <div className="mb-4 space-y-4">
              <Checkbox
                label="Large checkbox"
                size="lg"
                defaultChecked={true}
              />
              <Checkbox
                label="Large with description"
                description="This is a large checkbox with description"
                size="lg"
              />
            </div>
            <CodeBlock
              code={largeSizeCode}
              title="Code"
              componentPath="@/components/shared/Checkbox"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sizes;

