import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo'
import FoundationIcon from '@mui/icons-material/Foundation';
import {  Stack, TextField, Typography } from '@mui/material'
import { amita } from '../fonts'

import React, { useState, useEffect } from 'react'
import { firebase } from '@/lib/Firebase';

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

            <main style={{  backgroundColor, minHeight: '100vh', width: "100%" }}>

                <Stack alignItems="center" style={{ paddingBottom: '3rem' }}>
                    <Stack id="home-logo" direction="row" spacing={0.5} alignItems="center" style={{ padding: "1rem", marginTop: "0.5rem" }}>
                        {/* <FoundationIcon style={{ color: theme.buttonColor }}/> */}
                        <Image src="/favicon.svg" width="50" height="50" alt="Alcove logo" />
                        <h1 className={amita.className} style={{ fontWeight: 700, color: logoColor }} variant="h1">alcove</h1>
                    </Stack>
                   
                </Stack>
            </main>
        </>
    )
}
