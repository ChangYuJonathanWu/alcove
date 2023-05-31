import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';

// support delete and rename item
export default function NewListItemModal({ newListItem, setNewListItem, triggerReload }) {
    useEffect(() => {
        if (newListItem) {
            setListId(newListItem)
        }
    }, [newListItem])
    const [listId, setListId] = useState("")
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [caption, setCaption] = useState("")
    const [loading, setLoading] = useState(false)
   
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
        <Modal open={!!newListItem}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField style={{ width: "100%" }} label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} multiline rows={5} label="Caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} />
                    
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        
                        <Button disabled={loading} onClick={() => setNewListItem(null)}>Cancel</Button>
                        <Button disabled={loading} onClick={() => {}} variant="contained">Post</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
