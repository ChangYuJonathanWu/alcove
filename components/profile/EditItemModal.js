import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';

// support delete and rename item
export default function EditItemModal({ editItem, setEditItem, triggerReload }) {
    useEffect(() => {
        if (editItem) {
            const { id, type, content, } = editItem
            const { name, commentary, uri} = content;
            setNewTitle(name)
            setNewSubtitle(commentary)
            setItemId(id)
            setItemType(type)
            setNewLink(uri)
        }
    }, [editItem])
    const [newTitle, setNewTitle] = useState("")
    const [itemId, setItemId] = useState("")
    const [newSubtitle, setNewSubtitle] = useState("")
    const [itemType, setItemType] = useState("")
    const [newLink, setNewLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const onItemDelete = async () => {
        setLoading(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const result = await fetch(`/api/profile/items/${itemId}`, { method: "DELETE", headers })
        setLoading(false)
        setEditItem("")
        setItemId("")
        setError("")
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
            type: itemType,
            name: newTitle,
            subtitle: newSubtitle,
            uri: newLink
        }
        const result = await fetch(`/api/profile/items/${itemId}`, { method: "POST", headers, body: JSON.stringify(body) })
        setLoading(false)
        if(result.status !== 200) {
            const parsedResult = await result.json()
            setError(parsedResult.error ?? "Could not update item. Please try again later.")
            return
        }
        setEditItem("")
        setItemId("")
        setError("")
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
        <Modal open={!!editItem}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField size="small" style={{ width: "100%" }} label="Name" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    {itemType === "uri" && <TextField size="small" style={{ width: "100%" }} label="Link" value={newLink} onChange={(e) => setNewLink(e.currentTarget.value)} />}
                    {itemType === "list" && <TextField size="small" style={{ width: "100%" }} label="Subtitle" value={newSubtitle} onChange={(e) => setNewSubtitle(e.currentTarget.value)} />}
                    {error && <Typography color="error">{error}</Typography>}
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        <Button disabled={loading} onClick={() => setEditItem(null)}>Cancel</Button>
                        <Button disabled={loading} onClick={onItemDelete} variant="outlined" color="error">Delete</Button>
                        <Button disabled={loading} onClick={onItemUpdate} variant="contained">{loading ? "Updating..." : "Update"}</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
