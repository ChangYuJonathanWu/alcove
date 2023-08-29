import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { compressImage } from '@/utils/localImageProcessing';
import * as Sentry from '@sentry/react';

export default function StandardPostForm({ onExit }) {
    const [listId, setListId] = useState("")
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
    return (
        <div style={{ width: "100%" }}>
            <Stack alignItems="center" spacing={2} >

                {postPhoto &&
                    <Avatar variant="square" sx={{ height: '100%', width: "100%" }} src={URL.createObjectURL(postPhoto)} style={{ marginRight: "1rem", borderRadius: '5px' }} />
                }

                {postPhoto && <div>
                    <Button disabled={loading} onClick={() => setPostPhoto(null)} style={{ margin: 0, padding: 0 }}>Remove</Button>
                </div>}
                {!postPhoto && <Button disabled={loading} style={{ margin: 0, padding: 0, width: '100%' }} component="span">
                    <Stack justifyContent="center" alignItems="center" style={{ width: "100%", height: '8rem', border: "2px dashed", borderRadius: '1rem' }}>
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


                <TextField style={{ width: "100%" }} size="small" label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                <TextField style={{ width: "100%" }} size="small" label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} />
                <TextField style={{ width: "100%" }} size="small" multiline rows={3} label="Caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />
                <TextField onClick={scrollToBottom} style={{ width: "100%", paddingBottom: "2rem" }} size="small" label="Link" value={uri} onChange={(e) => setUri(formatUri(e.currentTarget.value))} />
                {error && <span>{error}</span>}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">

                    <Button disabled={loading} ref={bottomRef} onClick={onExit}>Cancel</Button>
                    <Button disabled={loading} variant="contained">Post</Button>
                </Stack>
            </Stack>
        </div >
    )
}
