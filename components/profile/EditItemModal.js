import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';

// support delete and rename item
export default function EditItemModal({ editItem, setEditItem, triggerReload }) {
    useEffect(() => {
        if(editItem) {
            const { name } = editItem
            setNewTitle(name)
        }
    }, [editItem])
    const [newTitle, setNewTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const onBioUpdate = async () => {
        // setLoading(true)
        // const auth = getAuth()
        // const token = await auth.currentUser.getIdToken();
        // const headers = {
        //     Authorization: `Bearer ${token}`
        // }
        // const body = {
        //     description: newDescription,
        //     title: newTitle,
        //     social_links: {
        //         instagram: newInstagram,
        //         facebook: newFacebook
        //     }
        // }
        // const result = await fetch(`/api/profile`, { method: "PUT", headers, body: JSON.stringify(body) })
        // setLoading(false)
        // setOpen(false)
        // triggerReload(Date.now())
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
        <Modal open={!!editItem}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField style={{ width: "100%" }} label="Name" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        <Button disabled={loading} onClick={() => setEditItem(null)}>Cancel</Button>
                        <Button disabled={loading} variant="outlined" color="error">Delete</Button>
                        <Button disabled={loading} onClick={onBioUpdate} variant="contained">Update</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
