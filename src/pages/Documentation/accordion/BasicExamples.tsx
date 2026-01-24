/**
 * Basic Examples Page for Accordion
 */

import { AccordionItem, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, collapsedStateCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

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
          Basic usage examples of the Accordion component.
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
            <div className="mb-4">
              <AccordionItem
                id="basic-default"
                title="Content Title"
                defaultExpanded={true}
              >
                <p>Main Content Display Place</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          {/* Collapsed State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Collapsed State
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="basic-collapsed"
                title="Content Title"
                defaultExpanded={false}
              >
                <p>Main Content Display Place</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={collapsedStateCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

