/**
 * Deletable Page for Chips
 */

import { useState } from 'react';
import { Chips, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { deletableCode } from './codeExamples/codeExamples';

const Deletable = () => {
  const { theme } = useDocumentationTheme();
  const [chips, setChips] = useState(['Chip 1', 'Chip 2', 'Chip 3', 'Chip 4']);

  const handleDelete = (index: number) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          Deletable Chips
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Chips with delete functionality.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Deletable */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Deletable Chip
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              <Chips deletable onDelete={() => console.log('Deleted!')}>
                Deletable Chip
              </Chips>
            </div>
            <CodeBlock
              code={deletableCode}
              title="Code"
              componentPath="@/components/shared/Chips"
            />
          </div>

          {/* Deletable List */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Deletable Chip List
            </h3>
            <div className="mb-4 flex gap-2 flex-wrap">
              {chips.map((chip, index) => (
                <Chips
                  key={index}
                  variant={index % 2 === 0 ? 'primary' : 'secondary'}
                  deletable
                  onDelete={() => handleDelete(index)}
                >
                  {chip}
                </Chips>
              ))}
            </div>
            <CodeBlock
              code={`import { Chips } from '@/components/shared';
import { useState } from 'react';

const [chips, setChips] = useState(['Chip 1', 'Chip 2', 'Chip 3']);

{chips.map((chip, index) => (
  <Chips
    key={index}
    deletable
    onDelete={() => setChips(chips.filter((_, i) => i !== index))}
  >
    {chip}
  </Chips>
))}`}
              title="Code"
              componentPath="@/components/shared/Chips"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deletable;

