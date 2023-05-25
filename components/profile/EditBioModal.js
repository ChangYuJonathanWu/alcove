import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";

export default function EditBioModal({ open, setOpen, user, triggerReload }) {
    const { title, description, social_links, photo } = user;
    const { instagram, facebook } = social_links
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newInstagram, setNewInstagram ] = useState(instagram)
    const [newFacebook, setNewFacebook] = useState(facebook)
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
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "300px",
        backgroundColor: 'white',
        borderRadius: '7px',
        padding: '2rem',
    };
    return (
        <Modal open={open}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField style={{ width: "100%" }} label="Name" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} multiline rows={3} label="Bio" value={newDescription} onChange={(e) => setNewDescription(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} label="Instagram" value={newInstagram}/>
                    <TextField style={{ width: "100%" }} label="Facebook" value={newFacebook}/>
                    <Stack direction="row" spacing={1}>
                        <Button disabled={loading} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button disabled={loading} onClick={onBioUpdate} variant="contained">Update</Button>
                    </Stack>
                </Stack>


            </Box>

        </Modal>
    )
}
