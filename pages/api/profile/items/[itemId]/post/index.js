// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addPostToList } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp'

async function handler(req, res) {

    const { method, uid } = req;
    // if (method === "DELETE") {
    //     const { query, body } = req;
    //     const { itemId } = query;
    //     console.log("Attempting to delete item ID: " + itemId)

    //     // Here we need firebase admin to verify the auth information
    //     if (!uid) {
    //         return res.status(400).json({ error: "Missing UID" })
    //     }
    //     // if null, then do not update the parameter. Otherwise if string (even empty) then update
    //     const result = await deleteProfileItem(itemId, uid)
    //     if (result) {
    //         return res.status(200).json({ success: true })
    //     } else {
    //         return res.status(400).json({ error: "Could not delete item from profile" })
    //     }

    // }

    if (method === "POST") {
        const { query, body } = req;
        const { itemId } = query;

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }
        const form = new multiparty.Form()

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err)
                return res.status(400).json({ error: "Error parsing form" })
            }
            let { title, subtitle, caption, uri = "" } = fields
            
            title = title[0]
            subtitle = subtitle[0]
            caption = caption[0]
            uri = uri[0]

            const { photo } = files
            let publicUrl = ""
            if (photo) {
                const imageFile = photo[0]
                const imagePath = imageFile.path

                const compressedImage = await sharp(imagePath).resize(1000, 1000, { fit: "inside" }).toBuffer()

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
            try{
                const result = await addPostToList(title, subtitle, caption, itemId, publicUrl, newUri, uid)
                return res.status(200).json({ success: true })
            } catch (e) {
                console.error(e)
            }

            return res.status(400).json({ error: "Could not add post to list" })
        })

    }
}

export default withAuth(handler)

export const config = {
    api: {
        bodyParser: false,
    }
}