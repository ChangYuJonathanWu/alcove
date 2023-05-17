// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getProfile } from '../../../lib/api/profile'


export default async function handler(req, res) {
    const { method } = req;
    if (method === "GET") {
        const { query } = req; 
        const { handle, uid } = query
        if(!handle && !uid){
            return res.status(200).json({})
        }
        const profile = await getProfile(handle, uid)
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