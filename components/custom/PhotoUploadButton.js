import React, { useState } from 'react'
import { Stack, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ClimbingBoxLoader, SquareLoader, PulseLoader } from 'react-spinners';
import { compressImage } from '@/utils/localImageProcessing';


export default function PhotoUploadButton({ onStart = () => { }, onComplete = () => { }, onError = () => { }, height, disable=false }) {
    const [photoError, setPhotoError] = useState("")
    const [photoConversionInProgress, setPhotoConversionInProgress] = useState(false)

    const reset = () => {
        setPhotoError("")
        setPhotoConversionInProgress(false)
    }

    const onChange = async (e) => {
        onStart()
        const photo = e.target.files[0]
        e.target.value = ""
        setPhotoConversionInProgress(true)
        let fileToUse = photo
        try {
            const compressedFile = await compressImage(photo)
            fileToUse = compressedFile

        } catch (e) {
            if (photo.type === "image/heic" || photo.type === "image/heif") {
                setPhotoError("Sorry, we couldn't use that photo. Please try a different photo.")
                setPhotoConversionInProgress(false)
                fileToUse = null
                return
            }
            fileToUse = photo
            console.error("Could not compress post photo - using original.")
            console.error(e)
            Sentry.captureException(e)

        }
        setPhotoConversionInProgress(false)
        onComplete(fileToUse)

    }

    const loading = photoConversionInProgress
    return (
        <Stack style={{ width: '100%' }} spacing={2}>
            <Button disabled={loading} style={{ margin: 0, padding: 0, width: '100%' }} component="span">
                <Stack data-cy="standard-post-form--image-field" justifyContent="center" alignItems="center" style={{ width: "100%", height, border: "2px dashed", borderRadius: '1rem' }}>
                    <input
                        accept="image/*"
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
            </Button>
            {photoError && <span style={{ textAlign: "center" }}>{photoError}</span>}
        </Stack>
    )
}
