import ProfileHeader from '@/components/ProfileHeader';
import SpotifyItem from '@/components/items/SpotifyItem';
import RestaurantItem from '@/components/items/RestaurantItem';
import TrailItem from '@/components/items/TrailItem';

import ShowItem from '@/components/items/ShowItem';
import CarItem from '@/components/items/CarItem';

import LinkIcon from '@mui/icons-material/Link';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ChevronRight from '@mui/icons-material/ChevronRight'
import Paper from '@mui/material/Paper';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { Typography } from '@mui/material';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'
const MAX_WIDTH = "600px"

const buildSpotifyItems = (items, itemOrder) => {
    return itemOrder.map(
        itemId => <SpotifyItem key={itemId} item={items[itemId]} />
    )
}

const buildRestaurantItems = (items, itemOrder) => {
    return itemOrder.map(
        itemId => <><Divider flexItem /><RestaurantItem key={itemId} item={items[itemId]} /></>
    )
}

const buildTrailItems = (items, itemOrder) => {
    return itemOrder.map(
        itemId => <TrailItem key={itemId} item={items[itemId]} />
    )
}

const buildShowItems = (items, itemOrder) => {
    return itemOrder.map(
        itemId => <ShowItem key={itemId} item={items[itemId]} />
    )
}

const buildCarItems = (items, itemOrder) => {
    return itemOrder.map(
        itemId => <CarItem key={itemId} item={items[itemId]} />
    )
}
export const buildItemHeader = (name, item_font) => {
    switch(item_font) {
        case 'Montserrat':
            return <span className={montserrat.className}>{name}</span>
        default:
            return <Typography variant="h3">{name}</Typography>
    }   
}
export const buildItems = (items, itemOrder, type) => {
    switch (type) {
        case "spotify":
            return buildSpotifyItems(items, itemOrder)
        case "restaurant":
            return buildRestaurantItems(items, itemOrder)
        case "trail":
            return buildTrailItems(items, itemOrder)
        case "show":
            return buildShowItems(items, itemOrder)
        case "car":
            return buildCarItems(items, itemOrder)
        default:
            return <div></div>
    }
}

export const buildListItem = (itemId, content, listOpen,toggleSingleList, item_font) => {
    const { name, type: listType, commentary, items, item_order: itemOrder = [], } = content
    const isOpen = listOpen === itemId
    const listButtonId = `list-button-${itemId}`

    return (
        <div style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
            <Paper variant="" sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', width: '100%', marginTop: 0, marginBottom: '0.5rem', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH  }}>
                <ListItemButton id={listButtonId} key={itemId} disableRipple={true} onClick={() => { toggleSingleList(itemId) }}>
                    <Stack id={listButtonId} direction="row" alignItems="start" spacing={2}>
                        {isOpen ? <ExpandMore /> : <ChevronRight />}
                        <Stack>
                            {buildItemHeader(name, item_font)}
                            {isOpen && <Typography variant="caption">{commentary}</Typography>}
                        </Stack>
                    </Stack>
                </ListItemButton>
                <Collapse in={isOpen} timeout={0}>
                    <List style={{alignContent: "center"}}>
                        {buildItems(items, itemOrder, listType)}
                    </List>
                </Collapse>
            </Paper>
        </div>
    )
}

export const buildProfileItems = (items, itemOrder, listOpen, toggleSingleList, item_font) => {
    const itemComponents = []
    itemOrder.forEach(itemId => {
        const item = items[itemId]
        const { type: itemType, content } = item
        if (itemType === "list") {
            itemComponents.push(
                buildListItem(itemId, content, listOpen, toggleSingleList, item_font)
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
const buildUriItem = (itemId, content) => {
    const { name, uri } = content
    const listButtonId = `list-button-${itemId}`
    return (
        <div style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
        <Paper variant="" sx={{ margin: '1rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: '0.5rem', width: '100%', backgroundColor: PAPER_COLOR, maxWidth: MAX_WIDTH }}>
            <ListItemButton id={listButtonId} key={itemId} disableRipple={true} href={uri} target="_blank">
                <Stack id={listButtonId} direction="row" alignItems="start" spacing={2}>
                    <LinkIcon />
                    <Typography variant="h3">{name}</Typography>
                </Stack>
            </ListItemButton>
        </Paper>
        </div>

    )
}