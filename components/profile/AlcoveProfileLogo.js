import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button, Divider, Typography } from '@mui/material';
import FoundationIcon from '@mui/icons-material/Foundation';
import CabinIcon from '@mui/icons-material/Cabin';
import { Capacitor } from '@capacitor/core';


import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function AlcoveProfileLogo() {

    return (
        <Stack direction="row" justifyContent="center" style={{ width: '100%', marginTop: '2rem' }}>
            <Stack alignItems="center" style={{ width: '100%' }}>
                {Capacitor.isNativePlatform() ?
                    <Image src="/alcove-logo.svg" width={80} height={50} alt="Alcove logo" />
                    :
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Image src="/alcove-logo.svg" width={80} height={50} alt="Alcove logo" />
                    </Link>
                }
            </Stack>
        </Stack>

    )
}
