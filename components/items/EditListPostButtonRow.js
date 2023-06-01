import { Button, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import ImportExportIcon from '@mui/icons-material/ImportExport';

const buttonStyle = {
    textTransform: 'none'
}
export default function EditListPostButtonRow({ rearrangeEnabled = false, onNewItemClick }) {
    return (
        <Stack direction="row" justifyContent="center" spacing={3}>
            {rearrangeEnabled && <Button style={buttonStyle}>
                <Stack direction="row" alignContent="center">
                    <ImportExportIcon />
                    Rearrange
                </Stack>
            </Button>}
            <Button style={buttonStyle} onClick={onNewItemClick}>
                <Stack direction="row" alignContent="center">
                    <AddIcon />
                    New Item
                </Stack>
            </Button>
        </Stack>
    )
}
