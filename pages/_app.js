import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { Analytics } from '@vercel/analytics/react';
import '../styles/custom.css'
import { useState, useEffect } from 'react'
import DefaultLoader from '@/components/DefaultLoader';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { HOME_THEME } from '@/utils/themeConfig';
import { Inter } from 'next/font/google'
import { AnimatePresence } from 'framer-motion'
import { firebase } from '@/lib/Firebase'

const inter = Inter({ subsets: ['latin'], weights: [400,500, 550, 600, 700] })

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  // useEffect(() => {
  //   const start = () => {
  //     setLoading(true)
  //   }
  //   const end = () => {
  //     setLoading(false)
  //   }
  //   Router.events.on('routeChangeStart', start);
  //   Router.events.on('routeChangeComplete', end);
  //   Router.events.on('routeChangeError', end);
  //   return () => {
  //     Router.events.off('routeChangeStart', start);
  //     Router.events.off('routeChangeComplete', end);
  //     Router.events.off('routeChangeError', end);
  //   }
  // }, [])
  return (
    <ThemeProvider theme={theme}>
      <div id="root" className={inter.className} >
        {loading ? <DefaultLoader /> :
          <AnimatePresence initial={true} mode="wait">
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>}
      </div>
      <Analytics />
    </ThemeProvider>
  )
}
