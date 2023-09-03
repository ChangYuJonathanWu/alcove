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
import { useAuthState } from 'react-firebase-hooks/auth';
import { AlcoveTextField, AlcoveSubmitButton } from '@/components/custom/AlcoveComponents';
import { HOME_THEME } from '@/utils/themeConfig';

const auth = getAuth()

import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import DefaultLoader from '@/components/DefaultLoader';

import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { protectedApiCall } from '@/utils/api';
YupPassword(Yup);


const theme = HOME_THEME

// getServerSideProps to pull signup from DB
export const getServerSideProps = async (context) => {
    const signupId = context.params.signup_id
    let signup;
    if (signupId) {
        signup = await getSignup(signupId)
    }
    if (!signupId || !signup || signup.complete) {
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
    const router = useRouter();
    const [user, authLoading, authError] = useAuthState(auth)

    const [loginError, setLoginError] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    const { email, handle, _id } = signup

    useEffect(() => {
        const loadUser = async () => {
            if (authLoading) return
            if (user) {
                setPageLoading(true)
                const { uid } = user
                const result = await protectedApiCall(`/api/profile?uid=${uid}`, 'GET')
                const fullUserProfile = await result.json()
                const { handle } = fullUserProfile
                router.replace(`/${handle}`)
                return
            }
            setPageLoading(false)
        }
        loadUser()
    }, [user, router, authLoading])

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
            <main className="background-home">
                {pageLoading && <DefaultLoader />}
                {!pageLoading &&
                    <Stack alignItems="center" spacing={7} style={{ padding: '1rem 3rem 1rem 3rem' }}>
                        <Navbar hideLogin />
                        <Stack alignItems={"center"}>
                            <Typography variant="h3" style={{ fontWeight: 600, marginBottom: '0.5em' }}>{`Hey @${handle} - you're in! 👋`}</Typography>
                            <Typography variant="subtitle1" style={{ fontWeight: 400, textAlign: "center" }}>{`Create your Alcove now and join an exclusive group of early-access users.`}</Typography>
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
                                if (password !== passwordConfirm || !validPassword(password)) {
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
                            {({ values, errors, touched }) => (
                                <Form style={{ width: "100%" }}>
                                    <Stack style={{ width: "100%" }} alignItems="center" spacing={1}>
                                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>{`Email: ${email}`}</Typography>
                                        <Field as={AlcoveTextField} type="password" id="password" name="password" placeholder="Password" />
                                        <Field as={AlcoveTextField} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password" />


                                        <AlcoveSubmitButton disabled={loading} >{loading ? "Please wait..." : "Get Started"}</AlcoveSubmitButton>
                                        <div>
                                            {!validatePasswordLength(values.password) && <Typography variant="subtitle2" style={{ margin: 0 }}> • Minimum 8 characters</Typography>}
                                            {!validatePasswordContainsNumber(values.password) && <Typography variant="subtitle2" style={{ margin: 0 }}> • Atleast 1 number</Typography>}
                                            {!validatePasswordUpperCase(values.password) && <Typography variant="subtitle2" style={{ margin: 0 }}> • Atleast 1 uppercase letter</Typography>}
                                            {!validatePasswordLowerCase(values.password) && <Typography variant="subtitle2" style={{ margin: 0 }}> • Atleast 1 lowercase letter</Typography>}
                                            {(values.password !== values.passwordConfirm || values.password.length === 0) && <Typography variant="subtitle2" style={{ margin: 0 }}> • Passwords must match</Typography>}
                                        </div>
                                    </Stack>

                                </Form>
                            )}


                        </Formik>
                        <Typography>
                            {loginError ?? ""}
                        </Typography>
                    </Stack>

                }
            </main>
        </>
    )
}
