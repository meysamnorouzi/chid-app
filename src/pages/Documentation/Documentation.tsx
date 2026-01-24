/**
 * Documentation Page Component
 * 
 * This page displays the application documentation
 * Designed with SEO, security, and modular structure in mind
 */

import { useDocumentationTheme } from '../../theme';

const Documentation = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
                <h1 
                  className="text-4xl font-bold mb-4"
                  style={{ color: theme.colors.light.inverse }}
                >
                  Documentation
                </h1>
                <p 
                  className="text-lg mb-8"
                  style={{ color: theme.colors.gray[600] }}
                >
                  Welcome to the documentation section
                </p>
                
                <div className="w-full space-y-4">
                  <section 
                    className="p-6 rounded-lg w-full"
                    style={{ 
                      backgroundColor: theme.background.body,
                      boxShadow: theme.boxShadows.default 
                    }}
                  >
                    <h2 
                      className="text-2xl font-semibold mb-4"
                      style={{ color: theme.colors.light.inverse }}
                    >
                      User Guide
                    </h2>
                    <p style={{ color: theme.colors.gray[700] }}>
                      This section contains the complete application documentation.
                    </p>
                  </section>
                </div>
    </div>
  );
};

export default Documentation;

