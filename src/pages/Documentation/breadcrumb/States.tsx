/**
 * States Page for Breadcrumb
 */

import { Breadcrumb, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withMaxItemsCode, disabledItemsCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();

  const longItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Computers', href: '/products/electronics/computers' },
    { label: 'Laptops', href: '/products/electronics/computers/laptops' },
    { label: 'Gaming Laptops' },
  ];

  const itemsWithDisabled = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products', disabled: true },
    { label: 'Laptops' },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          States
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different states and behaviors of Breadcrumb.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Max Items */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Max Items (Collapsed)
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={longItems} maxItems={3} />
            </div>
            <CodeBlock
              code={withMaxItemsCode}
              title="Code"
              componentPath="@/components/shared/Breadcrumb"
            />
          </div>

          {/* Disabled Items */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled Items
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={itemsWithDisabled} />
            </div>
            <CodeBlock
              code={disabledItemsCode}
              title="Code"
              componentPath="@/components/shared/Breadcrumb"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

