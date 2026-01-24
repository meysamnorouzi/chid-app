/**
 * Variants Page for Progress
 */

import { Progress, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

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
          Different visual variants of the Progress component.
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
              <Progress value={50} variant="default" />
            </div>
          </div>

          {/* Striped Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Striped
            </h3>
            <div className="mb-4">
              <Progress value={50} variant="striped" />
            </div>
          </div>

          {/* Animated Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Animated
            </h3>
            <div className="mb-4">
              <Progress value={50} variant="animated" />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/Progress"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

