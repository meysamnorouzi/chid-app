import { useState } from 'react';
import { ThemeProvider } from './theme';
import AppRoutes from './routes/AppRoutes';
import SplashScreen from './components/SplashScreen';
import { ModalProvider } from './contexts/ModalContext';
import { ReloadPrompt, InstallPrompt, OfflineBanner } from './components/pwa';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      <ModalProvider>
        {showSplash ? (
          <SplashScreen onComplete={handleSplashComplete} />
        ) : (
          <>
            <OfflineBanner />
            <AppRoutes />
            <ReloadPrompt />
            <InstallPrompt />
          </>
        )}
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
