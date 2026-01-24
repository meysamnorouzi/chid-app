/**
 * With Icons Page for Search
 */

import { useState } from 'react';
import { Search, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withCustomIconsCode } from './codeExamples/codeExamples';

const WithIcons = () => {
  const { theme } = useDocumentationTheme();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  // Custom filter icon
  const FilterIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );

  // Custom location icon
  const LocationIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          With Icons
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Search component with custom icons.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Right Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Right Icon
            </h3>
            <div className="mb-4">
              <Search
                placeholder="Search with filter..."
                value={value1}
                onChange={(val) => setValue1(val)}
                rightIcon={FilterIcon}
                onSearch={(val) => alert(`Filtering: ${val}`)}
              />
            </div>
          </div>

          {/* With Custom Left Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Custom Left Icon
            </h3>
            <div className="mb-4">
              <Search
                placeholder="Search by location..."
                value={value2}
                onChange={(val) => setValue2(val)}
                leftIcon={LocationIcon}
              />
            </div>
          </div>

          <CodeBlock
            code={withCustomIconsCode}
            title="Code"
            componentPath="@/components/shared/Search"
          />
        </div>
      </section>
    </div>
  );
};

export default WithIcons;

