import React from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

export default function SignUp({claimButtonStyle, desktop=false}) {
    const buttonStyle = desktop ? {} : { marginTop: '1rem' }
    
    return (
        <Stack direction={desktop ? "row" : "column"} spacing={desktop ? 1 : 0} alignItems="center">
            <TextField
                InputProps={{
                    startAdornment: <InputAdornment sx={{ fontSize: '1rem', marginRight: '0.12rem' }} position="start">alcove.place/</InputAdornment>,
                }}
                id="filled-basic"
                style={{ backgroundColor: 'white', borderRadius: '15px', }}
                label="" variant="outlined"
                placeholder="yourname"
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: 'none',
                    }
                }} />
            <Button sx={claimButtonStyle} style={buttonStyle} variant="contained">Claim Your Alcove</Button>
        </Stack>
    )
}
