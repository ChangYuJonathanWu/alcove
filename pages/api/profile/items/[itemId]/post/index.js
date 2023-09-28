// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addPostToList } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'
import { v4 as uuidv4 } from 'uuid';
import { resizeImage, uploadImage } from '@/utils/imageProcessing'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios';

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
                    const isShortedSpotifyLink = (uri) => {
                        const regex = /\bspotify\.link\/(.+)/
                        return regex.test(uri)
                    }
        
                    if (isShortedSpotifyLink(spotifyUri)) {
                        // Retrieve information from shorted link
                        try {
                            const headers = {
                                'User-Agent':  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
                            }
                            console.log("Attempoting to get full spotify url")
                            // const result = await fetch(spotifyUri, { method: 'HEAD', redirect: 'follow' })
                            const result = await axios.get(spotifyUri, { headers})
                            console.log(result.request.res.responseUrl)
                            spotifyUri = result.url
                        } catch (e) {
                            console.log("Unable to get full spotify URL - aborting.")
                            console.log(e)
                            return res.status(400).json({ error: "Invalid Spotify link" })
                        }
                    }
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
                    return res.status(200).json({ success: true })
                } else if (postType === "instagram") {
                    let { instagramUri = [""] } = fields
                    instagramUri = instagramUri[0];
                    console.info("Adding Instagram post to list", instagramUri)

                    // extract post ID and whether post or reel from instagramUri
                    const regex = /\bhttps:\/\/(www\.)?instagram\.com\/(p|reel)\/([a-zA-Z0-9_-]*)\//

                    const valid = regex.test(instagramUri)
                    if (!valid) {
                        return res.status(400).json({ error: "Invalid Instagram link" })
                    }
                    const instagramPostType = instagramUri.match(regex)[2]
                    const postId = instagramUri.match(regex)[3]
                    const finalInstagramUri = `https://www.instagram.com/${instagramPostType}/${postId}/`
                    console.log("Final Instagram URI is " + finalInstagramUri)
                    const postBody = {
                        listId: itemId,
                        postType,
                        instagramUri: finalInstagramUri,
                        uid
                    }
                    const result = await addPostToList(postBody)
                    return res.status(200).json({ success: true })
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
                        console.log("Post contains image. Processing...")
                        try {
                            const imageFile = photo[0]
                            const imagePath = imageFile.path
                            let compressedImage
                            compressedImage = await resizeImage(imagePath, 650, 1000)
                            console.log("Image resized")
                            const fileName = uuidv4()
                            const destinationPath = `public/content/${fileName}`
                            publicUrl = await uploadImage(compressedImage, destinationPath, imageFile.headers['content-type'], uid)
                            console.log("Image uploaded, public URL is " + publicUrl)
                        } catch (e) {
                            console.error(e)
                            Sentry.captureException(e)
                            return res.status(400).json({ error: "Error processing image - please try a different image." })
                        }
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