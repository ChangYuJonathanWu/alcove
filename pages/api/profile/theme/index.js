// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFullProfile, updateProfile, updateTheme } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp'


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
    if (method === "POST" ) {
        const { query, uid, body } = req; // don't really need UID from request as have it from auth

        // Here we need firebase admin to verify the auth information
        if(!uid) {
            return res.status(400).json({error: "Missing UID"})
        }

        const form = new multiparty.Form()

        form.parse(req, async (err, fields, files) => {
            if(err) {
                return res.status(400).json({error: err.message})
            }

            const { background_image_operation = ["none"] } = fields
            const photo_operation = background_image_operation[0]
            if(photo_operation === "clear") {
                try {
                    await deleteBackgroundPhoto(uid)

                } catch(e) {
                    console.error(e)
                    console.error("Error deleting background photo from profile")
                }
                await updateTheme({ background: {type: "none"}}, uid)
                return res.status(200).json({success: true})

            } else if (photo_operation === "new") {
                const { background_image } = files
                const imageFile = background_image[0]   
                const imagePath = imageFile.path

                const compressedImage = await sharp(imagePath).resize(1920, 1080, { fit: 'inside'}).toBuffer()
                const fileName = uuidv4()
                const destinationPath = `public/profile/images/${fileName}`;
    
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
                    const publicURL = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`
                    console.log(publicURL)
    
                    await updateTheme({background: {type: "image", url: publicURL}}, uid)
                    return res.status(200).json({success: true})
                } catch (e) {
                    console.error(e)
                    return res.status(400).json({ error: "Error uploading image - please try again." })
                }

                return res.status(400).json({error: "Invalid photo operation"})
            }

        })

    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}

export default withAuth(handler)