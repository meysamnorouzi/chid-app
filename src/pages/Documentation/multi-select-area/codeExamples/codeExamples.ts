/**
 * Code Examples for Multi Select Area Documentation
 */

export const basicUsageCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea
  items={[
    { value: '1', label: 'Ecuador' },
    { value: '2', label: 'Indonesia' },
    { value: '3', label: 'Estonia' },
  ]}
  onCopy={(text) => console.log('Copied:', text)}
/>`;

export const withLabelCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea
  label="Countries"
  helperText="Select countries from the list"
  items={[
    { value: '1', label: 'Ecuador' },
    { value: '2', label: 'Indonesia' },
  ]}
  onCopy={(text) => console.log('Copied:', text)}
/>`;

export const withColorsCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea
  items={[
    { value: '1', label: 'Primary', color: 'primary' },
    { value: '2', label: 'Success', color: 'success' },
    { value: '3', label: 'Warning', color: 'warning' },
  ]}
  onCopy={(text) => console.log('Copied:', text)}
/>`;

export const withMaxHeightCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea
  items={items}
  maxHeight={200}
  onCopy={(text) => console.log('Copied:', text)}
/>`;

export const variantsCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea variant="default" items={items} onCopy={handleCopy} />
<MultiSelectArea variant="filled" items={items} onCopy={handleCopy} />
<MultiSelectArea variant="outlined" items={items} onCopy={handleCopy} />`;

export const sizesCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea size="sm" items={items} onCopy={handleCopy} />
<MultiSelectArea size="md" items={items} onCopy={handleCopy} />
<MultiSelectArea size="lg" items={items} onCopy={handleCopy} />`;

export const disabledCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea
  items={items}
  disabled
  onCopy={handleCopy}
/>`;

export const withoutCopyCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea
  items={items}
  copyable={false}
/>`;

export const withCustomCopyTextCode = `import { MultiSelectArea } from '@/components/shared';

<MultiSelectArea
  items={items}
  copyText="Custom text to copy"
  onCopy={(text) => console.log('Copied:', text)}
/>`;

