import React from 'react'
import { Modal, Stack, Box, Button, Typography, TextField, Avatar } from '@mui/material';
import { truncateString } from '@/utils/formatters';
export default function CompactItemView({item}) {
    let { title, subtitle, caption, image } = item;

    return (
        <Stack direction="row" spacing={2}>
            <Avatar variant="square" style={{ height: "5rem", width: "5rem", borderRadius: '1rem' }} src={image} />
            <Stack>
                {title ? <Typography style={{ fontWeight: 600 }}>{truncateString(title, 30)}</Typography> : <div style={{ height: '1.2rem' }}></div>}
                {subtitle ? <Typography variant="subtitle1">{truncateString(subtitle, 35)}</Typography> : <div style={{ height: '1rem' }}></div>}
                <Typography variant="subtitle2">{truncateString(caption, 40)}</Typography>
            </Stack>
        </Stack>
    )
}
