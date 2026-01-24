/**
 * Types Page for Banner
 */

import { Banner, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { infoTypeCode, successTypeCode, warningTypeCode, errorTypeCode, neutralTypeCode } from './codeExamples/codeExamples';

const Types = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Types
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different type options for the Banner component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Info Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Info
            </h3>
            <div className="mb-4">
              <Banner
                title="Information"
                description="This is an informational banner."
                type="info"
              />
            </div>
            <CodeBlock
              code={infoTypeCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* Success Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Success
            </h3>
            <div className="mb-4">
              <Banner
                title="Success"
                description="Operation completed successfully."
                type="success"
              />
            </div>
            <CodeBlock
              code={successTypeCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* Warning Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Warning
            </h3>
            <div className="mb-4">
              <Banner
                title="Warning"
                description="Please review this information carefully."
                type="warning"
              />
            </div>
            <CodeBlock
              code={warningTypeCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* Error Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Error
            </h3>
            <div className="mb-4">
              <Banner
                title="Error"
                description="Something went wrong. Please try again."
                type="error"
              />
            </div>
            <CodeBlock
              code={errorTypeCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* Neutral Type */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Neutral
            </h3>
            <div className="mb-4">
              <Banner
                title="Neutral"
                description="This is a neutral banner without specific color."
                type="neutral"
              />
            </div>
            <CodeBlock
              code={neutralTypeCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Types;

