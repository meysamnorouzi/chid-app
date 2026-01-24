/**
 * Sizes Page for Avatar
 */

import { Avatar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { xsSizeCode, smSizeCode, mdSizeCode, lgSizeCode, xlSizeCode } from './codeExamples/codeExamples';

const Sizes = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Sizes
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different size options for the Avatar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Extra Small (xs)
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg"
                alt="User Avatar"
                fallback="JD"
                size="xs"
              />
            </div>
            <CodeBlock
              code={xsSizeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Small (sm)
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/1200x/9a/58/72/9a587266603249ff0d9203bf85fc35a4.jpg"
                alt="User Avatar"
                fallback="JD"
                size="sm"
              />
            </div>
            <CodeBlock
              code={smSizeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Medium (md) - Default
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/29/4d/3b/294d3bbf1cec608f222fcac8d77d9504.jpg"
                alt="User Avatar"
                fallback="JD"
                size="md"
              />
            </div>
            <CodeBlock
              code={mdSizeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Large (lg)
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/3c/95/e7/3c95e78af0dd70a7fd83ab3a85d05967.jpg"
                alt="User Avatar"
                fallback="JD"
                size="lg"
              />
            </div>
            <CodeBlock
              code={lgSizeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Extra Large (xl)
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg"
                alt="User Avatar"
                fallback="JD"
                size="xl"
              />
            </div>
            <CodeBlock
              code={xlSizeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sizes;

