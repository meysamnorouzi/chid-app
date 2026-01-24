/**
 * Positions Page for Snackbar
 */

import { useState } from 'react';
import { Snackbar, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { positionsCode } from './codeExamples/codeExamples';

const Positions = () => {
  const { theme } = useDocumentationTheme();
  const [positions, setPositions] = useState<Record<string, boolean>>({});

  const handleShow = (position: string) => {
    setPositions({ ...positions, [position]: true });
  };

  const handleClose = (position: string) => {
    setPositions({ ...positions, [position]: false });
  };

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
          Different position options for the Snackbar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Top Positions */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Top Positions
            </h3>
            <div className="mb-4 flex flex-wrap gap-2">
              <Button onClick={() => handleShow('top-left')}>Top Left</Button>
              <Button onClick={() => handleShow('top-center')}>Top Center</Button>
              <Button onClick={() => handleShow('top-right')}>Top Right</Button>
            </div>
            <Snackbar
              position="top-left"
              message="Top left position"
              visible={positions['top-left']}
              onClose={() => handleClose('top-left')}
            />
            <Snackbar
              position="top-center"
              message="Top center position"
              visible={positions['top-center']}
              onClose={() => handleClose('top-center')}
            />
            <Snackbar
              position="top-right"
              message="Top right position"
              visible={positions['top-right']}
              onClose={() => handleClose('top-right')}
            />
          </div>

          {/* Bottom Positions */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Bottom Positions
            </h3>
            <div className="mb-4 flex flex-wrap gap-2">
              <Button onClick={() => handleShow('bottom-left')}>Bottom Left</Button>
              <Button onClick={() => handleShow('bottom-center')}>Bottom Center</Button>
              <Button onClick={() => handleShow('bottom-right')}>Bottom Right</Button>
            </div>
            <Snackbar
              position="bottom-left"
              message="Bottom left position"
              visible={positions['bottom-left']}
              onClose={() => handleClose('bottom-left')}
            />
            <Snackbar
              position="bottom-center"
              message="Bottom center position"
              visible={positions['bottom-center']}
              onClose={() => handleClose('bottom-center')}
            />
            <Snackbar
              position="bottom-right"
              message="Bottom right position"
              visible={positions['bottom-right']}
              onClose={() => handleClose('bottom-right')}
            />
          </div>

          <CodeBlock
            code={positionsCode}
            title="Code"
            componentPath="@/components/shared/Snackbar"
          />
        </div>
      </section>
    </div>
  );
};

export default Positions;

