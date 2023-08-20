import clientPromise from '../mongodb'
import { ObjectId } from 'mongodb';
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const getAllSignups = async () => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const result = await signups.find({}).toArray()
        result.forEach((signup) => {
            signup._id = signup._id.toString()
        })
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}

const attemptOnboard = async (signupId) => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const result = await signups.findOneAndUpdate(
            { _id: new ObjectId(signupId) },
            { $inc: { attempts: 1 } },
            { returnOriginal: false }
        )
        const { value } = result
        const { email, handle, attempts } = value
        return true
        
    }
    catch (e) {
        console.error(e)
        return null
    }
}

const markComplete = async (signupId) => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const result = await signups.findOneAndUpdate(
            { _id: new ObjectId(signupId) },
            { $set: { complete: true } },
            { returnOriginal: false }
        )
        return true
    } catch (e) {
        console.error(e)
        return null
    }
}

const deleteSignupPermanently = async (signupId) => {
    try {
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")
        const result = await signups.deleteOne({ _id: new ObjectId(signupId) })
        return true
    } catch (e) {
        console.error(e)
        return null
    }
}



module.exports = { getAllSignups, attemptOnboard, markComplete, deleteSignupPermanently }