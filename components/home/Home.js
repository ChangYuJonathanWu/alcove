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

import React, { useState } from 'react'

const theme4 = {
  bgColor: '#7C9070',
  logoColor: "white",
  textColor: "white",
  buttonColor: '#F97B22',
  buttonTextColor: 'white'
}


export default function Home() {
  const isTabletOrMobile = useBetterMediaQuery('(max-width: 800px)')
  const isLarge = useBetterMediaQuery('(min-width: 1000px)')
  const isReallyLarge = useBetterMediaQuery('(min-width: 1200px)')

  const theme = theme4;
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
      <CallToAction textColor={textColor} highlightColor={theme.textColor} mobile={true} />
      <Hero desktop={true} />
      <div style={{ padding: "0.5rem" }}></div>
      <SignUp signupState={signupState} setSignupState={setSignupState} claimButtonStyle={claimButtonStyle} />
      {/* {!signupState.completed && <Link href="/login"><Button variant="outlined" style={{ color: 'white', borderColor: 'white' }}>Sign In</Button></Link>} */}
      <Typography variant="subtitle2" style={{color: 'white'}}> Already have an account? Login <Link style={{color: 'white'}} href="/login">here</Link>.</Typography>
    </Stack>
  )

  const desktopLayout = (
    <Stack style={{ marginTop: "4rem" }} direction="row" spacing={isLarge ? 10 : 6} alignItems="start" justifyContent="start">
      <Hero desktop={true} width={isReallyLarge ? 300 : isLarge ? 270 : 250} style={{ paddingBottom: "3rem" }} />
      <Stack style={{ marginTop: "5rem" }} spacing={3}>
        <CallToAction textColor={textColor} highlightColor={theme.textColor} textAlign="start" fontSize={isLarge ? "3.2rem" : "2.5rem"} />
        <SignUp signupState={signupState} setSignupState={setSignupState} desktop={!isTabletOrMobile} claimButtonStyle={claimButtonStyle} />
        <Typography style={{color: 'white'}}> Already have an account? Login <Link style={{color: 'white'}} href="/login">here</Link>.</Typography>
        {/* {!signupState.completed && <Stack alignItems="center" spacing={1}>
          <Divider style={{ borderColor: 'white', width: '100%', marginTop: '2rem', marginBottom: '1rem' }} />
          <Typography style={{ color: 'white' }} variant="body2">Already have an account?</Typography>
          <Link href="/login"><Button variant="outlined" style={{ textTransform: 'none', color: 'white', borderColor: 'white', maxWidth: '150px', margin: 'auto', marginTop: '1rem' }}>Login</Button></Link>
        </Stack>} */}

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

      <main style={{ backgroundColor, minHeight: '100vh', width: "100%" }}>
        <Navbar/>
        <Stack alignItems="center" style={{ paddingBottom: '3rem' }}>
          {isTabletOrMobile ? mobileLayout : desktopLayout}
        </Stack>
      </main>
    </>
  )
}
