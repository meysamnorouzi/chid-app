/**
 * Accordion Group Page
 */

import { AccordionGroup, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicAccordionGroupCode, multipleExpandCode, withVariantCode } from './codeExamples/codeExamples';

const AccordionGroupPage = () => {
  const { theme } = useDocumentationTheme();

  // Accordion group items
  const groupItems = [
    {
      id: 'item-1',
      title: 'Getting Started',
      children: (
        <div>
          <p className="mb-2">Welcome to our documentation. This section covers the basics.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Installation guide</li>
            <li>Quick start tutorial</li>
            <li>Basic concepts</li>
          </ul>
        </div>
      ),
      badge: 3,
    },
    {
      id: 'item-2',
      title: 'Components',
      children: (
        <div>
          <p className="mb-2">Explore our component library:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Accordion</li>
            <li>Button</li>
            <li>Input</li>
            <li>Modal</li>
          </ul>
        </div>
      ),
      badge: 4,
    },
    {
      id: 'item-3',
      title: 'Advanced Topics',
      children: (
        <div>
          <p>Advanced configuration and customization options.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Accordion Group
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Manage multiple accordion items together.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Single Expand (Default)
            </h3>
            <div className="mb-4">
              <AccordionGroup
                items={groupItems}
                allowMultiple={false}
                defaultExpandedIds={['item-1']}
              />
            </div>
            <CodeBlock
              code={basicAccordionGroupCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Multiple Expand
            </h3>
            <div className="mb-4">
              <AccordionGroup
                items={groupItems}
                allowMultiple={true}
                defaultExpandedIds={['item-1']}
              />
            </div>
            <CodeBlock
              code={multipleExpandCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bordered Variant Group
            </h3>
            <div className="mb-4">
              <AccordionGroup
                items={groupItems}
                variant="bordered"
                allowMultiple={true}
              />
            </div>
            <CodeBlock
              code={withVariantCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccordionGroupPage;

