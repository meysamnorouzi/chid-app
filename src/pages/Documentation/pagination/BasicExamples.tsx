/**
 * Basic Examples Page for Pagination
 */

import { useState } from 'react';
import { Pagination, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withSiblingCountCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(5);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Basic Examples
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Basic usage examples of the Pagination component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Pagination */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Pagination
            </h3>
            <div className="mb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Pagination"
            />
          </div>

          {/* With Sibling Count */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Sibling Count
            </h3>
            <div className="mb-4">
              <Pagination
                currentPage={currentPage2}
                totalPages={20}
                siblingCount={2}
                onPageChange={(page) => setCurrentPage2(page)}
              />
            </div>
            <CodeBlock
              code={withSiblingCountCode}
              title="Code"
              componentPath="@/components/shared/Pagination"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

