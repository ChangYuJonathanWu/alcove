import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { Button, Typography, Link, Divider, Skeleton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { isValidUrl } from '@/utils/formatters';

// TODO: Rename item to post. Keeping to maintain interface with other bespoke item/post types
export default function StandardPost({ item, editMode = false, setPostToEdit }) {
    const { id, parentId, uri, title, image, subtitle, caption } = item
    const captionToUse = caption ? `${caption}` : ""

    const [photoLoaded, setPhotoLoaded] = useState(false)

    const onEditClick = (e) => {
        e.preventDefault()
        setPostToEdit(item)
    }

    const PHOTO_SKELETON_HEIGHT = '12rem'
    const IMAGE_BORDER_RADIUS = '0.5rem'

    return (
        <ListItem key={id} sx={{ paddingTop: "0rem", paddingBottom: "1rem", marginTop: '0rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#fafafa', border: '1px #ebebeb solid', borderRadius: '1rem', width: '100%' }}>
                <Stack direction="column" alignItems="start" spacing={0} style={{ width: "100%" }}>
                    <Typography variant="h4" style={{ fontSize: '1rem', marginBottom: image && !subtitle ? '0.5rem' : 0 }}>
                        {isValidUrl(uri) ?
                            <Link variant="inherit" color="inherit" href={uri} underline="none" target="_blank" rel="noreferrer">
                                <Stack direction="row" spacing={1} alignItems={"center"}>
                                    <b>{title}</b>
                                    <OpenInNewIcon style={{ width: "1rem" }} />
                                </Stack>
                            </Link>
                            : title}
                    </Typography>

                    {subtitle && <Typography variant="subtitle2" fontSize="0.7rem" style={{ marginBottom: '0.2rem' }}>{`${subtitle}`}</Typography>}
                    {image &&
                        <div style={{width: '100%'}}>
                            {!photoLoaded && <Skeleton variant="rectangular" height={PHOTO_SKELETON_HEIGHT} style={{borderRadius: IMAGE_BORDER_RADIUS}}/>}
                            <Avatar variant="square" imgProps={{ onLoad: () => setPhotoLoaded(true), style: {borderRadius: IMAGE_BORDER_RADIUS} }} sx={{ display: photoLoaded ? 'block' : 'none', width: '100%', height: "100%" }} src={image} />
                        </div>
                    }
                    <Stack direction="row" style={{ width: "100%", marginTop: '0.5rem' }} alignContent="space-between" justifyContent="space-between">
                        <Stack>
                            {captionToUse && <Typography variant="caption" style={{ whiteSpace: "pre-wrap" }}>{captionToUse}</Typography>}
                        </Stack>
                        {editMode && <EditNoteIcon onClick={onEditClick} />}
                    </Stack>

                </Stack >
            </div>
        </ListItem >
    )
}