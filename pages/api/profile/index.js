// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFullProfile } from '../../../lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';

// This is the Administrative /profile endpoint, intended to be accessed only by the owner of the profile.
// We don't want to expose profile information like email, etc. This endpoint can reveal sensitive information. 
async function handler(req, res) {
    const { method } = req;
    if (method === "GET") {
        const { query } = req; 
        const { handle, uid } = query
        if(!handle && !uid){
            return res.status(200).json({})
        }
        const profile = await getFullProfile(handle, uid)
        return res.status(200).json(profile);
    }
    if (method === "PUT" ) {
        const { query } = req;
        const { uid } = query
        // Here we need firebase admin to verify the auth information
        if(!uid) {
            return res.status(400).json({error: "Missing UID"})
        }

    }
}

export default withAuth(handler)