import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import { Skeleton } from '@mui/material';

import '../../styles/Home.module.css'

export default function SpotifyItem({ item }) {
    const [loading, setLoading] = useState(true)
    const { itemId, spotify_id, spotify_type } = item
    const uri = `https://open.spotify.com/embed/${spotify_type}/${spotify_id}`
    return (
        <ListItem key={itemId} sx={{ paddingBottom: 0, paddingTop: 0 }}>
            {loading && <Skeleton height={92} style={{ width: "90%", opacity: 1, position: "absolute"}} />}
            <iframe src={uri} width="100%" height="92" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" onLoad={() => setLoading(false)}></iframe>
        </ListItem>
    )
}