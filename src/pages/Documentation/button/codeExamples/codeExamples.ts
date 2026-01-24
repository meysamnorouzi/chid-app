/**
 * Code Examples for Button Documentation
 */

export const basicUsageCode = `import { Button } from '@/components/shared';

<Button>Click me</Button>`;

export const variantsCode = `import { Button } from '@/components/shared';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>`;

export const sizesCode = `import { Button } from '@/components/shared';

<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

export const shapesCode = `import { Button } from '@/components/shared';

<Button shape="default">Default</Button>
<Button shape="rounded">Rounded</Button>
<Button shape="pill">Pill</Button>`;

export const withLeftIconCode = `import { Button } from '@/components/shared';

<Button
  leftIcon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  }
>
  Add Item
</Button>`;

export const withRightIconCode = `import { Button } from '@/components/shared';

<Button
  rightIcon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  }
>
  Next
</Button>`;

export const withBadgeCode = `import { Button } from '@/components/shared';

<Button badge={5}>Notifications</Button>
<Button badge="New">Messages</Button>`;

export const loadingCode = `import { Button } from '@/components/shared';

<Button loading>Loading...</Button>
<Button loading disabled>Loading...</Button>`;

export const disabledCode = `import { Button } from '@/components/shared';

<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`;

export const fullWidthCode = `import { Button } from '@/components/shared';

<Button fullWidth>Full Width Button</Button>`;

export const buttonTypesCode = `import { Button } from '@/components/shared';

<Button type="button">Button</Button>
<Button type="submit">Submit</Button>
<Button type="reset">Reset</Button>`;

export const withOnClickCode = `import { Button } from '@/components/shared';

<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>`;

export const iconOnlyCode = `import { Button } from '@/components/shared';

<Button
  leftIcon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  }
  aria-label="Add"
/>`;

export const iconOnlyVariantsCode = `import { Button } from '@/components/shared';

<Button
  variant="primary"
  leftIcon={<Icon />}
  aria-label="Add"
/>
<Button
  variant="outline"
  leftIcon={<Icon />}
  aria-label="Add"
/>
<Button
  variant="ghost"
  leftIcon={<Icon />}
  aria-label="Add"
/>`;

export const iconOnlySizesCode = `import { Button } from '@/components/shared';

<Button size="xs" leftIcon={<Icon />} aria-label="Add" />
<Button size="sm" leftIcon={<Icon />} aria-label="Add" />
<Button size="md" leftIcon={<Icon />} aria-label="Add" />
<Button size="lg" leftIcon={<Icon />} aria-label="Add" />`;

