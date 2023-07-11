import React from 'react'
import { Typography, Stack } from '@mui/material'

export default function CallToAction({ textColor, highlightColor, fontSize = "2rem", textAlign = "center", mobile = false }) {
    const textVariant = "h1"
    const regularStyle = { fontSize, color: textColor, textAlign }
    const highlightStyle = { fontSize, color: highlightColor ?? textColor, textAlign, marginBottom: "1rem" }
    const subStyle = {color: textColor, textAlign, marginBottom: '1rem'}
    return (
        <Stack>
            <span id="call-to-action" style={{textAlign: mobile ? "center" : "left", marginBottom: '2rem' }}>
                <Typography display="inline" variant={textVariant} style={regularStyle} >Showcase your hobbies</Typography>
                <Typography variant={textVariant} style={regularStyle}>and all the things you love</Typography>
                <Typography style={{color: textColor, fontSize: mobile ? '1rem' : '1.2rem'}} variant="subtitle1">The simple link in bio for your Instagram and more</Typography>
            </span>
            <Typography variant="body2" style={subStyle} >{"Join the early-access list and claim your Alcove."}</Typography>
        </Stack>


    )
}
