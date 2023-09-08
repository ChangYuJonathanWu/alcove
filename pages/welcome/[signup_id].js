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
import { AlcoveTextField, AlcoveSubmitButton, AlcoveStack } from '@/components/custom/AlcoveComponents';
import { HOME_THEME } from '@/utils/themeConfig';
import PasswordRequirements from '@/components/signIn/PasswordRequirements';
import {
    SignupSchema,
    validPassword
} from '@/utils/authConfigs';

const auth = getAuth()

import React, { useState, useEffect } from 'react'
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";
import DefaultLoader from '@/components/DefaultLoader';

import { protectedApiCall } from '@/utils/api';
import DefaultHeader from '@/components/DefaultHeader';


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


export default function Welcome({ signup }) {
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


    return (
        <>
            <DefaultHeader title="Alcove: Welcome" />
            <main className="background-home">
                {pageLoading && <DefaultLoader />}
                {!pageLoading &&
                    <AlcoveStack>
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
                                        <PasswordRequirements password={values.password} passwordConfirm={values.passwordConfirm} />
                                    </Stack>

                                </Form>
                            )}
                        </Formik>
                        <Typography>
                            {loginError ?? ""}
                        </Typography>
                    </AlcoveStack>
                }
            </main>
        </>
    )
}
