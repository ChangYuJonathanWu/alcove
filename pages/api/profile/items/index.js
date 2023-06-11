// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addProfileItem, rearrangeProfileItems } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';

// This is the Administrative /profile endpoint, intended to be accessed only by the owner of the profile.
// We don't want to expose profile information like email, etc. This endpoint can reveal sensitive information. 
async function handler(req, res) {
    const { method, uid } = req;
    if (!uid) {
        return res.status(400).json({ error: "Missing UID" })
    }
    if (method === "PUT") {
        const { query, body } = req;
        const { item_order } = JSON.parse(body)
        // IMPORTANT TODO, need to VALIDATE item order before applying. Can corrupt profile otherwise. 
        const result = await rearrangeProfileItems(item_order, uid)
        if (result) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(400).json({ error: "Could not reorder profile items" })
        }
    }
    if (method === "POST") {
        const { query, body } = req; // don't really need UID from request as have it from auth

        const { name, subtitle, type, uri } = JSON.parse(body);
        let newUri
        if (uri) {
            newUri = uri.replace("http://", "https://")
            if (!newUri.startsWith("https://")) {
                newUri = "https://" + newUri
            }
        }
        // if null, then do not update the parameter. Otherwise if string (even empty) then update
        const result = await addProfileItem(name, type, uid, newUri, subtitle)
        if (result) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(400).json({ error: "Could not add item to profile" })
        }

    }
}

export default withAuth(handler)