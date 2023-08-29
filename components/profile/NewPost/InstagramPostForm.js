import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { compressImage } from '@/utils/localImageProcessing';
import * as Sentry from '@sentry/react';
import { formatUri, isValidUrlWithoutProtocol } from '@/utils/formatters';
import { protectedApiCall } from '@/utils/api';

export default function InstagramPostForm({ onExit, listId, clearItems, triggerReload }) {
    const [loading, setLoading] = useState(false)
    const [instagramUri, setInstagramUri] = useState("")
    const [validInstagramUri, setValidInstagramUri] = useState(false)
    const [error, setError] = useState("")

    const bottomRef = useRef(null)
    const scrollToBottom = () => {
        setTimeout(() => bottomRef.current.scrollIntoView({ behavior: "smooth" }), 500)
    }
    const onInstagramUriChange = (e) => {
        const uri = e.target.value
        setInstagramUri(uri)
        // Validate instagram URI for post or reel with www optional
        const regex = /\bhttps:\/\/(www\.)?instagram\.com\/(p|reel)\/([a-zA-Z0-9_-]*)\//
        const valid = regex.test(uri)
        setValidInstagramUri(valid)
    }

    const clearPostItems = () => {
        setInstagramUri("")
        setValidInstagramUri(false)
    }

    const onPost = async () => {
        setError("")
        setLoading(true)
        const formData = new FormData()
        formData.append("postType", "instagram")
        formData.append("instagramUri", instagramUri)

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

        clearItems()
        triggerReload(Date.now())
    }

    return (
        <div style={{ width: "100%" }}>
            <Stack alignItems="center" spacing={2} >
                <Stack spacing={2}>
                    <Typography variant="subtitle2" style={{color: 'grey'}}>Share an Instagram post. The post can be from any public profile including your own.</Typography>
                    <TextField style={{ width: "100%" }} size="small" label="Instagram Post Link" value={instagramUri} placeholder='https://www.instagram.com/p/...' onChange={onInstagramUriChange} />
                    <Typography variant="subtitle2"  style={{color: 'grey'}}>{`To get the post link, click the Share icon on the post, then Copy Link`}</Typography>
                </Stack>

                {error && <span>{error}</span>}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">

                    <Button disabled={loading} ref={bottomRef} onClick={onExit}>Cancel</Button>
                    <Button disabled={loading} onClick={onPost} variant="contained">Post</Button>
                </Stack>
            </Stack>
        </div >
    )
}
