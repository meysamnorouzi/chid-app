/**
 * States Page for Drawer
 */

import { useState } from 'react';
import { Drawer, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { withoutBackdropCode, notClosableCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [openNoBackdrop, setOpenNoBackdrop] = useState(false);
  const [openNotClosable, setOpenNotClosable] = useState(false);

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
          Different drawer states available.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Without Backdrop */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without Backdrop
            </h3>
            <div className="mb-4">
              <Button onClick={() => setOpenNoBackdrop(true)}>Open Drawer without Backdrop</Button>
              <Drawer 
                open={openNoBackdrop} 
                onClose={() => setOpenNoBackdrop(false)}
                showBackdrop={false}
                title="Drawer without Backdrop"
              >
                <p style={{ color: theme.colors.gray[700] }}>
                  This drawer doesn't have a backdrop overlay.
                </p>
              </Drawer>
            </div>
            <CodeBlock
              code={withoutBackdropCode}
              title="Code"
              componentPath="@/components/shared/Drawer"
            />
          </div>

          {/* Not Closable */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Not Closable
            </h3>
            <div className="mb-4">
              <Button onClick={() => setOpenNotClosable(true)}>Open Non-Closable Drawer</Button>
              <Drawer 
                open={openNotClosable} 
                onClose={() => setOpenNotClosable(false)}
                closable={false}
                backdropClosable={false}
                title="Non-Closable Drawer"
                footer={
                  <Button onClick={() => setOpenNotClosable(false)}>
                    Close Manually
                  </Button>
                }
              >
                <p style={{ color: theme.colors.gray[700] }}>
                  This drawer cannot be closed by clicking the backdrop or close button.
                  You must use the button in the footer to close it.
                </p>
              </Drawer>
            </div>
            <CodeBlock
              code={notClosableCode}
              title="Code"
              componentPath="@/components/shared/Drawer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

