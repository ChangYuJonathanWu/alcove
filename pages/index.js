import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import { Button, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Amita } from 'next/font/google';
import SignUp from '@/components/home/SignUp'
import CallToAction from '@/components/home/CallToAction'

import { useMediaQuery } from 'react-responsive'
import { MobileView } from 'react-device-detect';
import Hero from '@/components/home/Hero'

const amita = Amita({ weight: ['400', '700'], subsets: ['latin'] })

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
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })
  const isLarge = useMediaQuery({query: '(min-width: 1000px)'})

  const theme = theme4;
  const claimButtonStyle = { backgroundColor: theme.buttonColor, color: theme.buttonTextColor, maxWidth: "250px", textTransform: 'none', borderRadius: '15px', padding: '1rem 2rem' }
  const backgroundColor = theme.bgColor
  const logoColor = theme.logoColor
  const textColor = theme.textColor

  const mobileLayout = (
    <Stack alignItems="center">
      <CallToAction textColor={textColor} />
      <Hero/>
      <SignUp claimButtonStyle={claimButtonStyle} />
    </Stack>
  )

  const desktopLayout = (
    <Stack style={{marginTop: "5rem"}} direction="row" spacing={isLarge ? 10 : 6} alignItems="start" justifyContent="start">
      <Hero width={isLarge ? 300:250}/>
      <Stack style={{marginTop: "5rem"}} spacing={3}>
        <CallToAction textColor={textColor} textAlign="start" fontSize={isLarge ? "3.2rem" : "2.5rem"}/>
        <SignUp desktop={!isTabletOrMobile} claimButtonStyle={claimButtonStyle} />
      </Stack>
    </Stack>
  )


  return (
    <>
      <Head>
        <title>Alcove: Sign Up</title>
        <meta name="description" content="Share what you love with Alcove" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ backgroundColor, height: '100vh' }}>
        <Stack alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center" style={{ padding: "1rem" }}>
            <FoundationIcon style={{ color: logoColor }} />
            <Typography className={amita.className} style={{ fontWeight: 700, color: logoColor }} variant="h1">alcove</Typography>
          </Stack>
          {isTabletOrMobile ? mobileLayout : desktopLayout}
        </Stack>
      </main>
    </>
  )
}
