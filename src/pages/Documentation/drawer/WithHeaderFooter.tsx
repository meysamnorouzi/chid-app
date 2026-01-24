/**
 * With Header Footer Page for Drawer
 */

import { useState } from 'react';
import { Drawer, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withFooterCode } from './codeExamples/codeExamples';

const WithHeaderFooter = () => {
  const { theme } = useDocumentationTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          With Header & Footer
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Drawer with custom header and footer content.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* With Header Footer */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Complete Example
            </h3>
            <div className="mb-4">
              <Button onClick={() => setOpen(true)}>Open Drawer</Button>
              <Drawer 
                open={open} 
                onClose={() => setOpen(false)}
                title="Drawer Title"
                footer={
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-sm"
                      style={{ color: theme.colors.gray[600] }}
                    >
                      Button label
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setOpen(false)}>
                        Confirm
                      </Button>
                    </div>
                  </div>
                }
              >
                <div className="space-y-4">
                  <p style={{ color: theme.colors.gray[700] }}>
                    This drawer has a title in the header and action buttons in the footer.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: theme.colors.gray[100],
                          borderColor: theme.colors.gray[200],
                          color: theme.colors.gray[600],
                        }}
                      >
                        REPLACE WITH YOUR CONTENT COMPONENT
                      </div>
                    ))}
                  </div>
                </div>
              </Drawer>
            </div>
            <CodeBlock
              code={withFooterCode}
              title="Code"
              componentPath="@/components/shared/Drawer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WithHeaderFooter;

