import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoUploadButton from '../custom/PhotoUploadButton';
import { compressImage } from '@/utils/localImageProcessing';
import { protectedApiCall } from '@/utils/api';
import { captureException } from '@sentry/nextjs';

export default function ThemingModal({ open, setOpen, user, triggerReload }) {
    useEffect(() => {
        if (user) {
            const { background } = user
            setBackground(background)
            setOriginalBackground(background)
        }
    }, [user]);

    const [loading, setLoading] = useState(false)
    const [background, setBackground] = useState(null)
    const [originalBackground, setOriginalBackground] = useState(null)
    const [photoUpload, setPhotoUpload] = useState(null)
    const [photoConversionInProgress, setPhotoConversionInProgress] = useState(false)
    const [photoChanged, setPhotoChanged] = useState(false)
    const [photoOperation, setPhotoOperation] = useState('none')
    const [errorText, setErrorText] = useState("")

    const onThemeUpdate = async () => {
        setErrorText("")
        if (photoOperation === 'none') {
            setOpen(false)
            return
        }
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("background_image_operation", photoOperation)
            if (photoOperation === 'new') {
                formData.append("background_image", photoUpload)
            }
            const result = await protectedApiCall(`/api/profile/theme`, 'POST', formData)
            setLoading(false)
            setOpen(false)
            triggerReload(Date.now())
        } catch (e) {
            console.error(e)
            captureException(e)
            setLoading(false)
            setErrorText("Sorry, something went wrong. Please try a different photo.")
        }

    }

    const updateBackgroundPhoto = async (e) => {
        const file = e.target.files[0]
        e.target.value = ""
        setErrorText("")
        setPhotoConversionInProgress(true)
        if (file) {
            let fileToUse = file
            try {
                const compressedFile = await compressImage(fileToUse)
                fileToUse = compressedFile
            } catch (e) {
                console.error("Unable to compress or convert image - skipping compression stage")
                console.error(e)
                captureException(e)
                fileToUse = file

                if (file.type === "image/heic" || file.type === "image/heif") {
                    setErrorText("Sorry, we couldn't use that photo. Please try a different photo.")
                    setPhotoConversionInProgress(false)
                    return
                }
            }

            setPhotoUpload(fileToUse)
            setPhotoOperation('new')
            setBackground({
                type: 'photo',
                url: URL.createObjectURL(fileToUse)
            })
        }
        setPhotoConversionInProgress(false)
    }

    const onThemeReset = async () => {
        setBackground(originalBackground)
        setPhotoOperation('none')
        setErrorText("")
    }

    const onPhotoRemove = async () => {
        setPhotoUpload(null)
        setErrorText("")
        setPhotoOperation('clear')
        setBackground({
            type: "none",
        })
    }

    const onClose = () => {
        setBackground(originalBackground)
        setPhotoOperation('none')
        setPhotoUpload(null)
        setErrorText("")
        setOpen(false)
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

    const hasPhoto = !!background?.url
    return (
        <Modal open={!!open}>
            <Box style={modalStyle}>
                <Stack alignItems="center" justifyContent="center" spacing={4} >
                    <b>Background</b>
                    {hasPhoto &&
                        <Avatar variant="square" sx={{ height: '50%', width: "100%" }} src={photoOperation === "new" ? URL.createObjectURL(photoUpload) : background?.url} style={{ borderRadius: '5px' }} />
                    }
                    <Stack direction="row" justifyContent="center" spacing={4} style={{width: '100%'}}>
                        {hasPhoto && <div>
                            <Button disabled={loading || photoConversionInProgress} onClick={onPhotoRemove} style={{ margin: 0, padding: 0 }}>Remove</Button>
                        </div>}
                        {!hasPhoto && <PhotoUploadButton onPhotoChange={updateBackgroundPhoto} height="10rem" loading={loading || photoConversionInProgress}/>}

                    </Stack>
                    {errorText && <Typography variant="body2" style={{ color: 'red' }}>{errorText}</Typography>}
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Button disabled={loading } onClick={onClose}>Cancel</Button>
                        <Button disabled={loading || photoConversionInProgress} onClick={onThemeReset} variant="outlined" >Reset</Button>
                        <Button disabled={loading || photoConversionInProgress || photoOperation === "none"} onClick={onThemeUpdate} variant="contained">{loading ? "Updating..." : "Update"}</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
