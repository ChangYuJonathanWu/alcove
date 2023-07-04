import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import { compressImage } from '@/utils/localImageProcessing';
import { refreshFirebaseToken } from '@/lib/api/tokenRefresh';

export default function EditBioModal({ open, setOpen, user, triggerReload }) {
    const { title, description, social_links, photo } = user;
    const { instagram, facebook, bereal, snapchat, tiktok, twitter, reddit, linkedin } = social_links
    const [newProfilePhoto, setNewProfilePhoto] = useState(photo)
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newInstagram, setNewInstagram] = useState(instagram)
    const [newFacebook, setNewFacebook] = useState(facebook)
    const [newBereal, setNewBereal] = useState(bereal)
    const [newSnapchat, setNewSnapchat] = useState(snapchat)
    const [newTiktok, setNewTiktok] = useState(tiktok)
    const [newTwitter, setNewTwitter] = useState(twitter)
    const [newReddit, setNewReddit] = useState(reddit)
    const [newLinkedin, setNewLinkedin] = useState(linkedin)

    const [loading, setLoading] = useState(false)

    const bottomRef = useRef(null)
    const scrollToBottom = () => {
        setTimeout(() => bottomRef.current.scrollIntoView({ behavior: "smooth" }), 500 )
    }

    const userMadeChanges = () => {
        const photoChanged = newProfilePhoto !== photo
        const titleChanged = newTitle !== title
        const descriptionChanged = newDescription !== description
        const instagramChanged = newInstagram !== instagram
        const facebookChanged = newFacebook !== facebook
        const berealChanged = newBereal !== bereal
        const snapchatChanged = newSnapchat !== snapchat
        const tiktokChanged = newTiktok !== tiktok
        const twitterChanged = newTwitter !== twitter
        const redditChanged = newReddit !== reddit
        const linkedinChanged = newLinkedin !== linkedin

        return photoChanged || titleChanged || descriptionChanged || instagramChanged || facebookChanged || berealChanged || snapchatChanged || tiktokChanged || twitterChanged || redditChanged || linkedinChanged
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
                facebook: newFacebook,
                bereal: newBereal,
                snapchat: newSnapchat,
                tiktok: newTiktok,
                twitter: newTwitter,
                reddit: newReddit,
                linkedin: newLinkedin
            }
        }
        const token = await refreshFirebaseToken()
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
        // Only if profile photo was updated do we trigger a reload on cancel
        newProfilePhoto !== photo && triggerReload(Date.now())
        setOpen(false)
        
    }

    const updateProfilePhoto = async (e) => {
        setLoading(true)
        const file = e.target.files[0]
        const compressedFile = await compressImage(file)
        const formData = new FormData()
        formData.append('profilePhoto', compressedFile)
        const token = await refreshFirebaseToken()
        const result = await fetch(`/api/profile/updateProfilePhoto`, { method: "POST", body: formData })
        const data = await result.json()
        setNewProfilePhoto(data.url)
        setLoading(false)
    }

    const removeProfilePhoto = async () => {
        setLoading(true)
        const token = await refreshFirebaseToken()
        const result = await fetch(`/api/profile/updateProfilePhoto`, { method: "DELETE" })
        setNewProfilePhoto("")
        setLoading(false)
    }

    const modalStyle = {
        position: 'absolute',
        maxHeight: '60vh',
        overflowY: 'scroll',
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

                    <TextField size="small" id="edit-bio-name" style={{ width: "100%" }} label="Name" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <TextField size="small" id="edit-bio-bio" style={{ width: "100%" }} inputProps={{ maxLength: 150}}multiline rows={3} label="Bio" value={newDescription} onChange={(e) => setNewDescription(e.currentTarget.value)} />
                    <TextField size="small" id="edit-bio-instagram" style={{ width: "100%" }} label="Instagram" value={newInstagram} onChange={(e) => setNewInstagram(e.currentTarget.value)} />
                    <TextField size="small" id="edit-bio-facebook" style={{ width: "100%" }} label="Facebook" value={newFacebook} onChange={(e) => setNewFacebook(e.currentTarget.value)} />
                    <TextField onClick={scrollToBottom} size="small" id="edit-bio-bereal" style={{ width: "100%" }} label="BeReal" value={newBereal} onChange={(e) => setNewBereal(e.currentTarget.value)} />
                    <TextField onClick={scrollToBottom} size="small" id="edit-bio-snapchat" style={{ width: "100%" }} label="Snapchat" value={newSnapchat} onChange={(e) => setNewSnapchat(e.currentTarget.value)} />
                    <TextField onClick={scrollToBottom} size="small" id="edit-bio-tiktok" style={{ width: "100%" }} label="Tiktok" value={newTiktok} onChange={(e) => setNewTiktok(e.currentTarget.value)} />
                    <TextField onClick={scrollToBottom} size="small" id="edit-bio-twitter" style={{ width: "100%" }} label="Twitter" value={newTwitter} onChange={(e) => setNewTwitter(e.currentTarget.value)} />
                    <TextField onClick={scrollToBottom} size="small" id="edit-bio-reddit" style={{ width: "100%" }} label="Reddit" value={newReddit} onChange={(e) => setNewReddit(e.currentTarget.value)} />
                    <TextField onClick={scrollToBottom} size="small" id="edit-bio-linkedin" style={{ width: "100%" }} label="Linkedin" value={newLinkedin} onChange={(e) => setNewLinkedin(e.currentTarget.value)} />

                    <Stack direction="row" spacing={1}>
                        <Button id="edit-bio-cancel" ref={bottomRef} disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button id="edit-bio-done" disabled={loading} onClick={onBioUpdate} variant="contained">Done</Button>
                    </Stack>
                </Stack>


            </Box>

        </Modal>
    )
}
