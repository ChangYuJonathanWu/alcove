import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import FoundationIcon from '@mui/icons-material/Foundation';
import CabinIcon from '@mui/icons-material/Cabin';
import { amita } from '../fonts'

import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function AlcoveProfileLogo() {

    return (
        <Link href="/" style={{ textDecoration: 'none' }}>
            <Stack direction="row" justifyContent="center">
                <Paper sx={{ padding: '0.5rem 1rem 0.5rem 1rem', margin: '1rem', marginBottom: '0.5rem', backgroundColor: PAPER_COLOR }}>
                    <Image src="/alcove-logo-dark.svg" width={70} height={25} alt="Alcove logo" />
                </Paper>
            </Stack>
        </Link>
    )
}
