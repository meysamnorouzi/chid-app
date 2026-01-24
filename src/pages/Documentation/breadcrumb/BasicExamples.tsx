/**
 * Basic Examples Page for Breadcrumb
 */

import { Breadcrumb, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withOnClickCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ];

  const itemsWithOnClick = [
    {
      label: 'Home',
      onClick: () => alert('Home clicked'),
    },
    {
      label: 'Products',
      onClick: () => alert('Products clicked'),
    },
    {
      label: 'Laptops',
    },
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
          Basic usage examples of the Breadcrumb component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Breadcrumb */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Breadcrumb
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={items} />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Breadcrumb"
            />
          </div>

          {/* With onClick Handler */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With onClick Handler
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={itemsWithOnClick} />
            </div>
            <CodeBlock
              code={withOnClickCode}
              title="Code"
              componentPath="@/components/shared/Breadcrumb"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

