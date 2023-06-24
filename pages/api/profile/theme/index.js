// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFullProfile, updateProfile, updateTheme } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp'
import * as Sentry from '@sentry/nextjs'
import { resizeImage, uploadImage } from '@/utils/imageProcessing';


const deleteBackgroundPhoto = async (uid) => {
    const fullProfile = await getFullProfile(uid)
    if (fullProfile?.background?.type === "image") {
        const bucket = getStorage().bucket();
        const fileName = fullProfile.background.url.split("/").pop()
        const file = bucket.file(`public/profile/images/${fileName}`)
        await file.delete()
    }
}
async function handler(req, res) {
    const { method } = req;
    if (method === "POST") {
        const { query, uid, body } = req; // don't really need UID from request as have it from auth

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }

        const form = new multiparty.Form()

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: err.message })
            }

            const { background_image_operation = ["none"] } = fields
            const photo_operation = background_image_operation[0]
            try {
                await deleteBackgroundPhoto(uid)

            } catch (e) {
                console.error(e)
                console.error("Error deleting background photo from profile")
                Sentry.captureException(e)
            }
            if (photo_operation === "clear") {
                const result = await updateTheme({ background: { type: "none" } }, uid)
                return res.status(result ? 200 : 400).json({ success: !!result })

            } else if (photo_operation === "new") {
                const { background_image } = files
                const imageFile = background_image[0]
                const imagePath = imageFile.path
                let compressedImage
                try {
                    compressedImage = await resizeImage(imagePath, 2600, 2600)
                } catch (e) {
                    console.error(e)
                    Sentry.captureException(e)
                    return res.status(400).json({ error: "Error uploading image - please try a different image." })
                }
                const fileName = uuidv4()
                const destinationPath = `public/profile/images/${fileName}`;

                const publicURL = await uploadImage(compressedImage, destinationPath, imageFile.headers['content-type'], uid)

                const result = await updateTheme({ background: { type: "image", url: publicURL } }, uid)
                return res.status(result ? 200 : 400).json({ success: !!result })
            }
            return res.status(400).json({ error: "Invalid photo operation" })
        })

    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}

export default withAuth(handler)