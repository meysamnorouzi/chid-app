/**
 * AvatarGroup Page for Avatar
 */

import { AvatarGroup, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicGroupCode, withMaxCode, differentSizesCode } from './codeExamples/codeExamples';

const AvatarGroupPage = () => {
  const { theme } = useDocumentationTheme();

  const avatars = [
    { src: 'https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg', alt: 'User 1', fallback: 'U1' },
    { src: 'https://i.pinimg.com/1200x/9a/58/72/9a587266603249ff0d9203bf85fc35a4.jpg', alt: 'User 2', fallback: 'U2' },
    { src: 'https://i.pinimg.com/736x/29/4d/3b/294d3bbf1cec608f222fcac8d77d9504.jpg', alt: 'User 3', fallback: 'U3' },
    { src: 'https://i.pinimg.com/736x/3c/95/e7/3c95e78af0dd70a7fd83ab3a85d05967.jpg', alt: 'User 4', fallback: 'U4' },
    { src: 'https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg', alt: 'User 5', fallback: 'U5' },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Avatar Group
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Display multiple avatars in a group with overflow indicator.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Group */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Group
            </h3>
            <div className="mb-4">
              <AvatarGroup
                avatars={avatars}
                max={3}
              />
            </div>
            <CodeBlock
              code={basicGroupCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* With Max Limit */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Max Limit (showing +X)
            </h3>
            <div className="mb-4">
              <AvatarGroup
                avatars={avatars}
                max={2}
              />
            </div>
            <CodeBlock
              code={withMaxCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* Different Sizes */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Different Sizes
            </h3>
            <div className="space-y-4 mb-4">
              <div>
                <p className="text-sm mb-2" style={{ color: theme.colors.gray[600] }}>Small</p>
                <AvatarGroup
                  avatars={avatars.slice(0, 3)}
                  max={3}
                  size="sm"
                />
              </div>
              <div>
                <p className="text-sm mb-2" style={{ color: theme.colors.gray[600] }}>Medium</p>
                <AvatarGroup
                  avatars={avatars.slice(0, 3)}
                  max={3}
                  size="md"
                />
              </div>
              <div>
                <p className="text-sm mb-2" style={{ color: theme.colors.gray[600] }}>Large</p>
                <AvatarGroup
                  avatars={avatars.slice(0, 3)}
                  max={3}
                  size="lg"
                />
              </div>
            </div>
            <CodeBlock
              code={differentSizesCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AvatarGroupPage;

