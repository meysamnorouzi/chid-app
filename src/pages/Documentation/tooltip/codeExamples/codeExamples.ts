/**
 * Code Examples for Tooltip Documentation
 */

export const basicUsageCode = `import { Tooltip, Button } from '@/components/shared';

<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`;

export const withIconCode = `import { Tooltip, Button } from '@/components/shared';

<Tooltip content={
  <>
    <Icon />
    <span>This is a tooltip with icon</span>
  </>
}>
  <Button>Hover me</Button>
</Tooltip>`;

export const positionsCode = `import { Tooltip, Button } from '@/components/shared';

<Tooltip position="top" content="Top tooltip">
  <Button>Top</Button>
</Tooltip>

<Tooltip position="bottom" content="Bottom tooltip">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip position="left" content="Left tooltip">
  <Button>Left</Button>
</Tooltip>

<Tooltip position="right" content="Right tooltip">
  <Button>Right</Button>
</Tooltip>`;

export const sizesCode = `import { Tooltip, Button } from '@/components/shared';

<Tooltip size="sm" content="Small tooltip">
  <Button>Small</Button>
</Tooltip>

<Tooltip size="md" content="Medium tooltip">
  <Button>Medium</Button>
</Tooltip>

<Tooltip size="lg" content="Large tooltip">
  <Button>Large</Button>
</Tooltip>`;

export const withDelayCode = `import { Tooltip, Button } from '@/components/shared';

<Tooltip 
  content="This tooltip appears after 500ms"
  delay={500}
>
  <Button>Hover me</Button>
</Tooltip>`;

export const disabledCode = `import { Tooltip, Button } from '@/components/shared';

<Tooltip 
  content="This tooltip is disabled"
  disabled
>
  <Button>Hover me</Button>
</Tooltip>`;

