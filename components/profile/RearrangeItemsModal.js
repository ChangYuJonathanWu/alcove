import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { refreshFirebaseToken } from '@/lib/api/tokenRefresh';


export default function RearrangeItemsModal({ open, setOpen, triggerReload, user }) {
  const { profile } = user;
  const { item_order = [], items = {} } = profile
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(item_order)
  const [profileItems, setProfileItems] = useState({})

  useEffect(() => {
    setOrder(item_order)
    setProfileItems(items)
  }, [items, item_order])

  const onCancel = () => {
    setOrder(item_order)
    setOpen(false)
  }

  const onMoveDown = (idx) => {
    if(idx >= order.length - 1){
      return
    }
    const newOrder = order.slice()
    const item = newOrder.splice(idx, 1)[0]
    newOrder.splice(idx + 1, 0, item)
    setOrder(newOrder)
  }

  const onMoveUp = (idx) => {
    if(idx === 0){
      return
    }
    const newOrder = order.slice()
    const item = newOrder.splice(idx, 1)[0]
    newOrder.splice(idx - 1, 0, item)
    setOrder(newOrder)
  }

  const onUpdate = async () => {
    setLoading(true)
    const body = {
        item_order: order
    }
    const token = await refreshFirebaseToken()
    const result = await fetch(`/api/profile/items`, { method: "PUT", body: JSON.stringify(body)})
    setLoading(false)
    triggerReload(Date.now())
    setOpen(false)
  }

  const buildItems = () => {
    // It seems like it's possible for the list items to be null at some points during changes, so this prevents the component from breaking as the list order is retained in state
    if(!Object.keys(profileItems).length) {
      return
    }
    const itemList = order.map((id, idx) => {
      return (
        <Stack data-cy="rearrange-items-modal--list-item" key={id} direction="row" alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
          {profileItems[id]["content"]["name"]}
          <Stack direction="row" spacing={2}>
            <Button data-cy="rearrange-items-modal--up-button" onClick={() => onMoveUp(idx)} disabled={idx === 0} style={{ minWidth: 0, minHeight: 0, margin: 0, paddingTop: 0, paddingBottom: 0}}>
              <ArrowUpwardIcon />
            </Button>
            <Button data-cy="rearrange-items-modal--down-button" onClick={() => onMoveDown(idx)} disabled={idx === item_order.length - 1} style={{ minWidth: 0, minHeight: 0, margin: 0, paddingTop: 0, paddingBottom: 0}}>
              <ArrowDownwardIcon />
            </Button>
          </Stack>
        </Stack>
      )
    })
    return itemList
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
  return (
    <Modal data-cy="rearrange-items-modal" open={open}>
      <Box style={modalStyle}>
        <Stack data-cy="rearrange-items-modal--list" alignItems="center" spacing={4} >
          {buildItems()}
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
            <Button data-cy="rearrange-items-modal--cancel" disabled={loading} onClick={onCancel}>Cancel</Button>
            <Button data-cy="rearrange-items-modal--update" disabled={loading} onClick={onUpdate} variant="contained">Update</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
