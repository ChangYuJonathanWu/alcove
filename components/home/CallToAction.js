import React from 'react'
import { Typography, Stack } from '@mui/material'

export default function CallToAction({ textColor, highlightColor, fontSize = "2rem", textAlign = "center", mobile = false }) {
    const textVariant = "h1"
    const regularStyle = { fontSize, color: textColor, textAlign }
    const highlightStyle = { fontSize, color: highlightColor ?? textColor, textAlign }
    const subStyle = { color: textColor, textAlign }
    return (
        <Stack spacing={1} style={{marginTop: '18%'}}>
            <Typography variant={textVariant} style={regularStyle} >Showcase your hobbies and all the things you love</Typography>
            <Typography style={{ color: textColor, fontSize: '1rem', textAlign, padding: '0.5rem 1.5rem 0rem 1.5rem' }} variant="subtitle2">The simple link in bio for your Instagram and more</Typography>
            <Typography variant="body2" style={subStyle} >{"Join the early-access list and claim your Alcove."}</Typography>
        </Stack>


    )
}
