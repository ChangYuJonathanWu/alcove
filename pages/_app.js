import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { Analytics } from '@vercel/analytics/react';
import { AuthContextProvider } from '@/context/AuthContext';
import '../styles/custom.css'
import { useState, useEffect } from 'react'
import DefaultLoader from '@/components/DefaultLoader';
import Router from 'next/router';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      console.log('Initiate loading')
      setLoading(true)
    }
    const end = () => {
      console.log('End loading')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    }
  }, [])
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        {loading ?  <DefaultLoader /> : <Component {...pageProps} /> }
        <Analytics />
      </ThemeProvider>
    </AuthContextProvider>
  )
}
