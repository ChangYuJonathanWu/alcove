import React, { useState } from 'react'
import { Button, Collapse, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Fireworks } from '@fireworks-js/react'
import { HOME_THEME } from '@/utils/themeConfig';


export default function SignUpMobile({ signupState, setSignupState }) {
    const { validationInProgress, completed, handle, email, showValidationError, validationErrorText, showEmailInput, hideFireworks } = signupState
    const INVALID_HANDLE = "Sorry, this handle isn't available."
    const MISSING_HANDLE = "Please enter a handle."
    const TAKEN_HANDLE = "Sorry, this handle is already taken."
    const INVALID_EMAIL = "Please enter a valid email."
    const TAKEN_EMAIL = "This email is already registered."

    const BORDER_RADIUS = '0.5rem'

    const theme = HOME_THEME
    const claimButtonStyle = { backgroundColor: theme.buttonColor, color: theme.buttonTextColor, width: "100%", textTransform: 'none', borderRadius: BORDER_RADIUS, padding: "0.65rem" }

    const handleEnterHandle = (event) => {
        if (event.key === 'Enter') {
            onClaimHandle()
        }
    }

    const handleEnterEmail = (event) => {
        if (event.key === 'Enter') {
            onEmailSubmit()
        }
    }

    const startValidationInProgress = () => {
        setSignupState({
            ...signupState,
            validationInProgress: true
        })
    }

    const finishValidationInProgress = () => {
        setSignupState({
            ...signupState,
            validationInProgress: false
        })
    }

    const validHandle = () => {
        return true
    }

    const validEmail = () => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const processHandle = (event) => {
        const { value } = event.target
        setSignupState({
            ...signupState,
            handle: value.replace(/[^\w.-]+/g, '').toLowerCase().substring(0, 20)
        })
    }

    const processEmail = (event) => {
        const { value } = event.target
        setSignupState({
            ...signupState,
            email: value.substring(0, 50)
        })
    }

    const onClaimHandle = async () => {
        if (handle.length === 0) {
            setSignupState({
                ...signupState,
                validationErrorText: MISSING_HANDLE,
                showValidationError: true,
                showEmailInput: false
            })
            return
        }
        if (!validHandle()) {
            setSignupState({
                ...signupState,
                validationErrorText: TAKEN_HANDLE,
                showValidationError: true,
                showEmailInput: false,
            })
            return
        }
        startValidationInProgress()
        const body = { handle }
        const result = await fetch('/api/checkHandle', { method: "POST", body: JSON.stringify(body) })
        const resultBody = await result.json()
        const { available } = resultBody
        if (available) {
            setSignupState({
                ...signupState,
                showValidationError: false,
                showEmailInput: true,
                validationInProgress: false
            })
        } else {
            setSignupState({
                ...signupState,
                validationErrorText: TAKEN_HANDLE,
                showValidationError: true,
                showEmailInput: false,
                validationInProgress: false
            })
        }
        return
    }

    const onEmailSubmit = async () => {
        if (!validEmail()) {
            setSignupState({
                ...signupState,
                showValidationError: true,
                validationErrorText: INVALID_EMAIL
            })
            return
        }
        startValidationInProgress()
        const result = await fetch('/api/signup',
            {
                method: "POST",
                body: JSON.stringify({
                    handle,
                    email
                })
            })

        const resultBody = await result.json()
        const { success, errors } = resultBody;
        if (success) {
            setSignupState({
                ...signupState,
                showValidationError: false,
                completed: true,
                validationInProgress: false
            })
            setTimeout(() => setSignupState({ ...signupState, hideFireworks: true, completed: true, showValidationError: false, }), 6000)
        } else {
            if (errors.includes("HANDLE_TAKEN")) {
                setSignupState({
                    ...signupState,
                    validationErrorText: TAKEN_HANDLE,
                    showValidationError: true,
                    showEmailInput: false,
                    validationInProgress: false
                })
                return
            } if (errors.includes("EMAIL_TAKEN")) {
                setSignupState({
                    ...signupState,
                    showValidationError: true,
                    validationErrorText: TAKEN_EMAIL,
                    validationInProgress: false
                })
                return
            }
        }


    }

    const calculateStackAlignment = () => {
        if (showEmailInput) {
            return "end"
        }
        return "start"
    }


    const handleValidationErrorText = <Typography style={{ marginTop: '0.5rem', textAlign: "center" }} variant="subtitle2">{validationErrorText}</Typography>
    const ctaButtonText = showEmailInput ? "Get Early Access" : "Claim Your Alcove"

    const TextFieldDefaultInputProps =
    {
        borderRadius: BORDER_RADIUS,
        borderWidth: '1px',
        height: '3rem',
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
        }
    }

    const TextFieldDefaultStyling = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: theme.primary,
                borderWidth: '2px',
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.primary,
                borderWidth: '2px',
            },
            '&.Mui-disabled fieldset': {
                borderColor: theme.primary + "50",
                backgroundColor: theme.primary + "20",
            },
        }
    }

    const CheckmarkAdornment = <InputAdornment position="end" ><CheckCircleIcon style={{ color: theme.primary }} /></InputAdornment>
    return (
        <Stack direction={"column"} spacing={1.5} style={{ margin: "1.5rem 1rem 3rem 1rem", width: "100%" }} >

            <TextField
                InputProps={{
                    sx: TextFieldDefaultInputProps,
                    startAdornment: <InputAdornment sx={{ marginRight: '0.12rem', marginTop: showEmailInput ? '0.1rem' : 0 }} position="start">{showEmailInput ? "@" : "alcove.place/"}</InputAdornment>,
                    endAdornment: showEmailInput ?  CheckmarkAdornment : <div></div>
                }}
                value={handle}
                disabled={showEmailInput}
                onChange={processHandle}
                id="handle-input"
                style={{ width: "100%" }}
                label="" variant="outlined"
                placeholder="yourname"
                onKeyPress={handleEnterHandle}
                sx={TextFieldDefaultStyling}
            />
            <Collapse in={showEmailInput} orientation={"vertical"} style={{ width: "100%" }}>
                <TextField
                    InputProps={{
                        sx: TextFieldDefaultInputProps,
                        endAdornment: completed ? CheckmarkAdornment : <div></div>
                    }}
                    value={email}
                    onChange={processEmail}
                    inputProps={{
                        autoCapitalize: 'none',
                    }}
                    style={{ width: "100%" }}
                    sx={TextFieldDefaultStyling}
                    id="email-input"
                    label="" variant="outlined"
                    placeholder="Enter your email"
                    disabled={validationInProgress || completed}
                    onKeyDown={handleEnterEmail} />
            </Collapse>

            {showValidationError && handleValidationErrorText}
            {!completed && <Button id="signup-submit-button" disabled={validationInProgress} onClick={showEmailInput ? onEmailSubmit : onClaimHandle} sx={claimButtonStyle} variant="contained">{ctaButtonText}</Button>}
            {completed &&
                <span style={{ textAlign: "center", marginTop: '1.5rem' }}>
                    <Typography variant="subtitle2" style={{ color: theme.primary }}>{`You've claimed your Alcove handle!`}</Typography>
                    <Typography variant="subtitle2"> {`You'll get an email once it's your turn to create your Alcove.`}</Typography>
                </span>}

        </Stack>

    )
}
