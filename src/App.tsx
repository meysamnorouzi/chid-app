import { useState } from 'react';
import { ThemeProvider } from './theme';
import AppRoutes from './routes/AppRoutes';
import SplashScreen from './components/SplashScreen';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <AppRoutes />
      )}
    </ThemeProvider>
  );
}

export default App;
