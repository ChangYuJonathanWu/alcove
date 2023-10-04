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
    const [status, setStatus] = useState(null)
    const [editMode, setEditMode] = useState(false)
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

    const onOnboardAttempt = async (signupId, attempt, email, handle, increment = true) => {
        setStatus(null)
        const result = await protectedApiCall(`/api/admin/user_management/attempt_onboard`, "POST", JSON.stringify({ email, handle, signupId, attemptNumber: attempt, increment }))
        if (result.status !== 200) {
            setStatus("Error sending onboarding email, status: " + result.status)
        } else {
            setStatus("Onboarding email sent for ID: " + signupId)
        }
        setTrigger(!trigger)
    }

    const onTestAlert = async () => {
        const result = await protectedApiCall(`/api/admin/test_alert`, "POST")
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
        const result = await protectedApiCall(`/api/admin/user_management/attempt_onboard`, "POST", JSON.stringify({ test: true }))
        if (result.status !== 200) {
            setStatus("Error sending test onboarding email, status: " + result.status)
        } else {
            setStatus("Test onboarding email sent")
        }
    }

    const buildSignups = () => {
        const completedSignups = signups.filter((signup) => signup.complete).reverse()
        const incompleteSignups = signups.filter((signup) => !signup.complete).reverse()
        const toOnboard = incompleteSignups.filter((signup) => !signup.attempts)
        const toFollowUp = incompleteSignups.filter((signup) => signup.attempts === 1).reverse()
        const toFinal = incompleteSignups.filter((signup) => signup.attempts === 2).reverse()
        return (

            <>
                <Typography variant="h3" style={{ fontWeight: '600' }}>{`Onboarding Signups (${toOnboard.length})`}</Typography>
                <Stack spacing={1}>
                    {toOnboard.map((signup) => {
                        const { email, _id, handle, attempts = 0 } = signup

                        return (
                            <Stack key={_id} direction="row" alignItems="center" spacing={2} style={{ padding: '1rem', borderBottom: '1px solid black' }}>
                                <Typography>{email} - {handle} - {_id} </Typography>
                                <Button style={{ backgroundColor: attempts === 0 ? "white" : "gray" }} onClick={() => onOnboardAttempt(_id, attempts, email, handle, attempts === 0)}>Onboard</Button>
                                <Typography> | </Typography>
                                {editMode && <Button onClick={() => onComplete(_id)}>Complete</Button>}
                                {editMode && <Button onClick={() => onDelete(_id)} style={{ color: 'red' }}>Delete</Button>}
                            </Stack>
                        )
                    }
                    )}
                </Stack>
                <Typography variant="h3">{`Follow Up Signups (${toFollowUp.length})`}</Typography>
                <Stack spacing={1}>
                    {toFollowUp.map((signup) => {
                        const { email, _id, handle, attempts = 0 } = signup

                        return (
                            <Stack key={_id} direction="row" alignItems="center" spacing={2}>
                                <Typography>{_id} - {email} - {handle}</Typography>
                                {/* <Button style={{ backgroundColor: attempts === 0 ? "white" : "gray" }} onClick={() => onOnboardAttempt(_id, attempts, email, handle, attempts === 0)}>Onboard</Button>
                                <Button style={{ backgroundColor: attempts === 1 ? "white" : "gray" }} onClick={() => onOnboardAttempt(_id, attempts, email, handle, attempts === 1)}>Follow Up</Button>
                                <Button style={{ backgroundColor: attempts === 2 ? "white" : "gray" }} onClick={() => onOnboardAttempt(_id, attempts, email, handle, attempts === 2)}>Final</Button> */}
                                <Typography> | </Typography>
                                {editMode && <Button onClick={() => onComplete(_id)}>Complete</Button>}
                                {editMode && <Button onClick={() => onDelete(_id)} style={{ color: 'red' }}>Delete</Button>}
                                <Typography>{handle}</Typography>
                            </Stack>
                        )
                    }
                    )}
                </Stack>
                <Typography variant="h3">Final Follow Up Signups</Typography>
                <Stack spacing={1}>
                    {toFinal.map((signup) => {
                        const { email, _id, handle, attempts = 0 } = signup

                        return (
                            <Stack key={_id} direction="row" alignItems="center" spacing={2}>
                                <Typography>{_id} - {email} - {handle}</Typography>
                                <Button style={{ backgroundColor: attempts === 0 ? "white" : "gray" }} onClick={() => onOnboardAttempt(_id, attempts, email, handle, attempts === 0)}>Onboard</Button>
                                <Button style={{ backgroundColor: attempts === 1 ? "white" : "gray" }} onClick={() => onOnboardAttempt(_id, attempts, email, handle, attempts === 1)}>Follow Up</Button>
                                <Button style={{ backgroundColor: attempts === 2 ? "white" : "gray" }} onClick={() => onOnboardAttempt(_id, attempts, email, handle, attempts === 2)}>Final</Button>
                                <Typography> | </Typography>
                                <Button onClick={() => onComplete(_id)}>Complete</Button>
                                <Button onClick={() => onDelete(_id)} style={{ color: 'red' }}>Delete</Button>
                                <Typography>{handle}</Typography>
                            </Stack>
                        )
                    }
                    )}
                </Stack>
                <Typography variant="h3">{`Completed Signups (${completedSignups.length})`}</Typography>
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
                <Stack style={{ margin: '1rem' }}>
                    <Typography variant="h1">{`Total Accounts: ${signups.length}`}</Typography>
                    {status && <Typography color="red">{status}</Typography>}
                    <Stack direction="row" spacing={2} style={{ padding: '1rem' }}>
                        <Button onClick={onTestOnboardingEmail} variant={"contained"}>Send Test Onboarding</Button>
                        <Button onClick={() => setEditMode(!editMode)} variant={"contained"}>Toggle Edit Mode</Button>
                        <Button onClick={onTestAlert} variant="contained">Send Test Alert</Button>

                    </Stack>

                    {buildSignups()}
                </Stack>

            </main>
        </>
    )
}
