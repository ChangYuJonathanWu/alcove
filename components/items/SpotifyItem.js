import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SpotifyItem({ item }) {
    const [loading, setLoading] = useState(true)
    const { itemId, uri } = item
    return (
        <ListItem key={itemId} sx={{paddingBottom: 0, paddingTop: 0}}>
            {
                loading && <Skeleton height={92} style={{zIndex: 100}}/>
            }
            <iframe src={uri} width="100%" height="92" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" onLoad={()=>setLoading(false)}></iframe>
        </ListItem>
    )
}