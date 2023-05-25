import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";

export default function EditBioModal({ open, setOpen, user, triggerReload }) {
    const { title, description, social_links, photo } = user;
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [loading, setLoading] = useState(false)
    const onBioUpdate = async () => {
        setLoading(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const body = {
            description: newDescription,
            title: newTitle,
        }
        const result = await fetch(`/api/profile`, { method: "PUT", headers, body: JSON.stringify(body) })
        setLoading(false)
        setOpen(false)
        triggerReload(Date.now())
    }
    const modalStyle = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '7px',
        padding: '1rem',
    };
    return (
        <Modal open={open}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={1}>
                    <TextField value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <TextField value={newDescription} onChange={(e) => setNewDescription(e.currentTarget.value)} />
                    <Stack direction="row" spacing={1}>
                        <Button disabled={loading} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button disabled={loading} onClick={onBioUpdate} variant="contained">Update</Button>
                    </Stack>
                </Stack>


            </Box>

        </Modal>
    )
}
