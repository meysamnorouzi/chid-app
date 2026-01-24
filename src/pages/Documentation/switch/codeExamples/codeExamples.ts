/**
 * Code Examples for Switch Documentation
 */

export const basicUsageCode = `import { Switch } from '@/components/shared';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onChange={(val) => setChecked(val)}
/>`;

export const withLabelCode = `import { Switch } from '@/components/shared';

<Switch
  label="Enable notifications"
  checked={checked}
  onChange={(val) => setChecked(val)}
/>`;

export const withDescriptionCode = `import { Switch } from '@/components/shared';

<Switch
  label="Enable notifications"
  description="Receive push notifications on your device"
  checked={checked}
  onChange={(val) => setChecked(val)}
/>`;

export const labelPositionCode = `import { Switch } from '@/components/shared';

<Switch
  label="Label on left"
  labelPosition="left"
  checked={checked}
  onChange={(val) => setChecked(val)}
/>

<Switch
  label="Label on right"
  labelPosition="right"
  checked={checked}
  onChange={(val) => setChecked(val)}
/>`;

export const variantsCode = `import { Switch } from '@/components/shared';

<Switch variant="default" checked={checked} onChange={handleChange} />
<Switch variant="filled" checked={checked} onChange={handleChange} />`;

export const sizesCode = `import { Switch } from '@/components/shared';

<Switch size="sm" checked={checked} onChange={handleChange} />
<Switch size="md" checked={checked} onChange={handleChange} />
<Switch size="lg" checked={checked} onChange={handleChange} />`;

export const disabledCode = `import { Switch } from '@/components/shared';

<Switch
  checked={true}
  disabled
  onChange={handleChange}
/>`;

export const uncontrolledCode = `import { Switch } from '@/components/shared';

<Switch
  defaultChecked={true}
  onChange={(checked) => console.log(checked)}
/>`;

