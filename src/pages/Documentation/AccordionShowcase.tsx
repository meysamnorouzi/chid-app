/**
 * Accordion Showcase Page
 * 
 * Comprehensive demonstration of Accordion component with all states and variants
 * Designed with SEO, accessibility, and modular structure in mind
 */

import { useState } from 'react';
import { AccordionItem, AccordionGroup } from '../../components/shared';
import { useDocumentationTheme } from '../../theme';

const AccordionShowcase = () => {
  const { theme } = useDocumentationTheme();
  const [controlledExpanded, setControlledExpanded] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  // Simulate loading
  const handleLoadingToggle = () => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  };

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
            {/* Page Header */}
            <header className="mb-8">
              <h1 
                className="text-4xl font-bold mb-4"
                style={{ color: theme.colors.dark.default }}
              >
                Accordion Component
              </h1>
              <p 
                className="text-lg mb-4"
                style={{ color: theme.colors.gray[600] }}
              >
                A flexible and accessible accordion component with multiple variants and states.
              </p>
            </header>

            {/* Basic Examples */}
            <section id="basic-examples" className="mb-12 scroll-mt-8">
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.dark.default }}
              >
                Basic Examples
              </h2>
              
              <div className="space-y-6">
                {/* Default Variant */}
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Default Variant
                  </h3>
                  <AccordionItem
                    id="basic-default"
                    title="Content Title"
                    defaultExpanded={true}
                  >
                    <p>Main Content Display Place</p>
                  </AccordionItem>
                </div>

                {/* Collapsed State */}
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Collapsed State
                  </h3>
                  <AccordionItem
                    id="basic-collapsed"
                    title="Content Title"
                    defaultExpanded={false}
                  >
                    <p>Main Content Display Place</p>
                  </AccordionItem>
                </div>
              </div>
            </section>

            {/* Variants */}
            <section id="variants" className="mb-12 scroll-mt-8">
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.dark.default }}
              >
                Variants
              </h2>
              
              <div className="space-y-6">
                {/* Bordered Variant */}
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Bordered
                  </h3>
                  <AccordionItem
                    id="variant-bordered"
                    title="Content Title"
                    variant="bordered"
                    defaultExpanded={true}
                  >
                    <p>Main Content Display Place</p>
                  </AccordionItem>
                </div>

                {/* Ghost Variant */}
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Ghost
                  </h3>
                  <AccordionItem
                    id="variant-ghost"
                    title="Content Title"
                    variant="ghost"
                    defaultExpanded={true}
                  >
                    <p>Main Content Display Place</p>
                  </AccordionItem>
                </div>

                {/* Filled Variant */}
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Filled
                  </h3>
                  <AccordionItem
                    id="variant-filled"
                    title="Content Title"
                    variant="filled"
                    defaultExpanded={true}
                  >
                    <p>Main Content Display Place</p>
                  </AccordionItem>
                </div>
              </div>
            </section>

            {/* States */}
            <section id="states" className="mb-12 scroll-mt-8">
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.dark.default }}
              >
                States
              </h2>
              
              <div className="space-y-6">
                {/* Disabled State */}
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Disabled
                  </h3>
                  <AccordionItem
                    id="state-disabled"
                    title="Content Title"
                    disabled={true}
                  >
                    <p>This content cannot be expanded</p>
                  </AccordionItem>
                </div>

                {/* Loading State */}
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Loading
                  </h3>
                  <AccordionItem
                    id="state-loading"
                    title="Content Title"
                    loading={loadingState}
                    onToggle={handleLoadingToggle}
                  >
                    <p>Content loaded after animation</p>
                  </AccordionItem>
                </div>

                {/* Controlled State */}
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Controlled
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setControlledExpanded(!controlledExpanded)}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: theme.colors.primary.default,
                        color: theme.colors.primary.inverse,
                      }}
                    >
                      Toggle Accordion
                    </button>
                    <AccordionItem
                      id="state-controlled"
                      title="Content Title"
                      expanded={controlledExpanded}
                      onToggle={(expanded) => setControlledExpanded(expanded)}
                    >
                      <p>This accordion is controlled by external state</p>
                    </AccordionItem>
                  </div>
                </div>
              </div>
            </section>

            {/* Sizes */}
            <section id="sizes" className="mb-12 scroll-mt-8">
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.dark.default }}
              >
                Sizes
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Small
                  </h3>
                  <AccordionItem
                    id="size-sm"
                    title="Content Title"
                    size="sm"
                    defaultExpanded={true}
                  >
                    <p>Small size accordion</p>
                  </AccordionItem>
                </div>

                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Medium (Default)
                  </h3>
                  <AccordionItem
                    id="size-md"
                    title="Content Title"
                    size="md"
                    defaultExpanded={true}
                  >
                    <p>Medium size accordion</p>
                  </AccordionItem>
                </div>

                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Large
                  </h3>
                  <AccordionItem
                    id="size-lg"
                    title="Content Title"
                    size="lg"
                    defaultExpanded={true}
                  >
                    <p>Large size accordion</p>
                  </AccordionItem>
                </div>
              </div>
            </section>

            {/* With Icons and Badges */}
            <section id="icons-badges" className="mb-12 scroll-mt-8">
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.dark.default }}
              >
                With Icons and Badges
              </h2>
              
              <div className="space-y-6">
                <AccordionItem
                  id="with-icon"
                  title="Content Title"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                  badge={5}
                  defaultExpanded={true}
                >
                  <p>Accordion with custom icon and badge</p>
                </AccordionItem>
              </div>
            </section>

            {/* Accordion Group */}
            <section id="accordion-group" className="mb-12 scroll-mt-8">
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.dark.default }}
              >
                Accordion Group
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Single Expand (Default)
                  </h3>
                  <AccordionGroup
                    items={groupItems}
                    allowMultiple={false}
                    defaultExpandedIds={['item-1']}
                  />
                </div>

                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Multiple Expand
                  </h3>
                  <AccordionGroup
                    items={groupItems}
                    allowMultiple={true}
                    defaultExpandedIds={['item-1']}
                  />
                </div>

                <div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.gray[700] }}
                  >
                    Bordered Variant Group
                  </h3>
                  <AccordionGroup
                    items={groupItems}
                    variant="bordered"
                    allowMultiple={true}
                  />
                </div>
              </div>
            </section>

            {/* Code Examples */}
            <section id="usage-examples" className="mb-12 scroll-mt-8">
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.dark.default }}
              >
                Usage Examples
              </h2>
              
              <div className="space-y-4">
                <div 
                  className="p-6 rounded-lg"
                  style={{ 
                    backgroundColor: theme.colors.gray[100],
                    border: `1px solid ${theme.colors.gray[300]}`,
                  }}
                >
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.dark.default }}
                  >
                    Basic Usage
                  </h3>
                  <pre className="overflow-x-auto">
                    <code style={{ color: theme.colors.gray[800] }}>
{`import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  defaultExpanded={true}
>
  <p>Main Content Display Place</p>
</AccordionItem>`}
                    </code>
                  </pre>
                </div>

                <div 
                  className="p-6 rounded-lg"
                  style={{ 
                    backgroundColor: theme.colors.gray[100],
                    border: `1px solid ${theme.colors.gray[300]}`,
                  }}
                >
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.colors.dark.default }}
                  >
                    Accordion Group
                  </h3>
                  <pre className="overflow-x-auto">
                    <code style={{ color: theme.colors.gray[800] }}>
{`import { AccordionGroup } from '@/components/shared';

<AccordionGroup
  items={[
    {
      id: 'item-1',
      title: 'Getting Started',
      children: <p>Content here</p>,
    },
  ]}
  allowMultiple={true}
/>`}
                    </code>
                  </pre>
                </div>
              </div>
            </section>
    </div>
  );
};

export default AccordionShowcase;

