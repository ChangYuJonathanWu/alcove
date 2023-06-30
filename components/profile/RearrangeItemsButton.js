import React from 'react'
import { Button, Typography, Stack } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function RearrangeItemsButton({onClick}) {
    return (

        <Button data-cy="rearrange-items-button" onClick={onClick} variant="contained" style={{  width: "100%", maxWidth: "12rem", textTransform: 'none', color: "black", backgroundColor: "white", margin: 'auto', marginTop: "1rem" }}>
            <Stack direction="row">
                Change Order
                <SwapVertIcon />
            </Stack>
        </Button>
    )

}
  