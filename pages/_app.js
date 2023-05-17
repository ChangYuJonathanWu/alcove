import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { Analytics } from '@vercel/analytics/react';
import { AuthContextProvider } from '@/context/AuthContext';
import '../styles/custom.css'


export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </AuthContextProvider>
  )
}
