import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ChevronRight from '@mui/icons-material/ChevronRight'
import ExpandMore from '@mui/icons-material/ExpandMore';
import LinkIcon from '@mui/icons-material/Link';
import Divider from '@mui/material/Divider';

import ProfileHeader from '@/components/ProfileHeader';
import SpotifyItem from '@/components/items/SpotifyItem';
import RestaurantItem from '@/components/items/RestaurantItem';
import TrailItem from '@/components/items/TrailItem';

import ShowItem from '@/components/items/ShowItem';
import CarItem from '@/components/items/CarItem';
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo';

import jonathan_user from '../examples/jonathan.json'
import jiwonkang_user from '../examples/jiwon.json'
import example_user from '../examples/example.json'

import { montserrat } from './fonts';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'
const MAX_WIDTH = "600px"

const determineUser = (username) => {
    switch (username) {
        case "jonathanwu":
            return jonathan_user
        case "jiwonkang":
            return jiwonkang_user
        case "gracehopper":
            return example_user
        default:
            return example_user
    }

}

export default function Profile({ username }) {
    const [listOpen, setListOpen] = React.useState(null);
    const user = determineUser(username)
    const { title, description, handle, photo, background, config, profile = {}, profile_style = {} } = user
    const { items = {}, item_order: itemOrder = [] } = profile

    const { item_font } = profile_style
    const toggleSingleList = (listId) => {
        setListOpen(listOpen === listId ? null : listId)
    }

    const buildProfileItems = () => {
        const itemComponents = []
        itemOrder.forEach(itemId => {
            const item = items[itemId]
            const { type: itemType, content } = item
            if (itemType === "list") {
                itemComponents.push(
                    buildListItem(itemId, content)
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

    const buildItemHeader = (name) => {
        switch(item_font) {
            case 'Montserrat':
                return <span className={montserrat.className}>{name}</span>
            default:
                return <Typography variant="h3">{name}</Typography>
        }   
    }
    
    const buildListItem = (itemId, content) => {
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
                                {buildItemHeader(name)}
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

    const buildItems = (items, itemOrder, type) => {
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

    return (
        <div style={{ height: '100%', minHeight: '100vh', width: '100%', padding: 0, margin: 0 }}>
            <Head>
                <title>{`${title} (@${handle}) - alcove`}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={`${title} - @${handle} - Alcove`} />
                <meta
                    property="og:description"
                    content={`See @${handle}'s profile on Alcove`}
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <main>
                <div style={{ zIndex: -1, height: '100%', minHeight: '100vh', width: '100%', position: "fixed", backgroundColor: 'black' }}>
                    {background && <Image fill={true} src={background} alt="background wallpaper" />}
                </div>
                <Stack style={{ marginBottom: "100px" }}>
                    {config.demo_mode && <div style={{ height: "2rem" }}></div>}
                    <ProfileHeader user={user} />
                    {buildProfileItems()}
                    {!config.hide_logo && <AlcoveProfileLogo />}
                </Stack>
            </main>
        </div>
    )
}
