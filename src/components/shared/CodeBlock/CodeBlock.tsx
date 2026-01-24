/**
 * CodeBlock Component
 * 
 * Displays code with copy to clipboard functionality
 * Designed with SEO, accessibility, and modular structure in mind
 */

import { useState, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';

interface CodeBlockProps {
  /**
   * Code content to display
   */
  code: string;
  
  /**
   * Optional title for the code block
   */
  title?: string;
  
  /**
   * Optional component path to display
   */
  componentPath?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

const CodeBlock = ({ code, title, componentPath, className = '' }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className={`${className} w-full`}>
      {/* Component Path Box */}
      {componentPath && (
        <div 
          className="mb-2 px-4 py-2 rounded-lg text-sm font-mono"
          style={{ 
            backgroundColor: theme.background.card,
            color: theme.colors.gray[700],
            border: `1px solid ${theme.colors.gray[300]}`,
          }}
        >
          <span className="text-xs font-semibold mr-2">Component:</span>
          <span>{componentPath}</span>
        </div>
      )}
      
      <div 
        className={`rounded-lg w-full`}
        style={{ 
          backgroundColor: theme.colors.gray[100],
          border: `1px solid ${theme.colors.gray[300]}`,
        }}
      >
        {/* Header with title and copy button */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{
            borderColor: theme.colors.gray[300],
          }}
        >
        {title ? (
          <h3 
            className="text-lg font-medium"
            style={{ color: theme.colors.light.inverse }}
          >
            {title}
          </h3>
        ) : (
          <div></div>
        )}
        <button
          onClick={handleCopy}
          className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: copied ? theme.colors.success.default : 'transparent',
            color: copied ? theme.colors.success.inverse : theme.colors.gray[700],
            border: `1px solid ${copied ? theme.colors.success.default : theme.colors.gray[300]}`,
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = theme.colors.gray[200];
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
        </div>
        
        {/* Code content */}
        <div className="p-4 w-full">
          <pre className="overflow-x-auto w-full max-w-full">
            <code style={{ color: theme.colors.gray[800] }}>
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;

