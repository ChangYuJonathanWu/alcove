import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import Image from 'next/image'
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';

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
    const [postPhoto, setPostPhoto] = useState(null)

    const clearItems = () => {
        setTitle("")
        setSubtitle("")
        setCaption("")
    }

    const onPost = async () => {
        setLoading(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const body = {
            title,
            subtitle,
            caption
        }
        const result = await fetch(`/api/profile/items/${listId}/post`, { method: "POST", headers, body: JSON.stringify(body) })
        setLoading(false)
        clearItems()
        setListIdToPostTo("")
        triggerReload(Date.now())
    }

    const updatePostPhoto = async (e) => {
        const photo = e.target.files[0]
        console.log(photo)
        setPostPhoto(photo)

        // setLoading(true)
        // const auth = getAuth()
        // const token = await auth.currentUser.getIdToken();
        // const headers = {
        //     Authorization: `Bearer ${token}`
        // }
        // const formData = new FormData();
        // formData.append('file', e.target.files[0]);
        // const result = await fetch(`/api/profile/items/${listId}/post/photo`, { method: "POST", headers, body: formData })
        // setLoading(false)
        // clearItems()
        // setListIdToPostTo("")
        // triggerReload(Date.now())
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
                    {postPhoto &&
                        <Avatar variant="square" sx={{ height: '100%', width: "100%"}} src={URL.createObjectURL(postPhoto)} style={{ marginRight: "1rem", borderRadius: '5px' }} />
                    }
                    <Stack direction="row" spacing={4}>
                        {postPhoto && <div>
                            <Button disabled={loading} onClick={() => setPostPhoto(null)} style={{ margin: 0, padding: 0 }}>Remove</Button>
                        </div>}
                        <div>
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
                    <TextField style={{ width: "100%" }} size="small" multiline rows={5} label="Caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />

                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">

                        <Button disabled={loading} onClick={() => setListIdToPostTo(null)}>Cancel</Button>
                        <Button disabled={loading} onClick={onPost} variant="contained">Post</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
