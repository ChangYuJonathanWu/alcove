import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo'
import { Stack } from '@mui/material'
import { amita } from '../fonts'

import React, { useState, useEffect } from 'react'

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
        <Stack alignItems="center" style={{ paddingBottom: '3rem' }}>
            <Stack id="home-logo" direction="row" spacing={0.5} alignItems="center" style={{ padding: "1rem", marginTop: "0.5rem" }}>
                <Image src="/favicon.svg" width="50" height="50" alt="Alcove logo" />
                <h1 className={amita.className} style={{ fontWeight: 700, color: logoColor }} variant="h1">alcove</h1>
            </Stack>
        </Stack>
    )
}
