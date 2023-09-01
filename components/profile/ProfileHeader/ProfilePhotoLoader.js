import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { DEFAULT_PAPER_COLOR, PROFILE_ITEMS_WIDTH } from '@/utils/themeConfig';
import Skeleton from '@mui/material/Skeleton';
import PersonIcon from '@mui/icons-material/Person';

const PAPER_COLOR = DEFAULT_PAPER_COLOR
const MAX_WIDTH = PROFILE_ITEMS_WIDTH

const PHOTO_DIM = 100
const BORDER_THICKNESS = 3
const PHOTO_DIM_WITH_BORDER = PHOTO_DIM - 2 * BORDER_THICKNESS

const containerStyle = { backgroundColor: 'white', width: PHOTO_DIM, height: PHOTO_DIM, borderRadius: '50%', position: 'relative', top: `${PHOTO_DIM / 2}px`, }

export default function ProfilePhotoLoader({ uri, handle }) {
    const [profilePhotoLoaded, setProfilePhotoLoaded] = useState(false)
    const photoReady = profilePhotoLoaded || !uri

    const avatarStyle = uri ? { width:PHOTO_DIM_WITH_BORDER, height: PHOTO_DIM_WITH_BORDER } : {}
    return (
        <div style={containerStyle}>
            {!photoReady &&
                <div>
                    <Skeleton variant="circular" width={PHOTO_DIM} height={PHOTO_DIM} />
                </div>
            }
            <Avatar imgProps={{ onLoad: () => setProfilePhotoLoaded(true) }}
                id={`${handle}-profile-photo`}
                alt={handle} 
                sx={{ width:PHOTO_DIM_WITH_BORDER, height: PHOTO_DIM_WITH_BORDER }}
                style={{ display: photoReady ? 'block' : 'none', border: `${BORDER_THICKNESS}px solid ${PAPER_COLOR}` }}
                src={uri}
            >
                <PersonIcon style={{ width:PHOTO_DIM_WITH_BORDER, height: PHOTO_DIM_WITH_BORDER }} />
                
            </Avatar>

        </div>
    )
}
