import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { amita } from '../fonts'
import Link from 'next/link';
import SignUp from '@/components/home/SignUp'
import CallToAction from '@/components/home/CallToAction'

import useBetterMediaQuery from '@/utils/useBetterMediaQuery'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/home/Navbar'
import { useRouter } from 'next/router';
import PageTransition from '@/components/PageTransition'

import React, { useState } from 'react'

import { HOME_THEME } from '@/utils/themeConfig';

export default function Home() {
  const isTabletOrMobile = useBetterMediaQuery('(max-width: 930px)')
  const isLarge = useBetterMediaQuery('(min-width: 930px)')
  const isReallyLarge = useBetterMediaQuery('(min-width: 1200px)')

  const minQueriesComplete = isTabletOrMobile || isLarge || isReallyLarge

  const theme = HOME_THEME
  const claimButtonStyle = { backgroundColor: theme.buttonColor, color: theme.buttonTextColor, maxWidth: "250px", textTransform: 'none', borderRadius: '15px', padding: '1rem 2rem' }
  const backgroundColor = theme.bgColor
  const logoColor = theme.logoColor
  const textColor = theme.textColor

  const router = useRouter();

  const [signupState, setSignupState] = useState({
    handle: "",
    email: "",
    showValidationError: false,
    showEmailInput: false,
    validationErrorText: "",
    validationInProgress: false,
    completed: false,
    hideFireworks: false, // This is for triggering hiding fireworks
  })

  const onLogin = () => {
    router.replace('/login')
  }

  const mobileLayout = (
    <Stack alignItems="center">
      <Navbar mobile={isTabletOrMobile} />
      <CallToAction textColor={textColor} highlightColor={theme.textColor} mobile={true} />
      <Hero desktop={false} />
      <div style={{ padding: "0.5rem" }}></div>
      <SignUp signupState={signupState} setSignupState={setSignupState} claimButtonStyle={claimButtonStyle} />

      <Typography variant="subtitle2" style={{ color: 'white' }}> Already have an account? Login <Link style={{ color: 'white' }} href="/login">here</Link>.</Typography>
    </Stack>
  )

  const desktopLayout = (
    <Stack style={{ marginTop: "0rem" }} direction="row" spacing={4} alignItems="start" justifyContent="start">
      <Hero desktop={true} />
      <Stack style={{ marginTop: "2rem" }} spacing={3}>
        <Navbar mobile={isTabletOrMobile} />
        <CallToAction textColor={textColor} highlightColor={theme.textColor} textAlign="start" fontSize={isReallyLarge ? "3rem" : "2.5rem"} />
        <SignUp signupState={signupState} setSignupState={setSignupState} desktop={!isTabletOrMobile} claimButtonStyle={claimButtonStyle} />
        <Typography style={{ color: 'white' }}> Already have an account? Login <Link style={{ color: 'white' }} href="/login">here</Link>.</Typography>
      </Stack>
    </Stack>
  )


  return (
    <>
      <Head>
        <title>Alcove: Sign Up</title>
        <meta name="description" content="Your link-in-bio to share everything you love." />
        <meta property="og:title" content="Alcove: Share what you love" />
        <meta
          property="og:description"
          content="Your link-in-bio to share everything you love."
        />
        <meta
          property="og:image"
          content="/social-share.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <PageTransition>
          <Stack alignItems="center" style={{ paddingBottom: '3rem' }}>
            {minQueriesComplete && (isTabletOrMobile ? mobileLayout : desktopLayout)}
          </Stack>
        </PageTransition>
      </main>
    </>
  )
}
