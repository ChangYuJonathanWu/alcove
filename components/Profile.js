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
import Divider from '@mui/material/Divider';

import ProfileHeader from '@/components/ProfileHeader';
import SpotifyItem from '@/components/items/SpotifyItem';
import RestaurantItem from '@/components/items/RestaurantItem';
import TrailItem from '@/components/items/TrailItem';

import ShowItem from '@/components/items/ShowItem';
import CarItem from '@/components/items/CarItem';
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo';

import jonathan_user from '../examples/jonathan.json'
import example_user from '../examples/example.json'

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)' 

const determineUser = (username) => {
    switch(username){
        case "jonathanwu":
            return jonathan_user
        case "gracehopper":
            return example_user
        default:
            return example_user
    }

}

export default function Profile({username}) {
    const [listOpen, setListOpen] = React.useState(null);
    const user = determineUser(username)
    const { title, description, handle, photo, background, config, profile = {} } = user
    const { lists = {}, list_order: listOrder = [] } = profile

    const toggleSingleList = (listId) => {
        setListOpen(listOpen === listId ? null : listId)
    }

    const buildLists = () => {
        const listComponents = []
        listOrder.forEach(listId => {
            const list = lists[listId]
            const { name, type, commentary, items, item_order: itemOrder = [], } = list
            const isOpen = listOpen === listId
            const listButtonId = `list-button-${listId}`
            listComponents.push(
                <>
                    <Paper variant="" sx={{ margin: '1rem', marginTop: 0, marginBottom: '0.5rem', backgroundColor: PAPER_COLOR }}>
                        <ListItemButton id={listButtonId} key={listId} disableRipple={true} onClick={() => { toggleSingleList(listId) }}>
                            <Stack id={listButtonId} direction="row" alignItems="start" spacing={2}>
                                {isOpen ? <ExpandMore /> : <ChevronRight />}
                                <Stack>
                                    <Typography variant="h3">{name}</Typography>
                                    {isOpen && <Typography variant="caption">{commentary}</Typography>}
                                </Stack>
                            </Stack>
                        </ListItemButton>
                    <Collapse in={isOpen} timeout={0}>
                        <List>
                            {buildItems(items, itemOrder, type)}
                        </List>
                    </Collapse>
                    </Paper>
                </>
            )
        })
        return listComponents
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
            itemId => <TrailItem key={itemId} item={items[itemId]}/>
        )
    }

    const buildShowItems = (items, itemOrder) => {
        return itemOrder.map(
            itemId => <ShowItem key={itemId} item={items[itemId]}/>
        )
    }

    const buildCarItems = (items, itemOrder) => {
        return itemOrder.map(
            itemId => <CarItem key={itemId} item={items[itemId]}/>
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
        <div style={{ height: '100%', minHeight: '100vh', width: '100%', padding: 0, margin: 0}}>
            <Head>
                <title>{`${title} (@${handle}) - alcove`}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div style={{zIndex: -1, height: '100%', minHeight: '100vh', width: '100%', position: "fixed"}}>
                    <Image fill={true} src={background} alt="background wallpaper"/>
                </div>
                <Stack style={{marginBottom: "100px"}}>
                    {config.demo_mode && <div style={{height: "2rem"}}></div>}
                    <ProfileHeader user={user}/>
                    {buildLists()}
                    { !config.hide_logo && <AlcoveProfileLogo/> }
                </Stack>
            </main>
        </div>
    )
}
