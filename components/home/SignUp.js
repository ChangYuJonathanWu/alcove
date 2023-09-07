import React, { useState } from 'react'
import { Button, Collapse, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Fireworks } from '@fireworks-js/react'
import { HOME_THEME, TextFieldDefaultInputProps, TextFieldDefaultStyling } from '@/utils/themeConfig';

import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
})


export default function SignUpMobile({ signupState, setSignupState, mobile }) {
    const { validationInProgress, completed, handle, email, showValidationError, validationErrorText, showEmailInput, hideFireworks } = signupState
    const INVALID_HANDLE = "Sorry, this handle isn't available."
    const MISSING_HANDLE = "Please enter a handle."
    const TAKEN_HANDLE = "Sorry, this handle is already taken."
    const INVALID_EMAIL = "Please enter a valid email."
    const TAKEN_EMAIL = "This email is already registered."

    const BORDER_RADIUS = '1rem'

    const theme = HOME_THEME
    const claimButtonStyle = {
        backgroundColor: theme.buttonColor,
        fontSize: '0.9rem',
        color: theme.buttonTextColor,
        width: mobile ? "100%" : '10rem',
        textTransform: 'none',
        borderRadius: BORDER_RADIUS,
        padding: "0.75rem",
        '&:hover': {
            // Darken the hover color
            backgroundColor: theme.buttonFocusColor,
        }

    }

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


    const handleValidationErrorText = <span className={dmSans.className} style={{ textAlign: "center" }} variant="subtitle2">{validationErrorText}</span>
    const ctaButtonText = showEmailInput ? "Get Early Access" : "Claim Your Alcove"

    const CheckmarkAdornment = <InputAdornment position="end" ><CheckCircleIcon style={{ color: theme.primary }} /></InputAdornment>
    if (!mobile) {
        return (
            <Stack alignItems="center" justifyContent="center" style={{ marginBottom: '1.5rem' }}>
                <Stack direction={"row"} alignItems="center" justifyContent="center" spacing={1} style={{ margin: "1.5rem 1rem 0.5rem 1rem", width: "100%" }} >
                    <TextField
                        InputProps={{
                            sx: TextFieldDefaultInputProps,
                            startAdornment: <InputAdornment sx={{ marginRight: '0.12rem', marginTop: showEmailInput ? '0.1rem' : 0 }} position="start">{showEmailInput ? "@" : "alcove.place/"}</InputAdornment>,
                            endAdornment: showEmailInput ? CheckmarkAdornment : <div></div>
                        }}
                        value={handle}
                        disabled={showEmailInput}
                        onChange={processHandle}
                        id="handle-input"
                        style={{ maxWidth: showEmailInput ? `calc(${handle.length}ch + 75px)` : '280px' }}
                        label="" variant="outlined"
                        placeholder="yourname"
                        onKeyPress={handleEnterHandle}
                        sx={TextFieldDefaultStyling}
                        data-cy="signup-handle-input"
                    />
                    <Collapse in={showEmailInput} orientation={"horizontal"}>
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
                            style={{ minWidth: "280px" }}
                            sx={TextFieldDefaultStyling}
                            id="email-input"
                            label="" variant="outlined"
                            placeholder="Enter your email"
                            disabled={validationInProgress || completed}
                            onKeyDown={handleEnterEmail} />
                    </Collapse>


                    {!completed && <Button className={dmSans.className} id="signup-submit-button" disabled={validationInProgress} onClick={showEmailInput ? onEmailSubmit : onClaimHandle} sx={claimButtonStyle} variant="contained"><span className={dmSans.className}>{ctaButtonText}</span></Button>}

                </Stack>
                {showValidationError && handleValidationErrorText}
                {completed &&
                    <>
                        <span className={dmSans.className} style={{ color: theme.primary }}>{`Congrats, you've claimed your Alcove!`}</span>
                        <span className={dmSans.className} > {`You'll get an email once it's your turn to create your Alcove.`}</span>
                    </>
                }
            </Stack>
        )
    }
    return (
        <Stack direction={"column"} alignItems="center" spacing={1} style={{ margin: "1.5rem 1rem 3rem 1rem", width: "100%", maxWidth: '400px' }} >

            <TextField
                InputProps={{
                    sx: TextFieldDefaultInputProps,
                    startAdornment: <InputAdornment sx={{ marginRight: '0.12rem', marginTop: showEmailInput ? '0.1rem' : 0 }} position="start">{showEmailInput ? "@" : "alcove.place/"}</InputAdornment>,
                    endAdornment: showEmailInput ? CheckmarkAdornment : <div></div>
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
                data-cy="signup-handle-input"
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
            {!completed && <Button  id="signup-submit-button" disabled={validationInProgress} onClick={showEmailInput ? onEmailSubmit : onClaimHandle} sx={claimButtonStyle} variant="contained"><span className={dmSans.className}>{ctaButtonText}</span></Button>}
            {completed &&
                <>
                    <span className={dmSans.className} style={{ color: theme.primary, textAlign: 'center',marginTop: '1rem' }}>{`Congrats, you've claimed your Alcove!`}</span>
                    <span className={dmSans.className} style={{textAlign: 'center'}}> {`You'll get an email once it's your turn to create your Alcove.`}</span>
                </>}

        </Stack>

    )
}
