import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
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
   
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "300px",
        backgroundColor: 'white',
        borderRadius: '7px',
        padding: '2rem',
    };
    //TODO: Validate input; set character limits
    //TODO: Allow setting new Link instead of having to delete and recreate
    return (
        <Modal open={!!listIdToPostTo}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField style={{ width: "100%" }} label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} multiline rows={5} label="Caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />
                    
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        
                        <Button disabled={loading} onClick={() => setListIdToPostTo(null)}>Cancel</Button>
                        <Button disabled={loading} onClick={onPost} variant="contained">Post</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
