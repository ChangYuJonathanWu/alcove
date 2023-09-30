import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import { Skeleton, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth } from "firebase/auth";
import '../../styles/Home.module.css'
import { protectedApiCall } from '@/utils/api';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function YouTubePost({ item, editMode = false, triggerReload, noPadding = false }) {
    const [deleteRunning, setDeleteRunning] = useState(false)
    const { id, youtubeId, parentId } = item


    const onDeleteSong = async () => {
        setDeleteRunning(true)
        const result = await protectedApiCall(`/api/profile/items/${parentId}/post/${id}`, 'DELETE')
        setDeleteRunning(false)
        triggerReload(Date.now())
    }



    if (noPadding) {
        styleOverride["padding"] = 0
    }

    const containerStyle = { margin: "0rem 1rem 1rem 1rem", height: editMode ? "275px" : "225px", backgroundColor: 'white', borderRadius: '1rem', borderBottom: '1px #ebebeb solid' }
    return (
        <Stack direction="column" alignItems="center" style={containerStyle}>
            <div style={{width: '100%', marginBottom: '0.5rem'}}>
                <iframe style={{borderRadius: '1rem',}} width="100%" height="225" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>

            {editMode && <DeleteIcon color={deleteRunning ? "action" : "black"} onClick={onDeleteSong} />}
        </Stack>
    )
}