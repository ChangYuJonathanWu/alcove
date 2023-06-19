import React from 'react'
import { Button, Typography, Stack } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function ViewAsPublicButton({link}) {
    return (

        <Button target='_blank' href={link} variant="contained" style={{ width: "100%", maxWidth: "12rem", textTransform: 'none', color: "black", backgroundColor: "white", margin: 'auto', marginTop: "1rem" }}>
            <Stack direction="row" spacing={1}>
                <span>
                View as Public
                </span>
               
                <PublicIcon />
            </Stack>
        </Button>
    )

}
  