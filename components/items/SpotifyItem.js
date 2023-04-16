import React from 'react'
import ListItem from '@mui/material/ListItem';

export default function SpotifyItem({ item }) {
    const { itemId, uri } = item
    return (
        <ListItem key={itemId} sx={{paddingBottom: 0, paddingTop: 0}}>
            <iframe src={uri} width="100%" height="92" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </ListItem>
    )
}