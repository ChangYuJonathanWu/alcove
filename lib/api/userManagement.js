import clientPromise from '../mongodb'
import { ObjectId } from 'mongodb';
import sgMail from '@sendgrid/mail'
import { buildOnboardingEmail } from '@/utils/buildOnboardingEmail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendOnboardingEmail = async ({ email, handle, signupId }) => {
    console.log("Attempting onboarding email to: " + email)
    const msg = {
        to: email, // Change to your recipient
        from: {name: "Jonathan@Alcove", email: "hello@alcove.place"},
        subject: `@${handle} you're in! Create your Alcove now.`,
        html: buildOnboardingEmail(signupId)
    }

    const result = await sgMail.send(msg)
    console.log("Onboarding email sent to ", email)
    return result
}


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

const attemptOnboard = async (signupId, attemptNumber, email, handle, test) => {
    if(test) {
        return await sendOnboardingEmail({email: "jonwux1@gmail.com", handle: "test-handle", signupId: "test-signup-id"})
    }
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