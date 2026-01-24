/**
 * Accordion Code Examples
 * 
 * All code examples for Accordion component documentation
 */

// Basic Examples
export const basicUsageCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  defaultExpanded={true}
>
  <p>Main Content Display Place</p>
</AccordionItem>`;

export const collapsedStateCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  defaultExpanded={false}
>
  <p>Main Content Display Place</p>
</AccordionItem>`;

// Variants
export const borderedVariantCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  variant="bordered"
  defaultExpanded={true}
>
  <p>Main Content Display Place</p>
</AccordionItem>`;

export const ghostVariantCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  variant="ghost"
  defaultExpanded={true}
>
  <p>Main Content Display Place</p>
</AccordionItem>`;

export const filledVariantCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  variant="filled"
  defaultExpanded={true}
>
  <p>Main Content Display Place</p>
</AccordionItem>`;

// States
export const disabledStateCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  disabled={true}
>
  <p>This content cannot be expanded</p>
</AccordionItem>`;

export const loadingStateCode = `import { AccordionItem } from '@/components/shared';
import { useState } from 'react';

const [loading, setLoading] = useState(false);

<AccordionItem
  title="Content Title"
  loading={loading}
  onToggle={() => setLoading(true)}
>
  <p>Content loaded after animation</p>
</AccordionItem>`;

export const controlledStateCode = `import { AccordionItem } from '@/components/shared';
import { useState } from 'react';

const [expanded, setExpanded] = useState(false);

<AccordionItem
  title="Content Title"
  expanded={expanded}
  onToggle={(expanded) => setExpanded(expanded)}
>
  <p>This accordion is controlled by external state</p>
</AccordionItem>`;

// Sizes
export const smallSizeCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  size="sm"
  defaultExpanded={true}
>
  <p>Small size accordion</p>
</AccordionItem>`;

export const mediumSizeCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  size="md"
  defaultExpanded={true}
>
  <p>Medium size accordion</p>
</AccordionItem>`;

export const largeSizeCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  size="lg"
  defaultExpanded={true}
>
  <p>Large size accordion</p>
</AccordionItem>`;

// Icons & Badges
export const withIconCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  }
  defaultExpanded={true}
>
  <p>Accordion with custom icon</p>
</AccordionItem>`;

export const withBadgeCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  badge={5}
  defaultExpanded={true}
>
  <p>Accordion with badge</p>
</AccordionItem>`;

export const withIconAndBadgeCode = `import { AccordionItem } from '@/components/shared';

<AccordionItem
  title="Content Title"
  icon={<CustomIcon />}
  badge={5}
  defaultExpanded={true}
>
  <p>Accordion with custom icon and badge</p>
</AccordionItem>`;

// Accordion Group
export const basicAccordionGroupCode = `import { AccordionGroup } from '@/components/shared';

<AccordionGroup
  items={[
    {
      id: 'item-1',
      title: 'Getting Started',
      children: <p>Content here</p>,
    },
    {
      id: 'item-2',
      title: 'Components',
      children: <p>More content</p>,
    },
  ]}
  allowMultiple={false}
  defaultExpandedIds={['item-1']}
/>`;

export const multipleExpandCode = `import { AccordionGroup } from '@/components/shared';

<AccordionGroup
  items={[...]}
  allowMultiple={true}
  defaultExpandedIds={['item-1', 'item-2']}
/>`;

export const withVariantCode = `import { AccordionGroup } from '@/components/shared';

<AccordionGroup
  items={[...]}
  variant="bordered"
  allowMultiple={true}
/>`;

