/**
 * Icons and Badges Page for Accordion
 */

import { AccordionItem, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withIconCode, withBadgeCode, withIconAndBadgeCode } from './codeExamples/codeExamples';

const IconsBadges = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Icons & Badges
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Accordion with custom icons and badges.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Icon */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Icon
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="with-icon"
                title="Content Title"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                defaultExpanded={true}
              >
                <p>Accordion with custom icon</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={withIconCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          {/* With Badge */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Badge
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="with-badge"
                title="Content Title"
                badge={5}
                defaultExpanded={true}
              >
                <p>Accordion with badge</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={withBadgeCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>

          {/* With Icon and Badge */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Icon and Badge
            </h3>
            <div className="mb-4">
              <AccordionItem
                id="with-icon-badge"
                title="Content Title"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                badge={5}
                defaultExpanded={true}
              >
                <p>Accordion with custom icon and badge</p>
              </AccordionItem>
            </div>
            <CodeBlock
              code={withIconAndBadgeCode}
              title="Code"
              componentPath="@/components/shared/Accordion"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IconsBadges;

