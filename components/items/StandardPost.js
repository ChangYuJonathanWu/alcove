import React from 'react'
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { Button, Typography, Link, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { isValidUrl } from '@/utils/formatters';

// TODO: Rename item to post. Keeping to maintain interface with other bespoke item/post types
export default function StandardPost({ item, editMode = false, setPostToEdit }) {
    const { id, parentId, uri, title, image, subtitle, caption } = item
    const captionToUse = caption ? `${caption}` : ""

    const onEditClick = (e) => {
        e.preventDefault()
        setPostToEdit(item)
    }

    return (
        <ListItem key={id} sx={{ paddingTop: "0rem", paddingBottom: "1rem"}}>

            <Stack direction="column" alignItems="start" spacing={0} style={{ width: "100%" }}>
                <Divider sx={{ width: "100%", marginBottom: '1rem' }}></Divider>
                <Typography variant="h4">
                    {isValidUrl(uri) ?
                        <Link variant="inherit" color="inherit" href={uri} underline="none" target="_blank" rel="noreferrer">
                            <Stack direction="row" spacing={1} alignItems={"center"}>
                                <b>{title}</b>
                                <OpenInNewIcon style={{ width: "1rem" }} />
                            </Stack>
                        </Link>
                        : <b>{title}</b>}
                </Typography>

                {subtitle && <Typography variant="subtitle2" fontSize="0.7rem" style={{marginBottom: '0.2rem'}}>{`${subtitle}`}</Typography>}
                {image && <Avatar variant="square" sx={{ width: '100%', height: '100%', margin: 'auto' }} src={image} style={{borderRadius: '5px'}} />}
                <Stack direction="row" style={{ width: "100%", marginTop: '0.8rem' }} alignContent="space-between" justifyContent="space-between">
                    <Stack>
                        {captionToUse && <Typography variant="caption" style={{ whiteSpace: "pre-wrap" }}>{captionToUse}</Typography>}
                    </Stack>
                    {editMode && <EditNoteIcon onClick={onEditClick} />}
                </Stack>

            </Stack >
        </ListItem >
    )
}