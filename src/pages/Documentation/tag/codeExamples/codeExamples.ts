/**
 * Code Examples for Tag Documentation
 */

export const basicUsageCode = `import { Tag } from '@/components/shared';

<Tag>Default Tag</Tag>`;

export const variantsCode = `import { Tag } from '@/components/shared';

<Tag variant="default">Default</Tag>
<Tag variant="solid">Solid</Tag>
<Tag variant="outline">Outline</Tag>
<Tag variant="subtle">Subtle</Tag>`;

export const colorsCode = `import { Tag } from '@/components/shared';

<Tag color="primary">Primary</Tag>
<Tag color="secondary">Secondary</Tag>
<Tag color="success">Success</Tag>
<Tag color="warning">Warning</Tag>
<Tag color="danger">Danger</Tag>
<Tag color="info">Info</Tag>
<Tag color="gray">Gray</Tag>`;

export const sizesCode = `import { Tag } from '@/components/shared';

<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>`;

export const withIconsCode = `import { Tag } from '@/components/shared';

<Tag
  leftIcon={
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  }
>
  Verified
</Tag>`;

export const closableCode = `import { Tag } from '@/components/shared';

<Tag closable onClose={() => console.log('Closed')}>
  Closable Tag
</Tag>`;

export const disabledCode = `import { Tag } from '@/components/shared';

<Tag disabled>Disabled Tag</Tag>
<Tag variant="solid" disabled>Disabled Solid</Tag>`;

export const withRightIconCode = `import { Tag } from '@/components/shared';

<Tag
  rightIcon={
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
    </svg>
  }
>
  Completed
</Tag>`;

