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
import SignUpMobile from './SignupMobile';

export default function Home() {
  const isTabletOrMobile = useBetterMediaQuery('(max-width: 930px)')
  const isLarge = useBetterMediaQuery('(min-width: 930px)')
  const isReallyLarge = useBetterMediaQuery('(min-width: 1200px)')

  const minQueriesComplete = isTabletOrMobile || isLarge || isReallyLarge

  const theme = HOME_THEME
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
    <Stack alignItems="center" style={{ padding: '1rem 2rem 1rem 2rem' }} >
      <Navbar mobile={isTabletOrMobile} />
      <CallToAction mobile={true} />
      <SignUpMobile signupState={signupState} setSignupState={setSignupState} mobile={true}/>
      <Hero desktop={false} />
    </Stack>
  )

  const desktopLayout = (
    <Stack alignItems="center" style={{ padding: '2rem 2.3rem 1rem 2.3rem' }} >
      <Navbar mobile={isTabletOrMobile} />
      <Stack alignItems="center">
        <CallToAction mobile={isTabletOrMobile} />
        <SignUpMobile signupState={signupState} setSignupState={setSignupState} mobile={false}/>
        <Hero desktop={false} />
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

      <main className={isTabletOrMobile ? 'background-home' : 'background-home-desktop'}>

        <PageTransition>
          {/* <div style={{position: 'absolute', zIndex: -1, backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.80) 0%, rgba(255,255,255,1) 100%) , url(/alcove-background.svg)', top: '-30%', left: '-50%', backgroundSize: '80px', height: '55%', width: "200%", backgroundRepeat: 'repeat', transform: 'rotate(-20deg)'}}></div> */}
          {minQueriesComplete && (isTabletOrMobile ? mobileLayout : desktopLayout)}

        </PageTransition>
      </main>
    </>
  )
}
