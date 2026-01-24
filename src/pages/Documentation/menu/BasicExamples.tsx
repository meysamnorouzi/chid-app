/**
 * Basic Examples Page for Menu
 */

import { Menu, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withIconsCode, withSubmenuCode, withDividersCode, withHeadersCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

  const basicItems = [
    { id: '1', label: 'Home', onClick: () => console.log('Home clicked') },
    { id: '2', label: 'About', onClick: () => console.log('About clicked') },
    { id: '3', label: 'Contact', onClick: () => console.log('Contact clicked') },
  ];

  const itemsWithIcons = [
    {
      id: '1',
      label: 'Home',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      onClick: () => console.log('Home clicked'),
    },
    {
      id: '2',
      label: 'Settings',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: () => console.log('Settings clicked'),
    },
  ];

  const itemsWithSubmenu = [
    {
      id: '1',
      label: 'Products',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      submenu: [
        { id: '1-1', label: 'Product 1', onClick: () => console.log('Product 1') },
        { id: '1-2', label: 'Product 2', onClick: () => console.log('Product 2') },
        { id: '1-3', label: 'Product 3', onClick: () => console.log('Product 3') },
      ],
    },
    {
      id: '2',
      label: 'Services',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      submenu: [
        { id: '2-1', label: 'Service 1', onClick: () => console.log('Service 1') },
        { id: '2-2', label: 'Service 2', onClick: () => console.log('Service 2') },
      ],
    },
  ];

  const itemsWithDividers = [
    { id: '1', label: 'Home', onClick: () => console.log('Home') },
    { id: 'divider-1', type: 'divider' as const },
    { id: '2', label: 'Settings', onClick: () => console.log('Settings') },
    { id: '3', label: 'Profile', onClick: () => console.log('Profile') },
    { id: 'divider-2', type: 'divider' as const },
    { id: '4', label: 'Logout', onClick: () => console.log('Logout') },
  ];

  const itemsWithHeaders = [
    { id: 'header-1', type: 'header' as const, label: 'Navigation' },
    { id: '1', label: 'Home', onClick: () => console.log('Home') },
    { id: '2', label: 'About', onClick: () => console.log('About') },
    { id: 'header-2', type: 'header' as const, label: 'Account' },
    { id: '3', label: 'Settings', onClick: () => console.log('Settings') },
    { id: '4', label: 'Profile', onClick: () => console.log('Profile') },
  ];

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Basic Examples
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Basic usage examples of the Menu component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Menu */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Menu
            </h3>
            <div className="mb-4">
              <Menu items={basicItems} />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Menu"
            />
          </div>

          {/* With Icons */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Icons
            </h3>
            <div className="mb-4">
              <Menu items={itemsWithIcons} />
            </div>
            <CodeBlock
              code={withIconsCode}
              title="Code"
              componentPath="@/components/shared/Menu"
            />
          </div>

          {/* With Submenu */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Submenu
            </h3>
            <div className="mb-4">
              <Menu items={itemsWithSubmenu} />
            </div>
            <CodeBlock
              code={withSubmenuCode}
              title="Code"
              componentPath="@/components/shared/Menu"
            />
          </div>

          {/* With Dividers */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Dividers
            </h3>
            <div className="mb-4">
              <Menu items={itemsWithDividers} />
            </div>
            <CodeBlock
              code={withDividersCode}
              title="Code"
              componentPath="@/components/shared/Menu"
            />
          </div>

          {/* With Headers */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Headers
            </h3>
            <div className="mb-4">
              <Menu items={itemsWithHeaders} />
            </div>
            <CodeBlock
              code={withHeadersCode}
              title="Code"
              componentPath="@/components/shared/Menu"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

