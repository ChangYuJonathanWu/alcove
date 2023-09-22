import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { compressImage } from '@/utils/localImageProcessing';
import * as Sentry from '@sentry/react';
import { formatUri, isValidUrlWithoutProtocol } from '@/utils/formatters';
import { protectedApiCall } from '@/utils/api';

export default function LinkItemForm({ onExit, triggerReload }) {
    const [name, setName] = useState("")
    const [uri, setUri] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

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
        setName("")
        setUri("")
    }

    const onNewItem = async () => {
        setError("")
        if(linkAddress && !isValidUrlWithoutProtocol(linkAddress)) {
            setError("Please enter a valid link")
            return
        }
        setLoading(true)
        const body = {
            name: name,
            uri,
            type: "uri",
        }
        const result = await protectedApiCall(`/api/profile/items`, 'POST', JSON.stringify(body))
        setLoading(false)
        clearInputs()
        onExit()
        triggerReload(Date.now())
    }

    const hasContent = !!name
    return (
        <div style={{ width: "100%" }} data-cy="link-item-form">
            <Stack alignItems="center" spacing={2} >
                <TextField data-cy="link-item-form--title-field" style={{ width: "100%" }} size="small" label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                <TextField data-cy="link-item-form--uri-field" style={{ width: "100%" }} size="small" label="Link" value={uri} onChange={(e) => setUri(formatUri(e.currentTarget.value))} />
                {error && <span>{error}</span>}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                    <Button data-cy="link-item-form--cancel-button" disabled={loading} onClick={onExit}>Cancel</Button>
                    <Button data-cy="link-item-form--submit-button" disabled={loading || !hasContent || !isValidUrlWithoutProtocol(uri)} onClick={onNewItem} variant="contained">Create</Button>
                </Stack>
            </Stack>
        </div >
    )
}
