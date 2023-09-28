import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { compressImage } from '@/utils/localImageProcessing';
import * as Sentry from '@sentry/react';
import { formatUri, isValidUrlWithoutProtocol } from '@/utils/formatters';
import { protectedApiCall } from '@/utils/api';
import axios from 'axios';

export default function SpotifyPostForm({ onExit, listId, clearItems, triggerReload }) {
    const [loading, setLoading] = useState(false)
    const [spotifyUri, setSpotifyUri] = useState("")
    const [validSpotifyUri, setValidSpotifyUri] = useState(false)
    const [error, setError] = useState("")

    const bottomRef = useRef(null)
    const scrollToBottom = () => {
        setTimeout(() => bottomRef.current.scrollIntoView({ behavior: "smooth" }), 500)
    }

    const isShortedSpotifyLink = (uri) => {
        const regex = /\bspotify\.link\/(.+)/
        return regex.test(uri)
    }

    const isRegularySpotifyLink = (uri) => {
        const regex = /\bhttps:\/\/open\.spotify\.com\/(track|playlist|artist|show|episode|audiobook)\//
        return regex.test(uri)
    }

    const onSpotifyUriChange = (e) => {
        const uri = e.target.value
        setSpotifyUri(uri)
        const valid = isShortedSpotifyLink(uri) || isRegularySpotifyLink(uri)
        setValidSpotifyUri(valid)
    }

    const clearPostItems = () => {
        setSpotifyUri("")
        setValidSpotifyUri(false)
    }

    const retrieveSpotifyInformation = async () => {

    }

    const onPost = async () => {
        setError("")
       
        // setLoading(true)

        // if (isShortedSpotifyLink(spotifyUri)) {
        //     // Retrieve information from shorted link
        //     try {
        //         const result = await fetch(spotifyUri, { method: 'GET',   headers: new Headers({
        //             'Content-Type': 'application/json; charset=UTF-8',
        //           })})
        //         console.log(result.url)
        //     } catch (e) {
        //         console.log("HERE")
        //         console.log(e)
        //     }

        //     setLoading(false)
        //     return

        // }
        // if (isShortedSpotifyLink(spotifyUri)) {
        //     // Retrieve information from shorted link
        //     try {
        //         const result = await axios.get(spotifyUri, { method: 'HEAD'}  )
        //         console.log(result.url)
        //     } catch (e) {
        //         console.log("HERE")
        //         console.log(e)
        //     }

        //     setLoading(false)
        //     return

        // }
        const formData = new FormData()
        formData.append("postType", "spotify")
        formData.append("spotifyUri", spotifyUri)

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
        <div style={{ width: "100%" }} data-cy="spotify-post-form">
            <Stack alignItems="center" spacing={2} >
                <Stack spacing={2}>
                    <Typography variant="subtitle2" style={{ color: 'grey' }}>You can post a song, album, playlist and more from Spotify</Typography>
                    <TextField data-cy="spotify-post-form--link-field" style={{ width: "100%" }} size="small" label="Spotify Link" value={spotifyUri} placeholder='https://open.spotify.com/track...' onChange={onSpotifyUriChange} />
                    <Typography variant="subtitle2" style={{ color: 'grey' }}>{`To get the Spotify link, click the three dots on the song or item, click Share, then Copy Link`}</Typography>
                </Stack>

                {error && <span>{error}</span>}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">

                    <Button data-cy="spotify-post-form--cancel-button" disabled={loading} ref={bottomRef} onClick={onExit}>Cancel</Button>
                    <Button data-cy="spotify-post-form--submit-button" disabled={loading || !validSpotifyUri} onClick={onPost} variant="contained">Post</Button>
                </Stack>
            </Stack>
        </div >
    )
}
