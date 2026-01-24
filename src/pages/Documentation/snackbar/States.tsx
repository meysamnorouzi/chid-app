/**
 * States Page for Snackbar
 */

import { useState } from 'react';
import { Snackbar, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { autoDismissCode, withoutCloseCode } from './codeExamples/codeExamples';

const States = () => {
  const { theme } = useDocumentationTheme();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

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
          Different states of the Snackbar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Auto Dismiss */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Auto Dismiss
            </h3>
            <div className="mb-4">
              <Button onClick={() => setShow1(true)}>Show Auto-Dismiss Snackbar</Button>
              <Snackbar
                message="This will auto-dismiss in 5 seconds"
                duration={5000}
                visible={show1}
                onClose={() => setShow1(false)}
              />
            </div>
            <CodeBlock
              code={autoDismissCode}
              title="Code"
              componentPath="@/components/shared/Snackbar"
            />
          </div>

          {/* Without Close Button */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Without Close Button
            </h3>
            <div className="mb-4">
              <Button onClick={() => setShow2(true)}>Show Snackbar Without Close</Button>
              <Snackbar
                message="This snackbar cannot be closed manually"
                closable={false}
                duration={3000}
                visible={show2}
                onClose={() => setShow2(false)}
              />
            </div>
            <CodeBlock
              code={withoutCloseCode}
              title="Code"
              componentPath="@/components/shared/Snackbar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;

