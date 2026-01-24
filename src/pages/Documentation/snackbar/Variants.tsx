/**
 * Variants Page for Snackbar
 */

import { useState } from 'react';
import { Snackbar, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { variantsCode } from './codeExamples/codeExamples';

const Variants = () => {
  const { theme } = useDocumentationTheme();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Variants
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Different visual variants of the Snackbar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Default Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Default
            </h3>
            <div className="mb-4">
              <Button onClick={() => setShow1(true)}>Show Default</Button>
              <Snackbar
                variant="default"
                message="This is a default snackbar"
                visible={show1}
                onClose={() => setShow1(false)}
              />
            </div>
          </div>

          {/* Filled Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Filled
            </h3>
            <div className="mb-4">
              <Button onClick={() => setShow2(true)}>Show Filled</Button>
              <Snackbar
                variant="filled"
                type="success"
                message="This is a filled snackbar"
                visible={show2}
                onClose={() => setShow2(false)}
              />
            </div>
          </div>

          {/* Outlined Variant */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Outlined
            </h3>
            <div className="mb-4">
              <Button onClick={() => setShow3(true)}>Show Outlined</Button>
              <Snackbar
                variant="outlined"
                type="info"
                message="This is an outlined snackbar"
                visible={show3}
                onClose={() => setShow3(false)}
              />
            </div>
          </div>

          <CodeBlock
            code={variantsCode}
            title="Code"
            componentPath="@/components/shared/Snackbar"
          />
        </div>
      </section>
    </div>
  );
};

export default Variants;

