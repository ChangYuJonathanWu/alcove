import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import { Stack, TextField, Typography, Button } from '@mui/material'
import { amita } from '../fonts'
import Navbar from '@/components/home/Navbar.js'
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';
import { styled } from '@mui/material';


import React, { useState, useEffect } from 'react'
import { getAuth, signOut, sendPasswordResetEmail } from "firebase/auth";
import Link from 'next/link';
import PageTransition from '@/components/PageTransition'
import { AlcoveStack, AlcoveSubmitButton, AlcoveTextField } from '../custom/AlcoveComponents';
import DefaultHeader from '../DefaultHeader';
import { HOME_THEME } from '@/utils/themeConfig';

export default function ForgotPasswordNew({ mobileApp = false }) {
    const theme = HOME_THEME
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor
    const router = useRouter();
    const auth = getAuth()

    const [loading, setLoading] = useState(false)
    const [complete, setComplete] = useState(false)

    return (
        <>
            <DefaultHeader title="Alcove: Reset Password" />

            <PageTransition>
                <main className={mobileApp ? "" : "background-home"}>
                    <AlcoveStack alignItems="center">
                        <Navbar hideLogin mobileApp={mobileApp} />
                        <Stack>
                            <Typography variant="h1" style={{ textAlign: 'center', fontWeight: '500' }}>Password Reset</Typography>
                            <Typography variant="subtitle2" style={{ textAlign: 'center' }}>{`We'll send you a reset link 🔑`}</Typography>
                        </Stack>
                        <Stack alignItems={"center"} spacing={1.5} style={{ width: "100%" }}>
                            {complete && <Stack alignItems="center">
                                <Typography variant="h3" style={{ marginTop: '1rem', textAlign: "center" }}>Check your email for a password reset link.</Typography>
                            </Stack>
                            }
                            {!complete && <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    email: "",
                                }}

                                onSubmit={async (values) => {
                                    setLoading(true)
                                    const { email, password } = values;
                                    try {
                                        await sendPasswordResetEmail(auth, email)
                                    } catch (error) {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                    };
                                    setLoading(false)
                                    setComplete(true)

                                }}
                            >
                                <Form style={{ width: '100%' }}>
                                    <Stack alignItems="center" spacing={1} style={{ width: "100%" }}>
                                        <Field as={AlcoveTextField} id="email" name="email" type="email" required={true} placeholder="Email" />
                                        <AlcoveSubmitButton disabled={loading} >{loading ? "Please wait..." : "Send Reset Link"}</AlcoveSubmitButton>
                                    </Stack>

                                </Form>
                            </Formik>}
                            {complete ?
                                <Link href={mobileApp ? "/m/login" : "/login"} style={{ textDecoration: 'none' }}>
                                    <Typography variant="body2" style={{ color: 'black' }}>⏎ Back to Sign In </Typography>
                                </Link> :

                                <Link href={mobileApp ? "/m/signup" : "/signup"} >
                                    <Typography variant="body2" style={{ color: 'black' }}>Sign Up</Typography>
                                </Link>
                            }
                        </Stack>

                    </AlcoveStack>

                </main>
            </PageTransition>
        </>
    )
}
