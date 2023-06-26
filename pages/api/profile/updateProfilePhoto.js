// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFullProfile, updateProfile } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'
import { v4 as uuidv4 } from 'uuid';
import * as Sentry from '@sentry/nextjs'
import { resizeImage, uploadImage } from '@/utils/imageProcessing';
import { getStorage } from 'firebase-admin/storage';

// This is the Administrative /profile endpoint, intended to be accessed only by the owner of the profile.
// We don't want to expose profile information like email, etc. This endpoint can reveal sensitive information. 

const deleteProfilePhoto = async (uid) => {

    const fullProfile = await getFullProfile(uid)
    if (fullProfile.photo) {
        const bucket = getStorage().bucket();
        const fileName = fullProfile.photo.split("/").pop()
        const file = bucket.file(`public/profile/images/${fileName}`)
        await file.delete()
    }
}

async function handler(req, res) {
    const { method } = req;
    if (method === "DELETE") {
        const { query, uid, body } = req;
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }

        try {
            await deleteProfilePhoto(uid)
        } catch (e) {
            console.error(e)
            Sentry.captureException(e)
            console.error("Could not get full profile - will still try to remove profile photo")
        }

        try {
            const updateQuery = {
                photo: ""
            }
            const result = await updateProfile(updateQuery, uid)
        }
        catch (e) {
            console.error(e)
            Sentry.captureException(e)
            return res.status(400).json({ error: "Error updating profile - please try again." })
        }

        return res.status(200).json({ success: true })

    }
    if (method === "POST") {
        const { query, uid, body } = req; // don't really need UID from request as have it from auth

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }
        const form = new multiparty.Form()
        console.log(util.inspect(req.data))

        form.parse(req, async (err, fields, files) => {
            console.log(err)
            if (err) {
                return res.status(400).json({ error: "Error uploading image - please try again." })
            }
            const { profilePhoto } = files
            if (!profilePhoto) {
                return res.status(400).json({ error: "Missing profile photo" })
            }

            const imageFile = profilePhoto[0];
            const imagePath = imageFile.path;
            let compressedImage
            try {
                compressedImage = await resizeImage(imagePath, 600, 600)
            } catch (e) {
                console.error(e)
                Sentry.captureException(e)
                return res.status(400).json({ error: "Error uploading image - please try again." })
            }
            try {
                await deleteProfilePhoto(uid)
            } catch (e) {
                console.error(e)
                Sentry.captureException(e)
                console.error("Could not delete previous profile photo")
            }

            const fileName = uuidv4()
            const destinationPath = `public/profile/images/${fileName}`;

            try {
                const publicURL = await uploadImage(compressedImage, destinationPath, imageFile.headers['content-type'], uid)
                const updateQuery = {
                    photo: publicURL
                }
                const result = await updateProfile(updateQuery, uid)
                return res.status(result ? 200 : 400).json({ success: !!result, url: publicURL })
            } catch (e) {
                console.error(e)
                Sentry.captureException(e)
                return res.status(400).json({ error: "Error updating profile - please try again." })
            }
        })
    }
}

export default withAuth(handler)

export const config = {
    api: {
        bodyParser: false
    }
}
