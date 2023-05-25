import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { buildProfileItems } from '../items/buildItems';

import ProfileHeader from './ProfileHeader';
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo';

import { useAuthContext } from "@/context/AuthContext";
import { signOut, getAuth } from "firebase/auth";

import { montserrat } from '../fonts';
import EditBioModal from './EditBioModal';
import NewItemButton from './NewItemButton';
import NewItemModal from './NewItemModal';


export default function Profile({ user, triggerReload }) {
    const [listOpen, setListOpen] = useState(null);
    const [editBio, setEditBio] = useState(false);
    const [newItemOpen, setNewItemOpen] = useState(false)
    const [ownerSignedIn, setOwnerSignedIn] = useState(false);
    useEffect(() => {
        const checkOwnerSignedIn = async () => {
            const auth = getAuth();
            const loggedIn = auth.currentUser;
            if (!loggedIn) {
                setOwnerSignedIn(false)
                return
            }
            const loggedInUid = auth.currentUser.uid
            if (loggedInUid === user.uid) {
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
    
    //TODO: Error handling on network request, validation
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
                    <EditBioModal open={editBio} setOpen={setEditBio} user={user} triggerReload={triggerReload}/>
                    <NewItemModal open={newItemOpen} setOpen={setNewItemOpen} triggerReload={triggerReload}/>
                    {config.demo_mode && <div style={{ height: "2rem" }}></div>}
                    <ProfileHeader user={user} setEditMode={setEditBio} ownerSignedIn={ownerSignedIn} />
                    {buildProfileItems(items, itemOrder, listOpen, toggleSingleList, item_font, ownerSignedIn)}
                    {ownerSignedIn && <NewItemButton key="new-item-button" onClick={() => setNewItemOpen(true)}/>}
                    {!config.hide_logo && <AlcoveProfileLogo />}
                    
                </Stack>
            </main>
        </div>
    )
}
