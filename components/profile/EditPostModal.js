import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';

// support delete and rename item
export default function EditPostModal({ postToEdit, setPostToEdit, triggerReload }) {
    useEffect(() => {
        if (postToEdit) {
            const { id, parentId, title, subtitle, caption, uri, image } = postToEdit;
            setNewTitle(title)
            setNewSubtitle(subtitle)
            setNewCaption(caption)
            setPostId(id)
            setParentId(parentId)
        }
    }, [postToEdit])
    const [newTitle, setNewTitle] = useState("")
    const [newSubtitle, setNewSubtitle] = useState("")
    const [newCaption, setNewCaption] = useState("")
    const [loading, setLoading] = useState(false)
    const [postId, setPostId ] = useState("")
    const [parentId, setParentId] = useState("")

    const open = !!postToEdit

    const onPostDelete = async () => {
        setLoading(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const result = await fetch(`/api/profile/items/${parentId}/post/${postId}`, { method: "DELETE", headers })
        setLoading(false)
        setPostToEdit(null)
        triggerReload(Date.now())
    }
    const onItemUpdate = async () => {
        setLoading(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const body = {
            name: newTitle
        }
        const result = await fetch(`/api/profile/items/${postId}`, { method: "POST", headers, body: JSON.stringify(body) })
        setLoading(false)
        setPostToEdit("")
        setPostId("")
        triggerReload(Date.now())
    }
    const modalStyle = {
        position: 'absolute',
        top: '40%',
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
        <Modal open={!!open}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField style={{ width: "100%" }} label="Title" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} label="Subtitle" value={newSubtitle} onChange={(e) => setNewSubtitle(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} label="Caption" value={newCaption} onChange={(e) => setNewCaption(e.currentTarget.value)} />
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        <Button disabled={loading} onClick={() => setPostToEdit(null)}>Cancel</Button>
                        <Button disabled={loading} onClick={onPostDelete} variant="outlined" color="error">Delete</Button>
                        <Button disabled={loading} onClick={onItemUpdate} variant="contained">Update</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
