import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import { Skeleton, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth } from "firebase/auth";
import '../../styles/Home.module.css'
import { protectedApiCall } from '@/utils/api';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function YouTubePost({ item, editMode = false, triggerReload, noPadding = false }) {
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

    const containerStyle = { margin: "0rem 1rem 1rem 1rem", padding: "1.5rem 1rem 0rem 1rem", minHeight: editMode ? "275px" : "215px", backgroundColor: 'white', borderRadius: '1rem', borderBottom: '1px #ebebeb solid' }
    return (
        <Stack direction="column" alignItems="center" style={containerStyle}>
            <div style={{width: '100%', marginBottom: '0.5rem'}}>
                <iframe style={{borderRadius: '0.5rem',}} width="100%" height="215" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div style={{width: '100%'}}>
                <Typography variant="caption" style={{ whiteSpace: "pre-wrap" }} >{caption}</Typography>
            </div>
            {editMode && <DeleteIcon style={{padding: '0.5rem'}} color={deleteRunning ? "action" : "black"} onClick={onDeleteSong} />}
        </Stack>
    )
}