/**
 * Shapes Page for Avatar
 */

import { Avatar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { circleShapeCode, squareShapeCode, roundedShapeCode } from './codeExamples/codeExamples';

const Shapes = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Shapes
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different shape options for the Avatar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Circle Shape */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Circle (Default)
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg"
                alt="User Avatar"
                fallback="JD"
                shape="circle"
              />
            </div>
            <CodeBlock
              code={circleShapeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* Square Shape */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Square
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/1200x/9a/58/72/9a587266603249ff0d9203bf85fc35a4.jpg"
                alt="User Avatar"
                fallback="JD"
                shape="square"
              />
            </div>
            <CodeBlock
              code={squareShapeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* Rounded Shape */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Rounded
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/29/4d/3b/294d3bbf1cec608f222fcac8d77d9504.jpg"
                alt="User Avatar"
                fallback="JD"
                shape="rounded"
              />
            </div>
            <CodeBlock
              code={roundedShapeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shapes;

