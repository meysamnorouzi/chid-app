/**
 * Code Examples for Chips Documentation
 */

export const basicUsageCode = `import { Chips } from '@/components/shared';

<Chips>Basic Chip</Chips>`;

export const variantsCode = `import { Chips } from '@/components/shared';

<Chips variant="primary">Primary</Chips>
<Chips variant="secondary">Secondary</Chips>
<Chips variant="outline">Outline</Chips>
<Chips variant="ghost">Ghost</Chips>
<Chips variant="danger">Danger</Chips>
<Chips variant="success">Success</Chips>
<Chips variant="warning">Warning</Chips>
<Chips variant="info">Info</Chips>`;

export const sizesCode = `import { Chips } from '@/components/shared';

<Chips size="xs">Extra Small</Chips>
<Chips size="sm">Small</Chips>
<Chips size="md">Medium</Chips>
<Chips size="lg">Large</Chips>`;

export const shapesCode = `import { Chips } from '@/components/shared';

<Chips shape="default">Default</Chips>
<Chips shape="rounded">Rounded</Chips>
<Chips shape="pill">Pill</Chips>`;

export const withLeftIconCode = `import { Chips } from '@/components/shared';

<Chips
  leftIcon={
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  }
>
  Verified
</Chips>`;

export const withRightIconCode = `import { Chips } from '@/components/shared';

<Chips
  rightIcon={
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  }
>
  Next
</Chips>`;

export const deletableCode = `import { Chips } from '@/components/shared';

<Chips deletable onDelete={() => console.log('Deleted!')}>
  Deletable Chip
</Chips>`;

export const clickableCode = `import { Chips } from '@/components/shared';

<Chips clickable onClick={() => console.log('Clicked!')}>
  Clickable Chip
</Chips>`;

export const disabledCode = `import { Chips } from '@/components/shared';

<Chips disabled>Disabled Chip</Chips>
<Chips variant="outline" disabled>Disabled Outline</Chips>`;

export const combinedCode = `import { Chips } from '@/components/shared';

<Chips
  variant="primary"
  size="md"
  leftIcon={<Icon />}
  deletable
  onDelete={() => handleDelete()}
>
  Combined Chip
</Chips>`;

