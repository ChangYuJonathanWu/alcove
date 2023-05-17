import clientPromise from './mongodb'

const getProfile = async (handle, uid) => {
    try {
        console.log(uid)
        const client = await clientPromise
        const db = client.db("home");
        const profiles = db.collection("profiles")
        const query = { $or: [{ handle }, { uid }] }
        const result = await profiles.findOne(query)
        return result
    } catch(e) {
        console.error(e)
        return null
    }
}

const availableHandle = async (handle) => {
    try {
        if(handle.length >= 5) {
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
    } catch(e) {
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

module.exports = { availableHandle, availableEmail, createSignup, getProfile }