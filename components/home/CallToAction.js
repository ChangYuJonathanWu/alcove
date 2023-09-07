import React from 'react'
import { Typography, Stack } from '@mui/material'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
})

const desktopFontSize = '4.5rem'


export default function CallToAction({ mobile = false }) {
    const textVariant = "h1"
    const headlineStyle = { fontSize: mobile ? '2rem' : desktopFontSize, lineHeight: mobile ? '2.3rem' : desktopFontSize, textAlign: 'center', fontWeight: mobile ? 500 : 500 }
    const sub1Style = { fontSize: '1rem', textAlign: 'center', lineHeight: '1.25rem', fontWeight: 500, padding: '0rem 1.5rem 0rem 1.5rem' }
    const sub2Style = { textAlign: 'center', fontSize: '0.9rem' }
    return (
        <Stack data-cy="cta" className={dmSans.className} spacing={3} style={{ marginTop: mobile ? '18%' : '6%', maxWidth: mobile ? "400px" : '1000px' }}>
            <span variant={textVariant} style={headlineStyle}>Your corner of the internet to share everything you love</span>
            <span style={sub1Style} variant="subtitle2"> The personal link-in-bio for your Instagram and more</span>
            <span variant="body2" style={sub2Style} >{"Join the early-access list and claim your Alcove."}</span>
        </Stack>


    )
}
