import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button, Divider, Typography } from '@mui/material';
import FoundationIcon from '@mui/icons-material/Foundation';
import CabinIcon from '@mui/icons-material/Cabin';


import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function AlcoveProfileLogo({ mobileApp = false }) {
    const logo = <Image src="/alcove-logo.svg" width={80} height={50} alt="Alcove logo" />

    return (
        <Stack direction="row" justifyContent="center" style={{ width: '100%', marginTop: '2rem' }}>
            <Stack alignItems="center" style={{ width: '100%' }}>
                {mobileApp ? logo :
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        {logo}
                    </Link>
                }
            </Stack>
        </Stack>
    )
}
