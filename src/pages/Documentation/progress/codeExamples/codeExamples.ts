/**
 * Code Examples for Progress Documentation
 */

export const basicUsageCode = `import { Progress } from '@/components/shared';

<Progress value={50} />`;

export const variantsCode = `import { Progress } from '@/components/shared';

<Progress value={50} variant="default" />
<Progress value={50} variant="striped" />
<Progress value={50} variant="animated" />`;

export const sizesCode = `import { Progress } from '@/components/shared';

<Progress value={50} size="sm" />
<Progress value={50} size="md" />
<Progress value={50} size="lg" />`;

export const colorsCode = `import { Progress } from '@/components/shared';

<Progress value={50} color="primary" />
<Progress value={50} color="success" />
<Progress value={50} color="warning" />
<Progress value={50} color="danger" />
<Progress value={50} color="info" />`;

export const withLabelCode = `import { Progress } from '@/components/shared';

<Progress value={50} showLabel />
<Progress value={50} label="Loading..." />
<Progress value={50} showLabel labelPosition="outside" />`;

export const indeterminateCode = `import { Progress } from '@/components/shared';

<Progress indeterminate />`;

export const withCustomMaxCode = `import { Progress } from '@/components/shared';

<Progress value={75} max={150} showLabel />`;

