import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'
import Profile from '@/components/Profile'
import jonathan_user from '../examples/jonathan.json'
import jiwonkang_user from '../examples/jiwon.json'
import example_user from '../examples/example.json'

export default function ProfileRoute() {
    const router = useRouter()
    const [ loading, setLoading ] = useState(true)
    const [ user, setUser ] = useState(null)
    const { username } = router.query;

    const determineHardcodedUser = (username) => {
        switch (username) {
            case "jonathanwu":
                return jonathan_user
            case "jiwonkang":
                return jiwonkang_user
            case "gracehopper":
                return example_user
            default:
                return example_user
        }
    }

    useEffect(() => {
        if(!username) {
            return
        }
        const validHandles = ["jonathanwu", "gracehopper", "jiwonkang", "jonathanwu_test"]
        const networkHandles = ["jonathanwu_test"]
        const loadUser = async () => {
            if(!validHandles.includes(username)){
                setLoading(false)
                return
            }
            if(networkHandles.includes(username)){
                const result = await fetch(`/api/profile?handle=${username}`, { method: "GET"})
                const profile = await result.json()
                setUser(profile)
                setLoading(false)
                return
            }
            setUser(determineHardcodedUser(username))
            setLoading(false)
        }
        loadUser()
    }, [username])

    if(loading) {
        return <div></div> // loading animation should go here
    }

    return user ? <Profile user={user} /> : <ErrorPage statusCode={404}/>
}