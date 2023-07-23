import React from 'react'
import { Button, Typography, Stack } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { DEFAULT_PAPER_COLOR } from '@/utils/themeConfig';


export default function ViewAsPublicButton({link}) {
    return (

        <Button target='_blank' href={link} variant="contained" style={{ borderRadius: '1rem', width: "100%", maxWidth: "12rem", textTransform: 'none', color: "black", backgroundColor: DEFAULT_PAPER_COLOR, margin: 'auto', marginTop: "1rem" }}>
            <Stack direction="row" spacing={1}>
                <span>
                View as Public
                </span>
               
                <PublicIcon />
            </Stack>
        </Button>
    )

}
  