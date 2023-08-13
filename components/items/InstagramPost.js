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

    return (
        <Stack direction="row" alignItems="center" style={{ padding: "0rem 0.5rem 0rem 0.5rem", }}>
            <InstagramEmbed url={uri} width="100%" />
            {editMode && <DeleteIcon onClick={async () => await onDeleteIgPost()} color={deleteRunning ? "action" : "black"} />}
        </Stack>
    )
}
