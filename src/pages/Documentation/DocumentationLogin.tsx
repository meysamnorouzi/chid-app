/**
 * Documentation Login Page Component
 * 
 * Login page for accessing documentation section
 * Designed with SEO, security, and modular structure in mind
 */

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDocumentationTheme } from '../../theme';

const DocumentationLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setDocAuthToken] = useLocalStorage<string | null>('docAuthToken', null);
  const { theme } = useDocumentationTheme();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate credentials
      const validUsername = 'admin';
      const validPassword = 'admin@123';
      
      if (!username || !password) {
        setError('Please enter username and password');
        setLoading(false);
        return;
      }

      if (username !== validUsername || password !== validPassword) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store authentication token
      const mockToken = `doc_token_${Date.now()}`;
      setDocAuthToken(mockToken);
      
      // Redirect to documentation with page reload to ensure state is updated
      window.location.href = '/documentation';
    } catch (err) {
      setError('Login error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-8"
      style={{ backgroundColor: theme.background.body }}
    >
      <div className="w-full max-w-md">
        <div 
          className="p-8"
        >
          <div className="mb-6 flex justify-center">
            <img 
              src="https://i.pinimg.com/originals/5f/5a/98/5f5a98e9bbdea8b6c88fa2fcd1950ec0.gif"
              alt="Login animation"
              className="max-w-[50%] h-auto rounded-lg"
            />
          </div>
          
          <h1 
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: theme.colors.light.inverse }}
          >
            Documentation Login
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6" dir="ltr">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.colors.gray[700] }}
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
                style={{
                  border: `1px solid ${theme.colors.gray[400]}`,
                  backgroundColor: theme.colors.light.default,
                  color: theme.colors.light.inverse,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.primary.default;
                  e.target.style.boxShadow = `0 0 0 2px ${theme.colors.primary.clarity}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.colors.gray[400];
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.colors.gray[700] }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
                style={{
                  border: `1px solid ${theme.colors.gray[400]}`,
                  backgroundColor: theme.colors.light.default,
                  color: theme.colors.light.inverse,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.primary.default;
                  e.target.style.boxShadow = `0 0 0 2px ${theme.colors.primary.clarity}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.colors.gray[400];
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div 
                className="border rounded-lg p-3"
                style={{
                  backgroundColor: theme.colors.danger.light,
                  borderColor: theme.colors.danger.default,
                }}
              >
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.danger.default }}
                >
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
              style={{
                backgroundColor: loading ? theme.colors.gray[500] : theme.colors.dark.default,
                color: theme.colors.dark.inverse,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = theme.colors.dark.active;
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = theme.colors.dark.default;
                }
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentationLogin;

