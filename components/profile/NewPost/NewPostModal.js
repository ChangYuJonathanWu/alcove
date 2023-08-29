import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import * as Sentry from '@sentry/react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Image from 'next/image';

// Post Forms
import StandardPostForm from './StandardPostForm'
// Post Icons
import ArticleIcon from '@mui/icons-material/Article';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

// support delete and rename item
export default function NewPostModal({ listIdToPostTo, setListIdToPostTo, triggerReload }) {

    useEffect(() => {
        if (listIdToPostTo) {
            setListId(listIdToPostTo)
        }
    }, [listIdToPostTo])

    const handleChange = (event, nextView) => {
        setPostType(nextView);
        setView(nextView)
    };
    const [listId, setListId] = useState("")
    const [loading, setLoading] = useState(false)
    const [postType, setPostType] = useState(null)
    const [view, setView] = useState("type-selection")
    const [error, setError] = useState("")

    const clearItems = () => {
        setError("")
        setListIdToPostTo(null)
        setPostType(null)
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

    const PostTypeButton = ({ name, icon, disabled = false }) => {
        return (
            < Stack direction="row" spacing={2} alignItems="start" style={{ width: '100%' }}>
                {icon}
                <Typography variant="button" style={{ textTransform: 'none', color: disabled ? 'grey' : 'black' }}>
                    {name}
                </Typography>
            </Stack>
        )
    }
    return (
        <Modal open={!!listIdToPostTo}>
            <Box style={modalStyle}>
                <Stack alignItems="center" justifyContent="space-between" spacing={2} style={{ width: '100%' }} >
                    <Stack style={{ width: '100%' }} direction="row" alignItems="end" justifyContent={"space-between"}>
                        <Typography variant="h3">New Post</Typography>
                        <CloseIcon style={{ width: '2rem' }} onClick={onExit} />
                    </Stack>
                    {postType === "standard" && <StandardPostForm onExit={onExit} listId={listId} setListId={setListId} setLoading={setLoading} setError={setError} triggerReload={triggerReload} />}
                    {!postType && <ToggleButtonGroup
                        orientation="vertical"
                        value={postType}
                        exclusive
                        onChange={handleChange}
                        style={{ width: '100%', borderRadius: '1rem' }}
                    >
                        <ToggleButton value="standard" aria-label="Standard post">
                            <PostTypeButton name="Post" icon={<ArticleIcon style={{ width: 20, color: 'orange' }} />} />
                        </ToggleButton>
                        <ToggleButton value="instagram" aria-label="Instagram post">
                            <PostTypeButton name="Instagram" icon={<Image src="/social_icons/instagram-color-64.png" width={20} height={20} alt="Instagram logo" />} />
                        </ToggleButton>
                        <ToggleButton value="spotify" aria-label="Spotify post">
                            <PostTypeButton name="Spotify" icon={<Image src="/social_icons/spotify-logo.png" width={20} height={20} alt="Spotify logo" />} />
                        </ToggleButton>
                        <ToggleButton disabled={true} value="youtube" aria-label="quilt">
                            <PostTypeButton disabled={true} name="YouTube (coming soon)" icon={<YouTubeIcon style={{ width: 20, color: 'grey' }} />} />
                        </ToggleButton>
                    </ToggleButtonGroup>}
                </Stack>
            </Box>
        </Modal>
    )
}
