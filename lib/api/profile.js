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

const getFullProfile = async (handle, uid) => {
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
const renameProfileItem = async (itemId, newName, uid) => {
    try {
        const client = await clientPromise
        const db = client.db("home")
        const profiles = db.collection("profiles")
        if (!itemId) {
            throw new Error("Missing itemID")
        }

        const updateQuery = {
            $set: {
                [`profile.items.${itemId}.content.name`]: newName
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
const addProfileItem = async (name, type, uid, uri) => {
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
                    commentary: "",
                    type: "",
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

module.exports = { getPublicProfile, getFullProfile, updateProfile, addProfileItem, deleteProfileItem, renameProfileItem, rearrangeProfileItems }