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

export default function TrailItem({ item }) {
    const { itemId, uri, name, meta = {}, location, commentary, image } = item
    const { length, trail_type, elevation_gain } = meta
    const newItem = {
        id: itemId,
        uri,
        title: name,
        image,
        subtitle: `${location} - ${trail_type} - ${length} +${elevation_gain}`,
        caption: commentary
    }
    return (
        <StandardPost item={newItem} />
    )
}