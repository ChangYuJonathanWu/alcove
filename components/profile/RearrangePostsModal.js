import React, { useState, useEffect } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField } from '@mui/material';
import { getAuth } from "firebase/auth";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SpotifyItem from '../items/SpotifyItem';


export default function RearrangePostsModal({ itemIdToReorder, setItemIdToReorder, triggerReload, user }) {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [postsToRearrange, setPostsToRearrange] = useState({})

  useEffect(() => {
    if(itemIdToReorder) {
        const { profile } = user;
        const { items = {} } = profile
        // This is confusing because there's another object `items` inside `items`
        const item = items[itemIdToReorder]
        const { content } = item
        const { item_order } = content
        setPostsToRearrange(content["items"])
        setOrder(item_order)
    }

  }, [itemIdToReorder, user])

  const onCancel = () => {
    const { profile } = user;
    const { items = {} } = profile
    // This is confusing because there's another object `items` inside `items`
    const item = items[itemIdToReorder]
    const { content } = item
    const { item_order } = content
    setOrder(item_order)
    setItemIdToReorder(null)
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
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    const headers = {
        Authorization : `Bearer ${token}`
    }
    const body = {
        item_order: order
    }
    const result = await fetch(`/api/profile/items/${itemIdToReorder}`, { method: "PUT", headers, body: JSON.stringify(body)})
    setLoading(false)
    triggerReload(Date.now())
    setItemIdToReorder(null)
  }

  const buildItems = () => {
    // It seems like it's possible for the list items to be null at some points during changes, so this prevents the component from breaking as the list order is retained in state
    if(!postsToRearrange || !Object.keys(postsToRearrange).length) {
      return
    }
    const itemList = order.map((id, idx) => {
      const postType = postsToRearrange[id]["type"]
      return (
        <Stack key={id} direction="row" alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>

          {postType === "spotify" ? <SpotifyItem noPadding={true} item={postsToRearrange[id]} /> : <b>{postsToRearrange[id]["title"]}</b> }
          <Stack direction="row" spacing={2}>
            <Button onClick={() => onMoveUp(idx)} disabled={idx === 0} style={{ minWidth: 0, minHeight: 0, margin: 0, paddingTop: 0, paddingBottom: 0}}>
              <ArrowUpwardIcon />
            </Button>
            <Button onClick={() => onMoveDown(idx)} disabled={idx === order.length - 1} style={{ minWidth: 0, minHeight: 0, margin: 0, paddingTop: 0, paddingBottom: 0}}>
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
    minWidth: "340px",
    backgroundColor: 'white',
    borderRadius: '7px',
    padding: '1rem',
  };
  return (
    <Modal open={!!itemIdToReorder}>
      <Box style={modalStyle}>
        <Stack alignItems="center" spacing={4} >
          {buildItems()}
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
            <Button disabled={loading} onClick={onCancel}>Cancel</Button>
            <Button disabled={loading} onClick={onUpdate} variant="contained">Update</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
