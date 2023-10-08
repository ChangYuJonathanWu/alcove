import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoUploadButton from '@/components/custom/PhotoUploadButton';
import { compressImage } from '@/utils/localImageProcessing';
import * as Sentry from '@sentry/react';
import { formatUri, isValidUrlWithoutProtocol } from '@/utils/formatters';
import { protectedApiCall } from '@/utils/api';

export default function StandardPostForm({ onExit, listId, clearItems, triggerReload, photoMode = false }) {
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [caption, setCaption] = useState("")
    const [loading, setLoading] = useState(false)
    const [uri, setUri] = useState("")
    const [postPhoto, setPostPhoto] = useState(null)
    const [error, setError] = useState("")
    const [photoError, setPhotoError] = useState("")
    const [photoConversionInProgress, setPhotoConversionInProgress] = useState(false)

    const bottomRef = useRef(null)
    const scrollToBottom = () => {
        setTimeout(() => bottomRef.current.scrollIntoView({ behavior: "smooth" }), 500)
    }
    const updatePostPhoto = async (e) => {
        const photo = e.target.files[0]
        e.target.value = ""
        setPhotoError("")
        setPhotoConversionInProgress(true)
        try {
            const compressedFile = await compressImage(photo)
            setPostPhoto(compressedFile)

        } catch (e) {

            if (photo.type === "image/heic" || photo.type === "image/heif") {
                setPhotoError("Sorry, we couldn't use that photo. Please try a different photo.")
                setPhotoConversionInProgress(false)
                return
            }
            setPostPhoto(photo)
            console.error("Could not compress post photo - using original.")
            console.error(e)
            Sentry.captureException(e)

        }
        setPhotoConversionInProgress(false)

    }

    const clearPostItems = () => {
        setPhotoError("")
        setError("")
        setTitle("")
        setSubtitle("")
        setCaption("")
        setUri("")
        setPostPhoto(null)
    }

    const onPost = async () => {
        setError("")
        setPhotoError("")
        if (uri && !isValidUrlWithoutProtocol(uri)) {
            setError("Please enter a valid link")
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("postType", "standard")
        formData.append("photo", postPhoto)
        formData.append("title", title)
        formData.append("subtitle", subtitle)
        formData.append("caption", caption)
        formData.append("uri", uri)

        const result = await protectedApiCall(`/api/profile/items/${listId}/post`, 'POST', formData)
        setLoading(false)
        if (result.status !== 200) {
            console.error("Error posting. Try again. Status: " + result.status)
            try {
                const parsedResult = await result.json()
                setError(parsedResult.error ?? "Error posting. Try again")
            } catch (e) {
                setError("Error posting. Try again")
                Sentry.captureException(e)
            }
            return
        }
        // TODO: If request failed, dont clear everything here
        clearPostItems()
        clearItems()
        triggerReload(Date.now())
    }

    const hasContent = photoMode ? postPhoto : (title || subtitle || caption || uri || postPhoto)

    return (
        <div style={{ width: "100%" }} data-cy="standard-post-form">
            <Stack alignItems="center" spacing={2} >
                {postPhoto &&
                    <Avatar variant="square" sx={{ height: '100%', width: "100%" }} src={URL.createObjectURL(postPhoto)} style={{ borderRadius: '0.5rem' }} />
                }
                {postPhoto && <div>
                    <Button disabled={loading} onClick={() => setPostPhoto(null)} style={{ margin: 0, padding: 0 }}>Remove</Button>
                </div>}
                {!postPhoto &&
                    <PhotoUploadButton loading={loading || photoConversionInProgress} onPhotoChange={updatePostPhoto} height={photoMode ? "12rem" : "8rem"} />
                }
                {photoError && <span>{photoError}</span>}
                {!photoMode && <TextField data-cy="standard-post-form--title-field" style={{ width: "100%" }} size="small" label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />}
                {!photoMode && <TextField data-cy="standard-post-form--subtitle-field" style={{ width: "100%" }} size="small" label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} />}
                <TextField data-cy="standard-post-form--caption-field" style={{ width: "100%" }} size="small" multiline rows={3} label="Caption (optional)" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />
                {!photoMode && <TextField data-cy="standard-post-form--link-field" onClick={scrollToBottom} style={{ width: "100%", paddingBottom: "2rem" }} size="small" label="Link" value={uri} onChange={(e) => setUri(formatUri(e.currentTarget.value))} />}
                {error && <span>{error}</span>}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                    <Button data-cy="standard-post-form--cancel-button" disabled={loading} ref={bottomRef} onClick={onExit}>Cancel</Button>
                    <Button data-cy="standard-post-form--submit-button" disabled={loading || !hasContent} onClick={onPost} variant="contained">Post</Button>
                </Stack>
            </Stack>
        </div >
    )
}
