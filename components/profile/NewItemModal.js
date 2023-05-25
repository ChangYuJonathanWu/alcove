import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";

export default function NewItemModal({ open, setOpen, triggerReload }) {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const onNewItem = async () => {
        setLoading(true)
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization : `Bearer ${token}`
        }
        const body = {
            name,
            type: "list",
        }
        const result = await fetch(`/api/profile/items`, { method: "POST", headers, body: JSON.stringify(body)})
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
    //TODO: Validate input; set character limits
    return (
        <Modal open={open}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField style={{ width: "100%" }} label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                    <Stack direction="row" spacing={1}>
                        <Button disabled={loading} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button disabled={loading || !name} onClick={onNewItem} variant="contained">Create</Button>
                    </Stack>
                </Stack>


            </Box>

        </Modal>
    )
}
