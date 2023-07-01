import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

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
import { firebaseAdmin } from '@/lib/firebase-admin';
import nookies from 'nookies';

import { getPublicProfile } from '@/lib/api/profile'

const TEST_USER = "jHak91janUhqmOakso"
const TEST_USER_NO_SPOTIFY = "239jsdfk9Q2jjsk_no_spotify"

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

export const getServerSideProps = async (context) => {
    let loggedInUid = null
    const username = context.params.username
    try {
        const cookies = nookies.get(context)
        const tokenFromCookie = cookies.token
        if(!tokenFromCookie) {
            console.log("Missing token from cookie!")
        }
        if(tokenFromCookie) {
            const token = await firebaseAdmin.auth().verifyIdToken(tokenFromCookie)
            const { uid } = token
            loggedInUid = uid
        }
        
    } catch (err) {
        console.log(err)
        const { errorInfo } = err
        if (errorInfo.code === "auth/id-token-expired") {
            return {
                redirect: {
                    permanent: false,
                    destination: `/a/${username}`,
                }
            }
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: `/login`,
                }
            }
        }
    }

    const hardcodedUsers = ["jonathanwu_hardcoded", "gracehopper", TEST_USER, TEST_USER_NO_SPOTIFY]
    const test_users = [TEST_USER, TEST_USER_NO_SPOTIFY]
    if (hardcodedUsers.includes(username)) {
        const hardcodedUser = determineHardcodedUser(username)
        return {
            props: {
                profile: hardcodedUser,
                ownerSignedIn: test_users.includes(username) 
            }
        }
    }

    const profile = await getPublicProfile(username)
    const ownerSignedIn = loggedInUid && (loggedInUid === profile?.uid)
    if (profile) {
        profile["_id"] = null
    }
    return {
        props: {
            profile,
            ownerSignedIn
        }
    }
}


export default function ProfileRoute({ profile, ownerSignedIn }) {
    const router = useRouter()
    const user = profile
    if (!user) {
        return <ErrorPage statusCode={404} />
    }
    const { title, handle, description, photo } = user

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
            <Profile user={user} ownerSignedIn={ownerSignedIn} />
        </>
    )
}