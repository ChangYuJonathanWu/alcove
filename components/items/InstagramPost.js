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
    const standardStyle = { margin: "1rem", backgroundColor: '#fafafa', borderRadius: '1rem', borderBottom: '1px #ebebeb solid' }
    const editModeStyle = { margin: "0rem 1rem 1rem 1rem", paddingBottom: '1rem', backgroundColor: 'white', borderRadius: '1rem', borderBottom: '1px #ebebeb solid' }
    return (
        <Stack direction="column" alignItems="center" style={editMode ? editModeStyle : standardStyle}>
            <iframe src={`${uri}embed`} width="100%" height="500"  frameBorder="0" scrolling="no" allowtransparency="true" style={{borderRadius: editMode ? "1rem 1rem 0rem 0rem" :'1rem'}}></iframe>
            {editMode && <DeleteIcon onClick={async () => await onDeleteIgPost()} color={deleteRunning ? "action" : "black"} />}
        </Stack>
    )
}
