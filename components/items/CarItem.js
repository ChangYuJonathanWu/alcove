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
import StandardPost from './StandardPost';

export default function CarItem({ item }) {
    const { itemId, uri, name, image,  commentary, meta } = item
    const { car_type } = meta;

    const newItem = {
        id: itemId,
        uri,
        title: name,
        image,
        caption: commentary,
    }
    return (
        <StandardPost item={newItem} />
    )
}