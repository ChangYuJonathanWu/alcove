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
import ProfileLoader from '@/components/profile/ProfileLoader'

import { getPublicProfile } from '@/lib/api/profile'

export const getServerSideProps = async (context) => {
    const username = context.params.username

    const profile = await getPublicProfile(username, null)
    if (profile) {
        profile["_id"] = null
    }
    return {
        props: {
            profile
        }
    }
}


export default function ProfileRoute({ profile }) {
    const router = useRouter()
    const user = profile
    if (!user) {
        return <ErrorPage statusCode={404} />
    }
    const { title, handle, description } = user

    const determineHardcodedUser = (username) => {
        switch (username) {
            case "jonathanwu_hardcoded":
                return jonathan_user
            case "gracehopper":
                return example_user
            case "jHak91janUhqmOakso":
                return test_user
            default:
                return example_user
        }
    }

    return (
        <>
            <Head>
                <title>{`${title} (@${handle}) - alcove`}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={`${title} - @${handle} - Alcove`} />
                <meta
                    property="og:image"
                    content="/social-share-profile.png"
                />
                <meta
                    property="og:description"
                    content={`See @${handle}'s profile on Alcove`}
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Profile user={user} />
        </>
    )
}