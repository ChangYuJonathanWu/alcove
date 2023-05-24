import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import { Stack, TextField, Typography, Button } from '@mui/material'
import { amita } from '../fonts'
import Navbar from '@/components/home/Navbar.js'
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';


import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";


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
    const [loginError, setLoginError] = useState(null)
    const router = useRouter();
    const auth = getAuth()
    
    const CustomTextField =  (props) => (

        <TextField variant="standard" type="text" {...props} />
     
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

            <main style={{ backgroundColor, minHeight: '100vh', width: "100%" }}>
                <Navbar />

                <Stack alignItems="center" spacing={1}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}

                        onSubmit={async (values) => {
                            const { email, password } = values;
                            try {
                                const credential = await signInWithEmailAndPassword(auth, email, password)
                                if (credential) {
                                    setLoginError(null)
                                    router.replace("/")
                                }

                            } catch (error) {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                setLoginError(errorMessage)
                            };

                        }}
                    >
                        <Form>
                            <Stack style={{}} alignItems="center" spacing={1}>
                                <Field as={CustomTextField} id="email" name="email" type="email" placeholder="Email" />
                                <Field as={CustomTextField} type="password" id="password" name="password" placeholder="Password" />
                                <Button variant="contained" type="submit">Login</Button>
                            </Stack>

                        </Form>
                    </Formik>
                    <div>
                        {loginError ?? ""}
                    </div>
                    {user && <button onClick={() => signOut(auth)}>Sign Out</button>}
                </Stack>

            </main>
        </>
    )
}
