import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { compressImage } from '@/utils/localImageProcessing';
import * as Sentry from '@sentry/react';
import { formatUri, isValidUrlWithoutProtocol } from '@/utils/formatters';
import { protectedApiCall } from '@/utils/api';

export default function StandardPostForm({ onExit, listId, clearItems, triggerReload }) {
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [caption, setCaption] = useState("")
    const [loading, setLoading] = useState(false)
    const [uri, setUri] = useState("")
    const [postPhoto, setPostPhoto] = useState(null)
    const [error, setError] = useState("")

    const bottomRef = useRef(null)
    const scrollToBottom = () => {
        setTimeout(() => bottomRef.current.scrollIntoView({ behavior: "smooth" }), 500)
    }
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

    const clearPostItems = () => {
        setTitle("")
        setSubtitle("")
        setCaption("")
        setUri("")
        setPostPhoto(null)
    }

    const onPost = async () => {
        setError("")
        if(uri && !isValidUrlWithoutProtocol(uri)) {
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

    const hasContent = title || subtitle || caption || uri || postPhoto
    return (
        <div style={{ width: "100%" }} data-cy="standard-post-form">
            <Stack alignItems="center" spacing={2} >

                {postPhoto &&
                    <Avatar variant="square" sx={{ height: '100%', width: "100%" }} src={URL.createObjectURL(postPhoto)} style={{ borderRadius: '0.5rem' }} />
                }

                {postPhoto && <div>
                    <Button disabled={loading} onClick={() => setPostPhoto(null)} style={{ margin: 0, padding: 0 }}>Remove</Button>
                </div>}
                {!postPhoto && <Button disabled={loading} style={{ margin: 0, padding: 0, width: '100%' }} component="span">
                    <Stack data-cy="standard-post-form--image-field" justifyContent="center" alignItems="center" style={{ width: "100%", height: '8rem', border: "2px dashed", borderRadius: '1rem' }}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="post-photo-upload"
                            type="file"
                            onChange={updatePostPhoto}
                        />
                        <label htmlFor="post-photo-upload">
                            <Stack alignItems="center" spacing={4}>
                                <AddPhotoAlternateIcon />
                                Add Photo
                            </Stack>


                        </label>

                    </Stack>
                </Button>
                }

                <TextField data-cy="standard-post-form--title-field" style={{ width: "100%" }} size="small" label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                <TextField data-cy="standard-post-form--subtitle-field" style={{ width: "100%" }} size="small" label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} />
                <TextField data-cy="standard-post-form--caption-field" style={{ width: "100%" }} size="small" multiline rows={3} label="Caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />
                <TextField data-cy="standard-post-form--link-field" onClick={scrollToBottom} style={{ width: "100%", paddingBottom: "2rem" }} size="small" label="Link" value={uri} onChange={(e) => setUri(formatUri(e.currentTarget.value))} />
                {error && <span>{error}</span>}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">

                    <Button data-cy="standard-post-form--cancel-button" disabled={loading} ref={bottomRef} onClick={onExit}>Cancel</Button>
                    <Button data-cy="standard-post-form--submit-button" disabled={loading || !hasContent} onClick={onPost} variant="contained">Post</Button>
                </Stack>
            </Stack>
        </div >
    )
}
