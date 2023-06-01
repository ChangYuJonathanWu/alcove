import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export default function StandardPost({ item }) {
    const { id, uri, title, image, subtitle, caption } = item
    const captionToUse = caption ? `"${caption}"` : ""
    return (
        <ListItemButton target="_blank" href={uri} key={id} sx={{ paddingTop: "0.5rem" }}>
            <Stack direction="column" alignItems="start" spacing={1}>
                <Avatar variant="square" sx={{ width: '100%', height: '100%' }} src={image} style={{ marginRight: "1rem", borderRadius: '5px' }} />
                <Stack>
                    <Typography variant="h4"><b>{title}</b></Typography>
                    <Typography variant="body2" fontSize="0.8rem">{`${subtitle}`}</Typography>
                    <Typography variant="caption">{captionToUse}</Typography>
                </Stack>
            </Stack>
        </ListItemButton>
    )
}