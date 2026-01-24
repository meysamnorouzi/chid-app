/**
 * Colors Page for Progress
 */

import { Progress, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { colorsCode } from './codeExamples/codeExamples';

const Colors = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Colors
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different color schemes for the Progress component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* All Colors */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Available Colors
            </h3>
            <div className="mb-4 space-y-4">
              <Progress value={50} color="primary" />
              <Progress value={50} color="secondary" />
              <Progress value={50} color="success" />
              <Progress value={50} color="warning" />
              <Progress value={50} color="danger" />
              <Progress value={50} color="info" />
            </div>
          </div>

          <CodeBlock
            code={colorsCode}
            title="Code"
            componentPath="@/components/shared/Progress"
          />
        </div>
      </section>
    </div>
  );
};

export default Colors;

