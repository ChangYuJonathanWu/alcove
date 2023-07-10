import React, { useState } from 'react'
import Home from '@/components/home/Home'
import Dashboard from '@/components/dashboard/Dashboard'
import { useAuthContext } from "@/context/AuthContext";
import Link from 'next/link';
import { Stack } from '@mui/material';

export default function TestHarness() {

    return (
        <div>
            <Stack>
                <Link href="/239jsdfk9Q2jjsk_no_spotify">Profile: No Spotify</Link>
                <Link href="/demo_the_artist">The Artist: demo1</Link>
                <Link href="/demo_the_foodie">The Foodie: demo2</Link>
                <Link href="/demo_the_outdoors">The Outdoors: demo3</Link>
                <Link href="/demo_the_baker">The Baker: demo4</Link>
                <Link href="/demo_the_hacker">The Hacker: demo5</Link>
                <Link href="/demo_the_generalist">The Generalist: demo6</Link>
                <Link href="/demo_the_reader">The Reader: demo7</Link>
                
            </Stack>

        </div>
    )
}