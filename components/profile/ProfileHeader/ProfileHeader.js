import React, { useState } from 'react'
import Head from 'next/head'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography, Button, Grid, Divider } from '@mui/material';

import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';
import { DEFAULT_PAPER_COLOR, PROFILE_ITEMS_WIDTH } from '@/utils/themeConfig';
import Skeleton from '@mui/material/Skeleton';
import ProfilePhotoLoader from './ProfilePhotoLoader';
import { alcoveOpenDomain } from '@/utils/formatters';

const PAPER_COLOR = DEFAULT_PAPER_COLOR
const MAX_WIDTH = PROFILE_ITEMS_WIDTH

const IconGridItem = ({ children }) => {
    return (
        <div>
            {children}
        </div>

    )
}
export default function ProfileHeader({ user, setEditMode, ownerSignedIn, mobileApp = false }) {
    const { title, description, handle, photo, social_links, demo = false } = user;
    let { instagram, facebook, bereal, snapchat, tiktok, twitter, reddit, linkedin } = social_links
    const hasSocialLinks = instagram || facebook || bereal || snapchat || tiktok || twitter || reddit || linkedin
    const [profilePhotoLoaded, setProfilePhotoLoaded] = useState(false)

    // For all social_links, if they start with @, remove it
    if (instagram?.startsWith('@')) { instagram = instagram.slice(1) }
    if (facebook?.startsWith('@')) { facebook = facebook.slice(1) }
    if (bereal?.startsWith('@')) { bereal = bereal.slice(1) }
    if (snapchat?.startsWith('@')) { snapchat = snapchat.slice(1) }
    if (tiktok?.startsWith('@')) { tiktok = tiktok.slice(1) }
    if (twitter?.startsWith('@')) { twitter = twitter.slice(1) }
    if (reddit?.startsWith('@')) { reddit = reddit.slice(1) }
    if (linkedin?.startsWith('@')) { linkedin = linkedin.slice(1) }

    const buildUrl = (uri) => {
        return alcoveOpenDomain(uri, mobileApp)
    }

    return (
        <Stack direction="row" justifyContent={"center"} style={{ paddingLeft: '1rem', paddingRight: '1rem', marginBottom: '1.5rem' }}>

            <Stack alignItems="center" style={{ width: '100%' }}>
                <ProfilePhotoLoader uri={photo} handle={handle} />
                <Paper sx={{ paddingTop: '3.5rem', borderRadius: '1rem', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH, width: '100%' }}>
                    <Stack alignItems="center" style={{ paddingBottom: hasSocialLinks ? "0.5rem" : "1rem", paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>

                        <Typography variant="h3" style={{ textAlign: "center", fontSize: '20px' }}>{title}</Typography>
                        {!demo && handle && <Typography variant="subtitle2">{`@${handle}`}</Typography>}

                        <Typography style={{ width: "100%", textAlign: "center", whiteSpace: "pre-wrap" }} variant="body2">{description}</Typography>
                        {hasSocialLinks && <Divider sx={{ width: "100%", margin: '0.4rem' }} />}
                        {hasSocialLinks && <Grid style={{ maxWidth: MAX_WIDTH }} columns={4} container direction="row" spacing={0} justifyContent="center" alignItems={"center"}>
                            {instagram && <IconGridItem><IconButton id="instagram-bio-link" href={buildUrl(`https://www.instagram.com/${instagram}`)} target="_blank">
                                <InstagramIcon />
                            </IconButton></IconGridItem>}
                            {tiktok && <IconGridItem><IconButton id="tiktok-bio-link" href={buildUrl(`https://www.tiktok.com/@${tiktok}`)} target="_blank">
                                <Image priority={true} src="/social_icons/tiktok-icon.svg" width={20} height={20} alt="TikTok logo" />
                            </IconButton></IconGridItem>}
                            {bereal && <IconGridItem> <IconButton id="bereal-bio-link" href={buildUrl(`https://www.BeRe.al/${bereal}`)} target="_blank">
                                <Image priority={true} src="/social_icons/bereal-icon.svg" width={20} height={20} alt="BeReal logo" />
                            </IconButton></IconGridItem>}
                            {snapchat && <IconGridItem><IconButton id="snapchat-bio-link" href={buildUrl(`https://www.snapchat.com/add/${snapchat}`)} target="_blank">
                                <Image priority={true} src="/social_icons/snapchat-icon.svg" width={20} height={20} alt="Snapchat logo" />
                            </IconButton></IconGridItem>}
                            {facebook && <IconGridItem><IconButton id="facebook-bio-link" href={buildUrl(`https://www.facebook.com/${facebook}`)} target="_blank">
                                <FacebookIcon />
                            </IconButton></IconGridItem>}
                            {twitter && <IconGridItem><IconButton id="twitter-bio-link" href={buildUrl(`https://www.twitter.com/${twitter}`)} target="_blank">
                                <TwitterIcon />
                            </IconButton></IconGridItem>}
                            {reddit && <IconGridItem><IconButton id="reddit-bio-link" href={buildUrl(`https://www.reddit.com/user/${reddit}`)} target="_blank">
                                <RedditIcon />
                            </IconButton></IconGridItem>}
                            {linkedin && <IconGridItem> <IconButton id="linkedin-bio-link" href={buildUrl(`https://www.linkedin.com/in/${linkedin}`)} target="_blank">
                                <LinkedInIcon />
                            </IconButton></IconGridItem>}
                        </Grid>}
                        {ownerSignedIn && <Button style={{ textTransform: 'none', color: 'black', borderColor: 'gray', fontSize: '0.8rem', marginTop: '0.5rem' }} variant="outlined" onClick={() => setEditMode(true)}>Edit Profile</Button>}
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    )
}
