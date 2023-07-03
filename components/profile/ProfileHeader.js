import React from 'react'
import Head from 'next/head'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';

import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'

export default function ProfileHeader({ user, setEditMode, ownerSignedIn }) {
    const { title, description, handle, photo, social_links } = user;
    const { instagram, facebook, bereal, snapchat, tiktok, twitter, reddit, linkedin } = social_links
    const hasSocialLinks = instagram || facebook

    return (
        <Stack direction="row" justifyContent={"center"} >
            <Paper variant="" sx={{ paddingLeft: '2rem', paddingRight: '2rem', margin: '1rem', marginBottom: '1rem', backgroundColor: PAPER_COLOR, maxWidth: '300px' }}>
                <Stack alignItems="center" style={{ paddingBottom: hasSocialLinks ? "0.5rem" : "1rem" }}>
                    <Avatar id={`${handle}-profile-photo`} alt={handle} sx={{ width: 100, height: 100 }} style={{ margin: "1rem" }} src={photo} />
                    <Typography variant="h1">{title}</Typography>
                    {handle && <Typography variant="subtitle1">{`@${handle}`}</Typography>}

                    <Typography variant="body">{description}</Typography>
                    {hasSocialLinks && <Stack direction="row">
                        {instagram && <IconButton id="instagram-bio-link" href={`https://www.instagram.com/${instagram}`} target="_blank">
                            <InstagramIcon />
                        </IconButton>}
                        {tiktok && <IconButton id="tiktok-bio-link" href={`https://www.tiktok.com/${tiktok}`} target="_blank">
                            <Image priority={true} src="/social_icons/tiktok-icon.svg" width={20} height={20} alt="TikTok logo" />
                        </IconButton>}
                        {bereal && <IconButton id="bereal-bio-link" href={`https://www.bereal.com/${bereal}`} target="_blank">
                            <Image priority={true} src="/social_icons/bereal-icon.svg" width={20} height={20} alt="BeReal logo" />
                        </IconButton>}
                        {snapchat && <IconButton id="snapchat-bio-link" href={`https://www.snapchat.com/${snapchat}`} target="_blank">
                            <Image priority={true} src="/social_icons/snapchat-icon.svg" width={20} height={20} alt="Snapchat logo" />
                        </IconButton>}
                        {facebook && <IconButton id="facebook-bio-link" href={`https://www.facebook.com/${facebook}`} target="_blank">
                            <FacebookIcon />
                        </IconButton>}
                        {twitter && <IconButton id="twitter-bio-link" href={`https://www.twitter.com/${twitter}`} target="_blank">
                            <TwitterIcon />
                        </IconButton>}
                        {reddit && <IconButton id="reddit-bio-link" href={`https://www.reddit.com/${reddit}`} target="_blank">
                            <RedditIcon />
                        </IconButton>}
                        {linkedin && <IconButton id="linkedin-bio-link" href={`https://www.linkedin.com/${linkedin}`} target="_blank">
                            <LinkedInIcon />
                        </IconButton>}
                    </Stack>}
                    {ownerSignedIn && <Button style={{ textTransform: 'none', color: 'black', borderColor: 'gray', fontSize: '0.8rem', width: '100%' }} variant="outlined" onClick={() => setEditMode(true)}>Edit Profile</Button>}
                </Stack>
            </Paper>
        </Stack>
    )
}
