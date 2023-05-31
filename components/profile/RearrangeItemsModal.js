import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


export default function RearrangeItemsModal({ open, setOpen, triggerReload, user }) {
  const { profile } = user;
  const { item_order = [], items = {} } = profile
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(item_order)

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

  const onUpdate = () => {

  }

  const buildItems = () => {
    const itemList = order.map((id, idx) => {
      return (
        <Stack key={id} direction="row" alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
          {items[id]["content"]["name"]}
          <Stack direction="row" spacing={2}>
            <Button onClick={() => onMoveUp(idx)} disabled={idx === 0} style={{ minWidth: 0, minHeight: 0, margin: 0, paddingTop: 0, paddingBottom: 0}}>
              <ArrowUpwardIcon />
            </Button>
            <Button onClick={() => onMoveDown(idx)} disabled={idx === item_order.length - 1} style={{ minWidth: 0, minHeight: 0, margin: 0, paddingTop: 0, paddingBottom: 0}}>
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
    <Modal open={open}>
      <Box style={modalStyle}>
        <Stack alignItems="center" spacing={4} >
          {buildItems()}
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
            <Button disabled={loading} onClick={() => setOpen(false)}>Cancel</Button>

            <Button disabled={loading} onClick={onUpdate} variant="contained">Update</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
