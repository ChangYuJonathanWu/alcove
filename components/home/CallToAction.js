import React from 'react'
import { Typography, Stack } from '@mui/material'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
})


export default function CallToAction({ mobile = false }) {
    const textVariant = "h1"
    const headlineStyle = { fontSize: mobile ? '2rem' : '3.3rem', lineHeight: mobile? '2rem' : '3.3rem', textAlign: 'center', fontWeight: mobile ? 400 : 500 }
    const sub1Style = { fontSize: '1rem', textAlign: 'center', lineHeight: '1.25rem', fontWeight: 400, padding: '0rem 1.5rem 0rem 1.5rem' }
    const sub2Style = { textAlign: 'center', fontSize: '0.9rem' }
    return (
        <Stack className={dmSans.className} spacing={3} style={{ marginTop: mobile ? '18%' : '4rem', maxWidth: mobile ? "400px" : '700px' }}>
            <span variant={textVariant} style={headlineStyle}>Your corner of the internet to share everything you love</span>
            <span style={sub1Style} variant="subtitle2"> The simple link-in-bio for your Instagram and more</span>
            <span variant="body2" style={sub2Style} >{"Join the early-access list and claim your Alcove."}</span>
        </Stack>


    )
}
