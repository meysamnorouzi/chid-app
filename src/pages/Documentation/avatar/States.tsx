/**
 * States Page for Avatar
 */

import { useState } from 'react';
import { Avatar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledStateCode, loadingStateCode, withStatusCode, withBadgeCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [loadingState, setLoadingState] = useState(false);

  // Simulate loading
  const handleLoadingClick = () => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  };

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          States
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different states of the Avatar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Disabled State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg"
                alt="User Avatar"
                fallback="JD"
                disabled={true}
              />
            </div>
            <CodeBlock
              code={disabledStateCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* Loading State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Loading
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/1200x/9a/58/72/9a587266603249ff0d9203bf85fc35a4.jpg"
                alt="User Avatar"
                fallback="JD"
                loading={loadingState}
                onClick={handleLoadingClick}
              />
              <button
                onClick={handleLoadingClick}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: theme.colors.primary.default,
                  color: theme.colors.primary.inverse,
                }}
              >
                Toggle Loading
              </button>
            </div>
            <CodeBlock
              code={loadingStateCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* With Status */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Status Indicator
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/29/4d/3b/294d3bbf1cec608f222fcac8d77d9504.jpg"
                alt="User Avatar"
                fallback="JD"
                status="online"
              />
              <Avatar
                src="https://i.pinimg.com/736x/3c/95/e7/3c95e78af0dd70a7fd83ab3a85d05967.jpg"
                alt="User Avatar"
                fallback="AB"
                status="away"
              />
              <Avatar
                src="https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg"
                alt="User Avatar"
                fallback="SM"
                status="busy"
              />
              <Avatar
                src="https://i.pinimg.com/1200x/9a/58/72/9a587266603249ff0d9203bf85fc35a4.jpg"
                alt="User Avatar"
                fallback="TM"
                status="offline"
              />
            </div>
            <CodeBlock
              code={withStatusCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>

          {/* With Badge */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Badge
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src="https://i.pinimg.com/736x/29/4d/3b/294d3bbf1cec608f222fcac8d77d9504.jpg"
                alt="User Avatar"
                fallback="JD"
                badge={3}
              />
              <Avatar
                src="https://i.pinimg.com/736x/3c/95/e7/3c95e78af0dd70a7fd83ab3a85d05967.jpg"
                alt="User Avatar"
                fallback="AB"
                badge={99}
              />
              <Avatar
                src="https://i.pinimg.com/736x/e7/44/90/e744908ef10fb1e8df22c0f408c92d43.jpg"
                alt="User Avatar"
                fallback="SM"
                badge={150}
              />
            </div>
            <CodeBlock
              code={withBadgeCode}
              title="Code"
              componentPath="@/components/shared/Avatar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

