import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import { Skeleton, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth } from "firebase/auth";
import '../../styles/Home.module.css'
import { protectedApiCall } from '@/utils/api';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function YouTubePost({ item, editMode = false, triggerReload, noPadding = false, miniMode = false }) {
    const [deleteRunning, setDeleteRunning] = useState(false)
    const { id, youtubeId, caption, parentId } = item


    const onDeleteSong = async () => {
        setDeleteRunning(true)
        const result = await protectedApiCall(`/api/profile/items/${parentId}/post/${id}`, 'DELETE')
        setDeleteRunning(false)
        triggerReload(Date.now())
    }



    if (noPadding) {
        styleOverride["padding"] = 0
    }

    const containerStyle = { margin: "0rem 1rem 1rem 1rem", padding: caption ? `1.5rem 1rem ${editMode ? '0.5rem' : '1rem'} 1rem` : `0rem 0rem ${editMode ? '0.5rem' : '0rem'} 0rem`, backgroundColor: caption || editMode ? 'white' : 'transparent', borderRadius: '1rem', borderBottom: caption || editMode ? '1px #ebebeb solid' : 'none' }
    return (
        <Stack direction="column" alignItems="center" justifyContent="space-between" style={containerStyle}>
            <div style={{ width: '100%', }}>
                <iframe style={{ borderRadius: caption ? '0.5rem' : '1rem', }} width={ miniMode ? '200' : "100%"} height={miniMode ? 150 : 215} src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            {caption && <div style={{ width: '100%', margin: '0.5rem 0rem 0rem 0rem' }}>
                <Typography variant="caption" style={{ whiteSpace: "pre-wrap" }} >{caption}</Typography>
            </div>}

            {editMode && <DeleteIcon style={{ padding: '0.5rem' }} color={deleteRunning ? "action" : "black"} onClick={onDeleteSong} />}
        </Stack>
    )
}