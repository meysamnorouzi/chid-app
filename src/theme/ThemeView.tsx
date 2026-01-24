/**
 * ThemeView Component
 * 
 * View component for displaying and switching themes
 * Provides UI for theme selection
 */

import { useTheme } from './ThemeProvider';
import { themes } from './themeConfig';

const ThemeView = () => {
  const { theme, themeMode, setTheme } = useTheme();

  return (
    <div className="p-6 bg-light-default dark:bg-dark-default rounded-lg shadow-default">
      <h2 className="text-2xl font-bold mb-4 text-dark-default dark:text-light-inverse">
        Theme Settings
      </h2>
      
      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Current theme: <span className="font-semibold">{theme.label}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(themes).map(([mode, themeConfig]) => (
            <button
              key={mode}
              onClick={() => setTheme(mode as 'light' | 'dark')}
              className={`
                p-4 rounded-lg border-2 transition-all duration-300
                ${
                  themeMode === mode
                    ? 'border-primary-default bg-primary-light dark:bg-primary-light'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-default'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-dark-default dark:text-light-inverse">
                  {themeConfig.label}
                </span>
                {themeMode === mode && (
                  <span className="text-primary-default text-lg">✓</span>
                )}
              </div>
              <div className="flex gap-2">
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: themeConfig.background.body }}
                />
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: themeConfig.colors.primary.default }}
                />
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: themeConfig.colors.brand.default }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeView;

