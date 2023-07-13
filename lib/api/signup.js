import clientPromise from '../mongodb'
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    port: 465,            
    host: "mail.privateemail.com",
       auth: {
            user: 'hello@alcove.place',
            pass: process.env.EMAIL_PASSWORD,
         },
    secure: true,
    });

const buildTemplateProfile = ({ handle, email, uid }) => {
    const profileTemplate = {
        "title": `${handle}`,
        "title_style": {},
        "handle": handle,
        "photo": "",
        "email": email,
        "uid": uid,
        "background": {
            "type": "image",
            "url": "/nyc2.jpg"
        },

        "description": "Your bio goes here.",
        "social_links": {
            "instagram": "",
            "facebook": ""
        },
        "description_style": {},
        "config": {},
        "profile": {
            "item_order": [
                "i1",
                "i2"
            ],
            "items": {
                "i1": {
                    "id": "i1",
                    "type": "list",
                    "content": {
                        "name": "This is a list",
                        "description": "Lists can have captions",
                        "type": "standard",
                        "item_order": [
                            "i1a",
                            "i1b"
                        ],
                        "items": {
                            "i1a": {
                                "id": "i1a",
                                "type": "standard",
                                "parentId": "i1",
                                "title": "You can add posts to your list",
                                "subtitle": "They can have photos too",
                                "caption": "",
                                "image": "/woods.jpg"
                            },
                            "i1b": {
                                "id": "i1b",
                                "type": "standard",
                                "parentId": "i1",
                                "title": "Posts can also have links - click me!",
                                "subtitle": "",
                                "caption": "",
                                "image": "/mountains.jpg",
                                "uri": "https://www.alcove.place"

                            }
                        }
                    }

                },
                "i2": {
                    "id": "i2",
                    "type": "uri",
                    "content": {
                        "name": "This is a link",
                        "uri": "https://www.metmuseum.org"
                    }
                }
            }
        }
    }

    return profileTemplate
}

const completeSignup = async (id, password, firebaseAuth) => {
    // TODO: ALL of this really needs to be in a transaction
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
        const user = await firebaseAuth.createUser({
            email,
            emailVerified: true,
            password,
        })
        if (!user) {
            console.error("Error creating user with firebase admin")
            return { success: false, error: 'Error creating user credentials' }
        }
        const { uid } = user

        const newProfile = buildTemplateProfile({ handle, email, uid })
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
        return { success: false, error: e }
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
        if (handle.length >= 4) {
            console.log("Attempting to check handle: ", handle)
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
        console.log("Attempting to check email: ", email)
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
        try {
            const mailData = {from: 'hello@alcove.place',  // sender address
            to: 'jonwux1@gmail.com',   // list of receivers
            subject: `Alcove Signup: ${handle}`,  // Subject line
            text: `New signup: ${handle} - ${email}`,  // plain text body
          };
          transporter.sendMail(mailData, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(info);
            });

        } catch(e) {
            console.error(e)
            console.error("Error sending email on signup")
        }
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