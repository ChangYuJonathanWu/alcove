import React from 'react'
import { Typography, Stack } from '@mui/material'

export default function CallToAction({ textColor, highlightColor, fontSize = "2rem", textAlign = "center", mobile = false }) {
    const textVariant = "h1"
    const headlineStyle = { fontSize, color: textColor, textAlign, fontWeight: 400 }
    const sub1Style = { color: textColor, fontSize: '1rem', textAlign, lineHeight: '1.25rem', fontWeight: 400, padding: '0rem 1.5rem 0rem 1.5rem' }
    const sub2Style = { color: textColor, textAlign, fontSize: '0.8rem' }
    return (
        <Stack spacing={3} style={{ marginTop: '18%' }}>
            <Typography variant={textVariant} style={headlineStyle} >Showcase Your Hobbies and All the Things You Love</Typography>
            <Typography style={sub1Style} variant="subtitle2">Your corner of the internet in one link-in-bio for your Instagram and more</Typography>
            <Typography variant="body2" style={sub2Style} >{"Join the early-access list and claim your Alcove."}</Typography>
        </Stack>


    )
}
