import clientPromise from '../mongodb'

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

module.exports = { getProfile }