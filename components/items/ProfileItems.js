import React, { useEffect, useState, useRef, createRef } from 'react'

import ProfileHeader from '@/components/profile/ProfileHeader/ProfileHeader';
import SpotifyItem from '@/components/items/SpotifyItem';
import RestaurantItem from '@/components/items/RestaurantItem';
import TrailItem from '@/components/items/TrailItem';
import StandardPost from '@/components/items/StandardPost';
import ShowItem from '@/components/items/ShowItem';
import CarItem from '@/components/items/CarItem';
import InstagramPost from '@/components/items/InstagramPost';
import YouTubePost from '@/components/items/YouTubePost';
import dynamic from 'next/dynamic';

import LinkIcon from '@mui/icons-material/Link';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { Typography } from '@mui/material';
import EditItemModal from '../profile/EditItemModal';
import EditListItemsButtonRow from './EditListPostButtonRow';
import PostToListModal from '../profile/PostToListModal';
import NewPostModal from '../profile/NewPost/NewPostModal';
import EditPostModal from '../profile/EditPostModal';
import RearrangePostsModal from '../profile/RearrangePostsModal';
import { formatUri } from '@/utils/formatters';
import { DEFAULT_PAPER_COLOR, PROFILE_ITEMS_WIDTH, ITEM_FONT_SIZE, CENTER_PROFILE_ITEMS } from '@/utils/themeConfig';
import Skeleton from '@mui/material/Skeleton';

const SpotifyItemDynamic = dynamic(() => import('@/components/items/SpotifyItem'), {
    loading: () => <Skeleton variant="rounded" style={{ width: "100%", height: "3rem" }} />
})

const InstagramItemDynamic = dynamic(() => import('@/components/items/InstagramPost'), {
    loading: () => <Skeleton variant="rounded" style={{ width: "100%", height: "6rem" }} />
})

const PAPER_COLOR = DEFAULT_PAPER_COLOR
const MAX_WIDTH = PROFILE_ITEMS_WIDTH

const scrollTo = (ref) => {
    setTimeout(() => ref.current.scrollIntoView({ behavior: "smooth" }), 300)
}

export default function ProfileItems({ user, editMode, triggerReload }) {
    const [listOpen, setListOpen] = useState({});
    const [editItem, setEditItem] = useState(null);
    const [listIdToPostTo, setListIdToPostTo] = useState(null)
    const [postToEdit, setPostToEdit] = useState(null)
    const [itemIdToReorder, setItemIdToReorder] = useState(null)
    const [savedItemOrder, setSavedItemOrder] = useState(null)

    const { profile } = user
    const { items: profileItems, item_order: itemOrder = [] } = profile

    useEffect(() => {
        let unchangedItems = true
        if (itemOrder.length === Object.keys(listOpen).length) {
            // if every item in itemOrder is in listOpen

            itemOrder.forEach(itemId => {
                if (!(itemId in listOpen)) {
                    unchangedItems = false
                }
            })
        } else {
            unchangedItems = false
        }
        if (unchangedItems) return

        const listOpenStates = {}
        itemOrder.forEach(itemId => {
            listOpenStates[itemId] = false
        })
        setListOpen(listOpenStates)
    }, [itemOrder, listOpen])

    const refArr = useRef([])
    const divRef = createRef()
    refArr.current = itemOrder.map((item, index) => {
        return refArr.current[index] || React.createRef();
    })

    const buildItemHeader = (name, bold) => {
        const item_font = "default"
        switch (item_font) {
            case 'Montserrat':
                return <span className={montserrat.className}>{name}</span>
            default:
                return <Typography style={{ fontSize: ITEM_FONT_SIZE, textAlign: "center", fontWeight: 400 }}>{name}</Typography>
        }
    }
    const buildPosts = (items, itemOrder, type) => {
        return itemOrder.map(
            itemId => {
                let ItemComponent

                const item = items[itemId]
                const { type = "standard" } = item
                switch (type) {
                    case "standard":
                        ItemComponent = StandardPost
                        break;
                    case "spotify":
                        ItemComponent = SpotifyItemDynamic
                        break;
                    case "instagram":
                        ItemComponent = InstagramPost
                        break;
                    case "youtube":
                        ItemComponent = YouTubePost
                        break;
                    case "restaurant":
                        ItemComponent = RestaurantItem
                        break
                    case "trail":
                        ItemComponent = TrailItem
                        break
                    case "show":
                        ItemComponent = ShowItem
                        break
                    case "car":
                        ItemComponent = CarItem
                        break;
                    default:
                        ItemComponent = StandardPost
                }

                return <ItemComponent key={itemId} item={item} editMode={editMode} setPostToEdit={setPostToEdit} triggerReload={triggerReload} />
            }
        )
    }

    const buildListItem = (itemId, content, config = {}, ref) => {
        const { name, type: listType, commentary, items, item_order: itemOrder = [], } = content
        const { background = {} } = config
        const { color: itemHeaderColor = PAPER_COLOR } = background
        const isOpen = listOpen[itemId]
        const listButtonId = `list-button-${itemId}`

        return (
            <div key={itemId} style={{ paddingLeft: '1rem', paddingRight: '1rem' }} ref={ref}>
                <Paper sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: '0.7rem', width: '100%', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH, borderRadius: '1rem' }}>
                    <ListItemButton style={{ borderRadius: '1rem' }} id={listButtonId} key={itemId} disableRipple={true} onClick={() => { toggleSingleList(itemId, ref) }}>
                        <Stack direction="row" justifyContent="space-between" style={{ width: "100%", paddingTop: '0.2rem', paddingBottom: '0.20rem', paddingLeft: '0.25rem' }} >
                            <Stack id={listButtonId} direction="row" justifyContent="space-between" style={{ width: "100%" }} spacing={2}>
                                {CENTER_PROFILE_ITEMS && !isOpen && <div style={{ width: '2rem' }}></div>}
                                <Stack alignItems="start">
                                    {buildItemHeader(name, isOpen)}
                                    {isOpen && <Typography variant="caption" style={{ textAlign: "left" }}>{commentary}</Typography>}
                                </Stack>
                                {!editMode ? isOpen ? <ExpandLessIcon /> : <ExpandMore /> : <div></div>}
                            </Stack>
                            {editMode && <EditIcon data-cy="edit-item-icon" style={{ paddingLeft: '0.5rem' }} onClick={(e) => { e.preventDefault(); setEditItem(profileItems[itemId]) }} />}
                        </Stack>

                    </ListItemButton>
                    <Collapse in={isOpen} >
                        <List id={`list-id-${itemId}`} style={{ alignContent: "center", paddingTop: '0.25rem' }}>
                            {buildPosts(items, itemOrder, listType)}
                            {editMode && <EditListItemsButtonRow rearrangeEnabled={Object.keys(items).length > 1} onReorderClick={() => setItemIdToReorder(itemId)} onNewItemClick={() => setListIdToPostTo(itemId)} />}
                        </List>
                    </Collapse>
                </Paper>
            </div>
        )
    }

    const onEditLink = (e) => {
        e.preventDefault()
    }
    const buildUriItem = (itemId, content) => {
        const { name, uri } = content
        const formattedUri = formatUri(uri)
        const listButtonId = `list-button-${itemId}`
        return (
            <div key={itemId} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                <Paper variant="" sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: '0.7rem', width: '100%', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH, borderRadius: '1rem' }}>
                    <ListItemButton id={listButtonId} key={itemId} disableRipple={true} href={formattedUri} target="_blank">
                        <Stack direction="row" style={{ width: "100%", paddingBottom: '0.2rem', paddingTop: '0.2rem' }} justifyContent={"space-between"}>

                            <Stack id={listButtonId} direction="row" justifyContent="space-between" alignItems="center" style={{ width: "100%" }} spacing={2}>
                                {CENTER_PROFILE_ITEMS && <LinkIcon />}
                                {buildItemHeader(name)}
                                <OpenInNewIcon />

                            </Stack>

                            {editMode && <EditIcon data-cy="edit-item-icon" style={{ paddingLeft: '0.5rem' }} onClick={(e) => { e.preventDefault(); setEditItem(profileItems[itemId]) }} />}

                        </Stack>

                    </ListItemButton>
                </Paper>
            </div>

        )
    }

    const toggleSingleList = (listId) => {
        setListOpen({ ...listOpen, [listId]: !listOpen[listId] })
        // If the list is not open, then scroll to it once it opens
        if (!listOpen[listId]) {
            scrollTo(refArr.current[itemOrder.indexOf(listId)])
        }
    }

    const buildProfileItems = () => {
        const itemComponents = []
        itemOrder.forEach((itemId, index) => {
            const item = profileItems[itemId]
            const { type: itemType, content, config } = item
            if (itemType === "list") {
                itemComponents.push(
                    buildListItem(itemId, content, config, refArr.current[index])
                )
            }
            if (itemType === "uri") {
                itemComponents.push(
                    buildUriItem(itemId, content)
                )
            }

        })
        return itemComponents
    }
    const builtProfileItems = buildProfileItems()

    return (
        <div>
            <RearrangePostsModal itemIdToReorder={itemIdToReorder} setItemIdToReorder={setItemIdToReorder} user={user} triggerReload={triggerReload} />
            <EditItemModal editItem={editItem} setEditItem={setEditItem} triggerReload={triggerReload} />
            {/* <PostToListModal listIdToPostTo={listIdToPostTo} setListIdToPostTo={setListIdToPostTo} triggerReload={triggerReload} /> */}
            <NewPostModal listIdToPostTo={listIdToPostTo} setListIdToPostTo={setListIdToPostTo} triggerReload={triggerReload} />
            <EditPostModal postToEdit={postToEdit} setPostToEdit={setPostToEdit} triggerReload={triggerReload} />
            {buildProfileItems()}
        </div>
    )
}
