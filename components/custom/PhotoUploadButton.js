import React, { useState } from 'react'
import { Stack, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ClimbingBoxLoader, SquareLoader, PulseLoader } from 'react-spinners';
import { compressImage } from '@/utils/localImageProcessing';
import { captureException } from '@sentry/nextjs';


export default function PhotoUploadButton({ onStart = () => { }, onComplete = () => { }, onError = () => { }, onRemove = () => { }, height, disable = false }) {
    const [photo, setPhoto] = useState(null)
    const [photoError, setPhotoError] = useState("")
    const [photoConversionInProgress, setPhotoConversionInProgress] = useState(false)

    const onErrorCallback = () => {
        setPhotoError("Sorry, we couldn't use that photo. Please try a different photo.")
        setPhotoConversionInProgress(false)
        onError()
    }

    const compressCompleteCallback = async (compressedFile) => {
        setPhotoConversionInProgress(false)
        setPhoto(compressedFile)
        onComplete(compressedFile)
    }

    const onChange = async (e) => {
        onStart()
        setPhotoConversionInProgress(true)
        setPhotoError("")
        try {
            const photo = e.target.files[0]
            e.target.value = ""
            await compressImage(photo, compressCompleteCallback, onErrorCallback)
        } catch (e) {
            onErrorCallback()
            console.error(e)
            captureException(e)
            return

        }


    }

    const loading = photoConversionInProgress
    return (
        <Stack style={{ width: '100%' }} spacing={2}>
            {<Button disabled={loading} style={{ margin: 0, padding: 0, width: '100%' }} component="span">
                <Stack data-cy="standard-post-form--image-field" justifyContent="center" alignItems="center" style={{ width: "100%", height, border: "2px dashed", borderRadius: '1rem' }}>
                    <input
                        accept="image/*,.heic,.heif"
                        style={{ display: 'none' }}
                        id="post-photo-upload"
                        type="file"
                        onChange={onChange} />
                    <label htmlFor="post-photo-upload">
                        <Stack alignItems="center" spacing={4}>
                            {loading ? <PulseLoader color="grey" size={8} /> : <AddPhotoAlternateIcon />}
                            {loading ? "Uploading" : "Add Photo"}
                        </Stack>
                    </label>
                </Stack>
            </Button>}
            {photoError && <span style={{ textAlign: "center" }}>{photoError}</span>}
        </Stack>
    )
}
