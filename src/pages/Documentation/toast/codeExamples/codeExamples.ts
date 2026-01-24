/**
 * Code Examples for Toast Documentation
 */

export const basicUsageCode = `import { Toast } from '@/components/shared';

<Toast
  message="This is a basic toast message."
/>`;

export const withTitleCode = `import { Toast } from '@/components/shared';

<Toast
  title="Success!"
  message="Your changes have been saved successfully."
  type="success"
/>`;

export const withIconCode = `import { Toast } from '@/components/shared';

<Toast
  message="Custom icon toast"
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  }
/>`;

export const withActionCode = `import { Toast } from '@/components/shared';

<Toast
  title="File uploaded"
  message="Your file has been uploaded successfully."
  type="success"
  action={
    <button className="text-sm font-medium underline">
      View File
    </button>
  }
/>`;

export const infoTypeCode = `import { Toast } from '@/components/shared';

<Toast
  title="Information"
  message="This is an informational message."
  type="info"
/>`;

export const successTypeCode = `import { Toast } from '@/components/shared';

<Toast
  title="Success"
  message="Operation completed successfully."
  type="success"
/>`;

export const warningTypeCode = `import { Toast } from '@/components/shared';

<Toast
  title="Warning"
  message="Please review your input before proceeding."
  type="warning"
/>`;

export const errorTypeCode = `import { Toast } from '@/components/shared';

<Toast
  title="Error"
  message="Something went wrong. Please try again."
  type="error"
/>`;

export const closableCode = `import { Toast } from '@/components/shared';

<Toast
  message="This toast can be closed."
  closable={true}
  onClose={() => console.log('Toast closed')}
/>`;

export const nonClosableCode = `import { Toast } from '@/components/shared';

<Toast
  message="This toast cannot be closed manually."
  closable={false}
/>`;

export const customDurationCode = `import { Toast } from '@/components/shared';

<Toast
  message="This toast will disappear after 10 seconds."
  duration={10000}
/>`;

export const noAutoDismissCode = `import { Toast } from '@/components/shared';

<Toast
  message="This toast will not auto-dismiss."
  duration={null}
/>`;

export const toastProviderCode = `import { ToastProvider, useToast } from '@/components/shared';

function App() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <YourApp />
    </ToastProvider>
  );
}

function YourComponent() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast({
      title: 'Success',
      message: 'Operation completed!',
      type: 'success',
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
}`;

export const positionsCode = `import { ToastProvider } from '@/components/shared';

// Top positions
<ToastProvider position="top-left">
  <App />
</ToastProvider>

<ToastProvider position="top-center">
  <App />
</ToastProvider>

<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Bottom positions
<ToastProvider position="bottom-left">
  <App />
</ToastProvider>

<ToastProvider position="bottom-center">
  <App />
</ToastProvider>

<ToastProvider position="bottom-right">
  <App />
</ToastProvider>`;

export const maxToastsCode = `import { ToastProvider } from '@/components/shared';

<ToastProvider maxToasts={3}>
  <App />
</ToastProvider>`;

export const clearAllCode = `import { useToast } from '@/components/shared';

function MyComponent() {
  const { clearAll } = useToast();

  return (
    <button onClick={clearAll}>
      Clear All Toasts
    </button>
  );
}`;

