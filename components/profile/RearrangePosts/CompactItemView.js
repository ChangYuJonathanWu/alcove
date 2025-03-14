import React from 'react'
import { Modal, Stack, Box, Button, Typography, TextField, Avatar } from '@mui/material';
import { truncateString } from '@/utils/formatters';
export default function CompactItemView({item}) {
    let { title, subtitle, caption, uri, image } = item;
    const photoOnly = !title && !subtitle && !caption && !uri && image
    return (
        <Stack direction="row" spacing={2} justifyContent={photoOnly ? 'center' : 'start'} style={{width: '100%'}}>
            {image && <Avatar variant="square" style={{ height: photoOnly ? '8rem' : "5rem", width: photoOnly ? 'auto' : "5rem", borderRadius: '1rem' }} src={image} />}
            <Stack>
                {title ? <Typography style={{ fontWeight: 600 }}>{truncateString(title, 30)}</Typography> : <div style={{ height: '1.2rem' }}></div>}
                {subtitle ? <Typography variant="subtitle1">{truncateString(subtitle, 35)}</Typography> : <div style={{ height: '1rem' }}></div>}
                {caption ? <Typography variant="subtitle2">{truncateString(caption, 40)}</Typography> : <div style={{ height: '1rem' }}></div>}
                {uri ? <a href={uri}><Typography variant="subtitle2">{truncateString(uri, 40)}</Typography></a> : <div style={{ height: '1rem' }}></div>}
            </Stack>
        </Stack>
    )
}
