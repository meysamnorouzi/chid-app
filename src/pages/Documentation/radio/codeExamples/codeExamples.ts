/**
 * Code Examples for Radio Documentation
 */

export const basicUsageCode = `import { Radio } from '@/components/shared';

<Radio label="Option 1" value="1" checked={false} onChange={(value) => console.log(value)} />`;

export const radioGroupCode = `import { RadioGroup } from '@/components/shared';

<RadioGroup
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
  onChange={(value) => console.log(value)}
/>`;

export const variantsCode = `import { Radio } from '@/components/shared';

<Radio variant="default" label="Default" value="1" checked />
<Radio variant="outline" label="Outline" value="2" checked />
<Radio variant="filled" label="Filled" value="3" checked />`;

export const sizesCode = `import { Radio } from '@/components/shared';

<Radio size="sm" label="Small" value="1" />
<Radio size="md" label="Medium" value="2" />
<Radio size="lg" label="Large" value="3" />`;

export const disabledCode = `import { Radio } from '@/components/shared';

<Radio label="Disabled" value="1" disabled />
<Radio label="Disabled Checked" value="2" checked disabled />`;

export const horizontalGroupCode = `import { RadioGroup } from '@/components/shared';

<RadioGroup
  orientation="horizontal"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
  onChange={(value) => console.log(value)}
/>`;

