import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';

import ProfileHeader from './ProfileHeader/ProfileHeader';
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo';

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
import MenuFAB from './MenuFAB/MenuFAB';


export default function Profile({ user, ownerSignedIn = false }) {
    const [listOpen, setListOpen] = useState(null);
    const [editBio, setEditBio] = useState(false);
    const [newItemOpen, setNewItemOpen] = useState(false)
    const [themeOpen, setThemeOpen] = useState(false)
    const [reorderItems, setReorderItems] = useState(false)
    const [profileUser, setProfileUser] = useState(user)

    const router = useRouter();

    const triggerReload = async () => {
        // get public profile
        const { handle } = profileUser
        const result = await fetch(`/api/public/profile?handle=${handle}`, { method: "GET" })
        const profile = await result.json()
        setProfileUser(profile)
    }

    const { title, description, handle, photo, background, config, profile = {}, profile_style = {} } = profileUser
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

    const canRearrangeItems = itemOrder.length > 1

    const clickHandlers = {
        onLogout: logoutUser,
        onThemeChange: () => setThemeOpen(true),
    }

    //TODO: Error handling on network request, validation
    return (
        <main>

            <div style={{ height: '100%', minHeight: '100vh', width: '100%', position: "fixed", backgroundColor: 'gray', alignItems: "center", zIndex: 0 }}>

                {backgroundType == "image" && <Image priority={true} fill={true} src={backgroundUrl} objectFit='cover' id="background-photo" alt="background wallpaper" />}

            </div>

            <div style={{ position: 'fixed', bottom: 0, right: 0, left: 'auto', top: 'auto', zIndex: 100 }} >
                {ownerSignedIn && <MenuFAB key="menu-fab" profilePhotoUri={photo} handle={handle} clickHandlers={clickHandlers} />}
            </div>


            <Stack style={{ marginBottom: "8.5rem" }}>

                <div style={{ zIndex: 1 }}>
                    <EditBioModal open={editBio} setOpen={setEditBio} user={profileUser} triggerReload={triggerReload} />
                    <NewItemModal open={newItemOpen} setOpen={setNewItemOpen} triggerReload={triggerReload} />
                    <RearrangeItemsModal open={reorderItems} setOpen={setReorderItems} user={profileUser} triggerReload={triggerReload} />
                    <ThemingModal open={themeOpen} setOpen={setThemeOpen} user={profileUser} triggerReload={triggerReload} />
                    {config.demo_mode && <div style={{ height: "2rem" }}></div>}
                    <ProfileHeader user={profileUser} setEditMode={setEditBio} ownerSignedIn={ownerSignedIn} />
                    <ProfileItems user={profileUser} editMode={ownerSignedIn} triggerReload={triggerReload} />
                </div>

                {ownerSignedIn &&
                    <Stack style={{ zIndex: 1 }}>
                        <NewItemButton key="new-item-button" onClick={() => setNewItemOpen(true)} />
                        {canRearrangeItems && <RearrangeItemsButton key="rearrange-items-button" onClick={() => setReorderItems(true)} />}
                        {/* <ThemingButton key="theming-button" onClick={() => setThemeOpen(true)} /> */}
                        {/* <ViewAsPublicButton link={`${handle}/public`} key="view-as-public-button" /> */}
                        {/* <LogoutButton onClick={logoutUser} /> */}

                    </Stack>}

                <div style={{ zIndex: 1 }}>
                    {(!config.hide_logo && !ownerSignedIn) && <AlcoveProfileLogo />}
                </div>


            </Stack>
        </main>
    )
}
