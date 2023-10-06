import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';
import { compressImage } from '@/utils/localImageProcessing';
import { protectedApiCall } from '@/utils/api';
// support delete and rename item
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
    const [photoChanged, setPhotoChanged] = useState(false)
    const [photoOperation, setPhotoOperation] = useState('none')

    const onThemeUpdate = async () => {
        if(photoOperation === 'none') {
            setOpen(false)
            return
        }

        setLoading(true)
        const formData = new FormData()
        formData.append("background_image_operation", photoOperation)
        if(photoOperation === 'new') {
            formData.append("background_image", photoUpload)
        }
        const result = await protectedApiCall(`/api/profile/theme`, 'POST', formData)
        setLoading(false)
        setOpen(false)
        triggerReload(Date.now())
    }

    const updateBackgroundPhoto =  async (e) => {
        const file = e.target.files[0]
        if (file) {
            let fileToUse = file
            try {
                const compressedFile = await compressImage(file)
                fileToUse = compressedFile
            } catch (e){
                console.error(e)
                fileToUse = file
            }

            setPhotoUpload(fileToUse)
            setPhotoOperation('new')
            setBackground({
                type: 'photo',
                url: URL.createObjectURL(fileToUse)
            })
        }
    }

    const onThemeReset = async () => {
        setBackground(originalBackground)
        setPhotoOperation('none')
    }

    const onPhotoRemove = async () => {
        setPhotoUpload(null)
        setPhotoOperation('clear')
        setBackground({
            type: "none",
        })
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
                <Stack alignItems="center" spacing={4} >
                    <b>Background</b>
                    Landscape images work best
                    {hasPhoto &&
                        <Avatar variant="square" sx={{ height: '50%', width: "80%" }} src={photoOperation === "new" ? URL.createObjectURL(photoUpload) : background?.url} style={{ marginRight: "1rem", borderRadius: '5px' }} />
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
                                onChange={updateBackgroundPhoto}
                            />
                            <label htmlFor="post-photo-upload">
                                <Button disabled={loading} style={{ margin: 0, padding: 0 }} component="span">
                                    {hasPhoto ? "Change " : "Add Photo"}
                                </Button>
                            </label>

                        </div>
                    </Stack>
                
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Button disabled={loading} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button disabled={loading} onClick={onThemeReset} variant="outlined" color="error">Reset</Button>
                        <Button disabled={loading || photoOperation === "none"} onClick={onThemeUpdate} variant="contained">Update</Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
