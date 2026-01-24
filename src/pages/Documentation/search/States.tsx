/**
 * States Page for Search
 */

import { useState } from 'react';
import { Search, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { disabledCode, loadingCode, withErrorCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [value1, setValue1] = useState('');

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          States
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different states of the Search component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Disabled State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Disabled State
            </h3>
            <div className="mb-4">
              <Search
                placeholder="Search..."
                disabled
                onChange={(val) => console.log(val)}
              />
            </div>
            <CodeBlock
              code={disabledCode}
              title="Code"
              componentPath="@/components/shared/Search"
            />
          </div>

          {/* Loading State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Loading State
            </h3>
            <div className="mb-4">
              <Search
                placeholder="Search..."
                loading
                value={value1}
                onChange={(val) => setValue1(val)}
              />
            </div>
            <CodeBlock
              code={loadingCode}
              title="Code"
              componentPath="@/components/shared/Search"
            />
          </div>

          {/* Error State */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Error State
            </h3>
            <div className="mb-4">
              <Search
                placeholder="Search..."
                errorText="This field is required"
                onChange={(val) => console.log(val)}
              />
            </div>
            <CodeBlock
              code={withErrorCode}
              title="Code"
              componentPath="@/components/shared/Search"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

