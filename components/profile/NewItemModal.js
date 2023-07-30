import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { formatUri, isValidUrlWithoutProtocol } from '@/utils/formatters';
import { protectedApiCall } from '@/utils/api';


export default function NewItemModal({ open, setOpen, triggerReload }) {
    const [name, setName] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [itemType, setItemType] = useState("list")
    const [linkAddress, setLinkAddress] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const clearInputs = () => {
        setItemType("list")
        setLinkAddress("")
        setName("")
        setSubtitle("")
        setError("")
        setLoading(false)
    }
    const onNewItem = async () => {
        setError("")
        if(linkAddress && !isValidUrlWithoutProtocol(linkAddress)) {
            setError("Please enter a valid link")
            return
        }
        setLoading(true)
        const body = {
            name,
            subtitle,
            type: itemType,
            uri: linkAddress,
        }
        const result = await protectedApiCall(`/api/profile/items`, 'POST', JSON.stringify(body))
        setLoading(false)
        setOpen(false)
        clearInputs()
        triggerReload(Date.now())
    }
    const modalStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "300px",
        backgroundColor: 'white',
        borderRadius: '7px',
        padding: '2rem',
    };
    //TODO: Validate input; set character limits
    return (
        <Modal data-cy="new-item-modal" open={open}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField data-cy="new-item-modal--item-name" style={{ width: "100%" }} size="small" label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                    {itemType === "list" && <TextField data-cy="new-item-modal--item-subtitle" style={{ width: "100%" }} size="small" label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} />}
                    <FormControl>
                        <FormLabel id="item-type">Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="item-type"
                            data-cy="new-item-modal--item-type"
                            value={itemType}
                            onChange={(e) => setItemType(e.currentTarget.value)}
                            row
                            name="item-type-radio-buttons-group"
                        >
                            <FormControlLabel data-cy="new-item-modal--item-type--list" value="list" control={<Radio />} label="List" />
                            <FormControlLabel data-cy="new-item-modal--item-type--link" value="uri" control={<Radio />} label="Link" />
                        </RadioGroup>
                    </FormControl>
                    {itemType === "uri" &&
                        <TextField data-cy="new-item-modal--item-uri" size="small" style={{ width: "100%" }} label="Link (URL)" value={linkAddress} onChange={(e) => setLinkAddress(formatUri(e.target.value))} />}
                    {error && <Typography color="error">{error}</Typography>}
                    <Stack direction="row" spacing={1}>
                        <Button data-cy="new-item-modal--cancel" disabled={loading} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button data-cy="new-item-modal--create" disabled={loading || !name || (itemType === "uri" && !linkAddress)} onClick={onNewItem} variant="contained">Create</Button>
                    </Stack>
                </Stack>


            </Box>

        </Modal>
    )
}
