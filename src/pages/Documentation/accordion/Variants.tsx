/**
 * Variants Page for Accordion
 */

import { AccordionItem, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { borderedVariantCode, ghostVariantCode, filledVariantCode } from './codeExamples/codeExamples';

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
          Different visual variants of the Accordion component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Bordered Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bordered
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="variant-bordered"
                title="Content Title"
                variant="bordered"
                defaultExpanded={true}
              >
                <p>Main Content Display Place</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={borderedVariantCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          {/* Ghost Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Ghost
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="variant-ghost"
                title="Content Title"
                variant="ghost"
                defaultExpanded={true}
              >
                <p>Main Content Display Place</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={ghostVariantCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
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
              <AccordionItem
                id="variant-filled"
                title="Content Title"
                variant="filled"
                defaultExpanded={true}
              >
                <p>Main Content Display Place</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={filledVariantCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Variants;

