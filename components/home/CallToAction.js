import React from 'react'
import { Typography, Stack } from '@mui/material'

export default function CallToAction({ mobile = false }) {
    const textVariant = "h1"
    const headlineStyle = { fontSize: mobile ? '2rem' : '3.5rem', textAlign: 'center', fontWeight: mobile ? 400 : 500 }
    const sub1Style = { fontSize: '1rem', textAlign: 'center', lineHeight: '1.25rem', fontWeight: 400, padding: '0rem 1.5rem 0rem 1.5rem' }
    const sub2Style = { textAlign: 'center', fontSize: '0.8rem' }
    return (
        <Stack spacing={3} style={{ marginTop: mobile ? '18%' : '6rem', maxWidth: mobile ? "400px" : '650px' }}>
            <Typography variant={textVariant} style={headlineStyle} >Showcase your hobbies and all the things you love</Typography>
            <Typography style={sub1Style} variant="subtitle2">Your corner of the internet in one link-in-bio for your Instagram and more</Typography>
            <Typography variant="body2" style={sub2Style} >{"Join the early-access list and claim your Alcove."}</Typography>
        </Stack>


    )
}
