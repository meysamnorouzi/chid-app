/**
 * Positions Page for Drawer
 */

import { useState } from 'react';
import { Drawer, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { positionsCode } from './codeExamples/codeExamples';

const Positions = () => {
  const { theme } = useDocumentationTheme();
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Positions
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different drawer positions available.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* All Positions */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              All Positions
            </h3>
            <div className="mb-4 flex flex-wrap gap-4">
              <Button onClick={() => setOpenLeft(true)}>Open Left</Button>
              <Button onClick={() => setOpenRight(true)}>Open Right</Button>
              <Button onClick={() => setOpenTop(true)}>Open Top</Button>
              <Button onClick={() => setOpenBottom(true)}>Open Bottom</Button>
            </div>
            
            <Drawer 
              open={openLeft} 
              onClose={() => setOpenLeft(false)}
              position="left"
              title="Left Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This drawer opens from the left side.
              </p>
            </Drawer>

            <Drawer 
              open={openRight} 
              onClose={() => setOpenRight(false)}
              position="right"
              title="Right Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This drawer opens from the right side.
              </p>
            </Drawer>

            <Drawer 
              open={openTop} 
              onClose={() => setOpenTop(false)}
              position="top"
              title="Top Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This drawer opens from the top.
              </p>
            </Drawer>

            <Drawer 
              open={openBottom} 
              onClose={() => setOpenBottom(false)}
              position="bottom"
              title="Bottom Drawer"
            >
              <p style={{ color: theme.colors.gray[700] }}>
                This drawer opens from the bottom.
              </p>
            </Drawer>

            <CodeBlock
              code={positionsCode}
              title="Code"
              componentPath="@/components/shared/Drawer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Positions;

