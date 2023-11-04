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
import PasswordRequirements from '@/components/signIn/PasswordRequirements'
import {
    SignupSchema,
    validPassword
} from '@/utils/authConfigs';
import { HOME_THEME } from '@/utils/themeConfig'
import { AlcoveStack, AlcoveSubmitButton, AlcoveTextField } from '@/components/custom/AlcoveComponents'

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
                <main className="background-home">
                    <AlcoveStack>
                        <Navbar hideLogin />
                        {!hasOobCode && <Typography variant="subtitle1" style={{ fontWeight: 400, textAlign: "center" }}>{`Please check your email for a link to reset your password.`}</Typography>}
                        {hasOobCode && <Stack alignItems="center" spacing={7}>
                            <Stack alignItems={"center"} style={{ paddingBottom: '1rem' }}>
                                <Typography variant="h1" style={{ fontWeight: 400, textAlign: "center" }}>{createComplete ? "You've successfully reset your password." : "Create a new password 🔑"}</Typography>
                                {createComplete && <AlcoveSubmitButton variant="contained" onClick={() => router.push('/login')} style={{ backgroundColor: '#F97B22', width: "100%", borderRadius: '15px', marginTop: '2em' }}>Login</AlcoveSubmitButton>}
                            </Stack>

                            {!createComplete && <Formik
                                initialValues={{
                                    password: '',
                                    passwordConfirm: ''
                                }}
                                onSubmit={async (values) => {
                                    const { password } = values;
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
                                    <Form style={{ width: '100%' }}>
                                        <Stack style={{}} alignItems="center" spacing={1}>
                                            <Field as={AlcoveTextField} type="password" id="password" name="password" placeholder="Password" />
                                            <PasswordRequirements password={values.password} passwordConfirm={values.passwordConfirm} />
                                            <AlcoveSubmitButton disabled={loading} >{loading ? "Please wait..." : "Create"}</AlcoveSubmitButton>
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>}
                            <Typography style={{ width: '100%', textAlign: "center", paddingTop: '1rem' }}>
                                {loginError ?? ""}
                            </Typography>
                        </Stack>}
                    </AlcoveStack>
                </main>
            </PageTransition>
        </>
    )
}
