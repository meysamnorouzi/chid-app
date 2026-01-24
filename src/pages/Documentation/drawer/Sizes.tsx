/**
 * Sizes Page for Drawer
 */

import { useState } from 'react';
import { Drawer, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { sizesCode } from './codeExamples/codeExamples';

const Sizes = () => {
  const { theme } = useDocumentationTheme();
  const [openSm, setOpenSm] = useState(false);
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  const [openXl, setOpenXl] = useState(false);
  const [openFull, setOpenFull] = useState(false);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Sizes
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different drawer sizes available.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* All Sizes */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              All Sizes
            </h3>
            <div className="mb-4 flex flex-wrap gap-4">
              <Button onClick={() => setOpenSm(true)}>Small</Button>
              <Button onClick={() => setOpenMd(true)}>Medium</Button>
              <Button onClick={() => setOpenLg(true)}>Large</Button>
              <Button onClick={() => setOpenXl(true)}>Extra Large</Button>
              <Button onClick={() => setOpenFull(true)}>Full</Button>
            </div>
            
            <Drawer 
              open={openSm} 
              onClose={() => setOpenSm(false)}
              size="sm"
              title="Small Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This is a small drawer (256px).
              </p>
            </Drawer>

            <Drawer 
              open={openMd} 
              onClose={() => setOpenMd(false)}
              size="md"
              title="Medium Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This is a medium drawer (320px).
              </p>
            </Drawer>

            <Drawer 
              open={openLg} 
              onClose={() => setOpenLg(false)}
              size="lg"
              title="Large Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This is a large drawer (384px).
              </p>
            </Drawer>

            <Drawer 
              open={openXl} 
              onClose={() => setOpenXl(false)}
              size="xl"
              title="Extra Large Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This is an extra large drawer (512px).
              </p>
            </Drawer>

            <Drawer 
              open={openFull} 
              onClose={() => setOpenFull(false)}
              size="full"
              title="Full Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This is a full-width/height drawer.
              </p>
            </Drawer>

            <CodeBlock
              code={sizesCode}
              title="Code"
              componentPath="@/components/shared/Drawer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sizes;

