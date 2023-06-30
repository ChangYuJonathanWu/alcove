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

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'
const MAX_WIDTH = "600px"
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
            <Paper variant="" sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: '0.5rem', width: '100%', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH }}>
                <ListItemButton id={'new-item-button'} key={'new-item-button'} disableRipple={true} onClick={onClick}>
                    <Stack direction="row" alignItems="start" spacing={2}>
                        <AddIcon />
                        <Typography variant="h3"><em> New Item</em></Typography>
                    </Stack>
                </ListItemButton>
            </Paper>
        </div>
    )
}
