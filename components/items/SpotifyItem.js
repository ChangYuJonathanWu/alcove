import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import { Skeleton, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth } from "firebase/auth";

import '../../styles/Home.module.css'

export default function SpotifyItem({ item, editMode = false, triggerReload }) {
    const [loading, setLoading] = useState(true)
    const [deleteRunning, setDeleteRunning] = useState(false)
    const { id, spotify_id, spotify_type, parentId } = item
    const uri = `https://open.spotify.com/embed/${spotify_type}/${spotify_id}`

    const onDeleteSong = async () => {
        setDeleteRunning(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const result = await fetch(`/api/profile/items/${parentId}/post/${id}`, { method: "DELETE", headers })
        setDeleteRunning(false)
        triggerReload(Date.now())
    }
    return (
        <ListItem key={id} sx={{ paddingBottom: 0, paddingTop: 0 }}>
            <Stack direction="row" style={{ width: "100%" }} spacing={2} alignContent="space-between" justifyContent="space-between">
                {loading && <Skeleton height={92} style={{ width: "90%", opacity: 1, position: "absolute" }} />}
                <iframe src={uri} width="100%" height="92" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" onLoad={() => setLoading(false)}></iframe>
            </Stack>
            {editMode && <DeleteIcon color={deleteRunning ? "action" : "black"} onClick={onDeleteSong}/>
            }
        </ListItem>
    )
}