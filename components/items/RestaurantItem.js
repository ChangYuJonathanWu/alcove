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

export default function RestaurantItem({ item }) {
    const { itemId, uri, name, image, cuisine, location, commentary } = item
    const commentaryToUse = commentary ? `"${commentary}"` : ""
    return (
            <ListItemButton target="_blank" href={uri} key={itemId} sx={{paddingTop: "0.5rem"}}>
                <Stack direction="row" alignItems="start" >
                    <Avatar sx={{ width: 40, height: 40 }} src={image} style={{ marginRight: "1rem" }} />
                    <Stack>
                        <Typography variant="h4">{name}</Typography>
                        <Typography variant="body2" fontSize="0.8rem">{`${cuisine} - ${location}`}</Typography>
                        <Typography variant="caption">{commentaryToUse}</Typography>
                    </Stack>
                </Stack>
            </ListItemButton>
    )
}