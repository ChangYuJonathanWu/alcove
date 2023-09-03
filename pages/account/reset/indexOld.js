import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo'
import { Stack, TextField, Typography, Button, Link } from '@mui/material'
import Navbar from '@/components/home/Navbar.js'
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import { styled } from '@mui/material';
import * as Sentry from '@sentry/nextjs'


import React, { useState, useEffect } from 'react'
import { getAuth, confirmPasswordReset } from "firebase/auth";
import DefaultLoader from '@/components/DefaultLoader';
import PageTransition from '@/components/PageTransition'

import {
    SignupSchema,
    validPassword,
    validatePasswordContainsNumber,
    validatePasswordLength,
    validatePasswordLowerCase,
    validatePasswordUpperCase
} from '@/utils/authConfigs';
import { HOME_THEME } from '@/utils/themeConfig'
import { AlcoveTextField } from '@/components/custom/AlcoveComponents'

const theme = HOME_THEME

export default function ResetPassword() {
    const router = useRouter();
    const auth = getAuth()

    const [loginError, setLoginError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [createComplete, setCreateComplete] = useState(false)

    useEffect(() => {
        router.isReady && setPageLoading(false)
    }, [router])

    const CustomTextField = (props) => (

        <TextField variant="outlined" size="small" sx={{
            "& .MuiOutlinedInput-notchedOutline": {
                border: 'none',
            }
        }} style={{ backgroundColor: 'white', borderRadius: '15px', minWidth: '270px', }} type="text" {...props} />

    );

    const validatePasswordLength = (password) => {
        return password.length >= 8
    }

    const validatePasswordUpperCase = (password) => {
        return /[A-Z]/.test(password)
    }
    const validatePasswordLowerCase = (password) => {
        return /[a-z]/.test(password)
    }

    const validatePasswordContainsNumber = (password) => {
        return /\d/.test(password)
    }

    const validPassword = (password) => {
        return validatePasswordLength(password) && validatePasswordUpperCase(password) && validatePasswordLowerCase(password) && validatePasswordContainsNumber(password)
    }
    const oobCode = router.query.oobCode
    const hasOobCode = !!oobCode

    return (
        <>
            <Head>
                <title>Alcove: Password Reset</title>
                <meta name="description" content="Your link-in-bio to share everything you love." />
                <meta property="og:title" content="Alcove: Share what you love" />
                <meta
                    property="og:description"
                    content="Your link-in-bio to share everything you love."
                />
                <meta
                    property="og:image"
                    content="/social-share.png"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            {pageLoading && <DefaultLoader />}
            <PageTransition>
                <main style={{ minHeight: '100vh', width: "100%" }}>
                    <Stack alignItems="center" spacing={1}>
                        <div style={{ zIndex: 1, backgroundColor, borderStyle: 'solid', maxWidth: "350px", borderWidth: '0px', borderColor: 'white', minWidth: '200px', minHeight: '300px', padding: '2em 1em 1em 1em', marginTop: '3em' }}>
                            {!hasOobCode && <Stack alignItems="center">
                                <Link href={"/"}>
                                    <Navbar mobile={true} />
                                </Link>
                                <Typography variant="subtitle1" style={{ color: 'white', fontWeight: 400, textAlign: "center" }}>{`Please check your email for a link to reset your password.`}</Typography>
                            </Stack>}
                            {hasOobCode && <Stack alignItems="center">
                                <Link href={"/"}>
                                    <Navbar mobile={true} />
                                </Link>
                                <Stack alignItems={"center"} style={{ paddingBottom: '1rem' }}>
                                    <Typography variant="subtitle1" style={{ color: 'white', fontWeight: 400, textAlign: "center" }}>{createComplete ? "You've successfully reset your password." : "Create a new password"}</Typography>
                                    {createComplete && <Button variant="contained" onClick={() => router.push('/login')} style={{ backgroundColor: '#F97B22', width: "100%", borderRadius: '15px', marginTop: '2em' }}>Login</Button>}
                                </Stack>

                                {!createComplete && <Formik
                                    initialValues={{
                                        password: '',
                                        passwordConfirm: ''
                                    }}
                                    onSubmit={async (values) => {
                                        const { password, passwordConfirm } = values;
                                        if (password !== passwordConfirm || !validPassword(password)) {
                                            return
                                        }
                                        setLoading(true)

                                        try {
                                            const result = await confirmPasswordReset(auth, oobCode, password)
                                            setCreateComplete(true)
                                        } catch (error) {
                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            console.error(errorCode, errorMessage)
                                            Sentry.captureException(error)
                                            setLoginError("There was a problem creating your password. Please request a new reset link.")
                                        };
                                        setLoading(false)

                                    }}
                                >
                                    {({ values, errors, touched }) => (
                                        <Form>
                                            <Stack style={{}} alignItems="center" spacing={1}>
                                                <Field as={AlcoveTextField} type="password" id="password" name="password" placeholder="Password" />
                                                <Field as={AlcoveTextField} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password" />
                                                <div>
                                                    {!validatePasswordLength(values.password) && <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Minimum 8 characters</Typography>}
                                                    {!validatePasswordContainsNumber(values.password) && <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Atleast 1 number</Typography>}
                                                    {!validatePasswordUpperCase(values.password) && <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Atleast 1 uppercase letter</Typography>}
                                                    {!validatePasswordLowerCase(values.password) && <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Atleast 1 lowercase letter</Typography>}
                                                    {(values.password !== values.passwordConfirm || values.password.length === 0) && <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Passwords must match</Typography>}
                                                </div>

                                                <Button disabled={loading} variant="contained" type="submit" style={{ backgroundColor: '#F97B22', width: "100%", borderRadius: '15px', marginTop: '2em' }}>{loading ? "Please wait..." : "Create"}</Button>
                                            </Stack>

                                        </Form>
                                    )}


                                </Formik>}
                                <Typography style={{ color: 'white', width: '100%', textAlign: "center", paddingTop: '1rem' }}>
                                    {loginError ?? ""}
                                </Typography>
                            </Stack>}
                        </div>
                    </Stack>
                </main>
            </PageTransition>
        </>
    )
}
