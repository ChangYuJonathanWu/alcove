// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deletePost, editPost } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'
import { v4 as uuidv4 } from 'uuid';
import * as Sentry from "@sentry/nextjs";
import { resizeImage, uploadImage } from '@/utils/imageProcessing';

async function handler(req, res) {

    const { method, uid } = req;
    
    // Edit post
    if (method === "PUT") {
        const { query, body } = req;
        const { itemId, postId } = query;
        console.log("Attempting to edit post ID: " + postId)
        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }

        const form = new multiparty.Form()

        form.parse(req, async (error, fields, files) => {
            if (error) {
                console.log(error)
                return res.status(400).json({ error: "Could not parse form" })
            }

            const { image } = files
            let { title = "", subtitle = "", caption = "", photo_changed = false, uri = "" } = fields
            title = title[0]
            subtitle = subtitle[0]
            caption = caption[0]
            photo_changed = photo_changed[0] === "true"
            uri = uri[0]

            let newUri = ""
            if (uri) {
                newUri = uri.replace("http://", "https://")
                if (!newUri.startsWith("https://")) {
                    newUri = "https://" + newUri
                }
            }

            let publicUrl = ""

            if (image && image.length > 0) {
                try {
                    console.log("Post contains photo")
                    const imageFile = image[0]
                    const imagePath = imageFile.path
                    const compressedImage = await resizeImage(imagePath, 1000, 1000)
                    console.log("Photo compressed successfully ")
                    const fileName = uuidv4()
                    const destinationPath = `public/content/${fileName}`
                    publicUrl = await uploadImage(compressedImage, destinationPath, imageFile.headers['content-type'], uid)
                    console.log("Photo uploaded successfully, public URL: " + publicUrl)
                } catch (e) {
                    console.error(e)
                    Sentry.captureException(e)
                    return res.status(400).json({ error: "Error compressing image - please try a different image." })
                }
            }

            const post = {
                title,
                subtitle,
                caption,
                image: publicUrl,
                photoChanged: photo_changed,
                uri: newUri
            }

            const result = await editPost(itemId, postId, post, uid)
            if (result) {
                return res.status(200).json({ success: true })
            } else {
                return res.status(400).json({ error: "Could not delete post from profile" })
            }
        });

    }
    if (method === "DELETE") {
        const { query, body } = req;
        const { itemId, postId } = query;
        console.log("Attempting to delete post ID: " + postId)

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }
        // if null, then do not update the parameter. Otherwise if string (even empty) then update
        const result = await deletePost(itemId, postId, uid)
        if (result) {
            return res.status(200).json({ success: true })
        } else {
            Sentry.captureException("Could not delete post from profile")
            return res.status(400).json({ error: "Could not delete post from profile" })
        }

    }


}

export const config = {
    api: {
        bodyParser: false,
    },
}


export default withAuth(handler)