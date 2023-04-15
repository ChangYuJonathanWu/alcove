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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import user from '../examples/jonathan.json'

const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
    const router = useRouter()
    const { username } = router.query;
    const { title, description, handle, profile = {} } = user;
    const { lists = {}, list_order = [] } = profile

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

    const buildListItems = () => {
        const listComponents = []
        Object.keys(lists).forEach(listId => {
            const list = lists[listId]
            const { name } = list
            listComponents.push(
                <>
                    <ListItemButton onClick={() => toggleList(listId)}>
                        <Typography>{name}</Typography>
                    </ListItemButton>
                    <Collapse in={listsOpen[listId]}>
                        <List>
                            <div>Test 1</div>
                            <div>Test 2</div>
                        </List>
                    </Collapse>
                </>

            )
        })
        return listComponents
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
                    <Typography variant="h1">{title}</Typography>
                    <Typography variant="subtitle1">{`@${handle}`}</Typography>
                    <Typography variant="body">{description}</Typography>
                    {buildListItems()}
                </Stack>
            </main>
        </>
    )
}
