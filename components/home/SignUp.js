import React, { useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

export default function SignUp({claimButtonStyle, desktop=false}) {
    const [handle, setHandle] = useState("")
    const [showHandleError, setShowHandleError] = useState(false)
    const [showEmailInput, setShowEmailInput] = useState(false)
    const buttonStyle = desktop ? {} : { marginTop: '1rem' }
    
    const validHandle = () => {
        if(handle.length < 5 ) {
            return false
        }
        return true
    }

    const processHandle = ( event ) => {
        const { value } = event.target
        setHandle(value.replace(/[^\w.-]+/g, '').toLowerCase());
    }

    const onClaimHandle = () => {
        if(!validHandle()) {
            setShowHandleError(true)
            setShowEmailInput(false)
            return
        } else {
            setShowHandleError(false)
            setShowEmailInput(true)
            return
        }
    }
    
    return (
        <Stack direction={desktop ? "row" : "column"} spacing={desktop ? 1 : 0} alignItems="center">
            <TextField
                InputProps={{
                    startAdornment: <InputAdornment sx={{ fontSize: '1rem', marginRight: '0.12rem' }} position="start">alcove.place/</InputAdornment>,
                }}
                value={handle}
                disabled={showEmailInput}
                onChange={processHandle}
                id="filled-basic"
                style={{ backgroundColor: 'white', borderRadius: '15px', }}
                label="" variant="outlined"
                placeholder="yourname"
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: 'none',
                    }
                }} />
            <Button onClick={onClaimHandle} sx={claimButtonStyle} style={buttonStyle} variant="contained">Claim Your Alcove</Button>
        </Stack>
    )
}
