import { Button, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import ImportExportIcon from '@mui/icons-material/ImportExport';

const buttonStyle = {
    textTransform: 'none'
}
export default function EditListPostButtonRow({ rearrangeEnabled = true, onNewItemClick }) {
    return (
        <Stack direction="row" justifyContent="center" spacing={3}>
            {rearrangeEnabled && <Button style={buttonStyle}>
                <Stack direction="row" alignContent="center">
                    <ImportExportIcon />
                    Reorder
                </Stack>
            </Button>}
            <Button style={buttonStyle} onClick={onNewItemClick}>
                <Stack direction="row" alignContent="center">
                    <AddIcon />
                    New Post
                </Stack>
            </Button>
        </Stack>
    )
}
