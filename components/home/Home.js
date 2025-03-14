import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button, Divider, Stack, TextField, Typography } from '@mui/material'

import CallToAction from '@/components/home/CallToAction'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/home/Navbar'
import SignUp from './SignUp';

import { useRouter } from 'next/router';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition'
import useBetterMediaQuery from '@/utils/useBetterMediaQuery'
import { USE_GREEN_THEME } from '@/utils/themeConfig'
import DefaultHeader from '../DefaultHeader'


export default function Home() {
  const isDesktop = useBetterMediaQuery('(min-width: 610px)')
  const isMobile = useBetterMediaQuery('(max-width: 610px)')

  const minQueriesComplete = isDesktop || isMobile
  const mobile = !isDesktop

  const router = useRouter();

  const [signupState, setSignupState] = useState({
    handle: "",
    email: "",
    errors: [],
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
    <Stack>
      <Stack alignItems="center" justifyContent="center" style={{ padding: '1rem 2rem 0rem 2rem' }} >
        <Navbar mobile={true} />
        <CallToAction mobile={true} />
        <SignUp signupState={signupState} setSignupState={setSignupState} mobile={true} />
      </Stack>
      <Hero desktop={false} />
    </Stack>
  )

  const desktopLayout = (
    <Stack style={{ width: '100%', paddingBottom: '2rem' }} spacing={0}>
      <Stack justifyContent="center" style={{ padding: '2rem 2.3rem 3rem 2.3rem' }} >
        <Navbar mobile={false} />
        <Stack alignItems="center">
          <CallToAction mobile={mobile} />
          <SignUp signupState={signupState} setSignupState={setSignupState} mobile={false} />
        </Stack>
      </Stack>
      <Hero desktop={true} />
      <Navbar mobile={false} hideLogin sizeOverride={50} />
    </Stack>

  )

  const mainStyle = USE_GREEN_THEME ? { backgroundColor: '#7C9070', color: 'white' } : { color: 'black' }

  return (
    <>
      <DefaultHeader title="Alcove: Share what you love" />
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

      <main className={USE_GREEN_THEME ? "" : "background-home"} style={mainStyle}>

        <PageTransition>
          {minQueriesComplete && (mobile ? mobileLayout : desktopLayout)}
        </PageTransition>
      </main>
    </>
  )
}
