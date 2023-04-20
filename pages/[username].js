import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'
import Profile from '@/components/Profile'

export default function ProfileRoute() {
    const router = useRouter()
    const { username } = router.query;
    const validHandles = ["jonathanwu"]
    if(username === undefined) {
        return <div></div>
    }
    if(!validHandles.includes(username)) {
        return <ErrorPage statusCode={404}/>
    }
    return <Profile username={username} />
}