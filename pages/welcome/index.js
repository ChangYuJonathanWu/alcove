import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react'

export default function WelcomeRedirect() {
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {

            router.replace('/login')
        }

    }, [router])

    return (
        <div>

        </div>
    )
}