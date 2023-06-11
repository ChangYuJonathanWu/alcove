import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';

// support delete and rename item
export default function EditPostModal({ postToEdit, setPostToEdit, triggerReload }) {
    useEffect(() => {
        if (postToEdit) {
            const { id, parentId, title, subtitle, caption, uri, image } = postToEdit;
            setNewTitle(title)
            setNewSubtitle(subtitle)
            setNewCaption(caption)
            setDisplayPhoto(image)
            setPostId(id)
            setParentId(parentId)
        }
    }, [postToEdit])
    const [newTitle, setNewTitle] = useState("")
    const [newSubtitle, setNewSubtitle] = useState("")
    const [newCaption, setNewCaption] = useState("")
    const [displayPhoto, setDisplayPhoto] = useState("")
    const [photoUpload, setPhotoUpload] = useState(null)
    const [photoChanged, setPhotoChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [postId, setPostId] = useState("")
    const [parentId, setParentId] = useState("")

    const open = !!postToEdit

    const onPostDelete = async () => {
        setLoading(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const result = await fetch(`/api/profile/items/${parentId}/post/${postId}`, { method: "DELETE", headers })
        setLoading(false)
        setPostToEdit(null)
        triggerReload(Date.now())
    }
    const onPostUpdate = async () => {
        setLoading(true)
        const auth = getAuth()
        const token = await auth.currentUser.getIdToken();
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const formData = new FormData()
        formData.append("title", newTitle)
        formData.append("subtitle", newSubtitle)
        formData.append("caption", newCaption)
        if (photoUpload) {
            formData.append("image", photoUpload)
        }
        if (photoChanged) {
            formData.append("photo_changed", true)
        }

        const result = await fetch(`/api/profile/items/${parentId}/post/${postId}`, { method: "PUT", headers, body: formData })
        setLoading(false)
        setPostToEdit("")
        setPostId("")
        triggerReload(Date.now())
    }

    const onPhotoRemove = () => {
        setDisplayPhoto("")
        setPhotoUpload(null)
        setPhotoChanged(true)
    }

    const updatePostPhoto = (e) => {
        const file = e.target.files[0]
        setPhotoChanged(true)
        setPhotoUpload(file)
        setDisplayPhoto(URL.createObjectURL(file))
    }

    const onExit = () => {
        setPostToEdit(null)
        setPhotoChanged(false)
    }


    // Cases:
    // 1. Photo removed
    // 2. Photo added
    // 3. Photo changed
    // 4. Photo unchanged
    // 5. Photo removed, then added


    
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "300px",
        backgroundColor: 'white',
        borderRadius: '7px',
        padding: '2rem',
        maxHeight: '80vh',
        overflowY: 'auto'
    };
    //TODO: Validate input; set character limits
    //TODO: Allow setting new Link instead of having to delete and recreate

    const hasPhoto = displayPhoto || photoUpload
    return (
        <Modal open={!!open}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    {hasPhoto &&
                        <Avatar variant="square" sx={{ height: '100%', width: "100%" }} src={photoUpload ? URL.createObjectURL(photoUpload) : displayPhoto} style={{ marginRight: "1rem", borderRadius: '5px' }} />
                    }
                    <Stack direction="row" spacing={4}>
                        {hasPhoto && <div>
                            <Button disabled={loading} onClick={onPhotoRemove} style={{ margin: 0, padding: 0 }}>Remove</Button>
                        </div>}
                        <div>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="post-photo-upload"
                                type="file"
                                onChange={updatePostPhoto}
                            />
                            <label htmlFor="post-photo-upload">
                                <Button disabled={loading} style={{ margin: 0, padding: 0 }} component="span">
                                    {hasPhoto ? "Change " : "Add Photo"}
                                </Button>
                            </label>

                        </div>
                    </Stack>
                    <TextField size="small" style={{ width: "100%" }} label="Title" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <TextField size="small" style={{ width: "100%" }} label="Subtitle" value={newSubtitle} onChange={(e) => setNewSubtitle(e.currentTarget.value)} />
                    <TextField size="small" style={{ width: "100%" }} label="Caption" value={newCaption} onChange={(e) => setNewCaption(e.currentTarget.value)} />
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Button disabled={loading} onClick={() => setPostToEdit(null)}>Cancel</Button>
                        <Button disabled={loading} onClick={onPostDelete} variant="outlined" color="error">Delete</Button>
                        <Button disabled={loading} onClick={onPostUpdate} variant="contained">Update</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
