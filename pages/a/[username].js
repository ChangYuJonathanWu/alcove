import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react'
import { useAuthContext } from "@/context/AuthContext";
import ProfileLoader from '@/components/profile/ProfileLoader';


export default function RefreshToken() {
    const { user, authReady } = useAuthContext()
    const router = useRouter();

    useEffect(() => {
        const refreshTokenAndRedirect = async () => {
            const redirectUser = router.query.username
            if (user) {
                await user.getIdToken()
            }
            router.replace(`/${redirectUser}`, undefined, { shallow: true })
            return
        }
        router.isReady && authReady && refreshTokenAndRedirect()
    }, [user, authReady, router])

    return <ProfileLoader />
}