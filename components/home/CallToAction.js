import React from 'react'
import { Typography, Stack } from '@mui/material'
import { DM_Sans } from 'next/font/google'
import useBetterMediaQuery from '@/utils/useBetterMediaQuery'

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
})



const mobileHeadline = "Your highlight reel."
const desktopHeadline = "Your highlight reel"

const mobileSub1 = "From the songs you love to your favorite Instagram posts. Share it all with a simple link-in-bio for Instagram, TikTok and more."
const mobileSub2 = ""

const desktopSub1 = mobileSub1 + " " + mobileSub2


export default function CallToAction({ mobile = false }) {
    const isMini = useBetterMediaQuery('(max-width: 375px)')
    const isSmall = useBetterMediaQuery('(max-width: 675px)')
    const isMedium = useBetterMediaQuery('(max-width: 1050px)')
    const isLarge = useBetterMediaQuery('(max-width: 1300px)')

    const mobileHeadingFontSize = isMini ? '3rem' : '3.5rem'
    const mobileLineHeight = isMini ? '3rem' : '3.3rem'

    const desktopHeadingFontSize = isSmall ? ' 4rem' : isLarge ? '4.5rem' : '5.5rem'

    const sub1FontSize = isLarge ? '1rem' : '1.2rem'

    const textVariant = "h1"
    const headlineStyle = { letterSpacing: '0', fontSize: mobile ? mobileHeadingFontSize : desktopHeadingFontSize, lineHeight: mobile ? mobileLineHeight : desktopHeadingFontSize, textAlign: mobile ? 'left' : 'center', fontWeight: mobile ? 600 : 600 }
    const sub1Style = { fontSize: sub1FontSize, textAlign: mobile ? 'left' : 'center', lineHeight: '1.25rem', fontWeight: 500 }
    const sub2Style = { textAlign: mobile ? 'left' : 'center', fontSize: isMini ? '0.8rem' : '0.9rem' }
    return (
        <Stack data-cy="cta" className={dmSans.className} spacing={3} style={{ marginTop: mobile ? '18%' : '6%', maxWidth: mobile ? "400px" : '1200px' }}>
            <span variant={textVariant} style={headlineStyle}>{mobile ? mobileHeadline : desktopHeadline}</span>
            <div style={sub1Style}>
                <span variant="subtitle2"> {mobile ? mobileSub1 : desktopSub1}</span>
                {mobile && <span variant="subtitle2"> <br />{mobileSub2}</span>}
            </div>

            <span variant="body2" style={sub2Style} >{"Join the early-access list and claim your Alcove."}</span>
        </Stack>


    )
}
