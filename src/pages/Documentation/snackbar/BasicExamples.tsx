/**
 * Basic Examples Page for Snackbar
 */

import { useState } from 'react';
import { Snackbar, Button, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withTypesCode, withActionCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);
  const [show5, setShow5] = useState(true);

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
          Basic usage examples of the Snackbar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Snackbar */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Snackbar
            </h3>
            <div className="mb-4">
              <Button onClick={() => setShow1(true)}>Show Snackbar</Button>
              <Snackbar
                message="This is a snackbar message"
                visible={show1}
                onClose={() => setShow1(false)}
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/Snackbar"
            />
          </div>

          {/* With Types */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Types
            </h3>
            <div className="mb-4 flex flex-wrap gap-2">
              <Button onClick={() => setShow2(true)}>Info</Button>
              <Button onClick={() => setShow3(true)}>Success</Button>
              <Button onClick={() => setShow4(true)}>Warning</Button>
              <Button onClick={() => setShow5(true)}>Error</Button>
            </div>
            <div className="mb-4">
              <Snackbar
                type="info"
                message="This is an info message"
                visible={show2}
                onClose={() => setShow2(false)}
              />
              <Snackbar
                type="success"
                message="Operation completed successfully"
                visible={show3}
                onClose={() => setShow3(false)}
              />
              <Snackbar
                type="warning"
                message="Please check your input"
                visible={show4}
                onClose={() => setShow4(false)}
              />
              <Snackbar
                type="error"
                message="An error occurred"
                visible={show5}
                onClose={() => setShow5(false)}
              />
            </div>
            <CodeBlock
              code={withTypesCode}
              title="Code"
              componentPath="@/components/shared/Snackbar"
            />
          </div>

          {/* With Action */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Action
            </h3>
            <div className="mb-4">
              <Button onClick={() => setShow1(true)}>Show Snackbar with Action</Button>
              <Snackbar
                message="Item deleted"
                visible={show1}
                onClose={() => setShow1(false)}
                action={
                  <Button size="sm" variant="ghost" onClick={() => alert('Undo clicked')}>
                    Undo
                  </Button>
                }
              />
            </div>
            <CodeBlock
              code={withActionCode}
              title="Code"
              componentPath="@/components/shared/Snackbar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

