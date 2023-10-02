import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import * as Sentry from '@sentry/react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Image from 'next/image';
import InstagramIcon from '@/components/profile/static/instagram-color-64.png';
import SpotifyIcon from '@/components/profile/static/spotify-logo.png';
import AllTrailsIcon from '@/components/profile/static/alltrails-logo.png';
import TikTokLogo from '@/components/profile/static/tiktok-logo.png';
// Post Forms
import StandardPostForm from './StandardPostForm'
// Post Icons
import ArticleIcon from '@mui/icons-material/Article';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InstagramPostForm from './InstagramPostForm';
import SpotifyPostForm from './SpotifyPostForm';
import YouTubePostForm from './YouTubePostForm';

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
        overflowY: 'auto',
        paddingBottom: '3rem'
    };
    //TODO: Validate input; set character limits
    //TODO: Allow setting new Link instead of having to delete and recreate

    const PostTypeButton = ({ name, icon, disabled = false, standalone = false }) => {
        return (
            < Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    {icon}
                    <Typography variant="button" style={{ textTransform: 'none', color: disabled ? 'grey' : 'black' }}>
                        {name}
                    </Typography>
                </Stack>

                {standalone && <ChevronRightIcon style={{ color: 'black' }} />}
            </Stack>
        )
    }

    const getPostTypeButton = ({ value, disabled = false, standalone = false }) => {
        switch (value) {
            case "standard":
                return <PostTypeButton name="Create your own" icon={<ArticleIcon style={{ width: 20, color: 'orange', paddingBottom: '1px' }} />} disabled={disabled} standalone={standalone} />
            case "instagram":
                return <PostTypeButton name="Instagram" icon={<Image placeholder="blur" src={InstagramIcon} width={20} height={20} alt="Instagram logo" style={{ paddingBottom: '1px' }} />} disabled={disabled} standalone={standalone} />
            case "spotify":
                return <PostTypeButton name="Spotify" icon={<Image placeholder="blur" src={SpotifyIcon} width={20} height={20} alt="Spotify logo" style={{ paddingBottom: '2px' }} />} disabled={disabled} standalone={standalone} />
            case "youtube":
                return <PostTypeButton name="YouTube" icon={<YouTubeIcon style={{ width: 20, color: 'red' }} />} disabled={disabled} standalone={standalone} />
            case "alltrails":
                return <PostTypeButton name="AllTrails (coming soon)" icon={<Image placeholder="blur" src={AllTrailsIcon} width={20} height={20} alt="AllTrails Logo" />} disabled={disabled} standalone={standalone} />
            case "tiktok":
                return <PostTypeButton name="TikTok (coming soon)" icon={<Image placeholder="blur" src={TikTokLogo} width={20} height={20} alt="TikTok Logo" style={{borderRadius: '5px'}} />} disabled={disabled} standalone={standalone} />
            default:
                return <div></div>
        }
    }

    return (
        <Modal open={!!listIdToPostTo} data-cy="new-post-selection-modal">
            <Box style={modalStyle}>
                <Stack alignItems="center" justifyContent="space-between" spacing={2} style={{ width: '100%' }} >
                    <Stack data-cy="new-post-selection-modal--header" style={{ width: '100%' }} direction="row" alignItems="end" justifyContent={"space-between"}>
                        <Typography variant="h3">New Post</Typography>
                        <CloseIcon data-cy="new-post-selection-modal--close-button" style={{ width: '2rem' }} onClick={onExit} />
                    </Stack>

                    {postType &&
                        <ToggleButton value={postType} onClick={() => setPostType(null)} style={{ width: '100%' }} data-cy="new-post-selection-modal--indicator-toggle">
                            {getPostTypeButton({ value: postType, standalone: true })}
                        </ToggleButton>}
                    {postType === "standard" && <StandardPostForm onExit={onExit} listId={listId} clearItems={clearItems} setLoading={setLoading} setError={setError} triggerReload={triggerReload} />}
                    {postType === "instagram" && <InstagramPostForm onExit={onExit} listId={listId} clearItems={clearItems} setLoading={setLoading} setError={setError} triggerReload={triggerReload} />}
                    {postType === "spotify" && <SpotifyPostForm onExit={onExit} listId={listId} clearItems={clearItems} setLoading={setLoading} setError={setError} triggerReload={triggerReload} />}
                    {postType === "youtube" && <YouTubePostForm onExit={onExit} listId={listId} clearItems={clearItems} setLoading={setLoading} setError={setError} triggerReload={triggerReload} />}
                    {!postType && <ToggleButtonGroup
                        orientation="vertical"
                        value={postType}
                        exclusive
                        onChange={handleChange}
                        style={{ width: '100%', borderRadius: '1rem' }}
                    >
                        <ToggleButton value="standard" aria-label="Standard post" data-cy="new-post-type-standard" >
                            {getPostTypeButton({ value: "standard" })}
                        </ToggleButton>
                        <ToggleButton data-cy="new-post-type-alltrails" value="alltrails" aria-label="All Trails post" disabled={true}>
                            {getPostTypeButton({ value: "alltrails", disabled: true })}
                        </ToggleButton>
                        <ToggleButton value="instagram" aria-label="Instagram post" data-cy="new-post-type-instagram">
                            {getPostTypeButton({ value: "instagram" })}
                        </ToggleButton>
                        <ToggleButton value="spotify" aria-label="Spotify post" data-cy="new-post-type-spotify">
                            {getPostTypeButton({ value: "spotify" })}
                        </ToggleButton>
                        <ToggleButton data-cy="new-post-type-tiktok" value="tiktok" aria-label="TikTok post" disabled={true}>
                            {getPostTypeButton({ value: "tiktok", disabled: true })}
                        </ToggleButton>
                        <ToggleButton data-cy="new-post-type-youtube" value="youtube" aria-label="YouTube post">
                            {getPostTypeButton({ value: "youtube" })}
                        </ToggleButton>


                    </ToggleButtonGroup>}
                </Stack>
            </Box>
        </Modal>
    )
}
