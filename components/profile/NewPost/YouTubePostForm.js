import React, { useState, useRef } from 'react'
import { Stack, Button, Typography, TextField } from '@mui/material';
import * as Sentry from '@sentry/react';
import { protectedApiCall } from '@/utils/api';

export default function YouTubePostForm({ onExit, listId, clearItems, triggerReload }) {
    const [loading, setLoading] = useState(false)
    const [youtubeUri, setYoutubeUri] = useState("")
    const [caption, setCaption] = useState("")
    const [validYoutubeUri, setValidYoutubeUri] = useState(false)
    const [error, setError] = useState("")

    const bottomRef = useRef(null)

    const isValidYoutubeUri = (uri) => {
        const regex = /\bhttps:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]*)/
        return regex.test(uri)
    }

    const isValidShortenedYoutubeUri = (uri) => {
        const regex = /\bhttps:\/\/(www\.)?youtu\.be\/([a-zA-Z0-9_-]*)/
        return regex.test(uri)
    }
    const onYoutubeUriChange = (e) => {
        const uri = e.target.value
        setYoutubeUri(uri)
        // Validate that the uri is a youtube video
        const valid = isValidYoutubeUri(uri) || isValidShortenedYoutubeUri(uri)
        setValidYoutubeUri(valid)
    }

    const clearPostItems = () => {
        setYoutubeUri("")
        setValidYoutubeUri(false)
    }

    const onPost = async () => {
        setError("")
        setLoading(true)
        const formData = new FormData()
        let youtubeId
        if (isValidYoutubeUri(youtubeUri)) {
            youtubeId = youtubeUri.split("v=")[1]
        } else if (isValidShortenedYoutubeUri(youtubeUri)) {
            youtubeId = youtubeUri.split("be/")[1]
        } else {
            setError("Please enter a valid YouTube link")
            return
        }

        formData.append("postType", "youtube")
        formData.append("youtubeId", youtubeId)
        formData.append("caption", caption.trim())

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
        <div style={{ width: "100%" }} data-cy="youtube-post-form">
            <Stack alignItems="center" spacing={2} style={{width: "100%"}} >
                <Stack spacing={2} style={{width: "100%"}} >
                    <Typography variant="subtitle2" style={{color: 'grey'}}>Share a YouTube video.</Typography>
                    <TextField data-cy="youtube-post-form--link-field" style={{ width: "100%" }} size="small" label="YouTube Link" value={youtubeUri} placeholder='https://www.youtube.com/watch...' onChange={onYoutubeUriChange} />
                    <TextField data-cy="youtube-post-form--caption-field" style={{ width: "100%" }} size="small" label="Caption" multiline rows={3} value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />
                    {/* <Typography variant="subtitle2"  style={{color: 'grey'}}>{`To get the post link, click the Share icon on the post, then Copy Link`}</Typography> */}
                </Stack>

                {error && <span>{error}</span>}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">

                    <Button data-cy="youtube-post-form--cancel-button" disabled={loading} ref={bottomRef} onClick={onExit}>Cancel</Button>
                    <Button data-cy="youtube-post-form--submit-button" disabled={loading || !validYoutubeUri} onClick={onPost} variant="contained">Post</Button>
                </Stack>
            </Stack>
        </div >
    )
}
