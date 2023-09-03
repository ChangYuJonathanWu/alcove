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
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import DefaultLoader from '../DefaultLoader';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition'
import { protectedApiCall } from '@/utils/api';

import { useAuthState } from 'react-firebase-hooks/auth';
import { AlcoveSubmitButton, AlcoveTextField } from '../custom/AlcoveComponents';
const auth = getAuth()



const theme = {
    bgColor: '#7C9070',
    logoColor: "white",
    textColor: "white",
    buttonColor: '#F97B22',
    buttonTextColor: 'white'
}

export default function SignInNew() {
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor
    const [user, authLoading, authError] = useAuthState(auth)
    const router = useRouter();

    const email = router.query.email
    const showOnboardMessage = !!email

    const [loginError, setLoginError] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const loadUser = async () => {
            if (authLoading || !router.isReady) return
            if (user) {
                setPageLoading(true)
                const { uid } = user
                const result = await protectedApiCall(`/api/profile?uid=${uid}`, 'GET')
                const fullUserProfile = await result.json()
                const { handle } = fullUserProfile
                router.replace(`/${handle}` )
                return
            }
            setPageLoading(false)
        }
        loadUser()
    }, [user, router, authLoading])

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
                <main className="background-home">
                    {pageLoading && <DefaultLoader />}
                    {!pageLoading &&
                        <Stack alignItems="center" justifyContent="space-between" spacing={7} style={{ padding: '1rem 3rem 1rem 3rem' }}>
                            <Navbar hideLogin />
                            {/* {showOnboardMessage && <Typography variant="h4" style={{ fontWeight: 700, marginBottom: '1em', textAlign: 'center' }}>Welcome! Sign in with the password you just created.</Typography>} */}
                            <Stack>
                                <Typography variant="h1" style={{ textAlign: showOnboardMessage ? "center" : 'left', fontWeight: '500' }}>{`${showOnboardMessage ? "Welcome!" : "Hey there!"} 👋`}</Typography>
                                <Typography variant="subtitle2" style={{ textAlign: 'left' }}>{`${showOnboardMessage ? "Sign in with the password you just created" : `Sign in to your Alcove`}`}</Typography>
                            </Stack>
                            <Stack style={{ width: "100%" }} alignItems="center">
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        email: email ?? "",
                                        password: '',
                                    }}

                                    onSubmit={async (values) => {
                                        setLoading(true)
                                        const { email, password } = values;
                                        try {
                                            const credential = await signInWithEmailAndPassword(auth, email, password)
                                            // if (credential) {
                                            //     setLoginError(null)
                                            //     const { uid } = credential.user
                                            //     const result = await protectedApiCall(`/api/profile?uid=${uid}`, 'GET')
                                            //     const fullUserProfile = await result.json()
                                            //     const { handle } = fullUserProfile
                                            //     router.push(`/${handle}`, { shallow: true } )

                                            //     return
                                            // }

                                        } catch (error) {
                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            setLoginError("Invalid email/password or account doesn't exist")
                                        };
                                        setLoading(false)

                                    }}
                                >
                                    <Form style={{ width: "100%" }}>
                                        <Stack alignItems="center" spacing={1} style={{ width: "100%" }}>
                                            <Field as={AlcoveTextField} id="email" name="email" type="email" placeholder="Email" />
                                            <Field as={AlcoveTextField} type="password" id="password" name="password" placeholder="Password" />
                                            <AlcoveSubmitButton disabled={loading}>{loading ? "Logging in..." : "Login"}</AlcoveSubmitButton>
                                        </Stack>

                                    </Form>
                                </Formik>
                                <Link href="/" style={{}}>
                                    <Typography variant="body2" style={{ color: 'black', marginTop: '1rem' }}>Sign Up</Typography>
                                </Link>
                            </Stack>


                            <Typography variant="subtitle2" style={{ marginTop: '1rem', textAlign: 'center' }}>
                                {loginError ?? ""}
                            </Typography>
                            <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle2" style={{ color: 'black', marginTop: '1rem', width: "100%", textAlign: "center" }}>
                                    Forgot Password?
                                </Typography>
                            </Link>
                        </Stack>
                    }
                </main>
            </PageTransition>
        </>
    )
}
