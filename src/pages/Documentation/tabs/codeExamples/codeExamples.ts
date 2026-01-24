/**
 * Code Examples for Tabs Documentation
 */

export const basicUsageCode = `import { Tabs } from '@/components/shared';
import { useState } from 'react';

const [value, setValue] = useState<string | number>('tab1');

<Tabs
  items={[
    { value: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { value: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  value={value}
  onChange={(val) => setValue(val)}
/>`;

export const withIconsCode = `import { Tabs } from '@/components/shared';

<Tabs
  items={[
    { value: 'tab1', label: 'Home', icon: <HomeIcon />, content: <div>Home</div> },
    { value: 'tab2', label: 'Settings', icon: <SettingsIcon />, content: <div>Settings</div> },
  ]}
  value={value}
  onChange={handleChange}
/>`;

export const withBadgesCode = `import { Tabs } from '@/components/shared';

<Tabs
  items={[
    { value: 'tab1', label: 'Inbox', badge: 5, content: <div>Inbox</div> },
    { value: 'tab2', label: 'Sent', badge: 12, content: <div>Sent</div> },
  ]}
  value={value}
  onChange={handleChange}
/>`;

export const withContentCode = `import { Tabs } from '@/components/shared';

<Tabs
  items={[
    { 
      value: 'tab1', 
      label: 'Tab 1', 
      content: <div>This is the content for Tab 1</div> 
    },
    { 
      value: 'tab2', 
      label: 'Tab 2', 
      content: <div>This is the content for Tab 2</div> 
    },
  ]}
  value={value}
  onChange={handleChange}
/>`;

export const variantsCode = `import { Tabs } from '@/components/shared';

<Tabs variant="default" items={items} value={value} onChange={handleChange} />
<Tabs variant="underlined" items={items} value={value} onChange={handleChange} />
<Tabs variant="pills" items={items} value={value} onChange={handleChange} />`;

export const sizesCode = `import { Tabs } from '@/components/shared';

<Tabs size="sm" items={items} value={value} onChange={handleChange} />
<Tabs size="md" items={items} value={value} onChange={handleChange} />
<Tabs size="lg" items={items} value={value} onChange={handleChange} />`;

export const fullWidthCode = `import { Tabs } from '@/components/shared';

<Tabs
  items={items}
  fullWidth
  value={value}
  onChange={handleChange}
/>`;

export const disabledCode = `import { Tabs } from '@/components/shared';

<Tabs
  items={items}
  disabled
  value={value}
  onChange={handleChange}
/>`;

export const withDisabledTabCode = `import { Tabs } from '@/components/shared';

<Tabs
  items={[
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2', disabled: true },
    { value: 'tab3', label: 'Tab 3' },
  ]}
  value={value}
  onChange={handleChange}
/>`;

