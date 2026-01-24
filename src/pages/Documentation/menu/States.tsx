/**
 * States Page for Menu
 */

import { Menu, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withActiveStateCode, withDisabledStateCode, withBadgesCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();

  const itemsWithActive = [
    { id: '1', label: 'Home', active: true, onClick: () => console.log('Home') },
    { id: '2', label: 'About', active: false, onClick: () => console.log('About') },
    { id: '3', label: 'Contact', active: false, onClick: () => console.log('Contact') },
  ];

  const itemsWithDisabled = [
    { id: '1', label: 'Home', disabled: false, onClick: () => console.log('Home') },
    { id: '2', label: 'Settings', disabled: true, onClick: () => console.log('Settings') },
    { id: '3', label: 'Profile', disabled: false, onClick: () => console.log('Profile') },
  ];

  const itemsWithBadges = [
    { id: '1', label: 'Inbox', badge: 5, onClick: () => console.log('Inbox') },
    { id: '2', label: 'Messages', badge: 'New', onClick: () => console.log('Messages') },
    { id: '3', label: 'Notifications', badge: 12, onClick: () => console.log('Notifications') },
  ];

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
          Different states of the Menu component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Active State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Active State
            </h3>
            <div className="mb-4">
              <Menu items={itemsWithActive} />
            </div>
            <CodeBlock
              code={withActiveStateCode}
              title="Code"
              componentPath="@/components/shared/Menu"
            />
          </div>

          {/* Disabled State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled State
            </h3>
            <div className="mb-4">
              <Menu items={itemsWithDisabled} />
            </div>
            <CodeBlock
              code={withDisabledStateCode}
              title="Code"
              componentPath="@/components/shared/Menu"
            />
          </div>

          {/* With Badges */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Badges
            </h3>
            <div className="mb-4">
              <Menu items={itemsWithBadges} />
            </div>
            <CodeBlock
              code={withBadgesCode}
              title="Code"
              componentPath="@/components/shared/Menu"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

