import React from 'react'
import { Button, Typography, Stack } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { DEFAULT_PAPER_COLOR, ITEM_FONT_SIZE } from '@/utils/themeConfig';

export default function RearrangeItemsButton({onClick}) {
    return (

        <Button data-cy="rearrange-items-button" onClick={onClick} variant="contained" style={{  borderRadius: '1rem', width: "100%", maxWidth: "12rem", textTransform: 'none', color: "black", backgroundColor: DEFAULT_PAPER_COLOR, margin: 'auto', marginTop: "1rem" }}>
            <Stack alignItems="center" direction="row">
                Change Order
                <SwapVertIcon />
            </Stack>
        </Button>
    )

}
  