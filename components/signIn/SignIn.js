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
import { redirect } from 'next/navigation';
import { styled } from '@mui/material';


import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
import ProfileLoader from '../profile/ProfileLoader';
import { refreshFirebaseToken } from '@/lib/api/tokenRefresh'


const theme = {
    bgColor: '#7C9070',
    logoColor: "white",
    textColor: "white",
    buttonColor: '#F97B22',
    buttonTextColor: 'white'
}

export default function SignIn() {
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor
    const { user } = useAuthContext()
    const router = useRouter();
    const auth = getAuth()

    const redirectUser = router.query.r


    const [loginError, setLoginError] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    const CustomTextField = (props) => (

        <TextField variant="outlined" size="small" sx={{
            "& .MuiOutlinedInput-notchedOutline": {
                border: 'none',
            }
        }} style={{ backgroundColor: 'white', borderRadius: '15px', minWidth: '270px' }} type="text" {...props} />

    );

    useEffect(() => {
        if (redirectUser) {
            router.replace(`/${redirectUser}`)
            return
        }
        const loadUser = async () => {
            if (user) {
                setPageLoading(true)
                const { uid } = user
                const token = await refreshFirebaseToken()
                const result = await fetch(`/api/profile?uid=${uid}`, { method: "GET" })
                const fullUserProfile = await result.json()
                const { handle } = fullUserProfile
                router.replace(`/${handle}`)
                return
            }
            setPageLoading(false)
        }
        loadUser()
    }, [user, router, redirectUser])

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
            <main style={{ backgroundColor, minHeight: '100vh', width: "100%" }}>

                {pageLoading && <ProfileLoader />}
                {!pageLoading && <Stack alignItems="center" spacing={1}>
                    <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white', minWidth: '200px', minHeight: '300px', padding: '2em 1em 3em 1em', marginTop: '3em' }}>
                        <Navbar />

                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}

                            onSubmit={async (values) => {
                                setLoading(true)
                                const { email, password } = values;
                                try {
                                    const credential = await signInWithEmailAndPassword(auth, email, password)
                                    if (credential) {
                                        setLoginError(null)
                                        const { uid } = credential.user
                                        const result = await fetch(`/api/profile?uid=${uid}`, { method: "GET" })
                                        const fullUserProfile = await result.json()
                                        const { handle } = fullUserProfile
                                        router.replace(`/${handle}`)

                                        return
                                    }

                                } catch (error) {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    setLoginError("Invalid email/password or account doesn't exist")
                                };
                                setLoading(false)

                            }}
                        >
                            <Form>
                                <Stack style={{}} alignItems="center" spacing={1}>
                                    <Field as={CustomTextField} id="email" name="email" type="email" placeholder="Email" />
                                    <Field as={CustomTextField} type="password" id="password" name="password" placeholder="Password" />
                                    <Button disabled={loading} variant="contained" type="submit" style={{ backgroundColor: '#F97B22', width: "100%", borderRadius: '15px', marginTop: '1em' }}>{loading ? "Logging in..." : "Login"}</Button>
                                </Stack>

                            </Form>
                        </Formik>
                    </div>
                    <Typography style={{ color: 'white' }}>
                        {loginError ?? ""}
                    </Typography>
                    {/* {user && <Button onClick={() => signOut(auth)}>Sign Out</Button>} */}
                </Stack>}
            </main>
        </>
    )
}
