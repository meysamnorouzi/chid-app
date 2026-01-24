/**
 * Basic Examples Page for Search
 */

import { useState } from 'react';
import { Search, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withLabelCode, withSearchHandlerCode, clearableCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

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
          Basic usage examples of the Search component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Search */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Search
            </h3>
            <div className="mb-4">
              <Search
                placeholder="Search..."
                value={value1}
                onChange={(val) => setValue1(val)}
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Search"
            />
          </div>

          {/* With Label and Helper Text */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Label and Helper Text
            </h3>
            <div className="mb-4">
              <Search
                label="Search"
                helperText="Enter your search query"
                placeholder="Search..."
                value={value2}
                onChange={(val) => setValue2(val)}
              />
            </div>
            <CodeBlock
              code={withLabelCode}
              title="Code"
              componentPath="@/components/shared/Search"
            />
          </div>

          {/* With Search Handler */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Search Handler
            </h3>
            <div className="mb-4">
              <Search
                placeholder="Search..."
                value={value3}
                onChange={(val) => setValue3(val)}
                onSearch={(val) => alert(`Searching for: ${val}`)}
              />
            </div>
            <CodeBlock
              code={withSearchHandlerCode}
              title="Code"
              componentPath="@/components/shared/Search"
            />
          </div>

          {/* Clearable */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Clearable
            </h3>
            <div className="mb-4">
              <Search
                placeholder="Search..."
                value={value4}
                onChange={(val) => setValue4(val)}
                clearable
              />
            </div>
            <CodeBlock
              code={clearableCode}
              title="Code"
              componentPath="@/components/shared/Search"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

