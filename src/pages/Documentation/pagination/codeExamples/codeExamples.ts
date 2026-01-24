/**
 * Code Examples for Pagination Documentation
 */

export const basicUsageCode = `import { useState } from 'react';
import { Pagination } from '@/components/shared';

const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
/>`;

export const variantsCode = `import { Pagination } from '@/components/shared';

<Pagination variant="default" currentPage={1} totalPages={10} onPageChange={handleChange} />
<Pagination variant="outline" currentPage={1} totalPages={10} onPageChange={handleChange} />
<Pagination variant="ghost" currentPage={1} totalPages={10} onPageChange={handleChange} />`;

export const sizesCode = `import { Pagination } from '@/components/shared';

<Pagination size="sm" currentPage={1} totalPages={10} onPageChange={handleChange} />
<Pagination size="md" currentPage={1} totalPages={10} onPageChange={handleChange} />
<Pagination size="lg" currentPage={1} totalPages={10} onPageChange={handleChange} />`;

export const withSiblingCountCode = `import { Pagination } from '@/components/shared';

<Pagination
  currentPage={5}
  totalPages={20}
  siblingCount={2}
  onPageChange={handleChange}
/>`;

export const withoutFirstLastCode = `import { Pagination } from '@/components/shared';

<Pagination
  currentPage={5}
  totalPages={20}
  showFirstLast={false}
  onPageChange={handleChange}
/>`;

export const withoutPrevNextCode = `import { Pagination } from '@/components/shared';

<Pagination
  currentPage={5}
  totalPages={20}
  showPrevNext={false}
  onPageChange={handleChange}
/>`;

export const withoutPageNumbersCode = `import { Pagination } from '@/components/shared';

<Pagination
  currentPage={5}
  totalPages={20}
  showPageNumbers={false}
  onPageChange={handleChange}
/>`;

