import clientPromise from '../mongodb'
import { ObjectId } from 'mongodb';
import sgMail from '@sendgrid/mail'
import { buildOnboardingEmail } from '@/utils/buildOnboardingEmail';
import { createAlert } from '@/lib/alerting';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendOnboardingEmail = async ({ email, handle, signupId }) => {
    console.log("Attempting onboarding email to: " + email)
    const msg = {
        to: email, // Change to your recipient
        bcc: ["changyujonathanwu@gmail.com"],
        from: { name: "Jonathan@Alcove", email: "hello@alcove.place" },
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

const attemptOnboard = async (signupId, attemptNumber, email, handle, test, increment) => {
    if (test) {
        const result = await sendOnboardingEmail({ email: "test-czes2orun@srv1.mail-tester.com", handle: "jonathanwuu", signupId: "644f448f882e285484279fac" })
        return true
    }
    try {
        if (attemptNumber > 0 && increment) {
            return false
        }
        const client = await clientPromise
        const db = client.db("home");
        const signups = db.collection("signups")

        const result = await sendOnboardingEmail({ email, handle, signupId })
        if (result[0].statusCode !== 202) {
            console.error("Error sending onboarding email: ", result)
            throw new Error("Error sending onboarding email")
        }
        if (!increment) {
            return true
        }
        const databaseResult = await signups.findOneAndUpdate(
            { _id: new ObjectId(signupId) },
            { $inc: { attempts: 1 } },
            { returnOriginal: false }
        )
        return true

    }


    catch (e) {
        console.error(e)
        createAlert("Error sending onboarding email", e.message, "P1")
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