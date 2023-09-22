import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { compressImage } from '@/utils/localImageProcessing';
import * as Sentry from '@sentry/react';
import { formatUri, isValidUrlWithoutProtocol } from '@/utils/formatters';
import { protectedApiCall } from '@/utils/api';

export default function ListItemForm({ onExit, triggerReload }) {
    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const bottomRef = useRef(null)
    const updatePostPhoto = async (e) => {
        const photo = e.target.files[0]
        try {
            const compressedFile = await compressImage(photo)
            setPostPhoto(compressedFile)
        } catch (e) {
            console.error(e)
            Sentry.captureException(e)
        }

    }

    const clearInputs = () => {
        setTitle("")
        setCaption("")
    }

    const onNewItem = async () => {
        setError("")
        setLoading(true)
        const body = {
            name: title,
            subtitle: caption,
            type: "list",
        }
        const result = await protectedApiCall(`/api/profile/items`, 'POST', JSON.stringify(body))
        setLoading(false)
        clearInputs()
        onExit()
        triggerReload(Date.now())
    }

    const hasContent = !!title
    return (
        <div style={{ width: "100%" }} data-cy="standard-post-form">
            <Stack alignItems="center" spacing={2} >
                <TextField data-cy="standard-post-form--title-field" style={{ width: "100%" }} size="small" label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                <TextField data-cy="standard-post-form--subtitle-field" style={{ width: "100%" }} size="small" label="Caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />
                {error && <span>{error}</span>}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                    <Button data-cy="standard-post-form--cancel-button" disabled={loading} ref={bottomRef} onClick={onExit}>Cancel</Button>
                    <Button data-cy="standard-post-form--submit-button" disabled={loading || !hasContent} onClick={onNewItem} variant="contained">Create</Button>
                </Stack>
            </Stack>
        </div >
    )
}
