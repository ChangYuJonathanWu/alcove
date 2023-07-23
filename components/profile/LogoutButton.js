import React from 'react'

import { Button, Typography, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { DEFAULT_PAPER_COLOR } from '@/utils/themeConfig';
export default function LogoutButton({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" style={{borderRadius: '1rem', width: "100%", maxWidth: "12rem", textTransform: 'none', color: "black", backgroundColor: DEFAULT_PAPER_COLOR, margin: 'auto', marginTop: "1rem" }}>
    <Stack direction="row" spacing={1}>
        <span>
            Logout
        </span>
        <LogoutIcon />
    </Stack>
</Button>
  )
}
