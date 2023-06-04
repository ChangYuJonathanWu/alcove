// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFullProfile, updateProfile } from '../../../lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp'

// This is the Administrative /profile endpoint, intended to be accessed only by the owner of the profile.
// We don't want to expose profile information like email, etc. This endpoint can reveal sensitive information. 
async function handler(req, res) {
    const { method } = req;
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
            if(err) {
                return res.status(400).json({ error: "Error uploading image - please try again." })
            }
            const { profilePhoto } = files
            if (!profilePhoto) {
                return res.status(400).json({ error: "Missing profile photo" })
            }

            const imageFile = profilePhoto[0];
            const imagePath = imageFile.path;

            const compressedImage = await sharp(imagePath).resize(400, 400, {
                fit: 'inside',
            }).toBuffer()

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
            } catch(e) {
                console.error(e)
                return res.status(400).json({ error: "Error uploading image - please try again." })
            }

            const publicURL = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`
            console.log(publicURL)
            return res.status(200).json({ success: true })

        })







    }
}



export default withAuth(handler)

export const config = {
    api: {
        bodyParser: false
    }
}
