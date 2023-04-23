import React from 'react'
import { Typography } from '@mui/material'

export default function CallToAction({textColor, fontSize="2rem", textAlign= "center"}) {
  return (
    <Typography variant="h1" style={{fontSize, color: textColor, textAlign, marginBottom: "1rem"}}>Share everything you love. <br/> All from one place.</Typography>
  )
}
