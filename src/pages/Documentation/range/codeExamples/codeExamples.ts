/**
 * Code Examples for Range Documentation
 */

export const basicUsageCode = `import { Range } from '@/components/shared';

<Range value={50} onChange={(value) => console.log(value)} />`;

export const rangeCode = `import { Range } from '@/components/shared';

<Range
  range
  values={[20, 80]}
  onChange={(values) => console.log(values)}
/>`;

export const withLabelCode = `import { Range } from '@/components/shared';

<Range
  label="Price Range"
  helperText="Select your price range"
  value={50}
  onChange={(value) => console.log(value)}
/>`;

export const withLabelsCode = `import { Range } from '@/components/shared';

<Range
  value={50}
  showLabels
  onChange={(value) => console.log(value)}
/>`;

export const withMarksCode = `import { Range } from '@/components/shared';

<Range
  value={50}
  showMarks
  marks={[0, 25, 50, 75, 100]}
  onChange={(value) => console.log(value)}
/>`;

export const withCustomMarksCode = `import { Range } from '@/components/shared';

<Range
  value={50}
  marks={[
    { value: 0, label: '0%' },
    { value: 50, label: '50%' },
    { value: 100, label: '100%' },
  ]}
  onChange={(value) => console.log(value)}
/>`;

export const variantsCode = `import { Range } from '@/components/shared';

<Range variant="default" value={50} onChange={handleChange} />
<Range variant="filled" value={50} onChange={handleChange} />`;

export const sizesCode = `import { Range } from '@/components/shared';

<Range size="sm" value={50} onChange={handleChange} />
<Range size="md" value={50} onChange={handleChange} />
<Range size="lg" value={50} onChange={handleChange} />`;

export const disabledCode = `import { Range } from '@/components/shared';

<Range value={50} disabled onChange={handleChange} />`;

export const withStepCode = `import { Range } from '@/components/shared';

<Range
  value={50}
  min={0}
  max={100}
  step={10}
  onChange={(value) => console.log(value)}
/>`;

