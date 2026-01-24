/**
 * Basic Examples Page for FloatingToolbar
 */

import { FloatingToolbar, CodeBlock } from '../../../components/shared';
import { useDocumentationTheme } from '../../../theme';
import { basicUsageCode, withLabelsCode, withTooltipsCode, withBadgesCode } from './codeExamples/codeExamples';

const BasicExamples = () => {
  const { theme } = useDocumentationTheme();

  const basicActions = [
    {
      id: 'bold',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9M6 4v16" />
        </svg>
      ),
      label: 'Bold',
      onClick: () => console.log('Bold clicked'),
    },
    {
      id: 'italic',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4M10 4v16M10 4l-4 8M14 4l4 8" />
        </svg>
      ),
      label: 'Italic',
      onClick: () => console.log('Italic clicked'),
    },
    {
      id: 'underline',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19h14M5 5v8a4 4 0 008 0V5" />
        </svg>
      ),
      label: 'Underline',
      onClick: () => console.log('Underline clicked'),
    },
  ];

  const actionsWithLabels = [
    {
      id: 'save',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      ),
      label: 'Save',
      onClick: () => console.log('Save clicked'),
    },
    {
      id: 'share',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      label: 'Share',
      onClick: () => console.log('Share clicked'),
    },
  ];

  const actionsWithTooltips = [
    {
      id: 'edit',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      tooltip: 'Edit document',
      onClick: () => console.log('Edit clicked'),
    },
    {
      id: 'delete',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      tooltip: 'Delete item',
      onClick: () => console.log('Delete clicked'),
    },
  ];

  const actionsWithBadges = [
    {
      id: 'notifications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      badge: 5,
      onClick: () => console.log('Notifications clicked'),
    },
    {
      id: 'messages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      badge: 'New',
      onClick: () => console.log('Messages clicked'),
    },
  ];

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
          Basic usage examples of the FloatingToolbar component.
        </p>
      </header>

      <section className="mb-12 w-full">
        <div className="space-y-8 w-full">
          {/* Basic FloatingToolbar */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              Basic FloatingToolbar
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                actions={basicActions}
                position="bottom"
              />
            </div>
            <CodeBlock
              code={basicUsageCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>

          {/* With Labels */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Labels
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                showLabels
                actions={actionsWithLabels}
                position="bottom"
              />
            </div>
            <CodeBlock
              code={withLabelsCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>

          {/* With Tooltips */}
          <div className="w-full">
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Tooltips
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                showTooltips
                actions={actionsWithTooltips}
                position="bottom"
              />
            </div>
            <CodeBlock
              code={withTooltipsCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>

          {/* With Badges */}
          <div>
            <h3 
              className="text-lg font-medium mb-3"
              style={{ color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700] }}
            >
              With Badges
            </h3>
            <div className="mb-4 relative" style={{ minHeight: '200px' }}>
              <FloatingToolbar
                actions={actionsWithBadges}
                position="bottom"
              />
            </div>
            <CodeBlock
              code={withBadgesCode}
              title="Code"
              componentPath="@/components/shared/FloatingToolbar"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicExamples;

