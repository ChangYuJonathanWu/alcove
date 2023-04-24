import React from 'react'
import { Typography } from '@mui/material'

export default function CallToAction({ textColor, highlightColor, fontSize = "2rem", textAlign = "center" }) {
    const textVariant = "h1"
    const regularStyle = { fontSize, color: textColor, textAlign, marginBottom: "1rem" }
    const highlightStyle = { fontSize, color: highlightColor ?? textColor, textAlign, marginBottom: "1rem" }
    return (
        <span>
            <Typography display="inline" variant={textVariant} style={regularStyle} >Share </Typography>
            <Typography display="inline" variant={textVariant} style={highlightStyle}>everything </Typography>
            <Typography display="inline" variant={textVariant} style={regularStyle} >you love,</Typography> 
            <Typography variant={textVariant} style={regularStyle}>all from one place.</Typography>
        </span>

    )
}
