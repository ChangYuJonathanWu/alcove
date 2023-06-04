import React from 'react'
import Head from 'next/head'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';

import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function ProfileHeader({ user, setEditMode, ownerSignedIn }) {
    const { title, description, handle, photo, social_links } = user;
    const { instagram, facebook } = social_links
    const hasSocialLinks = instagram || facebook

    return (
        <Stack direction="row" justifyContent={"center"} >
            <Paper variant="" sx={{ paddingLeft: '2rem', paddingRight: '2rem', margin: '1rem', marginBottom: '1rem', backgroundColor: PAPER_COLOR }}>
                <Stack alignItems="center" style={{ paddingBottom: hasSocialLinks ? "0.5rem" : "1rem"}}>
                    <Avatar alt={handle} sx={{ width: 100, height: 100 }} style={{ margin: "1rem" }} src={photo} />
                    <Typography variant="h1">{title}</Typography>
                    {handle && <Typography variant="subtitle1">{`@${handle}`}</Typography>}

                    <Typography variant="body">{description}</Typography>
                    {hasSocialLinks && <Stack direction="row">
                        {instagram && <IconButton href={`https://www.instagram.com/${instagram}`} target="_blank">
                            <InstagramIcon />
                        </IconButton>}
                        {facebook && <IconButton href={`https://www.facebook.com/${facebook}`} target="_blank">
                            <FacebookIcon />
                        </IconButton>}
                    </Stack>}
                    {ownerSignedIn && <Button style={{textTransform: 'none', color: 'black', borderColor: 'gray', fontSize: '0.8rem', width: '100%'}} variant="outlined" onClick={() => setEditMode(true)}>Edit Profile</Button>}
                </Stack>
            </Paper>
        </Stack>
    )
}
