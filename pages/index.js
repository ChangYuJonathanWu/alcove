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

import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';

const amita = Amita({ weight: ['400', '700'], subsets: ['latin'] })

const theme1 = {
  bgColor:'#FFF9DE',
  logoColor: "#FF6969",
  textColor: "#FF6969",
  buttonColor: '#FF6969',
  buttonTextColor: 'white'
}

const theme2 = {
  bgColor:'#FDE2F3',
  logoColor: "#2A2F4F",
  textColor: "#2A2F4F",
  buttonColor: '#917FB3',
  buttonTextColor: 'white'
}

const theme3 = {
  bgColor:'#7C9070',
  logoColor: "#FEE8B0",
  textColor: "#FEE8B0",
  buttonColor: '#F97B22',
  buttonTextColor: 'white'
}

const theme4 = {
  bgColor:'#7C9070',
  logoColor: "white",
  textColor: "white",
  buttonColor: '#F97B22',
  buttonTextColor: 'white'
}

const theme5 = {
  bgColor:'#E86A33',
  logoColor: "#F2E3DB",
  textColor: "#F2E3DB",
  buttonColor: '#41644A',
  buttonTextColor: 'white'
}

export default function Home() {
  const theme = theme4;
  const claimButtonStyle = {backgroundColor: theme.buttonColor, color: theme.buttonTextColor, textTransform: 'none', borderRadius: '15px', padding: '1rem 2rem'}
  const backgroundColor = theme.bgColor
  const logoColor = theme.logoColor
  const textColor = theme.textColor

  
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
            <FoundationIcon style={{color: logoColor}}/>
            <Typography className={amita.className} style={{fontWeight: 700, color: logoColor}} variant="h1">alcove</Typography>
          </Stack>
          <Typography variant="h1" style={{color: textColor, textAlign:"center", marginBottom: "1rem"}}>Share everything you love - <br/> all in one place.</Typography>
  
          <ImageShadow shadowBlur={25} width={220} style={{marginBottom: "2rem",  transform: "perspective(400px) rotateY(-3deg) rotateX(5deg)"}} shadowHover={true} src={"/emily.png"} />
          <TextField 
                    InputProps={{
                      startAdornment: <InputAdornment sx={{ fontSize: '1rem', marginRight:'0.12rem'}} position="start">alcove.place/</InputAdornment>,
                    }}
          id="filled-basic" 
          style={{ backgroundColor: 'white', borderRadius: '15px',}}
          label="" variant="outlined"
          placeholder="yourname"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: 'none',
            }
          }} />
          <Button sx={claimButtonStyle} style={{marginTop: '1rem'}}variant="contained">Claim Your Alcove</Button>
        </Stack>
      </main>
    </>
  )
}
