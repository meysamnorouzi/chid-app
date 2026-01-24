/**
 * Documentation Mode Context
 * 
 * Context for managing documentation mode (Components vs Config)
 */

import { createContext, useContext, useState, ReactNode } from 'react';

export type DocumentationMode = 'components' | 'config';

interface DocumentationModeContextType {
  mode: DocumentationMode;
  setMode: (mode: DocumentationMode) => void;
}

const DocumentationModeContext = createContext<DocumentationModeContextType | undefined>(undefined);

export const DocumentationModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<DocumentationMode>('components');

  return (
    <DocumentationModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DocumentationModeContext.Provider>
  );
};

export const useDocumentationMode = () => {
  const context = useContext(DocumentationModeContext);
  if (context === undefined) {
    throw new Error('useDocumentationMode must be used within DocumentationModeProvider');
  }
  return context;
};

