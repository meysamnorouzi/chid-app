/**
 * FullScreen Page for Loader
 */

import { useState } from 'react';
import { Loader, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { fullScreenCode } from './codeExamples/codeExamples';

const FullScreen = () => {
  const { theme } = useDocumentationTheme();
  const [showFullScreen, setShowFullScreen] = useState(false);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Full Screen
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Full screen overlay loader examples.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Full Screen Loader */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Full Screen Loader
            </h3>
            <div className="mb-4">
              <Button onClick={() => setShowFullScreen(true)}>
                Show Full Screen Loader
              </Button>
              {showFullScreen && (
                <Loader 
                  fullScreen 
                  label="Loading..." 
                  variant="spinner"
                />
              )}
              {showFullScreen && (
                <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10000 }}>
                  <Button onClick={() => setShowFullScreen(false)} variant="danger" size="sm">
                    Close
                  </Button>
                </div>
              )}
            </div>
            <CodeBlock
              code={fullScreenCode}
              title="Code"
              componentPath="@/components/shared/Loader"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullScreen;

