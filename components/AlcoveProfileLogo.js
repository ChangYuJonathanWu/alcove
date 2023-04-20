import React from 'react'
import Head from 'next/head'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { Inter } from 'next/font/google';
import FoundationIcon from '@mui/icons-material/Foundation';
import CabinIcon from '@mui/icons-material/Cabin';

import GoogleFontLoader from 'react-google-font-loader';

import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function AlcoveProfileLogo() {

    return (
        <>
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Amita',
                        weights: [400, 700],
                    },
                ]}
            />
            <Link href="/" style={{ textDecoration: 'none' }}>
                <Stack direction="row" justifyContent="center">
                    <Paper sx={{ paddingLeft: '2rem', paddingRight: '2rem', margin: '1rem', marginBottom: '0.5rem', backgroundColor: PAPER_COLOR }}>
                        <Stack direction="row" spacing={0.5} alignItems="flex-end" style={{ padding: "1rem" }}>
                            <FoundationIcon />
                            <Typography style={{fontFamily: 'Amita', fontWeight: 700}}variant="body1">alcove</Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Link>

        </>


    )
}
