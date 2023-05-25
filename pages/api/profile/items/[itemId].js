// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteProfileItem } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';

async function handler(req, res) {

    const { method, uid } = req;
    if (method === "DELETE") {
        const { query, body } = req; 
        const { itemId } = query;
        console.log("Attempting to delete item ID: " + itemId)

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }
        // if null, then do not update the parameter. Otherwise if string (even empty) then update
        const result = await deleteProfileItem(itemId, uid)
        if (result) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(400).json({ error: "Could not delete item from profile" })
        }

    }
}

export default withAuth(handler)