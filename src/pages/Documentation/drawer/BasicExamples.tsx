/**
 * Basic Examples Page for Drawer
 */

import { useState } from 'react';
import { Drawer, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withTitleCode, withFooterCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();
  const [open, setOpen] = useState(false);
  const [openWithTitle, setOpenWithTitle] = useState(false);
  const [openWithFooter, setOpenWithFooter] = useState(false);

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
          Basic usage examples of the Drawer component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Drawer */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Drawer
            </h3>
            <div className="mb-4">
              <Button onClick={() => setOpen(true)}>Open Drawer</Button>
              <Drawer open={open} onClose={() => setOpen(false)}>
                <div className="space-y-4">
                  <p style={{ color: theme.colors.gray[700] }}>
                    This is a basic drawer with content.
                  </p>
                  <p style={{ color: theme.colors.gray[700] }}>
                    You can add any content here.
                  </p>
                </div>
              </Drawer>
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Drawer"
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
              <Button onClick={() => setOpenWithTitle(true)}>Open Drawer with Title</Button>
              <Drawer 
                open={openWithTitle} 
                onClose={() => setOpenWithTitle(false)}
                title="Drawer Title"
              >
                <div className="space-y-4">
                  <p style={{ color: theme.colors.gray[700] }}>
                    This drawer has a title in the header.
                  </p>
                </div>
              </Drawer>
            </div>
            <CodeBlock
              code={withTitleCode}
              title="Code"
              componentPath="@/components/shared/Drawer"
            />
          </div>

          {/* With Footer */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Footer
            </h3>
            <div className="mb-4">
              <Button onClick={() => setOpenWithFooter(true)}>Open Drawer with Footer</Button>
              <Drawer 
                open={openWithFooter} 
                onClose={() => setOpenWithFooter(false)}
                title="Drawer Title"
                footer={
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpenWithFooter(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setOpenWithFooter(false)}>
                      Confirm
                    </Button>
                  </div>
                }
              >
                <div className="space-y-4">
                  <p style={{ color: theme.colors.gray[700] }}>
                    This drawer has a footer with action buttons.
                  </p>
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

export default BasicExamples;

