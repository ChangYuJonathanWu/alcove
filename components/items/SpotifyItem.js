import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import { Skeleton, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth } from "firebase/auth";

import '../../styles/Home.module.css'

export default function SpotifyItem({ item, editMode = false, triggerReload, noPadding = false }) {
    const [deleteRunning, setDeleteRunning] = useState(false)
    const { id, spotifyId, spotifyType, parentId } = item
    const uri = `https://open.spotify.com/embed/${spotifyType}/${spotifyId}`

    const onDeleteSong = async () => {
        setDeleteRunning(true)
        const result = await fetch(`/api/profile/items/${parentId}/post/${id}`, { method: "DELETE" })
        setDeleteRunning(false)
        triggerReload(Date.now())
    }

    const styleOverride = {
        paddingBottom: 0,
        paddingTop: 0
    }

    if (noPadding) {
        styleOverride["padding"] = 0
    }
    return (
        <ListItem key={id} sx={styleOverride}>
            <Stack direction="row" style={{ width: "100%" }} spacing={2} alignContent="space-between" justifyContent="space-between">
                <iframe src={uri} width="100%" height="92" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </Stack>
            {editMode && <DeleteIcon color={deleteRunning ? "action" : "black"} onClick={onDeleteSong}/>
            }
        </ListItem>
    )
}