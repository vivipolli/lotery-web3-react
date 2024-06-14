import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Hero from './components/Hero';
import getLPTheme from './styles/getLPTheme';

export default function LandingPage() {
  const LPtheme = createTheme(getLPTheme('dark'));

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <Hero />
    </ThemeProvider>
  );
}