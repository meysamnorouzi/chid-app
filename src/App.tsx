import { ThemeProvider } from './theme';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
