import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import { Stack, TextField, Typography, Button } from '@mui/material'
import { amita } from '../fonts'
import Navbar from '@/components/home/Navbar.js'
import { Formik, Field, Form } from 'formik';


import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
    console.log(user)
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
                <div>
                    {`user: ${user}`}
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}

                    onSubmit={(values) => {
                        const auth = getAuth()
                        const { email, password } = values;
                        signInWithEmailAndPassword(auth, email, password).then((credential) => {
                            const user = userCredential.user
                        }).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        });
                    }}
                >
                    <Form>
                        <Stack style={{}} alignItems="center" spacing={1}>
                            <Field id="email" name="email" type="email" placeholder="Email" />
                            <Field type="password" id="password" name="password" placeholder="Password" />
                            <button variant="contained" type="submit">Login</button>
                        </Stack>

                    </Form>
                </Formik>
            </main>
        </>
    )
}
