import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import AlcoveProfileLogo from './AlcoveProfileLogo';

export default function ProfileLoader() {
  return (
    <Stack style={{width: "100%", marginTop: '1rem'}} alignItems={"center"} spacing={4}>
        <Skeleton variant="rounded" width={220} height={220} />
        <Skeleton variant="rounded" style={{maxWidth: "600px", width: "90%", height: "3rem"}} />
        <Skeleton variant="rounded" style={{maxWidth: "600px", width: "90%", height: "3rem"}} />
        <Skeleton variant="rounded" style={{maxWidth: "600px", width: "90%", height: "3rem"}} />
        <Skeleton variant="rounded" style={{maxWidth: "600px", width: "90%", height: "3rem"}} />
        <AlcoveProfileLogo/>
    </Stack>
  )
}
