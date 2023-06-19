import React from 'react'
import { Button, Typography, Stack } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function ThemingButton({onClick}) {
    return (

        <Button onClick={onClick} variant="contained" style={{  width: "100%", maxWidth: "12rem", textTransform: 'none', color: "black", backgroundColor: "white", margin: 'auto', marginTop: "1rem" }}>
            <Stack direction="row" spacing={1}>
                <span>
                Design
                </span>
               
                <PaletteIcon />
            </Stack>
        </Button>
    )

}
  