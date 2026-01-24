/**
 * Code Examples for Segment Control Documentation
 */

export const basicUsageCode = `import { SegmentControl } from '@/components/shared';

<SegmentControl
  items={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  value={value}
  onChange={(val) => setValue(val)}
/>`;

export const withIconsCode = `import { SegmentControl } from '@/components/shared';

<SegmentControl
  items={[
    { value: 'list', label: 'List', icon: <ListIcon /> },
    { value: 'grid', label: 'Grid', icon: <GridIcon /> },
    { value: 'map', label: 'Map', icon: <MapIcon /> },
  ]}
  value={value}
  onChange={(val) => setValue(val)}
/>`;

export const fullWidthCode = `import { SegmentControl } from '@/components/shared';

<SegmentControl
  items={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  fullWidth
  value={value}
  onChange={(val) => setValue(val)}
/>`;

export const variantsCode = `import { SegmentControl } from '@/components/shared';

<SegmentControl variant="default" items={items} value={value} onChange={handleChange} />
<SegmentControl variant="filled" items={items} value={value} onChange={handleChange} />
<SegmentControl variant="outlined" items={items} value={value} onChange={handleChange} />`;

export const sizesCode = `import { SegmentControl } from '@/components/shared';

<SegmentControl size="sm" items={items} value={value} onChange={handleChange} />
<SegmentControl size="md" items={items} value={value} onChange={handleChange} />
<SegmentControl size="lg" items={items} value={value} onChange={handleChange} />`;

export const disabledCode = `import { SegmentControl } from '@/components/shared';

<SegmentControl
  items={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  disabled
  value={value}
  onChange={handleChange}
/>`;

export const withDisabledItemCode = `import { SegmentControl } from '@/components/shared';

<SegmentControl
  items={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' },
  ]}
  value={value}
  onChange={handleChange}
/>`;

