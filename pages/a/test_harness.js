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
        <Link href="/demo_the_artist">The Artist</Link>
        </Stack>
        
    </div>
  )
}