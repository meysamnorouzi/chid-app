/**
 * Code Examples for FloatingToolbar Documentation
 */

export const basicUsageCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar
  actions={[
    {
      id: 'bold',
      icon: <strong>B</strong>,
      label: 'Bold',
      onClick: () => console.log('Bold clicked'),
    },
    {
      id: 'italic',
      icon: <em>I</em>,
      label: 'Italic',
      onClick: () => console.log('Italic clicked'),
    },
  ]}
/>`;

export const withLabelsCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar
  showLabels
  actions={[
    {
      id: 'save',
      icon: <SaveIcon />,
      label: 'Save',
      onClick: () => console.log('Save clicked'),
    },
    {
      id: 'share',
      icon: <ShareIcon />,
      label: 'Share',
      onClick: () => console.log('Share clicked'),
    },
  ]}
/>`;

export const withTooltipsCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar
  showTooltips
  actions={[
    {
      id: 'edit',
      icon: <EditIcon />,
      tooltip: 'Edit document',
      onClick: () => console.log('Edit clicked'),
    },
    {
      id: 'delete',
      icon: <DeleteIcon />,
      tooltip: 'Delete item',
      onClick: () => console.log('Delete clicked'),
    },
  ]}
/>`;

export const withBadgesCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar
  actions={[
    {
      id: 'notifications',
      icon: <BellIcon />,
      badge: 5,
      onClick: () => console.log('Notifications clicked'),
    },
    {
      id: 'messages',
      icon: <MessageIcon />,
      badge: 'New',
      onClick: () => console.log('Messages clicked'),
    },
  ]}
/>`;

export const variantsCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar variant="default" actions={actions} />
<FloatingToolbar variant="bordered" actions={actions} />
<FloatingToolbar variant="shadow" actions={actions} />`;

export const positionsCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar position="top" actions={actions} />
<FloatingToolbar position="bottom" actions={actions} />
<FloatingToolbar position="left" actions={actions} />
<FloatingToolbar position="right" actions={actions} />
<FloatingToolbar position="top-left" actions={actions} />
<FloatingToolbar position="top-right" actions={actions} />
<FloatingToolbar position="bottom-left" actions={actions} />
<FloatingToolbar position="bottom-right" actions={actions} />`;

export const sizesCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar size="sm" actions={actions} />
<FloatingToolbar size="md" actions={actions} />
<FloatingToolbar size="lg" actions={actions} />`;

export const verticalOrientationCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar
  orientation="vertical"
  position="right"
  actions={actions}
/>`;

export const withCustomOffsetCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar
  position="bottom-right"
  offset={{ bottom: 40, right: 40 }}
  actions={actions}
/>`;

export const withActiveStateCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar
  actions={[
    {
      id: 'bold',
      icon: <strong>B</strong>,
      active: true,
      onClick: () => console.log('Bold clicked'),
    },
    {
      id: 'italic',
      icon: <em>I</em>,
      active: false,
      onClick: () => console.log('Italic clicked'),
    },
  ]}
/>`;

export const withDisabledStateCode = `import { FloatingToolbar } from '@/components/shared';

<FloatingToolbar
  actions={[
    {
      id: 'save',
      icon: <SaveIcon />,
      disabled: false,
      onClick: () => console.log('Save clicked'),
    },
    {
      id: 'delete',
      icon: <DeleteIcon />,
      disabled: true,
      onClick: () => console.log('Delete clicked'),
    },
  ]}
/>`;

export const controlledVisibilityCode = `import { useState } from 'react';
import { FloatingToolbar } from '@/components/shared';

const [visible, setVisible] = useState(true);

<FloatingToolbar
  visible={visible}
  actions={actions}
/>`;

