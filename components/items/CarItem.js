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

export default function CarItem({ item }) {
    const { itemId, uri, name, image,  commentary, meta } = item
    const { car_type } = meta;
    const commentaryToUse = commentary ? `"${commentary}"` : ""
    return (
        <ListItemButton target="_blank" href={uri} key={itemId} sx={{ paddingTop: "0.5rem" }}>
            <Stack direction="column" alignItems="start" >
                <Avatar variant="square"  sx={{ width: '100%', height: '100%' }} src={image} style={{ marginRight: "1rem", borderRadius: '5px' }} />
                <Stack>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant="caption">{commentaryToUse}</Typography>
                </Stack>
            </Stack>
        </ListItemButton>
    )
}