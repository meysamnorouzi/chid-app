/**
 * Sizes Page for Accordion
 */

import { AccordionItem, CodeBlock } from '../../../components/shared';
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
          Different size options for the Accordion component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Small
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="size-sm"
                title="Content Title"
                size="sm"
                defaultExpanded={true}
              >
                <p>Small size accordion</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={smallSizeCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Medium (Default)
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="size-md"
                title="Content Title"
                size="md"
                defaultExpanded={true}
              >
                <p>Medium size accordion</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={mediumSizeCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Large
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="size-lg"
                title="Content Title"
                size="lg"
                defaultExpanded={true}
              >
                <p>Large size accordion</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={largeSizeCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sizes;

