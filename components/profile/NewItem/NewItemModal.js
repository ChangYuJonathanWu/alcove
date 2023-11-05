import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import * as Sentry from '@sentry/react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Image from 'next/image';

// Post Forms
import StandardPostForm from '@/components/profile/NewPost/StandardPostForm'
// Item Icons
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import LinkIcon from '@mui/icons-material/Link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemForm from './ListItemForm';
import LinkItemForm from './LinkItemForm';

// support delete and rename item
export default function NewPostModal({ open, setOpen, triggerReload }) {

    const handleChange = (event, nextView) => {
        setItemType(nextView);
        setView(nextView)
    };
    const [listId, setListId] = useState("")
    const [loading, setLoading] = useState(false)
    const [itemType, setItemType] = useState(null)
    const [view, setView] = useState("type-selection")
    const [error, setError] = useState("")

    const clearItems = () => {
        setError("")
        setItemType(null)
    }

    const onExit = () => {
        clearItems()
        setOpen(false)
    }


    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "300px",
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        maxHeight: '80vh',
        overflowY: 'auto',
        paddingBottom: '3rem'
    };
    //TODO: Validate input; set character limits
    //TODO: Allow setting new Link instead of having to delete and recreate

    const PostTypeButton = ({ name, icon, disabled = false, standalone = false }) => {
        return (
            < Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    {icon}
                    <Typography variant="button" style={{ textTransform: 'none', color: disabled ? 'grey' : 'black' }}>
                        {name}
                    </Typography>
                </Stack>

                {standalone && <ChevronRightIcon style={{ color: 'black' }} />}
            </Stack>
        )
    }

    const getPostTypeButton = ({ value, disabled = false, standalone = false }) => {
        switch (value) {
            case "list":
                return <PostTypeButton name="List" icon={<ViewStreamIcon style={{ width: 20, color: 'orange', paddingBottom: '1px' }} />} disabled={disabled} standalone={standalone} />
            case "link":
                return <PostTypeButton name="Link" icon={<LinkIcon style={{ width: 20, color: 'orange', paddingBottom: '1px' }} />} disabled={disabled} standalone={standalone} />
            default:
                return <div></div>
        }
    }

    return (
        <Modal open={open} data-cy="new-item-selection-modal">
            <Box style={modalStyle}>
                <Stack alignItems="center" justifyContent="space-between" spacing={2} style={{ width: '100%' }} >
                    <Stack data-cy="new-item-selection-modal--header" style={{ width: '100%' }} direction="row" alignItems="end" justifyContent={"space-between"}>
                        <Typography variant="h3" style={{fontSize: '1.2rem'}}>New Highlight</Typography>
                        <CloseIcon data-cy="new-item-selection-modal--close-button" style={{ width: '2rem' }} onClick={onExit} />
                    </Stack>

                    {itemType &&
                        <ToggleButton value={itemType} onClick={() => setItemType(null)} style={{ width: '100%' }} data-cy="new-item-selection-modal--indicator-toggle">
                            {getPostTypeButton({ value: itemType, standalone: true })}
                        </ToggleButton>}
                    {itemType === "list" && <ListItemForm onExit={onExit} clearItems={clearItems} setLoading={setLoading} setError={setError} triggerReload={triggerReload} />}
                    {itemType === "link" && <LinkItemForm onExit={onExit} clearItems={clearItems} setLoading={setLoading} setError={setError} triggerReload={triggerReload} />}
                    {!itemType && <ToggleButtonGroup
                        orientation="vertical"
                        value={itemType}
                        exclusive
                        onChange={handleChange}
                        style={{ width: '100%', borderRadius: '1rem' }}
                    >
                        <ToggleButton value="list" aria-label="New List Item" data-cy="new-item-type-list" >
                            {getPostTypeButton({ value: "list" })}
                        </ToggleButton>
                        <ToggleButton value="link" aria-label="New Link Item" data-cy="new-item-type-link">
                            {getPostTypeButton({ value: "link" })}
                        </ToggleButton>
                    </ToggleButtonGroup>}
                </Stack>
            </Box>
        </Modal>
    )
}
