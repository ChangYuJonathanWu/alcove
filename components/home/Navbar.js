import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Logo from '@/components/home/static/alcove-logo-dark.png'
import LogoLight from '@/components/home/static/alcove-logo.svg'
import { AppBar, Stack, Button, Box } from '@mui/material'
import { amita } from '../fonts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { USE_GREEN_THEME } from '@/utils/themeConfig'
import { Capacitor } from '@capacitor/core'

import React, { useState, useEffect } from 'react'

const theme = {
    bgColor: '#7C9070',
    logoColor: "white",
    textColor: "white",
    buttonColor: '#F97B22',
    buttonTextColor: 'white'
}



export default function Navbar({ hideLogin = false, mobile = true, sizeOverride }) {
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor
    const router = useRouter();

    const onLogin = () => {
        router.replace('/login')
    }

    return (
        <Stack direction="row" alignItems="center" justifyContent={hideLogin ? "center" : "space-between"} width="100%" data-cy="navbar">

            <Image data-cy="navbar--logo" src={USE_GREEN_THEME ? LogoLight : Logo} height={sizeOverride ? sizeOverride : mobile ? 40 : 70} alt="Alcove logo" onClick={() => !Capacitor.isNativePlatform() && router.push('/')} />


            {!hideLogin && <Button data-cy="login-button" onClick={onLogin} variant="contained" style={{ textTransform: 'none', backgroundColor: 'black', borderRadius: '0.5rem' }}>
                Log in
            </Button>}
        </Stack>
    )
}
