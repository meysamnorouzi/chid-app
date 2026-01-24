/**
 * Code Examples for Menu Documentation
 */

export const basicUsageCode = `import { Menu } from '@/components/shared';

<Menu
  items={[
    { id: '1', label: 'Home', onClick: () => console.log('Home clicked') },
    { id: '2', label: 'About', onClick: () => console.log('About clicked') },
    { id: '3', label: 'Contact', onClick: () => console.log('Contact clicked') },
  ]}
/>`;

export const withIconsCode = `import { Menu } from '@/components/shared';

<Menu
  items={[
    {
      id: '1',
      label: 'Home',
      icon: <HomeIcon />,
      onClick: () => console.log('Home clicked'),
    },
    {
      id: '2',
      label: 'Settings',
      icon: <SettingsIcon />,
      onClick: () => console.log('Settings clicked'),
    },
  ]}
/>`;

export const withSubmenuCode = `import { Menu } from '@/components/shared';

<Menu
  items={[
    {
      id: '1',
      label: 'Products',
      submenu: [
        { id: '1-1', label: 'Product 1', onClick: () => console.log('Product 1') },
        { id: '1-2', label: 'Product 2', onClick: () => console.log('Product 2') },
      ],
    },
  ]}
/>`;

export const withDividersCode = `import { Menu } from '@/components/shared';

<Menu
  items={[
    { id: '1', label: 'Home' },
    { id: 'divider-1', type: 'divider' },
    { id: '2', label: 'Settings' },
    { id: '3', label: 'Logout' },
  ]}
/>`;

export const withHeadersCode = `import { Menu } from '@/components/shared';

<Menu
  items={[
    { id: 'header-1', type: 'header', label: 'Navigation' },
    { id: '1', label: 'Home' },
    { id: '2', label: 'About' },
    { id: 'header-2', type: 'header', label: 'Account' },
    { id: '3', label: 'Settings' },
  ]}
/>`;

export const withBadgesCode = `import { Menu } from '@/components/shared';

<Menu
  items={[
    { id: '1', label: 'Inbox', badge: 5 },
    { id: '2', label: 'Messages', badge: 'New' },
  ]}
/>`;

export const withActiveStateCode = `import { Menu } from '@/components/shared';

<Menu
  items={[
    { id: '1', label: 'Home', active: true },
    { id: '2', label: 'About', active: false },
  ]}
/>`;

export const withDisabledStateCode = `import { Menu } from '@/components/shared';

<Menu
  items={[
    { id: '1', label: 'Home', disabled: false },
    { id: '2', label: 'Settings', disabled: true },
  ]}
/>`;

export const variantsCode = `import { Menu } from '@/components/shared';

<Menu variant="default" items={items} />
<Menu variant="bordered" items={items} />
<Menu variant="shadow" items={items} />`;

export const sizesCode = `import { Menu } from '@/components/shared';

<Menu size="sm" items={items} />
<Menu size="md" items={items} />
<Menu size="lg" items={items} />`;

