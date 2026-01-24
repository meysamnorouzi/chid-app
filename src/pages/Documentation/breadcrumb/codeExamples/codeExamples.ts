/**
 * Code Examples for Breadcrumb Documentation
 */

export const basicUsageCode = `import { Breadcrumb } from '@/components/shared';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops' },
];

<Breadcrumb items={items} />`;

export const withSeparatorsCode = `import { Breadcrumb } from '@/components/shared';

// Slash separator (default)
<Breadcrumb items={items} separator="/" />

// Arrow separator
<Breadcrumb items={items} separator=">" />

// Right arrow separator
<Breadcrumb items={items} separator="→" />

// Bullet separator
<Breadcrumb items={items} separator="•" />`;

export const withCustomSeparatorCode = `import { Breadcrumb } from '@/components/shared';

<Breadcrumb
  items={items}
  separatorComponent={
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  }
/>`;

export const withHomeIconCode = `import { Breadcrumb } from '@/components/shared';

<Breadcrumb items={items} showHomeIcon={true} />`;

export const withIconsCode = `import { Breadcrumb } from '@/components/shared';

const items = [
  {
    label: 'Home',
    href: '/',
    icon: <HomeIcon />,
  },
  {
    label: 'Products',
    href: '/products',
    icon: <ProductsIcon />,
  },
  {
    label: 'Laptops',
  },
];

<Breadcrumb items={items} />`;

export const withOnClickCode = `import { Breadcrumb } from '@/components/shared';

const items = [
  {
    label: 'Home',
    onClick: () => console.log('Home clicked'),
  },
  {
    label: 'Products',
    onClick: () => console.log('Products clicked'),
  },
  {
    label: 'Laptops',
  },
];

<Breadcrumb items={items} />`;

export const withMaxItemsCode = `import { Breadcrumb } from '@/components/shared';

// Show maximum 3 items (first, ellipsis, last 2)
<Breadcrumb items={items} maxItems={3} />`;

export const disabledItemsCode = `import { Breadcrumb } from '@/components/shared';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', disabled: true },
  { label: 'Laptops' },
];

<Breadcrumb items={items} />`;

