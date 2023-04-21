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

export default function Home() {
  const claimButtonStyle = {backgroundColor: '#643A6B', textTransform: 'none', borderRadius: '15px', padding: '1rem 2rem'}
  const backgroundColor = '#B0A4A4'
  const logoColor = "#5F264A"
  const textColor ="#643A6B"
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
        
          <ImageShadow  width={220} style={{marginBottom: "2rem"}} shadowHover={true} src={"/emily.png"} />

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
