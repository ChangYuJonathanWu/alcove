import React from 'react'

import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ChevronRight from '@mui/icons-material/ChevronRight'
import Paper from '@mui/material/Paper';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { Typography } from '@mui/material';

import { getAuth } from "firebase/auth";
import { refreshFirebaseToken } from '@/lib/api/tokenRefresh';
import { DEFAULT_PAPER_COLOR, PROFILE_ITEMS_WIDTH, ITEM_FONT_SIZE } from '@/utils/themeConfig';

const PAPER_COLOR =  DEFAULT_PAPER_COLOR
const MAX_WIDTH =  PROFILE_ITEMS_WIDTH
export default function NewItemButton({onClick}) {
    const submitNewItem = async () => {
        const body = {
            name: newItemName,
            type: newItemType,
        }
        const token = await refreshFirebaseToken()
        const result = await fetch(`/api/profile/items`, { method: "POST", body: JSON.stringify(body)})
    }
    return (
        <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <Paper variant="" sx={{ borderRadius: '1rem', margin: '1rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: '0.5rem', width: '100%', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH }}>
                <ListItemButton data-cy="new-item-button" id={'new-item-button'} key={'new-item-button'} disableRipple={true} onClick={onClick}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <AddIcon />
                        <Typography variant="h3" style={{fontSize: ITEM_FONT_SIZE}}>New Item</Typography>
                    </Stack>
                </ListItemButton>
            </Paper>
        </div>
    )
}
