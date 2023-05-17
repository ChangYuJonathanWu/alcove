import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo'
import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { amita } from '../fonts'
import Link from 'next/link';
import useBetterMediaQuery from '@/utils/useBetterMediaQuery'
import Navbar from '@/components/home/Navbar'
import { useAuthContext } from "@/context/AuthContext";

import React, { useState } from 'react'

const theme4 = {
    bgColor: '#7C9070',
    logoColor: "white",
    textColor: "white",
    buttonColor: '#F97B22',
    buttonTextColor: 'white'
}


export default function Home() {

    const { user }  = useAuthContext()

    const isTabletOrMobile = useBetterMediaQuery('(max-width: 800px)')
    const isLarge = useBetterMediaQuery('(min-width: 1000px)')
    const isReallyLarge = useBetterMediaQuery('(min-width: 1200px)')

    const theme = theme4;
    const claimButtonStyle = { backgroundColor: theme.buttonColor, color: theme.buttonTextColor, maxWidth: "250px", textTransform: 'none', borderRadius: '15px', padding: '1rem 2rem' }
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor

    return (
        <>
            <Head>
                <title>Alcove: Sign Up</title>
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
                <Stack alignItems="center" style={{ paddingBottom: '3rem' }}>
                    <h1>Dashboard</h1>
                    <div>
                        {user ? `You are logged in as ${user.email}` : "You are not logged in."}
                    </div>
                </Stack>
            </main>
        </>
    )
}
