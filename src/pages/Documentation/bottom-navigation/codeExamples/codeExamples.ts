/**
 * Code Examples for BottomNavigation Documentation
 */

export const basicUsageCode = `import { BottomNavigation } from '@/components/shared';

const items = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'search',
    label: 'Search',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

<BottomNavigation items={items} activeId="home" />`;

export const withBadgesCode = `import { BottomNavigation } from '@/components/shared';

const items = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeIcon />,
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: <MessageIcon />,
    badge: 5,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <NotificationIcon />,
    badge: 'New',
  },
];

<BottomNavigation items={items} activeId="home" />`;

export const withActiveIconsCode = `import { BottomNavigation } from '@/components/shared';

const items = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeOutlineIcon />,
    activeIcon: <HomeFilledIcon />,
  },
  {
    id: 'search',
    label: 'Search',
    icon: <SearchOutlineIcon />,
    activeIcon: <SearchFilledIcon />,
  },
];

<BottomNavigation items={items} activeId="home" />`;

export const withoutLabelsCode = `import { BottomNavigation } from '@/components/shared';

<BottomNavigation 
  items={items} 
  activeId="home"
  showLabels={false}
/>`;

export const withOnClickCode = `import { BottomNavigation } from '@/components/shared';
import { useState } from 'react';

function MyComponent() {
  const [activeId, setActiveId] = useState('home');

  const handleItemClick = (itemId: string) => {
    setActiveId(itemId);
    console.log('Clicked:', itemId);
  };

  return (
    <BottomNavigation
      items={items}
      activeId={activeId}
      onItemClick={handleItemClick}
    />
  );
}`;

export const disabledItemsCode = `import { BottomNavigation } from '@/components/shared';

const items = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeIcon />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    disabled: true,
  },
];

<BottomNavigation items={items} activeId="home" />`;

export const customStylingCode = `import { BottomNavigation } from '@/components/shared';

<BottomNavigation
  items={items}
  activeId="home"
  className="custom-bottom-nav"
  style={{
    paddingTop: '1rem',
    paddingBottom: '1rem',
  }}
/>`;

