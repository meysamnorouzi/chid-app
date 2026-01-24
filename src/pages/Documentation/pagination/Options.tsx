/**
 * Options Page for Pagination
 */

import { useState } from 'react';
import { Pagination, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withoutFirstLastCode, withoutPrevNextCode, withoutPageNumbersCode } from './codeExamples/codeExamples';

const Options = () => {
  const { theme } = useDocumentationTheme();
  const [currentPage1, setCurrentPage1] = useState(5);
  const [currentPage2, setCurrentPage2] = useState(5);
  const [currentPage3, setCurrentPage3] = useState(5);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Options
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different configuration options for the Pagination component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Without First/Last */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without First/Last Buttons
            </h3>
            <div className="mb-4">
              <Pagination
                currentPage={currentPage1}
                totalPages={20}
                showFirstLast={false}
                onPageChange={(page) => setCurrentPage1(page)}
              />
            </div>
            <CodeBlock
              code={withoutFirstLastCode}
              title="Code"
              componentPath="@/components/shared/Pagination"
            />
          </div>

          {/* Without Prev/Next */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without Prev/Next Buttons
            </h3>
            <div className="mb-4">
              <Pagination
                currentPage={currentPage2}
                totalPages={20}
                showPrevNext={false}
                onPageChange={(page) => setCurrentPage2(page)}
              />
            </div>
            <CodeBlock
              code={withoutPrevNextCode}
              title="Code"
              componentPath="@/components/shared/Pagination"
            />
          </div>

          {/* Without Page Numbers */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without Page Numbers
            </h3>
            <div className="mb-4">
              <Pagination
                currentPage={currentPage3}
                totalPages={20}
                showPageNumbers={false}
                onPageChange={(page) => setCurrentPage3(page)}
              />
            </div>
            <CodeBlock
              code={withoutPageNumbersCode}
              title="Code"
              componentPath="@/components/shared/Pagination"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Options;

