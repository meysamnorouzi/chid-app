/**
 * Avatar Code Examples
 * 
 * All code examples for Avatar component documentation
 */

// Basic Examples
export const basicUsageCode = `import { Avatar } from '@/components/shared';

<Avatar
  fallback="JD"
  alt="John Doe"
/>`;

export const withImageCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
/>`;

export const withFallbackCode = `import { Avatar } from '@/components/shared';

<Avatar
  fallback="JD"
  alt="John Doe"
/>`;

export const withIconCode = `import { Avatar } from '@/components/shared';

<Avatar
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  }
  alt="User"
/>`;

// Variants
export const defaultVariantCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  variant="default"
/>`;

export const borderedVariantCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  variant="bordered"
/>`;

export const ringVariantCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  variant="ring"
/>`;

export const solidVariantCode = `import { Avatar } from '@/components/shared';

<Avatar
  fallback="JD"
  alt="User Avatar"
  variant="solid"
/>`;

// Sizes
export const xsSizeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  size="xs"
/>`;

export const smSizeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  size="sm"
/>`;

export const mdSizeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  size="md"
/>`;

export const lgSizeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  size="lg"
/>`;

export const xlSizeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  size="xl"
/>`;

// States
export const disabledStateCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  disabled={true}
/>`;

export const loadingStateCode = `import { Avatar } from '@/components/shared';
import { useState } from 'react';

const [loading, setLoading] = useState(false);

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  loading={loading}
  onClick={() => setLoading(true)}
/>`;

export const withStatusCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  status="online"
/>`;

export const withBadgeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  badge={3}
/>`;

// Shapes
export const circleShapeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  shape="circle"
/>`;

export const squareShapeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  shape="square"
/>`;

export const roundedShapeCode = `import { Avatar } from '@/components/shared';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  shape="rounded"
/>`;

// Avatar Group
export const basicGroupCode = `import { AvatarGroup } from '@/components/shared';

<AvatarGroup
  avatars={[
    { src: 'https://example.com/avatar1.jpg', alt: 'User 1', fallback: 'U1' },
    { src: 'https://example.com/avatar2.jpg', alt: 'User 2', fallback: 'U2' },
    { src: 'https://example.com/avatar3.jpg', alt: 'User 3', fallback: 'U3' },
  ]}
  max={3}
/>`;

export const withMaxCode = `import { AvatarGroup } from '@/components/shared';

<AvatarGroup
  avatars={[...]}
  max={2}
/>`;

export const differentSizesCode = `import { AvatarGroup } from '@/components/shared';

<AvatarGroup
  avatars={[...]}
  max={3}
  size="lg"
/>`;

