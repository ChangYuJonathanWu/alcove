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

export default function ProfileRoute() {
    const router = useRouter()
    const [ loading, setLoading ] = useState(true)
    const [ user, setUser ] = useState(null)
    const [ loadTime, setLoadTime ]= useState(Date.now())
    const { username } = router.query;

    const determineHardcodedUser = (username) => {
        switch (username) {
            case "jonathanwu":
                return jonathan_user
            case "dandan":
                return dan_user
            case "gracehopper":
                return example_user
            case "jHak91janUhqmOakso":
                return test_user
            default:
                return example_user
        }
    }

    useEffect(() => {
        if(!username) {
            return
        }
        setLoading(true)
        const validHandles = ["jonathanwu", "gracehopper", "jiwonkang", "jonathanwu_test", "dandan", "jHak91janUhqmOakso"]
        const networkHandles = ["jonathanwu_test", "jiwonkang"]
        const loadUser = async () => {
            if(!validHandles.includes(username)){
                setLoading(false)
                return
            }
            if(networkHandles.includes(username)){
                const result = await fetch(`/api/public/profile?handle=${username}`, { method: "GET"})
                const profile = await result.json()
                setUser(profile)
                setLoading(false)
                return
            }
            setUser(determineHardcodedUser(username))
            setLoading(false)
        }
        loadUser()
    }, [username, loadTime])

    if(loading) {
        return <ProfileLoader/>
    }

    return user ? <Profile user={user} triggerReload={setLoadTime}/> : <ErrorPage statusCode={404}/>
}