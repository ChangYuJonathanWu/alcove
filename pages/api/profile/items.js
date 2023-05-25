// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addProfileItem } from '../../../lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';

// This is the Administrative /profile endpoint, intended to be accessed only by the owner of the profile.
// We don't want to expose profile information like email, etc. This endpoint can reveal sensitive information. 
async function handler(req, res) {
    const { method, uid } = req;
    if (method === "POST") {
        const { query, body } = req; // don't really need UID from request as have it from auth

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }

        const { name, type, uri } = JSON.parse(body);
        let newUri
        if (uri) {
            newUri = uri.replace("http://", "https://")
            if (!newUri.startsWith("https://")) {
                newUri = "https://" + newUri
            }
        }
        // if null, then do not update the parameter. Otherwise if string (even empty) then update
        const result = await addProfileItem(name, type, uid, newUri)
        console.log(result)
        if (result) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(400).json({ error: "Could not add item to profile" })
        }

    }
}

export default withAuth(handler)