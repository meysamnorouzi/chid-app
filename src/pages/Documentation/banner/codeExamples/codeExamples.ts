/**
 * Banner Code Examples
 * 
 * All code examples for Banner component documentation
 */

// Basic Examples
export const basicUsageCode = `import { Banner } from '@/components/shared';

<Banner
  description="This is a default banner message."
/>`;

export const withTitleCode = `import { Banner } from '@/components/shared';

<Banner
  title="Banner Title"
  description="This is a banner with a title and description."
/>`;

export const withDescriptionCode = `import { Banner } from '@/components/shared';

<Banner
  description="This is a banner with only description text."
/>`;

export const withChildrenCode = `import { Banner } from '@/components/shared';

<Banner>
  <div>
    <p className="font-semibold mb-2">Custom Content</p>
    <p>You can use custom content instead of description.</p>
  </div>
</Banner>`;

// Variants
export const defaultVariantCode = `import { Banner } from '@/components/shared';

<Banner
  title="Default Banner"
  description="This is a default variant banner."
  variant="default"
  type="info"
/>`;

export const filledVariantCode = `import { Banner } from '@/components/shared';

<Banner
  title="Filled Banner"
  description="This is a filled variant banner."
  variant="filled"
  type="info"
/>`;

export const outlinedVariantCode = `import { Banner } from '@/components/shared';

<Banner
  title="Outlined Banner"
  description="This is an outlined variant banner."
  variant="outlined"
  type="info"
/>`;

export const subtleVariantCode = `import { Banner } from '@/components/shared';

<Banner
  title="Subtle Banner"
  description="This is a subtle variant banner."
  variant="subtle"
  type="info"
/>`;

// Types
export const infoTypeCode = `import { Banner } from '@/components/shared';

<Banner
  title="Information"
  description="This is an informational banner."
  type="info"
/>`;

export const successTypeCode = `import { Banner } from '@/components/shared';

<Banner
  title="Success"
  description="Operation completed successfully."
  type="success"
/>`;

export const warningTypeCode = `import { Banner } from '@/components/shared';

<Banner
  title="Warning"
  description="Please review this information carefully."
  type="warning"
/>`;

export const errorTypeCode = `import { Banner } from '@/components/shared';

<Banner
  title="Error"
  description="Something went wrong. Please try again."
  type="error"
/>`;

export const neutralTypeCode = `import { Banner } from '@/components/shared';

<Banner
  title="Neutral"
  description="This is a neutral banner without specific color."
  type="neutral"
/>`;

// Sizes
export const smallSizeCode = `import { Banner } from '@/components/shared';

<Banner
  title="Small Banner"
  description="This is a small size banner."
  size="sm"
  type="info"
/>`;

export const mediumSizeCode = `import { Banner } from '@/components/shared';

<Banner
  title="Medium Banner"
  description="This is a medium size banner (default)."
  size="md"
  type="info"
/>`;

export const largeSizeCode = `import { Banner } from '@/components/shared';

<Banner
  title="Large Banner"
  description="This is a large size banner."
  size="lg"
  type="info"
/>`;

// States
export const closableCode = `import { Banner } from '@/components/shared';

<Banner
  title="Closable Banner"
  description="This banner can be closed by clicking the X button."
  type="info"
  closable={true}
  onClose={() => console.log('Banner closed')}
/>`;

export const withActionCode = `import { Banner } from '@/components/shared';

<Banner
  title="Banner with Action"
  description="This banner includes an action button."
  type="success"
  action={
    <button>Take Action</button>
  }
/>`;

export const controlledVisibleCode = `import { Banner } from '@/components/shared';
import { useState } from 'react';

const [visible, setVisible] = useState(true);

<Banner
  title="Controlled Banner"
  description="This banner visibility is controlled by external state."
  type="warning"
  visible={visible}
/>`;

