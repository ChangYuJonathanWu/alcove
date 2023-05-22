import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { buildProfileItems } from './items/buildItems';

import ProfileHeader from './ProfileHeader';
import AlcoveProfileLogo from '@/components/AlcoveProfileLogo';

import jonathan_user from '../examples/jonathan.json'
import jiwonkang_user from '../examples/jiwon.json'
import example_user from '../examples/example.json'

import { useAuthContext } from "@/context/AuthContext";
import { signOut, getAuth } from "firebase/auth";

import { montserrat } from './fonts';

const PAPER_COLOR = 'rgba(255, 255, 255, 0.8)'
const MAX_WIDTH = "600px"


export default function Profile({ user }) {
    const [listOpen, setListOpen] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [ownerSignedIn, setOwnerSignedIn] = useState(false);
    useEffect(() => {
        const checkOwnerSignedIn = async () => {
            const auth = getAuth();
            const loggedInUid = auth.currentUser.uid
            if(loggedInUid === user.uid) {
                setOwnerSignedIn(true)
            }
        }
        checkOwnerSignedIn()
    }, [user])

    const { title, description, handle, photo, background, config, profile = {}, profile_style = {} } = user
    const { items = {}, item_order: itemOrder = [] } = profile


    const { item_font } = profile_style
    const toggleSingleList = (listId) => {
        setListOpen(listOpen === listId ? null : listId)
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
                    {editMode && <div style={{color: 'red'}}>Edit Mode</div>}
                    <ProfileHeader user={user} setEditMode={setEditMode} ownerSignedIn={ownerSignedIn}/>
                    {buildProfileItems(items, itemOrder, listOpen, toggleSingleList, item_font)}
                    {!config.hide_logo && <AlcoveProfileLogo />}
                </Stack>
            </main>
        </div>
    )
}
