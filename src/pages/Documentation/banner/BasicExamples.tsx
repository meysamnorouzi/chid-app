/**
 * Basic Examples Page for Banner
 */

import { Banner, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withTitleCode, withDescriptionCode, withChildrenCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

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
          Basic usage examples of the Banner component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Banner */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default Banner
            </h3>
            <div className="mb-4">
              <Banner
                description="This is a default banner message."
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* With Title */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Title
            </h3>
            <div className="mb-4">
              <Banner
                title="Banner Title"
                description="This is a banner with a title and description."
              />
            </div>
            <CodeBlock
              code={withTitleCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* With Description Only */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Description Only
            </h3>
            <div className="mb-4">
              <Banner
                description="This is a banner with only description text."
              />
            </div>
            <CodeBlock
              code={withDescriptionCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>

          {/* With Custom Content */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Custom Content
            </h3>
            <div className="mb-4">
              <Banner>
                <div>
                  <p className="font-semibold mb-2">Custom Content</p>
                  <p>You can use custom content instead of description.</p>
                </div>
              </Banner>
            </div>
            <CodeBlock
              code={withChildrenCode}
              title="Code"
              componentPath="@/components/shared/Banner"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

