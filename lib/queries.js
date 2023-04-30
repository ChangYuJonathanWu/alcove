import clientPromise from './mongodb'

const availableHandle = async (handle) => {
    if(handle.length >= 5) {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const query = { handle }
        const result = await signups.findOne(query)
        return !result
    }
    return false
}

const availableEmail = async (email) => {
    const client = await clientPromise
    const db = client.db("home");
    const signups = db.collection("signups")
    const query = { email }
    const result = await signups.findOne(query)
    return !result 
}

module.exports = { availableHandle, availableEmail }