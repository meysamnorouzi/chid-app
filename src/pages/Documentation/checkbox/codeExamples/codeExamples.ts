/**
 * Checkbox Code Examples
 * 
 * All code examples for Checkbox component documentation
 */

// Basic Examples
export const basicUsageCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Accept terms and conditions"
/>`;

export const withDefaultCheckedCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Subscribe to newsletter"
  defaultChecked={true}
/>`;

export const withDescriptionCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Enable notifications"
  description="You will receive push notifications on your device"
/>`;

export const controlledCode = `import { Checkbox } from '@/components/shared';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Checkbox
  label="Controlled checkbox"
  checked={checked}
  onChange={(checked) => setChecked(checked)}
/>`;

// Variants
export const defaultVariantCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Default variant"
  variant="default"
/>`;

export const filledVariantCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Filled variant"
  variant="filled"
  defaultChecked={true}
/>`;

export const outlinedVariantCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Outlined variant"
  variant="outlined"
  defaultChecked={true}
/>`;

// Sizes
export const smallSizeCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Small checkbox"
  size="sm"
  defaultChecked={true}
/>`;

export const mediumSizeCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Medium checkbox (default)"
  size="md"
  defaultChecked={true}
/>`;

export const largeSizeCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Large checkbox"
  size="lg"
  defaultChecked={true}
/>`;

// Shapes
export const squareShapeCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Square checkbox"
  shape="square"
  defaultChecked={true}
/>`;

export const roundedShapeCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Rounded checkbox"
  shape="rounded"
  defaultChecked={true}
/>`;

// States
export const disabledCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Disabled checkbox"
  disabled={true}
/>`;

export const disabledCheckedCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Disabled checked checkbox"
  disabled={true}
  defaultChecked={true}
/>`;

export const indeterminateCode = `import { Checkbox } from '@/components/shared';

<Checkbox
  label="Indeterminate checkbox"
  indeterminate={true}
/>`;

export const withFormCode = `import { Checkbox } from '@/components/shared';

<form>
  <Checkbox
    name="accept"
    value="yes"
    label="I accept the terms"
  />
</form>`;

