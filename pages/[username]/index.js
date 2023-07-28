import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import ErrorPage from 'next/error'
import Profile from '@/components/profile/Profile'
import jonathan_user from '@/examples/jonathan.json'
import jiwonkang_user from '@/examples/jiwon.json'
import example_user from '@/examples/example.json'
import dan_user from '@/examples/dan.json'
import test_user from '@/examples/test_profile.json'
import test_user_no_spotify from '@/examples/test_profile_no_spotify.json'
import ProfileLoader from '@/components/profile/ProfileLoader'
import { useAuthContext } from "@/context/AuthContext";
import nookies from 'nookies';
import { getAuth } from 'firebase/auth'

import { getPublicProfile } from '@/lib/api/profile'
import DefaultLoader from '@/components/DefaultLoader'

const TEST_USER = "jHak91janUhqmOakso"
const TEST_USER_NO_SPOTIFY = "239jsdfk9Q2jjsk_no_spotify"

const DynamicProfile = dynamic(() => import('@/components/profile/Profile'), {
    loading: () => <ProfileLoader />
})

const determineHardcodedUser = (username) => {
    switch (username) {
        case "jonathanwu_hardcoded":
            return jonathan_user
        case "gracehopper":
            return example_user
        case TEST_USER:
            return test_user
        case TEST_USER_NO_SPOTIFY:
            return test_user_no_spotify
        default:
            return example_user
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}


export const getStaticProps = async (context) => {
    const username = context.params.username

    const hardcodedUsers = ["jonathanwu_hardcoded", "gracehopper", TEST_USER, TEST_USER_NO_SPOTIFY]
    const test_users = [TEST_USER, TEST_USER_NO_SPOTIFY]
    if (hardcodedUsers.includes(username)) {
        const hardcodedUser = determineHardcodedUser(username)
        return {
            props: {
                profile: hardcodedUser,
            }
        }
    }

    const profile = await getPublicProfile(username)

    return {
        props: {
            profile
        },
        revalidate: 1
    }
}



export default function ProfileRoute({ profile }) {
    const router = useRouter()
    const { user } = useAuthContext()
    const [ownerSignedIn, setOwnerSignedIn] = useState(false)

    useEffect(() => {
        if (router.isFallback || !profile) {
            return
        }
        // Check if owner is signed in
        const checkOwnerSignedIn = async () => {
            const auth = getAuth()
            if (user) {
                const { uid } = user
                if (uid === profile.uid) {
                    setOwnerSignedIn(true)
                }
            }
        }
        checkOwnerSignedIn()
    })

    if (router.isFallback) {
        return <DefaultLoader/>
    }
    if (!profile) {
        return <ErrorPage statusCode={404} />
    }
    const { title, handle, description, photo } = profile


    return (
        <>
            <Head>
                <title>{`${title} (@${handle}) - alcove`}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={`${title} - @${handle} - Alcove`} />
                <meta
                    property="og:image"
                    content={photo ?? "/social-share-profile.png"}
                />
                <meta
                    property="og:description"
                    content={`See @${handle}'s profile on Alcove`}
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <DynamicProfile user={profile} ownerSignedIn={ownerSignedIn} />
        </>
    )
}