/**
 * ToastProvider Page for Toast
 */

import { useState } from 'react';
import { ToastProvider as ToastProviderComponent, useToast, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { toastProviderCode, positionsCode, maxToastsCode, clearAllCode } from './codeExamples/codeExamples';

const ToastDemo = () => {
  const { showToast, clearAll } = useToast();
  const { theme } = useDocumentationTheme();

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => showToast({
            title: 'Info',
            message: 'This is an info toast.',
            type: 'info',
          })}
          className="px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: theme.colors.info.default,
            color: '#fff',
          }}
        >
          Show Info
        </button>
        <button
          onClick={() => showToast({
            title: 'Success',
            message: 'Operation completed successfully!',
            type: 'success',
          })}
          className="px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: theme.colors.success.default,
            color: '#fff',
          }}
        >
          Show Success
        </button>
        <button
          onClick={() => showToast({
            title: 'Warning',
            message: 'Please review your input.',
            type: 'warning',
          })}
          className="px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: theme.colors.warning.default,
            color: '#fff',
          }}
        >
          Show Warning
        </button>
        <button
          onClick={() => showToast({
            title: 'Error',
            message: 'Something went wrong.',
            type: 'error',
          })}
          className="px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: theme.colors.danger.default,
            color: '#fff',
          }}
        >
          Show Error
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 rounded-lg transition-colors border"
          style={{
            backgroundColor: theme.background.card,
            borderColor: theme.colors.gray[300],
            color: theme.colors.gray[700],
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

const ToastProviderPage = () => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="w-full mb-8">
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.light.inverse }}
        >
          ToastProvider
        </h1>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.gray[600] }}
        >
          Using ToastProvider to manage toast notifications globally.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic Usage */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic Usage
            </h3>
            <div className="mb-4">
              <ToastProviderComponent>
                <ToastDemo />
              </ToastProviderComponent>
            </div>
            <CodeBlock
              code={toastProviderCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* Positions */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Positions
            </h3>
            <div className="mb-4">
              <p 
                className="text-sm mb-4"
                style={{ color: theme.colors.gray[600] }}
              >
                ToastProvider supports 6 different positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.
              </p>
            </div>
            <CodeBlock
              code={positionsCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* Max Toasts */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Maximum Toasts
            </h3>
            <div className="mb-4">
              <p 
                className="text-sm mb-4"
                style={{ color: theme.colors.gray[600] }}
              >
                You can limit the maximum number of toasts displayed at once.
              </p>
            </div>
            <CodeBlock
              code={maxToastsCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>

          {/* Clear All */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Clear All Toasts
            </h3>
            <div className="mb-4">
              <p 
                className="text-sm mb-4"
                style={{ color: theme.colors.gray[600] }}
              >
                Use the clearAll function to remove all active toasts.
              </p>
            </div>
            <CodeBlock
              code={clearAllCode}
              title="Code"
              componentPath="@/components/shared/Toast"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToastProviderPage;

