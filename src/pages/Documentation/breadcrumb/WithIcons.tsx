/**
 * With Icons Page for Breadcrumb
 */

import { Breadcrumb, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withHomeIconCode, withIconsCode } from './codeExamples/codeExamples';

const WithIcons = () => {
  const { theme } = useDocumentationTheme();

  const itemsWithHomeIcon = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops' },
  ];

  const itemsWithIcons = [
    {
      label: 'Home',
      href: '/',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Products',
      href: '/products',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
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
          With Icons
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Breadcrumb with icons.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Home Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Home Icon
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={itemsWithHomeIcon} showHomeIcon={true} />
            </div>
            <CodeBlock
              code={withHomeIconCode}
              title="Code"
              componentPath="@/components/shared/Breadcrumb"
            />
          </div>

          {/* With Custom Icons */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Custom Icons
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={itemsWithIcons} />
            </div>
            <CodeBlock
              code={withIconsCode}
              title="Code"
              componentPath="@/components/shared/Breadcrumb"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WithIcons;

