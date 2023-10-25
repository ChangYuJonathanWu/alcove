import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLoader from '@/components/DefaultLoader'

export default function Launch() {
    // get the URI parameter from the url and redirect to it
    const router = useRouter()
    const { uri } = router.query
    useEffect(() => {
        if (uri) {
            router.replace(uri)
        }
    }, [uri, router])


  return (
    <DefaultLoader/>
  )
}
