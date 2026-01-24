/**
 * Variants Page for Pagination
 */

import { useState } from 'react';
import { Pagination, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
  const { theme } = useDocumentationTheme();
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Variants
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different visual variants of the Pagination component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default
            </h3>
            <div className="mb-4">
              <Pagination
                variant="default"
                currentPage={currentPage1}
                totalPages={10}
                onPageChange={(page) => setCurrentPage1(page)}
              />
            </div>
          </div>

          {/* Outline Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outline
            </h3>
            <div className="mb-4">
              <Pagination
                variant="outline"
                currentPage={currentPage2}
                totalPages={10}
                onPageChange={(page) => setCurrentPage2(page)}
              />
            </div>
          </div>

          {/* Ghost Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Ghost
            </h3>
            <div className="mb-4">
              <Pagination
                variant="ghost"
                currentPage={currentPage3}
                totalPages={10}
                onPageChange={(page) => setCurrentPage3(page)}
              />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/Pagination"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

