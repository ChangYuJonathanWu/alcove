import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import AlcoveProfileLogo from '@/components/profile/AlcoveProfileLogo'
import { Button, Divider, Stack, TextField, Typography, Avatar } from '@mui/material'
import { amita } from '../fonts'
import Link from 'next/link';
import useBetterMediaQuery from '@/utils/useBetterMediaQuery'
import Navbar from '@/components/home/Navbar'
import { signOut, getAuth } from "firebase/auth";
import { firebase } from '@/lib/Firebase'

import React, { useState, useEffect } from 'react'
import { protectedApiCall } from '@/utils/api'

const theme4 = {
    bgColor: '#7C9070',
    logoColor: "white",
    textColor: "white",
    buttonColor: '#F97B22',
    buttonTextColor: 'white'
}


export default function Home() {
    const [profile, setProfile] = useState(null)
    const [description, setDescription] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const [title, setTitle] = useState("")
    const [newItemName, setNewItemName] = useState("")
    const [newItemType, setNewItemType] = useState("list")
    const [user, setUser] = useState(null)
    useEffect(() => {
        const loadUser = async () => {
            const auth = getAuth()
            const { currentUser } = auth
            if (currentUser) {
                const result = protectedApiCall(`/api/profile?uid=${uid}`, "GET")
                const fullUserProfile = await result.json()
                const { description = "", title = "", photo, profile } = fullUserProfile
                setDescription(description)
                setTitle(title)
                setProfile(fullUserProfile)
                setProfilePhoto(photo)
                setUser(currentUser)

            }
        }
        loadUser()
    })

    const submitUpdates = async () => {
        const body = {
            description,
            title
        }
        const result = await protectedApiCall(`/api/profile`, "PUT", JSON.stringify(body))
    }

    const submitNewItem = async () => {
        const body = {
            name: newItemName,
            type: newItemType,
        }
        const result = await protectedApiCall(`/api/profile/items`, "POST", JSON.stringify(body))
    }

    const onUploadProfilePhoto = async (e) => {
        console.log("Uploading photo...")
        const photo = e.target.files[0]
        const formData = new FormData();
        formData.append('profilePhoto', photo)
        const result = await protectedApiCall(`/api/profile/updateProfilePhoto`, "POST", formData)
    }

    const auth = getAuth()
    const theme = theme4;
    const claimButtonStyle = { backgroundColor: theme.buttonColor, color: theme.buttonTextColor, maxWidth: "250px", textTransform: 'none', borderRadius: '15px', padding: '1rem 2rem' }
    const backgroundColor = theme.bgColor
    const logoColor = theme.logoColor
    const textColor = theme.textColor

    return (
        <>
            <Head>
                <title>Alcove: Sign Up</title>
                <meta name="description" content="Your link-in-bio to share everything you love." />
                <meta property="og:title" content="Alcove: Share what you love" />
                <meta
                    property="og:description"
                    content="Your link-in-bio to share everything you love."
                />
                <meta
                    property="og:image"
                    content="/social-share.png"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <main style={{ backgroundColor, minHeight: '100vh', width: "100%" }}>
                <Navbar />
                <Stack alignItems="center" style={{ paddingBottom: '3rem' }}>
                    <h1>Dashboard</h1>
                    <div>
                        {user ? `You are logged in as ${user.email}` : "You are not logged in."}
                    </div>
                    <Stack direction="column">
                        <div>
                            <Avatar alt={"profile-photo"} sx={{ width: 100, height: 100 }} style={{ margin: "1rem" }} src={profilePhoto} />

                        </div>
                        <input type="file" onChange={(e) => onUploadProfilePhoto(e)} />
                    </Stack>
                    {profilePhoto}

                    <div>
                        {`@${profile?.handle}`}
                    </div>
                    Title
                    <TextField value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                    Description
                    <TextField value={description} onChange={(e) => setDescription(e.currentTarget.value)} />

                    <button onClick={submitUpdates}>Submit</button>
                    <div>

                    </div>
                    Name
                    <TextField value={newItemName} onChange={(e) => setNewItemName(e.currentTarget.value)} />
                    Type (list, link)
                    <button onClick={submitNewItem}>Add Item</button>
                    <div>
                        {user ? <button onClick={(() => signOut(auth))}>Log Out</button> : null}
                    </div>
                </Stack>
            </main>
        </>
    )
}
