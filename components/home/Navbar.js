import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Logo from '@/components/home/static/alcove-logo.svg'
import { Stack } from '@mui/material'
import { amita } from '../fonts'
import Link from 'next/link'

import React, { useState, useEffect } from 'react'

const theme = {
    bgColor: '#7C9070',
    logoColor: "white",
    textColor: "white",
    buttonColor: '#F97B22',
    buttonTextColor: 'white'
}

export default function Navbar({ mobile }) {
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor
    return (
        <Stack alignItems="start" style={{ paddingBottom: mobile ? '1rem' : '3rem' }}>
            <Stack id="home-logo" direction="row" spacing={0.5} alignItems="center" style={{ padding: "1rem", marginTop: "0.5rem" }}>
                <Image src={Logo} width={mobile ? 200 : 250} height={mobile ? 50 : 80} alt="Alcove logo" />
            </Stack>
        </Stack>
    )
}
