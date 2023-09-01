import React, { useState } from 'react'
import { InstagramEmbed } from 'react-social-media-embed';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { protectedApiCall } from '@/utils/api';
import useBetterMediaQuery from '@/utils/useBetterMediaQuery'


const MINI_MODE_HEIGHT = "175px"
export default function InstagramPost({ item, editMode = false, triggerReload, miniMode = false }) {
    const { id, uri, parentId } = item
    const [deleteRunning, setDeleteRunning] = useState(false)

    const small = useBetterMediaQuery('(max-width: 405px)')
    const xsmall = useBetterMediaQuery('(max-width: 390px)')
    const onDeleteIgPost = async () => {
        setDeleteRunning(true)
        const result = await protectedApiCall(`/api/profile/items/${parentId}/post/${id}`, 'DELETE')
        setDeleteRunning(false)
        triggerReload(Date.now())
    }
    // Show a gradient in minimode
    const containerStyle = miniMode ? {
        position: 'relative', width: '100%', height: MINI_MODE_HEIGHT
    } : { margin: "0rem 1rem 1rem 1rem", backgroundColor: 'white', borderRadius: '1rem', borderBottom: '1px #ebebeb solid' }
    const igFrameStyle = miniMode ? {
        height: MINI_MODE_HEIGHT
    } : {
        borderRadius: editMode ? "1rem 1rem 0rem 0rem" : '1rem',
        minHeight: xsmall ? "438px" : small ? '450px' : '480px',

    }
    return (
        <Stack direction="column" alignItems="center" style={containerStyle}>
            {/* Add gradient overlay on top */}
            {miniMode && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: MINI_MODE_HEIGHT, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)' }}></div>}
            <iframe src={`${uri}embed`} width="100%" frameBorder="0" scrolling="yes" allowtransparency="true" style={igFrameStyle}></iframe>
            {editMode && <DeleteIcon style={{ margin: '1rem' }} onClick={async () => await onDeleteIgPost()} color={deleteRunning ? "action" : "black"} />}
        </Stack>
    )
}
