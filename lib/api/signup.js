import clientPromise from '../mongodb'
import { ObjectId } from 'mongodb';
import { firebaseAdmin } from '../firebase-admin'


const buildTemplateProfile = ({ handle, email, uid }) => {
    const profileTemplate = {
        "title": `@${handle}'s Alcove`,
        "title_style": {},
        "handle": handle,
        "photo": "",
        "email": email,
        "uid": uid,
        "background": {
            "type": "none"
        },

        "description": "healthcheck",
        "social_links": {
            "instagram": "",
            "facebook": ""
        },
        "description_style": {},
        "config": {},
        "profile": {
            "item_order": [

            ],
            "items": {
            }
        }
    }

    return profileTemplate
}

const completeSignup = async (id, password) => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const signupId = new ObjectId(id)
        const query = { _id: signupId }
        const result = await signups.findOne(query)
        if (!result) {
            console.error("Signup not found for signup ID, ", id)
            return { success: false, error: 'Signup not found' }
        }

        const { handle, email } = result
        // create new user with firebase admin
        const user = await firebaseAdmin.auth().createUser({
            email,
            emailVerified: true,
            password,
        })
        if (!user) {
            console.error("Error creating user with firebase admin")
            return { success: false, error: 'Error creating user credentials' }
        }
        const { uid } = user

        const newProfile = buildTemplateProfile()
        // insert new profile into profile collection and mark the signup complete TODO: MAKE THIS A TRANSACTION
        const profiles = db.collection("profiles")
        const profileResult = await profiles.insertOne(newProfile)
        if (!profileResult) {
            console.error("Error inserting new profile into profiles collection")
            return { success: false, error: 'Error creating new starter profile' }
        }
        // Mark the signup as complete
        const updateQuery = {
            $set: {
                complete: true,
            }
        }

        const signupUpdateResult = await signups.updateOne({ _id: signupId }, updateQuery)
        if (!signupUpdateResult) {
            console.error("Error updating signup to complete")
            return { success: false, error: 'Error updating signup to complete' }
        }
        return { success: true }
    } catch (e) {
        console.error(e)
        return null
    }
}

const getSignup = async (id) => {
    // get signup from db based on _id field
    try {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const query = { _id: new ObjectId(id) }
        const result = await signups.findOne(query)
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}

const availableHandle = async (handle) => {
    try {
        if (handle.length >= 5) {
            const client = await clientPromise
            const db = client.db("home");
            const signups = db.collection("signups")
            const query = { handle }
            const result = await signups.findOne(query)
            return !result
        }
        return false
    } catch (e) {
        console.error(e)
        return false
    }

}

const availableEmail = async (email) => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const query = { email }
        const result = await signups.findOne(query)
        return !result
    } catch (e) {
        console.error(e)
        return false
    }

}

const createSignup = async (email, handle) => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const signup = {
            email,
            handle
        }

        const result = await signups.insertOne(signup)
        return true
    } catch (e) {
        console.log(e)
        return false
    }


}

module.exports = { availableHandle, availableEmail, createSignup, getSignup, completeSignup }