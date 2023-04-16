import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Inter } from 'next/font/google';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ChevronRight from '@mui/icons-material/ChevronRight'
import ExpandMore from '@mui/icons-material/ExpandMore';

import Avatar from '@mui/material/Avatar';

import SpotifyItem from '@/components/items/SpotifyItem';
import RestaurantItem from '@/components/items/RestaurantItem';
import user from '../examples/jonathan.json'

const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
    const router = useRouter()
    const { username } = router.query;
    const { title, description, handle, photo, profile = {} } = user;
    const { lists = {}, list_order: listOrder = [] } = profile

    const buildInitialListOpenStates = () => {
        const listStates = {}
        Object.keys(lists).forEach(listId => {
            listStates[listId] = false;
        })
        return listStates
    }
    const [listsOpen, setListsOpen] = React.useState(buildInitialListOpenStates())

    const toggleList = (listId) => {
        setListsOpen({ ...listsOpen, [listId]: !listsOpen[listId] })
    }

    const buildLists = () => {
        const listComponents = []
        listOrder.forEach(listId => {
            const list = lists[listId]
            const { name, type, commentary, items, item_order: itemOrder = [], } = list
            const isOpen = listsOpen[listId]
            listComponents.push(
                <>
                    <ListItemButton onClick={() => toggleList(listId)}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {isOpen ? <ExpandMore /> : <ChevronRight />}
                            <Stack>
                                <Typography variant="h3">{name}</Typography>
                                {isOpen && <Typography variant="caption">{commentary}</Typography>}
                            </Stack>
                            
                        </Stack>
                    </ListItemButton>
                    <Collapse in={listsOpen[listId]}>
                        <List>
                            {buildItems(items, itemOrder, type) }
                        </List>
                    </Collapse>
                </>
            )
        })
        return listComponents
    }

    const buildSpotifyItems = (items, itemOrder) => {
        return itemOrder.map(
            itemId => <SpotifyItem key={itemId} item={items[itemId]}/>     
        )
    }

    const buildRestaurantItems = (items, itemOrder) => {
        return itemOrder.map(
            itemId => <RestaurantItem key={itemId} item={items[itemId]}/>
        )
    }

    const buildItems = (items, itemOrder, type) => {
        switch(type) {
            case "spotify":
                return buildSpotifyItems(items, itemOrder)
            case "restaurant":
                return buildRestaurantItems(items, itemOrder)
            default :
                return <div></div>
        }
    }

    return (
        <>
            <Head>
                <title>{`${title} (@${handle}) - sleepless.so`}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Stack>
                    <Stack alignItems="center" style={{ paddingBottom: "1rem" }}>
                        <Avatar alt={handle} sx={{ width: 80, height: 80 }} style={{ margin: "1rem" }} src={`/profiles/photos/${photo}`} />
                        <Typography variant="h1">{title}</Typography>
                        <Typography variant="subtitle1">{`@${handle}`}</Typography>
                        <Typography variant="body">{description}</Typography>
                    </Stack>

                    {buildLists()}
                </Stack>
            </main>
        </>
    )
}
