import clientPromise from '../mongodb'
import { v4 as uuidv4 } from 'uuid';

// This is the publicly accessible endpoint.
// TODO: Strip out sensitive data such as email 
const getPublicProfile = async (handle, uid) => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const profiles = db.collection("profiles")
        const query = { $or: [{ handle }, { uid }] }
        const result = await profiles.findOne(query)
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}

const getFullProfile = async (uid) => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const profiles = db.collection("profiles")
        const query = { uid }
        const result = await profiles.findOne(query)
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}

const updateProfile = async (updateQuery, uid) => {
    try {
        console.log(`Updating profile with ${uid}`)
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")
        const result = await profiles.updateOne({ uid }, { $set: updateQuery })
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}
const renameProfileItem = async (itemId, type, newName, subtitle, uri, uid) => {
    try {
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")
        if (!itemId) {
            throw new Error("Missing itemID")
        }

        const updateQuery = {
            $set: {
                [`profile.items.${itemId}.type`]: type,
                [`profile.items.${itemId}.content.uri`]: uri,
                [`profile.items.${itemId}.content.name`]: newName,
                [`profile.items.${itemId}.content.commentary`]: subtitle
            }
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result

    } catch (e) {
        console.error(e)
        return e
    }
}
const deleteProfileItem = async (itemId, uid) => {
    try {
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")
        if (!itemId) {
            throw new Error("Missing itemID")
        }

        // Remove itemId from itemOrder

        // Remove item from profile items

        const updateQuery = {
            $pull: {
                "profile.item_order": itemId
            },
            $unset: {
                [`profile.items.${itemId}`]: ""
            }
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result

    } catch (e) {
        console.error(e)
        return e
    }
}
const addProfileItem = async (name, type, uid, uri, subtitle) => {
    try {
        console.log(`Adding item ${name} of type ${type} to profile`)
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")
        const itemId = uuidv4();
        let profileItem;
        if (type === "list") {
            profileItem = {
                id: itemId,
                type,
                content: {
                    name,
                    commentary: subtitle,
                    type: "standard",
                    item_order: [],
                    items: {

                    }
                }
            }
        } else if (type === "uri") {
            profileItem = {
                id: itemId,
                type,
                content: {
                    name,
                    uri
                }
            }
        } else {
            throw new Error("Invalid item type")
        }

        const updateQuery = {
            $push: { "profile.item_order": itemId },
            $set: { [`profile.items.${itemId}`]: profileItem }
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}
const rearrangeProfileItems = async (order, uid) => {
    try {
        console.log(`Reordering profile items for ${uid}`)
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")

        const updateQuery = {
            $set: {
                ['profile.item_order']: order
            }
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}

const addPostToList = async(post) => {
    const {
        postType, spotifyUri, title, subtitle, caption, listId, photo, uri, uid
    } = post
    try {
        console.log(`Reordering profile items for ${uid}`)
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")
        const itemId = uuidv4();
        let newItem

        if(postType === "standard") {
            newItem = {
                id: itemId,
                type: postType,
                parentId: listId,
                title,
                subtitle,
                caption,
                image: photo,
                uri,
            }


        } else if (postType === "spotify") {


            const parsedUri = new URL(spotifyUri)
            const path = parsedUri.pathname.split("/")
            const spotifyType = path[1]
            const spotifyId = path[2]
            console.log(path)
            newItem = {
                id: itemId,
                type: postType,
                parentId: listId,
                spotifyType,
                spotifyId,
            }
        }
        const updateQuery = {
            $set: {
                [`profile.items.${listId}.content.items.${itemId}`]: newItem,
            },
            $push: {
                [`profile.items.${listId}.content.item_order`]: itemId
            }
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result
    } catch (e) {
        console.error(e)
        return null
    } 
}
const deletePost = async (parentId, postId, uid) => {
    try {
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")
        if (!parentId) {
            throw new Error("Missing itemID")
        }

        // Remove itemId from itemOrder

        // Remove item from profile items

        const updateQuery = {
            $pull: {
                [`profile.items.${parentId}.content.item_order`]: postId
            },
            $unset: {
                [`profile.items.${parentId}.content.items.${postId}`]: ""
            }
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result

    } catch (e) {
        console.error(e)
        return e
    }
}

const editPost = async (parentId, postId, post, uid) => {
    try {
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")
        if (!parentId) {
            throw new Error("Missing itemID")
        }

        // Remove itemId from itemOrder

        // Remove item from profile items
        const {
            title = "", subtitle = "", caption ="", image = "", uri="", photoChanged=false
        } = post
        const basePath = `profile.items.${parentId}.content.items.${postId}`
        const updateQuery = {
            $set: {
                [`${basePath}.title`]: title,
                [`${basePath}.subtitle`]: subtitle,
                [`${basePath}.caption`]: caption,
                [`${basePath}.uri`]: uri,

            }
        }

        if(photoChanged) {
            updateQuery.$set[`${basePath}.image`] = image
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result

    } catch (e) {
        console.error(e)
        return e
    }
}

const reorderPosts = async (order, itemId, uid) => {
    try {
        console.log(`Reordering posts for ${uid}`)
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")

        const updateQuery = {
            $set: {
                [`profile.items.${itemId}.content.item_order`]: order
            }
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}

const updateTheme = async (theme, uid) => {
    
    try {
        console.log(`Updating theme for ${uid}`)
        const { background = {}} = theme;
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")

        const updateQuery = {
            $set: {
                background
            }
        }
        const result = await profiles.updateOne({ uid }, updateQuery)
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}
module.exports = { getPublicProfile, getFullProfile, updateProfile, addProfileItem, deleteProfileItem, renameProfileItem, rearrangeProfileItems, addPostToList, deletePost, editPost, reorderPosts, updateTheme }