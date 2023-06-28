import React from 'react'

import { Button, Typography, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
export default function LogoutButton({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" style={{ width: "100%", maxWidth: "12rem", textTransform: 'none', color: "black", backgroundColor: "white", margin: 'auto', marginTop: "1rem" }}>
    <Stack direction="row" spacing={1}>
        <span>
            Logout
        </span>
        <LogoutIcon />
    </Stack>
</Button>
  )
}
