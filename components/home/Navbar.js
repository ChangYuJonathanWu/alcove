import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Logo from '@/components/home/static/alcove-logo-dark.png'
import { AppBar, Stack, Button, Box } from '@mui/material'
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" >
            <Image src={Logo}  height={mobile ? 35 : 50} alt="Alcove logo" />
            <Button variant="contained" style={{textTransform: 'none', backgroundColor: 'black', borderRadius: '0.5rem'}}>
                Log in
            </Button>
        </Stack>
    )
}
