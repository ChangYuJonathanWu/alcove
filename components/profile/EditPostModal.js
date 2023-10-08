import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { compressImage } from '@/utils/localImageProcessing';
import { formatUri, isValidUrlWithoutProtocol } from '@/utils/formatters';
import { protectedApiCall } from '@/utils/api';
import PhotoUploadButton from '../custom/PhotoUploadButton';

// support delete and rename item
export default function EditPostModal({ postToEdit, setPostToEdit, triggerReload }) {
    const bottomRef = useRef(null)
    const scrollToBottom = async () => {
        setTimeout(() => bottomRef.current.scrollIntoView({ behavior: "smooth" }), 300 )
        
    }

    const reset = () => {
        setNewTitle("")
        setNewSubtitle("")
        setNewCaption("")
        setDisplayPhoto("")
        setPhotoUpload(null)
        setPhotoChanged(false)
        setNewLink("")
        setPostId("")
        setPostToEdit(null)
        setParentId("")
        setError("")
    }

    useEffect(() => {
        if (postToEdit) {
            const { id, parentId, title, subtitle, caption, uri, image } = postToEdit;
            setNewTitle(title)
            setNewSubtitle(subtitle)
            setNewCaption(caption)
            setDisplayPhoto(image)
            setPhotoChanged(false)
            setNewLink(uri)
            setPostId(id)
            setParentId(parentId)
            setError("")
        }
    }, [postToEdit])
    const [newTitle, setNewTitle] = useState("")
    const [newSubtitle, setNewSubtitle] = useState("")
    const [newCaption, setNewCaption] = useState("")
    const [newLink, setNewLink] = useState("")
    const [displayPhoto, setDisplayPhoto] = useState("")
    const [photoUpload, setPhotoUpload] = useState(null)
    const [photoChanged, setPhotoChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [photoConversionInProgress, setPhotoConversionInProgress] = useState(false)
    const [postId, setPostId] = useState("")
    const [parentId, setParentId] = useState("")
    const [error, setError] = useState("")

    const open = !!postToEdit

    const onPostDelete = async () => {
        setLoading(true)
        const result = await protectedApiCall(`/api/profile/items/${parentId}/post/${postId}`, 'DELETE')
        if (result.status !== 200) {
            const parsedResult = await result.json()
            setError(parsedResult.error ?? "Error deleting post. Please try again.")
            return
        }
        setLoading(false)
        reset()
        triggerReload(Date.now())
    }
    const onPostUpdate = async () => {
        setError("")
        // verify uri is valid
        if (newLink && !isValidUrlWithoutProtocol(newLink)) {
            setError("Please enter a valid link")
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("title", newTitle)
        formData.append("subtitle", newSubtitle)
        formData.append("caption", newCaption)
        formData.append("uri", newLink)
        if (photoUpload) {
            formData.append("image", photoUpload)
        }
        if (photoChanged) {
            formData.append("photo_changed", true)
        }
        const result = await protectedApiCall(`/api/profile/items/${parentId}/post/${postId}`, 'PUT', formData)
        setLoading(false)
        if (result.status !== 200) {
            const parsedResult = await result.json()
            setError(parsedResult.error ?? "Error updating post. Please try again.")

        }
        reset()
        triggerReload(Date.now())
    }

    const onPhotoRemove = () => {
        setDisplayPhoto("")
        setPhotoUpload(null)
        setPhotoChanged(true)
        setLoading(false)
    }

    const onPhotoSelectComplete = (photo) => {
        setPhotoUpload(photo)
        setPhotoChanged(true)
        setPhotoConversionInProgress(false)
        setDisplayPhoto(URL.createObjectURL(photo))
    }


    const updatePostPhoto = async (e) => {
        const file = e.target.files[0]
        e.target.value = ""
        const compressedFile = await compressImage(file)
        setPhotoChanged(true)
        setPhotoUpload(compressedFile)
        setDisplayPhoto(URL.createObjectURL(compressedFile))
    }

    const onExit = () => {
        reset()
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
                        <Avatar variant="square" sx={{ height: '100%', width: "100%" }} src={photoUpload ? URL.createObjectURL(photoUpload) : displayPhoto} style={{ borderRadius: '5px' }} />
                    }
                    <Stack direction="row" spacing={4} justifyContent="center" style={{width: '100%'}}>
                        {hasPhoto && <div>
                            <Button disabled={loading} onClick={onPhotoRemove} style={{ margin: 0, padding: 0 }}>Remove</Button>
                        </div>}
                        {!hasPhoto && <PhotoUploadButton onStart={() => setPhotoConversionInProgress(true)} onComplete={onPhotoSelectComplete} onError={() => setPhotoConversionInProgress(false)} height="10rem" />}
                    </Stack>
                    <TextField size="small" style={{ width: "100%" }} label="Title" value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
                    <TextField size="small" style={{ width: "100%" }} label="Subtitle" value={newSubtitle} onChange={(e) => setNewSubtitle(e.currentTarget.value)} />
                    <TextField size="small" style={{ width: "100%" }} multiline rows={5} label="Caption" value={newCaption} onChange={(e) => setNewCaption(e.currentTarget.value)} />
                    <TextField size="small" onClick={scrollToBottom} style={{ width: "100%" }} label="Link" value={newLink} onChange={(e) => setNewLink(formatUri(e.currentTarget.value))} />
                    {error && <Typography data-cy="edit-item-modal--error" color="error">{error}</Typography>}
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Button disabled={loading} ref={bottomRef} onClick={() => setPostToEdit(null)}>Cancel</Button>
                        <Button disabled={loading || photoConversionInProgress} onClick={onPostDelete} variant="outlined" color="error">Delete</Button>
                        <Button disabled={loading || photoConversionInProgress} onClick={onPostUpdate} variant="contained">{loading ? "Updating..." : "Update"}</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
