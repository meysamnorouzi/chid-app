/**
 * Variants Page for Menu
 */

import { Menu, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
  const { theme } = useDocumentationTheme();

  const items = [
    { id: '1', label: 'Home', onClick: () => console.log('Home') },
    { id: '2', label: 'About', onClick: () => console.log('About') },
    { id: '3', label: 'Contact', onClick: () => console.log('Contact') },
  ];

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
          Different visual variants of the Menu component.
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
              Default
            </h3>
            <div className="mb-4">
              <Menu variant="default" items={items} />
            </div>
          </div>

          {/* Bordered Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bordered
            </h3>
            <div className="mb-4">
              <Menu variant="bordered" items={items} />
            </div>
          </div>

          {/* Shadow Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Shadow
            </h3>
            <div className="mb-4">
              <Menu variant="shadow" items={items} />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/Menu"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

