import React from 'react'
import { Stack, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ClimbingBoxLoader, SquareLoader, PulseLoader } from 'react-spinners';


export default function PhotoUploadButton({ onPhotoChange, loading, height }) {
    return (
        <Button disabled={loading} style={{ margin: 0, padding: 0, width: '100%' }} component="span">
            <Stack data-cy="standard-post-form--image-field" justifyContent="center" alignItems="center" style={{ width: "100%", height, border: "2px dashed", borderRadius: '1rem' }}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="post-photo-upload"
                    type="file"
                    onChange={onPhotoChange} />
                <label htmlFor="post-photo-upload">
                    <Stack alignItems="center" spacing={4}>
                        { loading ? <PulseLoader color="grey" size={8}/> : <AddPhotoAlternateIcon />}
                        { loading ? "Uploading" : "Add Photo"}
                    </Stack>
                </label>
            </Stack>
        </Button>
    )
}
