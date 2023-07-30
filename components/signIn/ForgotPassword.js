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


const theme = {
    bgColor: '#7C9070',
    logoColor: "white",
    textColor: "white",
    buttonColor: '#F97B22',
    buttonTextColor: 'white'
}

export default function ForgotPassword() {
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor
    const router = useRouter();
    const auth = getAuth()

    const [loading, setLoading] = useState(false)
    const [complete, setComplete] = useState(false)

    const CustomTextField = (props) => (

        <TextField variant="outlined" size="small" sx={{
            "& .MuiOutlinedInput-notchedOutline": {
                border: 'none',
            }
        }} style={{ backgroundColor: 'white', borderRadius: '15px', minWidth: '270px', width: '100%' }} type="text" {...props} />

    );

    return (
        <>
            <Head>
                <title>Alcove: Sign In</title>
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


            <PageTransition>
                <main style={{ minHeight: '100vh', width: "100%" }}>

                    <Stack alignItems="center" spacing={1}>
                        <div style={{ zIndex: 1, backgroundColor, borderStyle: 'solid', borderWidth: '1px', borderColor: 'white', minWidth: '300px', maxWidth: '320px', minHeight: '300px', padding: '2em 1em 2em 1em', marginTop: '3em' }}>
                            <Stack alignItems={"center"} style={{ width: "100%" }}>
                                <Link href="/">
                                    <Navbar />
                                </Link>
                                {complete && <Stack alignItems="center">
                                    <Typography variant="h3" style={{ color: 'white', marginTop: '1rem', textAlign: "center" }}>Check your email for a password reset link.</Typography>
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
                                    <Form>
                                        <Stack alignItems="center" spacing={1} >
                                            <Field as={CustomTextField} id="email" name="email" type="email" required={true} placeholder="Email" />
                                            <Button disabled={loading} variant="contained" type="submit" style={{ backgroundColor: '#F97B22', width: "100%", borderRadius: '15px', marginTop: '1em' }}>{loading ? "Please wait..." : "Send Reset Link"}</Button>
                                        </Stack>

                                    </Form>
                                </Formik>}
                                {complete ?
                                    <Link href="/login" style={{ textDecoration: 'none' }}>
                                        <Typography variant="body2" style={{ color: 'white', marginTop: '1rem', textDecoration: "underline" }}>Back to Sign In</Typography>
                                    </Link> :

                                    <Link href="/" style={{ textDecoration: 'none' }}>
                                        <Typography variant="body2" style={{ color: 'white', marginTop: '1rem' }}>Sign Up</Typography>
                                    </Link>
                                }
                            </Stack>
                        </div>

                    </Stack>

                </main>
            </PageTransition>
        </>
    )
}
