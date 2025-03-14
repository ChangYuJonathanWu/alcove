import React, { useState, useEffect, useMemo } from 'react'
import { Modal, Stack, Box, Button, Typography, TextField, Avatar } from '@mui/material';
import { getAuth } from "firebase/auth";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SpotifyItem from '../items/SpotifyItem';
import { protectedApiCall } from '@/utils/api';
import Image from 'next/image';
import { stripSpaces, trimSpaces } from '@/utils/formatters';
import CompactItemView from './RearrangePosts/CompactItemView';
import InstagramPost from '../items/InstagramPost';
import YouTubePost from '../items/YouTubePost';

export default function RearrangePostsModal({ itemIdToReorder, setItemIdToReorder, triggerReload, user }) {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [postsToRearrange, setPostsToRearrange] = useState({})
  const postComponents = useMemo(() => {
    const postMap = {}
    Object.keys(postsToRearrange).map((id) => {
      const post = postsToRearrange[id]
      const { type } = post
      if (type === "spotify") {
        postMap[id] = <SpotifyItem noPadding={true} item={post} />
      }
      else if (type === "instagram") {
        postMap[id] = <div id={id}><InstagramPost item={post} miniMode={true} /></div>
      }
      else if (type === "youtube") {
        postMap[id] = <YouTubePost item={post} miniMode={true}/>
      }
      else {
        postMap[id] = <CompactItemView item={post} />
      }
    })

    return postMap
  }, [postsToRearrange])

  useEffect(() => {
    if (itemIdToReorder) {
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
    if (idx >= order.length - 1) {
      return
    }
    const newOrder = order.slice()
    const item = newOrder.splice(idx, 1)[0]
    newOrder.splice(idx + 1, 0, item)
    setOrder(newOrder)
  }

  const onMoveUp = (idx) => {
    if (idx === 0) {
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
    const result = await protectedApiCall(`/api/profile/items/${itemIdToReorder}`, 'PUT', JSON.stringify(body))
    setLoading(false)
    triggerReload(Date.now())
    setItemIdToReorder(null)
  }


  const buildItems = () => {
    // It seems like it's possible for the list items to be null at some points during changes, so this prevents the component from breaking as the list order is retained in state
    if (!postsToRearrange || !Object.keys(postsToRearrange).length) {
      return
    }
    const itemList = order.map((id, idx) => {
      const postType = postsToRearrange[id]["type"]
      const paddingTop = postType === "spotify" ? "0.8rem" : "1rem"
      const paddingBottom = postType === "spotify" ? 0 : "1rem"
      return (
        <Stack key={id} direction="row" alignItems="center" justifyContent="space-between" style={{ width: '100%', paddingTop, paddingBottom, borderBottom: '1px lightgray solid' }}>

          {postComponents[id]}
          <Stack direction="row" spacing={2}>
            <Button onClick={() => onMoveUp(idx)} disabled={idx === 0} style={{ minWidth: 0, minHeight: 0, margin: 0, padding: '0.5rem', }}>
              <ArrowUpwardIcon />
            </Button>
            <Button onClick={() => onMoveDown(idx)} disabled={idx === order.length - 1} style={{ minWidth: 0, minHeight: 0, margin: 0, paddingTop: 0, paddingBottom: 0 }}>
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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: "340px",
    backgroundColor: 'white',
    borderRadius: '7px',
    padding: '1rem',
    maxHeight: '80vh',
    overflowY: 'auto'
  };
  return (
    <Modal open={!!itemIdToReorder}>
      <Box style={modalStyle}>
        <Stack alignItems="center" >
          {buildItems()}
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around" style={{margin: '1rem 0rem 1rem 0rem'}}>
            <Button disabled={loading} onClick={onCancel}>Cancel</Button>
            <Button disabled={loading} onClick={onUpdate} variant="contained">Update</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
