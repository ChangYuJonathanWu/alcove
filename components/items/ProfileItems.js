import React, { useEffect, useState } from 'react'

import ProfileHeader from '@/components/profile/ProfileHeader';
import SpotifyItem from '@/components/items/SpotifyItem';
import RestaurantItem from '@/components/items/RestaurantItem';
import TrailItem from '@/components/items/TrailItem';
import StandardPost from '@/components/items/StandardPost';
import ShowItem from '@/components/items/ShowItem';
import CarItem from '@/components/items/CarItem';

import LinkIcon from '@mui/icons-material/Link';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
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
import EditPostModal from '../profile/EditPostModal';
import RearrangePostsModal from '../profile/RearrangePostsModal';
import { formatUri } from '@/utils/formatters';
import { DEFAULT_PAPER_COLOR, PROFILE_ITEMS_WIDTH } from '@/utils/themeConfig';

const PAPER_COLOR = DEFAULT_PAPER_COLOR
const MAX_WIDTH = PROFILE_ITEMS_WIDTH
export default function ProfileItems({ user, editMode, triggerReload }) {
    const [listOpen, setListOpen] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [listIdToPostTo, setListIdToPostTo] = useState(null)
    const [postToEdit, setPostToEdit] = useState(null)
    const [itemIdToReorder, setItemIdToReorder] = useState(null)

    const { profile } = user
    const { items: profileItems, item_order: itemOrder = [] } = profile

    const buildItemHeader = (name) => {
        const item_font = "default"
        switch (item_font) {
            case 'Montserrat':
                return <span className={montserrat.className}>{name}</span>
            default:
                return <Typography style={{fontSize: 16}}>{name}</Typography>
        }
    }
    const buildPosts = (items, itemOrder, type) => {
        return itemOrder.map(
            itemId => {
                let ItemComponent

                const item = items[itemId]
                const { type = "standard"} = item
                switch (type) {
                    case "standard":
                        ItemComponent = StandardPost
                        break;
                    case "spotify":
                        ItemComponent = SpotifyItem
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

                return <ItemComponent key={itemId} item={item} editMode={editMode} setPostToEdit={setPostToEdit} triggerReload={triggerReload}/>
            }
        )
    }

    const buildListItem = (itemId, content, config = {}) => {
        const { name, type: listType, commentary, items, item_order: itemOrder = [], } = content
        const { background = {}} = config
        const { color: itemHeaderColor = PAPER_COLOR } = background
        const isOpen = listOpen === itemId
        const listButtonId = `list-button-${itemId}`

        return (
            <div key={itemId}  style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                <Paper sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: '0.5rem', width: '100%', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH, borderRadius: '1rem' }}>
                    <ListItemButton id={listButtonId} key={itemId}  disableRipple={true} onClick={() => { toggleSingleList(itemId) }}>
                        <Stack direction="row" justifyContent="space-between" style={{ width: "100%", paddingTop: '0.2rem', paddingBottom: '0.20rem', paddingLeft: '0.25rem'}} >
                            <Stack id={listButtonId} direction="row" justifyContent="space-between" style={{width: "100%"}}spacing={2}>
                                <Stack>
                                    {buildItemHeader(name)}
                                    {isOpen && <Typography variant="caption">{commentary}</Typography>}
                                </Stack>
                                {isOpen ? <ExpandLessIcon /> :  <ExpandMore />}
                            </Stack>
                            {editMode && <EditIcon data-cy="edit-item-icon" style={{paddingLeft: '0.5rem'}} onClick={(e) => { e.preventDefault(); setEditItem(profileItems[itemId]) }} />}
                        </Stack>

                    </ListItemButton>
                    <Collapse in={isOpen} timeout={0}>
                        <List id={`list-id-${itemId}`} style={{ alignContent: "center" }}>
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
                <Paper variant="" sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: '0.5rem', width: '100%', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH, borderRadius: '1rem' }}>
                    <ListItemButton id={listButtonId} key={itemId} disableRipple={true} href={formattedUri} target="_blank">
                        <Stack direction="row" style={{ width: "100%", paddingBottom: '0.2rem', paddingTop: '0.2rem' }} justifyContent={"space-between"}>
                            <Stack id={listButtonId} direction="row" alignItems="start" spacing={2}>
                                <LinkIcon />
                                <Typography variant="h3">{name}</Typography>
                            </Stack>
                            {editMode && <EditIcon data-cy="edit-item-icon" onClick={(e) => { e.preventDefault(); setEditItem(profileItems[itemId]) }} />}
                        </Stack>

                    </ListItemButton>
                </Paper>
            </div>

        )
    }

    const toggleSingleList = (listId) => {
        setListOpen(listOpen === listId ? null : listId)
    }

    const buildProfileItems = () => {
        const itemComponents = []
        itemOrder.forEach(itemId => {
            const item = profileItems[itemId]
            const { type: itemType, content, config } = item
            if (itemType === "list") {
                itemComponents.push(
                    buildListItem(itemId, content, config)
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
            <PostToListModal listIdToPostTo={listIdToPostTo} setListIdToPostTo={setListIdToPostTo} triggerReload={triggerReload} />
            <EditPostModal postToEdit={postToEdit} setPostToEdit={setPostToEdit} triggerReload={triggerReload} />
            {buildProfileItems()}
        </div>
    )
}
