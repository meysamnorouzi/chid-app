/**
 * Code Examples for Search Documentation
 */

export const basicUsageCode = `import { Search } from '@/components/shared';

<Search placeholder="Search..." onChange={(value) => console.log(value)} />`;

export const withLabelCode = `import { Search } from '@/components/shared';

<Search
  label="Search"
  helperText="Enter your search query"
  placeholder="Search..."
  onChange={(value) => console.log(value)}
/>`;

export const withSearchHandlerCode = `import { Search } from '@/components/shared';

<Search
  placeholder="Search..."
  onSearch={(value) => console.log('Searching for:', value)}
  onChange={(value) => console.log(value)}
/>`;

export const clearableCode = `import { Search } from '@/components/shared';

<Search
  placeholder="Search..."
  clearable
  onChange={(value) => console.log(value)}
/>`;

export const variantsCode = `import { Search } from '@/components/shared';

<Search variant="default" placeholder="Search..." onChange={handleChange} />
<Search variant="filled" placeholder="Search..." onChange={handleChange} />
<Search variant="outlined" placeholder="Search..." onChange={handleChange} />`;

export const sizesCode = `import { Search } from '@/components/shared';

<Search size="sm" placeholder="Search..." onChange={handleChange} />
<Search size="md" placeholder="Search..." onChange={handleChange} />
<Search size="lg" placeholder="Search..." onChange={handleChange} />`;

export const disabledCode = `import { Search } from '@/components/shared';

<Search
  placeholder="Search..."
  disabled
  onChange={handleChange}
/>`;

export const loadingCode = `import { Search } from '@/components/shared';

<Search
  placeholder="Search..."
  loading
  onChange={handleChange}
/>`;

export const withErrorCode = `import { Search } from '@/components/shared';

<Search
  placeholder="Search..."
  errorText="This field is required"
  onChange={handleChange}
/>`;

export const withCustomIconsCode = `import { Search } from '@/components/shared';

<Search
  placeholder="Search..."
  leftIcon={<CustomIcon />}
  rightIcon={<FilterIcon />}
  onChange={handleChange}
/>`;

