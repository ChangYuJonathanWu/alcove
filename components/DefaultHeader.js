import React from 'react'
import Head from 'next/head'

export default function DefaultHeader({title}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Your link-in-bio to share everything you love." />
            <meta property="og:title" content={title} />
         
            <meta
                property="og:description"
                content="Your link-in-bio to share everything you love."
            />
            <meta
                property="og:image"
                content="/social-share.png"
            />
               <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta>
            <link rel="icon" href="/images/favicon.svg" />
        </Head>
    )
}
