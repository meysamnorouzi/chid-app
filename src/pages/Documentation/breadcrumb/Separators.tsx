/**
 * Separators Page for Breadcrumb
 */

import { Breadcrumb, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withSeparatorsCode, withCustomSeparatorCode } from './codeExamples/codeExamples';

const Separators = () => {
  const { theme } = useDocumentationTheme();

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops' },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Separators
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different separator options for Breadcrumb.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Slash Separator */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Slash Separator (Default)
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={items} separator="/" />
            </div>
          </div>

          {/* Arrow Separator */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Arrow Separator
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={items} separator=">" />
            </div>
          </div>

          {/* Right Arrow Separator */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Right Arrow Separator
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={items} separator="→" />
            </div>
          </div>

          {/* Bullet Separator */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bullet Separator
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb items={items} separator="•" />
            </div>
            <CodeBlock
              code={withSeparatorsCode}
              title="Code"
              componentPath="@/components/shared/Breadcrumb"
            />
          </div>

          {/* Custom Separator */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Custom Separator Component
            </h3>
            <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: theme.background.card, borderColor: theme.colors.gray[300] }}>
              <Breadcrumb
                items={items}
                separatorComponent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.colors.gray[400] }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              />
            </div>
            <CodeBlock
              code={withCustomSeparatorCode}
              title="Code"
              componentPath="@/components/shared/Breadcrumb"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Separators;

