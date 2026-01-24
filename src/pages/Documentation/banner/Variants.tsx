/**
 * Variants Page for Banner
 */

import { Banner, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { defaultVariantCode, filledVariantCode, outlinedVariantCode, subtleVariantCode } from './codeExamples/codeExamples';

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
          Different visual variants of the Banner component.
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
              <Banner
                title="Default Banner"
                description="This is a default variant banner."
                variant="default"
                type="info"
              />
            </div>
            <CodeBlock
              code={defaultVariantCode}
              title="Code"
              componentPath="@/components/shared/Banner"
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
              <Banner
                title="Filled Banner"
                description="This is a filled variant banner."
                variant="filled"
                type="info"
              />
            </div>
            <CodeBlock
              code={filledVariantCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* Outlined Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outlined
            </h3>
            <div className="mb-4">
              <Banner
                title="Outlined Banner"
                description="This is an outlined variant banner."
                variant="outlined"
                type="info"
              />
            </div>
            <CodeBlock
              code={outlinedVariantCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* Subtle Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Subtle
            </h3>
            <div className="mb-4">
              <Banner
                title="Subtle Banner"
                description="This is a subtle variant banner."
                variant="subtle"
                type="info"
              />
            </div>
            <CodeBlock
              code={subtleVariantCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Variants;

