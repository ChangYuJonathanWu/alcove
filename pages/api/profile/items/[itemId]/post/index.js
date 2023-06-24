// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addPostToList } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from 'uuid';
import { resizeImage } from '@/utils/imageProcessing'
import * as Sentry from '@sentry/nextjs'

async function handler(req, res) {

    const { method, uid } = req;

    if (method === "POST") {
        console.info("Creating post")
        const { query, body } = req;
        const { itemId } = query;

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }
        const form = new multiparty.Form()
        try {
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error(err)
                    Sentry.captureException(err)
                    return res.status(400).json({ error: "Error parsing form" })
                }
                let { postType = ["standard"] } = fields
                postType = postType[0]

                if (postType === "spotify") {
                    let { spotifyUri = [""] } = fields
                    spotifyUri = spotifyUri[0];
                    console.info("Adding Spotify post to list", spotifyUri)
                    const regex = /\bhttps:\/\/open\.spotify\.com\/(track|playlist|artist|show|episode|audiobook)\//
                    const valid = regex.test(spotifyUri)
                    if (!valid) {
                        return res.status(400).json({ error: "Invalid Spotify link" })
                    }
                    const postBody = {
                        listId: itemId,
                        postType,
                        spotifyUri,
                        uid
                    }
                    const result = await addPostToList(postBody)
                }

                else {
                    let { title = [""], subtitle = [""], caption = [""], uri = [""] } = fields

                    title = title[0]
                    subtitle = subtitle[0]
                    caption = caption[0]
                    uri = uri[0]

                    const { photo } = files
                    let publicUrl = ""
                    if (photo) {
                        const imageFile = photo[0]
                        const imagePath = imageFile.path
                        let compressedImage
                        try {
                            compressedImage = await resizeImage(imagePath, 1000, 1000)
                        } catch (e) {
                            console.error(e)
                            Sentry.captureException(e)
                            return res.status(400).json({ error: "Error processing image - please try a different image." })
                        }

                        const fileName = uuidv4()
                        const destinationPath = `public/content/${fileName}`
                        const bucket = getStorage().bucket();
                        try {
                            const response = await bucket.file(destinationPath).save(compressedImage, {
                                metadata: {
                                    contentType: imageFile.headers['content-type'],
                                    metadata: {
                                        owner: uid
                                    }
                                }
                            })
                            const makePublicResponse = await bucket.file(destinationPath).makePublic();
                        } catch (e) {
                            console.error(e)
                            Sentry.captureException(e)
                            return res.status(400).json({ error: "Error uploading image - please try again." })
                        }
                        publicUrl = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`
                    }

                    console.log("Adding post to list " + itemId + " with title " + title)
                    console.log(uri)
                    let newUri = ""
                    if (uri) {
                        newUri = uri.replace("http://", "https://")
                        if (!newUri.startsWith("https://")) {
                            newUri = "https://" + newUri
                        }
                    }
                    try {
                        const postBody = {
                            listId: itemId,
                            postType,
                            title,
                            subtitle,
                            caption,
                            uri: newUri,
                            photo: publicUrl,
                            uid
                        }

                        const result = await addPostToList(postBody)
                        return res.status(200).json({ success: true })
                    } catch (e) {
                        Sentry.captureException(e)
                        console.error(e)
                    }
                }

                return res.status(400).json({ error: "Could not add post to list" })
            })
        } catch (e) {
            Sentry.captureException(e)
            console.error(e)
            return res.status(400).json({ error: "Error posting. Please try again later." })

        }
    }
}

export default withAuth(handler)

export const config = {
    api: {
        bodyParser: false,
    }
}