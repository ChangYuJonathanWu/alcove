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
import ChevronRight from '@mui/icons-material/ChevronRight'
import Paper from '@mui/material/Paper';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { Typography } from '@mui/material';
import EditItemModal from '../profile/EditItemModal';
import EditListItemsButtonRow from './EditListItemsButtonRow';
import NewListPostModal from '../profile/NewListItemModal';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'
const MAX_WIDTH = "600px"

export default function ProfileItems({ user, editMode, triggerReload }) {
    const [listOpen, setListOpen] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [newListItem, setNewListItem] = useState(null)

    const { profile } = user
    const { items: profileItems, item_order: itemOrder = [] } = profile

    const buildItemHeader = (name, item_font) => {
        switch (item_font) {
            case 'Montserrat':
                return <span className={montserrat.className}>{name}</span>
            default:
                return <Typography variant="h3">{name}</Typography>
        }
    }
    const buildItems = (items, itemOrder, type) => {
        let ItemComponent
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
                ItemComponent = ShowItem
        }
        return itemOrder.map(
            itemId => <ItemComponent key={itemId} item={items[itemId]} />
        )
    }

    const buildListItem = (itemId, content, itemFont) => {
        const { name, type: listType, commentary, items, item_order: itemOrder = [], } = content
        const isOpen = listOpen === itemId
        const listButtonId = `list-button-${itemId}`

        return (
            <div key={itemId} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                <Paper variant="" sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', width: '100%', marginTop: 0, marginBottom: '0.5rem', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH }}>
                    <ListItemButton id={listButtonId} key={itemId} disableRipple={true} onClick={() => { toggleSingleList(itemId) }}>
                        <Stack direction="row" justifyContent="space-between" style={{ width: "100%" }} >
                            <Stack id={listButtonId} direction="row" alignItems="start" spacing={2}>
                                {isOpen ? <ExpandMore /> : <ChevronRight />}
                                <Stack>
                                    {buildItemHeader(name, itemFont)}
                                    {isOpen && <Typography variant="caption">{commentary}</Typography>}
                                </Stack>
                            </Stack>
                            {editMode && <EditIcon onClick={(e) => {e.preventDefault(); setEditItem(profileItems[itemId])}} />}
                        </Stack>

                    </ListItemButton>
                    <Collapse in={isOpen} timeout={0}>
                        <List style={{ alignContent: "center" }}>
                            {buildItems(items, itemOrder, listType)}
                            {editMode && <EditListItemsButtonRow onNewItemClick={() => setNewListItem(itemId)}/>}
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
        const listButtonId = `list-button-${itemId}`
        return (
            <div key={itemId} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                <Paper variant="" sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: '0.5rem', width: '100%', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH }}>
                    <ListItemButton id={listButtonId} key={itemId} disableRipple={true} href={uri} target="_blank">
                        <Stack direction="row" style={{ width: "100%" }} justifyContent={"space-between"}>
                            <Stack id={listButtonId} direction="row" alignItems="start" spacing={2}>
                                <LinkIcon />
                                <Typography variant="h3">{name}</Typography>
                            </Stack>
                            {editMode && <EditIcon onClick={(e) => {e.preventDefault(); setEditItem(profileItems[itemId])}} />}
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
            const { type: itemType, content, item_font: itemFont } = item
            if (itemType === "list") {
                itemComponents.push(
                    buildListItem(itemId, content, itemFont)
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
            <EditItemModal editItem={editItem} setEditItem={setEditItem} triggerReload={triggerReload} />
            <NewListPostModal newListItem={newListItem} setNewListItem={setNewListItem} triggerReload={triggerReload}/>
            {buildProfileItems()}
        </div>
    )
}
