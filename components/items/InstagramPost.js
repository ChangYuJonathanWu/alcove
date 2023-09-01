import React, { useState } from 'react'
import { InstagramEmbed } from 'react-social-media-embed';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { protectedApiCall } from '@/utils/api';

export default function InstagramPost({ item, editMode = false, triggerReload }) {
    const { id, uri, parentId } = item
    const [deleteRunning, setDeleteRunning] = useState(false)

    const onDeleteIgPost = async () => {
        setDeleteRunning(true)
        const result = await protectedApiCall(`/api/profile/items/${parentId}/post/${id}`, 'DELETE')
        setDeleteRunning(false)
        triggerReload(Date.now())
    }
    const standardStyle = { margin: "0rem 1rem 1rem 1rem", padding: "1rem", paddingBottom: ".5rem", backgroundColor: '#fafafa', borderRadius: '1rem', borderBottom: '1px #ebebeb solid' }
    const editModeStyle = { margin: "0rem 1rem 1rem 1rem", padding: '1rem', paddingBottom: '1rem', backgroundColor: '#fafafa', borderRadius: '1rem', borderBottom: '1px #ebebeb solid' }
    return (
        <Stack direction="column" alignItems="center" style={editMode ? editModeStyle : standardStyle}>
            <InstagramEmbed url={uri} width="100%"/>
            {editMode && <DeleteIcon onClick={async () => await onDeleteIgPost()} color={deleteRunning ? "action" : "black"} />}
        </Stack>
    )
}
