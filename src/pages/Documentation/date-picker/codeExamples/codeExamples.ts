/**
 * Code Examples for DatePicker Documentation
 */

export const basicUsageCode = `import { DatePicker } from '@/components/shared';

<DatePicker />`;

export const withValueCode = `import { DatePicker } from '@/components/shared';
import { useState } from 'react';

const [date, setDate] = useState<Date | null>(new Date());

<DatePicker
  value={date}
  onChange={(newDate) => setDate(newDate)}
/>`;

export const variantsCode = `import { DatePicker } from '@/components/shared';

<DatePicker variant="primary" />
<DatePicker variant="secondary" />
<DatePicker variant="outline" />
<DatePicker variant="ghost" />`;

export const sizesCode = `import { DatePicker } from '@/components/shared';

<DatePicker size="sm" />
<DatePicker size="md" />
<DatePicker size="lg" />`;

export const dateFormatsCode = `import { DatePicker } from '@/components/shared';

<DatePicker dateFormat="DD/MM/YYYY" />
<DatePicker dateFormat="MM/DD/YYYY" />
<DatePicker dateFormat="YYYY/MM/DD" />
<DatePicker dateFormat="DD MMM YYYY" />
<DatePicker dateFormat="MMM DD, YYYY" />`;

export const withMinMaxCode = `import { DatePicker } from '@/components/shared';

const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 11, 31);

<DatePicker
  minDate={minDate}
  maxDate={maxDate}
/>`;

export const disabledCode = `import { DatePicker } from '@/components/shared';

<DatePicker disabled />`;

export const withoutIconCode = `import { DatePicker } from '@/components/shared';

<DatePicker showIcon={false} />`;

export const customPlaceholderCode = `import { DatePicker } from '@/components/shared';

<DatePicker placeholder="Choose a date" />`;

