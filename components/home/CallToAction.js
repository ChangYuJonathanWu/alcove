import React from 'react'
import { Typography, Stack } from '@mui/material'

export default function CallToAction({ textColor, highlightColor, fontSize = "2rem", textAlign = "center", mobile = false }) {
    const textVariant = "h1"
    const regularStyle = { fontSize, color: textColor, textAlign, marginBottom: "1rem" }
    const highlightStyle = { fontSize, color: highlightColor ?? textColor, textAlign, marginBottom: "1rem" }
    const subStyle = {color: textColor, textAlign, marginBottom: '1rem'}
    return (
        <Stack>
            <span style={{textAlign: mobile ? "center" : "left" }}>
                <Typography display="inline" variant={textVariant} style={regularStyle} >Showcase your hobbies</Typography>
                {/* <Typography display="inline" variant={textVariant} style={highlightStyle}>everything </Typography>
                <Typography display="inline" variant={textVariant} style={regularStyle} >you love,</Typography> */}
                <Typography variant={textVariant} style={regularStyle}>and all the things you love.</Typography>
            </span>
            <Typography variant="body2" style={subStyle} >{"Join the early-access list and claim your Alcove."}</Typography>
        </Stack>


    )
}
