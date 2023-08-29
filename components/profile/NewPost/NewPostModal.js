import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import * as Sentry from '@sentry/react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Image from 'next/image';

// Post Icons
import ArticleIcon from '@mui/icons-material/Article';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

// support delete and rename item
export default function NewPostModal({ listIdToPostTo, setListIdToPostTo, triggerReload }) {
    const bottomRef = useRef(null)
    const scrollToBottom = () => {
        setTimeout(() => bottomRef.current.scrollIntoView({ behavior: "smooth" }), 500)
    }

    useEffect(() => {
        if (listIdToPostTo) {
            setListId(listIdToPostTo)
        }
    }, [listIdToPostTo])

    const handleChange = (event, nextView) => {
        setPostType(nextView);
    };
    const [listId, setListId] = useState("")
    const [loading, setLoading] = useState(false)
    const [postType, setPostType] = useState(null)
    const [error, setError] = useState("")

    const clearItems = () => {
        setError("")
        setListIdToPostTo(null)
    }


    const onExit = () => {
        clearItems()
    }


    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "300px",
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        maxHeight: '80vh',
        overflowY: 'auto'
    };
    //TODO: Validate input; set character limits
    //TODO: Allow setting new Link instead of having to delete and recreate
    return (
        <Modal open={!!listIdToPostTo}>
            <Box style={modalStyle}>
                <Stack alignItems="center" justifyContent="space-between" spacing={2} style={{ width: '100%' }} >
                    <Stack style={{ width: '100%' }} direction="row" alignItems="center" justifyContent={"space-between"}>
                        <Typography variant="h3">New Post</Typography>
                        <CloseIcon onClick={onExit} />
                    </Stack>
                    <ToggleButtonGroup
                        orientation="vertical"
                        value={postType}
                        exclusive
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        <ToggleButton value="standard" aria-label="list">
                            <Stack direction="row" spacing={2} alignItems="start" style={{ width: '100%' }}>
                                <ArticleIcon style={{width: 20, color: 'orange'}}/>
                                <Typography variant="button">
                                    Post
                                </Typography>
                            </Stack>

                        </ToggleButton>
                        <ToggleButton value="instagram" aria-label="module">
                            <Stack direction="row" spacing={2} alignItems="start" style={{ width: '100%' }}>
                                <Image src="/social_icons/instagram-color-64.png" width={20} height={20} alt="Instagram logo" />
                                <Typography variant="button">
                                    Instagram
                                </Typography>
                            </Stack>
                        </ToggleButton>
                        <ToggleButton value="spotify" aria-label="quilt">
                            <Stack direction="row" spacing={2} alignItems="start" style={{ width: '100%' }}>
                                <Image src="/social_icons/spotify-logo.png" width={20} height={20} alt="Spotify logo" />
                                <Typography variant="button">
                                    Spotify
                                </Typography>
                            </Stack>
                        </ToggleButton>
                        <ToggleButton disabled={true} value="youtube" aria-label="quilt">
                            <Stack direction="row" spacing={2} alignItems="start" style={{ width: '100%' }}>
                                <YouTubeIcon />
                                <Typography variant="button">
                                    YouTube (coming soon)
                                </Typography>
                            </Stack>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">

                        {/* <Button disabled={loading}  ref={bottomRef}  onClick={onExit}>Cancel</Button>
                        <Button disabled={loading || (postType === SPOTIFY && !validSpotifyUri) || (postType === INSTAGRAM && !validInstagramUri)} onClick={onPost} variant="contained">Post</Button> */}
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
