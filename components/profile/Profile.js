import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';

import ProfileHeader from './ProfileHeader';
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo';

import { useAuthContext } from "@/context/AuthContext";
import { signOut, getAuth } from "firebase/auth";

import { montserrat } from '../fonts';
import EditBioModal from './EditBioModal';
import NewItemButton from './NewItemButton';
import NewItemModal from './NewItemModal';
import ProfileItems from '../items/ProfileItems';
import RearrangeItemsButton from './RearrangeItemsButton';
import RearrangeItemsModal from './RearrangeItemsModal';
import PostToListModal from './PostToListModal';
import ThemingButton from './ThemingButton';
import ViewAsPublicButton from './ViewAsPublicButton';
import ThemingModal from './ThemingModal';
import LogoutButton from './LogoutButton';


export default function Profile({ user, ownerSignedIn = false }) {
    const [listOpen, setListOpen] = useState(null);
    const [editBio, setEditBio] = useState(false);
    const [newItemOpen, setNewItemOpen] = useState(false)
    const [themeOpen, setThemeOpen] = useState(false)
    const [reorderItems, setReorderItems] = useState(false)

    const router = useRouter();

    const triggerReload = () => {
        router.replace(router.asPath)
    }

    const { title, description, handle, photo, background, config, profile = {}, profile_style = {} } = user
    const { items = {}, item_order: itemOrder = [] } = profile

    const { item_font } = profile_style
    const toggleSingleList = (listId) => {
        setListOpen(listOpen === listId ? null : listId)
    }

    const { type: backgroundType, url: backgroundUrl } = background || {}

    const logoutUser = async () => {
        const auth = getAuth();
        await signOut(auth);
        router.replace('/login')
    }

    //TODO: Error handling on network request, validation
    return (
        <main>
            <div style={{ height: '100%', minHeight: '100vh', width: '100%', position: "fixed", backgroundColor: 'gray', alignItems: "center", zIndex: 0 }}>

                {backgroundType == "image" && <Image priority={true} fill={true} src={backgroundUrl} objectFit='cover' id="background-photo" alt="background wallpaper" />}
            </div>
            <Stack style={{ marginBottom: "100px" }}>
                <div style={{ zIndex: 1 }}>
                    <EditBioModal open={editBio} setOpen={setEditBio} user={user} triggerReload={triggerReload} />
                    <NewItemModal open={newItemOpen} setOpen={setNewItemOpen} triggerReload={triggerReload} />
                    <RearrangeItemsModal open={reorderItems} setOpen={setReorderItems} user={user} triggerReload={triggerReload} />
                    <ThemingModal open={themeOpen} setOpen={setThemeOpen} user={user} triggerReload={triggerReload} />
                    {config.demo_mode && <div style={{ height: "2rem" }}></div>}
                    <ProfileHeader user={user} setEditMode={setEditBio} ownerSignedIn={ownerSignedIn} />
                    <ProfileItems user={user} editMode={ownerSignedIn} triggerReload={triggerReload} />
                </div>

                {ownerSignedIn &&
                    <Stack style={{ zIndex: 1 }}>
                        <NewItemButton key="new-item-button" onClick={() => setNewItemOpen(true)} />
                        <RearrangeItemsButton key="rearrange-items-button" onClick={() => setReorderItems(true)} />
                        <ThemingButton key="theming-button" onClick={() => setThemeOpen(true)} />
                        <ViewAsPublicButton link={`${handle}/public`} key="view-as-public-button" />
                        <LogoutButton onClick={logoutUser} />
                    </Stack>}
                <div style={{ zIndex: 1 }}>
                    {(!config.hide_logo && !ownerSignedIn) && <AlcoveProfileLogo />}
                </div>


            </Stack>
        </main>
    )
}
