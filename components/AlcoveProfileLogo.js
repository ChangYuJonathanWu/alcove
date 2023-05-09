import React from 'react'
import Head from 'next/head'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { Amita } from 'next/font/google';
import FoundationIcon from '@mui/icons-material/Foundation';
import CabinIcon from '@mui/icons-material/Cabin';

import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

const amita = Amita({ weight: ['400'], subsets: ['latin'], display: 'swap' })

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function AlcoveProfileLogo() {

    return (
            <Link href="/" style={{ textDecoration: 'none' }}>
                <Stack direction="row" justifyContent="center">
                    <Paper sx={{ paddingLeft: '2rem', paddingRight: '2rem', margin: '1rem', marginBottom: '0.5rem', backgroundColor: PAPER_COLOR }}>
                        <Stack direction="row" spacing={0.5} alignItems="flex-end" style={{ padding: "1rem"}}>
                            <FoundationIcon />
                            <Typography style={{ fontWeight: 400 }} className={amita.className} variant="body1">alcove</Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Link>
    )
}
