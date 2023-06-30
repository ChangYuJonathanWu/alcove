import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import { compressImage } from '@/utils/localImageProcessing';

export default function EditBioModal({ open, setOpen, user, triggerReload }) {
    const { title, description, social_links, photo } = user;
    const { instagram, facebook } = social_links
    const [newProfilePhoto, setNewProfilePhoto] = useState(photo)
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newInstagram, setNewInstagram] = useState(instagram)
    const [newFacebook, setNewFacebook] = useState(facebook)
    const [loading, setLoading] = useState(false)

    const userMadeChanges = () => {
        const photoChanged = newProfilePhoto !== photo
        const titleChanged = newTitle !== title
        const descriptionChanged = newDescription !== description
        const instagramChanged = newInstagram !== instagram
        const facebookChanged = newFacebook !== facebook
        return photoChanged || titleChanged || descriptionChanged || instagramChanged || facebookChanged
    }

    const onBioUpdate = async () => {
        if(!userMadeChanges()) {
            setOpen(false)
        }
        setLoading(true)
        const body = {
            description: newDescription,
            title: newTitle,
            social_links: {
                instagram: newInstagram,
                facebook: newFacebook
            }
        }
        const result = await fetch(`/api/profile`, { method: "PUT", body: JSON.stringify(body) })
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
        const compressedFile = await compressImage(file)
        const formData = new FormData()
        formData.append('profilePhoto', compressedFile)
        const result = await fetch(`/api/profile/updateProfilePhoto`, { method: "POST", body: formData })
        const data = await result.json()
        setNewProfilePhoto(data.url)
        setLoading(false)
    }

    const removeProfilePhoto = async () => {
        setLoading(true)
        const result = await fetch(`/api/profile/updateProfilePhoto`, { method: "DELETE" })
        setNewProfilePhoto("")
        setLoading(false)
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
    return (
        <Modal open={open} id="edit-bio-modal">
            <Box style={modalStyle}>

                <Stack alignItems="center" spacing={2} >
                    <Avatar id="edit-bio-profile-photo" alt={"profile-photo"} sx={{ width: 100, height: 100 }} src={newProfilePhoto} />
                    <Stack direction="row" spacing={2}>
                        {newProfilePhoto && <div>
                            <Button id="edit-bio-remove-profile-photo" disabled={loading} onClick={removeProfilePhoto} style={{ margin: 0, padding: 0 }}>Remove</Button>
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
                                <Button id="edit-bio-change-profile-photo" disabled={loading} style={{margin:0, padding:0}} component="span">
                                    Change
                                </Button>
                            </label>

                        </div>
                    </Stack>

                    <TextField id="edit-bio-name" style={{ width: "100%" }} label="Name" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <TextField id="edit-bio-bio" style={{ width: "100%" }} inputProps={{ maxLength: 150}}multiline rows={3} label="Bio" value={newDescription} onChange={(e) => setNewDescription(e.currentTarget.value)} />
                    <TextField id="edit-bio-instagram" style={{ width: "100%" }} label="Instagram" value={newInstagram} onChange={(e) => setNewInstagram(e.currentTarget.value)} />
                    <TextField id="edit-bio-facebook" style={{ width: "100%" }} label="Facebook" value={newFacebook} onChange={(e) => setNewFacebook(e.currentTarget.value)} />
                    <Stack direction="row" spacing={1}>
                        <Button id="edit-bio-cancel" disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button id="edit-bio-done" disabled={loading} onClick={onBioUpdate} variant="contained">Done</Button>
                    </Stack>
                </Stack>


            </Box>

        </Modal>
    )
}
