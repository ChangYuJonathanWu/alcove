import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import { Stack, TextField, Typography, Button } from '@mui/material'
import Navbar from '@/components/home/Navbar.js'
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';
import { styled } from '@mui/material';
import SignUp from '@/components/home/SignUp';

import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import DefaultLoader from '@/components//DefaultLoader';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition'
import { protectedApiCall } from '@/utils/api';

import { useAuthState } from 'react-firebase-hooks/auth';
import { AlcoveStack, AlcoveSubmitButton } from '@/components/custom/AlcoveComponents';
import DefaultHeader from '@/components/DefaultHeader';
const auth = getAuth()

export default function SignUpComponent({ mobileApp = false }) {
    const [user, authLoading, authError] = useAuthState(auth)
    const router = useRouter();

    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    const [signupState, setSignupState] = useState({
        handle: "",
        email: "",
        showValidationError: false,
        showEmailInput: false,
        validationErrorText: "",
        validationInProgress: false,
        completed: false,
    })


    useEffect(() => {
        const loadUser = async () => {
            if (authLoading || !router.isReady) return
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
            <DefaultHeader title="Alcove: Sign Up" />
            <PageTransition>
                <main>
                    {pageLoading && <DefaultLoader />}
                    {!pageLoading &&
                        <AlcoveStack style={{ maxWidth: '400px' }}>
                            <Navbar hideLogin mobileApp={mobileApp} />
                            <Stack spacing={1} style={{ alignItems: 'start', width: '100%' }}>
                                <Typography variant="h1" style={{ fontWeight: '600', fontSize: '2.2rem' }}>Sign Up 🖊</Typography>
                                <Typography variant="subtitle2" >Join the early-access group and claim your Alcove</Typography>
                                <SignUp mobile signupState={signupState} setSignupState={setSignupState} mobileApp={mobileApp} />
                                <Typography variant="subtitle2" style={{ color: 'black', textAlign: "center", width: '100%' }}>Already have an account? <Link href={mobileApp ? "/m/login" : "/login"}>Sign in</Link></Typography>
                            </Stack>

                        </AlcoveStack>
                    }
                </main>
            </PageTransition >
        </>
    )
}
