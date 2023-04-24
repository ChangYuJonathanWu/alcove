import React, { useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

export default function SignUp({ claimButtonStyle, desktop = false }) {
    const [handle, setHandle] = useState("")
    const [email, setEmail] = useState("")
    const [showValidationError, setShowValidationError] = useState(false)
    const [validationErrorText, setShowValidationErrorText] = useState("")
    const [showEmailInput, setShowEmailInput] = useState(false)
    const buttonStyle = desktop ? {} : { marginTop: '1rem' }

    const INVALID_HANDLE = "Sorry, this handle isn't available."
    const MISSING_HANDLE = "Please enter a handle."
    const TAKEN_HANDLE = "Sorry, this handle is already taken."
    const INVALID_EMAIL = "Please enter a valid email."
    const validHandle = () => {
        if (handle.length < 5) {
            return false
        }
        return true
    }

    const validEmail = () => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const processHandle = (event) => {
        const { value } = event.target
        setHandle(value.replace(/[^\w.-]+/g, '').toLowerCase());
    }

    const processEmail = (event) => {
        const { value } = event.target
        setEmail(value)
    }

    const onClaimHandle = () => {
        if (handle.length === 0) {
            setShowValidationErrorText(MISSING_HANDLE)
            setShowValidationError(true)
            setShowEmailInput(false)
            return
        }
        if (!validHandle()) {
            setShowValidationErrorText(TAKEN_HANDLE)
            setShowValidationError(true)
            setShowEmailInput(false)
            return
        }
        setShowValidationError(false)
        setShowEmailInput(true)
        return
    }

    const onEmailSubmit = () => {
        if (!validEmail()) {
            setShowValidationErrorText(INVALID_EMAIL)
            setShowValidationError(true)
        }
    }

    const handleValidationErrorText = <Typography style={{ marginTop: '0.5rem', color: 'white' }} variant="subtitle2">{validationErrorText}</Typography>

    const ctaButtonText = showEmailInput ? "Complete" : "Claim Your Alcove"
    return (
        <Stack direction={desktop ? "row" : "column"} spacing={desktop ? 1 : 0} alignItems="center">
            <TextField
                InputProps={{
                    startAdornment: <InputAdornment sx={{ fontSize: '1rem', marginRight: '0.12rem' }} position="start">alcove.place/</InputAdornment>,
                }}
                value={handle}
                disabled={showEmailInput}
                onChange={processHandle}
                id="handle-input"
                style={{ backgroundColor: 'white', borderRadius: '15px', }}
                label="" variant="outlined"
                placeholder="yourname"
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: 'none',
                    }
                }} />
            {showEmailInput &&
                <TextField
                    value={email}
                    onChange={processEmail}
                    id="email-input"
                    style={{ backgroundColor: 'white', borderRadius: '15px', marginTop: "1rem", width: "100%" }}
                    label="" variant="outlined"
                    placeholder="Enter your email"
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: 'none',
                        }
                    }} />}
            {showValidationError && handleValidationErrorText}
            <Button onClick={showEmailInput? onEmailSubmit : onClaimHandle} sx={claimButtonStyle} style={buttonStyle} variant="contained">{ctaButtonText}</Button>
        </Stack>
    )
}
