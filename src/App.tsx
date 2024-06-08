import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import getLPTheme from './styles/getLPTheme';
import web3 from './web3';

export default function LandingPage() {
  const LPtheme = createTheme(getLPTheme('dark'));

  const showAccount= async () => {
    const account = await web3.eth.getAccounts();
    console.log(account);
  }

  useEffect(() => {
    showAccount()
  },[])

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar />
      <Hero />
    </ThemeProvider>
  );
}