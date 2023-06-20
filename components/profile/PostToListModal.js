import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import Image from 'next/image'
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// support delete and rename item
export default function PostToListModal({ listIdToPostTo, setListIdToPostTo, triggerReload }) {
    useEffect(() => {
        if (listIdToPostTo) {
            setListId(listIdToPostTo)
        }
    }, [listIdToPostTo])
    const [listId, setListId] = useState("")
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [caption, setCaption] = useState("")
    const [loading, setLoading] = useState(false)
    const [uri, setUri] = useState("")
    const [spotifyUri, setSpotifyUri] = useState("")
    const [postPhoto, setPostPhoto] = useState(null)
    const [postType, setPostType] = useState('standard')
    const [validSpotifyUri, setValidSpotifyUri] = useState(false)

    const clearItems = () => {
        setTitle("")
        setSubtitle("")
        setCaption("")
        setUri("")
        setPostPhoto(null)
        setSpotifyUri("")
        setValidSpotifyUri(false)
    }

    const onPost = async () => {
        setLoading(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }

        const formData = new FormData()
        formData.append("postType", postType)
        if (postType === 'spotify') {
            formData.append("spotifyUri", spotifyUri)
        } else {
            formData.append("photo", postPhoto)
            formData.append("title", title)
            formData.append("subtitle", subtitle)
            formData.append("caption", caption)
            formData.append("uri", uri)
        }

        const result = await fetch(`/api/profile/items/${listId}/post`, { method: "POST", headers, body: formData })
        setLoading(false)
        if (result.status !== 200) {
            console.error("Error posting. Try again")
        }
        // TODO: If request failed, dont clear everything here

        clearItems()
        setListIdToPostTo("")
        triggerReload(Date.now())
    }

    const updatePostPhoto = async (e) => {
        const photo = e.target.files[0]
        setPostPhoto(photo)
    }

    const onExit = () => {
        clearItems()
        setListIdToPostTo(null)
    }

    const onSpotifyUriChange = (e) => {
        const uri = e.target.value
        setSpotifyUri(uri)
        const regex = /\bhttps:\/\/open\.spotify\.com\/(track|playlist|artist|show|episode|audiobook)\//
        const valid = regex.test(uri)
        setValidSpotifyUri(valid)
    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "300px",
        backgroundColor: 'white',
        borderRadius: '7px',
        padding: '2rem',
        maxHeight: '80vh',
        overflowY: 'auto'
    };
    //TODO: Validate input; set character limits
    //TODO: Allow setting new Link instead of having to delete and recreate
    return (
        <Modal open={!!listIdToPostTo}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={2} >
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="item-type"
                            value={postType}
                            onChange={(e) => setPostType(e.currentTarget.value)}
                            row
                            name="item-type-radio-buttons-group"
                        >
                            <FormControlLabel value="standard" control={<Radio />} label="Post" />
                            <FormControlLabel value="spotify" control={<Radio />} label="Song" />
                        </RadioGroup>
                    </FormControl>
                    {postType === "spotify" && <div style={{ width: "100%" }}>
                        <Stack spacing={2}>
                            <TextField style={{ width: "100%" }} size="small" label="Spotify Link" value={spotifyUri} placeholder='https://open.spotify.com/track...' onChange={onSpotifyUriChange} />
                            <Typography variant="subtitle2">{`To get the Spotify link, click the three dots on the song, click "Share", then "Copy Song Link"`}</Typography>
                        </Stack>

                    </div>}
                    {postType === "standard" && <div style={{ width: "100%" }}>
                        <Stack alignItems="center" spacing={2} >
                            {postPhoto &&
                                <Avatar variant="square" sx={{ height: '100%', width: "100%" }} src={URL.createObjectURL(postPhoto)} style={{ marginRight: "1rem", borderRadius: '5px' }} />
                            }
                            <Stack direction="row" spacing={4} >
                                {postPhoto && <div>
                                    <Button disabled={loading} onClick={() => setPostPhoto(null)} style={{ margin: 0, padding: 0 }}>Remove</Button>
                                </div>}
                                <div style={{ width: "100%" }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="post-photo-upload"
                                        type="file"
                                        onChange={updatePostPhoto}
                                    />
                                    <label htmlFor="post-photo-upload">
                                        <Button disabled={loading} style={{ margin: 0, padding: 0 }} component="span">
                                            {postPhoto ? "Change " : "Add Photo"}
                                        </Button>
                                    </label>

                                </div>
                            </Stack>

                            <TextField style={{ width: "100%" }} size="small" label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                            <TextField style={{ width: "100%" }} size="small" label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} />
                            <TextField style={{ width: "100%" }} size="small" multiline rows={3} label="Caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />
                            <TextField style={{ width: "100%", paddingBottom: "2rem" }} size="small" label="Link" value={uri} onChange={(e) => setUri(e.currentTarget.value)} />
                        </Stack>
                    </div>}
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">

                        <Button disabled={loading} onClick={onExit}>Cancel</Button>
                        <Button disabled={loading || (postType === "spotify" && !validSpotifyUri)} onClick={onPost} variant="contained">Post</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
