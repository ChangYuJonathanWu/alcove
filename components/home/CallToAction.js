import React from 'react'
import { Typography, Stack } from '@mui/material'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
})

const desktopFontSize = '4.5rem'

const mobileHeadline = "Your corner of the internet."
const desktopHeadline = "Your corner of the internet to share everything you love"

const mobileSub1 = "The personal link-in-bio for your Instagram, TikTok and more to share everything you love and are."
const desktopSub1 = "The personal link-in-bio for your Instagram, TikTok and more"


export default function CallToAction({ mobile = false }) {
    const textVariant = "h1"
    const headlineStyle = { letterSpacing: '0', fontSize: mobile ? '3.5rem' : desktopFontSize, lineHeight: mobile ? '3.3rem' : desktopFontSize, textAlign: mobile ? 'left' : 'center', fontWeight: mobile ? 600 : 500 }
    const sub1Style = { fontSize: '1rem', textAlign: mobile? 'left' : 'center', lineHeight: '1.25rem', fontWeight: 500  }
    const sub2Style = { textAlign: mobile ? 'left' : 'center', fontSize: '0.9rem' }
    return (
        <Stack data-cy="cta" className={dmSans.className} spacing={3} style={{ marginTop: mobile ? '18%' : '6%', maxWidth: mobile ? "400px" : '1000px' }}>
            <span variant={textVariant} style={headlineStyle}>{ mobile ? mobileHeadline : desktopHeadline}</span>
            <span style={sub1Style} variant="subtitle2"> { mobile ? mobileSub1 : desktopSub1}</span>
            <span variant="body2" style={sub2Style} >{"Join the early-access list and claim your Alcove."}</span>
        </Stack>


    )
}
