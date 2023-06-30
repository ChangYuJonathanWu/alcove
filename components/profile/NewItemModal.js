import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { refreshFirebaseToken } from '@/lib/api/tokenRefresh';


export default function NewItemModal({ open, setOpen, triggerReload }) {
    const [name, setName] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [itemType, setItemType] = useState("list")
    const [linkAddress, setLinkAddress] = useState("")
    const [loading, setLoading] = useState(false)
    const clearInputs = () => {
        setItemType("list")
        setLinkAddress("")
        setName("")
        setSubtitle("")
        setLoading(false)
    }
    const onNewItem = async () => {
        setLoading(true)
        const body = {
            name,
            subtitle,
            type: itemType,
            uri: linkAddress,
        }
        const token = await refreshFirebaseToken()
        const result = await fetch(`/api/profile/items`, { method: "POST", body: JSON.stringify(body) })
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
        <Modal open={open}>
            <Box style={modalStyle}>
                <Stack alignItems="center" spacing={4} >
                    <TextField style={{ width: "100%" }} size="small" label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                    {itemType === "list" && <TextField style={{ width: "100%" }} size="small" label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} />}
                    <FormControl>
                        <FormLabel id="item-type">Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="item-type"
                            value={itemType}
                            onChange={(e) => setItemType(e.currentTarget.value)}
                            row
                            name="item-type-radio-buttons-group"
                        >
                            <FormControlLabel value="list" control={<Radio />} label="List" />
                            <FormControlLabel value="uri" control={<Radio />} label="Link" />
                        </RadioGroup>
                    </FormControl>
                    {itemType === "uri" &&
                        <TextField size="small" style={{ width: "100%" }} label="Link (URL)" value={linkAddress} onChange={(e) => setLinkAddress(e.target.value)} />}
                    <Stack direction="row" spacing={1}>
                        <Button disabled={loading} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button disabled={loading || !name || (itemType === "uri" && !linkAddress)} onClick={onNewItem} variant="contained">Create</Button>
                    </Stack>
                </Stack>


            </Box>

        </Modal>
    )
}
