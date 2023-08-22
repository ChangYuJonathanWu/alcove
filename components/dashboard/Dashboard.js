import Head from 'next/head'
import { Button, Divider, Stack, TextField, Typography, Avatar } from '@mui/material'
import Link from 'next/link';
import { signOut, getAuth } from "firebase/auth";
import { firebase } from '@/lib/Firebase'

import React, { useState, useEffect } from 'react'
import { protectedApiCall } from '@/utils/api'
import { useAuthState } from 'react-firebase-hooks/auth'


export default function Dashboard() {
    // get all signups
    const auth = getAuth()
    const [signups, setSignups] = useState([])
    const [user, authLoading, authError] = useAuthState(auth)
    const [trigger, setTrigger] = useState(false)
    const [ status, setStatus ]   = useState(null)
    useEffect(() => {
        const loadSignups = async () => {
            const result = await protectedApiCall('/api/admin/user_management', "GET")
            const signups = await result.json()
            setSignups(signups.results)
        }
        if (user) {
            loadSignups()
        }

    }, [user, trigger])

    const onOnboardAttempt = async (signupId, attempt) => {
        const result = await protectedApiCall(`/api/admin/user_management/attempt_onboard`, "POST", JSON.stringify({ signupId, attemptNumber: attempt }))
        setTrigger(!trigger)
    }
    const onComplete = async (signupId) => {
        const result = await protectedApiCall(`/api/admin/user_management/complete`, "POST", JSON.stringify({ signupId }))
        setTrigger(!trigger)
    }
    const onDelete = async (signupId) => {
        const result = await protectedApiCall(`/api/admin/user_management/complete`, "POST", JSON.stringify({ signupId, deleteSignup: true }))
        setTrigger(!trigger)
    }

    const onTestOnboardingEmail = async () => {
        setStatus(null)
        const result = await protectedApiCall(`/api/admin/user_management/attempt_onboard`, "POST", JSON.stringify({test: true}))
        if(result.status !== 200) {
            setStatus("Error sending test onboarding email, status: " + result.status)
        } else {
            setStatus("Test onboarding email sent")
        }
    }

    const buildSignups = () => {
        const completedSignups = signups.filter((signup) => signup.complete).reverse()
        const incompleteSignups = signups.filter((signup) => !signup.complete).reverse()
        return (

            <>
                <Typography variant="h3">Incomplete Signups</Typography>
                <Stack>
                    {incompleteSignups.map((signup) => {
                        const { email, _id, handle, attempts = 0 } = signup

                        return (
                            <Stack key={_id} direction="row" alignItems="center" spacing={2}>
                                <Typography>{_id} - {email} - {handle}</Typography>
                                <Button disabled={attempts !== 0} onClick={() => onOnboardAttempt(_id, attempts)}>Onboard</Button>
                                <Button disabled={attempts !== 1} onClick={async () => { }}>Follow Up</Button>
                                <Button disabled={attempts !== 2} onClick={async () => { }}>Final</Button>
                                <Typography> | </Typography>
                                <Button onClick={() => onComplete(_id)}>Complete</Button>
                                <Button onClick={() => onDelete(_id)} style={{ color: 'red' }}>Delete</Button>
                                <Typography>{handle}</Typography>
                            </Stack>
                        )
                    }
                    )}
                </Stack>
                <Typography variant="h3">Completed Signups</Typography>
                <Stack style={{ marginTop: '1rem' }}>
                    {completedSignups.map((signup) => {
                        const { email, _id, handle } = signup
                        return (
                            <Stack key={_id} direction="row" alignItems="center" spacing={2}>
                                <Typography>{email}</Typography>
                                <a href={`https://www.alcove.place/${handle}`} target="_blank">{handle}</a>
                            </Stack>
                        )
                    }
                    )}
                </Stack>

            </>
        )



    }

    return (
        <>
            <Head>
                <title>Alcove: User Management</title>
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

            <main>
                <Stack>
                    {status && <Typography color="red">{status}</Typography>}
                    <Button onClick={onTestOnboardingEmail} variant={"contained"}>Send Test Onboarding</Button>
                    {buildSignups()}
                </Stack>

            </main>
        </>
    )
}
