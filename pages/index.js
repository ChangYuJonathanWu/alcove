import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import { Button, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { amita } from '../components/fonts'

import SignUp from '@/components/home/SignUp'
import CallToAction from '@/components/home/CallToAction'

import useBetterMediaQuery from '@/utils/useBetterMediaQuery'
import Hero from '@/components/home/Hero'

import React, { useState } from 'react'

const theme1 = {
  bgColor: '#FFF9DE',
  logoColor: "#FF6969",
  textColor: "#FF6969",
  buttonColor: '#FF6969',
  buttonTextColor: 'white'
}

const theme2 = {
  bgColor: '#FDE2F3',
  logoColor: "#2A2F4F",
  textColor: "#2A2F4F",
  buttonColor: '#917FB3',
  buttonTextColor: 'white'
}

const theme3 = {
  bgColor: '#7C9070',
  logoColor: "#FEE8B0",
  textColor: "#FEE8B0",
  buttonColor: '#F97B22',
  buttonTextColor: 'white'
}

const theme4 = {
  bgColor: '#7C9070',
  logoColor: "white",
  textColor: "white",
  buttonColor: '#F97B22',
  buttonTextColor: 'white'
}

const theme5 = {
  bgColor: '#E86A33',
  logoColor: "#F2E3DB",
  textColor: "#F2E3DB",
  buttonColor: '#41644A',
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
  const mobileLayout = (
    <Stack alignItems="center">
      <CallToAction textColor={textColor} highlightColor={theme.textColor} mobile={true}/>
      <Hero desktop={true} />
      <div style={{ padding: "0.5rem" }}></div>
      <SignUp signupState={signupState} setSignupState={setSignupState} claimButtonStyle={claimButtonStyle} />
    </Stack>
  )

  const desktopLayout = (
    <Stack style={{ marginTop: "4rem" }} direction="row" spacing={isLarge ? 10 : 6} alignItems="start" justifyContent="start">
      <Hero desktop={true} width={isReallyLarge ? 300 : isLarge ? 270 : 250} style={{ paddingBottom: "3rem" }} />
      <Stack style={{ marginTop: "5rem" }} spacing={3}>
        <CallToAction textColor={textColor} highlightColor={theme.textColor} textAlign="start" fontSize={isLarge ? "3.2rem" : "2.5rem"} />
        <SignUp signupState={signupState} setSignupState={setSignupState} desktop={!isTabletOrMobile} claimButtonStyle={claimButtonStyle} />
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
        <Stack alignItems="center" style={{ paddingBottom: '3rem' }}>
          <Stack id="home-logo" direction="row" spacing={0.5} alignItems="center" style={{ padding: "1rem", marginTop: "0.5rem" }}>
            {/* <FoundationIcon style={{ color: theme.buttonColor }}/> */}
            <Image src="/favicon.svg" width="50" height="50" alt="Alcove logo"/>
            <h1 className={amita.className} style={{ fontWeight: 700, color: logoColor }} variant="h1">alcove</h1>
          </Stack>
          {isTabletOrMobile ? mobileLayout : desktopLayout}
        </Stack>
      </main>
    </>
  )
}
