/**
 * Positions Page for Tooltip
 */

import { Tooltip, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { positionsCode } from './codeExamples/codeExamples';

const Positions = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Positions
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different position options for the Tooltip component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Top Position */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Top Position
            </h3>
            <div className="mb-4">
              <Tooltip position="top" content="This is a top tooltip">
                <Button>Hover me (Top)</Button>
              </Tooltip>
            </div>
          </div>

          {/* Bottom Position */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bottom Position
            </h3>
            <div className="mb-4">
              <Tooltip position="bottom" content="This is a bottom tooltip">
                <Button>Hover me (Bottom)</Button>
              </Tooltip>
            </div>
          </div>

          {/* Left Position */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Left Position
            </h3>
            <div className="mb-4">
              <Tooltip position="left" content="This is a left tooltip">
                <Button>Hover me (Left)</Button>
              </Tooltip>
            </div>
          </div>

          {/* Right Position */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Right Position
            </h3>
            <div className="mb-4">
              <Tooltip position="right" content="This is a right tooltip">
                <Button>Hover me (Right)</Button>
              </Tooltip>
            </div>
          </div>

          <CodeBlock
            code={positionsCode}
            title="Code"
            componentPath="@/components/shared/Tooltip"
          />
        </div>
      </section>
    </div>
  );
};

export default Positions;

