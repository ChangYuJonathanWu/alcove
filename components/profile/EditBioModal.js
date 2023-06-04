import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";

export default function EditBioModal({ open, setOpen, user, triggerReload }) {
    const { title, description, social_links, photo } = user;
    const { instagram, facebook } = social_links
    const [newProfilePhoto, setNewProfilePhoto] = useState(photo)
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newInstagram, setNewInstagram] = useState(instagram)
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
            social_links: {
                instagram: newInstagram,
                facebook: newFacebook
            }
        }
        const result = await fetch(`/api/profile`, { method: "PUT", headers, body: JSON.stringify(body) })
        setLoading(false)
        setOpen(false)
        triggerReload(Date.now())
    }

    const handleClose = () => {
        setNewProfilePhoto(photo)
        setNewTitle(title)
        setNewDescription(description)
        setNewInstagram(instagram)
        setNewFacebook(facebook)
        triggerReload(Date.now())
        setOpen(false)
        
    }

    const updateProfilePhoto = async (e) => {
        setLoading(true)
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('profilePhoto', file)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const result = await fetch(`/api/profile/updateProfilePhoto`, { method: "POST", headers, body: formData })
        const data = await result.json()
        setNewProfilePhoto(data.url)
        setLoading(false)
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
                    <Avatar alt={"profile-photo"} sx={{ width: 100, height: 100 }} src={newProfilePhoto} />
                    <Stack direction="row" spacing={2}>
                        {newProfilePhoto && <div>
                            <Button disabled={loading} style={{ margin: 0, padding: 0 }}>Remove</Button>
                        </div>}
                        <div>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="profile-photo-upload"
                                type="file"
                                onChange={updateProfilePhoto}
                            />
                            <label htmlFor="profile-photo-upload">
                                <Button disabled={loading} style={{margin:0, padding:0}} component="span">
                                    Upload
                                </Button>
                            </label>

                        </div>
                    </Stack>

                    <TextField style={{ width: "100%" }} label="Name" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} multiline rows={3} label="Bio" value={newDescription} onChange={(e) => setNewDescription(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} label="Instagram" value={newInstagram} onChange={(e) => setNewInstagram(e.currentTarget.value)} />
                    <TextField style={{ width: "100%" }} label="Facebook" value={newFacebook} onChange={(e) => setNewFacebook(e.currentTarget.value)} />
                    <Stack direction="row" spacing={1}>
                        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button disabled={loading} onClick={onBioUpdate} variant="contained">Done</Button>
                    </Stack>
                </Stack>


            </Box>

        </Modal>
    )
}
