import React, { useState } from 'react'
import { Button, Collapse, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import { Fireworks } from '@fireworks-js/react'


export default function SignUp({ signupState, setSignupState, claimButtonStyle, desktop = false }) {
    const { validationInProgress, completed, handle, email, showValidationError, validationErrorText, showEmailInput, hideFireworks } = signupState
    const buttonStyle = desktop ? {} : { width: "100%", marginTop: '1rem', marginBottom: '5rem' }
    const INVALID_HANDLE = "Sorry, this handle isn't available."
    const MISSING_HANDLE = "Please enter a handle."
    const TAKEN_HANDLE = "Sorry, this handle is already taken."
    const INVALID_EMAIL = "Please enter a valid email."
    const TAKEN_EMAIL = "This email is already registered."

    const startValidationInProgress = () => {
        setSignupState({
            ...signupState,
            validationInProgress: true
        })
    }

    const finishValidationInProgress = () => {
        setSignupState( {
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
        const { success, errors} = resultBody;
        if(success) {
            setSignupState({
                ...signupState,
                showValidationError: false,
                completed: true,
                validationInProgress: false
            })
            setTimeout(() => setSignupState({ ...signupState, hideFireworks: true, completed: true, showValidationError: false, }), 6000)
        } else {
            if(errors.includes("HANDLE_TAKEN")) {
                setSignupState({
                    ...signupState,
                    validationErrorText: TAKEN_HANDLE,
                    showValidationError: true,
                    showEmailInput: false,
                    validationInProgress: false
                })
                return
            } if(errors.includes("EMAIL_TAKEN")) {
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
        if (!desktop) {
            return "center"
        }
        if (showEmailInput) {
            return "end"
        }
        return "start"
    }

    const stackAlignment = showEmailInput && desktop ? "end" : "start"

    const handleValidationErrorText = <Typography style={{ marginTop: '0.5rem', color: 'white' }} variant="subtitle2">{validationErrorText}</Typography>
    const collapseStyle = desktop ? {} : { width: "100%" }
    const ctaButtonText = showEmailInput ? "Get Early Access" : "Claim Your Alcove"

    if (completed) {
        return (
            <>
                <Fireworks
                    options={{
                        rocketsPoint: {
                            min: 0,
                            max: 100
                        },
                    }}
                    style={{
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        zIndex: 100
                    }}
                    className={`${hideFireworks ? 'firework-hidden' : 'firework-shown'}`}
                />
                <span style={{ textAlign: desktop ? "start" : "center", margin: "2rem" }}>
                    <Typography color="white" variant="body1">{`You've claimed your Alcove handle!`}</Typography>
                    <Typography color="white" variant="body1"> {`You'll get an email once it's your turn to create your Alcove.`}</Typography>
                </span>
            </>

        )
    }
    return (
        <Stack>

            <Stack direction={desktop ? "row" : "column"} spacing={desktop ? 1 : 0} alignItems={calculateStackAlignment()}>

                <Stack>
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
                    <Collapse in={showEmailInput} orientation={"vertical"} style={collapseStyle}>
                        <TextField
                            value={email}
                            onChange={processEmail}
                            inputProps={{
                                autoCapitalize: 'none',
                              }}
                            id="email-input"
                            style={{ backgroundColor: 'white', borderRadius: '15px', marginTop: "1rem", width: "100%" }}
                            label="" variant="outlined"
                            placeholder="Enter your email"
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: 'none',
                                }
                            }} />
                    </Collapse>

                </Stack>
                {!desktop && showValidationError && handleValidationErrorText}
                <Button disabled={validationInProgress} onClick={showEmailInput ? onEmailSubmit : onClaimHandle} sx={claimButtonStyle} style={buttonStyle} variant="contained">{ctaButtonText}</Button>
            </Stack>
            {desktop && showValidationError && handleValidationErrorText}
        </Stack>
    )
}
