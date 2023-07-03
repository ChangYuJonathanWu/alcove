import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import { Stack, TextField, Typography, Button } from '@mui/material'
import { amita } from '@/components/fonts'
import Navbar from '@/components/home/Navbar.js'
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import { styled } from '@mui/material';
import { getSignup } from '@/lib/api/signup';
import * as Sentry from '@sentry/nextjs'


import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
import ProfileLoader from '@/components/profile/ProfileLoader';
import { refreshFirebaseToken } from '@/lib/api/tokenRefresh'

import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);


const theme = {
    bgColor: '#7C9070',
    logoColor: "white",
    textColor: "white",
    buttonColor: '#F97B22',
    buttonTextColor: 'white'
}

// getServerSideProps to pull signup from DB
export const getServerSideProps = async (context) => {
    const signupId = context.params.signup_id
    console.log(signupId)
    const signup = await getSignup(signupId)
    if (!signup) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
    signup['_id'] = signupId
    return {
        props: {
            signup
        }
    }
}

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be atleast 6 characters')
        .max(60, 'Password must be less than 60 characters')
        .minLowercase(1, 'Password must contain at least 1 lower case letter')
        .minUppercase(1, 'Password must contain at least 1 upper case letter')
        .minNumbers(1, 'Password must contain at least 1 number')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required('Required')
});

export default function Welcome({ signup }) {
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor
    const { user } = useAuthContext()
    const router = useRouter();
    const auth = getAuth()

    const [loginError, setLoginError] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    const { email, handle, _id } = signup

    const CustomTextField = (props) => (

        <TextField variant="outlined" size="small" sx={{
            "& .MuiOutlinedInput-notchedOutline": {
                border: 'none',
            }
        }} style={{ backgroundColor: 'white', borderRadius: '15px', minWidth: '270px', }} type="text" {...props} />

    );

    useEffect(() => {
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
    }, [user, router])

    return (
        <>
            <Head>
                <title>Alcove: Welcome</title>
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
                    <div style={{ borderStyle: 'solid', maxWidth: "350px", borderWidth: '1px', borderColor: 'white', minWidth: '200px', minHeight: '300px', padding: '2em 1em 3em 1em', marginTop: '3em' }}>
                        <Navbar mobile={true} />
                        <Stack alignItems={"center"}>
                            <Typography variant="h3" style={{ color: 'white', fontWeight: 700, marginBottom: '1em' }}>{`Hey @${handle}, you're in!`}</Typography>
                            <Typography variant="subtitle1" style={{ color: 'white', fontWeight: 400, textAlign: "center" }}>{`Create your Alcove now and join an exclusive group of early-access users.`}</Typography>
                            <Typography variant="subtitle1" style={{ color: 'white', marginTop: '3rem', fontWeight: 700 }}>{`Email: ${email}`}</Typography>
                        </Stack>

                        <Formik
                            initialValues={{
                                password: '',
                                passwordConfirm: ''
                            }}
                            // validationSchema={SignupSchema}
                            onSubmit={async (values) => {
                                console.log("Attempting to complete signup")
                                const { password, passwordConfirm } = values;
                                
                                if (password !== passwordConfirm) {
                                    setLoginError("Passwords do not match")
                                    return
                                }
                                setLoading(true)

                                try {
                                    const completeSignupResult = await fetch(`/api/signup/complete`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            password,
                                            signupId: _id
                                        })
                                    })
                                    const { success, error } = await completeSignupResult.json()
                                    if (success) {
                                        router.replace(`/login?email=${email}`)
                                    } else {
                                        Sentry.captureException(error)
                                        setLoginError("Could not complete signup - please try again later")
                                    }

                                } catch (error) {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    console.error(errorCode, errorMessage)
                                    Sentry.captureException(error)
                                    setLoginError("Could not complete signup - please try again later")
                                };
                                setLoading(false)

                            }}
                        >
                            {({ values, errors, touched}) => (
                                <Form>
                                    <Stack style={{}} alignItems="center" spacing={1}>
                                        <Field as={CustomTextField} type="password" id="password" name="password" placeholder="Password" />
                                        <Field as={CustomTextField} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password" />
                                        {values.password.length < 8 && <Typography variant="body2" style={{ color: 'white', margin: 0, marginTop: '0.5rem' }}> • Minimum 8 characters</Typography>}
                                        {!(/\d/.test(values.password)) && <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Atleast 1 number</Typography>}
                                        {!(/[A-Z]/.test(values.password)) && <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Atleast 1 uppercase letter</Typography>}
                                        {!(/[a-z]/.test(values.password)) && <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Atleast 1 lowercase letter</Typography>}
                                        {(values.password !== values.passwordConfirm || values.password.length === 0 )&& <Typography variant="body2" style={{ color: 'white', margin: 0 }}> • Passwords must match</Typography>}
                                        <Button disabled={loading} variant="contained" type="submit" style={{ backgroundColor: '#F97B22', width: "100%", borderRadius: '15px', marginTop: '2em' }}>{loading ? "Please wait..." : "Get Started"}</Button>
                                    </Stack>

                                </Form>
                            )}


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
