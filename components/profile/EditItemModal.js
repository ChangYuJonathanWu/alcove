import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';

// support delete and rename item
export default function EditItemModal({ editItem, setEditItem, triggerReload }) {
    useEffect(() => {
        if (editItem) {
            const { id, content } = editItem
            const { name } = content;
            setNewTitle(name)
            setItemId(id)
        }
    }, [editItem])
    const [newTitle, setNewTitle] = useState("")
    const [itemId, setItemId] = useState("")
    const [loading, setLoading] = useState(false)
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
        const result = await fetch(`/api/profile/items/${itemId}`, { method: "POST", headers, body: JSON.stringify(body) })
        setLoading(false)
        setEditItem("")
        setItemId("")
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
                    <TextField style={{ width: "100%" }} label="Name" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        <Button disabled={loading} onClick={() => setEditItem(null)}>Cancel</Button>
                        <Button disabled={loading} onClick={onItemDelete} variant="outlined" color="error">Delete</Button>
                        <Button disabled={loading} onClick={onItemUpdate} variant="contained">Update</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
