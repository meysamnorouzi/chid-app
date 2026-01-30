import { useState } from 'react';
import { ThemeProvider } from './theme';
import AppRoutes from './routes/AppRoutes';
import SplashScreen from './components/SplashScreen';
import { ModalProvider } from './contexts/ModalContext';
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
          <AppRoutes />
        )}
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
