import React from 'react'
import { Button, Typography, Stack } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { DEFAULT_PAPER_COLOR, ITEM_FONT_SIZE } from '@/utils/themeConfig';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.7)'

export default function ThemingButton({onClick}) {
    return (

        <Button onClick={onClick} variant="contained" style={{  borderRadius: '1rem', width: "100%", maxWidth: "12rem", textTransform: 'none', color: "black", backgroundColor: DEFAULT_PAPER_COLOR, margin: 'auto', marginTop: "1rem" }}>
            <Stack direction="row" spacing={1}>
                <span>
                Design
                </span>
               
                <PaletteIcon />
            </Stack>
        </Button>
    )

}
  